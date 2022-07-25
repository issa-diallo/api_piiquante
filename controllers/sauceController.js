const sauceModel = require("../models/sauceModel");

/**
 * Create a new sauce in the database and return the created sauce in the response.
 */
exports.createSauce = async (req, res, next) => {
  const sauce = new sauceModel({
    ...req.body,
  });
  await sauce.save();
  res.status(201).json(sauce);
  res.status(400).json({ error: err });
};

/**
 * Update a sauce in the database and return the updated sauce in the response.
 */
exports.modifySauce = async (req, res, next) => {
  const sauce = await sauceModel.updateOne(
    { _id: req.params.id },
    { ...req.body, _id: req.params.id }
  );
  res.status(200).json({ message: "Sauce updated!" });
  res.status(400).json({ error: err });
};

/**
 * Delete a sauce from the database and return the deleted sauce in the response.
 */
exports.deleteSauce = async (req, res, next) => {
  try {
    const sauce = await sauceModel.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Sauce deleted!" });
  } catch (error) {
    res.status(400).json({ error: err });
  }
};
/**
 * Get a sauce from the database and return the sauce in the response.
 */
exports.getSauce = async (req, res, next) => {
  try {
    debugger
    const sauce = await sauceModel.findOne({ _id: req.params.id });
    res.status(200).json(sauce);
  } catch (error) {
    res.status(404).json({ error: err });
  }
};

/**
 * Get all sauces from the database and return the sauces in the response.
 */
exports.getAllSauces = async (req, res, next) => {
  try {
    const sauces = await sauceModel.find();
    res.status(200).json(sauces);
  } catch (error) {
    res.status(400).json({ error: err });
  }
};
