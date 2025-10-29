import IcDelete from "@/assets/icons/ic-delete";
import IcEdit from "@/assets/icons/ic-edit";
import ConfigButton from "@/components/common/button/config-button/ConfigButton";
import TextLink from "@/components/common/text-common/text-link/TextLink";
import Text from "@/components/common/text-common/text/Text";
import CustomTable from "@/components/custom-table/CustomTable";
import { useSelector } from "react-redux";

export default function AccountTable({ loading }) {
  const dataSource = useSelector((state) => state.user.allUser);
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 60,
      render: (value, record, index) => <Text>{index + 1}</Text>,
    },
    {
      title: "Tên nguời dùng",
      dataIndex: "username",
      key: "username",
      width: 160,
      render: (value, record) => (
        <TextLink>
          {record?.firstName || ""} {record?.lastName || ""}
        </TextLink>
      ),
    },
    {
      title: "Tên tổ chức",
      dataIndex: "stt",
      key: "stt",
      width: 160,
      render: (value, record, index) => <Text>{value}</Text>,
    },
    {
      title: "Lĩnh vực",
      dataIndex: "stt",
      key: "stt",
      width: 100,
      render: (value, record, index) => <Text>{value}</Text>,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 150,
      render: (value, record, index) => <Text>{value}</Text>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
      render: (value, record, index) => <Text>{value}</Text>,
    },
    {
      title: "Trạng thái",
      dataIndex: "stt",
      key: "stt",
      width: 100,
      render: (value, record, index) => <Text>{value}</Text>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "stt",
      key: "stt",
      width: 100,
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
          // onClick: () => handleAddAccountItem(record),
        });
        menuAction.push({
          title: <span style={{ color: "#D90102" }}>Xóa</span>,
          icon: <IcDelete />,
          // onClick: () => handleDelete(record),
        });

        return <ConfigButton menuList={menuAction} />;
      },
    },
  ];
  return (
    <>
      <CustomTable
        columns={columns}
        dataSource={dataSource?.Data || []}
        loading={loading}
        totalRecord={dataSource?.Paging?.TotalRecord}
      />
    </>
  );
}
