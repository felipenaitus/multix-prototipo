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
   video[data-hover-video]       Video que se reproduce solo con hover o foco en su enlace (marcas)
   [data-variant-switch]         Switch de vista: botones data-show cambian data-variant del bloque
   [data-scroll-grow]            Avance del scroll (0 a 1) en --scroll-progress (círculo del catálogo)
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

  /* ---------- Video en hover (video[data-hover-video]) ----------
     El video se reproduce mientras el puntero o el foco están en su enlace o botón
     contenedor y se pausa al salir. Con movimiento reducido no se reproduce (queda
     el poster). preload="none": no se descarga hasta el primer hover. */
  function initHoverVideos() {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    $all('video[data-hover-video]').forEach(function (v) {
      var trigger = v.closest('a, button') || v.parentElement;
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

  /* ---------- Avance del scroll ([data-scroll-grow]) ----------
     Escribe --scroll-progress (0 a 1) en el elemento: 0 cuando su borde superior
     entra por abajo de la ventana y 1 cuando llega arriba. El CSS decide qué hacer
     con él (por ejemplo, escalar el círculo del catálogo). Solo calcula mientras
     el elemento está a la vista; con movimiento reducido no hace nada (queda el
     valor por defecto del CSS). */
  function initScrollGrow() {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    $all('[data-scroll-grow]').forEach(function (el) {
      var visible = !hasIO, raf = null;
      function update() {
        raf = null;
        if (reduce.matches) { el.style.removeProperty('--scroll-progress'); return; }
        var r = el.getBoundingClientRect();
        var vh = window.innerHeight;
        var p = Math.min(1, Math.max(0, (vh - r.top) / vh));
        el.style.setProperty('--scroll-progress', p.toFixed(3));
      }
      function request() {
        if (visible && !raf) raf = window.requestAnimationFrame(update);
      }
      if (hasIO) {
        new IntersectionObserver(function (entries) {
          visible = entries[0].isIntersecting;
          request();
        }).observe(el);
      }
      window.addEventListener('scroll', request, { passive: true });
      window.addEventListener('resize', request);
      reduce.addEventListener('change', update);
      update();
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
        view.lon -= dt * 0.00008; // ~ una vuelta por minuto y medio
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

  function init() {
    initReveal();
    watchCounters(document);
    initAccordions();
    initTabs();
    initFilters();
    initAddCalendar();
    initHeroVideo();
    initGlobes();
    initScrollGrow();
    initVariantSwitch();
    initHoverVideos();
    initCursor();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
