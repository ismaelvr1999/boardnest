import BoardColumn from "../models/boardColumn";
import Board from "../models/board";
import HttpError from "../utils/httpError";
import BoardsService from "./boards";
import { Op } from "sequelize";
import { CreateColumn } from "../dto/boardColumns.dto";
export default class BoardColumnsService {
  constructor(private boardsService: BoardsService) {}

  async createColumn(boardColumn: CreateColumn) {
    const board = await Board.findByPk(boardColumn.BoardId);
    if (!board) {
      throw new HttpError(404, "Board does not exist");
    }
    boardColumn.position = board.totalColumns + 1;
    const newColumn = await BoardColumn.create(boardColumn);
    if (!newColumn) {
      throw new HttpError(500, "Failed to create new column");
    }
    board.totalColumns = board.totalColumns + 1;
    await Board.update(board.dataValues, {
      where: {
        id: board.id,
      },
    });
    return newColumn;
  }

  async getColumn(columnId: string,userId:string) {
    const column = await BoardColumn.findByPk(columnId);
    if (!(column instanceof BoardColumn)) {
      throw new HttpError(404, "Column not found ");
    }
    await this.boardsService.userHasBoard(column.BoardId,userId);

    return column;
  }

  async updateColumnPosition(columnId: string, newPosition: number, userId: string) {
    const columnToUpdate = await this.getColumn(columnId,userId);
    const board = await this.boardsService.getBoard(columnToUpdate.BoardId, userId);

    if (newPosition === columnToUpdate.position) {
      return ;
    }

    if (newPosition < 1 || newPosition > board.totalColumns) {
      throw new HttpError(400, "Invalid movement of columns");
    }
    let columnsToUpdate = await BoardColumn.findAll({
      where: {
        BoardId: columnToUpdate.BoardId,
        position: {
          [Op.between]:
          columnToUpdate.position > newPosition
              ? [newPosition, columnToUpdate.position - 1] //If (column.position > newposition) Get columns from newPosition to currentPosition 
              : [columnToUpdate.position + 1, newPosition],///If (column.position < newposition)  Get tasks from currentPosition  to newPosition 
        },
      },
    });
    //We updated the columns position
    columnsToUpdate.forEach(async (currentColumn) => {
      await BoardColumn.update(
        {
          position:
            columnToUpdate.position > newPosition
              ? currentColumn.position + 1 //If (column.position > newposition) increase the position
              : currentColumn.position - 1,//If (column.position < newposition) decrease the position
        },
        {
          where: {
            id: currentColumn.id,
          },
        }
      );
    });

    await BoardColumn.update({position: newPosition},{
      where:{
        id:columnToUpdate.id
      }
    });
  }

  async deleteColumn(columnId: string, userId: string) {
    const columnToDelete = await this.getColumn(columnId,userId);
    const {BoardId}= columnToDelete
    let totalColumns = await this.boardsService.getTotalColumns(BoardId, userId);

    const deletedColumn = await BoardColumn.destroy({
      where:{
        id: columnId
      }
    });
    
    if(deletedColumn !== 1){
      throw new HttpError(500,"Failed to delete the column.");
    }

    if(columnToDelete.position === totalColumns){
      await this.boardsService.updateTotalColumns(BoardId,totalColumns-1);
      return ;
    } 

    let columnsToUpdate = await BoardColumn.findAll({
      where:{
        BoardId,
        position:{
          [Op.between]: [columnToDelete.position+1,totalColumns]
        }
      }
    });

    columnsToUpdate.forEach(async (column)=>{
      await BoardColumn.update({position:column.position-1},{
        where:{
          id: column.id
        }
      })
    });

    await this.boardsService.updateTotalColumns(BoardId,totalColumns-1);

  }

  async updateColumnName(columnId:string,userId:string,newName:string) {
    await this.getColumn(columnId,userId); 
    
    await BoardColumn.update({name:newName},{
      where:{
        id:columnId
      }
    });
  }

  async getTotalTasks(id:string) {
    const column = await BoardColumn.findOne({
      attributes: ["totalTasks"],
      where:{
        id
      }
    });

    if (!(column instanceof BoardColumn)) {
      throw new HttpError(404, "column not found");
    }

    return column.totalTasks;
  }
  async updateTotalTasks(id: string, total: number) {
    await BoardColumn.update(
      { totalTasks: total },
      {
        where: {
          id,
        },
      }
    );
  }

}
