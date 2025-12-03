"use client";
import dynamic from "next/dynamic";
import LoadingPage from "../../../components/loading/LoadingPage";

const PostAdminPage = dynamic(
  () => import("../../../containers/admin/post/PostAdminPage"),
  {
    ssr: false,
    loading: () => <LoadingPage Loading={true} />,
  }
);

export default function Page() {
  return <PostAdminPage />;
}
