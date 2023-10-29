const express = require("express");
const { BookModel } = require("../model/book.model");
const { auth } = require("../middleware/auth.middleware");

const bookRouter = express.Router();
bookRouter.use(auth);

/**
 * @swagger
 * /books/add:
 *   post:
 *     summary: Add a new book
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The auto-generated id of the user
 *               title:
 *                 type: string
 *               genre:
 *                 type: string
 *               author:
 *                 type: string
 *               publishing_year:
 *                 type: integer
 *               userID:
 *                 type: string
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book added
 *       400:
 *         description: Adding book failed
 */
bookRouter.post("/add", async (req, res) => {
  try {
    let book = new BookModel(req.body);
    await book.save();
    res.status(200).json({ msg: "Book added", addedBook: req.body });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get books
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retrieved books
 *       400:
 *         description: Error retrieving books
 */
bookRouter.get("/", async (req, res) => {
  try {
    let books = await BookModel.find({ username: req.body.username });
    res.status(200).json({ books });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

/**
 * @swagger
 * /books/update/{id}:
 *   patch:
 *     summary: Update a book by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book has been updated
 *       400:
 *         description: Update failed
 */
bookRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const book = await BookModel.findOne({ _id: id });
  try {
    if (req.body.userID === book.userID) {
      await BookModel.findByIdAndUpdate({ _id: id }, req.body);
      res.status(200).json({ msg: "Book has been updated" });
    } else {
      res.status(200).send({ msg: `You are not authorised!` });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

/**
 * @swagger
 * /books/delete/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID to delete
 *     responses:
 *       200:
 *         description: Book has been deleted
 *       400:
 *         description: Deletion failed
 */
bookRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const book = await BookModel.findOne({ _id: id });
  try {
    if (req.body.userID === book.userID) {
      await BookModel.findByIdAndDelete({ _id: id });
      res.status(200).json({ msg: "Book has been deleted" });
    } else {
      res.status(200).send({ msg: `You are not authorised!` });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

module.exports = { bookRouter };
