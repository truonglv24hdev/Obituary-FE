import { X, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface ContributeModalProps {
  obituaryId: string;
  open: boolean;
  onClose: () => void;
}

const VideoWall = ({ obituaryId, open, onClose }: ContributeModalProps) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed h-full inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-[600px] rounded-2xl shadow-xl p-6 sm:p-8 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6">
          Contribute to memory wall
        </h2>

        {/* Input label */}
        <p className="text-sm text-gray-600 mb-2">
          Video URL{" "}
          <span className="text-xs">(YouTube, Google Drive, Dailymotion)</span>
        </p>

        {/* Input field */}
        <div className="border border-dashed border-gray-400 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 mb-4">
          <input
            type="text"
            placeholder="Enter the URL address of your video"
            className="w-full outline-none text-sm placeholder-gray-500"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        {/* Format helper */}
        <p className="text-sm font-semibold text-gray-700 mb-5 sm:mb-6">
          The format should be like this:{" "}
          <span className="text-gray-500 break-all block">
            https://www.youtube.com/watch?v=AbkEmIgJMcU
          </span>
        </p>

        {/* Search button */}
        <div className="flex justify-end">
          <Button
            onClick={() => alert(`Searching: ${url}`)}
            className="w-full sm:w-[190px] h-11 rounded text-base flex items-center justify-center gap-3 museo font-light bg-[#699D99] text-white px-6 hover:bg-[#5a8b88]"
          >
            <Search className="w-5 h-5" />
            Search video
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoWall;
