import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./TreatmentRecordTile.css";
import { faUserTag, faCalendar, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function TreatmentRecordTile({ treatmentRecord }) {
  function formatDate(date) {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
    });
  }

  return (
    <div className="treatment-record-tile">
      <span className="record-name">
        <FontAwesomeIcon
          icon={faUserTag}
          className="treatment-record-icon"
        ></FontAwesomeIcon>
        {treatmentRecord.name}
      </span>
      <div className="right">
        <span className="record-date">
          <FontAwesomeIcon
            icon={faCalendar}
            className="treatment-record-icon"
          ></FontAwesomeIcon>
          {formatDate(treatmentRecord.date)}
        </span>
        <button className="delete"><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>
      </div>
    </div>
  );
}
