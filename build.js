/* Zunera site generator. No dependencies.
   Reads content/*.json + templates/*.js and writes the HTML pages into site/.
   Run:  node build.js   */

const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const { layout } = require('./templates/layout');
const pages = require('./templates/pages');

const read = (f) => JSON.parse(fs.readFileSync(path.join(__dirname, 'content', f), 'utf8'));
const site = read('site.json');
const products = read('products.json');
const recipes = read('recipes.json');
const out = path.join(__dirname, 'site');

/* Photos are picked up automatically when the file exists:
   site/assets/img/products/<slug>.jpg  and  site/assets/img/packing-floor.jpg */
const has = (rel) => fs.existsSync(path.join(out, rel));
products.forEach((p) => {
  const auto = 'assets/img/products/' + p.slug + '.jpg';
  if (!p.image && has(auto)) { p.image = auto; p.imageAlt = p.imageAlt || 'Zunera ' + p.name; }
});
site.hasFloorPhoto = has('assets/img/packing-floor.jpg');

/* ---------- Instagram ----------
   The newest posts from @eatzunera are pulled in at build time, and the images are saved into the site.
   Set ONE of these as a GitHub Actions secret on the repository:
     INSTAGRAM_FEED_URL  a JSON feed of the account (for example from behold.so)
     INSTAGRAM_TOKEN     an Instagram API access token for the account
   Without either, or if Instagram cannot be reached, the five photos in site/assets/social/ are shown. */
const INSTA_POSTS = 5;
const LIVE_DIR = 'assets/social/live';

function get(url, hops = 4) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https:') ? https : http;
    const req = lib.get(url, { headers: { 'User-Agent': 'zunera-site-build' }, timeout: 20000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && hops) {
        res.resume();
        return resolve(get(new URL(res.headers.location, url).href, hops - 1));
      }
      if (res.statusCode !== 200) { res.resume(); return reject(new Error('HTTP ' + res.statusCode)); }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    req.on('timeout', () => req.destroy(new Error('timed out')));
    req.on('error', reject);
  });
}

/* Accepts the Instagram API shape ({ data: [...] }) and common feed shapes ({ posts: [...] } or [...]) */
function normalise(json) {
  const list = Array.isArray(json) ? json : json.posts || json.data || [];
  return list.map((x) => {
    const type = String(x.media_type || x.mediaType || '').toUpperCase();
    const video = type === 'VIDEO';
    const medium = x.sizes && x.sizes.medium && x.sizes.medium.mediaUrl;
    const img = medium || (video ? x.thumbnail_url || x.thumbnailUrl : x.media_url || x.mediaUrl);
    const caption = String(x.prunedCaption || x.caption || '').split('\n')[0].replace(/#\S+/g, '').trim();
    return { id: String(x.id || '').replace(/[^\w-]/g, ''), img, link: x.permalink, caption, video };
  }).filter((x) => x.id && x.img && /^https:\/\/(www\.)?instagram\.com\//.test(x.link || ''));
}

const extFor = (buf) => (buf.slice(0, 4).toString() === 'RIFF' ? '.webp' : buf[0] === 0x89 ? '.png' : '.jpg');

async function instagram() {
  const feed = process.env.INSTAGRAM_FEED_URL, token = process.env.INSTAGRAM_TOKEN;
  if (!feed && !token) return [];
  try {
    const url = feed || 'https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&limit=12&access_token=' + encodeURIComponent(token);
    const posts = normalise(JSON.parse((await get(url)).toString('utf8'))).slice(0, INSTA_POSTS);
    if (!posts.length) throw new Error('no posts in the feed');
    /* Instagram tokens last 60 days; each build asks for an extension. A failure here is harmless. */
    if (token) await get('https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=' + encodeURIComponent(token)).catch(() => {});
    const dir = path.join(out, LIVE_DIR);
    fs.mkdirSync(dir, { recursive: true });
    fs.readdirSync(dir).forEach((f) => fs.unlinkSync(path.join(dir, f)));
    const saved = [];
    for (const p of posts) {
      const buf = await get(p.img);
      const file = LIVE_DIR + '/' + p.id + extFor(buf);
      fs.writeFileSync(path.join(out, file), buf);
      saved.push({ src: file, link: p.link, alt: p.caption ? 'Instagram post: ' + p.caption.slice(0, 120) : 'A recent Zunera Instagram post', video: p.video });
    }
    console.log('  Instagram: ' + saved.length + ' recent posts');
    return saved;
  } catch (e) {
    console.log('  Instagram: feed unavailable (' + e.message + '), showing the saved photos');
    return [];
  }
}

/* ---------- pages ---------- */

function write(file, opts) {
  const dest = path.join(out, file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, layout(Object.assign({ site, products }, opts)));
  console.log('  ' + file);
}

/* Old addresses that should send visitors on to a new page */
const redirects = { 'products/raisins.html': 'products/black-raisins-seedless.html' };

/* House rule: every product is used in at least one recipe, and recipes only name real products.
   The build still runs, but prints a loud warning so a new product is never left without one. */
function checkRecipes() {
  const slugs = new Set(products.map((p) => p.slug));
  const used = new Set(recipes.flatMap((r) => r.products));
  const lonely = products.filter((p) => !used.has(p.slug)).map((p) => p.slug);
  const unknown = [...used].filter((s) => !slugs.has(s));
  if (lonely.length) console.warn('\n  WARNING: these products are not in any recipe yet: ' + lonely.join(', ') + '\n  Add them to a recipe in content/recipes.json.\n');
  if (unknown.length) console.warn('\n  WARNING: recipes name products that do not exist: ' + unknown.join(', ') + '\n');
}

async function main() {
  console.log('Building Zunera site:');
  checkRecipes();
  site.instagramPosts = await instagram();
  const ctx = { site, products, recipes, root: '' };

  write('index.html', { active: 'index.html', content: pages.home(ctx) });
  write('shop.html', { active: 'shop.html', title: 'Shop the range', description: 'Ajwa, Medjool, Sukkari, Mazafati and many more dates, plus almonds, cashews, pistachios, black raisins, figs and apricots from Zunera. Buy on Amazon.', content: pages.shop(ctx) });
  write('about.html', { active: 'about.html', title: 'Our story', description: 'How Zunera sources, imports, sorts and packs dates and dry fruits for India.', content: pages.about(ctx) });
  write('trade.html', { active: 'trade.html', title: 'Trade & bulk', description: 'Bulk cartons, retail-ready packs and gifting programmes from Zunera for retailers, wholesalers and kitchens.', bodyClass: 'page-trade', content: pages.trade(ctx) });
  write('gifting.html', { active: 'gifting.html', title: 'Corporate gifting', description: 'Custom date and dry fruit gift boxes for festivals, clients and teams, with your logo, your mix and your note. Delivered across India.', content: pages.gifting(ctx) });
  write('recipes.html', { active: 'recipes.html', title: 'Recipes', description: 'Simple recipes made with Zunera dates and dry fruits: laddoos, kheer, badam milk, milkshakes and more.', content: pages.recipes(ctx) });
  recipes.forEach((r) => {
    write('recipes/' + r.slug + '.html', {
      root: '../',
      active: 'recipes.html',
      title: r.name,
      description: r.intro,
      themeColor: r.color,
      content: pages.recipe({ site, products, recipes, root: '../', r })
    });
  });
  write('contact.html', { active: 'contact.html', title: 'Contact us', description: 'Talk to Zunera on WhatsApp, email or Instagram.', content: pages.contact(ctx) });
  write('enquiry.html', { title: 'Enquiry form', description: 'Send Zunera a trade, bulk or gifting enquiry.', content: pages.enquiry(ctx) });
  write('404.html', { root: '/', title: 'Page not found', content: pages.notFound({ site, products, root: '/' }) });

  products.forEach((p) => {
    write('products/' + p.slug + '.html', {
      root: '../',
      active: 'shop.html',
      title: p.name,
      description: p.short + ' ' + p.description,
      bodyClass: 'page-product',
      themeColor: p.color,
      content: pages.product({ site, products, recipes, root: '../', p })
    });
  });

  Object.keys(redirects).forEach((from) => {
    const to = '/' + redirects[from];
    fs.writeFileSync(path.join(out, from), `<!doctype html><meta charset="utf-8"><title>Moved</title><link rel="canonical" href="${site.domain}${to}"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=${to}"><p><a href="${to}">This page has moved.</a></p>\n`);
    console.log('  ' + from + ' -> ' + to);
  });

  const urls = ['', 'shop.html', 'recipes.html', 'gifting.html', 'about.html', 'trade.html', 'contact.html', 'enquiry.html']
    .concat(products.map((p) => 'products/' + p.slug + '.html'))
    .concat(recipes.map((r) => 'recipes/' + r.slug + '.html'));
  fs.writeFileSync(path.join(out, 'sitemap.xml'),
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map((u) => '  <url><loc>' + site.domain + '/' + u + '</loc></url>').join('\n') + '\n</urlset>\n');
  fs.writeFileSync(path.join(out, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: ' + site.domain + '/sitemap.xml\n');
  console.log('Done. Upload the contents of the site/ folder to your host.');
}

main().catch((e) => { console.error(e); process.exit(1); });
