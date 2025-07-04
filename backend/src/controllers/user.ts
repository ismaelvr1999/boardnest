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
    const {id} =(req as AuthRequest).user;
    const profile = await this.service.getProfileUser(id);
    res.status(200).json({ok:true,profile})
  }

  async logout(req:Request, res:Response){
    res.clearCookie("auth",{
        httpOnly:true,
        secure: false,
        sameSite:"lax",
        path:"/"
    })
    res.status(200).json({ok:true})
  }

  async addProfilePicture(req:Request,res:Response){
    const {id} = (req as AuthRequest).user;
    if(!req.file) {
      res.status(400).send({ok:false,message:"No file uploaded"});
      return;
    }
    const {profile,token} = await this.service.addProfilePicture(req.file.filename,id);
    res.cookie("auth",token,{
      httpOnly:true,
      secure: false,
      sameSite:"lax",
      path:"/"
    });
    res.status(200).send({ok:true, profile});
  }
  async getProfileUser(req:Request, res:Response){
    const {id} =(req as AuthRequest).user;
    const profile = await this.service.getProfileUser(id);
    res.status(200).json({ok:true,profile});
  }
}
