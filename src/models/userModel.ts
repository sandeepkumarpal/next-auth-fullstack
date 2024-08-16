import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the User document
interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  forgotPasswordToken: string;
  forgotPasswordTokenExpiry: Date;
  verifyToken: string;
  verifyTokenExpiry: Date;
}

// Define the user schema using the interface
const userSchema: Schema<IUser> = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "username is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

// Create a Mongoose model based on the schema and interface
const User =
  mongoose.models.users || mongoose.model<IUser>("users", userSchema);

export default User;
