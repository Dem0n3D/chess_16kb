const mongoose = require('mongoose');

const app = require("./app");


mongoose.connect("mongodb://localhost/chess")
    .then(function(db) {
        require("./index")(db);
        require("./auth")(db);

        app.listen(8080, function () {
            console.log('Example app listening on port 8080!');
        });
    })
    .catch(err => console.log(err));
