import { CreateBoard, UpdateBoard } from "../dto/boards.dto";
import Board from "../models/board";
import BoardColumn from "../models/boardColumn";
import Task from "../models/task";
import User from "../models/user";
import HttpError from "../utils/httpError";
import usersService from "./users";
export default class BoardsService {
  constructor(private usersService: usersService) {}
  async createBoard(board: CreateBoard) {
    return await Board.create(board);
  }
  async getUserBoards(id: string) {
    const user = await this.usersService.getUser(id);
    return await user.$get("boards");
  }

  async getBoard(boardId: string, userId: string) {
    const board = await Board.findOne({
      where: {
        id: boardId,
        UserId: userId,
      },
      include: {
        model: BoardColumn,
        include:[Task],
        order: [[{ model:Task, as: "tasks" }, "position"]]
      },
      order: [[{ model: BoardColumn, as: "boardColumns" }, "position"]],
    });
    if (!(board instanceof Board)) {
      throw new HttpError(404, "Board not found");
    }
    return board;
  }

  async deleteBoard(boardId: string, userId: string) {
    const boardDeleted = await Board.destroy({
      where: {
        id: boardId,
        UserId: userId,
      },
    });
    if (boardDeleted === 0) {
      throw new HttpError(500, "Resource could not be deleted");
    }
  }

  async updateBoard(
    userId: string,
    boardId: string,
    board: UpdateBoard
  ) {
    return Board.update(board, {
      where: {
        id: boardId,
        UserId: userId,
      },
    });
  }

  async userHasBoard(boardId: string, userId: string) {
    const user = await this.usersService.getUser(userId);
    const board = await Board.findByPk(boardId);
    if (!(board instanceof Board)) {
      throw new HttpError(404, "Board not found");
    }
    const userHasBoard = await user.$has("Board", board);
    if(!userHasBoard){
      throw new HttpError(403, "User is not allowed to modify this board");
    }
  }

  async getTotalColumns(id: string, userId: string) {
    const board = await Board.findOne({
      attributes: ["totalColumns"],
      where: {
        id: id,
        UserId: userId,
      },
    });

    if (!(board instanceof Board)) {
      throw new HttpError(404, "Board not found");
    }

    return board.totalColumns;
  }

  async updateTotalColumns(id: string, total: number) {
    await Board.update(
      { totalColumns: total },
      {
        where: {
          id,
        },
      }
    );
  }
}
