# 🧭 Task Tracker Backend API

A **Node.js + Express.js** backend for a **Task Management Application** with RESTful APIs, MongoDB integration, and smart task insights.

---

## 🚀 Features

* Full **CRUD operations** for tasks
* **Smart analytics** for productivity insights
* **MongoDB (Mongoose)** integration
* Secure **.env configuration**
* **Error handling** & **data validation**
* **CORS enabled** REST API

---

## 🛠 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose ODM)
* **Middleware:** CORS, dotenv
* **Deployment:** Render

---

## 📋 API Endpoints

### **Tasks**

| Method | Endpoint     | Description                      |
| ------ | ------------ | -------------------------------- |
| GET    | `/tasks`     | Get all tasks (filter supported) |
| GET    | `/tasks/:id` | Get task by ID                   |
| POST   | `/tasks`     | Create task                      |
| PATCH  | `/tasks/:id` | Update task                      |
| DELETE | `/tasks/:id` | Delete task                      |

### **Analytics**

| Method | Endpoint    | Description        |
| ------ | ----------- | ------------------ |
| GET    | `/insights` | Get task analytics |

### **System**

| Method | Endpoint  | Description  |
| ------ | --------- | ------------ |
| GET    | `/health` | Health check |
| GET    | `/`       | API info     |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repo

```bash
git clone <your-repo-url>
cd task-tracker-backend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment

Create `.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/tasktracker
PORT=3000
NODE_ENV=development
```

### 4️⃣ Start Server

```bash
npm run dev   # Development
npm start     # Production
```

Server runs at: **[http://localhost:3000](http://localhost:3000)**

---

## 📊 Example Request

### Create Task

```bash
curl -X POST http://localhost:3000/tasks \
-H "Content-Type: application/json" \
-d '{"title":"Complete project","priority":"High","status":"Open"}'
```

---

## 🗄 Task Schema

```js
{
  title: String,
  description: String,
  priority: ['Low','Medium','High'],
  due_date: Date,
  status: ['Open','In Progress','Done'],
  created_at: Date,
  updated_at: Date
}
```

---

## 🌐 Deployment (Render)

1. Connect GitHub repo → Render
2. Set environment variables
3. Build Command: `npm install`
4. Start Command: `npm start`
5. App auto-deploys 🎉

---

## 📞 Contact

**Developer:** Umer Faruque Syed

**Email:** [umarsyed082@gmail.com](umarsyed082@gmail.com)

**Live API:** [task-tracker-backend-umar.onrender.com](https://task-tracker-backend-umar.onrender.com)

**Frontend Repo:** [Task Tracker Frontend](https://github.com/umar710/task-tracker-Frontend-umar)

