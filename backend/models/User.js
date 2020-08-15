const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
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
  orders: {
    type: Array,
    required: false,
  },
  userType: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  address: {
    type: String,
    required: true,
  },
  addressData: {
    type: Array,
    required: true,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
