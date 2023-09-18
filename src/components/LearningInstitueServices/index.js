import React from "react";
import { Button, Col, Row } from "antd";
import styled from "styled-components";
import CustomButton from "../Button";
import router from "next/router";

import OurFeaturedCourse from "../Carousel/OurFeaturedCourse";

const LearningInstitueServices = ({
  FeaturedCoursesCarousalData,
  name,
  page,
  label,
  desc,
  button_text,
  button_link
}) => {
  return (
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
              {/* <HeroP>Newsfeed</HeroP> */}
              <HeroH1>{label}</HeroH1>
              <HeroSubPara>
                {desc}
              </HeroSubPara>
              {button_text !== "" && (
                <CustomButton
                  customStyle={{ backgroundColor: "#105F43", color: "#fff" }}
                  onClick={()=>{
                    router.push(`/${button_link}`);
                  }}
                >
                  {button_text}
                </CustomButton>
              )} 
            </div>
          </StyledNewsfeedCol>
          <StyledColEnd xl={19} lg={24} md={24} sm={24} xs={24}>
            <OurFeaturedCourse
              featuredCourseRecord={FeaturedCoursesCarousalData}
              name={name}
              page={page}
            />
          </StyledColEnd>
        </Row>
      </HeroContent>
    </HeroContainer>
  );
};

export default LearningInstitueServices;

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
  margin-bottom: 40px;
  @media (max-width: 1199px) {
    height: 950px;
  }
  @media (max-width: 800px) {
    height: 650px;
  }
`;

const HeroContent = styled.div`
  z-index: 3;
  min-width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  @media (min-width: 1200px) {
    padding: 70px 0px 0px 80px;
  }
`;

const HeroH1 = styled.h1`
  color: #105f43;
  font-size: 40px;
  // font-weight: 700;
  text-align: start;
  margin-bottom: 20px !important;
  line-height: 52px;
  font-family: "TitilliumBold", sans-serif;
  @media (min-width: 1200px) {
    width: 250px;
  }
`;

const HeroP = styled.p`
  color: #000;
  font-size: 22px;
  font-weight: 400;
  text-align: start;
  margin-bottom: 10px !important;
  line-height: 32px !important;
  // @media screen and (max-height: 650px) {
  //   display: none;
  // }
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
`;

const StyledColEnd = styled(Col)`
  display: flex;
  justify-content: end;
  align-items: center;
`;
