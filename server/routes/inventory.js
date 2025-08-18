const express = require('express');
const router = express.Router();

// Get all inventory items
router.get('/', async (req, res) => {
  try {
    // TODO: Implement get inventory logic
    res.json({
      items: [
        { id: 1, name: 'Item A', quantity: 100 }
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get inventory item by ID
router.get('/:id', async (req, res) => {
  try {
    // TODO: Implement get inventory item by ID logic
    res.json({
      id: req.params.id,
      name: 'Item A',
      quantity: 100
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
