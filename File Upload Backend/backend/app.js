require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const uploadRoutes = require("./routes/upload");

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

connectDB();

app.use("/api/files", uploadRoutes);

app.listen(5001, () => console.log("Server running on 5001"));
