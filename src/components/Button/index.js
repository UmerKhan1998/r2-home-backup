import react, { Children } from "react";
import { Button } from "antd";
import styled from "styled-components";

const CustomButton = ({
  children,
  onClick,
  customStyle,
  className,
  target,
}) => (
  <StyledButton
    target="blank"
    style={customStyle}
    className={className}
    onClick={onClick}
  >
    {children}
  </StyledButton>
);

export default CustomButton;

const StyledButton = styled(Button)`
  border-radius: 5px !important;
  height: 40px;
  z-index: 69 !important;
`;
