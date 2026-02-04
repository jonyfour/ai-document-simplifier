# 🤖 AI Document Simplifier & Knowledge Logger

An AI-powered Google Sheets automation that transforms complex documents into clear, plain-English summaries.  
Built with Google Apps Script and Groq LLM, this system runs automatically and logs structured insights for future reference.

---

## 🚀 What This Project Does

- Takes complex legal, technical, or long-form text
- Converts it into simple English
- Extracts key risks and obligations
- Generates keywords for search and categorization
- Assigns category and suggested action
- Logs everything automatically with timestamps
- Runs hands-free every 5 minutes

This project demonstrates real-world AI automation, not just prompt usage.

---

## ⚙️ How It Works

1. User pastes text into Column A in Google Sheets
2. A time-based trigger runs every 5 minutes
3. The script detects unprocessed rows
4. Text is sent to Groq LLM via API
5. Structured JSON output is parsed
6. Results are written back into the sheet
7. Status is updated to prevent duplicates

---

## 📊 Sheet Structure

| Column | Description |
|------|------------|
| A | Original document text |
| B | Plain English summary |
| C | Key risks / obligations |
| D | Keywords |
| E | Date processed |
| F | Category |
| G | Action |
| H | Status (PENDING / PROCESSING / DONE / ERROR) |

---

## 🔁 Automation

- Runs automatically every 5 minutes
- No manual execution required
- Prevents duplicate processing
- Designed for stability and low API usage

---

## 🛠 Tech Stack

- Google Apps Script
- Google Sheets
- Groq LLM API (LLaMA 3.1)
- JSON-based AI output parsing

---

## 📸 Screenshots

- Document input
- AI-generated output
- Apps Script logic

(See images in this repository)

---

## 💡 Use Cases

- Legal document simplification
- Contract review
- Internal knowledge logging
- Research summarization
- Compliance and risk overview

---

## 📌 Notes

This project is intended as a portfolio demonstration of AI automation and workflow design.  
It can be extended with batch processing, notifications, or external integrations.

---

## 👤 Author

Built by an AI automation learner focused on practical, production-ready workflows.
