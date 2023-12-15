import React from "react";
import * as postStyle from './post.tailwind'

const Post=()=>{
    return(
        <div className={postStyle.postContainer}>
            <h2>Game title| Post title</h2>
            <br />
            <p>here goes all the content of the post</p>
            <span className={postStyle.publisher}>by: user</span>
        </div>
    )
}

export default Post;