"use client";
import dynamic from "next/dynamic";
import LoadingPage from "@/components/loading/LoadingPage";

const DonationsProfilePage = dynamic(
  () =>
    import("../../../../containers/users/profile/donations/DonationsProfile"),
  {
    ssr: false,
    loading: () => <LoadingPage Loading={true} />,
  }
);

export default function Page() {
  return <DonationsProfilePage />;
}
