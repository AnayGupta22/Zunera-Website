/* Zunera illustration set. Hand-drawn SVG in one style: flat earthy fills, one shade, one highlight,
   a rounded ink outline. Fruits are on a 200×200 grid, icons on 120×120. */

const INK = '#2D301C';
const S = `stroke="${INK}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"`;
const S4 = `stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`;
const L = (d, c, w = 4, o = 1) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" opacity="${o}"/>`;
const O = (d) => `<path d="${d}" fill="none" ${S}/>`;
const F = (d, c, o = 1) => `<path d="${d}" fill="${c}" opacity="${o}"/>`;

/* ---------- fruits ---------- */

const DATE = 'M100 22c34 0 54 36 54 80s-22 78-54 78-54-34-54-78 20-80 54-80z';
const DATE_SHADE = 'M100 22c34 0 54 36 54 80s-22 78-54 78c26-22 36-52 36-80s-12-58-36-78z';
const date = (t, c) => `<g transform="${t}">${F(DATE, c.b)}${F(DATE_SHADE, c.s)}
  ${L('M80 62c-8 26-8 54 0 80M102 52c6 30 6 68 0 104M122 70c5 20 5 44 0 66', c.w)}${L('M64 74c-5 16-6 34-3 50', c.h, 6)}${O(DATE)}
  <path d="M82 30c2-12 34-12 36 0l-8 8H90z" fill="#E0B25A" ${S}/>${L('M100 20V7', INK, 5)}</g>`;

const ALMOND = 'M100 20c30 30 52 66 52 100 0 34-22 58-52 58s-52-24-52-58c0-34 22-70 52-100z';
const ALMOND_SHADE = 'M100 20c30 30 52 66 52 100 0 34-22 58-52 58 22-12 32-34 32-58 0-32-12-68-32-100z';
const almond = (t) => `<g transform="${t}">${F(ALMOND, '#CF9258')}${F(ALMOND_SHADE, '#AD6E3C')}
  ${L('M100 56v92M84 88c-4 20-3 38 3 56M116 88c4 20 3 38-3 56', '#8B5229')}${L('M70 110c2-18 8-32 17-46', '#F0C594', 6)}${O(ALMOND)}</g>`;

const CASHEW = 'M52 60c10-26 46-36 74-22 30 14 44 46 34 78-10 30-40 52-72 48-16-2-24-16-16-28 6-9 18-8 28-14 16-10 18-30 4-38-12-7-28 4-42-2-10-4-14-12-10-22z';
const cashew = (t) => `<g transform="${t}">${F(CASHEW, '#F3D9A4')}
  ${L('M134 62c14 16 16 38 5 56', '#CDA869', 6)}${L('M150 96c-2 26-24 50-50 54', '#D9B777', 6, .8)}${L('M68 58c10-10 26-15 42-13', '#FFF4DC', 6)}${O(CASHEW)}</g>`;

const SHELL = 'M100 28c30 0 50 34 50 76s-22 70-50 70-50-28-50-70 20-76 50-76z';
const SHELL_SHADE = 'M100 28c30 0 50 34 50 76s-22 70-50 70c22-18 32-42 32-70s-10-56-32-76z';
const KERNEL = 'M100 40c16 22 22 46 22 68 0 22-8 42-22 54-14-12-22-32-22-54 0-22 6-46 22-68z';
const pistachio = (t) => `<g transform="${t}">${F(SHELL, '#EFDDB4')}${F(SHELL_SHADE, '#CFB480')}${F(KERNEL, '#A3B662')}
  ${F('M100 40c9 12 15 27 19 42-12-5-26-5-38 0 4-15 10-30 19-42z', '#8A5670')}${L('M100 92v52', '#7E9148')}${L('M90 104c-2 14-1 26 3 38', '#C3D38A', 4)}
  <path d="${KERNEL}" fill="none" ${S4}/>${L('M62 100c0-20 5-36 14-50', '#FFF6E2', 6)}${O(SHELL)}</g>`;

const raisin = (cx, cy, rx, ry, rot, fill, wr) => `<g transform="rotate(${rot} ${cx} ${cy})">
  <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" ${S}/>
  ${L(`M${cx - rx * 0.38} ${cy - ry * 0.55}c-5 ${ry * 0.35} -4 ${ry * 0.75} 2 ${ry * 1.05}`, wr)}${L(`M${cx + rx * 0.3} ${cy - ry * 0.5}c5 ${ry * 0.3} 4 ${ry * 0.65} -1 ${ry * 0.95}`, wr)}</g>`;

const FIG = 'M100 26c4 20 46 40 46 86 0 36-20 60-46 60s-46-24-46-60c0-46 42-66 46-86z';
const FIG_SHADE = 'M100 26c4 20 46 40 46 86 0 36-20 60-46 60 20-12 28-34 28-60 0-40-24-62-28-86z';
const figWhole = (t) => `<g transform="${t}">${F(FIG, '#7C4059')}${F(FIG_SHADE, '#5B2B41')}
  ${L('M84 84c-8 18-8 40 0 60M104 70c4 26 4 62 0 88', '#96587A')}${L('M70 104c0-14 5-26 12-36', '#B57A98', 6)}${O(FIG)}${L('M100 26V10', INK, 6)}</g>`;
const figHalf = (t) => `<g transform="${t}">${F(FIG, '#F6DFB4')}
  <g transform="translate(100 108) scale(.76) translate(-100 -108)">${F(FIG, '#DB7462')}</g>
  <ellipse cx="100" cy="122" rx="15" ry="24" fill="#B8504C"/>
  ${[[84, 100], [116, 100], [74, 124], [126, 124], [86, 146], [114, 146], [100, 90], [100, 154], [90, 118], [110, 132]].map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="3.2" fill="#FBE9C4"/>`).join('')}
  ${O(FIG)}</g>`;

const FRUITS = {
  ajwa: () => date('translate(98 92) scale(.46) rotate(34 100 100)', { b: '#5B3423', s: '#3F2216', w: '#7E5038', h: '#A9795A' }) +
    date('translate(-8 -6) rotate(-14 100 100)', { b: '#4A2A1D', s: '#301810', w: '#6E4630', h: '#9A6A48' }),
  medjool: () => date('translate(-34 12) rotate(-30 100 100) scale(.9)', { b: '#C07C3C', s: '#9E5F28', w: '#DDA468', h: '#F0C594' }) +
    date('translate(34 4) rotate(16 100 100) scale(.96)', { b: '#A9632C', s: '#874A1E', w: '#CB8A4E', h: '#E6B27C' }),
  almond: () => almond('translate(-36 18) rotate(-26 100 100) scale(.84)') + almond('translate(30 0) rotate(16 100 100) scale(.96)'),
  cashew: () => cashew('translate(96 96) scale(.5) rotate(160 100 100)') + cashew('translate(-12 -4) rotate(-8 100 100)'),
  pistachio: () => pistachio('translate(104 100) scale(.44) rotate(40 100 100)') + pistachio('translate(-10 -4) rotate(-12 100 100)'),
  raisin: () => [
    raisin(66, 74, 27, 35, -22, '#DB9A32', '#9C5C1B'), raisin(132, 70, 25, 33, 20, '#B9702A', '#7A4212'),
    raisin(100, 116, 29, 36, 6, '#E8AE44', '#A66A20'), raisin(54, 138, 23, 29, -32, '#B9702A', '#7A4212'), raisin(146, 134, 25, 31, 30, '#DB9A32', '#9C5C1B')
  ].join(''),
  fig: () => figWhole('translate(-28 0) rotate(-10 100 100) scale(.94)') + figHalf('translate(58 46) rotate(16 100 100) scale(.7)'),
  apricot: () => `<circle cx="140" cy="140" r="42" fill="#F7B76F" ${S}/><ellipse cx="140" cy="140" rx="16" ry="22" fill="#7A4A2A" ${S4}/>${L('M134 128c-2 8-2 16 0 24', '#A26A42', 3)}
    <circle cx="84" cy="108" r="58" fill="#EF8F4C"/>${F('M84 50a58 58 0 0 1 0 116a76 76 0 0 0 0-116z', '#D8742F')}
    <ellipse cx="60" cy="92" rx="14" ry="22" fill="#F9BE8A" opacity=".85" transform="rotate(24 60 92)"/>${L('M84 52c-16 32-16 82 0 112', '#C9662B')}
    <circle cx="84" cy="108" r="58" fill="none" ${S}/>
    <path d="M88 50c8-24 34-34 56-24-8 24-32 34-56 24z" fill="#8A9B52" ${S}/>${L('M98 46c12-8 26-13 38-15', INK, 3)}${L('M86 52c0-8 2-13 6-17', INK, 5)}`
};

/* ---------- icons (120 × 120) ---------- */
const ICONS = {
  source: `<circle cx="26" cy="28" r="12" fill="#E3A63B" ${S4}/><path d="M50 104c2-22 6-42 12-58h9c-4 18-7 38-7 58z" fill="#B27A46" ${S4}/>
    ${['M66 46c-14-14-34-14-48-3 17 0 31 6 48 3z', 'M66 46c-6-19-22-29-39-27 14 6 23 18 39 27z', 'M66 46c4-19 20-29 37-25-13 6-21 16-37 25z', 'M66 46c14-10 33-8 43 5-15-3-28 1-43-5z', 'M66 46c13 2 25 12 27 27-10-8-19-14-27-27z'].map((d) => `<path d="${d}" fill="#8A9B52" ${S4}/>`).join('')}
    <circle cx="60" cy="56" r="5" fill="#5B3423" ${S4}/><circle cx="71" cy="58" r="5" fill="#5B3423" ${S4}/>${L('M12 104h96', INK, 4)}`,
  import: `<rect x="34" y="50" width="18" height="26" rx="2" fill="#E3A63B" ${S4}/><rect x="54" y="50" width="18" height="26" rx="2" fill="#8A9B52" ${S4}/><rect x="74" y="58" width="14" height="18" rx="2" fill="#FBE5C1" ${S4}/>
    <path d="M16 76h88l-10 22H28z" fill="#A84E33" ${S4}/>${L('M60 50V32l14 8-14 6', INK, 4)}${L('M10 108c8-6 16-6 24 0s16 6 24 0 16-6 24 0 16 6 24 0', INK, 4)}`,
  quality: `${L('M76 76l26 26', INK, 11)}<circle cx="52" cy="52" r="32" fill="#FBE5C1" ${S4}/>${L('M37 53l11 11 20-23', '#4C5A31', 7)}`,
  pack: `<path d="M22 46l38-17 38 17v44l-38 17-38-17z" fill="#DDA56A" ${S4}/><path d="M60 63l38-17v44l-38 17z" fill="#BE8548"/>
    ${L('M22 46l38 17 38-17M60 63v44', INK, 4)}<path d="M40 38l38 17v14l-10 4V59L30 42z" fill="#FBE5C1" ${S4}/><path d="M22 46l38-17 38 17v44l-38 17-38-17z" fill="none" ${S4}/>`,
  supply: `<rect x="12" y="40" width="58" height="42" rx="4" fill="#FBE5C1" ${S4}/><path d="M70 52h22l14 16v14H70z" fill="#E3A63B" ${S4}/><path d="M78 58h11l8 10H78z" fill="#FBE5C1" ${S4}/>
    ${L('M26 56h28M26 66h18', '#676F41', 4)}<circle cx="34" cy="86" r="10" fill="${INK}"/><circle cx="34" cy="86" r="3.5" fill="#FBE5C1"/><circle cx="88" cy="86" r="10" fill="${INK}"/><circle cx="88" cy="86" r="3.5" fill="#FBE5C1"/>${L('M8 98h104', INK, 4)}`,
  morning: `<circle cx="60" cy="60" r="22" fill="#E3A63B" ${S4}/>${L('M60 18v12M60 90v12M18 60h12M90 60h12M30 30l9 9M81 81l9 9M90 30l-9 9M39 81l-9 9', INK, 5)}`,
  chai: `${L('M48 40c-5-7 5-11 0-18M66 40c-5-7 5-11 0-18', INK, 4)}${L('M86 58h8c8 0 13 6 13 12s-6 12-14 12h-7', INK, 5)}
    <path d="M32 50h56v22c0 17-13 28-28 28S32 89 32 72z" fill="#FBE5C1" ${S4}/><ellipse cx="60" cy="52" rx="24" ry="5" fill="#B5653A"/>${L('M32 50h56', INK, 4)}${L('M26 106h68', INK, 5)}`,
  gifting: `<rect x="26" y="54" width="68" height="46" rx="3" fill="#A84E33" ${S4}/><rect x="20" y="40" width="80" height="16" rx="3" fill="#C0623F" ${S4}/><rect x="53" y="40" width="14" height="60" fill="#E3A63B" ${S4}/>
    <path d="M60 40c-10-17-30-15-27-2 2 9 17 6 27 2zM60 40c10-17 30-15 27-2-2 9-17 6-27 2z" fill="#E3A63B" ${S4}/>`,
  kitchen: `<circle cx="44" cy="54" r="9" fill="#CF9258" ${S4}/><circle cx="62" cy="50" r="10" fill="#F3D9A4" ${S4}/><circle cx="78" cy="54" r="9" fill="#DB9A32" ${S4}/>
    <path d="M20 58h80c0 27-17 44-40 44S20 85 20 58z" fill="#8A9B52" ${S4}/>${L('M34 72c4 10 12 17 22 19', '#B3C27C', 5)}${L('M98 24L78 50', INK, 5)}`,
  camera: `<path d="M22 44h18l8-12h24l8 12h18v48H22z" fill="none" ${S4}/><circle cx="60" cy="66" r="15" fill="none" ${S4}/>`
};

const NAME = { 'ajwa-dates': 'ajwa', 'medjool-dates': 'medjool', almonds: 'almond', cashews: 'cashew', pistachios: 'pistachio', raisins: 'raisin', figs: 'fig', apricots: 'apricot' };
const fruit = (slug, cls = '') => `<svg class="ill ${cls}" viewBox="0 0 200 200" aria-hidden="true">${(FRUITS[NAME[slug] || slug] || FRUITS.ajwa)()}</svg>`;
const icon2 = (name, cls = '') => `<svg class="ico ${cls}" viewBox="0 0 120 120" aria-hidden="true">${ICONS[name] || ''}</svg>`;

/* Four-point sparkle */
const sparkle = (cls = '') => `<svg class="sparkle ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c1 7 4 11 12 12-8 1-11 5-12 12-1-7-4-11-12-12 8-1 11-5 12-12z" fill="currentColor"/></svg>`;

/* Rotating text stamp. `id` must be unique on the page. */
const stamp = (id, text, root, cls = '') => `<svg class="stamp ${cls}" viewBox="0 0 200 200" aria-hidden="true">
  <defs><path id="${id}" d="M100 100m-72 0a72 72 0 1 1 144 0a72 72 0 1 1-144 0"/></defs>
  <circle cx="100" cy="100" r="97" fill="var(--stamp-bg, #4C5A31)" stroke="${INK}" stroke-width="4"/>
  <g class="stamp-ring"><text fill="var(--stamp-fg, #FBE5C1)" font-family="Poppins, sans-serif" font-weight="600" font-size="17" letter-spacing="2.5"><textPath href="#${id}" textLength="448" lengthAdjust="spacing">${text}</textPath></text></g>
  <circle cx="100" cy="100" r="46" fill="none" stroke="var(--stamp-fg, #FBE5C1)" stroke-width="1.5" stroke-dasharray="3 5"/>
  <image href="${root}assets/brand/zunera-mark-cream.svg" x="74" y="66" width="52" height="68" class="stamp-mark"/>
</svg>`;

/* Star-burst sticker outline */
const burstPath = (() => {
  const pts = [];
  for (let i = 0; i < 32; i++) {
    const r = i % 2 ? 84 : 98, a = (Math.PI * 2 * i) / 32;
    pts.push((100 + r * Math.cos(a)).toFixed(1) + ' ' + (100 + r * Math.sin(a)).toFixed(1));
  }
  return 'M' + pts.join('L') + 'Z';
})();
const burst = (line1, line2, cls = '') => `<span class="burst ${cls}"><svg viewBox="0 0 200 200" aria-hidden="true"><path d="${burstPath}" fill="currentColor" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/></svg><span><b>${line1}</b>${line2 ? `<i>${line2}</i>` : ''}</span></span>`;

module.exports = { fruit, icon2, sparkle, stamp, burst, INK };
