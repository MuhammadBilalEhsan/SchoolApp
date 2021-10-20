const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  father_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roll: {
    type: String,
    required: true,
  },
  phone_no: {
    type: Number,
    required: true,
  },
  class_name: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
