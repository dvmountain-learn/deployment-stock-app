const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static(__dirname + "/public"))

const {
    getStocks,
    createStock,
    updateStock,
    deleteStock,
} = require('./server/controller.js');

app.get("/api/stocks", getStocks);

app.post("/api/stocks", createStock);

app.put("/api/stocks/:id", updateStock);

app.delete("/api/stocks/:id", deleteStock);

app.listen(4004, () => console.log("Server running on 4000"));
