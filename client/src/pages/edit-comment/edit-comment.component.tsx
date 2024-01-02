import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import CommentForm from "../../components/comment-form/comment-form.component";
import { AppDispatch } from "../../redux/store";
import { editCommentThunk } from "../../redux/comments/comments.thunks";


interface IEditCommentProps {
    text: string;
}
const EditComment = ({ text }: IEditCommentProps) => {
    const [content, setContent] = useState(text);

    const dispatch = useDispatch<AppDispatch>();

    const location = useLocation();

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log(location.pathname.slice(-20));
        // dispatch(editCommentThunk())
    }
    return (
        <CommentForm
            handleChange={(event) => handleChange(event)}
            handleSubmit={(event) => handleSubmit(event)} />
    )
}

export default EditComment;