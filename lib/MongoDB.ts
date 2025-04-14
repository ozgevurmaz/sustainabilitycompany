import mongoose from "mongoose";

let isConnection: boolean = false;

export const connectToDB = async (): Promise<void> => {  
  mongoose.set("strictQuery", true);

  if (isConnection) {
    console.log("mongoDB is already connected.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "FutureFootprint",
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
  }
};