const router = require("express").Router()
const {allHotels} = require("../controllers/hotels")

router.route("/hotels").get(allHotels);

module.exports = router;