const mongoose = require("mongoose");
const { Schema } = mongoose;

const interactionSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  content_id: {
    type: String,
    required: true,
  },
  event: {
    type: String,
    required: true,
    enum: ['like', 'read']
  },
  interaction_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Interaction", interactionSchema);
