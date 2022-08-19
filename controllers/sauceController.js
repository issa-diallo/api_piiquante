const sauceModel = require("../models/sauceModel");
const fs = require("fs");

const sauceAllowedOr401 = (sauce, userId, res) => {
  if (sauce.userId !== userId) {
    res.status(401).json({ message: "Not authorized" });
  }
};

/**
 * Create a new sauce in the database.
 */
exports.createSauce = async (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  // Add new object sauce.
  const sauce = new sauceModel({
    ...sauceObject,
    likes: 0,
    dislikes: 0,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    userId: req.auth.userId,
  });
  // Save the new sauce in the database.
  await sauce.save();
  res.status(201).json({ message: "Thank you, your sauce has been created!" });
  next();
};

/**
 * Get all sauces from the database and return then in the response.
 */
exports.getAllSauces = async (req, res, next) => {
  const sauces = await sauceModel.find();
  res.status(200).json(sauces);
  next();
};

/**
 * Get a sauce from the database and return it in the response.
 */
exports.getSauce = async (req, res, next) => {
  const sauce = await sauceModel.findOne({ _id: req.params.id });
  res.status(200).json(sauce);
  next();
};

/**
 * Update a sauce in the database and  the updated sauce in the response.
 */
exports.modifySauce = async (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  // If the user is not the owner of the sauce, he can't modify it.
  const sauce = await sauceModel.findOne({ _id: req.params.id });
  // The user is not the owner of the sauce, he can't modify it.
  sauceAllowedOr401(sauce, req.auth.userId, res);
  const filename = sauce.imageUrl.split("/images/")[1];
  // Delete the image from the images folder.
  fs.unlink(`images/${filename}`, () => {});
  // If the user is the owner of the sauce, he can modify it.
  await sauceModel.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  );
  res.status(200).json({ message: "Thank you, your sauce has been updated!" });
  next();
};

/**
 * Delete a sauce from the database and  the deleted sauce in the response.
 */
exports.deleteSauce = async (req, res, next) => {
  const sauce = await sauceModel.findOne({ _id: req.params.id });
  // If the user is not the owner of the sauce, he can't delete it.
  sauceAllowedOr401(sauce, req.auth.userId, res);
  // Delete the image from the images folder.
  const filename = sauce.imageUrl.split("/images/")[1];
  if (filename) {
    fs.unlink(`images/${filename}`, () => {});
    // Delete the sauce from the database.
    await sauceModel.deleteOne({ _id: req.params.id });
    res
      .status(204)
      .json({ message: "Thank you, your sauce has been deleted!" });
  }
  next();
};
