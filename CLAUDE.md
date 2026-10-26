# Prototipo Multi X · Instrucciones para Claude Code

Prototipo de alta fidelidad del rediseño del sitio de Multi X (salmonera chilena), hecho por Naitus.
Felipe (diseñador UX/UI) dirige las decisiones de diseño y producto. Claude ejecuta, propone cuando se le pide y no decide por su cuenta.
Idioma de trabajo: español, con terminología corporativa/financiera chilena (CMF, hechos esenciales, JOA, etc.).

## 1. Fuentes de verdad (en este orden)

1. **Figma "Rediseño 2026" › página "UI Kit" › frame "Propuesta A — Corporativo liviano"**
   https://www.figma.com/design/e7bTcjX8aUFftdqckOYyPZ/Redise%C3%B1o-2026?node-id=75-2
   Variables (colecciones Primitivos, Color, Espaciado, Radio, Layout, Movimiento y tipografía) y 16 estilos de texto.
2. `css/tokens.css`: traducción a CSS de esas variables. Es la única fuente de valores en el código.
3. `design-system/ui-kit.md`: inventario de componentes, reglas de uso y enlaces a cada sección del Figma.
4. `design-system/responsive.md`: cómo se adapta cada patrón de desktop a mobile.
5. `design-system/motion.md`: catálogo de animaciones y transiciones (criterio transversal).
6. `design-system/changelog.md`: historial de cambios del kit.

Si hay conflicto entre el código y el Figma, manda el Figma. Si hay conflicto entre el Figma y lo que pide Felipe en el chat, manda Felipe; avisa del conflicto y registra el cambio en el changelog.

## 2. Reglas obligatorias

### 2.1 Tokens
- Nunca escribir un color (hex, rgb, hsl), tamaño de fuente, interlineado, radio, espaciado ni duración/easing fuera de `css/tokens.css`. Todo se referencia con `var(--...)`.
- En componentes se usan los tokens **semánticos** (`--color-bg-*`, `--color-text-*`, `--color-border-*`), no los primitivos (`--color-navy-900`, etc.).
- Si falta un token, no lo inventes en el componente: detente, propone el token a Felipe y, si lo aprueba, agrégalo a `tokens.css` y anótalo en el changelog como pendiente de llevar a Figma.
- Excepciones permitidas: `0`, `100%`, porcentajes de layout y valores dentro de `clamp()` que combinen tokens. Grosores de borde solo con los tokens `--border-*`.
- Anchos de columnas y bloques: no se crean tokens de ancho ni se fijan en px. Se usan proporciones relativas al contenedor (`fr`, `minmax()`, porcentajes).

### 2.2 UI kit
- Todo componente usado en una página debe existir antes en `kit.html` y en `design-system/ui-kit.md`.
- Si una página necesita un componente nuevo o una variante nueva: primero se agrega a `kit.html`, se avisa a Felipe y luego se usa. No crear componentes "parecidos" dentro de una página.
- Para construir o revisar un componente, leer su sección en Figma con el conector de Figma (`get_design_context` / `get_screenshot` sobre el node-id indicado en `ui-kit.md`). No reconstruir de memoria.

### 2.3 Componentes transversales
- Header (`<site-header>`) y footer (`<site-footer>`) son Web Components definidos **solo** en `js/layout.js`.
- Ninguna página contiene el HTML del header o del footer; solo la etiqueta. Un cambio en `layout.js` se refleja en todas las páginas.
- Lo mismo aplica a cualquier bloque que se repita en más de una página (por ejemplo, el bloque de contacto IR o la franja temporal del hero): se define una vez y se reutiliza.

### 2.4 Alcance de cada tarea
- No tocar nada fuera de lo solicitado: ni otros componentes, ni otras páginas, ni textos, ni tokens.
- Si para cumplir la tarea es necesario cambiar algo fuera del alcance (por ejemplo, un token o un componente compartido), detente y pregunta antes, explicando qué más se vería afectado.
- No "mejorar" ni refactorizar código que no es parte del pedido. Si ves un problema, menciónalo al final de la respuesta, no lo corrijas.
- Un commit por cambio, con mensaje en español que describa qué se hizo (Felipe revisa y revierte desde GitHub Desktop).

### 2.5 Desktop y mobile
- Cada funcionalidad se construye para desktop **y** mobile en la misma tarea. Una tarea no está terminada si solo funciona en uno.
- La adaptación a mobile no es reducir: sigue los patrones de `design-system/responsive.md` según el contexto (menú → hamburguesa, filtros → panel, tablas → tarjetas, etc.).
- Si un componente no tiene patrón definido en `responsive.md`, propone uno a Felipe antes de implementarlo y, una vez aprobado, agrégalo al archivo.
- Estilos base pensados para mobile; desktop se agrega con `@media (min-width: ...)`. Breakpoints: 768 (tablet) y 1024 (desktop). (Antes 1280: se bajó porque notebooks con escalado de Windows muestran el sitio entre 1024 y 1279 px.)

### 2.6 Stack
- HTML, CSS y JavaScript vanilla. Sin frameworks, sin paso de build, sin npm para el sitio.
- Fuentes desde Google Fonts: solo Sora (200, 300, 400, 600) y Manrope (400, 500, 600, 700). No cargar otras familias. Sora 200 y 600 se usan solo en el Display destacado.
- Animaciones con CSS (transiciones y keyframes) e IntersectionObserver. Librerías externas solo si Felipe las aprueba.
- El sitio debe funcionar abierto directo desde el archivo y en GitHub Pages (por eso Web Components y no `fetch` de parciales).
- Estructura: `css/tokens.css` → `css/base.css` → `css/components.css` (+ un CSS por página solo si es necesario). JS: `js/layout.js` (header/footer) y `js/components.js` (comportamientos).

## 3. Enfoque visual aprobado (respetar en toda decisión)
- Márgenes amplios, liviandad y limpieza. Ante la duda, más aire, no menos.
- Sin cajas (pedido del cliente): no usar bloques con borde, fondo de color o sombra para agrupar contenido. Las separaciones se hacen con líneas delgadas (`--border-thin`, `--color-border-default`) y espaciado. Los fondos de sección (`section--subtle`) sí se mantienen.
- Animaciones y transiciones modernas que den interactividad sin saturar. Se usan solo los patrones de `design-system/motion.md`: los "Base" en todo el sitio, los "Firma" solo donde ese archivo indica. Un patrón nuevo se propone a Felipe antes de implementarlo.
- Fotografía y video curados según su función (hero, fondo con texto, detalle). Mientras no haya material definitivo, usar placeholders neutros marcados como `[foto por definir]`, no imágenes de stock al azar.
- Respetar `prefers-reduced-motion` (los tokens de duración ya se anulan; los videos de scroll-scrubbing se reemplazan por imagen).

## 4. Accesibilidad mínima (AA)
- Texto coral sobre fondos claros (etiquetas, badges, destacados en títulos, cualquier tamaño): siempre `--color-text-accent` (Coral 600), sobre blanco u Offwhite. No sobre Navy 100 ni crema.
- Coral 500 sobre fondos claros: solo rellenos y elementos gráficos (hover del botón de acento, líneas bajo cifras, barras, marcadores, cursor ripple). Nunca como texto.
- Única excepción: sobre fondos oscuros (Navy 950) el texto y contorno coral usan Coral 500 (`--color-text-accent-on-dark`, 5,6:1), porque el Coral 600 no pasa ahí (3,5:1).
- Botón de acento: fondo Coral 400, texto Ink 900; hover Coral 500. Nunca texto blanco sobre coral.
- `--color-bg-illustration` (Coral 100) es solo para figuras detrás de ilustraciones, no para fondos de bloques con texto.
- Teléfonos y correos siempre como enlaces (`tel:` / `mailto:`).
- Foco visible en todo elemento interactivo; zona táctil mínima `--touch-target` (44px).
- Componentes administrables que no tienen contenido no se muestran (sin títulos vacíos, sin pestañas o años sin documentos).

## 5. Verificación antes de dar una tarea por terminada
1. Levantar el prototipo y tomar capturas con Playwright en **375, 768, 1024, 1280 y 1440 px** de lo que se modificó.
2. Revisar: sin scroll horizontal, sin textos cortados ni superpuestos, márgenes consistentes, estados (hover, foco, abierto/cerrado) funcionando.
3. Si el trabajo es un componente, comparar contra la captura de su sección en Figma.
4. Correr una búsqueda rápida de valores fuera de tokens en los archivos tocados (hex, `px` sueltos en `font-size`, `transition` sin variables) y corregirlos.
5. Reportar a Felipe en pocas líneas: qué se hizo, qué archivos se tocaron y cualquier duda o problema detectado fuera del alcance.

## 6. Sincronizar cambios del UI kit
Cuando Felipe diga "sincroniza el UI kit" (o use `/sync-ui-kit`):
1. Leer las variables y estilos de texto del Figma (node 75:2) con el conector de Figma.
2. Comparar contra `css/tokens.css` y listar las diferencias a Felipe antes de aplicar.
3. Con su visto bueno: actualizar `tokens.css`, actualizar la ficha afectada en `ui-kit.md`, ajustar `kit.html` si cambió un componente y registrar la entrada en `changelog.md`.
4. Verificar con capturas las páginas que usan los componentes afectados.

## 7. Contexto del proyecto
- Áreas prioritarias: Inversionistas, Productos y Sustentabilidad, cada una con reglas propias para el asistente de IA del sitio.
- La arquitectura de información y los contenidos están en aprobación: si un texto no está definido, usar contenido de ejemplo verosímil y marcarlo como `[contenido por definir]`.
- Idiomas: español e inglés con una sola estructura; chino por confirmar.
