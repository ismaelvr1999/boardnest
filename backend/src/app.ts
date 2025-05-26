import express, { Request, Response,NextFunction } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import routers from "./routers/index";
import HttpError from "./utils/httpError";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "node:path";
import cors from "cors"
import container from "./config";

const frontendURL = container.resolve("frontendURL");
const app = express();
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Boardnest",
      version: "1.0.0",
    },
  },
  apis: [
    path.join(__dirname, "/swagger/*.yaml"),
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors({
  origin: frontendURL,
  credentials: true
}));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
app.use("/api",routers);

app.get("/",async (_:Request,res:Response)  =>{ 
    res.cookie("test_cookie","hello baker");
    res.json({ok:true});
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    if(err instanceof HttpError) {
       res.status(err.status).json({ok:false,message: err.message});
       return;
    }
    res.status(500).json({ok:false,message:err.message});
    return;
  });

export default app;

