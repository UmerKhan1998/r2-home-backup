import React, { useState, useLayoutEffect } from "react";
import { Col, Empty, Row } from "antd";
import styled from "styled-components";
import CustomButton from "../Button";

import LatestNewsAndResourcesCarousel from "../Carousel/LatestNewsAndResources";
import {
  footer_para,
  latestNewsResources,
  Newsfeed,
  view_all,
} from "../../../helpers/LanguageConstant";
import { useRouter } from "next/router";

const FeaturedCourses = ({
  FeaturedLatestNewsCarousalData,
  name,
  heading,
  title,
  description,
  button,
  button_link
}) => {
  const router = useRouter();
  const DesktopView = (
    <HeroContainer>
      <HeroContent dir="rtl">
        <Row>
          <StyledNewsfeedCol
            xl={5}
            lg={24}
            md={24}
            sm={24}
            xs={24}
            style={{ display: "flex", alignItems: "center" }}
          >
            <div>
              <HeroP>{heading}</HeroP>
              <HeroH1>{title}</HeroH1>
              <HeroSubPara>{description}</HeroSubPara>
              {FeaturedLatestNewsCarousalData?.length>0&&
              <CustomButton
                customStyle={{ backgroundColor: "#105F43", color: "#fff" }}
                onClick={() => router.push(`/ar/${button_link}`)}
              >
                {button}
              </CustomButton>
}
            </div>
          </StyledNewsfeedCol>
          <StyledColEnd xl={19} lg={24} md={24} sm={24} xs={24}>
          {FeaturedLatestNewsCarousalData?.length>0?
            
            <LatestNewsAndResourcesCarousel
              FeaturedLatestNewsCarousalData={FeaturedLatestNewsCarousalData}
              name={name}
            />
            :<div style={{ width:"100%" }}>
            <Empty/></div>
          }
          </StyledColEnd>
        </Row>
      </HeroContent>
    </HeroContainer>
  );
  const MobileView = (
    <HeroContainer>
      <HeroContent>
        <Row>
          <StyledNewsfeedCol
            xl={5}
            lg={24}
            md={24}
            sm={24}
            xs={24}
            style={{ display: "flex", alignItems: "center" }}
          >
            <div>
              <HeroP>{heading}</HeroP>
              <HeroH1>{title}</HeroH1>
              <HeroSubPara>{description}</HeroSubPara>
            </div>
          </StyledNewsfeedCol>
          <StyledColEnd xl={19} lg={24} md={24} sm={24} xs={24}>
          {FeaturedLatestNewsCarousalData?.length>0?
            <LatestNewsAndResourcesCarousel
            FeaturedLatestNewsCarousalData={FeaturedLatestNewsCarousalData}
            name={name}
            />
            :
            <div style={{ width:"100%" }}>
              <Empty/>
            </div>  
            }
          </StyledColEnd>
          <Col span={24} style={{ textAlign: "center" }}>
          {FeaturedLatestNewsCarousalData?.length>0&&
            <CustomButton
            customStyle={{ backgroundColor: "#105F43", color: "#fff" }}
            >
              {button}
            </CustomButton>
          }
          </Col>
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

const HeroContainer = styled.div`
  background: #fff;
  display: flex;
  justify-content: center;
  // padding: 0 30px;
  // height: 103vh;
  height: 650px;
  position: relative;
  z-index: 1;
  align-items: center;
  width: 100%;
  // margin-bottom: 40px;
  @media (max-width: 1199px) {
    padding-block: 440px;
  }
  @media (max-width: 992px) {
    height: auto;
    display: block;
    padding-block: 50px;
    padding-inline: 4px;
  }
`;

const HeroContent = styled.div`
  z-index: 3;
  min-width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  @media (min-width: 1200px) {
    padding: 0px 80px 0px 0px;
  }
  @media (max-width: 992px) {
    position: relative;
    display: block;
  }
`;

const HeroH1 = styled.h1`
  color: #105f43;
  font-size: 40px;
  // font-weight: 700;
  text-align: start;
  margin-bottom: 20px !important;
  line-height: 52px;
  font-family: "GESSTwoBold", sans-serif;
  @media (min-width: 1200px) {
    width: 250px;
  }
  @media (max-width: 992px) {
    font-size: 22px;
    line-height: unset;
    margin-bottom: 10px !important;
  }
`;

const HeroP = styled.p`
  color: #000;
  font-size: 22px;
  font-weight: 400;
  text-align: start;
  margin-bottom: 10px !important;
  line-height: 32px !important;
  @media screen and (max-width: 992px) {
    font-size: 16px;
    line-height: unset !important;
  }
`;

const HeroSubPara = styled.p`
  margin-bottom: 20px !important;
  @media (min-width: 1199px) {
    width: 190px !important;
  }
`;

const StyledNewsfeedCol = styled(Col)`
  display: flex;
  align-items: center;
  @media (max-width: 1199px) {
    padding-inline: 8%;
  }
  @media (max-width: 992px) {
    padding-inline: 0;
  }
`;

const StyledColEnd = styled(Col)`
  display: flex;
  justify-content: end;
  align-items: center;
`;
