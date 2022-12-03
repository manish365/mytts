require("dotenv").config()
const mongoose = require("mongoose")
const { DATABASE_URL } = process.env;
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection
 .on("open", () => console.log("Connected to Mongo"))
 .on("close", () => console.log("Disconnected from Mongo"))
 .on("error", error => console.log(error));

module.exports = mongoose

// brew services start mongodb-community@6.0
// brew services stop mongodb-community@6.0
// mongodb+srv://manishanjali:jmKJegDxIYU48tTr@cluster0.tig8hxx.mongodb.net/mytts/?retryWrites=true&w=majority
