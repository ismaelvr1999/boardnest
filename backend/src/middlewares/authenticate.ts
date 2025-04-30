import { NextFunction, Request, RequestHandler, Response } from "express";
import HttpError from "../utils/httpError";
import jwt, {Secret} from "jsonwebtoken";
import container from "../config";
import { AuthRequest, JwtAuthPayload } from "../types/authenticate.types";
const jwtSecret:Secret = container.resolve("jwtSecret");

const auth:RequestHandler = (req:Request,res:Response,next:NextFunction)=>{
    const auth = req.cookies["auth"];
    if(!auth){
        throw new HttpError(401,"Authentication required: user not logged in");
    }
    try{
        const decoded =  jwt.verify(auth,jwtSecret) as JwtAuthPayload;
        (req as AuthRequest).user = decoded;
        next();
    }
    catch(err) {
        throw new HttpError(401,"Invalid or expired authentication token")
    }
} 

export default auth;