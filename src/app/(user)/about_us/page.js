"use client";
import dynamic from "next/dynamic";
import LoadingPage from "../../../components/loading/LoadingPage";

const AboutUsPage = dynamic(
  () => import("../../../containers/users/about-us/AboutUsPage"),
  {
    ssr: false,
    loading: () => <LoadingPage Loading={true} />,
  }
);

export default function Page() {
  return <AboutUsPage />;
}
