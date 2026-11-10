/* ==========================================================================
   Ofertas laborales · datos del prototipo (un solo lugar para todas las páginas)
   Nombres, áreas y ciudades reales del sitio actual
   (multi-xsalmon.com/oportunidades-laborales, noviembre 2026). La región y el
   área de trabajo (Agua Dulce, Agua Mar, Plantas de Proceso, Gestión y Soporte)
   se deducen de la ciudad y del área: [por validar]. Lo usan Trabaja con
   Nosotros, Oportunidades laborales, Detalle de oferta y Postular
   (js/components.js: initJobs).
   ========================================================================== */
window.MX_JOBS = {
  groups: [
    { id: 'agua-dulce', label: 'Agua Dulce' },
    { id: 'agua-mar', label: 'Agua Mar' },
    { id: 'plantas', label: 'Plantas de Proceso' },
    { id: 'gestion', label: 'Gestión y Soporte' }
  ],
  regions: [
    { id: 'los-lagos', label: 'Los Lagos' },
    { id: 'aysen', label: 'Aysén' },
    { id: 'magallanes', label: 'Magallanes' }
  ],
  // id, cargo, área, grupo, ciudad, región ('' = sin ubicación publicada)
  list: [
    [11452, 'Técnico de Mantención Agua Dulce', 'Farming', 'agua-dulce', 'Puerto Montt', 'los-lagos'],
    [11419, 'Experta/o en Prevención de Riesgos', 'SSO Farming', 'agua-mar', 'Guaitecas', 'aysen'],
    [11353, 'Jefe de Mantención Piscicultura', 'Piscicultura El Negro', 'agua-dulce', '', ''],
    [11320, 'Supervisor de Optimización', 'Control y Optimización', 'gestion', 'Puerto Montt', 'los-lagos'],
    [11287, 'Coordinador de Operaciones', 'Operaciones y Logística', 'gestion', '', ''],
    [11254, 'Sales Manager Junior', 'Comercial F&C', 'gestion', 'Puerto Montt', 'los-lagos'],
    [11221, 'Supervisor de Producción', 'Producción F&C', 'plantas', 'Puerto Montt', 'los-lagos'],
    [11122, 'Subgerente de Planificación Financiera', 'Control de Gestión', 'gestion', 'Puerto Montt', 'los-lagos'],
    [11089, 'Ingeniero/a en Desarrollo de Productos', 'Consumer Products', 'gestion', 'Puerto Montt', 'los-lagos'],
    [11023, 'Analista de Abastecimiento', 'Abastecimiento', 'gestion', 'Puerto Montt', 'los-lagos'],
    [10990, 'Encargado de Bioestimación y Nuevas Tecnologías', 'Gerencia', 'gestion', 'Puerto Montt', 'los-lagos'],
    [10924, 'Supervisor de Aseguramiento de Calidad', 'Aseg. Calidad', 'plantas', 'Puerto Varas', 'los-lagos'],
    [10905, 'Práctica en Reclutamiento y Selección', 'Reclutamiento y Selección', 'gestion', '', ''],
    [10904, 'Operario - Puyuhuapi y Refugio', 'Área Puyuhuapi', 'agua-mar', 'Cisnes', 'aysen'],
    [10903, 'Cocinero - Puyuhuapi y Refugio', 'Área Puyuhuapi', 'agua-mar', 'Cisnes', 'aysen'],
    [10902, 'Operario - Melinka', 'Área Melinka', 'agua-mar', 'Guaitecas', 'aysen'],
    [10895, 'Operario - Aysén', 'Área Aysén', 'agua-mar', 'Aysén', 'aysen'],
    [10894, 'Asistente de Centro - Aysén', 'Área Aysén', 'agua-mar', 'Aysén', 'aysen'],
    [10839, 'Primer Asistente de Centro - Puyuhuapi y Refugio', 'Centro Arbolito', 'agua-mar', 'Cisnes', 'aysen'],
    [10838, 'Primer Asistente de Centro - Aysén', 'Área Aysén', 'agua-mar', 'Aysén', 'aysen'],
    [10830, 'Supervisor de Bodega', 'Bodega', 'plantas', '', ''],
    [10827, 'Asistente de Centro - Melinka', 'Área Melinka', 'agua-mar', 'Guaitecas', 'aysen'],
    [10826, 'Primer Asistente de Centro - Melinka', 'Área Melinka', 'agua-mar', 'Guaitecas', 'aysen'],
    [10759, 'Supervisor de Wellboats', 'Transporte y Cosecha', 'agua-mar', 'Puerto Montt', 'los-lagos'],
    [10727, 'Veterinario', 'Departamento de Salud', 'agua-mar', 'Puerto Montt', 'los-lagos'],
    [10628, 'Business Partner Comercial', 'Control de Gestión', 'gestion', 'Puerto Montt', 'los-lagos'],
    [10627, 'Subgerente de Salud Agua Mar', 'Gerencia', 'agua-mar', 'Puerto Montt', 'los-lagos'],
    [10231, 'Práctica profesional - verano', 'Reclutamiento y Selección', 'gestion', 'Puerto Montt', 'los-lagos'],
    [10035, 'Category Manager', 'Abastecimiento', 'gestion', 'Puerto Montt', 'los-lagos'],
    [9804, '¡Base de Datos de Talentos Multi X!', 'Reclutamiento y Selección', 'gestion', 'Puerto Montt', 'los-lagos'],
    [9803, '¡Base de Datos de Talentos Multi X!', 'Operaciones Agua Dulce', 'agua-dulce', 'Puerto Montt', 'los-lagos'],
    [9802, '¡Base de Datos de Talentos Multi X!', 'Producción Ahumado', 'plantas', 'Puerto Montt', 'los-lagos'],
    [9769, '¡Base de Datos de Talentos Multi X!', 'Área Aysén', 'agua-mar', 'Puerto Montt', 'los-lagos'],
    [9541, 'Guardia de Seguridad', 'Seguridad Processing', 'plantas', '', ''],
    [9309, 'Operario de Tratamiento de Peces', 'Faena de Baño de Peces', 'agua-mar', 'Puerto Montt', 'los-lagos'],
    [9307, 'Buzo', 'Operaciones y Logística', 'agua-mar', 'Puerto Montt', 'los-lagos'],
    [9185, 'Operario y Tripulante de Nave Menor - Magallanes', 'Área Taraba', 'agua-mar', 'Natales', 'magallanes']
  ],
  // Formulario de postulación: regiones de Chile (como en el sitio actual) y
  // comunas de las regiones con operaciones (el resto: [por definir])
  formRegions: [
    ['XV', 'XV: de Arica y Parinacota'], ['I', 'I: de Tarapacá'], ['II', 'II: de Antofagasta'],
    ['III', 'III: de Atacama'], ['IV', 'IV: de Coquimbo'], ['V', 'V: de Valparaíso'],
    ['RM', 'RM: Metropolitana de Santiago'], ['VI', 'VI: del Libertador Gral. Bernardo O\'Higgins'],
    ['VII', 'VII: del Maule'], ['XVI', 'XVI: de Ñuble'], ['VIII', 'VIII: del Biobío'],
    ['IX', 'IX: de la Araucanía'], ['XIV', 'XIV: de Los Ríos'], ['X', 'X: de Los Lagos'],
    ['XI', 'XI: de Aysén del Gral. Carlos Ibáñez del Campo'], ['XII', 'XII: de Magallanes y de la Antártica Chilena']
  ],
  communes: {
    IX: ['Curarrehue', 'Pucón', 'Temuco', 'Villarrica'],
    X: ['Calbuco', 'Castro', 'Chonchi', 'Cochamó', 'Dalcahue', 'Frutillar', 'Hualaihué', 'Llanquihue', 'Maullín', 'Osorno', 'Puerto Montt', 'Puerto Varas', 'Quellón'],
    XI: ['Aysén', 'Cisnes', 'Coyhaique', 'Guaitecas'],
    XII: ['Natales', 'Porvenir', 'Punta Arenas']
  },
  // Descripción común de las ofertas del sitio actual
  about: 'Multi X es uno de los principales productores de salmón a nivel nacional. Fundada hace 37 años, es referente entre los acuicultores del sur de Chile y gestiona toda su cadena de valor, desde la reproducción y el cultivo hasta la distribución de un salmón premium a las mesas de todo el mundo. Tenemos una fuerte presencia en Chile y Estados Unidos, y un equipo talentoso, innovador y comprometido con la sostenibilidad.',
  // Detalle real de cada oferta (las que no están aquí muestran [contenido por definir])
  details: {
    11452: {
      challenge: 'Ejecutar las actividades de mantención de las maquinarias, equipos e infraestructura de los centros de cultivo, para asegurar su funcionamiento permanente y su correcta operación.',
      requirements: [
        'Formación académica y/o profesional: Media Técnica o Superior Técnico Profesional Electromecánico, Electrónico, Mecánico o similar.',
        'Conocimiento técnico: manejo de electrobombas de agua, redes de piping, tableros e instalaciones eléctricas industriales, automatización y electromecánica en equipos de acuicultura.',
        'Al menos 2 años de experiencia.'
      ]
    }
  }
};
