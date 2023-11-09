require("dotenv").config({ path: "./../.env" });
const Offer = require("../models/Offer.model.js");
require("./../db/index.js");
const { faker } = require("@faker-js/faker");

(async function () {
  try {
    await Offer.deleteMany();
    const offers = [];
    const carDealers = ["654b4e04de47fa0a7883acd2", "654a9043bdc6b3e7b6da651d"];

    for (let i = 0; i < 10; i++) {
      const vehicle = faker.vehicle.vehicle();
      console.log("vehicle", vehicle);
      const vehicleParts = vehicle.split(" ");
      const offer = {
        photo: faker.image.urlLoremFlickr({
          width: 320,
          height: 240,
          category: "car",
        }),
        brand: vehicle.split(" ", 1).toString(),
        model: vehicleParts[1].toString(),
        price: faker.commerce
          .price({ min: 10000, max: 50000, dec: 0 })
          .toString(),
        energy: faker.vehicle.fuel(),
        year: faker.date
          .between({ from: "2000-01-01", to: "2022-12-31" })
          .getFullYear(),
        carDealer: carDealers[Math.floor(Math.random() * carDealers.length)],
      };
      offers.push(offer);
    }
    await Offer.create(offers);

    console.log(`Created ${offers.length} offers...`);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1); // Exit the process with an error code
  }
})();
