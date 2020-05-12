const express = require("express")

const db = require("./data/db")

const router = express.Router();

//  GET     /api/posts     Returns an array of all the post objects contained in the database.
router.get("/",(req,res)=>{
 db.find(req.body)
    .then( foundItems =>{
        res.status(200).json(foundItems);
    })
    .catch(error =>{
        console.log(error);
        res.status(500).json({error: "The posts information could not be retrieved."})
    })
})
//  GET    /api/posts/:id   Returns the post object with the specified id.
router.get("/:id",(req,res)=>{
    const { id } = req.params;
    db.findById(id)
        .then( reqPost =>{
            if(reqPost){
                res.status(200).json(reqPost)
            }
            else{
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })

        .catch(error =>{
            console.log(error);
            res.status(500).json({error: "The posts information could not be retrieved."})
        })
})
//  POST    /api/posts   Creates a post using the information sent inside the `request body`.
router.post("/",(req,res)=>{
    const {title,contents} =req.body;
    if (!title || !contents) {
        res.status(400).json({
          errorMessage: 'Please provide title and contents for the post.'
        });
      } else {
        db.insert(req.body)
          .then(post => {
            res.status(201).json(post);
          })
          .catch(error => {
            console.log(error);
            res.status(500).json({
              error: 'There was an error while saving the post to the database'
            });
          });
      }
})

// DELETE  /api/posts/:id   Removes the post with the specified id and returns the **deleted post object**. You may need to make additional calls to the database in order to satisfy this requirement.
router.delete("/:id",(req,res)=>{
    const { id } = req.params;
    db.remove(id)
        .then(numOfDelPost => {
            if(numOfDelPost){
                res.status(200).json({ message: 'The post has been deleted' })
            }
            else {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: 'The post could not be recovered' });
          });
})
//  PUT     /api/posts/:id    Updates the post with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**.
router.put("/:id",(req,res)=>{
    const post = req.body;
    const { id } = req.params;
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({
        errorMessage: 'Please provide title and contents for the post.'
        });
    } else {
        db.update(id, post)
        .then(updated => {
            if (updated) {
            res.status(200).json(updated);
            } else {
            res.status(404).json({
                message: 'The post with the specified ID does not exist.'
            });
            }
        })
        .catch(error => {
            console.log(error);
            res
            .status(500)
            .json({ error: 'The post information could not be modified' });
        });
    }
})

module.exports = router;