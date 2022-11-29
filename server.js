const express = require("express");
const routes = require("./routes");
const db = require("./config/connection");

const localPORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(express.json());

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${localPORT}!`);
  });
});
