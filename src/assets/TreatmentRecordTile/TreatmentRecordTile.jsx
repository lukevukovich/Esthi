import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./TreatmentRecordTile.css";
import {
  faUserTag,
  faCalendar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { saveTreatmentRecord } from "../../utils/TreatmentRecordAPI";
import { useNavigate } from "react-router-dom";

export default function TreatmentRecordTile({
  treatmentRecord,
  treatmentRecords,
  setTreatmentRecords,
  setAllTreatmentRecords,
}) {
  const navigate = useNavigate();

  function formatDate(date) {
    const [year, month, day] = date.split("-");
    const dateObj = new Date(year, month - 1, day); // Month is 0-indexed
    return dateObj.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
    });
  }

  function deleteRecord() {
    try {
      saveTreatmentRecord(treatmentRecord);
      const newRecords = treatmentRecords.filter(
        (record) => record.recordId !== treatmentRecord.recordId
      );
      setAllTreatmentRecords(newRecords);
      setTreatmentRecords(newRecords);
    } catch (error) {}
  }

  function clickRecord() {
    sessionStorage.setItem("treatmentRecord", JSON.stringify(treatmentRecord));
    navigate("/treatment-record");
  }

  return (
    <div
      className="treatment-record-tile"
      onClick={() => {
        clickRecord();
      }}
    >
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
        <button
          className="delete"
          onClick={(e) => {
            e.stopPropagation();
            deleteRecord();
          }}
        >
          <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
}
