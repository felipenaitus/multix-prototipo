# Changelog del UI kit

Registro de cambios del kit (tokens, estilos de texto y componentes). Cada entrada indica qué cambió, por qué y si ya está reflejado en Figma y en el código.

Formato: `AAAA-MM-DD · [Figma ✓/pendiente] [Código ✓/pendiente] · descripción`

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
