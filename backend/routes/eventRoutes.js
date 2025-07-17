const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// CRUD routes
router.get('/', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

router.post('/', async (req, res) => {
  const newEvent = new Event(req.body);
  const e = await newEvent.save();
  res.json(e);
});

router.put('/:id', async (req, res) => {
  const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
