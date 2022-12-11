const mongoose = require("mongoose");
const { Schema, model } = require("../db/connection")
const StoriesSchema = new Schema({
 heading: {
  type: String,
  required: true,
 },
 slug: {
  type: String,
  required: true,
  unique: true,
 },
 category: {
  type: String,
  required: true,
 },
 description: {
  type: String,
  required: true,
 },
 audio_url: {
  type: String,
  required: false,
 },
 video_url: {
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
StoriesSchema.set('toJSON', {
 transform: (document, returnedObject) => {
  returnedObject.id = returnedObject._id.toString()
  delete returnedObject._id
  delete returnedObject.__v
  delete returnedObject.password
 }
})

const Stories = mongoose.model("stories", StoriesSchema);

module.exports = Stories;