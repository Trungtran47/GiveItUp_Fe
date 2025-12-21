import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  StopOutlined,
  UndoOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Input,
  message,
  Modal,
  Space,
  Tag,
  Typography,
} from "antd";
import { useState } from "react";

const { Text } = Typography;

const POST_STATUS = {
  PENDING: 10,
  ACTIVE: 20,
  INACTIVE: 30,
  COMPLETE: 50,
  REJECTED: 90,
  BLOCKED: 91,
};

export default function StatusApproval({ record, onUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [targetStatusForModal, setTargetStatusForModal] = useState(null);

  const currentStatus = record?.status;
  const currentStatusLabel = record?.statusName;

  // --- LOGIC MÀU SẮC ---
  const getStatusColor = (status) => {
    switch (status) {
      case POST_STATUS.ACTIVE:
        return "success";
      case POST_STATUS.PENDING:
        return "processing";
      case POST_STATUS.REJECTED:
        return "error";
      case POST_STATUS.BLOCKED:
        return "magenta";
      case POST_STATUS.INACTIVE:
        return "warning";
      case POST_STATUS.COMPLETE:
        return "cyan";
      default:
        return "default";
    }
  };

  // --- MENU ITEMS ---
  const getMenuItems = () => {
    const items = [];
    if (currentStatus === POST_STATUS.PENDING) {
      items.push({
        key: POST_STATUS.ACTIVE,
        label: "Duyệt bài này",
        icon: <CheckCircleOutlined style={{ color: "green" }} />,
      });
      items.push({
        key: POST_STATUS.REJECTED,
        label: "Từ chối duyệt",
        icon: <CloseCircleOutlined style={{ color: "red" }} />,
        danger: true,
      });
    } else if (currentStatus === POST_STATUS.ACTIVE) {
      items.push({
        key: POST_STATUS.BLOCKED,
        label: "Chặn bài viết",
        icon: <StopOutlined style={{ color: "red" }} />,
        danger: true,
      });
    } else if (
      currentStatus === POST_STATUS.REJECTED ||
      currentStatus === POST_STATUS.BLOCKED
    ) {
      items.push({
        key: POST_STATUS.ACTIVE,
        label: "Khôi phục / Duyệt lại",
        icon: <UndoOutlined style={{ color: "blue" }} />,
      });
    }
    return items;
  };

  // --- HANDLERS ---
  const handleMenuClick = (e) => {
    const newStatus = parseInt(e.key);
    if (
      newStatus === POST_STATUS.REJECTED ||
      newStatus === POST_STATUS.BLOCKED
    ) {
      setTargetStatusForModal(newStatus);
      setRejectReason("");
      setIsModalOpen(true);
    } else {
      onUpdate(record.id, newStatus, null);
    }
  };

  const handleConfirmAction = () => {
    if (!rejectReason.trim()) {
      message.error("Vui lòng nhập lý do!");
      return;
    }
    onUpdate(record.id, targetStatusForModal, rejectReason);
    setIsModalOpen(false);
  };

  const menuItems = getMenuItems();
  if (menuItems.length === 0)
    return (
      <Tag color={getStatusColor(currentStatus)}>{currentStatusLabel}</Tag>
    );

  return (
    <>
      <Dropdown
        menu={{ items: menuItems, onClick: handleMenuClick }}
        trigger={["click"]}
      >
        <Button type="text" style={{ padding: 0, height: "auto" }}>
          <Space>
            <Tag color={getStatusColor(currentStatus)}>
              {currentStatusLabel || "Chưa cập nhật"}
            </Tag>
            <EditOutlined style={{ fontSize: 12, color: "#888" }} />
          </Space>
        </Button>
      </Dropdown>

      {/* --- MODAL ĐÃ FIX HẾT LỖI --- */}
      <Modal
        title={
          <span
            style={{
              fontSize: "16px",
              fontWeight: 600,
              margin: 14,
            }}
          >
            {targetStatusForModal === POST_STATUS.REJECTED
              ? "Xác nhận từ chối"
              : "Xác nhận chặn bài viết"}{" "}
            {/* {record?.title} */}
          </span>
        }
        open={isModalOpen}
        onOk={handleConfirmAction}
        onCancel={() => setIsModalOpen(false)}
        okText="Xác nhận"
        cancelText="Hủy"
        // 1. CSS cho nút OK (Xác nhận)
        okButtonProps={{
          danger: true, // Nếu muốn màu đỏ mặc định của Antd
          size: "middle",
          style: {
            backgroundColor: "#017C18", // Tự chỉnh màu nền
            borderColor: "#017C18",
            color: "white",
            fontWeight: "bold",
            margin: "0 10px 10px 10px",
          },
        }}
        // 2. CSS cho nút Cancel (Hủy)
        cancelButtonProps={{
          size: "middle",
          style: {
            color: "#666", // Màu chữ xám
            borderColor: "#d9d9d9", // Viền xám
            borderRadius: "6px", // Bo góc
            marginBottom: "10px",
          },
        }}
        destroyOnHidden={true}
        centered
        width={500}
        styles={{ body: { margin: "0px 14px 0px 14px" } }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* Block Tiêu đề */}
          {/* <div>
            <Text
              type="secondary"
              style={{
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Tiêu đề bài viết
            </Text>
            <div
              style={{
                marginTop: "8px",
                padding: "12px 16px",
                background: "#F9FAFB",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                color: "#374151",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "1.5",
              }}
            >
              {record?.title}
            </div>
          </div> */}

          {/* Block Lý do */}
          <div>
            <div
              style={{
                // marginBottom: "8px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Text
                type="secondary"
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Lý do{" "}
                {targetStatusForModal === POST_STATUS.REJECTED
                  ? "từ chối"
                  : "chặn"}{" "}
                <span style={{ color: "#ef4444" }}>*</span>
              </Text>
            </div>
            <Input.TextArea
              rows={4}
              placeholder={
                targetStatusForModal === POST_STATUS.REJECTED
                  ? "Ví dụ: Hình ảnh mờ, nội dung không phù hợp..."
                  : "Ví dụ: Vi phạm chính sách cộng đồng..."
              }
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              style={{
                borderRadius: "8px",
                padding: "10px",
                borderColor: "#d9d9d9",
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
