import React from "react";

function PostList({posts}){
    return(
        <div>
            {posts.map(
                post => (
                    <div>
                    <h1>{post.title}</h1>
                    <p>{post.contents}</p>
                    </div>
                    )
            )}
        </div>
    )
}
export default PostList