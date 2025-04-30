import { Response,Request } from "express"
import Board from "../models/board";
import { matchedData } from "express-validator";
import BoardsService from "../services/boards";
import { AuthRequest } from "../types/authenticate.types";

export default class BoardsController {
    private service:BoardsService;
    constructor(boardsService:BoardsService){
        this.service = boardsService;
    }
    async createBoard(req:Request, res:Response){
        const {id} =(req as AuthRequest).user;
        const newBoard:Board = matchedData(req);
        newBoard.UserId = id;
        
        await this.service.createBoard(newBoard);        
        res.status(201).json({ok:true})
    }

    async getUserBoards(req:Request, res:Response){
        const {id} =(req as AuthRequest).user;        
        const boards = await this.service.getUserBoards(id);        
        res.status(200).json({ok:true,boards})
    }
}