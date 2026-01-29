import donateFactory from "@/redux/donate/factory";
import postFactory from "@/redux/post/factory";
import Utils, { formatNumber } from "@/utils/Utils";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Card,
  Divider,
  Drawer,
  Empty,
  List,
  Progress,
  Tag,
  Image as AntImage, // <--- 1. Import Image của Ant Design (đặt tên khác để tránh trùng next/image)
} from "antd";
import { HandCoins } from "lucide-react";
// import Image from "next/image"; // <--- Có thể bỏ next/image ở phần này nếu dùng AntImage hoàn toàn
import { useEffect, useState } from "react";

export default function PostDetailDrawer({ open, onClose, id }) {
  const [dataDetails, setDataDetails] = useState(null);
  const [donators, setDonators] = useState([]);

  // Hàm gọi API lấy chi tiết
  async function fetchProjectDetails() {
    if (!id) return;
    try {
      const postRes = await postFactory.getProjectById(id);
      if (postRes?.code === 200) setDataDetails(postRes.result);

      const donateRes = await donateFactory.getDonateTotalbyAmount(id);
      if (donateRes?.code === 200) setDonators(donateRes?.result?.Data);
    } catch (error) {
      console.error("Lỗi tải chi tiết:", error);
    }
  }

  useEffect(() => {
    if (open && id) {
      fetchProjectDetails();
    } else {
      setDataDetails(null);
      setDonators([]);
    }
  }, [id, open]);

  if (!dataDetails) return null;

  const {
    title,
    description,
    targetAmount,
    donatedAmount,
    viewCount,
    likeCount,
    statusName,
    endDate,
    category,
    organization,
    bankAccount,
    address,
    images, // Mảng ảnh
    video,
    payouts,
    createdAt,
  } = dataDetails;

  const percent =
    targetAmount > 0 ? Math.round((donatedAmount / targetAmount) * 100) : 0;

  return (
    <Drawer
      title={
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-gray-800">
            Chi tiết dự án
          </span>
          <Tag color={dataDetails.status === 20 ? "green" : "red"}>
            {statusName || "Không xác định"}
          </Tag>
        </div>
      }
      placement="right"
      onClose={onClose}
      open={open}
      width={1000}
      zIndex={2000}
      // Sửa lại styles theo Antd mới nếu cần, hoặc giữ bodyStyle nếu version cũ
      styles={{ body: { padding: 0, backgroundColor: "#f9fafb" } }}
    >
      <div className="p-6 space-y-6">
        {/* --- PHẦN 1: TỔNG QUAN (THƯ VIỆN ẢNH + THỐNG KÊ) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cột Trái: Thư viện Ảnh & Video */}
          <div className="lg:col-span-2 space-y-4">
            {/* --- KHỐI HIỂN THỊ DANH SÁCH ẢNH (GALLERY) --- */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-700 mb-3 border-l-4 border-green-500 pl-2">
                Thư viện ảnh ({images?.length || 0})
              </h3>

              {images && images.length > 0 ? (
                <AntImage.PreviewGroup>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {images.map((img, index) => (
                      <div
                        key={img.id || index}
                        className="aspect-[4/3] w-full overflow-hidden rounded-lg border border-gray-100 hover:shadow-md transition-all"
                      >
                        <AntImage
                          src={img.imageUrl}
                          className="object-cover w-full h-full"
                          alt={`Ảnh ${index + 1}`}
                          width="100%"
                          height="100%"
                        />
                      </div>
                    ))}
                  </div>
                </AntImage.PreviewGroup>
              ) : (
                <div className="h-40 flex items-center justify-center bg-gray-50 rounded-lg text-gray-400">
                  <Empty description="Không có hình ảnh" />
                </div>
              )}
            </div>

            {/* Video nếu có */}
            {video && (
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-700 mb-3 border-l-4 border-red-500 pl-2">
                  Video giới thiệu
                </h3>
                <div className="rounded-lg overflow-hidden bg-black">
                  <video controls className="w-full max-h-[400px]">
                    <source src={video} type="video/mp4" />
                  </video>
                </div>
              </div>
            )}
          </div>

          {/* Cột Phải: Thống kê Gây quỹ (GIỮ NGUYÊN) */}
          <div className="lg:col-span-1">
            <Card className="shadow-sm border-gray-200 h-full">
              <h2 className="text-lg font-bold text-gray-800 mb-2">{title}</h2>

              <div className="flex flex-wrap gap-2 mb-4">
                <Tag color="blue">{category?.categoryName}</Tag>
                <span className="text-gray-500 text-xs flex items-center gap-1">
                  <EnvironmentOutlined /> {address}
                </span>
              </div>

              {/* Thanh tiến trình gây quỹ */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-4">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Đã đạt được</span>
                  <span className="font-bold text-gray-800">{percent}%</span>
                </div>
                <Progress
                  percent={percent}
                  showInfo={false}
                  strokeColor="#10b981"
                  trailColor="#e5e7eb"
                  size="small"
                />

                <div className="flex justify-between items-end mt-3">
                  <div>
                    <p className="text-xs text-gray-500">Đã quyên góp</p>
                    <p className="text-[13px] font-bold text-green-600">
                      {formatNumber(donatedAmount)} đ
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Mục tiêu</p>
                    <p className="text-[13px] font-semibold text-gray-700">
                      {formatNumber(targetAmount)} đ
                    </p>
                  </div>
                </div>
              </div>

              {/* Các chỉ số phụ */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-white border p-2 rounded text-center">
                  <EyeOutlined className="text-blue-500 text-lg mb-1" />
                  <p className="font-bold">{viewCount}</p>
                  <p className="text-[10px] text-gray-400">Lượt xem</p>
                </div>
                <div className="bg-white border p-2 rounded text-center">
                  <HeartOutlined className="text-red-500 text-lg mb-1" />
                  <p className="font-bold">{likeCount}</p>
                  <p className="text-[10px] text-gray-400">Yêu thích</p>
                </div>
              </div>

              <Divider className="my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">
                    <CalendarOutlined /> Ngày tạo:
                  </span>
                  <span>{Utils.getDateDayjs(createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">
                    <CalendarOutlined /> Hết hạn:
                  </span>
                  <span className="text-red-600 font-medium">
                    {Utils.getDateDayjs(endDate)}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* --- PHẦN 2: NỘI DUNG CHI TIẾT & TỔ CHỨC (GIỮ NGUYÊN) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Nội dung bài viết */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            <Card title="Câu chuyện & Hoàn cảnh" className="shadow-sm">
              <p className="text-gray-700 whitespace-pre-line leading-relaxed text-justify">
                {description}
              </p>
            </Card>

            {/* Lịch sử rút tiền */}
            {payouts && payouts.length > 0 && (
              <Card
                title="Lịch sử giải ngân (Minh bạch)"
                className="shadow-sm "
              >
                <List
                  itemLayout="horizontal"
                  dataSource={payouts}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <AntImage // Dùng AntImage ở đây để có thể zoom ảnh bill chuyển tiền
                            src={item.transferProofImageUrl}
                            width={64}
                            height={64}
                            className="object-cover rounded"
                          />
                        }
                        title={
                          <span className="text-green-700 font-bold">
                            Rút {formatNumber(item.amount)} đ
                          </span>
                        }
                        description={
                          <div className="text-xs">
                            <p>{item.note}</p>
                            <p className="text-gray-400">
                              Ngày tạo: {Utils.getDateDayjs(item.requestedAt)}
                            </p>
                            <Tag
                              color={item.status === 20 ? "green" : "orange"}
                            >
                              {item.statusName}
                            </Tag>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            )}
          </div>

          {/* Cột phải: Thông tin tổ chức... (GIỮ NGUYÊN) */}
          <div className="lg:col-span-1 flex flex-col gap-2">
            {/* Thông tin Tổ chức */}
            <Card title="Đơn vị tổ chức" className="shadow-sm" size="small">
              <div className="flex items-center gap-3 mb-3">
                <Avatar
                  src={organization?.organizationLogo}
                  size={50}
                  className="border"
                />
                <div>
                  <p
                    className="font-bold text-sm line-clamp-1"
                    title={organization?.organizationName}
                  >
                    {organization?.organizationName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {organization?.organizationEmail}
                  </p>
                </div>
              </div>
              <div className="text-xs space-y-1 text-gray-600 bg-gray-50 p-3 rounded">
                <p>{organization?.organizationPhone}</p>
                <p>{organization?.organizationAddress}</p>
              </div>
            </Card>

            {/* Tài khoản ngân hàng */}
            {bankAccount && (
              <Card
                title="Tài khoản nhận tiền"
                className="shadow-sm"
                size="small"
              >
                <div className="bg-blue-50 p-3 rounded border border-blue-100">
                  <p className="text-xs text-blue-500 uppercase font-bold mb-1">
                    {bankAccount.bankName}
                  </p>
                  <p className="text-lg font-mono font-bold text-blue-800 tracking-wider">
                    {bankAccount.bankAccountNumber}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 uppercase">
                    {bankAccount.accountHolderName}
                  </p>
                </div>
              </Card>
            )}

            {/* Danh sách người ủng hộ */}
            <Card
              title="Nhà hảo tâm tiêu biểu"
              className="shadow-sm"
              size="small"
            >
              {donators && donators.length > 0 ? (
                <List
                  itemLayout="horizontal"
                  dataSource={donators.slice(0, 5)}
                  renderItem={(item) => (
                    <List.Item className="!py-2">
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            src={
                              item.user?.role === "AUTHOR"
                                ? item.user?.organization?.organizationLogo
                                : item.user?.imageUser || (
                                    <HandCoins className="w-6 h-6 text-gray-500" />
                                  )
                            }
                          />
                        }
                        title={
                          <span className="text-sm font-medium">
                            {item.user?.role === "AUTHOR"
                              ? item.user?.organization?.organizationName
                              : item.user?.firstName +
                                " " +
                                item.user?.lastName}
                          </span>
                        }
                        description={
                          <span className="text-green-600 font-bold text-xs">
                            +{formatNumber(item.amount)} đ
                          </span>
                        }
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <Empty
                  description="Chưa có lượt ủng hộ nào"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
            </Card>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
