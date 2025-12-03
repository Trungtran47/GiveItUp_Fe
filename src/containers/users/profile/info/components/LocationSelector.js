import locationFactory from "@/redux/location/factory";
import { useEffect, useState } from "react";

export default function LocationSelector({ value, onChange }) {
  const [province, setProvince] = useState("");
  const [ward, setWard] = useState("");
  const [inputValue, setInputValue] = useState("");

  const [provinces, setProvinces] = useState([]);
  const [wards, setWards] = useState([]);

  const getProvinces = async () => {
    const data = await locationFactory.getProvinces();
    if (data?.code === 200) {
      setProvinces(data.result);
    }
  };

  const getWards = async (provinceId) => {
    const data = await locationFactory.getWards(provinceId);
    if (data?.code === 200) {
      setWards(data.result);
    }
  };

  useEffect(() => {
    getProvinces();
  }, []);

  useEffect(() => {
    if (province) {
      getWards(province);
      setWard("");
    }
  }, [province]);

  useEffect(() => {
    if (province && ward) {
      const provinceName = provinces.find((p) => p.id == province)?.name;
      const wardName = wards.find((w) => w.id == ward)?.name;

      onChange?.(`${inputValue} - ${wardName} - ${provinceName}`);
    }
  }, [ward, inputValue, province, provinces, wards, onChange]);

  return (
    <div className="flex gap-4">
      <select
        value={province}
        onChange={(e) => setProvince(e.target.value)}
        className="border-b border-gray-300 mt-1 focus:outline-none focus:border-green-600 w-40 scroll-white"
      >
        <option value="">-- Chọn Tỉnh --</option>
        {provinces.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>

      {province && (
        <select
          value={ward}
          onChange={(e) => setWard(e.target.value)}
          className="border-b border-gray-300 mt-1 focus:outline-none focus:border-green-600 w-40 scroll-white"
        >
          <option value="">-- Chọn Xã --</option>
          {wards.map((w) => (
            <option key={w.id} value={w.id}>
              {w.name}
            </option>
          ))}
        </select>
      )}
      {ward && (
        <div>
          <input
            type="text"
            placeholder="Nhập địa chỉ cụ thể"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border-b border-gray-300 mt-1 focus:outline-none focus:border-[#017C18] w-100"
          />
        </div>
      )}
    </div>
  );
}
