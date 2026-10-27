# Changelog del UI kit

Registro de cambios del kit (tokens, estilos de texto y componentes). Cada entrada indica qué cambió, por qué y si ya está reflejado en Figma y en el código.

Formato: `AAAA-MM-DD · [Figma ✓/pendiente] [Código ✓/pendiente] · descripción`

## 2026-10-27 · Memorias anteriores hasta 2020
- Código ✓ · "Años anteriores" muestra de 2024 a 2020; "Ver más memorias" despliega 2019.

## 2026-10-27 · Memoria anual más jerarquizada
- Código ✓ · La memoria destacada baja su título a Título 3 (antes Título 2, igual que el de la sección). "Más reciente" va arriba con una línea debajo, como "Años anteriores", así las dos columnas parten a la misma altura; la portada pasa al 80 % de su columna.

## 2026-10-27 · Memoria anual con la más reciente destacada
- Figma pendiente · Código ✓ · Centro de Resultados › Memoria anual: a la izquierda la memoria más reciente destacada (portada, "Más reciente", título, datos, "Descargar" y "Ver PDF"); a la derecha "Años anteriores" con 3 memorias a la vista y "Ver más memorias", que despliega las siguientes hacia abajo. Nuevos: `.annual`, `.annual-featured`, `.annual-archive` y el comportamiento `[data-reveal-more]`. Se suman 2020 y 2019 de ejemplo. Se retira `.section-head__media` (la portada pasa a la memoria destacada).

## 2026-10-26 · Portada de la última memoria
- Código ✓ · Centro de Resultados › Memoria anual: bajo el título y la bajada va la portada de la Memoria integrada 2025 (`assets/img/memoria-2025.webp`, 900 px, desde Memoria_Imagen). Nuevo elemento `.section-head__media`.

## 2026-10-26 · "Ver PDF" más claro (excepción a AA)
- Figma pendiente · Código ✓ · Tokens nuevos: primitivo `--color-ink-400` (#7A8B91) y semántico `--color-text-quiet` (3,5:1 sobre blanco). "Ver PDF" pasa de Ink 500 a Ink 400. **Excepción a AA** (pide 4,5:1 para texto de ese tamaño) aprobada por Felipe, solo para "Ver PDF"; con hover pasa a Ink 900.

## 2026-10-26 · "Ver PDF" en gris
- Código ✓ · "Ver PDF" pasa a gris claro (Ink 500, `--color-text-tertiary`, 4,6:1 sobre blanco; con hover, Ink 900) para diferenciarse de "Descargar", que sigue en Navy. Primero se probó Ink 600, pero se veía muy oscuro.

## 2026-10-26 · "Ver PDF" en todos los documentos
- Código ✓ · Centro de Resultados (y kit): cada documento suma "Ver PDF", que abre el archivo en una pestaña nueva, junto a "Descargar". Las dos acciones van juntas al final de la fila (`.doc-row__actions`); en mobile, debajo de los datos, en fila.

## 2026-10-26 · Inversionistas: dos últimos documentos
- Código ✓ · El módulo "Últimos documentos publicados" de Inversionistas muestra los 2 últimos (antes 3); el próximo evento sigue ocupando el alto de la lista.

## 2026-10-26 · Catálogo de Productos solo con imagen
- Código ✓ · Productos › catálogo: se quitan el flipbook y el switch "Flipbook · Imagen"; queda solo la imagen del catálogo sobre el círculo.

## 2026-10-26 · Título de la sección que lleva a Nosotros
- Código ✓ · Home: la primera sección después del hero (enlace a Nosotros) cambia su título de "Salmón del sur de Chile para el mundo" a "Una salmonera del sur de Chile", para que se entienda que presenta a la compañía. El acceso sigue como "Conoce Multi X".

## 2026-10-26 · Home: tres regiones en Trabaja con nosotros y acceso a Sustentabilidad
- Código ✓ · Trabaja con nosotros muestra solo tres regiones destacadas con su cifra de ofertas (Los Lagos, Aysén y Magallanes); salen Santiago y Miami ("Ver todas las ofertas" sigue llevando al listado completo).
- Código ✓ · "Ir a Sustentabilidad" pasa de botón secundario (con borde) a acceso de texto con flecha, igual que el resto de los accesos del home.

## 2026-10-26 · Hero del home: cambio de frase completa
- Código ✓ · El hero deja de cambiar palabra por palabra (que armaba "Cuidando el futuro" y "Alimentando el mundo") y alterna dos frases completas: "Alimentando el futuro" → "Cuidando el mundo". La oración entera sale hacia arriba y la siguiente entra desde abajo (`--duration-reveal`, pausa de 4 × `--duration-reveal`). Sigue como PRUEBA (`pruebas.css`), pendiente de llevar a motion.md.

## 2026-10-26 · Título del ancla a Inversionistas
- Código ✓ · El título pasa de "Inversionistas" a "Conoce nuestro desempeño" (más invitacional, sin repetir el nombre de la página).

## 2026-10-26 · Ancla a Inversionistas sin cifras, en dos mitades
- Código ✓ · Se quitan las cifras del ancla a Inversionistas del home; los dos bloques (texto + acceso / último reporte + próximo evento) pasan a mitades iguales con `.split--half`. Se retira `.stats--compact` (ya no se usa).

## 2026-10-26 · Home: sección de Inversionistas como ancla
- Figma pendiente · Código ✓ · La sección azul del home deja los dos módulos enfrentados y pasa a ser un ancla a Inversionistas: a la izquierda título, bajada, 4 cifras (ingresos, EBITDA, acción y dividendo, `[contenido por definir]`) y "Ir a Inversionistas"; a la derecha el último reporte y el próximo evento (uno de cada uno, clickeables). Nuevos: `.stats--compact` y `.ir-highlights`. La página Inversionistas mantiene sus módulos enfrentados.

## 2026-10-26 · Un solo próximo evento
- Código ✓ · Home e Inversionistas: el módulo "Próximo evento" muestra un solo evento (nunca hay dos próximos). Va destacado (`.date-item--featured`, fecha en Cifra L) y en desktop ocupa el alto de toda la lista de documentos, con las líneas alineadas arriba y abajo. Se quitan los eventos de ejemplo extra.

## 2026-10-26 · Márgenes y tipografía para pantallas chicas
- Figma pendiente · Código ✓ · `--layout-gutter` es como mínimo 64 px desde 1024 px (antes 4 % del ancho: 43 px en un notebook de ≈ 1067 px).
- Figma pendiente · Código ✓ · Display, Títulos 1–3 y Cifras L/M/S pasan a tamaños fluidos (`clamp()` en `tokens.css`): del tamaño móvil a 768 px al de desktop a 1440 px. Ejemplo a 1067 px: Display 51, Título 1 37, Título 2 29, Cifra L 45 px. Motivo: el cliente ve el sitio en un ThinkPad con escalado alto (≈ 1067 × 500 px útiles) y todo se veía grande y junto.

## 2026-10-26 · Punto de quiebre de desktop en 1024 px
- Código ✓ · El desktop empieza en 1024 px (antes 1280). Motivo: el cliente veía el sitio en un notebook con escalado de Windows (≈ 1093–1229 px de ancho) y le llegaba la versión tablet ampliada (círculo gigante, noticias en slider, header con hamburguesa). Se actualizan todas las media queries, los `matchMedia` de `layout.js` y `components.js`, CLAUDE.md y responsive.md. La verificación suma 1024 px.
- Código ✓ · Ajustes para que todo quepa desde 1024: Mercados pasa a globo 2/5 y datos 3/5 (antes mitades; las cifras ya se salían de su columna a 1280 y 1440) y entre 1024 y 1279 usa Cifra M; las cifras en fila tienen menos aire lateral entre 1024 y 1279. Revisadas las seis páginas a 375, 768, 1024, 1093, 1229, 1280 y 1440 px.

## 2026-10-26 · Accesos de Inversionistas alineados y clickeables
- Código ✓ · En desktop los dos módulos comparten filas (subgrid): título, ítems y acceso a la misma altura en ambos.
- Código ✓ · Cada fila de la lista con fecha es un enlace. Los documentos llevan al Centro de Resultados ya filtrado (año, trimestre y tipo por URL) para mostrar solo ese documento; los eventos, al calendario (`#` por ahora).
- Código ✓ · El Centro de Resultados lee los filtros desde la URL (`year`, `quarter`, `type`, `q`) y, si llega con filtros, baja directo a los resultados.

## 2026-10-26 · Accesos de Inversionistas más uniformes y sin contenedores azul claro
- Código ✓ · Fondo oscuro: se elimina el relleno Navy 900 de los contenedores (ícono, fecha, círculo del catálogo). Los contenedores no llevan relleno y el círculo del catálogo queda con un contorno fino Navy 600.
- Figma pendiente · Código ✓ · Home › Inversionistas e Inversionistas › documentos y eventos: sin Descargar ni Agendar; cada módulo tiene solo su acceso (Centro de Resultados / calendario). Ambos módulos usan la misma estructura, la nueva lista con fecha (`.date-list`): 2 ítems por módulo en el home y 3 en Inversionistas. En Inversionistas, documentos y eventos pasan a una sola sección con los módulos enfrentados.
- Contenido de ejemplo: se suman dos eventos (resultados Q4 2026 y Junta Ordinaria 2027), marcados `[contenido por definir]`.

## 2026-10-26 · Cifras en coral más delgadas
- Figma pendiente · Código ✓ · `--text-figure-strong-weight` pasa de 600 a 400: todas las cifras en coral del sitio (home, Inversionistas, Nosotros, Mercados, ofertas por región y total de colaboradores) quedan en Sora 400. La excepción de contraste del coral se mantiene por tamaño (Cifra L).

## 2026-10-26 · Nueva ilustración de Ahumado
- Código ✓ · Productos › Soluciones para cada mercado: la ilustración del paso Ahumado se reemplaza por la nueva (Ahumado_2), convertida a WebP sin pérdida de 800 px en el mismo archivo `assets/img/ahumado.webp`.

## 2026-10-26 · Año del acordeón más grueso
- Figma pendiente · Código ✓ · Token nuevo `--text-figure-regular-weight: 400` (Cifra regular). El año del acordeón de documentos (Centro de Resultados y kit) pasa de Sora 300 a Sora 400.

## 2026-10-26 · Nueva ilustración de Congelado
- Código ✓ · Productos › Soluciones para cada mercado: la ilustración del paso Congelado se reemplaza por la nueva (Congelado_2), convertida a WebP sin pérdida de 800 px en el mismo archivo `assets/img/congelado.webp`.

## 2026-10-26 · Fondo del menú más oscuro
- Código ✓ · Con el menú hamburguesa abierto, el fondo oscurecido pasa de Navy 950 al 45 % a 65 %: el logo y la X blancos suben de 2,9:1 a 5,4:1 sobre páginas blancas (AA). En mobile no cambia (el menú es una pantalla blanca).

## 2026-10-26 · Horizonte manda sobre Apertura
- Código ✓ · Cuando una sección cierra con Horizonte y la siguiente tiene Apertura, se respeta solo el cierre: la siguiente entra recta (`.section--curve-bottom + .section--open-in`). Corrige Inversionistas (evento en azul → compañía integrada en crema).

## 2026-10-23 · Página Nosotros (solo local)
- Figma pendiente · Código ✓ · Nueva página `nosotros.html` según el mapa: hero con video, Quiénes somos (propósito y valores), Cifras clave (regiones, comunas, localidades y centros), Personas (excelencia, innovación y total de colaboradores, reformulado en una sección), Historia en línea de tiempo y acceso a Directorio y Ejecutivos. Contenidos de ejemplo marcados `[contenido por definir]`; fotos y video por definir.
- Figma pendiente · Código ✓ · Componentes nuevos: `.value-list`, `.pillars`, `.figure-total` (en el kit) y la variante `.chain--timeline` del relato vertical (en ui-kit.md). El video del relato vertical pasa a ser opcional en `components.js`.
- Código ✓ · Regla de contenedores sobre crema: el círculo del relato vertical también pasa a blanco.
- Código ✓ · "Nosotros" del menú y "Conoce Multi X" del home enlazan a la nueva página.

## 2026-10-21 · Kit visual como referencia
- Código ✓ · `kit.html` pasa a ser un kit de referencia (pedido de Felipe): sin header, menú ni footer del sitio (ni el botón del asistente); tokens completos con secciones nuevas de Espaciado, radio y bordes, y de Movimiento (valores leídos en vivo de `tokens.css`); un ejemplo por componente (botones, formularios, sub-menú, pestañas, migas de pan, encabezado de sección, cifras, filtros, listado de documentos, evento y agendar, preguntas frecuentes) y una sola composición de ejemplo (ilustración sobre círculo) junto a los fondos de sección. Las composiciones de cada página salen del kit y quedan descritas en `ui-kit.md`.
- Conflicto con CLAUDE.md 2.2 ("todo componente usado en una página debe existir antes en kit.html"): desde ahora las composiciones de página no se agregan a `kit.html`; se definen en `ui-kit.md`. Pendiente de que Felipe confirme el cambio de la regla en CLAUDE.md.

## 2026-10-21 · Documentación del kit al día
- Código ✓ · `ui-kit.md` y `kit.html` actualizados con las definiciones de la jornada: menú blanco en mobile, flecha del sub-menú, agendar siempre a la vista, tipo de documento como texto en mobile, `.section--joined` y fecha de última actualización en la portada del kit.

## 2026-10-21 · Inversionistas sin línea entre documentos y evento
- Código ✓ · Se quita la línea entre Últimos documentos publicados y Próximo evento: la sección del evento pasa a `.section--joined` (unida a la anterior, sin línea y sin espacio arriba propio).

## 2026-10-21 · Secciones en azul oscuro (PRUEBA)
- Figma pendiente · Código ✓ · Nueva variante de sección `.section--inverse` (fondo Navy 950). En `tokens.css` reasigna, dentro de ella, los tokens semánticos de texto, línea, contenedor y coral, para que el contenido se adapte solo. Pendiente de confirmar por Felipe.
- Código ✓ · Se aplica a: home › Últimos reportes + Próximo evento, Productos › Catálogo e Inversionistas › Últimos documentos + Próximo evento (que pasa a continuar a los documentos con una línea y lleva el arco).
- Código ✓ · Horizonte: el arco se monta un pixel sobre su sección (sin costura visible sobre fondos oscuros) y, si la sección siguiente también tiene arco, la primera queda por encima.

## 2026-10-21 · Puntos en órbita en el home
- Código ✓ · El círculo con video de home › Productos suma la órbita de puntos Coral 500 de Productos › Soluciones; los puntos crecen con el círculo al abrir el video.

## 2026-10-21 · Ajustes de mobile
- Código ✓ · Agendar: en mobile las dos opciones (Google, Outlook) quedan siempre a la vista, como en desktop; se quita el botón que las desplegaba.
- Código ✓ · Menú hamburguesa en mobile: el header queda blanco con el logo en su color mientras el menú está abierto.
- Figma pendiente · Código ✓ · Sub-menú de Inversionistas: flecha a la derecha sobre un fundido blanco que indica más secciones (`.subnav__more`); avanza la tira y desaparece al llegar al final.
- Código ✓ · Centro de Resultados en mobile: el tipo de documento va como texto alineado con el título (sin relleno de etiqueta). Desde tablet sigue como etiqueta.

## 2026-10-21 · Contenedores blancos sobre crema
- Código ✓ · Regla nueva: sobre fondo crema, los contenedores de ícono y de fecha son blancos. Se aplica a la fecha del evento (`.event__date`), que se suma al ícono de documento.
- Código ✓ · Últimos reportes (home): el tipo de documento va sin relleno, alineado con el título y los datos.
- Código ✓ · Se quita el recuadro con GIF de Trabaja con nosotros y el componente `.media-rect` (kit, CSS y docs).

## 2026-10-21 · Segundos ajustes del home
- Código ✓ · Productos: texto y círculo centrados en vertical (`.split--center`); el salmón es más grande y queda centrado sobre el círculo.
- Código ✓ · Últimos reportes: en los módulos enfrentados la fila de documento lleva el ícono arriba a la izquierda y, debajo de título y datos, el tipo y "Descargar".
- Código ✓ · Próximo evento del home suma "Agendar" (Google, Outlook).
- Figma pendiente · Código ✓ · Trabaja con nosotros: nuevo recuadro con GIF (`.media-rect`) bajo el título, la bajada y el acceso. GIF temporal hecho con el video de Inversionistas, `[gif por definir]`.
- Código ✓ · Noticias: el título se corta en 3 líneas con puntos suspensivos.

## 2026-10-21 · Ajustes del home
- Figma pendiente · Código ✓ · Productos: se quitan las dos marcas y entra el **círculo con video** (`[data-media-circle]`): la ilustración del salmón sobre un círculo blanco que, con hover, crece y se abre al video de productos, como en el relato vertical.
- Figma pendiente · Código ✓ · Inversionistas: sin título ni bajada de sección; dos **módulos enfrentados** (`.ir-pair--facing` + `.ir-module`) con sus propios títulos, "Últimos reportes" (acceso al Centro de Resultados) y "Próximo evento" (acceso al calendario, página aún sin construir).
- Figma pendiente · Código ✓ · Ofertas por región más llamativas: cantidad como cifra grande en coral corporativo (Coral 500), flecha en círculo Coral 500 que se rellena con hover y línea coral que recorre la fila.
- Código ✓ · Etiqueta de las noticias en coral corporativo (Coral 500, antes Coral 600). Excepción de contraste aprobada, igual que las cifras en coral.

## 2026-10-21 · Home con sus secciones
- Código ✓ · El home reemplaza los bloques vacíos por las secciones del mapa de navegación (FigJam): Quiénes somos (texto, círculo con video y regiones, 4 cifras en coral, acceso a Nosotros), Productos (bajada, acceso a Productos y marcas con hover), Sustentabilidad (4 cifras + acceso), Inversionistas (últimos resultados, próximo evento y accesos), Trabaja con nosotros (ofertas por región) y Noticias (tres últimas). Se omite el módulo temporal de acceso a documentación. Fondos alternados con Apertura / Horizonte.
- Figma pendiente · Código ✓ · Componentes nuevos: `.offer-list` (ofertas por región) y `.news-list` (noticias), sin cajas.

## 2026-10-21 · Nuevo video del hero de Inversionistas
- Código ✓ · Reemplazado por Video_Inversionistas_2, cortado a los primeros 45 s y en loop (720p H.264 sin audio, 74 MB → 6,1 MB), con su poster.

## 2026-10-21 · Inversionistas: compañía integrada más visual
- Figma pendiente · Código ✓ · La sección "Una compañía integrada del sur de Chile" pasa a texto + círculo con video (por ahora el del home) que crece con el scroll, con las regiones de operación alrededor que aparecen en secuencia. Nuevo comportamiento `[data-inview-video]` y patrón Firma en motion.md.

## 2026-10-21 · Video del hero de Inversionistas
- Código ✓ · El hero de Inversionistas usa su propio video (Video_Inversionistas: 720p H.264 sin audio, 24 fps, 2 min 6 s, 30,3 MB → 11,5 MB) y su poster.

## 2026-10-21 · "Limpiar filtros" en su propia fila y texto genérico del evento
- Código ✓ · "Limpiar filtros" sale de la fila de los selects y pasa a la fila del conteo de documentos (a la derecha); en el kit, al final de los filtros activos. Su aparición ya no cambia ningún ancho.
- Código ✓ · La bajada de "Próximo evento" pasa a un texto genérico, porque el evento cambia.

## 2026-10-21 · Ajustes en Inversionistas y Centro de Resultados
- Código ✓ · Cifras de "Multi X en una mirada" en coral corporativo (`.stats--accent`), misma excepción que en Mercados.
- Código ✓ · Filas de documento: el hover y el enlace quedan solo en "Descargar" (antes toda la fila). "Descargar" se ve también en mobile. Sobre fondo crema, el contenedor del ícono es blanco.
- Código ✓ · Agendar: se quita iCal; queda "Agendar" + Google y Outlook.
- Código ✓ · Centro de Resultados: más aire entre los filtros y los documentos; los selects tienen ancho fijo y "Limpiar filtros" reserva su espacio, así nada se mueve cuando aparece.

## 2026-10-21 · Páginas de Inversionistas y Centro de Resultados
- Código ✓ · Nueva página `inversionistas.html` según el mapa de navegación (Figma "Research y Definiciones"): hero con video y Display destacado, sub-menú, Multi X en una mirada (4 cifras), últimos documentos, próximo evento, descripción de la compañía, contacto y preguntas frecuentes. Transiciones Apertura / Horizonte en las secciones crema.
- Código ✓ · Nueva página `centro-de-resultados.html`: encabezado simple con ruta, sub-menú, resultados trimestrales con filtros reales (año, trimestre, tipo, búsqueda) y años desplegables, y memoria anual.
- Figma pendiente · Código ✓ · Componentes nuevos: `<ir-subnav>` (sub-menú fijo, transversal), `.page-head`, `.split`, `.doc-list`, `.ir-event` y `[data-doc-filter]`.
- Código ✓ · Sin cajas en la documentación: `.doc-years` y `.empty-state` pasan a líneas. También cambia el ejemplo del kit.
- Código ✓ · El desplegable y el menú enlazan Inversionistas e "Ir a Inversionistas" a `inversionistas.html` y Centro de Resultados a `centro-de-resultados.html`; el resto de las subpáginas sigue en "#".

## 2026-10-21 · Apertura más visible
- Código ✓ · La Apertura parte más recortada para que se note: 8 % del ancho por lado en mobile, 14 % en tablet y 20 % en desktop (antes 16, 48 y 96 px), con esquinas más redondeadas (48, 80 y 96 px).

## 2026-10-21 · Transiciones entre secciones en Productos (prueba)
- Figma pendiente · Código ✓ · Cada sección crema (Mercados, Catálogo, Certificaciones) entra con la **Apertura** (se abre de recortada a todo el ancho) y sale con el **Horizonte** (arco inferior que se aplana). El hero sigue con corte recto. Prueba para que Felipe decida si pasa a criterio general.
- Código ✓ · Con movimiento reducido, el Horizonte ahora queda recto (antes quedaba el arco fijo).

## 2026-10-21 · Certificaciones: solo descripción en el detalle
- Código ✓ · Al desplegar una certificación (grilla de Productos) se muestra solo la descripción: se quitan las etiquetas de cobertura y vigencia y el enlace "Ver certificado".

## 2026-10-21 · Logo de prueba en las certificaciones
- Código ✓ · Las 8 certificaciones muestran un logo de prueba (`assets/certs/logo-prueba.png`, el de ASC, recortado y con el fondo blanco quitado) en su espacio de logo, hasta tener los logos reales.

## 2026-10-21 · Productos: fondos de Certificaciones, Contacto y Preguntas frecuentes
- Código ✓ · Certificaciones pasa a fondo Offwhite; Contacto y Preguntas frecuentes a blanco. Preguntas frecuentes queda asociada a Contacto, separada por una línea delgada (nueva variante `.section--continued`).

## 2026-10-21 · Cifras de Mercados en coral corporativo
- Decisión · Felipe mantiene el coral corporativo en las cifras: el tamaño y el peso (Cifra L, Sora 600) compensan el contraste. Queda como excepción documentada a CLAUDE.md §4, solo para estas cifras.
- Código ✓ · Por pedido de Felipe, las tres cifras pasan a Coral 500 (coral corporativo) para probar. Advertencia: sobre el fondo Offwhite contrasta 2,86:1 y no llega al mínimo AA de 3:1 para texto grande (CLAUDE.md §4). Si se mantiene, hay que oscurecer un poco el coral de las cifras o ponerlas sobre fondo blanco (3,08:1).

## 2026-10-21 · Cursor sin ícono de play
- Código ✓ · Se quita el estado de play del cursor (`data-cursor="play"`): con el indicador del borde basta. Sobre la composición el cursor se comporta como en cualquier elemento clickeable.

## 2026-10-21 · Del cultivo a la mesa: indicador de video
- Figma pendiente · Código ✓ · Indicador de play sobre el borde del círculo (abajo a la derecha) que late para avisar que hay un video. Desaparece al abrirlo. Funciona también como señal en mobile, donde no hay hover.

## 2026-10-21 · Del cultivo a la mesa: datos del paso con el video
- Figma pendiente · Código ✓ · Al abrir el video de un paso aparecen 4 datos (cifra + texto) que detallan el proceso: a la derecha de la composición en desktop y en el lugar de la descripción en tablet y mobile. Datos de ejemplo [contenido por definir].

## 2026-10-21 · Cifras de Mercados en el color del título
- Código ✓ · Las cifras pasan de Navy 900 a Ink 900 (`--color-text-primary`), el mismo color del título.

## 2026-10-21 · Mercados: título de relato y tres cifras
- Código ✓ · Se quita el desglose por región y país. El título pasa a "Del sur de Chile a las mesas del mundo" [contenido por definir] y se suman dos cifras: +400 clientes y 90 mil toneladas al año (de ejemplo). Las tres cifras van en fila desde tablet, separadas por líneas delgadas, y cuentan al entrar en pantalla.

## 2026-10-21 · Botón comercial en coral corporativo
- Código ✓ · "Contactar al equipo comercial" usa Coral 500 (coral corporativo) en lugar de Coral 400, con texto Ink 900 (5,5:1, pasa AA). El hover se invierte a Coral 400. Excepción a la regla del botón de acento de CLAUDE.md §4 (fondo Coral 400, hover Coral 500), solo para este botón.

## 2026-10-21 · CTAs de sección en botón de línea
- Código ✓ · Por decisión de Felipe, los CTAs de las secciones usan botones de línea en vez de rellenos: "Descargar catálogo" pasa a Secundario (contorno Navy). "Contactar al equipo comercial" del hero se mantiene en Acento coral (se probó en contorno blanco y se revirtió por decisión de Felipe). El "Enviar" del formulario no cambia.

## 2026-10-21 · Del cultivo a la mesa: el círculo crece al abrir el video
- Código ✓ · Con el video abierto, el círculo crece un 15 %; vuelve a su tamaño al cerrarse.

## 2026-10-21 · Del cultivo a la mesa: video en el círculo al pasar el mouse
- Figma pendiente · Código ✓ · Al pasar el mouse por la composición, el círculo se abre a un video (por ahora el de Arka Fjord) y la ilustración se desvanece. Toque en mobile y Enter / Espacio con teclado. Al cambiar de paso se cierra.
- Figma pendiente · Código ✓ · Cursor: nuevo estado de play (`data-cursor="play"`): anillo más grande y triángulo en lugar del punto.

## 2026-10-21 · Paso de Del cultivo a la mesa en coral corporativo
- Código ✓ · El título del paso ("01. Genética y ovas") pasa de Coral 600 a Coral 500, el coral corporativo, por decisión de Felipe. Contradice la regla de CLAUDE.md §4 (Coral 500 nunca como texto sobre claro); se registra como excepción solo para este título grande, que pasa AA para texto grande (3,1:1; mínimo 3:1). Usa `--color-text-accent-on-dark` como en las etiquetas del menú; queda pendiente proponer un token propio (por ejemplo `--color-text-accent-large`).

## 2026-10-21 · Del cultivo a la mesa: sin segunda instancia; ilustración del paso 2
- Código ✓ · Se elimina la instancia B de cada paso (video en el círculo y segundo texto). Queda un paso a la vez, que se cambia con flechas o tramos.
- Código ✓ · Agua dulce (paso 2) usa su propia ilustración (`assets/img/paso-2.webp`, WebP sin pérdida de 800 px, 3 MB → 0,43 MB).

## 2026-10-21 · Del cultivo a la mesa: nuevo diseño con dos instancias por paso
- Figma pendiente · Código ✓ · Se rediseña según la nueva referencia de Felipe: título y paso actual en coral arriba a la izquierda, ilustración sobre círculo al centro, descripción abajo a la izquierda y línea de secuencia con flechas abajo a la derecha. Se deja de usar la textura de escamas (el archivo queda en assets/img).
- Figma pendiente · Código ✓ · Cada paso alterna solo entre ilustración + texto A y video en el círculo (por ahora el de Arka Fjord) + texto B. El cambio de paso es manual (flechas o tramos).

## 2026-10-21 · Catálogo con fondo propio; Del cultivo a la mesa más inmersivo
- Código ✓ · Nuestras marcas y la descarga del catálogo pasan a secciones separadas: marcas en blanco, catálogo en Offwhite. Del cultivo a la mesa pasa a fondo blanco.
- Código ✓ · Del cultivo a la mesa ocupa casi toda la pantalla en desktop (mín. 768 px o 92 % del alto de la ventana). Círculo más chico (62 % de su mitad en desktop, 46 % en tablet, 80 % en mobile) con los textos más angostos; más aire entre título, ilustración, descripción y línea de secuencia.

## 2026-10-21 · Del cultivo a la mesa: nueva composición
- Figma pendiente · Código ✓ · Nuevo relato vertical (`.chain[data-chain]`) según la referencia de Felipe: textura de escamas con círculo y título a la izquierda; a la derecha un paso a la vez con título, ilustración (ova, la misma en los seis por ahora) y descripción, línea de secuencia que avanza sola y flechas atrás/adelante. Reemplaza a la cadena de valor en lista en Productos (que queda en el kit). Patrón Firma en motion.md.
- Código ✓ · Textura e ilustración optimizadas a WebP: textura 1,7 MB → 0,5 MB; ova 2,2 MB → 0,35 MB (sin pérdida, con la transparencia limpia).

## 2026-10-21 · Soluciones: queda solo la órbita de puntos
- Código ✓ · Se elimina la opción 2 (círculo con video en hover) y su switch; queda la órbita de puntos. El switch compartido `.variant-switch` sigue en el catálogo.

## 2026-10-21 · Soluciones: opción 2 con video en el círculo y switch
- Figma pendiente · Código ✓ · La órbita de puntos queda como opción 1. Nueva opción 2: sin puntos; con hover, el círculo muestra un video (por ahora el de Latitude 45) y la ilustración desaparece. Switch discreto "Opción 1 · Opción 2" bajo la composición.
- Código ✓ · El switch pasa a ser un componente compartido (`.variant-switch`), que usan el catálogo y Soluciones.

## 2026-10-21 · Soluciones: órbita de puntos en lugar de las burbujas
- Figma pendiente · Código ✓ · Se reemplazan las burbujas (no convencieron) por 6 puntos Coral 500 sobre el borde del círculo que aparecen, recorren un tramo corto de la órbita y se desvanecen.

## 2026-10-21 · Soluciones: burbujas en lugar de la constelación
- Figma pendiente · Código ✓ · Se reemplaza la constelación de puntos (no convenció) por burbujas Coral 500 que suben dentro del círculo y se desvanecen. Se quita el desplazamiento con el mouse.

## 2026-10-21 · Soluciones: constelación de puntos
- Figma pendiente · Código ✓ · La composición de círculo e ilustración suma 7 puntos Coral 500 que flotan lento, acompañan al círculo cuando cambia de paso y se mueven levemente en contra del mouse (patrón Firma en motion.md).

## 2026-10-21 · Soluciones: composición más grande
- Código ✓ · La composición de ilustración y círculo ocupa todo el ancho de su columna (antes 80–90 %); en desktop su columna pasa a 6/11 y el texto a 5/11. La ilustración de Ahumado crece (de 78 % a 94 % del ancho del cuadro).

## 2026-10-21 · Soluciones: composición propia en cada paso
- Figma pendiente · Código ✓ · El círculo y la ilustración se ubican distinto en cada paso, según las referencias de Felipe (Fresco: círculo arriba a la izquierda y salmón grande abajo a la derecha; Congelado: círculo a la derecha y filetes abajo a la izquierda; Ahumado: casi centrado). La composición ocupa siempre el mismo cuadro y el círculo se desplaza con suavidad al cambiar de paso.

## 2026-10-21 · Ilustraciones de Congelado y Ahumado
- Código ✓ · Cada paso de Soluciones tiene su ilustración: salmón (Fresco), filetes con hielo (Congelado) y salmón ahumado con leña (Ahumado). Las nuevas se optimizaron a WebP sin pérdida de 800 px (el doble de su tamaño en pantalla), con la transparencia limpia: se quitó el resplandor casi invisible del original, que dibujaba un rectángulo tenue (~2,9 MB → ~450 KB). Se quita el giro por paso, que servía cuando las tres eran la misma imagen.

## 2026-10-21 · Soluciones en pasos (módulo 2 de Productos)
- Figma pendiente · Código ✓ · Nueva sección Soluciones después del hero: título y tres pasos (Fresco, Congelado, Ahumado) con descripción, e ilustración del salmón (`assets/img/pescado.png`) sobre el círculo Offwhite del catálogo. Componente `.steps[data-steps]`, patrón Firma en motion.md. Textos de ejemplo según la ficha del cliente (título 60, nombre 25 y texto 260 caracteres como máximo).

## 2026-10-21 · Borde curvo entre Mercados y Nuestras marcas (prueba)
- Figma pendiente · Código ✓ · Se reemplaza la mezcla de fondo (pasaba desapercibida) por un borde inferior curvo en Mercados que se aplana con el scroll (`.section--curve-bottom`, `[data-section-curve]`). Se elimina `[data-bg-blend]`.

## 2026-10-21 · Transición de fondo entre Mercados y Nuestras marcas (prueba)
- Figma pendiente · Código ✓ · En vez del corte recto entre el fondo Offwhite de Mercados y el blanco de Nuestras marcas, ambas secciones comparten un color que pasa de Offwhite a blanco con el scroll. Nuevo comportamiento `[data-bg-blend]` y patrón Firma en motion.md. Solo en ese corte, para probar.
- Código ✓ · `MX.isDarkAt` (layout.js) ahora entiende colores `color(srgb …)` que genera `color-mix`; antes el botón del asistente se veía blanco sobre la sección en transición.

## 2026-10-21 · Bajada del hero de Productos en blanco
- Código ✓ · Nueva variante `.hero__lead--inverse` (bajada en blanco pleno). Se usa en el hero de Productos; el resto de los heros mantiene la bajada en Navy 300.

## 2026-10-20 · Título de Nuestras marcas centrado
- Código ✓ · Nueva variante `.section-head--center` del encabezado de sección; se usa en Nuestras marcas para alinear el título con los dos círculos.

## 2026-10-20 · Marcas en círculos
- Figma pendiente · Código ✓ · Nuestras marcas pasan de celdas rectangulares separadas por líneas a círculos con contorno delgado. Con hover, el video de cada marca rellena el círculo desde el centro y el logo pasa a blanco.

## 2026-10-20 · Nuevo video del hero del home
- Código ✓ · Reemplazado por Video_Hero_4 (720p H.264 sin audio, 37 s, 47,3 MB → 4,5 MB). Comparte el primer segundo con el anterior, así que el poster no cambia.
- Código ✓ · El hero del home usa el nuevo video (Video_Hero_3: 720p H.264 sin audio, 38 s, 49,5 MB → 4,8 MB) y su poster. Mismo archivo `assets/video/hero.mp4` (también lo usa la página de prueba del hero).

## 2026-10-20 · Catálogo: imagen predeterminada y más grande
- Código ✓ · La vista "Imagen" pasa a ser la predeterminada del catálogo (el flipbook sigue disponible en el switch).
- Código ✓ · Composición de imagen y círculo más grande: ocupa la mitad del ancho desde tablet (antes 2/5 y 85 % de esa columna) y todo el ancho en mobile.

## 2026-10-20 · Video en el hover de las marcas
- Código ✓ · El hover de Latitude 45 y Arka Fjord muestra un video propio de cada marca en lugar de la foto de prueba. Los GIF entregados (88 MB y 111 MB) se convirtieron a MP4 en loop sin audio (0,4 MB y 0,5 MB). Se reproducen solo durante el hover y no se descargan hasta el primero (`video[data-hover-video]` en components.js).

## 2026-10-20 · Nuevo video del hero de Productos
- Código ✓ · El hero de Productos usa el nuevo video (Video_Productos_2: 720p H.264 sin audio, 17 s, 22 MB → 1,6 MB) y su poster. Mismo archivo `assets/video/productos.mp4`.

## 2026-10-20 · Títulos de sección más livianos y switch del catálogo
- Figma pendiente · Código ✓ · Título 2 (títulos de sección) pasa de Sora 400 a Sora 300 (`--text-h2-weight`). Aplica a todo el sitio.
- Código ✓ · Se quita la etiqueta "Catálogo Multi X": ninguna sección lleva etiqueta sobre el título.
- Código ✓ · Catálogo con dos vistas, flipbook o imagen con círculo, alternables con un switch discreto ("Flipbook · Imagen") para mostrar ambas opciones. Nuevo comportamiento `[data-variant-switch]` en components.js.

## 2026-10-20 · Catálogo con flipbook incrustado
- Código ✓ · La composición de imagen + círculo se reemplaza por el flipbook del catálogo (iframe de Heyzine), sin borde (sin cajas). En desktop el flipbook ocupa 7/12 y el texto 5/12; en tablet y mobile va debajo del texto a ancho completo.
- Código ✓ · El cursor personalizado se oculta sobre iframes (dentro del flipbook se ve el cursor nativo).

## 2026-10-20 · Catálogo: círculo más claro, centrado y que crece con el scroll
- Código ✓ · El círculo pasa de Coral 100 a Offwhite (Neutral 50, `--color-bg-subtle`), el crema más claro de la paleta, y queda centrado con la imagen del catálogo.
- Figma pendiente · Código ✓ · El círculo crece a medida que se hace scroll (de 0,6 a 1,1). Nuevo comportamiento `[data-scroll-grow]` en components.js.

## 2026-10-20 · Catálogo con imagen, círculo y entrada animada
- Figma pendiente · Código ✓ · Descarga del catálogo con la imagen del catálogo (`assets/img/catalogo.png`) sobre un círculo Coral 100 (`--color-bg-illustration`). En mobile también se muestra, debajo del texto.
- Figma pendiente · Código ✓ · Entrada animada del bloque: textos en secuencia, círculo que crece y catálogo que entra con un leve giro. Nuevo patrón Firma en motion.md.
- Código ✓ · Más margen alrededor del catálogo: 160 px sobre él y 64 px bajo él en desktop (96 / 32 en mobile).

## 2026-10-20 · Marcas con logos y hover, cifra destacada y sin etiquetas
- Figma pendiente · Código ✓ · Nuestras marcas con los logos oficiales (Latitude 45 y Arka Fjord, recortados y en versión blanca generada a partir del original). Hover con foto de fondo y logo en blanco: nuevo patrón Firma en motion.md.
- Figma pendiente · Código ✓ · Nueva variante "Cifra destacada" (`--text-figure-strong-weight`: 600, `.t-figure-strong`), usada en la cifra de Mercados.
- Código ✓ · Se quitan las etiquetas sobre los títulos de sección y del hero en Productos (el título basta). Quedan las etiquetas dentro de los componentes (catálogo, oficinas comerciales, contacto).
- Código ✓ · Más aire entre las marcas y la descarga del catálogo (80 px en mobile, 128 px en desktop).

## 2026-10-20 · Sin cajas en Productos
- Figma pendiente · Código ✓ · Principio nuevo (pedido del cliente): sin bloques con borde, fondo de color o sombra; separaciones con líneas delgadas y espaciado. Registrado en CLAUDE.md §3 y en ui-kit.md.
- Código ✓ · Nuestras marcas: columnas abiertas separadas por líneas (antes tarjetas con borde). Mobile: apiladas, sin slider.
- Código ✓ · Catálogo: fila abierta con fondo blanco y botón principal (antes bloque Navy 950 con botón Acento).
- Código ✓ · Certificaciones: celdas con una línea arriba y el espacio del logo sin relleno (antes tarjetas con borde).
- Código ✓ · `<ir-contact>`: sin caja, con línea arriba (deja de usar `.card`; también cambia en Inversionistas).
- Pendiente · Revisar con Felipe los demás componentes del kit que siguen siendo cajas (ver ui-kit.md).

## 2026-10-20 · Display destacado y contador en todas las cifras
- Figma pendiente · Código ✓ · Nuevo estilo "Display destacado": Display con la primera parte en Sora 200 (Extra Light) y la segunda en Sora 600 (Semibold), cada una en su línea. Tokens nuevos `--text-display-light-weight` y `--text-display-strong-weight`. Se usa en el hero de Productos ("Your salmon" / "solution partner") y en la frase del home, que deja de ser prueba.
- Código ✓ · Sora 200 y 600 se cargan en todas las páginas. CLAUDE.md 2.6 actualizado por decisión de Felipe (antes solo 300 y 400).
- Código ✓ · Regla: toda cifra o métrica destacada cuenta hasta su valor al entrar en pantalla (`data-count`). Se aplica a la cifra de Mercados en Productos.

## 2026-10-20 · Mercados: título a la derecha y globo más liviano
- Figma pendiente · Código ✓ · El título de "Mercado y oficinas comerciales" pasa a la columna derecha, junto con la cifra, las regiones y las oficinas. El globo queda a la izquierda.
- Figma pendiente · Código ✓ · Globo más chico (80 % de su columna en desktop, 60 % en tablet, 90 % en mobile) y sin fondo blanco: la esfera toma el color de su sección y solo conserva el contorno.

## 2026-10-20 · Botón comercial en el hero de Productos
- Figma pendiente · Código ✓ · Hero de Productos con los textos a la izquierda y "Contactar al equipo comercial" a la derecha, dentro del ancho de contenido (`.hero__content--split`). En mobile, el botón va debajo.
- Figma pendiente · Código ✓ · `<sales-contact variant="inline">`: el botón va en la página y el formulario se abre como modal centrado (panel inferior en mobile) sobre el sitio oscurecido. Productos deja de usar el botón flotante.

## 2026-10-20 · Productos: video, globo, catálogo aparte y 8 certificaciones
- Código ✓ · Hero de Productos con video de fondo (`assets/video/productos.mp4`, 720p H.264 sin audio, 69 MB → 6,2 MB) y poster.
- Código ✓ · Se quita la sección Soluciones de Productos por ahora (el componente sigue en el kit).
- Figma pendiente · Código ✓ · Nuevo globo de mercados interactivo (`[data-globe]`) en lugar del mapa: continentes en puntos, pines de oficinas y mercados. Nuevo patrón Firma en motion.md.
- Figma pendiente · Código ✓ · Nuestras marcas: solo Latitude 45 y Arka Fjord. El catálogo pasa a un bloque propio (`.catalog-cta`).
- Figma pendiente · Código ✓ · Certificaciones en grilla de 8 (`.cert-grid`), con espacio de logo y descripción desplegable.
- Código ✓ · Contacto con una sola persona.

## 2026-10-20 · Accesos principales a la derecha
- Figma pendiente · Código ✓ · En desktop, Productos · Sustentabilidad · Inversionistas dejan de ir centrados y pasan a la derecha, junto al botón hamburguesa. Mobile y tablet sin cambios.

## 2026-10-20 · Página Productos y home base
- Código ✓ · Nuevas páginas en la raíz: `index.html` (home base con el hero de video y la frase en prueba; bloques por definir) y `productos.html`. Productos (header y menú) enlaza a `productos.html` y el logo vuelve a `index.html`. Los enlaces internos se resuelven desde la raíz (helper `url()` en layout.js), así funcionan también desde `pruebas/`.
- Figma pendiente · Código ✓ · Componentes nuevos de página: encabezado de sección, hero de página, tarjetas de solución, mercados y oficinas, cadena de valor.
- Figma pendiente · Código ✓ · Nuevo componente transversal `<sales-contact>`: botón flotante "Contactar al equipo comercial" abajo a la izquierda que abre el formulario comercial. Vuelve la variante `.btn--speech` (Coral 400 con texto Ink 900). Nuevo campo de texto largo `.control--textarea`.
- Código ✓ · La bajada del hero ocupa todo el ancho en mobile (antes 60 %, quedaba muy angosta).

## 2026-10-20 · Footer: títulos alineados y banderas
- Código ✓ · El logo del footer pasa a su propia fila: "Direcciones", "Información" y "Personas y proveedores" quedan a la misma altura en desktop. En tablet, direcciones arriba y enlaces debajo.
- Código ✓ · El título "Direcciones y teléfonos" pasa a "Direcciones". Cada oficina lleva la bandera de su país (SVG con forma de emoji en `assets/flags/cl.svg` y `us.svg`: Windows no dibuja los emojis de bandera y mostraría "CL" / "US"). Los teléfonos no se cortan.

## 2026-10-20 · Datos reales del footer y redes sociales
- Código ✓ · Footer con las direcciones y teléfonos reales: Puerto Montt (Cardonal 2501, Región de Los Lagos · +56 65 2483 700), Santiago (Isidora Goyenechea 3621, Piso 17, Las Condes · +56 2 2430 1200) y Miami (703 Waterford Way Suite 510, FL 33126 · +1 305 647 2590). Desde tablet, en dos columnas.
- Figma pendiente · Código ✓ · Redes sociales: LinkedIn, X, Facebook e Instagram (se quita YouTube). Íconos de X y Facebook nuevos, en el estilo de línea del kit. Aplica al footer y al menú.

## 2026-10-20 · Logo y X blancos con el menú abierto
- Código ✓ · Con el menú abierto, el logo y la X quedan siempre en blanco (también fuera del hero), sobre el fondo oscurecido.

## 2026-10-20 · Header con el menú abierto
- Código ✓ · Con el menú abierto, el header se desvanece y solo quedan el logo y la X de cerrar: blancos sobre el hero y Navy 900 fuera de él (antes el header quedaba blanco y completo).

## 2026-10-20 · Sin botón comercial; asistente en outline
- Código ✓ · Se elimina el botón "Contactar al equipo comercial" del hero y la variante `.btn--speech`.
- Código ✓ · Botón del asistente: contenedor outline (sin relleno) e ícono de chat relleno, navy sobre claro y blanco sobre oscuro.

## 2026-10-20 · Botón del asistente y botón comercial del hero
- Figma pendiente · Código ✓ · Nuevo componente transversal `<chat-launcher>`: botón flotante del asistente, fijo abajo a la derecha en todo el sitio (se agrega solo desde layout.js). Navy 900 sobre fondos claros y blanco sobre oscuros. No abre nada por ahora. Ícono de chat nuevo, en el estilo del kit.
- Figma pendiente · Código ✓ · Nueva variante de botón `.btn--speech` (Acento con forma de diálogo, esquina inferior izquierda recta) para "Contactar al equipo comercial", abajo a la izquierda del hero. Usa Coral 400 con texto Ink 900 (la regla prohíbe texto blanco sobre coral).
- Código ✓ · La detección de fondo oscuro pasa a un helper compartido (`MX.isDarkAt` en layout.js) que usan el cursor y el botón del asistente.

## 2026-10-20 · El ícono de buscar abre el menú
- Código ✓ · El ícono de buscar de la barra utilitaria (desktop) y del header (mobile y tablet) pasa a ser un botón que abre el menú hamburguesa con el foco en su buscador. Si el menú ya está abierto, solo enfoca el buscador.

## 2026-10-20 · Etiquetas del menú
- Figma pendiente · Código ✓ · Nuevo primitivo `--color-ink-500` (#66787F) y semántico `--color-text-tertiary` (4,6:1 sobre blanco, pasa AA). Se usa en las etiquetas "Portales" y "Recursos" del menú, más claras que los enlaces.
- Código ✓ · **Excepción a la regla del coral (CLAUDE.md 4), aprobada por Felipe:** las etiquetas "La compañía" y "Negocio" del menú usan Coral 500 sobre blanco (3,1:1, no cumple AA para texto chico).

## 2026-10-20 · Secundarios del menú como la barra utilitaria
- Código ✓ · Portales y Recursos del panel pasan de UI/Navegación (14 px) a UI/Pequeño destacado (13 px, semibold), el mismo estilo de la barra utilitaria.

## 2026-10-20 · Noticia destacada: solo título
- Código ✓ · La tarjeta de noticia destacada muestra solo el título (sin bajada), con un máximo de 2 líneas y puntos suspensivos si no cabe. El título completo queda como tooltip.

## 2026-10-20 · Noticia destacada real en el menú
- Código ✓ · La tarjeta del menú usa una noticia real de ejemplo: "Multi X informa término de contingencia en centros Taraba 7 y 8, en la Región de Magallanes" (octubre de 2026), con su bajada e imagen (`assets/img/noticia-destacada.jpg`, JPG optimizado de 104 KB desde el PNG de 854 KB).
- Código ✓ · Con el título real el texto no cabía sobre la foto en 224 px: la tarjeta pasa a foto arriba y texto debajo sobre Navy 950, con alto según contenido (≈ 348 px en desktop). El título usa UI/Destacado y la bajada se limita a 2 líneas.

## 2026-10-20 · Cursor: blanco sobre oscuro y anillo que crece
- Código ✓ · El cursor es blanco sobre fondos oscuros y Navy 900 sobre claros (se deja la fusión "diferencia", que en el video daba tonos intermedios). Detecta el fondo visible bajo el puntero, incluso sobre el header fijo y al hacer scroll.
- Código ✓ · En hover sobre clickeables, además de desaparecer el punto, el anillo se agranda ×1,5.
- Código ✓ · El fondo del header (`.header__bg`) recibe el puntero para que el cursor lo detecte.

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
