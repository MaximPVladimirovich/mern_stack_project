import express from "express";
import devBundle from "./devBundle";
import path from "path";
import template from "./../template";
import { MongoClient } from "mongodb";

const app = express();
const cwd = process.cwd();

app.use("/dist", express.static(path.join(cwd, "dist")));

const url =
  "mongodb+srv://abc1234:abc1234@mern.ohnth2f.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(url, (err, client) => {
  if (err) {
    console.log("Error connecting to MongoDB: ", err);
  } else {
    console.log("Connected to MongoDB");
    client.close();
  }
});

app.get("/", (req, res) => {
  res.status(200).send(template());
});

const port = 3000;
app.listen(port, (error) => {
  if (error) {
    console.error(error);
  }

  console.info(`Listening on port ${port}`);
});

devBundle.compile(app);
