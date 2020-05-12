const express = require("express")

const db = require("../data/db")

const router = express.Router();


//  POST   /api/posts/:id/comments  Creates a comment for the post with the specified id using information sent inside of the `request body`. 

//  GET   /api/posts/:id/comments  Returns an array of all the comment objects associated with the post with the specified id.  