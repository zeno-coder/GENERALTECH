const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});
// Ping route
app.get("/ping", (req, res) => {
  res.send("Server is alive ✅");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
