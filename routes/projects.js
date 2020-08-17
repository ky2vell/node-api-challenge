const express = require('express');
const Projects = require('../data/helpers/projectModel');
const valProjectId = require('../middleware/valProjectId');

const router = express.Router();

// @desc    Get all projects
// @route   GET /api/projects
router.get('/', async (req, res, next) => {
  try {
    const projects = await Projects.get();
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
});

// @desc    Create project
// @route   POST /api/projects
router.post('/', async (req, res, next) => {
  try {
    const project = await Projects.insert(req.body);
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
});

// @desc    Get single project
// @route   GET /api/projects/:id
router.get('/:id', valProjectId, (req, res) => {
  res.status(200).json(req.project);
});

// @desc    Update project
// @route   PUT /api/projects/:id
router.put('/:id', async (req, res, next) => {
  try {
    const project = await Projects.update(req.params.id, req.body);

    if (!req.body.name || !req.body.description) {
      return res.status(400).json({ message: 'Missing project data' });
    }

    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
router.delete('/:id', valProjectId, async (req, res, next) => {
  try {
    const count = await Projects.remove(req.params.id);
    res.status(200).json({
      message: `${count} records(s) have been deleted`
    });
  } catch (err) {
    next(err);
  }
});

// @desc    Get all actions for project
// @route   GET /api/projects/:id/actions
router.get('/:id/actions', valProjectId, async (req, res, next) => {
  try {
    const actions = await Projects.getProjectActions(req.params.id);
    res.status(200).json(actions);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
