const mongoose = require("mongoose");
const { Schema, model } = require("../db/connection")
const UserSchema = new Schema({
 username: {
  type: String,
  required: true,
 },
 email: {
  type: String,
  required: true,
  unique: true,
 },
 password: {
  type: String,
  required: true,
 },
 date: {
  type: Date,
  default: Date.now(),
 },
});
UserSchema.set('toJSON', {
 transform: (document, returnedObject) => {
  returnedObject.id = returnedObject._id.toString()
  delete returnedObject._id
  delete returnedObject.__v
  delete returnedObject.password
 }
})

const User = mongoose.model("user", UserSchema);

module.exports = User;