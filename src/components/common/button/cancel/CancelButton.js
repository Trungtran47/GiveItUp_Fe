import React from "react";
import ButtonCommon from "../ButtonCommon";
import { CommonStyles } from "../../../../../utils/CommonStyles";

const CancelButton = ({
    title = "Hủy bỏ",
    onClick,
    type = "button",
    disabled = false,
    style = {},
    startIcon,
    endIcon,
}) => {
    return (
        <ButtonCommon
            textColor={CommonStyles.black}
            startIcon={startIcon}
            endIcon={endIcon}
            title={title}
            onClick={onClick}
            type={type}
            disabled={disabled}
            sx={{
                backgroundColor: "#E5E7EB",
                "&:hover": {
                    backgroundColor: "#E5E7EB",
                },
                ...style,
            }}
        />
    );
};

export default CancelButton;
