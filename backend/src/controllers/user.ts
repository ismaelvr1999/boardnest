import { Request, Response } from "express";
import usersService from "../services/users";
import { matchedData } from "express-validator";
import { CreateUser } from "../dto/users.dto";
import { AuthRequest } from "../types/authenticate.types";

export default class usersController {
  private service: usersService;

  constructor(usersService: usersService) {
    this.service = usersService;
  }

  async signUp(req:Request, res: Response) {
    const newUser:CreateUser = matchedData(req);
    await this.service.signUp(newUser);
    res.status(201).json({ok:true})
  }

  async login(req:Request, res:Response){
    const {username, password} = matchedData(req);
    const {token,profile} = await this.service.login(username,password);
    res.cookie("auth",token,{
      httpOnly:true,
      secure: false,
      sameSite:"lax",
      path:"/"
    });
    res.status(200).json({ok:true,profile})
  }

  async verifyToken(req:Request, res:Response){
    const {userName,firstName,lastName,email} =(req as AuthRequest).user;
    const profile = {
      userName,
      firstName,
      lastName,
      email
    }
    res.status(200).json({ok:true,profile})
  }
}
