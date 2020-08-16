const Projects = require('../data/helpers/projectModel');

const valProjectId = async (req, res, next) => {
  try {
    const project = await Projects.get(req.params.id);
    if (project) {
      req.project = project;

      next();
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = valProjectId;
