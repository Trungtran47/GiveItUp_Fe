"use client";

import React, { useState, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Paperclip, X } from "lucide-react";

export default function FormUploadFile({
  fieldName,
  accept = ".pdf,.doc,.docx",
  title = "Chọn tệp",
}) {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();

  const formValue = watch(fieldName);
  const [file, setFile] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    if (!formValue) {
      setFile(null);
      return;
    }

    if (typeof formValue === "string" && formValue.startsWith("http")) {
      const nameFromUrl = formValue.split("/").pop();
      setFile({ name: nameFromUrl, url: formValue });
    } else if (formValue?.name || formValue?.file) {
      setFile(formValue);
    }
  }, [formValue]);

  const handleFileChange = (e, onChange) => {
    const selected = e.target.files[0];
    if (!selected) return;

    const allowedTypes = [".pdf", ".doc", ".docx"];
    const ext = selected.name.substring(selected.name.lastIndexOf("."));
    if (!allowedTypes.includes(ext.toLowerCase())) {
      alert("Vui lòng chọn file .pdf, .doc hoặc .docx");
      e.target.value = "";
      return;
    }

    const fileURL = URL.createObjectURL(selected);
    const fileObj = { file: selected, name: selected.name, preview: fileURL };

    setFile(fileObj);
    onChange(fileObj);
  };

  const removeFile = (onChange) => {
    setFile(null);
    onChange(null);
  };

  // ✅ Hàm mở preview: PDF xem trong modal, file khác mở tab
  const handlePreview = () => {
    if (file?.name?.endsWith(".pdf") && (file.preview || file.url)) {
      setIsPreviewOpen(true);
    } else if (file?.url) {
      window.open(file.url, "_blank");
    } else {
      alert("Không thể xem trước định dạng này, vui lòng tải file xuống.");
    }
  };

  return (
    <div className="w-full">
      <Controller
        control={control}
        name={fieldName}
        render={({ field: { onChange } }) => (
          <>
            {file ? (
              <div className="flex items-center justify-between w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 h-[32px]">
                <div className="flex items-center gap-2 text-gray-700 text-sm truncate">
                  <Paperclip size={16} className="text-gray-500" />

                  {/* 👇 Click để mở xem file */}
                  <button
                    type="button"
                    onClick={handlePreview}
                    className="text-blue-600 hover:underline truncate max-w-[200px] text-left"
                  >
                    {file.name || "Xem tệp"}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removeFile(onChange)}
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
                <Paperclip size={16} className="mr-2" />
                <span className="text-sm">{title}</span>
              </label>
            )}
          </>
        )}
      />

      {/* Thông báo lỗi */}
      {errors[fieldName] && (
        <p className="text-[#D90102] -mt-1 text-[10px]">
          {errors[fieldName]?.message}
        </p>
      )}

      {/* ✅ Modal xem PDF toàn màn hình */}
      {isPreviewOpen && file && (file.preview || file.url) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50"
          onClick={() => setIsPreviewOpen(false)}
        >
          <iframe
            src={file.preview || file.url}
            title="PDF Preview"
            className="w-[90%] h-[90%] rounded-lg bg-white"
          ></iframe>
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
