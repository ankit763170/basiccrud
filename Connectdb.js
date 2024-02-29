const mongoose = require('mongoose')
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("connected to the database");
  })
  .catch((err) => console.error(err));