const sauceModel = require("../models/sauceModel");
const fs = require("fs");
/**
 * Create a new sauce in the database and  the created sauce in the response.
 */
exports.createSauce = async (req, res, next) => {
  // If the user is not logged in, he can't create a new sauce.
  if (!req.auth) {
    res.status(401).json({ message: "Not authorized" });
    next();
  } else {
    try {
      // If the user is logged in, he can create a new sauce.
      const sauceObject = JSON.parse(req.body.sauce);
      console.log(sauceObject);
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
      const sauceCreated = await sauce.save();
      //  the message in the response.
      console.log(sauceCreated);
       res
        .status(201)
        .json({ message: "Thank you, your sauce has been created !" });
    } catch (error) {
      // If the user is not logged in, he can't create a new sauce.
      console.log({
        message: "Sorry, an error has occured. Thank you again later !",error
      });
       res.status(500).json({ error });
       next();
    }
  }
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
  try {
    const filename = sauce.imageUrl.split("/images/")[1];
    // Delete the image from the images folder.
    fs.unlink(`images/${filename}`, () => {
      console.log("File deleted");
      // If the user is the owner of the sauce, he can delete it.
    });
  } catch (error) {
     res.status(404).json({ error });
     next();
  }

  if (sauce.userId !== req.auth.userId) {
    res.status(404).json({ message: "Not authorized" });
    next();
  } else {
    try {
      // If the user is the owner of the sauce, he can modify it.
      const newSauce = await sauceModel.updateOne(
        { _id: req.params.id },
        { ...sauceObject, _id: req.params.id }
      );
       res
        .status(200)
        .json({ message: "Thank you, your sauce has been updated !" });
    } catch (error) {
       res.status(400).json({ error });
       next();
    }
  }
};
/**
 * Delete a sauce from the database and  the deleted sauce in the response.
 */
exports.deleteSauce = async (req, res, next) => {
  // If the user is not the owner of the sauce, he can't delete it.
  const sauce = await sauceModel.findOne({ _id: req.params.id });
  if (sauce.userId !== req.auth.userId) {
    res.status(404).json({ message: "Not authorized" });
    next();
  } else {
    try {
      const filename = sauce.imageUrl.split("/images/")[1];
      // Delete the image from the images folder.
      fs.unlink(`images/${filename}`, () => {
        console.log("File deleted");
        // If the user is the owner of the sauce, he can delete it.
      });
      const deletedSauce = await sauceModel.deleteOne({ _id: req.params.id });
      console.log(deletedSauce);
       res.status(204).json({message: "Thank you, your sauce has been deleted !"});
    } catch (error) {
       res.status(404).json({ error });
       next();
    }
  }
};

/**
 * Get a sauce from the database and  the sauce in the response.
 */
exports.getSauce = async (req, res, next) => {
  try {
    const sauce = await sauceModel.findOne({ _id: req.params.id });
     res.status(200).json(sauce);
  } catch (error) {
     res.status(403).json({ error });
     next();
  }
};
/**
 * Get all sauces from the database and  the sauces in the response.
 */
exports.getAllSauces = async (req, res, next) => {
  try {
    const sauces = await sauceModel.find();
     res.status(200).json(sauces);
  } catch (error) {
     res.status(403).json({ error });
     next();
  }
};
