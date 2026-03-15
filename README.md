# Agile Partners

Fintech solutions that power seamless digital payments.

## Setup

```bash
npm install --legacy-peer-deps
npm run dev
```

## Deploy to GitHub Pages

1. Create a new repository on GitHub named **Agile-Partners** (no other name — the site base path is set to `/Agile-Partners/`).

2. Add the remote and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/Agile-Partners.git
   git push -u origin main
   ```

3. Deploy the site to the `gh-pages` branch:
   ```bash
   npm run deploy
   ```

4. In GitHub: **Settings → Pages → Build and deployment → Source** → choose branch **gh-pages** and folder **/ (root)**. Save.

The site will be at: **https://YOUR_USERNAME.github.io/Agile-Partners/**
