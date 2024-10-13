import bodyParser from 'body-parser';
import express from 'express';
import userRouter from './routes/usersRoutes.js';
import mongoose from 'mongoose';
import galleryItemRouter from './routes/galleryItemRoute.js';
import jwt from 'jsonwebtoken';

const app = express();

app.use(bodyParser.json());

const connectionString = "mongodb+srv://akila:akila123@cluster1.cwgf7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

// JWT Authentication Middleware
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Authorization token required" });
  }

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    req.user = decoded; // Attach user info to request object
    next();
  });
};

// Connect to MongoDB
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Server is connected to the database");
  })
  .catch((err) => {
    console.log("Server is not connected to the database", err);
  });

// Public routes (no token required)
app.use("/api/users", userRouter); // Login, Signup, etc.

// Protected routes (token required)
app.use("/api/gallery", authMiddleware, galleryItemRouter); // Gallery routes require token

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
