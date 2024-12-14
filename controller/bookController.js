import { Book } from "../model/bookModel.js";

export const createBook = async (req, res) => {
    try {
        const { title, author, isbn, publishedDate, numberOfPages } = req.body;

        const duplicateBook = await Book.findOne({ isbn });
        if (duplicateBook) {
            return res.status(400).send({ message: "This book is already exist" })
        }

        const book = new Book({
            title: title,
            author: author,
            isbn: isbn,
            publishedDate: publishedDate,
            numberOfPages: numberOfPages
        });
        const data = await book.save();
        res.status(201).send({ message: "Book created successfully", result: data });
    } catch (error) {
        res.status(500).send({ messgae: "Something went wrong", error: error });
    }
};



export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).send({ books: books })
    } catch (error) {
        res.status(500).send({ messgae: "Something went wrong", error: error });
    }
};


export const getSingleBook = async (req, res) => {
    try {
        const book = await Book.findById({ _id: req.params.id });
        res.status(200).send({ books: book })
    } catch (error) {
        res.status(500).send({ messgae: "Something went wrong", error: error });
    }
};



export const updateBook = async (req, res) => {
    try {
        const duplicateBook = await Book.findOne({ isbn: req.body.isbn, _id: { $ne: req.params.id } });
        if (duplicateBook) {
            return res.status(400).send({ message: "This book is already exist" })
        }
        const book = await Book.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.status(200).send({ books: book })
    } catch (error) {
        res.status(500).send({ messgae: "Something went wrong", error: error });
    }
};


export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete({ _id: req.params.id })
        res.status(200).send({ message: "Deleted successfully" })

    } catch (error) {
        res.status(500).send({ messgae: "Something went wrong", error: error });
    }
} 