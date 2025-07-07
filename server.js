const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

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
    console.error("❌ Chyba při generování obrázku:", error.message);
    res.status(500).json({ error: "Nepodařilo se vygenerovat obrázek" });
  }
});

// 🚀 Spuštění serveru
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`✅ OpenAI proxy běží na portu ${port}`);
});
