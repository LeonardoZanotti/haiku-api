const PORT = process.env.PORT || 8000;
const express = require("express");
const { OpenAI } = require("openai");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => res.json("Welcome to my Haiku API"));

app.get("/haiku", async (req, res) => {
  console.log("Accessing OpenAI with API key: " + process.env.OPENAI_API_KEY);

  // const openAi = new OpenAI({
  //   apiKey: process.env.OPENAI_API_KEY,
  // });

  // try {
  //     const completion = await openAi.chat.completions.create({
  //         messages: [{ role: "system", content: "Write a haiku." }],
  //         model: "gpt-4"
  //     })
  //     console.log(completion)
  // } catch (err) { console.error(err) }

  const authHeaders = req.headers;

  if (authHeaders.secretKey !== "super-secret") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const completion = new Object({
    id: 1,
    choices: [
      {
        message: {
          role: "assistant",
          content: "this is the haiku",
        },
      },
    ],
  });

  res.json(completion.choices[0].message.content);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
