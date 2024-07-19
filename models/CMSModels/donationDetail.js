const mongoose = require("mongoose");

const donationDetail = new mongoose.Schema({
  pidx: String,
  total_amount: Number,
  status: String,
  transaction_id: String,
  fee: String,
  refunded: String,
  purchase_order_id: String,
});

const DonationDetail = mongoose.model("donationDetails", donationDetail);

module.exports = DonationDetail;
