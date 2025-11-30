"use client";
import dynamic from "next/dynamic";
import LoadingPage from "@/components/loading/LoadingPage";

const FavoritesProfilePage = dynamic(
  () =>
    import("../../../../containers/users/profile/favorites/FavoritesProfile"),
  {
    ssr: false,
    loading: () => <LoadingPage Loading={true} />,
  }
);

export default function Page() {
  return <FavoritesProfilePage />;
}
