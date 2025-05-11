import { Response,Request } from "express"
import { matchedData } from "express-validator";
import { AuthRequest } from "../types/authenticate.types";
import BoardColumnsService from "../services/boardColumns";
import BoardColumn from "../models/boardColumn";
export default class BoardColumnsController {
    private service:BoardColumnsService;
    
    constructor(boardColumnsService:BoardColumnsService){
        this.service = boardColumnsService;
    }
    async createColumn(req:Request, res:Response){
        /* const {id} =(req as AuthRequest).user; */
        const newColumn:BoardColumn = matchedData(req); 
        const column = await this.service.createColumn(newColumn);        
        res.status(201).json({ok:true,column})
    }
    async updateColumnIndex(req:Request, res:Response){
        const {id:userId} =(req as AuthRequest).user;
        const {id:columnId,newIndex} = matchedData(req); 
        await this.service.updateColumnIndex(columnId,newIndex,userId);        
        res.status(200).json({ok:true})
    }

    async deleteColumn(req:Request, res:Response){
        const {id:userId} =(req as AuthRequest).user;
        const {id:columnId} = matchedData(req); 
        await this.service.deleteColumn(columnId,userId);        
        res.status(200).json({ok:true})
    }
}