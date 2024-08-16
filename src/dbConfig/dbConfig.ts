import mongoose from "mongoose";

// Asynchronously connect to the MongoDB database
export async function connectDB(): Promise<void> {
  try {
    // Await the connection to ensure it is established before proceeding
    await mongoose.connect(process.env.MONGO_URL!);

    // Access the default connection instance
    const connection = mongoose.connection;

    // Event listener for successful connection
    connection.on("connected", () => {
      console.log("MongoDB connected");
    });

    // Event listener for connection errors
    connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
      process.exit(1); // Exit the process with a failure code
    });
  } catch (error) {
    console.error("Something went wrong while connecting to DB:", error);
    process.exit(1); // Exit the process with a failure code if connection fails
  }
}
