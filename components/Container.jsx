import PropTypes from "prop-types";

const Container = ({ className, padding, children }) => {
  return (
    <div
      className={"container " + (className ? className : "")}
      style={{
        ...(padding
          ? {
              "--paddingBlockCustom": padding + "px",
            }
          : {}),
      }}
    >
      {children}
    </div>
  );
};

export default Container;

Container.propTypes = {
  className: PropTypes.string,
  padding: PropTypes.number,
  children: PropTypes.node.isRequired,
};
