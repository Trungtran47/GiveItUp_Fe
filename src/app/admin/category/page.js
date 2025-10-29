"use client";
import dynamic from "next/dynamic";
import LoadingPage from "../../../components/loading/LoadingPage";

const CategoryPage = dynamic(
  () => import("../../../containers/admin/category/CategoryPage"),
  {
    ssr: false,
    loading: () => <LoadingPage Loading={true} />,
  }
);

export default function Page() {
  return <CategoryPage />;
}
