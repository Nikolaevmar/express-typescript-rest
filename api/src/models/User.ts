import mongoose, { Schema } from "mongoose";

interface User{
  first_name: String;
  last_name: String;
  email: String;
  password: String;
}

const UserSchema: Schema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.index(
  { email: 1 },
  {
    unique: true,
  }
);

export default mongoose.model<User>("User", UserSchema);
