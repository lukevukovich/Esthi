import "./IntakeForm.css";
import Header from "../../assets/Header/Header";
import { intakeFormFields } from "../../utils/IntakeFormFields";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

export default function IntakeForm() {
  return (
    <div className="intake-page">
      <Header />
      <div className="intake-content">
        <form className="intake-form">
          {intakeFormFields.map((field, index) => (
            <div key={index} className="intake-field">
              <label>{field.label}</label>
              <input
                type={field.type}
                placeholder={"Enter " + field.label}
                required={field.required}
              />
            </div>
          ))}
          <button>
            <FontAwesomeIcon icon={faComments} className="intake-icon" />
            Submit to esthi AI chat
          </button>
        </form>
      </div>
    </div>
  );
}
