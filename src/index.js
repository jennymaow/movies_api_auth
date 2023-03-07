const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connect = require('./utils/connect');

const MoviesRoutes = require('./api/routes/movies.routes');
const CinemasRoutes = require('./api/routes/cinemas.routes');
const UsersRoutes = require('./api/routes/users.routes');

const { configCloudinary } = require('./middlewares/files.middleware');

dotenv.config();

configCloudinary();
const server = express();
const PORT = process.env.PORT;

connect();

server.use(cors({ origin: '*', credentials: true }));

server.use(express.json({ limit: '5mb' }));
server.use(express.urlencoded({ limit: '5mb', extended: true }));

server.use('/movies', MoviesRoutes);
server.use('/cinemas', CinemasRoutes);
server.use('/users', UsersRoutes);

server.use('*', (req, res, next) => {
  const error = new Error('Route not found');
  return next(error);
});

server.disabled('x-powered-by');

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
