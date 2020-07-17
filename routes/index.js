const express = require("express");
const path = require("path");
var homeRoute = require("../controllers/home.js");

const session = require("express-session");

const router = express.Router();

// --------------Home------------------------

router.post("/api/home/add_app", homeRoute.add_app);
router.put("/api/home/update_status", homeRoute.update_status);
router.get("/api/home/fetch_All_Apps", homeRoute.fetch_All_Apps);
router.delete("/api/home/delete_app", homeRoute.delete_app);

module.exports = router;
