/* Zunera site generator. No dependencies.
   Reads content/*.json + templates/*.js and writes the HTML pages into site/.
   Run:  node build.js   */

const fs = require('fs');
const path = require('path');
const { layout } = require('./templates/layout');
const pages = require('./templates/pages');

const read = (f) => JSON.parse(fs.readFileSync(path.join(__dirname, 'content', f), 'utf8'));
const site = read('site.json');
const products = read('products.json');
const out = path.join(__dirname, 'site');

function write(file, opts) {
  const dest = path.join(out, file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, layout(Object.assign({ site, products }, opts)));
  console.log('  ' + file);
}

console.log('Building Zunera site:');
const ctx = { site, products, root: '' };

write('index.html', { active: 'index.html', content: pages.home(ctx) });
write('shop.html', { active: 'shop.html', title: 'Shop the range', description: 'Ajwa dates, almonds, cashews, pistachios, raisins, figs and apricots from Zunera. Buy on Amazon.', content: pages.shop(ctx) });
write('about.html', { active: 'about.html', title: 'Our story', description: 'How Zunera sources, imports, sorts and packs dates and dry fruits for India.', content: pages.about(ctx) });
write('trade.html', { active: 'trade.html', title: 'Trade & bulk', description: 'Bulk cartons, retail-ready packs and gifting programmes from Zunera for retailers, wholesalers and kitchens.', bodyClass: 'page-trade', content: pages.trade(ctx) });
write('contact.html', { active: 'contact.html', title: 'Contact us', description: 'Talk to Zunera on WhatsApp, email or Instagram.', content: pages.contact(ctx) });
write('enquiry.html', { title: 'Enquiry form', description: 'Send Zunera a trade, bulk or gifting enquiry.', content: pages.enquiry(ctx) });
write('404.html', { title: 'Page not found', content: pages.notFound(ctx) });

products.forEach((p) => {
  write('products/' + p.slug + '.html', {
    root: '../',
    active: 'shop.html',
    title: p.name,
    description: p.short + ' ' + p.description,
    bodyClass: 'page-product',
    themeColor: p.color,
    content: pages.product({ site, products, root: '../', p })
  });
});

const urls = ['', 'shop.html', 'about.html', 'trade.html', 'contact.html', 'enquiry.html']
  .concat(products.map((p) => 'products/' + p.slug + '.html'));
fs.writeFileSync(path.join(out, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map((u) => '  <url><loc>' + site.domain + '/' + u + '</loc></url>').join('\n') + '\n</urlset>\n');
fs.writeFileSync(path.join(out, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: ' + site.domain + '/sitemap.xml\n');
console.log('Done. Upload the contents of the site/ folder to your host.');
