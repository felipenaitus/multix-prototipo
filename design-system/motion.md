# Movimiento: animaciones y transiciones

Criterio transversal del sitio. Se basa en las animaciones del prototipo de venta (aprobado por el cliente), ahora llevadas a tokens.
Objetivo: dar interactividad y modernidad **sin saturar**. El movimiento acompaña el contenido; nunca lo retrasa ni compite con él.

## Principios
1. **Todo valor de tiempo sale de tokens** (`--duration-*`, `--easing-*`, `--motion-reveal-distance`). Nada de `.3s` sueltos.
2. **Solo se animan `opacity` y `transform`** (y color/borde en estados). No animar `width`, `height`, `top` ni márgenes: es más pesado y produce saltos.
3. **Una animación protagonista por vista.** Si una sección ya tiene un efecto de scroll (telón, sticky, scrubbing), el resto de la sección usa solo entradas simples.
4. **El contenido nunca depende de la animación.** Si el JS falla o el usuario reduce el movimiento, todo se ve en su estado final.
5. **`prefers-reduced-motion`:** los tokens de duración pasan a 0; los efectos de scroll se reemplazan por la composición final estática; los videos de scrubbing, por una imagen.
6. **Mobile más liviano:** los efectos pineados y de scrubbing se simplifican (ver tabla). El cursor ripple no existe en táctil.

## Tokens
| Token | Valor | Uso |
|---|---|---|
| `--duration-fast` | 200ms | Hover, foco, cambios de color y borde |
| `--duration-base` | 250ms | Acordeones, tabs, chips, flechas que se desplazan |
| `--duration-slow` | 350ms | Menú overlay, mega menú, paneles de filtros, compactación del header |
| `--duration-reveal` | 800ms | Entrada de bloques al aparecer en pantalla |
| `--duration-counter` | 1100ms | Contadores de cifras (curva ease-out cúbica en JS) |
| `--duration-stagger` | 100ms | Desfase entre elementos que entran en secuencia (máx. 3 pasos) |
| `--motion-reveal-distance` | 28px | Desplazamiento vertical de la entrada |
| `--easing-standard` | cubic-bezier(.22,.61,.36,1) | Por defecto |
| `--easing-out` | cubic-bezier(.16,1,.3,1) | Entradas y paneles que aparecen |

## Catálogo de patrones
Estado: **Base** = se aplica en todo el sitio sin preguntar. **Firma** = efecto aprobado en el prototipo de venta; se usa solo en las secciones indicadas o donde Felipe lo pida.

### Base
| Patrón | Comportamiento | Mobile |
|---|---|---|
| Estados de interacción | Color, fondo y borde con `--duration-fast`. Flecha de enlaces terciarios se desplaza 4px a la derecha con `--duration-base`. | Igual (al tocar) |
| Entrada en viewport (`.reveal`) | Fade + subida de `--motion-reveal-distance` con `--duration-reveal`. Se activa con IntersectionObserver (threshold 0.2, rootMargin inferior −40px) y ocurre una sola vez. Elementos hermanos con desfase de `--duration-stagger` (hasta 3). | Igual, distancia reducida a la mitad |
| Entrada reversible (`.reveal-rev`) | Igual, pero se esconde al volver hacia arriba. Solo para accesos destacados de la home. | Se usa `.reveal` simple |
| Entrada del hero | Título y bajada con fade + subida al cargar; desfases de 100 y 350ms. | Igual |
| Contadores | Toda cifra o métrica destacada del sitio (cifras "en una mirada", metas, la cifra de Mercados, etc.) cuenta desde 0 al entrar en viewport, con `--duration-counter` y `data-count`. No aplica a fechas, años ni al precio de la acción. Formato chileno (punto de miles, coma decimal). | Igual |
| Acordeones y desplegables | Rotación del ícono + aparición del contenido con `--duration-base`. | Igual |
| Header al hacer scroll | Transparente sobre el hero; al bajar pasa a fondo blanco (siempre, sin importar el fondo del contenido), la barra utilitaria sale y la fila principal se compacta con el logo reducido, con `--duration-slow`. | Se oculta al bajar y aparece al subir |
| Menú hamburguesa / overlay | Overlay a pantalla completa con fade + leve desplazamiento, `--duration-slow`. El mismo botón cierra; también Escape y tocar fuera. | Igual |
| Menú hamburguesa (panel) | Panel flotante con fade + leve desplazamiento, `--duration-slow`; accesos con desfase de `--duration-stagger`. La tarjeta de noticia destacada es fija. Al abrir, el header se desvanece (`--duration-slow`) y quedan solo el logo y la X. | Pantalla completa |

### Firma (usar solo donde se indica)
| Patrón | Comportamiento | Dónde | Mobile |
|---|---|---|---|
| Ondas del hero | Tres capas de ondas SVG en movimiento continuo a distintas velocidades (22s, 14s, 9s) en el borde inferior del hero. | Hero de la home | Solo la capa frontal |
| Telón de salida del hero | El hero queda fijo mientras un panel con borde superior curvo sube y lo tapa; el contenido siguiente aparece antes de que el telón termine (sin zona en blanco). | Transición hero → primera sección de la home | Desactivado: corte normal |
| Sección pineada con cifras | El círculo y las cifras quedan fijos mientras se hace scroll; el círculo crece y las cifras entran de derecha a izquierda, cada una con su contador. | Composición "Desde el sur de Chile" | Sin pineado: entrada simple + contadores |
| Scroll-scrubbing | Secuencia de frames controlada por el scroll (tipo Apple). | Sustentabilidad (una por página como máximo) | Imagen fija o video corto en loop sin control por scroll |
| Parallax del círculo | El círculo detrás del video o la ilustración se desplaza levemente con el scroll; el contenido no se mueve. | Productos y composiciones con ilustración | Desactivado |
| Cursor punto + anillo | Un punto con un anillo fino alrededor reemplaza al cursor: blanco sobre fondos oscuros, Navy 900 sobre claros. Al pasar por elementos clickeables el punto se desvanece (`--duration-fast`) y el anillo se agranda ×1,5 (`--duration-base`). Sin onda. | Todo el sitio, solo con mouse | No existe |

## Agregar un patrón nuevo
Si una sección necesita un movimiento que no está en este catálogo: proponerlo a Felipe (qué hace, dónde, versión mobile y versión con movimiento reducido) y, si lo aprueba, agregarlo aquí antes de implementarlo.

## Firma · Globo de mercados (solo Productos › Mercado y oficinas comerciales)
- Giro continuo muy lento (aprox. una vuelta cada 80 s) solo mientras el globo está a la vista (IntersectionObserver); se detiene con el mouse encima o con un pin seleccionado.
- Arrastrar gira el globo. Con foco o clic en un pin, el globo gira hasta centrarlo (3 × `--duration-slow`, salida suave) y muestra su nombre (`--duration-fast`).
- Con `prefers-reduced-motion`: sin giro automático y el centrado es instantáneo.

## Firma · Hover de marcas (solo Productos › Nuestras marcas)
- Con hover o foco en una marca, el video de esa marca rellena el círculo desde el centro (clip-path de 0 % a 50 %, `--duration-reveal`), se acerca levemente (escala 1,1 → 1) y se reproduce en loop mientras dura el hover; el contorno desaparece; el logo en color cambia al logo en blanco y "Ir al sitio" pasa a blanco (`--duration-slow`).
- Con movimiento reducido el cambio es instantáneo (las duraciones quedan en 0) y el video no se reproduce: queda su primer cuadro.

## Firma · Entrada del catálogo (solo Productos › Descarga del catálogo)
- Al entrar en pantalla (IntersectionObserver de `.reveal`): etiqueta, título, bajada y botón aparecen en secuencia (`--duration-reveal`, desfase `--duration-stagger`) y al final el flipbook. Solo opacidad y transform; con movimiento reducido todo aparece en su lugar.
- En la vista "Imagen", el círculo crece con el scroll (escala de 0,6 a 1,1, `[data-scroll-grow]`) y la imagen entra desde abajo a la izquierda con un giro de −4° a 0°.

## Firma · Borde curvo entre secciones (en prueba: Productos › Mercados → Nuestras marcas)
- En lugar de un corte recto, la sección Offwhite termina en un arco suave que se monta sobre la blanca. El arco se ve completo hasta que su borde inferior llega al 75 % de la ventana y se aplana mientras sube hasta el 25 % (escala vertical de 1 a 0). Va directo al scroll, sin transición propia.
- `[data-section-curve]` escribe `--curve-progress` (0 a 1). Con movimiento reducido el arco queda fijo.
- Descartada antes: la mezcla de fondo de Offwhite a blanco (el contraste entre ambos colores es casi imperceptible).

## Firma · Soluciones en pasos (solo Productos › Soluciones)
- Los pasos avanzan solos cada 8 × `--duration-reveal` (6,4 s) mientras la sección está a la vista; una línea Coral 500 sobre el paso activo se llena en ese tiempo.
- Al cambiar de paso: la descripción aparece con `fade-up` (`--duration-slow`) y la ilustración del paso entra con un fundido y un leve desplazamiento hacia arriba en `--duration-reveal`.
- Se pausan con el mouse o el foco dentro de la sección y se detienen del todo cuando la persona elige un paso. Con movimiento reducido no avanzan solos.
