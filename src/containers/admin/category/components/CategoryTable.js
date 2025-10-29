import IcDelete from "@/assets/icons/ic-delete";
import IcEdit from "@/assets/icons/ic-edit";
import ButtonCommon from "@/components/common/button/ButtonCommon";
import ConfigButton from "@/components/common/button/config-button/ConfigButton";
import TextLink from "@/components/common/text-common/text-link/TextLink";
import Text from "@/components/common/text-common/text/Text";
import CustomTable from "@/components/custom-table/CustomTable";
import { useSelector } from "react-redux";

export default function CategoryTable({ loading, onCreate, onEdit, onDelete }) {
  const dataSource = useSelector((state) => state.category.allCategory);
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 60,
      render: (value, record, index) => <Text>{index + 1}</Text>,
    },
    {
      title: "Tên lĩnh vực",
      dataIndex: "categoryName",
      key: "categoryName",
      width: 160,
      render: (value, record) => <TextLink>{value}</TextLink>,
    },
    {
      title: "Mô tả ngắn",
      dataIndex: "description",
      key: "description",
      width: 160,
      render: (value, record, index) => <Text>{value}</Text>,
    },
    {
      title: "Số dự án",
      dataIndex: "projectCount",
      key: "projectCount",
      width: 100,
      render: (value, record, index) => <Text>{value}</Text>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (value, record, index) => <Text>{value}</Text>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 200,
      render: (value, record, index) => <Text>{value}</Text>,
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
      <ButtonCommon
        onClick={() => onCreate(null)}
        title="Thêm mới"
        style={{ marginBottom: 4, height: "32px" }}
      />
      <CustomTable
        columns={columns}
        dataSource={dataSource?.Data || []}
        loading={loading}
        totalRecord={dataSource?.Paging?.TotalRecord}
      />
    </div>
  );
}
