# 📝 Kanban Board – MERN Stack Project  

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)  
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)  
![Express](https://img.shields.io/badge/API-Express-lightgrey?logo=express)  
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen?logo=mongodb)  
![Render](https://img.shields.io/badge/Hosting-Render-purple?logo=render)  

A full-stack **Kanban board** inspired by Trello. Built with **React, Node.js, Express, and MongoDB**.  
Supports **user authentication, CRUD tasks, and drag-and-drop board management**.  

---

## 🚀 Features  

- 🔐 **Authentication** – Secure login & registration with JWT  
- 🗂 **Task Management** – Create, update, delete tasks with title, description, deadline, and status  
- 📌 **Kanban Board** – Drag-and-drop tasks between columns (To Do, In Progress, Done)  
- 👥 **Multiple Projects** – (Planned) Manage multiple boards per user  
- ⚡ **Real-Time Updates** – (Planned) Live task syncing across users with Socket.IO  
- 💬 **Chat** – (Planned) Real-time chat per project  

---

## 🛠 Tech Stack  

**Frontend**  
- React (Vite)  
- TailwindCSS  
- dnd-kit (Drag & Drop)  
- Axios  
- React Router  

**Backend**  
- Node.js  
- Express  
- MongoDB (Mongoose)  
- JWT Authentication  
- Socket.IO  

**Deployment**  
- Render (Backend + serving frontend)  
- MongoDB Atlas (Database)  

---

## 📂 Project Structure  

```
project-root/
│
├── backend/              # Express + MongoDB API
│   ├── models/           # Mongoose schemas (User, Task, etc.)
│   ├── routes/           # Express routes (auth, tasks, etc.)
│   ├── middleware/       # Auth middleware
│   ├── server.js         # App entry point
│   └── package.json
│
├── frontend/             # React (Vite) app
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Login, Register, Dashboard
│   │   ├── context/      # AuthContext, TaskContext
│   │   └── App.jsx
│   └── package.json
│
└── README.md             # This file
```

---

## ⚙️ Setup Instructions  

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Zodiac968/hobby-productivity.git
cd <your-repo>
```

### 2️⃣ Setup environment variables  

Create a `.env` file inside `backend/` with:  

```env
PORT=5000
MONGO_URI=<your-mongodb-atlas-uri>
JWT_SECRET=<your-secret-key>
```

### 3️⃣ Install dependencies  

**Backend**  
```bash
cd backend
npm install
```

**Frontend**  
```bash
cd ../frontend
npm install
```

### 4️⃣ Run locally  

Backend:  
```bash
cd backend
npm run dev
```

Frontend:  
```bash
cd frontend
npm run dev
```

- Backend → `http://localhost:5000`  
- Frontend → `http://localhost:5173`  

---

## 🌐 Deployment (Render + MongoDB Atlas)  

- Push code to GitHub  
- Create a **Web Service** on [Render](https://render.com)  
  - Root Directory: `backend`  
  - Build Command:  
    ```bash
    npm install && cd ../frontend && npm install && npm run build
    ```  
  - Start Command:  
    ```bash
    node server.js
    ```  
- Add environment variables in Render Dashboard (`PORT`, `MONGO_URI`, `JWT_SECRET`)  

---

## 📌 API Endpoints  

### Auth  
- `POST /api/auth/register` → Register user  
- `POST /api/auth/login` → Login user  
- `GET /api/auth/check` → Validate token  

### Tasks  
- `GET /api/tasks` → Fetch all tasks  
- `POST /api/tasks` → Create new task  
- `PUT /api/tasks/:id` → Update task  
- `DELETE /api/tasks/:id` → Delete task  

---

## 🎨 Screenshots  

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3b249d65-cc57-459a-84b7-4e8d01efebf6" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0da5bbdc-fd18-4b5d-baea-3c368aeca016" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/7983ea61-66aa-4eee-af11-1a1feb9267a4" />
<img width="1920" height="1080" alt="Screenshot (59)" src="https://github.com/user-attachments/assets/f541e5b9-ce83-4f28-ac4e-acb8de101006" />

![20250908-0946-42 3761874](https://github.com/user-attachments/assets/70906be8-aeb8-4761-91a7-ab6ff525342d)

---

## ✅ Roadmap  

- [x] User authentication  
- [x] CRUD tasks  
- [x] Kanban board with drag & drop  
- [ ] Multiple project boards per user  
- [ ] Real-time updates with Socket.IO  
- [ ] Chat per project  

---

