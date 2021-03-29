const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOption = {
    origin : "https://localhost:8081"
};

app.use(cors(corsOption));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

const db = require("./app/models")
db.sequelize.sync();
/* for resync database
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });
*/
app.get("/", (req,res)=>{
    res.json({message : "Welcome to my application"})
});

require("./app/routes/restoran.routes")(app);

const PORT = process.env.PORT || 8888;
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}.`)
});