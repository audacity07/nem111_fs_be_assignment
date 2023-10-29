const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: String,
    genre: String,
    author: String,
    publishing_year: Number,
    userID: String,
    username: String,
  },
  {
    versionKey: false,
  }
);

const BookModel = mongoose.model("books", bookSchema);
module.exports = { BookModel };
