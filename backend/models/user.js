const mongoose = require("mongoose");
const valid = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    require: true,
    minlength: 6,
  },
  image: { type: String, require: true },
  places: [{ type: mongoose.Types.ObjectId, require: true, ref: "Place" }],
});

userSchema.plugin(valid);

module.exports = mongoose.model("User", userSchema);
