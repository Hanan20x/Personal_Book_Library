# 📚 Personal Book Library (MEVN Stack)

A modern **Single Page Application (SPA)** built to manage a personal reading collection. This project demonstrates full-stack web development using the MEVN stack (MongoDB/Local JSON, Express.js, Vue.js, Node.js).

> **Course**: Software Construction  
> **Lecturer**: Dr. Adila Firdaus  

---

## 👥 Team Members

| Name | Matric No |
|------|-----------|
| MUSTAFA TARIG ABDELWAHID ALI | A22EC0022 |
| WANG YAPENG | A21EC4035 |
| AHMED MUSTAFA MOHAMED IBRAHIM | A22EC9148 |
| HANAN OSAMA HUSSEIN SALAH | A22EC4042 |
| RAGHAD ZEINALABDIN TAHA OSMAN | A22EC9002 |

---

## 🛠️ Tech Stack

| Layer     | Technology                         |
|-----------|------------------------------------|
| Frontend  | **Vue 3** + **Vite** + CSS3        |
| Backend   | **Node.js** + **Express.js**       |
| Database  | Local JSON Data Store              |
| API       | Open Library API (external)        |

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js v18+  
- npm v9+  

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/Personal_Book_Library.git
cd Personal_Book_Library
```

### 2. Setup the Backend (Express.js Framework)

```bash
cd backend
npm install
npm start
```

The backend server will start at: **http://localhost:3000**

### 3. Setup the Frontend (Vue 3 + Vite Framework)

Open a **new terminal**:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at: **http://localhost:5173**

---

## 🌐 Five (5) Functionalities

| # | Feature | Description |
|---|---------|-------------|
| 1 | **Search External Database** | Search for real-world books using the public Open Library API |
| 2 | **View Book Details** | View rich details including cover images, titles, authors, and year |
| 3 | **Add to Library** | Save a book to your personal backend database |
| 4 | **Update Status** | Mark a saved book as "Finished" or "Reading" |
| 5 | **Delete Book** | Remove a book entirely from your collection |

---

## 🔗 RESTful Web Services

This application exposes a RESTful API following REST architectural principles:
- **Stateless**: Each request contains all the information needed
- **Resource-based URLs**: Endpoints identify resources, not actions
- **HTTP verbs**: GET for retrieval, POST for creation, PUT for updates, DELETE for removal
- **JSON responses**: All responses are JSON formatted

### ⭐ RESTful Web Service #1 — Search External API

**Endpoint**: `GET /api/books/search?q={query}`

```http
GET http://localhost:3000/api/books/search?q=Harry%20Potter
```

**Response (200 OK)**:
```json
[
  {
    "id": "OL82563W",
    "title": "Harry Potter and the Philosopher's Stone",
    "author": "J.K. Rowling",
    "coverUrl": "https://covers.openlibrary.org/b/id/10521270-M.jpg",
    "year": 1997
  }
]
```

---

### ⭐ RESTful Web Service #2 — Manage Personal Collection

**Endpoint**: `POST /api/mybooks`

```http
POST http://localhost:3000/api/mybooks
Content-Type: application/json

{
  "id": "OL82563W",
  "title": "Harry Potter and the Philosopher's Stone",
  "author": "J.K. Rowling",
  "coverUrl": "https://covers.openlibrary.org/b/id/10521270-M.jpg",
  "year": 1997
}
```

**Response (201 Created)**:
```json
{
  "id": "OL82563W",
  "title": "Harry Potter and the Philosopher's Stone",
  "author": "J.K. Rowling",
  "coverUrl": "https://covers.openlibrary.org/b/id/10521270-M.jpg",
  "year": 1997,
  "status": "reading"
}
```

---

## 📁 Project Structure

```
Personal_Book_Library/
├── backend/                        # Express.js REST API
│   ├── server.js                   # Server entry point + REST endpoints
│   ├── data.json                   # Local Database
│   └── package.json
│
└── frontend/                       # Vue 3 + Vite SPA
    ├── index.html
    ├── src/
    │   ├── main.js                 # Vue app entry point
    │   ├── App.vue                 # Root Vue component
    │   ├── router/                 # Vue Router (SPA navigation)
    │   ├── style.css               # Dynamic global styling
    │   ├── components/             
    │   │   └── BookCard.vue        # Reusable UI component
    │   └── views/                  
    │       ├── HomeView.vue        # Functionality 1 & 2
    │       └── MyBooksView.vue     # Functionality 3, 4, 5
    └── package.json
```

---

## 🎬 Video Demo Outline (< 2 minutes)

1. **Framework Setup** [0:00–0:20] — Show `npm start` (Backend) and `npm run dev` (Frontend) starting successfully.
2. **RESTful Web Services** [0:20–0:50] — Mention that your frontend strictly separates from your Express backend. Show the `server.js` file briefly to highlight the `app.get()` and `app.post()` endpoints.
3. **Live Demo** [0:50–1:55] — Open `http://localhost:5173`. Search for a book, click "Add to Library", navigate to "My Library", click "Mark as Finished", and then delete a book. Explain that this represents all 5 core functionalities!

---

## 📄 License

MIT License — Faculty of Computing, UTM
