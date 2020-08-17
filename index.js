const express = require('express');
const projectRouter = require('./routes/projects');
const actionRouter = require('./routes/actions');
const error = require('./middleware/error');

const server = express();

// MiddleWare
server.use(express.json());

// API Routes
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

// Error MiddleWare
server.use(error);

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server running on port ${port}`));
