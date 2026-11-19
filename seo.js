/* Search-engine helpers: structured data (JSON-LD) for Google, page titles and descriptions,
   and the index that powers the site search. Used by build.js. */

/* Hindi and common Indian names, so a search for "badam" or "khajoor" finds the right products */
const ALIASES = {
  dates: 'khajoor khajur khejur dates',
  almonds: 'badam',
  cashews: 'kaju',
  pistachios: 'pista',
  'walnut-kernels': 'akhrot walnut',
  'walnuts-in-shell': 'akhrot walnut',
  'black-raisins-seedless': 'kishmish kismis kali kishmish raisins',
  'black-raisins-seeded': 'munakka kishmish raisins',
  figs: 'anjeer anjir',
  apricots: 'khubani qubani jardalu'
};

/* Country for Product structured data (only where the origin is a single country) */
const COUNTRY = {
  'Saudi Arabia': 'Saudi Arabia', Jordan: 'Jordan', Iran: 'Iran', Tunisia: 'Tunisia', UAE: 'United Arab Emirates',
  Oman: 'Oman', India: 'India', Afghanistan: 'Afghanistan', 'California, USA': 'United States'
};

const CUISINE = {
  'date-and-nut-laddoos': 'Indian', 'dry-fruit-kheer': 'Indian', 'kesar-badam-milk': 'Indian', 'sheer-khurma': 'Indian',
  'date-rolls': 'Indian', 'imli-khajur-chutney': 'Indian', 'anjeer-milkshake': 'Indian', 'dry-fruits-milkshake': 'Indian',
  'saudi-coffee-with-dates': 'Saudi Arabian', 'khubani-ka-meetha': 'Hyderabadi', maamoul: 'Middle Eastern',
  'tomato-khejur-chutney': 'Bengali', 'deglet-nour-orange-salad': 'Moroccan', 'homemade-date-paste': 'Middle Eastern'
};

const PUBLISHED = '2026-11-18';

/* "10 min, plus 2 hours soaking" -> { active: 10, extra: 120 }; "No cooking" -> { active: 0, extra: 0 } */
function minutes(text) {
  const t = String(text || '').toLowerCase();
  const first = t.split(',')[0];
  const num = (s) => {
    let m = 0;
    s.replace(/(\d+(?:\.\d+)?)\s*(hours?|hrs?|min)/g, (_, n, u) => { m += parseFloat(n) * (u.startsWith('h') ? 60 : 1); });
    return m;
  };
  let active = num(first);
  let extra = num(t) - active;
  if (/overnight/.test(t)) extra += 8 * 60;
  return { active: Math.round(active), extra: Math.round(extra) };
}
const iso = (m) => 'PT' + (m >= 60 ? Math.floor(m / 60) + 'H' : '') + (m % 60 || m === 0 ? (m % 60) + 'M' : '');

const strip = (s) => String(s || '').replace(/\*/g, '').replace(/\s+/g, ' ').trim();
const abs = (site, rel) => site.domain + '/' + rel;

function organization(site) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': site.domain + '/#organization',
    name: 'Zunera',
    url: site.domain + '/',
    logo: abs(site, 'assets/brand/zunera-logo-180.png'),
    description: site.description,
    sameAs: [site.social.instagram],
    parentOrganization: { '@type': 'Organization', name: site.legal.company, url: 'https://' + site.contact.website },
    contactPoint: [{
      '@type': 'ContactPoint', contactType: 'customer service', telephone: '+' + site.contact.whatsapp,
      email: site.contact.email, areaServed: 'IN', availableLanguage: ['English', 'Hindi']
    }]
  };
}

function website(site) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': site.domain + '/#website',
    name: 'Zunera',
    url: site.domain + '/',
    publisher: { '@id': site.domain + '/#organization' },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: site.domain + '/search.html?q={search_term_string}' },
      'query-input': 'required name=search_term_string'
    }
  };
}

function breadcrumbs(site, trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t[0], item: abs(site, t[1]) }))
  };
}

function product(site, p, categoryLabel) {
  const j = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: strip(p.short + ' ' + p.description),
    url: abs(site, 'products/' + p.slug + '.html'),
    brand: { '@type': 'Brand', name: 'Zunera' },
    category: categoryLabel
  };
  if (p.image) j.image = [abs(site, p.image)];
  if (COUNTRY[p.origin]) j.countryOfOrigin = { '@type': 'Country', name: COUNTRY[p.origin] };
  return j;
}

function recipe(site, r, products) {
  const prep = minutes(r.prep), cook = minutes(r.cook);
  const names = r.products.map((s) => (products.find((p) => p.slug === s) || {}).name).filter(Boolean);
  const j = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: r.name,
    description: r.intro,
    url: abs(site, 'recipes/' + r.slug + '.html'),
    author: { '@type': 'Organization', name: 'Zunera', url: site.domain + '/' },
    publisher: { '@id': site.domain + '/#organization' },
    datePublished: r.published || PUBLISHED,
    prepTime: iso(prep.active),
    cookTime: iso(cook.active),
    totalTime: iso(prep.active + cook.active + prep.extra + cook.extra),
    recipeYield: r.serves,
    recipeCategory: r.category,
    keywords: [r.name].concat(names).join(', '),
    recipeIngredient: r.ingredients.filter((x) => !/:$/.test(x)),
    recipeInstructions: r.steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, text: s }))
  };
  if (r.image) j.image = [abs(site, r.image)];
  if (CUISINE[r.slug]) j.recipeCuisine = CUISINE[r.slug];
  if (r.sources && r.sources.length) j.isBasedOn = r.sources.map((s) => s.url);
  return j;
}

/* The search index: one small record per page, loaded by the browser only when someone searches */
function searchIndex(site, products, recipes) {
  const cat = (id) => (site.categories.find((c) => c.id === id) || {}).label || '';
  const rows = [];
  products.forEach((p) => rows.push({
    t: p.name, u: 'products/' + p.slug + '.html', k: cat(p.category), d: p.short,
    x: [p.origin, p.description, Object.values(p.notes).join(' '), ALIASES[p.slug] || '', p.category === 'dates' ? ALIASES.dates : ''].join(' ')
  }));
  recipes.forEach((r) => rows.push({
    t: r.name, u: 'recipes/' + r.slug + '.html', k: 'Recipe', d: r.intro,
    x: [r.category, r.ingredients.join(' '), r.products.map((s) => (products.find((p) => p.slug === s) || {}).name || '').join(' '), r.products.map((s) => ALIASES[s] || '').join(' ')].join(' ')
  }));
  [
    ['Shop the range', 'shop.html', 'All Zunera dates, nuts and dried fruit.', 'buy products range amazon'],
    ['Recipes', 'recipes.html', 'Recipes made with Zunera dates and dry fruits.', 'cook kitchen blog'],
    ['Corporate gifting', 'gifting.html', 'Custom date and dry fruit gift boxes for companies.', 'gift box corporate diwali eid wedding logo hamper'],
    ['Trade & bulk', 'trade.html', 'Bulk cartons and retail-ready packs for businesses.', 'wholesale bulk carton b2b retailer distributor'],
    ['Our story', 'about.html', 'How Zunera sources, imports, sorts and packs.', 'about company foodsy exports'],
    ['Contact us', 'contact.html', 'WhatsApp, phone and email.', 'phone whatsapp email address call fssai gst'],
    ['Enquiry form', 'enquiry.html', 'Send a trade, bulk or gifting enquiry.', 'quote price enquiry order'],
    ['Privacy policy', 'privacy.html', 'How we handle your information.', 'privacy data personal information']
  ].forEach((p) => rows.push({ t: p[0], u: p[1], k: 'Page', d: p[2], x: p[3] }));
  return rows.map((r) => Object.assign(r, { x: strip(r.x) }));
}

module.exports = { organization, website, breadcrumbs, product, recipe, searchIndex, minutes, iso };
