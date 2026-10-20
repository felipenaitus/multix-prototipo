# Adaptación desktop ↔ mobile

Regla general: cada funcionalidad se construye para desktop y mobile en la misma tarea. Mobile no es una versión reducida: se elige el patrón que mejor sirve a la tarea del usuario en ese contexto (pantalla chica, uso con el pulgar, conexión variable).

## Breakpoints
| Nombre | Ancho | Uso |
|---|---|---|
| Mobile | < 768px | Base de los estilos (mobile first). Se diseña y prueba a 375px. |
| Tablet | 768–1279px | Ajustes intermedios: grillas de 2 columnas, menú aún en hamburguesa. |
| Desktop | ≥ 1280px | Menú completo, grillas completas, mega menú. Se prueba a 1280 y 1440px. |

## Principios
1. **Una columna por defecto en mobile.** Las grillas de 3-4 columnas pasan a 1 (o 2 si los elementos son muy cortos, como cifras).
2. **Horizontal → slider o vertical, según el contenido.** Slider con scroll-snap cuando importa recorrer y comparar elementos del mismo tipo (marcas, tarjetas de noticias); apilado vertical cuando cada elemento se lee una vez (pasos, cifras, bloques de texto). El slider muestra parte del siguiente elemento para indicar que hay más.
3. **Ocultar no es adaptar.** No se elimina contenido en mobile; se reordena, se colapsa o se mueve a un panel.
4. **Toque, no hover.** Todo lo que en desktop aparece con hover tiene en mobile un equivalente visible o activable con un toque. Zona táctil mínima de 44px.
5. **Lo importante, primero.** En mobile se respeta el orden de lectura: lo que en desktop está a la derecha (por ejemplo, el próximo evento junto al último resultado) baja debajo, nunca queda oculto.
6. **Márgenes y aire se mantienen proporcionales.** Gutter 20px y separación entre secciones de 72px en mobile (tokens `--layout-gutter`, `--layout-section-gap`).
7. **Movimiento liviano.** Videos de scroll-scrubbing y animaciones pesadas se reemplazan por imagen o por una animación simple en mobile y con `prefers-reduced-motion`.

## Patrones por componente
| Componente | Desktop | Mobile |
|---|---|---|
| Header | Dos filas: barra utilitaria (Portal Proveedores · Diving X · Contacto · buscador · ES/EN) y fila principal (logo · Productos · Sustentabilidad · Inversionistas a la derecha, junto a la hamburguesa) | Mobile y tablet (< 1280): una fila con logo, buscador y hamburguesa. Utilitaria, accesos e idioma pasan al menú |
| Desplegable de Inversionistas | Se abre con hover o clic; navegable con teclado | No aplica: Inversionistas va en acordeón dentro del overlay |
| Menú hamburguesa | Panel flotante bajo el header, ancho del contenedor, sobre el sitio oscurecido y desenfocado: buscador, tarjeta de noticia destacada, accesos en dos grupos y franja de Portales · Recursos con las redes a la derecha | Tablet: mismo panel sin vista previa, idioma dentro. Mobile: pantalla completa, sin vista previa; buscador arriba, "La compañía" y "Negocio" en lista, luego Portales, Recursos, idioma y redes |
| Header fijo | Al bajar, la barra utilitaria sale y la fila principal pasa de 80 a 64 px; al volver arriba reaparece. Transparente sobre el hero → blanco al hacer scroll, siempre (sin importar el fondo) | Alto 64 px; se oculta al bajar y aparece al subir. Mismo cambio de transparente a blanco |
| Tabs de sección (sub-navegación) | Fila completa | Tira con scroll horizontal, tab activa visible y centrada |
| Breadcrumb | Ruta completa | Solo "← Volver a [página padre]" |
| Hero | Display + bajada + botones en fila; franja temporal en una línea | Display móvil; botones apilados a ancho completo; franja temporal en dos líneas (etiqueta arriba, texto + enlace abajo) |
| Cifras "en una mirada" | 4 columnas con divisores verticales | Grilla de 2 × 2 con divisores horizontales |
| Último resultado + próximo evento | Dos tarjetas lado a lado | Apiladas: último resultado primero |
| Accesos a documentos del trimestre | Grilla 2 × 2 | Lista de 1 columna |
| Botones de agendar (Google, Outlook, iCal) | Fila de botones pequeños | Un botón "Agregar al calendario" que abre las opciones |
| Barra de filtros | Buscador + selects en una fila; chips activos debajo | Buscador visible + botón "Filtrar (n)" que abre un panel inferior con los filtros y "Aplicar"/"Limpiar"; chips activos con scroll horizontal |
| Listado de documentos por año | Fila: ícono + título + metadatos + badge + "Descargar" | Tarjeta: título, metadatos y badge apilados; toda la fila es tocable para descargar |
| Matriz trimestre × tipo | Tabla completa | Scroll horizontal con la columna "Período" fija y un divisor (`--border-thin`) a su derecha que indica que hay más; sin sombra (la única sombra del sistema es `--shadow-card`). Alternativa: acordeón por trimestre con la lista de documentos |
| Tablas en general (dividendos, etc.) | Tabla | Si tiene ≤ 3 columnas, se mantiene; si tiene más, cada fila pasa a tarjeta con pares etiqueta–valor |
| Paginación | Números + flechas | Flechas + "Página 2 de 8" |
| Gráfico de la acción | Gráfico con ejes y tooltip al hover | Gráfico simplificado; tooltip al tocar; selector de período en tira con scroll |
| Metas con avance | Selector de año en fila; barras con meta y cifra a la derecha | Selector con scroll horizontal; meta arriba, barra y cifra debajo |
| Certificaciones (tabs + desplegables) | Tabs + tarjetas desplegables en grilla | Tabs en tira; tarjetas en lista de 1 columna |
| Nuestras marcas | Columnas abiertas separadas por una línea vertical, con líneas arriba y abajo; hover con foto de fondo y logo en blanco | Apiladas, separadas por líneas horizontales; sin hover en pantallas táctiles (queda el logo en color) |
| Preguntas frecuentes | Acordeón | Acordeón (igual), zona táctil completa en la pregunta |
| Composición con ilustración | Texto a la izquierda, ilustración a la derecha | Ilustración arriba (más chica), texto debajo; cifras en 2 × 2 |
| Formularios | Campos en 2-3 columnas cuando son cortos | 1 columna; teclado según el tipo de campo (`type="email"`, `tel`, etc.) |
| Suscripción (texto + campo + botón) | En una fila | Apilado; botón a ancho completo |
| Encabezado de sección | Etiqueta + Título 2 + bajada al 68 % del contenedor | Bajada a ancho completo |
| Tarjetas de solución | 3 columnas | Tablet y mobile: slider con scroll-snap (casi 2 tarjetas visibles en tablet; 1 y parte de la siguiente en mobile) |
| Mercados y oficinas | Globo a la izquierda (80 % de su mitad) y título + datos a la derecha, en dos mitades | Título y datos primero, globo debajo (60 % del ancho en tablet, 90 % en mobile); regiones en 2 columnas en tablet y 1 en mobile |
| Globo de mercados | Gira solo; se detiene con el mouse encima; se arrastra; nombre del pin con hover, foco o clic | Se arrastra en horizontal (el scroll vertical de la página sigue funcionando); nombre del pin al tocarlo |
| Descarga del catálogo | Texto y botón a la izquierda; a la derecha el flipbook (7/12) o la imagen con círculo (2/5); switch "Flipbook · Imagen" bajo la vista | Flipbook: debajo del texto a ancho completo (16:9 en tablet, 4:3 en mobile). Imagen: a la derecha desde tablet y debajo en mobile. El switch se mantiene |
| Certificaciones en grilla | 4 columnas de celdas abiertas con una línea arriba; logo arriba; la descripción se despliega dentro de la celda | Tablet: 2 columnas. Mobile: lista de 1 columna separada por líneas, con el logo a la izquierda |
| Cadena de valor (Del cultivo a la mesa) | 6 pasos en una fila sobre una línea horizontal | Tablet: 3 columnas. Mobile: lista vertical con la línea y los marcadores a la izquierda |
| Módulo comercial (`<sales-contact>`) | Botón flotante abajo a la izquierda; el formulario se abre como panel sobre el botón | El formulario se abre como panel inferior a lo ancho de la pantalla, por sobre el botón del asistente |
| Hero con acción a la derecha | Textos a la izquierda y botón a la derecha, alineados abajo | Tablet y mobile: el botón va debajo de los textos (en tablet no hay ancho para ambos sin cortar el título) |
| Formulario comercial en modal (`variant="inline"`) | Modal centrado sobre el sitio oscurecido | Panel inferior a lo ancho, sobre el sitio oscurecido |
| Botón flotante del asistente | Fijo abajo a la derecha, 56 px, a `--space-32` del borde | Igual, a `--space-24` del borde |
| Footer | Logo arriba; Direcciones · Información · Personas y proveedores en una fila con los títulos alineados; redes y copyright abajo. Tablet: direcciones arriba (en dos columnas) y enlaces debajo | Mobile: Información y Personas y proveedores en acordeón; direcciones y teléfonos siempre visibles; Canal de Denuncias como enlace dentro de Información |
| Teléfonos y correos | Enlace | Enlace (marca o abre el correo con un toque) |

## Componentes sin patrón
Si un componente nuevo no está en esta tabla: proponer el patrón a Felipe antes de implementarlo y, una vez aprobado, agregarlo aquí.

## Verificación
Capturas con Playwright en 375, 768, 1280 y 1440px de todo lo modificado. Revisar: sin scroll horizontal de la página, textos sin cortar, zonas táctiles de 44px, menús y paneles que abren y cierran (incluido al tocar fuera y con la tecla Escape).
