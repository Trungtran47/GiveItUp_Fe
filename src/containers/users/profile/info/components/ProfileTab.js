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
  Phone,
  PlusCircle,
  User,
  Building2,
  Mail,
  MapPin,
  Calendar,
  FileText,
  Globe,
  CheckCircle2,
  CreditCard,
} from "lucide-react";
import Utils from "@/utils/Utils";
import ButtonCommon from "@/components/common/button/ButtonCommon";
import bankAccountFactory from "@/redux/bank_account/factory";
import { useRouter } from "next/navigation";

export default function ProfileTab({
  user,
  methods,
  onSubmits,
  handleSubmit,
  handleCreateAuthor,
  handleShowBankAccount,
}) {
  const router = useRouter();
  const isAuthor =
    user?.role === Constants.ROLES.AUTHOR ||
    user?.status === Constants.STATUS_USER.AUTHOR;

  const [activeTab, setActiveTab] = useState(isAuthor ? "author" : "user");
  const [bankAccount, setBankAccount] = useState(null);
  const getBankAccount = async () => {
    const res = await bankAccountFactory.getBankAccountsByOrganizationId(
      user?.organization?.id
    );
    if (res?.code == 200) {
      setBankAccount(res?.result);
    }
  };
  const handleClick = (id) => {
    router.push(`/u/${id}`);
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
            <div className="flex gap-6 mb-6">
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
                <div className="flex flex-row items-center gap-3 p-2  bg-[#f9f9f9] rounded-xl">
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
                {/* <EditableUserInfoItem
                  label="Khả năng hiển thị"
                  value={user?.visibility} // PRIVATE or PUBLIC
                  type="visibility"
                  onSave={(newValue) => updateUserVisibility(newValue)}
                /> */}
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
              user?.status === Constants.STATUS_USER.USER &&
              !user?.organization ? (
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
                <div className="relative flex flex-col items-center justify-center text-center py-10 space-y-4">
                  <button
                    type="button"
                    onClick={() => handleCreateAuthor(user?.organization)}
                    className="absolute top-4 right-4 text-sm text-gray-500 hover:text-green-700 hover:underline transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>✏️ Chỉnh sửa</span>
                  </button>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-yellow-600">
                    Tài khoản của bạn đang chờ duyệt
                  </h2>
                  <p className="text-gray-600 max-w-md">
                    Vui lòng chờ quản trị viên xác nhận tài khoản của bạn. Bạn
                    sẽ nhận được thông báo khi tài khoản được duyệt.
                  </p>
                </div>
              ) : user?.status === Constants.STATUS_USER.REJECTED ? (
                <div className="relative flex flex-col items-center justify-center text-center py-10 space-y-4">
                  <button
                    type="button"
                    onClick={() => handleCreateAuthor(user?.organization)}
                    className="absolute top-4 right-4 text-sm text-gray-500 hover:text-green-700 hover:underline transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>✏️ Chỉnh sửa</span>
                  </button>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-red-600">
                    Tài khoản của bạn đã bị từ chối
                  </h2>
                  <p className="text-gray-600 max-w-md">
                    Vui lòng liên hệ quản trị viên để biết lý do và hướng khắc
                    phục.
                  </p>
                </div>
              ) : null}
            </div>

            {/* ===================== TAB AUTHOR (CẬP NHẬT) ===================== */}
            {activeTab === "author" && isAuthor && (
              <div className="max-w-4xl mx-auto space-y-8">
                {/* 1. Header Card: Logo & Tên & Mô tả */}
                <div className="relative bg-white border border-gray-100 rounded-2xl p-8 shadow-sm text-center">
                  {/* Nút Chỉnh sửa */}
                  <button
                    type="button"
                    onClick={() => handleCreateAuthor(user?.organization)}
                    className="absolute top-4 right-4 text-sm text-gray-500 hover:text-green-700 hover:underline transition flex items-center gap-1"
                  >
                    <span>✏️ Chỉnh sửa</span>
                  </button>

                  <div className="flex justify-center mb-6">
                    <div className="w-[120px] h-[120px] rounded-full border-4 border-green-50 overflow-hidden shadow-md">
                      {user?.organization?.organizationLogo ? (
                        <ZoomableImage
                          src={user?.organization?.organizationLogo}
                          alt="Logo"
                          width={120}
                          height={120}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                          <Building2 size={40} />
                        </div>
                      )}
                    </div>
                  </div>

                  <h2
                    className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2 hover:text-blue-600 cursor-pointer transition-colors duration-300"
                    onClick={() => handleClick(user?.id)}
                  >
                    {user?.organization?.organizationName}
                    {/* Giả sử đã xác minh */}
                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                  </h2>

                  <p className="text-gray-500 text-sm mt-1 mb-4 uppercase tracking-wide font-medium">
                    {user?.organization?.category?.categoryName ||
                      "Tổ chức từ thiện"}
                  </p>

                  <div className="max-w-2xl mx-auto bg-gray-50 p-4 rounded-xl text-gray-600 text-sm leading-relaxed">
                    {user?.organization?.organizationDescription ||
                      "Chưa có mô tả giới thiệu."}
                  </div>
                </div>

                {/* 2. Grid Thông tin chi tiết */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Cột trái: Liên hệ */}
                  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      Thông tin liên hệ
                    </h3>
                    <div className="space-y-4">
                      <InfoItem
                        icon={<Mail size={18} className="text-green-600" />}
                        label="Email"
                        value={user?.organization?.organizationEmail}
                      />
                      <InfoItem
                        icon={<Phone size={18} className="text-green-600" />}
                        label="Hotline"
                        value={user?.organization?.organizationPhone}
                      />
                      <InfoItem
                        icon={<MapPin size={18} className="text-green-600" />}
                        label="Trụ sở"
                        value={user?.organization?.organizationAddress}
                      />
                      <InfoItem
                        icon={<Globe size={18} className="text-green-600" />}
                        label="Website"
                        value={user?.organization?.linkInfoOrganization}
                        // isLink
                      />
                    </div>
                  </div>

                  {/* Cột phải: Pháp lý & Hành chính */}
                  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      Hồ sơ pháp lý
                    </h3>
                    <div className="space-y-4">
                      <InfoItem
                        icon={
                          <Calendar size={18} className="text-orange-500" />
                        }
                        label="Thành lập"
                        value={user?.organization?.establishmentDate}
                      />
                      <InfoItem
                        icon={
                          <FileText size={18} className="text-orange-500" />
                        }
                        label="Mã số thuế / ĐKKD"
                        value={user?.organization?.registrationCode}
                      />

                      {/* File xác minh */}
                      <div className="pt-2 border-t border-gray-100 mt-4">
                        <p className="text-xs text-gray-500 mb-2 font-medium uppercase">
                          Giấy phép hoạt động
                        </p>
                        {user?.organization?.verificationFile ? (
                          <a
                            href={user?.organization.verificationFile}
                            target="_blank"
                            className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition group"
                          >
                            <div className="bg-white p-2 rounded shadow-sm text-blue-600">
                              <FileText size={20} />
                            </div>
                            <div className="flex-1 overflow-hidden">
                              <p className="text-sm font-medium text-blue-700 truncate">
                                Tài liệu xác minh.pdf
                              </p>
                              <p className="text-xs text-blue-500">
                                Nhấn để xem chi tiết
                              </p>
                            </div>
                          </a>
                        ) : (
                          <span className="text-sm text-gray-400 italic">
                            Chưa cập nhật tài liệu
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Thông tin Ngân hàng (Gây quỹ) */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                      <CreditCard size={20} className="text-green-600" /> Tài
                      khoản gây quỹ
                    </h3>
                    <button
                      type="button"
                      onClick={() =>
                        handleShowBankAccount(user?.organization?.id)
                      }
                      className="text-sm text-green-700 font-medium hover:underline"
                    >
                      Quản lý tài khoản
                    </button>
                  </div>

                  {bankAccount && bankAccount.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {bankAccount.map((acc) => (
                        <div
                          key={acc.id}
                          className="relative bg-gradient-to-br from-gray-50 to-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-green-600">
                              <Building2 size={20} />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 uppercase font-bold">
                                {acc.bankName}
                              </p>
                              <p className="text-xs text-gray-400">Ngân hàng</p>
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-lg font-mono font-bold text-gray-700 tracking-wide">
                              {acc.bankAccountNumber}
                            </p>
                            <p className="text-xs text-gray-500 mt-1 truncate">
                              {acc.accountName ||
                                user?.organization?.organizationName}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                      <p className="text-gray-500 text-sm">
                        Chưa có tài khoản ngân hàng nào được liên kết.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* ... */}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
const InfoItem = ({ icon, label, value, isLink = false }) => {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg transition">
      <div className="mt-0.5 text-gray-400">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400 font-medium uppercase mb-0.5">
          {label}
        </p>
        {isLink ? (
          <a
            href={value}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-blue-600 hover:underline truncate block"
          >
            {value}
          </a>
        ) : (
          <p className="text-sm text-gray-700 font-medium break-words">
            {value}
          </p>
        )}
      </div>
    </div>
  );
};
