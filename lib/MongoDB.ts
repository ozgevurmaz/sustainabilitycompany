import mongoose from "mongoose";

let isConnection: boolean = false;

export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnection) {
    console.log("mongoDB is already connected.");
    return;
  }

  try {
    mongoose.connect(process.env.MONGODB_URL || "", {
      dbName: "FutureFootprint",
    });
    isConnection = true;
    console.log("mongoDB is connected")
  } catch (error) {
    console.log(error);
  }
};