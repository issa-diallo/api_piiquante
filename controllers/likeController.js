const sauceModel = require("../models/sauceModel");

exports.likeSauce = async (req, res, next) => {
  try {
    const sauce = await sauceModel.findOne({ _id: req.params.id });
    console.log(req.body);

    const isLiked = sauce.usersLiked.includes(req.body.userId);
    const isDisLiked = sauce.usersDisliked.includes(req.body.userId);

    if (!isLiked && req.body.like == 1) {
      console.log("userId is not in usersLiked BDD and request front like 1");
      await sauceModel.updateOne(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
          $push: { usersLiked: req.body.userId },
        }
      );
      res.status(201).json({ message: "Your like has been added !" });
    }

    if (isLiked && req.body.like == 0) {
      console.log("userId is in usersLiked BDD and request front like 0");
      await sauceModel.updateOne(
        { _id: req.params.id },
        {
          $inc: { likes: -1 },
          $pull: { usersLiked: req.body.userId },
        }
      );
      res.status(201).json({ message: "Your like has been removed !" });
    }

    if (!isDisLiked && req.body.like == -1) {
      console.log(
        "userId is not in usersDisliked BDD and request front like -1"
      );
      await sauceModel.updateOne(
        { _id: req.params.id },
        {
          $inc: { dislikes: 1 },
          $push: { usersDisliked: req.body.userId },
        }
      );
      res.status(201).json({ message: "Your dislike has been added !" });
    }

    if (isDisLiked && req.body.like == 0) {
        console.log("userId is in usersDisliked BDD and request front like 0");
        await sauceModel.updateOne(
            { _id: req.params.id },
            {
            $inc: { dislikes: -1 },
            $pull: { usersDisliked: req.body.userId },
            }
        );
        res.status(201).json({ message: "Your dislike has been removed !" });
    }
  } catch (error) {
    res.status(404).json({ error });
  }

  next();
};
