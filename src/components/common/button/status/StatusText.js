import React from "react";

const StatusText = ({
    status,
    dataStatus = [],
    color = "",
    style = {},
    fontWeight = 600,
    ...rest
}) => {
    const itemStatus = dataStatus?.find(
        (item) => String(item.key) === String(status)
    );
    if (!itemStatus) return null;

    return (
        <span
            style={{
                color: itemStatus.color || color,
                fontWeight,
                ...style,
            }}
            {...rest}
        >
            {itemStatus.label}
        </span>
    );
};

export default StatusText;
