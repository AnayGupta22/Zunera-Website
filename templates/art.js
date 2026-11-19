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
/* Optional extras: c.tip draws a lighter, crisper cap (Sugai); c.sugar adds sugar crystals (Mufatal) */
const DATE_TIP = 'M100 22C124 22 141 40 149 66c-12 6-22 3-32 8s-22 2-34-2-22 1-32-6C59 40 76 22 100 22z';
const SUGAR = [[80, 66], [104, 84], [126, 100], [72, 108], [96, 124], [122, 136], [86, 156], [112, 162], [60, 140]];
const date = (t, c) => `<g transform="${t}">${F(DATE, c.b)}${F(DATE_SHADE, c.s)}${c.tip ? F(DATE_TIP, c.tip) + L('M72 50c8-12 18-18 28-19', '#F6D9A0', 5) : ''}
  ${L('M80 62c-8 26-8 54 0 80M102 52c6 30 6 68 0 104M122 70c5 20 5 44 0 66', c.w)}${L('M64 74c-5 16-6 34-3 50', c.h, 6)}${c.sugar ? SUGAR.map((p, n) => `<rect x="${p[0] - 3.5}" y="${p[1] - 3.5}" width="7" height="7" rx="1.5" fill="#FFF4DC" opacity=".9" transform="rotate(${n * 23} ${p[0]} ${p[1]})"/>`).join('') : ''}${O(DATE)}
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

/* Black raisin: deep purple-black body, darker shaded side, plum wrinkles and a glossy highlight */
const raisin = (cx, cy, rx, ry, rot, fill, wr) => `<g transform="rotate(${rot} ${cx} ${cy})">
  <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}"/>
  <path d="M${cx + rx * 0.15} ${cy - ry}a${rx} ${ry} 0 0 1 0 ${ry * 2}a${rx * 0.75} ${ry} 0 0 0 0 ${-ry * 2}z" fill="#21131C" opacity=".7"/>
  ${L(`M${cx - rx * 0.38} ${cy - ry * 0.55}c-5 ${ry * 0.35} -4 ${ry * 0.75} 2 ${ry * 1.05}`, wr)}${L(`M${cx + rx * 0.3} ${cy - ry * 0.5}c5 ${ry * 0.3} 4 ${ry * 0.65} -1 ${ry * 0.95}`, wr)}
  ${L(`M${cx - rx * 0.62} ${cy - ry * 0.18}c0 ${-ry * 0.25} ${rx * 0.12} ${-ry * 0.45} ${rx * 0.3} ${-ry * 0.58}`, '#C9A9BE', 4.5, .85)}
  <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" ${S}/></g>`;

const FIG = 'M100 26c4 20 46 40 46 86 0 36-20 60-46 60s-46-24-46-60c0-46 42-66 46-86z';
const FIG_SHADE = 'M100 26c4 20 46 40 46 86 0 36-20 60-46 60 20-12 28-34 28-60 0-40-24-62-28-86z';
const figWhole = (t) => `<g transform="${t}">${F(FIG, '#7C4059')}${F(FIG_SHADE, '#5B2B41')}
  ${L('M84 84c-8 18-8 40 0 60M104 70c4 26 4 62 0 88', '#96587A')}${L('M70 104c0-14 5-26 12-36', '#B57A98', 6)}${O(FIG)}${L('M100 26V10', INK, 6)}</g>`;
const figHalf = (t) => `<g transform="${t}">${F(FIG, '#F6DFB4')}
  <g transform="translate(100 108) scale(.76) translate(-100 -108)">${F(FIG, '#DB7462')}</g>
  <ellipse cx="100" cy="122" rx="15" ry="24" fill="#B8504C"/>
  ${[[84, 100], [116, 100], [74, 124], [126, 124], [86, 146], [114, 146], [100, 90], [100, 154], [90, 118], [110, 132]].map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="3.2" fill="#FBE9C4"/>`).join('')}
  ${O(FIG)}</g>`;

/* Date varieties: colours, how slim the fruit is (sx), and one of three arrangements */
const shadeOf = (hex, t) => '#' + [1, 3, 5].map((i) => Math.round(parseInt(hex.substr(i, 2), 16) * (1 - t)).toString(16).padStart(2, '0')).join('');
const darker = (c) => Object.assign({}, c, { b: shadeOf(c.b, .14), s: shadeOf(c.s, .14), w: shadeOf(c.w, .1), tip: c.tip && shadeOf(c.tip, .1) });
const LAYOUTS = {
  big: ['translate(98 92) scale(.46) rotate(34 100 100)', 'translate(-8 -6) rotate(-14 100 100)'],
  pair: ['translate(-34 12) rotate(-30 100 100) scale(.9)', 'translate(34 4) rotate(16 100 100) scale(.96)'],
  trio: ['translate(-40 22) rotate(-34 100 100) scale(.7)', 'translate(42 20) rotate(30 100 100) scale(.7)', 'translate(0 -16) rotate(-4 100 100) scale(.8)']
};
const VARIETIES = {
  'amber-dates': { b: '#6E3A22', s: '#4E2414', w: '#8F5636', h: '#BA8058', lay: 'pair' },
  'sugai-dates': { b: '#5A3220', s: '#3E2014', w: '#7A4A30', h: '#A0714E', tip: '#D9A14E', lay: 'big' },
  'mabroom-dates': { b: '#7C3A22', s: '#5A2814', w: '#9C5638', h: '#C07C58', sx: .72, lay: 'pair' },
  'kalmi-dates': { b: '#3A2117', s: '#22120B', w: '#5A3A2C', h: '#8A6654', sx: .82, lay: 'big' },
  'khalas-dates': { b: '#B06A2C', s: '#8C4E1C', w: '#CF8C4A', h: '#EDB57A', lay: 'big' },
  'fard-dates': { b: '#4A2A1C', s: '#2F1A10', w: '#6A4433', h: '#94705A', sx: .86, lay: 'trio' },
  'sufri-dates': { b: '#94592F', s: '#73411E', w: '#B4774B', h: '#D8A273', sx: .9, lay: 'pair' },
  'mashrook-dates': { b: '#5E3424', s: '#40200F', w: '#7E5038', h: '#A6785A', sx: .84, lay: 'trio' },
  'khudri-dates': { b: '#553022', s: '#381C12', w: '#754A36', h: '#9E7258', sx: .8, lay: 'big' },
  'rabia-dates': { b: '#3A241C', s: '#24140E', w: '#5C3E30', h: '#8C6A58', lay: 'trio' },
  'mazafati-dates': { b: '#2E1A14', s: '#1A0D09', w: '#4A3026', h: '#9A7A6A', lay: 'trio' },
  'rabbi-dates': { b: '#3E2219', s: '#26130C', w: '#5E3E30', h: '#8C6A58', sx: .7, lay: 'big' },
  'deglet-nour-dates': { b: '#C98A45', s: '#A86C2E', w: '#E0A866', h: '#F8DBAA', sx: .76, lay: 'pair' },
  'sukkari-rutab-dates': { b: '#C98B3A', s: '#A66C22', w: '#E2A85A', h: '#F6D08E', lay: 'big' },
  'sukkari-mufatal-dates': { b: '#A87436', s: '#835624', w: '#7A4E22', h: '#E2B271', lay: 'trio' }
};
const variety = (v) => LAYOUTS[v.lay].map((t, n, all) => date(
  t + (v.sx ? ` translate(100 100) scale(${v.sx} 1) translate(-100 -100)` : ''),
  n < all.length - 1 ? darker(v) : v)).join('');

/* Walnuts: a ridged shell with its seam, and a two-lobed kernel */
const WSHELL = 'M100 28c38 0 62 30 62 72s-24 74-62 74-62-32-62-74 24-72 62-72z';
const WSHELL_SHADE = 'M100 28c38 0 62 30 62 72s-24 74-62 74c28-16 40-44 40-74s-12-58-40-72z';
const walnutShell = (t) => `<g transform="${t}">${F(WSHELL, '#C89A62')}${F(WSHELL_SHADE, '#A87A44')}
  ${L('M70 60c-10 16-12 40-6 62M82 46c-6 22-4 48 4 72M120 50c8 20 8 46 0 68M136 64c8 16 8 38 2 56', '#8A5E30')}${L('M58 92c0-14 4-26 12-36', '#E6C08C', 6)}
  ${O(WSHELL)}${L('M100 28c-6 22 6 44 0 66s6 52 0 80', INK, 4)}</g>`;
/* Kernel outline: a butterfly of scalloped lobes, notched at the top and bottom centre */
const KERNEL_W = (() => {
  const half = [[100, 48], [118, 34], [142, 38], [158, 56], [162, 80], [168, 104], [160, 128], [146, 148], [124, 158], [106, 150], [100, 142]];
  const pts = half.concat(half.slice(1, -1).reverse().map((p) => [200 - p[0], p[1]]));
  return 'M' + pts[0].join(' ') + pts.slice(1).concat([pts[0]]).map((p, i) => {
    const q = pts[i], r = Math.hypot(p[0] - q[0], p[1] - q[1]) * .62;
    return `A${r.toFixed(1)} ${r.toFixed(1)} 0 0 1 ${p[0]} ${p[1]}`;
  }).join('') + 'z';
})();
const walnutKernel = (t) => `<g transform="${t}">${F(KERNEL_W, '#D29A57')}
  ${L('M100 50c-6 16 6 30 0 46s6 32 0 46', '#6E3D1A', 5)}
  ${L('M60 62c10 2 14 10 10 18s2 16 12 16M48 104c10 0 14 8 10 16s4 14 14 14M74 44c2 8 10 12 18 10', '#8A5426')}
  ${L('M140 62c-10 2-14 10-10 18s-2 16-12 16M152 104c-10 0-14 8-10 16s-4 14-14 14M126 44c-2 8-10 12-18 10', '#8A5426')}
  ${L('M46 86c0-10 4-18 10-24', '#F0C68C', 6)}${O(KERNEL_W)}</g>`;

/* Seeded black raisins: bigger fruit, with two loose seeds */
const seed = (x, y, r) => `<path d="M0 -10c5 0 8 6 8 11s-3 9-8 9-8-4-8-9 3-11 8-11z" transform="translate(${x} ${y}) rotate(${r})" fill="#E3C48C" ${S4}/>`;

const FRUITS = {
  walnutKernels: () => walnutShell('translate(96 -6) scale(.5) rotate(20 100 100)') + walnutKernel('translate(-30 34) rotate(-18 100 100) scale(.66)') + walnutKernel('translate(30 30) rotate(14 100 100) scale(.8)'),
  walnutInShell: () => walnutShell('translate(-34 -18) rotate(-16 100 100) scale(.74)') + walnutShell('translate(40 -6) rotate(18 100 100) scale(.68)') + walnutKernel('translate(20 74) rotate(-8 100 100) scale(.5)'),
  raisinSeeded: () => [
    raisin(70, 80, 34, 42, -20, '#4A2C40', '#7A5270'), raisin(136, 88, 32, 40, 22, '#3B2333', '#6A4560'),
    raisin(96, 138, 34, 38, 4, '#553248', '#835B79')
  ].join('') + seed(152, 164, 30) + seed(170, 146, -18),
  ajwa: () => date('translate(98 92) scale(.46) rotate(34 100 100)', { b: '#5B3423', s: '#3F2216', w: '#7E5038', h: '#A9795A' }) +
    date('translate(-8 -6) rotate(-14 100 100)', { b: '#4A2A1D', s: '#301810', w: '#6E4630', h: '#9A6A48' }),
  medjool: () => date('translate(-34 12) rotate(-30 100 100) scale(.9)', { b: '#C07C3C', s: '#9E5F28', w: '#DDA468', h: '#F0C594' }) +
    date('translate(34 4) rotate(16 100 100) scale(.96)', { b: '#A9632C', s: '#874A1E', w: '#CB8A4E', h: '#E6B27C' }),
  almond: () => almond('translate(-36 18) rotate(-26 100 100) scale(.84)') + almond('translate(30 0) rotate(16 100 100) scale(.96)'),
  cashew: () => cashew('translate(96 96) scale(.5) rotate(160 100 100)') + cashew('translate(-12 -4) rotate(-8 100 100)'),
  pistachio: () => pistachio('translate(104 100) scale(.44) rotate(40 100 100)') + pistachio('translate(-10 -4) rotate(-12 100 100)'),
  raisin: () => [
    raisin(66, 74, 27, 35, -22, '#4A2C40', '#7A5270'), raisin(132, 70, 25, 33, 20, '#3B2333', '#6A4560'),
    raisin(100, 116, 29, 36, 6, '#553248', '#835B79'), raisin(54, 138, 23, 29, -32, '#3B2333', '#6A4560'), raisin(146, 134, 25, 31, 30, '#4A2C40', '#7A5270')
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
  quality: `${L('M76 76l26 26', INK, 11)}<circle cx="52" cy="52" r="32" fill="#FBE5C1" ${S4}/>${L('M37 53l11 11 20-23', '#47561E', 7)}`,
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
  tag: `<path d="M18 62l40-40h40v40l-40 40z" fill="#E3A63B" ${S4}/><circle cx="82" cy="38" r="7" fill="#FBE5C1" ${S4}/>
    ${L('M82 31c-4-12-16-20-30-16', INK, 4)}${L('M42 72l22-22M54 84l18-18', '#8A3A22', 4)}`,
  note: `<rect x="16" y="32" width="88" height="60" rx="4" fill="#FBE5C1" ${S4}/>${L('M16 36l44 32 44-32', INK, 4)}
    <circle cx="60" cy="68" r="11" fill="#A84E33" ${S4}/>${L('M56 68h8M60 64v8', '#FBE5C1', 3)}`,
  cook: `<path d="M18 56h84v8c0 22-16 36-42 36S18 86 18 64z" fill="#A84E33" ${S4}/>${L('M10 56h100', INK, 5)}
    ${L('M44 44c-4-8 4-12 0-20M60 44c-4-8 4-12 0-20M76 44c-4-8 4-12 0-20', INK, 4)}${L('M30 70c4 10 12 16 22 18', '#D98A64', 5)}`,
  camera: `<path d="M22 44h18l8-12h24l8 12h18v48H22z" fill="none" ${S4}/><circle cx="60" cy="66" r="15" fill="none" ${S4}/>`
};

Object.keys(VARIETIES).forEach((k) => { FRUITS[k] = () => variety(VARIETIES[k]); });

const NAME = { 'ajwa-dates': 'ajwa', 'medjool-dates': 'medjool', almonds: 'almond', cashews: 'cashew', pistachios: 'pistachio', raisins: 'raisin', 'black-raisins-seedless': 'raisin', 'black-raisins-seeded': 'raisinSeeded', 'walnut-kernels': 'walnutKernels', 'walnuts-in-shell': 'walnutInShell', figs: 'fig', apricots: 'apricot' };
const fruit = (slug, cls = '') => `<svg class="ill ${cls}" viewBox="0 0 200 200" aria-hidden="true">${(FRUITS[NAME[slug] || slug] || FRUITS.ajwa)()}</svg>`;
const icon2 = (name, cls = '') => `<svg class="ico ${cls}" viewBox="0 0 120 120" aria-hidden="true">${ICONS[name] || ''}</svg>`;

/* Four-point sparkle */
const sparkle = (cls = '') => `<svg class="sparkle ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c1 7 4 11 12 12-8 1-11 5-12 12-1-7-4-11-12-12 8-1 11-5 12-12z" fill="currentColor"/></svg>`;

/* Rotating text stamp. `id` must be unique on the page. */
const stamp = (id, text, root, cls = '') => `<svg class="stamp ${cls}" viewBox="0 0 200 200" aria-hidden="true">
  <defs><path id="${id}" d="M100 100m-72 0a72 72 0 1 1 144 0a72 72 0 1 1-144 0"/></defs>
  <circle cx="100" cy="100" r="97" fill="var(--stamp-bg, #47561E)" stroke="${INK}" stroke-width="4"/>
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
