import MediaViewer from "@/containers/users/profile/my_posts/components/image/MediaViewer";
import Image from "next/image";
import { useState } from "react";

export default function PostMediaGrid({ media }) {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!media || media.length === 0) return null;

  const handleOpen = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  // Nếu 1 ảnh/video -> hiển thị full
  if (media.length === 1) {
    return (
      <>
        {media[0].type === "image" ? (
          <Image
            src={media[0].url}
            alt=""
            width={800}
            height={600}
            className="rounded-xl w-full object-cover mb-4 cursor-pointer"
            onClick={() => handleOpen(0)}
          />
        ) : (
          <video
            src={media[0].url}
            controls
            className="rounded-xl w-full max-h-96 object-cover mb-4 cursor-pointer"
            onClick={() => handleOpen(0)}
          />
        )}

        <MediaViewer
          open={open}
          setOpen={setOpen}
          media={media}
          index={currentIndex}
          setIndex={setCurrentIndex}
        />
      </>
    );
  }

  // Nếu nhiều media -> hiển thị kiểu Facebook Grid
  return (
    <>
      <div className="grid grid-cols-2 gap-2 mt-3 rounded-xl overflow-hidden">
        {media.slice(0, 4).map((item, index) => (
          <div
            key={index}
            className="relative h-48 bg-black cursor-pointer"
            onClick={() => handleOpen(index)}
          >
            {item.type === "image" ? (
              <Image src={item.url} alt="" fill className="object-cover" />
            ) : (
              <video src={item.url} className="w-full h-full object-cover" />
            )}

            {/* Nếu nhiều hơn 4 media thì overlay số lượng */}
            {index === 3 && media.length > 4 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-2xl font-semibold">
                +{media.length - 4}
              </div>
            )}
          </div>
        ))}
      </div>

      <MediaViewer
        open={open}
        setOpen={setOpen}
        media={media}
        index={currentIndex}
        setIndex={setCurrentIndex}
      />
    </>
  );
}
