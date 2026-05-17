const express = require("express");
const verifyToken = require("../middlewares/authMiddleware.js")
const authorizeRoles = require("../middlewares/roleMiddleware.js")
const router = express.Router()

// Only admin
router
    .get("/admin", verifyToken, (req, res) => {
        res.json({ message: `Welcome Admin` })
    })

// Admin and manager
router
    .get("/manager", verifyToken, (req, res) => {
        res.json({ message: `Welcome Manager` })
    })

// All users
router
    .get("/user", verifyToken, (req, res) => {
        res.json({ message: `Welcome` })
    })

module.exports = router