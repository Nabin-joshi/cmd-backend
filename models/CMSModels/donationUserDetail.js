const mongoose = require("mongoose");

const donationUserDetail = new mongoose.Schema({
  purchase_order_id: String,
  customer_info: {
    name: String,
    email: String,
    phone: String,
  },
});

const DonationUserDetail = mongoose.model(
  "donationUserDetails",
  donationUserDetail
);

module.exports = DonationUserDetail;
