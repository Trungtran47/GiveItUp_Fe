"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useRouter } from "next/navigation";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";

export default function CharityMap({ userLocation, locations }) {
  const router = useRouter();
  const handleClick = (id) => {
    router.push(`/project/${id}`);
  };
  // Đà Nẵng mặc định nếu không có vị trí user
  const defaultCenter = [16.0544, 108.2022];
  const user = useSelector((state) => state.user.dataUser);
  const iconCharity = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Icon địa điểm (màu đỏ)
    iconSize: [35, 35],
    iconAnchor: [17, 35], // Điểm nhọn của icon
    popupAnchor: [0, -35],
  });

  const userAvatarUrl =
    user?.role === "AUTHOR"
      ? user?.organization?.organizationLogo ||
        "https://cdn-icons-png.flaticon.com/512/929/929422.png"
      : user?.imageUser ||
        "https://cdn-icons-png.flaticon.com/512/929/929422.png";

  // Tạo divIcon tùy chỉnh
  const iconUser = L.divIcon({
    // Đặt một class name để chúng ta có thể style bằng CSS
    className: "custom-user-marker-container",
    // HTML cho marker: Một div bao ngoài tạo hình marker, và thẻ img bên trong cho avatar
    html: `
    <div class="user-marker-frame">
      <img src="${userAvatarUrl}" alt="User Avatar" class="user-marker-avatar" />
    </div>
  `,
    iconSize: [40, 40], // Kích thước tổng thể của icon
    iconAnchor: [20, 40], // Điểm neo nằm ở giữa đáy của icon (mũi nhọn)
    popupAnchor: [0, -40], // Vị trí popup hiển thị phía trên icon
  });
  // ----
  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg border border-gray-200 z-0">
      <MapContainer
        center={userLocation || defaultCenter}
        zoom={13}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
        scrollWheelZoom={true}
      >
        {/* Layer hiển thị bản đồ nền (OpenStreetMap) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 1. Marker hiển thị vị trí CỦA BẠN (User) */}
        {userLocation && (
          <Marker position={userLocation} icon={iconUser}>
            <Popup>
              <div className="font-bold text-blue-600">Vị trí của bạn</div>
              <p>Bạn đang ở đây</p>
            </Popup>
          </Marker>
        )}

        {/* 2. Marker hiển thị danh sách các ĐIỂM TỪ THIỆN */}
        {locations.map((loc) => (
          <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={iconCharity}>
            <Popup>
              <div className="min-w-[200px]">
                <h3 className="font-bold text-[#017C18] text-sm  line-clamp-2">
                  {loc.name}
                </h3>
                <p className="text-xs text-gray-600 mb-1">{loc.address}</p>
                <button
                  className="bg-[#017C18] text-white text-xs px-3 py-1 rounded hover:bg-green-600 w-full cursor-pointer"
                  onClick={() => handleClick(loc.id)}
                >
                  Xem chi tiết
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
