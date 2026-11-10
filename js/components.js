/* ==========================================================================
   Multi X · components.js
   Comportamientos de los componentes del UI kit. Patrones de movimiento
   según design-system/motion.md (todos Base).

   .reveal / .reveal-rev         Entrada en viewport (una vez / reversible)
   [data-count]                  Contador de cifras (formato chileno)
   .goal__fill                   Barra de avance que se llena al entrar
   [data-accordion]              Acordeón ("single": uno abierto a la vez)
   [data-tabs]                   Pestañas
   [data-filters]                Barra de filtros (panel inferior en mobile)
   [data-add-calendar]           Agregar al calendario (opciones en mobile)
   video[data-hero-video]        Video de fondo: con movimiento reducido queda la imagen (poster)
   [data-inview-video]           Reproduce el video interno solo mientras el bloque está a la vista
   [data-doc-filter]             Filtra documentos por año, trimestre, tipo y texto (Centro de Resultados)
   [data-chain]                  Relato vertical: un paso a la vez; flechas y tramos para cambiar de paso
   [data-steps]                  Pasos con ilustración que avanzan solos (Soluciones en Productos)
   [data-section-open]           Apertura: la sección crema se abre a todo el ancho con el scroll
   [data-section-curve]          Borde inferior curvo de una sección que se aplana con el scroll
   video[data-hover-video]       Video que se reproduce solo con hover o foco en su enlace (marcas)
   [data-variant-switch]         Switch de vista: botones data-show cambian data-variant del bloque
   [data-globe]                  Globo de puntos con pines (gira, se arrastra; Firma)
   Cursor                        Punto con anillo (blanco sobre oscuro); en clickeables el anillo crece
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  function $all(sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  }

  // Texto para búsquedas: sin tildes ni mayúsculas ("documentacion" encuentra
  // "Documentación"; también ñ → n y ü → u)
  function fold(text) {
    return String(text).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  function cssMs(name) {
    var v = getComputedStyle(root).getPropertyValue(name).trim();
    return v.indexOf('ms') > -1 ? parseFloat(v) : parseFloat(v) * 1000 || 0;
  }

  var hasIO = 'IntersectionObserver' in window;

  /* ---------- Entrada en viewport ---------- */
  function initReveal() {
    var items = $all('.reveal, .reveal-rev');

    // Desfase entre hermanos (máximo 3 pasos)
    items.forEach(function (el) {
      var siblings = $all(':scope > .reveal, :scope > .reveal-rev', el.parentElement);
      var i = siblings.indexOf(el);
      el.style.setProperty('--reveal-step', String(Math.min(Math.max(i, 0), 3)));
    });

    if (!hasIO) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    // Dentro de un carrusel (scroll horizontal) el contenedor recorta a los que
    // quedan a la derecha y nunca "entran": se observa el carrusel y, al entrar,
    // se revelan todos sus elementos (con el mismo desfase)
    var groups = new Map();
    items.forEach(function (el) {
      var parent = el.parentElement;
      var ox = parent ? getComputedStyle(parent).overflowX : '';
      var target = (ox === 'auto' || ox === 'scroll') ? parent : el;
      if (!groups.has(target)) groups.set(target, []);
      groups.get(target).push(el);
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        groups.get(entry.target).forEach(function (el) {
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
          } else if (el.classList.contains('reveal-rev') && entry.boundingClientRect.top > 0) {
            el.classList.remove('is-visible');
          }
        });
        var once = groups.get(entry.target).every(function (el) { return !el.classList.contains('reveal-rev'); });
        if (entry.isIntersecting && once) io.unobserve(entry.target);
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });

    groups.forEach(function (els, target) { io.observe(target); });
  }

  /* ---------- Contadores (Cifra L/M/S) ----------
     <span data-count="3500" data-prefix="+" data-suffix="%" data-decimals="0"> */
  function formatCL(value, decimals) {
    return new Intl.NumberFormat('es-CL', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value);
  }

  function renderCount(el, value) {
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    el.textContent = (el.getAttribute('data-prefix') || '') + formatCL(value, decimals) + (el.getAttribute('data-suffix') || '');
  }

  function runCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var duration = cssMs('--duration-counter');
    if (!duration) {
      renderCount(el, target);
      return;
    }
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var t = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - t, 3); // ease-out cúbica
      renderCount(el, target * eased);
      if (t < 1) window.requestAnimationFrame(step);
    }
    renderCount(el, 0);
    window.requestAnimationFrame(step);
  }

  function fill(el) {
    el.classList.add('is-filled');
  }

  var countIO = hasIO ? new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      if (el.hasAttribute('data-count')) runCount(el);
      else fill(el);
      countIO.unobserve(el);
    });
  }, { threshold: 0.4 }) : null;

  function watchCounters(ctx) {
    $all('[data-count], .goal__fill', ctx).forEach(function (el) {
      if (el.closest('[hidden]')) return; // se activan al mostrar su panel
      if (countIO) {
        if (el.hasAttribute('data-count') && cssMs('--duration-counter')) renderCount(el, 0);
        countIO.observe(el);
      }
      else if (el.hasAttribute('data-count')) renderCount(el, parseFloat(el.getAttribute('data-count')));
      else fill(el);
    });
  }

  function replayCounters(ctx) {
    $all('[data-count]', ctx).forEach(runCount);
    $all('.goal__fill', ctx).forEach(function (el) {
      el.classList.remove('is-filled');
      void el.offsetWidth;
      fill(el);
    });
  }

  /* ---------- Acordeones ----------
     <div data-accordion="single">
       <button aria-expanded aria-controls="p1"> … </button>
       <div id="p1" class="acc-panel" hidden> … </div> */
  function initAccordions() {
    $all('[data-accordion]').forEach(function (group) {
      var single = group.getAttribute('data-accordion') === 'single';
      var triggers = $all('[aria-controls][aria-expanded]', group).filter(function (t) {
        return t.closest('[data-accordion]') === group;
      });
      triggers.forEach(function (t) {
        t.addEventListener('click', function () {
          var open = t.getAttribute('aria-expanded') !== 'true';
          if (single && open) {
            triggers.forEach(function (o) {
              if (o === t) return;
              o.setAttribute('aria-expanded', 'false');
              var p = document.getElementById(o.getAttribute('aria-controls'));
              if (p) p.hidden = true;
            });
          }
          t.setAttribute('aria-expanded', String(open));
          var panel = document.getElementById(t.getAttribute('aria-controls'));
          if (panel) panel.hidden = !open;
        });
      });
    });
  }

  /* ---------- Pestañas ---------- */
  var tabsIdCount = 0;
  function nextTabsId(prefix) {
    tabsIdCount += 1;
    return prefix + '-' + tabsIdCount;
  }

  function initTabs() {
    $all('[data-tabs]').forEach(function (strip) {
      var tabs = $all('[role="tab"]', strip);

      // Con data-tabs-hash, cada pestaña tiene su enlace (#data-hash): se abre al
      // cargar la página con ese hash y la URL se actualiza al cambiar de pestaña
      var useHash = strip.hasAttribute('data-tabs-hash');
      // - Pestañas de página (.page-tabs): siempre como sub-menú de sección, una
      //   franja fija bajo el sub-menú de Inversionistas (.is-bar), con flechas en
      //   los extremos si no caben.
      // - El resto (cápsula): en mobile, y desde tablet si no cabe en su espacio,
      //   un selector desplegable (lo crea este script; cada opción tiene como
      //   valor el id de su pestaña).
      var list = strip.querySelector('[role="tablist"]');
      var bar = strip.closest('.page-tabs');
      var picker = null;
      var wide = window.matchMedia('(min-width: 768px)');
      var fit;
      if (bar) {
        // Flechas en los extremos (como el sub-menú de Inversionistas): aparecen
        // solo si hay más pestañas hacia ese lado; al tocarlas la tira avanza
        var arrow = function (dir) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'page-tabs__more page-tabs__more--' + dir;
          b.setAttribute('aria-label', dir === 'next' ? 'Ver más pestañas' : 'Ver pestañas anteriores');
          b.hidden = true;
          b.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#i-chev-right"></use></svg>';
          b.addEventListener('click', function () {
            strip.scrollBy({ left: (dir === 'next' ? 1 : -1) * strip.clientWidth * 0.6, behavior: 'smooth' });
          });
          bar.appendChild(b);
          return b;
        };
        var prev = arrow('prev'), next = arrow('next');
        var updateMore = function () {
          prev.hidden = strip.scrollLeft <= 2;
          next.hidden = strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 2;
        };
        strip.addEventListener('scroll', updateMore, { passive: true });
        bar.classList.add('is-bar');
        fit = updateMore;
      } else if (strip.hasAttribute('data-tabs-static')) {
        // Pestañas que siempre se ven (sin selector desplegable): Estrategia ABC
        fit = function () {};
      } else {
        var pickerId = nextTabsId('tabs-select');
        var wrap = document.createElement('div');
        wrap.className = 'tabs-select';
        wrap.innerHTML =
          '<label class="visually-hidden" for="' + pickerId + '">' + ((list && list.getAttribute('aria-label')) || 'Ver') + '</label>' +
          '<div class="control control--select control--brand"><select class="control__input" id="' + pickerId + '"></select>' +
          '<svg class="icon" aria-hidden="true"><use href="#i-chev-down"></use></svg></div>';
        picker = wrap.querySelector('select');
        tabs.forEach(function (t) {
          if (!t.id) t.id = nextTabsId('tab');
          var o = document.createElement('option');
          o.value = t.id;
          o.textContent = t.textContent.trim();
          if (t.getAttribute('aria-selected') === 'true') o.selected = true;
          picker.appendChild(o);
        });
        strip.parentNode.insertBefore(wrap, strip);
        strip.classList.add('has-select');
        picker.addEventListener('change', function () {
          var t = document.getElementById(picker.value);
          if (t) select(t);
        });
        // Desde tablet se ven las pestañas, salvo que la cápsula no quepa en su
        // espacio: entonces también se usa el desplegable (.is-overflow)
        fit = function () {
          strip.classList.remove('is-overflow');
          wrap.classList.remove('is-shown');
          if (!wide.matches || !list) return;
          var box = strip.parentNode, cs = getComputedStyle(box);
          var room = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
          if (list.offsetWidth > room + 1) {
            strip.classList.add('is-overflow');
            wrap.classList.add('is-shown');
          }
        };
      }
      fit();
      window.addEventListener('resize', fit);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);

      function select(tab, focus) {
        if (useHash && tab.getAttribute('data-hash')) {
          history.replaceState(null, '', location.pathname + location.search + '#' + tab.getAttribute('data-hash'));
        }
        if (picker) picker.value = tab.id;
        tabs.forEach(function (t) {
          var on = t === tab;
          t.setAttribute('aria-selected', String(on));
          t.tabIndex = on ? 0 : -1;
          var panel = document.getElementById(t.getAttribute('aria-controls'));
          if (panel) panel.hidden = !on;
        });
        if (focus) tab.focus();
        // Tab activa visible y centrada en la tira con scroll (mobile)
        var left = tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2;
        strip.scrollTo({ left: Math.max(left, 0), behavior: cssMs('--duration-base') ? 'smooth' : 'auto' });
        var shown = document.getElementById(tab.getAttribute('aria-controls'));
        if (shown) replayCounters(shown);
      }

      function fromHash() {
        var h = location.hash.slice(1);
        var t = h && tabs.filter(function (x) { return x.getAttribute('data-hash') === h; })[0];
        if (t) select(t);
      }
      if (useHash) {
        fromHash();
        window.addEventListener('hashchange', fromHash);
      }

      tabs.forEach(function (tab, i) {
        tab.tabIndex = tab.getAttribute('aria-selected') === 'true' ? 0 : -1;
        tab.addEventListener('click', function () { select(tab); });
        tab.addEventListener('keydown', function (e) {
          var next = null;
          if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
          if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
          if (e.key === 'Home') next = tabs[0];
          if (e.key === 'End') next = tabs[tabs.length - 1];
          if (next) {
            e.preventDefault();
            select(next, true);
          }
        });
      });
    });
  }

  /* ---------- Barra de filtros ---------- */
  function initFilters() {
    $all('[data-filters]').forEach(function (box) {
      var toggle = box.querySelector('.filters__toggle');
      var panel = box.querySelector('.filters__panel');
      var scrim = box.querySelector('.filters__scrim');
      var countEl = box.querySelector('[data-filter-count]');
      var clearBtns = $all('[data-filter-clear]', box);
      var chips = $all('.chip[aria-pressed]', box);

      function activeCount() {
        return chips.filter(function (c) { return c.getAttribute('aria-pressed') === 'true'; }).length;
      }

      function update() {
        var n = activeCount();
        if (countEl) countEl.textContent = n ? '(' + n + ')' : '';
        // "Limpiar filtros" solo visible cuando hay filtros activos
        clearBtns.forEach(function (b) { b.hidden = n === 0; });
      }

      function setOpen(open) {
        box.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        document.body.classList.toggle('is-locked', open);
        if (open) {
          var first = panel.querySelector('select, input, button');
          if (first) setTimeout(function () { first.focus(); }, 50);
        } else {
          toggle.focus();
        }
      }

      chips.forEach(function (chip) {
        chip.addEventListener('click', function () {
          chip.setAttribute('aria-pressed', String(chip.getAttribute('aria-pressed') !== 'true'));
          update();
        });
      });

      clearBtns.forEach(function (b) {
        b.addEventListener('click', function () {
          chips.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
          $all('select', box).forEach(function (s) { s.selectedIndex = 0; });
          update();
        });
      });

      if (toggle) {
        toggle.addEventListener('click', function () { setOpen(!box.classList.contains('is-open')); });
        if (scrim) scrim.addEventListener('click', function () { setOpen(false); });
        $all('[data-filter-close]', box).forEach(function (b) {
          b.addEventListener('click', function () { setOpen(false); });
        });
        document.addEventListener('keydown', function (e) {
          if (e.key === 'Escape' && box.classList.contains('is-open')) setOpen(false);
        });
        window.matchMedia('(min-width: 1024px)').addEventListener('change', function (e) {
          if (e.matches && box.classList.contains('is-open')) {
            box.classList.remove('is-open');
            document.body.classList.remove('is-locked');
          }
        });
      }

      update();
    });
  }

  /* ---------- Agregar al calendario ---------- */
  function initAddCalendar() {
    $all('[data-add-calendar]').forEach(function (box) {
      var toggle = box.querySelector('.add-calendar__toggle');
      box.classList.add('js-ready');
      toggle.addEventListener('click', function () {
        var open = !box.classList.contains('is-open');
        box.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
      });
    });
  }

  /* ---------- Video de fondo del hero ----------
     Con prefers-reduced-motion se detiene y queda el poster (CLAUDE.md 3). */
  function initHeroVideo() {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    $all('video[data-hero-video]').forEach(function (v) {
      function apply() {
        if (reduce.matches) {
          v.removeAttribute('autoplay');
          v.pause();
          v.preload = 'none';
        } else {
          var p = v.play();
          if (p && p.catch) p.catch(function () {});
        }
      }
      apply();
      reduce.addEventListener('change', apply);
    });
  }

  /* ---------- Video a la vista ([data-inview-video]) ----------
     Reproduce el video interno mientras el bloque está a la vista y lo pausa al
     salir. Con movimiento reducido no se reproduce (queda el poster). */
  function initInviewVideos() {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    $all('[data-inview-video]').forEach(function (box) {
      var v = box.querySelector('video');
      if (!v || !hasIO) return;
      new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting && !reduce.matches) {
          var p = v.play();
          if (p && p.catch) p.catch(function () {});
        } else {
          v.pause();
        }
      }, { threshold: 0.25 }).observe(box);
    });
  }

  /* ---------- Filtro de documentos ([data-doc-filter="#lista"]) ----------
     Sobre la barra de filtros: filtra las filas (.doc-row con data-year,
     data-quarter y data-type) de la lista indicada. Oculta los años sin
     resultados, actualiza los conteos, abre los años con resultados mientras hay
     filtros y muestra el estado vacío si no queda nada. */
  function initDocFilter() {
    $all('[data-doc-filter]').forEach(function (box) {
      var list = document.querySelector(box.getAttribute('data-doc-filter'));
      if (!list) return;
      var selects = $all('select[name]', box);
      var search = box.querySelector('input[type="search"]');
      var rows = $all('.doc-row', list);
      var years = $all('.doc-year', list);
      var empty = list.parentElement.querySelector('.empty-state');
      var countEl = box.querySelector('[data-doc-count]');
      var clearBtns = $all('[data-filter-clear]', box);
      var toggleCount = box.querySelector('[data-filter-count]');

      function apply() {
        var f = {};
        selects.forEach(function (s) { f[s.name] = s.value; });
        var q = search ? fold(search.value.trim()) : '';
        // Cada palabra buscada debe aparecer, en cualquier orden ("presentacion q2")
        var words = q ? q.split(/\s+/) : [];
        var active = selects.filter(function (s) { return s.value; }).length;
        var total = 0;
        rows.forEach(function (r) {
          var ok = (!f.year || r.dataset.year === f.year) &&
                   (!f.quarter || r.dataset.quarter === f.quarter) &&
                   (!f.type || r.dataset.type === f.type) &&
                   words.every(function (wd) { return fold(r.textContent).indexOf(wd) > -1; });
          r.hidden = !ok;
          if (ok) total++;
        });
        years.forEach(function (y, n) {
          var visible = $all('.doc-row', y).filter(function (r) { return !r.hidden; }).length;
          y.hidden = visible === 0;
          var c = y.querySelector('.doc-year__count');
          if (c) c.textContent = visible + (visible === 1 ? ' documento' : ' documentos');
          var head = y.querySelector('.doc-year__head');
          var panel = head && document.getElementById(head.getAttribute('aria-controls'));
          if (head && panel && (active || q)) { head.setAttribute('aria-expanded', 'true'); panel.hidden = false; }
        });
        if (empty) empty.hidden = total > 0;
        if (countEl) countEl.textContent = total + (total === 1 ? ' documento' : ' documentos');
        if (toggleCount) toggleCount.textContent = active ? '(' + active + ')' : '';
        clearBtns.forEach(function (b) { b.hidden = !(active || q); });
        // Varias listas bajo un mismo filtro (ej.: Junta de Accionistas): cada
        // grupo [data-doc-group] se oculta entero si se queda sin resultados
        $all('[data-doc-group]', list).forEach(function (g) {
          g.hidden = !$all('.doc-row', g).some(function (r) { return !r.hidden; });
        });
        var lists = list.matches('.doc-years') ? [list] : $all('.doc-years', list);
        lists.forEach(function (l) { l.classList.toggle('is-filtering', !!(active || q)); });
      }

      var emptyClear = empty && empty.querySelector('[data-empty-clear]');
      if (emptyClear) emptyClear.addEventListener('click', function () {
        selects.forEach(function (s) { s.selectedIndex = 0; });
        if (search) search.value = '';
        apply();
      });
      // Filtros desde la URL (?year=2026&quarter=Q2&type=EEFF&q=texto): los accesos
      // a un documento llegan con los filtros que lo dejan solo en la lista
      var params = new URLSearchParams(window.location.search);
      selects.forEach(function (s) {
        var v = params.get(s.name);
        if (v && $all('option', s).some(function (o) { return o.value === v; })) s.value = v;
      });
      if (search && params.get('q')) search.value = params.get('q');
      var fromUrl = ['year', 'quarter', 'type', 'q'].some(function (k) { return params.get(k); });

      selects.forEach(function (s) { s.addEventListener('change', apply); });
      if (search) search.addEventListener('input', apply);
      clearBtns.forEach(function (b) {
        b.addEventListener('click', function () {
          if (search) search.value = '';
          setTimeout(apply, 0); // initFilters ya reinició los selects
        });
      });
      apply();
      // Si se llegó con filtros en la URL, la página baja hasta los resultados
      if (fromUrl) {
        var sec = box.closest('section') || box;
        window.requestAnimationFrame(function () { sec.scrollIntoView({ block: 'start' }); });
      }
    });
  }

  /* ---------- Listado por año: máximo de años a la vista (.doc-years) ----------
     Regla para todas las listas por año: se ven los 5 años más recientes
     (data-years-limit cambia el máximo) y un botón "Ver años anteriores" muestra el
     resto. Mientras hay filtros o búsqueda (.is-filtering, lo pone initDocFilter)
     se muestran todos los años con resultados y el botón se oculta. */
  var yearsMoreCount = 0;
  function initDocYearsLimit() {
    $all('.doc-years').forEach(function (list) {
      var max = parseInt(list.getAttribute('data-years-limit'), 10) || 5;
      var years = $all(':scope > .doc-year', list);
      if (years.length <= max) return;
      yearsMoreCount += 1;
      if (!list.id) list.id = 'doc-years-' + yearsMoreCount;
      years.forEach(function (y, i) { if (i >= max) y.setAttribute('data-years-extra', ''); });
      list.classList.add('is-limited');
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn btn--tertiary hit reveal-more doc-years__more';
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-controls', list.id);
      btn.innerHTML = '<span class="reveal-more__label">Ver años anteriores</span><svg class="icon" aria-hidden="true"><use href="#i-chev-down"></use></svg>';
      list.insertAdjacentElement('afterend', btn);
      var label = btn.querySelector('.reveal-more__label');
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') !== 'true';
        btn.setAttribute('aria-expanded', String(open));
        list.classList.toggle('is-limited', !open);
        label.textContent = open ? 'Ver menos' : 'Ver años anteriores';
        if (!open) list.scrollIntoView({ block: 'nearest' });
      });
    });
  }

  /* ---------- Precio de la acción ([data-stock-chart]) ----------
     Dibuja MULTIX y el IPSA (ambos en base 100 al inicio del período) desde el JSON
     de .stock__data. Los chips cambian el período; el texto oculto resume la
     variación para lectores de pantalla. */
  function initStockChart() {
    $all('[data-stock-chart]').forEach(function (box) {
      var dataEl = box.querySelector('.stock__data');
      if (!dataEl) return;
      var data = JSON.parse(dataEl.textContent);
      var lines = $all('.stock__line', box);
      var idxLine = box.querySelector('.stock__line--index');
      var mainLine = lines.filter(function (l) { return l !== idxLine; })[0];
      var axis = box.querySelector('.stock__axis');
      var desc = box.querySelector('[aria-live]');
      var chips = $all('[data-period]', box);
      var W = 600, H = 200, PAD = 12;
      function pts(values, min, max) {
        return values.map(function (v, i) {
          var x = values.length > 1 ? i * W / (values.length - 1) : 0;
          var y = PAD + (max - v) / (max - min) * (H - 2 * PAD);
          return x.toFixed(1) + ',' + y.toFixed(1);
        }).join(' ');
      }
      function pct(values) {
        var c = values[values.length - 1] - 100;
        return (c >= 0 ? '+' : '−') + Math.abs(c).toFixed(2).replace('.', ',') + ' %';
      }
      function draw(period) {
        var d = data[period];
        if (!d) return;
        var all = d.multix.concat(d.ipsa);
        var min = Math.min.apply(null, all), max = Math.max.apply(null, all);
        if (max === min) max = min + 1;
        mainLine.setAttribute('points', pts(d.multix, min, max));
        idxLine.setAttribute('points', pts(d.ipsa, min, max));
        axis.innerHTML = d.ticks.map(function (t) { return '<li>' + t + '</li>'; }).join('');
        desc.textContent = 'Período ' + period + ': MULTIX ' + pct(d.multix) + '; IPSA ' + pct(d.ipsa) + '.';
      }
      chips.forEach(function (chip) {
        chip.addEventListener('click', function () {
          chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
          draw(chip.getAttribute('data-period'));
        });
      });
      var start = chips.filter(function (c) { return c.getAttribute('aria-pressed') === 'true'; })[0] || chips[0];
      draw(start.getAttribute('data-period'));
    });
  }

  /* ---------- Lista con "Ver más" por tramos ([data-show-more="6"]) ----------
     Muestra los primeros N elementos de la lista; el botón (texto en
     data-label-more, por defecto "Ver más") agrega los N siguientes y desaparece
     cuando ya se ven todos. El foco pasa al primer elemento nuevo. Ej.: Calendario
     › Eventos anteriores. */
  function initShowMore() {
    $all('[data-show-more]').forEach(function (list) {
      var step = parseInt(list.getAttribute('data-show-more'), 10) || 6;
      var items = $all(':scope > li', list);
      if (items.length <= step) return;
      var shown = step;
      items.forEach(function (li, i) { if (i >= shown) li.hidden = true; });
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn btn--tertiary hit reveal-more show-more';
      btn.innerHTML = '<span class="reveal-more__label">' + (list.getAttribute('data-label-more') || 'Ver más') + '</span><svg class="icon" aria-hidden="true"><use href="#i-chev-down"></use></svg>';
      list.insertAdjacentElement('afterend', btn);
      btn.addEventListener('click', function () {
        var first = null;
        items.slice(shown, shown + step).forEach(function (li) {
          li.hidden = false;
          li.classList.add('is-revealed');
          if (!first) first = li;
        });
        shown += step;
        if (first) { first.setAttribute('tabindex', '-1'); first.focus({ preventScroll: true }); }
        if (shown >= items.length) btn.remove();
      });
    });
  }

  /* ---------- Ver más ([data-reveal-more]) ----------
     Botón que muestra u oculta un grupo de elementos (aria-controls) y cambia su
     texto entre data-label-more y data-label-less. Ej.: memorias anteriores. */
  function initRevealMore() {
    $all('[data-reveal-more]').forEach(function (btn) {
      var target = document.getElementById(btn.getAttribute('aria-controls'));
      var label = btn.querySelector('.reveal-more__label');
      if (!target) return;
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') !== 'true';
        btn.setAttribute('aria-expanded', String(open));
        target.hidden = !open;
        if (label) label.textContent = open ? btn.getAttribute('data-label-less') : btn.getAttribute('data-label-more');
      });
    });
  }

  /* ---------- Relato vertical ([data-chain]) ----------
     Un paso visible a la vez (.chain__step). Lo cambia la persona con las
     flechas (atrás / adelante, en loop) o los tramos de la línea de secuencia.
     Sobre la composición, el círculo se abre a un video (.is-open): con hover del
     mouse, o con toque / Enter / Espacio en pantallas táctiles y teclado. Al
     cambiar de paso se cierra y, si el paso tiene data-video (y opcionalmente #t=
     segundos), el video pasa a ese, con la foto del paso como poster. Con
     movimiento reducido el video no se reproduce. */
  function initChain() {
    $all('[data-chain]').forEach(function (box) {
      var steps = $all('.chain__step', box);
      var segs = $all('.chain__seg', box);
      var arrows = $all('.chain__arrow', box);
      var current = box.querySelector('.chain__current');
      var stage = box.querySelector('.chain__stage');
      var video = stage && stage.querySelector('video');
      // Sin video (línea de tiempo) la composición no reacciona al hover
      var targets = video ? [stage].concat($all('.chain__img', box), $all('.chain__facts', box)).filter(Boolean) : [];
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
      var n = steps.length, i = 0, closeTimer = null;

      // Video en la composición: hover con mouse; toque o Enter / Espacio lo abre y cierra
      function setOpen(on) {
        box.classList.toggle('is-open', on);
        if (stage) stage.setAttribute('aria-pressed', String(on));
        if (!video) return;
        if (on && !reduce.matches) { var p = video.play(); if (p && p.catch) p.catch(function () {}); }
        else video.pause();
      }
      targets.forEach(function (t) {
        t.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { clearTimeout(closeTimer); setOpen(true); } });
        t.addEventListener('pointerleave', function (e) {
          if (e.pointerType !== 'mouse') return;
          var to = e.relatedTarget;
          // Pequeña espera: cruzar del círculo a los datos no cierra el video
          if (!targets.some(function (x) { return to && x.contains(to); })) {
            clearTimeout(closeTimer);
            closeTimer = setTimeout(function () { setOpen(false); }, cssMs('--duration-slow'));
          }
        });
        t.addEventListener('click', function (e) {
          if (e.pointerType !== 'mouse') setOpen(!box.classList.contains('is-open'));
        });
      });
      if (stage && video) {
        stage.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(!box.classList.contains('is-open')); }
        });
      }

      function go(k) {
        i = (k + n) % n;
        steps.forEach(function (s, j) {
          s.classList.toggle('is-active', j === i);
          if (j === i) s.removeAttribute('aria-hidden'); else s.setAttribute('aria-hidden', 'true');
        });
        segs.forEach(function (s, j) {
          if (j === i) s.setAttribute('aria-current', 'step'); else s.removeAttribute('aria-current');
        });
        if (current) current.textContent = (i + 1 < 10 ? '0' : '') + (i + 1);
        setOpen(false);
        var src = steps[i].getAttribute('data-video');
        if (video && src && video.getAttribute('src') !== src) {
          var foto = steps[i].querySelector('.chain__img');
          if (foto) video.setAttribute('poster', foto.getAttribute('src'));
          video.setAttribute('src', src);
          video.load();
        }
      }

      arrows[0].addEventListener('click', function () { go(i - 1); });
      arrows[1].addEventListener('click', function () { go(i + 1); });
      segs.forEach(function (s, j) { s.addEventListener('click', function () { go(j); }); });
      go(0);
    });
  }

  /* ---------- Integración vertical ([data-journey]) ----------
     Seis pasos a la vista (.journey__step con .journey__trigger) y un panel por
     paso (.journey__panel), con flechas anterior / siguiente (.chain__arrow). El
     activo reproduce su video (.journey__video) y avanza solo cada 8 ×
     --duration-reveal mientras la sección está a la vista; se pausa con el mouse o
     el foco dentro y se detiene cuando la persona elige un paso (o usa las flechas).
     Con movimiento reducido no avanza ni reproduce (queda la foto). */
  function initJourney() {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    $all('[data-journey]').forEach(function (box) {
      var items = $all('.journey__step', box);
      var panels = $all('.journey__panel', box);
      var current = 0, timer = null, visible = !hasIO, hovering = false, stopped = false;
      var interval = cssMs('--duration-reveal') * 8;
      var list = box.querySelector('.journey__steps');
      var programmatic = false, scrollTimer = null;
      function isSlider() { return list && list.scrollWidth > list.clientWidth + 1; }
      // Carrusel (mobile): lleva el paso activo al inicio de la pista
      function scrollToStep(i) {
        if (!isSlider()) return;
        programmatic = true;
        list.scrollTo({ left: items[i].offsetLeft - items[0].offsetLeft, behavior: reduce.matches ? 'auto' : 'smooth' });
      }

      function show(i, noScroll) {
        current = i;
        if (!noScroll && visible) scrollToStep(i);
        items.forEach(function (it, n) {
          var on = n === i;
          it.classList.toggle('is-active', on);
          it.querySelector('.journey__trigger').setAttribute('aria-expanded', String(on));
          var bar = it.querySelector('.journey__progress');
          if (bar && on) { bar.style.transition = 'none'; bar.style.transform = 'scaleX(0)'; void bar.offsetWidth; bar.style.transition = ''; bar.style.transform = ''; }
          var v = it.querySelector('.journey__video');
          if (!v) return;
          if (on && visible && !reduce.matches) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
          else v.pause();
        });
        panels.forEach(function (p, n) { p.hidden = n !== i; });
      }

      function schedule() {
        clearTimeout(timer);
        var run = visible && !hovering && !stopped && !reduce.matches && interval > 0;
        box.classList.toggle('is-paused', !run);
        box.style.setProperty('--journey-duration', run ? interval + 'ms' : '0ms');
        if (run) timer = setTimeout(function () { show((current + 1) % items.length); schedule(); }, interval);
      }

      function choose(k) {
        stopped = true;
        show((k + items.length) % items.length);
        schedule();
      }
      items.forEach(function (it, n) {
        it.querySelector('.journey__trigger').addEventListener('click', function () { choose(n); });
      });
      // Flechas: paso anterior / siguiente (en loop)
      var arrows = $all('.chain__arrow', box);
      if (arrows.length === 2) {
        arrows[0].addEventListener('click', function () { choose(current - 1); });
        arrows[1].addEventListener('click', function () { choose(current + 1); });
      }
      // Al deslizar a mano, el paso más cercano pasa a ser el activo y se detiene el avance
      if (list) list.addEventListener('scroll', function () {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function () {
          if (programmatic) { programmatic = false; return; }
          var x = list.scrollLeft, best = 0;
          items.forEach(function (it, n) {
            if (Math.abs(it.offsetLeft - items[0].offsetLeft - x) < Math.abs(items[best].offsetLeft - items[0].offsetLeft - x)) best = n;
          });
          if (best !== current) { stopped = true; show(best, true); schedule(); }
        }, cssMs('--duration-base'));
      }, { passive: true });
      box.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { hovering = true; schedule(); } });
      box.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') { hovering = false; show(current, true); schedule(); } });
      box.addEventListener('focusin', function () { hovering = true; schedule(); });
      box.addEventListener('focusout', function () { hovering = false; schedule(); });

      if (hasIO) {
        new IntersectionObserver(function (entries) {
          var was = visible;
          visible = entries[0].isIntersecting;
          if (visible && !was) show(current, true);
          if (!visible) $all('.journey__video', box).forEach(function (v) { v.pause(); });
          schedule();
        }, { threshold: 0.3 }).observe(box);
      }
      show(0, true);
      schedule();
    });
  }

  /* ---------- Personas (.person__trigger + .person-dialog) ----------
     La tarjeta abre el perfil completo en un <dialog> modal. Se cierra con la X,
     con Esc o tocando fuera; el foco vuelve a la tarjeta. */
  function initPeople() {
    $all('.person__trigger').forEach(function (btn) {
      var dlg = document.getElementById(btn.getAttribute('aria-controls'));
      if (!dlg || !dlg.showModal) return;
      btn.addEventListener('click', function () { dlg.showModal(); });
      var close = dlg.querySelector('.person-dialog__close');
      if (close) close.addEventListener('click', function () { dlg.close(); });
      dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
      dlg.addEventListener('close', function () { btn.focus(); });
    });
  }

  /* ---------- Formulario de contacto (.contact-form) ----------
     Prototipo: no se envía. Valida los campos obligatorios y muestra el mensaje
     de confirmación. */
  function initContactForm() {
    $all('.contact-form').forEach(function (form) {
      var done = form.querySelector('.contact-form__done');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }
        if (done) done.hidden = false;
        form.reset();
      });
    });
  }

  /* ---------- Círculo con video ([data-media-circle]) ----------
     Al abrirse aparece el botón de la sección (.media-circle__cta). El play
     (.media-circle__hint) es un botón real para toque y teclado.
     Foto que llena un círculo; con hover (mouse) el círculo se abre a un video
     (.is-open). Con toque o Enter / Espacio se abre y cierra. Con movimiento
     reducido el video no se reproduce (queda el poster). */
  function initMediaCircle() {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    $all('[data-media-circle]').forEach(function (box) {
      var video = box.querySelector('video');
      var hint = box.querySelector('.media-circle__hint');
      var cta = box.querySelector('.media-circle__cta');
      function setOpen(on) {
        box.classList.toggle('is-open', on);
        if (hint) hint.setAttribute('aria-pressed', String(on));
        if (!video) return;
        if (on && !reduce.matches) { var p = video.play(); if (p && p.catch) p.catch(function () {}); }
        else video.pause();
      }
      box.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') setOpen(true); });
      box.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') setOpen(false); });
      // Toque en el círculo (o en el play) y teclado en el play: abre y cierra.
      // El botón de la sección (.media-circle__cta) navega sin cerrar el video.
      box.addEventListener('click', function (e) {
        if (cta && cta.contains(e.target)) return;
        var byKeyboard = e.detail === 0; // Enter o Espacio sobre el play
        var byTouch = e.pointerType && e.pointerType !== 'mouse';
        if (byKeyboard || byTouch) setOpen(!box.classList.contains('is-open'));
      });
    });
  }

  /* ---------- Pasos ([data-steps]) ----------
     Lista de pasos (.steps__item con .steps__trigger y .steps__panel) y una
     video por paso (.steps__img, en el mismo orden; el activo se reproduce solo). Siempre hay uno activo.
     Avanzan solos cada 8 × --duration-reveal mientras la sección está a la vista;
     se pausan con el mouse o el foco dentro, y se detienen del todo cuando la
     persona elige un paso. Con movimiento reducido no avanzan solos. */
  function initSteps() {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    $all('[data-steps]').forEach(function (box) {
      var items = $all('.steps__item', box);
      var imgs = $all('.steps__img', box);
      var stage = box.querySelector('.steps__stage');
      var current = 0, timer = null, visible = false, hovering = false, stopped = false;
      var interval = cssMs('--duration-reveal') * 8;

      function show(i) {
        current = i;
        items.forEach(function (it, n) {
          var on = n === i;
          it.classList.toggle('is-active', on);
          it.querySelector('.steps__trigger').setAttribute('aria-expanded', String(on));
          it.querySelector('.steps__panel').hidden = !on;
          // Reinicia la línea de tiempo
          var bar = it.querySelector('.steps__progress');
          if (bar && on) { bar.style.transition = 'none'; bar.style.transform = 'scaleX(0)'; void bar.offsetWidth; bar.style.transition = ''; bar.style.transform = ''; }
        });
        imgs.forEach(function (img, n) {
          img.classList.toggle('is-active', n === i);
          // Video del paso: se reproduce solo mientras está activo (con movimiento reducido queda el poster)
          if (img.tagName !== 'VIDEO') return;
          if (n === i && !reduce.matches && (visible || !hasIO)) { var p = img.play(); if (p && p.catch) p.catch(function () {}); }
          else img.pause();
        });
        if (stage) stage.setAttribute('data-active', String(i + 1));
      }

      function schedule() {
        clearTimeout(timer);
        var run = visible && !hovering && !stopped && !reduce.matches && interval > 0;
        box.classList.toggle('is-paused', !run);
        box.style.setProperty('--steps-duration', run ? interval + 'ms' : '0ms');
        if (run) timer = setTimeout(function () { show((current + 1) % items.length); schedule(); }, interval);
      }

      items.forEach(function (it, n) {
        it.querySelector('.steps__trigger').addEventListener('click', function () {
          stopped = true;
          show(n);
          schedule();
        });
      });
      box.addEventListener('pointerenter', function () { hovering = true; schedule(); });
      box.addEventListener('pointerleave', function () { hovering = false; show(current); schedule(); });
      box.addEventListener('focusin', function () { hovering = true; schedule(); });
      box.addEventListener('focusout', function () { hovering = false; schedule(); });

      if (hasIO) {
        new IntersectionObserver(function (entries) {
          var was = visible;
          visible = entries[0].isIntersecting;
          if (visible && !was) show(current);
          if (!visible) imgs.forEach(function (v) { if (v.pause) v.pause(); });
          schedule();
        }, { threshold: 0.4 }).observe(box);
      }
      show(0);
      schedule();
    });
  }

  /* ---------- Borde inferior curvo ([data-section-curve]) ----------
     Escribe --curve-progress (0 a 1) en la sección: 0 mientras su borde inferior
     está bajo el 75 % de la ventana y 1 cuando ese borde llegó al 25 %. El CSS aplana
     el arco con ese valor. Con movimiento reducido no se mueve (queda el arco). */
  function initSectionCurve() {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    $all('[data-section-curve]').forEach(function (sec) {
      var raf = null;
      function update() {
        raf = null;
        if (reduce.matches) { sec.style.setProperty('--curve-progress', '1'); return; } // recto
        var vh = window.innerHeight;
        var bottom = sec.getBoundingClientRect().bottom;
        var p = Math.min(1, Math.max(0, (vh * 0.75 - bottom) / (vh * 0.5)));
        sec.style.setProperty('--curve-progress', p.toFixed(3));
      }
      function request() { if (!raf) raf = window.requestAnimationFrame(update); }
      window.addEventListener('scroll', request, { passive: true });
      window.addEventListener('resize', request);
      reduce.addEventListener('change', update);
      update();
    });
  }

  /* ---------- Apertura ([data-section-open]) ----------
     Escribe --open-progress (0 a 1) en la sección: 0 cuando su borde superior
     entra por abajo de la ventana y 1 cuando llega al 40 % superior. El CSS la
     recorta y la abre con ese valor. Con movimiento reducido queda en 1 (recta). */
  function initSectionOpen() {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    $all('[data-section-open]').forEach(function (sec) {
      var raf = null;
      function update() {
        raf = null;
        if (reduce.matches) { sec.style.setProperty('--open-progress', '1'); return; }
        var vh = window.innerHeight;
        var top = sec.getBoundingClientRect().top;
        var p = Math.min(1, Math.max(0, (vh - top) / (vh * 0.6)));
        sec.style.setProperty('--open-progress', p.toFixed(3));
      }
      function request() { if (!raf) raf = window.requestAnimationFrame(update); }
      window.addEventListener('scroll', request, { passive: true });
      window.addEventListener('resize', request);
      reduce.addEventListener('change', update);
      update();
    });
  }

  /* ---------- Video en hover (video[data-hover-video]) ----------
     El video se reproduce mientras el puntero o el foco están en su enlace o botón
     contenedor y se pausa al salir. Con movimiento reducido no se reproduce (queda
     el poster). preload="none": no se descarga hasta el primer hover. */
  function initHoverVideos() {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    $all('video[data-hover-video]').forEach(function (v) {
      var trigger = v.closest('a, button, [data-hover-scope]') || v.parentElement;
      function play() {
        if (reduce.matches) return;
        var p = v.play();
        if (p && p.catch) p.catch(function () {});
      }
      function stop() { v.pause(); }
      trigger.addEventListener('pointerenter', play);
      trigger.addEventListener('focus', play);
      trigger.addEventListener('pointerleave', stop);
      trigger.addEventListener('blur', stop);
    });
  }

  /* ---------- Switch de vista ([data-variant-switch]) ----------
     Botones con data-show="x" que cambian data-variant="x" en el bloque contenedor
     más cercano con data-variant (por ejemplo, flipbook o imagen del catálogo). */
  function initVariantSwitch() {
    $all('[data-variant-switch]').forEach(function (group) {
      var block = group.parentElement.closest('[data-variant]');
      if (!block) return;
      var buttons = $all('button[data-show]', group);
      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          block.setAttribute('data-variant', btn.getAttribute('data-show'));
          buttons.forEach(function (o) { o.setAttribute('aria-pressed', String(o === btn)); });
          window.dispatchEvent(new Event('scroll')); // recalcula el círculo al mostrarse
        });
      });
    });
  }

  /* ---------- Globo de mercados ([data-globe]) ----------
     Globo de puntos en proyección ortográfica (canvas), con los continentes de
     Natural Earth 110m (dominio público) convertidos a una máscara de puntos.
     Los pines salen de la lista .globe__pins del HTML (data-lat, data-lon,
     data-type="office|market"): cada uno pasa a ser un botón; con foco o clic el
     globo gira hasta centrarlo y muestra su nombre. Gira solo mientras está a la
     vista; se puede arrastrar. Con movimiento reducido queda quieto. Colores
     desde los tokens semánticos. */
  var GLOBE_LAND = '-54:132:39-40;-52.4:137:40-41;-50.8:142:41-43;-49.2:147:43-45;-47.6:152:44-47;-46:156:46-48,150-151;-44.4:161:47-50,156;-42.8:165:48-52,149,161;-41.2:169:50-53,152-153,165;-39.6:173:51-56,170-171;-38:177:52-59,158-160,174-175;-36.4:181:54-61,161-165;-34.8:185:55-62,152,164-169,181;-33.2:188:57-65,104-107,154-158,164-172;-31.6:192:58-68,106-111,158-164,166-177;-30:195:59-69,107-113,160-179;-28.4:198:60-71,108-116,162-182;-26.8:201:61-72,109-118,164-185;-25.2:204:62-74,110-120,127,167-188;-23.6:206:63-76,111-122,128-129,168-188;-22:209:64-80,113-124,130-131,171-190;-20.4:211:64-81,113-125,131-133,175-192;-18.8:213:65-82,114-127,133-135,178-192;-17.2:215:65-83,114-129,134-136,181-190,192-194;-15.6:217:63-84,116-132,137,183-190,194-195;-14:218:63-84,116-133,138,188-190,195;-12.4:220:63-86,118-134,190-193,197;-10.8:221:63-87,119-134;-9.2:222:62-88,119-134,202;-7.6:223:62-89,120-135,178-181,197-202;-6:224:62-89,120-135,178,195,198-203,205,208;-4.4:224:61-88,119-136,176-177,186,188,196-201,206;-2.8:225:63-85,119-137,176-178,181-184,187-188,195-200;-1.2:225:62-83,118-138,175-177,181-185,187-188,194-195;0.4:225:62-80,118-139,174-176,181-185,187-189,192;2:225:63-80,118-140,174-175,177,182-185;3.6:225:64-80,118-141,173,176,183-185;5.2:224:64-78,106-111,115-141,171-172,174-175,184-185;6.8:223:63-75,104-141,161,173,188;8.4:223:60-61,63-73,103-142,159,161,172-173,188-189;10:222:58-59,64-72,102-141,158-159,176;11.6:220:57-58,65,100-135,140,156-158,170,173-176,186;13.2:219:56-58,99-134,136,155-157,169,171-175,184;14.8:218:53-58,98-133,135-138,154-156,168-174,182;16.4:216:49-54,98-130,134-138,152-156,165-172,180;18:214:46-54,61,64,67,97-129,132-140,150-156,163-169,179;19.6:212:14,44-48,53,63-64,96-127,130-139,149-155,161-167,170;21.2:210:44-47,53,59-60,95-126,128-138,146-155,159-167,169;22.8:207:43-46,55-57,94-123,126-137,143-169;24.4:205:41-46,94-122,124-131,133-134,141-169,171;26:202:38,40-45,55,93-119,122-128,132-167;27.6:199:36,38-45,54,92-117,119-126,128-165;29.2:196:35,37-45,48,53,92-123,126-163;30.8:193:34,36-52,91-105,107-161;32.4:190:33-52,90-102,106,113-158,164;34:187:32-52,90-98,112-155,161;35.6:183:30-52,88,91-96,110-151,156,159-162;37.2:179:29-51,85-88,94,96,100,103-114,116-149,152-153,157-159;38.8:175:27-50,83-87,95,98,100-110,114-144,148-149,155;40.4:171:26-49,81-85,89,95-96,98-108,111-142,144-146,152;42:167:26-50,79-84,89,92-95,99,103-105,108-143,148;43.6:163:25-49,81-84,86-87,89-93,99-102,105-142,146;45.2:159:25-49,51,79-84,86-92,94-99,102-139;46.8:154:24-49,76-98,100-135;48.4:149:24-47,50-52,73-131,133;50:145:21-45,49,73-128,130;51.6:140:20-47,68-69,71-125;53.2:135:19-36,38-46,64,66-67,69-119,126-127;54.8:130:18-34,36-43,62-64,68,72-113,121-122;56.4:125:7,17-31,36-40,60-61,65,67,70-109,117-118;58:119:7,15-28,34-38,63-64,68-105,112;59.6:114:6-7,13-26,32-34,36,59-62,66-103,105,108;61.2:108:4-25,31-32,39-40,56-58,60-100,103-105;62.8:103:4-24,31,37-38,53-56,58-102;64.4:97:5-27,29-30,34-37,43,51-53,55-95;66:92:3-48,55;67.6:86:1-45,54,60;69.2:80:4-8,10-16,18-19,21,23-24,29-33,43,48-52,54,77;70.8:74:4-5,13-15,17,19-22,26-32,42,48,51-69;72.4:68:10,12,15,17-19,24-28,47,49-57,60-61;74:62:10,21-26,40,46-49;75.6:56:10-12,19-24,37,42-45,49-50;77.2:50:8,13,15-21,39;78.8:44:9,11-19,23-24,34;80.4:38:9-16,21;82:31:8-10,12-13';

  function initGlobes() {
    $all('[data-globe]').forEach(initGlobe);
  }

  function initGlobe(box) {
    var canvas = box.querySelector('.globe__canvas');
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    var RAD = Math.PI / 180;

    // Puntos de tierra: lat y lon precalculadas (seno y coseno)
    var dots = [];
    GLOBE_LAND.split(';').forEach(function (row) {
      var parts = row.split(':');
      var lat = +parts[0] * RAD;
      var n = +parts[1];
      parts[2].split(',').forEach(function (run) {
        var se = run.split('-');
        for (var i = +se[0]; i <= +(se[1] || se[0]); i++) {
          var lon = (-180 + (i + 0.5) * 360 / n) * RAD;
          dots.push([Math.sin(lat), Math.cos(lat), lon]);
        }
      });
    });

    // Pines desde el HTML
    var pins = $all('.globe__pins > li', box).map(function (li) {
      var label = li.textContent.trim();
      var type = li.getAttribute('data-type') || 'market';
      li.innerHTML =
        '<button type="button" class="globe__pin globe__pin--' + type + '">' +
          '<span class="globe__dot" aria-hidden="true"></span>' +
          '<span class="globe__label t-ui-small-strong">' + label + '</span>' +
        '</button>';
      var lat = +li.getAttribute('data-lat') * RAD;
      return { li: li, btn: li.firstChild, lat: lat, lon: +li.getAttribute('data-lon') * RAD, sinLat: Math.sin(lat), cosLat: Math.cos(lat) };
    });

    var view = { lon: -70 * RAD, lat: -12 * RAD }; // arranca mirando a Chile
    var size = 0, dpr = 1, colors = {};
    var visible = false, dragging = false, hovering = false, tween = null, last = 0, active = null;

    function readColors() {
      var css = getComputedStyle(box);
      colors.land = css.getPropertyValue('--globe-land').trim();
      colors.sphere = css.getPropertyValue('--globe-sphere').trim();
      colors.edge = css.getPropertyValue('--globe-edge').trim();
    }

    function resize() {
      var r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = r.width;
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.width * dpr);
      draw();
    }

    function draw() {
      if (!size) return;
      var R = size / 2 * 0.94;
      var c = size / 2;
      var sin0 = Math.sin(view.lat), cos0 = Math.cos(view.lat);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);

      // Esfera
      ctx.beginPath();
      ctx.arc(c, c, R, 0, Math.PI * 2);
      ctx.fillStyle = colors.sphere;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = colors.edge;
      ctx.stroke();

      // Tierra: puntos más tenues hacia el borde
      var dotR = Math.max(R * 0.0072, 0.9);
      ctx.fillStyle = colors.land;
      for (var i = 0; i < dots.length; i++) {
        var d = dots[i];
        var dl = d[2] - view.lon;
        var cosDl = Math.cos(dl);
        var z = sin0 * d[0] + cos0 * d[1] * cosDl;
        if (z <= 0) continue;
        var x = c + R * d[1] * Math.sin(dl);
        var y = c - R * (cos0 * d[0] - sin0 * d[1] * cosDl);
        ctx.globalAlpha = 0.2 + 0.7 * z;
        ctx.beginPath();
        ctx.arc(x, y, dotR, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Pines (HTML encima del canvas)
      pins.forEach(function (p) {
        var dl = p.lon - view.lon;
        var cosDl = Math.cos(dl);
        var z = sin0 * p.sinLat + cos0 * p.cosLat * cosDl;
        var x = c + R * p.cosLat * Math.sin(dl);
        var y = c - R * (cos0 * p.sinLat - sin0 * p.cosLat * cosDl);
        var front = z > 0.12;
        p.li.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
        p.li.classList.toggle('is-back', !front);
      });
    }

    function setActive(p) {
      if (active) active.li.classList.remove('is-active');
      active = p;
      if (p) p.li.classList.add('is-active');
    }

    // Girar hasta centrar un pin
    function focusPin(p) {
      setActive(p);
      var dur = reduce.matches ? 0 : cssMs('--duration-slow') * 3;
      var from = { lon: view.lon, lat: view.lat };
      var dLon = Math.atan2(Math.sin(p.lon - view.lon), Math.cos(p.lon - view.lon)); // camino corto
      var to = { lon: view.lon + dLon, lat: Math.max(-50 * RAD, Math.min(50 * RAD, p.lat)) };
      if (!dur) { view.lon = to.lon; view.lat = to.lat; draw(); return; }
      tween = { from: from, to: to, start: performance.now(), dur: dur };
      loop();
    }

    pins.forEach(function (p) {
      p.btn.addEventListener('click', function () { focusPin(p); });
      p.btn.addEventListener('focus', function () { focusPin(p); });
    });

    // Arrastrar para girar
    var startX = 0, startY = 0, startView = null;
    canvas.addEventListener('pointerdown', function (e) {
      dragging = true;
      tween = null;
      startX = e.clientX;
      startY = e.clientY;
      startView = { lon: view.lon, lat: view.lat };
      canvas.setPointerCapture(e.pointerId);
      box.classList.add('is-dragging');
    });
    canvas.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var k = Math.PI / size; // medio giro por ancho del globo
      view.lon = startView.lon - (e.clientX - startX) * k;
      view.lat = Math.max(-60 * RAD, Math.min(60 * RAD, startView.lat + (e.clientY - startY) * k));
      draw();
    });
    function endDrag() {
      dragging = false;
      box.classList.remove('is-dragging');
      loop();
    }
    canvas.addEventListener('pointerup', endDrag);
    canvas.addEventListener('pointercancel', endDrag);
    box.addEventListener('pointerenter', function () { hovering = true; });
    box.addEventListener('pointerleave', function () { hovering = false; loop(); });

    // Bucle: tween hacia un pin o giro lento continuo
    var raf = null;
    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
    function frame(now) {
      raf = null;
      var dt = last ? now - last : 16;
      last = now;
      if (tween) {
        var t = Math.min(1, (now - tween.start) / tween.dur);
        var e = easeOut(t);
        view.lon = tween.from.lon + (tween.to.lon - tween.from.lon) * e;
        view.lat = tween.from.lat + (tween.to.lat - tween.from.lat) * e;
        if (t >= 1) tween = null;
      } else if (!dragging && !hovering && !active && !reduce.matches) {
        view.lon -= dt * 0.00004; // giro lento: ~ una vuelta cada tres minutos
      } else {
        draw();
        last = 0;
        return;
      }
      draw();
      if (visible) raf = requestAnimationFrame(frame);
      else last = 0;
    }
    function loop() {
      if (!raf && visible) raf = requestAnimationFrame(frame);
    }

    // Clic fuera de un pin: suelta el pin activo y vuelve el giro
    box.addEventListener('click', function (e) {
      if (!e.target.closest('.globe__pin') && active && !dragging) { setActive(null); loop(); }
    });

    readColors();
    resize();
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
    else window.addEventListener('resize', resize);

    if (hasIO) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (visible) loop();
      }).observe(box);
    } else {
      visible = true;
      loop();
    }
    reduce.addEventListener('change', loop);
  }

  /* ---------- Cursor: punto con anillo ----------
     Solo con mouse (hover + puntero fino). Navy sobre fondos claros y blanco
     sobre fondos oscuros (según el fondo real bajo el puntero). Sobre elementos
     clickeables el punto se desvanece y el anillo se agranda. En campos de texto
     vuelve el cursor nativo. */
  function initCursor() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    var CLICKABLE = 'a[href], button, [role="button"], label, select, summary, input[type="checkbox"], input[type="radio"]';
    var TEXT = 'input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea';

    var cursor = document.createElement('div');
    cursor.className = 'cursor is-hidden';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.innerHTML = '<span class="cursor__ring"></span><span class="cursor__dot"></span>';
    document.body.appendChild(cursor);
    root.classList.add('has-cursor');

    // Fondo visible bajo el puntero (helper compartido MX.isDarkAt de layout.js).
    // Funciona también sobre el header fijo transparente, que deja ver el hero.
    function isDark(px, py) {
      return window.MX && window.MX.isDarkAt ? window.MX.isDarkAt(px, py) : false;
    }

    var x = 0, y = 0, raf = null;
    function place() {
      cursor.style.translate = x + 'px ' + y + 'px';
      cursor.classList.toggle('is-on-dark', isDark(x, y));
      raf = null;
    }

    document.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = window.requestAnimationFrame(place);
      var onText = e.target.closest && e.target.closest(TEXT);
      cursor.classList.toggle('is-hidden', !!onText);
      cursor.classList.toggle('is-hover', !onText && !!(e.target.closest && e.target.closest(CLICKABLE)));
    }, { passive: true });

    // Al hacer scroll cambia lo que hay bajo el puntero aunque el mouse no se mueva
    window.addEventListener('scroll', function () {
      if (!raf) raf = window.requestAnimationFrame(place);
    }, { passive: true });

    document.documentElement.addEventListener('mouseleave', function () { cursor.classList.add('is-hidden'); });

    // Dentro de un iframe (por ejemplo, el flipbook del catálogo) manda el cursor nativo
    $all('iframe').forEach(function (f) {
      f.addEventListener('pointerenter', function () { cursor.classList.add('is-hidden'); });
    });
  }

  /* ---------- Ofertas laborales (datos en js/ofertas.js) ----------
     - [data-job-list]: lista de ofertas (.job-row) armada desde los datos;
       data-job-limit muestra solo las primeras N que cumplen el filtro (destacadas).
     - [data-job-filter="#lista"]: filtra la lista con selects (name = region |
       ciudad | grupo), búsqueda y chips [data-job-chip] de un solo valor. Lee los
       filtros de la URL (?region=aysen&grupo=agua-mar&q=texto) y, con
       data-job-url, la mantiene al día; [data-job-all] lleva al listado completo
       con los filtros aplicados. Los selects con data-job-options se llenan solo
       con valores que tienen ofertas.
     - [data-job-detail] y [data-job-apply]: detalle y postulación de la oferta
       ?id=; [data-job-field] recibe cada dato y [data-job-apply-link] el enlace. */
  function initJobs() {
    var J = window.MX_JOBS;
    if (!J) return;
    function label(list, id) {
      var f = list.filter(function (x) { return x.id === id; })[0];
      return f ? f.label : '';
    }
    var jobs = J.list.map(function (r) {
      return { id: r[0], title: r[1], area: r[2], group: r[3], city: r[4], region: r[5],
               groupLabel: label(J.groups, r[3]), regionLabel: label(J.regions, r[5]) };
    });
    function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
    function place(j) { return j.city ? j.city + (j.regionLabel ? ', ' + j.regionLabel : '') : ''; }

    function row(j) {
      return '<li class="job-row" data-region="' + j.region + '" data-ciudad="' + esc(j.city) + '" data-grupo="' + j.group + '">' +
        '<a class="job-row__link" href="oferta.html?id=' + j.id + '">' +
          '<span class="job-row__body">' +
            '<span class="t-label job-row__id">ID ' + j.id + '</span>' +
            '<h3 class="t-h3 job-row__title">' + esc(j.title) + '</h3>' +
            '<span class="job-row__meta t-small">' +
              '<span>' + esc(j.area) + ' · ' + esc(j.groupLabel) + '</span>' +
              (j.city ? '<span>' + esc(place(j)) + '</span>' : '') +
            '</span>' +
          '</span>' +
          '<span class="job-row__more t-ui-button-sm">Ver oferta<svg class="icon" aria-hidden="true"><use href="#i-arrow"></use></svg></span>' +
        '</a></li>';
    }
    $all('[data-job-list]').forEach(function (list) {
      list.innerHTML = jobs.map(row).join('');
    });

    $all('[data-job-filter]').forEach(function (box) {
      var list = document.querySelector(box.getAttribute('data-job-filter'));
      if (!list) return;
      var rows = $all('.job-row', list);
      var limit = parseInt(list.getAttribute('data-job-limit'), 10) || 0;
      var selects = $all('select[name]', box);
      var chips = $all('[data-job-chip]', box);
      var search = box.querySelector('input[type="search"]');
      var countEl = box.querySelector('[data-job-count]');
      var toggleCount = box.querySelector('[data-filter-count]');
      var clearBtns = $all('[data-filter-clear]', box);
      var empty = list.parentElement.querySelector('.empty-state');
      var allLinks = $all('[data-job-all]');

      // Opciones de los selects: solo valores con ofertas publicadas
      selects.forEach(function (s) {
        var kind = s.getAttribute('data-job-options');
        if (!kind) return;
        var opts = [];
        if (kind === 'region') opts = J.regions.filter(function (r) { return jobs.some(function (j) { return j.region === r.id; }); }).map(function (r) { return [r.id, r.label]; });
        if (kind === 'grupo') opts = J.groups.filter(function (g) { return jobs.some(function (j) { return j.group === g.id; }); }).map(function (g) { return [g.id, g.label]; });
        if (kind === 'ciudad') opts = jobs.map(function (j) { return j.city; }).filter(function (c, i, a) { return c && a.indexOf(c) === i; }).sort().map(function (c) { return [c, c]; });
        opts.forEach(function (o) {
          var el = document.createElement('option');
          el.value = o[0];
          el.textContent = o[1];
          s.appendChild(el);
        });
      });

      function values() {
        var f = {};
        selects.forEach(function (s) { if (s.value) f[s.name] = s.value; });
        chips.forEach(function (c) { if (c.getAttribute('aria-pressed') === 'true' && c.dataset.value) f[c.dataset.name] = c.dataset.value; });
        return f;
      }
      function apply() {
        var f = values();
        var q = search ? fold(search.value.trim()) : '';
        var words = q ? q.split(/\s+/) : [];
        var shown = 0, total = 0;
        rows.forEach(function (r) {
          var ok = Object.keys(f).every(function (k) { return r.dataset[k] === f[k]; }) &&
                   words.every(function (wd) { return fold(r.textContent).indexOf(wd) > -1; });
          if (ok) total++;
          var show = ok && (!limit || shown < limit);
          if (show) shown++;
          r.hidden = !show;
        });
        var active = Object.keys(f).length;
        if (empty) empty.hidden = total > 0;
        if (countEl) countEl.textContent = total + (total === 1 ? ' oferta' : ' ofertas');
        if (toggleCount) toggleCount.textContent = active ? '(' + active + ')' : '';
        clearBtns.forEach(function (b) { b.hidden = !(active || q); });
        var params = new URLSearchParams();
        Object.keys(f).forEach(function (k) { params.set(k, f[k]); });
        if (q) params.set('q', search.value.trim());
        var qs = params.toString();
        allLinks.forEach(function (a) {
          a.href = a.getAttribute('data-job-all') + (qs ? '?' + qs : '');
          var n = a.querySelector('[data-job-all-count]');
          if (n) n.textContent = '(' + total + ')';
        });
        if (box.hasAttribute('data-job-url')) history.replaceState(null, '', location.pathname + (qs ? '?' + qs : ''));
      }

      // Filtros desde la URL (los accesos de Trabaja con Nosotros llegan filtrados)
      var params = new URLSearchParams(location.search);
      var fromUrl = false;
      selects.forEach(function (s) {
        var v = params.get(s.name);
        if (v && $all('option', s).some(function (o) { return o.value === v; })) { s.value = v; fromUrl = true; }
      });
      if (search && params.get('q')) { search.value = params.get('q'); fromUrl = true; }

      chips.forEach(function (chip) {
        chip.addEventListener('click', function () {
          chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
          apply();
        });
      });
      selects.forEach(function (s) { s.addEventListener('change', apply); });
      if (search) search.addEventListener('input', apply);
      clearBtns.forEach(function (b) {
        b.addEventListener('click', function () {
          if (search) search.value = '';
          setTimeout(apply, 0); // initFilters reinicia los selects
        });
      });
      var emptyClear = empty && empty.querySelector('[data-empty-clear]');
      if (emptyClear) emptyClear.addEventListener('click', function () {
        selects.forEach(function (s) { s.selectedIndex = 0; });
        if (search) search.value = '';
        apply();
      });
      apply();
      setTimeout(apply, 0); // después de initFilters, que reinicia el contador del botón "Filtrar"
      if (fromUrl && !limit) {
        var sec = box.closest('section') || box;
        window.requestAnimationFrame(function () { sec.scrollIntoView({ block: 'start' }); });
      }
    });

    // Detalle y postulación de una oferta (?id=)
    var page = document.querySelector('[data-job-detail], [data-job-apply]');
    if (!page) return;
    var id = parseInt(new URLSearchParams(location.search).get('id'), 10);
    var job = jobs.filter(function (j) { return j.id === id; })[0] || jobs[0];
    var detail = J.details[job.id] || {};
    var data = { title: job.title, id: 'ID ' + job.id, area: job.area, group: job.groupLabel,
                 place: place(job) || '[ubicación por definir]', about: J.about,
                 challenge: detail.challenge || '[contenido por definir]' };
    $all('[data-job-field]').forEach(function (el) {
      var k = el.getAttribute('data-job-field');
      if (k === 'requirements') {
        el.innerHTML = (detail.requirements || ['[contenido por definir]']).map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('');
      } else if (data[k] != null) {
        el.textContent = data[k];
      }
    });
    $all('[data-job-apply-link]').forEach(function (a) { a.href = 'postulacion.html?id=' + job.id; });
    $all('[data-job-detail-link]').forEach(function (a) { a.href = 'oferta.html?id=' + job.id; });
    document.title = (page.hasAttribute('data-job-apply') ? 'Postular · ' : '') + job.title + ' · Multi X';

    // Postulación: comunas según la región, CV en PDF de hasta 2 MB y envío de prototipo
    var form = document.querySelector('[data-job-apply] form');
    if (!form) return;
    var region = form.querySelector('[name="region"]');
    var commune = form.querySelector('[name="comuna"]');
    (J.formRegions || []).forEach(function (r) {
      var o = document.createElement('option');
      o.value = r[0];
      o.textContent = r[1];
      region.appendChild(o);
    });
    region.addEventListener('change', function () {
      var list = (J.communes || {})[region.value] || [];
      commune.innerHTML = '<option value="">Seleccionar comuna</option>' + list.map(function (c) { return '<option>' + esc(c) + '</option>'; }).join('') +
        (region.value ? '<option>Otra comuna [por definir]</option>' : '');
      commune.disabled = !region.value;
    });
    var file = form.querySelector('input[type="file"]');
    var fileName = form.querySelector('[data-file-name]');
    var fileHelp = fileName ? fileName.textContent : '';
    function checkFile() {
      var f = file.files && file.files[0];
      file.setCustomValidity('');
      if (!f) { fileName.textContent = fileHelp; return; }
      fileName.textContent = f.name;
      if (!/\.pdf$/i.test(f.name)) file.setCustomValidity('Adjunta tu currículum en formato PDF.');
      else if (f.size > 2 * 1024 * 1024) file.setCustomValidity('El archivo supera los 2 MB.');
    }
    file.addEventListener('change', checkFile);
    var done = document.querySelector('[data-apply-done]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      checkFile();
      var fields = $all('input, select, textarea', form);
      fields.forEach(function (el) { el.removeAttribute('aria-invalid'); });
      var bad = fields.filter(function (el) { return !el.checkValidity(); });
      if (bad.length) {
        bad.forEach(function (el) { el.setAttribute('aria-invalid', 'true'); });
        form.reportValidity();
        return;
      }
      // Éxito a pantalla completa: se ocultan cabecera, franja y formulario
      $all('[data-apply-hide]').forEach(function (el) { el.hidden = true; });
      done.hidden = false;
      window.scrollTo(0, 0);
      var title = done.querySelector('h1');
      if (title) title.focus({ preventScroll: true });
    });
  }

  /* ---------- Noticias (window.MX_NEWS, js/noticias.js) ----------
     - [data-news-list]: listado paginado (MX_NEWS.perPage por página, ?pagina=)
       con la paginación del kit en [data-news-pager].
     - [data-news-detail]: detalle (?id=): [data-news-field] recibe título,
       fecha, bajada y cuerpo; [data-news-media] la foto; [data-news-share] los
       enlaces para compartir y [data-news-related] tres noticias más. */
  function initNews() {
    var N = window.MX_NEWS;
    if (!N) return;
    var MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
    function fmt(d) {
      var m = MONTHS[parseInt(d.split('-')[1], 10) - 1];
      return m.charAt(0).toUpperCase() + m.slice(1) + ' de ' + d.split('-')[0];
    }
    var news = N.list.map(function (a) { return { id: a[0], title: a[1], date: a[2], img: a[3] }; });
    function media(src, cls) {
      return src
        ? '<span class="news-item__media' + (cls || '') + '"><img src="' + esc(src) + '" alt="" loading="lazy"></span>'
        : '<span class="news-item__media news-item__media--empty' + (cls || '') + '"><span class="t-small">[foto por definir]</span></span>';
    }
    function item(n, i) {
      return '<li class="reveal" style="--reveal-step: ' + (i % 3) + '"><article class="news-item"><a class="news-item__link" href="noticia.html?id=' + esc(n.id) + '">' +
        media(n.img) +
        '<span class="news-item__body">' +
          '<span class="t-label news-item__date"><time datetime="' + n.date + '">' + fmt(n.date) + '</time></span>' +
          '<span class="t-h3 news-item__title">' + esc(n.title) + '</span>' +
          '<span class="btn btn--tertiary news-item__cta">Ver noticia<svg class="icon icon--arrow" aria-hidden="true"><use href="#i-arrow"></use></svg></span>' +
        '</span></a></article></li>';
    }

    var list = document.querySelector('[data-news-list]');
    if (list) {
      var per = N.perPage || 9;
      var pages = Math.ceil(news.length / per);
      var cur = parseInt(new URLSearchParams(location.search).get('pagina'), 10) || 1;
      cur = Math.min(Math.max(cur, 1), pages);
      list.innerHTML = news.slice((cur - 1) * per, cur * per).map(item).join('');
      var pager = document.querySelector('[data-news-pager]');
      if (pager && pages > 1) {
        var url = function (k) { return 'noticias.html' + (k > 1 ? '?pagina=' + k : ''); };
        var arrow = function (k, cls, label) {
          var off = k < 1 || k > pages;
          return '<a class="pagination__arrow ' + cls + '" href="' + (off ? '#' : url(k)) + '" aria-label="' + label + '"' + (off ? ' aria-disabled="true" tabindex="-1"' : '') + '><svg class="icon" aria-hidden="true"><use href="#i-chev-right"></use></svg></a>';
        };
        var nums = '';
        for (var k = 1; k <= pages; k++) {
          nums += '<li>' + (k === cur
            ? '<span class="pagination__item" aria-current="page">' + k + '</span>'
            : '<a class="pagination__item" href="' + url(k) + '" aria-label="Página ' + k + '">' + k + '</a>') + '</li>';
        }
        pager.innerHTML = '<div class="pagination">' + arrow(cur - 1, 'pagination__arrow--prev', 'Página anterior') +
          '<ol class="pagination__list">' + nums + '</ol>' +
          '<span class="pagination__status">Página ' + cur + ' de ' + pages + '</span>' +
          arrow(cur + 1, '', 'Página siguiente') + '</div>';
      }
    }

    var detail = document.querySelector('[data-news-detail]');
    if (!detail) return;
    var id = new URLSearchParams(location.search).get('id');
    var n = news.filter(function (x) { return x.id === id; })[0] || news[0];
    var d = N.details[n.id] || {};
    var data = { title: n.title, date: fmt(n.date), lead: d.lead || '[contenido por definir]' };
    $all('[data-news-field]').forEach(function (el) {
      var k = el.getAttribute('data-news-field');
      if (k === 'body') {
        el.innerHTML = (d.body || ['[contenido por definir]']).map(function (t) { return '<p class="t-body-l">' + esc(t) + '</p>'; }).join('');
      } else if (k === 'date') {
        el.innerHTML = '<time datetime="' + n.date + '">' + data.date + '</time>';
      } else if (data[k] != null) {
        el.textContent = data[k];
      }
    });
    var box = document.querySelector('[data-news-media]');
    var src = d.image || n.img;
    if (box) {
      if (src) box.innerHTML = '<img src="' + esc(src) + '" alt="">';
      else { box.classList.add('news-item__media--empty'); box.innerHTML = '<span class="t-small">[foto por definir]</span>'; }
    }
    var here = encodeURIComponent(location.href), t = encodeURIComponent(n.title);
    var share = {
      linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=' + here,
      x: 'https://x.com/intent/post?url=' + here + '&text=' + t,
      whatsapp: 'https://wa.me/?text=' + t + '%20' + here,
      facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + here,
      mail: 'mailto:?subject=' + t + '&body=' + here
    };
    $all('[data-share]').forEach(function (a) { a.href = share[a.getAttribute('data-share')]; });
    var rel = document.querySelector('[data-news-related]');
    if (rel) rel.innerHTML = news.filter(function (x) { return x.id !== n.id; }).slice(0, 3).map(item).join('');
    document.title = n.title + ' · Multi X';
  }

  /* ---------- Buscador del sitio (buscar.html, índice en js/busqueda.js) ----------
     Busca en páginas (MX_SEARCH.pages), noticias (MX_NEWS) y documentos
     (MX_SEARCH.docs), sin mayúsculas ni tildes; todas las palabras deben estar.
     Chips de tipo con conteo (se ocultan los que no tienen resultados); con
     Documentos aparecen Año y Sección. Filas .job-row con el término resaltado,
     10 por página con la paginación del kit. Todo queda en la URL:
     ?q=&tipo=paginas|noticias|documentos&anio=&seccion=&pagina= */
  function initSearch() {
    var page = document.querySelector('[data-search]');
    var S = window.MX_SEARCH;
    if (!page || !S) return;
    var PER = 10;
    var TYPES = [
      { id: '', label: 'Todos' },
      { id: 'paginas', label: 'Páginas', one: 'Página', cta: 'Ver página' },
      { id: 'noticias', label: 'Noticias', one: 'Noticia', cta: 'Ver noticia' },
      { id: 'documentos', label: 'Documentos', one: 'Documento', cta: 'Ver en su sección' }
    ];
    var T = {};
    TYPES.forEach(function (t) { T[t.id] = t; });
    var MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    var secLabel = {};
    S.sections.forEach(function (x) { secLabel[x.id] = x.label; });
    function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
    function norm(s) { return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }
    function newsDate(d) {
      var m = MONTHS[parseInt(d.split('-')[1], 10) - 1];
      return m.charAt(0).toUpperCase() + m.slice(1) + ' de ' + d.split('-')[0];
    }

    // Índice único: tipo, título, etiqueta, detalle, enlace, texto para buscar y orden
    var items = [];
    S.pages.forEach(function (x, i) {
      items.push({ type: 'paginas', title: x[0], label: x[1], meta: x[2], href: x[3], text: norm(x[0] + ' ' + x[1] + ' ' + x[2] + ' ' + x[4]), order: i });
    });
    ((window.MX_NEWS && window.MX_NEWS.list) || []).forEach(function (x, i) {
      items.push({ type: 'noticias', title: x[1], label: newsDate(x[2]), meta: '', href: 'noticia.html?id=' + x[0], text: norm(x[1]), order: i });
    });
    S.docs.forEach(function (x, i) {
      items.push({ type: 'documentos', title: x[0], label: secLabel[x[3]] + ' › ' + x[4], meta: x[1], href: x[5], year: x[2], section: x[3], text: norm(x[0] + ' ' + x[1] + ' ' + secLabel[x[3]] + ' ' + x[4]), order: -parseInt(x[2], 10) * 10000 + i });
    });

    var params = new URLSearchParams(location.search);
    var state = { q: (params.get('q') || '').trim(), tipo: params.get('tipo') || '', anio: params.get('anio') || '', seccion: params.get('seccion') || '', pagina: parseInt(params.get('pagina'), 10) || 1 };

    var input = page.querySelector('#search-q');
    var summary = page.querySelector('[data-search-summary]');
    var chips = page.querySelector('[data-search-types]');
    var docFilters = page.querySelector('[data-search-doc-filters]');
    var yearSel = page.querySelector('#search-year');
    var secSel = page.querySelector('#search-section');
    var list = page.querySelector('[data-search-results]');
    var empty = page.querySelector('[data-search-empty]');
    var pager = page.querySelector('[data-search-pager]');
    input.value = state.q;

    // Resalta cada palabra buscada en el título (sin tildes ni mayúsculas)
    function mark(title, words) {
      var plain = '', map = [];
      for (var i = 0; i < title.length; i++) {
        var c = norm(title[i]);
        for (var k = 0; k < c.length; k++) { plain += c[k]; map.push(i); }
      }
      var hit = [];
      words.forEach(function (w) {
        var at = plain.indexOf(w);
        while (at > -1) {
          for (var j = at; j < at + w.length; j++) hit[map[j]] = true;
          at = plain.indexOf(w, at + w.length);
        }
      });
      var out = '', open = false;
      for (var n = 0; n < title.length; n++) {
        if (hit[n] && !open) { out += '<mark class="search-mark">'; open = true; }
        if (!hit[n] && open) { out += '</mark>'; open = false; }
        out += esc(title[n]);
      }
      return out + (open ? '</mark>' : '');
    }

    function url(over) {
      var st = Object.assign({}, state, over || {});
      var u = new URLSearchParams();
      if (st.q) u.set('q', st.q);
      if (st.tipo) u.set('tipo', st.tipo);
      if (st.tipo === 'documentos' && st.anio) u.set('anio', st.anio);
      if (st.tipo === 'documentos' && st.seccion) u.set('seccion', st.seccion);
      if (st.pagina > 1) u.set('pagina', st.pagina);
      var qs = u.toString();
      return 'buscar.html' + (qs ? '?' + qs : '');
    }

    function fill(sel, values, current) {
      sel.innerHTML = '<option value="">Todos</option>' + values.map(function (v) {
        return '<option value="' + esc(v[0]) + '"' + (v[0] === current ? ' selected' : '') + '>' + esc(v[1]) + '</option>';
      }).join('');
    }

    function pagerHtml(pages) {
      var arrow = function (k, cls, label) {
        var off = k < 1 || k > pages;
        return '<a class="pagination__arrow ' + cls + '" href="' + (off ? '#' : esc(url({ pagina: k }))) + '" aria-label="' + label + '"' + (off ? ' aria-disabled="true" tabindex="-1"' : ' data-page="' + k + '"') + '><svg class="icon" aria-hidden="true"><use href="#i-chev-right"></use></svg></a>';
      };
      // Números: primera, última y las vecinas de la actual (… entre medio)
      var nums = '', last = 0;
      for (var k = 1; k <= pages; k++) {
        if (k !== 1 && k !== pages && Math.abs(k - state.pagina) > 1) continue;
        if (k - last > 1) nums += '<li><span class="pagination__gap" aria-hidden="true">…</span></li>';
        nums += '<li>' + (k === state.pagina
          ? '<span class="pagination__item" aria-current="page">' + k + '</span>'
          : '<a class="pagination__item" href="' + esc(url({ pagina: k })) + '" aria-label="Página ' + k + '" data-page="' + k + '">' + k + '</a>') + '</li>';
        last = k;
      }
      return '<div class="pagination">' + arrow(state.pagina - 1, 'pagination__arrow--prev', 'Página anterior') +
        '<ol class="pagination__list">' + nums + '</ol>' +
        '<span class="pagination__status">Página ' + state.pagina + ' de ' + pages + '</span>' +
        arrow(state.pagina + 1, '', 'Página siguiente') + '</div>';
    }

    function render() {
      var words = norm(state.q).split(/\s+/).filter(Boolean);
      if (!words.length) {
        summary.textContent = 'Escribe qué buscas: páginas, noticias o documentos del sitio.';
        chips.hidden = docFilters.hidden = empty.hidden = true;
        list.innerHTML = pager.innerHTML = '';
        return;
      }
      var nq = norm(state.q);
      var found = items.filter(function (it) {
        return words.every(function (w) { return it.text.indexOf(w) > -1; });
      });
      found.forEach(function (it) {
        var t = norm(it.title);
        it.score = (t.indexOf(nq) > -1 ? 4 : 0) + words.filter(function (w) { return t.indexOf(w) > -1; }).length;
      });
      var count = { '': found.length, paginas: 0, noticias: 0, documentos: 0 };
      found.forEach(function (it) { count[it.type]++; });
      if (state.tipo && !count[state.tipo]) state.tipo = '';

      chips.hidden = !found.length;
      chips.innerHTML = TYPES.filter(function (t) { return !t.id || count[t.id]; }).map(function (t) {
        return '<button class="chip" type="button" aria-pressed="' + (state.tipo === t.id) + '" data-type="' + t.id + '">' + t.label + ' (' + count[t.id] + ')</button>';
      }).join('');

      var shown = found.filter(function (it) { return !state.tipo || it.type === state.tipo; });
      docFilters.hidden = state.tipo !== 'documentos';
      if (state.tipo === 'documentos') {
        var years = {}, secs = {};
        shown.forEach(function (it) { years[it.year] = 1; secs[it.section] = 1; });
        if (state.anio && !years[state.anio]) state.anio = '';
        if (state.seccion && !secs[state.seccion]) state.seccion = '';
        fill(yearSel, Object.keys(years).sort().reverse().map(function (y) { return [y, y]; }), state.anio);
        fill(secSel, S.sections.filter(function (x) { return secs[x.id]; }).map(function (x) { return [x.id, x.label]; }), state.seccion);
        shown = shown.filter(function (it) {
          return (!state.anio || it.year === state.anio) && (!state.seccion || it.section === state.seccion);
        });
      }
      var rank = { paginas: 0, noticias: 1, documentos: 2 };
      shown.sort(function (a, b) { return b.score - a.score || rank[a.type] - rank[b.type] || a.order - b.order; });

      var total = shown.length;
      var pages = Math.max(1, Math.ceil(total / PER));
      state.pagina = Math.min(Math.max(state.pagina, 1), pages);
      summary.innerHTML = found.length
        ? (total === 1 ? '1 resultado' : total + ' resultados') + ' para <q>' + esc(state.q) + '</q>'
        : 'Sin resultados para <q>' + esc(state.q) + '</q>';
      empty.hidden = total > 0;
      list.innerHTML = shown.slice((state.pagina - 1) * PER, state.pagina * PER).map(function (it) {
        var t = T[it.type];
        return '<li class="job-row search-hit"><a class="job-row__link" href="' + esc(it.href) + '">' +
          '<span class="job-row__body">' +
            '<span class="t-label job-row__id">' + t.one + ' · ' + esc(it.label) + '</span>' +
            '<span class="t-h3 job-row__title">' + mark(it.title, words) + '</span>' +
            (it.meta ? '<span class="job-row__meta t-small"><span>' + esc(it.meta) + '</span></span>' : '') +
          '</span>' +
          '<span class="job-row__more t-ui-button-sm">' + t.cta + '<svg class="icon" aria-hidden="true"><use href="#i-arrow"></use></svg></span>' +
        '</a></li>';
      }).join('');
      pager.innerHTML = pages > 1 ? pagerHtml(pages) : '';
      history.replaceState(null, '', url());
    }

    chips.addEventListener('click', function (e) {
      var b = e.target.closest('[data-type]');
      if (!b) return;
      state.tipo = b.getAttribute('data-type');
      state.anio = state.seccion = '';
      state.pagina = 1;
      render();
    });
    yearSel.addEventListener('change', function () { state.anio = yearSel.value; state.pagina = 1; render(); });
    secSel.addEventListener('change', function () { state.seccion = secSel.value; state.pagina = 1; render(); });
    pager.addEventListener('click', function (e) {
      var a = e.target.closest('[data-page]');
      if (!a) return;
      e.preventDefault();
      state.pagina = parseInt(a.getAttribute('data-page'), 10);
      render();
      summary.scrollIntoView({ block: 'start' });
    });
    render();
  }

  function init() {
    initSearch();
    initNews();
    initJobs();
    initReveal();
    watchCounters(document);
    initAccordions();
    initTabs();
    initFilters();
    initAddCalendar();
    initHeroVideo();
    initGlobes();
    initVariantSwitch();
    initHoverVideos();
    initSectionCurve();
    initSectionOpen();
    initSteps();
    initChain();
    initJourney();
    initContactForm();
    initPeople();
    initRevealMore();
    initMediaCircle();
    initShowMore();
    initStockChart();
    initDocYearsLimit();
    initDocFilter();
    initInviewVideos();
    initCursor();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
