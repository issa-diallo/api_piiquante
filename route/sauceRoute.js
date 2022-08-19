const express = require("express");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const router = express.Router();

const sauceController = require("../controllers/sauceController");
const likeController = require("../controllers/likeController");

// Create a new sauce in the database and return the created sauce in the response.
router.post("/", auth, multer, sauceController.createSauce);
// Get all the sauces in the database and return them in the response.
router.get("/", auth, sauceController.getAllSauces);
// Get a sauce by its id in the database and return the sauce in the response.
router.get("/:id", auth, sauceController.getSauce);
// Update a sauce in the database and return the updated sauce in the response.
router.put("/:id", auth, multer, sauceController.modifySauce);
// Delete a sauce in the database and return the deleted sauce in the response.
router.delete("/:id", auth, sauceController.deleteSauce);
// Like a sauce and return the updated sauce in the response.
router.post("/:id/like", auth, likeController.likeSauce);

module.exports = router;
