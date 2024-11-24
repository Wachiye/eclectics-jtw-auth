import UserModel from "../models/user-model.js";

export async function getUsersController(req, res, next) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    const users = await UserModel.find();
    return res
      .status(200)
      .json({ data: users, message: "success", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to fetch users.", success: false });
  }
}
