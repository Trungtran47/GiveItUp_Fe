"use client";
import dynamic from "next/dynamic";
import ScrollTop from "../components/scroll-top/ScrollTop";
import LoadingPage from "../components/loading/LoadingPage";
const HomeContainer = dynamic(() => import("../containers/users/home"), {
  ssr: false,
  loading: () => <LoadingPage Loading={true} />,
});
export default function Home() {
  return (
    <div>
      <HomeContainer />
      <ScrollTop />
    </div>
  );
}
