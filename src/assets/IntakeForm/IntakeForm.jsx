import "./IntakeForm.css";
import "../../App.css";
import Header from "../Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faCloud } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveTreatmentRecord } from "../../utils/TreatmentRecordAPI";
import { checkSignInStatus } from "../../utils/Auth";

export default function IntakeForm({ intakeFormConfig, formType, saveButton }) {
  const navigate = useNavigate();

  const form = useRef(null);
  const selectRef = useRef(null);
  const saveRef = useRef(null);

  const [signedIn, setSignedIn] = useState(false);
  const [lastClick, setLastClick] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    if (lastClick === "ai") {
      handleAI();
    } else if (lastClick === "save") {
      handleSave();
    }

    setLastClick(null);
  }

  function handleAI() {
    const formData = new FormData(form.current);

    let formText = `This is an esthetician ${formType}. Please provide any feedback, insight, and suggestions based on the information provided.\n\n`;
    for (const [key, value] of formData.entries()) {
      if (value) {
        formText += `${key}: ${value}\n`;
      }
    }

    if (signedIn) {
      handleSave();
    }
    sessionStorage.setItem("intakeMessage", formText);
    navigate("/ai-chat");
  }

  function handleSave() {
    const formData = new FormData(form.current);
    let data = { record: {} };

    intakeFormConfig.forEach((category) => {
      category.data.forEach((fieldConfig) => {
        const fieldName = fieldConfig.field;
        const labelName = fieldConfig.label;
        let fieldValue = formData.get(labelName);

        if (fieldValue !== null && fieldValue !== "") {
          data.record[fieldName] = fieldValue;
        }
      });
    });

    try {
      saveTreatmentRecord(data.record);
      alert(
        `${
          formType.charAt(0).toUpperCase() + formType.slice(1)
        } successfully saved.`
      );
    } catch (error) {
      alert(`Error saving ${formType}. Please try again.`);
    }
  }

  async function handleSignInLoad() {
    const { isSignedIn } = await checkSignInStatus();

    if (isSignedIn) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }

  useEffect(() => {
    if (signedIn && saveButton && saveRef.current) {
      saveRef.current.style.display = "flex";
    }
  }, [signedIn]);

  useEffect(() => {
    window.scrollTo(0, 0);
    handleSignInLoad();
  }, []);

  return (
    <div className="intake">
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
          <div className="buttons">
            <button
              onClick={() => {
                setLastClick("ai");
              }}
            >
              <FontAwesomeIcon icon={faComments} className="button-icon" />
              Submit to esthi AI chat
            </button>
            {saveButton ? (
              <button
                className="save-button"
                ref={saveRef}
                onClick={() => {
                  setLastClick("save");
                }}
              >
                <FontAwesomeIcon
                  icon={faCloud}
                  className="button-icon"
                ></FontAwesomeIcon>
                Save {formType}
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
