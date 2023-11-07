require("dotenv").config({ path: "./../.env" });
const User = require("../models/User.model");
require("./../db/index");
const { faker } = require("@faker-js/faker");

// IIFE
/**
 * Immediately
 * Invoked
 * Function
 * Execution
 */
const availableSizes = ["XL", "L", "M", "S", "XS"];

(async function () {
  await Costume.deleteMany();
  const costumes = [];
  for (let i = 0; i < 50; i++) {
    const costume = {
      title: faker.commerce.productName(),
      size: availableSizes[Math.floor(Math.random() * availableSizes.length)],
      price: faker.commerce.price({ min: 10 }),
      description: faker.commerce.productDescription(),
    };
    costumes.push(costume);
  }
  await Costume.create(costumes);
  console.log(`Created ${costumes.length} costumes...`);
  process.exit();
})();
