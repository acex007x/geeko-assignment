const express = require("express");
require('./db/mongoose')
const cors = require("cors");


// set up express

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));



// set up routes

app.use("/", require("./routes/userRouter"));
