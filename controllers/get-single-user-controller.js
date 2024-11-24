import { Types } from "mongoose";
import UserModel from "../models/user-model.js";

export async function getSingleSUserController(req, res, next) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    const id = req.params.id;
    if (!Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "Invalid user id", success: false });
    }

    const user = await UserModel.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "Not Found", success: false });
    }

    return res
      .status(200)
      .json({ data: user, message: "success", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to fetch user.", success: false });
  }
}
