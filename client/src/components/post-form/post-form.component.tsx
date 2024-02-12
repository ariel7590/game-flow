import React, { FormEvent, ChangeEvent } from "react";
import * as postFormStyles from "./post-form.tailwind";

interface IPostFormProps {
	handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
	handleChange: (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
	editPost: boolean;
	gameName?: string;
	titleValue?: string;
	bodyValue?: string;
	fileName?: string;
}

const PostForm = ({
	handleSubmit,
	handleChange,
	handleFileChange,
	editPost,
	gameName,
	titleValue,
	bodyValue,
	fileName
}: IPostFormProps) => {
	

	return (
		<div className={postFormStyles.container}>
			{editPost ? (
				<h1 className={postFormStyles.pageTitle}>Edit Post</h1>
			) : (
				<h1 className={postFormStyles.pageTitle}>New Post</h1>
			)}
			<form
				className={postFormStyles.form}
				onSubmit={(event) => handleSubmit(event)}
			>
				<div className={postFormStyles.titleContainer}>
					<input
						type='text'
						name='gameName'
						className={postFormStyles.title}
						placeholder='Game Name'
						onChange={(e) => handleChange(e)}
						value={gameName}
					/>
					<input
						type='text'
						name='title'
						className={postFormStyles.title}
						placeholder='Title'
						onChange={(e) => handleChange(e)}
						value={titleValue}
					/>
				</div>
				<textarea
					name='body'
					className={postFormStyles.body}
					placeholder='Content...'
					onChange={(e) => handleChange(e)}
					value={bodyValue}
				/>
				<div className='flex justify-between w-[90%]'>
					<label htmlFor='browse' className={postFormStyles.browse}>
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
				<button type='submit' className={postFormStyles.submit}>
					Send
				</button>
			</form>
		</div>
	);
};

export default PostForm;
