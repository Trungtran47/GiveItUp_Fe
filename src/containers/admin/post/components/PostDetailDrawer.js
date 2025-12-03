import Utils from "@/utils/Utils";
import { Drawer, Tag, Divider, Card } from "antd";
import Image from "next/image";

export default function PostDetailDrawer({ open, onClose, data }) {
  if (!data) return null;

  const {
    title,
    description,
    targetAmount,
    donatedAmount,
    viewCount,
    endDate,
    statusName,
    bankAccount,
    user,
    category,
    images,
    video,
    createdAt,
    updatedAt,
  } = data;

  const thumbnail = images?.find((img) => img.isThumbnail);

  return (
    <Drawer
      title="Thông tin chi tiết bài viết"
      placement="right"
      onClose={onClose}
      open={open}
      width={1200}
      zIndex={2000}
    >
      <div className="space-y-6 pb-2">
        {/* Ảnh Thumbnail */}
        {thumbnail && (
          <div className="w-full">
            <Image
              src={thumbnail.imageUrl}
              alt="Thumbnail"
              width={800}
              height={400}
              className="rounded-xl object-cover w-full h-64"
            />
          </div>
        )}
        <p className="text-2xl font-semibold">{title}</p>
        {/* Thông tin cơ bản */}
        <Card title="Thông tin bài viết" bordered={false}>
          <p className="">{description}</p>

          <div className="flex items-center gap-2 mt-2">
            <Tag color="blue">{statusName}</Tag>
          </div>

          <p className="mt-2">
            <b>Ngày kết thúc:</b> {Utils.getDateDayjs(endDate)}{" "}
          </p>
          <p>
            <b>Lượt xem:</b> {viewCount}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-3 rounded-lg bg-gray-50 border">
              <p className="text-gray-500 text-sm">Số tiền mục tiêu</p>
              <p className="text-xl font-semibold text-blue-600">
                {targetAmount.toLocaleString()} đ
              </p>
            </div>

            <div className="p-3 rounded-lg bg-gray-50 border">
              <p className="text-gray-500 text-sm">Đã quyên góp</p>
              <p className="text-xl font-semibold text-green-600">
                {donatedAmount.toLocaleString()} đ
              </p>
            </div>
          </div>
        </Card>

        {/* Video */}
        {video && (
          <Card title="Video" bordered={false}>
            <video controls className="w-full rounded-lg">
              <source src={video} type="video/mp4" />
            </video>
          </Card>
        )}

        {/* Thông tin danh mục */}
        <Card title="Danh mục" bordered={false}>
          <p>
            <b>Tên danh mục:</b> {category?.categoryName}
          </p>
          <p>
            <b>Mô tả:</b> {category?.description}
          </p>
        </Card>

        {/* Tổ chức / Người tạo bài viết */}
        <Card title="Tổ chức / Người tạo" bordered={false}>
          <div className="flex gap-4 items-center">
            {user?.organizationLogo && (
              <Image
                src={user.organizationLogo}
                alt="Organization Logo"
                width={70}
                height={70}
                className="rounded-full border"
              />
            )}

            <div>
              <p>
                <b>{user?.organizationName}</b>
              </p>
              <p>
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-gray-500">{user?.organizationEmail}</p>
            </div>
          </div>

          <Divider />

          <p>
            <b>Địa chỉ tổ chức:</b> {user?.organizationAddress}
          </p>
          <p>
            <b>Số điện thoại:</b> {user?.organizationPhone}
          </p>
          <p>
            <b>Ngày thành lập:</b> {user?.establishmentDate}
          </p>
        </Card>

        {/* Thông tin tài khoản ngân hàng */}
        <Card title="Tài khoản ngân hàng" bordered={false}>
          <p>
            <b>Chủ tài khoản:</b> {bankAccount?.accountHolderName}
          </p>
          <p>
            <b>Số tài khoản:</b> {bankAccount?.bankAccountNumber}
          </p>
          <p>
            <b>Ngân hàng:</b> {bankAccount?.bankName}
          </p>
          <p>
            <b>Mã tài khoản:</b> {bankAccount?.accountCode}
          </p>
        </Card>

        {/* Ngày giờ tạo */}
        <Card title="Thời gian" bordered={false}>
          <p>
            <b>Tạo lúc:</b> {new Date(createdAt).toLocaleString()}
          </p>
          <p>
            <b>Cập nhật lúc:</b> {new Date(updatedAt).toLocaleString()}
          </p>
        </Card>

        {/* =============================== */}
        {/* KHỐI ĐỂ HIỂN THỊ DANH SÁCH DONATE */}
        {/* =============================== */}
        <Card title="Danh sách người quyên góp" bordered={false}>
          <div className="min-h-32 text-gray-500">
            {/* Bạn render danh sách donate vào đây */}
            <p>Danh sách quyên góp sẽ hiển thị tại đây...</p>
          </div>
        </Card>
      </div>
    </Drawer>
  );
}
