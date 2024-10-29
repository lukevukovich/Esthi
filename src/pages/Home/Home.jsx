import "./Home.css";
import Header from "../../assets/Header/Header";
import {
  faAlignLeft,
  faComments,
  faClipboard,
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
          <FontAwesomeIcon icon={faAlignLeft} className="home-icon" />
          Client intake form
        </button>
        <button
          className="home-button"
          onClick={() => {
            navigate("/treatment-record");
          }}
        >
          <FontAwesomeIcon icon={faClipboard} className="home-icon" />
          Treatment record
        </button>
        <button
          className="home-button"
          onClick={() => {
            navigate("/ai-chat");
          }}
        >
          <FontAwesomeIcon icon={faComments} className="home-icon" />
          esthi AI chat
        </button>
      </div>
    </div>
  );
}
