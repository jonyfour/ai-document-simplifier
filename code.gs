function simplifyText() {
  const SHEET_ID = "GOOGLE_SHEET_ID";
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) return; // no data

  const statusCell = sheet.getRange(lastRow, 8);
  const currentStatus = statusCell.getValue();

  // Prevent duplicate processing
  if (currentStatus === "DONE" || currentStatus === "PROCESSING") return;

  const originalText = sheet.getRange(lastRow, 1).getValue();
  if (!originalText) return;

  statusCell.setValue("PROCESSING");

  const apiKey = "YOUR_GROQ_API_KEY";

  const prompt = `
You are an assistant that simplifies complex documents.

Return ONLY valid JSON.
Do NOT add any text outside JSON.

JSON format:
{
  "plain_summary": "string",
  "key_risks": ["string", "string", "string"],
  "keywords": ["string", "string", "string", "string", "string"],
  "category": "string",
  "action": "string"
}

Rules:
- Use very simple English
- Clearly explain obligations and risks
- Be concise but helpful

Document:
${originalText}
`;

  try {
    const response = UrlFetchApp.fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "post",
        contentType: "application/json",
        headers: {
          Authorization: "Bearer " + apiKey
        },
        payload: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.3
        }),
        muteHttpExceptions: true
      }
    );

    const result = JSON.parse(response.getContentText());
    const aiText = result.choices[0].message.content.trim();

    const parsed = JSON.parse(aiText);

    sheet.getRange(lastRow, 2).setValue(parsed.plain_summary || "");
    sheet.getRange(lastRow, 3).setValue((parsed.key_risks || []).join("\n"));
    sheet.getRange(lastRow, 4).setValue((parsed.keywords || []).join(", "));
    sheet.getRange(lastRow, 5).setValue(new Date());
    sheet.getRange(lastRow, 6).setValue(parsed.category || "");
    sheet.getRange(lastRow, 7).setValue(parsed.action || "");
    statusCell.setValue("DONE");

  } catch (error) {
    Logger.log(error);
    statusCell.setValue("ERROR");
  }
}

// Wrapper for trigger
function autoRun() {
  simplifyText();
}
