import React, { useEffect, useLayoutEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import router, { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import endpoints from "../../src/api";

import SkeletonComp from "../../src/components/Skeleton";
import Preloader from "../../public/images/Preloader.gif";

import styled from "styled-components";

//actions
import {
  layoutChange,
  sliderData,
  sliderDataTotal,
  tokenAuth,
} from "../../src/redux/actions";

//next.config
import { brand } from "../../next.config";

// components
import Hero from "../../src/components/rtl/Hero";
import {
  ListingImage1,
  AboutUsImg,
  Internship,
  LicenseTraining,
  Workshop,
  StudentsTraining,
  SimulationTraining,
  PostGraduateTraining,
  OnlineEducation,
  EducationalConsultation,
  CustomizedPrograms,
  StudentsTrained,
  Interns,
  OnlineCoursesCompleted,
  CmeHours,
  FeaturedCourse1,
  FeaturedCourse2,
  FeaturedCourse3,
  FeaturedCourse4,
  FeaturedProgram1,
  FeaturedProgram2,
  FeaturedProgram3,
  FeaturedProgram4,
  FeaturedTraining1,
  FeaturedTraining3,
  FeaturedTraining2,
  FeaturedTraining4,
  LatestNewsResource1,
  LatestNewsResource2,
  LatestNewsResource3,
  SideDesign,
  LeftSideDesign,
  CardImg1,
  CardImg2,
  CardImg3,
  R2Favicon,
  ResidentsIcon,
  FellowsIcon,
  PostgraduateDiplomasIcon,
} from "../../images";
import { Avatar, Button, Col, Empty, Row } from "antd";
import OurFeaturedCourseCarousel from "../../src/components/rtl/Carousel/OurFeaturedCourse";
import StarToSucess from "../../src/components/rtl/StarToSucess";
import LatestNewsAndResources from "../../src/components/rtl/LatestNewsAndResources";
import CustomButton from "../../src/components/rtl/Button";
import Header from "../../src/components/rtl/header";
import Footer from "../../src/components/rtl/footer";
import {
  getCookies,
  removeCookies,
  setCookies,
} from "../../src/helpers/cookie";
import FeaturedCard from "../../src/components/rtl/Cards/FeaturedCard";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import LatestNewsCard from "../../src/components/rtl/Cards/LatestNewsCard";
import {
  about_us,
  about_us_para,
  conferences_workshops,
  courses,
  customized_programs,
  educational_consultations,
  Fellows,
  footer_para,
  hours,
  interns,
  internship,
  latestNewsResources,
  license_required_training,
  Newsfeed,
  offers,
  offers_para,
  online_courses_completed,
  online_education,
  our_featured,
  Postgraduate,
  Postgraduate_Diplomas,
  postgraduate_training,
  programs,
  read_more,
  Residents,
  simulation_training,
  students_trained,
  trainings,
  university_student_training,
  view_all,
  we_can_help_shape_your_future,
  whatWeOffering,
} from "../../src/helpers/LanguageConstant";

export default function Home() {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(
      tokenAuth({
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJmYzM1NWJlOS05ZTFlLTQ2NzYtYmFmNi05M2U2MjM3ZjgwODQiLCJVc2VyTmFtZSI6IkFiZHVsU2F0dGFyIiwiRW1haWwiOiJhc0BkaWdpdGFsZ3JhcGhpa3MuYWUiLCJFbXBsb3llZUlkIjoiIiwiS2V5IjoiOEMtNjUtMEYtMDctMkMtMkQtRjEtQkMtQkMtRjItOUEtOTAtNjQtMDQtREYtRUEtOUQiLCJleHAiOjE2OTg0ODYxNzcsImlzcyI6Imh0dHBzOi8vZGlnaXRhbGdyYXBoaWtzLmFlIiwiYXVkIjoiOEMtNjUtMEYtMDctMkMtMkQtRjEtQkMtQkMtRjItOUEtOTAtNjQtMDQtREYtRUEtOUQifQ.KopE7zhI1wHtFIsb8pDY-43QUCzqa8sKxjsQatxtBJ8",
        menuId: "17B77DE8-6FB3-423A-8B96-08DAB8C8C083",
      })
    );
   
    removeCookies("coursesFilterCategory")
    removeCookies("trainingFilterCategory")
    removeCookies("programFilterCategory")
  }, []);

  const [HeroLoading, setHeroLoading] = useState(true);

  const GetSliders = async () => {
    setHeroLoading(true);
    try {
      const response = await endpoints.GetSliders();
      if (response) {
        dispatch(
          sliderData(response?.data?.data?.homePageSlidersListViewModels)
        );
        dispatch(sliderDataTotal(response?.data?.data?.totalRecord));
        setHeroLoading(false);
      }
    } catch (err) {
      //console.log("err", err);
      setHeroLoading(false);
    }
  };

  useLayoutEffect(() => {
    GetSliders();
  }, []);

  const [timerCounter, setTimerCounter] = useState(3);

  // First Attempts
  useEffect(() => {
    const timer =
      timerCounter > 0 &&
      setInterval(() => setTimerCounter(timerCounter - 1), 1000);
    return () => clearInterval(timer);
  }, [timerCounter]);
  //console.log("timerCounter", timerCounter);

  const FeaturedTrainingsCarousalData = [
    {
      image: CardImg3,
      featured_type: "Dental Public Health",
      enrolled_students: 250,
      course_name: "Summer Training – Medicine",
      time: "1 Year",
      rating: 4.9,
      total_ratings: 8,
      min_price: 3500,
      max_price: 8500,
      onSite: true,
      onLine: false,
      cme: 16,
    },
    {
      image: CardImg3,
      featured_type: "General Dentistry",
      enrolled_students: 400,
      course_name: "Summer Training – Health Specialties",
      time: "1 Year",
      rating: 4,
      total_ratings: 8,
      min_price: 5500,
      max_price: 11000,
      onSite: false,
      onLine: true,
      cme: 16,
    },
    {
      image: CardImg3,
      featured_type: "Dental Assistant",
      enrolled_students: 320,
      course_name: "Collaborative Training – Medicine",
      time: "1.5 Year",
      rating: 4,
      total_ratings: 8,
      min_price: 4500,
      max_price: 9500,
      onSite: true,
      onLine: false,
      cme: 16,
    },
    {
      image: CardImg3,
      featured_type: "Dental Public Health",
      enrolled_students: 320,
      course_name: "Collaborative Training – Health Specification",
      time: "1.5 Year",
      rating: 4,
      total_ratings: 8,
      min_price: 3100,
      max_price: 7200,
      onSite: true,
      onLine: false,
      cme: 16,
    },
    {
      image: CardImg3,
      featured_type: "Dental Public Health",
      enrolled_students: 250,
      course_name: "Summer Training – Medicine",
      time: "1 Year",
      rating: 4.9,
      total_ratings: 8,
      min_price: 3500,
      max_price: 6500,
      onSite: true,
      onLine: false,
      cme: 16,
    },
    {
      image: CardImg3,
      featured_type: "General Dentistry",
      enrolled_students: 400,
      course_name: "Summer Training – Health Specialties",
      time: "1 Year",
      rating: 4,
      total_ratings: 8,
      min_price: 5500,
      max_price: 10500,
      onSite: false,
      onLine: true,
      cme: 16,
    },
    {
      image: CardImg3,
      featured_type: "Dental Assistant",
      enrolled_students: 320,
      course_name: "Collaborative Training – Medicine",
      time: "1.5 Year",
      rating: 4,
      total_ratings: 8,
      min_price: 3000,
      max_price: 7500,
      onSite: true,
      onLine: false,
      cme: 16,
    },
    {
      image: CardImg3,
      featured_type: "Dental Public Health",
      enrolled_students: 320,
      course_name: "Collaborative Training – Health Specification",
      time: "1.5 Year",
      rating: 4,
      total_ratings: 8,
      min_price: 6000,
      max_price: 12000,
      onSite: true,
      onLine: false,
      cme: 16,
    },
    {
      image: CardImg3,
      featured_type: "Dental Assistant",
      enrolled_students: 320,
      course_name: "Collaborative Training – Medicine",
      time: "1.5 Year",
      rating: 4,
      total_ratings: 8,
      min_price: 2500,
      max_price: 6500,
      onSite: true,
      onLine: false,
      cme: 16,
    },
    {
      image: CardImg3,
      featured_type: "Dental Public Health",
      enrolled_students: 320,
      course_name: "Collaborative Training – Health Specification",
      time: "1.5 Year",
      rating: 4,
      total_ratings: 8,
      min_price: 8000,
      max_price: 16400,
      onSite: true,
      onLine: false,
      cme: 16,
    },
  ];

  const FeaturedCoursesCarousalData = [
    {
      image: CardImg1,
      featured_type: "Dental Esthetics",
      enrolled_students: 32,
      course_name: "Anesthesiology",
      time: "1 hours 30 minutes",
      rating: 4.9,
      total_ratings: 8,
      min_price: 35.0,
      max_price: 90.0,
      onSite: false,
      onLine: true,
      cme: 16,
    },
    {
      image: CardImg1,
      featured_type: "Dental Esthetics",
      enrolled_students: 32,
      course_name: "Anesthesiology",
      time: "1 hours 30 minutes",
      rating: 4.9,
      total_ratings: 8,
      min_price: 0,
      max_price: 0,
      onSite: false,
      onLine: true,
      cme: 16,
    },
    {
      image: CardImg1,
      featured_type: "Oral Surgery",
      enrolled_students: 32,
      course_name: "Anesthesiology",
      time: "1 hours 30 minutes",
      rating: 4.9,
      total_ratings: 8,
      min_price: 45.0,
      max_price: 100.0,
      onSite: false,
      onLine: true,
      cme: 16,
    },
    {
      image: CardImg1,
      featured_type: "Dental Esthetics",
      enrolled_students: 32,
      course_name: "Anesthesiology",
      time: "1 hours 30 minutes",
      rating: 4.9,
      total_ratings: 8,
      min_price: 55.0,
      max_price: 120.0,
      onSite: false,
      onLine: true,
      cme: 16,
    },
    {
      image: CardImg1,
      featured_type: "Dental Esthetics",
      enrolled_students: 32,
      course_name: "Anesthesiology",
      time: "1 hours 30 minutes",
      rating: 4.9,
      total_ratings: 8,
      min_price: 35.0,
      max_price: 90.0,
      onSite: false,
      onLine: true,
      cme: 16,
    },
    {
      image: CardImg1,
      featured_type: "Dental Esthetics",
      enrolled_students: 32,
      course_name: "Anesthesiology",
      time: "1 hours 30 minutes",
      rating: 4.9,
      total_ratings: 8,
      min_price: 55.0,
      max_price: 120.0,
      onSite: false,
      onLine: true,
      cme: 16,
    },
    {
      image: CardImg1,
      featured_type: "Dental Esthetics",
      enrolled_students: 32,
      course_name: "Anesthesiology",
      time: "1 hours 30 minutes",
      rating: 4.9,
      total_ratings: 8,
      min_price: 35.0,
      max_price: 90.0,
      onSite: false,
      onLine: true,
      cme: 16,
    },
    {
      image: CardImg1,
      featured_type: "Dental Esthetics",
      enrolled_students: 32,
      course_name: "Anesthesiology",
      time: "1 hours 30 minutes",
      rating: 4.9,
      total_ratings: 8,
      min_price: 0,
      max_price: 0,
      onSite: false,
      onLine: true,
      cme: 16,
    },
    {
      image: CardImg1,
      featured_type: "Dental Esthetics",
      enrolled_students: 32,
      course_name: "Anesthesiology",
      time: "1 hours 30 minutes",
      rating: 4.9,
      total_ratings: 8,
      min_price: 55.0,
      max_price: 120.0,
      onSite: false,
      onLine: true,
      cme: 16,
    },
    {
      image: CardImg1,
      featured_type: "Dental Esthetics",
      enrolled_students: 32,
      course_name: "Anesthesiology",
      time: "1 hours 30 minutes",
      rating: 4.9,
      total_ratings: 8,
      min_price: 45.0,
      max_price: 100.0,
      onSite: false,
      onLine: true,
      cme: 16,
    },
  ];

  const [featuredCourseRecord, setFeaturedCourseRecord] = useState([]);
  const [featuredTrainingRecord, setFeaturedTrainingRecord] = useState([]);
  const [featuredProgramRecord, setFeaturedProgramRecord] = useState([]);
  const [swiper, setSwiper] = useState(null);
  const [swiper2, setSwiper2] = useState(null);
  const [swiper3, setSwiper3] = useState(null);
  const [swiper4, setSwiper4] = useState(null);

  const [loading, setLoading] = useState(false);

  const getFeaturedRecordFunc = async () => {
    try {
      // if (token && menuId) {
      const response = await endpoints
        .getFeaturedRecord
        // token,
        // menuId,
        // PageSize,
        // PageNo,
        // Language,
        // Search,
        ();
      if (response) {
        setFeaturedCourseRecord(
          response?.data?.data?.filter((item) => item?.recordType === "Course")
        );
        setFeaturedTrainingRecord(
          response?.data?.data?.filter(
            (item) => item?.recordType === "Training"
          )
        );
        setFeaturedProgramRecord(
          response?.data?.data?.filter((item) => item?.recordType === "Program")
        );
      }
      // setTotalPaginationRecord(response?.data?.data?.totalRecord)
      // setDataState(response?.data?.data?.taxListViewModels)
      // setGetTaxState(response?.data?.data)
      setLoading(true);
    } catch (err) {
      setLoading(false);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 12000);
    }
  };

  const [GetStaticPagesState, setGetStaticPagesState] = useState([]);
  const GetStaticPages = async () => {
    try {
      const response = await endpoints.GetStaticPages("home-page");
      if (response?.data?.statusCode === "200") {
        setGetStaticPagesState(response?.data?.data);
      } else if (response?.data?.statusCode === "404") {
        router.push('/ar')
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  useLayoutEffect(() => {
    GetStaticPages();
  }, []);

  const authToken = getCookies("token");
  const [
    getGetNewsAndResourcesFeatureState,
    setGetNewsAndResourcesFeatureState,
  ] = useState();
  const GetNewsAndResourcesFeatureFunc = async () => {
    try {
      const response = await endpoints.GetNewsAndResourcesFeature(authToken);
      if (response?.data?.statusCode === "200") {
        setGetNewsAndResourcesFeatureState(response?.data?.data);
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  useLayoutEffect(() => {
    getFeaturedRecordFunc();
    removeCookies("courseId");
    setCookies("notFoundArabic", true);
    GetNewsAndResourcesFeatureFunc();
  }, []);

  //=================================================Desktop View==========================================================
  const DesktopView = (
    <>
      <div className="container">
        <Head>
          <title>Riyadh Second Health Cluster</title>
          <link rel="icon" href={R2Favicon} />
        </Head>
        <body>
          <Header />
          <div>
            {!HeroLoading ? (
              <Hero name={"home-page"} />
            ) : (
              <SkeletonSliderDiv>
                {/* <Hero name={"home-page"} /> */}
              </SkeletonSliderDiv>
            )}
          </div>

          <SideDesignDiv>
            <img loading="lazy"alt={""} height={500} width={500} src={SideDesign} />
          </SideDesignDiv>

          {GetStaticPagesState?.contentValue &&
              Object.values(JSON.parse(GetStaticPagesState?.contentValue))?.map(
                (data,index) => (
                  <div key={index}>
                    {data["type"] === "text_with_image" && (<>
                      {(data["section"] !== '3') && (<>
                        {data["content"]?.align === "left" && (
                          <AboutSection>
                            <Container>
                              <StyledAboutSectionRow>
                                <StyledColImg xl={10} lg={24} md={24} sm={24} xs={24}>
                                  <img loading="lazy"alt={""}
                                    className="rtl"
                                    height={370}
                                    width={370}
                                    src={data?.content?.image}
                                  />
                                </StyledColImg>
                                <AboutUsContentCol
                                  dir="rtl"
                                  xl={10}
                                  lg={24}
                                  md={24}
                                  sm={24}
                                  xs={24}
                                >
                                  <h3>{data?.content?.title_ar}</h3>
                                  <StyledAboutUsh1>
                                    {data?.content?.title_ar}
                                  </StyledAboutUsh1>
                                  <p>{data?.content?.description_ar}</p>
                                  <StyledCustomButton
                                    onClick={() => router.push(`/ar/${data?.content?.button_link}`)}
                                    className={"read-more"}
                                  >
                                    {data?.content?.button_ar}
                                  </StyledCustomButton>
                                </AboutUsContentCol>
                              </StyledAboutSectionRow>
                            </Container>
                          </AboutSection>
                        )}
                        {data["content"]?.align === "right" && (
                          <AboutSection>
                            <Container>
                              <StyledAboutSectionRow dir="rtl">
                                <StyledColImg xl={10} lg={24} md={24} sm={24} xs={24}>
                                  <img loading="lazy"alt={""}
                                    className="rtl"
                                    height={370}
                                    width={370}
                                    src={data?.content?.image}
                                  />
                                </StyledColImg>
                                <AboutUsContentCol
                                  dir="rtl"
                                  xl={10}
                                  lg={24}
                                  md={24}
                                  sm={24}
                                  xs={24}
                                >
                                  <h3>{data?.content?.title_ar}</h3>
                                  <StyledAboutUsh1>
                                    {data?.content?.title_ar}
                                  </StyledAboutUsh1>
                                  <p>{data?.content?.description_ar}</p>
                                  <StyledCustomButton
                                    onClick={() => router.push(`/ar/${data?.content?.button_link}`)}
                                    className={"read-more"}
                                  >
                                    {data?.content?.button_ar}
                                  </StyledCustomButton>
                                </AboutUsContentCol>
                              </StyledAboutSectionRow>
                            </Container>
                          </AboutSection>
                        )}
                      </>)}
                    </>)}
                  </div>
                )
              )
            }

          <Row>
            <HeroContainer>
              <HeroContent>
                <ContainerFeaturedCards>
                  <StyledHeadingRow dir={"rtl"}>
                    <Col md={12} sm={12} xs={24}>
                      <HeroH1>
                        {our_featured} {courses}
                      </HeroH1>
                    </Col>
                    <StyledColEnd md={12} sm={12} xs={24}>
                      <CustomButton
                        customStyle={{
                          backgroundColor: "#105F43",
                          color: "#fff",
                          paddingInline: 22,
                        }}
                        onClick={() => router.push("/ar/courses-landing-page")}
                      >
                        {view_all}
                      </CustomButton>
                    </StyledColEnd>
                  </StyledHeadingRow>
                  {console.log('featuredCourseRecord', featuredCourseRecord)}                  
                {featuredCourseRecord?.length===undefined?
                  <div style={{ marginTop:40 }}>
                    <Empty/>
                  </div>
                  :  
                  <>
                  {featuredCourseRecord?.length === 3 ||
                  featuredCourseRecord?.length === 2 ||
                  featuredCourseRecord?.length === 1 ? (
                    <StyledFeaturedCardsRow dir="rtl">
                      {featuredCourseRecord?.map((items,index) => (
                        <Col lg={6} md={8} sm={12} xs={24} key={index}>
                          <FeaturedCard
                            id={items?.id}
                            Img={CardImg1}
                            FeaturedType={items?.recordType_AR}
                            EnrolledStudents={items?.enrolled}
                            CourseName={items?.title_AR}
                            Time={items?.duration_AR}
                            Rating={items?.rating}
                            TotalRatings={items?.reviewCount}
                            MinPrice={items?.priceMin}
                            MaxPrice={items?.priceMax}
                            paidFree={items?.paidFree}
                            SubCategory={items?.subCategory}
                            cme={items?.creditHours}
                            name="courses"
                            page={"home"}
                          />
                        </Col>
                      ))}
                    </StyledFeaturedCardsRow>
                  ) : (
                    <StyledDiv>
                      <OurFeaturedCourseCarousel
                        FeaturedCoursesCarousalData={
                          FeaturedCoursesCarousalData
                        }
                        featuredCourseRecord={featuredCourseRecord}
                        loading={loading}
                        name="courses"
                        page={"home"}
                      />
                    </StyledDiv>
                  )}
                  </>
                }
                </ContainerFeaturedCards>
              </HeroContent>
            </HeroContainer>
          </Row>

          <Row>
            <HeroContainer1>
              <HeroContent>
                <ContainerFeaturedCards>
                  <StyledHeadingRow dir={"rtl"}>
                    <Col md={12} sm={12} xs={24}>
                      <HeroH1>
                        {our_featured} {trainings}
                      </HeroH1>
                    </Col>
                    <StyledColEnd md={12} sm={12} xs={24}>
                      <CustomButton
                        customStyle={{
                          backgroundColor: "#105F43",
                          color: "#fff",
                          paddingInline: 22,
                        }}
                        onClick={() =>
                          router.push("/ar/trainings-landing-page")
                        }
                      >
                        {view_all}
                      </CustomButton>
                    </StyledColEnd>
                  </StyledHeadingRow>
                  
                {featuredTrainingRecord?.length===undefined?
                  <div style={{ marginTop:40 }}>
                    <Empty/>
                  </div>
                  :  
                  <>
                    {featuredTrainingRecord?.length === 3 ||
                    featuredTrainingRecord?.length === 2 ||
                    featuredTrainingRecord?.length === 1 ? (
                      <StyledFeaturedCardsRow dir="rtl">
                        {featuredTrainingRecord?.map((items, index) => (
                          <Col span={6} key={index}>
                            <FeaturedCard
                              id={items?.id}
                              Img={CardImg3}
                              FeaturedType={items?.recordType_AR}
                              EnrolledStudents={items?.enrolled}
                              CourseName={items?.title_AR}
                              Time={items?.duration_AR}
                              Rating={items?.rating}
                              TotalRatings={items?.reviewCount}
                              MinPrice={items?.priceMin}
                              MaxPrice={items?.priceMax}
                              paidFree={items?.paidFree}
                              SubCategory={items?.subCategory}
                              cme={items?.creditHours}
                              name="trainings"
                              page={"training"}
                            />
                          </Col>
                        ))}
                      </StyledFeaturedCardsRow>
                    ) : (
                      <StyledDiv>
                        <OurFeaturedCourseCarousel
                          FeaturedCoursesCarousalData={
                            FeaturedTrainingsCarousalData
                          }
                          featuredCourseRecord={featuredTrainingRecord}
                          loading={loading}
                          name="trainings"
                          page={"training"}
                        />
                      </StyledDiv>
                    )}
                  </>
                }

                  {/* <StyledDiv>
                  <OurFeaturedCourseCarousel
                    FeaturedCoursesCarousalData={FeaturedTrainingsCarousalData}
                    featuredCourseRecord={featuredTrainingRecord}
                    loading={loading}
                    name="trainings"
                    page={"home"}
                  />
                </StyledDiv> */}
                </ContainerFeaturedCards>
              </HeroContent>
            </HeroContainer1>
          </Row>

          <Row>
            <HeroContainer2>
              <HeroContent>
                <ContainerFeaturedCards>
                  <StyledHeadingRow dir={"rtl"}>
                    <Col md={12} sm={12} xs={24}>
                      <HeroH1>
                        {our_featured} {programs}
                      </HeroH1>
                    </Col>
                    <StyledColEnd md={12} sm={12} xs={24}>
                      <CustomButton
                        customStyle={{
                          backgroundColor: "#105F43",
                          color: "#fff",
                          paddingInline: 22,
                        }}
                        onClick={() => router.push("/ar/programs-landing-page")}
                      >
                        {view_all}
                      </CustomButton>
                    </StyledColEnd>
                  </StyledHeadingRow>
                  {featuredProgramRecord?.length===undefined?
                    <div style={{ marginTop:40 }}>
                      <Empty/>
                    </div>
                    :  
                    <>
                      {featuredProgramRecord?.length === 3 ||
                      featuredProgramRecord?.length === 2 ||
                      featuredProgramRecord?.length === 1 ? (
                        <StyledFeaturedCardsRow dir="rtl">
                          {featuredProgramRecord?.map((items,index) => (
                            <Col span={6} key={index}>
                              <FeaturedCard
                                id={items?.id}
                                Img={CardImg2}
                                FeaturedType={items?.recordType_AR}
                                EnrolledStudents={items?.enrolled}
                                CourseName={items?.title_AR}
                                Time={items?.duration_AR}
                                Rating={items?.rating}
                                TotalRatings={items?.reviewCount}
                                MinPrice={items?.priceMin}
                                MaxPrice={items?.priceMax}
                                paidFree={items?.paidFree}
                                SubCategory={items?.subCategory}
                                cme={items?.creditHours}
                                name="programs"
                                page={"program"}
                              />
                            </Col>
                          ))}
                        </StyledFeaturedCardsRow>
                      ) : (
                        <StyledDiv>
                          <OurFeaturedCourseCarousel
                            FeaturedCoursesCarousalData={
                              FeaturedTrainingsCarousalData
                            }
                            featuredCourseRecord={featuredProgramRecord}
                            loading={loading}
                            name="programs"
                            page={"program"}
                          />
                        </StyledDiv>
                      )}
                  </>
                }

                  {/* <StyledDiv>
                  <OurFeaturedCourseCarousel
                    FeaturedCoursesCarousalData={FeaturedProgramsCarousalData}
                    featuredCourseRecord={featuredProgramRecord}
                    loading={loading}
                    name="programs"
                    page={"home"}
                  />
                </StyledDiv> */}
                </ContainerFeaturedCards>
              </HeroContent>
            </HeroContainer2>
          </Row>

          <LeftSideDesignDiv>
            <Image alt={""} height={500} width={500} src={LeftSideDesign} />
          </LeftSideDesignDiv>

          {GetStaticPagesState?.contentValue &&
            Object.values(JSON.parse(GetStaticPagesState?.contentValue))?.map(
              (data,index) => (
                <div key={index}>
                  {data["type"] === "slider" && (<>
                    <StyledFeaturedCoursesRow>
                      <Container>
                        <StarToSucess
                          StarToSucessArr={data?.content?.sliders}
                          name="latestNews"
                          heading={data?.content?.heading_ar}
                          title={data?.content?.title_ar}
                        />
                      </Container>
                    </StyledFeaturedCoursesRow>
                  </>)}
                  {data["type"] === "text_with_image" && (<>
                    {(data["section"] === '3') && (<>
                      <Row>
                        <Container>
                          <LatestNewsAndResources
                            FeaturedLatestNewsCarousalData={
                              getGetNewsAndResourcesFeatureState
                            }
                            name="latestNews"
                            heading={data?.content?.heading_ar}
                            title={data?.content?.title_ar}
                            description={data?.content?.description_ar}
                            button={data?.content?.button_ar}
                            button_link={data?.content?.button_link}
                          />
                        </Container>
                      </Row>
                    </>)}
                  </>)}
                  {data["type"] === "text_with_widgets" && (<>
                    <MainWhatWeofferingDivSection>
                      <Container>
                        <WhatWeofferingDivSection>
                          <WhatWeOfferingRow gutter={[48, 48]} dir="rtl">
                            <WhatWeOfferingCol xl={10} lg={24} md={24} sm={24} xs={24}>
                              <h3>{data?.content?.heading_ar}</h3>
                              <h1>{data?.content?.title_ar}</h1>
                              <p>{data?.content?.description_ar}</p>
                            </WhatWeOfferingCol>
                            <WhatWeOfferingCol xl={14} lg={24} md={24} sm={24} xs={24}>
                              <div>
                                <Row gutter={[28, 28]}>
                                  {data?.content?.widgets?.map((item, index) => (
                                    <Col xl={8} lg={8} md={12} sm={12} xs={24}>
                                      <WhatWeOfferCardsDiv key={index}>
                                        {(item?.image !== "" && item?.image !== null) && (
                                          <img loading="lazy"height={50} width={50} src={item?.image} />
                                        )}
                                        <h3>{item?.title_ar}</h3>
                                      </WhatWeOfferCardsDiv>
                                    </Col>
                                  ))}
                                </Row>
                              </div>
                            </WhatWeOfferingCol>
                          </WhatWeOfferingRow>
                        </WhatWeofferingDivSection>
                      </Container>
                    </MainWhatWeofferingDivSection>
                  </>)}
                </div>
              )
            )
          }
          
          <Footer />
        </body>
      </div>
    </>
  );
  //=================================================Desktop View==========================================================

  //=================================================Mobile View==========================================================
  const MobileView = (
    <>
      {/* {timerCounter === 0 ? ( */}
      <div className="container">
        <Head>
          <title>Riyadh Second Health Cluster</title>
          <link rel="icon" href={R2Favicon} />
        </Head>
        <body>
          <Header />
          {!HeroLoading ? (
            <Hero name={"home-page"} />
          ) : (
            <SkeletonSliderDiv>
              {/* <Hero name={"home-page"} /> */}
            </SkeletonSliderDiv>
          )}

          <SideDesignDiv>
            <img loading="lazy"alt={""} height={500} width={500} src={SideDesign} />
          </SideDesignDiv>

          {/* About Section */}
          {GetStaticPagesState?.contentValue &&
            Object.values(JSON.parse(GetStaticPagesState?.contentValue))?.map(
              (data,index) => (
                <div key={index}>
                  {data["type"] === "text_with_image" && (<>
                    {(data?.content?.image !== '') && (<>
                      {data["content"]?.align === "left" && (
                        <AboutSection>
                          <Container>
                            <Row dir={"rtl"} gutter={["30px", "30px"]}>
                              <AboutUsContentCol xl={10} lg={24} md={24} sm={24} xs={24}>
                                <h3>{data?.content?.heading_ar}</h3>
                                <StyledAboutUsh1>
                                  {data?.content?.title_ar}
                                </StyledAboutUsh1>
                                <p>{data?.content?.description_ar}</p>
                                <Button
                                  style={{
                                    backgroundColor: "#105f43",
                                    color: "#fff",
                                    zIndex: 99,
                                    borderRadius: 7,
                                    height: 40,
                                  }}
                                  onClick={() => router.push(`/ar/${data?.content?.button_link}`)}
                                  className={"read-more"}
                                >
                                  {data?.content?.button_ar}
                                </Button>
                              </AboutUsContentCol>
                              <StyledColImg xl={10} lg={24} md={24} sm={24} xs={24}>
                                <img loading="lazy"alt={""} height={500} width={500} src={data?.content?.image} />
                              </StyledColImg>
                            </Row>
                          </Container>
                        </AboutSection>
                      )}
                      {data["content"]?.align === "right" && (
                        <AboutSection>
                          <Container>
                            <Row dir={"rtl"} gutter={["30px", "30px"]}>
                              <AboutUsContentCol xl={10} lg={24} md={24} sm={24} xs={24}>
                                <h3>{data?.content?.heading_ar}</h3>
                                <StyledAboutUsh1>
                                  {data?.content?.title_ar}
                                </StyledAboutUsh1>
                                <p>{data?.content?.description_ar}</p>
                                <Button
                                  style={{
                                    backgroundColor: "#105f43",
                                    color: "#fff",
                                    zIndex: 99,
                                    borderRadius: 7,
                                    height: 40,
                                  }}
                                  onClick={() => router.push(`/ar/${data?.content?.button_link}`)}
                                  className={"read-more"}
                                >
                                  {data?.content?.button_ar}
                                </Button>
                              </AboutUsContentCol>
                              <StyledColImg xl={10} lg={24} md={24} sm={24} xs={24}>
                                <img loading="lazy"alt={""} height={500} width={500} src={data?.content?.image} />
                              </StyledColImg>
                            </Row>
                          </Container>
                        </AboutSection>
                      )}
                    </>)}
                  </>)}
                </div>
              )
            )
          }

          <HeroContainer>
            <HeroContent>
              <ContainerFeaturedCards>
                <HeroH1 dir="rtl">
                  {our_featured} {courses}
                </HeroH1>
                {featuredCourseRecord?.length===undefined?
                  <div style={{ marginTop:40, marginBottom:40 }}>
                    <Empty/>
                  </div>
                  :  
                  <>
                {featuredCourseRecord?.length !== 0 ? (
                  <StyledFeaturedCardsRow dir="rtl">
                    <button
                      className="swipper_slider_btns ssb-prev"
                      onClick={() => swiper.slidePrev()}
                    >
                      <LeftOutlined style={{ color: "#A5A4A4" }} />
                    </button>
                    <button
                      className="swipper_slider_btns ssb-next"
                      onClick={() => swiper.slideNext()}
                    >
                      <RightOutlined style={{ color: "#A5A4A4" }} />
                    </button>
                    <Swiper
                      slidesPerView={"auto"}
                      spaceBetween={25}
                      onSwiper={setSwiper}
                      pagination={{
                        clickable: true,
                      }}
                      className="mySwiper"
                    >
                      {featuredCourseRecord?.map((items,index) => (
                        <div key={index}>
                        <SwiperSlide>
                          <FeaturedCard
                            id={items?.id}
                            Img={CardImg1}
                            FeaturedType={items?.recordType_AR}
                            EnrolledStudents={items?.enrolled}
                            CourseName={items?.title_AR}
                            Time={items?.duration_AR}
                            Rating={items?.rating}
                            TotalRatings={items?.reviewCount}
                            MinPrice={items?.priceMin}
                            MaxPrice={items?.priceMax}
                            paidFree={items?.paidFree}
                            SubCategory={items?.subCategory}
                            cme={items?.creditHours}
                            name="courses"
                            page={"home"}
                            />
                        </SwiperSlide>
                            </div>
                      ))}
                    </Swiper>
                  </StyledFeaturedCardsRow>
                ) : (
                  <StylesSkeletonContainer>
                    <Col lg={6} md={8} sm={11} xs={11}>
                      <SkeletonComp
                        page={"courses-landing-page"}
                        Img={CardImg1}
                      />
                    </Col>
                    <Col lg={6} md={8} sm={11} xs={11}>
                      <SkeletonComp
                        page={"courses-landing-page"}
                        Img={CardImg1}
                      />
                    </Col>
                  </StylesSkeletonContainer>
                )}
                </>
              }
              </ContainerFeaturedCards>
            </HeroContent>
            <StyledColEnd span={24}>
              <CustomButton
                customStyle={{
                  backgroundColor: "#105F43",
                  color: "#fff",
                  paddingInline: 22,
                }}
                onClick={() => router.push("/ar/courses-landing-page")}
              >
                {view_all}
              </CustomButton>
            </StyledColEnd>
          </HeroContainer>

          <HeroContainer1>
            <HeroContent>
              <ContainerFeaturedCards>
                <HeroH1 dir="rtl">
                  {our_featured} {trainings}
                </HeroH1>
                {featuredTrainingRecord?.length===undefined?
                <div style={{ marginTop:40, marginBottom:40 }}>
                  <Empty/>
                </div>
                :  
                <>
                {featuredTrainingRecord?.length !== 0 ? (
                  <StyledFeaturedCardsRow dir="rtl">
                    <button
                      className="swipper_slider_btns ssb-prev"
                      onClick={() => swiper2.slidePrev()}
                    >
                      <LeftOutlined style={{ color: "#A5A4A4" }} />
                    </button>
                    <button
                      className="swipper_slider_btns ssb-next"
                      onClick={() => swiper2.slideNext()}
                    >
                      <RightOutlined style={{ color: "#A5A4A4" }} />
                    </button>
                    <Swiper
                      slidesPerView={"auto"}
                      spaceBetween={25}
                      onSwiper={setSwiper2}
                      pagination={{
                        clickable: true,
                      }}
                      className="mySwiper"
                    >
                      {featuredTrainingRecord?.map((items,index) => (
                        <div key={index}>
                        <SwiperSlide>
                          <FeaturedCard
                            id={items?.id}
                            Img={CardImg3}
                            FeaturedType={items?.recordType_AR}
                            EnrolledStudents={items?.enrolled}
                            CourseName={items?.title_AR}
                            Time={items?.duration_AR}
                            Rating={items?.rating}
                            TotalRatings={items?.reviewCount}
                            MinPrice={items?.priceMin}
                            MaxPrice={items?.priceMax}
                            paidFree={items?.paidFree}
                            SubCategory={items?.subCategory}
                            cme={items?.creditHours}
                            name="trainings"
                            page={"training"}
                          />
                        </SwiperSlide>
                        </div>
                      ))}
                    </Swiper>
                  </StyledFeaturedCardsRow>
                ) : (
                  <StylesSkeletonContainer>
                    <Col lg={6} md={8} sm={11} xs={11}>
                      <SkeletonComp
                        page={"courses-landing-page"}
                        Img={CardImg1}
                      />
                    </Col>
                    <Col lg={6} md={8} sm={11} xs={11}>
                      <SkeletonComp
                        page={"courses-landing-page"}
                        Img={CardImg1}
                      />
                    </Col>
                  </StylesSkeletonContainer>
                )}
                </>
              }
              </ContainerFeaturedCards>
            </HeroContent>
            <StyledColEnd span={24}>
              <CustomButton
                customStyle={{
                  backgroundColor: "#105F43",
                  color: "#fff",
                  paddingInline: 22,
                }}
                onClick={() => router.push("/ar/trainings-landing-page")}
              >
                {view_all}
              </CustomButton>
            </StyledColEnd>
          </HeroContainer1>

          <HeroContainer2>
            <HeroContent>
              <ContainerFeaturedCards>
                <HeroH1 dir="rtl">
                  {our_featured} {programs}
                </HeroH1>
                {featuredProgramRecord?.length===undefined?
                  <div style={{ marginTop:40, marginBottom:40 }}>
                    <Empty/>
                  </div>
                  :  
                  <>
                {featuredProgramRecord?.length !== 0 ? (
                  <StyledFeaturedCardsRow dir="rtl">
                    <button
                      className="swipper_slider_btns ssb-prev"
                      onClick={() => swiper3.slidePrev()}
                    >
                      <LeftOutlined style={{ color: "#A5A4A4" }} />
                    </button>
                    <button
                      className="swipper_slider_btns ssb-next"
                      onClick={() => swiper3.slideNext()}
                    >
                      <RightOutlined style={{ color: "#A5A4A4" }} />
                    </button>
                    <Swiper
                      slidesPerView={"auto"}
                      spaceBetween={25}
                      onSwiper={setSwiper3}
                      pagination={{
                        clickable: true,
                      }}
                      className="mySwiper"
                    >
                      {featuredProgramRecord?.map((items,index) => (
                        <div key={index}>
                        <SwiperSlide>
                          <FeaturedCard
                            id={items?.id}
                            Img={CardImg2}
                            FeaturedType={items?.recordType_AR}
                            EnrolledStudents={items?.enrolled}
                            CourseName={items?.title_AR}
                            Time={items?.duration_AR}
                            Rating={items?.rating}
                            TotalRatings={items?.reviewCount}
                            MinPrice={items?.priceMin}
                            MaxPrice={items?.priceMax}
                            paidFree={items?.paidFree}
                            SubCategory={items?.subCategory}
                            cme={items?.creditHours}
                            name="programs"
                            page={"program"}
                            />
                        </SwiperSlide>
                            </div>
                      ))}
                    </Swiper>
                  </StyledFeaturedCardsRow>
                ) : (
                  <StylesSkeletonContainer>
                    <Col lg={6} md={8} sm={11} xs={11}>
                      <SkeletonComp
                        page={"courses-landing-page"}
                        Img={CardImg1}
                      />
                    </Col>
                    <Col lg={6} md={8} sm={11} xs={11}>
                      <SkeletonComp
                        page={"courses-landing-page"}
                        Img={CardImg1}
                      />
                    </Col>
                  </StylesSkeletonContainer>
                )}
                 </>
                }
              </ContainerFeaturedCards>
            </HeroContent>
            <StyledColEnd span={24}>
              <CustomButton
                customStyle={{
                  backgroundColor: "#105F43",
                  color: "#fff",
                  paddingInline: 22,
                }}
                onClick={() => router.push("/ar/programs-landing-page")}
              >
                {view_all}
              </CustomButton>
            </StyledColEnd>
          </HeroContainer2>

          <LeftSideDesignDiv>
            <Image alt={""} height={500} width={500} src={LeftSideDesign} />
          </LeftSideDesignDiv>

          {GetStaticPagesState?.contentValue &&
            Object.values(JSON.parse(GetStaticPagesState?.contentValue))?.map(
              (data,index) => (
                <div key={index}>
                  {data["type"] === "slider" && (<>
                    <StyledFeaturedCoursesRow>
                      <Container>
                        <StarToSucess
                          StarToSucessArr={data?.content?.sliders}
                          name="latestNews"
                          heading={data?.content?.heading_ar}
                          title={data?.content?.title_ar}
                        />
                      </Container>
                    </StyledFeaturedCoursesRow>
                  </>)}
                  {data["type"] === "text_with_image" && (<>
                    {(data?.content?.image === '') && (<>
                      <HeroContainer2>
                        <HeroContent>
                          <ContainerFeaturedCards>
                            <div dir={"rtl"}>
                              <HeroP>{data?.content?.heading_ar}</HeroP>
                              <HeroH1>{data?.content?.title_ar}</HeroH1>
                              <HeroSubPara>{data?.content?.description_ar}</HeroSubPara>
                              {getGetNewsAndResourcesFeatureState?.length>0&&
                              <CustomButton
                              customStyle={{
                                  backgroundColor: "#105F43",
                                  color: "#fff",
                                }}
                                onClick={() => router.push(`/ar/${data?.content?.button_link}`)}
                              >
                                {data?.content?.button_ar}
                              </CustomButton>
                              }
                            </div>
                            {getGetNewsAndResourcesFeatureState?.length>0?
                            <>

                            {getGetNewsAndResourcesFeatureState?.length !== 0 ? (
                              <StyledFeaturedCardsRow>
                                {getGetNewsAndResourcesFeatureState?.length >= 3 && (
                                  <>
                                    <button
                                      className="swipper_slider_btns ssb-prev"
                                      onClick={() => swiper4.slidePrev()}
                                    >
                                      <LeftOutlined style={{ color: "#A5A4A4" }} />
                                    </button>
                                    <button
                                      className="swipper_slider_btns ssb-next"
                                      onClick={() => swiper4.slideNext()}
                                    >
                                      <RightOutlined style={{ color: "#A5A4A4" }} />
                                    </button>
                                  </>
                                )}
                                <Swiper
                                  slidesPerView={"auto"}
                                  spaceBetween={15}
                                  onSwiper={setSwiper4}
                                  pagination={{
                                    clickable: true,
                                  }}
                                  className="mySwiper"
                                >
                                  {getGetNewsAndResourcesFeatureState?.map((items,index) => (
                                    <div key={index}>
                                    <SwiperSlide>
                                      <LatestNewsCard
                                        id={items?.id}
                                        ThumbnailImage={items?.thumbnailImage_EN}
                                        FeaturedType={items?.departmentName}
                                        CourseName={items?.title_EN}
                                        Description={items?.body_EN}
                                        // name={name}
                                      />
                                    </SwiperSlide>
                                    </div>
                                  ))}
                                </Swiper>
                              </StyledFeaturedCardsRow>
                            ) : (
                              <StylesSkeletonContainer>
                                <Col lg={6} md={8} sm={11} xs={11}>
                                  <SkeletonComp
                                    page={"courses-landing-page"}
                                    Img={CardImg1}
                                  />
                                </Col>
                                <Col lg={6} md={8} sm={11} xs={11}>
                                  <SkeletonComp
                                    page={"courses-landing-page"}
                                    Img={CardImg1}
                                  />
                                </Col>
                              </StylesSkeletonContainer>
                            )}
                              </>
                                                        :<div>
                                                        <Empty/>
                                                      </div>                                                      
}
                          </ContainerFeaturedCards>
                        </HeroContent>
                      </HeroContainer2>
                    </>)}
                  </>)}
                  {data["type"] === "text_with_widgets" && (<>
                    <MainWhatWeofferingDivSection>
                      <Container>
                        <WhatWeofferingDivSection>
                          <WhatWeOfferingRow gutter={[24, 24]} dir="rtl">
                            <WhatWeOfferingCol span={24}>
                              <h3>{data?.content?.heading_ar}</h3>
                              <h1>{data?.content?.title_ar}</h1>
                              <p>{data?.content?.description_ar}</p>
                            </WhatWeOfferingCol>
                            <WhatWeOfferingCol span={24}>
                              <div>
                                <Row gutter={[20, 20]}>
                                  {data?.content?.widgets?.map((item, index) => (
                                    <Col span={12}>
                                      <WhatWeOfferCardsDiv key={index}>
                                        {(item?.image !== "" && item?.image !== null) && (
                                          <img loading="lazy"alt={""} height={50} width={50} src={item?.image} />
                                        )}
                                        <h3>{item?.title_ar}</h3>
                                      </WhatWeOfferCardsDiv>
                                    </Col>
                                  ))}
                                </Row>
                              </div>
                            </WhatWeOfferingCol>
                          </WhatWeOfferingRow>
                        </WhatWeofferingDivSection>
                      </Container>
                    </MainWhatWeofferingDivSection>
                  </>)}
                </div>
              )
            )
          }

          <Footer />
        </body>
      </div>
      {/* ) : (
        <>
          <img loading="lazy"className="pre-loader" src={Preloader.src} />
        </>
      )}{" "} */}
    </>
  );
  //=================================================Mobile View==========================================================

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
}

const StyledCol = styled(Col)``;

const StyledRow = styled(Row)`
  margin-inline: 0px;
  margin-block: 30px;
`;

const AboutSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 1200px) {
    height: 500px !important;
  }
  @media (max-width: 1199px) {
    height: 680px !important;
  }
  @media (max-width: 992px) {
    display: block;
    padding: 50px 0;
    height: unset !important;
  }
`;

const StyledAboutSectionRow = styled(Row)`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  flex-direction: row-reverse;
  @media (max-width: 1199px) {
    margin-inline: 8%;
    margin-top: 0px;
  }
`;

const StyledColImg = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 370px;
    margin-top: -30px;
  }
  @media (max-width: 1199px) {
    img {
      height: 250px;
      margin-top: 0px;
    }
  }
`;

const StyledCustomButton = styled(CustomButton)`
  background-color: #105f43 !important;
  color: #fff !important;
  z-index: 99 !important;
`;

const AboutUsContentCol = styled(Col)`
  .read-more {
    z-index: 99 important;
  }

  p {
    font-size: 16px;
    margin-bottom: 20px;
    line-height: 32px !important;
  }
  h1 {
    font-size: 40px;
    // font-weight: 700;
    line-height: 46px;
    color: #105f43;
  }
  h3 {
    font-weight: 400;
    font-size: 22px;
    line-height: 34px;
    color: #000000;
  }

  @media (max-width: 991px) {
    h1 {
      font-size: 30px;
      // font-weight: 700;
      line-height: 36px;
      color: #105f43;
    }
  }
  @media (max-width: 992px) {
    h1 {
      font-size: 20px;
      margin-bottom: 8px;
    }
    h3 {
      font-size: 16px;
      line-height: 10px;
    }
    p {
      font-size: 14px;
      margin-bottom: 8px;
      line-height: unset !important;
      margin-bottom: 20px;
    }
  }
`;

const WhatWeOfferingRow = styled(Row)`
  @media (max-width: 992px) {
    margin: 0;
  }
`;

const WhatWeOfferingCol = styled(Col)`
  h1 {
    // font-weight: 700;
    font-size: 40px;
    line-height: 46px;
    color: #105f43;
    font-family: "GESSTwoBold", sans-serif;
  }
  h3 {
    font-weight: 400;
    font-size: 22px;
  }
  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 27px;
    color: #636363;
  }

  @media (max-width: 992px) {
    padding: 0;

    h1 {
      font-size: 22px;
      line-height: unset;
    }
    h3 {
      font-size: 16px;
    }
    p {
      font-size: 14px;
      line-height: unset;
    }
  }
`;

const WhatWeOfferCardsDiv = styled.div`
  display: flex;
  background: #fff;
  padding: 20px 17px;
  box-shadow: 6px 6px 25px rgba(0, 0, 0, 0.09);
  border-radius: 9px;
  height: 109px;
  align-items: center;
  justify-content: start;

  h3 {
    margin-right: 10px;
    margin-bottom: 0px;
    font-size: 14px;
    font-weight: 500;
  }
  img {
    height: 40px !important;
    width: 40px !important;
    object-fit: contain;
  }

  @media (max-width: 992px) {
    flex-direction: column;
    text-align: center;
    justify-content: center;
    height: 100%;

    h3 {
      margin-top: 8px;
      margin-left: 0;
    }
  }
`;

const MainWhatWeofferingDivSection = styled.div`
  background: rgba(16, 95, 67, 0.05);
`;

const WhatWeofferingDivSection = styled.div`
  @media (min-width: 992px) {
    padding: 70px 80px;
  }
  @media (max-width: 991px) {
    padding: 50px 4px;
  }
`;

const DesktopDiv = styled.div`
  @media (max-width: 991px) {
    display: none;
  }
`;

const MobileDiv = styled.div`
  @media (min-width: 992px) {
    display: none;
  }
`;

const HeroContainer = styled.div`
  background: #fff9ef;
  display: flex;
  justify-content: center;
  padding: 0 30px;
  // height: 103vh;
  height: 695px;
  position: relative;
  z-index: 1;
  align-items: center;
  width: 100%;
  @media (max-width: 992px) {
    display: block;
    height: auto;
    padding: 50px 20px;
  }
`;

const HeroContainer1 = styled.div`
  background: #fff;
  display: flex;
  justify-content: center;
  padding: 0 30px;
  // height: 103vh;
  height: 695px;
  position: relative;
  z-index: 1;
  align-items: center;
  width: 100%;
  @media (max-width: 992px) {
    display: block;
    height: auto;
    padding: 50px 20px;
  }
`;

const HeroContainer2 = styled.div`
  background: #fff9ef;
  display: flex;
  justify-content: center;
  padding: 0 30px;
  // height: 103vh;
  height: 695px;
  position: relative;
  z-index: 1;
  align-items: center;
  width: 100%;
  @media (max-width: 992px) {
    display: block;
    height: auto;
    padding: 50px 20px;
  }
`;

const HeroContent = styled.div`
  z-index: 3;
  min-width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  @media (min-width: 992px) {
    padding: 8px 0;
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
  margin-bottom: 0px !important;
  font-family: "GESSTwoBold", sans-serif;
  @media (max-width: 966px) {
    font-size: 30px;
  }
  @media (max-width: 576px) {
    font-size: 30px;
    margin-bottom: 20px !important;
  }
  @media (max-width: 992px) {
    font-size: 22px;
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

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledColEnd = styled(Col)`
  display: flex;
  justify-content: end;
  align-items: center;
  @media (max-width: 576px) {
    justify-content: start;
  }
  @media (max-width: 992px) {
    justify-content: center;

    button {
      padding-inline: 40px !important;
    }
  }
`;

const StyledHeadingRow = styled(Row)`
  // margin-bottom: 20px !important;
  @media (min-width: 992px) {
    margin-inline: 78px !important;
  }
  @media (max-width: 991px) {
    margin-inline: 8% !important;
  }
`;

const SideDesignDiv = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
  width: 100%;
  z-index: 0;
  height: 580px;
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
    min-width: 992px;
  }

  @media only screen and (min-width: 1160px) and (max-width: 1258px) {
    min-width: 1160px;
  }

  @media only screen and (min-width: 1259px) and (max-width: 1359px) {
    min-width: 1260px;
  }

  @media (min-width: 1342px) {
    // min-width: 1340px;
    min-width: 1280px;
  }
`;

const ContainerFeaturedCards = styled.div`
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
    min-width: 992px;
  }

  @media only screen and (min-width: 1160px) and (max-width: 1258px) {
    min-width: 1160px;
  }

  @media only screen and (min-width: 1259px) and (max-width: 1359px) {
    min-width: 1260px;
  }

  @media (min-width: 1342px) {
    // min-width: 1340px;
    min-width: 1280px;
  }

  @media (max-width: 992px) {
    padding: 0;
  }
`;

const StyledFeaturedCoursesRow = styled(Row)`
  background: rgba(16, 95, 67, 0.05);
  z-index: 101 !important;

  @media (max-width: 992px) {
    display: block;
  }
`;

const LeftSideDesignDiv = styled.div`
  position: absolute;
  display: flex;
  justify-content: start;
  width: 100%;
  z-index: 0;
  height: 470px;
  img {
  width: 100%;
  margin-top: 50px;
  }
`;

const StyledReadMoreCustomButton = styled(CustomButton)``;

const StyledAboutUsh1 = styled.h1`
  font-family: GESSTwoBold, sans-serif;
  margin-bottom: 20px;
  @media (min-width: 992px) {
    width: 410px;
  }
`;

const StyledFeaturedCardsRow = styled(Row)`
  justify-content: start !important;
  margin-inline: 60px !important;
  @media (max-width: 991px) {
    margin-inline: 0 !important;
    margin-bottom: 10px;
    // .swiper-slide {
    //   width: 70%;
    // }
    .swipper_slider_btns {
      border: none;
      position: absolute;
      background-color: white;
      padding: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 3.32525px 3.32525px 16.6263px rgb(0 0 0 / 15%);
      border-radius: 5px;
    }
    .ssb-next,
    .ssb-prev {
      top: 50%;
      transform: translateY(-50%);
      z-index: 100;
    }
    .ssb-next {
      right: -10px;
    }
    .ssb-prev {
      left: -10px;
    }
  }
`;

const StylesSkeletonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const SkeletonSliderDiv = styled.div`
  background: #fff;
  position: relative;
  backdrop-filter: blur(20px);
  // top: 76px;
  @media (min-width: 991px) {
    height: 591px;
    margin-bottom: 80px;
  }
  @media (max-width: 992px) {
    height: 300px;
  }
`;
