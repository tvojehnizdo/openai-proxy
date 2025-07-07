import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

// načti .env
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// endpoint pro AI obrázky
app.post("/api/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "512x512",
    });

    const imageUrl = response.data.data[0].url;
    res.json({ imageUrl });
  } catch (error) {
    console.error("Chyba při volání OpenAI:", error.message);
    res.status(500).json({ error: "Nepodařilo se vytvořit obrázek" });
  }
});

// spuštění
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`✅ Proxy server běží na http://localhost:${port}`);
});
