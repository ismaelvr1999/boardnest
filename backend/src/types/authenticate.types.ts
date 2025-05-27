import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface JwtAuthPayload extends JwtPayload {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
}

export interface AuthRequest extends Request{
    user: JwtAuthPayload;
}