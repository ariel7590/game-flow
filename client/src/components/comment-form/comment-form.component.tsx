import React, { ChangeEvent, FormEvent } from "react";
import * as commentFormStyle from './comment-form.tailwind';

interface ICommentFormProps {
    handleSubmit: (event: FormEvent) => void;
    handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
    isEdit: boolean;
    text?: string;
    fileName?: string
}

const CommentForm = ({ handleSubmit, handleChange, handleFileChange, isEdit, text, fileName }: ICommentFormProps) => {
    return (
        <div className={commentFormStyle.formContainer}>
            <form className={commentFormStyle.form} onSubmit={(event) => handleSubmit(event)}>
                {
                    isEdit
                        ?
                        <h1 className={commentFormStyle.header}>Edit Comment</h1>
                        :
                        <h1 className={commentFormStyle.header}>New Comment</h1>
                }
                <br />
                <textarea className={commentFormStyle.content} value={text} onChange={(event) => handleChange(event)} />
                <br />
                <div className='flex justify-between w-[90%]'>
                    <label htmlFor='browse' className={commentFormStyle.browse}>
                        +Upload Image
                    </label>
                    <label>{fileName}</label>
                    <input
                        type='file'
                        id='browse'
                        className='invisible'
                        onChange={(e) => handleFileChange(e)}
                    />
                </div>
                <button className={commentFormStyle.submitBtn}>Send</button>
            </form>
        </div>
    )
}

export default CommentForm;