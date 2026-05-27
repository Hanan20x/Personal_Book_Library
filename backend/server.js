const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Path
const dbPath = path.join(__dirname, 'data.json');

// Helper to read DB
const readDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Helper to write DB
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));


// ------------------------------------------------------------------
// RESTful Web Service 1: Search External API (GET)
// ------------------------------------------------------------------
app.get('/api/books/search', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    try {
        const response = await axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`);
        const books = response.data.docs.map(doc => ({
            id: doc.key.replace('/works/', ''),
            title: doc.title,
            author: doc.author_name ? doc.author_name.join(', ') : 'Unknown Author',
            coverUrl: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : null,
            year: doc.first_publish_year
        }));
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from Open Library' });
    }
});


// ------------------------------------------------------------------
// RESTful Web Service 2: Manage Personal Collection (CRUD)
// ------------------------------------------------------------------

// GET: Fetch all saved books
app.get('/api/mybooks', (req, res) => {
    const db = readDB();
    res.json(db.books);
});

// POST: Add a new book to the collection
app.post('/api/mybooks', (req, res) => {
    const { id, title, author, coverUrl, year } = req.body;
    if (!id || !title) {
        return res.status(400).json({ error: 'Missing required book details' });
    }

    const db = readDB();
    
    // Check if book already exists
    if (db.books.find(b => b.id === id)) {
        return res.status(400).json({ error: 'Book is already in your library' });
    }

    const newBook = {
        id,
        title,
        author,
        coverUrl,
        year,
        status: 'reading' // default status
    };

    db.books.push(newBook);
    writeDB(db);

    res.status(201).json(newBook);
});

// PUT: Update a book's status (e.g., move to "finished")
app.put('/api/mybooks/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const db = readDB();
    const bookIndex = db.books.findIndex(b => b.id === id);

    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }

    db.books[bookIndex].status = status;
    writeDB(db);

    res.json(db.books[bookIndex]);
});

// DELETE: Remove a book from the collection
app.delete('/api/mybooks/:id', (req, res) => {
    const { id } = req.params;
    
    const db = readDB();
    const filteredBooks = db.books.filter(b => b.id !== id);

    if (db.books.length === filteredBooks.length) {
        return res.status(404).json({ error: 'Book not found' });
    }

    db.books = filteredBooks;
    writeDB(db);

    res.json({ message: 'Book deleted successfully' });
});


// Start Server
app.listen(PORT, () => {
    console.log(`RESTful Backend running at http://localhost:${PORT}`);
});
