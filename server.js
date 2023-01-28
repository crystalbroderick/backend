require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.config");
const app = express();
const {adminAuth, userAuth} = require('./middleware/auth')
const cookieParser = require("cookie-parser")

// routes
const plants = require("./routes/plants");

// connect database
connectDB();

// initialize middleware
app.use(cors({ origin: true, credentials: true })); // cors for frontend requests
app.use(express.json({ extended: false }));
app.use(cookieParser()) // prevent unauthenticated users from private routes


app.get("/", (req, res) => res.send("Server up and running"));
app.get("/admin", adminAuth, (req, res) => res.send("Admin Route")); // protect routes
app.get("/basic", userAuth, (req, res) => res.send("User Route"))

// use routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/plants", plants);

// setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(`server is running on http://localhost:${PORT}`);
});
