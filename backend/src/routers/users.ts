import { Router} from "express";
import container from "../config";
const router = Router();
const controller = container.resolve("usersController");

router.post("/users/register",controller.signUpUser.bind(controller));

export default router;
