const router = require("express").Router();
const mongoose = require("mongoose");
const Store = require("../../models/Store");

router.get("/getStores", (req, res) => {
  try {
    Store.find().then((response) => res.send(response));
  } catch (err) {
    res.send("Error");
  }
});

router.get("/getStores/:adminId", async (req, res) => {
  Store.find({ adminId: req.params.adminId }, function (err, data) {
    if (err) {
      return res.json({ err: err });
    } else {
      if (data !== []) {
        res.send(data);
      } else {
        res.send("No stores");
      }
    }
  });
});

router.post("/addStore/:adminId", (req, res) => {
  const store = new Store({
    storeName: req.body.shopName,
    address: req.body.shopAddress,
    category: req.body.shopCategory,
    city: req.body.shopCity,
    adminId: mongoose.Types.ObjectId(req.params.adminId),
    cityData: req.body.cityData,
    addressData: req.body.addressData,
  });
  store.save().then((response) => res.send("Succesful"));
});

module.exports = router;
