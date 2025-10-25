import React from "react";
import LoadingButton from "../loading/LoadingButton";
import PropTypes from "prop-types";
const TemporarySaveButton = ({
    loading,
    onClick,
    disabled = false,
    style = {},
    title = "Lưu tạm",
    className = "",
    value,
    type = 'submit'
}) => {
    return (
        <LoadingButton
            type={type}
            loading={loading}
            onClick={onClick}
            disabled={disabled}
            title={title}
            className={className}
            value={value}
            sx={{
                backgroundColor: "#FF8800",
                minWidth: "100px",
                fontWeight: '500',
                "&:hover": {
                    backgroundColor: "#FF8800",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
                },
                ...style,
            }}
        />
    );
};
TemporarySaveButton.prototype = {
    loading: PropTypes.bool,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    style: PropTypes.object,
    title: PropTypes.string,
    className: PropTypes.string,
};
export default TemporarySaveButton;
