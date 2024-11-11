import "./Home.css";
import "../../App.css";
import Header from "../../assets/Header/Header";
import {
  faAlignLeft,
  faComments,
  faClipboard,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <Header />
      <div className="home-content">
        <h1 style={{ fontSize: "70px" }}>esthi.</h1>
        <span>AI-powered esthetician assistant</span>
        <button
          className="home-button"
          onClick={() => {
            navigate("/client-intake-form");
          }}
        >
          <FontAwesomeIcon icon={faAlignLeft} className="button-icon" />
          Client intake form
        </button>
        <button
          className="home-button"
          onClick={() => {
            navigate("/treatment-record");
          }}
        >
          <FontAwesomeIcon icon={faClipboard} className="button-icon" />
          Treatment record
        </button>
        <button
          className="home-button"
          onClick={() => {
            navigate("/ai-chat");
          }}
        >
          <FontAwesomeIcon icon={faComments} className="button-icon" />
          esthi AI chat
        </button>
        <button
          className="home-button"
          onClick={() => {
            navigate("/profile");
          }}
        >
          <FontAwesomeIcon icon={faUser} className="button-icon" />
          Profile
        </button>
      </div>
    </div>
  );
}
