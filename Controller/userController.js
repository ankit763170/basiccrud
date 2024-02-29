const User = require("../model/User");

const getUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!email) {
      return res.status(400).send("Email is required!");
    }
    if (!phone) {
      return res.status(400).send("Phone is required!");
    }
    if (!name) {
      return res.status(400).send("Name is required!");
    }
    const user = await User.create({ name, email, phone });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params; // Extract user ID from request parameters
  const userData = req.body; // Extract updated user data from request body

  try {
    // Use findByIdAndUpdate to find and update the user
    // Set the `new` option to true to return the updated user data
    const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });

    if (!updatedUser) {
      // If no user found with the provided ID, return 404 Not Found
      return res.status(404).json({ message: "User not found" });
    }

    // If user is successfully updated, send back the updated user data
    res.status(200).json(updatedUser);
  } catch (error) {
    // If any error occurs during the update process, return 500 Internal Server Error
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getUser, createUser, updateUser };
