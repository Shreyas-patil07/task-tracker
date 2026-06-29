# 📋 Task Tracker — MERN Stack

A full-stack Task Tracker web application built with the MERN stack as part of a technical assignment for **Coll-Edge Connect**.

---

## 🔗 Links

| | URL |
|---|---|
| **Frontend (Live)** | _https://your-app.vercel.app_ |
| **Backend (Live)** | _https://your-backend.onrender.com_ |
| **GitHub Repo** | _https://github.com/your-username/task-tracker_ |

---

## ✅ Features

### Mandatory
- **CRUD Operations** — Create, view, update, and delete tasks
- **Form Validation** — Client-side validation with inline error messages
- **REST API** — Full RESTful backend with Express.js
- **MongoDB Integration** — Mongoose models with schema validation
- **Responsive UI** — Mobile-friendly layout with Tailwind CSS
- **Dynamic Updates** — No page refresh on any action

### Bonus
- 🔍 **Search** — Filter tasks by title or description in real-time
- 🎛️ **Filter** — Filter by status (Pending / Completed) and priority (High / Medium / Low)
- 🔃 **Sort** — Sort by newest, oldest, due date, priority, or title
- 🔔 **Toast Notifications** — Success and error feedback on every action
- ⏳ **Loading Spinner** — Shown while data is being fetched
- 📭 **Empty State** — Contextual empty state for no tasks and no filter matches
- ✅ **Status Toggle** — Mark tasks complete / reopen with one click
- ⚠️ **Overdue Detection** — Overdue tasks are visually highlighted
- 🌍 **Environment Variables** — `.env` for both client and server
- 🚀 **Deployment Ready** — `vercel.json`, `netlify.toml`, and `render.yaml` included

---

## 🗂️ Project Structure

```
task-tracker/
├── client/                   # React frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── vercel.json
│   └── netlify.toml
│
└── server/                   # Node.js + Express backend
    ├── config/
    │   └── db.js
    ├── controllers/
    │   └── taskController.js
    ├── middleware/
    │   └── errorMiddleware.js
    ├── models/
    │   └── Task.js
    ├── routes/
    │   └── taskRoutes.js
    ├── .env.example
    ├── render.yaml
    └── server.js
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS v4 |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| HTTP Client | Axios |
| Notifications | react-hot-toast |
| Deployment | Vercel (client), Render (server) |

---

## 🚀 Running Locally

### Prerequisites
- Node.js ≥ 18
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/task-tracker.git
cd task-tracker
```

### 2. Setup the server

```bash
cd server
cp .env.example .env
# Fill in your MONGO_URI in .env
npm install
npm run dev
```

### 3. Setup the client

```bash
cd client
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api (default, no change needed)
npm install
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/tasks` | Get all tasks |
| `POST` | `/api/tasks` | Create a new task |
| `GET` | `/api/tasks/:id` | Get a single task |
| `PUT` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

### Task Schema

```json
{
  "title":       "string (required, 3–100 chars)",
  "description": "string (optional, max 500 chars)",
  "priority":    "Low | Medium | High",
  "status":      "Pending | Completed",
  "dueDate":     "ISO date string (required)"
}
```

---

## ☁️ Deployment

### Frontend → Vercel

1. Push the repo to GitHub
2. Import the project on [vercel.com](https://vercel.com), set **Root Directory** to `client`
3. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com/api`
4. Deploy — `vercel.json` handles SPA routing automatically

### Backend → Render

1. Create a new **Web Service** on [render.com](https://render.com), point to the `server` folder
2. Set environment variables in the Render dashboard:
   - `MONGO_URI` — your MongoDB Atlas connection string
   - `ALLOWED_ORIGINS` — your deployed frontend URL (e.g. `https://your-app.vercel.app`)
3. Deploy — `render.yaml` is included for reference

---

## 📄 License

MIT
