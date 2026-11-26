# Traspaso · Prototipo Multi X

Guía para seguir el trabajo del prototipo mientras Felipe está fuera (2 semanas, desde el 26-11-2026).
Está pensada para abrirse en Claude Code junto al repositorio: Claude la lee y sabe cómo seguir.

---

## 1. Qué es esto

Prototipo de alta fidelidad del rediseño de multi-xsalmon.com (Multi X, salmonera chilena), hecho por Naitus.
HTML, CSS y JavaScript vanilla, sin frameworks ni paso de build. 23 páginas + el UI kit.

- **Repositorio:** https://github.com/felipenaitus/multix-prototipo (rama `main`)
- **Publicado (GitHub Pages):** https://felipenaitus.github.io/multix-prototipo/
- **UI kit en el navegador:** `kit.html` (local: http://localhost:8000/kit.html)
- **Figma (fuente de verdad):** Rediseño 2026 › UI Kit › Propuesta A — Corporativo liviano
  https://www.figma.com/design/e7bTcjX8aUFftdqckOYyPZ/Redise%C3%B1o-2026?node-id=75-2

## 2. Cómo empezar (primer día)

1. Copia la carpeta `Prototipo` que te pasó Felipe a tu equipo (por ejemplo, al escritorio) y ábrela en Claude Code. Es el proyecto completo, con su historial de git, así que puedes hacer commits y revertir cambios desde ahí (o con GitHub Desktop: *Add existing repository*).
2. Para **publicar** en GitHub Pages necesitas acceso de escritura al repositorio `felipenaitus/multix-prototipo` (pídelo a Felipe). Sin ese acceso puedes trabajar igual en local; los cambios se suben cuando Felipe vuelva.
3. Necesitas **Node.js** instalado: el servidor local usa `npx http-server` (definido en `.claude/launch.json`, nombre `prototipo`, puerto 8000).
4. En Claude Code, pide "reactiva el local" o "levanta el prototipo": Claude abre el servidor y la vista previa en http://localhost:8000.
5. Conecta el **conector de Figma** en Claude Code (con `/mcp`) para poder leer las secciones del kit en Figma. Sin él, Claude trabaja solo con el código y las fichas de `design-system/`.

## 3. Reglas de trabajo (lo más importante)

Las reglas completas están en **`CLAUDE.md`** (Claude las carga solo). Resumen:

- **Quién decide:** el diseñador a cargo dirige las decisiones de diseño y producto; Claude ejecuta, propone cuando se le pide y no decide por su cuenta. Donde `CLAUDE.md` dice "Felipe", mientras dure el traspaso léase "el diseñador a cargo".
- **Tokens:** ningún color, tamaño, espaciado, radio ni duración fuera de `css/tokens.css`. En componentes, solo tokens semánticos. Un token nuevo se aprueba antes y se anota en el changelog como pendiente de Figma.
- **UI kit primero:** todo componente o variante nueva va antes a `kit.html` y `design-system/ui-kit.md`.
- **Header, footer y bloques repetidos:** Web Components en `js/layout.js` (una sola definición).
- **Alcance:** no tocar nada fuera de lo pedido. Si hace falta, Claude pregunta antes.
- **Desktop y mobile en la misma tarea.** Breakpoints 768 y 1024. Patrones de mobile en `design-system/responsive.md`.
- **Sin cajas** (pedido del cliente): separar con líneas delgadas y aire, no con bordes, fondos o sombras.
- **Textos siempre a la izquierda** (títulos y bajadas). No queda ninguna excepción centrada.
- **Verificar antes de cerrar:** capturas en 375, 768, 1024, 1280 y 1440 px, sin scroll horizontal ni textos cortados.
- **Documentar cada cambio** en `design-system/changelog.md` (y en `ui-kit.md`, `responsive.md` o `motion.md` si aplica).

### Git
- **Un commit por cambio**, mensaje en español que diga qué se hizo, terminado en la línea de coautoría de Claude.
- **Commits locales, sin push**, hasta que el diseñador a cargo diga que la versión está lista. Ahí se hace `git push origin main` y GitHub Pages publica solo (1–2 minutos; recargar con Ctrl + F5).
- Los cambios se revisan y revierten desde GitHub Desktop. Para deshacer algo ya commiteado, mejor `git revert` (queda en el historial) que borrar commits.

## 4. Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Reglas para Claude | `CLAUDE.md` |
| Tokens (única fuente de valores) | `css/tokens.css` |
| Estilos base / componentes | `css/base.css`, `css/components.css` |
| Estilos del kit / pruebas del hero del inicio | `css/kit.css`, `css/pruebas.css` |
| Header, footer, contacto IR, oficinas, módulo comercial, íconos | `js/layout.js` |
| Comportamientos (pestañas, sliders, globo, recorridos, buscador…) | `js/components.js` |
| Datos: noticias, buscador, preguntas frecuentes, ofertas | `js/noticias.js`, `js/busqueda.js`, `js/faqs.js`, `js/ofertas.js` |
| Inventario de componentes y reglas de uso | `design-system/ui-kit.md` |
| Adaptación a mobile | `design-system/responsive.md` |
| Animaciones permitidas | `design-system/motion.md` |
| Historial de cambios (lo último arriba) | `design-system/changelog.md` |
| Comando para sincronizar con Figma | `/sync-ui-kit` (`.claude/commands/sync-ui-kit.md`) |

## 5. Decisiones recientes que hay que respetar (20 al 23 de noviembre)

Detalle completo en `design-system/changelog.md`. Lo principal:

- **Coral 600 retirado del kit.** El acento de texto sobre claro (etiquetas, badges) es Navy 600. El coral corporativo (Coral 500, #FF5959) queda para cifras, líneas, barras, hover y fondos oscuros.
- **Excepciones de contraste aprobadas** (coral como texto): las cifras destacadas (incluidas las de Mercados en Productos, también sobre crema), el año del acordeón de documentos y el hover del botón terciario (texto, subrayado y flecha en Coral 500).
- **Botón de acento sobre fondos oscuros, foto o video:** blanco con texto Navy 900; hover Navy 100.
- **Fotos y videos:** ya no van en círculos. Son rectángulos 16:9 con bordes `--radius-xl` (home, compañía integrada, soluciones, marcas, relato); en la integración vertical (recorrido) van en vertical 4:5. Los pasos inactivos llevan un tinte azul suave, no blanco y negro.
- **Tipografía:** Título 2 en Sora 400 y Título 3 en Sora 500 (se carga Sora 500 en todas las páginas). Pestaña activa del sub-menú de Inversionistas en Manrope 700 e inactivas en gris claro.
- **Cifras:** solo líneas horizontales, sin divisores verticales.
- **Nuestras marcas (Productos):** el video se ve siempre (sin estado previo), sin contorno, título a la izquierda y más aire arriba y abajo (`.section--spacious`).
- **GLOBALG.A.P.** ya no va (eliminada de Productos, Sustentabilidad y preguntas frecuentes).
- **Home › Productos:** mano tipo cursor en lugar del play; "Ver productos" fuera del video, como botón terciario.
- **Productos › Mercados:** botón "Contacto" a la derecha de las oficinas, lleva a `contacto.html#oficinas`.
- Se probó y **se revirtió** el cambio de tamaños del año y del hito en Nuestra historia (Nosotros): quedó como estaba.

## 6. Pendientes y temas abiertos

**Para llevar a Figma** (hechos en código, marcados "pendiente de Figma" en `tokens.css` y en el changelog): tokens de color nuevos (botón de acento sobre oscuro, acento Navy 600, cifras en coral sobre crema, grises Ink 400/500, verde y rojo de variación), pesos de Título 2 y 3, cifras, pestaña activa, `--icon-xl`, el ícono de mano `i-hand` y los íconos dibujados a mano. Usar `/sync-ui-kit` cuando el Figma esté al día.

**Material:**
- La foto recortada del home (`assets/img/home-productos.webp`) viene de un archivo de 514 px de ancho y se ve blanda en pantallas retina: pedir la misma composición al doble (≈ 1200 px).
- Fotos definitivas: se le pasó a la diseñadora del cliente esta especificación (JPG 80–90 %, sRGB, sin texto encima, sujeto al centro):
  - horizontal 3:2, mínimo 2400 × 1600;
  - cuadrada 1:1, mínimo 1600 × 1600;
  - retrato 4:5, mínimo 1200 × 1500.
  - Los videos de los heros van aparte.
- Contenidos marcados `[contenido por definir]` y fotos `[foto por definir]` siguen en espera del cliente. De las 54 noticias, solo las 9 más recientes tienen foto real.

**Detalles vistos y no resueltos (decidir si se hacen):**
- Nuestras marcas no tiene muestra en `kit.html`.
- El comportamiento "video solo en hover" (`data-hover-video` en `js/components.js`) ya no lo usa ninguna página.
- El círculo detrás de la imagen del catálogo sigue redondo (no tiene foto adentro).
- Las cifras de Mercados, desde tablet, quedaron sin ninguna línea (se podría agregar una arriba y otra abajo).
- En Productos solo aparecen las oficinas de Puerto Montt y Miami; Contacto también muestra Santiago.

**En prueba** (pueden cambiar): sección oscura `.section--inverse`, transiciones Apertura y Horizonte entre secciones, la frase que cambia en el hero del inicio (`css/pruebas.css`).

## 7. Cómo pedirle cosas a Claude

- Una captura con el componente y una frase basta ("en productos, que este título quede a la izquierda"). Claude ubica el componente, lo cambia en todas las páginas que lo usan, verifica en los 5 anchos, anota en el changelog y hace un commit local.
- Si el pedido choca con una regla (por ejemplo, contraste AA o "sin coral sobre crema"), Claude avisa y pregunta antes. Si se aprueba, queda anotado como excepción.
- "Retrocede" o "déjalo como antes": Claude revierte el último cambio con un commit de reversión.
- "Publica en GitHub": Claude hace push a `main` y GitHub Pages actualiza el sitio.

## 8. Verificación con capturas

Claude toma las capturas con Playwright (`playwright-core` con el Chrome instalado), desde una carpeta temporal fuera del repo; no hay nada que instalar en el proyecto. Si en otro equipo no tiene Chrome en `C:/Program Files/Google/Chrome/Application/chrome.exe`, puede usar el navegador de la vista previa de Claude Code o instalar Chrome.
