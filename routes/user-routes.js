import { Router } from "express";
import { createUserController } from "../controllers/create-user-controller.js";
import { getSingleSUserController } from "../controllers/get-single-user-controller.js";
import { getUsersController } from "../controllers/get-users-controller.js";
import checkAuth from "../middlewares/check-auth.js";

const userRouter = Router();

userRouter.post("/", createUserController);

userRouter.get("/", checkAuth, getUsersController);
userRouter.get("/:id", checkAuth, getSingleSUserController);

export default userRouter;
