require('dotenv').config();
import express from "express";
import Connection from "./src/database/Connection";
import v1 from './src/routers/api';
import cors from 'cors';

const corsOptions = {
  origin: "https://find-my-hobby.vercel.app",
  optionsSuccessStatus: 200 // For legacy browser support
}
const PORT = 8080;
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));
app.use("/api/v1/", v1);
app.set("view engine", "ejs");

const myConnection = new Connection();
myConnection.connect();

app.listen(process.env.PORT || PORT, () => {
    console.log("http://localhost:" + PORT);
});