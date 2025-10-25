/* eslint-disable react/jsx-props-no-spreading */
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import IcTooltip from "@/assets/icons/ic-tooltip";
import { CommonStyles } from "@/utils/CommonStyles";

export default function CustomTooltip({ label }) {
  return (
    <Tooltip
      title={label || ""}
      arrow
      placement="top"
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: CommonStyles["color-text"],
            fontSize: "0.875rem",
            lineHeight: 1.5,
            px: 2,
            py: 1,
          },
        },
        arrow: {
          sx: {
            color: CommonStyles["color-text"],
          },
        },
      }}
    >
      <IconButton>
        <IcTooltip />
      </IconButton>
    </Tooltip>
  );
}
