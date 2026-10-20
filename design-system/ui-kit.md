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
| Texto terciario (etiquetas de menor jerarquía) | `--color-text-tertiary` | Ink 500 #66787F (4,6:1 sobre blanco) |
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
| Acento · forma de diálogo | Botón comercial del hero ("Contactar al equipo comercial"): mismo color que Acento, con la esquina inferior izquierda recta (`.btn--speech`). | Igual que Acento |
| Pequeño | Acciones dentro de tarjetas (Agregar al calendario). Texto UI/Botón pequeño. | — |
| Sobre fondo oscuro | Claro (blanco + texto Navy), acento oscuro (Coral 400 + Ink 900), contorno coral (Coral 500), fantasma blanco, terciario blanco. | — |
| Deshabilitado | Fondo atenuado, texto secundario. | — |

### Formularios (node 75-244)
Etiqueta siempre visible (no solo placeholder), alto mínimo 44px, foco con borde Navy 900. Incluye: campo de texto, campo con foco, select, buscador con ícono, checkbox, composición de suscripción (texto + campo con etiqueta visible + botón alineado abajo con el input).

### Navegación (Etapa 1 · definida por Felipe; el header del Figma node 75-353 queda desactualizado)
Header, menú hamburguesa y footer viven solo en `js/layout.js` (ver CLAUDE.md 2.3). Tabs de sección y breadcrumb siguen según Figma. El menú hamburguesa toma la estructura y el comportamiento del prototipo de venta aprobado por el cliente (`.nav-overlay`, `.mega--preview`), construido con tokens y componentes del kit.

**Header (`<site-header>`), dos filas en desktop**
- **Barra utilitaria** delgada (`--space-40`), alineada a la derecha: Portal Proveedores · Diving X · Contacto · buscador (ícono) · switch de idioma. Texto UI/Pequeño destacado. El switch es sintético: "ES | EN" en texto, sin caja; el idioma activo en color pleno y semibold, el otro atenuado. Transparente sobre el hero. Una línea delgada (`--border-thin`) la separa de la fila principal, solo con el ancho de los elementos del header (del logo a la hamburguesa).
- **Fila principal** (`--space-80`): logo a la izquierda (SVG oficial en `assets/brand/logo-multix.svg`; letras en el color del tema y X en Coral 500; alto `--space-24` en desktop y `--space-20` en mobile), accesos principales **centrados** (Productos · Sustentabilidad · Inversionistas) y botón hamburguesa a la derecha.
- Inversionistas abre un desplegable (no mega menú). Arriba, "Ir a Inversionistas" (acceso a la portada, UI/Navegación semibold) separado por un divisor de borde a borde; debajo, las subpáginas en UI/Navegación regular: Centro de Resultados, Gobernanza, Calendario y Eventos, Acción, Contacto. Hover o clic; con teclado: Enter/Espacio abre, flechas recorren, Inicio/Fin, Escape cierra y devuelve el foco, Tab fuera cierra.
- Sección activa: atributo `current` (productos | sustentabilidad | inversionistas), con indicador coral de `--border-indicator`.
- **Al hacer scroll** (desktop): la barra utilitaria sale (fade + desplazamiento, `--duration-slow`) y la fila principal se compacta a `--space-64` (logo al 85%), solo con transform y opacity. Al volver arriba reaparece.
- Variantes: **sólido** (por defecto, páginas interiores) y **transparente sobre el hero** (`variant="overlay"`, logo y textos claros; pasa a sólido al hacer scroll).
- **Al hacer scroll el header es siempre blanco**, sin importar el fondo del contenido (también sobre secciones oscuras y el footer). Solo es transparente sobre el hero de páginas con foto o video de fondo.
- Mobile y tablet: una fila de `--space-64` con logo, buscador y hamburguesa.

**Menú hamburguesa (panel flotante)**
- El sitio queda visible detrás, oscurecido (Navy 950 al 45%) y desenfocado (backdrop blur).
- Panel con `--radius-xl`, fondo `--color-bg-page` y `--shadow-card`, alineado bajo el header y con el ancho del contenedor.
- Arriba: buscador del sitio a lo ancho. El ícono de buscar de la barra utilitaria (y del header en mobile y tablet) abre este menú con el foco en el buscador. Al escribir aparece una X para borrar la búsqueda: es la misma X del botón que cierra el menú (hamburguesa abierta), para estandarizar la iconografía.
- Cuerpo: a la izquierda, **tarjeta de noticia destacada**: foto arriba (proporción de la imagen, sin texto encima; leve zoom en hover) y debajo, sobre Navy 950, etiqueta con sección y fecha (Coral 500), título (UI/Destacado, máximo 2 líneas con puntos suspensivos si no cabe; sin bajada) y "Leer noticia". Es fija: no cambia con el hover de los accesos. Imagen de ejemplo: `assets/img/noticia-destacada.jpg`. A la derecha, **accesos en dos columnas**: "La compañía" (Nosotros · Trabaja con Nosotros · Noticias) y "Negocio" (Productos · Sustentabilidad · Inversionistas). Cada acceso muestra solo su nombre, en tamaño Título 3 y Sora 300 (más grande y liviano), sin ícono, sin descripción y sin subpáginas (las subpáginas de Inversionistas están en el desplegable del header).
- Etiquetas de grupo: "La compañía" y "Negocio" en Coral 500 (**excepción a la regla del coral**, aprobada por Felipe: 3,1:1, no cumple AA); "Portales" y "Recursos" en Ink 500 (`--color-text-tertiary`).
- Franja inferior, separada por un divisor: Portales (Portal Proveedores, Diving X) · Recursos (Contacto, Preguntas Frecuentes, Canal de Denuncias) en UI/Pequeño destacado e Ink 600, igual que la barra utilitaria (más suave, para no competir con los accesos principales), y las redes sociales a la derecha. Sin datos de contacto.
- Espaciado vertical entre módulos: `--space-40` bajo el buscador, `--space-48` bajo los accesos y `--space-32` sobre los secundarios.
- La hamburguesa se transforma en X en la misma posición. Cierra con el botón, Escape y clic fuera del panel. Entrada con fade + leve desplazamiento (`--duration-slow`); los accesos entran con desfase (`--duration-stagger`).

**Footer (`<site-footer>`)**
- Direcciones y teléfonos (casa matriz y oficina Santiago; teléfonos y correo clickeables) · Información (Preguntas Frecuentes, Legislación, Canal de Denuncias) · Personas y proveedores (Trabaja con Nosotros, Portal Proveedores) · redes sociales · copyright.
- Canal de Denuncias es un enlace más, con el mismo estilo que el resto (sin tarjeta ni botón).
- Íconos de redes (LinkedIn, Instagram, YouTube): dibujados en el estilo del kit, pendientes de llevar a Figma.

**Cursor (`js/components.js`)**
- Solo con mouse (hover + puntero fino): un punto (`--space-6`) con un anillo fino alrededor (`--space-32`, `--border-thin`) reemplaza al cursor nativo. Sobre elementos clickeables el punto se desvanece y el anillo se agranda (×1,5, `--duration-base`). Sin onda.
- Color: blanco (`--color-text-inverse`) sobre fondos oscuros (hero, secciones oscuras, footer) y Navy 900 (`--color-text-brand`) sobre fondos claros. Se detecta el fondo visible bajo el puntero, también al hacer scroll sin mover el mouse y sobre el header fijo.
- En campos de texto vuelve el cursor nativo. En pantallas táctiles no se activa.

**Botón flotante del asistente (`<chat-launcher>`)**
- Transversal: se agrega solo en todas las páginas desde `js/layout.js`. Fijo abajo a la derecha (`--layout-gutter`; `--space-24` del borde inferior en mobile, `--space-32` en desktop), círculo de 56 px con ícono de chat.
- Navy 900 con ícono blanco sobre fondos claros; blanco con ícono Navy 900 sobre fondos oscuros. Detecta el fondo que tiene detrás al hacer scroll.
- Por ahora no abre nada (asistente por definir). Queda bajo el menú hamburguesa cuando está abierto.
- Ícono de chat dibujado en el estilo del kit, pendiente de llevar a Figma.

**Hero:** el botón "Contactar al equipo comercial" (Acento · forma de diálogo) va abajo a la izquierda, solo en el hero. En mobile sube para no chocar con el botón del asistente.

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
