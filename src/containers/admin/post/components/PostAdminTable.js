import TextLink from "@/components/common/text-common/text-link/TextLink";
import Text from "@/components/common/text-common/text/Text";
import CustomTable from "@/components/custom-table/CustomTable";
import ImagePreview from "@/components/custom-table/ImagePreview";
import Utils, { formatNumber } from "@/utils/Utils";
import { useSelector } from "react-redux";

export default function PostAdminTable({ loading, setOpen, setSelectedPost }) {
  const dataSource = useSelector((state) => state.post.postData);
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 60,
      render: (value, record, index) => <Text>{index + 1}</Text>,
    },

    {
      title: "Image",
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
              setSelectedPost(record);
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
      title: "Trạng thái",
      dataIndex: "statusName",
      key: "statusName",
      width: 150,
      render: (value, record, index) => (
        <Text>{value ? value : "Chưa cập nhật"}</Text>
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
    // {
    //   title: "",
    //   width: 58,
    //   render: (record) => {
    //     let menuAction = [];
    //     menuAction.push({
    //       title: <span style={{ color: "#138300" }}>Sửa</span>,
    //       icon: <IcEdit />,
    //       //   onClick: () => onEdit(record),
    //     });
    //     menuAction.push({
    //       title: <span style={{ color: "#D90102" }}>Xóa</span>,
    //       icon: <IcDelete />,
    //       //   onClick: () => onDelete(record),
    //     });

    //     return <ConfigButton menuList={menuAction} />;
    //   },
    // },
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
