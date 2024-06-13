import mongoose, { Document, Schema, Model } from "mongoose";
import validator from "validator";

interface IUser extends Document {
  _id: string;
  name: string;
  photo: string;
  role: "admin" | "user";
  email: string;
  gender: "male" | "female";
  dob: Date;
  createdAt: Date;
  updatedAt: Date;
  //virtual schema
  age: number;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, "ID is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "Please enter a valid email",
      },
    },
    photo: {
      type: String,
      required: [true, "Photo is required"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Please provide your genders"],
    },
    dob: {
      type: Date,
      required: [true, "Please provide your date of birth"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // Include virtuals when toJSON is called
    toObject: { virtuals: true }, // Include virtuals when toObject is called
  }
);

userSchema.virtual("age").get(function () {
  const today = new Date();
  const dob = this.dob;
  let age = today.getFullYear() - dob.getFullYear();
  if (
    today.getMonth < dob.getMonth ||
    (today.getMonth === dob.getMonth && today.getDate() < dob.getDate())
  ) {
    age--;
  }
  return age;
});

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export { User, IUser };
