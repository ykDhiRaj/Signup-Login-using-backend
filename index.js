import express from "express"
import mongoose from "mongoose"
import { loginRouter, userRouter } from "./routes/user.route.js";
import dotenv from "dotenv";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
dotenv.config();

const URI = process.env.MongoDBUri;
const PORT = process.env.PORT;

mongoose.connect(URI);


app.get("/",(req,res)=>{
    res.send("Hello world");
});

app.use("/user",userRouter);
app.use("/user",loginRouter);


app.listen(PORT);