import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
// const dotenv = require('dotenv');
import mongoose from 'mongoose';
import route from './routes/userRoutes.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());
// dotenv.config();

// const PORT = process.env.PORT || 3000;
// const MONGODB_URL = process.env.MONGO_DB_URL;

mongoose.connect("mongodb://localhost:27017/mern")
	.then(()=> console.log("Mongo DB connected."))
	.catch((error)=> console.log("Error:", error));

app.get("/", (req,res)=>{
	// console.log("Connected");
	res.send("<h2>Hello World!</h2>");
});

app.listen(3000, ()=>{
	console.log("Server Started");
});

app.use("/api", route);