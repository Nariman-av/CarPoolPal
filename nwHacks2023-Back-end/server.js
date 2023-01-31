const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser');
// const connectDatabase = require("./database/connection");
const credentials = require("./config/serviceAccount.json");
const admin = require("firebase-admin");


admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

const PORT = process.env.PORT || 8080;

// Connect to database
// connectDatabase();

const corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(PORT, () => console.log(`listening to ${PORT}`));

// Routes
require('./routes')(app);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to nwHacks 2023 - Car Pool Pal API." });
});



app.post("/check", (req, res) => {
    res.json({ message: "Welcome to nwHacks 2023 - Car Pool Pal API." });
});


// app.use(errorHandler);