import React from "react";
import styled from "styled-components";
const LabelStyled = styled.label`
  color: #20e3b2;
  font-size: 14px;
  text-align: left;
  width: 100%;
`;
const Label = ({ htmlFor = "", children }) => {
  return <LabelStyled htmlFor={htmlFor}>{children}</LabelStyled>;
};

export default Label;
