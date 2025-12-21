import TextLink from "@/components/common/text-common/text-link/TextLink";
import Text from "@/components/common/text-common/text/Text";
import CustomTable from "@/components/custom-table/CustomTable";
import ImagePreview from "@/components/custom-table/ImagePreview";
import StatusApproval from "@/containers/admin/post/components/StatusApproval";
import Utils, { formatNumber } from "@/utils/Utils";
import { useSelector } from "react-redux";

export default function PostAdminTable({
  loading,
  setOpen,
  setSelectedPost,
  onUpdateStatus,
}) {
  const dataSource = useSelector((state) => state.post.postData);
  // Hàm xử lý logic khi Component con trả về kết quả
  const handleStatusChange = (id, newStatus, reason) => {
    // Gọi prop từ cha truyền xuống để xử lý API
    if (onUpdateStatus) {
      onUpdateStatus(id, newStatus, reason);
    } else {
      console.log("Cần truyền prop onUpdateStatus vào PostAdminTable", {
        id,
        newStatus,
        reason,
      });
    }
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 60,
      render: (value, record, index) => <Text>{index + 1}</Text>,
    },

    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      width: 100,
      render: (value, record) => {
        const thumbnail = record.images?.find((img) => img.isThumbnail == true);
        const imageUrl = thumbnail?.imageUrl;
        return (
          <ImagePreview src={imageUrl} alt="post" width={40} height={40} />
        );
      },
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      width: 400,
      render: (value, record) => (
        <div className="line-clamp-2">
          <TextLink
            onClick={() => {
              setSelectedPost(record?.id);
              setOpen(true);
            }}
          >
            {value}
          </TextLink>
        </div>
      ),
    },
    {
      title: "Tác giả",
      dataIndex: "organization",
      key: "organization",
      width: 400,
      render: (value, record, index) => <Text>{value?.organizationName}</Text>,
    },
    {
      title: "Mô tả ngắn",
      dataIndex: "description",
      key: "description",
      width: 300,
      render: (value, record, index) => (
        <div className="line-clamp-2">
          <Text>{value}</Text>
        </div>
      ),
    },
    {
      title: "Cần quyên góp",
      dataIndex: "targetAmount",
      key: "targetAmount",
      align: "right",
      width: 150,
      render: (value, record, index) => <Text>{formatNumber(value)}</Text>,
    },
    {
      title: "Đã quyên góp",
      dataIndex: "donatedAmount",
      key: "donatedAmount",
      align: "right",
      width: 150,
      render: (value, record, index) => <Text>{formatNumber(value)}</Text>,
    },
    {
      title: "Đã nhận đóng góp",
      dataIndex: "payouts",
      key: "payouts",
      width: 170,
      align: "right",
      render: (value) => {
        const totalAmount = value?.reduce(
          (sum, item) => sum + (item.adminTransferAmount || 0),
          0
        );
        return <Text>{formatNumber(totalAmount)} </Text>;
      },
    },
    {
      title: "Lượt thích",
      dataIndex: "likeCount",
      key: "likeCount",
      width: 100,
      render: (value, record, index) => <Text>{value}</Text>,
    },
    {
      title: "Lượt xem",
      dataIndex: "viewCount",
      key: "viewCount",
      width: 100,
      render: (value, record, index) => <Text>{value}</Text>,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      width: 200,
      render: (value, record, index) => <Text>{value?.categoryName}</Text>,
    },
    {
      title: "Lý do từ chối/chặn",
      dataIndex: "reason",
      key: "reason",
      width: 200,
      render: (value, record, index) => <Text>{value}</Text>,
    },
    {
      title: "Trạng thái",
      dataIndex: "statusName",
      key: "statusName",
      width: 180,
      fixed: "right", // Ghim phải cho tiện thao tác
      render: (value, record) => (
        <StatusApproval
          record={record}
          initialStatus={value}
          onUpdate={handleStatusChange}
        />
      ),
    },
    {
      title: "Ngày đăng",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 200,
      render: (value, record, index) => (
        <Text>{Utils.getDateDayjs(value, 13)}</Text>
      ),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
      width: 200,
      render: (value, record, index) => (
        <Text>{Utils.getDateDayjs(value)}</Text>
      ),
    },
  ];
  return (
    <div>
      <CustomTable
        columns={columns}
        dataSource={dataSource?.Data || []}
        loading={loading}
        totalRecord={dataSource?.Paging?.TotalRecord}
        outerHeight={150}
      />
    </div>
  );
}
