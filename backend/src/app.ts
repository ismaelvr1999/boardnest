import express, { Request, Response } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/",async (req:Request,res:Response)  =>{ 
    res.cookie("test_cookie","hello baker");
    res.json({ok:true});
})

export default app;

