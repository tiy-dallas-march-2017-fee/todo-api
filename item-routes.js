const uuidV4 = require('uuid/v4');
const express = require('express');
const router = express.Router();

var data = {};

router.post('/api/item', (req, res) => {

  // Get that bucket's list, or create a new one.
  const list = data[req.query.bucketId] || [];

  // Create a new object to represent the todo item and give it an id.
  const newItem = {
    id: uuidV4(),
    text: req.body.text,
    isComplete: false
  };
  list.push(newItem);

  // Update the data so it has the new item.
  data[req.query.bucketId] = list;

  res.send(newItem);
});


router.get('/api/items', (req, res) => {
  const list = data[req.query.bucketId] || [];

  res.send({
    items: list
  });
});

router.delete('/api/item/:id', (req, res) => {
  const list = data[req.query.bucketId] || [];

  let indexOfItemToDelete;
  for (let i = 0; i < list.length; i++) {
    let { id } = list[i];
    if (id === req.params.id) {
      indexOfItemToDelete = i;
      break;
    }
  }

  list.splice(indexOfItemToDelete, 1);

  res.sendStatus(204);
});

router.post('/api/item/:id/togglestatus', (req, res) => {
  const list = data[req.query.bucketId] || [];

  let indexOfItemToUpdate;
  for (let i = 0; i < list.length; i++) {
    let { id } = list[i];
    if (id === req.params.id) {
      indexOfItemToUpdate = i;
      break;
    }
  }

  list[indexOfItemToUpdate].isComplete = !list[indexOfItemToUpdate].isComplete;

  res.sendStatus(204);
});

module.exports = router;
