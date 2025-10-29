import React from "react";
import { Save } from "@mui/icons-material";
import CustomLoadingButton from "@/components/common/button/loading/LoadingButton";
import { CommonStyles } from "@/utils/CommonStyles";

const SaveAndContinueButton = ({
  loading,
  onClick,
  disabled = false,
  style = {},
  title = "Lưu và tiếp tục",
  className = "",
  sx,
}) => {
  return (
    <CustomLoadingButton
      loading={loading}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={className}
      typeColor="background-green"
      sx={{
        minWidth: "140px",
        fontWeight: "500",
        "&:hover": {
          backgroundColor: CommonStyles.mainColor,
          boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
        },
        ...style,
      }}
      icon={Save}
    />
  );
};

export default SaveAndContinueButton;
