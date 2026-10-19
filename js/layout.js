/* ==========================================================================
   Multi X · layout.js
   Componentes transversales como Web Components. Única definición del
   header, el footer y los bloques que se repiten en más de una página.
   Un cambio aquí se refleja en todas las páginas.

   <site-header current="inversionistas">   Barra utilitaria + menú + mega menú
   <site-footer>                             Footer
   <season-strip label text href cta>        Franja temporal del hero
   <ir-contact name role-title phone email>  Contacto IR

   Estilos en css/components.css. Íconos: sprite de Figma (UI Kit).
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
    up: ['0 0 14 14', '3.0625 2.1875', 1.75, ['M3.9375 9.1875V0.875M7 3.9375L3.9375 0.875L0.875 3.9375']]
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

  /* ---------- Arquitectura de navegación ----------
     Inversionistas: según Figma (node 75-298). Resto: [contenido por definir]. */
  var NAV = [
    {
      id: 'nosotros', label: 'Nosotros', href: '#',
      intro: 'Historia, propósito y forma de trabajar de la compañía. [contenido por definir]',
      cols: [
        { title: 'Compañía', links: ['Historia', 'Propósito y valores', 'Directorio y administración'] },
        { title: 'Operación', links: ['Cadena de valor', 'Dónde estamos'] }
      ]
    },
    {
      id: 'productos', label: 'Productos', href: '#',
      intro: 'Salmón del sur de Chile para más de 30 mercados. [contenido por definir]',
      cols: [
        { title: 'Productos', links: ['Frescos', 'Congelados', 'Ahumados'] },
        { title: 'Marcas', links: ['Latitude 45', 'Arka Fjord', 'Catálogo Multi X'] },
        { title: 'Calidad', links: ['Certificaciones', 'Inocuidad alimentaria'] }
      ]
    },
    {
      id: 'sustentabilidad', label: 'Sustentabilidad', href: '#',
      intro: 'Estrategia, metas y reportes de sustentabilidad. [contenido por definir]',
      cols: [
        { title: 'Estrategia', links: ['Estrategia 2030', 'Metas y avances', 'Reportes'] },
        { title: 'Ámbitos', links: ['Medioambiente', 'Comunidades', 'Bienestar animal'] },
        { title: 'Gestión', links: ['Certificaciones y membresías', 'Políticas'] }
      ]
    },
    {
      id: 'inversionistas', label: 'Inversionistas', href: '#',
      intro: 'Información financiera, gobierno corporativo y agenda para accionistas.',
      cols: [
        { title: 'Información financiera', links: ['Centro de resultados', 'Memoria anual', 'Acción y dividendos'] },
        { title: 'Gobernanza', links: ['Gobierno corporativo', 'Hechos esenciales', 'Junta de accionistas', 'Compliance y políticas'] },
        { title: 'Agenda', links: ['Calendario y eventos', 'Contacto IR'] }
      ]
    },
    {
      id: 'personas', label: 'Personas', href: '#',
      intro: 'Trabajar en Multi X: equipos, cultura y oportunidades. [contenido por definir]',
      cols: [
        { title: 'Trabajar en Multi X', links: ['Ofertas laborales', 'Beneficios', 'Desarrollo'] },
        { title: 'Cultura', links: ['Seguridad', 'Diversidad e inclusión'] }
      ]
    },
    {
      id: 'noticias', label: 'Noticias', href: '#',
      intro: 'Prensa, comunicados y presencia en ferias. [contenido por definir]',
      cols: [
        { title: 'Prensa', links: ['Noticias', 'Comunicados', 'Kit de prensa'] },
        { title: 'Agenda', links: ['Eventos y ferias'] }
      ]
    }
  ];

  var UTILITY = [
    { label: 'Trabaja con nosotros', href: '#' },
    { label: 'Proveedores', href: '#' },
    { label: 'Contacto', href: '#' }
  ];

  var LANGS = [
    { code: 'ES', label: 'Español', href: '#', current: true },
    { code: 'EN', label: 'English', href: '#' },
    { code: '中文', label: '中文', href: '#' }
  ];

  var CONTACT = {
    phone: '+56 65 248 3700',
    email: 'contacto@multi-x.cl',
    address: '[dirección por definir] · Puerto Montt, Chile'
  };

  function telHref(phone) {
    return 'tel:' + String(phone).replace(/[^\d+]/g, '');
  }

  function linksList(links, cls) {
    return '<ul class="' + (cls || 'mega__links') + '" role="list">' + links.map(function (l) {
      return '<li><a href="#">' + esc(l) + '</a></li>';
    }).join('') + '</ul>';
  }

  /* ======================================================================
     <site-header>
     ====================================================================== */
  var desktopMq = window.matchMedia('(min-width: 1280px)');

  class SiteHeader extends HTMLElement {
    connectedCallback() {
      if (this._ready) return;
      this._ready = true;
      injectSprite();

      var current = (this.getAttribute('current') || '').toLowerCase();
      this.classList.add('site-header');
      this.setAttribute('role', 'banner');

      var utility = UTILITY.map(function (u) {
        return '<li><a href="' + u.href + '">' + esc(u.label) + '</a></li>';
      }).join('') +
        '<li><a href="#">' + icon('search') + 'Buscar</a></li>' +
        '<li class="header__langs">' + icon('globe') +
        LANGS.map(function (l) {
          return '<a href="' + l.href + '" lang="' + (l.code === 'ES' ? 'es' : l.code === 'EN' ? 'en' : 'zh') + '"' +
            (l.current ? ' aria-current="true"' : '') + ' aria-label="' + esc(l.label) + '">' + esc(l.code) + '</a>';
        }).join('<span aria-hidden="true">·</span>') + '</li>';

      var navItems = NAV.map(function (s) {
        var id = 'mega-' + s.id;
        return '<li>' +
          '<button type="button" class="nav__trigger' + (s.id === current ? ' is-current' : '') + '" aria-expanded="false" aria-controls="' + id + '" data-mega="' + id + '">' +
          esc(s.label) + icon('chev-down', 'sm') + '</button>' +
          '</li>';
      }).join('');

      var megas = NAV.map(function (s) {
        var id = 'mega-' + s.id;
        return '<div class="mega" id="' + id + '" data-mega-panel>' +
          '<div class="container"><div class="mega__panel">' +
          '<div class="mega__intro"><p class="t-h3 c-primary">' + esc(s.label) + '</p>' +
          '<p class="t-small">' + esc(s.intro) + '</p>' +
          '<a class="btn btn--tertiary hit" href="' + s.href + '">Ir a ' + esc(s.label) + icon('arrow') + '</a></div>' +
          s.cols.map(function (c) {
            return '<div class="mega__col"><p class="t-label mega__col-title">' + esc(c.title) + '</p>' + linksList(c.links) + '</div>';
          }).join('') +
          '</div></div></div>';
      }).join('');

      var mobileSections = NAV.map(function (s) {
        var pid = 'mm-' + s.id;
        return '<li class="mobile-menu__section">' +
          '<button type="button" class="mobile-menu__trigger t-h3' + (s.id === current ? ' is-current' : '') + '" aria-expanded="false" aria-controls="' + pid + '">' +
          esc(s.label) + icon('chev-down', 'md', 'acc-icon') + '</button>' +
          '<div class="mobile-menu__panel acc-panel" id="' + pid + '" hidden>' +
          '<a class="btn btn--tertiary hit" href="' + s.href + '">Ir a ' + esc(s.label) + icon('arrow') + '</a>' +
          s.cols.map(function (c) {
            return '<div class="mobile-menu__group"><p class="t-label c-secondary">' + esc(c.title) + '</p>' + linksList(c.links) + '</div>';
          }).join('') +
          '</div></li>';
      }).join('');

      this.innerHTML =
        '<a class="skip-link" href="#main">Saltar al contenido</a>' +
        '<div class="header__utility"><div class="container"><ul class="header__utility-list" role="list">' + utility + '</ul></div></div>' +
        '<div class="container header__main">' +
          '<a class="header__logo" href="index.html" aria-label="Multi X, ir al inicio">MULTI X</a>' +
          '<nav class="header__nav" aria-label="Principal"><ul class="nav__list" role="list">' + navItems + '</ul></nav>' +
          '<div class="header__actions">' +
            '<a class="header__icon-btn" href="#" aria-label="Buscar">' + icon('search', 'lg') + '</a>' +
            '<div class="lang-menu">' +
              '<button type="button" class="header__icon-btn" aria-expanded="false" aria-controls="lang-mobile" aria-label="Idioma">' + icon('globe', 'lg') + '</button>' +
              '<ul class="lang-menu__list" id="lang-mobile" role="list" hidden>' +
                LANGS.map(function (l) {
                  return '<li><a href="' + l.href + '"' + (l.current ? ' aria-current="true"' : '') + '>' + esc(l.label) + '</a></li>';
                }).join('') +
              '</ul>' +
            '</div>' +
            '<button type="button" class="header__icon-btn" data-menu-toggle aria-expanded="false" aria-controls="mobile-menu" aria-label="Abrir menú">' +
              '<span class="burger" aria-hidden="true"><span></span><span></span><span></span></span>' +
            '</button>' +
          '</div>' +
        '</div>' +
        megas +
        '<div class="mobile-menu" id="mobile-menu">' +
          '<div class="container mobile-menu__inner">' +
            '<nav aria-label="Principal"><ul class="mobile-menu__sections" role="list">' + mobileSections + '</ul></nav>' +
            '<ul class="mobile-menu__utility" role="list">' +
              UTILITY.map(function (u) { return '<li><a href="' + u.href + '">' + esc(u.label) + '</a></li>'; }).join('') +
            '</ul>' +
          '</div>' +
        '</div>';

      this._bind();
    }

    _bind() {
      var self = this;
      var triggers = Array.prototype.slice.call(this.querySelectorAll('[data-mega]'));
      var closeTimer = null;

      /* --- Mega menú (desktop) --- */
      function openMega(trigger) {
        clearTimeout(closeTimer);
        triggers.forEach(function (t) {
          var panel = document.getElementById(t.getAttribute('aria-controls'));
          var open = t === trigger;
          t.setAttribute('aria-expanded', String(open));
          panel.classList.toggle('is-open', open);
        });
      }

      function closeMega() {
        triggers.forEach(function (t) {
          t.setAttribute('aria-expanded', 'false');
          document.getElementById(t.getAttribute('aria-controls')).classList.remove('is-open');
        });
      }

      function scheduleClose() {
        clearTimeout(closeTimer);
        closeTimer = setTimeout(closeMega, 200);
      }

      triggers.forEach(function (t) {
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        t.addEventListener('click', function () {
          if (t.getAttribute('aria-expanded') === 'true') closeMega();
          else openMega(t);
        });
        t.addEventListener('mouseenter', function () {
          if (desktopMq.matches && window.matchMedia('(hover: hover)').matches) openMega(t);
        });
        t.addEventListener('mouseleave', scheduleClose);
        panel.addEventListener('mouseenter', function () { clearTimeout(closeTimer); });
        panel.addEventListener('mouseleave', scheduleClose);
      });

      this.addEventListener('focusout', function (e) {
        if (!self.contains(e.relatedTarget)) closeMega();
      });

      document.addEventListener('click', function (e) {
        if (!self.contains(e.target)) {
          closeMega();
          closeLang();
        }
      });

      /* --- Idioma (mobile) --- */
      var langBtn = this.querySelector('.lang-menu > button');
      var langList = this.querySelector('#lang-mobile');
      function closeLang() {
        langBtn.setAttribute('aria-expanded', 'false');
        langList.hidden = true;
      }
      langBtn.addEventListener('click', function () {
        var open = langBtn.getAttribute('aria-expanded') !== 'true';
        langBtn.setAttribute('aria-expanded', String(open));
        langList.hidden = !open;
      });

      /* --- Menú mobile --- */
      var menuBtn = this.querySelector('[data-menu-toggle]');
      var menu = this.querySelector('#mobile-menu');

      function setMenu(open) {
        self._setHeaderHeight();
        menuBtn.setAttribute('aria-expanded', String(open));
        menuBtn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
        menu.classList.toggle('is-open', open);
        document.body.classList.toggle('is-locked', open);
        self.classList.remove('is-hidden');
        if (open) {
          var first = menu.querySelector('button, a');
          if (first) setTimeout(function () { first.focus(); }, 50);
        }
      }
      this._setMenu = setMenu;

      menuBtn.addEventListener('click', function () {
        setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
      });

      // Secciones en acordeón (una abierta a la vez)
      var mTriggers = Array.prototype.slice.call(menu.querySelectorAll('.mobile-menu__trigger'));
      mTriggers.forEach(function (t) {
        t.addEventListener('click', function () {
          var open = t.getAttribute('aria-expanded') !== 'true';
          mTriggers.forEach(function (o) {
            o.setAttribute('aria-expanded', 'false');
            document.getElementById(o.getAttribute('aria-controls')).hidden = true;
          });
          t.setAttribute('aria-expanded', String(open));
          document.getElementById(t.getAttribute('aria-controls')).hidden = !open;
        });
      });

      // Escape cierra mega menú, idioma y menú mobile
      document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        var openTrigger = triggers.filter(function (t) { return t.getAttribute('aria-expanded') === 'true'; })[0];
        if (openTrigger) { closeMega(); openTrigger.focus(); }
        if (langBtn.getAttribute('aria-expanded') === 'true') { closeLang(); langBtn.focus(); }
        if (menuBtn.getAttribute('aria-expanded') === 'true') { setMenu(false); menuBtn.focus(); }
      });

      // Al pasar a desktop se cierra el menú mobile
      desktopMq.addEventListener('change', function (e) {
        if (e.matches) setMenu(false);
        else closeMega();
      });

      /* --- Comportamiento al hacer scroll --- */
      var lastY = window.scrollY;
      var ticking = false;
      function onScroll() {
        var y = window.scrollY;
        var menuOpen = menuBtn.getAttribute('aria-expanded') === 'true';
        if (desktopMq.matches) {
          self.classList.toggle('is-compact', y > self._utilityH);
          self.classList.remove('is-hidden');
        } else if (!menuOpen) {
          var goingDown = y > lastY;
          self.classList.toggle('is-hidden', goingDown && y > self.offsetHeight);
        }
        lastY = y;
        ticking = false;
      }
      window.addEventListener('scroll', function () {
        if (!ticking) {
          window.requestAnimationFrame(onScroll);
          ticking = true;
        }
      }, { passive: true });

      this._setHeaderHeight();
      window.addEventListener('resize', function () { self._setHeaderHeight(); });
    }

    _setHeaderHeight() {
      var utility = this.querySelector('.header__utility');
      this._utilityH = utility ? utility.offsetHeight : 0;
      this.style.setProperty('--utility-h', this._utilityH + 'px');
      this.style.setProperty('--header-h', this.getBoundingClientRect().bottom + 'px');
    }
  }

  /* ======================================================================
     <site-footer> · BORRADOR: no existe en Figma; se define al armar la home.
     ====================================================================== */
  class SiteFooter extends HTMLElement {
    connectedCallback() {
      if (this._ready) return;
      this._ready = true;
      injectSprite();
      this.classList.add('site-footer');
      this.setAttribute('role', 'contentinfo');

      var cols = NAV.map(function (s) {
        var pid = nextId('footer-col');
        return '<li class="footer__col">' +
          '<button type="button" class="footer__col-trigger" aria-expanded="false" aria-controls="' + pid + '">' +
            '<span class="t-label">' + esc(s.label) + '</span>' + icon('chev-down', 'md', 'acc-icon') +
          '</button>' +
          '<p class="t-label footer__col-title footer__col-title--static">' + esc(s.label) + '</p>' +
          '<div class="footer__panel" id="' + pid + '">' +
            linksList(s.cols.reduce(function (all, c) { return all.concat(c.links); }, []).slice(0, 5), 'footer__links') +
          '</div>' +
        '</li>';
      }).join('');

      this.innerHTML =
        '<div class="container">' +
          '<div class="footer__top">' +
            '<div class="footer__brand">' +
              '<a class="footer__logo" href="index.html" aria-label="Multi X, ir al inicio">MULTI X</a>' +
              '<p class="t-small footer__about">Salmón del sur de Chile al mundo. [contenido por definir]</p>' +
              '<ul class="footer__contact" role="list">' +
                '<li><a href="' + telHref(CONTACT.phone) + '">' + icon('phone') + esc(CONTACT.phone) + '</a></li>' +
                '<li><a href="mailto:' + esc(CONTACT.email) + '">' + icon('mail') + esc(CONTACT.email) + '</a></li>' +
              '</ul>' +
              '<address class="t-small footer__address">' + esc(CONTACT.address) + '</address>' +
              '<a class="footer__whistle" href="#">Canal de denuncias' + icon('arrow', 'md', 'icon--arrow') + '</a>' +
            '</div>' +
            '<ul class="footer__cols" role="list">' + cols + '</ul>' +
          '</div>' +
          '<div class="footer__bottom">' +
            '<p>© 2026 Multi X S.A. Todos los derechos reservados.</p>' +
            '<ul class="footer__legal" role="list">' +
              '<li><a href="#">Política de privacidad</a></li>' +
              '<li><a href="#">Términos de uso</a></li>' +
              '<li><a href="#">Mapa del sitio</a></li>' +
            '</ul>' +
          '</div>' +
        '</div>';

      // Columnas en acordeón (solo mobile; en tablet y desktop se muestran siempre)
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

  customElements.define('site-header', SiteHeader);
  customElements.define('site-footer', SiteFooter);
  customElements.define('season-strip', SeasonStrip);
  customElements.define('ir-contact', IrContact);
})();
