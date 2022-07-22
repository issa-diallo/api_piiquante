const express = require("express");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const router = express.Router();

const sauceController = require("../controllers/sauceController");

router.get("/",  sauceController.getAllSauces);
router.post("/", auth, sauceController.createSauce);
router.get("/:id", auth, sauceController.getSauce);
router.put("/:id", auth, sauceController.modifySauce);
router.delete("/:id", auth, sauceController.deleteSauce);

module.exports = router;
