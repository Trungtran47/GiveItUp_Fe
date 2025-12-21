import IcDelete from "@/assets/icons/ic-delete";
import IcEdit from "@/assets/icons/ic-edit";
import ButtonCommon from "@/components/common/button/ButtonCommon";
import ConfigButton from "@/components/common/button/config-button/ConfigButton";
import TextLink from "@/components/common/text-common/text-link/TextLink";
import Text from "@/components/common/text-common/text/Text";
import CustomTable from "@/components/custom-table/CustomTable";
import ImagePreview from "@/components/custom-table/ImagePreview";
import Utils from "@/utils/Utils";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function PostTable({ dataSource, loading, onEdit, onDelete }) {
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
      width: 250,
      render: (value, record) => (
        <div className="line-clamp-2">
          <TextLink>{value}</TextLink>
        </div>
      ),
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
      title: "",
      width: 58,
      render: (record) => {
        let menuAction = [];
        menuAction.push({
          title: <span style={{ color: "#138300" }}>Sửa</span>,
          icon: <IcEdit />,
          onClick: () => onEdit(record),
        });
        menuAction.push({
          title: <span style={{ color: "#D90102" }}>Xóa</span>,
          icon: <IcDelete />,
          onClick: () => onDelete(record),
        });

        return <ConfigButton menuList={menuAction} />;
      },
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
