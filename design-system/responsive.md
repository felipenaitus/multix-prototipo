# Adaptación desktop ↔ mobile

Regla general: cada funcionalidad se construye para desktop y mobile en la misma tarea. Mobile no es una versión reducida: se elige el patrón que mejor sirve a la tarea del usuario en ese contexto (pantalla chica, uso con el pulgar, conexión variable).

## Breakpoints
| Nombre | Ancho | Uso |
|---|---|---|
| Mobile | < 768px | Base de los estilos (mobile first). Se diseña y prueba a 375px. |
| Tablet | 768–1023px | Ajustes intermedios: grillas de 2 columnas, menú aún en hamburguesa. |
| Desktop | ≥ 1024px | Menú completo, grillas completas, mega menú. Se prueba a 1024, 1280 y 1440px. Bajó desde 1280: los notebooks con escalado de Windows (125–150 %) muestran el sitio entre 1024 y 1279 px y veían la versión tablet ampliada. |

## Principios
1. **Una columna por defecto en mobile.** Las grillas de 3-4 columnas pasan a 1 (o 2 si los elementos son muy cortos, como cifras).
2. **Horizontal → slider o vertical, según el contenido.** Slider con scroll-snap cuando importa recorrer y comparar elementos del mismo tipo (marcas, tarjetas de noticias); apilado vertical cuando cada elemento se lee una vez (pasos, cifras, bloques de texto). El slider muestra parte del siguiente elemento para indicar que hay más.
3. **Ocultar no es adaptar.** No se elimina contenido en mobile; se reordena, se colapsa o se mueve a un panel.
4. **Toque, no hover.** Todo lo que en desktop aparece con hover tiene en mobile un equivalente visible o activable con un toque. Zona táctil mínima de 44px.
5. **Lo importante, primero.** En mobile se respeta el orden de lectura: lo que en desktop está a la derecha (por ejemplo, el próximo evento junto al último resultado) baja debajo, nunca queda oculto.
6. **Márgenes y aire se mantienen proporcionales.** En desktop (≥ 1024 px) el margen lateral es como mínimo 64 px, para que el contenido no quede pegado a los bordes en notebooks con escalado alto; y Display, títulos y cifras crecen de forma continua entre 768 y 1440 px. Gutter 20px y separación entre secciones de 72px en mobile (tokens `--layout-gutter`, `--layout-section-gap`).
7. **Movimiento liviano.** Videos de scroll-scrubbing y animaciones pesadas se reemplazan por imagen o por una animación simple en mobile y con `prefers-reduced-motion`.

## Patrones por componente
| Componente | Desktop | Mobile |
|---|---|---|
| Header | Dos filas: barra utilitaria (Portal Proveedores · Diving X · Contacto · buscador · ES/EN) y fila principal (logo · Productos · Sustentabilidad · Inversionistas a la derecha, junto a la hamburguesa) | Mobile y tablet (< 1024): una fila con logo, buscador y hamburguesa. Utilitaria, accesos e idioma pasan al menú |
| Desplegable de Inversionistas | Se abre con hover o clic; navegable con teclado | No aplica: Inversionistas va en acordeón dentro del overlay |
| Menú hamburguesa | Panel flotante bajo el header, ancho del contenedor, sobre el sitio oscurecido y desenfocado: buscador, tarjeta de noticia destacada, accesos en dos grupos y franja de Portales · Recursos con las redes a la derecha | Tablet: mismo panel sin vista previa, idioma dentro. Mobile: pantalla completa blanca, con el header también blanco y el logo en su color; sin vista previa; buscador arriba, "La compañía" y "Negocio" en lista, luego Portales, Recursos, idioma y redes |
| Header fijo | Al bajar, la barra utilitaria sale y la fila principal pasa de 80 a 64 px; al volver arriba reaparece. Transparente sobre el hero → blanco al hacer scroll, siempre (sin importar el fondo) | Alto 64 px; se oculta al bajar y aparece al subir. Mismo cambio de transparente a blanco |
| Pestañas de contenido de página | Bajo el encabezado y el sub-menú, del ancho de su texto | Las pestañas se reparten el ancho (todas a la vista); el texto puede ir en dos líneas |
| Tabs de sección (sub-navegación) | Fila completa | Tira con scroll horizontal, tab activa visible y centrada |
| Breadcrumb | Ruta completa | Solo "← Volver a [página padre]" |
| Hero | Display + bajada + botones en fila; franja temporal en una línea | Display móvil; botones apilados a ancho completo; franja temporal en dos líneas (etiqueta arriba, texto + enlace abajo) |
| Cifras "en una mirada" | 4 columnas con divisores verticales | Grilla de 2 × 2 con divisores horizontales |
| Accesos de Inversionistas (últimos documentos + próximo evento) | Dos módulos lado a lado con la misma estructura; el evento (uno solo) ocupa el alto de la lista de documentos | Apilados: documentos primero y luego el evento, cada uno con su acceso debajo |
| Accesos a documentos del trimestre | Grilla 2 × 2 | Lista de 1 columna |
| Botones de agendar (Google, Outlook) | "Agendar" seguido de los dos botones pequeños en fila | Igual: las dos opciones siempre a la vista (sin botón que las despliegue) |
| Barra de filtros | Buscador + selects en una fila; chips activos debajo | Buscador visible + botón "Filtrar (n)" que abre un panel inferior con los filtros y "Aplicar"/"Limpiar"; chips activos con scroll horizontal |
| Memoria anual | La más reciente a la izquierda (portada, datos y acciones) y las anteriores a la derecha, con "Ver más memorias" | Apiladas: la más reciente arriba (portada sobre su rectángulo a ancho completo) y debajo las anteriores con "Ver más memorias" |
| Listado de documentos por año | Fila: ícono + título + metadatos + badge + "Descargar" | Título, metadatos y tipo apilados (el tipo como texto sin relleno, alineado con el título); "Ver PDF" y "Descargar" visibles debajo, en fila (zona táctil de 44 px) |
| Matriz trimestre × tipo | Tabla completa | Scroll horizontal con la columna "Período" fija y un divisor (`--border-thin`) a su derecha que indica que hay más; sin sombra (la única sombra del sistema es `--shadow-card`). Alternativa: acordeón por trimestre con la lista de documentos |
| Tablas en general (dividendos, etc.) | Tabla | Si tiene ≤ 3 columnas, se mantiene; si tiene más, cada fila pasa a tarjeta con pares etiqueta–valor |
| Paginación | Números + flechas | Flechas + "Página 2 de 8" |
| Gráfico de la acción | Gráfico con ejes y tooltip al hover | Gráfico simplificado; tooltip al tocar; selector de período en tira con scroll |
| Metas con avance | Selector de año en fila; barras con meta y cifra a la derecha | Selector con scroll horizontal; meta arriba, barra y cifra debajo |
| Certificaciones (tabs + desplegables) | Tabs + tarjetas desplegables en grilla | Tabs en tira; tarjetas en lista de 1 columna |
| Nuestras marcas | Dos círculos con contorno lado a lado; con hover el video rellena el círculo y el logo pasa a blanco | Tablet: dos círculos lado a lado. Mobile: círculos apilados (85 % del ancho). Sin hover en pantallas táctiles: queda el contorno con el logo en color |
| Preguntas frecuentes | Acordeón | Acordeón (igual), zona táctil completa en la pregunta |
| Composición con ilustración | Texto a la izquierda, ilustración a la derecha | Ilustración arriba (más chica), texto debajo; cifras en 2 × 2 |
| Formularios | Campos en 2-3 columnas cuando son cortos | 1 columna; teclado según el tipo de campo (`type="email"`, `tel`, etc.) |
| Suscripción (texto + campo + botón) | En una fila | Apilado; botón a ancho completo |
| Encabezado de sección | Etiqueta + Título 2 + bajada al 68 % del contenedor | Bajada a ancho completo |
| Tarjetas de solución | 3 columnas | Tablet y mobile: slider con scroll-snap (casi 2 tarjetas visibles en tablet; 1 y parte de la siguiente en mobile) |
| Mercados y oficinas | Globo a la izquierda (2/5) y, a la derecha (3/5), título, tres cifras en fila con líneas verticales entre ellas y oficinas. Entre 1024 y 1279 px las cifras bajan a Cifra M para caber | Título y cifras primero, globo debajo. Tablet: cifras en fila. Mobile: cifras apiladas con líneas horizontales entre ellas |
| Globo de mercados | Gira solo; se detiene con el mouse encima; se arrastra; nombre del pin con hover, foco o clic | Se arrastra en horizontal (el scroll vertical de la página sigue funcionando); nombre del pin al tocarlo |
| Descarga del catálogo | Texto y botón a la izquierda; a la derecha la imagen con círculo (mitad del ancho) | Imagen a la derecha desde tablet y debajo del texto en mobile |
| Certificaciones en grilla | 4 columnas de celdas abiertas con una línea arriba; logo arriba; la descripción se despliega dentro de la celda | Tablet: 2 columnas. Mobile: lista de 1 columna separada por líneas, con el logo a la izquierda |
| Cadena de valor (Del cultivo a la mesa) | 6 pasos en una fila sobre una línea horizontal | Tablet: 3 columnas. Mobile: lista vertical con la línea y los marcadores a la izquierda |
| Módulo comercial (`<sales-contact>`) | Botón flotante abajo a la izquierda; el formulario se abre como panel sobre el botón | El formulario se abre como panel inferior a lo ancho de la pantalla, por sobre el botón del asistente |
| Hero con acción a la derecha | Textos a la izquierda y botón a la derecha, alineados abajo | Tablet y mobile: el botón va debajo de los textos (en tablet no hay ancho para ambos sin cortar el título) |
| Formulario comercial en modal (`variant="inline"`) | Modal centrado sobre el sitio oscurecido | Panel inferior a lo ancho, sobre el sitio oscurecido |
| Borde inferior curvo entre secciones | Arco de 96 px que se aplana con el scroll | Mismo comportamiento con arco más bajo: 64 px en tablet, 40 px en mobile |
| Soluciones en pasos | Título y pasos a la izquierda (5/11); ilustración con círculo a la derecha (6/11), a todo el ancho de su columna | Tablet: dos mitades. Mobile: título y pasos arriba, ilustración debajo a ancho completo; los pasos siguen siendo una lista con la descripción del activo abierta |
| Relato vertical (Del cultivo a la mesa) | Título y paso arriba a la izquierda; composición al centro; descripción abajo a la izquierda y línea de secuencia con flechas abajo a la derecha | Tablet: igual, con la composición más grande. Mobile: todo en una columna (título, paso, composición, descripción, línea y flechas); las flechas y los tramos tienen zona táctil de 44 px. Sin hover: el video del círculo se abre y cierra con un toque. Los 4 datos del paso aparecen en el lugar de la descripción, en 2 × 2 (en desktop, a la derecha de la composición, en una columna) |
| Línea de tiempo (Nosotros › Historia) | Igual que el relato vertical: título y hito arriba, año sobre el círculo al centro, descripción abajo a la izquierda y la línea con los años abajo a la derecha, flechas debajo | Todo en una columna; los años bajo la línea a todo el ancho (tramos de 44 px de alto) y las flechas debajo a la derecha |
| Lista de valores | Filas a la derecha del propósito | Debajo del propósito, a ancho completo |
| Pilares con foto | Dos en fila | Uno debajo del otro, foto a ancho completo |
| Sub-menú de Inversionistas | Tira bajo el hero, fija bajo la fila compacta del header al hacer scroll | Se desliza de lado con el acceso activo centrado; una flecha a la derecha (sobre un fundido blanco) indica que hay más secciones y avanza la tira al tocarla; desaparece al llegar al final; queda arriba del todo cuando el header se esconde y bajo el header cuando reaparece |
| Bloque en dos columnas (`.split`) | Encabezado 5/12 y contenido 7/12 | Apilado: encabezado arriba, contenido debajo |
| Filtros del Centro de Resultados | Buscador y tres selects (año, trimestre, tipo) en una fila; debajo, el conteo de documentos y "Limpiar filtros" a la derecha | Buscador visible + "Filtrar (n)" que abre el panel inferior con los selects y "Ver resultados" |
| Compañía integrada (Inversionistas) | Texto y círculo con video en dos mitades | Texto arriba y círculo debajo (86 % del ancho en mobile, 60 % en tablet), con las regiones alrededor |
| Ofertas por región | Filas con la cantidad en coral a la izquierda, región y localidades al centro y la flecha en círculo a la derecha | Igual (las tres columnas se mantienen); la flecha en círculo es la zona táctil de 44 px y toda la fila es el enlace |
| Círculo con video | Ilustración sobre círculo a la derecha del texto; hover abre el video | Debajo del texto (80 % del ancho en mobile, 60 % en tablet). Sin hover: el video se abre y cierra con un toque |
| Ancla a Inversionistas (home) | Dos mitades: texto y acceso a la izquierda; último reporte y próximo evento a la derecha | Apilados: texto y acceso; debajo, último reporte y próximo evento |
| Lista con fecha | Fecha (día y mes) a la izquierda, título y dato a la derecha | Igual: la columna de la fecha se mantiene y el título baja de línea si no cabe |
| Noticias | Tres notas en fila | Tablet: slider con casi dos notas a la vista. Mobile: slider con una nota y parte de la siguiente |
| Botón flotante del asistente | Fijo abajo a la derecha, 56 px, a `--space-32` del borde | Igual, a `--space-24` del borde |
| Footer | Logo arriba; Direcciones · Información · Personas y proveedores en una fila con los títulos alineados; redes y copyright abajo. Tablet: direcciones arriba (en dos columnas) y enlaces debajo | Mobile: Información y Personas y proveedores en acordeón; direcciones y teléfonos siempre visibles; Canal de Denuncias como enlace dentro de Información |
| Teléfonos y correos | Enlace | Enlace (marca o abre el correo con un toque) |

## Componentes sin patrón
Si un componente nuevo no está en esta tabla: proponer el patrón a Felipe antes de implementarlo y, una vez aprobado, agregarlo aquí.

## Verificación
Capturas con Playwright en 375, 768, 1024, 1280 y 1440px de todo lo modificado. Revisar: sin scroll horizontal de la página, textos sin cortar, zonas táctiles de 44px, menús y paneles que abren y cierran (incluido al tocar fuera y con la tecla Escape).
