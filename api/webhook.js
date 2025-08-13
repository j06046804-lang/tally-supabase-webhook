// webhook.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const data = req.body;

    // Función para obtener el valor en texto
    const getValue = (label) => {
      const field = data.fields.find(
        (f) => f.label.trim().toLowerCase() === label.trim().toLowerCase()
      );
      if (!field) return null;

      // Texto libre
      if (field.value && typeof field.value === "string") return field.value;

      // Número
      if (typeof field.value === "number") return field.value;

      // Selección única/múltiple con IDs
      if (field.type === "MULTIPLE_CHOICE" && Array.isArray(field.value)) {
        return field.value
          .map((val) => {
            const opt = field.options.find((o) => o.id === val);
            return opt ? opt.text : val;
          })
          .filter(Boolean)
          .join(", ");
      }

      // Checkboxes (opciones múltiples)
      if (field.choices && Array.isArray(field.choices)) {
        return field.choices
          .map((c) => c.label || c.value)
          .filter(Boolean)
          .join(", ");
      }

      return null; // fallback
    };

    // Construimos el objeto a insertar
    const payload = {
      nombre_encuestador: getValue('Nombre del encuestador'),
      nombre_encuestado: getValue('Nombre del encuestado'),
      fecha: getValue('Fecha'),
      hora: getValue('Hora'),
      sexo: getValue('Sexo'),
      edad: getValue('Edad'),
      estado_civil: getValue('Estado civil'),
      grupo: getValue('Grupo'),
      subgrupo: getValue('Subgrupo'),
      num_integrantes_familia: getValue('Número de integrantes en la familia'),
      edad_0_10: getValue('0 - 10 años'),
      edad_11_25: getValue('11 - 25 años'),
      edad_26_50: getValue('26 - 50 años'),
      edad_51_90: getValue('51 - 90 años'),
      educacion_jefe_hogar: getValue('Nivel de educación del jefe del hogar'),
      situacion_laboral_jefe_hogar: getValue('Situación laboral del jefe del hogar'),
      ingreso_mensual_jefe_hogar: getValue('Ingreso estimado mensual del jefe del hogar'),
      tipo_hogar: getValue('Tipo de hogar'),
      conoce_desechos_solidos: getValue('¿Conoce lo que son los desechos sólidos domiciliarios?'),
      cree_comportamiento_adecuado_manejo: getValue('¿Cree usted que existe un comportamiento adecuado en el manejo de los desechos sólidos domiciliarios en la comunidad?'),
      separar_desechos_por_origen: getValue('¿Se debe separar los desechos sólidos según su origen?'),
      clasificacion_correcta_desechos: getValue('¿Es importante la correcta clasificación de los desechos sólidos orgánicos e inorgánicos en el hogar?'),
      comportamiento_comunidad_influye: getValue('¿Cree que el comportamiento de la comunidad influye en la acumulación de desechos?'),
      dedica_tiempo_reducir_reutilizar_reciclar: getValue('¿Dedica tiempo para reducir, reutilizar o reciclar?'),
      desechos_solidos_problema_comunidad: getValue('¿Los desechos sólidos son un gran problema para su comunidad?'),
      preocupa_exceso_desechos: getValue('¿Le preocupa el exceso de desechos sólidos domiciliarios?'),
      desechos_contaminan_ambiente: getValue('¿Considera que los desechos contaminan el ambiente?'),
      afecta_emocionalmente_noticias_contaminacion: getValue('¿Le afecta emocionalmente cuando escucha noticias sobre la contaminación?'),
      frustracion_falta_acciones_ambientales: getValue('¿Siente frustración debido a la falta de acciones ambientales?'),
      importancia_planeta_futuras_generaciones: getValue('¿Considera importante pensar en el tipo de planeta que dejamos a futuras generaciones?'),
      consciente_impacto_desechos_salud: getValue('¿Es consciente del impacto de los desechos sólidos en la salud y el ambiente?'),
      investiga_temas_ambientales: getValue('¿Investiga frecuentemente acerca de temas medio ambientales?'),
      consecuencias_acumulacion_desechos: getValue('¿Conoce las consecuencias de la acumulación de los desechos sólidos domiciliarios?'),
      beneficios_reutilizar_residuo: getValue('¿Conoce los beneficios de reutilizar un residuo domiciliario?'),
      falta_informacion_obstaculo_gestion: getValue('¿La falta de información es un obstáculo para la correcta gestión de los residuos sólidos domiciliarios?'),
      desechos_organicos_funcionalidad: getValue('¿Los desechos orgánicos generados en el hogar pueden tener otra funcionalidad?'),
      acumulacion_desechos_afecta_salud: getValue('¿La acumulación de desechos afectan a la salud de la población?'),
      reduccion_reciclaje_reutilizacion_cuida_ambiente: getValue('¿La reducción, reciclaje y la reutilización de los desechos sólidos puede cuidar al medio ambiente y a la vida silvestre?'),
      transformacion_desechos_nuevos_productos: getValue('¿Cree que la transformación de desechos sólidos en nuevos productos puede contribuir significativamente a la reducción de la generación de desechos?'),
      necesita_info_educacion_ambiental: getValue('¿Necesita más información acerca de educación ambiental?'),
      practica_separacion_reciclaje_ingreso: getValue('¿En su hogar practica la separación de los desechos para el reciclaje y le representa algún ingreso?'),
      desechos_hogar_reutilizados: getValue('¿Los desechos sólidos generados en el hogar pueden ser reutilizados para una nueva función o creación de un producto?'),
      manejo_adecuado_desechos_aporta_desarrollo: getValue('¿Cree que el manejo adecuado de los desechos sólidos domiciliarios podría aportar al desarrollo económico comunitario?'),
      emprendimientos_reutilizacion_aportan_economia: getValue('¿Los emprendimientos en base a la reutilización de los desechos aporta a su economía?'),
      manejo_adecuado_desechos_oportunidad_emprendimiento: getValue('¿El manejo adecuado de los desechos sólidos domiciliarios ofrece oportunidades para el emprendimiento?'),
      reducir_residuos_eventos_concientizacion: getValue('¿Es posible reducir la generación de residuos sólidos domiciliarios por medio de eventos de concientización?'),
      participaria_talleres_buenas_practicas: getValue('¿Participaría en talleres de buenas prácticas y capacitaciones para el correcto manejo de los desechos sólidos domiciliarios?'),
      manejo_adecuado_desechos_impacto_ambiente: getValue('¿El manejo adecuado de los desechos sólidos domiciliarios puede tener un impacto significativo al medio ambiente?'),
      dispuesto_participar_emprendimiento_desechos: getValue('¿Está dispuesto a participar en un emprendimiento en base al uso de los desechos sólidos?'),
      participaria_feria_emprendimientos_desechos: getValue('¿Participaría a una feria de emprendimientos comunitarios en base a desechos domiciliarios reutilizados?')
    };

    // Insertar en Supabase
    const { error } = await supabase
      .from("Encuestas_Completas")
      .insert([payload]);

    if (error) {
      console.error("Error al insertar en Supabase:", error);
      return res.status(500).json({ message: "Error al guardar en Supabase" });
    }

    return res.status(200).json({ message: "Datos guardados correctamente" });
  } catch (err) {
    console.error("Error en webhook:", err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

