import BoardColumn from "../models/boardColumn";
import Task from "../models/task";
import BoardColumnsService from "./boardColumns";
import BoardsService from "./boards";
import HttpError from "../utils/httpError";
import { Op } from "sequelize";
import { AddTask, UpdateTaskPosition } from "../dto/tasks.dto";

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

  async updateTaskPosition(task:UpdateTaskPosition,userId: string) {
    let taskToUpdate:Task = await this.getTask(task.id, userId);
    let {ColumnId:currentColumnId,name:taskName, BoardId,position:currentPosition} = taskToUpdate;
    //If the task was moved to other column, we insert the task to the new column;
    if(currentColumnId !== task.newColumnId){
      await this.deleteTask(task.id,userId);
      taskToUpdate = await this.addTask({id:task.id,name:taskName,BoardId,ColumnId:task.newColumnId},userId);
      currentPosition = taskToUpdate.position;
    }

    let column = await this.boardColumnsService.getColumn(
      task.newColumnId,
      userId
    );
    //If the task was moved to its current position, Do nothing
    if (task.newPosition === currentPosition) {
      return;
    }
    //If the new position isn't between 1 and totalTask, Send a Http 400 error.
    if (task.newPosition < 1 || task.newPosition > column.totalTasks) {
      throw new HttpError(400, "Invalid movement of columns");
    }
    
    let tasksToUpdate = await Task.findAll({
      where: {
        ColumnId: taskToUpdate.ColumnId,
        position: {
          [Op.between]:
          currentPosition > task.newPosition
              ? [
                  task.newPosition,
                  currentPosition- 1,
                ] // If (column.position > newposition)  Get tasks from newPosition to currentPosition 
              : [
                  currentPosition + 1,
                  task.newPosition,
                ], // / If (column.position < newposition)  Get tasks from currentPosition  to newPosition
        },
      },
    });

    tasksToUpdate.forEach(async (currentTask) => {
      await Task.update(
        {
          position:
            currentPosition > task.newPosition
              ? currentTask.position + 1 // If (column.position > newposition)  increase the position
              : currentTask.position - 1, // If (column.position < newposition)  decrease the position
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

  async updateTaskName(id:string,name:string,userId:string){
    await this.getTask(id,userId);
    
    await Task.update({name},{
      where:{
        id
      }
    });

  }
}
