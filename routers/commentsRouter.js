const express = require("express")

const db = require("../data/db")

const router = express.Router();


//  POST   /api/posts/:id/comments  Creates a comment for the post with the specified id using information sent inside of the `request body`. 

router.post('/:id/comments', (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const comment = { ...req.body, post_id: id };
    if (!text) {
      res
        .status(400)
        .json({ errorMessage: 'Please provide text for the comment.' });
    } else {
      db.findById(id)
        .then(post => {
          if (!post.length) {
            res.status(404).json({
              message: 'The post with the specified ID does not exist.'
            });
          } else {
            db.insertComment(comment)
              .then(comment => {
                res.status(201).json(comment);
              })
              .catch(error => {
                res.status(500).json({
                  error:
                    'There was an error while saving the comment to the database'
                });
              });
          }
        })
        .catch(error => {
          res.status(500).json(error);
        });
    }
  });

//  GET   /api/posts/:id/comments  Returns an array of all the comment objects associated with the post with the specified id.  
router.get('/:id/comments', (req, res) => {
    const { id } = req.params;
  
    db.findPostComments(id)
      .then(post => {
        if (post.length === 0) {
          res
            .status(404)
            .json({ message: 'The post with the specified ID does not exist.' });
        } else {
          return res.status(200).json(post);
        }
      })
      .catch(error => {
        console.log(error);
        res
          .status(500)
          .json({ error: 'The comments information could not be retrieved.' });
      });
  });