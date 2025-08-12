import express from "express";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(express.json());

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Webhook que recibe datos desde Tally
app.post("/webhook", async (req, res) => {
  try {
    const data = req.body; // JSON enviado por Tally

    // Inserta en la tabla
    const { error } = await supabase
      .from("Cuestionario_comportamiento_proambiental_autosustentabilidad")
      .insert([{
        "Nombre del encuestador": data["Nombre del encuestador"],
        "Nombre del encuestado": data["Nombre del encuestado"],
        "Fecha": data["Fecha"],
        "Hora": data["Hora"],
        "Sexo": data["Sexo"],
        "Edad": parseInt(data["Edad"]),
        "Estado civil": data["Estado civil"],
        "Grupo": data["Grupo"],
        "Subgrupo": data["Subgrupo"],
        "Número de integrantes en la familia": parseInt(data["Número de integrantes en la familia"]),
        "0 - 10 años": parseInt(data["0 - 10 años"]),
        "11 - 25 años": parseInt(data["11 - 25 años"]),
        "26 - 50 años": parseInt(data["26 - 50 años"]),
        "51 - 90 años": parseInt(data["51 - 90 años"]),
        "Nivel de educación del jefe del hogar": data["Nivel de educación del jefe del hogar"],
        "Situación laboral del jefe del hogar": data["Situación laboral del jefe del hogar"],
        "Ingreso estimado mensual del jefe del hogar": data["Ingreso estimado mensual del jefe del hogar"],
        "Tipo de hogar": data["Tipo de hogar"],

        // El resto de preguntas
        "¿Conoce lo que son los desechos sólidos domiciliarios?": data["¿Conoce lo que son los desechos sólidos domiciliarios?"],
        "¿Cree usted que existe un comportamiento adecuado en el manejo de los desechos sólidos domiciliarios en la comunidad?": data["¿Cree usted que existe un comportamiento adecuado en el manejo de los desechos sólidos domiciliarios en la comunidad?"],
        "¿Se debe separar los desechos sólidos según su origen?": data["¿Se debe separar los desechos sólidos según su origen?"],
        "¿Es importante la correcta clasificación de los desechos sólidos orgánicos e inorgánicos en el hogar?": data["¿Es importante la correcta clasificación de los desechos sólidos orgánicos e inorgánicos en el hogar?"],
        "¿Cree que el comportamiento de la comunidad influye en la acumulación de desechos?": data["¿Cree que el comportamiento de la comunidad influye en la acumulación de desechos?"],
        "¿Dedica tiempo para reducir, reutilizar o reciclar?": data["¿Dedica tiempo para reducir, reutilizar o reciclar?"],
        "¿Los desechos sólidos son un gran problema para su comunidad?": data["¿Los desechos sólidos son un gran problema para su comunidad?"],
        "¿Le preocupa el exceso de desechos sólidos domiciliarios?": data["¿Le preocupa el exceso de desechos sólidos domiciliarios?"],
        "¿Considera que los desechos contaminan el ambiente?": data["¿Considera que los desechos contaminan el ambiente?"],
        "¿Le afecta emocionalmente cuando escucha noticias sobre la contaminación?": data["¿Le afecta emocionalmente cuando escucha noticias sobre la contaminación?"],
        "¿Siente frustración debido a la falta de acciones ambientales?": data["¿Siente frustración debido a la falta de acciones ambientales?"],
        "¿Considera importante pensar en el tipo de planeta que dejamos a futuras generaciones?": data["¿Considera importante pensar en el tipo de planeta que dejamos a futuras generaciones?"],
        "¿Es consciente del impacto de los desechos sólidos en la salud y el ambiente?": data["¿Es consciente del impacto de los desechos sólidos en la salud y el ambiente?"],
        "¿Investiga frecuentemente acerca de temas medio ambientales?": data["¿Investiga frecuentemente acerca de temas medio ambientales?"],
        "¿Conoce las consecuencias de la acumulación de los desechos sólidos domiciliarios?": data["¿Conoce las consecuencias de la acumulación de los desechos sólidos domiciliarios?"],
        "¿Conoce los beneficios de reutilizar un residuo domiciliario?": data["¿Conoce los beneficios de reutilizar un residuo domiciliario?"],
        "¿La falta de información es un obstáculo para la correcta gestión de los residuos sólidos domiciliarios?": data["¿La falta de información es un obstáculo para la correcta gestión de los residuos sólidos domiciliarios?"],
        "¿Los desechos orgánicos generados en el hogar pueden tener otra funcionalidad?": data["¿Los desechos orgánicos generados en el hogar pueden tener otra funcionalidad?"],
        "¿La acumulación de desechos afectan a la salud de la población?": data["¿La acumulación de desechos afectan a la salud de la población?"],
        "¿La reducción, reciclaje y la reutilización de los desechos sólidos puede cuidar al medio ambiente y a la vida silvestre?": data["¿La reducción, reciclaje y la reutilización de los desechos sólidos puede cuidar al medio ambiente y a la vida silvestre?"],
        "¿Cree que la transformación de desechos sólidos en nuevos productos puede contribuir significativamente a la reducción de la generación de desechos?": data["¿Cree que la transformación de desechos sólidos en nuevos productos puede contribuir significativamente a la reducción de la generación de desechos?"],
        "¿Necesita más información acerca de educación ambiental?": data["¿Necesita más información acerca de educación ambiental?"],
        "¿En su hogar practica la separación de los desechos para el reciclaje y le representa algún ingreso?": data["¿En su hogar practica la separación de los desechos para el reciclaje y le representa algún ingreso?"],
        "¿Los desechos sólidos generados en el hogar pueden ser reutilizados para una nueva función o creación de un producto?": data["¿Los desechos sólidos generados en el hogar pueden ser reutilizados para una nueva función o creación de un producto?"],
        "¿Cree que el manejo adecuado de los desechos sólidos domiciliarios podría aportar al desarrollo económico comunitario?": data["¿Cree que el manejo adecuado de los desechos sólidos domiciliarios podría aportar al desarrollo económico comunitario?"],
        "¿Los emprendimientos en base a la reutilización de los desechos aporta a su economía?": data["¿Los emprendimientos en base a la reutilización de los desechos aporta a su economía?"],
        "¿El manejo adecuado de los desechos sólidos domiciliarios ofrece oportunidades para el emprendimiento?": data["¿El manejo adecuado de los desechos sólidos domiciliarios ofrece oportunidades para el emprendimiento?"],
        "¿Es posible reducir la generación de residuos sólidos domiciliarios por medio de eventos de concientización?": data["¿Es posible reducir la generación de residuos sólidos domiciliarios por medio de eventos de concientización?"],
        "¿Participaría en talleres de buenas prácticas y capacitaciones para el correcto manejo de los desechos sólidos domiciliarios?": data["¿Participaría en talleres de buenas prácticas y capacitaciones para el correcto manejo de los desechos sólidos domiciliarios?"],
        "¿El manejo adecuado de los desechos sólidos domiciliarios puede tener un impacto significativo al medio ambiente?": data["¿El manejo adecuado de los desechos sólidos domiciliarios puede tener un impacto significativo al medio ambiente?"],
        "¿Está dispuesto a participar en un emprendimiento en base al uso de los desechos sólidos?": data["¿Está dispuesto a participar en un emprendimiento en base al uso de los desechos sólidos?"],
        "¿Participaría a una feria de emprendimientos comunitarios en base a desechos domiciliarios reutilizados?": data["¿Participaría a una feria de emprendimientos comunitarios en base a desechos domiciliarios reutilizados?"]
      }]);

    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al insertar datos", error });
    }

    res.status(200).json({ message: "Datos insertados correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno", err });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor corriendo en el puerto", process.env.PORT || 3000);
});
