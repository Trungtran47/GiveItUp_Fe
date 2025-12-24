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
    if (payload?.onClose) {
      payload.onClose();
    }
  };

  // LOGIC BƯỚC 1: Gửi yêu cầu lấy mã
  const handleSendCode = async () => {
    if (!email)
      return setMsg({ type: "error", content: "Vui lòng nhập email/username" });

    setLoading(true);
    setMsg({ type: "", content: "" });

    try {
      const res = await fetch("http://localhost:8080/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identification: email }),
      });

      if (!res.ok) throw new Error("Không tìm thấy người dùng");

      // Thành công -> Chuyển bước 2
      setStep(2);
      setMsg({ type: "success", content: "Mã OTP đã được gửi về email!" });
    } catch (error) {
      setMsg({ type: "error", content: error.message });
    } finally {
      setLoading(false);
    }
  };

  // LOGIC BƯỚC 2: Xác thực OTP và Đổi mật khẩu
  const handleResetPassword = async () => {
    if (!otp || !newPassword)
      return setMsg({ type: "error", content: "Vui lòng nhập đủ thông tin" });

    setLoading(true);
    setMsg({ type: "", content: "" });

    try {
      const res = await fetch("http://localhost:8080/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identification: email,
          otp: otp,
          newPassword: newPassword,
        }),
      });

      if (!res.ok) throw new Error("Mã OTP sai hoặc hết hạn");

      // Thành công
      alert("Đổi mật khẩu thành công!");
      handleClose(); // Đóng popup
    } catch (error) {
      setMsg({ type: "error", content: error.message });
    } finally {
      setLoading(false);
    }
  };

  if (!showVisible) return null;

  return (
    <div className="p-2 bg-[#f0f1f3] min-w-[500px]">
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
              Nhập email hoặc username để nhận mã xác thực.
            </p>

            <input
              type="text"
              placeholder="Email hoặc Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded p-2 focus:outline-blue-500"
            />

            <button
              onClick={handleSendCode}
              disabled={loading}
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 mt-2"
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
              className="border border-gray-300 rounded p-2 focus:outline-blue-500"
            />

            <input
              type="password"
              placeholder="Mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border border-gray-300 rounded p-2 focus:outline-blue-500"
            />

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300"
              >
                Quay lại
              </button>
              <button
                onClick={handleResetPassword}
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
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
