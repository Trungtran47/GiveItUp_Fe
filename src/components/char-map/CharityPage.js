"use client";
import postFactory from "@/redux/post/factory";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// Import Map component
const CharityMap = dynamic(() => import("./CharityMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-gray-100 animate-pulse rounded-xl flex items-center justify-center">
      Đang tải bản đồ...
    </div>
  ),
});
// ==========================================
// 1. CÁC HÀM TIỆN ÍCH (HELPER FUNCTIONS)
// ==========================================

// Hàm lấy tên Tỉnh/Thành phố từ tọa độ (Reverse Geocoding)
// Hàm lấy tên Tỉnh/Thành phố chuẩn xác hơn cho Việt Nam
const getCityFromCoordinates = async (lat, lng) => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`;
    const response = await fetch(url, {
      headers: { "Accept-Language": "vi" },
    });
    const data = await response.json();

    if (data) {
      console.log("📍 Raw Data:", data);
      if (data.address && data.address.state) {
        return cleanName(data.address.state);
      }
      if (data.display_name) {
        const parts = data.display_name.split(",");

        for (const part of parts) {
          const p = part.trim();
          if (p.startsWith("Thành phố") || p.startsWith("Tỉnh")) {
            return cleanName(p);
          }
        }
      }
      if (data.address && data.address["ISO3166-2-lvl4"]) {
        const isoMap = {
          "VN-DN": "Đà Nẵng",
          "VN-HN": "Hà Nội",
          "VN-SG": "Hồ Chí Minh",
        };
        if (isoMap[data.address["ISO3166-2-lvl4"]]) {
          return isoMap[data.address["ISO3166-2-lvl4"]];
        }
      }
    }

    return "Đà Nẵng";
  } catch (error) {
    console.error("Lỗi lấy tên thành phố:", error);
    return "Đà Nẵng";
  }
};

// Hàm làm sạch tên (Xóa tiền tố Tỉnh/Thành phố)
const cleanName = (name) => {
  return name.replace(/^(Thành phố|Tỉnh)\s+/i, "").trim();
};
// Hàm chuyển đổi địa chỉ bài viết thành tọa độ (Geocoding)
const geocodePostAddress = async (address) => {
  try {
    let response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}&limit=1&countrycodes=vn`
    );
    let data = await response.json();

    if (data && data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    }

    // Fallback: Nếu không tìm thấy, thử cắt ngắn địa chỉ
    const parts = address.split(",");
    if (parts.length > 1) {
      const shortAddress = parts.slice(1).join(",").trim();
      response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          shortAddress
        )}&limit=1&countrycodes=vn`
      );
      data = await response.json();
      if (data && data.length > 0) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      }
    }
    return null;
  } catch (error) {
    return null;
  }
};
export default function CharityPage() {
  const [userLocation, setUserLocation] = useState(null);
  // const [currentCity, setCurrentCity] = useState("Đang xác định...");
  const [postLocations, setPostLocations] = useState([]);
  const [locationError, setLocationError] = useState(null);
  const [loadingPosts, setLoadingPosts] = useState(true);

  // Hàm tải danh sách bài viết theo tên thành phố
  const fetchPostsByCity = async (cityName, centerLocation = null) => {
    try {
      setLoadingPosts(true);
      // setCurrentCity(cityName);

      // Gọi API Backend của bạn với biến cityName động
      const data = await postFactory.getPostMap(cityName);
      const rawPosts = data?.result || [];

      // Chuyển đổi địa chỉ các bài viết sang tọa độ (Geocoding)
      const geocodedPosts = await Promise.all(
        rawPosts.map(async (post) => {
          // Nếu DB đã có sẵn tọa độ thì dùng luôn
          if (post.latitude && post.longitude) {
            return {
              ...post,
              lat: post.latitude,
              lng: post.longitude,
              name: post.title,
              type: post.categoryName,
            };
          }
          // Nếu chưa có, gọi API chuyển đổi từ địa chỉ
          if (post.address) {
            const coords = await geocodePostAddress(post.address);
            if (coords) {
              return {
                ...post,
                lat: coords.lat,
                lng: coords.lng,
                name: post.title,
                type: post.categoryName,
              };
            }
          }
          return null;
        })
      );

      setPostLocations(geocodedPosts.filter((p) => p !== null));
      if (centerLocation) {
        setUserLocation(centerLocation);
      } else if (geocodedPosts.length > 0) {
        const firstValid = geocodedPosts.find((p) => p !== null);
        if (firstValid) setUserLocation([firstValid.lat, firstValid.lng]);
      }
    } catch (error) {
      console.error("Lỗi tải dữ liệu:", error);
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Trình duyệt không hỗ trợ định vị.");
      fetchPostsByCity("Đà Nẵng");
      return;
    }

    // Cấu hình định vị tối ưu hơn cho Web
    const locationOptions = {
      enableHighAccuracy: false,
      timeout: 20000,
      maximumAge: 1000 * 60 * 5,
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const userCoords = [latitude, longitude];
        const detectedCity = await getCityFromCoordinates(latitude, longitude);
        fetchPostsByCity(detectedCity, userCoords);
      },
      (error) => {
        console.error("Lỗi định vị:", error);
        let msg = "Không thể lấy vị trí.";
        if (error.code === 1) msg = "Bạn đã từ chối chia sẻ vị trí."; // PERMISSION_DENIED
        if (error.code === 2) msg = "Vị trí không khả dụng."; // POSITION_UNAVAILABLE
        if (error.code === 3) msg = "Hết thời gian chờ lấy vị trí."; // TIMEOUT

        setLocationError(msg);

        // Fallback: Load mặc định Đà Nẵng nếu lỗi
        fetchPostsByCity("Đà Nẵng", [16.0544, 108.2022]);
      },
      locationOptions // <--- Truyền cấu hình mới vào đây
    );
  }, []);
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Điểm từ thiện quanh bạn
      </h1>

      {locationError && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p>Lưu ý: {locationError}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4 h-[500px] overflow-y-auto pr-2 scroll-white">
          {loadingPosts ? (
            <p className="text-gray-500 text-center">Đang tải danh sách...</p>
          ) : postLocations.length === 0 ? (
            <p className="text-gray-500 text-center">
              Không tìm thấy địa điểm nào.
            </p>
          ) : (
            postLocations.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-lg hover:shadow-md cursor-pointer bg-white transition  "
              >
                <h3 className="font-bold text-gray-800 text-sm line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                  {item.address}
                </p>
                <span className="inline-block mt-2 text-[10px] bg-green-100 text-[#017C18] px-2 py-1 rounded-full font-semibold">
                  {item.categoryName}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Cột phải: Bản đồ */}
        <div className="lg:col-span-2">
          {userLocation ? (
            <CharityMap
              userLocation={userLocation}
              locations={postLocations} // Truyền danh sách đã có tọa độ
            />
          ) : (
            <div className="w-full h-[500px] bg-gray-100 rounded-xl flex items-center justify-center">
              <span className="text-gray-500">Đang tìm vị trí của bạn...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
