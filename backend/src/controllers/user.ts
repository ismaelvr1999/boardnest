import { Request, Response } from "express";
import usersService from "../services/users";
import { matchedData } from "express-validator";
import User from "../models/user";

export default class usersController {
  private service: usersService;

  constructor(usersService: usersService) {
    this.service = usersService;
  }

  async signUp(req:Request, res: Response) {
    const newUser:User = matchedData(req);
    await this.service.signUp(newUser);
    res.status(201).json({ok:true})
  }

  async login(req:Request, res:Response){
    const {username, password} = matchedData(req);
    const token = await this.service.login(username,password);
    res.cookie("auth",token,{
      httpOnly:true
    });
    res.status(200).json({ok:true})
  }
}
