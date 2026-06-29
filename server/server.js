const express = require("express");
const errorHandler = require("./middleware/errorMiddleware");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

connectDB();

const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",")
  : ["http://localhost:5173", "https://task-tracker-nine-eta.vercel.app"];

console.log("Allowed Origins:", allowedOrigins);  
console.log("Environment:", process.env.NODE_ENV);

app.use(
  cors({
    origin: (origin, callback) => {
    console.log("Incoming Origin:", origin);

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked Origin:", origin);
      callback(new Error(`CORS: origin ${origin} not allowed`));
    }
  },
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Task Tracker API is running 🚀",
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});