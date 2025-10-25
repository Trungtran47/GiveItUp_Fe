import React from "react";
import { Save } from "@mui/icons-material";
import LoadingButton from "../loading/LoadingButton";
import { CommonStyles } from "utils/CommonStyles";

const SaveButton = ({
    loading,
    onClick,
    disabled = false,
    title = "Lưu",
    type = 'submit',
    value = 'save',
    className = "",
    sx
}) => {
    return (
        <LoadingButton
            value={value}
            type={type}
            loading={loading}
            onClick={onClick}
            disabled={disabled}
            title={title}
            className={className}
            typeColor="background-green"
            sx={{
                minWidth: "96px",
                fontWeight: '500',
                "&:hover": {
                    backgroundColor: CommonStyles.mainColor,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
                },
                ...sx,
            }}
            icon={Save}
        />
    );
};

export default SaveButton;
