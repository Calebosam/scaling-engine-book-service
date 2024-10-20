const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3001;

app.use(cors())
app.use(bodyParser.json());

// Create a new book
app.post('/books', async (req, res) => {
  const { title, description, genre } = req.body;
  try {
    const book = await prisma.book.create({
      data: {
        title,
        description,
        genre
      },
    });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all books
app.get('/books', async (req, res) => {
  const books = await prisma.book.findMany();
  res.json(books);
});

// Get a book by ID
app.get('/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book = await prisma.book.findUnique({
      where: { id: Number(id) },
    });
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a book by ID
app.put('/books/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, genre } = req.body;
  try {
    const book = await prisma.book.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        genre
      },
    });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a book by ID
app.delete('/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.book.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
