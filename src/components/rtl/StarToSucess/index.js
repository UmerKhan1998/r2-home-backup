import React, { useLayoutEffect } from "react";
import { Col, Row } from "antd";
import Carousel from "react-elastic-carousel";
import styled from "styled-components";

import StarToSuccessCarousel from "../Carousel/StarToSuccess";
import { useState } from "react";
import {
  achieve_your_goals_with,
  riyadh_second_health_cluster,
  star_to_success,
} from "../../../helpers/LanguageConstant";

const FeaturedCourses = ({
  StarToSucessArr,
  heading,
  title
}) => {
  const DesktopView = (
    <HeroContainer>
      <HeroContent dir="rtl">
        <Row>
          <StyledStarCol xl={9} lg={24} md={24} sm={24} xs={24}>
            <HeroP>{heading}</HeroP>
            <HeroH1>
              {title}
            </HeroH1>
          </StyledStarCol>
          <StyledColEnd xl={15} lg={24} md={24} sm={24} xs={24}>
            <StarToSuccessCarousel StarToSucessArr={StarToSucessArr} />
          </StyledColEnd>
        </Row>
      </HeroContent>
    </HeroContainer>
  );
  const MobileView = (
    <HeroContainer>
      <HeroContent dir="rtl">
        <Row gutter={["20px", "20px"]}>
          <Col span={24}>
            <HeroP>{heading}</HeroP>
            <HeroH1>
              {title}
            </HeroH1>
          </Col>
          <StyledColEnd span={24}>
            <StarToSuccessCarousel StarToSucessArr={StarToSucessArr} />
          </StyledColEnd>
        </Row>
      </HeroContent>
    </HeroContainer>
  );

  const [isDesktop, setIsDesktop] = useState(false);

  useLayoutEffect(() => {
    if (window.innerWidth > 991) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth > 991) {
        setIsDesktop(true);
      } else {
        setIsDesktop(false);
      }
    };
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  return <>{isDesktop ? DesktopView : MobileView}</>;
};

export default FeaturedCourses;

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
const StyledStarCol = styled(Col)`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  // padding: 0 30px;
  // height: 103vh;
  height: 450px;
  position: relative;
  z-index: 1;
  align-items: center;
  width: 100%;
  @media (max-width: 1199px) {
    height: 600px;
  }
  @media (max-width: 992px) {
    display: block;
    height: auto;
    padding: 50px 0;
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
    padding: 70px 80px 70px 10px;
  }
  @media (max-width: 1199px) {
    padding-inline: 8px;
  }
  @media (max-width: 992px) {
    position: relative;
    display: block;
    padding-inline: 4px;
  }
`;

const HeroH1 = styled.h1`
  color: #105f43;
  font-size: 40px;
  // font-weight: 700;
  text-align: start;
  margin-bottom: 0px !important;
  line-height: 52px;
  font-family: "GESSTwoBold", sans-serif;

  @media (min-width: 1200px) {
    width: 410px;
  }
  @media (max-width: 1199px) {
    margin-inline: 6%;
  }
  @media (max-width: 992px) {
    margin-inline: 0;
    font-size: 22px;
    line-height: 30px;
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
  @media (max-width: 992px) {
    margin-inline: 0;
    font-size: 16px;
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

const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 576px) {
    max-width: 576px;
  }

  @media (min-width: 768px) {
    max-width: 768px;
  }

  @media (min-width: 992px) {
    max-width: 992px;
  }

  @media only screen and (min-width: 1160px) and (max-width: 1258px) {
    min-width: 1160px;
  }

  @media only screen and (min-width: 1259px) and (max-width: 1359px) {
    min-width: 1260px;
  }

  @media (min-width: 1342px) {
    min-width: 1340px;
  }
`;
