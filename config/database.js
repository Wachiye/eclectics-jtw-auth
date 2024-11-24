import mongoose from "mongoose";
import { dbUrl } from "./app-env.js";

export async function connectDb() {
  if (!dbUrl) {
    console.error("Missing DB URI");
    process.exit(1);
  }
  await mongoose
    .connect(dbUrl)
    .then(async () => {
      console.log("Mongodb Connected");
    })
    .catch((err) => {
      console.log("err connecting to database");
      console.log(err);
    });
}

export function disconnectDb() {
  mongoose.connection.close(function () {
    process.exit(0);
  });
}
