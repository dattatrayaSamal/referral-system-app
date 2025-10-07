const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const candidateRoutes = require("./routes/candidateRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(process.env.mongouri)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.use("/api", candidateRoutes);

const PORT = process.env.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
