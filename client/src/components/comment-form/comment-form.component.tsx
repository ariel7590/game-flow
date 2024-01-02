import React, { ChangeEvent, FormEvent } from "react";
import * as commentFormStyle from './comment-form.tailwind';

interface ICommentFormProps{
    handleSubmit: (event: FormEvent)=>void;
    handleChange: (event: ChangeEvent<HTMLTextAreaElement>)=>void;
    text?: string;
}

const CommentForm=({handleSubmit, handleChange, text}: ICommentFormProps)=>{
    return (
        <div className={commentFormStyle.formContainer}>
            <form className={commentFormStyle.form} onSubmit={(event) => handleSubmit(event)}>
                <h1 className={commentFormStyle.header}>New Comment</h1>
                <br />
                <textarea className={commentFormStyle.content} value={text} onChange={(event) => handleChange(event)} />
                <br />
                <button className={commentFormStyle.submitBtn}>Send</button>
            </form>
        </div>
    )
}

export default CommentForm;