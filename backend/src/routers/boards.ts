import { Router } from "express";
import container from "../config";
import { body, param,query } from "express-validator";
import validate from "../middlewares/validate";
import auth from "../middlewares/authenticate";
const router = Router();
const controller = container.resolve("boardsController");

router.get(
  "/boards/",
  auth,
  query("search").optional().trim().isString(),
  controller.getUserBoards.bind(controller)
);

router.get(
  "/boards/:id",
  auth,
  param("id").trim().notEmpty().isUUID(),
  validate,
  controller.getBoard.bind(controller)
);

router.delete(
  "/boards/:id",
  auth,
  param("id").trim().notEmpty().isUUID(),
  validate,
  controller.deleteBoard.bind(controller)
);

router.post(
  "/boards/",
  auth,
  body("name").trim().notEmpty().isString(),
  body("description").optional().isString(),
  validate,
  controller.createBoard.bind(controller)
);

router.put(
  "/boards/:id",
  auth,
  body(["name","description"]).trim().notEmpty().isString(),
  param("id").trim().notEmpty().isUUID(),
  validate,
  controller.updateBoard.bind(controller)
);


export default router;
