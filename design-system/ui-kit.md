# UI kit Multi X · Propuesta A "Corporativo liviano"

Definición elegida el 19-10-2026 · última actualización 21-10-2026. Fuente: Figma "Rediseño 2026" › UI Kit › Propuesta A.
Base del enlace a cada sección: `https://www.figma.com/design/e7bTcjX8aUFftdqckOYyPZ/Redise%C3%B1o-2026?node-id=` + node-id (con guion: `75-194`).

`kit.html` es el **kit visual de referencia**: muestra los tokens (color, tipografía, espaciado, radio, bordes, layout y movimiento) y **un ejemplo** de cada componente. No incluye el header, el menú ni el footer (son del sitio) ni repite las composiciones de cada página; esas se definen aquí, en texto.

Este archivo dice **qué** componentes existen y **cómo se usan**. Las medidas exactas se leen del Figma (sección indicada) y los valores, de `css/tokens.css`.

---

## Fundamentos

### Color (node 75-64)
| Uso | Token | Valor |
|---|---|---|
| Fondo de página | `--color-bg-page` | Blanco |
| Fondo de sección / tarjeta suave | `--color-bg-subtle` | Offwhite 50 #F7F7F2 |
| Fondo atenuado | `--color-bg-muted` | #ECE9E1 |
| Fondo oscuro (hero, bloques destacados) | `--color-bg-inverse` | Navy 950 |
| Fondo de marca (botón primario, tarjeta de último resultado) | `--color-bg-brand` | Navy 900 |
| Fondo suave de marca (íconos de documento, fecha de evento, hover secundario) | `--color-bg-brand-soft` | Navy 100 |
| Botón de acento / hover | `--color-bg-accent` / `--color-bg-accent-hover` | Coral 400 / Coral 500 |
| Figura detrás de ilustraciones | `--color-bg-illustration` | Coral 100 #EBE2DC |
| Texto principal / secundario | `--color-text-primary` / `--color-text-secondary` | Ink 900 / Ink 600 |
| Texto terciario (etiquetas de menor jerarquía) | `--color-text-tertiary` | Ink 500 #66787F (4,6:1 sobre blanco) |
| Texto atenuado (solo "Ver PDF") | `--color-text-quiet` | Ink 400 #7A8B91 (3,5:1 sobre blanco). **Excepción a AA** aprobada por Felipe; pendiente de Figma |
| Texto de marca y enlaces | `--color-text-brand` | Navy 900 |
| Etiquetas y badges en coral | `--color-text-accent` | Coral 600 #C44545 |
| Variación positiva (acción, metas) | `--color-text-success` | Verde 600 |
| Bordes y divisores | `--color-border-default` | #DCD8CD |

Regla del coral:
- **Coral 600:** todo texto coral sobre fondos claros (etiquetas, badges, palabra destacada en títulos).
- **Coral 500 (marca):** rellenos y elementos gráficos sobre fondos claros (hover del botón de acento, líneas, barras, marcadores). No se usa como texto sobre claro. Excepciones aprobadas por Felipe: las cifras en coral del sitio (Cifra L en Cifra destacada, Sora 400; sobre Offwhite 2,86:1 y sobre blanco 3,08:1, aceptado por tamaño) y el paso actual de "Del cultivo a la mesa" (Título 2, 26–32 px), que como texto grande pasa AA (3,1:1 sobre blanco; mínimo 3:1).
- **Coral 400:** relleno del botón de acento.
- **Sobre fondos oscuros:** texto y contorno coral en Coral 500 (excepción: el 600 no pasa ahí).

Reglas de contraste verificadas (WCAG 2.1 AA):
- Coral 600 como texto: blanco 4,9:1 · Offwhite 4,6:1. No usar sobre Navy 100 (4,2:1) ni crema.
- Coral 400 + texto Ink 900: 6,7:1 (botón de acento). Coral 500 + Ink 900: 5,5:1 (hover).
- Coral 500 sobre Navy 950: 5,6:1 (texto y contorno de acento sobre fondo oscuro).
- Coral 400/500 con texto blanco: no se usa.
- Coral 100: Navy 900 encima 8,9:1. No lleva texto coral ni bordes visibles contra el fondo (1,2:1).

### Tipografía (node 75-115)
Sora (títulos y cifras, pesos 300 y 400; 200 y 600 solo en el Display destacado) + Manrope (cuerpo e interfaz, 400 a 700).

**Tamaños fluidos (pendiente de Figma):** Display, Títulos 1–3 y Cifras L/M/S crecen de forma continua entre su tamaño móvil (a 768 px) y el de desktop (a 1440 px); desde 1440 px quedan en el tamaño de Figma. Así, en notebooks con escalado alto (≈ 1067 px) los títulos no se ven desproporcionados. Cuerpo, etiquetas e interfaz tienen tamaño fijo.

| Estilo Figma | Token | Uso |
|---|---|---|
| Display | `--text-display-*` | Título del hero. Uno por página. |
| Display destacado | `--text-display-*` + `--text-display-light-weight` (200) / `--text-display-strong-weight` (600) | Título del hero con dos pesos: la primera parte en Extra Light y la segunda en Semibold, cada una en su línea (`.t-display-light`, `.t-display-strong`, `.hero__title-line`). Pendiente de llevar a Figma. |
| Título 1 | `--text-h1-*` | Título de página interior. |
| Título 2 | `--text-h2-*` | Título de sección. Sora 300 (antes 400, más liviano por decisión de Felipe). |
| Título 3 | `--text-h3-*` | Títulos de tarjeta, bloque o evento. |
| Cifra destacada | `--text-figure-*` + `--text-figure-strong-weight` (400) | Variante un paso más gruesa de Cifra L / M / S (`.t-figure-strong`) para todas las cifras en coral: cifras del home, Inversionistas y Nosotros, Mercados, ofertas por región y total de colaboradores. Antes Sora 600. Pendiente de llevar a Figma. |
| Cifra L / M / S | `--text-figure-*` | Cifras "en una mirada", precio de la acción, metas, años de acordeón. Toda cifra o métrica destacada cuenta desde 0 hasta su valor al entrar en pantalla (`data-count`, con `data-prefix` / `data-suffix`). No aplica a fechas, años ni al precio de la acción. |
| Cuerpo L | `--text-body-l-*` | Bajadas y textos introductorios. |
| Cuerpo | `--text-body-*` | Texto corrido. |
| Pequeño | `--text-small-*` | Metadatos (fecha, peso del archivo), ayudas de formulario. |
| Etiqueta | `--text-label-*` | Etiquetas de sección y badges. Siempre en mayúsculas. |
| UI/Botón, UI/Botón pequeño | `--text-ui-button-*` | Texto de botones. |
| UI/Navegación | `--text-ui-nav-*` | Menú, tabs, filtros. |
| UI/Destacado, UI/Pequeño destacado | `--text-ui-strong-*`, `--text-ui-small-strong-*` | Títulos de fila (documentos), nombres en tarjetas. |

En mobile, display, títulos y cifras bajan de tamaño (ver `tokens.css`, propuesta por validar).

### Espaciado, radio, movimiento
- Espaciado: escala `--space-2` a `--space-128`. No hay valores intermedios.
- Radios: botones, chips y paginación `--radius-full`; tarjetas y paneles `--radius-xl`; campos y celdas destacadas `--radius-lg`; elementos pequeños `--radius-sm`/`--radius-md`.
- Movimiento: ver `design-system/motion.md` (tokens y catálogo de patrones Base y Firma).
- Tamaños: íconos en tres tamaños, `--icon-sm` (12, chevrons del menú y migas), `--icon-md` (16, botones, campos y enlaces) y `--icon-lg` (20, filas de documento, acordeones y FAQ). Elementos fijos: `--size-cert-logo`, `--size-event-date`, `--size-progress`.
- Bordes: grosores solo con `--border-thin` (1px, bordes y divisores), `--border-medium` (1,5px, contorno coral sobre oscuro) `--border-focus` (2px, solo foco visible y campo en foco) y `--border-indicator` (2px, subrayado coral de la sección activa del menú).
- Sombra: `--shadow-card` (estilo Sombra/Tarjeta) es la **única sombra del sistema** y se usa solo en Último resultado, Próximo evento, Acción y Mega menú. El resto de las tarjetas va solo con borde.

---

## Componentes

> **Sin cajas** (pedido del cliente): los componentes no se encierran en bloques con borde, relleno de color o sombra. Se separan con líneas delgadas (`--border-thin` en `--color-border-default`) y espaciado. Aplicado en Productos (marcas, catálogo, certificaciones, contacto). Componentes del kit que todavía son cajas y deben revisarse: tarjeta genérica (`.card`), último resultado, próximo evento, acción, documentos, tarjetas de solución, lista de certificaciones con tabs y suscripción.

### Botones (node 75-194)
Alto 50px, padding 16/24, radio full, texto UI/Botón.
| Variante | Uso | Estados |
|---|---|---|
| Primario | Acción principal de una sección (Navy 900). | hover Navy 600 · foco · deshabilitado |
| Secundario | Acción alternativa (contorno Navy). | hover fondo Navy 100 |
| Acento | Conversión: contacto comercial, suscripción. Máximo uno por vista. | Coral 400 + Ink 900 → hover Coral 500 |
| Terciario / enlace | Acciones de lectura ("Ver todos los informes"). Texto sin subrayado + flecha. | hover Navy 600 + flecha en Coral 500 que se desplaza |
| Con ícono | Descarga (ícono a la izquierda), enlace externo (flecha diagonal a la derecha). | — |
| Pequeño | Acciones dentro de tarjetas (Agregar al calendario). Texto UI/Botón pequeño. | — |
| Sobre fondo oscuro | Claro (blanco + texto Navy), acento oscuro (Coral 400 + Ink 900), contorno coral (Coral 500), fantasma blanco, terciario blanco. | — |
| Deshabilitado | Fondo atenuado, texto secundario. | — |

### Formularios (node 75-244)
Etiqueta siempre visible (no solo placeholder), alto mínimo 44px, foco con borde Navy 900. Incluye: campo de texto, campo con foco, select, buscador con ícono, checkbox, composición de suscripción (texto + campo con etiqueta visible + botón alineado abajo con el input).

### Navegación (Etapa 1 · definida por Felipe; el header del Figma node 75-353 queda desactualizado)
Header, menú hamburguesa y footer viven solo en `js/layout.js` (ver CLAUDE.md 2.3). Tabs de sección y breadcrumb siguen según Figma. El menú hamburguesa toma la estructura y el comportamiento del prototipo de venta aprobado por el cliente (`.nav-overlay`, `.mega--preview`), construido con tokens y componentes del kit.

**Header (`<site-header>`), dos filas en desktop**
- **Barra utilitaria** delgada (`--space-40`), alineada a la derecha: Portal Proveedores · Diving X · Contacto · buscador (ícono) · switch de idioma. Texto UI/Pequeño destacado. El switch es sintético: "ES | EN" en texto, sin caja; el idioma activo en color pleno y semibold, el otro atenuado. Transparente sobre el hero. Una línea delgada (`--border-thin`) la separa de la fila principal, solo con el ancho de los elementos del header (del logo a la hamburguesa).
- **Fila principal** (`--space-80`): logo a la izquierda (SVG oficial en `assets/brand/logo-multix.svg`; letras en el color del tema y X en Coral 500; alto `--space-24` en desktop y `--space-20` en mobile), accesos principales (Productos · Sustentabilidad · Inversionistas) **a la derecha, junto al botón hamburguesa**.
- Inversionistas abre un desplegable (no mega menú). Arriba, "Ir a Inversionistas" (acceso a la portada, UI/Navegación semibold) separado por un divisor de borde a borde; debajo, las subpáginas en UI/Navegación regular: Centro de Resultados, Gobernanza, Calendario y Eventos, Acción, Contacto. Hover o clic; con teclado: Enter/Espacio abre, flechas recorren, Inicio/Fin, Escape cierra y devuelve el foco, Tab fuera cierra.
- Sección activa: atributo `current` (productos | sustentabilidad | inversionistas), con indicador coral de `--border-indicator`.
- **Al hacer scroll** (desktop): la barra utilitaria sale (fade + desplazamiento, `--duration-slow`) y la fila principal se compacta a `--space-64` (logo al 85%), solo con transform y opacity. Al volver arriba reaparece.
- Variantes: **sólido** (por defecto, páginas interiores) y **transparente sobre el hero** (`variant="overlay"`, logo y textos claros; pasa a sólido al hacer scroll).
- **Al hacer scroll el header es siempre blanco**, sin importar el fondo del contenido (también sobre secciones oscuras y el footer). Solo es transparente sobre el hero de páginas con foto o video de fondo.
- Mobile y tablet: una fila de `--space-64` con logo, buscador y hamburguesa.

**Menú hamburguesa (panel flotante)**
- El sitio queda visible detrás, oscurecido (Navy 950 al 65 %, para que el logo y la X blancos tengan contraste AA, 5,4:1, aun sobre páginas blancas) y desenfocado (backdrop blur).
- Panel con `--radius-xl`, fondo `--color-bg-page` y `--shadow-card`, alineado bajo el header y con el ancho del contenedor.
- Arriba: buscador del sitio a lo ancho. El ícono de buscar de la barra utilitaria (y del header en mobile y tablet) abre este menú con el foco en el buscador. Al escribir aparece una X para borrar la búsqueda: es la misma X del botón que cierra el menú (hamburguesa abierta), para estandarizar la iconografía.
- Cuerpo: a la izquierda, **tarjeta de noticia destacada**: foto arriba (proporción de la imagen, sin texto encima; leve zoom en hover) y debajo, sobre Navy 950, etiqueta con sección y fecha (Coral 500), título (UI/Destacado, máximo 2 líneas con puntos suspensivos si no cabe; sin bajada) y "Leer noticia". Es fija: no cambia con el hover de los accesos. Imagen de ejemplo: `assets/img/noticia-destacada.jpg`. A la derecha, **accesos en dos columnas**: "La compañía" (Nosotros · Trabaja con Nosotros · Noticias) y "Negocio" (Productos · Sustentabilidad · Inversionistas). Cada acceso muestra solo su nombre, en tamaño Título 3 y Sora 300 (más grande y liviano), sin ícono, sin descripción y sin subpáginas (las subpáginas de Inversionistas están en el desplegable del header).
- Etiquetas de grupo: "La compañía" y "Negocio" en Coral 500 (**excepción a la regla del coral**, aprobada por Felipe: 3,1:1, no cumple AA); "Portales" y "Recursos" en Ink 500 (`--color-text-tertiary`).
- Franja inferior, separada por un divisor: Portales (Portal Proveedores, Diving X) · Recursos (Contacto, Preguntas Frecuentes, Canal de Denuncias) en UI/Pequeño destacado e Ink 600, igual que la barra utilitaria (más suave, para no competir con los accesos principales), y las redes sociales a la derecha. Sin datos de contacto.
- Espaciado vertical entre módulos: `--space-40` bajo el buscador, `--space-48` bajo los accesos y `--space-32` sobre los secundarios.
- Con el menú abierto el header desaparece (fondo, barra utilitaria, accesos y buscador se desvanecen) y solo quedan el logo y la X de cerrar, en su misma posición sobre el fondo oscurecido, siempre en blanco (logo versión blanca y X blanca), sobre el hero y fuera de él. **Excepción en mobile** (< 768 px): el menú es una pantalla completa blanca, así que el header también queda blanco, con el logo en su color y la X oscura.
- La hamburguesa se transforma en X en la misma posición. Cierra con el botón, Escape y clic fuera del panel. Entrada con fade + leve desplazamiento (`--duration-slow`); los accesos entran con desfase (`--duration-stagger`).

**Footer (`<site-footer>`)**
- Logo en su propia fila, arriba, para que los títulos de columna ("Direcciones", "Información", "Personas y proveedores") queden a la misma altura en desktop.
- "Direcciones": Puerto Montt, Santiago y Miami, cada una con la bandera de su país (SVG en `assets/flags/`, porque Windows no dibuja los emojis de bandera), dirección y teléfono clickeable (sin cortes de línea). Desde tablet en dos columnas: Chile a la izquierda y Miami a la derecha · Información (Preguntas Frecuentes, Legislación, Canal de Denuncias) · Personas y proveedores (Trabaja con Nosotros, Portal Proveedores) · redes sociales · copyright.
- Canal de Denuncias es un enlace más, con el mismo estilo que el resto (sin tarjeta ni botón).
- Redes sociales: LinkedIn, X, Facebook e Instagram. Íconos dibujados en el estilo de línea del kit, pendientes de llevar a Figma.

**Cursor (`js/components.js`)**
- Solo con mouse (hover + puntero fino): un punto (`--space-6`) con un anillo fino alrededor (`--space-32`, `--border-thin`) reemplaza al cursor nativo. Sobre elementos clickeables el punto se desvanece y el anillo se agranda (×1,5, `--duration-base`). Sin onda.
- Color: blanco (`--color-text-inverse`) sobre fondos oscuros (hero, secciones oscuras, footer) y Navy 900 (`--color-text-brand`) sobre fondos claros. Se detecta el fondo visible bajo el puntero, también al hacer scroll sin mover el mouse y sobre el header fijo.
- En campos de texto vuelve el cursor nativo. En pantallas táctiles no se activa.

**Botón flotante del asistente (`<chat-launcher>`)**
- Transversal: se agrega solo en todas las páginas desde `js/layout.js`. Fijo abajo a la derecha (`--layout-gutter`; `--space-24` del borde inferior en mobile, `--space-32` en desktop), círculo de 56 px con ícono de chat.
- Contenedor outline (borde `--border-thin`, sin relleno) e ícono de chat relleno. Navy 900 sobre fondos claros y blanco sobre fondos oscuros; en hover toma un fondo suave (Navy 100 sobre claro, Navy 900 sobre oscuro). Detecta el fondo que tiene detrás al hacer scroll.
- Por ahora no abre nada (asistente por definir). Queda bajo el menú hamburguesa cuando está abierto.
- Ícono de chat dibujado en el estilo del kit, pendiente de llevar a Figma.

**Páginas de prueba** (`pruebas/`, fuera de la navegación): `navegacion-hero.html` y `navegacion-interior.html`.

### Páginas de documentación (node 75-641)
Patrón único para toda la documentación del sitio (Inversionistas, Gobernanza, Sustentabilidad):
- **Barra de filtros:** buscador, año, tipo de documento, "Limpiar filtros" siempre visible cuando hay filtros activos; chips de filtros activos con contador de documentos.
- **Listado por año en acordeón:** año más reciente abierto; fila = ícono + título + metadatos (fecha · PDF · peso) + badge de tipo + "Descargar".
- **Matriz trimestre × tipo de documento:** filas por trimestre, columnas por tipo; badge "Último" en el período actual; celda vacía con guion. La etiqueta del enlace ("PDF") es texto editable.
- **Estado vacío de búsqueda:** solo aparece en búsquedas sin resultado, con acción "Limpiar filtros".
- **Paginación:** solo en colecciones grandes. Botones de `--touch-target` (44px).
- Nunca mostrar años, pestañas ni categorías sin documentos.

### Inversionistas (node 75-764)
- **En una mirada:** fila de cifras clave (Cifra L + descripción), separadas por divisores. Contador animado al entrar en viewport.
- **Último resultado:** tarjeta Navy 900 con título, fecha y accesos directos a los 4 documentos del trimestre + enlace al centro de resultados.
- **Próximo evento:** fecha destacada (día + mes), título, detalle y botones para agendar (Google, Outlook, iCal) + enlace al calendario completo.
- **Acción:** precio (Cifra M), variación (texto success o accent), mini gráfico, fecha y retraso de la cotización.
- **Sub-menú de Inversionistas (`<ir-subnav current>` en `js/layout.js`):** tira con Inversionistas · Centro de Resultados · Gobernanza · Calendario y Eventos · Acción · Contacto, bajo el hero o el encabezado de página. Queda fija bajo el header al hacer scroll; el acceso activo con indicador Navy (`--border-indicator`). Cuando la tira no cabe (mobile), una flecha a la derecha sobre un fundido blanco (`.subnav__more`) indica que hay más secciones: al tocarla la tira avanza y desaparece al llegar al final. Transversal a todas las páginas de Inversionistas.
- **Encabezado de página interior (`.page-head`):** Título 1 y bajada; para páginas de consulta sin hero (Centro de Resultados). En las páginas de Inversionistas no lleva migas de pan: el sub-menú ya indica dónde se está.
- **Bloque en dos columnas (`.split`):** encabezado de sección a la izquierda (5/12) y contenido a la derecha (7/12); en mobile, apilado. Se usa en Inversionistas (documentos, evento, descripción, contacto, preguntas).
- **Lista de documentos (`.doc-list`):** filas de documento sin agrupar por año, con líneas arriba y abajo.
- **Próximo evento sin caja (`.ir-event`):** fecha, título, detalle, agregar al calendario y enlace al calendario, sobre una línea.
- **Filtro de documentos (`[data-doc-filter]` en `js/components.js`):** sobre la barra de filtros; filtra por año, trimestre, tipo y texto, oculta los años sin resultados, actualiza conteos y muestra el estado vacío.
- **Acordeón de años (`.doc-years`):** el año va en Cifra S con peso Sora 400 (`--text-figure-regular-weight`), un paso más grueso que la Cifra S normal.
- **Presentación del último trimestre (`<results-release>` en `js/layout.js`):** módulo temporal que se activa tras cada publicación de resultados, bajo el hero y el sub-menú de la página principal de Inversionistas. Bloque crema con esquinas redondeadas (`--radius-xl`) dentro del contenedor, separado del sub-menú (excepción a "sin cajas" pedida por Felipe): ícono de documento en blanco, etiqueta coral ("Nuevo · Resultados Q2 2026"), nombre del documento (Título 3) y fecha y peso; a la derecha "Ver PDF" (secundario, pestaña nueva) y "Descargar" (primario). Sin `title` o con `inactive` no se muestra.
- **Orden en las páginas internas de Inversionistas** (todas menos la principal): sub-menú de Inversionistas arriba, luego el encabezado de la página (título y bajada, sin migas de pan) y después las pestañas de contenido, si las hay.
- **Encabezado compacto (`.section-head--compact`):** Título 3 y bajada en Cuerpo, con menos aire; para introducir el contenido de una pestaña, que ya nombra la sección (ej.: Resultados trimestrales).
- **Regla de pestañas en mobile:** todo componente de pestañas (`[data-tabs]`) se ve en mobile como un selector desplegable a ancho completo, en azul Navy 900 con texto blanco (`.control--brand`, el color de la pestaña activa). Lo crea `components.js` a partir de las pestañas (no se escribe en el HTML) y queda sincronizado con ellas y con el enlace directo. Desde tablet se ven las pestañas.
- **Pestañas de contenido de página (`.page-tabs` + `.tabs[data-tabs][data-tabs-hash]`):** bajo el encabezado y el sub-menú, una pestaña por grupo de contenido; cada pestaña muestra una sección (`.tab-panel`) y tiene su enlace directo (`data-hash`, ej. `centro-de-resultados.html#memoria-anual`), que la abre al cargar y se actualiza al cambiar de pestaña. Usa las pestañas del kit (Navegación). Mobile: selector desplegable en azul (ver la regla de pestañas en mobile). Centro de Resultados: Resultados trimestrales · Memoria anual.
- **Criterio para las páginas de Inversionistas con varias secciones o categorías de documentos:** de 2 a 5 grupos distintos → pestañas de contenido de página; más de 5 grupos o documentos del mismo tipo → una lista con filtros (como Resultados trimestrales); un solo grupo → sin pestañas. Así ninguna sección queda olvidada al fondo de la página.
- **Memoria anual (`.annual`):** pestaña del Centro de Resultados, sin título ni bajada propios; la memoria más reciente destacada a la izquierda (`.annual-featured`: etiqueta coral "Más reciente" arriba y una línea —igual que "Años anteriores"—, luego el título en Título 3 (un nivel bajo el de la sección) y los datos, la portada sobre un rectángulo blanco redondeado (`--radius-xl`) a todo el ancho del bloque (`.annual-featured__media`) y debajo las acciones: —peso, páginas, fecha— y botones: "Ver PDF" secundario de contorno, que abre en una pestaña nueva, y "Descargar" primario con relleno) y, a la derecha, "Años anteriores" (`.annual-archive`): las anteriores hasta 2019 en filas de documento (seis años) y las más antiguas tras "Ver más memorias". Centro de Resultados › Memoria anual.
- **Ver más (`[data-reveal-more]` + `.reveal-more`):** botón terciario con flecha que muestra u oculta un grupo de elementos (`aria-controls`, `aria-expanded`); cambia su texto ("Ver más memorias" / "Ver menos") y la flecha gira. El grupo aparece con un leve fundido.
- **Búsqueda en documentación:** compara sin tildes ni mayúsculas (`fold()` en `components.js`) y encuentra los resultados que tengan todas las palabras buscadas, en cualquier orden: "documentacion" encuentra "Documentación", "presentacion q2" encuentra "Presentación de resultados Q2 2026". Aplica a todo buscador que filtre contenido.
- **Fila de documento (`.doc-row`):** la fila no es un enlace ni tiene hover; sus acciones sí, siempre visibles y juntas (`.doc-row__actions`): "Ver PDF" (abre el documento en una pestaña nueva, ícono de enlace externo; en gris claro Ink 400, `.doc-link--view`, excepción a AA aprobada) y "Descargar" (en Navy) (con subrayado al pasar el mouse). Sobre fondo crema el contenedor del ícono es blanco. En mobile el tipo de documento va como texto (sin relleno de etiqueta), alineado con el título; desde tablet, como etiqueta al final de la fila.
- **Regla de contenedores sobre crema:** cuando el fondo de la sección es crema (`section--subtle`), los contenedores de elementos como el ícono de documento, la fecha del evento y la etiqueta neutra, y el hover de los años del acordeón, pasan a blanco (`--color-bg-page`). **En fondo oscuro** (`section--inverse`) no llevan relleno: se descartó el Navy 900 sobre Navy 950; el círculo del catálogo queda solo con un contorno fino (Navy 600).
- **Agendar:** "Agendar" + Google y Outlook (sin iCal), siempre a la vista en desktop y mobile (sin botón que despliegue las opciones).
- **Cifras en coral (`.stats--accent`):** variante de "En una mirada" con las cifras en Coral 500, usada en Inversionistas.
- **Sin cajas en la documentación:** la lista por año (`.doc-years`) y el estado vacío pasan de caja con borde y fondo a líneas arriba y abajo.
- **Compañía integrada (`.company` + `.company-visual`):** texto a la izquierda y un círculo con video a la derecha que crece con el scroll y se reproduce solo a la vista; alrededor, etiquetas de las regiones de operación (blancas, con punto Coral 500) que aparecen en secuencia.
- **Ofertas por región (`.offer-list` + `.offer-row`):** filas abiertas separadas por líneas: a la izquierda la cantidad de ofertas como cifra grande en Coral 500 (excepción aprobada, como las cifras destacadas) con "ofertas" debajo; al centro región (Título 3) y localidades; a la derecha la flecha en un círculo con contorno Coral 500. Con hover, una línea Coral 500 recorre el borde superior de la fila y el círculo se rellena como el botón de acento (Coral 400, flecha Ink 900). Toda la fila es el enlace. Home › Trabaja con nosotros.
- **Círculo con video (`[data-media-circle]` + `.media-circle`):** ilustración centrada sobre un círculo blanco (lo ocupa casi entero) con el indicador de video (play con anillo que late). Con hover el círculo crece un 15 % y se abre a un video; la ilustración se desvanece. Toque o Enter / Espacio lo abre y cierra. Mismo comportamiento que la composición del relato vertical, sin pasos. Lo acompañan los 6 puntos Coral 500 en órbita de Soluciones (`.steps__orbit`), que crecen con el círculo al abrir el video. Home › Productos (salmón + video de productos).
- **Sección oscura (`.section--inverse` + `.on-dark`) · PRUEBA:** fondo Navy 950 en lugar de crema para algunos módulos con Apertura (home › Inversionistas, Productos › Catálogo, Inversionistas › documentos y eventos). Dentro de la sección, `tokens.css` reasigna los tokens semánticos: textos blancos, secundarios Navy 300, líneas Navy 600, coral 500 y botones de contorno en blanco; los contenedores no llevan relleno (Navy 900 queda solo para el hover de los botones de contorno). El arco del Horizonte toma el azul.
- **Accesos de Inversionistas (`.ir-pair--facing` + `.ir-module` + `.date-list`):** sin encabezado de sección; dos módulos con la misma estructura: Título 2, una lista con fecha y **un solo acceso** a la sección (sin Descargar ni Agendar). "Últimos reportes" (o "Últimos documentos publicados") lleva al Centro de Resultados; "Próximo evento" lleva al calendario. El módulo de evento muestra **un solo evento** (nunca hay dos próximos), destacado (`.date-item--featured`, fecha en Cifra L): en desktop ocupa el alto de toda la lista de documentos, con sus líneas alineadas arriba y abajo. Documentos: los 2 últimos (en Inversionistas). En desktop van lado a lado con una línea vertical entre ambos y comparten filas (subgrid): el título, cada ítem y el acceso quedan a la misma altura en los dos módulos; manda el que tiene más contenido.
- **Ancla a Inversionistas (home):** sección azul en dos mitades iguales (`.split.split--half`): a la izquierda Título 2 invitacional ("Conoce nuestro desempeño"; no repite el nombre de la página), bajada y el acceso "Ir a Inversionistas"; a la derecha `.ir-highlights` con el último reporte (1) y el próximo evento (1), cada uno con su etiqueta coral y una fila de la lista con fecha (clickeable).
- **Bloque en dos mitades (`.split--half`):** variante de `.split` con las dos columnas iguales en desktop.
- **Destacados de Inversionistas (`.ir-highlights`):** grupos con etiqueta (Etiqueta, coral) y un ítem de `.date-list`, separados por `--space-48`.
- **Lista con fecha (`.date-list` + `.date-item`):** fecha a la izquierda (día en Cifra M, mes y año en Etiqueta coral) y, a la derecha, título (Título 3) y un dato (tipo y peso del documento, u hora y lugar del evento). Filas abiertas separadas por líneas, sin acciones de descarga ni agenda: toda la fila es un enlace, con flecha a la derecha que avanza con el hover. Un documento lleva al Centro de Resultados con los filtros aplicados para que se vea solo ese documento (`centro-de-resultados.html?year=2026&quarter=Q2&type=EEFF`; también acepta `q=` para la búsqueda); un evento, al calendario (página por construir, enlace `#`).
- **Noticias (`.news-head` + `.news-list` + `.news-item`):** encabezado con "Ver todas las noticias" a la derecha y tres notas abiertas (sin caja): foto con leve acercamiento en hover, sección y fecha (Etiqueta, Coral 500: excepción aprobada), título (Título 3, máximo 3 líneas; si es más largo termina en "…") y "Leer noticia". Home › Noticias.
- **Contacto IR:** etiqueta, nombre, cargo, teléfono y correo clickeables. Bloque transversal `<ir-contact>` en `js/layout.js`.

### Sustentabilidad y Productos (node 75-902)
- **Metas con avance:** selector de año (tabs) + filas con meta, barra de progreso y cifra (Cifra M). Las cifras animan al entrar en viewport.
- **Certificaciones y membresías:** tabs (Certificaciones / Membresías) + tarjetas desplegables con logo, nombre, qué cubre y enlace al certificado. En Productos se repiten solo las certificaciones.
- **Preguntas frecuentes:** acordeón; una pregunta abierta a la vez.
- **Nuestras marcas:** cada marca es un círculo con contorno delgado (`--border-thin`, `--color-border-default`) que enlaza a su sitio; sin líneas ni cajas alrededor. En reposo, el logo oficial en su color original (`assets/brands/latitude45.png`, `arkafjord.png`) y "Ir al sitio". Con hover o foco, el video propio de cada marca rellena el círculo desde el centro (el contorno desaparece), con velo Navy 950 al 50 %, y el logo y el texto pasan a blanco (`*-blanco.png`). Videos: `assets/video/marca-latitude45.mp4` y `marca-arkafjord.mp4` (convertidos desde los GIF entregados), que se reproducen solo durante el hover (`video[data-hover-video]`). Debajo, con más aire, el catálogo.
- **Descarga del catálogo (`.catalog-cta`):** fila abierta, sin fondo de color y con margen amplio arriba y abajo: Título 2 (sin etiqueta), bajada y botón secundario de línea "Descargar catálogo". A la derecha, solo la imagen: `assets/img/catalogo.png` sobre un círculo centrado con ella que crece con el scroll (`[data-scroll-grow]`; en fondo oscuro, solo con contorno). Al entrar en pantalla: textos en secuencia y luego la imagen. (Se descartó la opción de flipbook y su switch "Flipbook · Imagen".)

### Página Productos (nuevos · pendientes de llevar a Figma)
- **Encabezado de sección (`.section-head`):** Título 2 + bajada opcional en Cuerpo L secundario (máx. 68 % del contenedor en desktop). Abre cada bloque de página. Sin etiqueta sobre el título (decisión de Felipe: el título basta); tampoco en el hero. Variante centrada (`.section-head--center`) para bloques simétricos, como Nuestras marcas.
- **Hero de página (`.hero--page`):** el mismo hero del kit a casi toda la altura, con foto y header transparente encima. Contenido alineado al contenedor.
- **Tarjetas de solución (`.solutions` + `.solution-card`):** foto, Título 3, descripción y enlace terciario. Fresco · Congelado · Ahumado.
- **Soluciones en pasos (`.steps[data-steps]`):** módulo 2 de la página (va después del hero). A la izquierda, Título 2 (máx. 60 caracteres) y una lista de pasos separados por líneas delgadas (sin cajas): número, nombre (Título 3, máx. 25 caracteres) y, en el paso activo, la descripción (máx. 260 caracteres). A la derecha, la ilustración de cada paso (`assets/img/pescado.png`, `congelado.webp` y `ahumado.webp`) sobre el círculo Offwhite del catálogo, que crece con el scroll. La composición ocupa siempre el mismo cuadro, pero cada paso tiene su propia ubicación y proporción del círculo y de la ilustración (Fresco: círculo arriba a la izquierda; Congelado: a la derecha; Ahumado: casi centrado). Sobre el borde del círculo, 6 puntos Coral 500 (6 y 8 px; la mitad rellenos y la mitad con contorno) aparecen, recorren un tramo corto de la órbita y se desvanecen, en tiempos distintos. Acompañan al círculo en cada paso y quedan por delante de la ilustración. El switch de vista es la clase compartida `.variant-switch` (hoy solo en el catálogo). Los pasos avanzan solos con una línea Coral 500 que marca el tiempo; se pausan con el mouse o el foco dentro y se detienen al elegir uno.
- **Mercados y oficinas (`.markets`):** globo interactivo a la izquierda (80 % de su columna) y, a la derecha, un título de relato (por ejemplo "Del sur de Chile a las mesas del mundo"), tres cifras destacadas con su texto (en fila desde tablet, separadas por líneas delgadas) y las oficinas comerciales con bandera. Sin desglose por región.
- **Globo de mercados (`[data-globe]` en `js/components.js`):** esfera del color de fondo de su sección (solo el contorno) con los continentes en puntos Navy (Natural Earth 110m, dominio público, convertido a máscara de puntos dentro del JS) y pines administrables desde el HTML (`data-lat`, `data-lon`, `data-type="office|market"`): Navy para oficinas comerciales y Coral 500 para mercados, con leyenda. Gira lento solo mientras está a la vista; se detiene con el mouse encima; se arrastra para girar. Con foco o clic en un pin, el globo lo centra y muestra su nombre. Con movimiento reducido queda quieto.
- **Relato vertical (`.chain[data-chain]`):** "Del cultivo a la mesa", según la referencia de Felipe. Fondo blanco, dentro del contenedor y casi a pantalla completa en desktop. Arriba a la izquierda, el título de la sección (Título 2, Navy 900) y debajo el paso actual en coral ("01. Genética y ovas", Título 2, Coral 500: coral corporativo, excepción para texto grande). Al centro, la ilustración del paso sobre un círculo Offwhite (`assets/img/ova.webp` en el paso 1 y por ahora en los demás; `paso-2.webp` en Agua dulce). Abajo a la izquierda, la descripción; abajo a la derecha, la línea de secuencia (un tramo por paso, el activo en Coral 500), el contador "01 / 06" y flechas. El paso solo cambia con las flechas o los tramos. Interacción: al pasar el mouse por la composición, el círculo se abre como una ventana a un video (por ahora el de Arka Fjord en los seis pasos) y la ilustración se desvanece. El cursor no cambia de ícono: la señal es el indicador de play del borde. Para que se descubra, un indicador chico de play (`.chain__hint`: círculo blanco con contorno y triángulo Navy) va sobre el borde del círculo, abajo a la derecha, y late con un anillo que se expande; desaparece al abrir el video. En pantallas táctiles se abre y cierra con un toque; con teclado, con Enter o Espacio. Con el video abierto aparecen 4 datos del paso (cifra en Cifra S + texto en Pequeño, separados por líneas delgadas): a la derecha de la composición en desktop y en el lugar de la descripción en tablet y mobile. Reemplaza a la cadena de valor en lista en Productos.
- **Cadena de valor (`.value-chain`):** pasos numerados con marcador Coral 500 (elemento gráfico) sobre una línea. Relato "Del cultivo a la mesa".
- **Módulo comercial (`<sales-contact>` en `js/layout.js`):** botón flotante abajo a la izquierda "Contactar al equipo comercial" (Acento con forma de diálogo, `.btn--speech`) que abre un formulario: nombre, empresa, correo, producto de interés (preseleccionable con `product="fresco|congelado|ahumado"`) y mensaje (`.control--textarea`). Se cierra con la X, Escape o clic fuera. El envío es de prototipo.
  - Variante en línea (`variant="inline"`): el botón va en el flujo de la página y el formulario se abre como modal centrado sobre el sitio oscurecido (Navy 950 al 45 %), por encima del header. Se usa en el hero de Productos, que ya no lleva el botón flotante.
- **Bajada del hero en blanco (`.hero__lead--inverse`):** variante de la bajada en blanco pleno en vez de Navy 300; se usa en el hero de Productos.
- **Hero con acción a la derecha (`.hero__content--split`):** textos (etiqueta, Display y bajada) a la izquierda y la acción a la derecha, alineada abajo dentro del ancho de contenido.
- **Certificaciones en grilla (`.cert-grid` + `.cert-card`):** para 8 o más certificaciones. Cada certificación es una celda abierta con una línea delgada arriba (sin caja): espacio de logo (por ahora vacío, sin relleno), sigla y nombre completo; al tocarla despliega solo la descripción. Reemplaza a la lista de certificaciones en Productos.
- **Borde inferior curvo (`.section--curve-bottom[data-section-curve]`):** en vez del corte recto, la sección termina en un arco suave (parábola, del color de su fondo) que se monta sobre la siguiente y se aplana con el scroll. Alto máximo: 40 px en mobile, 64 en tablet y 96 en desktop. En prueba solo entre Mercados y Nuestras marcas.
- **Sección continua (`.section--continued`):** cuando una sección sigue a otra con el mismo fondo y están asociadas (Preguntas frecuentes después de Contacto), se separan con una línea delgada al ancho del contenido en vez de duplicar el espacio.
- **Contacto comercial:** reutiliza `<ir-contact>` con `label` propio. Una sola persona de contacto.

### Página Nosotros (nuevos · pendientes de llevar a Figma)
Orden: hero con video · Quiénes somos (propósito y valores) · Cifras clave (crema) · Personas · Historia (crema) · acceso a Directorio y Ejecutivos. Fondos alternados con Apertura / Horizonte.
- **Lista de valores (`.value-list` + `.value-item`):** filas abiertas separadas por líneas: número (Etiqueta, Coral 600), nombre (Título 3) y descripción. Va a la derecha del propósito en un `.split`.
- **Cifras clave:** reutiliza la compañía integrada (`.company`: texto + círculo con video y regiones) y `.stats--accent` con regiones, comunas, localidades y centros.
- **Pilares con foto (`.pillars` + `.pillar`):** foto 4:3 con esquinas redondeadas (sin texto encima), Título 3 y texto. Dos en fila desde tablet. Reformula "Excelencia" e "Innovación" del sitio actual en una sola sección "Personas", con encabezado centrado.
- **Cifra total (`.figure-total`):** una sola cifra grande en Coral 500 (excepción de las cifras destacadas) con su etiqueta, centrada bajo una línea. Personas › total de colaboradores.
- **Línea de tiempo (`.chain.chain--timeline`):** el relato vertical de Productos sin video: título de la sección, hito en coral (Título 2, Coral 500), año grande (Display, Navy) sobre el círculo (blanco sobre crema), descripción y la línea con un tramo por hito y su año debajo; flechas debajo a la derecha. Sin contador (el año activo indica la posición). Se cambia con las flechas o tocando un año.
- **Acceso a Directorio y Ejecutivos:** encabezado centrado y botón secundario (enlace pendiente: la página de Gobernanza aún no existe).

### Hero con franja temporal (node 75-921)
Hero con video o foto de fondo y overlay oscuro, Display en blanco. Franja inferior administrable para contenidos de temporada (ferias, documentación post feria, encuestas): etiqueta en coral + texto + enlace. Se oculta cuando no está activa. Bloque transversal `<season-strip>` en `js/layout.js`.

### Composición con ilustración (pendiente de agregar a Figma)
Texto (Título 1 con palabra destacada en coral) + ilustración en línea Navy sobre círculo `--color-bg-illustration`, con fila de cifras debajo (Etiqueta + Cifra + línea coral). Se repetirá en varias secciones del sitio.
Pendientes de definir con Felipe antes de construirla:
- Sora no tiene cursiva: la cursiva del prototipo de venta (Montserrat) no se puede replicar sin que el navegador la simule. Definir si el destacado va solo en color, en otro peso o con otra familia.
- La palabra destacada va en Coral 600 (regla del coral), no en Coral 500 como en el prototipo de venta.
