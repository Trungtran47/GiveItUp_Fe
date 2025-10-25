"use client";
import dynamic from "next/dynamic";
import LoadingPage from "../../../components/loading/LoadingPage";

const DashboardPage = dynamic(
  () => import("../../../containers/admin/dashboard/index"),
  {
    ssr: false,
    loading: () => <LoadingPage Loading={true} />,
  }
);

export default function Page() {
  return <DashboardPage />;
}
