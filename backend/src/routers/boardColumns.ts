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

router.put(
  "/columns/:id/index",
  auth,
  body("newIndex").trim().notEmpty().isNumeric(),
  param("id").isUUID(),
  validate,
  controller.updateColumnIndex.bind(controller)
);

router.delete(
  "/columns/:id",
  auth,
  param("id").isUUID(),
  validate,
  controller.deleteColumn.bind(controller)
);



export default router;
