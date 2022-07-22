const sauceModel = require("../models/sauceModel");

/**
 * Create a new sauce in the database and return the created sauce in the response.
 */
exports.createSauce = (req, res, next) => {
  const sauce = new sauceModel({
    ...req.body,
  });
  sauce
    .save()
    .then(() => res.status(201).json(sauce))
    .catch((err) => res.status(400).json({ error: err }));
};

/**
 * Update a sauce in the database and return the updated sauce in the response.
 */
exports.modifySauce = (req, res, next) => {
  sauceModel.updateOne(
    { _id: req.params.id },
    { ...req.body, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Sauce updated!" }))
    .catch((err) => res.status(400).json({ error: err }));
};

/**
 * Delete a sauce from the database and return the deleted sauce in the response.
 */
exports.deleteSauce = (req, res, next) => {
  sauceModel.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Sauce deleted!" }))
    .catch((err) => res.status(400).json({ error: err }));
};
/**
 * Get a sauce from the database and return the sauce in the response.
 */
exports.getSauce = (req, res, next) => {
  sauceModel.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((err) => res.status(404).json({ error: err }));
};

/**
 * Get all sauces from the database and return the sauces in the response.
 */
exports.getAllSauces = (req, res, next) => {
  // sauceModel.find()
  //   .then(() => res.status(200).json(sauces))
  //   .catch((err) => res.status(400).json({ error: err }));
  res.send("Hello World");
  // res.status(200).json({
  //   userId: "user._id",
  //   token: "foo",
  // });
};
