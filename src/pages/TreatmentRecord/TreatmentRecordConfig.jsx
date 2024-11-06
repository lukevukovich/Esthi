// Fields used for treatment record form
export const treatmentRecordConfig = [
  {
    category: "Treatment Record",
    data: [
      { field: "name", type: "text", label: "Client Name", required: true },
      { field: "date", type: "date", label: "Date", required: true },
      { field: "concerns", type: "text", label: "Concerns", required: false },
      {
        field: "desiredOutcome",
        type: "text",
        label: "Desired Outcome of Treatment",
        required: false,
      },
      {
        field: "medicalHistoryReviewed",
        type: "select",
        label: "Medical History Reviewed?",
        options: ["Yes", "No"],
        required: false,
      },
      {
        field: "informedConsentSigned",
        type: "select",
        label: "Informed Consent Signed?",
        options: ["Yes", "No"],
        required: false,
      },
      {
        field: "skinAnalysis",
        type: "text",
        label: "Skin Analysis",
        required: false,
      },
      {
        field: "servicesProvided",
        type: "text",
        label: "Service(s) Provided",
        required: false,
      },
      {
        field: "areasTreated",
        type: "checkbox",
        label: "Areas Treated",
        options: ["Face", "Neck", "Décolleté", "Body"],
        required: false,
      },
      { field: "cleanser", type: "text", label: "Cleanser", required: false },
      {
        field: "skinPrepToner",
        type: "text",
        label: "Skin Prep/Toner",
        required: false,
      },
      {
        field: "exfoliation",
        type: "checkbox",
        label: "Exfoliation",
        options: [
          "Scrub",
          "Dermaplaning",
          "Microdermabrasion",
          "Enzyme",
          "Peel",
        ],
        required: false,
      },
      {
        field: "exfoliationOther",
        type: "text",
        label: "Exfoliation Other",
        required: false,
      },
      { field: "details", type: "text", label: "Details", required: false },
      {
        field: "peelLayers",
        type: "text",
        label: "Peel - Number of Layers",
        required: false,
      },
      {
        field: "peelTime",
        type: "text",
        label: "Peel - Time",
        required: false,
      },
      {
        field: "heatLevel",
        type: "number",
        label: "Heat Level",
        required: false,
        max: 10,
        min: 1,
      },
      {
        field: "extractions",
        type: "select",
        label: "Extractions?",
        options: ["Yes", "No"],
        required: false,
      },
      {
        field: "extractionsDetails",
        type: "text",
        label: "Extractions Details",
        required: false,
      },
      {
        field: "mask",
        type: "select",
        label: "Mask?",
        options: ["Yes", "No"],
        required: false,
      },
      {
        field: "maskDetails",
        type: "text",
        label: "Mask Details",
        required: false,
      },
      {
        field: "otherModalities",
        type: "checkbox",
        label: "Other Modalities",
        options: [
          "Steam",
          "Clarisonic",
          "SkinScrubber",
          "MicroCurrent",
          "LED",
          "MicroNeedling",
          "HighFrequency",
          "Galvanic",
          "UltraSound",
          "Oxygen",
        ],
        required: false,
      },
      {
        field: "otherModalitiesOther",
        type: "text",
        label: "Other Modalities (Other)",
        required: false,
      },
      {
        field: "settingsDetails",
        type: "text",
        label: "Settings/Details",
        required: false,
      },
      { field: "serums", type: "text", label: "Serum(s)", required: false },
      { field: "eyeCream", type: "text", label: "Eye Cream", required: false },
      {
        field: "moisturizer",
        type: "text",
        label: "Moisturizer",
        required: false,
      },
      { field: "spf", type: "text", label: "SPF", required: false },
      { field: "notes", type: "text", label: "Notes", required: false },
      {
        field: "productsRecommended",
        type: "text",
        label: "Products Recommended",
        required: false,
      },
      {
        field: "productsPurchased",
        type: "text",
        label: "Products Purchased",
        required: false,
      },
    ],
  },

  {
    category: "Next Treatment",
    data: [
      {
        field: "nextTreatment",
        type: "text",
        label: "Next Treatment",
        required: false,
      },
      {
        field: "nextTreatmentDate",
        type: "date",
        label: "Next Treatment Date",
        required: false,
      },
      {
        field: "followUpDate",
        type: "date",
        label: "Follow Up Date",
        required: false,
      },
      { field: "result", type: "text", label: "Result", required: false },
    ],
  },
];
