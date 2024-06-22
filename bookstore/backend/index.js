import express from "express";
import mongoose from 'mongoose';
import { PORT, mongodburl } from "./config.js";
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
// Create an Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(200).send('Welcome to the MERN server');
});

app.use('/books', booksRoute);
//cross origin resource sharing 
// app.use(cors());
// Connect to MongoDB and start the server
mongoose.connect(mongodburl)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
