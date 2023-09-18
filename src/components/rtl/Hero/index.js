import React, { useEffect, useState } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import {
  BackgroundImage,
  CommuteSearchHomeBanner,
  BackgroundRectangle,
  BackgroundRectangle1,
  OverlayImage1,
  OverlayImage2,
  OverlayImage3,
  OverlayImage4,
  OverlayImage5,
  OverlayImage6,
  OverlayImage7,
  Clock,
  ClockWhite,
  WhiteUserAvatar,
  WhiteOnline,
  OverlayImage8,
  ProgramOverlayImage1,
  OnSite,
  OnSiteWhiteLogo,
  Banner1,
  Banner2,
  Banner3,
  Banner5,
  Banner4,
  Banner7,
  Banner6,
  Banner8,
  Banner9,
} from "../../../../images";
import Image from "next/image";

import {
  Button,
  Col,
  Dropdown,
  Input,
  Menu,
  Radio,
  Rate,
  Row,
  Space,
  Tabs,
  Tag,
} from "antd";
import { CaretDownOutlined, UserOutlined } from "@ant-design/icons";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import CustomButton from "../Button";

import DesktopHeroView from "../Hero/DesktopView";
import MobileHeroView from "../Hero/MobileView";

import "aos/dist/aos.css";
import Aos from "aos";

import Carousel from "react-elastic-carousel";
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";

const { Group } = Radio;
const { Search } = Input;

const Hero = ({
  name,
  title_en,
  summary_en,
  time_duration_en,
  enrolled,
  subCategory,
  review_count,
  loading,
  rating,
  getAllRecordFunc,
  getAllRecordFunc1,
  getAllCoursesRecordFilterState,
  title,
  background,
  image,
  background_color,
  type,
  typeSearch
}) => {
  const [propertyFilter, setPropertyFilter] = useState("property");
  const [rentChangeState, setRentChangeState] = useState("buy");
  const [selectTag, setSelectTag] = useState({ id: 1, name: "Yearly" });
  const [buySelectTag, setBuySelectTag] = useState({ id: 1, name: "All" });

  const [search, setSearch] = useState("");

  const [carouselIndex, setCarouselIndex] = useState(0);

  const onChange = (e) => {
    setPropertyFilter(e.target.value);
  };

  // useLayoutEffect(() => {
  //   Aos.init();
  //   setTimeout(() => {
  //     onScale();
  //     onTranslate();
  //     onHeroHeading();
  //     onHeroHeading1();
  //     onHeroHeading2();
  //     onOpacity();
  //     onOpacity1();
  //     onOpacity2();

  //     if (carouselIndex < 3) {
  //       setCarouselIndex(carouselIndex + 1);
  //     }
  //   }, 7000);
  // }, [carouselIndex]);

  const onRentChange = (e) => {
    setRentChangeState(e.target.value);
  };

  const rentFrequencyArr = [
    { id: 1, name: "Yearly" },
    { id: 2, name: "Monthly" },
    { id: 3, name: "Weekly" },
    { id: 4, name: "Daily" },
    { id: 5, name: "Any" },
  ];

  const buyFrequencyArr = [
    { id: 1, name: "All" },
    { id: 2, name: "Ready" },
    { id: 3, name: "Off-plan" },
  ];

  const handleRentClick = (id) => {
    const filter = rentFrequencyArr?.find((item) => item?.id === id);
    setSelectTag(filter);
  };

  const handleBuyClick = (id) => {
    const filter = buyFrequencyArr?.find((item) => item?.id === id);
    setBuySelectTag(filter);
  };

  const menu = (
    <StyledNotificationMenu>
      <h1>Purpose</h1>
      <Group
        value={rentChangeState}
        onChange={onRentChange}
        style={{
          marginBottom: 16,
        }}
      >
        <Radio.Button value="buy">Buy</Radio.Button>
        <Radio.Button value="rent">Rent</Radio.Button>
      </Group>

      {rentChangeState === "buy" && (
        <>
          <h1>Completion Status</h1>
          {buyFrequencyArr?.map((item, index) => (
            <div key={index}>
              {item?.id === buySelectTag?.id ? (
                <StyledCheckedTag
                  onClick={() => handleBuyClick(item?.id)}
                  color="success"
                >
                  {item?.name}
                </StyledCheckedTag>
              ) : (
                <StyledCheckedTag1
                  onClick={() => handleBuyClick(item?.id)}
                  color="error"
                >
                  {item?.name}
                </StyledCheckedTag1>
              )}
            </div>
          ))}
        </>
      )}
      {rentChangeState === "rent" && (
        <>
          <h1>Rent Frequency</h1>
          {rentFrequencyArr?.map((item, index) => (
            <div key={index}>
              {item?.id === selectTag?.id ? (
                <StyledCheckedTag
                  onClick={() => handleRentClick(item?.id)}
                  color="success"
                >
                  {item?.name}
                </StyledCheckedTag>
              ) : (
                <StyledCheckedTag1
                  onClick={() => handleRentClick(item?.id)}
                  color="error"
                >
                  {item?.name}
                </StyledCheckedTag1>
              )}
            </div>
          ))}
        </>
      )}
      {/* {rentChangeState === "rent" && (
        <>
          <h1>Rent Frequency</h1>
          {rentFrequencyArr?.map((item, index) => (
            <>
              {item?.id === selectTag?.id ? (
                <StyledCheckedTag
                  onClick={() => handleRentClick(item?.id)}
                  color="success"
                >
                  {item?.name}
                </StyledCheckedTag>
              ) : (
                <StyledCheckedTag1
                  onClick={() => handleRentClick(item?.id)}
                  color="error"
                >
                  {item?.name}
                </StyledCheckedTag1>
              )}
            </>
          ))}
        </>
      )} */}
      <FilterButtonRow>
        <ResetButton>RESET</ResetButton>
        <DoneButton>DONE</DoneButton>
      </FilterButtonRow>
    </StyledNotificationMenu>
  );

  const registerNowStyle = {};

  const coursesSuggestionsArr = [
    "Discounted courses",
    "Self-paced courses",
    "F2F courses",
    "Free courses",
    "Discounted courses",
    "Self-paced courses",
    "F2F courses",
    "Free courses",
  ];

  const trainingsSuggestionsArr = [
    "Discounted trainings",
    "Self-paced trainings",
    "F2F trainings",
    "Free trainings",
    "Discounted trainings",
    "Self-paced trainings",
    "F2F trainings",
    "Free trainings",
  ];

  const programsSuggestionsArr = [
    "Discounted programs",
    "Self-paced programs",
    "F2F programs",
    "Free programs",
    "Discounted programs",
    "Self-paced programs",
    "F2F programs",
    "Free programs",
  ];

  const [scaleState, setScaleState] = useState(1);

  const [translateState, setTranslateState] = useState(0);

  const [opacityState, setOpacityState] = useState(1);
  const [opacityState1, setOpacityState1] = useState(1);
  const [opacityState2, setOpacityState2] = useState(1);

  const [heroHeadingPaddingState, setHeroHeadingPaddingState] =
    useState("8px 77px");

  const [heroHeadingPaddingState1, setHeroHeadingPaddingState1] =
    useState("8px 77px");

  const [heroHeadingPaddingState2, setHeroHeadingPaddingState2] =
    useState("8px 77px");

  const onScale = () => setScaleState(1.2);

  const onTranslate = () => setTranslateState(0);

  const onHeroHeading = () => setHeroHeadingPaddingState("8px 55px");

  const onHeroHeading1 = () => setHeroHeadingPaddingState1("8px 55px");

  const onHeroHeading2 = () => setHeroHeadingPaddingState2("8px 55px");

  const onOpacity = () => setOpacityState(0);
  const onOpacity1 = () => setOpacityState1(0);
  const onOpacity2 = () => setOpacityState2(0);

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      setOpacityState(1);
    }, 700);

    const interval6 = setInterval(() => {
      setOpacityState1(1);
    }, 1050);

    const interval7 = setInterval(() => {
      setOpacityState2(1);
    }, 1500);

    const interval1 = setInterval(() => {
      setTranslateState(0);
    }, 700);

    const interval2 = setInterval(() => {
      setScaleState(1);
    }, 1000);

    const interval3 = setInterval(() => {
      setHeroHeadingPaddingState("8px 77px");
    }, 700);

    const interval4 = setInterval(() => {
      setHeroHeadingPaddingState1("8px 77px");
    }, 1050);

    const interval5 = setInterval(() => {
      setHeroHeadingPaddingState2("8px 77px");
    }, 1500);

    if (carouselIndex === 3) {
      setCarouselIndex(0);
    }

    if (carouselIndex === -1) {
      setCarouselIndex(2);
    }

    return () => {
      clearInterval(interval);
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
      clearInterval(interval4);
      clearInterval(interval5);
      clearInterval(interval6);
      clearInterval(interval7);
    };
  }, [scaleState, translateState, carouselIndex]);

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

  const sliderData = useSelector((state) => state?.sliderDataReducer);
  //console.log("sliderData", sliderData);

  return (
    <>
      {isDesktop ? (
        <DesktopHeroView
          name={name}
          title_en={title_en}
          summary_en={summary_en}
          time_duration_en={time_duration_en}
          enrolled={enrolled}
          subCategory={subCategory}
          review_count={review_count}
          loading={loading}
          rating={rating}
          getAllRecordFunc1={getAllRecordFunc1}
          getAllCoursesRecordFilterState={getAllCoursesRecordFilterState}
          // sliderData={sliderData}
          sliderData={sliderData}
          title={title}
          background={background}
          image={image}
          background_color={background_color}
          type={type}
          typeSearch={typeSearch}
        />
      ) : (
        <MobileHeroView
          name={name}
          title_en={title_en}
          summary_en={summary_en}
          time_duration_en={time_duration_en}
          enrolled={enrolled}
          subCategory={subCategory}
          review_count={review_count}
          loading={loading}
          rating={rating}
          getAllRecordFunc1={getAllRecordFunc1}
          getAllCoursesRecordFilterState={getAllCoursesRecordFilterState}
          // sliderData={sliderData}
          sliderData={sliderData}
          title={title}
          background={background}
          image={image}
          background_color={background_color}
          type={type}
          typeSearch={typeSearch}
        />
      )}
    </>
  );
};

export default Hero;

const StyledCarouselRow = styled(Row)`
  margin-top: 20px;
`;

const StyledCarousel = styled(Carousel)`
  .rec-dot {
    display: none !important;
  }

  .rec-slider-container {
    margin: 0px !important;
  }
  .rec-item-wrapper {
    // height: 15px !important;
  }

  // @media (max-width: 384px) {
  //   .rec-item-wrapper {
  //     width: 100% !important;
  //   }
  // }

  .rec-arrow-left {
    display: none !important;

    background: #ffffff;
    box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    margin-left: 8px !important;
    &:hover {
      background: #ffffff !important;
      box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.15) !important;
      border-radius: 8px !important;
      color: #000 !important;
    }
    &:hover:enabled,
    &:focus:enabled {
      background: #ffffff !important;
      box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.15) !important;
      border-radius: 8px !important;
      color: #000 !important;
    }
  }
  .rec-arrow-right {
    background: transparent !important;
    border-radius: 8px !important;
    color: #fff !important;
    border: none !important;
    // margin-top: 9px !important;
  }

  .rec {
    box-shadow: none !important;
  }

  .rec-swipable {
    margin-left: -14px !important;
  }

  .rec-carousel-item {
    border-right: 1px solid #fff;
  }
  .rec-carousel-item:last-child {
    border-right: none !important;
  }
`;

const StyledCarousel1 = styled(Carousel)`
  .rec-dot {
    display: none !important;
  }

  .rec-slider-container {
    margin: 0px !important;
  }

  .rec-slider {
    margin-left: 10px !important;
  }

  .rec-item-wrapper {
    // height: 15px !important;
  }

  // @media (max-width: 384px) {
  //   .rec-item-wrapper {
  //     width: 100% !important;
  //   }
  // }

  // .rec-arrow-left {
  //   display: none !important;

  //   background: #ffffff;
  //   box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.15);
  //   border-radius: 8px;
  //   margin-left: 8px !important;
  //   &:hover {
  //     background: #ffffff !important;
  //     box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.15) !important;
  //     border-radius: 8px !important;
  //     color: #000 !important;
  //   }
  //   &:hover:enabled,
  //   &:focus:enabled {
  //     background: #ffffff !important;
  //     box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.15) !important;
  //     border-radius: 8px !important;
  //     color: #000 !important;
  //   }
  // }

  .rec-arrow-left {
    background: transparent !important;
    border-radius: 8px !important;
    color: #fff !important;
    border: none !important;
    // margin-top: 9px !important;
    margin-left: -20px !important;
  }

  .rec-arrow-right {
    background: transparent !important;
    border-radius: 8px !important;
    color: #fff !important;
    border: none !important;
    // margin-top: 9px !important;
    margin-right: -20px !important;
  }

  .rec-swipable {
    margin-left: -14px !important;
  }

  .rec-carousel-item {
    border-right: 1px solid #fff;
  }
  .rec-carousel-item:last-child {
    border-right: none !important;
  }
`;

const HeroContainer = styled.div`
  top: 76px;
  margin-bottom: 80px;
  background: #0c0c0c;
  display: flex;
  align-items: center;
  padding: 0;
  @media (min-width: 991px) {
    height: 591px;
  }
  // @media only screen and (max-width: 991px) and (min-height: 651px) {
  //   height: 880px;
  // }
  // @media (max-height: 650px) {
  //   height: 1000px;
  // }
  position: relative;
  z-index: 1;
  @media (max-width: 991px) {
    justify-content: center;
  }
  .find_btn {
    height: 52px !important;
    background-color: #28b16d !important;
    color: #fff !important;
    font-weight: 700 !important;
  }

  @media (max-width: 992px) {
    top: unset;
    height: 500px;
    margin: 0;

    h1 {
      width: 70% !important;
      font-size: 30px !important;
      line-height: 44px !important;
      padding: 0 !important;
      // font-family: "TitilliumSemiBold" !important;
    }

    .p-div {
      width: 90% !important;
      margin-bottom: 20px !important;

      p {
        padding: 0 !important;
      }
    }
  }
`;

const HeroContainer1 = styled.div`
  top: 76px;
  margin-bottom: 80px;
  background: #0c0c0c;
  display: flex;
  align-items: center;
  padding: 0;
  @media (min-width: 991px) {
    height: 390px;
  }
  // @media only screen and (max-width: 991px) and (min-height: 651px) {
  //   height: 880px;
  // }
  // @media (max-height: 650px) {
  //   height: 1000px;
  // }
  position: relative;
  z-index: 1;
  @media (max-width: 991px) {
    justify-content: center;
  }
  .find_btn {
    height: 52px !important;
    background-color: #28b16d !important;
    color: #fff !important;
    font-weight: 700 !important;
  }
`;

const AssociateHeroContainer = styled.div`
  top: 76px;
  margin-bottom: 80px;
  background: #0c0c0c;
  display: flex;
  align-items: center;
  padding: 0;
  @media (min-width: 991px) {
    height: 280px;
  }
  // @media only screen and (max-width: 991px) and (min-height: 651px) {
  //   height: 880px;
  // }
  // @media (max-height: 650px) {
  //   height: 1000px;
  // }
  position: relative;
  z-index: 1;
  @media (max-width: 991px) {
    justify-content: center;
  }
  .find_btn {
    height: 52px !important;
    background-color: #28b16d !important;
    color: #fff !important;
    font-weight: 700 !important;
  }
`;

const HeroBg = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  @media (min-width: 991px) {
    height: 591px;
  }
  // @media only screen and (max-width: 991px) and (min-height: 651px) {
  //   height: 880px;
  // }
  // @media (max-height: 650px) {
  //   height: 1000px;
  // }
  overflow: hidden;
  // @media screen and (max-height: 484px) {
  //   height: 106vh;
  // }

  @media (max-width: 992px) {
    img {
      height: 100%;
    }
  }
`;

const HeroBg1 = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  @media (min-width: 991px) {
    height: 390px;
  }
  // @media only screen and (max-width: 991px) and (min-height: 651px) {
  //   height: 880px;
  // }
  // @media (max-height: 650px) {
  //   height: 1000px;
  // }
  overflow: hidden;
  // @media screen and (max-height: 484px) {
  //   height: 106vh;
  // }
`;

const AssociateHeroBg1 = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  @media (min-width: 991px) {
    height: 280px;
  }
  // @media only screen and (max-width: 991px) and (min-height: 651px) {
  //   height: 880px;
  // }
  // @media (max-height: 650px) {
  //   height: 1000px;
  // }
  overflow: hidden;
  // @media screen and (max-height: 484px) {
  //   height: 106vh;
  // }
`;

const ImgBg = styled.img`
  width: 100%;
  @media (min-width: 991px) {
    height: 591px;
  }
  // @media only screen and (max-width: 991px) and (min-height: 651px) {
  //   height: 880px;
  // }
  // @media (max-height: 650px) {
  //   height: 1000px;
  // }
  -o-object-fit: cover;
  object-fit: cover;
  // background: #232a34;
  // opacity: 0.5;
  // @media screen and (max-height: 484px) {
  //   height: 106vh;
  // }
`;

const HeroContent = styled.div`
  z-index: 99;
  position: absolute;
  // padding: 8px 77px;
  transition: all 1s ease-in;
  display: flex;
  flex-direction: column;
  @media (min-width: 992px) {
    min-width: 100%;
    align-items: start;
  }
  @media (max-width: 991px) {
    max-width: 100%;
    align-items: start;
  }
  h1 {
    color: #fff !important;
    font-weight: 700;
    font-size: 45px;
    transition: all 1s ease 0s !important;
    width: 500px;
    // text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    // -webkit-text-stroke: 1px #000;
    font-family: arial;
    color: green;
    line-height: 52px;
    margin-bottom: 16px;
    letter-spacing: 1px;
  }
  p {
    color: rgba(255, 255, 255, 0.8) !important;
    font-size: 15px !important;
    transition: all 1s ease !important;
    margin-bottom: 6px;
    line-height: 32px;
  }
  .p-div {
    width: 600px;
    transition: all 1s ease !important;
  }
  div {
    transition: all 1s ease !important;
  }
  .register_now {
    width: none !important;
    // transition: all 1s ease 0s !important;
  }
`;

const HeroContent1 = styled.div`
  z-index: 99;
  position: absolute;
  padding: 8px 77px;
  display: flex;
  flex-direction: column;
  @media (min-width: 992px) {
    min-width: 100%;
    align-items: start;
  }
  @media (max-width: 991px) {
    max-width: 100%;
    align-items: start;
  }
  h1 {
    color: #fff !important;
    font-weight: 700;
    font-size: 45px;
    width: 440px;
    // text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    // -webkit-text-stroke: 1px #000;
    font-family: arial;
    color: green;
    line-height: 65px;
  }
  p {
    color: rgba(255, 255, 255, 0.8) !important;
  }
  .register_now {
    width: none !important;
  }
`;

const HeroContentCourseLanding = styled.div`
  z-index: 99;
  position: absolute;
  padding: 8px 77px;
  top: 150px;
  display: flex;
  flex-direction: column;
  @media (min-width: 992px) {
    min-width: 40%;
    align-items: start;
  }
  @media (max-width: 991px) {
    max-width: 100%;
    align-items: start;
  }
  h1 {
    color: #fff !important;
    font-weight: 700;
    font-size: 45px;
    width: 440px;
    // text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    // -webkit-text-stroke: 1px #000;
    font-family: arial;
    color: green;
    line-height: 65px;
  }
  p {
    color: rgba(255, 255, 255, 0.8) !important;
  }
  .register_now {
    width: none !important;
  }
`;

const HeroContent2 = styled.div`
  z-index: 99;
  position: absolute;
  padding: 8px 77px;
  display: flex;
  flex-direction: column;
  @media (min-width: 992px) {
    min-width: 100%;
    align-items: start;
  }
  @media (max-width: 991px) {
    max-width: 100%;
    align-items: start;
  }
  h1 {
    color: #fff !important;
    font-weight: 700;
    font-size: 40px;
    // width: 440px;
    // text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    // -webkit-text-stroke: 1px #000;
    font-family: arial;
    color: green;
    line-height: 52px;
  }
  .para-detail {
    color: rgba(255, 255, 255, 0.8) !important;
    width: 540px;
  }
  p {
    color: rgba(255, 255, 255, 0.8) !important;
    font-weight: 400;
    line-height: 29px;
    margin-bottom: 40px;
  }
  .register_now {
    width: none !important;
  }
`;

const CourseDetailHeroContent2 = styled.div`
  z-index: 99;
  position: absolute;
  // padding: 8px 77px;
  display: flex;
  flex-direction: column;
  @media (min-width: 992px) {
    min-width: 100%;
    align-items: start;
  }
  @media (max-width: 991px) {
    max-width: 100%;
    align-items: start;
  }
  h1 {
    color: #fff !important;
    font-weight: 700;
    font-size: 40px;
    // width: 440px;
    // text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    // -webkit-text-stroke: 1px #000;
    font-family: arial;
    color: green;
    line-height: 52px;
  }
  .para-detail {
    color: rgba(255, 255, 255, 0.8) !important;
    width: 540px;
  }
  p {
    color: rgba(255, 255, 255, 0.8) !important;
    font-weight: 400;
    line-height: 29px;
    margin-bottom: 40px;
  }
  .register_now {
    width: none !important;
  }
`;

const AssociateExecutiveAdministrationHeroContent2 = styled.div`
  z-index: 99;
  position: absolute;
  padding: 8px 77px;
  display: flex;
  flex-direction: column;
  @media (min-width: 992px) {
    min-width: 100%;
    align-items: center;
  }
  @media (max-width: 991px) {
    max-width: 100%;
    align-items: center;
  }
  h1 {
    color: #fff !important;
    font-weight: 700;
    font-size: 40px;
    // width: 440px;
    // text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    // -webkit-text-stroke: 1px #000;
    font-family: arial;
    color: green;
    line-height: 52px;
  }
  .para-detail {
    color: rgba(255, 255, 255, 0.8) !important;
    width: 540px;
  }
  p {
    color: rgba(255, 255, 255, 0.8) !important;
    font-weight: 400;
    line-height: 29px;
    margin-bottom: 40px;
  }
  .register_now {
    width: none !important;
  }
`;

const SwitchButtonDiv = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 320px;
  height: 60px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  .ant-radio-group {
    margin-bottom: 0px !important;
    display: flex;
    justify-content: space-between;
    width: 310px;
  }

  .ant-radio-button-wrapper {
    width: 150px !important;
    height: 50px !important;
    text-align: center !important;
    background: none !important;
    color: #fff !important;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    font-size: 16px;
    font-weight: 600;
  }
  .ant-radio-button-wrapper-checked {
    width: 150px !important;
    height: 50px !important;
    text-align: center !important;
    background: #fff !important;
    color: #000 !important;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
  }
  .ant-radio-button-wrapper:not(:first-child)::before {
    background-color: rgba(0, 0, 0, 0) !important;
  }
`;

const SearchBannerRow = styled(Row)`
  @media (min-width: 992px) {
    margin-bottom: 20px;
  }
  @media (max-width: 991px) {
    margin-bottom: 10px;
  }
`;

const SearchBannerDiv = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  margin-block: 20px;
  padding: 20px;
  border-radius: 10px;

  .ant-radio-group {
    margin-bottom: 0px !important;
  }
`;

const StyledDropdown = styled(Dropdown)`
  a {
    color: #fff !important;
  }
`;

const StyledAnchor = styled.a`
  color: #000 !important;
  width: 100%;
`;

const StyledSearchGoogleApi = styled(Search)`
  .ant-btn {
    display: none !important;
  }
  .ant-input-affix-wrapper {
    padding: 14px;
    border-radius: 10px !important;
  }
`;

const StyledNotificationMenu = styled(Menu)`
  @media (min-width: 992px) {
    width: 250px !important;
    padding: 10px;
    left: 74px;
    top: 20px;
    border-radius: 5px;
    line-height: 28px;
  }
  @media (max-width: 991px) {
    width: 100% !important;
    padding: 10px;
    // left: 74px;
    top: 15px;
    border-radius: 5px;
    line-height: 28px;
  }
  h1 {
    margin-bottom: 0px !important;
    margin-inline: 5px !important;
    color: #000;
    font-size: 16px;
  }
  p {
    margin-bottom: 0px !important;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .ant-dropdown-menu-item {
    margin-block: 5px;
    padding: 10px;
    border-radius: 6px;
  }
  backdrop-filter: blur(20px) !important;
  .ant-dropdown-placement-bottomRight {
    left: 690px !important;
  }
  .ant-radio-group {
    margin-bottom: 5px !important;
    border: 1px solid rgba(0, 0, 0, 0.2);
    width: 100%;
    padding: 5px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
  }
  .ant-radio-button-wrapper {
    width: 125px;
    text-align: center;
    border: none !important;
  }
  .ant-radio-button-wrapper:not(:first-child)::before {
    background-color: transparent !important;
  }
  .ant-radio-button-wrapper-checked {
    color: #28b16d !important;
    background-color: #e9f7f0 !important;
  }
  .ant-radio-button-wrapper-checked:not(
      .ant-radio-button-wrapper-disabled
    )::before {
    background-color: #fff !important;
  }
  .ant-radio-button-wrapper-checked:not(
      .ant-radio-button-wrapper-disabled
    ):first-child {
    border-color: transparent !important;
  }
  .ant-radio-button-wrapper:hover {
    color: #000 !important;
  }
`;

const AlignDiv = styled.div`
  display: flex !important;
  align-items: center !important;
  background: #fff !important;
  padding: 15px;
  border-radius: 10px;

  .anticon-caret-down {
    color: #000;
  }
`;

const SearchRow = styled(Row)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const CommuteSearchHomeBannerDiv = styled.div`
  height: 46px;
  display: flex;
  align-items: center;
  // padding-inline: 20px;

  img {
    position: absolute;
    z-index: 1;
  }
  p {
    display: flex;
    align-items: center;
    position: absolute;
    z-index: 3;
    margin-bottom: 0px;
    margin-inline: 16px;
    b {
      margin-inline: 10px;
    }
  }
  svg {
    margin-inline: 10px;
  }
`;

const BadgeDiv = styled.div`
  background-color: #ff4d4f;
  color: #fff;
  padding: 1px 10px 1px 7px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 400;
  width: 40px;
`;

const ResetSearchRow = styled(Row)`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: 20px;

  p {
    margin-bottom: 0px;
    color: #fff;
  }
`;

const ResetButton = styled(Button)`
  background-color: #fff;
  color: #006169;
  border-radius: 5px;
  border-color: #006169;
`;

const DoneButton = styled(Button)`
  background-color: #006169;
  color: #fff;
  border-radius: 5px;
`;

const FilterButtonRow = styled(Row)`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  .ant-btn {
    width: 112px !important;
  }
`;

const StyledCheckedTag = styled(Tag)`
  padding: 5px;
  border-radius: 10px;
  color: #28b16d !important;
  border-color: #28b16d !important;
  background-color: #e9f7f0 !important;
  margin-bottom: 10px;
  cursor: pointer;
`;

const StyledCheckedTag1 = styled(Tag)`
  padding: 5px;
  border-radius: 10px;
  color: #000 !important;
  border-color: #000 !important;
  background-color: #fff !important;
  margin-bottom: 10px;
  cursor: pointer;
`;

const CarouselArrow = styled.div`
  z-index: 100;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-inline: 20px;
`;

const ArrowDiv = styled.div`
  border: 1px solid;
  display: flex;
  align-items: center;
  padding: 14px;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  border: none;
  backdrop-filter: blur(20px);
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
  svg {
    font-size: 18px;
  }
`;

const OverlayImageDiv = styled.div`
  position: absolute;
  z-index: 9;
  width: 100%;
  height: 591px;
  display: flex;
  justify-content: end;
  align-items: end;
  img {
    width: 50%;
    object-fit: fill;
  }
`;

const OverlayImageDiv6 = styled.div`
  position: absolute;
  z-index: 9;
  width: 100%;
  height: 591px;
  display: flex;
  justify-content: end;
  align-items: end;
  img {
    width: 50%;
    height: 520px;
    width: 700px;
    object-fit: fill;
  }
`;

const OverlayImageDiv2 = styled.div`
  position: absolute;
  z-index: 6;
  height: 591px;
  img {
    height: 183px;
  }
`;

const OverlayImageDiv8 = styled.div`
  position: absolute;
  z-index: 6;
  height: 390px;
  img {
    height: 120px;
  }
`;

const AssociateOverlayImageDiv8 = styled.div`
  position: absolute;
  z-index: 6;
  height: 280px;
  img {
    height: 120px;
  }
`;

const OverlayImageDiv3 = styled.div`
  position: absolute;
  z-index: 6;
  height: 591px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  img {
    height: 243px;
    width: 243px;
    object-fit: contain;
  }
`;

const OverlayImageDiv4 = styled.div`
  position: absolute;
  z-index: 6;
  height: 591px;
  display: flex;
  justify-content: center;
  align-items: end;
  width: 100%;
  top: 57px;

  img {
    height: 283px;
    width: 412px;
    object-fit: fill;
    transform: rotateZ(5deg);
  }
`;

const OverlayImageDiv5 = styled.div`
  position: absolute;
  z-index: 6;
  height: 591px;
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  img {
    height: 550px;
    width: 1105px;
    object-fit: contain;
    margin-top: 41px;
  }
`;

const OverlayImageDiv7 = styled.div`
  position: absolute;
  z-index: 6;
  height: 390px;
  display: flex;
  justify-content: end;
  align-items: end;
  width: 100%;
  img {
    height: 514px;
    width: 775px;
    object-fit: contain;
  }
`;

const SearchPanel = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  padding: 20px;
  border-radius: 10px;
  height: 117px;
`;

const SearchPanelRow = styled.div`
  display: flex;
  width: 500px;
  .ant-input {
    border-radius: 5px;
  }
`;

const CoursesSuggestionsP = styled.p`
  // border-right: 1px solid #fff;
  color: #fff;
  width: none !important;
  // margin-right: 10px;
  margin-bottom: 0px !important;
  display: flex;
  align-items: center;
  // margin-top: 10px !important;
  // padding-right: 10px;
`;

const CourseDetailsEnorllmentDiv = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-bottom: 0px;
  }

  .online {
    margin-left: 6px !important;
  }

  // .course-hour {
  //   width: 120px;
  // }
  .program-hour {
    // width: 120px;
  }
`;

const CourseDetailsEnorllmentRateDiv = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-bottom: 0px;
  }
  .ant-rate {
    color: #ffaa46 !important;
    font-size: 14px !important;
    margin-right: 5px !important;
  }
  .rate {
    color: #ffaa46 !important;
    margin-right: 5px;
  }
`;

const CourseDetailsEnorllmentRow = styled(Row)`
  width: 50%;
  align-items: center;
  justify-content: space-between;
  .ant-col:nth-child(1) {
    display: flex !important;
    align-items: center !important;
    justify-content: start !important;
  }
  .ant-col:nth-child(3) {
    display: flex !important;
    align-items: center !important;
    justify-content: start !important;
  }
`;

const CourseDetailsEnorllmentCol = styled(Col)`
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
`;

// AboutUs
const HeroContainerAboutUs = styled.div`
  top: 76px;
  margin-bottom: 80px;
  background: #0c0c0c;
  display: flex;
  align-items: center;
  padding: 0;
  @media (min-width: 991px) {
    height: 520px;
  }
  // @media only screen and (max-width: 991px) and (min-height: 651px) {
  //   height: 880px;
  // }
  // @media (max-height: 650px) {
  //   height: 1000px;
  // }
  position: relative;
  z-index: 1;
  @media (max-width: 991px) {
    justify-content: center;
  }
  .find_btn {
    height: 52px !important;
    background-color: #28b16d !important;
    color: #fff !important;
    font-weight: 700 !important;
  }
`;

const HeroBgAboutUs = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  @media (min-width: 991px) {
    height: 520px;
  }
  // @media only screen and (max-width: 991px) and (min-height: 651px) {
  //   height: 880px;
  // }
  // @media (max-height: 650px) {
  //   height: 1000px;
  // }
  overflow: hidden;
  // @media screen and (max-height: 484px) {
  //   height: 106vh;
  // }
`;

const ImgBgAboutUs = styled.img`
  width: 100%;
  @media (min-width: 991px) {
    height: 520px;
  }
  // @media only screen and (max-width: 991px) and (min-height: 651px) {
  //   height: 880px;
  // }
  // @media (max-height: 650px) {
  //   height: 1000px;
  // }
  -o-object-fit: cover;
  object-fit: cover;
  // background: #232a34;
  // opacity: 0.5;
  // @media screen and (max-height: 484px) {
  //   height: 106vh;
  // }
`;

const OverlayImageAboutUsDiv6 = styled.div`
  position: absolute;
  z-index: 9;
  width: 100%;
  height: 520px;
  display: flex;
  justify-content: end;
  align-items: end;
  img {
    width: 50%;
    height: 490px;
    width: 720px;
    object-fit: fill;
  }
`;

const OverlayImageDiv2AboutUs = styled.div`
  position: absolute;
  z-index: 6;
  height: 520px;
  img {
    height: 183px;
  }
`;

const OverlayImageDiv5AboutUs = styled.div`
  position: absolute;
  z-index: 6;
  height: 520px;
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  img {
    height: 510px;
    width: 1105px;
    object-fit: contain;
    margin-top: 11px;
  }
`;

const HeroContent1AboutUs = styled.div`
  z-index: 99;
  position: absolute;
  padding: 8px 0px;
  display: flex;
  flex-direction: column;
  @media (min-width: 992px) {
    min-width: 100%;
    align-items: start;
  }
  @media (max-width: 991px) {
    max-width: 100%;
    align-items: start;
  }
  h1 {
    color: #fff !important;
    font-weight: 700;
    font-size: 45px;
    width: 440px;
    // text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    // -webkit-text-stroke: 1px #000;
    font-family: arial;
    color: green;
    line-height: 65px;
  }
  p {
    color: rgba(255, 255, 255, 0.8) !important;
  }
  .register_now {
    width: none !important;
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
    min-width: 990px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1159px) {
    min-width: 990px;
  }

  @media only screen and (min-width: 1160px) and (max-width: 1258px) {
    min-width: 1160px;
  }

  @media only screen and (min-width: 1259px) and (max-width: 1359px) {
    min-width: 1260px;
  }

  @media (min-width: 1360px) {
    min-width: 1340px;
  }
`;

const AboutUsContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  // h1 {
  //   width: 800px;
  //   white-space: nowrap;
  //   overflow: hidden;
  //   text-overflow: ellipsis;
  // }
  .para-detail {
    width: 800px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (min-width: 576px) {
    max-width: 576px;
  }
  @media (min-width: 768px) {
    max-width: 768px;
  }
  @media (min-width: 992px) {
    min-width: 992px;
  }
  @media only screen and (min-width: 1160px) and (max-width: 1258px) {
    min-width: 1160px;
  }
  @media only screen and (min-width: 1259px) and (max-width: 1359px) {
    min-width: 1260px;
  }
  @media (min-width: 1342px) {
    min-width: 1200px;
  }
`;
