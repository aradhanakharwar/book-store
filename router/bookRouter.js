import express from "express";
import { createBook, deleteBook, getAllBooks, getSingleBook, updateBook } from "../controller/bookController.js";
import { middleware } from "../middleware/middleware.js";

const router = express.Router();

router.post('/create', middleware, createBook);
router.get('/get', middleware, getAllBooks);
router.get('/singlebook/:id', middleware, getSingleBook);
router.put('/updatebook/:id', middleware, updateBook);
router.delete('/deletebook/:id', middleware, deleteBook);

export default router;