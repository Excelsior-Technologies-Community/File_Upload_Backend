const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  filename: String,
  url: String,
  public_id: String,
  size: Number,
  mimeType: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("File", FileSchema);
