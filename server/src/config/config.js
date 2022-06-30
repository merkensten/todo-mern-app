import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const renderDBUrl = () => {
  const environment = process.env.ENVIRONMENT;
  if (environment === "DEVELOPMENT") {
    console.log("Dev environment, local DB is used.");
    return process.env.DEV_DATABASE_URL;
  }
  if (environment === "PRODUCTION") {
    return process.env.DATABASE_URL;
  }
};

const connectToDB = async () => {
  try {
    const DB_URL = renderDBUrl();
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to MongoDB.");
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

const connectToPort = (app) => {
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

export default { connectToDB, connectToPort };
