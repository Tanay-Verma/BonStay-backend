const router = require("express").Router();

const {addReview, allReviews} = require("../controllers/reviews.js");

router.route("/").put(addReview);
router.route("/:hotelName").get(allReviews);

module.exports = router;