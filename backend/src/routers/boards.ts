import { Router } from "express";
import container from "../config";
import { body } from "express-validator";
import validate from "../middlewares/validate";
import auth from "../middlewares/authenticate";
const router = Router();
const controller = container.resolve("boardsController");

router.post(
  "/boards/",
  auth,
  body("name").trim().notEmpty().isString(),
  body("description").optional().isString(),
  validate,
  controller.createBoard.bind(controller)
);

router.get(
  "/boards/",
  auth,
  controller.getUserBoards.bind(controller)
);

export default router;
