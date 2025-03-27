import mongoose from "mongoose";

let isConnection: boolean = false;

const MONGODB_URL = process.env.MONGODB_URL || "";

if (!MONGODB_URL) {
  throw new Error("MONGODB_URI is not defined in .env file");
}

export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnection) {
    console.log("mongoDB is already connected.");
    return;
  }

  try {
    mongoose.connect(MONGODB_URL || "", {
      dbName: "FutureFootprint",
    });
  } catch (error) {
    console.log(error);
  }
};
