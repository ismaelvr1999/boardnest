import {Router} from "express";
const router = Router();

import usersRouter from "./users";
router.use(usersRouter);

import boardsRouter from "./boards";
router.use(boardsRouter);

import boardColumnsRouter from "./boardColumns";
router.use(boardColumnsRouter);
export default router;
