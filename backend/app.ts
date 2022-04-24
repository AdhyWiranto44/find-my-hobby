require('dotenv').config();
import express from "express";
import Connection from "./src/database/Connection";
import apiRouter from './src/routers/api';


const PORT = 8080;
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use("/", apiRouter);
app.set("view engine", "ejs");

const myConnection = new Connection();
myConnection.connect();

app.listen(process.env.PORT || PORT, () => {
    console.log("http://localhost:" + PORT);
});