/* ==========================================================================
   Multi X · layout.js
   Componentes transversales como Web Components. Única definición del
   header, el footer y los bloques que se repiten en más de una página.
   Un cambio aquí se refleja en todas las páginas.

   <site-header variant current>             Header de dos filas + desplegable + menú hamburguesa
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
    // Accesos del menú: trazos del prototipo de venta aprobado (24x24)
    'm-nosotros': ['0 0 24 24', '0 0', 1.6, ['M14 5A2 2 0 1 1 10 5A2 2 0 0 1 14 5Z', 'M12 7V20M6 14A6 6 0 0 0 18 14']],
    'm-personas': ['0 0 24 24', '0 0', 1.6, ['M11.7 8A3.2 3.2 0 1 1 5.3 8A3.2 3.2 0 0 1 11.7 8Z', 'M18.6 9A2.6 2.6 0 1 1 13.4 9A2.6 2.6 0 0 1 18.6 9Z', 'M2.5 20C2.5 15.5 5 13 8.5 13C12 13 14.5 15.5 14.5 20', 'M14.7 14C17.3 14.3 19 16.3 19 20']],
    'm-noticias': ['0 0 24 24', '0 0', 1.6, ['M6 4H18A2 2 0 0 1 20 6V18A2 2 0 0 1 18 20H6A2 2 0 0 1 4 18V6A2 2 0 0 1 6 4Z', 'M8 9H16M8 13H16M8 17H13']],
    'm-productos': ['0 0 24 24', '0 0', 1.6, ['M3 8L12 3L21 8L12 13L3 8Z', 'M3 8V17L12 22L21 17V8', 'M12 13V22']],
    'm-sustentabilidad': ['0 0 24 24', '0 0', 1.6, ['M3 13C7 6 11 4 21 4C20 13 17 18 10 19C7 20 3 17 3 13Z', 'M3 21C6 17 9 15.5 12 15']],
    'm-inversionistas': ['0 0 24 24', '0 0', 1.6, ['M3 20H21', 'M6 16L10 11L14 14L19 7']],
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

  /* Logo Multi X (assets/brand/logo-multix.svg). Letras en currentColor (siguen el tema
     del header) y la X en Coral 500 (--color-bg-accent-hover). */
  var LOGO_PATHS = '<path d="M17.8844 17.0165V22.1192C17.8844 22.2235 17.9734 22.3104 18.0799 22.3104H22.6014C22.7081 22.3104 22.7971 22.2235 22.7971 22.1192V0.191133C22.7971 0.0868783 22.7081 0 22.6014 0H18.0919C18.0207 0 17.9615 0.0347513 17.9259 0.0926703L13.6889 6.79969C12.5333 8.63572 12.0415 9.49291 11.834 9.8578C11.6681 10.1474 11.6089 10.2459 11.4193 10.2459C11.1941 10.2459 11.1407 10.1474 10.9748 9.8578C10.7615 9.49291 10.2696 8.62992 9.12 6.79969L4.87111 0.0926703C4.83556 0.0347513 4.77037 0 4.70519 0H0.201481C0.0888889 0 0 0.0868783 0 0.191133V22.1192C0 22.2235 0.0888889 22.3104 0.195556 22.3104H4.71111C4.81778 22.3104 4.90667 22.2235 4.90667 22.1192V17.0165C4.90667 13.0955 4.79999 10.5992 4.75852 9.52766C4.72888 8.79209 4.72888 8.79209 4.82963 8.68783C4.88889 8.62992 4.96592 8.59517 5.04889 8.59517C5.28 8.59517 5.28 8.59517 7.00445 11.4621C7.22963 11.8329 7.40148 12.1225 7.45482 12.2093L10.0563 16.5532C10.0919 16.6112 10.157 16.6459 10.2281 16.6459H12.563C12.6341 16.6459 12.6993 16.6112 12.7348 16.5532L15.3363 12.2151C15.3897 12.1283 15.5615 11.8386 15.7866 11.4679C17.5111 8.60096 17.5111 8.60096 17.7126 8.60096C17.7955 8.60096 17.9081 8.63572 17.9674 8.69363C18.0681 8.79209 18.0681 8.79209 18.0385 9.52187C17.9911 10.5818 17.8844 13.078 17.8844 17.0165Z"/><path d="M49.7896 0.191133C49.7896 0.0868784 49.7007 0 49.5941 0H44.9778C44.8711 0 44.7822 0.0868784 44.7822 0.191133V12.302C44.7822 16.2925 43.1348 18.2329 39.7511 18.2329C36.3674 18.2329 34.72 16.2925 34.72 12.302V0.191133C34.72 0.0868784 34.6311 0 34.5244 0H29.9082C29.8015 0 29.7126 0.0868784 29.7126 0.191133V12.4294C29.7126 18.9047 33.4637 22.7679 39.7511 22.7679C46.0386 22.7679 49.7955 18.9047 49.7955 12.4294V0.191133H49.7896Z"/><path d="M91.3067 4.54084C91.4134 4.54084 91.5022 4.45397 91.5022 4.34971V0.191133C91.5022 0.0868783 91.4134 0 91.3067 0H72.5216C72.4149 0 72.3259 0.0868783 72.3259 0.191133V4.34392C72.3259 4.44817 72.4149 4.53506 72.5216 4.53506H78.5482C78.9926 4.53506 79.36 4.88836 79.36 5.32854V22.1192C79.36 22.2235 79.4489 22.3104 79.5556 22.3104H84.1719C84.2785 22.3104 84.3674 22.2235 84.3674 22.1192V5.33433C84.3674 4.89994 84.729 4.54084 85.1793 4.54084H91.3067Z"/><path d="M101.387 22.3104C101.493 22.3104 101.582 22.2235 101.582 22.1192V0.191133C101.582 0.0868783 101.493 0 101.387 0H96.7703C96.6638 0 96.5748 0.0868783 96.5748 0.191133V22.1192C96.5748 22.2235 96.6638 22.3104 96.7703 22.3104H101.387Z"/><path d="M57.5349 0C57.4282 0 57.3394 0.0868783 57.3394 0.191133V17.0281C57.3394 19.9415 59.763 22.3104 62.7438 22.3104H73.2386C73.3452 22.3104 73.4341 22.2235 73.4341 22.1192V17.9664C73.4341 17.8622 73.3452 17.7753 73.2386 17.7753H64.0534C63.117 17.7753 62.3526 17.0281 62.3526 16.1131V0.191133C62.3526 0.0868783 62.2637 0 62.157 0H57.5349Z"/><path class="logo__accent" d="M116.753 21.9521C116.646 22.0853 116.735 22.288 116.912 22.2996C120.119 22.4849 123.182 21.0833 125.09 18.5927L127.443 15.5172C127.603 15.3088 127.449 15.0076 127.182 15.0076H123.733C122.767 15.0076 121.855 15.4478 121.268 16.2007L116.753 21.9521Z"/><path class="logo__accent" d="M116.699 0.799727L125.013 11.4163L127.835 15.0072L131.253 19.467C132.623 21.2567 134.779 22.3108 137.073 22.3108H138.377C138.785 22.3108 139.022 21.8532 138.773 21.5289L131.781 12.4994C131.247 11.8101 131.247 10.8487 131.787 10.1652L139.141 0.799727C139.39 0.481174 139.159 0.0178223 138.743 0.0178223H137.5C135.206 0.0178223 133.049 1.07774 131.674 2.87322L128.356 7.21715C128.155 7.47778 127.757 7.47778 127.556 7.21715L124.99 3.82889C123.171 1.43104 120.302 0.0178223 117.251 0.0178223H117.084C116.681 0.0178223 116.444 0.475382 116.699 0.799727Z"/><path d="M145.102 11.1728C146.149 11.1728 146.999 10.343 146.999 9.31935C146.999 8.29574 146.149 7.46594 145.102 7.46594C144.055 7.46594 143.206 8.29574 143.206 9.31935C143.206 10.343 144.055 11.1728 145.102 11.1728Z"/><path d="M155.621 9.79986L150.572 3.2666C148.996 1.22785 146.531 0.0289307 143.917 0.0289307C143.514 0.0289307 143.289 0.480698 143.526 0.793461L150.957 10.3964C151.236 10.7555 151.236 11.2536 150.951 11.6127L143.159 21.5458C142.915 21.8586 143.141 22.3103 143.544 22.3103H143.568C146.133 22.3103 148.558 21.1346 150.11 19.1364L155.621 12.0355C156.13 11.3753 156.13 10.4659 155.621 9.79986Z"/>';
  function logo() {
    return '<svg class="logo" viewBox="0 0 156 22.7737" fill="currentColor" aria-hidden="true" focusable="false">' + LOGO_PATHS + '</svg>';
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

  /* ---------- Arquitectura de navegación (Etapa 1, ajustada) ----------
     Páginas aún no construidas apuntan a "#". [contenido por definir] en textos. */
  var INVESTOR_PAGES = [
    { label: 'Inicio', href: '#' },
    { label: 'Centro de Resultados', href: '#' },
    { label: 'Gobernanza', href: '#' },
    { label: 'Calendario y Eventos', href: '#' },
    { label: 'Acción', href: '#' },
    { label: 'Contacto', href: '#' }
  ];

  // Accesos visibles en la fila principal del header (desktop), centrados
  var HEADER_MAIN = [
    { id: 'productos', label: 'Productos', href: '#' },
    { id: 'sustentabilidad', label: 'Sustentabilidad', href: '#' },
    { id: 'inversionistas', label: 'Inversionistas', href: '#', children: INVESTOR_PAGES }
  ];

  // Barra utilitaria (desktop)
  var UTILITY = [
    { label: 'Portal Proveedores', href: '#' },
    { label: 'Contacto', href: '#' }
  ];

  /* Panel del menú hamburguesa (según el prototipo de venta aprobado:
     .nav-overlay / .mega--preview). Cada acceso alimenta la tarjeta de vista previa. */
  var MENU_GROUPS = [
    {
      title: 'La compañía',
      items: [
        { id: 'nosotros', label: 'Nosotros', icon: 'm-nosotros', href: '#',
          desc: 'Nuestra historia, desde 1987 hasta hoy.',
          tag: '41°28\'S · Puerto Montt', lead: 'Pioneros de la acuicultura chilena, integrados de la ova a la mesa. [contenido por definir]' },
        { id: 'trabaja', label: 'Trabaja con Nosotros', icon: 'm-personas', href: '#',
          desc: 'Equipo, cultura y oportunidades. [contenido por definir]',
          tag: 'Cultura Multi X', lead: 'Cerca del 40% de nuestra dotación son mujeres, en todos los niveles. [contenido por definir]' },
        { id: 'noticias', label: 'Noticias', icon: 'm-noticias', href: '#',
          desc: 'Actualidad e hitos de la compañía.',
          tag: 'Sala de prensa', lead: 'Las últimas novedades de Multi X, Arka Fjord y Latitude 45. [contenido por definir]' }
      ]
    },
    {
      title: 'Negocio',
      items: [
        { id: 'productos', label: 'Productos', icon: 'm-productos', href: '#',
          desc: 'Arka Fjord y Latitude 45: nuestro portafolio.',
          tag: '52°S · Región de Magallanes', lead: 'Ultra premium y ahumados: dos marcas, un mismo origen. [contenido por definir]' },
        { id: 'sustentabilidad', label: 'Sustentabilidad', icon: 'm-sustentabilidad', href: '#',
          desc: 'Cómo cuidamos la Patagonia que nos define.',
          tag: '45°30\'S · Patagonia chilena', lead: 'ASC, BAP y metas 2030: compromiso certificado. [contenido por definir]' },
        { id: 'inversionistas', label: 'Inversionistas', icon: 'm-inversionistas', href: '#',
          desc: 'Información para el mercado de capitales.',
          tag: 'Relación con inversionistas', lead: 'Multiexport Foods S.A., sociedad anónima abierta. [contenido por definir]',
          children: INVESTOR_PAGES }
      ]
    }
  ];

  // Contenido por defecto de la tarjeta de vista previa: noticia destacada
  var PREVIEW_DEFAULT = {
    tag: 'Noticias',
    label: 'Noticia destacada · [contenido por definir]',
    lead: '',
    cta: 'Leer noticia',
    href: '#'
  };

  var MENU_PORTALS = [{ label: 'Portal Proveedores', href: '#', external: true }];
  var MENU_RESOURCES = [
    { label: 'Contacto', href: '#' },
    { label: 'Preguntas Frecuentes', href: '#' },
    { label: 'Canal de Denuncias', href: '#' }
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

  function socialList(extraCls) {
    return '<ul class="social' + (extraCls ? ' ' + extraCls : '') + '" role="list">' +
      SOCIAL.map(function (s) {
        return '<li><a class="social__link" href="' + s.href + '" target="_blank" rel="noopener" aria-label="' + esc(s.label) + ' (abre en una pestaña nueva)">' + icon(s.id, 'md') + '</a></li>';
      }).join('') +
      '</ul>';
  }

  var desktopMq = window.matchMedia('(min-width: 1280px)');
  var hoverMq = window.matchMedia('(hover: hover) and (pointer: fine)');

  /* ======================================================================
     <site-header>
       Dos filas en desktop: barra utilitaria (Portal Proveedores · Contacto ·
       buscador · ES/EN) y fila principal (logo · accesos centrados · hamburguesa).
       variant="overlay"   Transparente sobre el hero; pasa a sólido al hacer scroll.
       (sin variant)       Sólido desde el inicio (páginas interiores).
       current="..."       Acceso activo (productos | sustentabilidad | inversionistas).
       demo + demo-state   Solo kit.html: estado fijo (transparent | light | dark | compact).
     Al hacer scroll la barra utilitaria se oculta y la fila principal se compacta.
     Tema oscuro cuando la sección detrás tiene data-header-theme="dark".
     ====================================================================== */
  class SiteHeader extends HTMLElement {
    connectedCallback() {
      if (this._ready) return;
      this._ready = true;
      injectSprite();

      var demo = this.hasAttribute('demo');
      var current = (this.getAttribute('current') || '').toLowerCase();
      var ddId = nextId('dd-inversionistas');
      var menuId = nextId('menu-overlay');
      var subId = nextId('menu-sub');
      var searchId = nextId('menu-search');

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
          '<div class="header__utility">' +
            '<div class="container header__utility-inner">' +
              '<ul class="header__utility-list" role="list">' +
                UTILITY.map(function (l) { return '<li><a class="hit" href="' + l.href + '">' + esc(l.label) + '</a></li>'; }).join('') +
              '</ul>' +
              '<a class="header__utility-icon hit" href="#" aria-label="Buscar">' + icon('search') + '</a>' +
              langSwitch('header__lang') +
            '</div>' +
          '</div>' +
          '<div class="container header__inner">' +
            '<a class="header__logo" href="' + ROOT + 'index.html" aria-label="Multi X, ir al inicio">' + logo() + '</a>' +
            '<nav class="header__nav" aria-label="Principal"><ul class="nav__list" role="list">' + nav + '</ul></nav>' +
            '<div class="header__tools">' +
              '<a class="header__icon-btn header__search-mobile" href="#" aria-label="Buscar">' + icon('search', 'lg') + '</a>' +
              '<button type="button" class="header__icon-btn" data-menu-toggle aria-expanded="false"' + (demo ? '' : ' aria-controls="' + menuId + '"') + ' aria-label="Abrir menú">' +
                '<span class="burger" aria-hidden="true"><span></span><span></span><span></span></span>' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</div>';

      var groups = MENU_GROUPS.map(function (g, gi) {
        return '<div class="menu-group">' +
          '<p class="t-label c-accent menu-group__title">' + esc(g.title) + '</p>' +
          '<ul class="menu-group__list" role="list">' +
            g.items.map(function (item, i) {
              var cur = item.id === current ? ' is-current' : '';
              var step = ' style="--step:' + Math.min(i, 3) + '"';
              var body = icon(item.icon, 'lg', 'menu-link__icon') +
                '<span class="menu-link__text"><span class="menu-link__name">' + esc(item.label) + '</span>' +
                '<span class="menu-link__desc">' + esc(item.desc) + '</span></span>';
              var data = ' data-preview="' + gi + '-' + i + '"';
              if (item.children) {
                return '<li class="menu-item menu-item--group"' + step + '>' +
                  '<a class="menu-link menu-link--desktop' + cur + '" href="' + item.href + '"' + data + '>' + body + '</a>' +
                  '<button type="button" class="menu-link menu-link--trigger' + cur + '" aria-expanded="false" aria-controls="' + subId + '"' + data + '>' +
                    body + icon('chev-down', 'md', 'acc-icon') +
                  '</button>' +
                  '<ul class="menu-sub" id="' + subId + '" role="list">' +
                    item.children.map(function (c) { return '<li><a href="' + c.href + '">' + esc(c.label) + '</a></li>'; }).join('') +
                  '</ul>' +
                '</li>';
              }
              return '<li class="menu-item"' + step + '><a class="menu-link' + cur + '" href="' + item.href + '"' + data + '>' + body + '</a></li>';
            }).join('') +
          '</ul>' +
        '</div>';
      }).join('');

      var overlay = demo ? '' :
        '<div class="menu-overlay" id="' + menuId + '">' +
          '<div class="menu-overlay__scrim" data-menu-close aria-hidden="true"></div>' +
          '<div class="container menu-overlay__wrap">' +
            '<div class="menu-panel" role="dialog" aria-modal="true" aria-label="Menú">' +
              '<div class="menu-panel__search">' +
                '<form class="menu-search" role="search" action="#" onsubmit="return false">' +
                  '<label class="visually-hidden" for="' + searchId + '">Buscar en el sitio</label>' +
                  icon('search', 'lg') +
                  '<input class="menu-search__input" id="' + searchId + '" type="search" placeholder="Buscar en el sitio" autocomplete="off">' +
                '</form>' +
                socialList('menu-panel__social menu-panel__social--top') +
              '</div>' +
              '<div class="menu-panel__body">' +
                '<a class="menu-preview" href="' + PREVIEW_DEFAULT.href + '" tabindex="-1" aria-hidden="true">' +
                  '<span class="menu-preview__media"><span class="placeholder-tag menu-preview__ph">[foto por definir]</span></span>' +
                  '<span class="menu-preview__content">' +
                    '<span class="t-label menu-preview__tag">' + esc(PREVIEW_DEFAULT.tag) + '</span>' +
                    '<span class="menu-preview__title">' + esc(PREVIEW_DEFAULT.label) + '</span>' +
                    '<span class="menu-preview__lead"></span>' +
                    '<span class="menu-preview__cta">' + esc(PREVIEW_DEFAULT.cta) + icon('arrow', 'md', 'icon--arrow') + '</span>' +
                  '</span>' +
                '</a>' +
                '<div class="menu-panel__groups">' + groups + '</div>' +
              '</div>' +
              '<div class="menu-panel__foot">' +
                '<div class="menu-foot-group"><p class="t-label c-secondary">Portales</p><ul class="menu-foot-group__list" role="list">' +
                  MENU_PORTALS.map(function (l) { return '<li><a href="' + l.href + '" target="_blank" rel="noopener">' + esc(l.label) + icon('external') + '<span class="visually-hidden"> (abre en una pestaña nueva)</span></a></li>'; }).join('') +
                '</ul></div>' +
                '<div class="menu-foot-group"><p class="t-label c-secondary">Recursos</p><ul class="menu-foot-group__list" role="list">' +
                  MENU_RESOURCES.map(function (l) { return '<li><a href="' + l.href + '">' + esc(l.label) + '</a></li>'; }).join('') +
                '</ul></div>' +
                '<div class="menu-foot-group"><p class="t-label c-secondary">Contacto</p><ul class="menu-foot-group__list menu-foot-group__list--contact" role="list">' +
                  '<li><a href="' + telHref(CONTACT.phone) + '">' + icon('phone') + esc(CONTACT.phone) + '</a></li>' +
                  '<li><a href="mailto:' + esc(CONTACT.email) + '">' + icon('mail') + esc(CONTACT.email) + '</a></li>' +
                '</ul></div>' +
                '<div class="menu-panel__extras">' + langSwitch('menu-panel__lang') + socialList('menu-panel__social menu-panel__social--bottom') + '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>';

      this.innerHTML = (demo ? '' : '<a class="skip-link" href="#main">Saltar al contenido</a>') + bar + overlay;

      this._bindDropdown();

      if (demo) {
        var state = this.getAttribute('demo-state') || 'light';
        this.dataset.state = state === 'transparent' ? 'transparent' : 'solid';
        this.dataset.tone = state === 'dark' || state === 'transparent' ? 'dark' : 'light';
        this.classList.toggle('is-compact', state === 'compact');
        // En el kit, la hamburguesa de los ejemplos abre el menú real de la página
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

    /* --- Menú hamburguesa (panel flotante; pantalla completa en mobile) --- */
    _bindMenu() {
      var self = this;
      var btn = this.querySelector('[data-menu-toggle]');
      var overlay = this.querySelector('.menu-overlay');
      var panel = overlay.querySelector('.menu-panel');
      var card = overlay.querySelector('.menu-preview');
      var tag = card.querySelector('.menu-preview__tag');
      var title = card.querySelector('.menu-preview__title');
      var lead = card.querySelector('.menu-preview__lead');
      var cta = card.querySelector('.menu-preview__cta');
      var ctaText = cta.firstChild;
      var trigger = overlay.querySelector('.menu-link--trigger');

      function setPreview(data) {
        if (title.textContent === data.label) return;
        card.setAttribute('href', data.href || '#');
        tag.textContent = data.tag;
        title.textContent = data.label;
        lead.textContent = data.lead || '';
        ctaText.textContent = data.cta || 'Conoce más';
        card.classList.remove('is-changing');
        void card.offsetWidth;
        card.classList.add('is-changing');
      }

      function setMenu(open) {
        if (self._closeDropdown) self._closeDropdown();
        self.classList.toggle('is-menu-open', open);
        self.classList.remove('is-hidden');
        btn.setAttribute('aria-expanded', String(open));
        btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
        overlay.classList.toggle('is-open', open);
        document.body.classList.toggle('is-locked', open);
        if (open) setPreview(PREVIEW_DEFAULT);
        self._update();
        if (open) {
          setTimeout(function () {
            var input = overlay.querySelector('.menu-search__input');
            if (input) input.focus();
          }, 60);
        }
      }
      this._setMenu = setMenu;

      btn.addEventListener('click', function () {
        setMenu(btn.getAttribute('aria-expanded') !== 'true');
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
          setMenu(false);
          btn.focus();
        }
      });
      // Clic fuera del panel: scrim o márgenes del overlay
      overlay.addEventListener('click', function (e) {
        if (!panel.contains(e.target)) { setMenu(false); btn.focus(); }
      });
      document.addEventListener('click', function (e) {
        if (btn.getAttribute('aria-expanded') === 'true' && !self.contains(e.target)) setMenu(false);
      });

      // Tarjeta de vista previa: cambia con el hover o el foco de cada acceso
      overlay.querySelectorAll('[data-preview]').forEach(function (el) {
        var parts = el.getAttribute('data-preview').split('-');
        var item = MENU_GROUPS[+parts[0]].items[+parts[1]];
        var data = { tag: item.tag, label: item.label, lead: item.lead, cta: 'Conoce más', href: item.href };
        el.addEventListener('mouseenter', function () { setPreview(data); });
        el.addEventListener('focus', function () { setPreview(data); });
      });
      panel.querySelector('.menu-panel__groups').addEventListener('mouseleave', function () {
        setPreview(PREVIEW_DEFAULT);
      });

      // Inversionistas en acordeón (mobile)
      if (trigger) {
        trigger.addEventListener('click', function () {
          var open = trigger.getAttribute('aria-expanded') !== 'true';
          trigger.setAttribute('aria-expanded', String(open));
          trigger.parentElement.classList.toggle('is-open', open);
        });
      }

      desktopMq.addEventListener('change', function () { self._update(); });
    }

    /* --- Scroll: transparente → sólido, barra utilitaria, compactación, tema y ocultar en mobile --- */
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
      var util = parseFloat(css.getPropertyValue('--util-h')) || 0;
      var main = parseFloat(css.getPropertyValue('--main-h')) || 0;
      var mainCompact = parseFloat(css.getPropertyValue('--main-h-compact')) || main;
      var menuOpen = this.classList.contains('is-menu-open');
      var desktop = desktopMq.matches;
      var scrolled = y > Math.max(util, mainCompact / 2);

      // Desktop: al bajar se oculta la barra utilitaria y se compacta la fila principal
      var compact = desktop && scrolled;
      this.classList.toggle('is-compact', compact);

      var overlayVariant = this.classList.contains('site-header--overlay');
      this.dataset.state = overlayVariant && !scrolled && !menuOpen ? 'transparent' : 'solid';

      // Borde inferior visible del header (para el tema y para ubicar el panel del menú)
      var bottom = compact ? mainCompact : util + main;

      var dark = false;
      if (!menuOpen) {
        document.querySelectorAll('[data-header-theme="dark"]').forEach(function (el) {
          var r = el.getBoundingClientRect();
          if (r.top <= bottom - 1 && r.bottom > bottom - 1) dark = true;
        });
      }
      this.dataset.tone = dark || this.dataset.state === 'transparent' ? 'dark' : 'light';

      // Mobile y tablet: se oculta al bajar y aparece al subir
      if (!desktop && !menuOpen) {
        this.classList.toggle('is-hidden', y > this._lastY && y > util + main);
      } else {
        this.classList.remove('is-hidden');
      }
      this._lastY = y;

      var overlay = this.querySelector('.menu-overlay');
      if (overlay) overlay.style.setProperty('--overlay-top', bottom + 'px');
    }
  }

  /* ======================================================================
     <site-footer>
     Mobile: columnas en acordeón; direcciones y teléfonos siempre visibles.
     ====================================================================== */
  var FOOTER_COLS = [
    { title: 'Información', links: [{ label: 'Preguntas Frecuentes', href: '#' }, { label: 'Legislación', href: '#' }, { label: 'Canal de Denuncias', href: '#' }] },
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
              '<a class="footer__logo" href="' + ROOT + 'index.html" aria-label="Multi X, ir al inicio">' + logo() + '</a>' +
              '<p class="t-label footer__col-title">Direcciones y teléfonos</p>' +
              '<ul class="footer__offices" role="list">' + offices + '</ul>' +
              '<a class="footer__contact-link" href="mailto:' + esc(CONTACT.email) + '">' + icon('mail') + esc(CONTACT.email) + '</a>' +
            '</div>' +
            '<div class="footer__cols">' + cols + '</div>' +
          '</div>' +
          '<div class="footer__bottom">' +
            socialList('footer__social') +
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
