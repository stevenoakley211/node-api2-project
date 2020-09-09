const express = require("express")

const db = require("../data/db")

const router = express.Router();

router.get("/",(req,res)=>{
    db.find(req.body)
       .then( posts =>{
           res.status(200).json(posts);
       })
       .catch(error =>{ 
           console.log(error);
           res.status(500).json({error: "The posts information could not be retrieved."})
       })
   })
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

router.delete("/:id",(req,res)=>{
    const { id } = req.params;
    db.remove(id)
        .then(post => {
            if(post){
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

router.put("/:id",(req,res)=>{
    const post = req.body;
    const { id } = req.params;
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({
        errorMessage: 'Please provide title and contents for the post.'
        });
    } else {
        db.update(id, post)
        .then(updatedPost => {
            if (updatedPost) {
            res.status(200).json(updatedPost);
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