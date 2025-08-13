// pages/api/webhook.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { data } = req.body;

    if (!data || !data.fields) {
      return res.status(400).json({ error: 'Invalid Tally payload' });
    }

    // Diccionario para mapear las etiquetas de Tally a columnas de Supabase
    const fieldMap = {
      'Nombre del encuestador': 'Nombre del encuestador',
      'Nombre del encuestado': 'Nombre del encuestado',
      'Fecha': 'Fecha',
      'Hora': 'Hora',
      'Sexo': 'Sexo',
      'Edad': 'Edad',
      'Estado civil': 'Estado civil',
      'Grupo': 'Grupo',
      'Subgrupo': 'Subgrupo',
      'Número de integrantes en la familia': 'Número de integrantes en la familia',
      '0 - 10 años': '0 - 10 años',
      '11 - 25 años': '11 - 25 años',
      '26 - 50 años': '26 - 50 años',
      '51 - 90 años': '51 - 90 años',
      'Nivel de educación del jefe del hogar': 'Nivel de educación del jefe del hogar',
      'Situación laboral del jefe del hogar': 'Situación laboral del jefe del hogar',
      'Ingreso estimado mensual del jefe del hogar': 'Ingreso estimado mensual del jefe del hogar',
      'Tipo de hogar': 'Tipo de hogar',
      '¿Conoce lo que son los desechos sólidos domiciliarios?': '¿Conoce lo que son los desechos sólidos domiciliarios?',
      '¿Cree usted que existe un comportamiento adecuado en el manejo de los desechos sólidos domiciliarios en la comunidad?': '¿Cree usted que existe un comportamiento adecuado en el manejo de los desechos sólidos domiciliarios en la comunidad?',
      '¿Se debe separar los desechos sólidos según su origen?': '¿Se debe separar los desechos sólidos según su origen?',
      '¿Es importante la correcta clasificación de los desechos sólidos orgánicos e inorgánicos en el hogar?': '¿Es importante la correcta clasificación de los desechos sólidos orgánicos e inorgánicos en el hogar?',
      '¿Cree que el comportamiento de la comunidad influye en la acumulación de desechos?': '¿Cree que el comportamiento de la comunidad influye en la acumulación de desechos?',
      '¿Dedica tiempo para reducir, reutilizar o reciclar?': '¿Dedica tiempo para reducir, reutilizar o reciclar?',
      '¿Los desechos sólidos son un gran problema para su comunidad?': '¿Los desechos sólidos son un gran problema para su comunidad?',
      '¿Le preocupa el exceso de desechos sólidos domiciliarios?': '¿Le preocupa el exceso de desechos sólidos domiciliarios?',
      '¿Considera que los desechos contaminan el ambiente?': '¿Considera que los desechos contaminan el ambiente?',
      '¿Le afecta emocionalmente cuando escucha noticias sobre la contaminación?': '¿Le afecta emocionalmente cuando escucha noticias sobre la contaminación?',
      '¿Siente frustración debido a la falta de acciones ambientales?': '¿Siente frustración debido a la falta de acciones ambientales?',
      '¿Considera importante pensar en el tipo de planeta que dejamos a futuras generaciones?': '¿Considera importante pensar en el tipo de planeta que dejamos a futuras generaciones?',
      '¿Es consciente del impacto de los desechos sólidos en la salud y el ambiente?': '¿Es consciente del impacto de los desechos sólidos en la salud y el ambiente?',
      '¿Investiga frecuentemente acerca de temas medio ambientales?': '¿Investiga frecuentemente acerca de temas medio ambientales?',
      '¿Conoce las consecuencias de la acumulación de los desechos sólidos domiciliarios?': '¿Conoce las consecuencias de la acumulación de los desechos sólidos domiciliarios?',
      '¿Conoce los beneficios de reutilizar un residuo domiciliario?': '¿Conoce los beneficios de reutilizar un residuo domiciliario?',
      '¿La falta de información es un obstáculo para la correcta gestión de los residuos sólidos domiciliarios?': '¿La falta de información es un obstáculo para la correcta gestión de los residuos sólidos domiciliarios?',
      '¿Los desechos orgánicos generados en el hogar pueden tener otra funcionalidad?': '¿Los desechos orgánicos generados en el hogar pueden tener otra funcionalidad?',
      '¿La acumulación de desechos afectan a la salud de la población?': '¿La acumulación de desechos afectan a la salud de la población?',
      '¿La reducción, reciclaje y la reutilización de los desechos sólidos puede cuidar al medio ambiente y a la vida silvestre?': '¿La reducción, reciclaje y la reutilización de los desechos sólidos puede cuidar al medio ambiente y a la vida silvestre?',
      '¿Cree que la transformación de desechos sólidos en nuevos productos puede contribuir significativamente a la reducción de la generación de desechos?': '¿Cree que la transformación de desechos sólidos en nuevos productos puede contribuir significativamente a la reducción de la generación de desechos?',
      '¿Necesita más información acerca de educación ambiental?': '¿Necesita más información acerca de educación ambiental?',
      '¿En su hogar practica la separación de los desechos para el reciclaje y le representa algún ingreso?': '¿En su hogar practica la separación de los desechos para el reciclaje y le representa algún ingreso?',
      '¿Los desechos sólidos generados en el hogar pueden ser reutilizados para una nueva función o creación de un producto?': '¿Los desechos sólidos generados en el hogar pueden ser reutilizados para una nueva función o creación de un producto?',
      '¿Cree que el manejo adecuado de los desechos sólidos domiciliarios podría aportar al desarrollo económico comunitario?': '¿Cree que el manejo adecuado de los desechos sólidos domiciliarios podría aportar al desarrollo económico comunitario?',
      '¿Los emprendimientos en base a la reutilización de los desechos aporta a su economía?': '¿Los emprendimientos en base a la reutilización de los desechos aporta a su economía?',
      '¿El manejo adecuado de los desechos sólidos domiciliarios ofrece oportunidades para el emprendimiento?': '¿El manejo adecuado de los desechos sólidos domiciliarios ofrece oportunidades para el emprendimiento?',
      '¿Es posible reducir la generación de residuos sólidos domiciliarios por medio de eventos de concientización?': '¿Es posible reducir la generación de residuos sólidos domiciliarios por medio de eventos de concientización?',
      '¿Participaría en talleres de buenas prácticas y capacitaciones para el correcto manejo de los desechos sólidos domiciliarios?': '¿Participaría en talleres de buenas prácticas y capacitaciones para el correcto manejo de los desechos sólidos domiciliarios?',
      '¿El manejo adecuado de los desechos sólidos domiciliarios puede tener un impacto significativo al medio ambiente?': '¿El manejo adecuado de los desechos sólidos domiciliarios puede tener un impacto significativo al medio ambiente?',
      '¿Está dispuesto a participar en un emprendimiento en base al uso de los desechos sólidos?': '¿Está dispuesto a participar en un emprendimiento en base al uso de los desechos sólidos?',
      '¿Participaría a una feria de emprendimientos comunitarios en base a desechos domiciliarios reutilizados?': '¿Participaría a una feria de emprendimientos comunitarios en base a desechos domiciliarios reutilizados?'
    };

    // Extraer los valores del payload de Tally
    const insertData = {};
    for (const [label, column] of Object.entries(fieldMap)) {
      const field = data.fields.find(f => f.label.trim().toLowerCase() === label.trim().toLowerCase());
      insertData[column] = field ? field.value : null;
    }

    const { data: inserted, error } = await supabase
      .from('Cuestionario_comportamiento_proambiental_autosustentabilidad')
      .insert([insertData])
      .select();

    if (error) throw error;

    return res.status(200).json({ message: 'Datos guardados correctamente', data: inserted });

  } catch (err) {
    console.error('Error inserting data:', err);
    return res.status(500).json({ error: err.message });
  }
}
