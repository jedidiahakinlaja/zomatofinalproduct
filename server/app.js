const express = require("express");
const mongoose = require("mongoose");
const cors=require("cors");
const route = require("./Route/index");
require("dotenv").config();
const passport = require("passport");
const cookieSession=require("cookie-session");
const paypalRoute = require("./Controller/payment");
const PORT = 5500;
const HOSTNAME = "localhost";

const authRoute = require("./Controller/auth");
const passportSetup = require("./Controller/passport");

const corsOptions={
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE, PATCH",
    credentials: true,
    optionSuccessStatus: 200,
    allowedHeaders: "X-Requested-With,content-type, x-token, Access-Control-Allow-Credentials"
}

  
const app = express();
app.use(cookieSession({name:"session",keys:["edureka"],maxAge:24*60*60*1000}))
app.use(express.json());        // A body Parser Required to post a data
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));
app.use('/', route);
app.use('/api/paypal/', paypalRoute);  
app.use('/auth', authRoute)

// DB
const MongoAtlas = process.env.MONGO_URL;

mongoose.connect(MongoAtlas, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(res => {
        app.listen(PORT, HOSTNAME, () => {
            console.log(`Server is running at ${HOSTNAME}: ${PORT}`)
        });
    })
    .catch(err => console.log(err));