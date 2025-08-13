// /api/webhook.js
import { createClient } from '@supabase/supabase-js';

// Variables de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const data = req.body; // Recibimos los datos desde Tally

    // Insertamos en la tabla
    const { error } = await supabase
      .from('Cuestionario_comportamiento_proambiental_autosustentabilidad')
      .insert([
        {
          fecha_registro: new Date().toISOString(),
          nombre_encuestador: data.nombre_encuestador || null,
          nombre_encuestado: data.nombre_encuestado || null,
          fecha: data.fecha || null,
          hora: data.hora || null,
          sexo: data.sexo || null,
          edad: data.edad || null,
          estado_civil: data.estado_civil || null,
          grupo: data.grupo || null,
          subgrupo: data.subgrupo || null,
          num_integrantes_familia: data.num_integrantes_familia || null,
          edad_0_10: data.edad_0_10 || null,
          edad_11_25: data.edad_11_25 || null,
          edad_26_50: data.edad_26_50 || null,
          edad_51_90: data.edad_51_90 || null,
          educacion_jefe_hogar: data.educacion_jefe_hogar || null,
          situacion_laboral_jefe_hogar: data.situacion_laboral_jefe_hogar || null,
          ingreso_mensual_jefe_hogar: data.ingreso_mensual_jefe_hogar || null,
          tipo_hogar: data.tipo_hogar || null,
          conoce_desechos_solidos: data.conoce_desechos_solidos || null,
          cree_comportamiento_adecuado_manejo: data.cree_comportamiento_adecuado_manejo || null,
          separar_desechos_por_origen: data.separar_desechos_por_origen || null,
          clasificacion_correcta_desechos: data.clasificacion_correcta_desechos || null,
          comportamiento_comunidad_influye: data.comportamiento_comunidad_influye || null,
          dedica_tiempo_reducir_reutilizar_reciclar: data.dedica_tiempo_reducir_reutilizar_reciclar || null,
          desechos_solidos_problema_comunidad: data.desechos_solidos_problema_comunidad || null,
          preocupa_exceso_desechos: data.preocupa_exceso_desechos || null,
          desechos_contaminan_ambiente: data.desechos_contaminan_ambiente || null,
          afecta_emocionalmente_noticias_contaminacion: data.afecta_emocionalmente_noticias_contaminacion || null,
          frustracion_falta_acciones_ambientales: data.frustracion_falta_acciones_ambientales || null,
          importancia_planeta_futuras_generaciones: data.importancia_planeta_futuras_generaciones || null,
          consciente_impacto_desechos_salud: data.consciente_impacto_desechos_salud || null,
          investiga_temas_ambientales: data.investiga_temas_ambientales || null,
          consecuencias_acumulacion_desechos: data.consecuencias_acumulacion_desechos || null,
          beneficios_reutilizar_residuo: data.beneficios_reutilizar_residuo || null,
          falta_informacion_obstaculo_gestion: data.falta_informacion_obstaculo_gestion || null,
          desechos_organicos_funcionalidad: data.desechos_organicos_funcionalidad || null,
          acumulacion_desechos_afecta_salud: data.acumulacion_desechos_afecta_salud || null,
          reduccion_reciclaje_reutilizacion_cuida_ambiente: data.reduccion_reciclaje_reutilizacion_cuida_ambiente || null,
          transformacion_desechos_nuevos_productos: data.transformacion_desechos_nuevos_productos || null,
          necesita_info_educacion_ambiental: data.necesita_info_educacion_ambiental || null,
          practica_separacion_reciclaje_ingreso: data.practica_separacion_reciclaje_ingreso || null,
          desechos_hogar_reutilizados: data.desechos_hogar_reutilizados || null,
          manejo_adecuado_desechos_aporta_desarrollo: data.manejo_adecuado_desechos_aporta_desarrollo || null,
          emprendimientos_reutilizacion_aportan_economia: data.emprendimientos_reutilizacion_aportan_economia || null,
          manejo_adecuado_desechos_oportunidad_emprendimiento: data.manejo_adecuado_desechos_oportunidad_emprendimiento || null,
          reducir_residuos_eventos_concientizacion: data.reducir_residuos_eventos_concientizacion || null,
          participaria_talleres_buenas_practicas: data.participaria_talleres_buenas_practicas || null,
          manejo_adecuado_desechos_impacto_ambiente: data.manejo_adecuado_desechos_impacto_ambiente || null,
          dispuesto_participar_emprendimiento_desechos: data.dispuesto_participar_emprendimiento_desechos || null,
          participaria_feria_emprendimientos_desechos: data.participaria_feria_emprendimientos_desechos || null
        }
      ]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Encuesta registrada correctamente' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
