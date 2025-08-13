import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Función para convertir nombres de Tally a columnas de la tabla
function mapTallyToColumns(tallyData) {
  return {
    nombre_encuestador: tallyData['Nombre del encuestador'] || null,
    nombre_encuestado: tallyData['Nombre del encuestado'] || null,
    fecha: tallyData['Fecha'] || null,
    hora: tallyData['Hora'] || null,
    sexo: tallyData['Sexo'] || null,
    edad: tallyData['Edad'] || null,
    estado_civil: tallyData['Estado civil'] || null,
    grupo: tallyData['Grupo'] || null,
    subgrupo: tallyData['Subgrupo'] || null,
    num_integrantes_familia: tallyData['Número de integrantes en la familia'] || null,
    edad_0_10: tallyData['0 - 10 años'] || null,
    edad_11_25: tallyData['11 - 25 años'] || null,
    edad_26_50: tallyData['26 - 50 años'] || null,
    edad_51_90: tallyData['51 - 90 años'] || null,
    educacion_jefe_hogar: tallyData['Nivel de educación del jefe del hogar'] || null,
    situacion_laboral_jefe_hogar: tallyData['Situación laboral del jefe del hogar'] || null,
    ingreso_mensual_jefe_hogar: tallyData['Ingreso estimado mensual del jefe del hogar'] || null,
    tipo_hogar: tallyData['Tipo de hogar'] || null,
    conoce_desechos_solidos: tallyData['¿Conoce lo que son los desechos sólidos domiciliarios?'] || null,
    cree_comportamiento_adecuado_manejo: tallyData['¿Cree usted que existe un comportamiento adecuado en el manejo de los desechos sólidos domiciliarios en la comunidad?'] || null,
    separar_desechos_por_origen: tallyData['¿Se debe separar los desechos sólidos según su origen?'] || null,
    clasificacion_correcta_desechos: tallyData['¿Es importante la correcta clasificación de los desechos sólidos orgánicos e inorgánicos en el hogar?'] || null,
    comportamiento_comunidad_influye: tallyData['¿Cree que el comportamiento de la comunidad influye en la acumulación de desechos?'] || null,
    dedica_tiempo_reducir_reutilizar_reciclar: tallyData['¿Dedica tiempo para reducir, reutilizar o reciclar?'] || null,
    desechos_solidos_problema_comunidad: tallyData['¿Los desechos sólidos son un gran problema para su comunidad?'] || null,
    preocupa_exceso_desechos: tallyData['¿Le preocupa el exceso de desechos sólidos domiciliarios?'] || null,
    desechos_contaminan_ambiente: tallyData['¿Considera que los desechos contaminan el ambiente?'] || null,
    afecta_emocionalmente_noticias_contaminacion: tallyData['¿Le afecta emocionalmente cuando escucha noticias sobre la contaminación?'] || null,
    frustracion_falta_acciones_ambientales: tallyData['¿Siente frustración debido a la falta de acciones ambientales?'] || null,
    importancia_planeta_futuras_generaciones: tallyData['¿Considera importante pensar en el tipo de planeta que dejamos a futuras generaciones?'] || null,
    consciente_impacto_desechos_salud: tallyData['¿Es consciente del impacto de los desechos sólidos en la salud y el ambiente?'] || null,
    investiga_temas_ambientales: tallyData['¿Investiga frecuentemente acerca de temas medio ambientales?'] || null,
    consecuencias_acumulacion_desechos: tallyData['¿Conoce las consecuencias de la acumulación de los desechos sólidos domiciliarios?'] || null,
    beneficios_reutilizar_residuo: tallyData['¿Conoce los beneficios de reutilizar un residuo domiciliario?'] || null,
    falta_informacion_obstaculo_gestion: tallyData['¿La falta de información es un obstáculo para la correcta gestión de los residuos sólidos domiciliarios?'] || null,
    desechos_organicos_funcionalidad: tallyData['¿Los desechos orgánicos generados en el hogar pueden tener otra funcionalidad?'] || null,
    acumulacion_desechos_afecta_salud: tallyData['¿La acumulación de desechos afectan a la salud de la población?'] || null,
    reduccion_reciclaje_reutilizacion_cuida_ambiente: tallyData['¿La reducción, reciclaje y la reutilización de los desechos sólidos puede cuidar al medio ambiente y a la vida silvestre?'] || null,
    transformacion_desechos_nuevos_productos: tallyData['¿Cree que la transformación de desechos sólidos en nuevos productos puede contribuir significativamente a la reducción de la generación de desechos?'] || null,
    necesita_info_educacion_ambiental: tallyData['¿Necesita más información acerca de educación ambiental?'] || null,
    practica_separacion_reciclaje_ingreso: tallyData['¿En su hogar practica la separación de los desechos para el reciclaje y le representa algún ingreso?'] || null,
    desechos_hogar_reutilizados: tallyData['¿Los desechos sólidos generados en el hogar pueden ser reutilizados para una nueva función o creación de un producto?'] || null,
    manejo_adecuado_desechos_aporta_desarrollo: tallyData['¿Cree que el manejo adecuado de los desechos sólidos domiciliarios podría aportar al desarrollo económico comunitario?'] || null,
    emprendimientos_reutilizacion_aportan_economia: tallyData['¿Los emprendimientos en base a la reutilización de los desechos aporta a su economía?'] || null,
    manejo_adecuado_desechos_oportunidad_emprendimiento: tallyData['¿El manejo adecuado de los desechos sólidos domiciliarios ofrece oportunidades para el emprendimiento?'] || null,
    reducir_residuos_eventos_concientizacion: tallyData['¿Es posible reducir la generación de residuos sólidos domiciliarios por medio de eventos de concientización?'] || null,
    participaria_talleres_buenas_practicas: tallyData['¿Participaría en talleres de buenas prácticas y capacitaciones para el correcto manejo de los desechos sólidos domiciliarios?'] || null,
    manejo_adecuado_desechos_impacto_ambiente: tallyData['¿El manejo adecuado de los desechos sólidos domiciliarios puede tener un impacto significativo al medio ambiente?'] || null,
    dispuesto_participar_emprendimiento_desechos: tallyData['¿Está dispuesto a participar en un emprendimiento en base al uso de los desechos sólidos?'] || null,
    participaria_feria_emprendimientos_desechos: tallyData['¿Participaría a una feria de emprendimientos comunitarios en base a desechos domiciliarios reutilizados?'] || null
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const body = req.body;

    if (!body.data) {
      return res.status(400).json({ error: 'No se encontró data en el body' });
    }

    const mappedData = mapTallyToColumns(body.data);

    const { data, error } = await supabase
      .from('Cuestionario_comportamiento_proambiental_autosustentabilidad')
      .insert([mappedData]);

    if (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: 'Datos insertados correctamente', data });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error procesando el webhook' });
  }
}
