import BoardColumn from "../models/boardColumn";
import Board from "../models/board";
import HttpError from "../utils/httpError";
import BoardsService from "./boards";
import { Op } from "sequelize";
export default class BoardColumnsService {
  constructor(private boardsService: BoardsService) {}

  async createColumn(boardColumn: BoardColumn) {
    const board = await Board.findByPk(boardColumn.BoardId);
    if (!board) {
      throw new HttpError(404, "Board does not exist");
    }
    boardColumn.index = board.totalColumns + 1;
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

  async getColumn(columnId: string) {
    const column = await BoardColumn.findByPk(columnId);
    if (!(column instanceof BoardColumn)) {
      throw new HttpError(404, "Column not found ");
    }

    return column;
  }

  async updateColumnIndex(columnId: string, newIndex: number, userId: string) {
    const columnToUpdate = await this.getColumn(columnId);
    const board = await this.boardsService.getBoard(columnToUpdate.BoardId, userId);

    if (newIndex === columnToUpdate.index) {
      return ;
    }

    if (newIndex < 1 || newIndex > board.totalColumns) {
      throw new HttpError(400, "Invalid movement of columns");
    }
    let columnsToUpdate = await BoardColumn.findAll({
      where: {
        BoardId: columnToUpdate.BoardId,
        index: {
          [Op.between]:
          columnToUpdate.index > newIndex
              ? [newIndex, columnToUpdate.index - 1] /*If column was moved to the left (column.index > newIndex) we move the columns one position to the right*/
              : [columnToUpdate.index + 1, newIndex],/*If column was moved to the right (column.index < newIndex) we move the columns one position to the left*/
        },
      },
    });
    //We updated the columns index
    columnsToUpdate.forEach(async (currentColumn) => {
      await BoardColumn.update(
        {
          index:
            columnToUpdate.index > newIndex
              ? currentColumn.index + 1 /*If column was moved to the left (column.index > newIndex) we move the columns one position to the right*/
              : currentColumn.index - 1,/*If column was moved to the right (column.index < newIndex) we move the columns one position to the left*/
        },
        {
          where: {
            id: currentColumn.id,
          },
        }
      );
    });

    await BoardColumn.update({index: newIndex},{
      where:{
        id:columnToUpdate.id
      }
    });
  }

  async deleteColumn(columnId: string, userId: string) {
    const columnToDelete = await this.getColumn(columnId);
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

    if(columnToDelete.index === totalColumns){
      await this.boardsService.updateTotalColumns(BoardId,totalColumns-1);
      return ;
    } 

    let columnsToUpdate = await BoardColumn.findAll({
      where:{
        BoardId,
        index:{
          [Op.between]: [columnToDelete.index+1,totalColumns]
        }
      }
    });

    columnsToUpdate.map(async (column)=>{
      await BoardColumn.update({index:column.index-1},{
        where:{
          id: column.id
        }
      })
    });

    await this.boardsService.updateTotalColumns(BoardId,totalColumns-1);

  }
}
