const express = require('express');
const Actions = require('../data/helpers/actionModel');

const router = express.Router();

// @desc    Get all actions
// @route   Get /api/actions
router.get('/', async (req, res, next) => {
  try {
    const actions = await Actions.get();
    res.status(200).json(actions);
  } catch (err) {
    next(err);
  }
});

// @desc    Create action
// @route   POST /api/actions/:id
router.post('/:id', async (req, res, next) => {
  try {
    if (!req.body.description || !req.body.notes) {
      return res.status(400).json({ message: 'Missing actions data' });
    }
    const action = await Actions.insert({
      project_id: req.params.id,
      description: req.body.description,
      notes: req.body.notes
    });

    res.status(201).json(action);
  } catch (err) {
    next(err);
  }
});

// @desc    Update action for project
// @route   PUT /api/actions/:id
router.put('/:id', async (req, res, next) => {
  try {
    if (!req.body.description || !req.body.notes) {
      return res.status(400).json({ message: 'Missing actions data' });
    }

    const action = await Actions.update(req.params.id, req.body);
    res.status(200).json(action);
  } catch (err) {
    next(err);
  }
});

// @desc    Delete action for project
// @route   DELETE /api/actions/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const count = await Actions.remove(req.params.id);
    res.status(200).json({
      message: `${count} record(s) have been deleted`
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
