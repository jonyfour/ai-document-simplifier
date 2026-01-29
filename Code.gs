function simplifyText() {
  // 1️⃣ Open the Google Sheet
  const sheet = SpreadsheetApp
    .openById("GOOGLE_SHEET_URL")
    .getSheets()[0];

  // 2️⃣ Get the last row
  const lastRow = sheet.getLastRow();

  // 3️⃣ Skip if already processed
  const alreadyProcessed = sheet.getRange(lastRow, 2).getValue();
  if (alreadyProcessed) return;

  // 4️⃣ Get the input text
  const originalText = sheet.getRange(lastRow, 1).getValue();
  if (!originalText) return;

  // 5️⃣ Groq API key
  const apiKey = "YOUR_GROQ_API_KEY";

  // 6️⃣ Prompt for Groq AI
  const prompt = `
You are an assistant that simplifies complex documents.

Return ONLY valid JSON.
Do NOT add any text outside JSON.

The JSON structure MUST be exactly this:

{
  "plain_summary": "string",
  "key_risks": ["string", "string", "string"],
  "keywords": ["string", "string", "string", "string", "string"]
}

Rules:
- Use very simple English
- Explain obligations and risks clearly
- If something is unclear, still make a reasonable summary

Document:
${originalText}
`;

  // 7️⃣ Make API call
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

  // 8️⃣ Parse AI response safely
  const result = JSON.parse(response.getContentText());
  const aiText = result.choices[0].message.content.trim();

  let parsed;
  try {
    parsed = JSON.parse(aiText);
  } catch (e) {
    Logger.log("JSON parse error:");
    Logger.log(aiText);
    return;
  }

  // 9️⃣ Write results to Google Sheet
  sheet.getRange(lastRow, 2).setValue(parsed.plain_summary || "");
  sheet.getRange(lastRow, 3).setValue((parsed.key_risks || []).join("\n"));
  sheet.getRange(lastRow, 4).setValue((parsed.keywords || []).join(", "));
  sheet.getRange(lastRow, 5).setValue(new Date());
}
