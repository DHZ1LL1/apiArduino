const Book = require("../models/model");

// Obtener todos los libros
exports.getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

// Crear un nuevo libro
exports.createBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un libro por ID
exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un libro por ID
exports.deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Libro eliminado" });
};
