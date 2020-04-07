const mongoose = require("mongoose");
const color = require("colors");

MONGO_URI = process.env.MONGO_URI;

exports.mongoConnect = async function () {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log(
      `Database connected to ${mongoose.connections[0].host} on Port ${mongoose.connections[0].port} `
        .green
    );
  } catch (err) {
    console.log(err);
  }
};
