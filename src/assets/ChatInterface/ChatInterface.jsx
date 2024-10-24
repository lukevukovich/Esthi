import { useEffect } from "react";
import "./ChatInterface.css";

export default function ChatInterface({
  chatList,
  message,
  setMessage,
  onSend,
}) {
  // Scroll to the bottom of the chat list
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [chatList]);

  return (
    <div className="chat-interface">
      <div className="message-panel">
        <div className="message-list">
          {chatList.map((chat, index) => (
            <div key={index} className={`message ${chat.sender}`}>
              {chat.text}
            </div>
          ))}
        </div>
      </div>
      <div className="input-panel">
        <input
          value={message}
          type="text"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && message) {
              onSend();
            }
          }}
        />
        <button
          onClick={() => {
            if (message) {
              onSend();
            }
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
