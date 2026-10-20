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
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  function $all(sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
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

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var el = entry.target;
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          if (!el.classList.contains('reveal-rev')) io.unobserve(el);
        } else if (el.classList.contains('reveal-rev') && entry.boundingClientRect.top > 0) {
          el.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { io.observe(el); });
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
      var triggers = $all('[aria-controls]', group).filter(function (t) {
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
  function initTabs() {
    $all('[data-tabs]').forEach(function (strip) {
      var tabs = $all('[role="tab"]', strip);

      function select(tab, focus) {
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
        window.matchMedia('(min-width: 1280px)').addEventListener('change', function (e) {
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

  function init() {
    initReveal();
    watchCounters(document);
    initAccordions();
    initTabs();
    initFilters();
    initAddCalendar();
    initHeroVideo();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
