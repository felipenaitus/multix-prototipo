# Changelog del UI kit

Registro de cambios del kit (tokens, estilos de texto y componentes). Cada entrada indica qué cambió, por qué y si ya está reflejado en Figma y en el código.

Formato: `AAAA-MM-DD · [Figma ✓/pendiente] [Código ✓/pendiente] · descripción`

## 2026-10-20 · Cursor con anillo
- Código ✓ · El cursor pasa a ser un punto con un anillo fino alrededor (según referencia de Felipe). En hover sobre clickeables desaparece el punto y queda el anillo. Se quita la onda. Color por fusión "diferencia" en blanco (claro sobre oscuro, oscuro sobre claro) en lugar de Coral 500.

## 2026-10-20 · Ajustes al panel del menú
- Código ✓ · Redes sociales pasan del costado del buscador a la franja inferior, a la derecha (en mobile, al final).
- Código ✓ · Enlaces secundarios (Portales y Recursos) en Ink 600 (`--color-text-secondary`) para no competir con los accesos principales.
- Código ✓ · Más aire vertical: `--space-40` bajo el buscador (antes 24), `--space-48` bajo los accesos (antes 32) y `--space-32` sobre los secundarios (antes 24).

## 2026-10-20 · Idioma, menú, header blanco y cursor
- Código ✓ · Switch de idioma sintético: "ES | EN" en texto, sin caja ni fondo; el activo en color pleno y semibold.
- Código ✓ · Menú hamburguesa: accesos en tamaño Título 3 y Sora 300 (más grandes y livianos). La tarjeta de noticia destacada queda fija (sin vista previa dinámica).
- Código ✓ · Header al hacer scroll: siempre fondo blanco, sin importar el fondo del contenido. Solo es transparente sobre el hero con foto o video. Se elimina el tema oscuro por sección (`data-header-theme`) y la variante "tema oscuro" del kit.
- Código ✓ · Cursor: punto Coral 500 que reemplaza al cursor nativo y onda sutil al pasar por clickeables (reemplaza al "cursor ripple" al clic de motion.md). Solo con mouse; sin onda con movimiento reducido.

## 2026-10-20 · Línea bajo la barra utilitaria y acceso a la portada en el desplegable
- Código ✓ · Línea delgada entre la barra utilitaria y la fila principal, con el ancho de los elementos del header (no de borde a borde). Toma el color del tema y se oculta junto con la barra al hacer scroll.
- Código ✓ · Desplegable de Inversionistas: "Inicio" pasa a "Ir a Inversionistas", en semibold y separado de las subpáginas por un divisor de borde a borde; las subpáginas quedan en peso regular.

## 2026-10-20 · Ajustes al menú hamburguesa
- Código ✓ · Accesos solo con el nombre: sin ícono, sin descripción y sin las subpáginas de Inversionistas (quedan en el desplegable del header). Se quitan los íconos de accesos del sprite y el acordeón de Inversionistas en mobile.
- Código ✓ · Buscador del menú: la X nativa del campo se reemplaza por la misma X del botón que cierra el menú; aparece solo cuando hay texto y borra la búsqueda.
- Código ✓ · Tarjeta de noticia destacada más baja: alto fijo de `--space-128` + `--space-96` (224 px).
- Código ✓ · Se quitan los datos de contacto de la franja inferior del panel.
- Código ✓ · Diving X se agrega a Portales (panel) y a la barra utilitaria, a la derecha de Portal Proveedores.

## 2026-10-20 · Desplegable de Inversionistas
- Código ✓ · Los ítems del desplegable pasan de Cuerpo (16 px) a UI/Navegación (14 px, semibold), más cerca de los accesos del header (UI/Botón, 15 px).

## 2026-10-20 · Logo en el header
- Código ✓ · El header usa el logo oficial (`assets/brand/logo-multix.svg`) como SVG en línea: letras en el color del tema (Navy 900 en claro, blanco en oscuro y sobre el hero) y la X en Coral 500 (`--color-bg-accent-hover`). Alto `--space-20` en mobile y tablet, `--space-24` en desktop; al 85% en el header compacto.
- Código ✓ · El footer usa el mismo logo: letras blancas y X en Coral 500 sobre Navy 950, alto `--space-24`.

## 2026-10-20 · Video en el hero de prueba
- Código ✓ · `pruebas/navegacion-hero.html` usa el video del hero (`assets/video/hero.mp4`) a pantalla completa, con el velo oscuro de `.hero__media`. Con `prefers-reduced-motion` el video se detiene y queda la imagen `assets/video/hero-poster.jpg` (comportamiento `video[data-hero-video]` en components.js).
- Código ✓ · Video comprimido para web con ffmpeg: de 4K 59,94 fps (147 MB) a 1080p 30 fps, H.264 High, sin audio, faststart (6,4 MB). Se versiona en el repositorio y se ve también en GitHub Pages.

## 2026-10-19 · Ajustes a la Etapa 1 (revisión de Felipe)
- Figma pendiente · Código ✓ · Header vuelve a dos filas en desktop: barra utilitaria (Portal Proveedores · Contacto · buscador · ES/EN) y fila principal con logo, accesos centrados y hamburguesa. Al hacer scroll la barra utilitaria se oculta y la fila principal se compacta (80 → 64 px); al volver arriba reaparece.
- Figma pendiente · Código ✓ · Menú hamburguesa rehecho según el prototipo de venta aprobado (`.nav-overlay`, `.mega--preview`): panel flotante con buscador y redes, tarjeta de vista previa dinámica, accesos "La compañía" y "Negocio" con ícono y descripción, franja de Portales · Recursos · Contacto; fondo oscurecido y desenfocado; entrada con desfase. Mobile a pantalla completa.
- Figma pendiente · Código ✓ · Íconos de los accesos del menú tomados del prototipo de venta.
- Código ✓ · Footer: Canal de Denuncias pasa a ser un enlace más en "Información"; se quita la tarjeta con borde y el botón coral.
- Código ✓ · base.css: `ul/ol[role="list"]` pasa a `:where()` (especificidad 0). Antes anulaba el padding de las listas de los componentes (desplegable, subpáginas del menú, slider de marcas, enlaces del footer).
- Código ✓ · El desenfoque del fondo del menú usa `blur(var(--space-12))` de forma provisoria (falta un token de desenfoque).

## 2026-10-19 · Etapa 1: header, menú y footer definitivos
- Figma pendiente · Código ✓ · Nueva estructura de navegación definida por Felipe; reemplaza la barra utilitaria y el mega menú del Figma (node 75-353). Header de una fila: Productos · Sustentabilidad · Inversionistas (desplegable con Inicio, Centro de Resultados, Gobernanza, Calendario y Eventos, Acción, Contacto), Portal Proveedores y Contacto, buscador, switch ES/EN y hamburguesa.
- Figma pendiente · Código ✓ · Variantes del header: sólido (interiores) y transparente sobre el hero (`variant="overlay"`); compacto al hacer scroll (96 → 64 px con transform); tema oscuro sobre secciones con `data-header-theme="dark"`. Mobile y tablet: logo, buscador y hamburguesa; se oculta al bajar y aparece al subir.
- Figma pendiente · Código ✓ · Menú hamburguesa (overlay tipo mega menú) con columna principal, columna secundaria con contacto y panel de vista previa. En mobile: pantalla completa, Inversionistas en acordeón e idioma dentro. Se elimina el mega menú por sección.
- Figma pendiente · Código ✓ · Footer definitivo: direcciones y teléfonos, Información, Personas y proveedores, Canal de Denuncias, redes sociales y copyright. Reemplaza el borrador.
- Figma pendiente · Código ✓ · Íconos de redes sociales (LinkedIn, Instagram, YouTube) dibujados en el estilo del kit.
- Código ✓ · `--shadow-card` se aplica al desplegable de Inversionistas y al panel del overlay, que reemplazan al mega menú (pendiente de confirmar).
- Código ✓ · Páginas de prueba `pruebas/navegacion-hero.html` y `pruebas/navegacion-interior.html` (con `css/pruebas.css`), variantes del header en kit.html y `.nojekyll` para GitHub Pages.

## 2026-10-19 · Columnas del mega menú
- Código ✓ · Las columnas del mega menú dejan el ancho fijo de 17% y toman el ancho de su contenido (`flex: 1 1 0` + `min-width: max-content`); el espacio sobrante se reparte entre ellas. Corrige el corte de "Información financiera" en 1280. Verificado en 1280 y 1440 con textos en español y en inglés de prueba (más largos).

## 2026-10-19 · Token de indicador
- Figma ✓ Código ✓ · Nuevo token `--border-indicator` (2px, border/indicator en Figma) para el subrayado de la sección activa del menú. `--border-focus` queda solo para el foco. Las pestañas no lo usan: en Figma la activa es una píldora rellena (Navy 900), sin línea indicadora.

## 2026-10-19 · Ajustes tras la revisión del kit
- Figma ✓ Código ✓ · Nuevos tokens de grosor de borde: `--border-thin` 1px, `--border-medium` 1,5px, `--border-focus` 2px. Todos los bordes, el foco visible y el campo en foco usan estos tokens; el contorno coral sobre oscuro pasa a `--border-medium`. CLAUDE.md 2.1: la excepción "1px para bordes" se reemplaza por "grosores de borde solo con los tokens --border-*".
- Figma ✓ Código ✓ · Paginación con botones de `--touch-target` (44px).
- Figma ✓ Código ✓ · Suscripción: etiqueta visible "Correo electrónico" sobre el campo; botón alineado abajo con el input, separado 16px.
- Figma ✓ Código ✓ · Botón terciario sin subrayado (se corrige ui-kit.md).
- Código ✓ · Matriz en mobile: divisor junto a la columna "Período" fija en lugar de sombra (responsive.md).
- Código ✓ · Anchos de columnas y bloques pasan de px fijos a proporciones (`fr`, `minmax()`, porcentajes). Regla agregada a CLAUDE.md 2.1; no se crean tokens de ancho.
- Código ✓ · Footer queda como borrador hasta definir la home (también la variante del header sobre el hero).

## 2026-10-19 · Construcción del kit en código
- Figma ✓ Código ✓ · Nuevo token `--shadow-card` (0 10px 30px Navy 950 al 8%), equivalente al estilo de efecto Sombra/Tarjeta. Única sombra del sistema: Último resultado, Próximo evento, Acción y Mega menú.
- Figma ✓ Código ✓ · Nuevos tokens de tamaño (colección Tamaño): `--icon-sm` 12, `--icon-md` 16, `--icon-lg` 20, `--size-cert-logo` 52, `--size-event-date` 88, `--size-progress` 10. Íconos consolidados en tres tamaños (14→16, 18→20).
- Código ✓ · Se construyen `kit.html`, `css/base.css`, `css/components.css`, `css/kit.css`, `js/layout.js` y `js/components.js` con todos los componentes de ui-kit.md (desktop y mobile).

## 2026-10-19 · Definición inicial (Propuesta A "Corporativo liviano")
- Figma ✓ Código ✓ · Se elige la propuesta A: Sora (títulos y cifras) + Manrope (cuerpo e interfaz). Reemplaza a Montserrat del prototipo de venta.
- Figma ✓ Código ✓ · Botón de acento: Coral 400 (#FF7A7A) con texto Ink 900; hover Coral 500 (#FF5959, original de marca). Se agregan variantes sobre fondo oscuro: acento relleno y contorno coral.
- Figma ✓ Código ✓ · Coral 600 (#C44545) reemplaza al Coral 700 como coral de texto (etiquetas, badges). Es el más claro que pasa AA sobre blanco y Offwhite.
- Figma ✓ Código ✓ · Se agrega Coral 100 (#EBE2DC) para figuras detrás de ilustraciones.
- Figma ✓ Código ✓ · Offwhite 50 (#F7F7F2) reemplaza a Fog 50 como fondo claro. Bordes (#DCD8CD) y fondo atenuado (#ECE9E1) pasan a versiones cálidas.
- Figma ✓ Código ✓ · La propuesta A se convierte a variables (Primitivos, Color, Espaciado, Radio, Layout, Movimiento y tipografía) y 16 estilos de texto. Espaciados normalizados a la escala (10→12, 14→16, 18→20, 36→40, etc.) y radio de 10 a 12px.
- Figma pendiente Código ✓ · Escala tipográfica móvil propuesta en tokens.css (display 40, título 1 32, título 2 26, título 3 20): validar en prototipo y llevar a Figma.
- Figma ✓ Código ✓ · Tokens de movimiento alineados al prototipo de venta: fast 200, slow 350, reveal 800ms; nuevos counter 1100ms, stagger 100ms y distancia de entrada 28px. Catálogo de animaciones en motion.md.
- Código ✓ · Regla del coral: Coral 600 para todo texto coral sobre claro; Coral 500 solo rellenos y gráficos sobre claro; sobre oscuro, texto y contorno en Coral 500.
- Figma pendiente · Composición con ilustración (círculo Coral 100 + cifras): agregar al kit. Pendiente definir el destacado del título (Sora no tiene cursiva).
