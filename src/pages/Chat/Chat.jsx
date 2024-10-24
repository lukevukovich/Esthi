import "./Chat.css";
import ChatInterface from "../../assets/ChatInterface/ChatInterface";
import { useState } from "react";

export default function Chat() {
  //Chat list for sender/receiver
  const [chatList, setChatList] = useState([]);

  const [message, setMessage] = useState("");

  function onSend() {
    let newChatList = [...chatList];
    const userChat = { text: message, sender: "user" };
    newChatList = [...chatList, userChat];
    setMessage("");

    const peerChat = { text: "Hello", sender: "peer" };
    newChatList = [...newChatList, peerChat];

    setChatList(newChatList);
  }

  return (
    <div className="chat-page">
      <ChatInterface
        chatList={chatList}
        message={message}
        setMessage={setMessage}
        onSend={onSend}
      />
    </div>
  );
}
