"use client";
import dynamic from "next/dynamic";
import LoadingPage from "../../../components/loading/LoadingPage";

const PayoutRequestsPage = dynamic(
  () => import("../../../containers/admin/payout-requests/PayoutRrequestsPage"),
  {
    ssr: false,
    loading: () => <LoadingPage Loading={true} />,
  }
);

export default function Page() {
  return <PayoutRequestsPage />;
}
