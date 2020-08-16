const express = require('express');
const projectRouter = require('./routes/projects');
const error = require('./middleware/error');

const server = express();

// MiddleWare
server.use(express.json());

// API Routes
server.use('/api/projects', projectRouter);

// Error MiddleWare
server.use(error);

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server running on port ${port}`));
