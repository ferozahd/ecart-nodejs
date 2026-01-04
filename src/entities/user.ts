import mongoose, { Schema, Model, Types } from "mongoose";

/** User document interface (NO Document inheritance) */
export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  role: "USER" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
}

/** Schema */
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER"
    }
  },
  {
    timestamps: true
  }
);

/** Typed model */
const UserModel: Model<IUser> =  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default UserModel;
