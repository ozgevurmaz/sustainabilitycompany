import mongoose, { Schema, model, models } from "mongoose";

const categoriesSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        postCount: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

const Categories = models.Categories || model("Categories", categoriesSchema);

export default Categories;
