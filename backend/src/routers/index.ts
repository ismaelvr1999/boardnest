import {Router} from "express";
const router = Router();

import usersRouter from "./users";
router.use(usersRouter);

import boardsRouter from "./boards";
router.use(boardsRouter);
export default router;
