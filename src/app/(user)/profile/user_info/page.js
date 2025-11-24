"use client";
import dynamic from "next/dynamic";
import LoadingPage from "@/components/loading/LoadingPage";

const PersonalInfoPage = dynamic(
  () => import("../../../../containers/users/profile/info/PersonalInfo"),
  {
    ssr: false,
    loading: () => <LoadingPage Loading={true} />,
  }
);

export default function Page() {
  return <PersonalInfoPage />;
}
