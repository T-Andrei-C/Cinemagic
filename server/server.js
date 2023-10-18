require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const app = express();

const port = 5000;
const {MONGO_URL} = process.env;

const moviesRouter = require("./routes/Movies");
const favoriteMoviesRouter = require("./routes/FavoriteMovies");
const cartRouter = require("./routes/Cart");
const ordersRouter = require("./routes/Orders")

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

app.use(cors());
app.use(express.json());

app.use("/api/movies", moviesRouter);
app.use("/favorites", favoriteMoviesRouter);
app.use("/cart", cartRouter);
app.use("/orders", ordersRouter);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
      "Access-Control-Allow-Methods",
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(port, () => console.log(`http://127.0.0.1:${port}/api/movies`));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});