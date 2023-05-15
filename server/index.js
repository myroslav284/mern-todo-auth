import cookieParser from "cookie-parser";
import expresss from "express";
import cors from "cors";
import connectDB from "./db/config.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const app = expresss();

app.use(cors());
app.use(expresss.json());
app.use(cookieParser());

const start = async () => {
  try {
    await connectDB(process.env.DB_URL).then(() => {
      app.listen(PORT, console.log(`Server is running on port ${PORT}`));
    });
  } catch (error) {
    console.log(error.message);
  }
};

start();
