const exp = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require('fs'); //destructing object fs
require('dotenv').config();


//app
const app = exp();

//db
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
})
    .then(() => console.log("connection success!.."))
    .catch(err => console.log(`DB Connection Error ${err}`))

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

//routes middleware
readdirSync("./routes").map((r) =>
    app.use("/api", require("./routes/" + r))
)

//routes
app.get('/', (req, res) => {
    res.send("This is root directory...........");
})



const port = process.env.PORT || 7000
app.listen(port, () => {
    console.log("running on port", port);
})