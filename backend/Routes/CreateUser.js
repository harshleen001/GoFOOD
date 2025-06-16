const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const JWT_SECRET = "IammakingthisProject";

// -------- Create User Route --------
router.post("/createuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('password', 'Incorrect Password').isLength({ min: 5 })
], async (req, res) => {

    // Log incoming request body for debugging
    console.log("Received signup data:", req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password, location } = req.body;

    try {
        // Check if user already exists
        let userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, error: "Email already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: secPassword,
            location
        });

        console.log("User created successfully:", user.email);
        res.status(201).json({ success: true });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});


// -------- Login Route --------
router.post("/login", [
    body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let userData = await User.findOne({ email });

        if (!userData) {
            return res.status(400).json({ success: false, error: "Invalid credentials" });
        }

        const pwdCompare = await bcrypt.compare(password, userData.password);
        if (!pwdCompare) {
            return res.status(400).json({ success: false, error: "Invalid credentials" });
        }

        const data = {
            user: {
                id: userData.id
            }
        };

        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ success: true, authToken });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

module.exports = router;
