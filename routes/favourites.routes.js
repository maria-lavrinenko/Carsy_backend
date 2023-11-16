const router = require("express").Router();
const isAuthenticated = require("./../middleware/authMiddlewares");
const Favourite = require("./../models/Favourite.model");
/**
 * ! All the routes are prefixed by /api/favourites
 */
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const allFavourites = await Favourite.find({ user: req.userId }).populate(
      "offer"
    );

    res.json(allFavourites);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
