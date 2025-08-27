const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
//thats a coommmeeent

// Config
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Site title from env or default
const siteTitle = process.env.SITE_TITLE || "Azure Intern App";

// --- Simple JSON counter helpers ---
const COUNT_FILE = path.join(__dirname, "count.json");

async function readJSON(file, fallback = { count: 0 }) {
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === "ENOENT") {
      // create file with fallback
      await fs.writeFile(file, JSON.stringify(fallback, null, 2));
      return fallback;
    }
    console.error("Failed to read JSON:", err);
    return fallback;
  }
}

async function writeJSON(file, data) {
  await fs.writeFile(file, JSON.stringify(data, null, 2));
}

async function incrementCount() {
  const data = await readJSON(COUNT_FILE, { count: 0 });
  data.count = (data.count || 0) + 1;
  await writeJSON(COUNT_FILE, data);
  return data.count;
}

async function getCount() {
  const data = await readJSON(COUNT_FILE, { count: 0 });
  return data.count || 0;
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
  console.error(err);
  res.status(500).send("Something broke! Check server logs.");
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
