import { IoMdClose } from "react-icons/io";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface VideoPopupProps {
  videoUrl: string | null;
  onClose: () => void;
}

const VideoPopup = ({ videoUrl, onClose }: VideoPopupProps) => {
  // Handle close on ESC key and click outside the modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target && target.closest(".modal-content") === null) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative w-full max-w-3xl p-4 modal-content">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 text-rose-500 text-3xl font-bold"
        >
          <IoMdClose className="w-4 h-4 font-extrabold" title="Close" />
        </button>
        <div className="bg-white p-4 rounded-lg shadow-lg relative z-0">
          <iframe
            src={`${videoUrl}?autoplay=1`}
            title="YouTube Video"
            width="100%"
            height="450"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default VideoPopup;
