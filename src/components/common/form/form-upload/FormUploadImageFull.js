"use client";

import React, { useState, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import Image from "next/image";

export default function FormUploadImageFull({
  fieldName,
  accept = "image/*",
  title = "Chọn ảnh",
  onSave,
  defaultImage,
  className = "", // ⭐ cho phép truyền class
}) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const formValue = watch(fieldName);
  const [file, setFile] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Khởi tạo từ defaultImage
  useEffect(() => {
    if (formValue) {
      if (typeof formValue === "string" && formValue.startsWith("http")) {
        setFile({ preview: formValue });
      } else if (formValue?.preview) {
        setFile(formValue);
      }
    } else if (defaultImage) {
      setFile({ preview: defaultImage });
      setValue(fieldName, defaultImage);
    } else {
      setFile(null);
    }
  }, [formValue, defaultImage, fieldName, setValue]);

  const handleFileChange = (e, onChange) => {
    const selected = e.target.files[0];
    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      alert("Vui lòng chọn file hình ảnh hợp lệ!");
      return;
    }

    const preview = URL.createObjectURL(selected);
    const fileObj = { file: selected, preview };
    setFile(fileObj);
    onChange(fileObj);
    onSave?.(fileObj);
  };

  const removeFile = (onChange) => {
    setFile(null);
    onChange(null);
    onSave?.(null);
  };

  return (
    <div className={`relative flex flex-col gap-2 ${className}`}>
      <Controller
        control={control}
        name={fieldName}
        render={({ field: { onChange } }) => (
          <>
            {file ? (
              <div className="relative w-full h-full rounded-xl overflow-hidden border group">
                <Image
                  src={file.preview}
                  alt="Preview"
                  fill
                  className="object-cover cursor-pointer"
                  onClick={() => setIsPreviewOpen(true)}
                />

                {/* Btn xoá */}
                <button
                  type="button"
                  onClick={() => removeFile(onChange)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white 
                             text-sm flex items-center justify-center opacity-80 hover:opacity-100"
                >
                  ×
                </button>
              </div>
            ) : (
              <label
                className="w-full h-full border-2 border-dashed border-gray-300 rounded-xl 
                                 flex flex-col items-center justify-center cursor-pointer text-gray-600 hover:border-[#017C18] transition"
              >
                <input
                  type="file"
                  accept={accept}
                  className="hidden"
                  onChange={(e) => handleFileChange(e, onChange)}
                />
                <div className="text-2xl font-bold">+</div>
                <div className="text-sm">{title}</div>
              </label>
            )}
          </>
        )}
      />

      {errors[fieldName] && (
        <p className="text-red-500 text-sm">{errors[fieldName]?.message}</p>
      )}

      {/* Modal preview ảnh fullscreen */}
      {isPreviewOpen && file?.preview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setIsPreviewOpen(false)}
        >
          <Image
            src={file.preview}
            alt="Preview Fullscreen"
            width={900}
            height={900}
            className="object-contain max-w-[90%] max-h-[90%]"
          />

          <button
            onClick={() => setIsPreviewOpen(false)}
            className="absolute top-4 right-4 text-white text-3xl font-bold"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
