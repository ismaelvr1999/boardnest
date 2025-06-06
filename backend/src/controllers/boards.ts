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
        
        const board = await this.service.createBoard(newBoard);        
        res.status(201).json({ok:true,board})
    }

    async getUserBoards(req:Request, res:Response){
        const {id} =(req as AuthRequest).user; 
        const {search} = matchedData(req);       
        const boards = search ? 
        await this.service.getUserBoards(id,search):
        await this.service.getUserBoards(id);        
        res.status(200).json({ok:true,boards})
    }
    
    async getBoard(req:Request, res:Response){
        const {id:userId} =(req as AuthRequest).user;
        const {id:boardId} = matchedData(req);        
        const board = await this.service.getBoard(boardId,userId);        
        res.status(200).json({ok:true,board})
    }

    async deleteBoard(req:Request, res:Response){
        const {id:userId} =(req as AuthRequest).user;
        const {id:boardId} = matchedData(req);        
        await this.service.deleteBoard(boardId,userId);        
        res.status(200).json({ok:true})
    }

    async updateBoard(req:Request, res:Response){
        const {id:userId} =(req as AuthRequest).user;
        const {id:boardId,name,description}= matchedData(req);        
        await this.service.updateBoard(userId,boardId,{name,description});        
        res.status(200).json({ok:true})
    }
    
}