/* ==========================================================================
   Noticias · datos del prototipo (un solo lugar para el listado y el detalle)
   Títulos y fechas reales del sitio actual (multi-xsalmon.com/noticias,
   noviembre 2026), de la más reciente a la más antigua. Fotos reales solo de
   las 9 primeras (assets/img/noticias/); el resto: [foto por definir]. El
   cuerpo solo es real (resumido) en la primera; las demás muestran
   [contenido por definir]. Lo usan noticias.html y noticia.html
   (js/components.js: initNews).
   ========================================================================== */
window.MX_NEWS = {
  perPage: 9,
  // id, título, fecha (año-mes), foto ('' = por definir)
  list: [
    ['cooperativa-osorno', 'Del campo al salmón: la Cooperativa Agrícola de Granos de Osorno conoció la cadena de valor de Multi X', '2026-11', 'assets/img/noticias/cooperativa-osorno.jpg'],
    ['mater-filius', 'Badinotti y Multi X entregan aporte a Fundación Mater Filius para apoyar sus actividades en el sur de Chile', '2026-11', 'assets/img/noticias/mater-filius.jpg'],
    ['equidad-genero', 'Multi X suma 11 mujeres en cargos de jefatura en 2026 y acelera su agenda de equidad de género', '2026-11', 'assets/img/noticias/equidad-genero.jpg'],
    ['taraba', 'Multi X informa término de contingencia en centros Taraba 7 y 8, en la Región de Magallanes', '2026-10', 'assets/img/noticias/taraba.jpg'],
    ['biomar-agricultura', 'Multi X y BioMar lanzan el primer piloto de agricultura regenerativa para la cadena de valor salmonera en Chile', '2026-09', 'assets/img/noticias/biomar-agricultura.jpg'],
    ['red-pyme-aysen-2026', 'Multi X y el Centro de Negocios Sercotec Puerto Aysén lanzan segunda versión de Red Pyme Aysén', '2026-09', 'assets/img/noticias/red-pyme-aysen.jpg'],
    ['buceo-seguro', 'Buceo seguro en la salmonicultura: Seremi de Salud de Aysén visitó operaciones de Multi X', '2026-09', 'assets/img/noticias/buceo-seguro.jpg'],
    ['accidentabilidad', 'Multi X reduce 78% su accidentabilidad y cumple tres años sin accidentes graves ni fatales', '2026-09', 'assets/img/noticias/accidentabilidad.jpg'],
    ['packaging', 'Multi X, CMPC y SalmonChile celebran exitoso concurso internacional de packaging innovador para el salmón', '2026-01', 'assets/img/noticias/packaging.png'],
    ['liderazgo-femenino', '39 profesionales de alto desempeño finalizan con éxito el programa de liderazgo femenino en Multi X', '2025-12', ''],
    ['proyecto-humboldt', 'Multi-X celebra hito de Proyecto Humboldt y consolida su oficina de proyectos corporativos', '2025-11', ''],
    ['capital-markets-day-2025', 'Multi X realiza cuarto Capital Markets Day con ejecutivos del mercado financiero', '2025-11', ''],
    ['red-pyme-aysen-2025', '30 proveedores de la región se certifican gracias a programa Red Pyme Aysén de Sercotec y Multi X', '2025-10', ''],
    ['micelio-2025', 'Con más de 240 estudiantes de Los Lagos en dos años: Multi-X cierra segundo ciclo de visitas del proyecto Micelio', '2025-10', ''],
    ['cross-check', 'Multi X celebra la Segunda Cumbre Anual del Modelo de Seguridad Cross Check', '2025-09', ''],
    ['pitch-day-2025', 'Multi X realiza su tercer Pitch Day como parte de su programa de innovación Multi Xplora', '2025-08', ''],
    ['patentes', 'Multi X obtiene dos innovadoras patentes que potencian la eficiencia en operaciones de agua de mar', '2025-06', ''],
    ['estrategia-sostenibilidad', 'Multi X presenta renovada estrategia de Sostenibilidad', '2025-06', ''],
    ['seafood-barcelona', 'Multi X cierra con éxito participación en Seafood Expo Barcelona', '2025-05', ''],
    ['blue-week', 'Multi X refuerza su compromiso con la innovación y sostenibilidad en Blue Week 2025', '2025-05', ''],
    ['uss-puerto-montt', 'Multi X participa en inauguración de año académico de Facultad de Economía, Negocios y Gobierno en USS Puerto Montt', '2025-04', ''],
    ['finalista-barcelona', 'Multi X finalista en los Seafood Excellence Awards Barcelona 2025', '2025-04', ''],
    ['micelio-estudiantes', 'Multi X junto a Proyecto Micelio acercan la industria del salmón a estudiantes de la región', '2025-04', ''],
    ['oficina-proyectos', 'Multi X presenta su nueva Oficina de Proyectos Corporativos', '2025-04', ''],
    ['finalistas-seafood-2025', 'Multi X entre los finalistas a los premios Seafood Excellence Awards 2025', '2025-03', ''],
    ['coller-fairr-2024', 'Multi X logra séptima posición en Coller Fairr Protein Producer', '2024-11', ''],
    ['capital-markets-day-2024', 'Multi X realiza tercera versión de Capital Markets Day con ejecutivos del mercado chileno', '2024-11', ''],
    ['cuenta-publica-seguridad', 'Multi X realiza Cuenta Pública de su nuevo Modelo de Seguridad y Salud Ocupacional', '2024-08', ''],
    ['ufro', 'Multi X y la Universidad de La Frontera firman convenio para impulsar prácticas agrícolas sostenibles y reducir impactos ambientales', '2024-08', ''],
    ['pitch-day-2024', 'Multi X realizó 2° versión de su Pitch Day de Innovación', '2024-08', ''],
    ['candy-bites', 'Producto de Multi X Latitude 45 Candy Bites fue elegido como Mejor Retail Packaging de Productos en los premios Seafood Excellence Global Awards 2024', '2024-04', ''],
    ['ponton-hibrido', 'Multi X inaugura primer pontón híbrido en operación en la Región de Aysén', '2023-12', ''],
    ['iniciativas-precompetitivas', 'Multi X es parte de importantes iniciativas pre competitivas para el desarrollo de la salmonicultura mundial', '2023-11', ''],
    ['cadena-de-valor', 'Te invitamos a conocer nuestra cadena de valor', '2023-06', ''],
    ['reporte-2022', 'Te invitamos a conocer nuestro Reporte de Sustentabilidad 2022', '2023-05', ''],
    ['pitch-day-2023', 'Programa de innovación corporativa Multi Xplora realiza su primer Pitch Day', '2023-05', ''],
    ['harina-insectos', 'Multi X lanza innovador proyecto de alimentación en base a harina de insectos', '2022-06', ''],
    ['produccion-limpia', 'Multi X es parte de importante Acuerdo de Producción Limpia en Salmonicultura', '2022-03', ''],
    ['limpieza-playas', 'Multi X trabaja con emprendimiento local para la limpieza de playas', '2022-02', ''],
    ['botadura-ponton', 'Multi X lleva a cabo botadura de moderno pontón', '2022-01', ''],
    ['e-commerce', 'Multi X se abre al mercado nacional con E-Commerce propio', '2021-12', ''],
    ['coller-fairr-2021', 'Multi X afianza posición en índice ESG de producción de proteína Coller FAIRR', '2021-12', ''],
    ['dow-jones', 'Multi X nuevamente es parte de Dow Jones Sustainability Index', '2021-11', ''],
    ['arka', 'Multi X presenta Arka, la primera línea de salmón del mundo ultra Premium', '2021-11', ''],
    ['gerencia-comercial', 'Multi X anuncia cambios en su Gerencia Comercial', '2021-11', ''],
    ['liceo-cisnes', 'Multi X forma parte del Programa de Relatores con Liceo Arturo Prat de Cisnes', '2021-10', ''],
    ['ahora-multi-x', 'Multiexport Foods, ahora es Multi X', '2021-09', ''],
    ['alimentacion-remota', 'Multi X alimenta sus centros de cultivo desde sus oficinas centrales', '2021-06', ''],
    ['residuos-planta', 'Planta de Multi X deja de enviar residuos a relleno sanitario', '2021-06', ''],
    ['director-barros', 'José Miguel Barros asume como nuevo Director de Multi X', '2021-05', ''],
    ['proveedores-aysen', 'Multi X impulsa el desarrollo de proveedores locales en la Región de Aysén', '2021-05', ''],
    ['latitude-asia', 'Marca de salmón ahumado de Multi X «Latitude 45°» se expande y llega al mercado asiático', '2021-01', ''],
    ['cierre-los-lagos', 'Multi X materializó el cierre de sus centros de cultivos en Los Lagos de Chile', '2020-12', ''],
    ['coller-fairr-2020', 'Multi X rankea en prestigioso índice ESG de producción de proteínas de Coller Fairr 2020', '2020-11', '']
  ],
  // Detalle (las que no están aquí muestran [contenido por definir])
  details: {
    'cooperativa-osorno': {
      image: 'assets/img/noticias/cooperativa-osorno-grande.jpg',
      lead: 'Los cooperados recorrieron una piscicultura, el Centro de Alimentación Remota y la planta de Fresco y Congelado para conocer cómo sus granos llegan al alimento del salmón.',
      body: [
        'La visita se enmarca en el Piloto de Agricultura Regenerativa que Multi X y BioMar desarrollan con la ejecución técnica del Instituto de Investigaciones Agropecuarias (INIA), en cultivos de la Cooperativa Agrícola de Granos de Osorno.',
        'El objetivo fue que los agricultores que producen el trigo y la arveja evaluados en el piloto vieran en terreno cómo esos cultivos se integran a la producción de salmón, desde la crianza en agua dulce hasta el producto final.',
        'El recorrido partió en la Piscicultura Multisea, en Pargua (Calbuco), que funciona con recirculación de agua y reutiliza el 99% del agua. Siguió en el Centro de Alimentación Remota y en la Planta de Procesos Fresco y Congelado, y terminó con una reunión y una degustación de salmón en las oficinas de Multi X.',
        'Francisco Lobos, gerente de Asuntos Corporativos y Sostenibilidad de Multi X, destacó que la iniciativa une agricultura regenerativa, alimento y producción animal en un mismo ecosistema. Marianne Montt, Sustainability Leader de BioMar Chile, valoró mostrar a los agricultores el crecimiento y la alimentación del salmón, y Ottmar Opitz, socio de la cooperativa, resaltó la posibilidad de conocer el proceso completo.',
        'El piloto comenzó en agosto de 2026 y durará 24 meses. Evalúa prácticas regenerativas en los cultivos de 14 cooperados de Los Ríos y Los Lagos, y medirá sus efectos en la salud del suelo, la biodiversidad, la productividad, la calidad del grano, la huella ambiental y la rentabilidad. A futuro podría escalar a unas 20.000 hectáreas.'
      ]
    }
  }
};
