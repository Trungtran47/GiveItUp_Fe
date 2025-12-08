"use client";
import dynamic from "next/dynamic";
import LoadingPage from "../../../components/loading/LoadingPage";

const PostAdminSearch = dynamic(
  () => import("../../../containers/admin/donation/DonationAdminPage"),
  {
    ssr: false,
    loading: () => <LoadingPage Loading={true} />,
  }
);

export default function Page() {
  return <PostAdminSearch />;
}
