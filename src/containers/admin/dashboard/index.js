"use client";
import dashboardFactory from "@/redux/dashboard/factory";
import {
  ArrowUpOutlined,
  BankOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  FileImageOutlined,
  FileTextOutlined,
  GiftOutlined,
  HeartOutlined,
  MessageOutlined,
  ProjectOutlined,
  SyncOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  List,
  Progress,
  Radio,
  Row,
  Statistic,
  Table,
  Tag,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { use, useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const { Title, Text } = Typography;

// // --- DỮ LIỆU GIẢ LẬP MỚI (GLOBAL - Không theo ngày tháng) ---
// const globalStats = {
//   totalPosts: 350,
//   activePosts: 45,
//   closedPosts: 280,
//   expiredPosts: 25,
//   totalUsers: 15420,
//   totalAuthors: 120,
// };

// // --- DỮ LIỆU CŨ (Đã cập nhật thêm số lượt donation) ---
// const overviewStats = {
//   totalDonation: 2540000000,
//   totalDonationCount: 3450, // <--- 2. Thêm số liệu lượt quyên góp
//   totalPayout: 850000000,
//   totalViews: 45000,
//   totalLikes: 1200,
//   donationGrowth: 12.5,
//   donationCountGrowth: 8.2, // <--- Tăng trưởng số lượt
//   viewGrowth: 5.2,
// };

// const dataFinance = [
//   { name: "T1", donate: 50000000, payout: 20000000 },
//   { name: "T2", donate: 80000000, payout: 30000000 },
//   { name: "T3", donate: 120000000, payout: 80000000 },
//   { name: "T4", donate: 90000000, payout: 40000000 },
//   { name: "T5", donate: 150000000, payout: 60000000 },
//   { name: "T6", donate: 200000000, payout: 100000000 },
//   { name: "T7", donate: 250000000, payout: 120000000 },
// ];

// const dataCategories = [
//   { name: "Trẻ em", value: 45 },
//   { name: "Y tế", value: 25 },
//   { name: "Thiên tai", value: 20 },
//   { name: "Giáo dục", value: 10 },
// ];
const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

// const pendingPayouts = [
//   {
//     id: 1,
//     orgName: "Quỹ Trò Nghèo",
//     amount: 50000000,
//     postTitle: "Xây trường cho em",
//     requestDate: "2023-12-14",
//     status: "PENDING",
//     type: "REQUEST",
//   },
//   {
//     id: 2,
//     orgName: "Nhóm Thiện Tâm",
//     amount: 12000000,
//     postTitle: "Cơm có thịt",
//     requestDate: "2023-12-15",
//     status: "PENDING",
//     type: "REQUEST",
//   },
//   {
//     id: 3,
//     orgName: "Bệnh viện K",
//     amount: 100000000,
//     postTitle: "Hỗ trợ bệnh nhi ung thư",
//     requestDate: "2023-12-16",
//     status: "ADMIN_APPROVED",
//     type: "ADMIN_AUTO",
//   },
// ];

// const recentActivities = [
//   {
//     type: "update",
//     user: "Quỹ Trò Nghèo",
//     content: "Đã cập nhật hình ảnh bàn giao nhà tình thương.",
//     time: "2 giờ trước",
//     icon: <FileImageOutlined className="text-blue-500" />,
//   },
//   {
//     type: "comment",
//     user: "Nguyễn Văn A",
//     content: "Đã bình luận: 'Cố lên các cháu!' vào bài viết Mổ tim.",
//     time: "4 giờ trước",
//     icon: <MessageOutlined className="text-green-500" />,
//   },
//   {
//     type: "follow",
//     user: "Trần Thị B",
//     content: "Đã theo dõi tổ chức 'Cơm Có Thịt'.",
//     time: "5 giờ trước",
//     icon: <HeartOutlined className="text-red-500" />,
//   },
// ];

// const topPosts = [
//   {
//     key: "1",
//     title: "Mổ tim cho bé Lan",
//     target: 50000000,
//     current: 45000000,
//     status: "ACTIVE",
//     views: 12000,
//     likes: 500,
//   },
//   {
//     key: "2",
//     title: "Cứu trợ bão lũ Miền Trung",
//     target: 200000000,
//     current: 25000000,
//     status: "ACTIVE",
//     views: 8500,
//     likes: 320,
//   },
//   {
//     key: "3",
//     title: "Học bổng Vừ A Dính",
//     target: 100000000,
//     current: 100000000,
//     status: "CLOSED",
//     views: 20000,
//     likes: 1500,
//   },
// ];

export default function DashboardContent() {
  // Mặc định ban đầu là tháng hiện tại
  const [filterType, setFilterType] = useState("month"); // Đổi mặc định thành 'month' cho khớp logic
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [fromDate, setFromDate] = useState(
    dayjs().startOf("month").format("YYYY-MM-DD")
  );
  const [toDate, setToDate] = useState(
    dayjs().endOf("month").format("YYYY-MM-DD")
  );
  const [dataDashboard, setDataDashboard] = useState(null);

  // Hàm tính toán ngày bắt đầu/kết thúc dựa trên loại lọc và ngày chọn
  const updateDateRange = (date, type) => {
    let start, end;
    if (type === "date") {
      start = date.startOf("day");
      end = date.endOf("day");
    } else if (type === "month") {
      start = date.startOf("month");
      end = date.endOf("month");
    } else if (type === "year") {
      start = date.startOf("year");
      end = date.endOf("year");
    }
    setFromDate(start.format("YYYY-MM-DD"));
    setToDate(end.format("YYYY-MM-DD"));
  };

  const handleFilterChange = (e) => {
    const type = e.target.value;
    setFilterType(type);
    updateDateRange(selectedDate, type);
  };

  const handleDateChange = (date) => {
    if (!date) return;
    setSelectedDate(date);
    updateDateRange(date, filterType);
  };

  // --- SỬA LỖI 1: Hàm refresh quay về tháng hiện tại ---
  const handleRefresh = () => {
    const now = dayjs();
    setSelectedDate(now);
    setFilterType("month"); // Reset bộ lọc về chế độ Tháng
    // Cập nhật ngày bắt đầu/kết thúc về tháng hiện tại
    setFromDate(now.startOf("month").format("YYYY-MM-DD"));
    setToDate(now.endOf("month").format("YYYY-MM-DD"));

    // Lưu ý: Không cần gọi getData() ở đây, vì useEffect sẽ tự chạy khi fromDate/toDate thay đổi
  };

  const currencyFormatter = (value) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);

  // --- SỬA LỖI 2: Xoá logic isRefresh, chỉ fetch theo state ---
  const getData = async () => {
    try {
      const res = await dashboardFactory.dashboardAdmin(fromDate, toDate);
      if (res?.code == 200) {
        setDataDashboard(res.result);
      } else {
        console.log("Error fetching data or invalid response format");
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  // --- SỬA LỖI 3: Dùng useEffect thay vì useState cho side effect ---
  useEffect(() => {
    getData();
  }, [fromDate, toDate]); // Chạy lại khi fromDate hoặc toDate thay đổi

  const {
    globalStats,
    overviewStats,
    dataFinance,
    dataCategories,
    pendingPayouts,
    recentActivities,
    topPosts,
  } = dataDashboard || {};

  if (!dataDashboard) {
    return (
      <div className="flex justify-center items-center h-screen">
        <SyncOutlined spin className="text-2xl text-blue-600" />
      </div>
    );
  }
  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* --- HEADER CONTROLS --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 m-0">
            Tổng Quan Hệ Thống
          </h2>
          <p className="text-gray-500 mt-1">Báo cáo số liệu thời gian thực.</p>
        </div>

        {/* ... (Header content) ... */}
        <div className="bg-white p-2 rounded-lg shadow-sm flex items-center gap-3">
          <Radio.Group
            value={filterType}
            onChange={handleFilterChange}
            buttonStyle="solid"
            size="middle"
          >
            <Radio.Button value="date">Ngày</Radio.Button>
            <Radio.Button value="month">Tháng</Radio.Button>
            <Radio.Button value="year">Năm</Radio.Button>
          </Radio.Group>
          <DatePicker
            picker={filterType === "date" ? "date" : filterType}
            value={selectedDate}
            onChange={handleDateChange} // Sử dụng handleDateChange mới
            allowClear={false}
            className="w-36"
          />
          <Button
            type="primary"
            icon={<SyncOutlined />}
            onClick={handleRefresh} // Gọi lại getData khi click
          >
            Làm mới
          </Button>
        </div>
      </div>

      {/* --- SECTION 0: GLOBAL STATS --- */}
      <Row gutter={[24, 24]} className="mb-6">
        <Col xs={24} lg={8}>
          <Card
            bordered={false}
            className="rounded-xl shadow-sm h-full flex flex-col justify-center"
          >
            <div className="flex items-center justify-between mb-4">
              <Statistic
                title={
                  <span className="font-semibold text-gray-600">
                    Tổng Người Dùng
                  </span>
                }
                value={globalStats.totalUsers}
                prefix={<UsergroupAddOutlined className="text-blue-500 mr-2" />}
                formatter={(val) => val.toLocaleString()}
              />
              <Divider type="vertical" className="h-12 bg-gray-200" />
              <Statistic
                title={
                  <span className="font-semibold text-gray-600">
                    Tổng Tổ Chức
                  </span>
                }
                value={globalStats.totalAuthors}
                prefix={<TeamOutlined className="text-purple-500 mr-2" />}
                formatter={(val) => val.toLocaleString()}
              />
            </div>
            <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded text-xs text-center font-medium">
              Dữ liệu toàn hệ thống (Không lọc theo ngày)
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          <Card bordered={false} className="rounded-xl shadow-sm h-full">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="min-w-[150px] text-center md:text-left">
                <Statistic
                  title={
                    <span className="font-semibold text-gray-600">
                      Tổng Chiến Dịch
                    </span>
                  }
                  value={globalStats.totalPosts}
                  prefix={<FileTextOutlined className="text-orange-500" />}
                  valueStyle={{ fontSize: "2rem", fontWeight: "bold" }}
                />
              </div>
              <div className="flex-1 w-full grid grid-cols-3 gap-4 border-l border-gray-100 pl-0 md:pl-6">
                <div className="flex flex-col items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-500 text-xs mb-1">
                    Đang hoạt động
                  </span>
                  <div className="flex items-center gap-2 text-green-600 font-bold text-lg">
                    <CheckCircleOutlined /> {globalStats.activePosts}
                  </div>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-100 rounded-lg">
                  <span className="text-gray-500 text-xs mb-1">
                    Đã hoàn thành
                  </span>
                  <div className="flex items-center gap-2 text-gray-600 font-bold text-lg">
                    <CheckCircleOutlined /> {globalStats.closedPosts}
                  </div>
                </div>
                <div className="flex flex-col items-center p-3 bg-red-50 rounded-lg">
                  <span className="text-gray-500 text-xs mb-1">Đã hết hạn</span>
                  <div className="flex items-center gap-2 text-red-500 font-bold text-lg">
                    <ClockCircleOutlined /> {globalStats.expiredPosts}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* --- SECTION 1: PERFORMANCE METRICS (FILTERABLE) --- */}
      <h3 className="text-lg font-bold text-gray-700 mb-4">
        Hiệu Suất & Tài Chính (Theo bộ lọc)
      </h3>
      <Row gutter={[24, 24]} className="mb-8">
        {/* 1. Tổng tiền Donate */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            className="rounded-xl shadow-sm hover:shadow-md transition-all h-full"
          >
            <Statistic
              title={
                <span className="text-gray-500 font-medium">
                  Tổng Tiền Quyên Góp
                </span>
              }
              value={overviewStats.totalDonation}
              precision={0}
              valueStyle={{
                color: "#10b981",
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
              prefix={<DollarCircleOutlined />}
              formatter={(val) => currencyFormatter(val).replace("₫", "")}
              suffix="₫"
            />
            <div className="mt-2 flex items-center text-green-600 text-sm">
              <ArrowUpOutlined className="mr-1" />
              <span>{overviewStats.donationGrowth}% so với kỳ trước</span>
            </div>
          </Card>
        </Col>

        {/* 2. Số Lượt Donate (MỚI) */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            className="rounded-xl shadow-sm hover:shadow-md transition-all h-full"
          >
            <Statistic
              title={
                <span className="text-gray-500 font-medium">
                  Số Lượt Quyên Góp
                </span>
              }
              value={overviewStats.totalDonationCount}
              precision={0}
              valueStyle={{
                color: "#10b981", // Dùng cùng màu xanh lá với tiền donate
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
              prefix={<GiftOutlined />}
              suffix="lượt"
            />
            <div className="mt-2 flex items-center text-green-600 text-sm">
              <ArrowUpOutlined className="mr-1" />
              <span>
                {overviewStats.donationCountGrowth}% lượng người ủng hộ
              </span>
            </div>
          </Card>
        </Col>

        {/* 3. Đã Giải Ngân */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            className="rounded-xl shadow-sm hover:shadow-md transition-all h-full"
          >
            <Statistic
              title={
                <span className="text-gray-500 font-medium">
                  Đã Giải Ngân (Payout)
                </span>
              }
              value={overviewStats.totalPayout}
              precision={0}
              valueStyle={{
                color: "#3b82f6",
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
              prefix={<BankOutlined />}
              formatter={(val) => currencyFormatter(val).replace("₫", "")}
              suffix="₫"
            />
            <div className="mt-2 text-gray-400 text-sm">
              <span>Thực hiện qua BankAccount</span>
            </div>
          </Card>
        </Col>

        {/* 4. Tương tác */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            className="rounded-xl shadow-sm hover:shadow-md transition-all h-full"
          >
            <div className="flex justify-between">
              <Statistic
                title={
                  <span className="text-gray-500 font-medium">
                    Lượt Xem (Views)
                  </span>
                }
                value={overviewStats.totalViews}
                valueStyle={{ fontWeight: "bold", fontSize: "1.5rem" }}
                prefix={<EyeOutlined className="text-blue-400" />}
              />
              <Statistic
                title={
                  <span className="text-gray-500 font-medium">
                    Lượt Thích (Likes)
                  </span>
                }
                value={overviewStats.totalLikes}
                valueStyle={{ fontWeight: "bold", fontSize: "1.5rem" }}
                prefix={<HeartOutlined className="text-red-400" />}
              />
            </div>
            <div className="mt-2 flex items-center text-blue-600 text-sm">
              <ArrowUpOutlined className="mr-1" />
              <span>{overviewStats.viewGrowth}% tương tác mới</span>
            </div>
          </Card>
        </Col>

        {/* 5. Cần Xử Lý Gấp (Sẽ xuống dòng ở màn hình lớn do lưới 4 cột) */}
        <Col xs={24} sm={12} lg={24}>
          <Card
            bordered={false}
            className="rounded-xl shadow-sm hover:shadow-md transition-all h-full bg-gradient-to-r from-orange-50 to-red-50"
          >
            <div className="flex flex-row items-center justify-between h-full px-4">
              <div className="flex items-center gap-3">
                <ExclamationCircleOutlined className="text-red-500 text-2xl animate-pulse" />
                <div>
                  <div className="text-gray-600 font-semibold text-lg">
                    Yêu Cầu Giải Ngân Chờ Duyệt
                  </div>
                  <span className="text-gray-500 text-sm">
                    Cần xử lý ngay để đảm bảo tiến độ
                  </span>
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-800">
                {pendingPayouts.filter((p) => p.status === "PENDING").length}
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* --- SECTION 2: CHARTS (FINANCE & CATEGORY) --- */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} lg={16}>
          <Card
            title={
              <span className="font-bold text-lg">Phân Tích Dòng Tiền</span>
            }
            bordered={false}
            className="rounded-xl shadow-sm h-full"
            extra={<Tag color="blue">Đơn vị: VNĐ</Tag>}
          >
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={dataFinance}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorDonate"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorPayout"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(val) => `${val / 1000000}M`}
                  />
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f0f0f0"
                  />
                  <Tooltip formatter={(value) => currencyFormatter(value)} />
                  <Legend verticalAlign="top" height={36} />
                  <Area
                    type="monotone"
                    dataKey="donate"
                    name="Tiền Vào (Donate)"
                    stroke="#10b981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorDonate)"
                  />
                  <Area
                    type="monotone"
                    dataKey="payout"
                    name="Tiền Ra (Payout)"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorPayout)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title={<span className="font-bold text-lg">Tỷ Trọng Danh Mục</span>}
            bordered={false}
            className="rounded-xl shadow-sm h-full"
          >
            <div className="h-[350px] relative w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dataCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {dataCategories.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    formatter={(value, entry) => (
                      <span className="text-gray-600 ml-2">
                        {value} ({entry.payload.value}%)
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <div className="text-3xl font-bold text-gray-800">100%</div>
                <div className="text-sm text-gray-500 mt-1">Category</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* --- SECTION 3: MANAGEMENT (PAYOUTS & ACTIVITY) --- */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={15}>
          <Card
            title={
              <div className="flex items-center gap-2">
                <BankOutlined className="text-blue-600" />{" "}
                <span>Yêu Cầu Giải Ngân Mới Nhất</span>
              </div>
            }
            bordered={false}
            className="rounded-xl shadow-sm h-full"
            extra={<Button type="link">Xem tất cả</Button>}
          >
            <Table
              dataSource={pendingPayouts}
              rowKey="id"
              pagination={false}
              columns={[
                {
                  title: "Tổ Chức",
                  dataIndex: "orgName",
                  key: "orgName",
                  render: (text) => (
                    <span className="font-semibold text-gray-700">{text}</span>
                  ),
                },
                {
                  title: "Số Tiền",
                  dataIndex: "amount",
                  key: "amount",
                  render: (val) => (
                    <span className="font-bold text-blue-600">
                      {currencyFormatter(val)}
                    </span>
                  ),
                },
                {
                  title: "Loại",
                  dataIndex: "type",
                  key: "type",
                  render: (type) =>
                    type === "REQUEST" ? (
                      <Tag color="purple">Yêu cầu</Tag>
                    ) : (
                      <Tag color="cyan">Tự động</Tag>
                    ),
                },
                {
                  title: "Trạng Thái",
                  dataIndex: "status",
                  key: "status",
                  render: (status) => {
                    const color =
                      status === "PENDING"
                        ? "gold"
                        : status === "ADMIN_APPROVED"
                        ? "blue"
                        : "green";
                    return <Tag color={color}>{status}</Tag>;
                  },
                },
                {
                  title: "Hành Động",
                  key: "action",
                  render: (_, record) =>
                    record.status === "PENDING" ? (
                      <div className="flex gap-2">
                        <Button
                          size="small"
                          type="primary"
                          className="bg-green-500 hover:bg-green-600 border-none"
                        >
                          Duyệt
                        </Button>
                        <Button size="small" danger>
                          Từ chối
                        </Button>
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">Đã xử lý</span>
                    ),
                },
              ]}
            />
          </Card>
        </Col>

        <Col xs={24} lg={9}>
          <Card
            title={
              <div className="flex items-center gap-2">
                <SyncOutlined spin className="text-gray-400" />{" "}
                <span>Hoạt Động Gần Đây</span>
              </div>
            }
            bordered={false}
            className="rounded-xl shadow-sm h-full"
          >
            <List
              itemLayout="horizontal"
              dataSource={recentActivities}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <div className="bg-gray-100 p-2 rounded-full">
                        {item.icon}
                      </div>
                    }
                    title={
                      <span className="font-medium text-sm">{item.user}</span>
                    }
                    description={
                      <div>
                        <div className="text-xs text-gray-600 line-clamp-2">
                          {item.content}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {item.time}
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* --- SECTION 4: POST PERFORMANCE (PostEntity) --- */}
      <Row gutter={[24, 24]} className="mt-8">
        <Col span={24}>
          <Card
            title={
              <div className="flex items-center gap-2">
                <ProjectOutlined className="text-orange-500" />{" "}
                <span>Top Chiến Dịch Hiệu Quả</span>
              </div>
            }
            bordered={false}
            className="rounded-xl shadow-sm"
          >
            <Table
              dataSource={topPosts}
              pagination={false}
              columns={[
                {
                  title: "Tên Chiến Dịch",
                  dataIndex: "title",
                  key: "title",
                  render: (text) => (
                    <a className="text-blue-600 font-medium hover:underline">
                      {text}
                    </a>
                  ),
                },
                {
                  title: "Tiến Độ Gây Quỹ",
                  key: "progress",
                  width: 300,
                  render: (_, record) => {
                    const percent = Math.round(
                      (record.current / record.target) * 100
                    );
                    return (
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>{currencyFormatter(record.current)}</span>
                          <span className="text-gray-500">
                            {currencyFormatter(record.target)}
                          </span>
                        </div>
                        <Progress
                          percent={percent}
                          status={percent >= 100 ? "success" : "active"}
                          strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
                        />
                      </div>
                    );
                  },
                },
                {
                  title: "Tương Tác",
                  key: "engagement",
                  render: (_, record) => (
                    <div className="flex gap-4 text-gray-500">
                      <span>
                        <EyeOutlined /> {record.views}
                      </span>
                      <span>
                        <HeartOutlined /> {record.likes}
                      </span>
                    </div>
                  ),
                },
                {
                  title: "Trạng Thái",
                  dataIndex: "status",
                  key: "status",
                  render: (status) => (
                    <Tag color={status === "ACTIVE" ? "processing" : "default"}>
                      {status}
                    </Tag>
                  ),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
