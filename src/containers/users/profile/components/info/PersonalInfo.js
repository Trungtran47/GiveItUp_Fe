"use client";
import Image from "next/image";
import {
  CalendarDays,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Icon,
  PlusCircle,
} from "lucide-react";
import { useSelector } from "react-redux";
import Utils from "@/utils/Utils";
import { Female, Male } from "@mui/icons-material";
// import Cookies from "js-cookie";
import Constants from "@/utils/Constants";
// import { jwtDecode } from "jwt-decode";
import IcEdit from "@/assets/icons/ic-edit";
import ButtonCommon from "@/components/common/button/ButtonCommon";
import EventRegister, {
  EVENT_SHOW_POPUP,
  POPUP_CREATE_AUTHOR,
} from "@/utils/EventRegister";
import ZoomableImage from "@/components/common/form/image/ZoomableImage";
export default function PersonalInfo() {
  // const author = Cookies.get("user") || "";
  // const decoded = jwtDecode(author);
  // const role = decoded?.scope;
  const user = useSelector((state) => state.user.dataUser);

  const handleCreateAuthor = (data) => {
    EventRegister.emit(EVENT_SHOW_POPUP, {
      type: POPUP_CREATE_AUTHOR,
      open: true,
      payload: {
        title: data ? "Cập nhật Author" : "Tạo Author",
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="bg-white shadow-sm rounded-2xl p-6 md:p-8 relative">
          {/* Icon edit góc trên bên phải */}
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            onClick={() => {
              // Xử lý mở modal hoặc chuyển trang edit
              console.log("Edit user");
            }}
          >
            <div className="hover:scale-110 transition-transform duration-200 cursor-pointer">
              <IcEdit />
            </div>
          </button>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* <Image
              src={user.avatar}
              alt={user.username}
              width={120}
              height={120}
              className="rounded-full border shadow-sm"
            /> */}
            <div className="flex-1 text-center md:text-left space-y-2">
              <h2 className="text-2xl font-semibold text-gray-800">
                {user.firstName + " " + user.lastName}
              </h2>
              <p className="text-gray-600 flex justify-center md:justify-start items-center gap-2">
                <CalendarDays className="w-4 h-4 text-gray-500" />
                Tham gia từ {Utils.getDateDayjs(user.createdAt, 13)}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 mt-3">
                <p className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-4 h-4 text-gray-500" /> {user.email}
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-4 h-4 text-gray-500" /> {user.phoneNumber}
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  {user.gender == 1 ? (
                    <Male className="w-4 h-4 text-blue-500" />
                  ) : (
                    <Female className="w-4 h-4 text-pink-500" />
                  )}
                  {user.gender == 1 ? "Nam" : "Nữ"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Thông tin tổ chức */}
        <div className="bg-white shadow-sm rounded-2xl p-6 md:p-8">
          {user?.role === Constants.ROLES.USER &&
          user?.status === Constants.STATUS_USER.USER ? (
            <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Trở thành tác giả ngay hôm nay!
              </h2>
              <p className="text-gray-600 max-w-md">
                Đăng ký tài khoản Author để chia sẻ dự án, bài viết và kết nối
                với cộng đồng.
              </p>
              <ButtonCommon
                startIcon={<PlusCircle className="w-5 h-5" />}
                title="Đăng ký Author"
                onClick={() => handleCreateAuthor(null)}
              />
            </div>
          ) : user?.status === Constants.STATUS_USER.PENDING ? (
            <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-yellow-600">
                Tài khoản của bạn đang được duyệt
              </h2>
              <p className="text-gray-600 max-w-md">
                Vui lòng chờ quản trị viên xác nhận tài khoản của bạn. Bạn sẽ
                nhận được thông báo khi tài khoản được duyệt.
              </p>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-6">
              <ZoomableImage
                src={user.organizationLogo}
                alt={user.organizationLogoPublicId || "logo"}
                width={100}
                height={100}
                className="rounded-xl border shadow-sm object-cover"
              />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {user.organizationName}
                  </h3>
                  {user.status === Constants.STATUS_USER.AUTHOR && (
                    <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                      <CheckCircle className="w-4 h-4" /> Đã xác minh
                    </span>
                  )}
                </div>

                <p className="text-gray-600">{user.organizationDescription}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mt-4 text-gray-700">
                  <p>
                    <span className="font-medium">Lĩnh vực:</span>{" "}
                    {user.activityField}
                  </p>
                  <p>
                    <span className="font-medium">Thành lập:</span>{" "}
                    {new Date(user.establishmentDate).toLocaleDateString(
                      "vi-VN"
                    )}
                  </p>
                  <p>
                    <span className="font-medium">Địa điểm:</span>{" "}
                    {user.organizationAddress}
                  </p>
                  <p>
                    <span className="font-medium">Mã đăng ký:</span>{" "}
                    {user.registrationCode}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {user.organizationEmail}
                  </p>
                  <p>
                    <span className="font-medium">Số điện thoại:</span>{" "}
                    {user.organizationPhone}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
