// filename: backend/models/Log.js
const mongoose = require("mongoose");

// Simple activity log used by the admin dashboard.
const LogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    action: { type: String, required: true }, // e.g. "LOGIN", "RESUME_CREATED", "AI_SUMMARY_GENERATED"
    details: { type: String },
    ip: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Log", LogSchema);
