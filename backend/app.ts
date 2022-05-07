require('dotenv').config();
import express from "express";
import Connection from "./src/database/Connection";
import v1 from './src/routers/api';
import cors from 'cors';

const corsOptions = {
  origin: process.env.ORIGIN,
  optionsSuccessStatus: 200 // For legacy browser support
}
const PORT = 8080;
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));
app.use("/api/v1/", v1);
app.get("/", (req, res) => {
  res.send("Find My Hobby API Works.")
})

const myConnection: Connection = new Connection();

const server = app.listen(process.env.PORT || PORT, () => {
    console.log("http://localhost:" + PORT);
});

export { app, server };