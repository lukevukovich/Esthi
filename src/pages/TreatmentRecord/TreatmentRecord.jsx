import { useEffect, useState } from "react";
import IntakeForm from "../../assets/IntakeForm/IntakeForm";
import { treatmentRecordConfig } from "./TreatmentRecordConfig";

export default function TreatmentRecord() {
  const [viewOnly, setViewOnly] = useState(false);

  // Load treatment record data into form if present in session storage
  useEffect(() => {
    const treatmentRecord = JSON.parse(
      sessionStorage.getItem("treatmentRecord")
    );

    if (treatmentRecord) {
      setViewOnly(true);

      treatmentRecordConfig.forEach((category) => {
        category.data.forEach((fieldConfig) => {
          const field = fieldConfig.field;
          const fieldName = fieldConfig.label;
          const fieldValue = treatmentRecord[field];

          const element = document.getElementById(field);

          if (element) {
            element.placeholder = "";

            if (Array.isArray(fieldValue)) {
              fieldValue.forEach(() => {
                const checkbox = document.querySelectorAll(
                  `input[name="${fieldName}"]`
                );
                if (checkbox.length > 0) {
                  checkbox.forEach((box) => {
                    if (fieldValue.includes(box.value)) {
                      box.checked = true;
                    }
                  });
                }
              });
            } else {
              if (fieldValue) {
                element.value = fieldValue;
              }
            }
          }
        });
      });

      const intakeForms = document.getElementsByClassName("intake-form");
      for (let i = 0; i < intakeForms.length; i++) {
        const intakeForm = intakeForms[i];
        const allDescendants = intakeForm.getElementsByTagName("*");

        for (let j = 0; j < allDescendants.length; j++) {
          const descendant = allDescendants[j];
          if (descendant.tagName !== "BUTTON") {
            descendant.disabled = true;
          }
        }
      }

      sessionStorage.removeItem("treatmentRecord");
    }
  }, []);
  return (
    <div className="treatment-record-page">
      <IntakeForm
        intakeFormConfig={treatmentRecordConfig}
        formType={"treatment record"}
        saveButton={!viewOnly}
        viewOnly={viewOnly}
      />
    </div>
  );
}
