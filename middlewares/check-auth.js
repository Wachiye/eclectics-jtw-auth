import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import UserModel from "../models/user-model.js";
import { jwtAudience, jwtIssuer, jwtSecret } from "../config/app-env.js";

const checkAuth = async (req, res, next) => {
  let token = req.header("Authorization");

  if (!token)
    return res
      .status(401)
      .json({ message: "Missing authorization header", success: false });

  try {
    token = token.replace("Bearer ", "");

    jwt.verify(token, jwtSecret, {
      audience: jwtAudience,
      issuer: jwtIssuer,
    });

    const { id } = jwt.decode(token);

    if (!Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid user", success: false });

    const exists = await UserModel.findOne({
      _id: id,
    }).catch((err) => {
      return res.status(500).json({
        message: "Unable to retrieve the authenticated user details",
        success: false,
      });
    });

    if (!exists || exists === null)
      return res
        .status(400)
        .json({ message: "Invalid JTW token. User not found", success: false });

    req.user = { id: exists._id };

    next();
  } catch (err) {
    return res.status(401).json({
      message:
        err.message ??
        "Unable to verify authentication details. Try again later",
      success: false,
    });
  }
};

export default checkAuth;
