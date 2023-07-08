const { Schema, model, models } = require("mongoose");

const settingSchema = new Schema(
  {
    name: { type: "string", required: true, unique: true },
    value: { type: Object }
  },
  { timestamps: true }
);

export const Setting = models?.Setting || model("Setting", settingSchema);
