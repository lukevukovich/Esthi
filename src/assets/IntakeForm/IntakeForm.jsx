import "./IntakeForm.css";
import "../../App.css";
import Header from "../Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faCloud,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveTreatmentRecord } from "../../utils/TreatmentRecordAPI";
import { checkSignInStatus } from "../../utils/Auth";

export default function IntakeForm({
  intakeFormConfig,
  formType,
  saveButton,
  viewOnly,
}) {
  const navigate = useNavigate();

  // States
  const [saving, setSaving] = useState(false);
  const [saveIcon, setSaveIcon] = useState(faCloud);
  const [saveText, setSaveText] = useState(`Save ${formType}`);
  const [signedIn, setSignedIn] = useState(false);
  const [lastClick, setLastClick] = useState(null);

  // Refs
  const form = useRef(null);
  const selectRef = useRef(null);
  const saveRef = useRef(null);

  // Handle sign in status
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

  // Submit form, save or AI chat
  async function handleSubmit(e) {
    e.preventDefault();

    if (lastClick === "ai") {
      await handleAI();
    } else if (lastClick === "save") {
      await handleSave();
    }

    setLastClick(null);
  }

  // Send form data to AI chat
  async function handleAI() {
    const allInputs = form.current.querySelectorAll("*");
    allInputs.forEach((input) => {
      if (input.disabled) {
        input.disabled = false;
      }
    });

    const formData = new FormData(form.current);

    let formText = `This is an esthetician ${formType}. Please provide any feedback, insight, and skincare suggestions based on the information provided.\n\n`;
    for (const [key, value] of formData.entries()) {
      if (value) {
        formText += `${key}: ${value}\n`;
      }
    }

    if (signedIn && saveButton && !viewOnly) {
      handleSave(false);
    }
    sessionStorage.setItem("intakeMessage", formText);
    navigate("/ai-chat");
  }

  // Save treatment record to database
  async function handleSave(navigateAfterSave) {
    const formData = new FormData(form.current);
    let data = { record: {} };

    intakeFormConfig.forEach((category) => {
      category.data.forEach((fieldConfig) => {
        const fieldName = fieldConfig.field;
        const labelName = fieldConfig.label;
        let fieldValue;
        if (fieldConfig.type === "checkbox") {
          fieldValue = formData.getAll(labelName);
        } else {
          fieldValue = formData.get(labelName);
        }

        if (
          fieldValue !== null &&
          fieldValue !== "" &&
          fieldValue.length !== 0
        ) {
          data.record[fieldName] = fieldValue;
        }
      });
    });

    try {
      if (navigateAfterSave !== false) {
        setSaving(true);
        await saveTreatmentRecord(data.record);
        setSaving(false);
        navigate("/profile");
      } else {
        saveTreatmentRecord(data.record);
      }
    } catch (error) {
      setSaving(false);
    }
  }

  // Set save button text and icon based on saving status
  useEffect(() => {
    if (saveButton) {
      if (saving) {
        setSaveIcon(faSpinner);
        setSaveText("Saving");
        saveRef.current.disabled = true;
        saveRef.current.style.paddingRight = "20px";
      } else {
        setSaveIcon(faCloud);
        setSaveText(`Save ${formType}`);
        saveRef.current.disabled = false;
        saveRef.current.style.paddingRight = "14px";
      }
    }
  }, [saving]);

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
                            id={field.field}
                            type={field.type}
                            name={field.label}
                            value={option}
                            required={field.required}
                            className={`${viewOnly ? "view-only" : ""}`}
                          />
                          <label>{option}</label>
                        </div>
                      ))
                    ) : field.type === "select" ? (
                      <select
                        id={field.field}
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
                        className={`${viewOnly ? "view-only" : ""}`}
                      >
                        <option value="" id={field.field}>{`${
                          viewOnly ? "" : "Select an Option"
                        }`}</option>
                        {field.options.map((option, optIndex) => (
                          <option
                            key={optIndex}
                            value={option}
                            id={field.field}
                          >
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
                        id={field.field}
                        className={`${viewOnly ? "view-only" : ""}`}
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
                  icon={saveIcon}
                  className={`button-icon ${saving ? "spinner" : ""}`}
                ></FontAwesomeIcon>
                {saveText}
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
