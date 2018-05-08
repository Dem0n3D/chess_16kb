const MongoClient = require('mongodb').MongoClient;

const app = require("./app");


MongoClient.connect("mongodb://localhost", (err, client) => {
    if (err) {
        console.log(err)
    }

    const db = client.db("chess");

    require("./index")(db);
    require("./auth")(db);

    app.listen(8080, function () {
        console.log('Example app listening on port 8080!');
    });
});
