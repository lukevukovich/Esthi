import "./Chat.css";
import ChatInterface from "../../assets/ChatInterface/ChatInterface";
import Header from "../../assets/Header/Header";
import { useEffect, useState } from "react";
import { getChatGPTReply } from "../../utils/ChatGPT";

export default function Chat() {
  //Chat list for sender/receiver
  const [chatList, setChatList] = useState([
    {
      text: "Welcome to esthi AI chat! How can I help you today?",
      sender: "peer",
    },
  ]);

  const chatHistoryLength = 10;

  // Single session chat history for the esthetician
  const [chatHistory, setChatHistory] = useState([
    {
      role: "system",
      content:
        "You are a world-renowned esthetician with extensive expertise in skincare, skin conditions, treatment techniques, and product ingredients. Your audience consists of trained estheticians seeking advanced insights, professional guidance, and recommendations to refine their practice. Provide detailed, accurate answers that reflect current best practices in the field of esthetics.",
    },
  ]);

  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Handle intake form submission, send to chatbot
  async function handleIntakeFormSubmit() {
    setChatList([
      {
        text: "Welcome to esthi AI chat! How can I help you today?",
        sender: "peer",
      },
    ]);

    const intakeMessage = sessionStorage.getItem("intakeMessage");
    if (intakeMessage) {
      await onSend(intakeMessage);
      sessionStorage.removeItem("intakeMessage");
    }
  }

  useEffect(() => {
    handleIntakeFormSubmit();
  }, []);

  // Send message to chatbot, get reply, and update chat list
  async function onSend(intakeMessage) {
    // User message
    let newChatList = [...chatList];
    let newChatHistory = [...chatHistory];

    const userChat = { text: intakeMessage || message, sender: "user" };
    const userChatHistory = { role: "user", content: intakeMessage || message };

    newChatList = [...newChatList, userChat];
    newChatHistory = [...newChatHistory, userChatHistory];

    setChatList(newChatList);
    setChatHistory(newChatHistory);
    setMessage("");

    // AI reply
    setIsTyping(true);
    const aiReply = await getChatGPTReply(newChatHistory);
    const peerChat = { text: aiReply, sender: "peer" };
    const assistantChatHistory = { role: "assistant", content: aiReply };

    newChatList = [...newChatList, peerChat];
    newChatHistory = [...newChatHistory, assistantChatHistory];

    setChatList(newChatList);
    setIsTyping(false);

    if (newChatHistory.length > chatHistoryLength + 1) {
      newChatHistory.splice(1, 2);
    }
    setChatHistory(newChatHistory);
  }

  return (
    <div className="chat-page">
      <Header />
      <ChatInterface
        chatList={chatList}
        message={message}
        setMessage={setMessage}
        onSend={onSend}
        isTyping={isTyping}
      />
    </div>
  );
}
