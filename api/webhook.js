// src/app/api/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// === Supabase client (usar SERVICE_ROLE si puedes en el server) ===
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
// Si puedes, usa: const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
// y pasa ese en lugar del anon para evitar RLS al insertar desde el server.
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- Helpers ---

// Normaliza claves (por si Tally manda espacios extra o saltos de línea)
const norm = (s: string) => s.trim().replace(/\s+/g, " ");

// Mapa de Pregunta (texto Tally) -> nombre de columna en tu tabla
const labelToColumn: Record<string, string> = {
  [norm("Nombre del encuestador")]: "nombre_encuestador",
  [norm("Nombre del encuestado")]: "nombre_encuestado",
  [norm("Fecha")]: "fecha",
  [norm("Hora")]: "hora",
  [norm("Sexo")]: "sexo",
  [norm("Edad")]: "edad",
  [norm("Estado civil")]: "estado_civil",
  [norm("Grupo")]: "grupo",
  [norm("Subgrupo")]: "subgrupo",
  [norm("Número de integrantes en la familia")]: "num_integrantes_familia",
  [norm("0 - 10 años")]: "edad_0_10",
  [norm("11 - 25 años")]: "edad_11_25",
  [norm("26 - 50 años")]: "edad_26_50",
  [norm("51 - 90 años")]: "edad_51_90",
  [norm("Nivel de educación del jefe del hogar")]: "educacion_jefe_hogar",
  [norm("Situación laboral del jefe del hogar")]: "situacion_laboral_jefe_hogar",
  [norm("Ingreso estimado mensual del jefe del hogar")]: "ingreso_mensual_jefe_hogar",
  [norm("Tipo de hogar")]: "tipo_hogar",
  [norm("¿Conoce lo que son los desechos sólidos domiciliarios?")]: "conoce_desechos_solidos",
  [norm("¿Cree usted que existe un comportamiento adecuado en el manejo de los desechos sólidos domiciliarios en la comunidad?")]:
    "cree_comportamiento_adecuado_manejo",
  [norm("¿Se debe separar los desechos sólidos según su origen?")]: "separar_desechos_por_origen",
  [norm("¿Es importante la correcta clasificación de los desechos sólidos orgánicos e inorgánicos en el hogar?")]:
    "clasificacion_correcta_desechos",
  [norm("¿Cree que el comportamiento de la comunidad influye en la acumulación de desechos?")]:
    "comportamiento_comunidad_influye",
  [norm("¿Dedica tiempo para reducir, reutilizar o reciclar?")]: "dedica_tiempo_reducir_reutilizar_reciclar",
  [norm("¿Los desechos sólidos son un gran problema para su comunidad?")]:
    "desechos_solidos_problema_comunidad",
  [norm("¿Le preocupa el exceso de desechos sólidos domiciliarios?")]: "preocupa_exceso_desechos",
  [norm("¿Considera que los desechos contaminan el ambiente?")]: "desechos_contaminan_ambiente",
  [norm("¿Le afecta emocionalmente cuando escucha noticias sobre la contaminación?")]:
    "afecta_emocionalmente_noticias_contaminacion",
  [norm("¿Siente frustración debido a la falta de acciones ambientales?")]:
    "frustracion_falta_acciones_ambientales",
  [norm("¿Considera importante pensar en el tipo de planeta que dejamos a futuras generaciones?")]:
    "importancia_planeta_futuras_generaciones",
  [norm("¿Es consciente del impacto de los desechos sólidos en la salud y el ambiente?")]:
    "consciente_impacto_desechos_salud",
  [norm("¿Investiga frecuentemente acerca de temas medio ambientales?")]: "investiga_temas_ambientales",
  [norm("¿Conoce las consecuencias de la acumulación de los desechos sólidos domiciliarios?")]:
    "consecuencias_acumulacion_desechos",
  [norm("¿Conoce los beneficios de reutilizar un residuo domiciliario?")]: "beneficios_reutilizar_residuo",
  [norm("¿La falta de información es un obstáculo para la correcta gestión de los residuos sólidos domiciliarios?")]:
    "falta_informacion_obstaculo_gestion",
  [norm("¿Los desechos orgánicos generados en el hogar pueden tener otra funcionalidad?")]:
    "desechos_organicos_funcionalidad",
  [norm("¿La acumulación de desechos afectan a la salud de la población?")]:
    "acumulacion_desechos_afecta_salud",
  [norm("¿La reducción, reciclaje y la reutilización de los desechos sólidos puede cuidar al medio ambiente y a la vida silvestre?")]:
    "reduccion_reciclaje_reutilizacion_cuida_ambiente",
  [norm("¿Cree que la transformación de desechos sólidos en nuevos productos puede contribuir significativamente a la reducción de la generación de desechos?")]:
    "transformacion_desechos_nuevos_productos",
  [norm("¿Necesita más información acerca de educación ambiental?")]:
    "necesita_info_educacion_ambiental",
  [norm("¿En su hogar practica la separación de los desechos para el reciclaje y le representa algún ingreso?")]:
    "practica_separacion_reciclaje_ingreso",
  [norm("¿Los desechos sólidos generados en el hogar pueden ser reutilizados para una nueva función o creación de un producto?")]:
    "desechos_hogar_reutilizados",
  [norm("¿Cree que el manejo adecuado de los desechos sólidos domiciliarios podría aportar al desarrollo económico comunitario?")]:
    "manejo_adecuado_desechos_aporta_desarrollo",
  [norm("¿Los emprendimientos en base a la reutilización de los desechos aporta a su economía?")]:
    "emprendimientos_reutilizacion_aportan_economia",
  [norm("¿El manejo adecuado de los desechos sólidos domiciliarios ofrece oportunidades para el emprendimiento?")]:
    "manejo_adecuado_desechos_oportunidad_emprendimiento",
  [norm("¿Es posible reducir la generación de residuos sólidos domiciliarios por medio de eventos de concientización?")]:
    "reducir_residuos_eventos_concientizacion",
  [norm("¿Participaría en talleres de buenas prácticas y capacitaciones para el correcto manejo de los desechos sólidos domiciliarios?")]:
    "participaria_talleres_buenas_practicas",
  [norm("¿El manejo adecuado de los desechos sólidos domiciliarios puede tener un impacto significativo al medio ambiente?")]:
    "manejo_adecuado_desechos_impacto_ambiente",
  [norm("¿Está dispuesto a participar en un emprendimiento en base al uso de los desechos sólidos?")]:
    "dispuesto_participar_emprendimiento_desechos",
  [norm("¿Participaría a una feria de emprendimientos comunitarios en base a desechos domiciliarios reutilizados?")]:
    "participaria_feria_emprendimientos_desechos",
};

// Tipos de columnas numéricas para intentar parseInt
const integerColumns = new Set<string>([
  "edad",
  "num_integrantes_familia",
  "edad_0_10",
  "edad_11_25",
  "edad_26_50",
  "edad_51_90",
]);

// Extrae mapas auxiliares a partir del payload de Tally
function buildTallyMaps(data: any) {
  // fieldId -> label
  const fieldIdToLabel = new Map<string, string>();
  // Dentro de cada field, mapeamos choiceId -> label (si aplica)
  const choiceIdToLabel = new Map<string, string>();

  const fields = data?.fields ?? [];
  for (const f of fields) {
    if (f?.id && f?.label) fieldIdToLabel.set(f.id, norm(f.label));
    // opciones (single/multi)
    // Tally usa f.options o f.choices según el tipo
    const opts = f?.options ?? f?.choices ?? [];
    for (const opt of opts) {
      if (opt?.id && opt?.label) choiceIdToLabel.set(opt.id, opt.label);
    }
  }

  return { fieldIdToLabel, choiceIdToLabel };
}

// Convierte una answer de Tally a un texto legible
function answerToText(ans: any, maps: { fieldIdToLabel: Map<string, string>, choiceIdToLabel: Map<string, string> }) {
  // Posibles formas de Tally:
  // ans.text, ans.email, ans.url, ans.number, ans.date, ans.time, ans.boolean, ans.fileUpload
  // ans.choice { id?, label? }, ans.choices { ids?:[], labels?:[] }
  if (ans == null) return null;

  if (typeof ans === "string" || typeof ans === "number" || typeof ans === "boolean") {
    return String(ans);
  }

  // Casos más comunes:
  if (ans.text != null) return String(ans.text);
  if (ans.email != null) return String(ans.email);
  if (ans.url != null) return String(ans.url);
  if (ans.number != null) return String(ans.number);
  if (ans.date != null) return String(ans.date);
  if (ans.time != null) return String(ans.time);
  if (ans.boolean != null) return ans.boolean ? "Sí" : "No";

  // Selección única
  if (ans.choice) {
    if (ans.choice.label) return String(ans.choice.label);
    if (ans.choice.id) {
      const lbl = maps.choiceIdToLabel.get(ans.choice.id);
      if (lbl) return lbl;
      return String(ans.choice.id); // fallback
    }
  }

  // Selección múltiple
  if (ans.choices) {
    // A veces vienen como labels directos
    if (Array.isArray(ans.choices.labels) && ans.choices.labels.length) {
      return ans.choices.labels.join(", ");
    }
    // O como ids
    if (Array.isArray(ans.choices.ids) && ans.choices.ids.length) {
      const labels = ans.choices.ids.map((id: string) => maps.choiceIdToLabel.get(id) ?? id);
      return labels.join(", ");
    }
  }

  // fileUpload (lista de archivos)
  if (Array.isArray(ans.fileUpload) && ans.fileUpload.length) {
    // Guardamos URLs separadas por coma
    const urls = ans.fileUpload.map((f: any) => f?.url ?? "").filter(Boolean);
    return urls.join(", ");
  }

  // Si no reconocemos, serializamos
  try {
    return JSON.stringify(ans);
  } catch {
    return String(ans);
  }
}

// Convierte el valor a lo que espera la columna (date, time, int, text).
function coerceToColumn(column: string, value: string | null) {
  if (value == null) return null;
  const v = String(value).trim();
  if (v === "") return null;

  // Fechas (YYYY-MM-DD) y hora (HH:mm or HH:mm:ss) ya suelen venir correctas desde Tally
  if (column === "fecha") {
    // Acepta "YYYY-MM-DD"
    return v;
  }
  if (column === "hora") {
    // Acepta "HH:mm" u "HH:mm:ss"
    return v;
  }
  if (integerColumns.has(column)) {
    // Intenta parsear entero
    const n = parseInt(v.replace(/[^\d-]/g, ""), 10);
    return Number.isFinite(n) ? n : null;
  }
  // Por defecto text
  return v;
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    // Verificamos tipo de evento (opcional)
    const eventType = payload?.eventType ?? payload?.event ?? "";
    // Aceptamos todo, pero normalmente será "FORM_RESPONSE" o "SUBMISSION_CREATED/COMPLETED" según Tally.
    const data = payload?.data ?? payload;

    // Construimos mapas para resolver IDs -> labels
    const maps = buildTallyMaps(data);

    // answers puede venir como data.answers o data.response.answers según el formato
    const answers =
      data?.answers ??
      data?.response?.answers ??
      [];

    // Generamos un objeto "row" con todas las columnas (inicialmente null)
    const row: Record<string, any> = {
      fecha_registro: new Date().toISOString(), // timestamp de recepción del webhook
      nombre_encuestador: null,
      nombre_encuestado: null,
      fecha: null,
      hora: null,
      sexo: null,
      edad: null,
      estado_civil: null,
      grupo: null,
      subgrupo: null,
      num_integrantes_familia: null,
      edad_0_10: null,
      edad_11_25: null,
      edad_26_50: null,
      edad_51_90: null,
      educacion_jefe_hogar: null,
      situacion_laboral_jefe_hogar: null,
      ingreso_mensual_jefe_hogar: null,
      tipo_hogar: null,
      conoce_desechos_solidos: null,
      cree_comportamiento_adecuado_manejo: null,
      separar_desechos_por_origen: null,
      clasificacion_correcta_desechos: null,
      comportamiento_comunidad_influye: null,
      dedica_tiempo_reducir_reutilizar_reciclar: null,
      desechos_solidos_problema_comunidad: null,
      preocupa_exceso_desechos: null,
      desechos_contaminan_ambiente: null,
      afecta_emocionalmente_noticias_contaminacion: null,
      frustracion_falta_acciones_ambientales: null,
      importancia_planeta_futuras_generaciones: null,
      consciente_impacto_desechos_salud: null,
      investiga_temas_ambientales: null,
      consecuencias_acumulacion_desechos: null,
      beneficios_reutilizar_residuo: null,
      falta_informacion_obstaculo_gestion: null,
      desechos_organicos_funcionalidad: null,
      acumulacion_desechos_afecta_salud: null,
      reduccion_reciclaje_reutilizacion_cuida_ambiente: null,
      transformacion_desechos_nuevos_productos: null,
      necesita_info_educacion_ambiental: null,
      practica_separacion_reciclaje_ingreso: null,
      desechos_hogar_reutilizados: null,
      manejo_adecuado_desechos_aporta_desarrollo: null,
      emprendimientos_reutilizacion_aportan_economia: null,
      manejo_adecuado_desechos_oportunidad_emprendimiento: null,
      reducir_residuos_eventos_concientizacion: null,
      participaria_talleres_buenas_practicas: null,
      manejo_adecuado_desechos_impacto_ambiente: null,
      dispuesto_participar_emprendimiento_desechos: null,
      participaria_feria_emprendimientos_desechos: null,
    };

    // Recorremos respuestas y volcamos a columnas
    for (const a of answers) {
      const fieldId = a?.field?.id ?? a?.fieldId ?? a?.field_id;
      const labelFromField = fieldId ? maps.fieldIdToLabel.get(fieldId) : null;
      const label = labelFromField ?? norm(a?.question ?? a?.label ?? "");

      if (!label) continue;

      const col = labelToColumn[label];
      if (!col) {
        // Pregunta no mapeada; ignoramos
        continue;
      }

      const valueText = answerToText(a, maps);
      row[col] = coerceToColumn(col, valueText);
    }

    // Inserción a Supabase
    const { data: inserted, error } = await supabase
      .from("Cuestionario_comportamiento_proambiental_autosustentabilidad")
      .insert(row)
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ ok: false, error: error.message, row }, { status: 500 });
    }

    return NextResponse.json({ ok: true, inserted }, { status: 200 });
  } catch (err: any) {
    console.error("Webhook error:", err);
    return NextResponse.json({ ok: false, error: err?.message ?? "Unknown error" }, { status: 400 });
  }
}

// Opcional: responde a GET para pruebas rápidas
export async function GET() {
  return NextResponse.json({ status: "Webhook OK" }, { status: 200 });
}

// Next.js runtime
export const runtime = "nodejs";
