import React, { FormEvent, ChangeEvent, useState } from "react";
import * as postFormStyles from "./post-form.tailwind";

interface IPostFormProps {
	handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
	handleChange: (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	editPost: boolean;
	gameName?: string;
	titleValue?: string;
	bodyValue?: string;
}

const PostForm = ({
	handleSubmit,
	handleChange,
	editPost,
	gameName,
	titleValue,
	bodyValue,
}: IPostFormProps) => {
	const [file, setFile] = useState<File | null>(null);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setFile(e.target.files[0]);
		}
	};

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
						onChange={handleChange}
						value={gameName}
					/>
					<input
						type='text'
						name='title'
						className={postFormStyles.title}
						placeholder='Title'
						onChange={handleChange}
						value={titleValue}
					/>
				</div>
				<textarea
					name='body'
					className={postFormStyles.body}
					placeholder='Content...'
					onChange={handleChange}
					value={bodyValue}
				/>
				<div className='flex justify-between w-[90%]'>
					<label htmlFor='browse' className={postFormStyles.browse}>
						+Upload Image
					</label>
					<label>{file?.name}</label>
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
