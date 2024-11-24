import { Router } from "express";
import { loginController } from "../controllers/login-controller.js";

const authRouter = Router();

authRouter.post('/login',loginController);

export default authRouter;