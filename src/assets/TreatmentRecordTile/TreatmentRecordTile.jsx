import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./TreatmentRecordTile.css";
import {
  faUserTag,
  faCalendar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { saveTreatmentRecord } from "../../utils/TreatmentRecordAPI";

export default function TreatmentRecordTile({
  treatmentRecord,
  treatmentRecords,
  setTreatmentRecords,
}) {
  function formatDate(date) {
    const [year, month, day] = date.split("-");
    const dateObj = new Date(year, month - 1, day); // Month is 0-indexed
    return dateObj.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
    });
  }

  async function deleteRecord() {
    try {
      await saveTreatmentRecord(treatmentRecord);
      const newRecords = treatmentRecords.filter(
        (record) => record.recordId !== treatmentRecord.recordId
      );
      setTreatmentRecords(newRecords);
      alert("Treatment record successfully deleted.");
    } catch (error) {
      alert("Error deleting treatment record. Please try again.");
    }
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
        <button
          className="delete"
          onClick={() => {
            deleteRecord();
          }}
        >
          <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
}
