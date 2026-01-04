"use client";
import dynamic from "next/dynamic";
import LoadingPage from "../../../components/loading/LoadingPage";

const OAuthSuccessPage = dynamic(
  () => import("../../../containers/users/login/OAuthSuccessPage"),
  {
    ssr: false,
    loading: () => <LoadingPage Loading={true} />,
  }
);

export default function Page() {
  return <OAuthSuccessPage />;
}
