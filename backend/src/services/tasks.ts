import BoardColumn from "../models/boardColumn";
import Task from "../models/task";
import BoardColumnsService from "./boardColumns";
import BoardsService from "./boards";
import HttpError from "../utils/httpError";
import { Op } from "sequelize";

export default class TasksService {
  constructor(
    private boardColumnsService: BoardColumnsService,
    private boardsService: BoardsService
  ) {}

  async addTask(task: Task, userId: string) {
    let { totalTasks } = await this.boardColumnsService.getColumn(
      task.ColumnId,
      userId
    );
    task.position = totalTasks + 1;
    const newTask = await Task.create(task);
    await BoardColumn.update(
      { totalTasks: totalTasks + 1 },
      {
        where: {
          id: task.ColumnId,
        },
      }
    );
    return newTask;
  }
  async getTask(taskId: string, userId: string) {
    const task = await Task.findByPk(taskId);
    if (!(task instanceof Task)) {
      throw new HttpError(404, "Task not found ");
    }
    await this.boardsService.userHasBoard(task.BoardId, userId);

    return task;
  }

  async updateTaskPosition(
    taskId: string,
    newPosition: number,
    userId: string
  ) {
    const taskToUpdate = await this.getTask(taskId, userId);
    const column = await this.boardColumnsService.getColumn(
      taskToUpdate.ColumnId,
      userId
    );
    if (newPosition === taskToUpdate.position) {
      return;
    }
    if (newPosition < 1 || newPosition > column.totalTasks) {
      throw new HttpError(400, "Invalid movement of columns");
    }

    let tasksToUpdate = await Task.findAll({
      where: {
        ColumnId: taskToUpdate.ColumnId,
        position: {
          [Op.between]:
            taskToUpdate.position > newPosition
              ? [
                  newPosition,
                  taskToUpdate.position - 1,
                ] /*If task was moved down (column.position > newposition) we move the task one position up*/
              : [
                  taskToUpdate.position + 1,
                  newPosition,
                ] /*If task was moved up (column.position < newposition) we move the tasks one position down*/,
        },
      },
    });

    tasksToUpdate.forEach(async (currentTask) => {
      await Task.update(
        {
          position:
            taskToUpdate.position > newPosition
              ? currentTask.position + 1
              : currentTask.position - 1,
        },
        {
          where: {
            id: currentTask.id,
          },
        }
      );
    });

    await Task.update({position:newPosition},{
        where:{
            id:taskToUpdate.id
        }
    });
  }
}
