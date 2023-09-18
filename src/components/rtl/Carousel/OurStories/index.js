import React from "react";
import Carousel from "react-elastic-carousel";
import styled from "styled-components";
import Image from "next/image";
import {
  CmeHours,
  Interns,
  OnlineCoursesCompleted,
  OurStoriesImage,
  StudentsTrained,
} from "../../../../../images";
import StarToSuccessCard from "../../Cards/StarToSuccessCard";
import CustomButton from "../../Button";
import { Col, Row } from "antd";
import { read_more } from "../../../../helpers/LanguageConstant";

const OurStories = ({ OurStoriesArr }) => {
  return (
    <StyledCarousel
      focusOnSelect={true}
      breakPoints={[
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 1, itemsToScroll: 1, pagination: false },
        { width: 850, itemsToShow: 1 },
        { width: 1150, itemsToShow: 1, itemsToScroll: 1 },
        { width: 1450, itemsToShow: 1 },
        { width: 1750, itemsToShow: 1 },
      ]}
    >
      {/* {OurStoriesArr.map((item) => (
        <StarToSuccessCard
          Image={item?.img}
          Heading={item?.heading}
          Paragraph={item?.paragraph}
        />
      ))} */}
      {OurStoriesArr.map((item, index) => (
        <OurStoriesCardDiv key={index}>
          <OurStoriesCardContent>
            <OurStoriesCardContentRow dir="rtl" gutter={[24, 24]}>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <OurStoriesH1>{item?.title_ar}</OurStoriesH1>
                <OurStoriesP>{item?.description_ar} </OurStoriesP>
                {/* <CustomButton
                  customStyle={{ backgroundColor: "#105F43", color: "#fff" }}
                >
                  {read_more}
                </CustomButton> */}
              </Col>
              <OurStoriesImageCol xl={12} lg={12} md={12} sm={24} xs={24}>
                <EndDiv></EndDiv>
                {/* <img loading="lazy"src={item?.img} /> */}
                <Image alt={""} height={1000} width={1000} src={item?.image} />
              </OurStoriesImageCol>
            </OurStoriesCardContentRow>
          </OurStoriesCardContent>
        </OurStoriesCardDiv>
      ))}
    </StyledCarousel>
  );
};

export default OurStories;

const StyledCarousel = styled(Carousel)`
  .rec-dot {
    display: none !important;
  }

  .rec-slider-container {
    margin: 0 18px !important;
  }

  .rec-arrow-left {
    background: #ffffff;
    box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    &:hover {
      background: #ffffff !important;
      box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.15) !important;
      border-radius: 8px !important;
      color: #000 !important;
    }
  }
  .rec-arrow-right {
    background: #ffffff !important;
    box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.15) !important;
    border-radius: 8px !important;
    color: #000 !important;
  }
  .rec-arrow-left,
  .kXteup:hover:enabled,
  .kXteup:focus:enabled {
    color: #000 !important;
    background-color: #fff !important;
    box-shadow: 5px 5px 25px rgb(0 0 0 / 15%) !important;
  }
`;

const EndDiv = styled.div`
  display: flex;
  justify-content: end;
`;

const OurStoriesCardDiv = styled.div``;

const OurStoriesCardContent = styled.div``;

const OurStoriesCardContentRow = styled(Row)`
  align-items: center !important;
  p {
    color: #636363 !important;
  }
  @media (max-width: 992px) {
    flex-direction: column-reverse !important;
  }
`;

const OurStoriesImageCol = styled(Col)`
  img {
    width: 100%;
    object-fit: contain;
    height: 440px;
  }
`;

const OurStoriesH1 = styled.h1`
  font-family: "GESSTwoBold", sans-serif;
  color: #105f43;
  // font-weight: 700;
  font-size: 40px;
  line-height: 46px;
`;

const OurStoriesP = styled.p`
  color: #636363;
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;
  @media (max-width: 992px) {
    font-size: 14px;
    line-height: 25px;
  }
`;
