const express = require("express");
const { connectToDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");

const app = express();
app.use(express.json()); /// Middleware

// db connection
let db;
connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log(`App started on port 3000`);
    });
    db = getDb();
  }
});

//Routes
app.get("/books", (req, res) => {
  let books = [];

  ///for pagination
  let page = req.query.p || 0;
  let booksPerPage = 2;
  ///------------------------- (Skip and limit is a part of pagination)
  ///-------------------------  (Video - https://youtu.be/zOI6W0DiYPc)
  db.collection("books")
    .find()
    .skip(page * booksPerPage)
    .limit(booksPerPage)
    .sort({ writer: 1 })
    .forEach((book) => {
      books.push(book);
    })
    .then(() => res.status(200).json(books))
    .catch(() => res.status(500).json({ error: `Could not fetch document` }));
});

app.get("/books/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("books")
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((doc) => res.status(200).json(doc))
      .catch(() =>
        res.status(500).json({ error: `Could not found id: ${req.params.id}` })
      );
  } else {
    res.status(500).json({ error: `Not Valid Document id: ${req.params.id}` });
  }
});

/// POST REQUEST
app.post("/books", (req, res) => {
  const book = req.body;
  db.collection("books")
    .insertOne(book)
    .then((result) => res.status(201).json(result))
    .catch((err) =>
      res.status(500).json({ error: "Could not create document" })
    );
});
// commit 
// new comment
/// DELETE REQUEST
app.delete("/books/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("books")
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then((result) => res.status(200).json(result))
      .catch(() =>
        res.status(500).json({
          error: `Could not delete the document based on id ${req.params.id}`,
        })
      );
  } else {
    res.status(500).json({ error: `not a valid id (${req.params.id})` });
  }
});

///PATCH REQUEST (Use for updating values)
app.patch("/books/:id", (req, res) => {
  const updates = req.body;

  if (ObjectId.isValid(req.params.id)) {
    db.collection("books")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
      .then((result) => res.status(200).json(result))
      .catch(() =>
        res.status(500).json({ error: `Could not update the document` })
      );
  } else {
    res.status(500).json({ error: `Not a valid ID (${req.params.id})` });
  }
});
