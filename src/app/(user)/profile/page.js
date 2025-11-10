"use client";
import dynamic from "next/dynamic";
import LoadingPage from "../../../components/loading/LoadingPage";

const ProfilePage = dynamic(
  () => import("../../../containers/users/profile/ProfilePage"),
  {
    ssr: false,
    loading: () => <LoadingPage Loading={true} />,
  }
);

export default function Page() {
  return <ProfilePage />;
}
