import React from "react";
import styles from "./Text.module.scss";

function Text(props) {
  const { style } = props;

  return (
    <span className={`${styles.Text}`} style={{ ...style }}>
      {props.children ?? props.children}
    </span>
  );
}

export default Text;
