const bcrypt = require("bcryptjs")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({ username, password: hashedPassword, role })
        await newUser.save() // Is this the line that saves the data to the database?
        res.status(201).json({ message: `User registered with username ${username}` }) // Do we always always need a response status for everything? | how would I display this message on the frontend? 
    } catch(err) {
        res
        .status(500)
        .json({ message: `Something went wrong`, err })
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username })

        if (!user) {
            return res.status(404).json({ message: `User with username ${username} not found` })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: `Invalid crendentials` })
        }

        const token = jwt.sign({
            id: user._id, role: user.role
        }, process.env.JWT_SECRET,
        { expiresIn: "1h" }
    )

    res.status(200).json({ token })
        
    } catch (error) {
        res
        .status(500)
        .json({ message: `Something went wrong` })
        console.log(error)
    }
}

module.exports = {
    register, 
    login
}