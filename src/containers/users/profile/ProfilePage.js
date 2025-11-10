"use client";
import Header from "@/containers/users/home/header/header";
import SidebarProfile from "@/containers/users/profile/components/SidebarProfile";
import { useState } from "react";
import DashboardProfile from "@/containers/users/profile/components/info/DashboardProfile";
import Footer from "@/components/footer/Footer";
import PersonalInfo from "@/containers/users/profile/components/info/PersonalInfo";

export default function ProfilePage() {
  const [active, setActive] = useState("dashboard");

  const renderContent = () => {
    switch (active) {
      case "dashboard":
        return <DashboardProfile />;
      // case "myposts":
      //   return <MyPosts />;
      // case "favorites":
      //   return <FavoritePosts />;
      // case "donations":
      //   return <DonatedList />;
      case "profile":
        return <PersonalInfo />;
      // default:
      //   return <Dashboard />;
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen  pt-[56px]">
        <div className="flex w-[1158px] mx-auto ">
          <SidebarProfile active={active} onSelect={setActive} />
          <div className="flex-1 min-h-[600px]">{renderContent()}</div>
        </div>
      </div>
      <Footer />
    </>
  );
}
