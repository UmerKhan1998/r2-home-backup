import { Row } from "antd";
import React from "react";
import styled from "styled-components";
import Image from "next/image";

const StarToSuccessCard = ({ Img, Heading, Paragraph }) => {
  return (
    <StyledStarToSuccessCardDiv>
      <StarToSuccessImgRow>
        <Image alt={""} height={65} width={65} src={Img&&Img} />
      </StarToSuccessImgRow>
      <StarToSuccessContentRow>
        <h1>{Heading}</h1>
        <p>{Paragraph}</p>
      </StarToSuccessContentRow>
    </StyledStarToSuccessCardDiv>
  );
};

export default StarToSuccessCard;

const StyledStarToSuccessCardDiv = styled.div`
  background: #ffffff;
  box-shadow: 6px 6px 25px rgba(0, 0, 0, 0.09);
  border-radius: 9px;
  padding: 35px 22px;
  width: 180px;
  height: 200px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const StarToSuccessImgRow = styled(Row)`
  justify-content: center;
  img {
    margin-bottom: 10px;
  }
`;

const StarToSuccessContentRow = styled(Row)`
  display: grid !important;
  h1 {
    margin-bottom: 0px;
    text-align: center;
    font-size: 20px;
    // font-weight: 600;
    color: #105f43;
    font-family: "TitilliumBold", sans-serif;
  }
  p {
    margin-bottom: 0px;
    text-align: center;
    font-size: 13px;
    font-weight: 400;
    font-family: "TitilliumSemiBold", sans-serif;
    color: #000;
  }
`;
