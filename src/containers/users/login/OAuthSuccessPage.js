"use client";

import Constants from "@/utils/Constants";
import Cookies from "js-cookie"; // Import js-cookie
import { jwtDecode } from "jwt-decode";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// Import action getDataUser để lấy thông tin user sau khi có token
import { getDataUser } from "@/redux/user/reducer";

export default function OAuthSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  // Hàm lưu cookie (Copy logic từ file Saga của bạn sang đây để tái sử dụng)
  const saveTokenToCookies = (token, expiresDuration) => {
    // expiresDuration: Thời lượng tính bằng giây (seconds)
    const expireDays = expiresDuration / (24 * 60 * 60); // Đổi giây -> ngày
    Cookies.set(
      "user",
      JSON.stringify({
        Token: token,
        Expires: expiresDuration, // Lưu đúng cấu trúc như Saga
      }),
      {
        expires: expireDays,
        path: "/",
        sameSite: "Lax",
      }
    );
  };

  useEffect(() => {
    // 1. Lấy token từ URL
    const token = searchParams.get("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    try {
      // 2. Decode token để lấy thông tin
      const decoded = jwtDecode(token);

      // 3. Tính toán thời gian hết hạn (Expires Duration)
      // decoded.exp là thời điểm hết hạn (Unix timestamp)
      // Cần trừ đi thời gian hiện tại để ra thời lượng còn lại (Duration)
      const currentTime = Math.floor(Date.now() / 1000);
      const expiresDuration = decoded.exp ? decoded.exp - currentTime : 86400; // Mặc định 1 ngày nếu không có exp

      // 4. Lưu vào Cookie (Thay thế localStorage)
      saveTokenToCookies(token, expiresDuration);

      // 5. Dispatch action để Redux cập nhật thông tin user ngay lập tức
      // (Giống dòng `yield put(getDataUser())` trong Saga)
      dispatch(getDataUser());

      // 6. Hiển thị thông báo
      // EventRegister.emit(EVENT_SHOW_POPUP, {
      //   type: POPUP_TEXT_TYPE,
      //   payload: {
      //     title: "Thành công",
      //     message: "Đăng nhập Google thành công!",
      //   },
      // });

      // 7. Điều hướng dựa trên Role
      const role = decoded?.scope;
      if (Constants.ROLES.ADMIN.includes(role)) {
        router.replace("/admin/dashboard");
      } else if (Constants.ROLES.USER.includes(role)) {
        router.replace("/");
      } else if (Constants.ROLES.AUTHOR.includes(role)) {
        router.replace("/");
      } else {
        router.replace("/");
      }
    } catch (error) {
      console.error("Lỗi xử lý login Google:", error);
      router.replace("/login");
    }
  }, [searchParams, router, dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Đang đăng nhập...</h2>
        <p className="text-gray-500">Vui lòng đợi trong giây lát.</p>
      </div>
    </div>
  );
}
