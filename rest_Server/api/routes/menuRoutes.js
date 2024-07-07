const express = require("express");
const Menu = require("../models/Menu");
const { getAllMenuItems } = require("../controller/menuControllers");
const router = express.Router();


// get all menu items
router.get('/',getAllMenuItems)

module.exports=router;