# 🚀 Portfolio — React + Tailwind + Zustand / Node.js + Express

Stack complète portfolio avec frontend React et backend Express.js.

---

## 📁 Structure du projet

```
portfolio/
├── backend/          ← API Express.js
│   ├── server.js
│   ├── routes/
│   │   ├── projects.js
│   │   ├── skills.js
│   │   └── contact.js
│   ├── data/
│   │   ├── projects.js
│   │   └── skills.js
│   ├── .env.example
│   └── package.json
│
└── frontend/         ← React + Tailwind + Zustand
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── ProjectCard.jsx
    │   │   └── SkillBar.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Projects.jsx
    │   │   └── Contact.jsx
    │   ├── store/
    │   │   └── portfolioStore.js  ← Zustand
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

---

## ⚙️ Installation

### Prérequis
- Node.js **v18 ou v20 LTS** (recommandé)
- npm v9+

### 1. Backend (Express.js)

```bash
cd backend
npm install

# Copie et configure le fichier .env
cp .env.example .env
# Édite .env avec ton email Gmail et ton App Password

# Démarrer en développement
npm run dev

# API disponible sur http://localhost:5000
```

### 2. Frontend (React + Tailwind + Zustand)

```bash
cd frontend
npm install

# Démarrer en développement
npm run dev

# App disponible sur http://localhost:5173
```

> Le proxy Vite redirige `/api` vers `http://localhost:5000` automatiquement.

---

## 🔌 API Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/health` | Status de l'API |
| GET | `/api/projects` | Tous les projets |
| GET | `/api/projects?featured=true` | Projets mis en avant |
| GET | `/api/projects/:id` | Un projet par ID |
| GET | `/api/skills` | Toutes les compétences |
| POST | `/api/contact` | Envoyer un message |

### Body POST /api/contact
```json
{
  "name": "Ton Nom",
  "email": "ton@email.com",
  "message": "Ton message ici..."
}
```

---

## 📦 Tech Stack

### Frontend
- **React 18** — UI
- **Vite** — Build tool ultra rapide
- **Tailwind CSS 3** — Styles utilitaires
- **Zustand** — State management global
- **React Router v6** — Navigation
- **Axios** — Requêtes HTTP

### Backend
- **Node.js 20 LTS**
- **Express.js** — Framework web
- **Helmet** — Sécurité HTTP headers
- **CORS** — Cross-origin resource sharing
- **express-rate-limit** — Protection anti-spam
- **Nodemailer** — Envoi d'emails
- **dotenv** — Variables d'environnement

---

## 📧 Configuration Email (Gmail)

1. Active la validation en 2 étapes sur ton compte Google
2. Va dans **Paramètres Google → Sécurité → Mots de passe des applications**
3. Génère un mot de passe pour "Mail"
4. Mets-le dans `.env` comme `EMAIL_PASS`

---

## 🚀 Déploiement

### Backend → Railway / Render
```bash
# Ajoute les variables d'env dans le dashboard Railway/Render
PORT=5000
EMAIL_USER=...
EMAIL_PASS=...
EMAIL_TO=...
FRONTEND_URL=https://ton-portfolio.vercel.app
```

### Frontend → Vercel
```bash
npm run build
# Deploy le dossier dist/ sur Vercel
# Ajoute VITE_API_URL=https://ton-backend.railway.app dans les env vars
```

---

## 🎨 Personnalisation

- **Projets** → Modifie `backend/data/projects.js`
- **Compétences** → Modifie `backend/data/skills.js`
- **Couleur accent** → Change `accent: "#7f6aff"` dans `tailwind.config.js`
- **Infos perso** → Mets à jour Footer.jsx et Contact.jsx
