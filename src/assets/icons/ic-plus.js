import React from "react";

function IcPlus({ color="white", size=20 }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={color}
        >
            <path
                d="M12 5V19"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M5 12H19"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

export default IcPlus;
