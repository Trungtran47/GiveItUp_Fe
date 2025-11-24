"use client";
import dynamic from "next/dynamic";
import ScrollTop from "../components/scroll-top/ScrollTop";
import LoadingPage from "../components/loading/LoadingPage";
import Header from "@/components/menu-header/header/header";
import Footer from "@/components/footer/Footer";
import NextTopLoader from "nextjs-toploader";
const HomeContainer = dynamic(() => import("../containers/users/home"), {
  ssr: false,
  loading: () => <LoadingPage Loading={true} />,
});
export default function Home() {
  return (
    <>
      <NextTopLoader color="#017C18" showSpinner={false} />
      <Header />
      <HomeContainer />
      <ScrollTop />
      <Footer />
    </>
  );
}
