import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
    },
    publishedDate: {
        type: Date,
        required: true
    },
    numberOfPages: {
        type: Number,
        required: true
    }
});

export const Book = mongoose.model("Book", bookSchema);