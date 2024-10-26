const axios = require("axios");
//const admin = require("firebase-admin");
const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");

//admin.initializeApp();
const CHATGPT_API_KEY = defineSecret("CHATGPT_API_KEY");
const CHATGPT_URL = "https://api.openai.com/v1/chat/completions";

// Cloud function to handle ChatGPT chat messages
exports.chatWithGPT = onRequest(
  { cors: true, secrets: [CHATGPT_API_KEY] },
  async (req, res) => {
    try {
      // Get the Edamam API credentials
      const apiKey = await CHATGPT_API_KEY.value();

      // Extract user message from the request body
      const { messages } = req.body;

      // Configure the OpenAI API request
      const response = await axios.post(
        CHATGPT_URL,
        {
          model: "gpt-3.5-turbo",
          messages: messages,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      // Extract GPT's reply from the response data
      const gptReply = response.data.choices[0].message.content;

      // Respond with the API data
      res.status(200).json({ reply: gptReply });
    } catch (error) {
      console.error("Error fetching ChatGPT reply:", error);
      res.status(500).json({ error: "Error fetching ChatGPT reply" });
    }
  }
);
