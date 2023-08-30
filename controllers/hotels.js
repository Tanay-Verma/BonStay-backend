const Hotels = require("../models/Hotels");
const { StatusCodes } = require("http-status-codes");

const allHotels = async(req,res) => {
    const hotels = await Hotels.find();
    res.status(StatusCodes.OK).json({
        "status": "success",
        "results": hotels.length,
        "data": {
            "hotels": hotels
        }
    })
}

module.exports = {allHotels}