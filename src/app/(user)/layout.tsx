"use client";

import Footer from "@/components/footer/Footer";
import Header from "@/components/menu-header/header/header";
import { getDataCategories } from "@/redux/category/reducer";
import NextTopLoader from "nextjs-toploader";
import { PropsWithChildren, use, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function UserLayout({ children }: PropsWithChildren) {
  const dispatch = useDispatch();
  const getData = () => {
    dispatch(getDataCategories());
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <NextTopLoader color="#017C18" showSpinner={false} />
      <Header />
      <div className="min-h-screen pt-[56px]">
        <div className="flex w-[1158px] mx-auto">{children}</div>
      </div>
      <Footer />
    </>
  );
}
