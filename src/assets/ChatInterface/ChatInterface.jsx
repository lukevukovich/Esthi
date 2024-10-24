import { useEffect, useRef, useState } from "react";
import "./ChatInterface.css";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ChatInterface({
  chatList,
  message,
  setMessage,
  onSend,
}) {
  const inputRef = useRef(null);
  const sendRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (message) {
      sendRef.current.disabled = false;
      setEnabled(true);
    } else {
      sendRef.current.disabled = true;
      setEnabled(false);
    }
  }, [message]);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [chatList]);

  return (
    <div className="chat-interface">
      <div className="message-panel">
        <div className="message-list">
          {chatList.map((chat, index) => (
            <span key={index} className={`message ${chat.sender}`}>
              {chat.text}
            </span>
          ))}
        </div>
      </div>
      <div className="input-panel">
        <input
          value={message}
          ref={inputRef}
          placeholder="esthi AI chat"
          type="text"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && message) {
              onSend();
              inputRef.current.blur();
            }
          }}
        />
        <button
        className={enabled ? "enabled" : "disabled"}
          ref={sendRef}
          onClick={() => {
            if (message) {
              onSend();
              inputRef.current.blur();
            }
          }}
        >
          <FontAwesomeIcon icon={faPaperPlane} width={"20px"} />
        </button>
      </div>
    </div>
  );
}
