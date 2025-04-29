import { Response,Request,NextFunction, RequestHandler } from "express";
import {validationResult} from "express-validator";

const validate:RequestHandler =(req:Request,res:Response,next:NextFunction) =>{
    const err = validationResult(req);
    if(!err.isEmpty()){
        res.status(400).json({ok:false,message:"The input data is missing or malformed",details:err.array()});
        return;
    }
     next();
}

export default validate;