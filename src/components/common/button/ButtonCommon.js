"use client";
import Spinner from "@/assets/icons/ic-spinner";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import { CommonStyles } from "../../../utils/CommonStyles";
import Text from "../text-common/text/Text";

const ButtonCommon = ({
  title = "",
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  style = {},
  variant = "contained",
  startIcon = <></>,
  endIcon = <></>,
  textColor = CommonStyles.white,
  textSize = CommonStyles.fontSizeBase,
  sx,
}) => {
  return (
    <Button
      sx={{
        borderRadius: "8px",
        boxShadow: "none",
        backgroundColor: CommonStyles.mainColor,
        textTransform: "none",
        minWidth: "100px",
        height: "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "&:hover": {
          backgroundColor: CommonStyles.mainColor,
          boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
        },
        ".MuiButton-endIcon": {
          marginLeft: "0",
        },
        ...sx,
      }}
      {...(type === "submit" ? {} : { onClick })}
      type={type}
      startIcon={!loading ? startIcon : null}
      endIcon={!loading ? endIcon : null}
      disabled={disabled || loading}
      loading={loading}
      style={style}
      variant={variant}
    >
      {!loading && (
        <Text
          style={{ color: textColor, fontWeight: "500", fontSize: textSize }}
        >
          {title}
        </Text>
      )}
    </Button>
  );
};

ButtonCommon.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  variant: PropTypes.string,
  startIcon: PropTypes.any,
  endIcon: PropTypes.any,
  textColor: PropTypes.string,
};

export default ButtonCommon;
