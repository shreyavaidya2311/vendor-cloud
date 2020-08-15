const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
  storeName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  adminId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  cityData: {
    type: Array,
    required: true,
  },
  addressData: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("stores", StoreSchema);
