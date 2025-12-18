import ButtonCommon from "@/components/common/button/ButtonCommon";
import userFactory from "@/redux/user/factory";
import { getToast } from "@/utils/Utils";
import { Button, Divider, Image, Tag } from "antd";
import {
  CheckCircle,
  FileText,
  Globe,
  Lock,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  Shield,
  Unlock,
  User,
  XCircle,
} from "lucide-react";

export default function PopupDetailAccountAuthor({ payload, showVisible }) {
  const dataUser = payload?.data;
  if (!dataUser) return null;
  const handleChangeStatus = async (id, status) => {
    const res = await userFactory.updateStatus(id, status);
    if (res?.code == 200) {
      getToast("Thành công", "success");
      handleClose();
      payload?.getData();
    } else {
      getToast("Thất bại", "error");
    }
  };
  const { organization } = dataUser;
  const isPendingAuthor = organization && dataUser.role === "USER";
  const handleClose = () => {
    if (payload?.fallback) {
      payload?.fallback();
    }
    showVisible(false);
  };
  // === LOGIC RENDER NÚT BẤM THEO STATUS ===
  const renderFooterActions = () => {
    const status = dataUser.status;

    // CASE 1: ĐANG CHỜ (10) -> Có 3 quyền: Chặn, Từ chối, Duyệt
    if (status === 10) {
      return (
        <div className="flex gap-3">
          {/* Nút Chặn (90) */}
          <ButtonCommon
            title="Chặn"
            startIcon={<Lock size={18} />}
            onClick={() => handleChangeStatus(dataUser.id, 90)}
            style={{ backgroundColor: "#64748b", fontWeight: "500" }} // Màu xám
          />
          {/* Nút Từ chối (40) */}
          <ButtonCommon
            title="Từ chối"
            startIcon={<XCircle size={18} />}
            onClick={() => handleChangeStatus(dataUser.id, 40)}
            style={{ backgroundColor: "#ef4444", fontWeight: "500" }} // Màu đỏ
          />
          {/* Nút Duyệt (30 - Lên Author) */}
          <ButtonCommon
            title="Phê duyệt"
            startIcon={<CheckCircle size={18} />}
            onClick={() => handleChangeStatus(dataUser.id, 30)}
            style={{ backgroundColor: "#22c55e", fontWeight: "500" }} // Màu xanh
          />
        </div>
      );
    }

    // CASE 2: ĐANG HOẠT ĐỘNG (User-20 hoặc Author-30) -> Chỉ được Chặn
    if (status === 20 || status === 30) {
      return (
        <ButtonCommon
          title="Chặn tài khoản"
          startIcon={<Lock size={18} />}
          onClick={() => handleChangeStatus(dataUser.id, 90)}
          style={{ backgroundColor: "#ef4444", fontWeight: "500" }} // Màu đỏ
        />
      );
    }

    // CASE 3: ĐÃ TỪ CHỐI (40) -> Quay lại Pending (10) để xem xét lại
    if (status === 40) {
      return (
        <ButtonCommon
          title="Xem xét lại (Về chờ duyệt)"
          startIcon={<RotateCcw size={18} />}
          onClick={() => handleChangeStatus(dataUser.id, 10)}
          style={{ backgroundColor: "#3b82f6", fontWeight: "500" }} // Màu xanh dương
        />
      );
    }

    // CASE 4: NGỪNG HOẠT ĐỘNG / BỊ CHẶN (90) -> Mở lại
    if (status === 90) {
      // Logic: Nếu role gốc là Author thì về 30, nếu là User thì về 20
      const targetStatus =
        dataUser.role === "AUTHOR" ? 30 : dataUser?.organization ? 10 : 20;

      return (
        <ButtonCommon
          title="Mở khóa hoạt động"
          startIcon={<Unlock size={18} />}
          onClick={() => handleChangeStatus(dataUser.id, targetStatus)}
          style={{ backgroundColor: "#22c55e", fontWeight: "500" }} // Màu xanh
        />
      );
    }

    return null; // Không hiện gì nếu status lạ
  };
  return (
    <div className="bg-gray-50 flex flex-col h-full max-h-[85vh] w-[800px] ">
      {/* 1. HEADER: THÔNG TIN TÀI KHOẢN NGƯỜI DÙNG */}
      <div className="bg-white p-6 border-b border-gray-100 flex items-start gap-5 shadow-sm">
        <div className="flex items-center gap-6 w-full">
          <div className="relative">
            {dataUser.imageUser ? (
              <img
                src={dataUser.imageUser || "/default-avatar.png"}
                className="w-20 h-20 rounded-full object-cover border-4 border-gray-50 shadow-sm"
                alt="User Avatar"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-50 shadow-sm">
                <User className="w-10 h-10 text-gray-400" />
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow">
              {dataUser.role === "AUTHOR" ? (
                <Shield className="w-5 h-5 text-green-600 fill-green-100" />
              ) : (
                <User className="w-5 h-5 text-blue-500 fill-blue-100" />
              )}
            </div>
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {dataUser.firstName} {dataUser.lastName}
                </h2>
                <p className="text-sm text-gray-500 font-medium">
                  @{dataUser.username}
                </p>
              </div>
            </div>

            <div className="flex gap-6 mt-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-blue-500" />
                <span>{dataUser.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-green-500" />
                <span>{dataUser.phoneNumber}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. BODY: NỘI DUNG CHÍNH (SCROLLABLE) */}
      <div className="flex-1 overflow-y-auto p-2 space-y-6 scroll-smooth">
        {/* === KHỐI THÔNG TIN TỔ CHỨC (ƯU TIÊN HIỂN THỊ) === */}
        {organization ? (
          <div className="bg-white rounded-xl border border-green-100 shadow-sm overflow-hidden">
            {/* Header của Author Info */}
            <div className="bg-green-50/50 px-6 py-4 border-b border-green-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-green-800 flex items-center gap-2">
                <Shield size={20} /> Hồ sơ đăng ký Tổ chức
              </h3>
              {isPendingAuthor && (
                <span className="animate-pulse px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full border border-orange-200">
                  Đang chờ duyệt
                </span>
              )}
            </div>

            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                {/* Logo Tổ chức */}
                <div className="w-32 h-32 flex-shrink-0 bg-white border rounded-lg p-2 shadow-sm flex items-center justify-center">
                  <Image
                    src={organization.organizationLogo || "/default-org.png"}
                    alt="Org Logo"
                    width={110}
                    height={110}
                    className="object-contain"
                  />
                </div>

                {/* Thông tin cơ bản */}
                <div className="flex-1 space-y-3">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {organization.organizationName}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                      <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-bold border border-blue-100">
                        {organization.category?.categoryName}
                      </span>
                      <span>• Thành lập: {organization.establishmentDate}</span>
                    </p>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
                    {organization.organizationDescription || "Chưa có mô tả."}
                  </p>
                </div>
              </div>

              <Divider className="my-6" />

              {/* Grid thông tin chi tiết */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <InfoItem
                  icon={<MapPin size={18} className="text-red-500" />}
                  label="Địa chỉ trụ sở"
                  value={organization.organizationAddress}
                />
                <InfoItem
                  icon={<Mail size={18} className="text-orange-500" />}
                  label="Email liên hệ"
                  value={organization.organizationEmail}
                />
                <InfoItem
                  icon={<Phone size={18} className="text-green-500" />}
                  label="Hotline"
                  value={organization.organizationPhone}
                />
                <InfoItem
                  icon={<FileText size={18} className="text-purple-500" />}
                  label="Mã số đăng ký / Thuế"
                  value={organization.registrationCode}
                />
                <InfoItem
                  icon={<Globe size={18} className="text-blue-500" />}
                  label="Website / Mạng xã hội"
                  value={organization.linkInfoOrganization}
                  isLink
                />

                {/* File xác minh */}
                <div className="md:col-span-2 mt-2">
                  <p className="text-xs text-gray-500 uppercase font-bold mb-2">
                    Tài liệu xác minh pháp lý
                  </p>
                  {organization.verificationFile ? (
                    <a
                      href={organization.verificationFile}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-4 p-3 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition cursor-pointer"
                    >
                      <div className="bg-white p-2 rounded-md shadow-sm text-blue-600">
                        <FileText size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-blue-800 group-hover:underline">
                          Xem tài liệu đính kèm
                        </p>
                        <p className="text-xs text-blue-600">
                          Nhấn để mở file trong tab mới
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="p-3 bg-red-50 text-red-500 text-sm rounded border border-red-100">
                      Chưa cập nhật tài liệu xác minh.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* TRƯỜNG HỢP USER THƯỜNG KHÔNG CÓ TỔ CHỨC */
          <div className="flex flex-col items-center justify-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
            <img
              src="/images/empty-box.png"
              alt="No data"
              className="w-24 opacity-50 mb-3"
            />
            <p className="text-gray-500">
              Tài khoản này chưa đăng ký thông tin Tổ chức.
            </p>
          </div>
        )}
      </div>

      {/* 3. FOOTER: THANH HÀNH ĐỘNG (CHỈ HIỆN KHI CÓ YÊU CẦU DUYỆT) */}
      {/* 3. FOOTER: THANH HÀNH ĐỘNG DỰA TRÊN STATUS */}
      <div className="bg-white p-4 border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] flex justify-end gap-3 sticky bottom-0 z-10">
        {renderFooterActions()}

        {/* Nút Đóng luôn hiện để thoát */}
        <ButtonCommon
          title="Đóng"
          onClick={handleClose}
          style={{ backgroundColor: "#9ca3af", fontWeight: "500" }}
        />
      </div>
    </div>
  );
}

// Component phụ hiển thị từng dòng thông tin
const InfoItem = ({ icon, label, value, isLink }) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5 opacity-80">{icon}</div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-gray-400 font-bold uppercase mb-0.5">
        {label}
      </p>
      {isLink ? (
        <a
          href={value}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-blue-600 hover:underline truncate block font-medium"
        >
          {value}
        </a>
      ) : (
        <p className="text-sm text-gray-800 font-medium break-words">
          {value || "---"}
        </p>
      )}
    </div>
  </div>
);
