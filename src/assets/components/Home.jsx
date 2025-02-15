import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addPaste, updatePaste } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const[searchPaste,setsearchPaste]=useSearchParams();
  const pasteID=searchPaste.get("pasteID");

  const dispatch=useDispatch();

  function createPaste(){
    const createpaste={
        title:title,
        content:content,
        _id:pasteID || Date.now().toString(36),
        createdAt:new Date().toISOString()

    }
    if(pasteID)
        dispatch(updatePaste(createpaste))
    else
     dispatch(addPaste(createpaste))

     setContent("");
     setTitle("");
     setsearchPaste({})
  }

  return (
    <div className="bg-[#E1F8DC] h-[100vh] w-[100vw] flex justify-center items-center">

      <div className="bg-[#CAF1DE] h-[70vh] w-[40vw] flex flex-col items-center justify-center gap-4 p-6 rounded-lg shadow-lg">
        <div className="w-full">
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="w-full">
          <textarea
            value={content}
            placeholder="Enter Text"
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md h-32 resize-none"
          ></textarea>
          <button onClick={createPaste} className="text-lg font-semibold px-8 b-1 bg-blue-300 py-2 hover:bg-gray-400 cursor-pointer mt-4">
            {
                pasteID ? "UpdatePaste" : "CreatePaste"
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
