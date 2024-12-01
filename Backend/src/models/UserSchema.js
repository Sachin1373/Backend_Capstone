import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength : 3,
    maxlength : 50,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    minlength : 5,
    maxlength : 50,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    minlength : 10,
    maxlength : 50,
    unique: true,
  },

  password: {
    type: String,
    minlength : 5,
    maxlength : 50,
    required: true,
  },
},{ timestamps: true });

const User = mongoose.model("User", userSchema);

export default User