const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema({
    full_name: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    },
    profile_image: {
      type: String,
    }
  },
{
      timestamps: true,
      versionKey: false,
    });

module.exports = Mongoose.model("user", UserSchema);