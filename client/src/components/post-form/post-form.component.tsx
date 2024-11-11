import React, { FormEvent, ChangeEvent } from "react";
import * as postFormStyles from "./post-form.tailwind";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface IPostFormProps {
	handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
	handleChange: (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string
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
			<form
				className={postFormStyles.form}
				onSubmit={(event) => handleSubmit(event)}
			>
				{editPost ? (
				<h3 className={postFormStyles.pageTitle}>Edit Post</h3>
			) : (
				<h3 className={postFormStyles.pageTitle}>New Post</h3>
			)}
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
				<ReactQuill
                value={bodyValue || ""}
                onChange={(event) => handleChange(event)}
                theme="snow"
                className="bg-white h-[250px] overflow-y-clip rounded-md text-black border-none"
                modules={{
                    toolbar: [
                        [{'header': [1,2,3,false]}],
                        ['bold','italic','underline'],
                        [{'list': 'ordered'}, {'list': 'bullet'}],
                        ['link'],
                    ]
                }}
                formats={[
                    'header',
                    'bold','italic', 'underline',
                    'list', 'bullet',
                    'link'
                ]}
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
