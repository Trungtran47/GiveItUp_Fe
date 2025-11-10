"use client";

import Footer from "@/components/footer/Footer";
import CircleSection from "@/containers/users/home/center/CircleSection";
import ContentHome from "@/containers/users/home/components/ContentHome";
import Header from "@/containers/users/home/header/header";

export default function HomePage() {
  return (
    <>
      <Header />

      <CircleSection />
      <ContentHome />
      <Footer />
    </>
  );
}
