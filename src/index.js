const express = require("express")
const dotenv = require("dotenv").config()
const dbConnect = require('./config/db.js')
const authRoutes = require("./routes/authRoutes.js")
const userRoutes = require("./routes/userRoutes.js")
const dns = require("node:dns")
dns.setServers(['1.1.1.1', '8.8.8.8'])

dbConnect()

const app = express() // Can't I create an express app and use it directly?

// Middleware
app.use(express.json()) // Why do we need this line? Why is it called a middleware?

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes)

// Start the server
const PORT = process.env.PORT || 3042
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})