import "./Home.css";
import Header from "../../assets/Header/Header";
import { faAlignLeft, faComments } from "@fortawesome/free-solid-svg-icons";
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
            navigate("/intake");
          }}
        >
          <FontAwesomeIcon icon={faAlignLeft} className="home-icon" />
          Client intake form
        </button>
        <button
          className="home-button"
          onClick={() => {
            navigate("/chat");
          }}
        >
          <FontAwesomeIcon icon={faComments} className="home-icon" />
          esthi AI chat
        </button>
      </div>
    </div>
  );
}
