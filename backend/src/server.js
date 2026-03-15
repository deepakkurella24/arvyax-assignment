require("dotenv").config();
const authRoutes=require('./routes/authentication')
const connectDB=require('./config/database')
const express = require("express");
const cookieParser=require("cookie-parser")
const cors = require("cors");
const journalRoutes = require("./routes/journal");
const app = express();
app.use(cors({
  origin: "http://localhost:5173",//allow this frontend
  credentials: true               //takes the jwt from above frontend
}));

app.use(express.json());
app.use(cookieParser())
app.use(authRoutes);
app.use("/api/journal", journalRoutes);

connectDB()
  .then(() => {
    console.log("DB connected successfully");

    app.listen(7777, () => {
      console.log("app is running on port 7777");
    });
  })
  .catch((err) => console.log(err));