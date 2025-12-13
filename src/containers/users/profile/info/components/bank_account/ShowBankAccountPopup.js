import IcDelete from "@/assets/icons/ic-delete";
import IcEdit from "@/assets/icons/ic-edit";
import IcPlus from "@/assets/icons/ic-plus";
import ButtonCommon from "@/components/common/button/ButtonCommon";
import ConfigButton from "@/components/common/button/config-button/ConfigButton";
import Text from "@/components/common/text-common/text/Text";
import CustomTable from "@/components/custom-table/CustomTable";
import bankAccountFactory from "@/redux/bank_account/factory";
import EventRegister, {
  EVENT_SHOW_POPUP,
  EVENT_SHOW_POPUP2,
  POPUP_CONFIRM,
  POPUP_CREATE_BANK_ACCOUNT,
} from "@/utils/EventRegister";
import getMegNo from "@/utils/Message";
import Utils from "@/utils/Utils";
import { get } from "http";
import { useEffect, useState } from "react";

export default function ShowBankAccountPopup({ payload, showVisible }) {
  const { title, userId } = payload;
  const [bankAccount, setBankAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 60,
      render: (value, record, index) => <Text>{index + 1}</Text>,
    },
    {
      title: "Tên chủ tài khoản",
      dataIndex: "accountHolderName",
      key: "accountHolderName",
      width: 120,
      render: (value, record) => <Text>{value}</Text>,
    },
    {
      title: "Tên ngân hàng",
      dataIndex: "bankName",
      key: "bankName",
      width: 100,
      render: (value, record) => <Text>{value}</Text>,
    },
    {
      title: "Số tài khoản",
      dataIndex: "bankAccountNumber",
      key: "bankAccountNumber",
      width: 100,
      render: (value, record) => <Text>{value}</Text>,
    },
    {
      title: "Tạo ngày",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 100,
      render: (value, record) => <Text>{Utils.getDateDayjs(value)}</Text>,
    },
    {
      title: "Sửa ngày",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: 100,
      render: (value, record) => <Text>{Utils.getDateDayjs(value)}</Text>,
    },
    {
      title: "",
      width: 58,
      render: (record) => {
        let menuAction = [];
        menuAction.push({
          title: <span style={{ color: "#138300" }}>Sửa</span>,
          icon: <IcEdit />,
          onClick: () => handleCreate(record),
        });
        menuAction.push({
          title: <span style={{ color: "#D90102" }}>Xóa</span>,
          icon: <IcDelete />,
          onClick: () => handleDelete(record),
        });

        return <ConfigButton menuList={menuAction} />;
      },
    },
  ];
  const handleCreate = (data) => {
    EventRegister.emit(EVENT_SHOW_POPUP2, {
      type: POPUP_CREATE_BANK_ACCOUNT,
      open: true,
      payload: {
        title: data ? "Cập nhật tài khoản" : "Thêm mới tài khoản",
        data: data || null,
        getData: getBankAccount,
      },
    });
  };
  const handleDelete = (data) => {
    EventRegister.emit(EVENT_SHOW_POPUP2, {
      type: POPUP_CONFIRM,
      payload: {
        title: "Xác nhận",
        data: {
          message: `Bạn có chắc chắn muốn xoá tài khoản ${data.bankAccountNumber}  không?`,
        },
        callback: async (_props) => {
          try {
            const response = await bankAccountFactory.deleteBankAccount(
              data.id
            );
            // console.log("response", response?.code);
            if (response?.code == 200) {
              getMegNo("Xoá tài khoản thành công", "success");
              getBankAccount();
            } else {
              getMegNo("Xoá tài khoản thất bại", "error");
            }
          } catch (error) {
            getMegNo("Đã xảy ra lỗi khi xoá tài khoản", "error");
          }
        },
      },
    });
  };
  const getBankAccount = async () => {
    setLoading(true);
    const res = await bankAccountFactory.getBankAccountsByUserId(userId);
    if (res?.code == 200) {
      setBankAccount(res?.result);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userId) {
      getBankAccount();
    }
  }, [userId]);
  return (
    <div className="p-2 bg-[#f0f1f3] max-w-[900px]">
      <div className="bg-[#ffffff] rounded-lg p-2">
        <div className="flex justify-between">
          <div />
          <ButtonCommon
            title="Thêm mới"
            startIcon={<IcPlus />}
            onClick={() => handleCreate()}
          />
        </div>
        <CustomTable
          columns={columns}
          dataSource={bankAccount || []}
          loading={loading}
        />
      </div>
    </div>
  );
}
