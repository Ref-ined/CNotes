const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = "yoyo";

//ROUTE 1: Create a user using: POST "/api/auth/createuser", No login required. 
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;


    // If there are errors, return bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false;

        return res.status(400).json({ success, errors: errors.array() });
    }

    // Check whether the user with this email exists already.
    try {

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            success = false;

            return res.status(400).json({ success, error: "Sorry a user with this email already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        // Creating a new user.
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        });

        const data = {
            id: user.id
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(authToken);
        // res.json(user.name);
        success = true;

        res.json({ success, authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})


//ROUTE 2: Authenticate a user using: POST "/api/auth/createuser", No login required. 

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;


    // If there are errors, return bad request and the errors.

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const passCompare = await bcrypt.compare(password, user.password);

        if (!passCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            id: user.id
        }


        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }


})

// Route 3: Get logged in user details using: POST "/api/auth/getuser", Login Required.

router.post('/getuser', fetchUser, async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router