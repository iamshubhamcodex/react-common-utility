import React, { useEffect } from "react";
import { handleModalCloseOnEscape } from "../../lib/utility";

const Modal = ({
  show,
  overlayColor,
  close,
  justify = "right",
  width = 450,
  overflow = "hidden",
  centerOnMobile = false,
  children,
}) => {
  function handleClose(e) {
    handleModalCloseOnEscape(e, close);
  }
  useEffect(() => {
    window.addEventListener("keyup", handleClose);

    return () => {
      window.removeEventListener("keyup", handleClose);
    };
  }, []);

  useEffect(() => {
    if (show) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  if (show)
    return (
      <div
        {...(centerOnMobile ? { className: "mobCenter" } : {})}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 50000,
          display: "flex",
          justifyContent: justify,
          ...(justify === "center" ? { alignItems: "center" } : {}),
        }}
      >
        <div
          className="overlay"
          onClick={close}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            backgroundColor: overlayColor ?? "#00000085",
            backdropFilter: "blur(2px)",
            zIndex: 50001,
          }}
        ></div>
        <div
          className="modal-container"
          style={{
            maxHeight: justify === "center" ? "90vh" : "100%",
            zIndex: 50002,
            position: "relative",
            minWidth: `min(90vw, ${width}px)`,
            width: width,
            ...(justify === "center"
              ? { borderRadius: "16px", overflow: overflow }
              : { minHeight: "100%" }),
            maxWidth: "90vw",
          }}
        >
          {children}
        </div>
      </div>
    );
};

export default Modal;
