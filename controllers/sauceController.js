const sauceModel = require("../models/sauceModel");
const fs = require("fs");

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
  res.status(201).json({ message: "Thank you, your sauce has been created !" });
  next();
};

/**
 * Get all sauces from the database and  the sauces in the response.
 */
exports.getAllSauces = async (req, res, next) => {
  const sauces = await sauceModel.find();
  res.status(200).json(sauces);
  next();
};

/**
 * Get a sauce from the database and  the sauce in the response.
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
  const filename = sauce.imageUrl.split("/images/")[1];
  // Delete the image from the images folder.
  fs.unlink(`images/${filename}`, () => {
    console.log("File deleted");
    // If the user is the owner of the sauce, he can delete it.
  });
  // The user is not the owner of the sauce, he can't modify it.
  if (sauce.userId !== req.auth.userId) {
    res.status(401).json({ message: "Not authorized" });
  }
  // If the user is the owner of the sauce, he can modify it.
  await sauceModel.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  );
  res.status(200).json({ message: "Thank you, your sauce has been updated !" });
  next();
};

/**
 * Delete a sauce from the database and  the deleted sauce in the response.
 */
exports.deleteSauce = async (req, res, next) => {
  const sauce = await sauceModel.findOne({ _id: req.params.id });
  // If the user is not the owner of the sauce, he can't delete it.
  if (sauce.userId !== req.auth.userId) {
    return res.status(401).json({ message: "Not authorized" });
  }
  // Delete the image from the images folder.
  const filename = sauce.imageUrl.split("/images/")[1];
  if (filename) {
    fs.unlink(`images/${filename}`, () => {
      console.log("File deleted");
    });
  }
  // Delete the sauce from the database.
  await sauceModel.deleteOne({ _id: req.params.id });
  res.status(204).json({ message: "Thank you, your sauce has been deleted !" });
  next();
};
