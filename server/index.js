import cookieParser from "cookie-parser";
import expresss from "express";
import cors from "cors";
import connectDB from "./db/config.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import todoRouter from "./routes/todoRoutes.js";
import tasksRouter from "./routes/tasksRouter.js";
dotenv.config();

const PORT = process.env.PORT;
const app = expresss();

app.use(cors());
app.use(expresss.json());
app.use(cookieParser());

app.use('/api', userRouter);
app.use('/api', todoRouter);
app.use('/api', tasksRouter);

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
