const router = require("express").Router();
const isAuthenticated = require("./../middleware/authMiddlewares");

/**
 * ! All the routes are prefixed by /api
 */
router.get("/", async (req, res, next) => {
  res.json("All good!");
});

router.use("/auth", require("./auth.routes"));
router.use("/offers", require("./offers.routes"));

router.use(isAuthenticated);

router.use("/favourites", require("./favourites.routes"));

module.exports = router;
