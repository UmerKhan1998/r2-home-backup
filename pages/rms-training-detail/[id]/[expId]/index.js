import React, { useLayoutEffect, useRef, useState, useMemo } from "react";
import Head from "next/head";
import Image from "next/image";
import Links from "next/link";
// import { useInView } from "react-intersection-observer";
import endpoints from "../../../../src/api";

import styled from "styled-components";
import {
  Row,
  Col,
  Checkbox,
  Collapse,
  Rate,
  Divider,
  Breadcrumb,
  Badge,
} from "antd";
import CustomButton from "../../../../src/components/Button";
import classes from "../../../courseDetail.module.css";
import { Link } from "react-scroll";
import { getCookies, setCookies } from "../../../../src/helpers/cookie";
import parse from "html-react-parser";
import ExpiredComp from "../../../../src/components/ExpiredComp";
import CourseVideoModal from "../../../../src/components/Modal/CourseVideoModal";
import AssessmentModal from "../../../../src/components/Modal/AssessmentModal";
//next.config
// import { brand } from "../next.config";

// components
import {
  CardImg3,
  Clock,
  CourseDetailCards1,
  CourseDetailCards10,
  CourseDetailCards2,
  CourseDetailCards3,
  CourseDetailCards4,
  CourseDetailCards5,
  CourseDetailCards6,
  CourseDetailCards7,
  CourseDetailCards8,
  CourseDetailCards9,
  CreditNumber,
  CurriculumImg1,
  CurriculumImg2,
  CurriculumImg3,
  CustomizedPrograms,
  DoubleArrowRight,
  EducationalConsultation,
  FeaturedCourse3,
  GoldStar,
  Internship,
  LanguageIcon,
  Lectures,
  LicenseTraining,
  OnlineEducation,
  PostGraduateTraining,
  R2Favicon,
  Share,
  SimulationTraining,
  Star,
  StudentsTraining,
  Subject,
  UserAvatarImg,
  Workshop,
} from "../../../../images";
import { AiFillStar, AiOutlineLock } from "react-icons/ai";

import Hero from "../../../../src/components/Hero";

import ReactPlayer from "react-player";
import { useRouter } from "next/router";
import Header from "../../../../src/components/header";
import Footer from "../../../../src/components/footer";
import { useSelector } from "react-redux";
import BreadCrumb from "../../../../src/components/BreadCrumb";
import RelatedCourseCardComp from "../../../../src/components/Cards/RelatedCourseCard";
import CourseRegisteredCards from "../../../../src/components/Cards/RmsCourseRegisteredCards";
import DetailPageCurricullum from "../../../../src/components/detailPageCurricullum";
import DetailPageSection from "../../../../src/components/detailPageSections";
import DetailPageIntro from "../../../../src/components/detailPageIntro";
import PriceDetailCards from "../../../../src/components/Cards/PriceDetailCards";

const { Panel } = Collapse;

const CourseDetails = () => {
  const token = getCookies("token");
  const userData = getCookies("userData");
  const router = useRouter();

  const [scroll, setScroll] = useState(0);
  const [loading, setLoading] = useState(false);

  const [getCourseDetailId, setGetCourseDetailId] = useState({});
  //console.log("getCourseDetailId", getCourseDetailId);

  const userDataState = useSelector((state) => state?.userDataReducer);
  const userStatus = getCookies("userStatus");

  const [isAuthorized, setAuthorized] = useState(false);
  useLayoutEffect(() => {
    if (authToken === undefined) {
      setAuthorized(false);
    } else if (userStatus === undefined || userStatus === "false") {
      setAuthorized(false);
    } else if (authToken || userStatus === "true") {
      setAuthorized(true);
    }
  }, [userDataState]);

  const CourseDetailsArr = [
    {
      img: CourseDetailCards1,
      title: "Training Provided by",
      description: "Riyadh Second Health Cluster",
    },
    {
      img: CourseDetailCards2,
      title: "Duration",
      description: getCourseDetailId?.duration_EN,
    },
    {
      img: CourseDetailCards3,
      title: "Study method",
      description: "Online",
    },
    {
      img: CourseDetailCards4,
      title: "Pre-requisite",
      description: "Pre-requisite required",
      noDescription: "No Pre-requisite required",
    },
    {
      img: CourseDetailCards5,
      title: "Optional extras",
      description: "Digital certificate included in price",
    },
    {
      img: CourseDetailCards6,
      title: "Instructor",
      description: getCourseDetailId?.instructorName_EN,
    },
    {
      img: CourseDetailCards7,
      title: "Training Ethics",
      description: "Lorem Ipsum is simply",
    },
    {
      img: CourseDetailCards8,
      title: "Disclosure",
      description: getCourseDetailId?.duration_EN,
    },
    {
      img: CourseDetailCards9,
      title: "Conflicts",
      description: getCourseDetailId?.duration_EN,
    },
    {
      img: CourseDetailCards10,
      title: "Funding",
      description: getCourseDetailId?.duration_EN,
    },
  ];

  const curriculumArr = [
    {
      moduleTitle: "Unit 01: In Which areas do you operate?",
      arr: [
        {
          tutorialTitle: "Unit 01: In Which areas do you operate?",
          time: "20:40",
        },
        {
          tutorialTitle: "Unit 02: In Which areas do you operate?",
          time: "20:40",
        },
        {
          tutorialTitle: "Unit 03: In Which areas do you operate?",
          time: "20:40",
        },
        {
          tutorialTitle: "Unit 04: In Which areas do you operate?",
          time: "20:40",
        },
      ],
    },
    {
      moduleTitle: "Unit 02: In Which areas do you operate?",
      arr: [
        {
          tutorialTitle: "Unit 01: In Which areas do you operate?",
          time: "20:40",
        },
        {
          tutorialTitle: "Unit 02: In Which areas do you operate?",
          time: "20:40",
        },
        {
          tutorialTitle: "Unit 03: In Which areas do you operate?",
          time: "20:40",
        },
        {
          tutorialTitle: "Unit 04: In Which areas do you operate?",
          time: "20:40",
        },
      ],
    },
    {
      moduleTitle: "Unit 03: In Which areas do you operate?",
      arr: [
        {
          tutorialTitle: "Unit 01: In Which areas do you operate?",
          time: "20:40",
        },
        {
          tutorialTitle: "Unit 02: In Which areas do you operate?",
          time: "20:40",
        },
        {
          tutorialTitle: "Unit 03: In Which areas do you operate?",
          time: "20:40",
        },
        {
          tutorialTitle: "Unit 04: In Which areas do you operate?",
          time: "20:40",
        },
      ],
    },
    {
      moduleTitle: "Unit 04: In Which areas do you operate?",
      arr: [
        {
          tutorialTitle: "Unit 01: In Which areas do you operate?",
          time: "20:40",
        },
        {
          tutorialTitle: "Unit 02: In Which areas do you operate?",
          time: "20:40",
        },
        {
          tutorialTitle: "Unit 03: In Which areas do you operate?",
          time: "20:40",
        },
        {
          tutorialTitle: "Unit 04: In Which areas do you operate?",
          time: "20:40",
        },
      ],
    },
  ];

  const RegisteredRowDetailArrData = [
    {
      img: UserAvatarImg,
      title: "Learners",
      description: `${getCourseDetailId?.enrolled} Enrolled`,
    },
    {
      img: Clock,
      title: "Duration",
      description: getCourseDetailId?.duration_EN,
    },
    {
      img: Lectures,
      title: "Files",
      description: `${getCourseDetailId?.lectureTotal} Files`,
    },
    {
      img: Subject,
      title: "Subject",
      description: `${getCourseDetailId?.departmentName_EN}`,
    },
    {
      img: LanguageIcon,
      title: "Language",
      description: `${getCourseDetailId?.languageName_EN}`,
    },
    {
      img: CreditNumber,
      title: "Credited number",
      description: `(${getCourseDetailId?.creditHours} CME)`,
    },
  ];

  const relatedCoursesArr = [
    {
      title: "Cardiology",
      price: 35,
      rate: 4,
    },
    {
      title: "Dermatology",
      price: 35,
      rate: 4,
    },
    {
      title: "Psychiatry",
      price: 35,
      rate: 4,
    },
  ];

  const sidebarArr = [
    {
      name: "Summary",
      link: "summary",
    },
    {
      name: "Overview",
      link: "overview",
    },
    {
      name: "Curriculum",
      link: "curricullum",
    },
    {
      name: "Description",
      link: "description",
    },
    {
      name: "What is this training for",
      link: "who",
    },
    {
      name: "Requirements",
      link: "requirements",
    },
    // {
    //   name: "Digital Certificate",
    //   link: "certificate",
    // },
    {
      name: "Reviews",
      link: "reviews",
    },
  ];

  useLayoutEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  });

  const priceDetailRow = [
    { title: "For Doctor", price: 45 },
    { title: "For Nurse", price: 60 },
    { title: "For Health Practitioner", price: 85 },
    { title: "For student", price: 100 },
  ];

  const getCourseDetailRecordFunc = async (id, userId) => {
    setLoading(true);
    try {
      // if (token && menuId) {
      // //console.log('menuId', menuId, token)
      if (id || userId) {
        const response = await endpoints.getCourseDetailRecord(id, userId);
        if (response) {
          //console.log("response", response?.data);
          setGetCourseDetailId(response?.data?.data);
          setLoading(false);
        }
      }
    } catch (err) {
      //console.log("err", err);
      setLoading(false);
    }
  };

  const authToken = useSelector((state) => state?.userDataReducer?.authToken);
  const fetchId = router.asPath.slice(15, 51);
  const userId = useSelector((state) => state?.userDataReducer?.id);

  //console.log("authToken", authToken);

  const AddCourseWhishlist = async (courseTrainingRegistrationId) => {
    try {
      if (courseTrainingRegistrationId || authToken) {
        const response = await endpoints.AddFavourite(
          authToken,
          courseTrainingRegistrationId
        );
        if (response.data.statusCode === "200") {
          GetDashboardMainFunc(dashboardMainState);
          toast.success("Added to Wishlist");
        }
      }
    } catch (error) {
      //console.log("error", error);
    }
    getCourseDetailRecordFunc(fetchId, userId);
  };
  const RemoveCourseWhishlist = async (courseTrainingRegistrationId) => {
    try {
      if (courseTrainingRegistrationId) {
        const response = await endpoints.AddFavourite(
          authToken,
          courseTrainingRegistrationId
        );
        if (response.data.statusCode === "200") {
          GetDashboardMainFunc(dashboardMainState);
          toast.success("Removed From Wishlist");
        }
      }
    } catch (error) {
      //console.log("error", error);
    }
    getCourseDetailRecordFunc(fetchId, userId);
  };

  const GetDetailRecordByKeyFunc = async (courseId, expId) => {
    try {
      setLoading(true);

      //console.log("dataPayload", courseId);

      if (courseId || expId) {
        const response = await endpoints.GetDetailRecordByKey(courseId, expId);
        //console.log("response", response);
        setGetCourseDetailId(response?.data?.data);

        if (response?.data?.message !== "Invalid OTP") {
          // router.push("/registeration-step");
          // toast.success("New Level Added Successfully");
          // router.push(`/authentication/${courseId}`);
        } else {
          toast.error("Invalid OTP");
        }
        // setCookies("token", response?.data?.message);
      }
    } catch (error) {
      // setErrors(error.response.data.errors);
      // setErrorMessage(error.response.data.message);
      // //console.log("asattar", error);
      setLoading(false);
    } finally {
      setTimeout(() => setLoading(false), 1200);
    }
  };

  useLayoutEffect(() => {
    GetDetailRecordByKeyFunc(
      router.asPath?.split("/")[2],
      router.asPath?.split("/")[3]
    );
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [assessmentOpenModal, setAssessmentOpenModal] = useState(false);
  const [urlState, setUrlState] = useState("");
  //console.log("assessmentOpenModal", assessmentOpenModal);
  //console.log("urlState", urlState);

  const AddCourseWishlist = async (courseTrainingRegistrationId) => {
    try {
      if (courseTrainingRegistrationId || authToken) {
        const response = await endpoints.AddFavourite(
          authToken,
          courseTrainingRegistrationId
        );
        if (response.data.statusCode === "200") {
          GetDashboardMainFunc(dashboardMainState);
          toast.success("Added to Wishlist");
        }
      }
    } catch (error) {
      //console.log("error", error);
    }
    getCourseDetailRecordFunc(fetchId, userId);
  };
  const RemoveCourseWishlist = async (courseTrainingRegistrationId) => {
    try {
      if (courseTrainingRegistrationId) {
        const response = await endpoints.AddFavourite(
          authToken,
          courseTrainingRegistrationId
        );
        if (response.data.statusCode === "200") {
          GetDashboardMainFunc(dashboardMainState);
          toast.success("Removed From Wishlist");
        }
      }
    } catch (error) {
      //console.log("error", error);
    }
    getCourseDetailRecordFunc(fetchId, userId);
  };

  const DesktopView = (
    <div>
      <Head>
        <title>Riyadh Second Health Cluster</title>
        <link rel="icon" href={R2Favicon} />
      </Head>
      <body>
        {getCourseDetailId === null ? (
          <>
            <Header />
            <ExpiredComp />
            <Footer />
          </>
        ) : (
          <>
            <CourseVideoModal
              openModal={openModal}
              setOpenModal={setOpenModal}
              url={urlState}
            />
            <AssessmentModal
              openModal={assessmentOpenModal}
              setOpenModal={setAssessmentOpenModal}
              url={urlState}
            />

            <Header />
            <div>
              <div>
                <Hero
                  title_en={getCourseDetailId?.title_EN}
                  time_duration_en={getCourseDetailId?.duration_EN}
                  enrolled={getCourseDetailId?.enrolled}
                  summary_en={getCourseDetailId?.summary_EN}
                  subCategory={getCourseDetailId?.subCategory}
                  rating={getCourseDetailId?.rating}
                  review_count={getCourseDetailId?.reviewCount}
                  loading={loading}
                  name={"course-detail"}
                />
              </div>

              <BreadCrumb
                getCourseDetailId={getCourseDetailId}
                link={"/trainings-landing-page"}
                name={"Trainings"}
              />

              <Container>
                <StyledCourseDetailRow gutter={(24, 24)}>
                  <Col span={5}>
                    {scroll > 550 ? (
                      <>
                        <CourseDetailCardFixed>
                          {sidebarArr?.map((item, index) => (
                            <>
                              {item?.link === "summary" && (
                                <Link
                                  activeClass={classes.ActiveLinkP}
                                  spy={true}
                                  smooth={true}
                                  offset={-90}
                                  duration={500}
                                  to={item?.link}
                                >
                                  {item?.name}
                                </Link>
                              )}
                              {item?.link === "overview" && (
                                <Link
                                  activeClass={classes.ActiveLinkP}
                                  spy={true}
                                  smooth={true}
                                  offset={-90}
                                  duration={500}
                                  to={item?.link}
                                >
                                  {item?.name}
                                </Link>
                              )}
                              {item?.link === "curricullum" && (
                                <Link
                                  activeClass={classes.ActiveLinkP}
                                  spy={true}
                                  smooth={true}
                                  offset={-90}
                                  duration={500}
                                  to={item?.link}
                                >
                                  {item?.name}
                                </Link>
                              )}
                              {item?.link === "description" && (
                                <Link
                                  activeClass={classes.ActiveLinkP}
                                  spy={true}
                                  smooth={true}
                                  offset={-90}
                                  duration={500}
                                  to={item?.link}
                                >
                                  {item?.name}
                                </Link>
                              )}
                              {parse(
                                `${getCourseDetailId?.whoisthisfor_EN}`
                              ) !== "" &&
                                parse(
                                  `${getCourseDetailId?.whoisthisfor_EN}`
                                ) !== "-" &&
                                item?.link === "who" && (
                                  <Link
                                    activeClass={classes.ActiveLinkP}
                                    spy={true}
                                    smooth={true}
                                    offset={-90}
                                    duration={500}
                                    to={item?.link}
                                  >
                                    {item?.name}
                                  </Link>
                                )}
                              {parse(`${getCourseDetailId?.requirement_EN}`) !==
                                "" &&
                                parse(
                                  `${getCourseDetailId?.requirement_EN}`
                                ) !== "-" &&
                                item?.link === "requirements" && (
                                  <Link
                                    activeClass={classes.ActiveLinkP}
                                    spy={true}
                                    smooth={true}
                                    offset={-90}
                                    duration={500}
                                    to={item?.link}
                                  >
                                    {item?.name}
                                  </Link>
                                )}
                              {getCourseDetailId?.detailRecordReviewViewModels
                                ?.length > 0 &&
                                item?.link === "reviews" && (
                                  <Link
                                    activeClass={classes.ActiveLinkP}
                                    spy={true}
                                    smooth={true}
                                    offset={-90}
                                    duration={500}
                                    to={item?.link}
                                  >
                                    {item?.name}
                                  </Link>
                                )}
                            </>
                          ))}
                        </CourseDetailCardFixed>
                        {/* )} */}
                      </>
                    ) : (
                      <CourseDetailCard>
                        <ActiveLinkP
                          activeClass={classes.ActiveLinkP}
                          spy={true}
                          smooth={true}
                          offset={-90}
                          duration={500}
                          to="summary"
                        >
                          Summary
                        </ActiveLinkP>
                        <Link
                          activeClass={classes.ActiveLinkP}
                          spy={true}
                          smooth={true}
                          offset={-90}
                          duration={500}
                          to="overview"
                        >
                          Overview
                        </Link>
                        <Link
                          activeClass={classes.ActiveLinkP}
                          spy={true}
                          smooth={true}
                          offset={-90}
                          duration={500}
                          to="curricullum"
                        >
                          Curriculum
                        </Link>
                        <Link
                          activeClass={classes.ActiveLinkP}
                          spy={true}
                          smooth={true}
                          offset={-90}
                          duration={500}
                          to="description"
                        >
                          Description
                        </Link>
                        {parse(`${getCourseDetailId?.whoisthisfor_EN}`) !==
                          "" &&
                          parse(`${getCourseDetailId?.whoisthisfor_EN}`) !==
                            "-" && (
                            <Link
                              activeClass={classes.ActiveLinkP}
                              spy={true}
                              smooth={true}
                              offset={-90}
                              duration={500}
                              to="who"
                            >
                              What is this training for?
                            </Link>
                          )}
                        {parse(`${getCourseDetailId?.requirement_EN}`) !== "" &&
                          parse(`${getCourseDetailId?.requirement_EN}`) !==
                            "-" && (
                            <Link
                              activeClass={classes.ActiveLinkP}
                              spy={true}
                              smooth={true}
                              offset={-90}
                              duration={500}
                              to="requirements"
                            >
                              Requirements
                            </Link>
                          )}

                        {getCourseDetailId?.detailRecordReviewViewModels
                          ?.length > 0 && (
                          <Link
                            activeClass={classes.ActiveLinkP}
                            spy={true}
                            smooth={true}
                            offset={-90}
                            duration={500}
                            to="reviews"
                          >
                            Reviews
                          </Link>
                        )}
                      </CourseDetailCard>
                    )}
                  </Col>
                  <Col span={12}>
                    <CourseDetailDescriptionCard>
                      <div id="summary">
                        <DetailPageIntro
                          getCourseDetailId={getCourseDetailId}
                          name={"Training"}
                        />
                      </div>

                      <CourseOverviewDiv id="overview">
                        <CourseOverviewDiv1>
                          <h1>Overview</h1>
                        </CourseOverviewDiv1>
                        <p>
                          {parse(
                            `${
                              getCourseDetailId?.overView_EN
                                ? getCourseDetailId?.overView_EN
                                : "..."
                            }`
                          )}
                        </p>
                      </CourseOverviewDiv>
                    </CourseDetailDescriptionCard>
                    <CourseCurricullumDetailCard id="curricullum">
                      <DetailPageCurricullum
                        setUrlState={setUrlState}
                        getCourseDetailId={getCourseDetailId}
                        setOpenModal={setOpenModal}
                      />
                    </CourseCurricullumDetailCard>
                    <DetailPageSection
                      name={"training"}
                      getCourseDetailId={getCourseDetailId}
                    />
                  </Col>
                  <Col span={7}>
                    <CourseRegisteredCards
                      ThumbNail={CardImg3}
                      getCourseDetailId={getCourseDetailId}
                      RegisteredRowDetailArrData={RegisteredRowDetailArrData}
                      AddCourseWishlist={AddCourseWishlist}
                      isAuthorized={isAuthorized}
                      RemoveCourseWishlist={RemoveCourseWishlist}
                    />

                    {getCourseDetailId?.detailRecordPriceViewModels?.length >
                      0 && (
                      <PriceDetailCards getCourseDetailId={getCourseDetailId} />
                    )}
                    {/* related courses card starts from here */}
                    {getCourseDetailId?.detailRecordRelatedCourseViewModels
                      ?.length > 0 && (
                      <RelatedCourseCardComp
                        ThumbNail={CardImg3}
                        getCourseDetailId={getCourseDetailId}
                        name={"Trainings"}
                        link={"/training-detail"}
                      />
                    )}
                  </Col>
                </StyledCourseDetailRow>
              </Container>
            </div>
            <Footer />
          </>
        )}
      </body>
    </div>
  );
  const MobileView = (
    <div>
      <Head>
        <title>Riyadh Second Health Cluster</title>
        <link rel="icon" href="" />
      </Head>
      <body>
        {getCourseDetailId === null ? (
          <>
            <Header />
            <ExpiredComp />
            <Footer />
          </>
        ) : (
          <>
            <CourseVideoModal
              openModal={openModal}
              setOpenModal={setOpenModal}
              url={urlState}
            />

            <Header />

            <Hero
              title_en={getCourseDetailId?.title_EN}
              time_duration_en={getCourseDetailId?.duration_EN}
              enrolled={getCourseDetailId?.enrolled}
              summary_en={getCourseDetailId?.summary_EN}
              subCategory={getCourseDetailId?.subCategory}
              rating={getCourseDetailId?.rating}
              review_count={getCourseDetailId?.reviewCount}
              loading={loading}
              name={"course-detail"}
            />

            {/* Breadcrumb */}
            <BreadCrumb
              getCourseDetailId={getCourseDetailId}
              link={"/training-landing-page"}
              name={"Trainings"}
            />

            <Container>
              <Col span={24}>
                <CourseDetailDescriptionCard>
                  <div id="summary">
                    <DetailPageIntro
                      getCourseDetailId={getCourseDetailId}
                      name={"Training"}
                    />
                  </div>

                  <CourseOverviewDiv id="overview">
                    <CourseOverviewDiv1>
                      <h1>Overview</h1>
                    </CourseOverviewDiv1>
                    <p>
                      {parse(
                        `${
                          getCourseDetailId?.overView_EN
                            ? getCourseDetailId?.overView_EN
                            : "..."
                        }`
                      )}
                    </p>
                  </CourseOverviewDiv>
                </CourseDetailDescriptionCard>
                <CourseCurricullumDetailCard id="curricullum">
                  <DetailPageCurricullum
                    getCourseDetailId={getCourseDetailId}
                    setUrlState={setUrlState}
                    setOpenModal={setOpenModal}
                  />
                </CourseCurricullumDetailCard>
                <DetailPageSection
                  name={"training"}
                  getCourseDetailId={getCourseDetailId}
                />

                <CourseRegisteredCards
                  ThumbNail={CardImg3}
                  getCourseDetailId={getCourseDetailId}
                  RegisteredRowDetailArrData={RegisteredRowDetailArrData}
                  AddCourseWishlist={AddCourseWishlist}
                  isAuthorized={isAuthorized}
                  RemoveCourseWishlist={RemoveCourseWishlist}
                />
                {/* starts here */}
                <Col span={24}>
                  {getCourseDetailId?.detailRecordPriceViewModels?.length >
                    0 && (
                    <PriceDetailCards getCourseDetailId={getCourseDetailId} />
                  )}
                </Col>
                {getCourseDetailId?.detailRecordRelatedCourseViewModels
                  ?.length > 0 && (
                  <RelatedCourseCardComp
                    ThumbNail={CardImg3}
                    getCourseDetailId={getCourseDetailId}
                    name={"Trainings"}
                    link={"/training-detail"}
                  />
                )}
              </Col>
            </Container>
          </>
        )}
        <Footer />
      </body>
    </div>
  );

  useLayoutEffect(() => {
    // //console.log("fetchId", fetchId);
    // setCookies("courseId", fetchId);
    // getCourseDetailRecordFunc(fetchId, userId);
  }, []);
  const [isDesktop, setIsDesktop] = useState(false);
  //layout effect to check whether the screen is desktop or mobile
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

export default CourseDetails;

const BreadcrumsContainer = styled.div`
  padding: 15px 70px;
  border-bottom: 1px solid #dddddd;
  a,
  span {
    margin: 0 10px;
    // color: #636363;
    font-size: 14px;
    font-weight: 400 !important;
  }
  span {
    font-weight: 500;
  }
`;

const CourseDetailCard = styled.div`
  display: grid;
  box-shadow: 6px 6px 25px rgba(0, 0, 0, 0.09);
  padding: 25px 20px;
  border-radius: 9px;
  // width: 230px;
  p {
    cursor: pointer;
    padding-left: 15px;
  }
  a {
    color: #000;
    padding-left: 15px;
    margin-bottom: 14px;
  }
  a:hover {
    color: #000;
    padding-left: 15px;
    margin-bottom: 14px;
  }
`;

const CourseDetailCardFixed = styled.div`
  display: grid;
  position: sticky;
  top: 90px;
  box-shadow: 6px 6px 25px rgba(0, 0, 0, 0.09);
  padding: 25px 20px;
  border-radius: 9px;
  z-index: 99 !important;
  // width: 230px;
  p {
    cursor: pointer;
    padding-left: 15px;
  }
  a {
    color: #000;
    padding-left: 15px;
    margin-bottom: 14px;
  }
  a:hover {
    color: #000;
    padding-left: 15px;
    margin-bottom: 14px;
  }
  div {
    margin-bottom: 14px !important;
  }
  div:nth-last-child(2) {
    margin-bottom: 0px !important;
  }
`;

const CourseDetailCardFixedExceed4177 = styled.div`
  // position: sticky;
  display: grid;
  margin-top: 3876px;
  box-shadow: 6px 6px 25px rgba(0, 0, 0, 0.09);
  padding: 25px 20px;
  border-radius: 9px;
  z-index: 99 !important;
  // width: 230px;
  p {
    cursor: pointer;
    padding-left: 15px;
  }
  a {
    color: #000;
    padding-left: 15px;
    margin-bottom: 14px;
  }
  a:hover {
    color: #000;
    padding-left: 15px;
    margin-bottom: 14px;
  }
`;

const StyledCourseDetailRow = styled(Row)`
  padding: 50px 65px;
  margin-left: 0px !important;
  margin-right: 0px !important;
`;

const ActiveLinkP = styled(Link)`
  border-left: 2.5px solid #a87e33;
  color: #a87e33 !important;
`;

const CourseDetailDescriptionCard = styled.div`
  border: 1px solid #d1d1d1;
  border-radius: 9px;
  padding: 20px;
  #summary p h2,
  #summary p h1 {
    font-weight: 400 !important;
    font-size: 16px !important;
  }
  #overview p h1,
  #overview p h2 {
    font-weight: 400 !important;
    font-size: 16px !important;
  }
  p {
    color: #636363 !important;
    line-height: 32px !important;
  }
  @media (max-width: 992px) {
    border: none !important;
    padding: 10px 5px;
  }
`;

const CourseDetailDescriptionCard1 = styled.div`
  border: 1px solid #d1d1d1;
  border-radius: 9px;
  padding: 20px;
  margin-top: 20px;

  @media (max-width: 992px) {
    border: none !important;
    padding: 10px 5px;
  }
`;

const CourseCurricullumDetailCard = styled.div`
  border: 1px solid #d1d1d1;
  border-radius: 9px;
  padding: 20px;
  @media (min-width: 992px) {
    margin-top: 20px;
  }
  @media (max-width: 992px) {
    border: none !important;
    padding: 10px 5px;
  }
`;

const CourseMediaDetailCard = styled.div`
  border: 1px solid #d1d1d1;
  border-radius: 9px;
  padding: 20px;
  margin-top: 20px;
  @media (max-width: 992px) {
    border: none !important;
    padding: 10px 5px;
  }
`;

const CourseDescriptionDetailCard = styled.div`
  border: 1px solid #d1d1d1;
  border-radius: 9px;
  padding: 20px;
  margin-top: 20px;
  @media (max-width: 992px) {
    border: none !important;
    padding: 10px 5px;
  }
`;

const CourseWhoIsThisCourseDetailCard = styled.div`
  border: 1px solid #d1d1d1;
  border-radius: 9px;
  padding: 20px;
  margin-top: 20px;
  @media (max-width: 992px) {
    border: none !important;
    padding: 10px 5px;
  }
`;

const CourseDigitalCertificateDetailCard = styled.div`
  border: 1px solid #d1d1d1;
  border-radius: 9px;
  padding: 20px;
  margin-top: 20px;
  @media (max-width: 992px) {
    border: none !important;
    padding: 10px 5px;
  }
`;

const CourseReviewDetailCard = styled.div`
  border: 1px solid #d1d1d1;
  border-radius: 9px;
  padding: 20px;
  margin-top: 20px;
  @media (max-width: 992px) {
    border: none !important;
    padding: 10px 5px;
  }
`;

const CourseRequirementsDetailCard = styled.div`
  border: 1px solid #d1d1d1;
  border-radius: 9px;
  padding: 20px;
  margin-top: 20px;
  overflow: hidden;
  @media (max-width: 992px) {
    border: none !important;
    padding: 10px 5px;
  }
  p {
    word-break: break-word !important;
  }
  @media (max-width: 500px) {
    overflow: hidden;
  }
`;

const CourseDisplayNameDiv = styled.div`
  padding: 10px;
  margin-bottom: 20px;
  background: rgba(16, 95, 67, 0.06);
  border-radius: 9px;
  h1 {
    font-family: "TitilliumBold", sans-serif;
    margin-bottom: 0px;
    font-size: 17px;
    color: #105f43;
    // font-weight: 700;
  }

  p {
    margin-block: 20px;
    font-size: 12px;
    font-weight: 400;
    color: #636363;
  }
`;

const CourseOverviewDiv = styled.div`
  h3 {
    font-weight: 600;
    font-family: "TitilliumBold", sans-serif;
    font-size: 20px;
  }
  p {
    margin-bottom: 0px;
  }
  span {
    // color: #636363 !important;
  }
  label {
    margin-bottom: 20px !important;
  }
  label:last-child {
    margin-bottom: 0px !important;
  }
  .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin-left: 0px !important;
  }
  p {
    line-height: 32px;
  }
`;

const CourseCurriculumDiv = styled.div`
  h3 {
    // font-weight: 700;
  }
  span {
    // color: #636363 !important;
  }
  label {
    margin-bottom: 10px !important;
  }
  label:last-child {
    margin-bottom: 0px !important;
  }
  .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin-left: 0px !important;
  }
  p {
    line-height: 32px;
    // font-size: 16px;
    color: #636363;
    font-weight: 400;
  }
  .ant-row p h2 {
    font-weight: 400 !important;
    font-size: 16px !important;
  }
  @media (max-width: 500px) {
    ul li div {
      width: 100% !important;
      font-size: 16px;
    }
  }
`;

const CourseOverviewDiv1 = styled.div`
  padding: 10px;
  margin-block: 20px;
  background: rgba(16, 95, 67, 0.06);
  border-radius: 9px;
  h1 {
    font-family: "TitilliumBold", sans-serif;
    margin-bottom: 0px;
    font-size: 17px;
    color: #105f43;
    // font-weight: 700;
  }

  p {
    margin-block: 20px;
    font-size: 13px;
    font-weight: 400;
    color: #636363;
    border: 1px solid red;
  }
`;

const CourseDetailsCardsDiv = styled.div`
  display: flex;
  background: #fff;
  padding: 20px;
  border: 1px solid #eaeaea;
  border-radius: 9px;
  // height: 109px;
  align-items: center;
  justify-content: start;

  h3 {
    margin-left: 20px;
    margin-bottom: 0px;
    font-size: 14px;
    font-weight: 500;
  }
  img {
    object-fit: contain;
  }
  @media (max-width: 992px) {
    flex-direction: column;
    text-align: center;
    height: 100%;
    justify-content: center;
    h3 {
      margin-top: 5px;
      margin-left: 0;
    }
  }
`;

const CourseDetailsCardsContentDiv = styled.div`
  display: grid;
  .description {
    color: #a87e33;
  }
  h3 {
    font-family: "TitilliumSemiBold", sans-serif;
  }
  .value_en {
    color: #a87e33;
  }
`;
const CurricullumContentDiv = styled.div`
  display: grid;

  @media (min-width: 1200px) {
    padding-left: 15px;
  }

  @media (max-width: 1199px) {
    padding-left: 3px;
  }

  h2 {
    color: #a87e33;
    margin-bottom: 0px;
    font-weight: 600;
    font-size: 16px;
    font-family: "TitilliumSemiBold", sans-serif;
    line-height: 22px;
  }
  p {
    margin-bottom: 0px;
    font-weight: 400;
    font-size: 15px;
  }
  @media (max-width: 992px) {
    margin-left: 10px;
  }
`;

const CurricullumContentCol = styled(Col)`
  display: flex;
  align-items: center;
  img {
    height: 50px;
  }
`;

const StyledCollapse = styled(Collapse)`
  margin-bottom: 10px;
  .ant-collapse-content-box {
    p {
      padding-left: 0px !important;
      line-height: 32px !important;
    }
    background-color: #fff !important;
    padding-inline: 16px;
    padding-bottom: 2px;
  }
  .ant-collapse-header {
    background-color: #f6f5f5 !important;
    font-family: "TitilliumSemiBold", sans-serif !important;
  }
  .ant-row {
    justify-content: space-between !important;
  }
`;

const StyledCollapseCol = styled(Col)`
  display: flex;
  align-items: center;
  p {
    margin-bottom: 0px;
    cursor: pointer;
  }
  &:hover {
    p {
      text-decoration: underline;
    }
  }
`;

const StyledCollapseCol1 = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: end;
  p {
    margin-bottom: 0px;
  }
`;

const StyledCollapseCol2 = styled(Col)`
  display: flex;
  align-items: center;
  // justify-content: center;
  justify-content: end;
  p {
    margin-bottom: 0px;
  }
`;

const StyledCourseMediaCol = styled(Col)`
  img {
    width: 100%;
    object-fit: cover;
    height: 130px;
  }
`;

const RateRow = styled(Row)`
  display: flex;
  align-items: center;
  p {
    margin-left: 10px;
    margin-bottom: 0px;
    margin-top: 0px;
    color: #a87e33 !important;
    cursor: pointer;
    font-weight: 400;
  }
  &:hover {
    p {
      text-decoration: underline;
    }
  }
`;

// carddiv style starts from here

const CourseRegisterCard = styled.div`
  box-shadow: 6px 6px 25px rgba(0, 0, 0, 0.09);
  padding: 20px;
  border-radius: 9px;
  img {
    width: 100% !important;
  }
  .ant-row {
    margin-top: 10px;
  }
  .ant-row:last-child {
    border-bottom: none !important;
  }
`;

const CourseRegisterHead1 = styled.div`
  display: flex;
  align-items: end;
  .sar {
    margin-bottom: 5px;
    font-size: 18px;
    font-weight: 600;
    font-family: "TitilliumNormal", sans-serif;
  }
  .price {
    font-weight: 600;
    margin-bottom: 0px;
    font-size: 30px;
    font-family: "TitilliumNormal", sans-serif;
    margin-left: 5px;
  }
`;

const RegisteredRowDetail = styled(Row)`
  display: flex;
  img {
    height: 20px;
    object-fit: contain;
  }
  .ant-col:nth-child(1) {
    display: flex;
    justify-content: start;
  }
  .ant-col:nth-child(3) {
    display: flex;
    justify-content: end;
    p {
      text-align: end;
    }
  }
  border-bottom: 1px solid #ddd;
  @media (max-width: 992px) {
    align-items: center;
    div:nth-child(2) p {
      margin-left: 5px;
    }
  }
`;

const CustomButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 20px !important;
    width: 20px !important;
  }
  .regnow {
    color: white !important;
  }
  p {
    margin-bottom: 0px;
    margin-left: 10px;
  }
  .register {
    color: #fff !important;
  }
`;

const RelatedCourseCard = styled.div`
  box-shadow: 6px 6px 25px rgba(0, 0, 0, 0.09);
  padding: 20px;
  border-radius: 9px;
  margin-block: 40px;
  h2 {
    font-family: "TitilliumBold", sans-serif;
    // font-weight: 700;
    font-size: 20px;
    line-height: 22px;
    color: #105f43;
  }
`;

const RelateCoursesCards = styled.div`
  margin-bottom: 15px;
  img {
    width: 100%;
  }
  h3 {
    font-family: "TitilliumNormal", sans-serif;
    font-weight: 600;
    font-size: 15px;
    line-height: 22px;
    color: #000000;
    margin-bottom: 0px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 110px;
  }
  .ant-rate {
    color: #ffaa46;
    font-size: 14px;
  }
  .ant-rate-star {
    margin-right: 4px !important;
  }

  .ant-col:nth-child(2) {
    line-height: 30px;
  }

  .ant-row {
    align-items: center !important;
  }
  cursor: pointer;
`;

const PriceDiv = styled.div`
  display: flex;
  align-items: end;

  .sar {
    font-size: 10px;
    font-weight: 600;
    font-family: "TitilliumNormal", sans-serif;
    margin-bottom: -2px;
  }
  .price {
    font-size: 16px;
    font-weight: 600;
    font-family: "TitilliumNormal", sans-serif;
    margin-bottom: 0px;
    margin-left: 5px;
  }
`;

const CourseCurriculumRowMBottom = styled(Row)`
  margin-bottom: 20px;
`;

const CourseLevelDiv = styled.div`
  h1 {
    font-size: 20px;
    font-weight: 600;
    font-family: "TitilliumNormal", sans-serif;
    line-height: 22px;
  }
`;

const BreadcrumbDiv = styled.div`
  padding: 20px 70px;
  @media (max-width: 992px) {
    padding: 10px;
  }
  border-bottom: 1px solid #dddddd;
`;

const MainBreadcrumbDiv = styled.div`
  border-bottom: 1px solid #dddddd;
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
    min-width: 1260px;
  }
`;

const PriceRow = styled(Row)`
  justify-content: space-between;
  align-items: center;
  padding-block: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  &:nth-last-child(1) {
    border-bottom: 1px solid rgba(0, 0, 0, 0);
  }
  .read-more {
    color: #a87e33;
  }
  p {
    margin-bottom: 0px;
  }
`;

const PriceDiv1 = styled.div`
  display: flex;
  .sar {
    font-size: 10px;
    display: flex;
    align-items: end;
    margin-bottom: 3px;
    // font-weight: 700;
  }
  p {
    font-size: 18px;
    font-weight: 400;
    font-family: "TitilliumBold", sans-serif;
  }
`;

const StyledBadgeDiv = styled.div`
  display: flex;
  p {
    font-family: "TitilliumNormal";
    font-size: 14px;
    margin-bottom: 0px;
    margin-left: 7px;
    display: flex;
    align-items: center;
  }
  .ant-badge {
    color: #105f43 !important;
  }
  @media (max-width: 992px) {
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      margin-right: 5px;
    }
  }
`;

const StyledCmeDiv = styled.div`
  background: #c2f2e1 !important;
  border-radius: 3px !important;
  position: absolute;
  z-index: 99 !important;
  top: 16px;
  left: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1px 4px;

  p {
    margin-bottom: 0px;
  }
`;

const StyledReviewRow = styled(Row)`
  display: flex;
  flex-direction: column;
  .title {
    margin-bottom: 0px;
  }
`;

const StyledTitleRow = styled(Row)`
  display: flex;
  justify-content: space-between;
  .title {
    margin-bottom: 0px;
  }
`;

const StyledRequirementsRow = styled(Row)`
  p {
    width: none !important;
  }
`;
