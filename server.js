const express = require("express");
const mysql = require("mysql");
const config = require("./dbConfig.js");
const bcrypt = require("bcrypt");
const path = require("path");

const app = express();
const con = mysql.createConnection(config);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/view/index.html"));
});

app.post("/SignUp", function (req, res) {

});

app.post("/SignIn", function (req, res) {

});

app.get("/Profile", function (req, res) {
    res.sendFile(path.join(__dirname, "/view/profile.html"));
});

app.post("/DatasomeID", function (req, res) {

});

app.get("/Contact", function (req, res) {
    res.sendFile(path.join(__dirname, "/view/contact.html"));
});

app.get("/DataPlan", function (req, res) {

});

app.get("/Admin", function (req, res) {
    res.sendFile(path.join(__dirname, "/view/Admin.html"))
});

app.get("/DetailPlan", function (req, res) {
    res.sendFile(path.join(__dirname, "/view/Detailplan.html"));
});

app.get("/Filter", function (req, res) {
    res.sendFile(path.join(__dirname, "/view/Filter.html"));
})

app.get("/DataPlace", function (req, res) {

});

app.get("/DataCar", function (req, res) {

});

app.get("/DataHotel", function (req, res) {

});

app.get("/Routes", function (req, res) {

});

const PORT = 3000;
app.listen(PORT, function () {
    console.log("Server is ready at " + PORT);
});