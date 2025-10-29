import PropTypes from "prop-types";
import React from "react";
import { CircularProgress } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { CommonStyles } from "@/utils/CommonStyles";
import Text from "@/components/common/text-common/text/Text";

function CustomLoadingButton(props) {
  const {
    loading = false,
    type = "submit",
    backgroundColor = CommonStyles.mainColor,
    onClick,
    title,
    style = {},
    textColor = "#fff",
    textStyle = {},
    sx,
    variant,
    startIcon,
    endIcon,
    value,
    disabled = false,
  } = props;

  return (
    <LoadingButton
      type={type}
      sx={{
        borderRadius: "8px",
        boxShadow: "none",
        backgroundColor: backgroundColor,
        textTransform: "none",
        minWidth: "96px",
        height: "36px",
        "&:hover": {
          backgroundColor: backgroundColor,
          boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
        },
        ".MuiButton-endIcon": {
          marginLeft: "0",
        },
        ...sx,
      }}
      loading={loading}
      loadingPosition={"center"}
      title={title}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      variant={variant}
      value={value}
      disabled={disabled}
    >
      {loading ? (
        <CircularProgress sx={{ color: "white" }} size={16} />
      ) : (
        <Text style={{ color: textColor, fontWeight: "500", ...textStyle }}>
          {title}
        </Text>
      )}
    </LoadingButton>
  );
}

CustomLoadingButton.propTypes = {
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

export default CustomLoadingButton;
