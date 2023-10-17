const { default: mongoose } = require("mongoose");
const mongo = require("mongoose");
require("dotenv").config();

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
    console.log("MongoDB connection error: ", err);
});

async function mongoConnect() {
    await mongoose.connect(process.env.MONGO_URL);
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect
};
