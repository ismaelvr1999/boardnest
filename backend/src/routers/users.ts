import { Router} from "express";
import container from "../config";
import { body, param } from "express-validator";
import validate from "../middlewares/validate"
import auth from "../middlewares/authenticate";
import multer from "multer";
import { AuthRequest } from "../types/authenticate.types";
import path from "path";
const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,"uploads/profile-pictures/")
    },
    filename(req, file, cb) {
        const {username} = (req as AuthRequest).user;
        const ext = path.extname(file.originalname);
        cb(null,username+Date.now()+ext);
    },
});

const upload = multer({storage:storage});


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

router.get(`/users/profile`,
    auth,
    controller.getProfileUser.bind(controller)
)

router.patch(`/users/profile/picture`,
    auth,
    upload.single("profile_picture"),
    controller.addProfilePicture.bind(controller)
)
export default router;
