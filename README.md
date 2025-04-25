# Post-Comment App

A full‑stack blog and comment demo built with React (frontend) and JSON‑Server (backend). Users can sign up, log in, create posts, view authors, and add comments to individual posts.

---

## 📋 Prerequisites

- **Node.js & npm** installed on your machine.
- **Git** installed for version control.

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/rayne-dev/Post-Comment.git
   cd Post-Comment
   ```

2. **Backend (JSON‑Server)**
   ```bash
   cd backend
   npm install
   npm start      # Runs JSON‑Server at http://localhost:3001
   ```

3. **Frontend (React App)**
   ```bash
   cd frontend
   npm install
   npm start      # Opens React development server at http://localhost:3000
   ```

---

## 🎯 Usage

1. Visit **http://localhost:3000** in your browser.
2. **Signup** for a new account or **Login** if you already have one.
3. Create, edit, and delete **posts**.
4. View **authors** and their posts.
5. Click into a post’s detail page to **add comments** specific to that post.
6. You can only edit/delete your own posts and comments.

---

## 📁 Project Structure

```
Post-Comment/
├─ backend/          # JSON‑Server data and config
│  ├─ db.json        # Sample data: posts, users, comments
│  └─ package.json   # Backend dependencies & start script
│
├─ frontend/         # React application
│  ├─ src/
│  └─ public/
│  └─ package.json   # Frontend dependencies & start script
│
└─ README.md         # This file
```

---

## ⚙️ .gitignore

Place a file named `.gitignore` in the **root** of the repository (next to `README.md`) with the following:

```
# Node modules
/backend/node_modules
/frontend/node_modules

# React build output
/frontend/build

# macOS
.DS_Store
```

You can create this file either in VSCode (Right‑click → New File → name `.gitignore`) or directly on GitHub (Actions → _Add file_ → _Create new file_, then name it `.gitignore`).

---

## 📝 License

This project is open‑source under the MIT License. Feel free to clone, modify, and experiment!

