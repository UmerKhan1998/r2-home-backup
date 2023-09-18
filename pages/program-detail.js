import React, { useLayoutEffect, useRef, useState, useMemo } from "react";
import Head from "next/head";
// import Link from "next/link";
import Image from "next/image";

// import { useInView } from "react-intersection-observer";
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
import CustomButton from "../src/components/Button";
import classes from "./courseDetail.module.css";
import { Link } from "react-scroll";

//next.config
import { brand } from "../next.config";

// components
import {
  Accredition,
  CardImg2,
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
} from "../images";
import { AiOutlineLock } from "react-icons/ai";

import Hero from "../src/components/Hero";

import ReactPlayer from "react-player";
import Header from "../src/components/header";
import Footer from "../src/components/footer";

const { Panel } = Collapse;

const ProgramDetails = () => {
  const [scroll, setScroll] = useState(0);

  const CourseDetailsArr = [
    {
      img: CourseDetailCards1,
      title: "Course Provided by",
      description: "Riyadh Second Health Cluster",
    },
    {
      img: CourseDetailCards2,
      title: "Duration",
      description: "3 hours  30 minutes",
    },
    {
      img: CourseDetailCards3,
      title: "Study method",
      description: "Online",
    },
    {
      img: CourseDetailCards4,
      title: "Pre-requisite",
      description: "No Pre-requisite required",
    },
    {
      img: CourseDetailCards5,
      title: "Optional extras",
      description: "Digital certificate included in price",
    },
    {
      img: CourseDetailCards6,
      title: "Instructor",
      description: "Abdul Manaf",
    },
    {
      img: CourseDetailCards7,
      title: "Course Ethics",
      description: "Lorem Ipsum is simply",
    },
    {
      img: CourseDetailCards8,
      title: "Disclosure",
      description: "3 hours  30 minutes",
    },
    {
      img: CourseDetailCards9,
      title: "Conflicts",
      description: "3 hours  30 minutes",
    },
    {
      img: CourseDetailCards10,
      title: "Funding",
      description: "3 hours  30 minutes",
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
      description: "320 Enrolled",
    },
    {
      img: Clock,
      title: "Duration",
      description: "3.5 Year",
    },
    {
      img: Subject,
      title: "Subject",
      description: "Medical Science",
    },
    {
      img: LanguageIcon,
      title: "Language",
      description: "English",
    },
  ];

  const relatedCoursesArr = [
    {
      title: "Cardiology",
      price: 3500,
      rate: 4,
    },
    {
      title: "Dermatology",
      price: 3500,
      rate: 4,
    },
    {
      title: "Psychiatry",
      price: 3500,
      rate: 4,
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
      name: "Program Media",
      link: "program_media",
    },
    {
      name: "Description",
      link: "description",
    },
    {
      name: "Who is this course for",
      link: "who",
    },
    {
      name: "Requirements",
      link: "requirements",
    },
    {
      name: "Accreditation",
      link: "accreditation",
    },
    {
      name: "Program location (venue)",
      link: "location",
    },
    {
      name: "Reviews",
      link: "reviews",
    },
  ];

  const priceDetailRow = [
    { title: "For Doctor", price: 45 },
    { title: "For Nurse", price: 60 },
    { title: "For Health Practitioner", price: 85 },
    { title: "For student", price: 100 },
  ];

  return (
    <div>
      <Head>
        <title>Riyadh Second Health Cluster</title>
        <link rel="icon" href={R2Favicon} />
      </Head>
      <body>
        <Header />

        <div>
          <div>
            <Hero name={"program-detail"} />
          </div>

          <MainBreadcrumbDiv>
            <Container>
              <BreadcrumbDiv>
                <Breadcrumb>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>Programs</Breadcrumb.Item>
                  <Breadcrumb.Item>Student Training - Medical</Breadcrumb.Item>
                </Breadcrumb>
              </BreadcrumbDiv>
            </Container>
          </MainBreadcrumbDiv>

          <Container>
            <StyledCourseDetailRow gutter={(24, 24)}>
              <Col span={5}>
                {scroll > 550 ? (
                  <>
                    {scroll > 4051 ? (
                      <CourseDetailCardFixedExceed4177>
                        {sidebarArr?.map((item, index) => (
                          <Link
                            activeClass={classes.ActiveLinkP}
                            spy={true}
                            smooth={true}
                            offset={-90}
                            duration={500}
                            to={item?.link}
                            key={index}
                          >
                            {item?.name}
                          </Link>
                        ))}
                      </CourseDetailCardFixedExceed4177>
                    ) : (
                      <CourseDetailCardFixed>
                        {sidebarArr?.map((item, index) => (
                          <Link
                            activeClass={classes.ActiveLinkP}
                            spy={true}
                            smooth={true}
                            offset={-90}
                            duration={500}
                            to={item?.link}
                            key={index}
                          >
                            {item?.name}
                          </Link>
                        ))}
                      </CourseDetailCardFixed>
                    )}
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
                      to="program_media"
                    >
                      Program Media
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
                    <Link
                      activeClass={classes.ActiveLinkP}
                      spy={true}
                      smooth={true}
                      offset={-90}
                      duration={500}
                      to="who"
                    >
                      Who is this course for
                    </Link>
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
                    <Link
                      activeClass={classes.ActiveLinkP}
                      spy={true}
                      smooth={true}
                      offset={-90}
                      duration={500}
                      to="accreditation"
                    >
                      Accreditation
                    </Link>
                    <Link
                      activeClass={classes.ActiveLinkP}
                      spy={true}
                      smooth={true}
                      offset={-90}
                      duration={500}
                      to="location"
                    >
                      Program location (venue)
                    </Link>
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
                  </CourseDetailCard>
                )}
              </Col>
              <Col span={12}>
                <CourseDetailDescriptionCard>
                  <div id="summary">
                    <CourseDisplayNameDiv>
                      <h1>Student Training - Medical</h1>
                    </CourseDisplayNameDiv>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.
                    </p>
                    <Row gutter={[12, 12]}>
                      {CourseDetailsArr?.map((item, index) => (
                        <Col xl={12} lg={24} md={24} sm={24} xs={24} key={index}>
                          <CourseDetailsCardsDiv>
                            <img loading="lazy"alt={""} height={40} width={40} src={item?.img} />
                            <CourseDetailsCardsContentDiv>
                              <h3>{item?.title}</h3>
                              <h3 className="description">
                                {item?.description}
                              </h3>
                            </CourseDetailsCardsContentDiv>
                          </CourseDetailsCardsDiv>
                        </Col>
                      ))}
                    </Row>
                  </div>

                  <CourseOverviewDiv id="overview">
                    <CourseOverviewDiv1>
                      <h1>Overview</h1>
                    </CourseOverviewDiv1>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.
                    </p>
                    <h3>Learning Objectives</h3>
                    <Checkbox checked={true} disabled>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </Checkbox>
                    <Checkbox checked={true} disabled>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it
                    </Checkbox>
                    <Checkbox checked={true} disabled>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </Checkbox>
                    <Checkbox checked={true} disabled>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </Checkbox>
                  </CourseOverviewDiv>
                </CourseDetailDescriptionCard>

                <CourseMediaDetailCard id="program_media">
                  <CourseCurriculumDiv>
                    <CourseDisplayNameDiv>
                      <h1>Program Media</h1>
                    </CourseDisplayNameDiv>
                    <Row gutter={[12, 12]}>
                      <Col span={10}>
                        <ReactPlayer
                          url="https://www.youtube.com/watch?v=gpqoZQ8GNK8"
                          height={130}
                          width={"100%"}
                        />
                      </Col>
                      <StyledCourseMediaCol span={10}>
                        {/* <img loading="lazy"src={FeaturedCourse3} /> */}
                        <img loading="lazy"alt={""} height={40} width={70} src={FeaturedCourse3} />
                      </StyledCourseMediaCol>
                    </Row>
                  </CourseCurriculumDiv>
                </CourseMediaDetailCard>
                <CourseDescriptionDetailCard id="description">
                  <CourseCurriculumDiv>
                    <CourseDisplayNameDiv>
                      <h1>Description</h1>
                    </CourseDisplayNameDiv>
                    <Row>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </p>
                    </Row>
                    <Row>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </p>
                    </Row>
                    <CourseLevelDiv>
                      <h1>Anesthesiology Level 1</h1>
                      <Row>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book.
                        </p>
                      </Row>
                    </CourseLevelDiv>
                    <CourseLevelDiv>
                      <h1>Anesthesiology Level 2</h1>
                      <Row>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book.
                        </p>
                      </Row>
                    </CourseLevelDiv>
                  </CourseCurriculumDiv>
                </CourseDescriptionDetailCard>
                <CourseWhoIsThisCourseDetailCard id="who">
                  <CourseCurriculumDiv>
                    <CourseDisplayNameDiv>
                      <h1>Who is this course for?</h1>
                    </CourseDisplayNameDiv>

                    <CourseLevelDiv>
                      <h1>Anesthesiology Level 1</h1>
                      <Row>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. Lorem Ipsum
                          is simply dummy text of the printing and typesetting
                          industry. Lorem Ipsum has been the industry's standard
                          dummy text ever since the 1500s, when an unknown
                          printer took a galley of type and scrambled it to make
                          a type specimen book.
                        </p>
                      </Row>
                    </CourseLevelDiv>
                  </CourseCurriculumDiv>
                </CourseWhoIsThisCourseDetailCard>
                <CourseRequirementsDetailCard id="requirements">
                  <CourseCurriculumDiv>
                    <CourseDisplayNameDiv>
                      <h1>Requirements</h1>
                    </CourseDisplayNameDiv>

                    <Row>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </p>
                    </Row>
                  </CourseCurriculumDiv>
                </CourseRequirementsDetailCard>
                <CourseDigitalCertificateDetailCard id="accreditation">
                  <CourseCurriculumDiv>
                    <CourseDisplayNameDiv>
                      <h1>Accreditation</h1>
                    </CourseDisplayNameDiv>

                    <Row>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s.
                      </p>
                    </Row>
                    <AccreditationRow gutter={[48, 48]}>
                      <Col span={8}>
                        {/* <img loading="lazy"src={Accredition} /> */}
                        <img loading="lazy"alt={""} height={40} width={170} src={Accredition} />
                      </Col>
                      <Col span={8}>
                        <img loading="lazy"alt={""} height={40} width={170} src={Accredition} />
                      </Col>
                      <Col span={8}>
                        <img loading="lazy"alt={""} height={40} width={170} src={Accredition} />
                      </Col>
                    </AccreditationRow>
                  </CourseCurriculumDiv>
                </CourseDigitalCertificateDetailCard>
                <CourseDigitalCertificateDetailCard id="location">
                  <CourseCurriculumDiv>
                    <CourseDisplayNameDiv>
                      <h1>Program Location (Venue)</h1>
                    </CourseDisplayNameDiv>

                    <Row>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s.
                      </p>
                    </Row>
                  </CourseCurriculumDiv>
                </CourseDigitalCertificateDetailCard>
                <CourseReviewDetailCard id="reviews">
                  <CourseCurriculumDiv>
                    <CourseDisplayNameDiv>
                      <h1>Reviews</h1>
                    </CourseDisplayNameDiv>

                    <Row>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s.
                      </p>
                      <p>
                        Currently there are no Q&As for this course. Be the
                        first to ask a question.
                      </p>
                    </Row>

                    <RateRow>
                      <img loading="lazy"alt={""} height={30} width={30} src={GoldStar} />
                      <p>Leave a review</p>
                    </RateRow>
                  </CourseCurriculumDiv>
                </CourseReviewDetailCard>
              </Col>
              <Col span={7}>
                <CourseRegisterCard>
                  {/* <img loading="lazy"src={CardImg2} /> */}
                  <img loading="lazy"alt={""} height={200} width={300} src={CardImg2} />
                  <Row>
                    <CourseRegisterHead1>
                      <p className="sar">SAR</p>
                      <p className="price">3500</p>
                    </CourseRegisterHead1>
                  </Row>
                  {RegisteredRowDetailArrData?.map((item, index) => (
                    <RegisteredRowDetail key={index}>
                      <Col span={2}>
                        <div>
                          {/* <img loading="lazy"src={item?.img} /> */}
                          <img loading="lazy"alt={""} height={200} width={300} src={item?.img} />
                        </div>
                      </Col>
                      <Col span={10}>
                        <p>{item?.title}</p>
                      </Col>
                      <Col span={12}>
                        <p>{item?.description}</p>
                      </Col>
                    </RegisteredRowDetail>
                  ))}
                  <CustomButton
                    customStyle={{
                      background: "#105F43",
                      color: "#fff",
                      height: "50px",
                      width: "100%",
                    }}
                  >
                    <CustomButtonDiv>
                      {/* <img loading="lazy"src={DoubleArrowRight} /> */}
                      <img loading="lazy"alt={""} height={200} width={300} src={DoubleArrowRight} />

                      <p>Register Now</p>
                    </CustomButtonDiv>
                  </CustomButton>
                  <CustomButton
                    customStyle={{
                      background: "rgba(16, 95, 67, 0.1)",
                      color: "#105F43",
                      height: "50px",
                      width: "100%",
                      marginTop: 15,
                    }}
                  >
                    <CustomButtonDiv>
                      {/* <img loading="lazy"src={Star} /> */}
                      <img loading="lazy"alt={""} height={200} width={300} src={Star} />
                      <p>Add to Whishlist</p>
                    </CustomButtonDiv>
                  </CustomButton>
                  <CustomButton
                    customStyle={{
                      background: "#fff",
                      color: "#000",
                      height: "50px",
                      width: "100%",
                      marginTop: 15,
                      border: "1.5px solid #F5F5F5",
                    }}
                  >
                    <CustomButtonDiv>
                      <img loading="lazy"alt={""} height={200} width={300} src={Share} />
                      {/* <img loading="lazy"src={Share} /> */}
                      <p>Share</p>
                    </CustomButtonDiv>
                  </CustomButton>
                </CourseRegisterCard>

                {priceDetailRow?.length === 0 ? (
                  <></>
                ) : (
                  <RelatedCourseCard>
                    <h2>Price Detail</h2>
                    {priceDetailRow?.map((item, index) => (
                      <PriceRow key={index}>
                        <StyledBadgeDiv>
                          <Badge color="#105F43" status="success" />
                          <p>{item?.title}</p>
                        </StyledBadgeDiv>
                        <PriceDiv1>
                          <>
                            <p className="sar">SAR</p>&nbsp;
                            <p>{item?.price}.00</p>
                          </>
                        </PriceDiv1>
                      </PriceRow>
                    ))}
                  </RelatedCourseCard>
                )}

                {/* related courses card starts from here */}
                <RelatedCourseCard>
                  <h2>Related Courses</h2>
                  {relatedCoursesArr?.map((item, index) => (
                    <RelateCoursesCards key={index}>
                      <Row gutter={[16, 16]}>
                        <Col span={12}>
                          {/* <img loading="lazy"src={CardImg2} /> */}
                          <img loading="lazy"alt={""} height={250} width={300} src={CardImg2} />
                        </Col>
                        <Col span={12}>
                          <h3>{item?.title}</h3>
                          
                          <Rate allowHalf disabled value={item?.rate} />
                          <PriceDiv>
                            <p className="sar">SAR</p>{" "}
                            <p className="price">{item?.price}</p>
                          </PriceDiv>
                        </Col>
                      </Row>
                    </RelateCoursesCards>
                  ))}
                </RelatedCourseCard>
              </Col>
            </StyledCourseDetailRow>
          </Container>
        </div>
        <Footer />
      </body>
    </div>
  );
};

export default ProgramDetails;

const BreadcrumsContainer = styled.div`
  padding: 15px 70px;
  border-bottom: 1px solid #dddddd;
  a,
  span {
    margin: 0 10px;
    color: #636363;
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
  padding: 25px 35px;
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
  padding: 25px 35px;
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

const CourseDetailCardFixedExceed4177 = styled.div`
  // position: sticky;
  display: grid;
  margin-top: 3556px;
  box-shadow: 6px 6px 25px rgba(0, 0, 0, 0.09);
  padding: 25px 35px;
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
  p {
    color: #636363 !important;
    line-height: 32px !important;
  }
`;

const CourseDetailDescriptionCard1 = styled.div`
  border: 1px solid #d1d1d1;
  border-radius: 9px;
  padding: 20px;
  margin-top: 20px;
`;

const CourseCurricullumDetailCard = styled.div`
  border: 1px solid #d1d1d1;
  border-radius: 9px;
  padding: 20px;
  margin-top: 20px;
`;

const CourseMediaDetailCard = styled.div`
  border: 1px solid #d1d1d1;
  border-radius: 9px;
  padding: 20px;
  margin-top: 20px;
`;

const CourseDescriptionDetailCard = styled.div`
  border: 1px solid #d1d1d1;
  border-radius: 9px;
  padding: 20px;
  margin-top: 20px;
`;

const CourseWhoIsThisCourseDetailCard = styled.div`
  border: 1px solid #d1d1d1;
  border-radius: 9px;
  padding: 20px;
  margin-top: 20px;
`;

const CourseDigitalCertificateDetailCard = styled.div`
  border: 1px solid #d1d1d1;
  border-radius: 9px;
  padding: 20px;
  margin-top: 20px;
`;

const CourseReviewDetailCard = styled.div`
  border: 1px solid #d1d1d1;
  border-radius: 9px;
  padding: 20px;
  margin-top: 20px;
`;

const CourseRequirementsDetailCard = styled.div`
  border: 1px solid #d1d1d1;
  border-radius: 9px;
  padding: 20px;
  margin-top: 20px;
`;

const CourseDisplayNameDiv = styled.div`
  padding: 10px;
  margin-bottom: 20px;
  background: rgba(16, 95, 67, 0.06);
  border-radius: 9px;
  h1 {
    font-family: "TitilliumBold", sans-serif;
    margin-bottom: 0px;
    font-size: 24px;
    color: #105f43;
    // font-weight: 700;
  }
  p {
    margin-block: 20px;
    font-size: 13px;
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
  span {
    color: #636363 !important;
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
    color: #636363 !important;
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
`;

const CourseOverviewDiv1 = styled.div`
  padding: 10px;
  margin-block: 20px;
  background: rgba(16, 95, 67, 0.06);
  border-radius: 9px;
  h1 {
    font-family: "TitilliumBold", sans-serif;
    margin-bottom: 0px;
    font-size: 24px;
    color: #105f43;
    // font-weight: 700;
  }
  p {
    margin-block: 20px;
    font-size: 13px;
    font-weight: 400;
    color: #636363;
  }
`;

const CourseDetailsCardsDiv = styled.div`
  display: flex;
  background: #fff;
  padding: 20px;
  border: 1px solid #eaeaea;
  border-radius: 9px;
  height: 109px;
  align-items: center;
  justify-content: start;

  h3 {
    margin-left: 20px;
    margin-bottom: 0px;
    font-size: 14px;
    font-weight: 500;
  }
  img {
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
`;

const CurricullumContentDiv = styled.div`
  display: grid;
  padding-left: 15px;

  h2 {
    color: #a87e33;
    margin-bottom: 0px;
    font-weight: 600;
    font-size: 24px;
    font-family: "TitilliumSemiBold", sans-serif;
    line-height: 22px;
  }
  p {
    margin-bottom: 0px;
    font-weight: 400;
    font-size: 16px;
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
  justify-content: center;
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
`;

const CustomButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 20px !important;
    width: 20px !important;
  }
  p {
    margin-bottom: 0px;
    margin-left: 10px;
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
    font-size: 24px;
    line-height: 22px;
    color: #105f43;
  }
`;

const RelateCoursesCards = styled.div`
  margin-block: 20px;
  img {
    width: 100%;
  }
  h3 {
    font-family: "TitilliumNormal", sans-serif;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    color: #000000;
    margin-bottom: 0px;
  }
  .ant-rate {
    color: #ffaa46;
    font-size: 14px;
  }

  .ant-col:nth-child(2) {
    line-height: 30px;
  }

  .ant-row {
    align-items: center !important;
  }
`;

const PriceDiv = styled.div`
  display: flex;
  align-items: end;

  .sar {
    font-size: 14px;
    font-weight: 600;
    font-family: "TitilliumNormal", sans-serif;
    margin-bottom: -2px;
  }
  .price {
    font-size: 20px;
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
    min-width: 1340px;
  }
`;

const AccreditationRow = styled(Row)`
  img {
    width: 100%;
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

const StyledBadgeDiv = styled.div`
  display: flex;
  p {
    font-family: "TitilliumNormal";
    font-size: 14px;
    margin-bottom: 0px;
  }
  .ant-badge {
    color: #105f43 !important;
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
