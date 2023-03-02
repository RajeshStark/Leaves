const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const mongoose = require('mongoose')
const { MongoClient } = require('mongodb');

require("dotenv").config({ path: "config.env" });

const uri = process.env.MONGO_URI; 
const client = new MongoClient(uri);


const app = express();


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "leaves-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to leaves tracker application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}).then((res) => {
  console.log("connected to DB");
}).catch((err) =>{
  console.log(err);
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
})

