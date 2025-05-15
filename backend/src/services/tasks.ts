import BoardColumn from "../models/boardColumn";
import Task from "../models/task";
import BoardColumnsService from "./boardColumns";
import BoardsService from "./boards";
import HttpError from "../utils/httpError";
import { Op } from "sequelize";
import { AddTask } from "../dto/tasks.dto";

export default class TasksService {
  constructor(
    private boardColumnsService: BoardColumnsService,
    private boardsService: BoardsService
  ) {}

  async addTask(task: AddTask, userId: string) {
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

  async updateTaskPosition(task:{id: string,newPosition: number,ColumnId:string},userId: string) {
    let taskToUpdate = await this.getTask(task.id, userId);
    let column:BoardColumn;

    if(taskToUpdate.ColumnId !== task.ColumnId){
      console.log("updated column too");
      taskToUpdate = await this.addTask({name:taskToUpdate.name,BoardId:taskToUpdate.BoardId,ColumnId:task.ColumnId},userId);
      column = await this.boardColumnsService.getColumn(
        taskToUpdate.ColumnId,
        userId
      );
      await this.deleteTask(task.id,userId);
    }
    else{
      column = await this.boardColumnsService.getColumn(
        taskToUpdate.ColumnId,
        userId
      );
    }

    if (task.newPosition === taskToUpdate.position) {
      return;
    }
    if (task.newPosition < 1 || task.newPosition > column.totalTasks) {
      throw new HttpError(400, "Invalid movement of columns");
    }
   
    let tasksToUpdate = await Task.findAll({
      where: {
        ColumnId: taskToUpdate.ColumnId,
        position: {
          [Op.between]:
            taskToUpdate.position > task.newPosition
              ? [
                  task.newPosition,
                  taskToUpdate.position - 1,
                ] /*If task was moved down (column.position > newposition) we move the task one position up*/
              : [
                  taskToUpdate.position + 1,
                  task.newPosition,
                ] /*If task was moved up (column.position < newposition) we move the tasks one position down*/,
        },
      },
    });

    tasksToUpdate.forEach(async (currentTask) => {
      await Task.update(
        {
          position:
            taskToUpdate.position > task.newPosition
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

    await Task.update({position:task.newPosition},{
        where:{
            id:taskToUpdate.id
        }
    });
  }

  async deleteTask(taskId: string, userId:string) {
    const taskToDeleted = await this.getTask(taskId,userId);
    const totalTasks = await this.boardColumnsService.getTotalTasks(taskToDeleted.ColumnId);
    const WasColumnDelete = await Task.destroy({
      where:{
        id: taskToDeleted.id 
      }
    });
    if(WasColumnDelete !== 1){
      throw new HttpError(500,"Failed to delete the task.");
    }
    if(taskToDeleted.position === totalTasks){
      await this.boardColumnsService.updateTotalTasks(taskToDeleted.ColumnId,totalTasks-1);
      return ;
    } 

    let tasksToUpdate = await Task.findAll({
      where:{
        ColumnId: taskToDeleted.ColumnId,
        position:{
          [Op.between]: [taskToDeleted.position+1,totalTasks]
        }
      }
    });

    tasksToUpdate.forEach(async (task)=>{
      await Task.update({position:task.position-1},{
        where:{
          id: task.id
        }
      })
    });

    await this.boardColumnsService.updateTotalTasks(taskToDeleted.ColumnId,totalTasks-1);

  }
}
