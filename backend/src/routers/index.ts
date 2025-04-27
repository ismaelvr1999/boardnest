import {Router} from "express";
const router = Router();

import userRouter from "./users";
router.use(userRouter);

export default router;
