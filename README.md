# Azure Intern App

Node.js + Express + EJS sample for Azure App Service deployment.

## Run Locally

```bash
npm install
npm start
# open http://localhost:3000
```

Environment variable used:
- `SITE_TITLE` — site header/title. Defaults to "Azure Intern App".

## Azure Notes

- App listens on `process.env.PORT` (required by Azure).
- `npm start` runs `node app.js`.
- CI/CD planned via GitHub Actions to a **staging** slot first.

## Task Phases Checklist

- [x] Phase 1 — App uses env var (`SITE_TITLE`), multiple pages, repo setup.
- [ ] Phase 2 — Create Resource Group, App Service Plan (S1+), Web App + Staging slot.
- [ ] Phase 3 — GitHub Actions workflow targeting **staging** slot on `main` push.
- [ ] Phase 4 — Slot settings, swap, custom domain + SSL, force HTTPS.
- [ ] Phase 5 — Enable Application Insights, view telemetry + error, cleanup RG.

_Last updated: 2025-08-23_
