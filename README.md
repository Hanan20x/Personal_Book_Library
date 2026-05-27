# Personal Book Library (MEVN Stack)

This is a modern full-stack web application built for Assignment 2. It demonstrates the use of a frontend framework (Vue.js), a backend framework (Express.js), and RESTful architectural principles.

## 5 Core Functionalities
1. **Search External Database:** Search for any real-world book by connecting to the public Open Library API.
2. **View Book Details:** Display rich book details including the cover image, title, author, and publish year.
3. **Add to Library:** Save a book to your personal backend database (defaults to "Reading" status).
4. **Update Status:** Mark a book as "Finished" in your library.
5. **Delete Book:** Remove a book from your collection entirely.

## 2 RESTful Web Services
The Node.js/Express backend strictly follows RESTful conventions to manage resources.

1. **`GET /api/books/search?q={query}`**
   - **Type:** RESTful Resource Fetch
   - **Description:** A stateless endpoint that securely communicates with the Open Library API to fetch and format book data.
2. **`POST /api/mybooks`**
   - **Type:** RESTful Resource Creation
   - **Description:** Receives a JSON payload in the request body and creates a new book record in the backend database.

*(Note: The backend also includes `PUT /api/mybooks/:id` and `DELETE /api/mybooks/:id` to complete the RESTful CRUD lifecycle).*

---

## How to Run the Project Locally

**1. Start the Backend:**
```bash
cd backend
npm install
npm start
```

**2. Start the Frontend:**
```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:5173`.
