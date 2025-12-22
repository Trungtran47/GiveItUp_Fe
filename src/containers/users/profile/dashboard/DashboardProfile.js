"use client";

import useQuery from "@/components/hooks/use-query";
import DashboardAdvancedChart from "@/containers/users/profile/dashboard/components/DashboardAdvancedChart";
import dashboardFactory from "@/redux/dashboard/factory";
import { getToast } from "@/utils/Utils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function DashboardProfile() {
  const user = useSelector((state) => state.user.dataUser);
  const query = useQuery();
  const [dashboardData, setDashboardData] = useState(null);
  const getDashboardData = async () => {
    try {
      const res = await dashboardFactory.dashboardAuthor(query);
      if (res?.code == 200) {
        setDashboardData(res.result);
      } else {
        getToast("Lấy dữ liệu thất bại", "error");
        setDashboardData(null);
      }
    } catch (error) {
      console.error("xxx", error);
    }
  };
  useEffect(() => {
    getDashboardData();
  }, [query]);
  return (
    <div className="p-6 space-y-6  min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Xin chào, {user?.organization?.organizationName || user?.fullName}!
          </h1>
          <p className="text-gray-500">Quản lý các bài gây quỹ của bạn</p>
        </div>
      </div>

      {dashboardData && <DashboardAdvancedChart data={dashboardData} />}
    </div>
  );
}
