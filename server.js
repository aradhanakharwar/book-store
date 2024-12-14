import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import router from "./router/userRouter.js";
import bookRouter from "./router/bookRouter.js";

dotenv.config();

const app = express();

const port = 3001

app.use(express.json());

app.use("/user", router);
app.use("/book", bookRouter);

mongoose.connect(process.env.MONGODB_URI, {
    dbName: "Book_Store"
}).then(() => {
    console.log("Database connected.");
}).catch((error) => {
    console.log("Some error occured while connecting to database", error);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})