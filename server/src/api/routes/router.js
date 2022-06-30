import express from "express";

// routers

// Huvudrouter
export const router = express.Router();

// routes
router.get("/", (req, res) => {
  res.send("Todo app mern server");
});
