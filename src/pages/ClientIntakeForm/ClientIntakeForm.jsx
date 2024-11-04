import IntakeForm from "../../assets/IntakeForm/IntakeForm";
import { clientIntakeFormConfig } from "./ClientIntakeFormConfig";

export default function ClientIntakeForm() {
  return (
    <div className="client-intake-form-page">
      <IntakeForm
        intakeFormConfig={clientIntakeFormConfig}
        formType={"client intake form"}
      />
    </div>
  );
}
