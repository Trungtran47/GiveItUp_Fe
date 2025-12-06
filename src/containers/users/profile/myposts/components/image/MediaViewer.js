import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function MediaViewer({ open, setOpen, media, index, setIndex }) {
  if (!open) return null;

  const current = media[index];

  const next = () => {
    setIndex((index + 1) % media.length);
  };

  const prev = () => {
    setIndex((index - 1 + media.length) % media.length);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center">
      {/* Close */}
      <button
        className="absolute top-5 right-5 text-white"
        onClick={() => setOpen(false)}
      >
        <X size={32} />
      </button>

      {/* Prev */}
      {media.length > 1 && (
        <button className="absolute left-5 text-white" onClick={prev}>
          <ChevronLeft size={40} />
        </button>
      )}

      {/* Content */}
      <div className="max-w-4xl max-h-[80vh] flex items-center justify-center">
        {current.type === "image" ? (
          <img src={current.url} className="max-h-[80vh] rounded-xl" />
        ) : (
          <video
            src={current.url}
            controls
            autoPlay
            className="max-h-[80vh] rounded-xl"
          ></video>
        )}
      </div>

      {/* Next */}
      {media.length > 1 && (
        <button className="absolute right-5 text-white" onClick={next}>
          <ChevronRight size={40} />
        </button>
      )}
    </div>
  );
}
