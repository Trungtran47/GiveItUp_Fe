import LocationSelector from "@/containers/users/profile/info/components/LocationSelector";
import { Check, X } from "lucide-react";
import { useState } from "react";

export default function EditableUserInfoItem({
  label,
  value,
  fallback = "Chưa có thông tin",
  icon,
  type = "text",
  options = [],
  onSave,
  formatValue,
}) {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value ?? "");

  const displayValue = value
    ? formatValue
      ? formatValue(value)
      : value
    : fallback;

  const handleSave = () => {
    onSave && onSave(inputValue);
    setEditing(false);
  };

  const handleCancel = () => {
    setInputValue(value ?? "");
    setEditing(false);
  };

  const hasChanged = inputValue !== (value ?? "");

  return (
    <div className="flex items-center gap-4 text-gray-500 text-sm group">
      {/* Icon */}
      <div>{icon}</div>

      {/* Nội dung và nút chỉnh sửa */}
      <div className="flex flex-col w-full">
        {/* Label + nút chỉnh sửa */}
        <div className="flex items-center justify-between">
          <span>{label}</span>

          {/* Nút chỉnh sửa chỉ hiển thị khi hover và chưa edit */}
          {!editing && onSave && (
            <button
              className="text-[#017C18] text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center gap-1 hover:underline"
              onClick={() => setEditing(true)}
            >
              Chỉnh sửa
            </button>
          )}
        </div>

        {/* Giá trị hoặc input edit */}
        {editing ? (
          <>
            {type === "text" && (
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="border-b border-gray-300 mt-1 focus:outline-none focus:border-[#017C18] w-full"
              />
            )}
            {type === "date" && (
              <input
                type="date"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="border-b border-gray-300 mt-1 focus:outline-none focus:border-[#017C18] w-full"
              />
            )}
            {type === "select" && (
              <select
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="border-b border-gray-300 mt-1 focus:outline-none focus:border-[#017C18] w-full"
              >
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}
            {type === "selectLocation" && (
              <LocationSelector
                value={inputValue}
                onChange={(newVal) => setInputValue(newVal)}
              />
            )}
            {type === "visibility" && (
              <div className="mt-2 flex flex-col gap-3  p-4 rounded-lg ">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name={`${label}-visibility`}
                    value="PRIVATE"
                    checked={inputValue === "PRIVATE"}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="mt-1"
                  />
                  <div>
                    <p className="font-semibold">Riêng tư</p>
                    <p className="text-gray-500 text-sm">
                      Mọi người chỉ có thể nhìn thấy tên, ảnh đại diện của bạn.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name={`${label}-visibility`}
                    value="PUBLIC"
                    checked={inputValue === "PUBLIC"}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="mt-1"
                  />
                  <div>
                    <p className="font-semibold">
                      Công cộng{" "}
                      <span className="text-xs bg-green-200 text-green-700 px-2 py-[1px] rounded ml-2">
                        KHUYẾN KHÍCH
                      </span>
                    </p>
                    <p className="text-gray-500 text-sm">
                      Mọi người có thể xem hồ sơ đầy đủ của bạn.
                    </p>
                  </div>
                </label>
              </div>
            )}
            {/* Nút Lưu / Hủy */}
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={handleCancel}
                className="flex items-center gap-1 text-gray-500 text-sm hover:text-gray-700 cursor-pointer"
              >
                <X size={16} /> Hủy
              </button>

              <button
                onClick={handleSave}
                disabled={!hasChanged}
                className={`flex items-center gap-1 text-sm px-2 py-1 rounded 
              ${
                hasChanged
                  ? "bg-[#017C18] text-white cursor-pointer hover:bg-[#016113]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed "
              }`}
              >
                <Check size={16} /> Xác nhận
              </button>
            </div>
          </>
        ) : (
          <p className="mt-1 font-medium">{displayValue}</p>
        )}
      </div>
    </div>
  );
}
