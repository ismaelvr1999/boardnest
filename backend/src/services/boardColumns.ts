import BoardColumn from "../models/boardColumn";
import Board from "../models/board";
import HttpError from "../utils/httpError";
import BoardsService from "./boards";
import { Op, where } from "sequelize";
export default class BoardColumnsService {
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
  async updateColumnIndex(columnId: string, newIndex: number, userId: string) {
    const column = await BoardColumn.findByPk(columnId);
    if (!column) {
      throw new HttpError(404, "Column not found ");
    }

    if (column.index > newIndex) {
      let columns = await BoardColumn.findAll({
        where: {
          BoardId: column.BoardId,
          index: {
            [Op.between]: [newIndex, column.index - 1],
          },
        },
      });
      let columnsUpdated = columns.map((column) => {
        column.index += 1;
        return column;
      });
      column.index = newIndex;
      columnsUpdated.push(column);
      
      columnsUpdated.forEach(async (column) => {
        await BoardColumn.update(column.dataValues, {
          where: {
            id: column.id,
          },
        });
      });

      let newColumns = await Board.findByPk(column.BoardId, {
        include: {
          model: BoardColumn,
          order: [["index", "ASC"]],
        },
      });
      return newColumns;
    }

    if (column.index < newIndex) {
      let columns = await BoardColumn.findAll({
        where: {
          BoardId: column.BoardId,
          index: {
            [Op.between]: [column.index + 1, newIndex],
          },
        },
      });

      let columnsUpdated = columns.map((column) => {
        column.index -= 1;
        return column;
      });
      column.index = newIndex;
      columnsUpdated.push(column);
      columnsUpdated.forEach(async (column) => {
        await BoardColumn.update(column.dataValues, {
          where: {
            id: column.dataValues.id,
          },
        });
      });
      let newColumns = await Board.findByPk(column.BoardId, {
        include: {
          model: BoardColumn,
          order: [["index", "ASC"]],
        },
      });
      return newColumns;
    }
  }
}
