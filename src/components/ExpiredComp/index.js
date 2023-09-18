import React from "react";
import { NotFoundPage } from "../../../images";
import styled from "styled-components";
import Image from "next/image";

const PageNotFound = () => {
  return (
    <>
      <StyledDiv>
        <img loading="lazy"alt={""} src={NotFoundPage} height={370} width={500} />
      </StyledDiv>
    </>
  );
};

export default PageNotFound;

const StyledDiv = styled.div`
  padding-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 700px;
`;
