import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const TwoLayout = ({ width = "50/50", colOnMobile = false, children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 770);

  const handleMobile = () => {
    setIsMobile(window.innerWidth < 770);
  };

  useEffect(() => {
    window.addEventListener("resize", handleMobile);

    return () => {
      window.removeEventListener("resize", handleMobile);
    };
  }, []);

  const [leftWidth, rightWidth] = width.split("/").map((n) => +n);
  return (
    <div
      className={
        "twoLayout | flex justify-between" +
        (colOnMobile ? " flex-col md:flex-row gap-[40px]" : " flex-row")
      }
      style={{
        "--leftWidth": isMobile && colOnMobile ? "100%" : leftWidth + "%",
        "--rightWidth": isMobile && colOnMobile ? "100%" : rightWidth + "%",
      }}
    >
      <style>{`.twoLayout > div:first-child {
            max-width: var(--leftWidth);
          }
          .twoLayout > div:last-child {
            max-width: var(--rightWidth);
          }`}</style>
      {children}
    </div>
  );
};

export default TwoLayout;

TwoLayout.propTypes = {
  width: PropTypes.string,
  colOnMobile: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
