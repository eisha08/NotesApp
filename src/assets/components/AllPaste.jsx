import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { FaRegCopy } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { deletePaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const AllPaste = () => {
  const paste = useSelector((state) => state.paste?.paste || []);
  const [searchItem, setsearchItem] = useState("");
  const dispatch = useDispatch();

  const filterData = paste.filter((paste) =>
    paste.title.toLowerCase().includes(searchItem.toLocaleLowerCase())
  );

  function handleDelete(pasteID) {
    dispatch(deletePaste(pasteID));
  }

  return (
    <div className="flex flex-col justify-center items-center bg-[#E1F8DC] h-fit py-4">
      <div className="py-8 px-6 text-3xl font-semibold text-purple-700">All Pastes</div>
      <div>
        <input
          type="text"
          className="p-2 border-1 border-gray-300 rounded-lg w-[35vw] shadow-lg"
          placeholder="Search Title"
          value={searchItem}
          onChange={(e) => setsearchItem(e.target.value)}
        />
      </div>
      <div className="gap-2 mt-4 space-y-2">
        {filterData.length > 0 &&
          filterData.map((paste) => {
            const [isExpanded, setIsExpanded] = useState(false);
            const words = paste.content ? paste.content.split(" ") : [];

            return (
              <div key={paste._id} className="space-y-2">
                <div className="border-1 border-gray-300 shadow-lg rounded-lg px-2">
                  <div className="text-xl py-2 w-[35vw] rounded-lg">{paste.title}</div>
                  <div className="text-lg py-2 w-[35vw] rounded-lg">
                    {isExpanded
                      ? paste.content
                      : words.slice(0, 30).join(" ") + (words.length > 30 ? "..." : "")}
                    {words.length > 30 && (
                      <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-blue-500 ml-2"
                      >
                        {isExpanded ? "Read Less" : "Read More"}
                      </button>
                    )}
                  </div>
                  <div className="flex flex-row px-2 space-x-2 text-xl">
                    <button onClick={() => handleDelete(paste._id)} className="cursor-pointer">
                      <MdDelete />
                    </button>
                    <button className="cursor-pointer">
                      <NavLink to={`/?pasteID=${paste._id}`}>
                        <CiEdit />
                      </NavLink>
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(paste.content);
                        toast.success("Copied Successfully");
                      }}
                      className="cursor-pointer"
                    >
                      <FaRegCopy />
                    </button>
                    <NavLink to={`/view/${paste._id}`}>
                      <button className="cursor-pointer">
                        <FaRegEye />
                      </button>
                    </NavLink>
                    <button
                      onClick={() => {
                        const shareData = {
                          title: paste.title,
                          text: paste.content,
                          url: `${window.location.origin}/paste/${paste._id}`,
                        };

                        if (navigator.share) {
                          navigator
                            .share(shareData)
                            .then(() => toast.success("Link shared successfully!"))
                            .catch((error) => console.error("Error sharing:", error));
                        } else {
                          navigator.clipboard.writeText(shareData.url);
                          toast.success("Link copied to clipboard!");
                        }
                      }}
                      className="cursor-pointer"
                    >
                      <IoShareSocialOutline />
                    </button>
                  </div>
                  <div className="text-sm px-2 py-2">
                    Created on:{" "}
                    {new Date(paste.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AllPaste;
