require("dotenv").config();
require("express-async-errors");

// Express App
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
