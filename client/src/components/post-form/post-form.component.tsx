import React,{FormEvent, ChangeEvent} from "react";
import * as postFormStyles from './post-form.tailwind'

interface IPostFormProps {
    handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    titleValue?:string;
    bodyValue?:string
}

const PostForm =({handleSubmit, handleChange, titleValue, bodyValue}:IPostFormProps)=>{
    return (
        <div className={postFormStyles.container}>
			<h1 className={postFormStyles.pageTitle}>New Post</h1>
			<form
				className={postFormStyles.form}
				onSubmit={(event) => handleSubmit(event)}
			>
				<input
					type='text'
					name='title'
					className={postFormStyles.title}
					placeholder='Title'
					onChange={handleChange}
                    value={titleValue}
				/>
				<textarea
					name='body'
					className={postFormStyles.body}
					placeholder='Content...'
					onChange={handleChange}
                    value={bodyValue}
				/>
				<button type='submit' className={postFormStyles.submit}>
					Send
				</button>
			</form>
		</div>
    )
}

export default PostForm;