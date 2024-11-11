import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignLeft,
  faComments,
  faClipboard,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function Header() {
  const navigate = useNavigate();

  // Refs for navigation buttons
  const buttonRefs = {
    "/client-intake-form": useRef(null),
    "/treatment-record": useRef(null),
    "/ai-chat": useRef(null),
    "/profile": useRef(null),
  };

  // Handle current page styling
  useEffect(() => {
    for (const [key, button] of Object.entries(buttonRefs)) {
      if (button.current) {
        if (key === window.location.pathname) {
          button.current.classList.add("current-page");
        }
      }
    }
  }, []);

  return (
    <div className="header">
      <div className="header-box">
        <h1
          style={{ fontSize: "30px" }}
          onClick={() => {
            navigate("/");
          }}
        >
          esthi.
        </h1>
        <button
          onClick={() => {
            navigate("/client-intake-form");
          }}
          ref={buttonRefs["/client-intake-form"]}
        >
          <FontAwesomeIcon icon={faAlignLeft} width={"20px"} />
        </button>
        <button
          onClick={() => {
            navigate("/treatment-record");
          }}
          ref={buttonRefs["/treatment-record"]}
        >
          <FontAwesomeIcon icon={faClipboard} width={"20px"} />
        </button>
        <button
          onClick={() => {
            navigate("/ai-chat");
          }}
          ref={buttonRefs["/ai-chat"]}
        >
          <FontAwesomeIcon icon={faComments} width={"20px"} />
        </button>
        <button
          onClick={() => {
            navigate("/profile");
          }}
          ref={buttonRefs["/profile"]}
        >
          <FontAwesomeIcon icon={faUser} width={"20px"} />
        </button>
      </div>
    </div>
  );
}
