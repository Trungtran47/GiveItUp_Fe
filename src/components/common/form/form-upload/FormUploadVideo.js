"use client";

import React, { useState, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Video, X } from "lucide-react";

export default function FormUploadVideo({
  fieldName,
  accept = "video/*", // chỉ nhận video
  title = "Chọn video (.mp4, .mov, .avi)",
}) {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();

  const formValue = watch(fieldName);
  const [video, setVideo] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // 🔄 Khi giá trị form thay đổi
  useEffect(() => {
    if (!formValue) {
      setVideo(null);
      return;
    }

    // Nếu là URL (đã upload sẵn)
    if (typeof formValue === "string" && formValue.startsWith("http")) {
      const nameFromUrl = formValue.split("/").pop();
      setVideo({ name: nameFromUrl, url: formValue });
    } else if (formValue?.file || formValue?.name) {
      setVideo(formValue);
    }
  }, [formValue]);

  const handleFileChange = (e, onChange) => {
    const selected = e.target.files[0];
    if (!selected) return;

    const allowedTypes = [".mp4", ".mov", ".avi", ".mkv"];
    const ext = selected.name.substring(selected.name.lastIndexOf("."));
    if (!allowedTypes.includes(ext.toLowerCase())) {
      alert("Vui lòng chọn video hợp lệ (.mp4, .mov, .avi, .mkv)");
      e.target.value = "";
      return;
    }

    const fileURL = URL.createObjectURL(selected);
    const videoObj = { file: selected, name: selected.name, preview: fileURL };
    setVideo(videoObj);
    onChange(videoObj);
  };

  const removeVideo = (onChange) => {
    setVideo(null);
    onChange(null);
  };

  return (
    <div className="w-full">
      <Controller
        control={control}
        name={fieldName}
        render={({ field: { onChange } }) => (
          <>
            {video ? (
              <div className="flex items-center justify-between w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 h-[32px]">
                <div className="flex items-center gap-2 text-gray-700 text-sm truncate">
                  <Video size={16} className="text-gray-500" />
                  <button
                    type="button"
                    onClick={() => setIsPreviewOpen(true)}
                    className="text-blue-600 hover:underline truncate max-w-[200px] text-left"
                  >
                    {video.name || "Xem video"}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeVideo(onChange)}
                  className="text-red-500 hover:text-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="flex items-center justify-center w-full h-[32px] border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-gray-500 hover:border-[#017C18] transition">
                <input
                  type="file"
                  accept={accept}
                  className="hidden"
                  onChange={(e) => handleFileChange(e, onChange)}
                />
                <Video size={16} className="mr-2" />
                <span className="text-sm">{title}</span>
              </label>
            )}
          </>
        )}
      />

      {/* ⚠️ Hiển thị lỗi nếu có */}
      {errors[fieldName] && (
        <p className="text-[#D90102] -mt-1 text-[10px]">
          {errors[fieldName]?.message}
        </p>
      )}

      {/* 🎬 Modal xem video preview */}
      {isPreviewOpen && video && (video.preview || video.url) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50"
          onClick={() => setIsPreviewOpen(false)}
        >
          <video
            src={video.preview || video.url}
            controls
            className="w-[80%] h-auto rounded-lg shadow-lg"
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
