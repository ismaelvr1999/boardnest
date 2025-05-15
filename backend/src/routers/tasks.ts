import { Router } from "express";
import container from "../config";
import { body, param } from "express-validator";
import validate from "../middlewares/validate";
import auth from "../middlewares/authenticate";
const router = Router();
const controller = container.resolve("tasksController");

router.post("/tasks/",
    auth,
    body(["ColumnId","BoardId"]).trim().notEmpty().isUUID(),
    body("name").trim().notEmpty().isString(),
    validate,
    controller.addTask.bind(controller)
);

router.get("/tasks/:id",
    auth,
    param("id").trim().notEmpty().isUUID(),
    validate,
    controller.getTask.bind(controller)
);

router.patch("/tasks/:id/position",
    auth,
    param("id").trim().notEmpty().isUUID(),
    body("newPosition").trim().notEmpty().isString(),
    body("ColumnId").trim().notEmpty().isUUID(),
    validate,
    controller.updateTaskPosition.bind(controller)
);

router.delete("/tasks/:id",
    auth,
    param("id").trim().notEmpty().isUUID(),
    validate,
    controller.deleteTask.bind(controller)
);

export default router;
