const app = require("./app");

require("./index");
require("./auth");

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});
