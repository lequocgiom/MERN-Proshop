const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const users = require("./data/users");
const products = require("./data/products");
const User = require("./models/userModel");
const Product = require("./models/productModel");
const Order = require("./models/orderModel");
const connectDB = require("./config/db");
const { create } = require("./models/userModel");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUser = await User.insertMany(users);

    const adminUser = createdUser[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data imported!".green.inverse);
    process.exit();
  } catch (err) {
    console.log(`${error}`.red.inverse);
    process.exit();
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data destroyed!".red.inverse);
    process.exit();
  } catch (err) {
    console.log(`${error}`.red.inverse);
    process.exit();
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
