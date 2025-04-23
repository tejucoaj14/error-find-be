# 🛠️ Backend API – Node.js + MongoDB

This is the backend for a web app, built with **Node.js**, **Express**, and **MongoDB** using **Mongoose** ODM. It supports modular routes and live reload via **Nodemon**.

---

## ⚙️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **Nodemon** (dev-only)

---

## 📁 Project Structure
/app 
  └── index.js # Main page 
	└── /controllers # Handles the logic
	└── /middlewares # Handles auth
	└── /models # How data is stored in db
	└── /routes # Receives/Handles HTTP requests


## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone git remote add origin https://github.com/tejucoaj14/error-find-be.git
cd your-backend


### 2. Install dependencies
npm install

### 3. Create .env files

### 4. Start the server
npm run dev

### 5. Test
http://localhost:5000/api/games # GET Request