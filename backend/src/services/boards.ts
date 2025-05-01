import Board from "../models/board";
import User from "../models/user";
import HttpError from "../utils/httpError";
export default class BoardsService {

    async createBoard(board: Board) {
        return await Board.create(board);
    }
    async getUserBoards(id:string){
        const user = await User.findByPk(id);
        if(!user){
            throw new HttpError(404,"User not found");
        }
        return await user.$get("boards");
    }

    async deleteBoard(boardId:string,userId:string){
        const boardDeleted = await Board.destroy({
            where:{
                id: boardId,
                UserId: userId
            }
        });
        if(boardDeleted === 0) {
            throw new HttpError(500,"Resource could not be deleted")
        }
        
    }
}