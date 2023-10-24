import React from "react";

const Button = ({ children, type }) => {
  return <button className={`btn  ${type}`}>{children}</button>;
};

export default Button;
