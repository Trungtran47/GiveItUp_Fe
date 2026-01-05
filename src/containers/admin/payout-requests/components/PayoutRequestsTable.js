import TextLink from "@/components/common/text-common/text-link/TextLink";
import Text from "@/components/common/text-common/text/Text";
import CustomTable from "@/components/custom-table/CustomTable";
import ImagePreview from "@/components/custom-table/ImagePreview";
import { formatNumber } from "@/utils/Utils";
import { Button } from "antd";
import { useSelector } from "react-redux";

export default function PayoutRequestsTable({
  loading,
  setOpen,
  setSelectedPost,
  handleApprove,
}) {
  const dataSource = useSelector((state) => state.payout.payoutRequestsData);
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 60,
      render: (_, __, index) => <Text>{index + 1}</Text>,
    },

    {
      title: "Hình ảnh",
      dataIndex: "post",
      key: "image",
      width: 100,
      render: (_, record) => {
        const thumbnail = record.post?.images?.find((img) => img.isThumbnail);
        return (
          <ImagePreview
            src={thumbnail?.imageUrl}
            alt="post"
            width={40}
            height={40}
          />
        );
      },
    },

    {
      title: "Tên dự án",
      dataIndex: ["post", "title"],
      key: "title",
      width: 300,
      render: (_, record) => (
        <div className="line-clamp-2">
          <TextLink
            onClick={() => {
              setSelectedPost(record.post.id);
              setOpen(true);
            }}
          >
            {record.post?.title}
          </TextLink>
        </div>
      ),
    },

    {
      title: "Số tiền yêu cầu rút",
      dataIndex: "amount",
      key: "amount",
      width: 170,
      render: (value) => (
        <Text className="font-semibold text-red-600">
          {value ? formatNumber(value) + " VND" : "-"}
        </Text>
      ),
    },
    {
      title: "Số tiền đã chuyển",
      dataIndex: "adminTransferAmount",
      key: "adminTransferAmount",
      width: 170,
      render: (value) => (
        <Text className="font-semibold text-red-600">
          {value ? formatNumber(value) + " VND" : "-"}
        </Text>
      ),
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      width: 120,
      render: (type) => {
        const map = {
          REQUEST: "Yêu cầu rút",
          TRANSFER: "Chuyển khoản",
        };
        return <Text>{map[type]}</Text>;
      },
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 170,
      render: (status, record) => {
        const colors = {
          10: "text-yellow-600",
          20: "text-blue-600",
          30: "text-green-600",
          40: "text-red-600",
        };
        return <span className={colors[status]}>{record.statusName}</span>;
      },
    },

    {
      title: "Người yêu cầu",
      dataIndex: "requestedBy",
      key: "requestedBy",
      width: 220,
      render: (value) => (
        <div>
          <Text className="font-semibold">{value?.organizationName}</Text>
        </div>
      ),
    },

    {
      title: "Ngày yêu cầu",
      dataIndex: "requestedAt",
      key: "requestedAt",
      width: 180,
      render: (val) => new Date(val).toLocaleString("vi-VN"),
    },

    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
      width: 250,
      render: (note) => <div className="line-clamp-2">{note}</div>,
    },

    {
      title: "Ghi chú admin",
      dataIndex: "noteAdmin",
      key: "noteAdmin",
      width: 200,
      render: (note) =>
        note ? <div className="line-clamp-2">{note}</div> : <Text>-</Text>,
    },

    {
      title: "Ảnh chuyển khoản",
      dataIndex: "transferProofImageUrl",
      key: "transferProofImageUrl",
      width: 160,
      render: (url) =>
        url ? (
          <ImagePreview src={url} width={50} height={50} />
        ) : (
          <Text>-</Text>
        ),
    },

    {
      title: "Hành động",
      key: "actions",
      width: 180,
      align: "center",
      fixed: "right",
      render: (_, record) => (
        <>
          {record?.status == 10 && (
            <div className="flex gap-2">
              <Button onClick={() => handleApprove(record, "APPROVE")}>
                Duyệt
              </Button>
              <Button danger onClick={() => handleApprove(record, "REJECT")}>
                Không duyệt
              </Button>
            </div>
          )}
          {record?.status == 20 && (
            <div className="flex gap-2">
              <Button onClick={() => handleApprove(record, "APPROVE")}>
                Sửa đổi xác nhận
              </Button>
            </div>
          )}
        </>
      ),
    },
  ];

  return (
    <CustomTable
      columns={columns}
      dataSource={dataSource?.Data || []}
      loading={loading}
      totalRecord={dataSource?.Paging?.TotalRecord}
      outerHeight={150}
    />
  );
}
