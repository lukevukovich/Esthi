import { useEffect, useRef, useState } from "react";
import "./ChatInterface.css";
import "../../App.css";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { marked } from "marked";

export default function ChatInterface({
  chatList,
  message,
  setMessage,
  onSend,
  isTyping,
}) {
  // States
  const [enabled, setEnabled] = useState(false);

  // Refs
  const inputRef = useRef(null);
  const sendRef = useRef(null);
  const messagesRef = useRef(null);

  // Handle send button enable/disable
  useEffect(() => {
    if (message) {
      sendRef.current.disabled = false;
      setEnabled(true);
    } else {
      sendRef.current.disabled = true;
      setEnabled(false);
    }
  }, [message]);

  // Scroll to bottom of chat on new message
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [chatList]);

  // Disable input when AI is typing
  useEffect(() => {
    if (isTyping) {
      inputRef.current.disabled = true;
    } else {
      inputRef.current.disabled = false;
    }
  }, [isTyping]);

  return (
    <div className="chat-interface">
      <div className="message-panel">
        <div className="message-list" ref={messagesRef}>
          {chatList.map((chat, index) =>
            chat.sender === "peer" ? (
              <span
                dangerouslySetInnerHTML={{ __html: marked(chat.text) }}
                key={index}
                className={`message ${chat.sender}`}
              ></span>
            ) : (
              <span key={index} className={`message ${chat.sender}`}>
                {chat.text}
              </span>
            )
          )}
          <span
            className={`message peer ${isTyping ? "typing" : "not-typing"}`}
          >
            esthi AI is typing{" "}
            <FontAwesomeIcon className="spinner" icon={faSpinner} />
          </span>
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
          onKeyDown={async (e) => {
            if (e.key === "Enter" && message) {
              await onSend();
              inputRef.current.blur();
            }
          }}
        />
        <button
          className={enabled ? "enabled" : "disabled"}
          ref={sendRef}
          onClick={async () => {
            if (message) {
              await onSend();
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
