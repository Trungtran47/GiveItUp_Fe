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

export default function AccountTable({ loading, handleViewDetail }) {
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
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      width: 100,
      render: (value, record) => {
        return (
          <>
            {record.imageUser ? (
              <ImagePreview
                src={record.imageUser || "/default-avatar.png"}
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
      dataIndex: "username",
      key: "username",
      width: 160,
      render: (value, record) => (
        <TextLink onClick={() => handleViewDetail(record)}>
          {record?.firstName || ""} {record?.lastName || ""}
        </TextLink>
      ),
    },
    {
      title: "Tên tổ chức",
      dataIndex: "organization",
      key: "organization",
      width: 260,
      render: (value, record, index) => (
        <p className="line-clamp-2 text-[14px] text-gray-700 font-semibold">
          {value?.organizationName}
        </p>
      ),
    },
    {
      title: "Lĩnh vực",
      dataIndex: "category",
      key: "category",
      width: 100,
      render: (value, record, index) => <Text>{value?.categoryName}</Text>,
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
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (value, record) => {
        // TRƯỜNG HỢP 1: Chờ xác nhận (10) -> Hiện Link để duyệt
        if (value === 10) {
          return (
            <div className="flex flex-col items-start gap-1">
              {/* <span className="text-orange-500 font-bold text-xs bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
                Chờ xác nhận
              </span> */}
              <TextLink
                onClick={() => handleViewDetail(record)}
                style={{
                  color: "#D97706",
                  fontWeight: "600",
                }}
              >
                Chờ xác nhận
              </TextLink>
            </div>
          );
        }

        // TRƯỜNG HỢP 2: Các trạng thái còn lại -> Hiện Text màu bình thường
        let text = "";
        let colorClass = "";

        switch (value) {
          case 20: // USER
            text = "Người dùng";
            colorClass = "text-green-600";
            break;
          case 30: // AUTHOR
            text = "Author";
            colorClass = "text-blue-600 font-bold";
            break;
          case 40: // REJECTED
            text = "Từ chối";
            colorClass = "text-orange-600";
            break;
          case 90: // INACTIVE
            text = "Ngừng hoạt động";
            colorClass = "text-red-600";
            break;
          default:
            text = "Không xác định";
            colorClass = "text-gray-400";
        }

        return <span className={`font-medium ${colorClass}`}>{text}</span>;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
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
    //       // onClick: () => handleAddAccountItem(record),
    //     });
    //     menuAction.push({
    //       title: <span style={{ color: "#D90102" }}>Xóa</span>,
    //       icon: <IcDelete />,
    //       // onClick: () => handleDelete(record),
    //     });

    //     return <ConfigButton menuList={menuAction} />;
    //   },
    // },
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
