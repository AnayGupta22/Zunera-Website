/* Zunera — small, dependency-free interactions. */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* Year in the footer */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* Header hairline once the page scrolls */
  var header = $('[data-header]');
  var onScroll = function () { if (header) header.classList.toggle('scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  var toggle = $('[data-nav-toggle]');
  var drawer = $('[data-drawer]');
  if (toggle && drawer) {
    var setMenu = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      drawer.hidden = !open;
      document.body.classList.toggle('menu-open', open);
    };
    toggle.addEventListener('click', function () { setMenu(drawer.hidden); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 900) setMenu(false); });
  }

  /* Reveal on scroll */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (i % 5) * 40 + 'ms';
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* Label banner: draw the carton's notched, bulging tab (geometry traced from the carton,
     in units of the banner's height). Without JS the CSS pill stays. */
  var bannerPath = function (w, h) {
    var u = function (v) { return +(v * h).toFixed(2); };
    var r = function (v) { return +(w - v * h).toFixed(2); };
    return 'M' + u(.386) + ' 0H' + r(.386) + 'C' + r(.29) + ' 0 ' + r(.22) + ' ' + u(.05) + ' ' + r(.213) + ' ' + u(.155) +
      'C' + r(.1) + ' ' + u(.17) + ' ' + w + ' ' + u(.3) + ' ' + w + ' ' + u(.5) +
      'C' + w + ' ' + u(.7) + ' ' + r(.1) + ' ' + u(.83) + ' ' + r(.213) + ' ' + u(.845) +
      'C' + r(.22) + ' ' + u(.95) + ' ' + r(.29) + ' ' + h + ' ' + r(.386) + ' ' + h +
      'H' + u(.386) + 'C' + u(.29) + ' ' + h + ' ' + u(.22) + ' ' + u(.95) + ' ' + u(.213) + ' ' + u(.845) +
      'C' + u(.1) + ' ' + u(.83) + ' 0 ' + u(.7) + ' 0 ' + u(.5) +
      'C0 ' + u(.3) + ' ' + u(.1) + ' ' + u(.17) + ' ' + u(.213) + ' ' + u(.155) +
      'C' + u(.22) + ' ' + u(.05) + ' ' + u(.29) + ' 0 ' + u(.386) + ' 0Z';
  };
  var drawBanners = function () {
    $$('[data-banner]').forEach(function (el, i) {
      var old = el.querySelector('svg');
      if (old) old.remove();
      var w = el.offsetWidth, h = el.offsetHeight;
      if (!w || !h) return;
      var s = Math.max(1.25, h / 32);
      var id = 'znb' + i;
      el.insertAdjacentHTML('afterbegin',
        '<svg width="' + w + '" height="' + h + '" viewBox="' + (-s / 2) + ' ' + (-s / 2) + ' ' + (w + s) + ' ' + (h + s) + '" aria-hidden="true">' +
        '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#C7B258"/><stop offset=".3" stop-color="#9A9149"/><stop offset=".62" stop-color="#6E713C"/><stop offset="1" stop-color="#4C5A31"/>' +
        '</linearGradient></defs><path d="' + bannerPath(w, h) + '" fill="url(#' + id + ')" stroke="#E5D585" stroke-width="' + s + '"/></svg>');
      el.classList.add('drawn');
    });
  };
  drawBanners();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawBanners);
  var resizeT;
  window.addEventListener('resize', function () { clearTimeout(resizeT); resizeT = setTimeout(drawBanners, 120); });

  /* Home hero: product stage that cycles through the range */
  var stage = $('[data-stage]');
  if (stage) {
    var slides = $$('[data-slide]', stage);
    var nowEl = $('[data-stage-now]', stage);
    var cur = 0, timer = null;
    var show = function (n) {
      cur = (n + slides.length) % slides.length;
      slides.forEach(function (sl, i) {
        var on = i === cur;
        sl.classList.toggle('on', on);
        sl.setAttribute('aria-hidden', on ? 'false' : 'true');
        sl.setAttribute('tabindex', on ? '0' : '-1');
      });
      if (nowEl) nowEl.textContent = (cur < 9 ? '0' : '') + (cur + 1);
    };
    var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var play = function () { if (!still && !timer) timer = setInterval(function () { show(cur + 1); }, 4200); };
    var pause = function () { clearInterval(timer); timer = null; };
    var prev = $('[data-stage-prev]', stage), next = $('[data-stage-next]', stage);
    if (prev) prev.addEventListener('click', function (e) { e.preventDefault(); pause(); show(cur - 1); });
    if (next) next.addEventListener('click', function (e) { e.preventDefault(); pause(); show(cur + 1); });
    stage.addEventListener('mouseenter', pause);
    stage.addEventListener('mouseleave', play);
    stage.addEventListener('focusin', pause);
    play();
  }

  /* Home: range shelf arrows */
  var shelf = $('[data-shelf]');
  if (shelf) {
    var step = function (dir) { shelf.scrollBy({ left: dir * Math.max(280, shelf.clientWidth * 0.7), behavior: 'smooth' }); };
    var sp = $('[data-shelf-prev]'), sn = $('[data-shelf-next]');
    if (sp) sp.addEventListener('click', function () { step(-1); });
    if (sn) sn.addEventListener('click', function () { step(1); });
  }

  /* Home: "a handful for every moment" tabs */
  var tabs = $$('[data-moment]');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', String(on));
        var panel = document.getElementById('panel-' + t.getAttribute('data-moment'));
        if (panel) panel.hidden = !on;
      });
    });
  });

  /* Shop: category filter */
  var chips = $$('[data-filter]');
  var grid = $('[data-shop-grid]');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter');
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
      $$('.pc', grid).forEach(function (card) {
        card.hidden = !(f === 'all' || card.getAttribute('data-cat') === f);
        card.classList.add('in');
      });
    });
  });

  /* Product page: mobile buy bar appears once the main button scrolls away */
  var buybar = $('[data-buybar]');
  var mainBuy = $('.pdp .btn-cream');
  if (buybar && mainBuy && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      buybar.classList.toggle('show', !entries[0].isIntersecting && entries[0].boundingClientRect.top < 0);
    }).observe(mainBuy);
  }

  /* Forms: build a message and hand it to WhatsApp or the email app. Nothing is stored. */
  $$('form[data-enquiry]').forEach(function (form) {
    /* Pre-select from links like enquiry.html?type=trade&product=almonds */
    var params = new URLSearchParams(window.location.search);
    var type = params.get('type');
    var product = params.get('product');
    if (type) { var r = $('input[data-type="' + type.replace(/[^a-z]/g, '') + '"]', form); if (r) r.checked = true; }
    if (product) { var c = $('input[data-product="' + product.replace(/[^a-z-]/g, '') + '"]', form); if (c) c.checked = true; }

    var channel = 'whatsapp';
    $$('[data-send]', form).forEach(function (b) {
      b.addEventListener('click', function () { channel = b.getAttribute('data-send'); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = {};
      $$('input, select, textarea', form).forEach(function (el) {
        if (!el.name) return;
        if ((el.type === 'radio' || el.type === 'checkbox') && !el.checked) return;
        var v = el.value.trim();
        if (!v) return;
        data[el.name] = data[el.name] ? data[el.name] + ', ' + v : v;
      });
      var error = $('[data-form-error]', form);
      var ok = data.Name && (data.Phone || data.Email);
      if (error) error.hidden = !!ok;
      if (!ok) { var first = $('input[name="Name"]', form); if (first && !data.Name) first.focus(); return; }

      var subject = form.getAttribute('data-subject') || 'Enquiry from eatzunera.com';
      var lines = Object.keys(data).map(function (k) { return k + ': ' + data[k]; });
      var url;
      if (channel === 'email') {
        url = 'mailto:' + form.getAttribute('data-email') +
          '?subject=' + encodeURIComponent(subject) +
          '&body=' + encodeURIComponent(lines.join('\n'));
        window.location.href = url;
      } else {
        url = 'https://wa.me/' + form.getAttribute('data-wa') +
          '?text=' + encodeURIComponent('*' + subject + '*\n' + lines.join('\n'));
        window.open(url, '_blank', 'noopener');
      }
    });
  });

  /* Site search. The index (search-index.json) is built with the site and loaded only when needed. */
  var sheet = $('[data-search-sheet]');
  var root = sheet ? sheet.getAttribute('data-root') : '';
  var index = null, loading = null;
  var loadIndex = function () {
    if (index) return Promise.resolve(index);
    if (!loading) loading = fetch(root + 'search-index.json').then(function (r) { return r.json(); }).then(function (d) { index = d; return d; });
    return loading;
  };
  var norm = function (s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9& ]+/g, ' '); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var find = function (q) {
    var terms = norm(q).split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return index.map(function (row) {
      var title = ' ' + norm(row.t), rest = ' ' + norm(row.k + ' ' + row.d + ' ' + row.x), score = 0;
      for (var i = 0; i < terms.length; i++) {
        var t = terms[i], w = ' ' + t;
        if (title.indexOf(w) > -1) score += 10;
        else if (title.indexOf(t) > -1) score += 6;
        else if (rest.indexOf(w) > -1) score += 3;
        else if (t.length > 3 && rest.indexOf(t) > -1) score += 1;
        else return null;
      }
      if (row.k !== 'Page' && row.k !== 'Recipe') score += 0.5;
      return { row: row, score: score };
    }).filter(Boolean).sort(function (a, b) { return b.score - a.score; }).map(function (h) { return h.row; });
  };
  var render = function (box, q, limit) {
    if (!q.trim()) { box.innerHTML = ''; return; }
    loadIndex().then(function () {
      var hits = find(q), shown = limit ? hits.slice(0, limit) : hits;
      box.innerHTML = hits.length
        ? '<ul>' + shown.map(function (h) {
            return '<li><a href="' + root + h.u + '"><span class="sr-kind">' + esc(h.k) + '</span><strong>' + esc(h.t) + '</strong><small>' + esc(h.d) + '</small></a></li>';
          }).join('') + '</ul>' + (limit && hits.length > limit ? '<a class="search-all" href="' + root + 'search.html?q=' + encodeURIComponent(q) + '">See all ' + hits.length + ' results</a>' : '')
        : '<p class="search-empty">Nothing found for “' + esc(q) + '”. Try a product, an ingredient or a recipe name.</p>';
    }).catch(function () { box.innerHTML = '<p class="search-empty">Search is not available right now.</p>'; });
  };
  var wire = function (form, limit) {
    var input = $('[data-search-input]', form.parentNode), box = $('[data-search-results]', form.parentNode);
    if (!input || !box) return null;
    var timer;
    input.addEventListener('input', function () { clearTimeout(timer); timer = setTimeout(function () { render(box, input.value, limit); }, 120); });
    /* In the pop-up, Enter opens the full results page; on the results page it just refreshes the list */
    if (!limit) form.addEventListener('submit', function (e) { e.preventDefault(); render(box, input.value, 0); history.replaceState(null, '', '?q=' + encodeURIComponent(input.value)); });
    return input;
  };
  if (sheet) {
    var sheetInput = wire($('form', sheet), 6);
    var openSearch = function () { sheet.hidden = false; document.body.classList.add('search-open'); loadIndex(); setTimeout(function () { sheetInput.focus(); }, 30); };
    var closeSearch = function () { sheet.hidden = true; document.body.classList.remove('search-open'); };
    $$('[data-search-open]').forEach(function (a) { a.addEventListener('click', function (e) { if ($('[data-search-page]')) return; e.preventDefault(); openSearch(); }); });
    $('[data-search-close]', sheet).addEventListener('click', closeSearch);
    sheet.addEventListener('click', function (e) { if (e.target === sheet) closeSearch(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !sheet.hidden) closeSearch();
      if (e.key === '/' && sheet.hidden && !/input|textarea|select/i.test((document.activeElement || {}).tagName)) { e.preventDefault(); openSearch(); }
    });
  }
  var pageForm = $('[data-search-page]');
  if (pageForm) {
    var pageInput = wire(pageForm, 0);
    var q = new URLSearchParams(window.location.search).get('q') || '';
    if (pageInput) { pageInput.value = q; if (q) render($('[data-search-results]', pageForm.parentNode), q, 0); pageInput.focus(); }
  }
})();
