const router = require("express").Router();
const mongoose = require("mongoose");
const fileUploader = require("./../config/cloudinaryConfig");
const Offer = require("./../models/Offer.model");
const Favourite = require("../models/Favourite.model");
const isAuthenticated = require("./../middleware/authMiddlewares");
/**
 * ! All the routes are prefixed by /api/offers
 */

router.get("/", async (req, res, next) => {
  const query = {};
  const queryCond = [];
  console.log(typeof req.query.carDealer);

  if (req.query.brand) {
    query.brand = new RegExp(req.query.brand, "gi");
    queryCond.push({ brand: query.brand });
  }
  if (req.query.model) {
    query.model = new RegExp(req.query.model, "gi");
    queryCond.push({ model: query.model });
  }
  if (req.query.price) {
    // query.price = new RegExp(req.query.price, "\\d", "g");
    queryCond.push({ price: { $lte: `${req.query.price}` } });
  }
  if (req.query.energy) {
    query.energy = new RegExp(req.query.energy, "gi");
    queryCond.push({ energy: query.energy });
  }
  if (req.query.city) {
    query.city = new RegExp(req.query.city, "gi");
  }
  if (isAuthenticated && req.query.carDealer) {
    query.carDealer = req.query.carDealer;
    queryCond.push({ carDealer: new mongoose.Types.ObjectId(query.carDealer) });
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
          "result.0.address.city": query.city,
        },
      },
      {
        $project: {
          brand: 1,
          model: 1,
          price: 1,
          photo: 1,
          carDealer: 1,
          "result.address.city": 1,
        },
      },
    ]);

    res.json(allOffers);
  } catch (error) {
    next(error);
  }
});

// available only for the logged in users

router.get("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const oneOffer = await Offer.find({ _id: req.params.id }).populate({
      path: "carDealer",
      select: " -createdAt -updatedAt",
    });
    res.json(oneOffer);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/favourites", isAuthenticated, async (req, res, next) => {
  const alreadyExists = await Favourite.findOne({
    offer: req.params.id,
    user: req.userId,
  });
  if (alreadyExists) {
    return res.status(400).json({ message: "Already added" });
  }
  try {
    const newFavourite = await Favourite.create({
      offer: req.params.id,
      user: req.userId,
    });
    res.status(201).json(newFavourite);
  } catch (error) {
    next(error);
  }
});

// available only for the owner of the offer

router.put(
  "/:id",
  isAuthenticated,
  fileUploader.any("photo"),
  async (req, res, next) => {
    try {
      let photo;
      if (req.files && req.files.length < 11) {
        photo = req.files.map((file) => file.path);
      }
      const updatedOffer = await Offer.findOneAndUpdate(
        {
          carDealer: req.userId,
          _id: req.params.id,
        },
        { ...req.body, photo: photo },
        { new: true }
      ).populate("carDealer");
      if (!updatedOffer) {
        return res.status(401).json({ message: "Not allowed" });
      }
      res.status(202).json(updatedOffer);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", isAuthenticated, async (req, res, next) => {
  try {
    await Offer.findOneAndDelete({ carDealer: req.userId, _id: req.params.id });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  isAuthenticated,
  fileUploader.any("photo"),
  async (req, res, next) => {
    console.log(req.files);

    try {
      let photo;
      if (req.files.length) {
        photo = req.files.map((file) => file.path);
      } else {
        photo = ["carsy-logo.png"];
      }
      const offerToCreate = { ...req.body, photo, carDealer: req.userId };
      const newOffer = await Offer.create(offerToCreate);
      res.status(201).json(newOffer);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
