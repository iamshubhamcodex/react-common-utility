import React from "react";

const FormEnter = ({ onSubmit, children }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit && onSubmit(e);
      }}
    >
      {children}
    </form>
  );
};

export default FormEnter;
