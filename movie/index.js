const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.route');
const movieRoutes = require('./routes/movie.route');
const app = express();
app.use(express.json());

// app.get('/',(req, res) => {
//   res.send('Welcome to the movie API');
// })
app.use('/api/user', userRoutes);
app.use('/api/movie', movieRoutes);

app.listen(8090, () => {
  console.log(`Server is running on port 8090`);
  connectDB();
});
