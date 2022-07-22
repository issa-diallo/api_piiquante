const express = require("express");
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

/**
 * mongoose is a library that allows us
 * to connect to a mongodb database
 */
const mongoose = require("mongoose");
main().catch((err) => console.log(err + "\n" + err.stack));
async function main() {
  await mongoose.connect("mongodb://localhost:27017/sauces");
  console.log("Connected to MongoDB");
}

const sauceRoutes = require("./route/sauceRoute");
const userRoutes = require("./route/userRoute");

/**
 * To handle the POST request coming from the front-end application,
 * we need to extract the JSON body. For this,
 * you just need a very simple middleware,
 * provided by the Express framework.
 */
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,PATCH,OPTIONS"
  );
  next();
});

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
