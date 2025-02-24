import express from 'express';
import env from 'dotenv';
import { connectDatabase } from './config/mongoDB.js';
import routes from './routes/routes.js';
import cors from 'cors';
// Load environment variables
env.config();


// Create Express app
const app = express();
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request received on ${process.env.APP_NAME} for ${req.url}`);
  next();
});


// Use routes with the /api/genshinContent prefix
app.use('/genshinContent', routes);


// Connect to the database and start the server
const startServer = async () => {
  try {
    // Connect to the database
    await connectDatabase();
    console.log('Database connected successfully!');

    // Start the server
    const PORT = process.env.PORT; // Use environment variable for port
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1); // Exit the process if the server fails to start
  }
};

// Start the server
startServer();