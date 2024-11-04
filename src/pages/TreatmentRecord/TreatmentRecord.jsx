import IntakeForm from "../../assets/IntakeForm/IntakeForm";
import { treatmentRecordConfig } from "./TreatmentRecordConfig";

export default function TreatmentRecord() {
  return (
    <div className="treatment-record-page">
      <IntakeForm
        intakeFormConfig={treatmentRecordConfig}
        formType={"treatment record"}
      />
    </div>
  );
}
