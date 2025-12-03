"use client";

import React, { useState, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import Image from "next/image";

export default function FormUploadImage({
  fieldName,
  accept = "image/*",
  title = "Chọn ảnh",
  onSave, // ✅ callback khi file thay đổi
  defaultImage, // ✅ ảnh mặc định từ server
}) {
  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const formValue = watch(fieldName);
  const [file, setFile] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // ⚡ Khởi tạo file từ defaultImage hoặc giá trị form
  useEffect(() => {
    if (formValue) {
      if (typeof formValue === "string" && formValue.startsWith("http")) {
        setFile({ preview: formValue });
      } else if (formValue?.preview) {
        setFile(formValue);
      }
    } else if (defaultImage) {
      setFile({ preview: defaultImage });
      // Cập nhật vào form để submit
      setValue(fieldName, defaultImage);
    } else {
      setFile(null);
    }
  }, [formValue, defaultImage, fieldName, setValue]);

  const handleFileChange = (e, onChange) => {
    const selected = e.target.files[0];
    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      alert("Vui lòng chọn file hình ảnh (jpg, png, jpeg...)");
      e.target.value = "";
      return;
    }

    const preview = URL.createObjectURL(selected);
    const fileObj = { file: selected, preview };
    setFile(fileObj);
    onChange(fileObj);
    if (onSave) onSave(fileObj); // ✅ gọi callback khi upload
  };

  const removeFile = (onChange) => {
    setFile(null);
    onChange(null);
    if (onSave) onSave(null); // ✅ gọi callback khi xóa
  };

  return (
    <div className="w-28 flex flex-col items-center gap-2">
      <Controller
        control={control}
        name={fieldName}
        render={({ field: { onChange } }) => (
          <>
            {file ? (
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 group">
                <Image
                  src={file.preview}
                  alt="Preview"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full cursor-pointer"
                  onClick={() => setIsPreviewOpen(true)}
                />

                {/* Nút xóa */}
                <button
                  type="button"
                  onClick={() => removeFile(onChange)}
                  className="absolute top-3 right-3 w-4 h-4 rounded-full bg-red-500 bg-opacity-80 
                    text-white text-xs flex items-center justify-center hover:bg-opacity-100 transition"
                >
                  ×
                </button>
              </div>
            ) : (
              <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-full flex flex-col items-center justify-center cursor-pointer text-gray-500 hover:border-[#017C18] transition">
                <input
                  type="file"
                  accept={accept}
                  className="hidden"
                  onChange={(e) => handleFileChange(e, onChange)}
                />
                <div className="text-xl font-bold">+</div>
                <div className="text-xs text-center">{title}</div>
              </label>
            )}
          </>
        )}
      />

      {errors[fieldName] && (
        <p className="text-red-500 mt-1 text-sm">
          {errors[fieldName]?.message}
        </p>
      )}

      {/*  Modal xem ảnh toàn màn hình */}
      {isPreviewOpen && file?.preview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setIsPreviewOpen(false)}
        >
          <Image
            src={file.preview}
            alt="Preview Fullscreen"
            width={800}
            height={800}
            className="object-contain max-w-[90%] max-h-[90%] rounded-lg"
          />
          <button
            onClick={() => setIsPreviewOpen(false)}
            className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-300"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
