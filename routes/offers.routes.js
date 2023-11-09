const router = require("express").Router();
const Offer = require("./../models/Offer.model");

/**
 * ! All the routes are prefixed by /api/offers
 */

router.get("/", async (req, res, next) => {
  const query = {};
  const queryCond = [];

  if (req.query.brand) {
    query.brand = new RegExp(req.query.brand, "gi");
    queryCond.push({ brand: query.brand });
  }
  if (req.query.model) {
    query.model = new RegExp(req.query.model, "gi");
    queryCond.push({ model: query.model });
  }
  if (req.query.price) {
    query.price = new RegExp(req.query.price, "\\d", "g");
    queryCond.push({ price: query.price });
  }
  if (req.query.energy) {
    query.energy = new RegExp(req.query.energy, "gi");
    queryCond.push({ energy: query.energy });
  }
  if (req.query.city) {
    query.city = new RegExp(req.query.city, "gi");
  }

  try {
    const allOffers = await Offer.aggregate([
      {
        $match: queryCond.length > 0 ? { $and: queryCond } : {},
      },
      {
        $lookup: {
          from: "users",
          localField: "carDealer",
          foreignField: "_id",
          as: "result",
        },
      },
      {
        $match: {
          "result.0.city": query.city,
        },
      },
      {
        $project: {
          brand: 1,
          model: 1,
          price: 1,
          photo: 1,
          "result.city": 1,
        },
      },
    ]);

    res.json(allOffers);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const oneOffer = await Offer.find({ _id: id }).populate({
      path: "carDealer",
      select: " -createdAt -updatedAt",
    });
    res.json(oneOffer);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
