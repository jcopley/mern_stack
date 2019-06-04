const express = require('express');
const router = express.Router();

//item model
const Item = require('../../models/Item');
const auth = require('../../middleware/auth');

// @route   GET api/items
// @desc    get all items
// @access  Public
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route   POST api/items
// @desc    create an item
// @access  Protected
router.post('/', auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });
  newItem
    .save()
    .then(item => res.json(item))
    .catch(err => console.log(err));
});

// @route   DELETE api/items/:id
// @desc    delete an item
// @access  Protected
router.delete('/:id', auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
