import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const body = req.body;

    const { data, error } = await supabase
      .from('Cuestionario_comportamiento_proambiental_autosustentabilidad')
      .insert([{
        "Nombre del encuestador": body.data?.['Nombre del encuestador'] || null,
        "Nombre del encuestado": body.data?.['Nombre del encuestado'] || null,
        "Fecha": body.data?.['Fecha'] || null,
        "Hora": body.data?.['Hora'] || null,
        "Sexo": body.data?.['Sexo'] || null,
        "Edad": body.data?.['Edad'] || null,
        "Estado civil": body.data?.['Estado civil'] || null,
        "Grupo": body.data?.['Grupo'] || null,
        "Subgrupo": body.data?.['Subgrupo'] || null,
        "Número de integrantes en la familia": body.data?.['Número de integrantes en la familia'] || null,
        "0 - 10 años": body.data?.['0 - 10 años'] || null,
        "11 - 25 años": body.data?.['11 - 25 años'] || null,
        "26 - 50 años": body.data?.['26 - 50 años'] || null,
        "51 - 90 años": body.data?.['51 - 90 años'] || null,
        "Nivel de educación del jefe del hogar": body.data?.['Nivel de educación del jefe del hogar'] || null,
        "Situación laboral del jefe del hogar": body.data?.['Situación laboral del jefe del hogar'] || null,
        "Ingreso estimado mensual del jefe del hogar": body.data?.['Ingreso estimado mensual del jefe del hogar'] || null,
        "Tipo de hogar": body.data?.['Tipo de hogar'] || null,
        "¿Conoce lo que son los desechos sólidos domiciliarios?": body.data?.['¿Conoce lo que son los desechos sólidos domiciliarios?'] || null,
        "¿Cree usted que existe un comportamiento adecuado en el manejo de los desechos sólidos domiciliarios en la comunidad?": body.data?.['¿Cree usted que existe un comportamiento adecuado en el manejo de los desechos sólidos domiciliarios en la comunidad?'] || null,
        "¿Se debe separar los desechos sólidos según su origen?": body.data?.['¿Se debe separar los desechos sólidos según su origen?'] || null,
        "¿Es importante la correcta clasificación de los desechos sólidos orgánicos e inorgánicos en el hogar?": body.data?.['¿Es importante la correcta clasificación de los desechos sólidos orgánicos e inorgánicos en el hogar?'] || null,
        "¿Cree que el comportamiento de la comunidad influye en la acumulación de desechos?": body.data?.['¿Cree que el comportamiento de la comunidad influye en la acumulación de desechos?'] || null,
        "¿Dedica tiempo para reducir, reutilizar o reciclar?": body.data?.['¿Dedica tiempo para reducir, reutilizar o reciclar?'] || null,
        "¿Los desechos sólidos son un gran problema para su comunidad?": body.data?.['¿Los desechos sólidos son un gran problema para su comunidad?'] || null,
        "¿Le preocupa el exceso de desechos sólidos domiciliarios?": body.data?.['¿Le preocupa el exceso de desechos sólidos domiciliarios?'] || null,
        "¿Considera que los desechos contaminan el ambiente?": body.data?.['¿Considera que los desechos contaminan el ambiente?'] || null,
        "¿Le afecta emocionalmente cuando escucha noticias sobre la contaminación?": body.data?.['¿Le afecta emocionalmente cuando escucha noticias sobre la contaminación?'] || null,
        "¿Siente frustración debido a la falta de acciones ambientales?": body.data?.['¿Siente frustración debido a la falta de acciones ambientales?'] || null,
        "¿Considera importante pensar en el tipo de planeta que dejamos a futuras generaciones?": body.data?.['¿Considera importante pensar en el tipo de planeta que dejamos a futuras generaciones?'] || null,
        "¿Es consciente del impacto de los desechos sólidos en la salud y el ambiente?": body.data?.['¿Es consciente del impacto de los desechos sólidos en la salud y el ambiente?'] || null,
        "¿Investiga frecuentemente acerca de temas medio ambientales?": body.data?.['¿Investiga frecuentemente acerca de temas medio ambientales?'] || null,
        "¿Conoce las consecuencias de la acumulación de los desechos sólidos domiciliarios?": body.data?.['¿Conoce las consecuencias de la acumulación de los desechos sólidos domiciliarios?'] || null,
        "¿Conoce los beneficios de reutilizar un residuo domiciliarios?": body.data?.['¿Conoce los beneficios de reutilizar un residuo domiciliario?'] || null,
        "¿La falta de información es un obstáculo para la correcta gestión de los residuos sólidos domiciliarios?": body.data?.['¿La falta de información es un obstáculo para la correcta gestión de los residuos sólidos domiciliarios?'] || null,
        "¿Los desechos orgánicos generados en el hogar pueden tener otra funcionalidad?": body.data?.['¿Los desechos orgánicos generados en el hogar pueden tener otra funcionalidad?'] || null,
        "¿La acumulación de desechos afectan a la salud de la población?": body.data?.['¿La acumulación de desechos afectan a la salud de la población?'] || null,
        "¿La reducción, reciclaje y la reutilización de los desechos sólidos puede cuidar al medio ambiente y a la vida silvestre?": body.data?.['¿La reducción, reciclaje y la reutilización de los desechos sólidos puede cuidar al medio ambiente y a la vida silvestre?'] || null,
        "¿Cree que la transformación de desechos sólidos en nuevos productos puede contribuir significativamente a la reducción de la generación de desechos?": body.data?.['¿Cree que la transformación de desechos sólidos en nuevos productos puede contribuir significativamente a la reducción de la generación de desechos?'] || null,
        "¿Necesita más información acerca de educación ambiental?": body.data?.['¿Necesita más información acerca de educación ambiental?'] || null,
        "¿En su hogar practica la separación de los desechos para el reciclaje y le representa algún ingreso?": body.data?.['¿En su hogar practica la separación de los desechos para el reciclaje y le representa algún ingreso?'] || null,
        "¿Los desechos sólidos generados en el hogar pueden ser reutilizados para una nueva función o creación de un producto?": body.data?.['¿Los desechos sólidos generados en el hogar pueden ser reutilizados para una nueva función o creación de un producto?'] || null,
        "¿Cree que el manejo adecuado de los desechos sólidos domiciliarios podría aportar al desarrollo económico comunitario?": body.data?.['¿Cree que el manejo adecuado de los desechos sólidos domiciliarios podría aportar al desarrollo económico comunitario?'] || null,
        "¿Los emprendimientos en base a la reutilización de los desechos aporta a su economía?": body.data?.['¿Los emprendimientos en base a la reutilización de los desechos aporta a su economía?'] || null,
        "¿El manejo adecuado de los desechos sólidos domiciliarios ofrece oportunidades para el emprendimiento?": body.data?.['¿El manejo adecuado de los desechos sólidos domiciliarios ofrece oportunidades para el emprendimiento?'] || null,
        "¿Es posible reducir la generación de residuos sólidos domiciliarios por medio de eventos de concientización?": body.data?.['¿Es posible reducir la generación de residuos sólidos domiciliarios por medio de eventos de concientización?'] || null,
        "¿Participaría en talleres de buenas prácticas y capacitaciones para el correcto manejo de los desechos sólidos domiciliarios?": body.data?.['¿Participaría en talleres de buenas prácticas y capacitaciones para el correcto manejo de los desechos sólidos domiciliarios?'] || null,
        "¿El manejo adecuado de los desechos sólidos domiciliarios puede tener un impacto significativo al medio ambiente?": body.data?.['¿El manejo adecuado de los desechos sólidos domiciliarios puede tener un impacto significativo al medio ambiente?'] || null,
        "¿Está dispuesto a participar en un emprendimiento en base al uso de los desechos sólidos?": body.data?.['¿Está dispuesto a participar en un emprendimiento en base al uso de los desechos sólidos?'] || null,
        "¿Participaría a una feria de emprendimientos comunitarios en base a desechos domiciliarios reutilizados?": body.data?.['¿Participaría a una feria de emprendimientos comunitarios en base a desechos domiciliarios reutilizados?'] || null
      }]);

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

