import React from "react";
import styled from "styled-components";
const FieldStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  width: 100%;
`;
const Field = ({ children }) => {
  return <FieldStyled>{children}</FieldStyled>;
};

export default Field;
