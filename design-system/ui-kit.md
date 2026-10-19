# UI kit Multi X · Propuesta A "Corporativo liviano"

Definición elegida el 19-10-2026. Fuente: Figma "Rediseño 2026" › UI Kit › Propuesta A.
Base del enlace a cada sección: `https://www.figma.com/design/e7bTcjX8aUFftdqckOYyPZ/Redise%C3%B1o-2026?node-id=` + node-id (con guion: `75-194`).

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
| Texto de marca y enlaces | `--color-text-brand` | Navy 900 |
| Etiquetas y badges en coral | `--color-text-accent` | Coral 600 #C44545 |
| Variación positiva (acción, metas) | `--color-text-success` | Verde 600 |
| Bordes y divisores | `--color-border-default` | #DCD8CD |

Regla del coral:
- **Coral 600:** todo texto coral sobre fondos claros (etiquetas, badges, palabra destacada en títulos).
- **Coral 500 (marca):** rellenos y elementos gráficos sobre fondos claros (hover del botón de acento, líneas, barras, marcadores). No se usa como texto sobre claro.
- **Coral 400:** relleno del botón de acento.
- **Sobre fondos oscuros:** texto y contorno coral en Coral 500 (excepción: el 600 no pasa ahí).

Reglas de contraste verificadas (WCAG 2.1 AA):
- Coral 600 como texto: blanco 4,9:1 · Offwhite 4,6:1. No usar sobre Navy 100 (4,2:1) ni crema.
- Coral 400 + texto Ink 900: 6,7:1 (botón de acento). Coral 500 + Ink 900: 5,5:1 (hover).
- Coral 500 sobre Navy 950: 5,6:1 (texto y contorno de acento sobre fondo oscuro).
- Coral 400/500 con texto blanco: no se usa.
- Coral 100: Navy 900 encima 8,9:1. No lleva texto coral ni bordes visibles contra el fondo (1,2:1).

### Tipografía (node 75-115)
Sora (títulos y cifras, pesos 300 y 400) + Manrope (cuerpo e interfaz, 400 a 700).

| Estilo Figma | Token | Uso |
|---|---|---|
| Display | `--text-display-*` | Título del hero. Uno por página. |
| Título 1 | `--text-h1-*` | Título de página interior. |
| Título 2 | `--text-h2-*` | Título de sección. |
| Título 3 | `--text-h3-*` | Títulos de tarjeta, bloque o evento. |
| Cifra L / M / S | `--text-figure-*` | Cifras "en una mirada", precio de la acción, metas, años de acordeón. |
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
Header, menú hamburguesa y footer viven solo en `js/layout.js` (ver CLAUDE.md 2.3). Tabs de sección y breadcrumb siguen según Figma.

**Header (`<site-header>`, una fila)**
- Izquierda: logo, enlace a la home.
- Accesos principales visibles: Productos · Sustentabilidad · Inversionistas. Solo Inversionistas tiene desplegable (no mega menú) con sus subpáginas: Inicio, Centro de Resultados, Gobernanza, Calendario y Eventos, Acción, Contacto. Se abre con hover o clic; con teclado: Enter/Espacio abre, flecha abajo/arriba abre y recorre, Inicio/Fin, Escape cierra y devuelve el foco, Tab fuera cierra.
- Derecha, con menor jerarquía (texto Pequeño): Portal Proveedores y Contacto; luego buscador (ícono), switch de idioma ES/EN y botón hamburguesa.
- Sección activa: atributo `current` (productos | sustentabilidad | inversionistas); indicador coral de `--border-indicator`.
- Variantes: **sólido** (por defecto, páginas interiores) y **transparente sobre el hero** (`variant="overlay"`: logo y textos claros; pasa a sólido al bajar más que el alto compacto del header).
- **Compacto al hacer scroll** (desktop): de `--space-96` a `--space-64` con transform; logo al 85%.
- **Tema oscuro**: cuando la sección que queda detrás del header tiene `data-header-theme="dark"` (el footer lo trae por defecto). Fondo Navy 950 y textos blancos.
- Alto de la barra: `--space-96` en desktop, `--space-64` en mobile y tablet. En páginas interiores el header reserva su alto; en la variante overlay el hero queda debajo.

**Menú hamburguesa (overlay tipo mega menú)**
- Columna principal en tamaño grande (Título 2): Nosotros · Productos · Sustentabilidad · Inversionistas (con sus subpáginas debajo) · Trabaja con Nosotros · Noticias.
- Columna secundaria (UI/Navegación): Portal Proveedores · Contacto · Preguntas Frecuentes · Canal de Denuncias, y teléfono y correo clickeables.
- Panel de vista previa: foto (placeholder `[foto por definir]`) y bajada que cambian al pasar o enfocar cada acceso principal.
- Se cierra con el mismo botón, con Escape y con clic fuera (scrim). Bloquea el scroll de la página mientras está abierto.

**Footer (`<site-footer>`)**
- Direcciones y teléfonos (casa matriz y oficina Santiago; teléfonos y correo clickeables) · Información (Preguntas Frecuentes, Legislación) · Personas y proveedores (Trabaja con Nosotros, Portal Proveedores) · Canal de Denuncias (texto + botón contorno coral) · redes sociales (íconos) · copyright.
- Íconos de redes (LinkedIn, Instagram, YouTube): dibujados en el estilo del kit, pendientes de llevar a Figma.

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
- **Contacto IR:** etiqueta, nombre, cargo, teléfono y correo clickeables. Bloque transversal `<ir-contact>` en `js/layout.js`.

### Sustentabilidad y Productos (node 75-902)
- **Metas con avance:** selector de año (tabs) + filas con meta, barra de progreso y cifra (Cifra M). Las cifras animan al entrar en viewport.
- **Certificaciones y membresías:** tabs (Certificaciones / Membresías) + tarjetas desplegables con logo, nombre, qué cubre y enlace al certificado. En Productos se repiten solo las certificaciones.
- **Preguntas frecuentes:** acordeón; una pregunta abierta a la vez.
- **Nuestras marcas:** tarjetas con logo legible y enlace externo a cada sitio (Latitude 45, Arka Fjord) + tarjeta del catálogo Multi X separada, con botón de descarga.

### Hero con franja temporal (node 75-921)
Hero con video o foto de fondo y overlay oscuro, Display en blanco. Franja inferior administrable para contenidos de temporada (ferias, documentación post feria, encuestas): etiqueta en coral + texto + enlace. Se oculta cuando no está activa. Bloque transversal `<season-strip>` en `js/layout.js`.

### Composición con ilustración (pendiente de agregar a Figma)
Texto (Título 1 con palabra destacada en coral) + ilustración en línea Navy sobre círculo `--color-bg-illustration`, con fila de cifras debajo (Etiqueta + Cifra + línea coral). Se repetirá en varias secciones del sitio.
Pendientes de definir con Felipe antes de construirla:
- Sora no tiene cursiva: la cursiva del prototipo de venta (Montserrat) no se puede replicar sin que el navegador la simule. Definir si el destacado va solo en color, en otro peso o con otra familia.
- La palabra destacada va en Coral 600 (regla del coral), no en Coral 500 como en el prototipo de venta.
