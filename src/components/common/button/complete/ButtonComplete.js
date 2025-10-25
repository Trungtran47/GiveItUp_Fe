import React from "react";
import LoadingButton from "../loading/LoadingButton";
import PropTypes from "prop-types";
const ButtonComplete = ({
    loading,
    onClick,
    disabled = false,
    style = {},
    title = "Hoàn thành",
    className = "",
    value,
    type = 'submit'
}) => {
    return (
        <LoadingButton
            type={type}
            value={value}
            loading={loading}
            onClick={onClick}
            disabled={disabled}
            title={title}
            className={className}
            sx={{
                backgroundColor: "green",
                minWidth: "96px",
                fontWeight: "500",
                "&:hover": {
                    backgroundColor: "green",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
                },
                ...style,
            }}
        />
    );
};
ButtonComplete.prototype = {
    loading: PropTypes.bool,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    style: PropTypes.object,
    title: PropTypes.string,
    className: PropTypes.string,
};

export default ButtonComplete;
