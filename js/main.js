/* ============================================================
   Lahza — interactions
   ============================================================ */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  /* ---- Nav blur on scroll ---- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  var menu = document.getElementById('mobileMenu');
  document.getElementById('navToggle').addEventListener('click', function () { menu.classList.add('open'); });
  document.getElementById('mmClose').addEventListener('click', function () { menu.classList.remove('open'); });
  document.querySelectorAll('[data-mm]').forEach(function (a) {
    a.addEventListener('click', function () { menu.classList.remove('open'); });
  });

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll('.reveal');
  function revealNow(el) { el.classList.add('in'); }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { revealNow(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(function (r) { io.observe(r); });

    // Fallback: IO sometimes doesn't fire for already-visible nodes in some
    // rendering contexts — reveal anything in the viewport right away.
    var initCheck = function () {
      reveals.forEach(function (r) {
        if (r.classList.contains('in')) return;
        var rect = r.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) revealNow(r);
      });
    };
    requestAnimationFrame(initCheck);
    setTimeout(initCheck, 250);
    window.addEventListener('scroll', initCheck, { passive: true });
    // Safety net: never leave content invisible.
    setTimeout(function () { reveals.forEach(revealNow); }, 2500);
  } else {
    reveals.forEach(revealNow);
  }

  /* ---- Count-up stats ---- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var start = performance.now();
    var dur = 1500;
    function tick(now) {
      var t = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      var val = target * eased;
      el.textContent = (decimals ? val.toFixed(decimals) : Math.round(val)) + suffix;
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = (decimals ? target.toFixed(decimals) : target) + suffix;
    }
    requestAnimationFrame(tick);
    // Safety: guarantee the final value even if rAF is throttled/paused.
    setTimeout(function () {
      el.textContent = (decimals ? target.toFixed(decimals) : target) + suffix;
    }, dur + 200);
  }
  var counted = false;
  var statsSection = document.querySelector('.stats');
  if (statsSection && 'IntersectionObserver' in window) {
    var statObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !counted) {
          counted = true;
          document.querySelectorAll('[data-count]').forEach(animateCount);
          statObs.disconnect();
        }
      });
    }, { threshold: 0.4 });
    statObs.observe(statsSection);
  }

  /* ---- Shot counter ticking down (feature) ---- */
  var shotNum = document.getElementById('shotNum');
  if (shotNum && 'IntersectionObserver' in window) {
    var shotObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var n = 25;
          var iv = setInterval(function () {
            n--;
            shotNum.textContent = n;
            if (n <= 12) { clearInterval(iv); }
          }, 90);
          shotObs.disconnect();
        }
      });
    }, { threshold: 0.5 });
    shotObs.observe(shotNum);
  }

  /* ---- Use case tabs ---- */
  var tabs = document.querySelectorAll('.tab');
  var panels = document.querySelectorAll('.usecase-panel');
  var bg = document.getElementById('usecaseBg');
  var bgLabels = { wedding: 'WEDDING PHOTO · B&W', birthday: 'BIRTHDAY PHOTO · SEPIA', party: 'PARTY PHOTO · B&W', trip: 'TRIP PHOTO · SEPIA', everyday: 'EVERYDAY PHOTO · B&W' };
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var key = tab.getAttribute('data-tab');
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      panels.forEach(function (p) {
        p.classList.toggle('active', p.getAttribute('data-panel') === key);
      });
      if (bg) bg.setAttribute('data-label', bgLabels[key] || '');
    });
  });

  /* ---- QR placeholder generator (deterministic block grid) ---- */
  function makeQR(size, modules) {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + modules + ' ' + modules);
    svg.setAttribute('shape-rendering', 'crispEdges');
    var seed = 7;
    function rnd() { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; }
    function finder(x, y) {
      [[0,0,7],[1,1,5],[2,2,3]].forEach(function (f, i) {
        var r = document.createElementNS(ns, 'rect');
        r.setAttribute('x', x + f[0]); r.setAttribute('y', y + f[1]);
        r.setAttribute('width', f[2]); r.setAttribute('height', f[2]);
        r.setAttribute('fill', i === 1 ? '#0D0A06' : '#1a1206');
        if (i === 1) r.setAttribute('fill', '#F0EBE0');
        r.setAttribute('fill', i % 2 === 0 ? '#15110b' : '#F0EBE0');
        svg.appendChild(r);
      });
    }
    for (var y = 0; y < modules; y++) {
      for (var x = 0; x < modules; x++) {
        var inFinder = (x < 8 && y < 8) || (x >= modules - 8 && y < 8) || (x < 8 && y >= modules - 8);
        if (inFinder) continue;
        if (rnd() > 0.52) {
          var rect = document.createElementNS(ns, 'rect');
          rect.setAttribute('x', x); rect.setAttribute('y', y);
          rect.setAttribute('width', 1); rect.setAttribute('height', 1);
          rect.setAttribute('fill', '#15110b');
          svg.appendChild(rect);
        }
      }
    }
    finder(0, 0); finder(modules - 7, 0); finder(0, modules - 7);
    return svg;
  }
  var qrBig = document.getElementById('qrBig');
  if (qrBig) qrBig.appendChild(makeQR(0, 23));
  var qrSmall = document.getElementById('qrSmall');
  if (qrSmall) {
    var s = makeQR(0, 21);
    s.style.width = '100%';
    s.style.height = '100%';
    s.style.display = 'block';
    qrSmall.appendChild(s);
    qrSmall.style.cssText = 'width:96px;height:96px;background:#F0EBE0;padding:8px;border-radius:8px;';
  }
  /* ---- Pricing selector ---- */
  var pcPills = document.getElementById('pcPills');
  if (pcPills) {
    var PRICES = { 5: 'Free', 10: '$9', 25: '$19', 50: '$29', 100: '$49', 150: '$69', 200: '$89' };
    var pcCount = document.getElementById('pcCount');
    var pcPrice = document.getElementById('pcPrice');
    var pcMax = document.getElementById('pcMax');
    function tr(k, v) { return window.LahzaI18N ? LahzaI18N.t(k, v) : k; }
    function bump(el) {
      el.classList.remove('bump');
      void el.offsetWidth;
      el.classList.add('bump');
    }
    var currentN = '5';
    function renderPrice(n, doBump) {
      currentN = n;
      if (n === 'custom') {
        pcCount.textContent = '200+';
        pcPrice.textContent = tr('pricing.letsTalk');
        pcMax.textContent = tr('pricing.customMax');
      } else {
        pcCount.textContent = n;
        pcPrice.innerHTML = PRICES[n] === 'Free' ? tr('pricing.free') : PRICES[n] + '<small>' + tr('pricing.perEvent') + '</small>';
        pcMax.textContent = tr('pricing.maxGuests', { n: n });
      }
      if (doBump) { bump(pcCount); bump(pcPrice); }
    }
    pcPills.addEventListener('click', function (e) {
      var btn = e.target.closest('.pc-pill');
      if (!btn) return;
      pcPills.querySelectorAll('.pc-pill').forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      renderPrice(btn.getAttribute('data-n'), true);
    });
    renderPrice('5', false);
    document.addEventListener('lahza:langchange', function () { renderPrice(currentN, false); });
  }
})();
