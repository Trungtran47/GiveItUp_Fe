"use client";
import FormUploadImage from "@/components/common/form/form-upload/FormUploadImage";
import Constants from "@/utils/Constants";
import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import EditableField from "./EditableField";
import EditableUserInfoItem from "./EditableUserInfoItem";
import ZoomableImage from "@/components/common/form/image/ZoomableImage";
import {
  Ban,
  CalendarDays,
  MapPin,
  Phone,
  PlusCircle,
  User,
} from "lucide-react";
import Utils from "@/utils/Utils";
import ButtonCommon from "@/components/common/button/ButtonCommon";
import bankAccountFactory from "@/redux/bank_account/factory";

export default function ProfileTab({
  user,
  methods,
  onSubmits,
  handleSubmit,
  handleCreateAuthor,
  handleShowBankAccount,
}) {
  const isAuthor =
    user?.role === Constants.ROLES.AUTHOR ||
    user?.status === Constants.STATUS_USER.AUTHOR;

  const [activeTab, setActiveTab] = useState(isAuthor ? "author" : "user");
  const [bankAccount, setBankAccount] = useState(null);
  const getBankAccount = async () => {
    const res = await bankAccountFactory.getBankAccountsByUserId(user?.id);
    if (res?.code == 200) {
      setBankAccount(res?.result);
    }
  };

  useEffect(() => {
    if (isAuthor) {
      getBankAccount();
    }
  }, [isAuthor]);
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmits)}
        encType="multipart/form-data"
      >
        <div className="min-h-screen w-full py-10 px-4 md:px-10">
          <div className="bg-white p-6 rounded-xl ">
            {/* ===================== TABS ===================== */}
            <div className="flex gap-6 border-b mb-6">
              {isAuthor && (
                <button
                  type="button"
                  className={`pb-2 transition cursor-pointer ${
                    activeTab === "author"
                      ? "border-b-2 border-green-700 text-green-700 font-semibold"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("author")}
                >
                  Tổ chức / Author
                </button>
              )}
              <button
                type="button"
                className={`pb-2 transition cursor-pointer ${
                  activeTab === "user"
                    ? "border-b-2 border-green-700 text-green-700 font-semibold"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("user")}
              >
                Thông tin cá nhân
              </button>
            </div>

            {/* ===================== TAB USER ===================== */}
            {activeTab === "user" && (
              <div>
                {/* Ảnh + Tên */}
                <div className="flex flex-row items-center gap-3 p-2 border-b bg-[#f9f9f9] rounded-xl">
                  <div className="relative w-[100px] h-[100px]">
                    <FormUploadImage
                      fieldName="imageUser"
                      title="Tải ảnh đại diện"
                      defaultImage={user?.imageUser}
                      onSave={(data) => handleSubmit(data, "imageUser")}
                    />
                  </div>

                  <EditableField
                    label="TÊN HIỂN THỊ"
                    value={
                      (user?.firstName || "") + " " + (user?.lastName || "")
                    }
                    onSave={(v) => handleSubmit(v, "displayName")}
                  />
                </div>
                <EditableUserInfoItem
                  label="Khả năng hiển thị"
                  value={user?.visibility} // PRIVATE or PUBLIC
                  type="visibility"
                  onSave={(newValue) => updateUserVisibility(newValue)}
                />
                {/* Account Info */}
                <h2 className="text-xl font-semibold mb-4 text-gray-700 mt-6">
                  Quản lý tài khoản
                </h2>
                <div className="mb-4 flex items-center gap-4 text-gray-500 text-sm">
                  <p className="font-medium text-gray-700">{user?.email}</p>
                </div>

                {/* Personal Info */}
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  Thông tin cá nhân
                </h2>

                <div className="space-y-6 text-gray-700">
                  <EditableUserInfoItem
                    label="NGÀY SINH"
                    value={user?.dob}
                    icon={<CalendarDays className="w-5" />}
                    type="date"
                    onSave={(val) => handleSubmit(val, "dob")}
                    formatValue={(val) => Utils.getDateDayjs(val)}
                  />

                  <EditableUserInfoItem
                    label="GIỚI TÍNH"
                    value={user?.gender}
                    icon={<User className="w-5" />}
                    type="select"
                    options={[
                      { label: "Nam", value: 1 },
                      { label: "Nữ", value: 2 },
                      { label: "Khác", value: 3 },
                    ]}
                    onSave={(val) => handleSubmit(val, "gender")}
                    formatValue={(val) =>
                      val == 1 ? "Nam" : val == 2 ? "Nữ" : "Khác"
                    }
                  />

                  <EditableUserInfoItem
                    label="SỐ ĐIỆN THOẠI"
                    value={user?.phoneNumber}
                    icon={<Phone className="w-5" />}
                    type="text"
                    onSave={(val) => handleSubmit(val, "phoneNumber")}
                  />

                  <EditableUserInfoItem
                    label="ĐỊA CHỈ"
                    value={user?.address}
                    icon={<MapPin className="w-5" />}
                    type="selectLocation"
                    onSave={(val) => handleSubmit(val, "address")}
                  />
                </div>
              </div>
            )}
            {/* Thông tin tổ chức */}
            <div className="bg-white rounded-2xl p-6 md:p-8">
              {Constants.ROLES.USER.includes(user?.role) &&
              user?.status === Constants.STATUS_USER.USER ? (
                <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Trở thành tác giả ngay hôm nay!
                  </h2>
                  <p className="text-gray-600 max-w-md">
                    Đăng ký tài khoản Author để chia sẻ dự án, bài viết và kết
                    nối với cộng đồng.
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
                    Tài khoản của bạn đang chờ duyệt
                  </h2>
                  <p className="text-gray-600 max-w-md">
                    Vui lòng chờ quản trị viên xác nhận tài khoản của bạn. Bạn
                    sẽ nhận được thông báo khi tài khoản được duyệt.
                  </p>
                </div>
              ) : null}
            </div>
            {/* ===================== TAB AUTHOR ===================== */}
            {activeTab === "author" && isAuthor && (
              <div className="relative max-w-3xl mx-auto bg-white rounded-xl p-6 space-y-6 group">
                {/* Nút góc trên phải chỉ hiện khi hover */}
                <p
                  onClick={() => handleCreateAuthor(user)}
                  href="#"
                  className="absolute top-4 right-4 text-[#017C18] underline opacity-0 group-hover:opacity-100 transition cursor-pointer"
                >
                  Chỉnh sửa
                </p>
                {/* Logo + Tên */}
                <div className="flex flex-col items-center text-center">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-[160px] h-[160px] rounded-full overflow-hidden border shadow-sm">
                      {user?.organizationLogo && (
                        <ZoomableImage
                          src={user?.organizationLogo}
                          alt="Logo"
                          width={160}
                          height={160}
                        />
                      )}
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-800 mt-4">
                    {user?.organizationName}
                  </h2>

                  <p className="text-gray-600 max-w-xl mt-2">
                    {user?.organizationDescription}
                  </p>
                </div>

                {/* Grid thông tin */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
                  <div>
                    <p className="font-medium text-gray-500">Email</p>
                    <p>{user?.organizationEmail}</p>
                  </div>

                  <div>
                    <p className="font-medium text-gray-500">Điện thoại</p>
                    <p>{user?.organizationPhone}</p>
                  </div>

                  <div>
                    <p className="font-medium text-gray-500">Địa điểm</p>
                    <p>{user?.organizationAddress}</p>
                  </div>

                  <div>
                    <p className="font-medium text-gray-500">Ngày thành lập</p>
                    <p>{user?.establishmentDate}</p>
                  </div>

                  <div>
                    <p className="font-medium text-gray-500">Mã đăng ký</p>
                    <p>{user?.registrationCode}</p>
                  </div>

                  <div>
                    <p className="font-medium text-gray-500">
                      Danh mục hoạt động
                    </p>
                    <p>{user?.category?.categoryName}</p>
                  </div>

                  <div>
                    <p className="font-medium text-gray-500">
                      Trang chính thức
                    </p>
                    <a
                      href={user?.linkInfoOrganization}
                      target="_blank"
                      className="text-blue-600 underline break-all"
                    >
                      {user?.linkInfoOrganization}
                    </a>
                  </div>
                  {/* File xác minh */}
                  {user?.verificationFile && (
                    <div className="">
                      <p className="font-medium text-gray-500">
                        Giấy chứng nhận
                      </p>

                      {/* Hiển thị link mở file */}
                      <a
                        href={user.verificationFile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="!text-blue-600 !underline break-all"
                      >
                        Xem tài liệu xác minh
                      </a>
                    </div>
                  )}
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-500">
                      Tài khoản ngân hàng
                    </p>
                    {/* Nút xem chi tiết (ẩn, chỉ hiện khi hover) */}
                    <button
                      onClick={() => handleShowBankAccount(user?.id)}
                      className="hidden group-hover:flex text-[#017C18] underline text-sm cursor-pointer"
                    >
                      Xem chi tiết
                    </button>
                  </div>
                  <div className="space-y-2">
                    {bankAccount?.map((acc) => (
                      <div
                        key={acc.id}
                        className="group flex justify-between items-center p-2 rounded-md hover:bg-gray-50 transition"
                      >
                        {/* Thông tin */}
                        <div>
                          <p className="text-gray-700">
                            <span className="font-medium text-gray-500">
                              Số tài khoản:
                            </span>{" "}
                            {acc.bankAccountNumber}
                          </p>
                          <p className="text-gray-700">
                            <span className="font-medium text-gray-500">
                              Ngân hàng:
                            </span>{" "}
                            {acc.bankName}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
