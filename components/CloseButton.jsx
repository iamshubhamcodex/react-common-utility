import React from "react";

const CloseButton = ({ theme = "light", onClick, color, height = 24 }) => {
  return (
    <svg
      className="cursor-pointer"
      width={height}
      height={height}
      viewBox="0 0 24 24"
      fill={color || (theme === "light" ? "black" : "white")}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M20 4L4 20M4 4L20 20"
        stroke={color || (theme === "light" ? "black" : "white")}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CloseButton;
