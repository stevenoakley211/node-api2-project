const express = require("express")

const db = require("./data/db")

const router = express.Router();

//  GET     /api/posts     Returns an array of all the post objects contained in the database.
router.get("/",(req,res)=>{
 Post.find(req.body)
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
    Post.findById(id)
        .then( reqPost =>{
            if(reqPost){
                res.status(200).json(reqPost)
            }
            else if(!reqPost)[
                res.(404).json({ message: "The post with the specified ID does not exist." })
            ]
        })
        .catch(error =>{
            console.log(error);
            res.status(500).json({error: "The posts information could not be retrieved."})
        })
})
//  POST    /api/posts   Creates a post using the information sent inside the `request body`.
router.post("/",(req,res)=>{
    
})

// DELETE  /api/posts/:id   Removes the post with the specified id and returns the **deleted post object**. You may need to make additional calls to the database in order to satisfy this requirement.
router.delete("/:id",(req,res)=>{
    
})
//  PUT     /api/posts/:id    Updates the post with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**.
router.put("/:id",(req,res)=>{
    
})