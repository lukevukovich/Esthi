const CHAT_WITH_GPT_API = "https://chatwithgpt-xhhcyiga7q-uc.a.run.app";

// Fetch a reply from ChatGPT
export async function getChatGPTReply(chatHistory) {
  const response = await fetch(CHAT_WITH_GPT_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages: chatHistory }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch ChatGPT reply");
  }

  const data = await response.json();
  return data.reply;
}
