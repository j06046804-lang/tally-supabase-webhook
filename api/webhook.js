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
    const body = req.body.data || {}; // Aseguramos que body.data exista

    const { data, error } = await supabase
      .from('Cuestionario_comportamiento_proambiental_autosustentabilidad')
      .insert([{
        nombre_encuestador: body.nombre_encuestador || null,
        nombre_encuestado: body.nombre_encuestado || null,
        fecha: body.fecha || null,
        hora: body.hora || null,
        sexo: body.sexo || null,
        edad: body.edad || null,
        estado_civil: body.estado_civil || null,
        grupo: body.grupo || null,
        subgrupo: body.subgrupo || null,
        num_integrantes_familia: body.num_integrantes_familia || null,
        edad_0_10: body.edad_0_10 || null,
        edad_11_25: body.edad_11_25 || null,
        edad_26_50: body.edad_26_50 || null,
        edad_51_90: body.edad_51_90 || null,
        educacion_jefe_hogar: body.educacion_jefe_hogar || null,
        situacion_laboral_jefe_hogar: body.situacion_laboral_jefe_hogar || null,
        ingreso_mensual_jefe_hogar: body.ingreso_mensual_jefe_hogar || null,
        tipo_hogar: body.tipo_hogar || null,
        conoce_desechos_solidos: body.conoce_desechos_solidos || null,
        cree_comportamiento_adecuado_manejo: body.cree_comportamiento_adecuado_manejo || null,
        separar_desechos_por_origen: body.separar_desechos_por_origen || null,
        clasificacion_correcta_desechos: body.clasificacion_correcta_desechos || null,
        comportamiento_comunidad_influye: body.comportamiento_comunidad_influye || null,
        dedica_tiempo_reducir_reutilizar_reciclar: body.dedica_tiempo_reducir_reutilizar_reciclar || null,
        desechos_solidos_problema_comunidad: body.desechos_solidos_problema_comunidad || null,
        preocupa_exceso_desechos: body.preocupa_exceso_desechos || null,
        desechos_contaminan_ambiente: body.desechos_contaminan_ambiente || null,
        afecta_emocionalmente_noticias_contaminacion: body.afecta_emocionalmente_noticias_contaminacion || null,
        frustracion_falta_acciones_ambientales: body.frustracion_falta_acciones_ambientales || null,
        importancia_planeta_futuras_generaciones: body.importancia_planeta_futuras_generaciones || null,
        consciente_impacto_desechos_salud: body.consciente_impacto_desechos_salud || null,
        investiga_temas_ambientales: body.investiga_temas_ambientales || null,
        consecuencias_acumulacion_desechos: body.consecuencias_acumulacion_desechos || null,
        beneficios_reutilizar_residuo: body.beneficios_reutilizar_residuo || null,
        falta_informacion_obstaculo_gestion: body.falta_informacion_obstaculo_gestion || null,
        desechos_organicos_funcionalidad: body.desechos_organicos_funcionalidad || null,
        acumulacion_desechos_afecta_salud: body.acumulacion_desechos_afecta_salud || null,
        reduccion_reciclaje_reutilizacion_cuida_ambiente: body.reduccion_reciclaje_reutilizacion_cuida_ambiente || null,
        transformacion_desechos_nuevos_productos: body.transformacion_desechos_nuevos_productos || null,
        necesita_info_educacion_ambiental: body.necesita_info_educacion_ambiental || null,
        practica_separacion_reciclaje_ingreso: body.practica_separacion_reciclaje_ingreso || null,
        desechos_hogar_reutilizados: body.desechos_hogar_reutilizados || null,
        manejo_adecuado_desechos_aporta_desarrollo: body.manejo_adecuado_desechos_aporta_desarrollo || null,
        emprendimientos_reutilizacion_aportan_economia: body.emprendimientos_reutilizacion_aportan_economia || null,
        manejo_adecuado_desechos_oportunidad_emprendimiento: body.manejo_adecuado_desechos_oportunidad_emprendimiento || null,
        reducir_residuos_eventos_concientizacion: body.reducir_residuos_eventos_concientizacion || null,
        participaria_talleres_buenas_practicas: body.participaria_talleres_buenas_practicas || null,
        manejo_adecuado_desechos_impacto_ambiente: body.manejo_adecuado_desechos_impacto_ambiente || null,
        dispuesto_participar_emprendimiento_desechos: body.dispuesto_participar_emprendimiento_desechos || null,
        participaria_feria_emprendimientos_desechos: body.participaria_feria_emprendimientos_desechos || null
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
