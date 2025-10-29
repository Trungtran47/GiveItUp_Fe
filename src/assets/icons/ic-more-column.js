import React from "react";
import PropTypes from "prop-types";

function IcMoreColumn(props) {
    const { fontSize, color = "#374151" } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 4 16"
            fill="none"
        >
            <path
                d="M2.00065 12.167C1.08398 12.167 0.333984 12.917 0.333984 13.8337C0.333984 14.7503 1.08398 15.5003 2.00065 15.5003C2.91732 15.5003 3.66732 14.7503 3.66732 13.8337C3.66732 12.917 2.91732 12.167 2.00065 12.167Z"
                fill={color}
            />
            <path
                d="M2.00065 0.5C1.08398 0.5 0.333984 1.25 0.333984 2.16667C0.333984 3.08333 1.08398 3.83333 2.00065 3.83333C2.91732 3.83333 3.66732 3.08333 3.66732 2.16667C3.66732 1.25 2.91732 0.5 2.00065 0.5Z"
                fill={color}
            />
            <path
                d="M2.00065 6.33301C1.08398 6.33301 0.333984 7.08301 0.333984 7.99967C0.333984 8.91634 1.08398 9.66634 2.00065 9.66634C2.91732 9.66634 3.66732 8.91634 3.66732 7.99967C3.66732 7.08301 2.91732 6.33301 2.00065 6.33301Z"
                fill={color}
            />
        </svg>
    );
}

IcMoreColumn.propTypes = {
    fontSize: PropTypes.number,
};

IcMoreColumn.defaultProps = {
    fontSize: 20,
};

export default IcMoreColumn;
