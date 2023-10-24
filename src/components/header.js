import PropTypes from "prop-types";
import React from "react";
import ThemeToggle from "./ThemeToggle";
import BlubaLogo from "./AnimatedLogo";

const Header = ({ siteTitle }) => (
  <div className="transparent  p-4 lg:px-12 lg:py-10 flex flec-col justify-between align-center">
    <BlubaLogo />
    <ThemeToggle />
  </div>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
