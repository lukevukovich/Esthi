import "./IntakeForm.css";
import Header from "../../assets/Header/Header";
import { intakeFormFields } from "../../utils/IntakeFormFields";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function IntakeForm() {
  const navigate = useNavigate();

  const form = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(form.current);

    let formText =
      "This is an esthetician client intake form. Please provide any feedback, insight, and suggestions based on the information provided.\n\n";
    for (const [key, value] of formData.entries()) {
      if (value) {
        formText += `${key}: ${value}\n`;
      }
    }

    sessionStorage.setItem("clientIntakeMessage", formText);
    navigate("/chat");
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="intake-page">
      <Header />
      <div className="intake-content">
        <form className="intake-form" ref={form} onSubmit={handleSubmit}>
          {intakeFormFields.map((section, index) => (
            <div key={index} className="intake-section">
              <label className="section-label">{section.category}</label>
              {section.data.map((field, index) => (
                <div key={index} className="intake-field">
                  <label className="field-label">{field.label}</label>
                  <div className="options-container">
                    {field.type === "checkbox" || field.type === "radio" ? (
                      field.options.map((option, optIndex) => (
                        <div key={optIndex} className="option-item">
                          <input
                            type={field.type}
                            name={field.label}
                            value={option}
                            required={field.required}
                          />
                          <label>{option}</label>
                        </div>
                      ))
                    ) : field.type === "select" ? (
                      <select name={field.label} required={field.required}>
                        <option value="" className="select-default">{`Select ${field.label}`}</option>
                        {field.options.map((option, optIndex) => (
                          <option key={optIndex} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        name={field.label}
                        placeholder={"Enter " + field.label}
                        required={field.required}
                      />
                    )}
                  </div>
                </div>
              ))}
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
