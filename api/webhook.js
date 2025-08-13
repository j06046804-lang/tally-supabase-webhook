import express from "express";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(express.json({ type: "*/*" })); // asegura parsear JSON

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Mapea cada "key" de Tally -> nombre EXACTO de columna en Supabase
const KEY_TO_COLUMN = {
  // Datos personales
  "question_bebVgZ": "Nombre del encuestador",
  "question_Ap1Paz": "Nombre del encuestado",
  "question_BpM46K": "Fecha",
  "question_xDOxor": "Hora",
  "question_ZOq5go": "Sexo",
  "question_kGMage": "Edad",
  "question_vDojgD": "Estado civil",
  "question_LKR1Vp": "Grupo",
  "question_po8x5B": "Subgrupo",
  "question_KxdQOV": "Número de integrantes en la familia",
  "question_0edMp0": "0 - 10 años",
  "question_z7jza8": "11 - 25 años",
  "question_5ZbkyP": "26 - 50 años",
  "question_d9EA5y": "51 - 90 años",

  // Jefe del hogar
  "question_MaoKPA": "Nivel de educación del jefe del hogar",
  "question_Jl5KGR": "Situación laboral del jefe del hogar",
  "question_gqKjg4": "Ingreso estimado mensual del jefe del hogar",
  "question_y4VZgx": "Tipo de hogar",

  // Preguntas (nota: algunos labels de Tally no coinciden; aquí forzamos al nombre de la columna)
  "question_XoZl9Y": "¿Conoce lo que son los desechos sólidos domiciliarios?",
  "question_8L7o2P": "¿Cree usted que existe un comportamiento adecuado en el manejo de los desechos sólidos domiciliarios en la comunidad?",
  "question_08NrGj": "¿Se debe separar los desechos sólidos según su origen?",
  "question_zMPXg0": "¿Es importante la correcta clasificación de los desechos sólidos orgánicos e inorgánicos en el hogar?",
  "question_59WKrE": "¿Cree que el comportamiento de la comunidad influye en la acumulación de desechos?",
  "question_d0BqgK": "¿Dedica tiempo para reducir, reutilizar o reciclar?",
  "question_YGNDeJ": "¿Los desechos sólidos son un gran problema para su comunidad?",
  "question_Dpg2bZ": "¿Le preocupa el exceso de desechos sólidos domiciliarios?",
  "question_lOJDgv": "¿Considera que los desechos contaminan el ambiente?",
  "question_RoEK2j": "¿Le afecta emocionalmente cuando escucha noticias sobre la contaminación?",
  "question_oRX6gx": "¿Siente frustración debido a la falta de acciones ambientales?",
  "question_Gp8vkk": "¿Considera importante pensar en el tipo de planeta que dejamos a futuras generaciones?",
  "question_OXO1rg": "¿Es consciente del impacto de los desechos sólidos en la salud y el ambiente?",
  "question_VP2Eqy": "¿Investiga frecuentemente acerca de temas medio ambientales?",
  "question_P9Vj4e": "¿Conoce las consecuencias de la acumulación de los desechos sólidos domiciliarios?",
  "question_ElyzAr": "¿Conoce los beneficios de reutilizar un residuo domiciliario?",
  "question_rOzygR": "¿La falta de información es un obstáculo para la correcta gestión de los residuos sólidos domiciliarios?",
  "question_47eXEY": "¿Los desechos orgánicos generados en el hogar pueden tener otra funcionalidad?",
  "question_jo1Dg4": "¿La acumulación de desechos afectan a la salud de la población?",
  "question_2AQ8V9": "¿La reducción, reciclaje y la reutilización de los desechos sólidos puede cuidar al medio ambiente y a la vida silvestre?",
  "question_xDOxg5": "¿Cree que la transformación de desechos sólidos en nuevos productos puede contribuir significativamente a la reducción de la generación de desechos?",
  "question_RoEK29": "¿Necesita más información acerca de educación ambiental?",
  "question_oRX6gP": "¿En su hogar practica la separación de los desechos para el reciclaje y le representa algún ingreso?",
  "question_Gp8vkZ": "¿Los desechos sólidos generados en el hogar pueden ser reutilizados para una nueva función o creación de un producto?",
  "question_OXO1rR": "¿Cree que el manejo adecuado de los desechos sólidos domiciliarios podría aportar al desarrollo económico comunitario?",
  "question_VP2Eqg": "¿Los emprendimientos en base a la reutilización de los desechos aporta a su economía?",
  "question_P9Vj4V": "¿El manejo adecuado de los desechos sólidos domiciliarios ofrece oportunidades para el emprendimiento?",
  "question_ElyzA4": "¿Es posible reducir la generación de residuos sólidos domiciliarios por medio de eventos de concientización?",
  "question_rOzygN": "¿Participaría en talleres de buenas prácticas y capacitaciones para el correcto manejo de los desechos sólidos domiciliarios?",
  "question_47eXqX": "¿El manejo adecuado de los desechos sólidos domiciliarios puede tener un impacto significativo al medio ambiente?",
  "question_jo1Dpa": "¿Está dispuesto a participar en un emprendimiento en base al uso de los desechos sólidos?",
  "question_2AQ8Zj": "¿Participaría a una feria de emprendimientos comunitarios en base a desechos domiciliarios reutilizados?"
};

// Convierte MULTIPLE_CHOICE de IDs -> texto(s)
function toTextFromOptions(field) {
  if (!field) return null;
  // Si no hay opciones o el value no es array, devolvemos tal cual
  if (!Array.isArray(field.value)) return field.value ?? null;
  if (!Array.isArray(field.options)) return field.value.join(", ");

  const texts = field.value
    .map((id) => field.options.find((o) => o.id === id)?.text)
    .filter(Boolean);

  // Si no encontró textos, devuelve IDs; si sí, devuelve textos unidos
  return texts.length ? texts.join(", ") : field.value.join(", ");
}

// Normaliza hora a HH:MM:SS
function normalizeTime(val) {
  if (!val || typeof val !== "string") return val ?? null;
  // "12:14" -> "12:14:00"
  if (/^\d{2}:\d{2}$/.test(val)) return `${val}:00`;
  return val;
}

app.get("/", (_req, res) => {
  res.send("OK");
});

app.post("/webhook/tally", async (req, res) => {
  try {
    const payload = req.body;

    // Seguridad opcional: valida que venga de Tally (puedes agregar un header secreto)
    // if (req.headers['x-tally-signature'] !== process.env.TALLY_SECRET) { ... }

    const fields = payload?.data?.fields || [];
    const row = {};

    for (const f of fields) {
      const column = KEY_TO_COLUMN[f.key];
      if (!column) continue; // ignorar campos no mapeados

      let value = null;
      switch (f.type) {
        case "MULTIPLE_CHOICE":
          value = toTextFromOptions(f);
          break;
        case "INPUT_TIME":
          value = normalizeTime(f.value);
          break;
        default:
          value = f.value ?? null;
      }

      row[column] = value;
    }

    // Insertar en Supabase
    const { data, error } = await supabase
      .from("Cuestionario_comportamiento_proambiental_autosustentabilidad")
      .insert([row]);

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({ ok: false, error });
    }

    return res.status(200).json({ ok: true, inserted: data });
  } catch (e) {
    console.error("Webhook error:", e);
    return res.status(500).json({ ok: false, error: e?.message || "Error" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on :${PORT}`);
});
