import React from "react";
import styled from "styled-components";
import { Logo } from "../../../../images";
import Image from "next/image";

const index = () => {
  return (
    <StyledDiv>
      <Image loading="lazy"alt={""} height={35} width={235} src={Logo} />
    </StyledDiv>
  );
};

export default index;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  // width: 0;
  h1 {
    margin-bottom: 0px !important;
    text-align: center;
    color: #fff !important;
    font-weight: bold !important;
  }
  img {
    height: 35px;
  }
`;
