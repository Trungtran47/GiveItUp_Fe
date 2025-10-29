"use client";

import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import TablePagination from "@mui/material/TablePagination";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

import { CommonStyles } from "@/utils/CommonStyles";
import Constants from "@/utils/Constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    borderRadius: CommonStyles.borderRadiusContent,
    color: CommonStyles.gray,
    backgroundColor: CommonStyles.white,
    borderColor: CommonStyles.white,
  },
  "& .MuiPaginationItem-page.Mui-selected": {
    backgroundColor: CommonStyles.mainColor,
    color: CommonStyles.hoverTable,
    borderColor: CommonStyles.mainColor,
  },
}));

export default function CustomPagination(props) {
  const { Total } = props;
  const [rowsPerPage, setRowsPerPage] = useState(
    props?.rowsPerPage || Constants.RECEIPT_LIMIT.LIMIT
  );
  const [page, setPage] = useState(1);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Lấy query params hiện tại
  const getQueryParams = () => Object.fromEntries(searchParams.entries());

  const handleChangePage = (event, newPage) => {
    props?.setSelected && props?.setSelected([]);
    const params = getQueryParams();

    router.replace(
      `${pathname}?${new URLSearchParams({
        ...params,
        [Constants.ROUTER_URL.PAGE]: newPage,
      }).toString()}`
    );
  };

  const handleChangeRowsPerPage = (event) => {
    const newSize = parseInt(event.target.value);
    setRowsPerPage(newSize);
    props?.setSelected && props?.setSelected([]);

    const params = getQueryParams();

    router.replace(
      `${pathname}?${new URLSearchParams({
        ...params,
        [Constants.ROUTER_URL.PAGE_SIZE]: newSize,
        [Constants.ROUTER_URL.PAGE]: 1,
      }).toString()}`
    );
  };

  useEffect(() => {
    const pageParam = searchParams.get(Constants.ROUTER_URL.PAGE);
    const pageSizeParam = searchParams.get(Constants.ROUTER_URL.PAGE_SIZE);

    if (pageParam) setPage(Number(pageParam));
    if (pageSizeParam) setRowsPerPage(Number(pageSizeParam));
  }, [searchParams]);

  const defaultLabelDisplayedRows = ({ from, to, count }) => {
    return `Hiển thị từ ${from}–${to} trên tổng ${count !== -1 ? count : to}`;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: "5px",
      }}
    >
      <StyledPagination
        onChange={handleChangePage}
        count={Math.ceil(Total / rowsPerPage)}
        variant="outlined"
        shape="rounded"
        page={Number(page)}
      />
      <TablePagination
        component="div"
        count={Total}
        page={Number(page - 1)}
        rowsPerPageOptions={[10, 20, 50, 100]}
        labelRowsPerPage="Hiển thị"
        labelDisplayedRows={defaultLabelDisplayedRows}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage || 0}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="mr-1"
        ActionsComponent={() => {}}
        SelectProps={{
          MenuProps: {
            PaperProps: {
              sx: {
                mt: 1,
                borderRadius: CommonStyles["border-radius-content"],
              },
            },
          },
          sx: {
            border: "1px solid #D0D5DD",
            borderRadius: "8px",
            backgroundColor: "#fff",
            fontSize: "14px",
            height: 32,
            "&:before, &:after": { display: "none" },
            ".MuiSelect-select": {
              paddingRight: "30px !important",
              paddingLeft: "10px !important",
              paddingTop: "4px",
              paddingBottom: "4px",
              display: "flex",
              alignItems: "center",
              border: "none !important",
            },
          },
        }}
      />
    </div>
  );
}

CustomPagination.propTypes = {
  Total: PropTypes.number,
};
