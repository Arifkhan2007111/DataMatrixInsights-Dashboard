const express = require("express");
const cors = require("cors");
const xlsx = require("xlsx");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Path to Excel file
const filePath = path.join(__dirname, "users.xlsx");

// Function to read users from Excel
const readUsers = () => {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const users = xlsx.utils.sheet_to_json(sheet);
  return users;
};

// ✅ Login route
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  // Normalize Excel keys (to make case-insensitive match)
  const foundUser = users.find(
    (u) =>
      (u.UserName?.toString().trim().toLowerCase() === username.toLowerCase()) &&
      (u.Password?.toString().trim() === password)
  );

  if (foundUser) {
    res.status(200).json({ success: true, message: "Login successful!" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
