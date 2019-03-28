const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(_dirname, './public')));

require("./routes/api-routes.js")(app);
require("./routes/api-routes.js")(app);

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
