import Joi from "joi";
import { validateJoiSChema } from "../utils/validate-joi-schema.js";
import UserModel from "../models/user-model.js";

import bcrypt from "bcryptjs";

const createUserSchema = Joi.object({
  username: Joi.string().min(1).required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(3).required(),
  nationality: Joi.string().required(),
  age: Joi.number().integer().min(1).required(),

  marital_status: Joi.string()
    .valid("single", "married", "divorced", "engaged")
    .required(),
});

export async function createUserController(req, res, next) {
  try {
    const data = req.body;

    const payload = validateJoiSChema(data, createUserSchema, {
      stripUnknown: true,
    });

    if (payload.age < 18 && payload.marital_status !== "single") {
      return res.status(400).json({
        message: "Invalid marital status for age below 18",
        success: false,
      });
    }
    const usernameExists = await UserModel.findOne({
      username: payload.username,
    });

    if (usernameExists) {
      return res
        .status(400)
        .json({ message: "Username already exists", success: false });
    }

    const hash = await bcrypt.hash(payload.password, 10);

    await UserModel.create({
      username: payload.username,
      password: hash,
      name: payload.name,
      nationality: payload.nationality,
      age: payload.age,
      createdAt: new Date(),
      marital_status: payload.marital_status
    });

    return res
      .status(201)
      .json({ message: "Registration was successful", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message ?? "Registration failed. Try again later",
      success: false,
    });
  }
}
