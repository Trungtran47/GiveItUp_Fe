"use client";

import FormGroupSearchRowTop from "@/components/common/form/form-search/CustomFormSearchTop";
import useQuery from "@/components/hooks/use-query";
import useCustomRouter from "@/components/hooks/use-router";
import Constants from "@/utils/Constants";
import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const { Option } = Select;

function calcGrowth(current, previous) {
  if (!previous || previous === 0) return 100;
  return Math.round(((current - previous) / previous) * 100);
}

export default function DashboardAdvancedChart({ data }) {
  const { current = {}, previous = {}, chart = [] } = data;
  const now = dayjs();
  const [mode, setMode] = useState("MONTH"); // DAY | MONTH | YEAR
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(now.format("YYYY-MM"));
  const [selectedYear, setSelectedYear] = useState(now.format("YYYY"));
  const router = useCustomRouter();
  const defaultValues = {
    mode: "MONTH",
  };
  const methods = useForm({ defaultValues });
  const submitDashboardQuery = () => {
    const params = {
      [Constants.ROUTER_URL.MODE]: mode,
    };

    if (mode === "DAY" && selectedDate) {
      params[Constants.ROUTER_URL.DATE] = selectedDate;
    }

    // --- SỬA ĐOẠN NÀY ---
    if (mode === "MONTH" && selectedMonth) {
      const dateObj = dayjs(selectedMonth); // Tạo đối tượng dayjs từ tháng đã chọn
      params[Constants.ROUTER_URL.MONTH] = dateObj.month() + 1;
      params[Constants.ROUTER_URL.YEAR] = dateObj.year(); // Lấy năm từ chính tháng đã chọn
    }
    // --------------------

    if (mode === "YEAR" && selectedYear) {
      params[Constants.ROUTER_URL.YEAR] = selectedYear;
    }

    router.replace({ params });
  };

  useEffect(() => {
    if (
      (mode === "DAY" && selectedDate) ||
      (mode === "MONTH" && selectedMonth && selectedYear) ||
      (mode === "YEAR" && selectedYear)
    ) {
      submitDashboardQuery();
    }
  }, [mode, selectedDate, selectedMonth, selectedYear]);

  const resetForm = () => {
    const now = dayjs();
    setMode("MONTH");
    setSelectedDate("");
    setSelectedMonth(now.format("YYYY-MM"));
    setSelectedYear(now.format("YYYY"));

    router.replace({
      params: {
        mode: "MONTH",
        month: now.month() + 1,
        year: now.year(),
      },
    });
  };

  const postGrowth = calcGrowth(current.totalPost, previous.totalPost);
  const donateCountGrowth = calcGrowth(
    current.donateCount,
    previous.donateCount
  );
  const donateGrowth = calcGrowth(current.totalDonated, previous.totalDonated);
  const viewGrowth = calcGrowth(current.totalView, previous.totalView);
  const likeGrowth = calcGrowth(current.totalLike, previous.totalLike);
  const commentGrowth = calcGrowth(current.totalComment, previous.totalComment);

  return (
    <div className="space-y-6">
      <FormProvider {...methods}>
        <FormGroupSearchRowTop
          resetForm={resetForm}
          title={
            <h3 className="font-semibold text-gray-600">
              Xu hướng theo{" "}
              {mode === "DAY" ? "ngày" : mode === "MONTH" ? "tháng" : "năm"}
            </h3>
          }
          componentLeft={
            <div className="flex items-center gap-2">
              <Select
                value={mode}
                onChange={(value) => {
                  setMode(value);

                  // reset các field không liên quan
                  if (value === "DAY") {
                    setSelectedMonth("");
                    setSelectedYear(dayjs().year().toString());
                  }
                  if (value === "MONTH") {
                    setSelectedDate("");
                    setSelectedYear(dayjs().year().toString());
                  }
                  if (value === "YEAR") {
                    setSelectedDate("");
                    setSelectedMonth("");
                  }
                }}
                style={{ width: 140 }}
              >
                <Option value="DAY">Theo ngày</Option>
                <Option value="MONTH">Theo tháng</Option>
                <Option value="YEAR">Theo năm</Option>
              </Select>
              {/* PICKER */}
              {mode === "DAY" && (
                <DatePicker
                  value={selectedDate ? dayjs(selectedDate) : null}
                  onChange={(date) =>
                    setSelectedDate(date ? date.format("YYYY-MM-DD") : "")
                  }
                  format="DD/MM/YYYY"
                  placeholder="Chọn ngày"
                />
              )}
              {mode === "MONTH" && (
                <DatePicker
                  picker="month"
                  value={selectedMonth ? dayjs(selectedMonth) : null}
                  onChange={(date) => {
                    setSelectedMonth(date ? date.format("YYYY-MM") : "");
                    if (date) {
                      setSelectedYear(date.format("YYYY")); // Đồng bộ selectedYear
                    }
                  }}
                  format="MM/YYYY"
                  placeholder="Chọn tháng"
                />
              )}
              {mode === "YEAR" && (
                <DatePicker
                  picker="year"
                  value={selectedYear ? dayjs(selectedYear, "YYYY") : null}
                  onChange={(date) =>
                    setSelectedYear(date ? date.format("YYYY") : "")
                  }
                  placeholder="Chọn năm"
                />
              )}
            </div>
          }
        />
      </FormProvider>
      {/* Growth Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-4">
        <GrowthCard
          title="Bài post"
          current={current.totalPost}
          previous={previous.totalPost}
          growth={postGrowth}
          mode={mode}
        />

        <GrowthCard
          title="Lượt quyên góp"
          current={current.donateCount}
          previous={previous.donateCount}
          growth={donateCountGrowth}
          mode={mode}
        />

        <GrowthCard
          title="Tổng tiền quyên góp"
          current={current.totalDonated}
          previous={previous.totalDonated}
          growth={donateGrowth}
          suffix="₫"
          mode={mode}
        />

        <GrowthCard
          title="Lượt xem"
          current={current.totalView}
          previous={previous.totalView}
          growth={viewGrowth}
          mode={mode}
        />

        <GrowthCard
          title="Lượt thích"
          current={current.totalLike}
          previous={previous.totalLike}
          growth={likeGrowth}
          mode={mode}
        />

        <GrowthCard
          title="Lượt bình luận"
          current={current.totalComment}
          previous={previous.totalComment}
          growth={commentGrowth}
          mode={mode}
        />
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl shadow p-6 h-[380px]">
        <h3 className="font-semibold mb-4 text-gray-600">
          Xu hướng theo tháng
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chart}
            margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="time"
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />

            <YAxis
              width={80}
              tickFormatter={(value) =>
                value >= 1_000_000
                  ? `${value / 1_000_000}tr`
                  : value.toLocaleString()
              }
            />

            <Tooltip
              formatter={(value, name) => {
                if (name === "Tổng quyên góp") {
                  return [`${value.toLocaleString()} ₫`, name];
                }
                return [value.toLocaleString(), name];
              }}
              contentStyle={{
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />

            <Legend
              verticalAlign="top"
              height={36}
              wrapperStyle={{ fontSize: "12px" }}
            />

            <Line
              type="monotone"
              dataKey="totalDonated"
              name="Tổng quyên góp"
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey="totalView"
              name="Lượt xem"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="totalLike"
              name="Lượt thích"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ================== COMPONENT ================== */
function getCompareText(mode) {
  switch (mode) {
    case "DAY":
      return {
        unit: "ngày",
        previous: "Ngày trước",
      };
    case "MONTH":
      return {
        unit: "tháng",
        previous: "Tháng trước",
      };
    case "YEAR":
      return {
        unit: "năm",
        previous: "Năm trước",
      };
    default:
      return {
        unit: "",
        previous: "",
      };
  }
}

function GrowthCard({ title, current, previous, growth, suffix = "", mode }) {
  const isUp = growth >= 0;
  const { unit, previous: previousLabel } = getCompareText(mode);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <p className="text-gray-500 text-sm">{title}</p>

      <p className="text-2xl font-bold mt-1 text-gray-800">
        {(current ?? 0).toLocaleString()} {suffix}
      </p>

      <div
        className={`flex items-center gap-1 text-sm mt-2 ${
          isUp ? "text-green-600" : "text-red-600"
        }`}
      >
        {isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
        {Math.abs(growth)}% theo {unit} so với {unit} trước
      </div>

      <p className="text-xs text-gray-400 mt-1">
        {previousLabel}: {(previous ?? 0).toLocaleString()} {suffix}
      </p>
    </div>
  );
}
