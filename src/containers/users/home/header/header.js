"use client";

import MenuHeader from "@spo/components/menu-header/MenuHeader";
import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import AppInitializer from "../../../../app/AppInitializer";

const Header = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [isOutOfSection, setIsOutOfSection] = useState(false);
  let lastScrollY = 0;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        // Ẩn header khi scroll xuống, hiện khi scroll lên
        if (window.scrollY > 250 && window.scrollY > lastScrollY) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }

        // Kiểm tra scroll ra ngoài section
        const section = document.getElementsByClassName("tracked-section")[0];
        if (section) {
          const sectionBottom = section.offsetTop - 56;
          setIsOutOfSection(window.scrollY > sectionBottom);
        }

        lastScrollY = window.scrollY;
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div
      id="menu"
      className={`
        ${styles.container_top} 
        ${isHidden ? styles["hidden-header"] : ""} 
        ${isOutOfSection ? styles.container_top_color : ""}
      `}
    >
      <AppInitializer />
      <MenuHeader />
    </div>
  );
};

export default Header;
