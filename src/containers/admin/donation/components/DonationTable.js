import Text from "@/components/common/text-common/text/Text";
import CustomTable from "@/components/custom-table/CustomTable";
import ImagePreview from "@/components/custom-table/ImagePreview";
import Utils, { formatNumber } from "@/utils/Utils";
import { Tooltip } from "antd";
import { HandCoins } from "lucide-react";

export default function DonationTable({ dataSource, loading }) {
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 50,
      align: "center",
      render: (value, record, index) => <Text>{index + 1}</Text>,
    },
    {
      title: "Ảnh ",
      dataIndex: "user",
      key: "userImage",
      width: 80,
      align: "center",
      render: (value) => {
        return (
          <div className="flex items-center justify-center">
            {value?.imageUser ? (
              <ImagePreview
                src={value?.imageUser}
                alt="post"
                width={40}
                height={40}
              />
            ) : (
              <HandCoins className="w-6 h-6 text-gray-500" />
            )}
          </div>
        );
      },
    },
    {
      title: "Người ủng hộ",
      dataIndex: "user",
      key: "user",
      width: 200,
      render: (user) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Hiển thị Avatar nếu có, không thì hiển thị icon mặc định */}

          <div style={{ display: "flex", flexDirection: "column" }}>
            <Text strong>
              {user ? `${user.firstName} ${user.lastName}` : "Ẩn danh"}
            </Text>
            {user?.username && (
              <Text type="secondary" style={{ fontSize: "12px" }}>
                @{user.username}
              </Text>
            )}
          </div>
        </div>
      ),
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      width: 150,
      align: "right",
      render: (value) => (
        <Text style={{ color: "green", fontWeight: "bold" }}>
          {formatNumber(value)}
        </Text>
      ),
    },
    {
      title: "Lời nhắn",
      dataIndex: "description",
      key: "description",
      width: 200,
      render: (text) => (
        <Tooltip title={text}>
          <div
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "200px",
            }}
          >
            <Text>{text || "Không có lời nhắn"}</Text>
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Chiến dịch",
      dataIndex: ["post", "title"], // Lấy title trong object post
      key: "postTitle",
      width: 250,
      render: (text) => (
        <Tooltip title={text}>
          <div
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2, // Giới hạn 2 dòng
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Text>{text}</Text>
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Mã giao dịch",
      dataIndex: "paymentCode",
      key: "paymentCode",
      width: 150,
      render: (value) => <Text code>{value}</Text>,
    },
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      align: "center",
      render: (value) => <Text>{Utils.getDateDayjs(value)}</Text>,
    },
  ];
  return (
    <div>
      <CustomTable
        columns={columns}
        dataSource={dataSource?.Data || []}
        loading={loading}
        totalRecord={dataSource?.Paging?.TotalRecord}
      />
    </div>
  );
}
