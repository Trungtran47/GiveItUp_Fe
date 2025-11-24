"use client";

import React, { useState, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { X, ImagePlus } from "lucide-react";

export default function FormUploadMultiImage({
  fieldName,
  title = "Chọn ảnh",
  max = 5, // số ảnh tối đa
}) {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();

  const formValue = watch(fieldName);
  const [images, setImages] = useState([]); // [{file, url, isThumb}, ...]

  // đồng bộ dữ liệu từ form vào local state
  useEffect(() => {
    if (!formValue) return;

    if (Array.isArray(formValue)) {
      setImages(formValue);
    } else if (typeof formValue === "string" && formValue.startsWith("http")) {
      setImages([{ url: formValue, isThumb: true }]);
    }
  }, [formValue]);

  // xử lý chọn file
  const handleFilesChange = (e, onChange) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      isThumb: true, // ảnh mới là thumb
    }));

    // tất cả ảnh cũ set isThumb = false
    const oldImages = images.map((img) => ({ ...img, isThumb: false }));

    // merge ảnh mới lên đầu
    const merged = [...newImages, ...oldImages].slice(0, max);

    setImages(merged);
    onChange(merged);
  };

  // đặt ảnh làm thumb
  const handleSetThumb = (index, onChange) => {
    const updated = images.map((img, i) => ({
      ...img,
      isThumb: i === index,
    }));
    setImages(updated);
    onChange(updated);
  };

  // xóa ảnh
  const handleRemove = (index, onChange) => {
    const updated = images.filter((_, i) => i !== index);

    // nếu xóa thumb thì gán ảnh đầu tiên còn lại làm thumb
    if (!updated.some((i) => i.isThumb) && updated.length > 0) {
      updated[0].isThumb = true;
    }

    setImages(updated);
    onChange(updated);
  };

  return (
    <div className="w-full">
      <Controller
        control={control}
        name={fieldName}
        render={({ field: { onChange } }) => (
          <div className="flex flex-col gap-3">
            {/* Ảnh thumb lớn */}
            {images.length > 0 && (
              <div className="relative w-full h-48 border rounded-lg overflow-hidden">
                {images
                  .filter((img) => img.isThumb)
                  .map((img, index) => (
                    <img
                      key={index}
                      src={img.url || img.preview || img.file?.preview}
                      alt="Thumbnail"
                      className="object-cover w-full h-full"
                    />
                  ))}
              </div>
            )}

            {/* Dòng ảnh nhỏ phía dưới */}
            <div className="flex flex-wrap items-center gap-3">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`relative w-20 h-20 rounded-md overflow-hidden border cursor-pointer ${
                    img.isThumb
                      ? "border-2 border-[#017C18]"
                      : "border-gray-300"
                  }`}
                >
                  <img
                    src={img.url || img.preview || img.file?.preview}
                    alt={`img-${index}`}
                    className="object-cover w-full h-full"
                    onClick={() => handleSetThumb(index, onChange)}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemove(index, onChange)}
                    className="absolute top-0 right-0 bg-black bg-opacity-50 text-white rounded-bl-md p-0.5"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}

              {/* Nút thêm ảnh */}
              {images.length < max && (
                <label className="w-20 h-20 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center rounded-md cursor-pointer hover:border-[#017C18] transition">
                  <ImagePlus size={20} className="text-gray-500 mb-1" />
                  <span className="text-xs text-gray-500">{title}</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFilesChange(e, onChange)}
                  />
                </label>
              )}
            </div>
          </div>
        )}
      />

      {/* Thông báo lỗi */}
      {errors[fieldName] && (
        <p className="text-[#D90102] text-[10px] mt-1">
          {errors[fieldName]?.message}
        </p>
      )}
    </div>
  );
}
