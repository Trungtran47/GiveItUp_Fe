"use client";

import MenuHeader from "@spo/components/menu-header/MenuHeader";
import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import AppInitializer from "../../../../app/AppInitializer";

const Header = () => {
  const [isOutOfSection, setIsOutOfSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsOutOfSection(true); // xuống dưới thì header trắng + bóng
      } else {
        setIsOutOfSection(false); // ở trên cùng thì mờ
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="menu"
      className={`${styles.container_top} ${
        isOutOfSection ? styles.container_top_color : ""
      }`}
    >
      <AppInitializer />
      <MenuHeader />
    </div>
  );
};

export default Header;
