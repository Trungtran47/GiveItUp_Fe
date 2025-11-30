"use client";
import dynamic from "next/dynamic";
import LoadingPage from "@/components/loading/LoadingPage";

const PostViewProfile = dynamic(
  () =>
    import("../../../../containers/users/profile/post_view/PostViewProfile"),
  {
    ssr: false,
    loading: () => <LoadingPage Loading={true} />,
  }
);

export default function Page() {
  return <PostViewProfile />;
}
