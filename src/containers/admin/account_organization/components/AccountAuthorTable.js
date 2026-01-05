import IcDelete from "@/assets/icons/ic-delete";
import IcEdit from "@/assets/icons/ic-edit";
import ConfigButton from "@/components/common/button/config-button/ConfigButton";
import TextLink from "@/components/common/text-common/text-link/TextLink";
import Text from "@/components/common/text-common/text/Text";
import CustomTable from "@/components/custom-table/CustomTable";
import ImagePreview from "@/components/custom-table/ImagePreview";
import Utils from "@/utils/Utils";
import { HandCoins } from "lucide-react";
import { useSelector } from "react-redux";

export default function AccountAuthorTable({ loading, handleViewDetail }) {
  const dataSource = useSelector((state) => state.user.allAuthor);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 60,
      align: "center",
      render: (value, record, index) => <Text>{index + 1}</Text>,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      width: 100,
      render: (value, record) => {
        return (
          <>
            {record?.organization?.organizationLogo ? (
              <ImagePreview
                src={
                  record.organization.organizationLogo || "/default-avatar.png"
                }
                alt="post"
                width={40}
                height={40}
              />
            ) : (
              <HandCoins className="w-6 h-6 text-gray-500" />
            )}
          </>
        );
      },
    },
    {
      title: "Tên người dùng",
      key: "username", // Không cần dataIndex nếu dùng render custom
      width: 180,
      render: (_, record) => (
        <TextLink onClick={() => handleViewDetail(record)}>
          {record?.firstName} {record?.lastName}
        </TextLink>
      ),
    },
    {
      title: "Tên tổ chức",
      // Truy cập vào: record.organization.organizationName
      key: "organizationName",
      width: 200,
      render: (_, record) => (
        <Text className="font-medium text-gray-700">
          {record?.organization?.organizationName || "---"}
        </Text>
      ),
    },
    {
      title: "Lĩnh vực",
      // Truy cập vào: record.organization.category.categoryName
      key: "category",
      width: 150,
      render: (_, record) => (
        <Text>{record?.organization?.category?.categoryName || "---"}</Text>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber", // SĐT cá nhân (như trong ảnh)
      key: "phoneNumber",
      width: 140,
      render: (value) => <Text>{value}</Text>,
    },
    {
      title: "Email",
      dataIndex: "email", // Email cá nhân (như trong ảnh)
      key: "email",
      width: 220,
      render: (value) => <Text>{value}</Text>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 140,
      render: (value) => {
        // Logic hiển thị trạng thái
        let text = "Không xác định";
        let colorClass = "text-gray-500";

        if (value === 20 || value === 30) {
          text = "Đang hoạt động";
          colorClass = "text-green-600 font-medium";
        } else if (value === 10) {
          text = "Chờ duyệt";
          colorClass = "text-orange-500 font-medium";
        } else {
          text = "Ngừng hoạt động";
          colorClass = "text-red-500 font-medium";
        }

        return <span className={colorClass}>{text}</span>;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 120,
      render: (value) => <Text>{Utils.getDateDayjs(value)}</Text>,
    },
    // {
    //   title: "",
    //   width: 50,
    //   fixed: "right", // Cố định cột hành động bên phải nếu bảng quá rộng
    //   render: (record) => {
    //     let menuAction = [];
    //     menuAction.push({
    //       title: <span style={{ color: "#138300" }}>Chi tiết / Sửa</span>,
    //       icon: <IcEdit />,
    //       // onClick: () => handleEdit(record),
    //     });
    //     menuAction.push({
    //       title: <span style={{ color: "#D90102" }}>Khóa tài khoản</span>,
    //       icon: <IcDelete />,
    //       // onClick: () => handleLock(record),
    //     });

    //     return <ConfigButton menuList={menuAction} />;
    //   },
    // },
  ];

  return (
    <CustomTable
      columns={columns}
      dataSource={dataSource?.Data || []}
      loading={loading}
      totalRecord={dataSource?.Paging?.TotalRecord}
      rowKey="id"
      scroll={{ x: 1200 }} // Thêm scroll ngang nếu màn hình nhỏ
    />
  );
}
