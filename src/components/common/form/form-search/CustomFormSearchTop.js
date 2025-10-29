"use client";

import IcRefresh from "@/assets/icons/ic-refresh";
import { convertParamsToArray } from "@/utils/Utils";
import { Button } from "antd";
import { useSearchParams } from "next/navigation";
import PropTypes from "prop-types";
import styles from "./FormSearch.module.scss";

function FormGroupSearchRowTop(props) {
  const {
    title,
    resetForm,
    queryDefault = 0,
    className,
    titleButton,
    componentTop,
    children,
  } = props;

  const searchParams = useSearchParams();
  const paramsObj = {};
  searchParams.forEach((value, key) => {
    paramsObj[key] = value;
  });

  const paramsArray = convertParamsToArray(paramsObj);

  return (
    <div className={`${styles["group-form-search-row"]} ${className || ""}`}>
      <div className={styles.title}>{title && title}</div>
      <div className="flex justify-center items-center gap-2">
        <div>{componentTop || children}</div>
        <div
          style={{ zIndex: 3 }}
          className={
            titleButton ? styles.box_formSearch : styles.box_formSearchTop
          }
        >
          <Button
            type="button"
            onClick={resetForm}
            size="small"
            disabled={
              paramsArray.length === queryDefault || paramsArray.length === 0
            }
            className={styles.ButtonReset}
          >
            {titleButton ? titleButton : <IcRefresh />}
          </Button>

          <button type="submit" style={{ display: "none" }}></button>
        </div>
      </div>
    </div>
  );
}

FormGroupSearchRowTop.propTypes = {
  componentTop: PropTypes.element,
  className: PropTypes.string,
  title: PropTypes.string,
  queryDefault: PropTypes.number,
  resetForm: PropTypes.func,
  children: PropTypes.node,
};

export default FormGroupSearchRowTop;
