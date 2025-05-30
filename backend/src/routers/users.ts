import { Router} from "express";
import container from "../config";
import { body } from "express-validator";
import validate from "../middlewares/validate"
import auth from "../middlewares/authenticate";
const router = Router();
const controller = container.resolve("usersController");

router.post("/users/register",
    body(["firstName","lastName","username","email","password"]).trim().notEmpty().isString(),
    body("email").isEmail().normalizeEmail(),
    validate,
    controller.signUp.bind(controller));

router.post("/users/login",
    body(["username","password"]).trim().notEmpty().isString(),
    validate,
    controller.login.bind(controller)
);

router.get("/users/verify",
    auth,
    controller.verifyToken.bind(controller)
)

router.get("/users/logout",
    auth,
    controller.logout.bind(controller)
)
export default router;
