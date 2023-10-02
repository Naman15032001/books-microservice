const mongoose = require("mongoose");
const { Schema } = mongoose;

const contentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  story: {
    type: String,
    required: true,
  },
  date_published: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Content", contentSchema);
