/* Shared building blocks: page shell, header, footer, and the Zunera brand pieces
   (banner, tagline, process strip, follow pill, glyphs). Illustrations live in art.js.
   Every page in templates/pages.js is wrapped by layout(). */

const fs = require('fs');
const path = require('path');
const { sparkle } = require('./art');

const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* "FROM ORIGIN TO *your* TABLE"  ->  the starred part becomes the Playfair italic accent */
const hl = (s) => esc(s).replace(/\*(.+?)\*/g, '<em>$1</em>');

/* ---------- Glyphs: traced from the carton, inlined once as an SVG sprite ---------- */
const GLYPH_DIR = path.join(__dirname, '..', 'site', 'assets', 'glyphs');
const GLYPHS = ['instagram', 'globe', 'mail', 'phone', 'arrow-down-left', 'chevron', 'diamond'];
const sprite = () => '<svg width="0" height="0" style="position:absolute" aria-hidden="true">' + GLYPHS.map((g) => {
  const svg = fs.readFileSync(path.join(GLYPH_DIR, g + '.svg'), 'utf8');
  const vb = svg.match(/viewBox="([^"]+)"/)[1];
  const inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace(/fill="#[0-9A-Fa-f]+"/g, 'fill="currentColor"');
  return `<symbol id="g-${g}" viewBox="${vb}">${inner}</symbol>`;
}).join('') + '</svg>';
const icon = (name, cls = '') => `<svg class="glyph ${cls}" aria-hidden="true"><use href="#g-${name}"/></svg>`;

/* Arrow in a little disc: the site's "go" mark */
const go = `<span class="go" aria-hidden="true">${icon('chevron')}</span>`;
const ext = '<span class="ext" aria-hidden="true">↗</span>';

/* ---------- Brand pieces ---------- */
const banner = (text, size = 'md') => `<span class="banner banner-${size}" data-banner><span class="banner-text">${esc(text).replace(/&amp;/g, '<em>&amp;</em>')}</span></span>`;
const tagline = (items, cls = '') => `<p class="tagline ${cls}">${items.map((t) => `<span>${esc(t)}</span>`).join(icon('diamond', 'dia'))}</p>`;
const processStrip = (steps, cls = '') => `<ol class="strip ${cls}" aria-label="How it comes together">${steps.map((s, i) => `<li>${i ? icon('chevron', 'chev') : ''}<span>${esc(s.title)}</span></li>`).join('')}</ol>`;
const followPill = (site, tone = '') => `<a class="follow ${tone}" href="${esc(site.social.instagram)}" target="_blank" rel="noopener"><strong>Follow us at</strong>${icon('instagram', 'ig')}<span>${esc(site.social.instagramHandle.replace(/^@/, ''))}</span></a>`;
const ruled = (text, tag = 'h2', cls = '') => `<${tag} class="ruled ${cls}">${icon('arrow-down-left', 'dl')}<span>${hl(text)}</span></${tag}>`;

/* A described slot for a photo that still needs to be shot */
const slot = (title, brief, cls = '') => `<div class="slot ${cls}" role="img" aria-label="Photo slot: ${esc(title)}">
  <svg class="slot-cam" viewBox="0 0 120 120" aria-hidden="true"><path d="M22 44h18l8-12h24l8 12h18v48H22z"/><circle cx="60" cy="66" r="15"/></svg>
  <span class="slot-tag">Photo slot</span><strong>${esc(title)}</strong><span class="slot-brief">${esc(brief)}</span></div>`;

/* ---------- Header and footer ---------- */

function header(site, root, active) {
  const links = site.nav.map((n) =>
    `<a href="${root}${n.href}"${active === n.href ? ' aria-current="page"' : ''}>${esc(n.label)}</a>`).join('');
  return `
<a class="skip" href="#main">Skip to content</a>
<div class="announce">${tagline(site.announcement)}</div>
<header class="site-header" data-header>
  <div class="wrap header-row">
    <a class="brand" href="${root}index.html" aria-label="Zunera home"><img src="${root}assets/brand/zunera-wordmark-carton.svg" alt="Zunera" width="2293" height="515"></a>
    <nav class="nav" aria-label="Main">${links}</nav>
    <div class="header-cta">
      <a class="btn btn-ghost btn-sm hide-sm" href="${root}enquiry.html">Enquire</a>
      <a class="btn btn-primary btn-sm" href="${esc(site.amazonStore)}" target="_blank" rel="noopener">Shop on Amazon ${ext}</a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="drawer" data-nav-toggle><span></span><span></span><span class="sr">Menu</span></button>
    </div>
  </div>
</header>
<div class="drawer" id="drawer" data-drawer hidden>
  <nav aria-label="Mobile">
    ${site.nav.map((n, i) => `<a href="${root}${n.href}"><em>0${i + 1}</em>${esc(n.label)}</a>`).join('')}
    <a href="${root}enquiry.html"><em>0${site.nav.length + 1}</em>Enquire</a>
  </nav>
  ${followPill(site)}
</div>`;
}

function footer(site, products, root) {
  const c = site.contact;
  return `
<footer class="site-footer">
  <div class="wrap">
    <div class="footer-cta">
      <p class="footer-big">${hl('GOOD THINGS, WELL *sourced.*')}</p>
      <div class="btn-row">
        <a class="btn btn-saffron btn-lg" href="${esc(site.amazonStore)}" target="_blank" rel="noopener">Shop on Amazon ${ext}</a>
        <a class="btn btn-outline-light btn-lg" href="${root}enquiry.html">Trade enquiry ${go}</a>
      </div>
    </div>
    <div class="footer-top">
      <div class="footer-brand">
        <h2 class="foot-h">Instagram</h2>
        ${followPill(site, 'follow-cream')}
      </div>
      <div>
        <h2 class="foot-h">Shop</h2>
        <ul>${products.map((p) => `<li><a href="${root}products/${p.slug}.html">${esc(p.name)}</a></li>`).join('')}</ul>
      </div>
      <div>
        <h2 class="foot-h">Company</h2>
        <ul>
          <li><a href="${root}about.html">Our story</a></li>
          <li><a href="${root}trade.html">Trade &amp; bulk</a></li>
          <li><a href="${root}enquiry.html">Enquiry form</a></li>
          <li><a href="${root}contact.html">Contact us</a></li>
          <li><a href="${esc(site.amazonStore)}" target="_blank" rel="noopener">Amazon store ${ext}</a></li>
        </ul>
      </div>
      <div class="foot-info">
        <h2 class="foot-h">Imported and Distributed by:</h2>
        <p>${c.addressLines.map(esc).join('<br>')}</p>
        <ul class="contacts">
          <li><a href="https://wa.me/${esc(c.whatsapp)}" target="_blank" rel="noopener">${icon('phone')}${esc(c.whatsappDisplay)}</a></li>
          <li><a href="tel:${esc(c.phone2Link)}">${icon('phone')}${esc(c.phone2)}</a></li>
          <li><a href="mailto:${esc(c.email)}">${icon('mail')}${esc(c.email)}</a></li>
          <li><a href="https://${esc(c.website)}" target="_blank" rel="noopener">${icon('globe')}${esc(c.website)}</a></li>
        </ul>
      </div>
    </div>
    <img class="footer-mark" src="${root}assets/brand/zunera-wordmark-cream.svg" alt="Zunera" width="2293" height="515" loading="lazy">
    <div class="footer-base">
      <span>© <span data-year>2026</span> Zunera</span>
      ${site.legal.fssai ? `<span>FSSAI No. ${esc(site.legal.fssai)}</span>` : ''}
      ${site.legal.gst ? `<span>GST ${esc(site.legal.gst)}</span>` : ''}
    </div>
  </div>
</footer>`;
}

function layout({ site, products, root = '', active = '', title, description, bodyClass = '', themeColor = '#E5BE7D', content }) {
  const fullTitle = title ? `${title} | Zunera` : 'Zunera | Dry fruits & dates';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description || site.description)}">
<meta name="theme-color" content="${themeColor}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description || site.description)}">
<meta property="og:type" content="website">
<meta property="og:image" content="${esc(site.domain)}/assets/carton/carton-front.jpg">
<link rel="icon" type="image/svg+xml" href="${root}assets/brand/zunera-mark-olive.svg">
<link rel="preload" href="${root}assets/fonts/Poppins-700.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${root}assets/fonts/Poppins-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${root}css/styles.css">
<script>document.documentElement.classList.add('js')</script>
</head>
<body class="${bodyClass}">
${sprite()}
${header(site, root, active)}
<main id="main">
${content}
</main>
${footer(site, products, root)}
<script src="${root}js/main.js" defer></script>
</body>
</html>
`;
}

module.exports = { layout, esc, hl, icon, go, ext, banner, tagline, processStrip, followPill, ruled, slot, sparkle };
