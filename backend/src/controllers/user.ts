import { Request, Response } from "express";
import usersService from "../services/users";

export default class usersController {
  private service: usersService;

  constructor(usersService: usersService) {
    this.service = usersService;
  }

  async signUpUser(req:Request, res: Response) {
    const newUser = req.body;
    await this.service.signUpUser(newUser);
    res.status(201).json({ok:true})
  }
}
