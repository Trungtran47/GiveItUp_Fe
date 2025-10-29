"use client";
import CustomPagination from "@/components/pagination/custom-pagination";
import { Table } from "antd";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styles from "./CustomTable.module.scss";

const CustomTable = (props) => {
  let {
    columns = [],
    dataSource = [],
    totalRecord = 0,
    rowsPerPage,
    rowSelection,
    isScrollOverflowX = true,
    pagination = true,
    loading,
    totalValue,
    rowKey = "Id",
    dataSummary,
    outerHeight = 0,
  } = props;

  dataSource = dataSource?.map((e, index) => {
    return {
      Id: index + 1,
      ...e,
    };
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Table
        rowKey={rowKey}
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        scroll={{
          x: isScrollOverflowX ? 1000 : "max-content",
          // x: "100vw",
          y:
            windowHeight -
            (dataSummary ? 350 : totalValue ? 323 : 224) -
            outerHeight,
        }}
        pagination={false}
        rowClassName={() => styles.centeredRow}
        className={styles.customTableWrapper}
        rowSelection={rowSelection}
        // footer={
        //   totalValue
        //     ? () => (
        //         <div
        //           style={{
        //             display: "flex",
        //             justifyContent: "space-between",
        //           }}
        //         >
        //           <Text
        //             style={{
        //               fontWeight: CommonStyles.fontMediumBold,
        //             }}
        //           >
        //             Tổng
        //           </Text>
        //           <Text
        //             style={{
        //               fontWeight: CommonStyles.fontMediumBold,
        //             }}
        //           >
        //             {formatNumber(totalValue)}
        //           </Text>
        //         </div>
        //       )
        //     : undefined
        // }
      />

      {pagination && <CustomPagination Total={totalRecord || 0} />}
    </div>
  );
};

CustomTable.propTypes = {
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array.isRequired,
  rowsPerPage: PropTypes.number,
  totalRecord: PropTypes.number,
};

export default CustomTable;
