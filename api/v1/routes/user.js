const express = require("express");
const router = new express.Router();
const { user } = require("../controllers");

router.route("/users").get(user.getUserList);
router.route("/users/updateOrderCount").put(user.updateOrderCount);

module.exports = router;
