import { Image as AntImage } from "antd";

const ImagePreview = ({ src, alt = "image", width = 40, height = 40 }) => {
  // nếu src không tồn tại hoặc rỗng thì dùng ảnh mặc định
  const imageUrl = src ? src : "/images/default-image.png";

  return (
    <AntImage
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      fallback="/images/default-image.png"
      style={{ objectFit: "cover", borderRadius: "8px" }}
    />
  );
};

export default ImagePreview;
