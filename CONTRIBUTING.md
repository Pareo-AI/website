# Editing the Pareo Website

Anyone can edit the website directly from their browser — no local setup needed.

---

## Quick start (browser-based, recommended)

### 1. Open the editor

Go to the GitHub repo and click **Code → Codespaces → Create codespace on main**.

This opens a full VS Code editor in your browser. Wait ~60 seconds for it to finish setting up — the terminal will show when it's ready.

### 2. Start the preview

In the terminal at the bottom, run:

```
bun dev
```

A popup will appear: **Open in Browser**. Click it to see the live website. It updates automatically as you make changes.

### 3. Edit with AI

Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac) and search for **Claude**. You can describe what you want to change in plain English, e.g.:

> "Update the hero headline to say 'Compliance automation for the modern supply chain'"

> "Change the email address in the footer to hello@pareo.ai"

> "Add a new regulation pill called 'EU AI Act' to the regulations section"

Claude will make the changes and you'll see them live in the preview.

### 4. Save and deploy

When you're happy with your changes:

1. Click the **Source Control** icon in the left sidebar (looks like a branch)
2. Type a short description of what you changed (e.g. "Update hero headline")
3. Click **Commit & Push**

Vercel will automatically build and deploy your changes within ~2 minutes. You'll get a preview URL in the GitHub pull request, or the live site updates if you pushed directly to `main`.

---

## Key files

| File | What it controls |
|------|-----------------|
| `src/components/sections/Hero.tsx` | The top section with the main headline and CTA |
| `src/components/sections/Problem.tsx` | The "problem" scrolling section |
| `src/components/sections/HowItWorks.tsx` | The 4-tab "how it works" section |
| `src/components/sections/Benefits.tsx` | Stats and comparison table |
| `src/components/sections/Regulations.tsx` | The regulation pills grid |
| `src/components/sections/Security.tsx` | The 4 security badges |
| `src/components/sections/CTA.tsx` | The contact form at the bottom |
| `src/components/layout/Header.tsx` | Navigation bar |
| `src/components/layout/Footer.tsx` | Footer |
| `src/styles/globals.css` | Colors, fonts, global styles |

---

## Common changes

**Update a headline or body text** — open the relevant section file and find the text in quotes. Change it and save.

**Change a color** — edit `src/styles/globals.css`. The main purple is `--color-primary: #7B5CF5`. The background is `--color-background: #0A0A12`.

**Add a regulation pill** — open `src/components/sections/Regulations.tsx` and add a new entry to the `regulations` array at the top.

**Update the contact email** — search for the email address across the repo using `Ctrl+Shift+F`.

---

## Need help?

Ask Claude directly in the Codespace, or reach out to the engineering team.
