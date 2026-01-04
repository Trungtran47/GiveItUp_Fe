import userFactory from "@/redux/user/factory";
import { getToast } from "@/utils/Utils";
import { get } from "http";
import { useState } from "react";

export default function PopupRequestChangePassword({ payload, showVisible }) {
  // State quản lý luồng
  const [step, setStep] = useState(1); // 1: Nhập Email, 2: Nhập OTP & Pass mới
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", content: "" }); // Thông báo lỗi/thành công

  // State dữ liệu form
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleClose = () => {
    if (payload?.fallback) {
      payload?.fallback();
    }
    showVisible(false);
    handleReset();
  };
  const handleReset = () => {
    // Reset tất cả state về ban đầu
    setStep(1);
    setLoading(false);
    setMsg({ type: "", content: "" });
    setEmail("");
    setOtp("");
    setNewPassword("");
  };
  // LOGIC BƯỚC 1: Gửi yêu cầu lấy mã
  const handleSendCode = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!email)
      return setMsg({ type: "error", content: "Vui lòng nhập email/username" });

    setLoading(true);
    setMsg({ type: "", content: "" });

    try {
      const res = await userFactory.forgotPassword({ email: email });
      if (res.code !== 200) throw new Error("Không tìm thấy người dùng");
      // Thành công -> Chuyển bước 2
      setStep(2);
      setMsg({ type: "success", content: "Mã OTP đã được gửi về email!" });
    } catch (error) {
      console.log("error", error);

      setMsg({
        type: "error",
        content: error.response?.data?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // LOGIC BƯỚC 2: Xác thực OTP và Đổi mật khẩu
  const handleResetPassword = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!otp || !newPassword)
      return setMsg({ type: "error", content: "Vui lòng nhập đủ thông tin" });

    setLoading(true);
    setMsg({ type: "", content: "" });

    try {
      const res = await userFactory.resetPassword({
        email: email,
        otp: otp,
        newPassword: newPassword,
      });
      if (res.code !== 200) throw new Error("Mã OTP sai hoặc hết hạn");
      // Thành công
      getToast("Đổi mật khẩu thành công!", "success");
      handleClose();
    } catch (error) {
      setMsg({ type: "error", content: error.response?.data?.message });
    } finally {
      setLoading(false);
    }
  };
  if (!showVisible) return null;
  return (
    <div
      className="p-2 bg-[#f0f1f3] min-w-[500px]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-[#ffffff] rounded-lg p-6 flex flex-col gap-4">
        {/* Khu vực hiển thị thông báo */}
        {msg.content && (
          <div
            className={`p-2 text-sm rounded ${
              msg.type === "error"
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {msg.content}
          </div>
        )}

        {/* --- BƯỚC 1: NHẬP EMAIL --- */}
        {step === 1 && (
          <>
            <h3 className="text-lg font-bold text-gray-700">Tìm tài khoản</h3>
            <p className="text-sm text-gray-500">
              Nhập email để nhận mã xác thực.
            </p>

            <input
              type="text"
              placeholder="Email hoặc Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-1.5 focus:outline-blue-500 rounded-[8px]"
            />

            <button
              onClick={handleSendCode}
              disabled={loading}
              className="bg-blue-600 text-white py-2 rounded-[8px] hover:bg-blue-700 disabled:bg-gray-400 cursor-pointer"
            >
              {loading ? "Đang gửi..." : "Gửi mã xác thực"}
            </button>
          </>
        )}

        {/* --- BƯỚC 2: NHẬP OTP & PASS MỚI --- */}
        {step === 2 && (
          <>
            <h3 className="text-lg font-bold text-gray-700">
              Đặt lại mật khẩu
            </h3>
            <p className="text-sm text-gray-500">
              Mã xác thực đã gửi tới: <b>{email}</b>
            </p>

            <input
              type="text"
              placeholder="Nhập mã OTP (6 số)"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border border-gray-300 rounded-[8px] p-2 focus:outline-blue-500 "
            />

            <input
              type="password"
              placeholder="Mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border border-gray-300 rounded-[8px] p-2 focus:outline-blue-500"
            />

            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation(); // Chặn luôn nút quay lại cho chắc
                  setStep(1);
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-[8px] hover:bg-gray-300 cursor-pointer"
              >
                Quay lại
              </button>
              <button
                type="button"
                onClick={handleResetPassword}
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-2 rounded-[8px] hover:bg-green-700 disabled:bg-gray-400 cursor-pointer"
              >
                {loading ? "Đang xử lý..." : "Xác nhận đổi"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
