function Spinner() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 50 50"
      style={{ display: "block" }}
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke="white"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="31.4 31.4"
        strokeDashoffset="0"
        transform="rotate(-90 25 25)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

export default Spinner;
