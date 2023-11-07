const router = require("express").Router();
// const { isAuthenticated } = require("./../middlewares/authMiddlewares");

/**
 * ! All the routes are prefixed by /api
 */
router.get("/", async (req, res, next) => {
  res.json("All good!");
});

router.use("/auth", require("./auth.routes"));

// router.use(isAuthenticated);

module.exports = router;
