import { getFunctions, httpsCallable } from "firebase/functions";

// Function to save or delete a treatment record
export async function saveTreatmentRecord(record) {
  const functions = getFunctions();
  const saveRecipeFunction = httpsCallable(functions, "saveTreatmentRecord");

  try {
    await saveRecipeFunction({ record });
  } catch (error) {
    throw new Error(`Error saving treatment record: ${error.message}`);
  }
}

// Function to get all treatment records for a user
export async function getTreatmentRecords() {
  const functions = getFunctions();
  const getTreatmentRecordsFunction = httpsCallable(
    functions,
    "getTreatmentRecords"
  );

  try {
    const result = await getTreatmentRecordsFunction();
    return result.data.records;
  } catch (error) {
    return [];
  }
}
