const express = require("express");
const { createUser, getUser, updateUser } = require("../Controller/userController");

const router = express.Router();

router.get("/", getUser);
router.post("/", createUser);
router.patch("/:id", updateUser);

module.exports = router;
