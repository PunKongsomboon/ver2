const express = require("express");
const mysql = require("mysql");
const config = require("./dbConfig.js");
const bcrypt = require("bcrypt");
const path = require("path");
const { send } = require("process");

const app = express();
const con = mysql.createConnection(config);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/view/index.html"));
});

app.post("/SignUp", function (req, res) {
    const { username, password, email, role } = req.body;
    const sql = "SELECT user_Name FROM users WHERE user_Name=?";
    con.query(sql, [username], function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send("Database error");
        } else {
            if (result.length != 0) {
                res.status(401).send("Already have this username.");
            } else {
                // res.send("can signup");
                bcrypt.hash(password, 10, function (err, hash) {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Enpassword error");
                    } else {
                        const sql = "INSERT INTO users (user_Name , user_Password , user_Email , user_Role) VALUES (?,?,?,?)";
                        con.query(sql, [username, hash, email, role], function (err, result) {
                            if (result.affectedRows != 1) {
                                console.log(err);
                                res.status(500).send("Database error");
                            } else {
                                res.send("/Admin");
                            }
                        });
                    }

                });
            }
        }
    });


});

app.post("/SignIn", function (req, res) {
    const { username, password } = req.body;
    // res.send("test");
    const sql = "SELECT user_ID , user_Password , user_Role FROM users WHERE user_Name=?";
    con.query(sql, [username], function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send("Database error");
        } else {
            if (result.length != 1) {
                res.status(401).send("Username wrong");
            } else {
                bcrypt.compare(password, result[0].user_Password, function (err, resp) {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Compare error");
                    } else if (resp) {
                        res.send(result);
                    } else {
                        res.status(401).send("Password wrong");
                    }
                });
                // res.send(result);
            }
        }
    });
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

app.post("/DataPlace", function (req, res) {
    const request_type = req.body.type;
    console.log(request_type);
    if (request_type == undefined) {
        const sql = "SELECT * FROM place";
        con.query(sql, function (err, result) {
            if(err){
                console.log(err);
                res.status(500).send("Database error");
            }else {
                res.send(result);
            }
        });
    }
});

app.post("/DataCar", function (req, res) {
    const request_type = req.body.type;
    console.log(request_type);
    if (request_type == undefined) {
        const sql = "SELECT * FROM car";
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).send("Database error");
            } else {
                res.send(result);
            }
        });
    } else if (request_type == 1) {
        const sql = "SELECT car.carID , car.name_car , car.price_car , car.capacity , car.TypecarID , typecar.TypecarID , typecar.nameType_car FROM car , typecar WHERE car.TypecarID = typecar.TypecarID AND car.TypecarID =1";
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).send("Database error");
            } else {
                res.send(result);
            }
        });
    } else if (request_type == 2) {
        const sql = "SELECT car.carID , car.name_car , car.price_car , car.capacity , car.TypecarID , typecar.TypecarID , typecar.nameType_car FROM car , typecar WHERE car.TypecarID = typecar.TypecarID AND car.TypecarID =2";
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).send("Database error");
            } else {
                res.send(result);
            }
        });
    }
    // res.send("done");

});

app.get("/typecar", function (req, res) {
    const sql = "SELECT nameType_car FROM typecar";
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send("Database error");
        } else {
            res.send(result);
        }
    });
});

app.post("/Addcar", function (req, res) {
    const { name_car, price_car, capacity, TypecarID } = req.body;
    const sql = "INSERT INTO car (name_car , price_car , capacity , TypecarID) VALUES (?,?,?,?)";
    con.query(sql, [name_car, price_car, capacity, TypecarID], function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send("Database error");
        } else {
            if (result.affectedRows != 1) {
                console.log("INSERT ERROR");
            } else {
                res.send("done");
            }
        }
    });
});

app.get("/DataHotel", function (req, res) {

});

app.get("/Routes", function (req, res) {

});

const PORT = 3000;
app.listen(PORT, function () {
    console.log("Server is ready at " + PORT);
});