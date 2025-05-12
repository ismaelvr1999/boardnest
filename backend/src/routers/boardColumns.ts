import { Router } from "express";
import container from "../config";
import { body, param } from "express-validator";
import validate from "../middlewares/validate";
import auth from "../middlewares/authenticate";
const router = Router();
const controller = container.resolve("boardColumnsController");


router.post(
  "/columns/",
  auth,
  body(["name","BoardId"]).trim().notEmpty(),
  body("name").isString(),
  body("BoardId").isUUID(),
  validate,
  controller.createColumn.bind(controller)
);

router.patch(
  "/columns/:id/position",
  auth,
  body("position").trim().notEmpty().isNumeric(),
  param("id").isUUID(),
  validate,
  controller.updateColumnPosition.bind(controller)
);

router.delete(
  "/columns/:id",
  auth,
  param("id").isUUID(),
  validate,
  controller.deleteColumn.bind(controller)
);

router.patch(
  "/columns/:id/name",
  auth,
  body("name").trim().notEmpty().isString(),
  param("id").isUUID(),
  validate,
  controller.updateColumnName.bind(controller)
);

export default router;
