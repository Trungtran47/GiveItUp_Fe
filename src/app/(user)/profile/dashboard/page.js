"use client";
import dynamic from "next/dynamic";
import LoadingPage from "@/components/loading/LoadingPage";

const DashboardProfilePage = dynamic(
  () =>
    import("../../../../containers/users/profile/dashboard/DashboardProfile"),
  {
    ssr: false,
    loading: () => <LoadingPage Loading={true} />,
  }
);

export default function Page() {
  return <DashboardProfilePage />;
}
