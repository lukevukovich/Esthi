// Fields used for intake form
export const intakeFormFields = [
  {
    category: "General",
    data: [
      { field: "name", type: "text", label: "Name", required: true },
      { field: "dob", type: "date", label: "Date of Birth", required: false },
      { field: "phone", type: "tel", label: "Phone Number", required: false },
      { field: "email", type: "email", label: "Email", required: false },
    ],
  },

  {
    category: "Medical",
    data: [
      { field: "allergies", type: "text", label: "Allergies", required: false },
      {
        field: "medications",
        type: "text",
        label: "Medications",
        required: false,
      },
      {
        field: "medical conditions",
        type: "text",
        label: "Medical Conditions",
        required: false,
      },
    ],
  },

  {
    category: "Skincare",
    data: [
      { field: "skin type", type: "text", label: "Skin Type", required: true },
      {
        field: "skin concerns",
        type: "text",
        label: "Skin Concerns",
        required: false,
      },
      {
        field: "skin routine",
        type: "text",
        label: "Skin Routine",
        required: false,
      },
      {
        field: "treatment goals",
        type: "text",
        label: "Treatment Goals",
        required: false,
      },
      { field: "other", type: "text", label: "Other", required: false },
    ],
  },
];
