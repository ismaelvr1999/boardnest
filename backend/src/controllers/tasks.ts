import { Response, Request } from "express";
import { matchedData } from "express-validator";
import { AuthRequest } from "../types/authenticate.types";
import TasksService from "../services/tasks";
import { AddTask, UpdateTaskPosition } from "../dto/tasks.dto";

export default class TasksController {
  private service: TasksService;
  constructor(tasksService: TasksService) {
    this.service = tasksService;
  }

  async addTask(req: Request, res: Response) {
    const { id } = (req as AuthRequest).user;
    const newTask: AddTask = matchedData(req);
    const task = await this.service.addTask(newTask, id);
    res.status(201).json({ ok: true, task });
  }

  async getTask(req: Request, res: Response) {
    const {id:userId} = (req as AuthRequest).user;
    const {id:taskId} = matchedData(req);
    const task = await this.service.getTask(taskId,userId);
    res.status(201).json({ ok: true, task });
  }

  async updateTaskPosition(req: Request, res: Response) {
    const {id:userId} = (req as AuthRequest).user;
    const task:UpdateTaskPosition = matchedData(req);
    await this.service.updateTaskPosition(task,userId);
    res.status(200).json({ ok: true });
  }

  async deleteTask(req: Request, res: Response) {
    const {id:userId} = (req as AuthRequest).user;
    const {id:taskId} = matchedData(req);
    await this.service.deleteTask(taskId,userId);
    res.status(200).json({ ok: true });
  }

  async updateTaskName(req: Request, res: Response) {
    const {id:userId} = (req as AuthRequest).user;
    const {id:taskId,name} = matchedData(req);
    await this.service.updateTaskName(taskId,name,userId);
    res.status(200).json({ ok: true });
  }
}
