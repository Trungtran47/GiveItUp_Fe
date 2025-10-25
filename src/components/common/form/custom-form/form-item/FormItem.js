import React from "react";
import styles from "./Form.module.scss";
import CustomTooltip from "@/components/common/tooltip/CustomTooltip";

function FormItem(props) {
  return (
    <div
      className={`${styles["form-item"]} ${props?.className}`}
      style={{ ...props?.style }}
    >
      {props?.title && (
        <div className={styles["form-label"]}>
          <span className={styles.form_title}>
            {props?.title}
            {props?.required && <span className={styles.required}>*</span>}
            {props?.tooltip && <CustomTooltip label={props?.tooltip} />}
          </span>
        </div>
      )}
      <div className={styles["form-input"]}>{props.children}</div>
    </div>
  );
}

export default FormItem;
