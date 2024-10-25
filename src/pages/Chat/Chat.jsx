import "./Chat.css";
import ChatInterface from "../../assets/ChatInterface/ChatInterface";
import Header from "../../assets/Header/Header";
import { useState } from "react";
import { getChatGPTReply } from "../../utils/ChatGPT";

export default function Chat() {
  //Chat list for sender/receiver
  const [chatList, setChatList] = useState([
    {
      text: "Welcome to esthi AI chat! How can I help you today?",
      sender: "peer",
    },
  ]);

  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Send message to chatbot, get reply, and update chat list
  async function onSend() {
    let newChatList = [...chatList];
    const userChat = { text: message, sender: "user" };
    newChatList = [...newChatList, userChat];
    setChatList(newChatList);
    setMessage("");

    setIsTyping(true);
    const aiReply = await getChatGPTReply(message);
    const peerChat = { text: aiReply, sender: "peer" };
    newChatList = [...newChatList, peerChat];
    setChatList(newChatList);
    setIsTyping(false);
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
