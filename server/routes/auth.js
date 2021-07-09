const express = require("express");

const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//controllers
const { createOrUpdateuser } = require("../controllers/auth");
const { currentUser } = require("../controllers/auth");

router.post('/create-or-update-user', authCheck, createOrUpdateuser);
router.post('/currentUser', authCheck, currentUser);
router.post('/currentAdmin', authCheck, adminCheck, currentUser);

module.exports = router;