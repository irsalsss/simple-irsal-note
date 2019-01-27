const mongoose = require('mongoose');
const router = require('express').Router();
const Notes = mongoose.model('Notes');

router.post('/', (req, res, next) => {
  const { body } = req;

  if(!body.title) {
    return res.status(422).json({
      errors: {
        title: 'is required',
      },
    });
  }

  if(!body.body) {
    return res.status(422).json({
      errors: {
        body: 'is required',
      },
    });
  }

  const finalNote = new Notes(body);
  return finalNote.save()
    .then(() => res.json({ note: finalNote.toJSON() }))
    .catch(next);
});

router.get('/', (req, res, next) => {
  return Notes.find()
    .sort({ createdAt: 'descending' })
    .then((notes) => res.json({ notes: notes.map(note => note.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Notes.findById(id, (err, note) => {
    if(err) {
      return res.sendStatus(404);
    } else if(note) {
      req.note = note;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    note: req.note.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body.title !== 'undefined') {
    req.note.title = body.title;
  }

  if(typeof body.body !== 'undefined') {
    req.note.body = body.body;
  }

  return req.note.save()
    .then(() => res.json({ note: req.note.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return Notes.findByIdAndRemove(req.note._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;
