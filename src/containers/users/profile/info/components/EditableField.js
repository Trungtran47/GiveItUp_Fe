import { useState } from "react";
import { Edit2, Check, X } from "lucide-react";

export default function EditableField({ label, value, onSave }) {
  const [editing, setEditing] = useState(false);
  const [hover, setHover] = useState(false);
  const [newValue, setNewValue] = useState(value);

  const hasChanged = newValue !== value;

  const handleSave = () => {
    if (hasChanged) onSave(newValue);
    setEditing(false);
  };

  const handleCancel = () => {
    setNewValue(value);
    setEditing(false);
  };

  return (
    <div
      className="flex flex-1 justify-between items-center md:flex-row flex-col md:gap-0 gap-4 p-2 rounded-md transition"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* LEFT */}
      <div>
        <p className="text-[14px] text-gray-500">{label}</p>

        {!editing ? (
          <p className="text-[16px] font-semibold text-gray-700">{value}</p>
        ) : (
          <input
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="border rounded px-2 py-1 w-full text-gray-700"
            autoFocus
          />
        )}
        {editing && (
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
        )}
      </div>

      {/* RIGHT: edit button OR action buttons */}
      {!editing && (
        <div>
          {hover && (
            <button
              onClick={() => setEditing(true)}
              className="text-xs text-[#017C18] flex items-center gap-1 hover:underline cursor-pointer"
            >
              <Edit2 size={14} /> Chỉnh sửa
            </button>
          )}
        </div>
      )}
    </div>
  );
}
