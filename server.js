const express = require("express");
const app = express();

const path = require("path");

app.get("/", (req, res) => {
    // res.send("Test");
    res.sendFile(path.join(__dirname + "/develop/public/index.html"));
});

//Port of my server listening
app.listen(3001, () => {
    console.log("server running on port", 3001);
});