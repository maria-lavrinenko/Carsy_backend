const router = require("express").Router();
const isAuthenticated = require("../middleware/authMiddlewares");
const Offer = require("../models/Offer.model");
/**
 * ! All the routes are prefixed by /api/my-offers
 * offers published by the currently logged in carDealer
 */
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const myOffers = await Offer.find({
      carDealer: req.userId,
    });
    console.log(req);
    res.json(myOffers);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
