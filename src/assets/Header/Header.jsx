import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignLeft,
  faComments,
  faClipboard,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

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
        >
          <FontAwesomeIcon icon={faAlignLeft} width={"20px"} />
        </button>
        <button
          onClick={() => {
            navigate("/treatment-record");
          }}
        >
          <FontAwesomeIcon icon={faClipboard} width={"20px"} />
        </button>
        <button
          onClick={() => {
            navigate("/ai-chat");
          }}
        >
          <FontAwesomeIcon icon={faComments} width={"20px"} />
        </button>
        <button
          onClick={() => {
            navigate("/profile");
          }}
        >
          <FontAwesomeIcon icon={faUser} width={"20px"} />
        </button>
      </div>
    </div>
  );
}
