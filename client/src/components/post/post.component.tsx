import React from "react";
import { useSelector } from "react-redux";
import * as postStyle from './post.tailwind'
import { RootState } from "../../redux/store";

const Post=()=>{
    const post=useSelector((state:RootState)=>state.posts.currentPost);

    return(
        <div className={postStyle.postContainer}>
            <h2>{post!.title}</h2>
            <br />
            <p>{post!.body}</p>
            <span className={postStyle.publisher}>by: {post!.publisher}</span>
        </div>
    )
}

export default Post;