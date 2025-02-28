import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRegCopy } from "react-icons/fa6";
import toast from "react-hot-toast";

const ViewPaste = () => {
  const { id } = useParams();
  const paste = useSelector((state) =>
    state.paste?.paste.find((p) => p._id === id)
  );

  if (!paste) {
    return <div>Paste not found!</div>;
  }

  return (
    <div className="flex justify-center py-12 bg-[#E1F8DC] h-[100vh] w-[100vw]">
    <div className="w-[35vw]">
      <div className="p-6 flex flex-col justify-center items-center border-1 shadow-lg border-gray-300 rounded-lg">
        <div className="text-2xl font-semibold">{paste.title}</div>
        <div className="mt-4">{paste.content}</div>
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
      </div>
    </div>
    
  </div>
  
  
  );
};

export default ViewPaste;
