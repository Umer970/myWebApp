console.log('=== APP STARTING ===');
console.log('Current directory:', __dirname);
console.log('Port:', process.env.PORT);
console.log('Node version:', process.version);
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// Config
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Site title from env or default
const siteTitle = process.env.SITE_TITLE || "Azure Intern App";

// --- Simple in-memory counter (Azure compatible) ---
let visitCount = 0;

async function incrementCount() {
  visitCount++;
  return visitCount;
}

async function getCount() {
  return visitCount;
}

// --- Routes ---

// Home: increment count on each visit
app.get("/", async (req, res, next) => {
  try {
    const count = await incrementCount();
    res.render("index", { title: siteTitle, pageName: "Home", count });
  } catch (e) {
    next(e);
  }
});

// About: show current count without increment
app.get("/about", async (req, res, next) => {
  try {
    const count = await getCount();
    res.render("about", { title: siteTitle, pageName: "About", count });
  } catch (e) {
    next(e);
  }
});

// 404
app.use((req, res) => {
  res.status(404).render("404", { title: siteTitle, pageName: "404" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("ERROR:", err);
  res.status(500).send("Something broke! Check server logs.");
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});