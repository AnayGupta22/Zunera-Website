/* Every page of the site. Copy lives right here in plain text: edit it, then run `node build.js`.
   Headings use *stars* around the ONE word that takes the Playfair italic accent. */

const { esc, hl, icon, go, ext, banner, tagline, processStrip, followPill, ruled, slot, sparkle } = require('./layout');
const { fruit, icon2, stamp, burst } = require('./art');

/* ---------- shared pieces ---------- */

const CREAM = '#FBE5C1', INK = '#2D301C';
const tone = (p) => `--c:${p.color};--on:${p.on === 'cream' ? CREAM : INK};--on-soft:${p.on === 'cream' ? 'rgba(251,229,193,.82)' : 'rgba(45,48,28,.8)'}`;
const no = (n) => (n < 10 ? '0' : '') + n;

const card = (p, root, products) => `
<a class="pc reveal" href="${root}products/${p.slug}.html" data-cat="${p.category}" style="${tone(p)}">
  <span class="pc-top"><span class="pc-origin">${esc(p.origin)}</span><span class="pc-no">${no(products.indexOf(p) + 1)}</span></span>
  ${products.every((x) => x.image)
    ? `<span class="pc-photo"><img src="${root}${p.image}" alt="${esc(p.imageAlt)}" loading="lazy">${fruit(p.slug)}</span>`
    : `<span class="pc-art">${fruit(p.slug)}</span>`}
  <span class="pc-name">${hl(p.title)}</span>
  <span class="pc-short">${esc(p.short)}</span>
  <span class="pc-cta">View ${go}</span>
</a>`;

const journey = (site, lead, extra = '') => `
<section class="sec bg-olive journey scallop" id="journey">
  <div class="wrap">
    <header class="journey-head">
      ${ruled('HOW IT COMES *together*', 'h2', 'on-dark reveal')}
      <p class="lead reveal">${esc(lead)}</p>
    </header>
    <ol class="stops">
      ${site.steps.map((s, i) => `<li class="stop reveal"><span class="stop-disc">${icon2(s.icon)}</span><em>${no(i + 1)}</em><strong>${esc(s.title)}</strong><span>${esc(s.body)}</span></li>`).join('')}
    </ol>
    ${extra}
  </div>
</section>`;

const tradeBand = (root) => `
<section class="sec bg-plum band scallop">
  <div class="wrap band-row">
    <div class="band-copy">
      <p class="eyebrow">Trade &amp; bulk</p>
      <h2 class="h1">${hl('BUYING FOR A *business?*')}</h2>
      <p class="lead">Bulk packs, retail-ready packs and gifting programmes. Our trade desk replies within one working day.</p>
      <div class="btn-row">
        <a class="btn btn-saffron btn-lg" href="${root}enquiry.html?type=trade">Send an enquiry ${go}</a>
        <a class="btn btn-outline-light btn-lg" href="${root}trade.html">How we supply</a>
      </div>
    </div>
    <div class="band-art">${icon2('pack', 'band-box')}${icon2('supply', 'band-truck')}${burst('Reply in', '1 working day', 'burst-saffron')}</div>
  </div>
</section>`;

const pile = (slugs) => `<div class="pile" aria-hidden="true">${slugs.map((s, i) => fruit(s, 'pile-' + i)).join('')}${sparkle('sp sp-a')}${sparkle('sp sp-b')}</div>`;

const pageHero = ({ bg = 'bg-sand', eyebrow, title, lead, extra = '', art = '' }) => `
<section class="sec phero ${bg}">
  <div class="wrap phero-grid">
    <div>
      <p class="eyebrow reveal">${esc(eyebrow)}</p>
      <h1 class="mega reveal">${hl(title)}</h1>
      <p class="lead reveal">${esc(lead)}</p>
      ${extra}
    </div>
    <div class="phero-art reveal">${art}</div>
  </div>
</section>`;

/* ---------- home ---------- */

function home({ site, products, recipes, root }) {
  const bySlug = (s) => products.find((p) => p.slug === s);
  /* The home page shows the highlights listed in content/site.json; the full range lives on the shop page */
  const picks = (site.highlights || []).map(bySlug).filter(Boolean);
  const marquee = ['Sourced at origin', 'Sorted by hand', 'Packed with care', 'Delivered by Amazon'].map((t) => `<span>${t}</span>${icon('diamond', 'dia')}`).join('');
  const momentColor = { morning: '#E2A93B', chai: '#A84E33', gifting: '#6E3B4E', kitchen: '#AEBB6E' };
  const momentOn = { morning: INK, chai: CREAM, gifting: CREAM, kitchen: INK };
  const hotspots = [[22, 30, '5 kg gift box'], [62, 22, '10 kg gift box'], [87, 60, '200 g pouch'], [30, 70, 'Hand-packed tray']];

  return `
<section class="sec bg-sand hero">
  ${sparkle('sp hero-sp-a')}${sparkle('sp hero-sp-b')}${sparkle('sp hero-sp-c')}
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <div class="reveal">${banner('Dry fruits & dates')}</div>
      <h1 class="mega reveal">${hl('FROM ORIGIN TO *your* TABLE.')}</h1>
      <p class="lead reveal">We source dates and dry fruits where they grow best, bring them to India, then sort and pack every lot ourselves.</p>
      <div class="btn-row reveal">
        <a class="btn btn-primary btn-lg" href="${root}shop.html">Explore the range ${go}</a>
        <a class="btn btn-cream btn-lg" href="${root}trade.html">Trade &amp; bulk</a>
      </div>
    </div>
    <div class="stage-wrap reveal">
      <div class="stage" data-stage>
        ${picks.map((p, i) => `
        <a class="slide${i === 0 ? ' on' : ''}" href="${root}products/${p.slug}.html" style="${tone(p)}" data-slide${i ? ' tabindex="-1" aria-hidden="true"' : ''}>
          <span class="slide-word" aria-hidden="true">${esc(p.name.split(' ')[0])}</span>
          <span class="slide-top"><span class="pc-origin">Sourced from ${esc(p.origin)}</span></span>
          <span class="slide-art">${fruit(p.slug)}</span>
          <span class="slide-foot"><span class="slide-name">${hl(p.title)}</span><span class="slide-short">${esc(p.short)}</span></span>
        </a>`).join('')}
        <div class="stage-ui">
          <span class="stage-count"><b data-stage-now>01</b> / ${no(picks.length)}</span>
          <button type="button" class="round" data-stage-prev aria-label="Previous product">${icon('chevron', 'flip')}</button>
          <button type="button" class="round" data-stage-next aria-label="Next product">${icon('chevron')}</button>
        </div>
      </div>
      ${stamp('st-hero', 'ROOTED IN SOURCING ◆ DRIVEN BY QUALITY ◆ ', root, 'stage-stamp')}
    </div>
  </div>
</section>

<div class="marquee" aria-hidden="true"><div class="marquee-track">${marquee}${marquee}${marquee}${marquee}${marquee}${marquee}</div></div>

<section class="sec bg-cream range" id="range">
  <div class="wrap">
    <header class="sec-head">
      <div>
        <p class="eyebrow reveal">Highlights</p>
        <h2 class="h1 reveal">${hl('A FEW *favourites.*')}</h2>
      </div>
      <div class="shelf-nav reveal">
        <p class="lead">Start with these, then explore the full range of dates and dry fruits.</p>
        <button type="button" class="round" data-shelf-prev aria-label="Scroll range left">${icon('chevron', 'flip')}</button>
        <button type="button" class="round" data-shelf-next aria-label="Scroll range right">${icon('chevron')}</button>
      </div>
    </header>
  </div>
  <div class="shelf" data-shelf>
    ${picks.map((p) => card(p, root, picks)).join('')}
    <a class="pc pc-amazon pc-all reveal" href="${root}shop.html">
      <span class="pc-top"><span class="pc-origin">The full range</span></span>
      <span class="pc-art">${burst('See the', 'range')}</span>
      <span class="pc-name">${hl('THE WHOLE *range*')}</span>
      <span class="pc-short">Every date and dry fruit we carry, in one place.</span>
      <span class="pc-cta">Go to the shop ${go}</span>
    </a>
  </div>
  <div class="wrap"><div class="btn-row center-row reveal"><a class="btn btn-primary btn-lg" href="${root}shop.html">See the full range ${go}</a></div></div>
</section>

<section class="sec bg-sand packs">
  <div class="wrap packs-grid">
    <div class="packs-copy">
      <p class="eyebrow reveal">The packs</p>
      <h2 class="h1 reveal">${hl('BIG BOXES, SMALL *pouches.*')}</h2>
      <p class="lead reveal">Gift boxes in gold and green for the days that matter, and pouches for every other day. Every pack is designed in-house and filled by hand.</p>
      <a class="btn btn-primary reveal" href="${esc(site.amazonStore)}" target="_blank" rel="noopener">Shop on Amazon ${ext}</a>
    </div>
    <figure class="hotshot reveal">
      <img src="${root}assets/img/range.jpg" alt="Zunera date gift boxes in gold and green, two pouches and an open tray of dates on a marble counter" width="1600" height="1073" loading="lazy">
      ${hotspots.map((h) => `<span class="hot${h[0] > 70 ? ' hot-r' : ''}" style="left:${h[0]}%;top:${h[1]}%"><i></i><b>${esc(h[2])}</b></span>`).join('')}
    </figure>
  </div>
</section>

${journey(site, "Quality isn't just about what's inside the pack. It is every step between the orchard and your shelf, and we handle each one ourselves.")}

<section class="sec bg-peach moments scallop">
  <div class="wrap">
    <header class="sec-head center">
      <p class="eyebrow reveal">Find your pick</p>
      <h2 class="h1 reveal">${hl('A HANDFUL FOR EVERY *moment.*')}</h2>
    </header>
    <div class="mtiles reveal" role="tablist" aria-label="Moments">
      ${site.moments.map((m, i) => `<button role="tab" type="button" class="mtile" id="tab-${m.id}" aria-controls="panel-${m.id}" aria-selected="${i === 0}" data-moment="${m.id}" style="--c:${momentColor[m.id]};--on:${momentOn[m.id]}">${icon2(m.icon)}<span>${esc(m.label)}</span></button>`).join('')}
    </div>
    ${site.moments.map((m, i) => `
    <div class="moment-panel" role="tabpanel" id="panel-${m.id}" aria-labelledby="tab-${m.id}"${i ? ' hidden' : ''}>
      <p class="moment-line">“${esc(m.line)}”</p>
      <div class="picks">
        ${m.products.map(bySlug).filter(Boolean).map((p) => `
        <a class="pick" href="${root}products/${p.slug}.html" style="${tone(p)}">
          <span class="pick-art">${fruit(p.slug)}</span>
          <span class="pick-text"><strong>${esc(p.name)}</strong><small>${esc(p.short)}</small></span>
          ${go}
        </a>`).join('')}
      </div>
    </div>`).join('')}
  </div>
</section>

<section class="sec bg-terra band scallop">
  <div class="wrap band-row">
    <div class="band-copy">
      <p class="eyebrow">Corporate gifting</p>
      <h2 class="h1">${hl('GIFTS, BUILT FROM *scratch.*')}</h2>
      <p class="lead">Custom boxes, your logo, your choice of dates and dry fruits, and a personal note. Delivered across India.</p>
      <div class="btn-row">
        <a class="btn btn-saffron btn-lg" href="${root}gifting.html">Explore gifting ${go}</a>
        <a class="btn btn-outline-light btn-lg" href="${root}enquiry.html?type=gifting">Send a gifting enquiry</a>
      </div>
    </div>
    <div class="band-art">${icon2('gifting', 'band-box')}${icon2('tag', 'band-truck')}${burst('Fully', 'custom', 'burst-saffron')}</div>
  </div>
</section>

<section class="sec bg-sand scallop">
  <div class="wrap">
    <header class="sec-head">
      <div><p class="eyebrow reveal">Recipes</p><h2 class="h1 reveal">${hl('FROM THE *kitchen.*')}</h2></div>
      <a class="btn btn-cream reveal" href="${root}recipes.html">All recipes ${go}</a>
    </header>
    <div class="grid three">${(recipes || []).slice(0, 3).map((r) => recipeCard(r, root)).join('')}</div>
  </div>
</section>

${tradeBand(root)}

<section class="sec bg-cream insta scallop">
  <div class="wrap">
    <header class="sec-head">
      <div>
        <p class="eyebrow reveal">Follow along</p>
        <h2 class="h1 reveal">${hl('MEET THE *brand.*')}</h2>
      </div>
      <div class="reveal">${followPill(site)}</div>
    </header>
  </div>
  <div class="insta-row">
    ${(site.instagramPosts && site.instagramPosts.length
      ? site.instagramPosts
      : [1, 2, 3, 4, 5].map((n) => ({ src: `assets/social/post-${n}.jpg`, link: site.social.instagram, alt: `Zunera Instagram post ${n} of 5` }))
    ).map((p) => `<a class="post reveal" href="${esc(p.link)}" target="_blank" rel="noopener"><img src="${root}${esc(p.src)}" alt="${esc(p.alt)}" loading="lazy" width="808" height="1080">${p.video ? '<span class="post-play" aria-label="Video"></span>' : ''}</a>`).join('')}
  </div>
</section>`;
}

/* ---------- shop ---------- */

function shop({ site, products, root }) {
  const filters = `
    <div class="filters reveal" role="group" aria-label="Filter products">
      <button type="button" class="chip-btn" aria-pressed="true" data-filter="all">All</button>
      ${site.categories.map((c) => `<button type="button" class="chip-btn" aria-pressed="false" data-filter="${c.id}">${esc(c.label)}</button>`).join('')}
    </div>`;
  return `
${pageHero({ eyebrow: 'The range', title: 'CHOSEN AT ORIGIN, PACKED FOR *you.*', lead: 'Dates from across the Gulf, Iran and Tunisia, and dry fruits for every day, each sorted and checked by hand. Pick one to see tasting notes and pack sizes, then buy it on Amazon.', extra: filters, art: pile(['almonds', 'figs', 'apricots']) })}
<section class="sec bg-cream tight scallop">
  <div class="wrap">
    <div class="grid" data-shop-grid>
      ${products.map((p) => card(p, root, products)).join('')}
    </div>
    <p class="fineprint center">Zunera is sold online through Amazon. Prices, delivery and checkout are shown on each Amazon listing.</p>
  </div>
</section>`;
}

/* ---------- product ---------- */

function product({ site, products, recipes = [], root, p }) {
  const i = products.indexOf(p);
  const cookWith = recipes.filter((r) => r.products.includes(p.slug));
  const more = [1, 2, 3].map((n) => products[(i + n) % products.length]);
  const noteTones = ['#E2A93B', '#AEBB6E', '#F0C9A8'];
  const facts = `<dl class="facts reveal">
          <div><dt>Storage</dt><dd>${esc(p.storage)}</dd></div>
        </dl>`;
  const photo = p.image
    ? `<figure class="taped"><img src="${root}${p.image}" alt="${esc(p.imageAlt)}" width="900" height="800" loading="lazy"></figure>`
    : `<div class="taped">${slot(p.name + ' pack shot', p.photoBrief)}</div>`;
  return `
<section class="sec pdp" style="${tone(p)}">
  <span class="pdp-word" aria-hidden="true">${esc(p.name.split(' ')[0])}</span>
  <div class="wrap pdp-grid">
    <div class="pdp-copy">
      <nav class="crumbs reveal" aria-label="Breadcrumb"><a href="${root}shop.html">Shop</a>${icon('chevron', 'crumb-chev')}<span>${esc(p.name)}</span></nav>
      <p class="pc-origin reveal">Sourced from ${esc(p.origin)}</p>
      <h1 class="mega reveal">${hl(p.title)}</h1>
      <p class="pdp-short reveal">${esc(p.short)}</p>
      <p class="lead reveal">${esc(p.description)}</p>
      <div class="sizes reveal"><span class="eyebrow">Pack sizes</span>${p.sizes.map((s) => `<span class="tag">${esc(s)}</span>`).join('')}</div>
      <div class="btn-row reveal">
        <a class="btn btn-cream btn-lg" href="${esc(p.amazon)}" target="_blank" rel="noopener">Buy on Amazon ${ext}</a>
        <a class="btn btn-on btn-lg" href="${root}enquiry.html?type=trade&amp;product=${p.slug}">Bulk enquiry</a>
      </div>
      <p class="fineprint reveal">Price, delivery and checkout are on Amazon.</p>
    </div>
    <div class="pdp-art reveal">
      ${sparkle('sp sp-a')}${sparkle('sp sp-b')}
      ${p.image
        ? `<figure class="pdp-photo"><img src="${root}${p.image}" alt="${esc(p.imageAlt)}" width="900" height="800"></figure>${fruit(p.slug, 'sticker')}`
        : fruit(p.slug, 'float')}
      ${stamp('st-pdp', esc(`SOURCED FROM ${p.origin.toUpperCase()} ◆ PACKED WITH CARE ◆ `), root, 'pdp-stamp')}
      ${p.badge ? burst(esc(p.badge.split(' ')[0]), esc(p.badge.split(' ').slice(1).join(' ')), 'burst-cream pdp-burst') : ''}
    </div>
  </div>
</section>

<section class="sec bg-cream notes-sec scallop">
  <div class="wrap">
    <div class="notes">
      ${Object.keys(p.notes).map((k, n) => `<div class="note reveal" style="--c:${noteTones[n % 3]}"><p class="note-label">${esc(k)}</p><p>${esc(p.notes[k])}</p></div>`).join('')}
    </div>
    ${p.image ? `<div class="enjoy-grid solo">
      <div>
        ${ruled('HOW TO *enjoy*', 'h2', 'reveal')}
        <ol class="enjoy-list">
          ${p.enjoy.map((e, n) => `<li class="reveal"><em>${no(n + 1)}</em><span>${esc(e)}</span></li>`).join('')}
        </ol>
      </div>
      ${facts}
    </div>` : `<div class="enjoy-grid">
      <div>
        ${ruled('HOW TO *enjoy*', 'h2', 'reveal')}
        <ol class="enjoy-list">
          ${p.enjoy.map((e, n) => `<li class="reveal"><em>${no(n + 1)}</em><span>${esc(e)}</span></li>`).join('')}
        </ol>
        ${facts}
      </div>
      <div class="reveal"><div class="taped">${slot(p.name + ' photo', p.photoBrief)}</div></div>
    </div>`}
  </div>
</section>
${cookWith.length ? `
<section class="sec bg-peach scallop">
  <div class="wrap">
    <header class="sec-head">
      <div><p class="eyebrow reveal">Recipes</p><h2 class="h1 reveal">${hl('COOK WITH *it.*')}</h2></div>
      <a class="btn btn-cream reveal" href="${root}recipes.html">All recipes ${go}</a>
    </header>
    <div class="grid three">${cookWith.map((r) => recipeCard(r, root)).join('')}</div>
  </div>
</section>` : ''}

<section class="sec bg-sand tight more scallop">
  <div class="wrap">
    <header class="sec-head">
      <h2 class="h1 reveal">${hl('ALSO FROM THE *range.*')}</h2>
      <a class="btn btn-cream reveal" href="${root}shop.html">See all ${go}</a>
    </header>
    <div class="grid three">${more.map((m) => card(m, root, products)).join('')}</div>
  </div>
</section>
<div class="buybar" data-buybar>
  <span><strong>${esc(p.name)}</strong><small>${esc(p.sizes[0])}${p.sizes.length > 1 ? ' and more' : ''}</small></span>
  <a class="btn btn-saffron btn-sm" href="${esc(p.amazon)}" target="_blank" rel="noopener">Buy on Amazon ${ext}</a>
</div>`;
}

/* ---------- about ---------- */

function about({ site, root }) {
  const values = [
    ['Rooted in sourcing.', 'We choose origins first and products second. Ajwa dates from Saudi Arabia are where we began.', '#E2A93B', 'source'],
    ['Driven by quality.', 'Every lot is sorted and checked by hand before it is packed. If we would not serve it, we do not ship it.', '#AEBB6E', 'quality'],
    ['Built for India.', 'Formats, sizes and packaging made for Indian homes, festivals and businesses.', '#F0C9A8', 'pack']
  ];
  return `
${pageHero({ bg: 'bg-olive', eyebrow: 'Our story', title: 'WE BUILD PRODUCTS, NOT JUST *supply* THEM.', lead: 'From trusted origins to the Indian market, we carefully import, sort, pack and supply quality dry fruits and dates.', art: pile(['ajwa-dates', 'pistachios', 'raisins']) })}

<section class="sec bg-sand scallop">
  <div class="wrap story">
    <div class="story-photos reveal">
      <figure class="polaroid pol-a"><img src="${root}assets/img/flatlay.jpg" alt="Bowls of almonds, pistachios, raisins, figs and dates beside a gold Zunera dates box" loading="lazy" width="1600" height="1073"><figcaption>Sorted lot by lot</figcaption></figure>
      <figure class="polaroid pol-b"><img src="${root}assets/img/gift-boxes.jpg" alt="Gold and green Zunera date gift boxes on travertine" loading="lazy" width="1400" height="939"><figcaption>Packed in-house</figcaption></figure>
    </div>
    <div class="story-copy">
      <p class="eyebrow reveal">Why we exist</p>
      <h2 class="h1 reveal">${hl('WE BRING THE SOURCE *closer.*')}</h2>
      <p class="reveal">Good dates and dry fruits are decided long before they are packed. They are decided at the source: which orchard, which harvest, which grade.</p>
      <p class="reveal">So that is where we start. We select at origin, import directly, and every lot is sorted, graded and packed before it reaches you.</p>
      <p class="reveal">The packaging is designed in-house too, because quality isn't just about what's inside the pack.</p>
    </div>
  </div>
</section>

<section class="sec bg-cream scallop">
  <div class="wrap">
    <header class="sec-head"><div><p class="eyebrow reveal">What we stand on</p><h2 class="h1 reveal">${hl('THREE *promises.*')}</h2></div></header>
    <div class="vcards">
      ${values.map((v, i) => `<div class="vcard reveal" style="--c:${v[2]}"><span class="vcard-top"><em>${no(i + 1)}</em>${icon2(v[3])}</span><h3>${esc(v[0])}</h3><p>${esc(v[1])}</p></div>`).join('')}
    </div>
  </div>
</section>


<section class="sec bg-cocoa coords scallop">
  <div class="wrap coords-grid">
    <div>
      <p class="eyebrow reveal">How it is packed</p>
      <p class="coords-num reveal">Sorted. Graded. Sealed.</p>
      <p class="lead reveal">Zunera is packed at units across India, and every pack is sorted, graded and sealed to the same standard.</p>
      <a class="btn btn-saffron reveal" href="${root}contact.html">Get in touch ${go}</a>
    </div>
    <div class="reveal">${site.hasFloorPhoto
      ? `<figure class="taped taped-wide"><img src="${root}assets/img/packing-floor.jpg" alt="A Zunera sorting and packing floor" loading="lazy"></figure>`
      : `<div class="taped">${slot('The packing floor', 'A real photograph of a Zunera sorting and packing floor: the team hand-sorting dates, Zunera cartons stacked behind. Warm daylight. Landscape 3:2. Use a real photo here, not a generated one.', 'slot-wide')}</div>`}</div>
  </div>
</section>`;
}

/* ---------- trade ---------- */

function trade({ site, products, root }) {
  const supply = [
    ['Bulk packs', 'Printed cartons for wholesale and kitchens. Clearly labelled, built to stack and travel.', '#E2A93B', 'pack'],
    ['Retail-ready packs', 'Pouches and boxes designed in-house, ready for your shelf or counter.', '#AEBB6E', 'quality'],
    ['Gifting programmes', 'Gift boxes for festivals, weddings and corporate orders.', '#F0C9A8', 'gifting']
  ];
  const who = ['Retailers', 'Wholesalers & distributors', 'Hotels, restaurants & caterers', 'Sweet makers & bakeries', 'Corporate gifting teams'];
  return `
<section class="sec bg-sand phero trade-hero">
  <div class="wrap trade-hero-grid">
    <div>
      <p class="eyebrow reveal">Trade &amp; bulk</p>
      <h1 class="mega reveal">${hl('BULK PACK FOR *trade.*')}</h1>
      <p class="lead reveal">We import, sort and pack dates and dry fruits for partners who need consistent grades and dependable supply.</p>
      <div class="btn-row reveal">
        <a class="btn btn-primary btn-lg" href="${root}enquiry.html?type=trade">Send a trade enquiry ${go}</a>
        <a class="btn btn-cream btn-lg" href="https://wa.me/${esc(site.contact.whatsapp)}" target="_blank" rel="noopener">WhatsApp us</a>
      </div>
    </div>
    <div class="carton-stack reveal">
      <img class="carton-a" src="${root}assets/carton/carton-front.jpg" alt="Front panel of the Zunera bulk carton" width="2000" height="1359">
      <img class="carton-b" src="${root}assets/carton/carton-side-contact.jpg" alt="Side panel of the Zunera bulk carton with FSSAI, GST and contact details" width="1000" height="1359" loading="lazy">
      ${burst('Bulk', 'pack', 'burst-terra carton-burst')}
    </div>
  </div>
</section>

<section class="sec bg-cream scallop">
  <div class="wrap">
    <header class="sec-head">
      <div><p class="eyebrow reveal">What we supply</p><h2 class="h1 reveal">${hl('THREE FORMATS, ONE *source.*')}</h2></div>
      <p class="lead reveal">Tell us what you sell and how you sell it. We will suggest the format that suits the product and the purpose.</p>
    </header>
    <div class="vcards">
      ${supply.map((s, i) => `<div class="vcard reveal" style="--c:${s[2]}"><span class="vcard-top"><em>${no(i + 1)}</em>${icon2(s[3])}</span><h3>${esc(s[0])}</h3><p>${esc(s[1])}</p></div>`).join('')}
    </div>
  </div>
</section>

<section class="sec bg-olive tight whoband scallop">
  <div class="wrap whoband-grid">
    <div class="reveal">
      <p class="eyebrow">Who we work with</p>
      <ul class="who-list">${who.map((w) => `<li>${esc(w)}</li>`).join('')}</ul>
    </div>
    <div class="reveal">
      <p class="eyebrow">One team, origin to dispatch</p>
      ${processStrip(site.steps, 'strip-lg')}
      <p class="lead">Each step is handled in-house, so the grade you approve is the grade you receive. <a class="inline-link" href="${root}index.html#journey">See how it comes together</a></p>
    </div>
  </div>
</section>

<section class="sec bg-sand scallop">
  <div class="wrap">
    <header class="sec-head"><div><p class="eyebrow reveal">Available for trade</p><h2 class="h1 reveal">${hl('THE *range.*')}</h2></div></header>
    <div class="table-card reveal">
      <table class="trade-table">
        <thead><tr><th>Product</th><th>Origin</th><th>Retail packs</th><th>Bulk</th><th><span class="sr">Enquire</span></th></tr></thead>
        <tbody>
          ${products.map((p) => `<tr>
            <td><a class="tt-name" href="${root}products/${p.slug}.html"><span class="tt-dot" style="${tone(p)}">${fruit(p.slug)}</span>${esc(p.name)}</a></td>
            <td>${esc(p.origin)}</td>
            <td>${p.sizes.map(esc).join(', ')}</td>
            <td>Carton, on enquiry</td>
            <td><a class="text-link" href="${root}enquiry.html?type=trade&amp;product=${p.slug}">Enquire ${go}</a></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div class="btn-row center-row reveal">
      <a class="btn btn-primary btn-lg" href="${root}enquiry.html?type=trade">Send a trade enquiry ${go}</a>
    </div>
  </div>
</section>`;
}

/* ---------- corporate gifting ---------- */

function gifting({ site, products, root }) {
  const bySlug = (s) => products.find((p) => p.slug === s);
  const wa = `https://wa.me/${esc(site.contact.whatsapp)}?text=${encodeURIComponent("Hi Zunera, I'd like to talk about corporate gifting.")}`;
  const custom = [
    ['Boxes from scratch', 'Want something new? We design and make a box just for you: size, colour, finish and inserts.', '#E2A93B', 'pack'],
    ['Our gift boxes', 'Or start with the gold and green Zunera gift boxes, ready to fill and send.', '#AEBB6E', 'gifting'],
    ['Your logo', 'Your company logo on the box, the sleeve or the seal.', '#F0C9A8', 'tag'],
    ['The mix', 'Choose what goes inside from our dates and dry fruits, in any combination.', '#E7C9A0', 'kitchen'],
    ['A personal note', 'A message card in every box, written your way.', '#E3A68C', 'note'],
    ['Pan-India delivery', 'Delivered to one office, or to many addresses across India.', '#B9C48A', 'supply']
  ];
  const occasions = ['Diwali', 'Eid', 'Raksha Bandhan', 'New Year', 'Weddings', 'Client thank-yous', 'Team milestones', 'Events & conferences'];
  const steps = [
    ['Share the brief', 'The occasion, how many gifts, your budget and the date you need them by.', 'note'],
    ['Pick the details', 'We come back with box, mix and design options for you to choose from.', 'quality'],
    ['We make and pack', 'Boxes are made, branded, filled and sealed.', 'pack'],
    ['We deliver', 'To one address or many, anywhere in India.', 'supply']
  ];
  const fill = ['ajwa-dates', 'medjool-dates', 'sukkari-rutab-dates', 'almonds', 'cashews', 'pistachios', 'walnut-kernels', 'figs', 'apricots'].map(bySlug).filter(Boolean);
  return `
${pageHero({ bg: 'bg-plum', eyebrow: 'Corporate gifting', title: 'GIFTS, BUILT FROM *scratch.*', lead: 'Date and dry fruit gift boxes for festivals, clients and teams. Start with one of our boxes, or have us make yours from the ground up: the box, the mix, the logo and the note.',
    extra: `<div class="btn-row reveal"><a class="btn btn-saffron btn-lg" href="${root}enquiry.html?type=gifting">Plan your gifts ${go}</a><a class="btn btn-outline-light btn-lg" href="${wa}" target="_blank" rel="noopener">WhatsApp us</a></div>`,
    art: `<figure class="taped gift-photo"><img src="${root}assets/img/gift-boxes.jpg" alt="Gold and green Zunera date gift boxes on travertine" width="1400" height="939"></figure>${burst('Fully', 'custom', 'burst-saffron gift-burst')}${sparkle('sp sp-a')}${sparkle('sp sp-b')}` })}

<section class="sec bg-cream scallop">
  <div class="wrap">
    <header class="sec-head">
      <div><p class="eyebrow reveal">Make it yours</p><h2 class="h1 reveal">${hl('EVERYTHING CAN BE *customised.*')}</h2></div>
      <p class="lead reveal">Change one detail or all of them. Tell us what you have in mind and we will build the gift around it.</p>
    </header>
    <div class="vcards">
      ${custom.map((s, i) => `<div class="vcard reveal" style="--c:${s[2]}"><span class="vcard-top"><em>${no(i + 1)}</em>${icon2(s[3])}</span><h3>${esc(s[0])}</h3><p>${esc(s[1])}</p></div>`).join('')}
    </div>
  </div>
</section>

<section class="sec bg-olive tight whoband scallop">
  <div class="wrap">
    <p class="eyebrow reveal">Made for</p>
    <ul class="who-list reveal">${occasions.map((o) => `<li>${esc(o)}</li>`).join('')}</ul>
  </div>
</section>

<section class="sec bg-sand scallop">
  <div class="wrap">
    <header class="sec-head"><div><p class="eyebrow reveal">How it works</p><h2 class="h1 reveal">${hl('FROM BRIEF TO *doorstep.*')}</h2></div></header>
    <ol class="gsteps">
      ${steps.map((s, i) => `<li class="reveal"><span class="stop-disc">${icon2(s[2])}</span><em>${no(i + 1)}</em><strong>${esc(s[0])}</strong><span>${esc(s[1])}</span></li>`).join('')}
    </ol>
  </div>
</section>

<section class="sec bg-peach scallop">
  <div class="wrap">
    <header class="sec-head center"><p class="eyebrow reveal">What goes inside</p><h2 class="h1 reveal">${hl('FILL IT WITH THE *good stuff.*')}</h2></header>
    <div class="picks">
      ${fill.map((p) => `
      <a class="pick reveal" href="${root}products/${p.slug}.html" style="${tone(p)}">
        <span class="pick-art">${fruit(p.slug)}</span>
        <span class="pick-text"><strong>${esc(p.name)}</strong><small>${esc(p.short)}</small></span>
        ${go}
      </a>`).join('')}
    </div>
    <div class="btn-row center-row reveal"><a class="btn btn-cream btn-lg" href="${root}shop.html">See the whole range ${go}</a></div>
  </div>
</section>

<section class="sec bg-terra band scallop">
  <div class="wrap band-row">
    <div class="band-copy">
      <p class="eyebrow">Corporate gifting</p>
      <h2 class="h1">${hl("TELL US WHAT YOU'RE *planning.*")}</h2>
      <p class="lead">Share the occasion, the numbers and the date. Our team replies within one working day.</p>
      <div class="btn-row">
        <a class="btn btn-saffron btn-lg" href="${root}enquiry.html?type=gifting">Send a gifting enquiry ${go}</a>
        <a class="btn btn-outline-light btn-lg" href="${wa}" target="_blank" rel="noopener">WhatsApp us</a>
      </div>
    </div>
    <div class="band-art">${icon2('gifting', 'band-box')}${icon2('note', 'band-truck')}${burst('Reply in', '1 working day', 'burst-saffron')}</div>
  </div>
</section>`;
}

/* ---------- recipes ---------- */

const recipeArt = (r, cls = '') => `<span class="rc-art ${cls}">${r.products.slice(0, 3).map((s) => fruit(s)).join('')}</span>`;

/* cls: '' for a normal card, ' rc-feature' for the large lead card, ' rc-feature rc-wide' for a full-width card */
const recipeCard = (r, root, cls = '') => `
<a class="pc rc reveal${cls}" href="${root}recipes/${r.slug}.html" data-cat="${esc(r.category.toLowerCase())}" style="${tone(r)}">
  <span class="pc-top"><span class="pc-origin">${esc(r.category)}</span><span class="rc-time">${esc(r.prep.split(',')[0])}</span></span>
  ${recipeArt(r)}
  <span class="rc-body">
    <span class="pc-name">${hl(r.title)}</span>
    <span class="pc-short">${esc(r.intro)}</span>
    <span class="pc-cta">Read the recipe ${go}</span>
  </span>
</a>`;

function recipes({ recipes, root }) {
  const cats = [...new Set(recipes.map((r) => r.category))];
  const filters = `
    <div class="filters reveal" role="group" aria-label="Filter recipes">
      <button type="button" class="chip-btn" aria-pressed="true" data-filter="all">All</button>
      ${cats.map((c) => `<button type="button" class="chip-btn" aria-pressed="false" data-filter="${esc(c.toLowerCase())}">${esc(c)}</button>`).join('')}
    </div>`;
  return `
${pageHero({ bg: 'bg-peach', eyebrow: 'Recipes', title: 'COOK WITH *Zunera.*', lead: 'Simple recipes for everyday breakfasts, festive sweets and everything in between, all made with Zunera dates and dry fruits.', extra: filters, art: `<div class="phero-ico">${icon2('cook')}</div>${sparkle('sp sp-a')}${sparkle('sp sp-b')}` })}
<section class="sec bg-cream tight scallop">
  <div class="wrap">
    <div class="grid three rc-grid" data-shop-grid>
      ${recipes.map((r, i) => recipeCard(r, root, i === 0 ? ' rc-feature'
        : i === recipes.length - 1 && (recipes.length + 1) % 3 === 1 ? ' rc-feature rc-wide' : '')).join('')}
    </div>
  </div>
</section>`;
}

function recipe({ recipes, products, root, r }) {
  const bySlug = (s) => products.find((p) => p.slug === s);
  const used = r.products.map(bySlug).filter(Boolean);
  const i = recipes.indexOf(r);
  const more = [1, 2, 3].map((n) => recipes[(i + n) % recipes.length]).filter((x) => x !== r);
  return `
<section class="sec pdp recipe-hero" style="${tone(r)}">
  <span class="pdp-word" aria-hidden="true">${esc(r.category)}</span>
  <div class="wrap pdp-grid">
    <div class="pdp-copy">
      <nav class="crumbs reveal" aria-label="Breadcrumb"><a href="${root}recipes.html">Recipes</a>${icon('chevron', 'crumb-chev')}<span>${esc(r.name)}</span></nav>
      <p class="pc-origin reveal">${esc(r.category)}</p>
      <h1 class="mega reveal">${hl(r.title)}</h1>
      <p class="lead reveal">${esc(r.intro)}</p>
      <div class="sizes reveal">
        <span class="tag">Prep: ${esc(r.prep)}</span><span class="tag">Cook: ${esc(r.cook)}</span><span class="tag">${esc(r.serves)}</span>
      </div>
    </div>
    <div class="pdp-art reveal">
      ${sparkle('sp sp-a')}${sparkle('sp sp-b')}
      ${recipeArt(r, 'rc-art-lg float')}
    </div>
  </div>
</section>

<section class="sec bg-cream notes-sec scallop">
  <div class="wrap recipe-grid">
    <aside class="ingredients reveal">
      <h2 class="h2">${hl('YOU WILL *need*')}</h2>
      <ul>${r.ingredients.map((x) => `<li><label><input type="checkbox"><span>${esc(x)}</span></label></li>`).join('')}</ul>
      <p class="fineprint">Tick things off as you go.</p>
    </aside>
    <div>
      ${ruled('THE *method*', 'h2', 'reveal')}
      <ol class="enjoy-list">
        ${r.steps.map((s, n) => `<li class="reveal"><em>${no(n + 1)}</em><span>${esc(s)}</span></li>`).join('')}
      </ol>
      <div class="tipbox reveal"><strong>Good to know</strong><p>${esc(r.tip)}</p></div>
      <div class="reveal"><div class="taped">${slot(r.name + ' photo', r.photoBrief)}</div></div>
    </div>
  </div>
</section>

<section class="sec bg-peach scallop">
  <div class="wrap">
    <header class="sec-head center"><p class="eyebrow reveal">Made with</p><h2 class="h1 reveal">${hl('FROM THE *pantry.*')}</h2></header>
    <div class="picks">
      ${used.map((p) => `
      <a class="pick reveal" href="${root}products/${p.slug}.html" style="${tone(p)}">
        <span class="pick-art">${fruit(p.slug)}</span>
        <span class="pick-text"><strong>${esc(p.name)}</strong><small>${esc(p.short)}</small></span>
        ${go}
      </a>`).join('')}
    </div>
  </div>
</section>

<section class="sec bg-sand tight more scallop">
  <div class="wrap">
    <header class="sec-head">
      <h2 class="h1 reveal">${hl('MORE TO *cook.*')}</h2>
      <a class="btn btn-cream reveal" href="${root}recipes.html">All recipes ${go}</a>
    </header>
    <div class="grid three">${more.map((m) => recipeCard(m, root)).join('')}</div>
  </div>
</section>`;
}

/* ---------- forms ---------- */

const formAttrs = (site) => `data-enquiry data-wa="${esc(site.contact.whatsapp)}" data-email="${esc(site.contact.email)}" novalidate`;

const sendButtons = `
  <p class="form-error" data-form-error hidden><span class="err-dot" aria-hidden="true">!</span>Please add your name and a phone number or email so we can reply.</p>
  <div class="btn-row">
    <button class="btn btn-primary btn-lg" type="submit" data-send="whatsapp">Send on WhatsApp ${go}</button>
    <button class="btn btn-cream btn-lg" type="submit" data-send="email">Send by email</button>
  </div>
  <p class="fineprint">Sending opens WhatsApp or your email app with the message filled in. Nothing is stored on this website.</p>`;

function contact({ site, root }) {
  const c = site.contact;
  return `
${pageHero({ bg: 'bg-saffron', eyebrow: 'Contact us', title: "LET'S *talk.*", lead: 'A question about an order, a product or a partnership. We reply within one working day.', art: `<div class="phero-ico">${icon2('chai')}</div>${sparkle('sp sp-a')}${sparkle('sp sp-b')}` })}
<section class="sec bg-sand tight scallop">
  <div class="wrap contact-grid">
    <div class="panel reveal">
      <div class="info-block">
        <p class="info-label">Imported and Distributed by:</p>
        <p>${c.addressLines.map(esc).join('<br>')}</p>
      </div>
      <div class="info-block">
        <p class="info-label">Marketed by:</p>
        <p>Zunera (${esc(site.social.instagramHandle)})</p>
      </div>
      <ul class="contacts contacts-lg">
        <li><a href="https://wa.me/${esc(c.whatsapp)}" target="_blank" rel="noopener">${icon('phone')}<span>${esc(c.whatsappDisplay)}</span><small>WhatsApp</small></a></li>
        <li><a href="tel:${esc(c.phone2Link)}">${icon('phone')}<span>${esc(c.phone2)}</span><small>Call</small></a></li>
        <li><a href="mailto:${esc(c.email)}">${icon('mail')}<span>${esc(c.email)}</span></a></li>
        <li><a href="https://${esc(c.website)}" target="_blank" rel="noopener">${icon('globe')}<span>${esc(c.website)}</span></a></li>
      </ul>
      <p class="panel-note">${esc(c.hours)}</p>
      <div class="statutory"><span>FSSAI No. ${esc(site.legal.fssai)}</span><span>GST Number: ${esc(site.legal.gst)}</span></div>
      ${followPill(site, 'follow-cream')}
    </div>
    <form class="form reveal" ${formAttrs(site)} data-subject="Message from eatzunera.com">
      <h2 class="h2">${hl('SEND A *message.*')}</h2>
      <div class="field-row">
        <label class="field"><span>Your name</span><input type="text" name="Name" autocomplete="name" required></label>
        <label class="field"><span>Phone or WhatsApp</span><input type="tel" name="Phone" autocomplete="tel"></label>
      </div>
      <label class="field"><span>Email</span><input type="email" name="Email" autocomplete="email"></label>
      <label class="field"><span>How can we help?</span><textarea name="Message" rows="5"></textarea></label>
      ${sendButtons}
      <p class="fineprint">Buying in bulk? The <a href="${root}enquiry.html">enquiry form</a> asks the right questions.</p>
    </form>
  </div>
</section>`;
}

function enquiry({ site, products, root }) {
  const types = [['trade', 'Trade & bulk'], ['gifting', 'Corporate gifting'], ['retail', 'Retail & distribution'], ['general', 'Something else']];
  const qty = ['Not sure yet', 'Under 25 kg', '25 to 100 kg', '100 to 500 kg', '500 kg and above'];
  return `
${pageHero({ bg: 'bg-pistachio', eyebrow: 'Enquiry form', title: 'TELL US WHAT YOU *need.*', lead: 'Share a few details and our trade desk will come back with availability, formats and pricing within one working day.', art: `<div class="phero-ico">${icon2('pack')}</div>${sparkle('sp sp-a')}${sparkle('sp sp-b')}` })}
<section class="sec bg-sand tight scallop">
  <div class="wrap enquiry-grid">
    <form class="form reveal" ${formAttrs(site)} data-subject="Enquiry from eatzunera.com">
      <fieldset>
        <legend><em>01</em>What is this about?</legend>
        <div class="choice-row">
          ${types.map((t, i) => `<label class="choice"><input type="radio" name="Enquiry type" value="${esc(t[1])}" data-type="${t[0]}"${i === 0 ? ' checked' : ''}><span>${esc(t[1])}</span></label>`).join('')}
        </div>
      </fieldset>
      <fieldset>
        <legend><em>02</em>Which products?</legend>
        <div class="choice-row">
          ${products.map((p) => `<label class="choice choice-fruit"><input type="checkbox" name="Products" value="${esc(p.name)}" data-product="${p.slug}"><span>${fruit(p.slug)}${esc(p.name)}</span></label>`).join('')}
        </div>
        <label class="field"><span>Approximate quantity</span>
          <select name="Quantity">${qty.map((q) => `<option>${esc(q)}</option>`).join('')}</select>
        </label>
      </fieldset>
      <fieldset>
        <legend><em>03</em>About you</legend>
        <div class="field-row">
          <label class="field"><span>Your name</span><input type="text" name="Name" autocomplete="name" required></label>
          <label class="field"><span>Company or shop</span><input type="text" name="Company" autocomplete="organization"></label>
        </div>
        <div class="field-row">
          <label class="field"><span>Phone or WhatsApp</span><input type="tel" name="Phone" autocomplete="tel"></label>
          <label class="field"><span>Email</span><input type="email" name="Email" autocomplete="email"></label>
        </div>
        <label class="field"><span>City</span><input type="text" name="City" autocomplete="address-level2"></label>
        <label class="field"><span>Anything else we should know?</span><textarea name="Message" rows="4" placeholder="Grades, pack format, delivery date"></textarea></label>
      </fieldset>
      ${sendButtons}
    </form>
    <aside class="panel enquiry-aside reveal">
      ${ruled('WHAT HAPPENS *next*', 'h2', 'ruled-sm on-dark')}
      <ol class="next-list">
        <li>${icon2('quality')}<span>We read your enquiry and check stock and grades.</span></li>
        <li>${icon2('pack')}<span>You receive formats, quantities and a quotation.</span></li>
        <li>${icon2('supply')}<span>Samples and dispatch are arranged once you approve.</span></li>
      </ol>
      <p class="panel-note">Prefer to talk? WhatsApp <a href="https://wa.me/${esc(site.contact.whatsapp)}" target="_blank" rel="noopener">${esc(site.contact.whatsappDisplay)}</a>, ${esc(site.contact.hours)}.</p>
    </aside>
  </div>
</section>`;
}

function notFound({ root }) {
  return `
${pageHero({ bg: 'bg-peach', eyebrow: 'Page not found', title: 'THIS SHELF IS *empty.*', lead: 'The page you were looking for has moved or never existed. The good stuff is one step away.', art: pile(['cashews', 'raisins']), extra: `<div class="btn-row reveal"><a class="btn btn-primary btn-lg" href="${root}shop.html">Explore the range ${go}</a><a class="btn btn-cream btn-lg" href="${root}index.html">Back to home</a></div>` })}`;
}

module.exports = { home, shop, product, about, trade, gifting, recipes, recipe, contact, enquiry, notFound };
