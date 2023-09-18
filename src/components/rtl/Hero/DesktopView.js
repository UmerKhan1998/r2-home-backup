import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
// import parse from "html-react-parser";
import {
  BackgroundRectangle,
  BackgroundRectangle1,
  OverlayImage1,
  OverlayImage2,
  OverlayImage3,
  OverlayImage4,
  OverlayImage5,
  OverlayImage6,
  OverlayImage7,
  ClockWhite,
  WhiteUserAvatar,
  WhiteOnline,
  ProgramOverlayImage1,
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
  Tag,
} from "antd";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import CustomButton from "../Button";

import "aos/dist/aos.css";
import Aos from "aos";

import Carousel from "react-elastic-carousel";
import { useLayoutEffect } from "react";
import {
  AcademicStudiesHeroText,
  associate_executive_administration,
  conferences,
  contact_us,
  courses,
  courses_landing_hero_text,
  Discounted,
  EngagingAboutHeroHead,
  enrolledText,
  free,
  latestNewsResources,
  LearningInstituteHeroText,
  LearningInstituteText,
  Medical,
  online,
  onsite,
  privacy_policy,
  programs,
  request,
  SearchText,
  SelfPaced,
  services,
  simulationHeroText,
  SubjectQualification,
  symposiums,
  terms_of_use,
  trainings,
  webinar,
  webinars,
  workshops,
} from "../../../helpers/LanguageConstant";
import router from "next/router";
import parse from "html-react-parser";
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
  getAllRecordFunc1,
  getAllCoursesRecordFilterState,
  sliderData,
  title,
  background,
  image,
  background_color,
  type,
  typeSearch,
}) => {
  const [propertyFilter, setPropertyFilter] = useState("property");
  const [rentChangeState, setRentChangeState] = useState("buy");
  const [selectTag, setSelectTag] = useState({ id: 1, name: "Yearly" });
  const [buySelectTag, setBuySelectTag] = useState({ id: 1, name: "All" });

  const [search, setSearch] = useState({});
  const [loadingHead, setLoadingHead] = useState(false);
  const [loadingClick, setLoadingClick] = useState(false);

  const [carouselIndex, setCarouselIndex] = useState(0);

  const onChange = (e) => {
    setPropertyFilter(e.target.value);
  };

  const carouselTotalCount = useSelector(
    (state) => state?.sliderDataTotalReducer?.counts
  );
  //console.log("carouselTotalCount", carouselTotalCount);

  const NextSliderBtnFunc = () => {
    onScale();
    onTranslate();
    onHeroHeading();
    onHeroHeading1();
    onHeroHeading2();
    onOpacity();
    onOpacity1();
    onOpacity2();
    setLoadingHead(true);
    // setLoadingClick(true);

    if (carouselIndex < carouselTotalCount) {
      setCarouselIndex(carouselIndex + 1);
    }
  };

  const PreviousSliderBtnFunc = () => {
    onScale();
    onTranslate();
    onHeroHeading();
    onHeroHeading1();
    onHeroHeading2();
    onOpacity();
    onOpacity1();
    onOpacity2();
    setLoadingHead(true);
    // setLoadingClick(true);

    if (carouselIndex > -1) {
      setCarouselIndex(carouselIndex - 1);
    }
  };

  useLayoutEffect(() => {
    if (!loadingClick) {
      Aos.init();
      setTimeout(() => {
        NextSliderBtnFunc();
      }, 7000);
    }
  }, [carouselIndex]);

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

  const heroCarouselArr = [
    {
      img: BackgroundRectangle,
      overlay_image: OverlayImage1,
      overlay_image2: OverlayImage2,
      overlay_image3: OverlayImage3,
      overlay_image4: OverlayImage4,
      heading: "ابحث عن دورتك غير حياتك.",
      paragraph: "تعلم R2عبارة عن منصة مثيرة للاهتمام ستعلمك المزيد و",
      color: "#105F43",
      height: "590px",
      width: "890px",
    },
    {
      img: BackgroundRectangle1,
      overlay_image: Banner1,
      overlay_image2: OverlayImage2,
      overlay_image3: OverlayImage3,
      overlay_image4: Banner1,
      heading: "مطلوب ترخيص SCFHS تمرين",
      paragraph: "تعلم R2عبارة عن منصة مثيرة للاهتمام ستعلمك المزيد و",
      color: "#A87E33",
      height: "530px",
      width: "890px",
    },
    {
      img: BackgroundRectangle,
      overlay_image: Banner2,
      overlay_image2: OverlayImage2,
      overlay_image3: OverlayImage3,
      overlay_image4: Banner2,
      heading: "تدريب المحاكاة",
      paragraph: "تعلم R2عبارة عن منصة مثيرة للاهتمام ستعلمك المزيد و",
      color: "#105F43",
      width: "650px",
      height: "530px",
    },
    {
      img: BackgroundRectangle1,
      overlay_image: Banner3,
      overlay_image2: OverlayImage2,
      overlay_image3: OverlayImage3,
      overlay_image4: Banner1,
      heading: "المؤتمرات وورش العمل",
      paragraph:
        "لوريم إيبسوم هو ببساطة نص شكلي يستخدم في صناعة الطباعة والتنضيد.",
      color: "#A87E33",
      height: "530px",
      width: "600px",
    },
    {
      img: BackgroundRectangle,
      overlay_image: Banner5,
      overlay_image2: OverlayImage2,
      overlay_image3: OverlayImage3,
      overlay_image4: Banner2,
      heading: "الاستشارات التربوية",
      paragraph:
        "لوريم إيبسوم هو ببساطة نص شكلي يستخدم في صناعة الطباعة والتنضيد.",
      color: "#105F43",
      width: "650px",
      height: "530px",
    },
    {
      img: BackgroundRectangle1,
      overlay_image: Banner4,
      overlay_image2: OverlayImage2,
      overlay_image3: OverlayImage3,
      overlay_image4: Banner2,
      heading: "برامج مخصصة",
      paragraph:
        "لوريم إيبسوم هو ببساطة نص شكلي يستخدم في صناعة الطباعة والتنضيد.",
      color: "#A87E33",
      height: "530px",
      width: "600px",
    },
    {
      img: BackgroundRectangle,
      overlay_image: Banner7,
      overlay_image2: OverlayImage2,
      overlay_image3: OverlayImage3,
      overlay_image4: Banner2,
      heading: "تدريب طلاب الجامعة",
      paragraph:
        "لوريم إيبسوم هو ببساطة نص شكلي يستخدم في صناعة الطباعة والتنضيد.",
      color: "#105F43",
      width: "650px",
      height: "530px",
    },
    {
      img: BackgroundRectangle1,
      overlay_image: Banner6,
      overlay_image2: OverlayImage2,
      overlay_image3: OverlayImage3,
      overlay_image4: Banner2,
      heading: "التعليم عبر الإنترنت",
      paragraph:
        "لوريم إيبسوم هو ببساطة نص شكلي يستخدم في صناعة الطباعة والتنضيد.",
      color: "#A87E33",
      width: "650px",
      height: "590px",
    },
    {
      img: BackgroundRectangle,
      overlay_image: Banner8,
      overlay_image2: OverlayImage2,
      overlay_image3: OverlayImage3,
      overlay_image4: Banner2,
      heading: "التدريب الداخلي",
      options: true,
      paraOption: ["طبي", "التمريض", "مساعد صحي", "الإدارية والفنية"],
      paragraph:
        "لوريم إيبسوم هو ببساطة نص شكلي يستخدم في صناعة الطباعة والتنضيد.",
      color: "#105F43",
      width: "780px",
      height: "530px",
    },
    {
      img: BackgroundRectangle1,
      overlay_image: Banner9,
      overlay_image2: OverlayImage2,
      overlay_image3: OverlayImage3,
      overlay_image4: Banner2,
      heading: "التدريب بعد التخرج",
      options: true,
      paraOption: ["مساكن", "الزمالات", "دبلومات الدراسات العليا"],
      paragraph:
        "لوريم إيبسوم هو ببساطة نص شكلي يستخدم في صناعة الطباعة والتنضيد.",
      color: "#A87E33",
      height: "560px",
      width: "480px",
    },
  ];

  const coursesSuggestionsArr = [
    {label:`${Discounted} ${courses}`, value:"Discounted Courses"},
    {label:`${SelfPaced} ${courses}`, value:"Self-paced Courses"},
    {label:`F2F ${courses}`, value:"F2F Courses"},
    {label:`${free} ${courses}`, value:"Free Courses"},
    {label:`${Discounted} ${courses}`, value:"Discounted"},
    {label:`${SelfPaced} ${courses}`, value:"Self-paced"},
    {label:`F2F ${courses}`, value:"F2F Courses"},
    {label:`${free} ${courses}`, value:"Free Courses"},
  ];

  const webinarsSuggestionsArr = [
    {label:`${Discounted} ${type}`, value:`Discounted ${typeSearch}`},
    {label:`${SelfPaced} ${type}`, value:`Self-paced ${typeSearch}`},
    {label:`F2F ${type}`, value:`F2F ${typeSearch}`},
    {label:`${free} ${type}`, value:`Free ${typeSearch}`},
    {label:`${Discounted} ${type}`, value:`Discounted ${typeSearch}`},
    {label:`${SelfPaced} ${type}`, value:`Self-paced ${typeSearch}`},
    // {label:`F2F ${webinars}`, value:"F2F Webinars"},
    // {label:`${free} ${webinars}`, value:"Free Webinars"},
  ];

  const trainingsSuggestionsArr = [
    {label:`${Discounted} ${trainings}`, value:"Discounted Trainings"},
    {label:`${SelfPaced} ${trainings}`, value:"Self-paced Trainings"},
    {label:`F2F ${trainings}`, value:"F2F Trainings"},
    {label:`${free} ${trainings}`, value:"Free Trainings"},
    {label:`${Discounted} ${trainings}`, value:"Discounted"},
    {label:`${SelfPaced} ${trainings}`, value:"Self-paced"},
    {label:`F2F ${trainings}`, value:"F2F Trainings"},
    {label:`${free} ${trainings}`, value:"Free Trainings"},
  ];

  const programsSuggestionsArr = [
    {label:`${Discounted} ${programs}`, value:"Discounted Programs"},
    {label:`${SelfPaced} ${programs}`, value:"Self-paced Programs"},
    {label:`F2F ${programs}`, value:"F2F Programs"},
    {label:`${free} ${programs}`, value:"Free Programs"},
    {label:`${Discounted} ${programs}`, value:"Discounted"},
    {label:`${SelfPaced} ${programs}`, value:"Self-paced"},
    {label:`F2F ${programs}`, value:"F2F Programs"},
    {label:`${free} ${programs}`, value:"Free Programs"},
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
    }, 995);

    const interval7 = setInterval(() => {
      setOpacityState2(1);
    }, 1005);

    const interval1 = setInterval(() => {
      setTranslateState(0);
      setLoadingHead(false);
    }, 700);

    const interval2 = setInterval(() => {
      setScaleState(1);
    }, 1000);

    const interval3 = setInterval(() => {
      setHeroHeadingPaddingState("8px 77px");
    }, 700);

    const interval4 = setInterval(() => {
      setHeroHeadingPaddingState1("8px 77px");
    }, 995);

    const interval5 = setInterval(() => {
      setHeroHeadingPaddingState2("8px 77px");
    }, 1005);

    const interval8 = setInterval(() => {
      setLoadingClick(false);
    }, 10000);

    if (carouselIndex === carouselTotalCount) {
      setCarouselIndex(0);
    }

    if (carouselIndex === -1) {
      setCarouselIndex(0);
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
      clearInterval(interval8);
    };
  }, [scaleState, translateState, carouselIndex, carouselTotalCount]);

  // const backendImages = `${images?.remotePatterns[0]?.protocol}://${
  //   images?.remotePatterns[0]?.hostname
  // }/${images?.remotePatterns[0]?.pathname}/${
  //   sliderData[carouselIndex]?.image?.split("/")[6]
  // }/${sliderData[carouselIndex]?.image?.split("/")[7]}`;

  const DesktopView = (
    <StyledDiv>
      {name === "home-page" && (
        <HeroContainer dir="rtl">
          <HeroBg
            style={{
              backgroundColor: sliderData[carouselIndex]?.backgroundColour,
            }}
          >
            {/* <ImgBg src={heroCarouselArr[carouselIndex]?.img} /> */}
          </HeroBg>

          <OverlayImageDiv>
            <Image loading="lazy"alt={""}
              className="rtl"
              height={590}
              width={900}
              src={sliderData[carouselIndex]?.image}
              style={{
                opacity: opacityState,
              }}
            />
          </OverlayImageDiv>

          <OverlayImageDiv2 className="rtl">
            <ImgBg
              src={heroCarouselArr[carouselIndex]?.overlay_image2}
              // className="rtl"
              style={{
                // transform: `scale(${scaleState})`,
                transition: "all 1s ease-out",
              }}
            />
          </OverlayImageDiv2>

          <OverlayImageDiv3 className="rtl">
            <ImgBg
              src={heroCarouselArr[carouselIndex]?.overlay_image3}
              className="rtl"
              style={{
                transform: `scale(${scaleState})`,
                transition: "all 1s ease-out",
              }}
            />
          </OverlayImageDiv3>
          {/* 
          <OverlayImageDiv4 className="rtl">
            <ImgBg
              className="rtl"
              src={heroCarouselArr[carouselIndex]?.overlay_image4}
            />
          </OverlayImageDiv4> */}

          <CarouselArrow>
            <ArrowDiv
              onClick={() => {
                onScale();
                onTranslate();
                onHeroHeading();
                onHeroHeading1();
                onHeroHeading2();
                onOpacity();
                onOpacity1();
                onOpacity2();
                setLoadingHead(true);
                setLoadingClick(true);

                if (carouselIndex > -1) {
                  setCarouselIndex(carouselIndex - 1);
                }
              }}
            >
              <BsChevronRight />
            </ArrowDiv>

            <ArrowDiv
              onClick={() => {
                onScale();
                onTranslate();
                onHeroHeading();
                onHeroHeading1();
                onHeroHeading2();
                onOpacity();
                onOpacity1();
                onOpacity2();
                setLoadingHead(true);
                setLoadingClick(true);

                if (carouselIndex < carouselTotalCount) {
                  setCarouselIndex(carouselIndex + 1);
                }
              }}
            >
              <BsChevronLeft />
            </ArrowDiv>
          </CarouselArrow>
          <HeroContent>
            <Container>
              {!loadingHead && (
                <>
                  <h1
                    data-aos="fade-right"
                    style={{
                      transform: `translateX(${translateState}px)`,
                      opacity: opacityState,
                      fontFamily: "'GESSTwoLight', sans-serif",
                      padding: heroHeadingPaddingState,
                    }}
                  >
                    {sliderData[carouselIndex]?.title_AR?.length>50?`${sliderData[carouselIndex]?.title_AR?.slice(0,50)}...`:sliderData[carouselIndex]?.title_AR}
                  </h1>
                  <div className={"p-div"}>
                    {heroCarouselArr[carouselIndex]?.options ? (
                      <StyledParaOptionsDiv
                        data-aos="fade-right"
                        style={{
                          transform: `translateX(${translateState}px)`,
                          opacity: opacityState1,
                          padding: heroHeadingPaddingState1,
                          flexWrap: "wrap",
                        }}
                      >
                        {heroCarouselArr[carouselIndex]?.paraOption?.map(
                          (item,index) => (
                            <div key={index}>
                              <StyledOptionDiv>
                                <div />
                              </StyledOptionDiv>
                              <p>{item}</p>
                            </div>
                          )
                        )}
                      </StyledParaOptionsDiv>
                    ) : (
                      <StyledParaDescription>
                        <p
                          className="slider_description"
                          data-aos="fade-right"
                          style={{
                            transform: `translateX(${translateState}px)`,
                            opacity: opacityState1,
                            padding: heroHeadingPaddingState1,
                          }}
                        >
                          {sliderData[carouselIndex]?.description_AR?.length>240?
                          <>
                          {parse(
                            `${sliderData[carouselIndex]?.description_AR?.slice(0,240)}...`
                            )}{" "}
                            </>
                            :
                            <>
                          {parse(
                            `${sliderData[carouselIndex]?.description_AR}`
                            )}{" "}
                            </>
                          }
                        </p>
                      </StyledParaDescription>
                    )}
                  </div>

                  <div
                    style={{
                      padding: heroHeadingPaddingState2,
                    }}
                  >
                    <CustomButton
                      customStyle={{
                        backgroundColor:
                          sliderData[carouselIndex]?.buttonColour,
                        color: "#fff",
                        transform: `translateX(${translateState}px)`,
                        opacity: opacityState2,
                      }}
                      onClick={() => router.push("/ar/register")}
                    >
                      {sliderData[carouselIndex]?.buttonTitle_AR?.length>50?`${sliderData[carouselIndex]?.buttonTitle_AR?.slice(0,50)}...`:sliderData[carouselIndex]?.buttonTitle_AR}
                    </CustomButton>
                  </div>
                </>
              )}
            </Container>
          </HeroContent>
        </HeroContainer>
      )}

      {name === "course-landing-page" && (
        <HeroContainer dir="rtl" style={{backgroundColor: background_color}}>
          {/* <HeroBg>
            <ImgBg src={BackgroundRectangle1} />
          </HeroBg> */}

          {image!==""&&
          <OverlayImageDiv6>
            <ImgBg src={image} />
          </OverlayImageDiv6>
            }

          <OverlayImageDiv2 dir="rtl">
            <ImgBg
              className="rtl"
              src={heroCarouselArr[carouselIndex]?.overlay_image2}
            />
          </OverlayImageDiv2>

          <OverlayImageDiv5>
            <ImgBg src={OverlayImage6} />
          </OverlayImageDiv5>

          <Container>
            <HeroContentCourseLanding>
              <div>
                <h1
                  style={{
                    fontFamily: "'GESSTwoLight', sans-serif",
                  }}
                >
                  {title}
                </h1>

                <SearchPanel>
                  <SearchPanelRow>
                    <Input
                      type={"text"}
                      placeholder={`${SubjectQualification}, e.g. ${Medical}`}
                      value={search?.label}
                      onChange={(e) => setSearch(e.target.value)}
                      allowClear
                    />
                    <Link
                      spy={true}
                      smooth={true}
                      offset={-30}
                      duration={500}
                      to={"courses"}
                    >
                      <CustomButton
                        customStyle={{
                          background: "#A87E33",
                          color: "#fff",
                          border: "none",
                          marginRight: 10,
                        }}
                        onClick={() =>
                          getAllRecordFunc1(
                            getAllCoursesRecordFilterState,
                            search?.value
                          )
                        }
                      >
                        {SearchText} {courses}
                      </CustomButton>
                    </Link>
                  </SearchPanelRow>
                  <StyledCarouselRow>
                    <StyledCarousel1
                      focusOnSelect={true}
                      breakPoints={[
                        { width: 1, itemsToShow: 3 },
                        {
                          width: 550,
                          itemsToShow: 3,
                          itemsToScroll: 1,
                          pagination: false,
                        },
                        { width: 850, itemsToShow: 3 },
                        { width: 1150, itemsToShow: 4, itemsToScroll: 4 },
                        { width: 1450, itemsToShow: 5 },
                        { width: 1750, itemsToShow: 6 },
                      ]}
                    >
                      {coursesSuggestionsArr?.map((item, index) => (
                        <CoursesSuggestionsP
                          onClick={() => setSearch(item)}
                          key={index}
                        >
                          {item?.label}
                        </CoursesSuggestionsP>
                      ))}
                    </StyledCarousel1>
                  </StyledCarouselRow>
                </SearchPanel>
              </div>
            </HeroContentCourseLanding>
          </Container>
        </HeroContainer>
      )}
      {name === "webinar-landing-page" && (
        <HeroContainer dir="rtl" style={{backgroundColor: background_color}}>
          {/* <HeroBg>
            <ImgBg src={BackgroundRectangle1} />
          </HeroBg> */}

          {image!==""&&
          <OverlayImageDiv6>
            <ImgBg src={image} />
          </OverlayImageDiv6>
            }

          <OverlayImageDiv2 dir="rtl">
            <ImgBg
              className="rtl"
              src={heroCarouselArr[carouselIndex]?.overlay_image2}
            />
          </OverlayImageDiv2>

          <OverlayImageDiv5>
            <ImgBg src={OverlayImage6} />
          </OverlayImageDiv5>

          <Container>
            <HeroContentCourseLanding>
              <div>
                <h1
                  style={{
                    fontFamily: "'GESSTwoLight', sans-serif",
                  }}
                >
                  {title}
                </h1>

                <SearchPanel>
                  <SearchPanelRow>
                    <Input
                      type={"text"}
                      placeholder={`${SubjectQualification}, e.g. ${Medical}`}
                      value={search?.label}
                      onChange={(e) => setSearch(e.target.value)}
                      allowClear
                    />
                    <Link
                      spy={true}
                      smooth={true}
                      offset={-30}
                      duration={500}
                      to={"courses"}
                    >
                      <CustomButton
                        customStyle={{
                          background: "#A87E33",
                          color: "#fff",
                          border: "none",
                          marginRight: 10,
                        }}
                        onClick={() =>
                          getAllRecordFunc1(
                            getAllCoursesRecordFilterState,
                            search?.value
                          )
                        }
                      >
                        {SearchText} {webinars}
                      </CustomButton>
                    </Link>
                  </SearchPanelRow>
                  <StyledCarouselRow>
                    <StyledCarousel1
                      focusOnSelect={true}
                      breakPoints={[
                        { width: 1, itemsToShow: 3 },
                        {
                          width: 550,
                          itemsToShow: 3,
                          itemsToScroll: 1,
                          pagination: false,
                        },
                        { width: 850, itemsToShow: 3 },
                        { width: 1150, itemsToShow: 4, itemsToScroll: 4 },
                        { width: 1450, itemsToShow: 5 },
                        { width: 1750, itemsToShow: 6 },
                      ]}
                    >
                      {webinarsSuggestionsArr?.map((item, index) => (
                        <CoursesSuggestionsP
                          onClick={() => setSearch(item)}
                          key={index}
                        >
                          {item?.label}
                        </CoursesSuggestionsP>
                      ))}
                    </StyledCarousel1>
                  </StyledCarouselRow>
                </SearchPanel>
              </div>
            </HeroContentCourseLanding>
          </Container>
        </HeroContainer>
      )}
      {name === "workshop-landing-page" && (
        <HeroContainer dir="rtl" style={{backgroundColor: background_color}}>
          {/* <HeroBg>
            <ImgBg src={BackgroundRectangle1} />
          </HeroBg> */}

          {image!==""&&
          <OverlayImageDiv6>
            <ImgBg src={image} />
          </OverlayImageDiv6>
            }

          <OverlayImageDiv2 dir="rtl">
            <ImgBg
              className="rtl"
              src={heroCarouselArr[carouselIndex]?.overlay_image2}
            />
          </OverlayImageDiv2>

          <OverlayImageDiv5>
            <ImgBg src={OverlayImage6} />
          </OverlayImageDiv5>

          <Container>
            <HeroContentCourseLanding>
              <div>
                <h1
                  style={{
                    fontFamily: "'GESSTwoLight', sans-serif",
                  }}
                >
                  {title}
                </h1>

                <SearchPanel>
                  <SearchPanelRow>
                    <Input
                      type={"text"}
                      placeholder={`${SubjectQualification}, e.g. ${Medical}`}
                      value={search?.label}
                      onChange={(e) => setSearch(e.target.value)}
                      allowClear
                    />
                    <Link
                      spy={true}
                      smooth={true}
                      offset={-30}
                      duration={500}
                      to={"courses"}
                    >
                      <CustomButton
                        customStyle={{
                          background: "#A87E33",
                          color: "#fff",
                          border: "none",
                          marginRight: 10,
                        }}
                        onClick={() =>
                          getAllRecordFunc1(
                            getAllCoursesRecordFilterState,
                            search?.value
                          )
                        }
                      >
                        {SearchText} {workshops}
                      </CustomButton>
                    </Link>
                  </SearchPanelRow>
                  <StyledCarouselRow>
                    <StyledCarousel1
                      focusOnSelect={true}
                      breakPoints={[
                        { width: 1, itemsToShow: 3 },
                        {
                          width: 550,
                          itemsToShow: 3,
                          itemsToScroll: 1,
                          pagination: false,
                        },
                        { width: 850, itemsToShow: 3 },
                        { width: 1150, itemsToShow: 4, itemsToScroll: 4 },
                        { width: 1450, itemsToShow: 5 },
                        { width: 1750, itemsToShow: 6 },
                      ]}
                    >
                      {webinarsSuggestionsArr?.map((item, index) => (
                        <CoursesSuggestionsP
                          onClick={() => setSearch(item)}
                          key={index}
                        >
                          {item?.label}
                        </CoursesSuggestionsP>
                      ))}
                    </StyledCarousel1>
                  </StyledCarouselRow>
                </SearchPanel>
              </div>
            </HeroContentCourseLanding>
          </Container>
        </HeroContainer>
      )}
      {name === "conference-landing-page" && (
        <HeroContainer dir="rtl" style={{backgroundColor: background_color}}>
          {/* <HeroBg>
            <ImgBg src={BackgroundRectangle1} />
          </HeroBg> */}

          {image!==""&&
          <OverlayImageDiv6>
            <ImgBg src={image} />
          </OverlayImageDiv6>
            }

          <OverlayImageDiv2 dir="rtl">
            <ImgBg
              className="rtl"
              src={heroCarouselArr[carouselIndex]?.overlay_image2}
            />
          </OverlayImageDiv2>

          <OverlayImageDiv5>
            <ImgBg src={OverlayImage6} />
          </OverlayImageDiv5>

          <Container>
            <HeroContentCourseLanding>
              <div>
                <h1
                  style={{
                    fontFamily: "'GESSTwoLight', sans-serif",
                  }}
                >
                  {title}
                </h1>

                <SearchPanel>
                  <SearchPanelRow>
                    <Input
                      type={"text"}
                      placeholder={`${SubjectQualification}, e.g. ${Medical}`}
                      value={search?.label}
                      onChange={(e) => setSearch(e.target.value)}
                      allowClear
                    />
                    <Link
                      spy={true}
                      smooth={true}
                      offset={-30}
                      duration={500}
                      to={"courses"}
                    >
                      <CustomButton
                        customStyle={{
                          background: "#A87E33",
                          color: "#fff",
                          border: "none",
                          marginRight: 10,
                        }}
                        onClick={() =>
                          getAllRecordFunc1(
                            getAllCoursesRecordFilterState,
                            search?.value
                          )
                        }
                      >
                        {SearchText} {conferences}
                      </CustomButton>
                    </Link>
                  </SearchPanelRow>
                  <StyledCarouselRow>
                    <StyledCarousel1
                      focusOnSelect={true}
                      breakPoints={[
                        { width: 1, itemsToShow: 3 },
                        {
                          width: 550,
                          itemsToShow: 3,
                          itemsToScroll: 1,
                          pagination: false,
                        },
                        { width: 850, itemsToShow: 3 },
                        { width: 1150, itemsToShow: 4, itemsToScroll: 4 },
                        { width: 1450, itemsToShow: 5 },
                        { width: 1750, itemsToShow: 6 },
                      ]}
                    >
                      {webinarsSuggestionsArr?.map((item, index) => (
                        <CoursesSuggestionsP
                          onClick={() => setSearch(item)}
                          key={index}
                        >
                          {item?.label}
                        </CoursesSuggestionsP>
                      ))}
                    </StyledCarousel1>
                  </StyledCarouselRow>
                </SearchPanel>
              </div>
            </HeroContentCourseLanding>
          </Container>
        </HeroContainer>
      )}
      {name === "symposium-landing-page" && (
        <HeroContainer dir="rtl" style={{backgroundColor: background_color}}>
          {/* <HeroBg>
            <ImgBg src={BackgroundRectangle1} />
          </HeroBg> */}

          {image!==""&&
          <OverlayImageDiv6>
            <ImgBg src={image} />
          </OverlayImageDiv6>
            }

          <OverlayImageDiv2 dir="rtl">
            <ImgBg
              className="rtl"
              src={heroCarouselArr[carouselIndex]?.overlay_image2}
            />
          </OverlayImageDiv2>

          <OverlayImageDiv5>
            <ImgBg src={OverlayImage6} />
          </OverlayImageDiv5>

          <Container>
            <HeroContentCourseLanding>
              <div>
                <h1
                  style={{
                    fontFamily: "'GESSTwoLight', sans-serif",
                  }}
                >
                  {title}
                </h1>

                <SearchPanel>
                  <SearchPanelRow>
                    <Input
                      type={"text"}
                      placeholder={`${SubjectQualification}, e.g. ${Medical}`}
                      value={search?.label}
                      onChange={(e) => setSearch(e.target.value)}
                      allowClear
                    />
                    <Link
                      spy={true}
                      smooth={true}
                      offset={-30}
                      duration={500}
                      to={"courses"}
                    >
                      <CustomButton
                        customStyle={{
                          background: "#A87E33",
                          color: "#fff",
                          border: "none",
                          marginRight: 10,
                        }}
                        onClick={() =>
                          getAllRecordFunc1(
                            getAllCoursesRecordFilterState,
                            search?.value
                          )
                        }
                      >
                        {SearchText} {symposiums}
                      </CustomButton>
                    </Link>
                  </SearchPanelRow>
                  <StyledCarouselRow>
                    <StyledCarousel1
                      focusOnSelect={true}
                      breakPoints={[
                        { width: 1, itemsToShow: 3 },
                        {
                          width: 550,
                          itemsToShow: 3,
                          itemsToScroll: 1,
                          pagination: false,
                        },
                        { width: 850, itemsToShow: 3 },
                        { width: 1150, itemsToShow: 4, itemsToScroll: 4 },
                        { width: 1450, itemsToShow: 5 },
                        { width: 1750, itemsToShow: 6 },
                      ]}
                    >
                      {webinarsSuggestionsArr?.map((item, index) => (
                        <CoursesSuggestionsP
                          onClick={() => setSearch(item)}
                          key={index}
                        >
                          {item?.label}
                        </CoursesSuggestionsP>
                      ))}
                    </StyledCarousel1>
                  </StyledCarouselRow>
                </SearchPanel>
              </div>
            </HeroContentCourseLanding>
          </Container>
        </HeroContainer>
      )}
      {name === "training-landing-page" && (
        <HeroContainer dir="rtl" style={{backgroundColor: background_color}}>
          {/* <HeroBg>
            <ImgBg src={BackgroundRectangle1} />
          </HeroBg> */}

          {image!==""&&
          <OverlayImageDiv6>
            <ImgBg src={image} />
          </OverlayImageDiv6>
            }

          <OverlayImageDiv2 dir="rtl">
            <ImgBg
              className="rtl"
              src={heroCarouselArr[carouselIndex]?.overlay_image2}
            />
          </OverlayImageDiv2>

          <OverlayImageDiv5>
            <ImgBg src={OverlayImage6} />
          </OverlayImageDiv5>

          <Container>
            <HeroContentCourseLanding>
              <div>
                <h1
                  style={{
                    fontFamily: "'GESSTwoLight', sans-serif",
                  }}
                >
                  {title}
                </h1>

                <SearchPanel>
                  <SearchPanelRow>
                    <Input
                      type={"text"}
                      placeholder={`${SubjectQualification}, e.g. ${Medical}`}
                      value={search?.label}
                      onChange={(e) => setSearch(e.target.value)}
                      allowClear
                    />
                    <Link
                      spy={true}
                      smooth={true}
                      offset={-30}
                      duration={500}
                      to={"courses"}
                    >
                      <CustomButton
                        customStyle={{
                          background: "#A87E33",
                          color: "#fff",
                          border: "none",
                          marginRight: 10,
                        }}
                        onClick={() =>
                          getAllRecordFunc1(
                            getAllCoursesRecordFilterState,
                            search?.value
                          )
                        }
                      >
                        {SearchText} {trainings}
                      </CustomButton>
                    </Link>
                  </SearchPanelRow>
                  <StyledCarouselRow>
                    <StyledCarousel1
                      focusOnSelect={true}
                      breakPoints={[
                        { width: 1, itemsToShow: 3 },
                        {
                          width: 550,
                          itemsToShow: 3,
                          itemsToScroll: 1,
                          pagination: false,
                        },
                        { width: 850, itemsToShow: 3 },
                        { width: 1150, itemsToShow: 4, itemsToScroll: 4 },
                        { width: 1450, itemsToShow: 5 },
                        { width: 1750, itemsToShow: 6 },
                      ]}
                    >
                      {trainingsSuggestionsArr?.map((item, index) => (
                        <CoursesSuggestionsP
                          onClick={() => setSearch(item)}
                          key={index}
                        >
                          {item?.label}
                        </CoursesSuggestionsP>
                      ))}
                    </StyledCarousel1>
                  </StyledCarouselRow>
                </SearchPanel>
              </div>
            </HeroContentCourseLanding>
          </Container>
        </HeroContainer>
      )}

      {name === "program-landing-page" && (
        <HeroContainer dir="rtl" style={{backgroundColor: background_color}}>
          {/* <HeroBg>
            <ImgBg src={BackgroundRectangle1} />
          </HeroBg> */}

          {image!==""&&
          <OverlayImageDiv6>
            <ImgBg src={image} />
          </OverlayImageDiv6>
            }

          <OverlayImageDiv2 dir="rtl">
            <ImgBg
              className="rtl"
              src={heroCarouselArr[carouselIndex]?.overlay_image2}
            />
          </OverlayImageDiv2>

          <OverlayImageDiv5>
            <ImgBg src={OverlayImage6} />
          </OverlayImageDiv5>

          <Container>
            <HeroContentCourseLanding>
              <div>
                <h1
                  style={{
                    fontFamily: "'GESSTwoLight', sans-serif",
                  }}
                >
                  {title}
                </h1>

                <SearchPanel>
                  <SearchPanelRow>
                    <Input
                      type={"text"}
                      placeholder={`${SubjectQualification}, e.g. ${Medical}`}
                      value={search?.label}
                      onChange={(e) => setSearch(e.target.value)}
                      allowClear
                    />
                    <Link
                      spy={true}
                      smooth={true}
                      offset={-30}
                      duration={500}
                      to={"courses"}
                    >
                      <CustomButton
                        customStyle={{
                          background: "#A87E33",
                          color: "#fff",
                          border: "none",
                          marginRight: 10,
                        }}
                        onClick={() =>
                          getAllRecordFunc1(
                            getAllCoursesRecordFilterState,
                            search?.value
                          )
                        }
                      >
                        {SearchText} {programs}
                      </CustomButton>
                    </Link>
                  </SearchPanelRow>
                  <StyledCarouselRow>
                    <StyledCarousel1
                      focusOnSelect={true}
                      breakPoints={[
                        { width: 1, itemsToShow: 3 },
                        {
                          width: 550,
                          itemsToShow: 3,
                          itemsToScroll: 1,
                          pagination: false,
                        },
                        { width: 850, itemsToShow: 3 },
                        { width: 1150, itemsToShow: 4, itemsToScroll: 4 },
                        { width: 1450, itemsToShow: 5 },
                        { width: 1750, itemsToShow: 6 },
                      ]}
                    >
                      {programsSuggestionsArr?.map((item, index) => (
                        <CoursesSuggestionsP
                          onClick={() => setSearch(item)}
                          key={index}
                        >
                          {item?.label}
                        </CoursesSuggestionsP>
                      ))}
                    </StyledCarousel1>
                  </StyledCarouselRow>
                </SearchPanel>
              </div>
            </HeroContentCourseLanding>
          </Container>
        </HeroContainer>
      )}

      {name === "about-us-page" && (
        <HeroContainerAboutUs dir="rtl">
          <HeroBgAboutUs style={{ backgroundColor: background }}>
            <ImgBgAboutUs className="rtl" src={BackgroundRectangle1} />
          </HeroBgAboutUs>

          {image!==""&&
          <OverlayImageAboutUsDiv6>
            <ImgBgAboutUs className="rtl" src={image} />
          </OverlayImageAboutUsDiv6>
          }

          <OverlayImageDiv2AboutUs dir="rtl">
            <ImgBgAboutUs
              className="rtl"
              src={heroCarouselArr[carouselIndex]?.overlay_image2}
            />
          </OverlayImageDiv2AboutUs>

          <OverlayImageDiv5AboutUs>
            <ImgBgAboutUs src={OverlayImage6} />
          </OverlayImageDiv5AboutUs>

          <HeroContent1AboutUs>
            <AboutUsContainer>
              <h1
                style={{
                  fontFamily: "'GESSTwoLight', sans-serif",
                  fontSize: 40,
                  letterSpacing: "1.5px",
                  lineHeight: "55px",
                }}
              >
                {title}
              </h1>
            </AboutUsContainer>
          </HeroContent1AboutUs>
        </HeroContainerAboutUs>
      )}

      {name === "course-detail" && (
        <HeroContainer1>
          <HeroBg1>
            <ImgBg src={BackgroundRectangle1} />
          </HeroBg1>

          <OverlayImageDiv8>
            <ImgBg src={OverlayImage7} />
          </OverlayImageDiv8>

          <OverlayImageDiv7>
            <ImgBg src={OverlayImage6} />
          </OverlayImageDiv7>

          <CourseDetailHeroContent2>
            <AboutUsContainer dir="rtl">
              {loading ? (
                <h1
                  style={{
                    fontFamily: "'GESSTwoLight', sans-serif",
                    letterSpacing: "1px",
                  }}
                >
                  ...
                </h1>
              ) : (
                <h1
                  style={{
                    fontFamily: "'GESSTwoLight', sans-serif",
                    letterSpacing: "1px",
                  }}
                >
                  {parse(`${title_en}`)}
                </h1>
              )}

              {/* <p className="para-detail">{parse(`${summary_en}`)}</p> */}

              <CourseDetailsEnorllmentRow>
                {/* <CourseDetailsEnorllmentCol span={3}> */}
                <CourseDetailsEnorllmentDiv>
                  <Image loading="lazy"src={ClockWhite} height={20} width={20} />
                  <p className="course-hour">{time_duration_en}</p>
                </CourseDetailsEnorllmentDiv>
                {/* </CourseDetailsEnorllmentCol> */}
                {/* <CourseDetailsEnorllmentCol span={4}> */}
                <CourseDetailsEnorllmentDiv>
                  <Image loading="lazy"src={WhiteUserAvatar} height={20} width={20} />
                  <p>
                    {enrolled} {enrolledText}
                  </p>
                </CourseDetailsEnorllmentDiv>
                {/* </CourseDetailsEnorllmentCol> */}
                {/* <CourseDetailsEnorllmentCol span={4}> */}
                <CourseDetailsEnorllmentRateDiv>
                  <Rate value={rating} allowHalf disabled />
                  <p className="rate">({review_count})</p>
                  <p className="rating">{rating}</p>
                </CourseDetailsEnorllmentRateDiv>
                {/* </CourseDetailsEnorllmentCol> */}
                {/* <CourseDetailsEnorllmentCol span={1}> */}
                {subCategory === "Online" && (
                  <CourseDetailsEnorllmentDiv>
                    <Image loading="lazy"src={WhiteOnline} height={20} width={20} />
                    <p className="online">{online}</p>
                  </CourseDetailsEnorllmentDiv>
                )}
                {subCategory === "Onsite" && (
                  <CourseDetailsEnorllmentDiv>
                    <Image loading="lazy"src={OnSiteWhiteLogo} height={20} width={20} />
                    <p className="online">{onsite}</p>
                  </CourseDetailsEnorllmentDiv>
                )}
                {/* </CourseDetailsEnorllmentCol> */}
              </CourseDetailsEnorllmentRow>
            </AboutUsContainer>
          </CourseDetailHeroContent2>
        </HeroContainer1>
      )}

      {name === "program-detail" && (
        <HeroContainer1>
          <HeroBg1>
            <ImgBg src={BackgroundRectangle1} />
          </HeroBg1>

          <OverlayImageDiv8>
            <ImgBg src={OverlayImage7} />
          </OverlayImageDiv8>

          <OverlayImageDiv7>
            <ImgBg src={OverlayImage6} />
          </OverlayImageDiv7>

          <CourseDetailHeroContent2>
            <AboutUsContainer>
              <h1
                style={{
                  fontFamily: "'GESSTwoLight', sans-serif",
                  letterSpacing: "1px",
                }}
              >
                Getting Started with Student Training - Medical
              </h1>

              <p className="para-detail">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </p>

              <CourseDetailsEnorllmentRow>
                {/* <CourseDetailsEnorllmentCol span={2}> */}
                <CourseDetailsEnorllmentDiv>
                  <Image loading="lazy"src={ClockWhite} height={20} width={20} />
                  <p className="program-hour">3.5 Year</p>
                </CourseDetailsEnorllmentDiv>
                {/* </CourseDetailsEnorllmentCol> */}
                {/* <CourseDetailsEnorllmentCol span={4}> */}
                <CourseDetailsEnorllmentDiv>
                  <Image loading="lazy"src={WhiteUserAvatar} height={20} width={20} />
                  <p>320+ Enrolled</p>
                </CourseDetailsEnorllmentDiv>
                {/* </CourseDetailsEnorllmentCol> */}
                {/* <CourseDetailsEnorllmentCol span={4}> */}
                <CourseDetailsEnorllmentRateDiv>
                  <Rate value={4.9} allowHalf disabled />
                  <p className="rate">4.9</p>
                  <p>(8)</p>
                </CourseDetailsEnorllmentRateDiv>
                {/* </CourseDetailsEnorllmentCol> */}
                {/* <CourseDetailsEnorllmentCol span={2}> */}
                <CourseDetailsEnorllmentDiv>
                  <Image loading="lazy"src={OnSiteWhiteLogo} height={20} width={20} />
                  <p style={{ marginLeft: 6 }}>On-Site</p>
                </CourseDetailsEnorllmentDiv>
                {/* </CourseDetailsEnorllmentCol> */}
              </CourseDetailsEnorllmentRow>
            </AboutUsContainer>
          </CourseDetailHeroContent2>
        </HeroContainer1>
      )}

      {name === "contact" && (
        <HeroContainer1 style={{backgroundColor: background_color}}>
          {/* <HeroBg1>
            <ImgBg src={BackgroundRectangle1} />
          </HeroBg1> */}

          <OverlayImageDiv8>
            <ImgBg src={OverlayImage2} />
          </OverlayImageDiv8>

          <OverlayImageDiv7>
            <ImgBg src={OverlayImage6} />
          </OverlayImageDiv7>

          <CourseDetailHeroContent2>
            <AboutUsContainer>
              <h1
                style={{
                  fontFamily: "'GESSTwoLight', sans-serif",
                  letterSpacing: "1px",
                  textAlign: "center",
                }}
              >
                {title}
              </h1>
            </AboutUsContainer>
          </CourseDetailHeroContent2>
        </HeroContainer1>
      )}
      {name === "latest_news_resources" && (
        <HeroContainer1>
          <HeroBg1>
            <ImgBg src={BackgroundRectangle1} />
          </HeroBg1>

          <OverlayImageDiv8>
            <ImgBg src={OverlayImage2} />
          </OverlayImageDiv8>

          <OverlayImageDiv7>
            <ImgBg src={OverlayImage6} />
          </OverlayImageDiv7>

          <CourseDetailHeroContent2>
            <AboutUsContainer>
              <h1
                style={{
                  fontFamily: "'GESSTwoBold', sans-serif",
                  letterSpacing: "1px",
                  textAlign: "center",
                }}
              >
                {latestNewsResources}
              </h1>
            </AboutUsContainer>
          </CourseDetailHeroContent2>
        </HeroContainer1>
      )}
      {name === "associate-executive-administration" && (
        <AssociateHeroContainer>
          <AssociateHeroBg1>
            <ImgBg src={BackgroundRectangle1} />
          </AssociateHeroBg1>
          {/* 
          <OverlayImageDiv6>
            <ImgBg src={OverlayImage5} />
          </OverlayImageDiv6> */}

          <AssociateOverlayImageDiv8>
            <ImgBg src={OverlayImage2} />
          </AssociateOverlayImageDiv8>

          {/* <OverlayImageDiv4>
            <ImgBg src={heroCarouselArr[carouselIndex]?.overlay_image4} />
          </OverlayImageDiv4> */}

          <AssociateExecutiveAdministrationHeroContent2>
            <h1
              style={{
                fontFamily: "'GESSTwoLight', sans-serif",
              }}
            >
              {title}
            </h1>
          </AssociateExecutiveAdministrationHeroContent2>
        </AssociateHeroContainer>
      )}
      {name === "service-request" && (
        <AssociateHeroContainer style={{backgroundColor: background_color}}>
          {/* <AssociateHeroBg1>
            <ImgBg src={BackgroundRectangle1} />
          </AssociateHeroBg1> */}
          {/* 
          <OverlayImageDiv6>
            <ImgBg src={OverlayImage5} />
          </OverlayImageDiv6> */}

          <AssociateOverlayImageDiv8>
            <ImgBg src={OverlayImage2} />
          </AssociateOverlayImageDiv8>

          {/* <OverlayImageDiv4>
            <ImgBg src={heroCarouselArr[carouselIndex]?.overlay_image4} />
          </OverlayImageDiv4> */}

          <AssociateExecutiveAdministrationHeroContent2>
            <h1
              style={{
                fontFamily: "'GESSTwoLight', sans-serif",
              }}
            >
              {title}
            </h1>
          </AssociateExecutiveAdministrationHeroContent2>
        </AssociateHeroContainer>
      )}
      {name === "privacy-policy" && (
        <AssociateHeroContainer>
          <AssociateHeroBg1>
            <ImgBg src={BackgroundRectangle1} />
          </AssociateHeroBg1>
          {/* 
          <OverlayImageDiv6>
            <ImgBg src={OverlayImage5} />
          </OverlayImageDiv6> */}

          <AssociateOverlayImageDiv8>
            <ImgBg src={OverlayImage2} />
          </AssociateOverlayImageDiv8>

          {/* <OverlayImageDiv4>
            <ImgBg src={heroCarouselArr[carouselIndex]?.overlay_image4} />
          </OverlayImageDiv4> */}

          <AssociateExecutiveAdministrationHeroContent2>
            <h1
              style={{
                fontFamily: "'GESSTwoLight', sans-serif",
              }}
            >
              {title}
            </h1>
          </AssociateExecutiveAdministrationHeroContent2>
        </AssociateHeroContainer>
      )}
      {name === "terms" && (
        <AssociateHeroContainer>
          <AssociateHeroBg1>
            <ImgBg src={BackgroundRectangle1} />
          </AssociateHeroBg1>
          {/* 
          <OverlayImageDiv6>
            <ImgBg src={OverlayImage5} />
          </OverlayImageDiv6> */}

          <AssociateOverlayImageDiv8>
            <ImgBg src={OverlayImage2} />
          </AssociateOverlayImageDiv8>

          {/* <OverlayImageDiv4>
            <ImgBg src={heroCarouselArr[carouselIndex]?.overlay_image4} />
          </OverlayImageDiv4> */}

          <AssociateExecutiveAdministrationHeroContent2>
            <h1
              style={{
                fontFamily: "GESSTwoBold, sans-serif",
              }}
            >
              {title}
            </h1>
          </AssociateExecutiveAdministrationHeroContent2>
        </AssociateHeroContainer>
      )}
      {name === "learning-institute" && (
        <AssociateHeroContainer style={{backgroundColor: background_color}}>
          {/* <AssociateHeroBg1>
            <ImgBg src={BackgroundRectangle1} />
          </AssociateHeroBg1> */}
          {/* 
          <OverlayImageDiv6>
            <ImgBg src={OverlayImage5} />
          </OverlayImageDiv6> */}

          <AssociateOverlayImageDiv8>
            <ImgBg src={OverlayImage2} />
          </AssociateOverlayImageDiv8>

          {/* <OverlayImageDiv4>
            <ImgBg src={heroCarouselArr[carouselIndex]?.overlay_image4} />
          </OverlayImageDiv4> */}

          <AssociateExecutiveAdministrationHeroContent2>
            <h1
              style={{
                fontFamily: "'GESSTwoLight', sans-serif",
                textAlign: "center",
                width: 640,
              }}
            >
              {title}
            </h1>
          </AssociateExecutiveAdministrationHeroContent2>
        </AssociateHeroContainer>
      )}
      {name === "academic-studies" && (
        <AssociateHeroContainer style={{backgroundColor: background_color}}>
          {/* <AssociateHeroBg1>
            <ImgBg src={BackgroundRectangle1} />
          </AssociateHeroBg1> */}
          {/* 
          <OverlayImageDiv6>
            <ImgBg src={OverlayImage5} />
          </OverlayImageDiv6> */}

          <AssociateOverlayImageDiv8>
            <ImgBg src={OverlayImage2} />
          </AssociateOverlayImageDiv8>

          {/* <OverlayImageDiv4>
            <ImgBg src={heroCarouselArr[carouselIndex]?.overlay_image4} />
          </OverlayImageDiv4> */}

          <AssociateExecutiveAdministrationHeroContent2>
            <h1
              style={{
                fontFamily: "'GESSTwoLight', sans-serif",
                textAlign: "center",
                width: 640,
              }}
            >
              {title}
            </h1>
          </AssociateExecutiveAdministrationHeroContent2>
        </AssociateHeroContainer>
      )}
      {name === "simulation" && (
        <AssociateHeroContainer style={{backgroundColor: background_color}}>
          {/* <AssociateHeroBg1>
            <ImgBg src={BackgroundRectangle1} />
          </AssociateHeroBg1> */}
          {/* 
          <OverlayImageDiv6>
            <ImgBg src={OverlayImage5} />
          </OverlayImageDiv6> */}

          <AssociateOverlayImageDiv8>
            <ImgBg src={OverlayImage2} />
          </AssociateOverlayImageDiv8>

          {/* <OverlayImageDiv4>
            <ImgBg src={heroCarouselArr[carouselIndex]?.overlay_image4} />
          </OverlayImageDiv4> */}

          <AssociateExecutiveAdministrationHeroContent2>
            <h1
              style={{
                fontFamily: "'GESSTwoLight', sans-serif",
                textAlign: "center",
                width: 640,
              }}
            >
              {title}
            </h1>
          </AssociateExecutiveAdministrationHeroContent2>
        </AssociateHeroContainer>
      )}
    </StyledDiv>
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

  return <>{DesktopView}</>;
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
    border: 0 !important;
    outline: 0 !important;
    box-shadow: none !important;

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
    border: 0 !important;
    outline: 0 !important;
    box-shadow: none !important;
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
    border: 0 !important;
    outline: 0 !important;
    box-shadow: none !important;
    // margin-top: 9px !important;
    margin-left: -20px !important;
  }

  .rec-arrow-right {
    background: transparent !important;
    border-radius: 8px !important;
    color: #fff !important;
    border: 0 !important;
    outline: 0 !important;
    box-shadow: none !important;
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
    object-fit: cover !important;
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
  align-items: end;
  width: 100%;
  img {
    height: 435px;
    width: 853px;
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
    font-family: GESSTwoLight;
  }

  .online {
    margin-right: 6px !important;
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
    margin-inline: 5px;
    font-family: GESSTwoBold;
  }
  .ant-rate-star {
    margin-right: 8px !important;
  }
  .rating {
    font-family: GESSTwoBold;
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

const StyledParaOptionsDiv = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-bottom: 0px;
    margin-right: 10px;
  }
  div {
    display: flex;
    align-items: center;
  }
`;

const StyledOptionDiv = styled.div`
  border: 3px solid rgba(255, 255, 255, 0.23);
  height: 14px;
  width: 15px;
  border-radius: 2px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    background-color: #fff !important;
    height: 90% !important;
    width: 90% !important;
    border-radius: 2px !important;
  }
`;
const StyledParaDescription = styled.div`
  .slider_description ol {
    list-style: none !important;
    padding-right: 0 !important;
  }
  ol {
    display: flex !important;
    gap: 10px !important;
    flex-wrap: wrap !important;
  }
  ol li {
    position: relative;
    padding-right: 20px;

    ::before {
      top: 50%;
      transform: translateY(-50%);
      right: 0;
      position: absolute;
      content: "";
      border: 3px solid rgba(255, 255, 255, 0.23) !important;
      height: 14px !important;
      width: 15px !important;
      border-radius: 2px !important;
      margin-left: 10px !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
    }
    ::after {
      top: 50%;
      transform: translateY(-50%);
      right: 4px;
      position: absolute;
      content: "";
      border: 3px solid rgba(255, 255, 255, 0.23) !important;
      height: 7px !important;
      width: 7px !important;
      border-radius: 2px !important;
      margin-left: 10px !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      background-color: #fff !important;
      border-radius: 2px !important;
    }

    // span {
    //   background-color: #fff !important;
    //   height: 90% !important;
    //   width: 90% !important;
    //   border-radius: 2px !important;
    // }
    // ol li:before
  }
`;

const StyledDiv=styled.div`
.ant-rate-star-first{
  left: 7px !important;
}
`