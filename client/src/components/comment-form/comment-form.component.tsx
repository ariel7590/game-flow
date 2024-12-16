import { ChangeEvent, FormEvent } from "react";
import ReactQuill from 'react-quill';
import ReplyIcon from '@mui/icons-material/Reply';
import 'react-quill/dist/quill.snow.css';

interface ICommentFormProps {
    handleSubmit: (event: FormEvent) => void;
    handleChange: (event: ChangeEvent<HTMLTextAreaElement> | string) => void;
    handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
    isEdit: boolean;
    text?: string;
    fileName?: string
}

const CommentForm = ({ handleSubmit, handleChange, handleFileChange, isEdit, text, fileName }: ICommentFormProps) => {
    return (
        <div className="w-[100%] flex justify-center items-center m-[50px]">
            <form className="flex flex-col w-[50%]" onSubmit={(event) => handleSubmit(event)}>
                {
                    isEdit
                        ?
                        <h3 className="text-center">Edit Comment</h3>
                        :
                        <div className="flex items-center"><ReplyIcon /><h4 className="pt-1">New Comment</h4></div>
                }
                <br />
                <ReactQuill
                value={text || ""}
                onChange={(event) => handleChange(event)}
                theme="snow"
                className="bg-white h-[200px] overflow-y-clip rounded-md text-black border-none"
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

                <br />
                <div className='flex justify-between w-[90%]'>
                    <label htmlFor='browse' className="bg-blue-700 hover:bg-blue-600 px-5 py-[5px] cursor-pointer rounded-[5px]">
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
                <button className="bg-green-700 self-center w-[8vw] min-w-[80px] hover:bg-green-600">Send</button>
            </form>
        </div>
    )
}

export default CommentForm;