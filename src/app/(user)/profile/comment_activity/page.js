"use client";
import dynamic from "next/dynamic";
import LoadingPage from "@/components/loading/LoadingPage";

const CommentActivityProfilePage = dynamic(
  () =>
    import(
      "../../../../containers/users/profile/comment_activity/CommentActivityProfile"
    ),
  {
    ssr: false,
    loading: () => <LoadingPage Loading={true} />,
  }
);

export default function Page() {
  return <CommentActivityProfilePage />;
}
