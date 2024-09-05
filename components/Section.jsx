import PropTypes from "prop-types";

const Section = ({ title, heading, children }) => {
  return (
    <div className={title}>
      <div className="cSection | flex flex-col gap-[20px] sm:gap-[30px] md:gap-[40px] lg:gap-[50px] xl:gap-[60px]">
        <h3>{heading}</h3>
        {children}
      </div>
    </div>
  );
};

export default Section;

Section.propTypes = {
  title: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  children: PropTypes.node,
};
