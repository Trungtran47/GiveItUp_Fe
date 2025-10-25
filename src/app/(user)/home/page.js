"use client";
import dynamic from "next/dynamic";
import LoadingPage from "../../../components/loading/LoadingPage";

const HomePage = dynamic(() => import("../../../containers/users/home"), {
  ssr: false,
  loading: () => <LoadingPage Loading={true} />,
});

export default function Page() {
  return <HomePage />;
}
