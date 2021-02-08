const express = require("express");
const { v4: uuid } = require("uuid");
const { isWebUrl } = require("valid-url");
const logger = require("../logger");
const store = "../store";

const bookmarksRouter = express.Router();
const bodyParser = express.json();

bookmarksRouter
  .route("/bookmarks")
  .get((req, res) => {
    res.json(store.bookmarks);
  })
  .post(bodyParser, (req, res) => {
    for (const field of ["title", "url", "rating"]) {
      if (!req.body[field]) {
        logger.error(`${field} is required.`);
        return res.status(400).send(`${field} is required`);
      }
    }

    if (!Number.isInteger(rating) || rating < 0 || rating > 5) {
      logger.error(`Invalid rating of ${rating} is supplied`);
      return res.status(400).send(`Rating must be between 0 and 5.`);
    }

    if (!isWebUrl(url)) {
      logger.error(`Invalid url of '${url}' supplied`);
      return res.status(400).send(`Must be a valid URL`);
    }

    const bookmark = { id: uurl(), title, url, description, rating };

    store.bookmarks.push(bookmark);

    logger.info(`Bookmark id ${bookmark.id} created.`);
    res
      .status(201)
      .location(`http://localhost:8000/bookmarks/${bookmark.id}`)
      .json(bookmark);
  });

bookmarksRouter
  .route("/bookmarks/:bookmarkId")
  .get((req, res) => {
    const { bookmarkId } = req.params;
    const bookmark = store.bookmarks.find((c) => c.id == bookmarkId);

    if (!bookmark) {
      logger.error(`Bookmark with id ${bookmarkId} not found.`);
      return res.status(404).send("Bookmark not found");
    }

    res.json(bookmark);
  })
  .delete((req, res) => {
    const { bookmarkId } = req.params;
    const bookmarkIndex = store.bookmarks.findIndex((b) => b.id === bookmarkId);

    if (bookmarkIndex === -1) {
      logger.error(`Bookmark with id ${bookmarkId} not found.`);
      return res.status(404).send("Bookmark not found");
    }

    store.bookmarks.splice(bookmarkIndex, 1);

    logger.info(`Bookmark with id ${bookmarkId} deleted.`);
    res.status(204).end();
  });

module.exports = bookmarksRouter;
