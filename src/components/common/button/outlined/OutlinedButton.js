import React from "react";
import ButtonCommon from "../ButtonCommon";
import { CommonStyles } from "../../../../../utils/CommonStyles";
import PropTypes from "prop-types";

const OutlinedButton = ({
    title = "",
    onClick,
    type = "button",
    disabled = false,
    startIcon,
    endIcon,
    color = CommonStyles.mainColor,
    textColor = "inherit",
    textSize,
    sx
}) => {
    return (
        <ButtonCommon
            startIcon={startIcon}
            endIcon={endIcon}
            title={title}
            onClick={onClick}
            type={type}
            disabled={disabled}
            textColor={textColor}
            textSize={textSize}
            sx={{
                borderRadius: CommonStyles.borderRadiusContent,
                boxShadow: "none",
                textTransform: "none",
                minWidth: "96px",
                height: "36px",
                backgroundColor: CommonStyles.white,
                border: `1px solid ${color}`,
                color: color,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                    backgroundColor:  CommonStyles.hoverButtonOutlined,
                },
                ...sx,
            }}
        />
    );
};
OutlinedButton.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    startIcon: PropTypes.any,
    endIcon: PropTypes.any,
    textColor: PropTypes.string,
    sx: PropTypes.object,
};

export default OutlinedButton;
