import React from "react";
import { Col, Row } from "antd";
import Carousel from "react-elastic-carousel";
import styled from "styled-components";

import OurStoriesCarousel from "../Carousel/OurStories";

const OurStories = ({ OurStoriesArr }) => {
  return (
    <HeroContainer>
      <HeroContent>
        <Row>
          <StyledColEnd xl={24} lg={24} md={24} sm={24} xs={24}>
            <OurStoriesCarousel OurStoriesArr={OurStoriesArr} />
          </StyledColEnd>
        </Row>
      </HeroContent>
    </HeroContainer>
  );
};

export default OurStories;

const DesktopDiv = styled.div`
  @media (max-width: 1199px) {
    display: none;
  }
`;

const MobileDiv = styled.div`
  @media (min-width: 1200px) {
    display: none;
  }
`;

const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  // padding: 0 30px;
  // height: 103vh;
  height: 600px;
  position: relative;
  z-index: 1;
  align-items: center;
  width: 100%;
  @media (max-width: 1199px) {
    height: 700px;
  }
  .rec-arrow-right {
    margin-right: 8px !important;
  }
`;

const HeroContent = styled.div`
  z-index: 3;
  min-width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  @media (min-width: 1200px) {
    padding: 8px;
  }
  @media (max-width: 1199px) {
    padding-inline: 8px;
  }
`;

const HeroH1 = styled.h1`
  color: #105f43;
  font-size: 40px;
  // font-weight: 700;
  text-align: start;
  margin-bottom: 0px !important;
  line-height: 52px;
  font-family: "TitilliumBold", sans-serif;

  @media (min-width: 1200px) {
    width: 410px;
  }
  @media (max-width: 1199px) {
    margin-inline: 6%;
  }
`;

const HeroP = styled.p`
  color: #000;
  font-size: 22px;
  font-weight: 400;
  text-align: start;
  margin-bottom: 10px !important;
  @media (max-width: 1199px) {
    margin-inline: 6%;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledColEnd = styled(Col)`
  display: flex;
  justify-content: end;
  align-items: center;
`;

const StyledCarousel = styled(Carousel)`
  .rec-dot {
    display: none !important;
  }
`;
