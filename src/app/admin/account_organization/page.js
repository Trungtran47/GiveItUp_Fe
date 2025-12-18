"use client";
import dynamic from "next/dynamic";
import LoadingPage from "../../../components/loading/LoadingPage";

const AccountAuthorPage = dynamic(
  () =>
    import("../../../containers/admin/account_organization/AccountAuthorPage"),
  {
    ssr: false,
    loading: () => <LoadingPage Loading={true} />,
  }
);

export default function Page() {
  return <AccountAuthorPage />;
}
