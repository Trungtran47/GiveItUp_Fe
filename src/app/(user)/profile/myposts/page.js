"use client";
import dynamic from "next/dynamic";
import LoadingPage from "@/components/loading/LoadingPage";

const MyPostsProfilePage = dynamic(
  () => import("../../../../containers/users/profile/myposts/MyPostsProfile"),
  {
    ssr: false,
    loading: () => <LoadingPage Loading={true} />,
  }
);

export default function Page() {
  return <MyPostsProfilePage />;
}
