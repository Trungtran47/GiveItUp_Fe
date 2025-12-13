"use client";
import dynamic from "next/dynamic";
import LoadingPage from "../../../../components/loading/LoadingPage";

const ShowProfilePage = dynamic(
  () => import("../../../../containers/users/show_profile/ShowProfilePage"),
  {
    ssr: false,
    loading: () => <LoadingPage Loading={true} />,
  }
);

export default function Page() {
  return <ShowProfilePage />;
}
