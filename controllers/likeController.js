const sauceModel = require('../models/sauceModel')

exports.likeSauce = async (req, res, next) => {
    try {
        // Get the sauce from the database.
        const sauce = await sauceModel.findOne({ _id: req.params.id })

        // Verify if the user is in the list
        const hasLiked = sauce.usersLiked.includes(req.body.userId)
        const isDisLiked = sauce.usersDisliked.includes(req.body.userId)

        // If the user is not in the list, he can like the sauce.
        if (!hasLiked && req.body.like == 1) {
            await sauceModel.updateOne(
                { _id: req.params.id },
                {
                    $inc: { likes: 1 },
                    $push: { usersLiked: req.body.userId },
                }
            )
            res.status(201).json({ message: 'Your like has been added !' })
        }

        // If the user has already liked the sauce, he can't like it again.
        if (hasLiked && req.body.like == 0) {
            await sauceModel.updateOne(
                { _id: req.params.id },
                {
                    $inc: { likes: -1 },
                    $pull: { usersLiked: req.body.userId },
                }
            )
            res.status(201).json({ message: 'Your like has been removed !' })
        }

        // If the user is not in the list, he can dislike the sauce.
        if (!isDisLiked && req.body.like == -1) {
            await sauceModel.updateOne(
                { _id: req.params.id },
                {
                    $inc: { dislikes: 1 },
                    $push: { usersDisliked: req.body.userId },
                }
            )
            res.status(201).json({ message: 'Your dislike has been added !' })
        }

        // If the user has already disliked the sauce, he can't dislike it again.
        if (isDisLiked && req.body.like == 0) {
            await sauceModel.updateOne(
                { _id: req.params.id },
                {
                    $inc: { dislikes: -1 },
                    $pull: { usersDisliked: req.body.userId },
                }
            )
            res.status(201).json({ message: 'Your dislike has been removed !' })
        }
    } catch (error) {
        res.status(500).json({ error })
    }
    next()
}
