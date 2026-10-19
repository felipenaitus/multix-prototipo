/* ==========================================================================
   Multi X · layout.js
   Componentes transversales como Web Components. Única definición del
   header, el footer y los bloques que se repiten en más de una página.
   Un cambio aquí se refleja en todas las páginas.

   <site-header variant current>             Header de una fila + desplegable + menú hamburguesa
   <site-footer>                             Footer
   <season-strip label text href cta>        Franja temporal del hero
   <ir-contact name role-title phone email>  Contacto IR

   Estilos en css/components.css. Íconos: sprite de Figma (UI Kit), salvo las
   redes sociales (linkedin, instagram, youtube), dibujadas en el mismo estilo
   y pendientes de llevar a Figma.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- Íconos (trazos exportados de Figma, node 75-2) ---------- */
  var ICONS = {
    arrow: ['0 0 16 16', '2.25 3.25', 1.5, ['M0.75 4.75H10.75M6.75 8.75L10.75 4.75L6.75 0.75']],
    download: ['0 0 16 16', '2.25 1.75', 1.5, ['M5.75 0.75V8.75M9.25 5.25L5.75 8.75L2.25 5.25M0.75 11.75H10.75']],
    external: ['0 0 16 16', '3.25 2.75', 1.5, ['M9.25 6.75V0.75H3.25M9.25 0.75L0.75 9.25']],
    calendar: ['0 0 16 16', '1.75 1.25', 1.5, [
      'M2.25 2.25H10.25C11.0784 2.25 11.75 2.92157 11.75 3.75V10.75C11.75 11.5784 11.0784 12.25 10.25 12.25H2.25C1.42157 12.25 0.75 11.5784 0.75 10.75V3.75C0.75 2.92157 1.42157 2.25 2.25 2.25Z',
      'M0.75 5.75H11.75M3.75 0.75V3.75M8.75 0.75V3.75']],
    'chev-down': ['0 0 16 16', '3.25 5.25', 1.5, ['M0.75 0.75L4.75 4.75L8.75 0.75']],
    'chev-right': ['0 0 12 12', '3.9375 2.4375', 1.125, ['M0.5625 0.5625L3.5625 3.5625L0.5625 6.5625']],
    search: ['0 0 16 16', '1.75 1.75', 1.5, [
      'M9.75 5.25C9.75 7.73528 7.73528 9.75 5.25 9.75C2.76472 9.75 0.75 7.73528 0.75 5.25C0.75 2.76472 2.76472 0.75 5.25 0.75C7.73528 0.75 9.75 2.76472 9.75 5.25Z',
      'M8.75 8.75L12.25 12.25']],
    check: ['0 0 14 14', '2.1875 3.0625', 1.75, ['M0.875 4.37502L3.5 7.00002L8.75 0.875016']],
    close: ['0 0 16 16', '3.75 3.75', 1.5, ['M0.75 0.75L4.25 4.25M4.25 4.25L7.75 7.75M4.25 4.25L7.75 0.75M4.25 4.25L0.75 7.75']],
    doc: ['0 0 18 18', '3.65625 1.18125', 1.6875, [
      'M0.84375 0.84375H6.46875L9.84375 4.21875V14.7937H0.84375V0.84375Z',
      'M6.46875 0.84375V4.21875H9.84375M3.09375 8.94375H7.59375M3.09375 11.7562H7.59375']],
    globe: ['0 0 14 14', '1.53125 1.53125', 1.3125, [
      'M10.2812 5.46875C10.2812 8.12662 8.12662 10.2812 5.46875 10.2812C2.81088 10.2812 0.65625 8.12662 0.65625 5.46875C0.65625 2.81088 2.81088 0.65625 5.46875 0.65625C8.12662 0.65625 10.2812 2.81088 10.2812 5.46875Z',
      'M0.65625 5.46875H3.28125M3.28125 5.46875H7.65625M3.28125 5.46875C3.28125 7.30625 3.98125 8.88125 5.46875 10.2812C6.95625 8.88125 7.65625 7.30625 7.65625 5.46875M3.28125 5.46875C3.28125 3.63125 3.98125 2.05625 5.46875 0.65625C6.95625 2.05625 7.65625 3.63125 7.65625 5.46875M7.65625 5.46875H10.2812']],
    mail: ['0 0 16 16', '1.25 2.75', 1.5, [
      'M1.75 0.75H11.75C12.3023 0.75 12.75 1.19772 12.75 1.75V8.75C12.75 9.30229 12.3023 9.75 11.75 9.75H1.75C1.19772 9.75 0.75 9.30229 0.75 8.75V1.75C0.75 1.19772 1.19772 0.75 1.75 0.75Z',
      'M1.25 1.45L6.75 5.75L12.25 1.45']],
    phone: ['0 0 16 16', '1.75 1.75', 1.5, ['M1.75 0.75H4.25L5.45 3.75L3.85 4.85C4.20185 5.7025 4.71868 6.47706 5.37081 7.12919C6.02294 7.78132 6.7975 8.29815 7.65 8.65L8.75 7.05L11.75 8.25V10.75C11.75 11.0152 11.6446 11.2696 11.4571 11.4571C11.2696 11.6446 11.0152 11.75 10.75 11.75C5.75 11.75 0.75 6.75 0.75 1.75C0.75 1.48478 0.855357 1.23043 1.04289 1.04289C1.23043 0.855357 1.48478 0.75 1.75 0.75Z']],
    minus: ['0 0 18 18', '2.53125 8.15625', 1.6875, ['M0.84375 0.84375H12.0938']],
    plus: ['0 0 18 18', '2.53125 2.53125', 1.6875, ['M6.46875 0.84375V6.46875M6.46875 6.46875V12.0938M6.46875 6.46875H0.84375M6.46875 6.46875H12.0938']],
    up: ['0 0 14 14', '3.0625 2.1875', 1.75, ['M3.9375 9.1875V0.875M7 3.9375L3.9375 0.875L0.875 3.9375']],
    // Redes sociales: dibujadas en el estilo del kit (no vienen de Figma)
    linkedin: ['0 0 16 16', '0 0', 1.5, ['M4 2.5H12A1.5 1.5 0 0 1 13.5 4V12A1.5 1.5 0 0 1 12 13.5H4A1.5 1.5 0 0 1 2.5 12V4A1.5 1.5 0 0 1 4 2.5Z', 'M5.5 7V11M5.5 5V5.01M8 11V7M8 9C8 7.9 8.9 7 10 7S11.5 7.6 11.5 8.5V11']],
    instagram: ['0 0 16 16', '0 0', 1.5, ['M5.5 2.5H10.5A3 3 0 0 1 13.5 5.5V10.5A3 3 0 0 1 10.5 13.5H5.5A3 3 0 0 1 2.5 10.5V5.5A3 3 0 0 1 5.5 2.5Z', 'M10.5 8A2.5 2.5 0 1 1 5.5 8A2.5 2.5 0 0 1 10.5 8Z', 'M11.25 4.75V4.76']],
    youtube: ['0 0 16 16', '0 0', 1.5, ['M4 3.5H12A2.5 2.5 0 0 1 14.5 6V10A2.5 2.5 0 0 1 12 12.5H4A2.5 2.5 0 0 1 1.5 10V6A2.5 2.5 0 0 1 4 3.5Z', 'M7 6.25V9.75L10 8Z']]
  };

  function injectSprite() {
    if (document.getElementById('mx-icons')) return;
    var symbols = Object.keys(ICONS).map(function (name) {
      var d = ICONS[name];
      var paths = d[3].map(function (p) {
        return '<path d="' + p + '" stroke-width="' + d[2] + '"/>';
      }).join('');
      return '<symbol id="i-' + name + '" viewBox="' + d[0] + '"><g transform="translate(' + d[1] + ')">' + paths + '</g></symbol>';
    }).join('');
    var holder = document.createElement('div');
    holder.innerHTML = '<svg id="mx-icons" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">' + symbols + '</svg>';
    document.body.insertBefore(holder.firstChild, document.body.firstChild);
  }

  /* Devuelve el SVG de un ícono. size: 'sm' (12) · 'md' (16, por defecto) · 'lg' (20). */
  function icon(name, size, extra) {
    var cls = 'icon icon--' + name + (size && size !== 'md' ? ' icon--' + size : '') + (extra ? ' ' + extra : '');
    return '<svg class="' + cls + '" aria-hidden="true" focusable="false"><use href="#i-' + name + '"></use></svg>';
  }

  window.MX = window.MX || {};
  window.MX.icon = icon;

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  var uid = 0;
  function nextId(prefix) {
    uid += 1;
    return prefix + '-' + uid;
  }

  /* Raíz del sitio, a partir de la ubicación de este script (js/layout.js).
     Permite usar el header y el footer desde subcarpetas (por ejemplo, pruebas/). */
  var ROOT = (function () {
    var s = document.currentScript && document.currentScript.src;
    return s ? new URL('../', s).href : '';
  })();

  function telHref(phone) {
    return 'tel:' + String(phone).replace(/[^\d+]/g, '');
  }

  /* ---------- Arquitectura de navegación (Etapa 1) ----------
     Páginas aún no construidas apuntan a "#". [contenido por definir] en bajadas. */
  var INVESTOR_PAGES = [
    { label: 'Inicio', href: '#' },
    { label: 'Centro de Resultados', href: '#' },
    { label: 'Gobernanza', href: '#' },
    { label: 'Calendario y Eventos', href: '#' },
    { label: 'Acción', href: '#' },
    { label: 'Contacto', href: '#' }
  ];

  // Accesos visibles en el header (desktop)
  var HEADER_MAIN = [
    { id: 'productos', label: 'Productos', href: '#' },
    { id: 'sustentabilidad', label: 'Sustentabilidad', href: '#' },
    { id: 'inversionistas', label: 'Inversionistas', href: '#', children: INVESTOR_PAGES }
  ];

  // Columna principal del menú hamburguesa, con la bajada del panel de vista previa
  var MENU_MAIN = [
    { id: 'nosotros', label: 'Nosotros', href: '#', lead: 'Historia, propósito y equipo detrás de un salmón del sur de Chile. [contenido por definir]' },
    { id: 'productos', label: 'Productos', href: '#', lead: 'Salmón fresco, congelado y ahumado para más de 30 mercados. [contenido por definir]' },
    { id: 'sustentabilidad', label: 'Sustentabilidad', href: '#', lead: 'Metas 2030, certificaciones y reportes de sustentabilidad. [contenido por definir]' },
    { id: 'inversionistas', label: 'Inversionistas', href: '#', lead: 'Resultados, gobierno corporativo y agenda para accionistas. [contenido por definir]', children: INVESTOR_PAGES },
    { id: 'trabaja', label: 'Trabaja con Nosotros', href: '#', lead: 'Oportunidades laborales en el sur de Chile y Santiago. [contenido por definir]' },
    { id: 'noticias', label: 'Noticias', href: '#', lead: 'Prensa, comunicados y presencia en ferias. [contenido por definir]' }
  ];

  var MENU_SECONDARY = [
    { label: 'Portal Proveedores', href: '#' },
    { label: 'Contacto', href: '#' },
    { label: 'Preguntas Frecuentes', href: '#' },
    { label: 'Canal de Denuncias', href: '#' }
  ];

  var HEADER_SECONDARY = [
    { label: 'Portal Proveedores', href: '#' },
    { label: 'Contacto', href: '#' }
  ];

  var LANGS = [
    { code: 'ES', lang: 'es', label: 'Español', href: '#', current: true },
    { code: 'EN', lang: 'en', label: 'English', href: '#' }
  ];

  var CONTACT = {
    phone: '+56 65 248 3700',
    email: 'contacto@multi-x.cl'
  };

  var OFFICES = [
    { name: 'Casa matriz · Puerto Montt', address: '[dirección por definir], Puerto Montt', phone: '+56 65 248 3700' },
    { name: 'Oficina Santiago', address: '[dirección por definir], Santiago', phone: '+56 2 2000 0000' }
  ];

  var SOCIAL = [
    { id: 'linkedin', label: 'LinkedIn', href: '#' },
    { id: 'instagram', label: 'Instagram', href: '#' },
    { id: 'youtube', label: 'YouTube', href: '#' }
  ];

  function langSwitch(extraCls) {
    return '<div class="lang-switch' + (extraCls ? ' ' + extraCls : '') + '" role="group" aria-label="Idioma">' +
      LANGS.map(function (l) {
        return '<a class="lang-switch__item hit" href="' + l.href + '" lang="' + l.lang + '" hreflang="' + l.lang + '"' +
          (l.current ? ' aria-current="true"' : '') + ' aria-label="' + esc(l.label) + '">' + esc(l.code) + '</a>';
      }).join('') +
      '</div>';
  }

  var desktopMq = window.matchMedia('(min-width: 1280px)');
  var hoverMq = window.matchMedia('(hover: hover) and (pointer: fine)');

  /* ======================================================================
     <site-header>
       variant="overlay"   Transparente sobre el hero; pasa a sólido al hacer scroll.
       (sin variant)       Sólido desde el inicio (páginas interiores).
       current="..."       Acceso activo (productos | sustentabilidad | inversionistas).
       demo + demo-state   Solo kit.html: muestra un estado fijo (transparent | light |
                           dark | compact), sin comportamiento de scroll ni overlay propio.
     Tema oscuro: se activa cuando la sección que queda detrás del header tiene
     data-header-theme="dark" (el footer lo trae por defecto).
     ====================================================================== */
  class SiteHeader extends HTMLElement {
    connectedCallback() {
      if (this._ready) return;
      this._ready = true;
      injectSprite();

      var self = this;
      var demo = this.hasAttribute('demo');
      var current = (this.getAttribute('current') || '').toLowerCase();
      var ddId = nextId('dd-inversionistas');
      var menuId = nextId('menu-overlay');
      var subId = nextId('menu-sub');

      this.classList.add('site-header');
      if (this.getAttribute('variant') === 'overlay') this.classList.add('site-header--overlay');
      if (demo) this.classList.add('site-header--demo');
      if (!demo) this.setAttribute('role', 'banner');

      var nav = HEADER_MAIN.map(function (item) {
        var cur = item.id === current ? ' is-current' : '';
        if (item.children) {
          return '<li class="nav__item nav__item--dropdown">' +
            '<button type="button" class="nav__link' + cur + '" aria-expanded="false" aria-controls="' + ddId + '" aria-haspopup="true">' +
              esc(item.label) + icon('chev-down', 'sm') +
            '</button>' +
            '<ul class="dropdown" id="' + ddId + '" role="list">' +
              item.children.map(function (c) {
                return '<li><a class="dropdown__link" href="' + c.href + '">' + esc(c.label) + '</a></li>';
              }).join('') +
            '</ul>' +
          '</li>';
        }
        return '<li class="nav__item"><a class="nav__link' + cur + '" href="' + item.href + '"' + (cur ? ' aria-current="page"' : '') + '>' + esc(item.label) + '</a></li>';
      }).join('');

      var bar =
        '<div class="header__bar">' +
          '<div class="header__bg" aria-hidden="true"></div>' +
          '<div class="container header__inner">' +
            '<a class="header__logo" href="' + ROOT + 'index.html" aria-label="Multi X, ir al inicio">MULTI X</a>' +
            '<nav class="header__nav" aria-label="Principal"><ul class="nav__list" role="list">' + nav + '</ul></nav>' +
            '<div class="header__tools">' +
              '<ul class="header__secondary" role="list">' +
                HEADER_SECONDARY.map(function (l) { return '<li><a class="hit" href="' + l.href + '">' + esc(l.label) + '</a></li>'; }).join('') +
              '</ul>' +
              '<a class="header__icon-btn" href="#" aria-label="Buscar">' + icon('search', 'lg') + '</a>' +
              langSwitch('header__lang') +
              '<button type="button" class="header__icon-btn" data-menu-toggle aria-expanded="false"' + (demo ? '' : ' aria-controls="' + menuId + '"') + ' aria-label="Abrir menú">' +
                '<span class="burger" aria-hidden="true"><span></span><span></span><span></span></span>' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</div>';

      var menuMain = MENU_MAIN.map(function (item, i) {
        var cur = item.id === current ? ' is-current' : '';
        if (item.children) {
          return '<li class="menu-main__item menu-main__item--group">' +
            '<a class="menu-main__link menu-main__link--desktop' + cur + '" href="' + item.href + '" data-preview="' + i + '">' + esc(item.label) + '</a>' +
            '<button type="button" class="menu-main__link menu-main__trigger' + cur + '" aria-expanded="false" aria-controls="' + subId + '" data-preview="' + i + '">' +
              esc(item.label) + icon('chev-down', 'lg', 'acc-icon') +
            '</button>' +
            '<ul class="menu-main__sub" id="' + subId + '" role="list">' +
              item.children.map(function (c) { return '<li><a href="' + c.href + '">' + esc(c.label) + '</a></li>'; }).join('') +
            '</ul>' +
          '</li>';
        }
        return '<li class="menu-main__item"><a class="menu-main__link' + cur + '" href="' + item.href + '" data-preview="' + i + '">' + esc(item.label) + '</a></li>';
      }).join('');

      var overlay = demo ? '' :
        '<div class="menu-overlay" id="' + menuId + '">' +
          '<div class="menu-overlay__scrim" data-menu-close aria-hidden="true"></div>' +
          '<div class="menu-overlay__panel" role="dialog" aria-modal="true" aria-label="Menú">' +
            '<div class="container menu-overlay__grid">' +
              '<nav class="menu-main" aria-label="Menú principal"><ul class="menu-main__list" role="list">' + menuMain + '</ul></nav>' +
              '<div class="menu-secondary">' +
                '<ul class="menu-secondary__list" role="list">' +
                  MENU_SECONDARY.map(function (l) { return '<li><a href="' + l.href + '">' + esc(l.label) + '</a></li>'; }).join('') +
                '</ul>' +
                '<ul class="menu-secondary__contact" role="list">' +
                  '<li><a href="' + telHref(CONTACT.phone) + '">' + icon('phone') + esc(CONTACT.phone) + '</a></li>' +
                  '<li><a href="mailto:' + esc(CONTACT.email) + '">' + icon('mail') + esc(CONTACT.email) + '</a></li>' +
                '</ul>' +
                langSwitch('menu-secondary__lang') +
              '</div>' +
              '<aside class="menu-preview" aria-hidden="true">' +
                '<div class="menu-preview__media"><span class="placeholder-tag">[foto por definir]</span></div>' +
                '<div class="menu-preview__text">' +
                  '<p class="t-label c-accent menu-preview__title">' + esc(MENU_MAIN[0].label) + '</p>' +
                  '<p class="t-body c-secondary menu-preview__lead">' + esc(MENU_MAIN[0].lead) + '</p>' +
                '</div>' +
              '</aside>' +
            '</div>' +
          '</div>' +
        '</div>';

      this.innerHTML = (demo ? '' : '<a class="skip-link" href="#main">Saltar al contenido</a>') + bar + overlay;

      this._bar = this.querySelector('.header__bar');
      this._bindDropdown();

      if (demo) {
        var state = this.getAttribute('demo-state') || 'light';
        this.dataset.state = state === 'transparent' ? 'transparent' : 'solid';
        this.dataset.tone = state === 'dark' || state === 'transparent' ? 'dark' : 'light';
        this.classList.toggle('is-compact', state === 'compact');
        // En el kit, la hamburguesa de los ejemplos abre el overlay real de la página
        this.querySelector('[data-menu-toggle]').addEventListener('click', function (e) {
          e.stopPropagation();
          var main = document.querySelector('site-header:not([demo])');
          if (main && main._setMenu) main._setMenu(true);
        });
        return;
      }

      this._bindMenu();
      this._bindScroll();
    }

    /* --- Desplegable de Inversionistas: mouse y teclado --- */
    _bindDropdown() {
      var self = this;
      var item = this.querySelector('.nav__item--dropdown');
      if (!item) return;
      var btn = item.querySelector('.nav__link');
      var list = item.querySelector('.dropdown');
      var links = Array.prototype.slice.call(list.querySelectorAll('a'));
      var timer = null;

      function open(focusIndex) {
        clearTimeout(timer);
        btn.setAttribute('aria-expanded', 'true');
        item.classList.add('is-open');
        if (typeof focusIndex === 'number') links[(focusIndex + links.length) % links.length].focus();
      }
      function close(returnFocus) {
        clearTimeout(timer);
        btn.setAttribute('aria-expanded', 'false');
        item.classList.remove('is-open');
        if (returnFocus) btn.focus();
      }
      this._closeDropdown = close;

      btn.addEventListener('click', function () {
        if (btn.getAttribute('aria-expanded') === 'true') close();
        else open();
      });
      btn.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') { e.preventDefault(); open(0); }
        if (e.key === 'ArrowUp') { e.preventDefault(); open(-1); }
      });
      list.addEventListener('keydown', function (e) {
        var i = links.indexOf(document.activeElement);
        if (e.key === 'ArrowDown') { e.preventDefault(); links[(i + 1) % links.length].focus(); }
        if (e.key === 'ArrowUp') { e.preventDefault(); links[(i - 1 + links.length) % links.length].focus(); }
        if (e.key === 'Home') { e.preventDefault(); links[0].focus(); }
        if (e.key === 'End') { e.preventDefault(); links[links.length - 1].focus(); }
      });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { e.stopPropagation(); close(true); }
      });
      item.addEventListener('focusout', function (e) {
        if (!item.contains(e.relatedTarget)) close();
      });
      item.addEventListener('mouseenter', function () { if (hoverMq.matches) open(); });
      item.addEventListener('mouseleave', function () {
        if (!hoverMq.matches) return;
        clearTimeout(timer);
        timer = setTimeout(close, 200);
      });
      document.addEventListener('click', function (e) {
        if (!item.contains(e.target)) close();
      });
    }

    /* --- Menú hamburguesa (overlay) --- */
    _bindMenu() {
      var self = this;
      var btn = this.querySelector('[data-menu-toggle]');
      var overlay = this.querySelector('.menu-overlay');
      var title = overlay.querySelector('.menu-preview__title');
      var lead = overlay.querySelector('.menu-preview__lead');
      var previewText = overlay.querySelector('.menu-preview__text');
      var sub = overlay.querySelector('.menu-main__trigger');

      function setMenu(open) {
        if (self._closeDropdown) self._closeDropdown();
        self.classList.toggle('is-menu-open', open);
        self.classList.remove('is-hidden');
        btn.setAttribute('aria-expanded', String(open));
        btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
        overlay.classList.toggle('is-open', open);
        document.body.classList.toggle('is-locked', open);
        self._update();
        if (open) {
          setTimeout(function () {
            var target = Array.prototype.slice.call(overlay.querySelectorAll('.menu-main__link')).filter(function (el) { return el.offsetParent !== null; })[0];
            if (target) target.focus();
          }, 60);
        }
      }
      this._setMenu = setMenu;

      btn.addEventListener('click', function () {
        setMenu(btn.getAttribute('aria-expanded') !== 'true');
      });
      overlay.querySelector('[data-menu-close]').addEventListener('click', function () {
        setMenu(false);
        btn.focus();
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
          setMenu(false);
          btn.focus();
        }
      });
      // Clic fuera del panel (en desktop el scrim; en mobile el panel ocupa toda la pantalla)
      document.addEventListener('click', function (e) {
        if (btn.getAttribute('aria-expanded') === 'true' && !self.contains(e.target)) setMenu(false);
      });

      // Panel de vista previa: cambia título y bajada al pasar por cada acceso principal
      function preview(i) {
        var item = MENU_MAIN[i];
        if (!item || title.textContent === item.label) return;
        title.textContent = item.label;
        lead.textContent = item.lead;
        previewText.classList.remove('is-changing');
        void previewText.offsetWidth;
        previewText.classList.add('is-changing');
      }
      overlay.querySelectorAll('[data-preview]').forEach(function (el) {
        var i = parseInt(el.getAttribute('data-preview'), 10);
        el.addEventListener('mouseenter', function () { preview(i); });
        el.addEventListener('focus', function () { preview(i); });
      });

      // Inversionistas en acordeón (mobile y tablet)
      if (sub) {
        sub.addEventListener('click', function () {
          var open = sub.getAttribute('aria-expanded') !== 'true';
          sub.setAttribute('aria-expanded', String(open));
          sub.parentElement.classList.toggle('is-open', open);
        });
      }

      desktopMq.addEventListener('change', function () { self._update(); });
    }

    /* --- Scroll: transparente → sólido, compactación, tema y ocultar en mobile --- */
    _bindScroll() {
      var self = this;
      var ticking = false;
      this._lastY = window.scrollY;
      window.addEventListener('scroll', function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function () { self._update(); ticking = false; });
      }, { passive: true });
      window.addEventListener('resize', function () { self._update(); });
      this._update();
    }

    _update() {
      if (this.hasAttribute('demo')) return;
      var y = window.scrollY;
      var css = getComputedStyle(this);
      var full = parseFloat(css.getPropertyValue('--bar-h')) || 0;
      var compactH = parseFloat(css.getPropertyValue('--bar-h-compact')) || full;
      var menuOpen = this.classList.contains('is-menu-open');
      var desktop = desktopMq.matches;
      var scrolled = y > compactH;

      var compact = desktop && scrolled && !menuOpen;
      this.classList.toggle('is-compact', compact);

      var overlayVariant = this.classList.contains('site-header--overlay');
      this.dataset.state = overlayVariant && !scrolled && !menuOpen ? 'transparent' : 'solid';

      // Tema según la sección que queda detrás del borde inferior del header
      var line = (compact ? compactH : full) - 1;
      var dark = false;
      if (!menuOpen) {
        document.querySelectorAll('[data-header-theme="dark"]').forEach(function (el) {
          var r = el.getBoundingClientRect();
          if (r.top <= line && r.bottom > line) dark = true;
        });
      }
      this.dataset.tone = dark || this.dataset.state === 'transparent' ? 'dark' : 'light';

      // Mobile y tablet: se oculta al bajar y aparece al subir
      if (!desktop && !menuOpen) {
        this.classList.toggle('is-hidden', y > this._lastY && y > full);
      } else {
        this.classList.remove('is-hidden');
      }
      this._lastY = y;

      var overlay = this.querySelector('.menu-overlay');
      if (overlay) overlay.style.setProperty('--overlay-top', (compact ? compactH : full) + 'px');
    }
  }

  /* ======================================================================
     <site-footer>
     Mobile: columnas en acordeón; direcciones y canal de denuncias siempre visibles.
     ====================================================================== */
  var FOOTER_COLS = [
    { title: 'Información', links: [{ label: 'Preguntas Frecuentes', href: '#' }, { label: 'Legislación', href: '#' }] },
    { title: 'Personas y proveedores', links: [{ label: 'Trabaja con Nosotros', href: '#' }, { label: 'Portal Proveedores', href: '#' }] }
  ];

  class SiteFooter extends HTMLElement {
    connectedCallback() {
      if (this._ready) return;
      this._ready = true;
      injectSprite();
      this.classList.add('site-footer', 'on-dark');
      this.setAttribute('role', 'contentinfo');
      this.setAttribute('data-header-theme', 'dark');

      var offices = OFFICES.map(function (o) {
        return '<li class="footer__office">' +
          '<p class="t-ui-small-strong">' + esc(o.name) + '</p>' +
          '<address class="t-small footer__address">' + esc(o.address) + '</address>' +
          '<a class="footer__contact-link" href="' + telHref(o.phone) + '">' + icon('phone') + esc(o.phone) + '</a>' +
        '</li>';
      }).join('');

      var cols = FOOTER_COLS.map(function (c) {
        var pid = nextId('footer-col');
        return '<div class="footer__col">' +
          '<button type="button" class="footer__col-trigger" aria-expanded="false" aria-controls="' + pid + '">' +
            '<span class="t-label">' + esc(c.title) + '</span>' + icon('chev-down', 'md', 'acc-icon') +
          '</button>' +
          '<p class="t-label footer__col-title footer__col-title--static">' + esc(c.title) + '</p>' +
          '<div class="footer__panel" id="' + pid + '"><ul class="footer__links" role="list">' +
            c.links.map(function (l) { return '<li><a href="' + l.href + '">' + esc(l.label) + '</a></li>'; }).join('') +
          '</ul></div>' +
        '</div>';
      }).join('');

      this.innerHTML =
        '<div class="container">' +
          '<div class="footer__top">' +
            '<div class="footer__brand">' +
              '<a class="footer__logo" href="' + ROOT + 'index.html" aria-label="Multi X, ir al inicio">MULTI X</a>' +
              '<p class="t-label footer__col-title">Direcciones y teléfonos</p>' +
              '<ul class="footer__offices" role="list">' + offices + '</ul>' +
              '<a class="footer__contact-link" href="mailto:' + esc(CONTACT.email) + '">' + icon('mail') + esc(CONTACT.email) + '</a>' +
            '</div>' +
            '<div class="footer__cols">' + cols + '</div>' +
            '<div class="footer__whistle">' +
              '<p class="t-label footer__col-title">Canal de Denuncias</p>' +
              '<p class="t-small footer__whistle-text">Canal confidencial para informar conductas contrarias a la ley o a nuestro Código de Ética. [contenido por definir]</p>' +
              '<a class="btn btn--accent-outline-dark btn--sm hit" href="#">Ir al Canal de Denuncias' + icon('arrow', 'md', 'icon--arrow') + '</a>' +
            '</div>' +
          '</div>' +
          '<div class="footer__bottom">' +
            '<ul class="footer__social" role="list">' +
              SOCIAL.map(function (s) {
                return '<li><a class="footer__social-link" href="' + s.href + '" target="_blank" rel="noopener" aria-label="' + esc(s.label) + ' (abre en una pestaña nueva)">' + icon(s.id, 'lg') + '</a></li>';
              }).join('') +
            '</ul>' +
            '<p>© 2026 Multi X S.A. Todos los derechos reservados.</p>' +
          '</div>' +
        '</div>';

      this.querySelectorAll('.footer__col-trigger').forEach(function (t) {
        t.addEventListener('click', function () {
          var open = t.getAttribute('aria-expanded') !== 'true';
          t.setAttribute('aria-expanded', String(open));
          t.parentElement.classList.toggle('is-open', open);
        });
      });
    }
  }

  /* ======================================================================
     <season-strip> · Franja temporal administrable del hero.
     Se oculta si no tiene texto o si lleva el atributo "inactive".
     ====================================================================== */
  class SeasonStrip extends HTMLElement {
    connectedCallback() {
      if (this._ready) return;
      this._ready = true;
      injectSprite();
      var text = this.getAttribute('text');
      if (!text || this.hasAttribute('inactive')) {
        this.hidden = true;
        return;
      }
      var label = this.getAttribute('label');
      var href = this.getAttribute('href');
      var cta = this.getAttribute('cta');
      this.classList.add('season-strip');
      this.setAttribute('role', 'region');
      this.setAttribute('aria-label', 'Destacado de temporada');
      this.innerHTML =
        (label ? '<span class="badge badge--accent">' + esc(label) + '</span>' : '') +
        '<div class="season-strip__row">' +
          '<p class="season-strip__text">' + esc(text) + '</p>' +
          (href && cta ? '<a class="btn btn--tertiary hit" href="' + esc(href) + '">' + esc(cta) + icon('arrow') + '</a>' : '') +
        '</div>';
    }
  }

  /* ======================================================================
     <ir-contact> · Contacto de Relación con Inversionistas.
     Teléfono y correo siempre como enlaces (tel: / mailto:).
     ====================================================================== */
  class IrContact extends HTMLElement {
    connectedCallback() {
      if (this._ready) return;
      this._ready = true;
      injectSprite();
      var name = this.getAttribute('name');
      var phone = this.getAttribute('phone');
      var email = this.getAttribute('email');
      if (!name && !phone && !email) {
        this.hidden = true;
        return;
      }
      var label = this.getAttribute('label') || 'Contacto inversionistas';
      var role = this.getAttribute('role-title');
      this.classList.add('card', 'ir-contact');
      this.innerHTML =
        '<p class="t-label c-accent">' + esc(label) + '</p>' +
        (name ? '<p class="t-h3">' + esc(name) + '</p>' : '') +
        (role ? '<p class="t-small c-secondary">' + esc(role) + '</p>' : '') +
        '<ul class="ir-contact__links" role="list">' +
          (phone ? '<li><a class="ir-contact__link" href="' + telHref(phone) + '">' + icon('phone') + esc(phone) + '</a></li>' : '') +
          (email ? '<li><a class="ir-contact__link" href="mailto:' + esc(email) + '">' + icon('mail') + esc(email) + '</a></li>' : '') +
        '</ul>';
    }
  }

  /* Cualquier botón con data-open-menu abre el menú del header de la página (usado en kit.html). */
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-open-menu]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var main = document.querySelector('site-header:not([demo])');
        if (main && main._setMenu) main._setMenu(true);
      });
    });
  });

  customElements.define('site-header', SiteHeader);
  customElements.define('site-footer', SiteFooter);
  customElements.define('season-strip', SeasonStrip);
  customElements.define('ir-contact', IrContact);
})();
