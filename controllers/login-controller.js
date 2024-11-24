import Joi from "joi";
import { jwtAudience, jwtIssuer, jwtSecret } from "../config/app-env.js";
import UserModel from "../models/user-model.js";
import { validateJoiSChema } from "../utils/validate-joi-schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginSchema = Joi.object({
  username: Joi.string().min(1).required(),
  password: Joi.string().min(1).required(),
});

export async function loginController(req, res, next) {
  try {
    const data = req.body;

    const payload = validateJoiSChema(data, loginSchema, {
      stripUnknown: true,
    });

    const user = await UserModel.findOne({
      username: payload.username,
    }).select('password');

    if (!user) {
      return res
        .status(404)
        .json({ message: "Username does not exist", success: false });
    }

    const passwordsMatch = await bcrypt.compare(
      payload.password,
      user.password
    );

    if (!passwordsMatch) {
      return res
        .status(401)
        .json({ message: "Username/password doe not match", success: false });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      jwtSecret,
      {
        expiresIn: `5m`,
        notBefore: "0",
        algorithm: "HS256",
        audience: jwtAudience,
        issuer: jwtIssuer,
      }
    );

    return res.status(200).json({ token, message: "Success", success: true });
  } catch (error) {
    return res.status(500).json({
      message: error.message ?? "Login failed. Try again later",
      success: false,
    });
  }
}
