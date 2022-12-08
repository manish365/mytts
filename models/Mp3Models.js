const mongoose = require("mongoose");
const { Schema } = require("../db/connection")
const Mp3Schema = new Schema({
 content_id: {
  type: String,
  required: true,
 },
 content_name: {
  type: String,
  required: true,
  unique: true,
 },
 mp3_name: {
  type: String,
  required: false,
 },
 is_deleated: {
  type: Boolean,
  required: true,
  default: false
 },
 status: {
  type: String,
  enum: ['active', 'hide'],
  default: 'active'
 },
 updated_date: {
  type: Date,
  default: Date.now(),
 },
 date: {
  type: Date,
  default: Date.now(),
 },
});
Mp3Schema.set('toJSON', {
 transform: (document, returnedObject) => {
  returnedObject.id = returnedObject._id.toString()
  delete returnedObject._id
  delete returnedObject.__v
 }
})

const Mp3 = mongoose.model("mp3", Mp3Schema);

module.exports = Mp3;