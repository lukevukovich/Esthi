const axios = require("axios");
const admin = require("firebase-admin");
const { onRequest, onCall } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");

admin.initializeApp();
const db = admin.firestore();

const CHATGPT_API_KEY = defineSecret("CHATGPT_API_KEY");
const CHATGPT_URL = "https://api.openai.com/v1/chat/completions";
const TREATMENT_RECORD_COLLECTION = "treatmentRecords";

// Cloud function to handle ChatGPT chat messages
exports.chatWithGPT = onRequest(
  { cors: true, secrets: [CHATGPT_API_KEY] },
  async (req, res) => {
    try {
      // Get the Edamam API credentials
      const apiKey = await CHATGPT_API_KEY.value();

      // Extract user message from the request body
      const { messages } = req.body;

      // Configure the OpenAI API request
      const response = await axios.post(
        CHATGPT_URL,
        {
          model: "gpt-3.5-turbo",
          messages: messages,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      // Extract GPT's reply from the response data
      const gptReply = response.data.choices[0].message.content;

      // Respond with the API data
      res.status(200).json({ reply: gptReply });
    } catch (error) {
      console.error("Error fetching ChatGPT reply:", error);
      res.status(500).json({ error: "Error fetching ChatGPT reply" });
    }
  }
);

// Cloud function to save or delete a treatment record
exports.saveTreatmentRecord = onCall(async (request) => {
  // Check if the user is authenticated
  if (!request.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be authenticated to save or delete a treatment record."
    );
  }

  // Get the user ID and record data from the request
  const userId = request.auth.uid;
  const record = request.data.record;

  // Validate input data
  if (!record) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Missing treatment record."
    );
  }

  // Check if this is a new record or an existing one to delete
  const recordId = record.recordId;

  try {
    if (recordId) {
      // Existing record: Try to delete it
      const docRef = db.collection(TREATMENT_RECORD_COLLECTION).doc(recordId);
      const docSnapshot = await docRef.get();

      if (docSnapshot.exists && docSnapshot.data().userId === userId) {
        // Document exists and belongs to the user, so delete it
        await docRef.delete();
        return {
          success: true,
          message: "Treatment record deleted successfully.",
        };
      } else {
        // Document does not exist or does not belong to this user
        throw new functions.https.HttpsError(
          "not-found",
          "No matching treatment record found to delete."
        );
      }
    } else {
      // New record: Firestore will generate a unique ID
      const newDocRef = db.collection(TREATMENT_RECORD_COLLECTION).doc();

      // Save the new document
      await newDocRef.set({
        record: record,
        userId: userId,
        recordId: newDocRef.id,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return { success: true, message: "Treatment record saved successfully." };
    }
  } catch (error) {
    console.error("Error saving/deleting treatment record:", error);
    throw new functions.https.HttpsError(
      "internal",
      "An error occurred while saving/deleting the treatment record."
    );
  }
});

// Cloud function to fetch all treatment records for a user
exports.getTreatmentRecords = onCall(async (request) => {
  // Check if the user is authenticated
  if (!request.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be authenticated to fetch treatment records."
    );
  }

  // Get the user ID from the request
  const userId = request.auth.uid;

  try {
    // Query the treatment records collection
    const querySnapshot = await db
      .collection(TREATMENT_RECORD_COLLECTION)
      .where("userId", "==", userId)
      .get();

    // Extract records from the query snapshot
    const records = querySnapshot.docs.map((doc) => {
      return { recordId: doc.id, ...doc.data().record };
    });

    return { records };
  } catch (error) {
    console.error("Error fetching treatment records:", error);
    throw new functions.https.HttpsError(
      "internal",
      "An error occurred while fetching treatment records."
    );
  }
});
