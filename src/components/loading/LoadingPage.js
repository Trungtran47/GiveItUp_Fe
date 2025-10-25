"use client";

import { Loader } from "lucide-react";
import styles from "./loading-page.module.scss";

const LoadingPage = ({ Loading }) => {
  return (
    <div
      className={`${styles.container_loading} ${
        !Loading ? styles.container_loading_hidden : ""
      }`}
    >
      <div className={styles.container_loading_image}>
        <Loader />
      </div>
    </div>
  );
};

export default LoadingPage;
