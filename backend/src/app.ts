import express, { Request, Response,NextFunction } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import routers from "./routers/index";
import HttpError from "./utils/httpError";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api",routers);

app.get("/",async (_:Request,res:Response)  =>{ 
    res.cookie("test_cookie","hello baker");
    res.json({ok:true});
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    if(err instanceof HttpError) {
       res.status(err.status).json({ok:false,message: err.message});
       return;
    }
    res.status(500).json({ok:false,message:err.message});
    return;
  });

export default app;

