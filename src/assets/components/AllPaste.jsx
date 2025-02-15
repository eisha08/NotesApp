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
  // Ensure the correct state structure
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
    <div className="flex flex-col justify-center items-center">
      <div className="py-8 px-6 text-3xl font-semibold">All Pastes</div>
      <div>
        <input
          type="text"
          className="p-2 border-1 rounded-lg w-[35vw] shadow-lg"
          placeholder="Search Title"
          value={searchItem}
          onChange={(e) => {
            setsearchItem(e.target.value);
          }}
          name=""
          id=""
        />
      </div>
      <div className="gap-2 mt-4 space-y-2">
        {filterData.length > 0 &&
          filterData.map((paste) => (
            <div key={paste._id} className="space-y-2">
              <div className="border-1 rounded-lg px-2">
                <div className="text-xl  py-2 w-[35vw] rounded-lg">
                  {paste.title}
                </div>
                <div className="text-lg  py-2 w-[35vw] rounded-lg">
                  {paste.content}
                </div>
                <div className="flex flex-row px-2 space-x-2 text-xl">
                  <div>
                    <button
                      onClick={() => {
                        handleDelete(paste?._id);
                      }}
                      className="cursor-pointer"
                    >
                      <MdDelete />
                    </button>
                  </div>
                  <div>
                    <button className="cursor-pointer">
                      <a href={`/?pasteID=${paste?._id}`}>
                        <CiEdit />
                      </a>
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content);
                        toast.success("Copied Successfully");
                      }}
                      className="cursor-pointer"
                    >
                      <FaRegCopy />
                    </button>
                  </div>
                  <div>
                    <NavLink to={`/view/${paste._id}`}>
                      <button className="cursor-pointer">
                        <FaRegEye />
                      </button>
                    </NavLink>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        const shareData = {
                          title: paste.title,
                          text: paste.content,
                          url: `${window.location.origin}/paste/${paste._id}`, // Generates a shareable link
                        };

                        if (navigator.share) {
                          navigator
                            .share(shareData)
                            .then(() =>
                              toast.success("Link shared successfully!")
                            )
                            .catch((error) =>
                              console.error("Error sharing:", error)
                            );
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
          ))}
      </div>
    </div>
  );
};

export default AllPaste;
