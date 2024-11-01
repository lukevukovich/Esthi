import "./IntakeForm.css";
import Header from "../Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function IntakeForm({ intakeFormConfig, formType }) {
  const navigate = useNavigate();

  const form = useRef(null);
  const selectRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(form.current);

    let formText = `This is an esthetician ${formType}. Please provide any feedback, insight, and suggestions based on the information provided.\n\n`;
    for (const [key, value] of formData.entries()) {
      if (value) {
        formText += `${key}: ${value}\n`;
      }
    }

    sessionStorage.setItem("intakeMessage", formText);
    navigate("/ai-chat");
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header />
      <div className="intake-content">
        <form className="intake-form" ref={form} onSubmit={handleSubmit}>
          {intakeFormConfig.map((section, index) => (
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
                      <select
                        name={field.label}
                        required={field.required}
                        ref={selectRef}
                        onChange={(e) => {
                          if (e.target.value !== "") {
                            e.target.style.color = "black";
                          } else {
                            e.target.style.color = "gray";
                          }
                        }}
                      >
                        <option value="">Select an option</option>
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
                        placeholder={
                          `${field.label.includes("?") ? "" : "Enter "}` +
                          field.label
                        }
                        required={field.required}
                        max={field.max}
                        min={field.min}
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
