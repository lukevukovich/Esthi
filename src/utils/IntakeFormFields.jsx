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
      {
        field: "skin type",
        type: "select",
        label: "Skin Type",
        required: true,
        options: ["Oily", "Dry", "Combination", "Sensitive"],
      },
      {
        field: "skin concerns",
        type: "checkbox",
        label: "Skin Concerns",
        required: false,
        options: [
          "Acne",
          "Acne Scarring",
          "Age Spots",
          "Blackheads",
          "Body Acne",
          "Broken Blood Vessels",
          "Bumps on back of arms",
          "Cellulite",
          "Cysts/Nodules",
          "Dehydrated Skin",
          "Dull Complexion",
          "Excessive Facial Hair",
          "Facial Veins",
          "Fine Lines/Wrinkles",
          "Frequent Breakouts",
          "Large Pores",
          "Loss of Lashes/Brows",
          "Melasma/Brown Spots/Patches",
          "Oily Skin",
          "Redness",
          "Rough/Uneven Skin Texture",
          "Rosacea",
          "Sagging Skin",
          "Sun Damage",
          "Under Eye Puffiness/Dark Circles",
          "Other",
        ],
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
