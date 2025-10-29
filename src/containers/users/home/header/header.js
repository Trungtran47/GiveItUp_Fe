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
        if (window.scrollY > 250 && window.scrollY > lastScrollY) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }
        // Scroll ra khỏi section có id cụ thể
        const section = document.getElementsByClassName("tracked-section")[0];
        if (section) {
          const sectionBottom = section.offsetTop - 106;

          if (window.scrollY > sectionBottom) {
            setIsOutOfSection(true);
          } else {
            setIsOutOfSection(false);
          }
        }

        lastScrollY = window.scrollY;
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div
      className={`transform ${styles.container_top} ${
        isHidden ? "-translate-y-0" : "translate-y-0"
      } ${isOutOfSection && styles.container_top_color}`}
      id="menu"
    >
      <AppInitializer />
      <MenuHeader />
    </div>
  );
};

export default Header;
