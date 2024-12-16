import { FormEvent, ChangeEvent } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
  fileName,
}: IPostFormProps) => {
  return (
    <div className="flex flex-col items-center mt-10">
      <form
        className="flex flex-col justify-between border-[2px] p-3 w-[40%]"
        onSubmit={(event) => handleSubmit(event)}
      >
        {editPost ? (
          <h3 className="mb-3 self-center">Edit Post</h3>
        ) : (
          <h3 className="mb-3 self-center">New Post</h3>
        )}
        <div className="flex justify-between">
          <input
            type="text"
            name="gameName"
            className="h-10 rounded-lg text-black w-[49%] mb-[10px]"
            placeholder="Game Name"
            onChange={(e) => handleChange(e)}
            value={gameName}
          />
          <input
            type="text"
            name="title"
            className="h-10 rounded-lg text-black w-[49%] mb-[10px]"
            placeholder="Title"
            onChange={(e) => handleChange(e)}
            value={titleValue}
          />
        </div>
        {editPost ? (
          <ReactQuill
            value={bodyValue}
            onChange={(event) => handleChange(event)}
            theme="snow"
            className="bg-white h-[250px] overflow-y-clip rounded-md text-black border-none"
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link"],
              ],
            }}
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "list",
              "bullet",
              "link",
            ]}
          />
        ) : (
          <ReactQuill
            onChange={(event) => handleChange(event)}
            theme="snow"
            className="bg-white h-[250px] overflow-y-clip rounded-md text-black border-none"
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link"],
              ],
            }}
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "list",
              "bullet",
              "link",
            ]}
          />
        )}

        <div className="flex justify-between">
          <label
            htmlFor="browse"
            className="bg-blue-700 hover:bg-blue-600 px-5 py-[5px] cursor-pointer rounded-[5px] mt-2"
          >
            +Upload Image
          </label>
          <label>{fileName}</label>
          <input
            type="file"
            id="browse"
            className="invisible"
            onChange={(e) => handleFileChange(e)}
          />
        </div>
        <button
          type="submit"
          className="bg-green-700 self-center w-[8vw] min-w-[80px] hover:bg-green-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default PostForm;
