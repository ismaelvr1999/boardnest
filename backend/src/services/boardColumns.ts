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
      return board.boardColumns;
    }

    if (newIndex < 1 || newIndex > board.totalColumns) {
      throw new HttpError(400, "Invalid movement of columns");
    }
    /*If column was moved to the left (column.index > newIndex)
      we move the columns one position to the right*/

    /*If column was moved to the right (column.index < newIndex)
    we move the columns one position to the left*/
    let columns = await BoardColumn.findAll({
      where: {
        BoardId: columnToUpdate.BoardId,
        index: {
          [Op.between]:
          columnToUpdate.index > newIndex
              ? [newIndex, columnToUpdate.index - 1]
              : [columnToUpdate.index + 1, newIndex],
        },
      },
    });
    //We updated the columns index
    let columnsUpdated = columns.map((currentColumn) => {
      currentColumn.index =
      columnToUpdate.index > newIndex
         ? currentColumn.index + 1 
         : currentColumn.index - 1;
      return currentColumn;
    });

    columnToUpdate.index = newIndex;
    columnsUpdated.push(columnToUpdate);

    columnsUpdated.forEach(async (column) => {
      await BoardColumn.update(column.dataValues, {
        where: {
          id: column.id,
        },
      });
    });

    return columnsUpdated;
  }
}
