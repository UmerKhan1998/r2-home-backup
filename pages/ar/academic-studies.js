import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import Image from "next/image";
import router from "next/router";

import Hero from "../../src/components/rtl/Hero";

import endpoints from "../../src/api";

import { Breadcrumb, Col, Row } from "antd";
import {
  AboutUsOurVision,
  CardImg,
  FacultyGroup,
  FeaturedCourse1,
  FeaturedCourse2,
  FeaturedCourse3,
  FeaturedCourse4,
  GoldenFan,
  HeadMessage,
  IntroductionImage,
  LatestNewsResource1,
  LatestNewsResource2,
  LatestNewsResource3,
  LearningInstituteImage,
  LeftSideDesign,
  Points,
  R2Favicon,
} from "../../images";

import CustomButton from "../../src/components/rtl/Button";
import LearningInstitueServices from "../../src/components/rtl/LearningInstitueServices";
import Header from "../../src/components/rtl/header";
import Footer from "../../src/components/rtl/footer";
import {
  about_us,
  about_us_para,
  AssociateExecutiveAdministrationText,
  faculty,
  footer_para,
  goalObjectivesText,
  HeadAdministrationMessageText,
  home,
  AcademicStudiesText,
} from "../../src/helpers/LanguageConstant";
import Link from "next/link";
// import { Link } from "react-scroll";

const AssociateExecutiveAdministration = () => {
  const FeaturedCoursesCarousalData = [
    {
      courseTrainingCategoryName_AR: "Dental Assistant",
      courseTrainingCategoryName_EN: "Dental Assistant",
      creditHours: 6,
      departmentName_AR: "مركز التعلم",
      departmentName_EN: "Learning Institute",
      duration_AR: "2 years ",
      duration_EN: "2 years ",
      enrolled: 3,
      id: "19fb7cb7-65f5-4150-b677-08dad3738b83",
      paidFree: "Paid",
      priceMax: 105,
      priceMin: 50,
      rating: 3,
      recordType: "Course",
      reviewCount: 1,
      subCategory: "Online",
      title_AR: " Medi-Facial Skin Care Aesthetics",
      title_EN: " Medi-Facial Skin Care Aesthetics",
    },
    {
      courseTrainingCategoryName_AR: "Dental Assistant",
      courseTrainingCategoryName_EN: "Dental Assistant",
      creditHours: 6,
      departmentName_AR: "مركز التعلم",
      departmentName_EN: "Learning Institute",
      duration_AR: "2 years ",
      duration_EN: "2 years ",
      enrolled: 3,
      id: "19fb7cb7-65f5-4150-b677-08dad3738b83",
      paidFree: "Paid",
      priceMax: 105,
      priceMin: 50,
      rating: 3,
      recordType: "Course",
      reviewCount: 1,
      subCategory: "Online",
      title_AR: " Medi-Facial Skin Care Aesthetics",
      title_EN: " Medi-Facial Skin Care Aesthetics",
    },
    {
      courseTrainingCategoryName_AR: "Dental Assistant",
      courseTrainingCategoryName_EN: "Dental Assistant",
      creditHours: 6,
      departmentName_AR: "مركز التعلم",
      departmentName_EN: "Learning Institute",
      duration_AR: "2 years ",
      duration_EN: "2 years ",
      enrolled: 3,
      id: "19fb7cb7-65f5-4150-b677-08dad3738b83",
      paidFree: "Paid",
      priceMax: 105,
      priceMin: 50,
      rating: 3,
      recordType: "Course",
      reviewCount: 1,
      subCategory: "Online",
      title_AR: " Medi-Facial Skin Care Aesthetics",
      title_EN: " Medi-Facial Skin Care Aesthetics",
    },
    {
      courseTrainingCategoryName_AR: "Dental Assistant",
      courseTrainingCategoryName_EN: "Dental Assistant",
      creditHours: 6,
      departmentName_AR: "مركز التعلم",
      departmentName_EN: "Learning Institute",
      duration_AR: "2 years ",
      duration_EN: "2 years ",
      enrolled: 3,
      id: "19fb7cb7-65f5-4150-b677-08dad3738b83",
      paidFree: "Paid",
      priceMax: 105,
      priceMin: 50,
      rating: 3,
      recordType: "Course",
      reviewCount: 1,
      subCategory: "Online",
      title_AR: " Medi-Facial Skin Care Aesthetics",
      title_EN: " Medi-Facial Skin Care Aesthetics",
    },
    {
      courseTrainingCategoryName_AR: "Dental Assistant",
      courseTrainingCategoryName_EN: "Dental Assistant",
      creditHours: 6,
      departmentName_AR: "مركز التعلم",
      departmentName_EN: "Learning Institute",
      duration_AR: "2 years ",
      duration_EN: "2 years ",
      enrolled: 3,
      id: "19fb7cb7-65f5-4150-b677-08dad3738b83",
      paidFree: "Paid",
      priceMax: 105,
      priceMin: 50,
      rating: 3,
      recordType: "Course",
      reviewCount: 1,
      subCategory: "Online",
      title_AR: " Medi-Facial Skin Care Aesthetics",
      title_EN: " Medi-Facial Skin Care Aesthetics",
    },
    {
      courseTrainingCategoryName_AR: "Dental Assistant",
      courseTrainingCategoryName_EN: "Dental Assistant",
      creditHours: 6,
      departmentName_AR: "مركز التعلم",
      departmentName_EN: "Learning Institute",
      duration_AR: "2 years ",
      duration_EN: "2 years ",
      enrolled: 3,
      id: "19fb7cb7-65f5-4150-b677-08dad3738b83",
      paidFree: "Paid",
      priceMax: 105,
      priceMin: 50,
      rating: 3,
      recordType: "Course",
      reviewCount: 1,
      subCategory: "Online",
      title_AR: " Medi-Facial Skin Care Aesthetics",
      title_EN: " Medi-Facial Skin Care Aesthetics",
    },
  ];

  const [GetStaticPagesState, setGetStaticPagesState] = useState([]);
  const GetStaticPages = async () => {
    try {
      const response = await endpoints.GetStaticPages("academic-studies");
      //console.log("hgfrgfkdgfdsifufd", response?.data);
      if (response?.data?.statusCode === "200") {
        setGetStaticPagesState(response?.data?.data);
      } else if (response?.data?.statusCode === "404") {
        router.push('/ar')
      }
    } catch (err) {
      //console.log("err", err);
    }
  };

  const [GetAllRecordFunc, setGetAllRecordFunc] = useState()
  const getAllRecordFunc = async () => {
    try {
      const response = await endpoints.getAllRecord(
        "Course",
        "1000",
        "1",
        "Arabic",
        "",
        {
          courseTrainingMasterCategoryId: [],
          courseTrainingCategoryId: [],
          levelId: [],
          priceMin: 0,
          priceMax: 0,
          dateFrom: "",
          dateTo: "",
          locationId: [],
          category: "",
          departmentSlug: "Family Medicine Academy"
        }
      );
      if (response?.data?.statusCode === "200") {
        setGetAllRecordFunc(response?.data?.data?.levelListViewModels)
      } else if(response?.data?.statusCode === "404") {
        setGetAllRecordFunc(response?.data)
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  useLayoutEffect(() => {
    GetStaticPages();
    getAllRecordFunc();
  }, []);

  const DesktopView = (
    <div className="container">
      <Head>
        <title>Riyadh Second Health Cluster</title>
        <link rel="icon" href={R2Favicon} />
      </Head>
      <body>
        <Header />

        {GetStaticPagesState?.contentValue &&
          Object.values(JSON.parse(GetStaticPagesState?.contentValue))?.map(
            (data,index) => (
              <div key={index}>
                {data["type"] === "top_banner" && (
                  <div>
                    <div>
                      <Hero
                        name={"academic-studies"}
                        title={data?.content?.title_ar}
                        background_color={data["content"]?.background_color}
                      />
                    </div>

                    <LeftSideDesignDiv>
                      <Image alt={""} height={500} width={500} src={LeftSideDesign} />
                    </LeftSideDesignDiv>

                    <MainBreadcrumbDiv dir="rtl">
                      <Container>
                        <BreadcrumbDiv>
                          <Breadcrumb>
                            <Breadcrumb.Item>
                              <Link href={"/ar"}>{home}</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                              <Link href={"/ar/about-us"}>{about_us}</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                              <Link
                                href={"/ar/associate-executive-administration"}
                              >
                                {AssociateExecutiveAdministrationText}
                              </Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>{AcademicStudiesText}</Breadcrumb.Item>
                          </Breadcrumb>
                        </BreadcrumbDiv>
                      </Container>
                    </MainBreadcrumbDiv>
                  </div>
                )}
                {data["type"] === "text_with_image" && (<>
                  {(data?.section === "6") ? (
                    <Row>
                      <Container>
                        <LearningInstitueServices
                          FeaturedCoursesCarousalData={(GetAllRecordFunc?.statusCode === "404") ? ([]) : (GetAllRecordFunc)}
                          name="academic-studies"
                          page={"home"}
                          label={data["content"]?.title_ar}
                          desc={data["content"]?.description_ar}
                          button_text={data?.content?.button_ar}
                          button_link={data?.content?.button_link}
                        />
                      </Container>
                    </Row>
                  ) : (
                    <div>
                      {data["content"]?.align === "left" && (
                        <MessageSection>
                          <Container>
                            {data["content"]?.heading_ar && (
                              <>
                                <LeadershipH1>
                                  {data["content"]?.heading_ar}
                                </LeadershipH1>
                              </>
                            )}
                            <StyledMessageSectionRow gutter={[24, 24]}>
                              <MessageContentCol
                                xl={12}
                                lg={24}
                                md={24}
                                sm={24}
                                xs={24}
                                style={{textAlign: "right"}}
                              >
                                <h1
                                  style={{
                                    fontFamily: "'TitilliumBold', sans-serif",
                                    flexWrap: "wrap",
                                    marginBottom: "20px",
                                  }}
                                >
                                  {data?.content?.title_ar}
                                </h1>
                                <p>{data?.content?.description_ar}</p>
                                {data?.content?.button_ar !== "" && (
                                  <div style={{textAlign: "right"}}>
                                    <CustomButton
                                      onClick={()=>{
                                        router.push(`/ar/${data?.content?.button_link}`)
                                      }}
                                      customStyle={{
                                        backgroundColor: "#105F43",
                                        color: "#fff",
                                        // width: "100px",
                                      }}
                                    >
                                      {data?.content?.button_ar}
                                    </CustomButton>
                                  </div>
                                )}
                              </MessageContentCol>
                              <StyledColMessageImg
                                xl={12}
                                lg={24}
                                md={24}
                                sm={24}
                                xs={24}
                              >
                                <div>
                                  {(data?.content?.image_title_ar !== "") ? (<>
                                    {(data?.content?.image !== "" && data?.content?.image !== null) && (
                                      <img loading="lazy"alt={""}
                                        height={380}
                                        width={500}
                                        src={data?.content?.image}
                                      />
                                    )}
                                    <div className="doctor_desc" style={{textAlign: "center"}}>
                                      <p className="doctor">
                                        <b>{data?.content?.image_title_ar}</b>
                                      </p>
                                      <p className="patent">
                                        {data?.content?.image_description_ar}
                                      </p>
                                    </div>
                                  </>) : (<>
                                    {(data?.content?.image !== "" && data?.content?.image !== null) && (
                                      <img loading="lazy"alt={""}
                                        height={500}
                                        width={500}
                                        src={data?.content?.image}
                                      />
                                    )}
                                  </>)}
                                </div>
                              </StyledColMessageImg>
                            </StyledMessageSectionRow>
                          </Container>
                        </MessageSection>
                      )}
                      {data["content"]?.align === "right" && (
                        <MessageSection dir="rtl">
                          <Container>
                            {data["content"]?.heading_ar && (
                              <>
                                <LeadershipH1>
                                  {data["content"]?.heading_ar}
                                </LeadershipH1>
                              </>
                            )}
                            <StyledMessageSectionRow gutter={[24, 24]}>
                              <MessageContentCol
                                xl={12}
                                lg={24}
                                md={24}
                                sm={24}
                                xs={24}
                                style={{textAlign: "right"}}
                              >
                                <h1
                                  style={{
                                    fontFamily: "'TitilliumBold', sans-serif",
                                    flexWrap: "wrap",
                                    marginBottom: "20px",
                                  }}
                                >
                                  {data?.content?.title_ar}
                                </h1>
                                <p>{data?.content?.description_ar}</p>
                                {data?.content?.button_ar !== "" && (
                                  <div>
                                    <CustomButton
                                      onClick={()=>{
                                        router.push(`/ar/${data?.content?.button_link}`)
                                      }}
                                      customStyle={{
                                        backgroundColor: "#105F43",
                                        color: "#fff",
                                        // width: "100px",
                                      }}
                                    >
                                      {data?.content?.button_ar}
                                    </CustomButton>
                                  </div>
                                )}
                              </MessageContentCol>
                              <StyledColMessageImg
                                xl={12}
                                lg={24}
                                md={24}
                                sm={24}
                                xs={24}
                              >
                                <div>
                                  {(data?.content?.image_title_ar !== "") ? (<>
                                    {(data?.content?.image !== "" && data?.content?.image !== null) && (
                                      <img loading="lazy"alt={""}
                                        height={380}
                                        width={500}
                                        src={data?.content?.image}
                                      />
                                    )}
                                    <div className="doctor_desc">
                                      <p className="doctor">
                                        <b>{data?.content?.image_title_ar}</b>
                                      </p>
                                      <p className="patent">
                                        {data?.content?.image_description_ar}
                                      </p>
                                    </div>
                                  </>) : (<>
                                    {(data?.content?.image !== "" && data?.content?.image !== null) && (
                                      <img loading="lazy"alt={""}
                                        height={500}
                                        width={500}
                                        src={data?.content?.image}
                                      />
                                    )}
                                  </>)}
                                </div>
                              </StyledColMessageImg>
                            </StyledMessageSectionRow>
                          </Container>
                        </MessageSection>
                      )}
                    </div>
                  )}
                </>)}
                {data["type"] === "goals_objective" && (
                  <Container dir="rtl">
                    <GoalsAndObjectivesSection>
                      <h1
                        style={{
                          fontFamily: "'TitilliumBold', sans-serif",
                        }}
                      > {data?.content?.heading_ar} </h1>
                      <p>{data?.content?.description_ar}</p>
                  
                      <PointsRow gutter={[8, 8]}>
                        {data?.content?.lists?.map((item, index) => (
                          <Col xl={12} lg={12} md={12} sm={24} xs={24} key={index}>
                            <PointsDiv>
                              <img loading="lazy"alt={""} height={10} width={10} src={Points} />
                              <p>{item?.text_ar}</p>
                            </PointsDiv>
                          </Col>
                        ))}
                      </PointsRow>
                    </GoalsAndObjectivesSection>
                  </Container>
                )}
              </div>
            )
        )}
        <Footer />
      </body>
    </div>
  );
  const MobileView = (
    <div className="container">
      <Head>
        <title>Riyadh Second Health Cluster</title>
        <link rel="icon" href="" />
      </Head>
      <body>
        <Header />

        {GetStaticPagesState?.contentValue &&
          Object.values(JSON.parse(GetStaticPagesState?.contentValue))?.map(
            (data,index) => (
              <div key={index}>
                {data["type"] === "top_banner" && (
                  <div>
                    <div>
                      <Hero
                        name={"academic-studies"}
                        title={data?.content?.title_ar}
                        background_color={data["content"]?.background_color}
                      />
                    </div>

                    <LeftSideDesignDiv>
                      <Image alt={""} height={500} width={500} src={LeftSideDesign} />
                    </LeftSideDesignDiv>

                    <MainBreadcrumbDiv dir="rtl">
                      <Container>
                        <BreadcrumbDiv>
                          <Breadcrumb>
                            <Breadcrumb.Item>
                              <Link href={"/ar"}>{home}</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                              <Link href={"/ar/about-us"}>{about_us}</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                              <Link
                                href={"/ar/associate-executive-administration"}
                              >
                                {AssociateExecutiveAdministrationText}
                              </Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>{AcademicStudiesText}</Breadcrumb.Item>
                          </Breadcrumb>
                        </BreadcrumbDiv>
                      </Container>
                    </MainBreadcrumbDiv>
                  </div>
                )}
                {data["type"] === "text_with_image" && (<>
                  {(data?.section === "6") ? (
                    <Row>
                      <LearningInstitueServices
                        FeaturedCoursesCarousalData={(GetAllRecordFunc?.statusCode === "404") ? ([]) : (GetAllRecordFunc)}
                        name="academic-studies"
                        page={"home"}
                        label={data["content"]?.title_ar}
                        desc={data["content"]?.description_ar}
                        button_text={data?.content?.button_ar}
                        button_link={data?.content?.button_link}
                      />
                    </Row>
                  ) : (
                    <div>
                      {data["content"]?.align === "left" && (
                        <MessageSection>
                          <Container>
                            {data["content"]?.heading_ar && (
                              <>
                                <LeadershipH1 style={{textAlign: "right"}}>
                                  {data["content"]?.heading_ar}
                                </LeadershipH1>
                              </>
                            )}
                            <StyledMessageSectionRow gutter={[24, 24]}>
                              <MessageContentCol
                                xl={12}
                                lg={24}
                                md={24}
                                sm={24}
                                xs={24}
                                style={{textAlign: "right"}}
                              >
                                <h1
                                  style={{
                                    fontFamily: "'TitilliumBold', sans-serif",
                                    flexWrap: "wrap",
                                    marginBottom: "20px",
                                  }}
                                >
                                  {data?.content?.title_ar}
                                </h1>
                                <p>{data?.content?.description_ar}</p>
                                {data?.content?.button_ar !== "" && (
                                  <div>
                                    <CustomButton
                                      onClick={()=>{
                                        router.push(`/ar/${data?.content?.button_link}`)
                                      }}
                                      customStyle={{
                                        backgroundColor: "#105F43",
                                        color: "#fff",
                                        // width: "100px",
                                      }}
                                    >
                                      {data?.content?.button_ar}
                                    </CustomButton>
                                  </div>
                                )}
                              </MessageContentCol>
                              <StyledColMessageImg
                                xl={12}
                                lg={24}
                                md={24}
                                sm={24}
                                xs={24}
                              >
                                <div>
                                  {(data?.content?.image_title_ar !== "") ? (<>
                                    {(data?.content?.image !== "" && data?.content?.image !== null) && (
                                      <img loading="lazy"alt={""}
                                        height={380}
                                        width={500}
                                        src={data?.content?.image}
                                      />
                                    )}
                                    <div className="doctor_desc">
                                      <p className="doctor">
                                        <b>{data?.content?.image_title_ar}</b>
                                      </p>
                                      <p className="patent">
                                        {data?.content?.image_description_ar}
                                      </p>
                                    </div>
                                  </>) : (<>
                                    {(data?.content?.image !== "" && data?.content?.image !== null) && (
                                      <img loading="lazy"alt={""}
                                        height={500}
                                        width={500}
                                        src={data?.content?.image}
                                      />
                                    )}
                                  </>)}
                                </div>
                              </StyledColMessageImg>
                            </StyledMessageSectionRow>
                          </Container>
                        </MessageSection>
                      )}
                      {data["content"]?.align === "right" && (
                        <MessageSection dir="rtl">
                          <Container>
                            <StyledMessageSectionRow gutter={[24, 24]}>
                              <MessageContentCol
                                xl={12}
                                lg={24}
                                md={24}
                                sm={24}
                                xs={24}
                                style={{textAlign: "right"}}
                              >
                                <h1
                                  style={{
                                    fontFamily: "'TitilliumBold', sans-serif",
                                    flexWrap: "wrap",
                                    marginBottom: "20px",
                                  }}
                                >
                                  {data?.content?.title_ar}
                                </h1>
                                <p>{data?.content?.description_ar}</p>
                                {data?.content?.button_ar !== "" && (
                                  <div>
                                    <CustomButton
                                      onClick={()=>{
                                        router.push(`/ar/${data?.content?.button_link}`)
                                      }}
                                      customStyle={{
                                        backgroundColor: "#105F43",
                                        color: "#fff",
                                        // width: "100px",
                                      }}
                                    >
                                      {data?.content?.button_ar}
                                    </CustomButton>
                                  </div>
                                )}
                              </MessageContentCol>
                              <StyledColMessageImg
                                xl={12}
                                lg={24}
                                md={24}
                                sm={24}
                                xs={24}
                              >
                                <div>
                                  {(data?.content?.image_title_ar !== "") ? (<>
                                    {(data?.content?.image !== "" && data?.content?.image !== null) && (
                                      <img loading="lazy"alt={""}
                                        height={380}
                                        width={500}
                                        src={data?.content?.image}
                                      />
                                    )}
                                    <div className="doctor_desc">
                                      <p className="doctor">
                                        <b>{data?.content?.image_title_ar}</b>
                                      </p>
                                      <p className="patent">
                                        {data?.content?.image_description_ar}
                                      </p>
                                    </div>
                                  </>) : (<>
                                    {(data?.content?.image !== "" && data?.content?.image !== null) && (
                                      <img loading="lazy"alt={""}
                                        height={500}
                                        width={500}
                                        src={data?.content?.image}
                                      />
                                    )}
                                  </>)}
                                </div>
                              </StyledColMessageImg>
                            </StyledMessageSectionRow>
                          </Container>
                        </MessageSection>
                      )}
                    </div>
                  )}
                </>)}
                {data["type"] === "goals_objective" && (
                  <Container dir="rtl">
                    <GoalsAndObjectivesSection>
                      <h1
                        style={{
                          fontFamily: "'TitilliumBold', sans-serif",
                        }}
                      > {data?.content?.heading_ar} </h1>
                      <p>{data?.content?.description_ar}</p>
                  
                      <PointsRow gutter={[8, 8]}>
                        {data?.content?.lists?.map((item, index) => (
                          <Col xl={12} lg={12} md={12} sm={24} xs={24} key={index}>
                            <PointsDiv>
                              <img loading="lazy"alt={""} height={10} width={10} src={Points} />
                              <p>{item?.text_ar}</p>
                            </PointsDiv>
                          </Col>
                        ))}
                      </PointsRow>
                    </GoalsAndObjectivesSection>
                  </Container>
                )}
              </div>
            )
        )}
        <Footer />
      </body>
    </div>
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

export default AssociateExecutiveAdministration;

const BreadcrumbDiv = styled.div`
  @media (min-width: 992px) {
    padding: 20px 70px;
  }
  @media (max-width: 991px) {
    padding: 20px 15px;
  }
  // border-bottom: 1px solid #dddddd;
`;

const LeftSideDesignDiv = styled.div`
  position: absolute;
  display: flex;
  justify-content: start;
  width: 100%;
  z-index: 99;
  height: 650px;
  pointer-events: none;
  img {
  width: 100%;
  margin-top: 50px;
  }
`;

const LeadershipH1 = styled.h1`
  margin-bottom: 50px;
  text-align: center;
  color: #105f43;
  font-size: 36px;
  // font-weight: 700;
  line-height: 52px;
  font-family: "TitilliumBold", sans-serif;

  @media (max-width: 992px) {
    font-size: 32px;
    margin-bottom: 10px;
    text-align: start;
  }
`;

const AssociateCardSection = styled.div`
  padding: 80px 77px;
`;

const AssociateCardDiv = styled.div`
  background: rgba(168, 126, 51, 0.06);
  padding: 35px;
  border-radius: 9px;
  h1 {
    font-family: "GESSTwoBold", sans-serif;
    // font-weight: 700;
    font-size: 30px;
    line-height: 46px;
    color: #105f43;
    margin-block: 14px;
  }
  p {
    line-height: 28px;
  }
`;

const AssociateCardRow = styled(Row)``;

const AssociateCardCol = styled(Col)``;

const AboutSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-block: 50px;
  // @media (min-width: 1200px) {
  //   height: 750px !important;
  // }
  // @media (max-width: 1199px) {
  //   height: 700px !important;
  // }
`;

const FacultySection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // @media (min-width: 1200px) {
  //   height: 750px !important;
  // }
  // @media (max-width: 1199px) {
  //   height: 700px !important;
  // }
`;

const StyledAboutSectionRow = styled(Row)`
  display: flex;
  justify-content: center;
  @media (min-width: 992px) {
    padding-inline: 70px;
  }
  @media (max-width: 991px) {
    padding-inline: 0px;
  }
  margin-top: 30px;
  margin-left: 0px !important;
  margin-right: 0px !important;
  @media (max-width: 1199px) {
    margin-inline: 8%;
    margin-top: 0px;
  }
`;

const StyledAboutSectionRow1 = styled(Row)`
  display: flex;
  justify-content: center;
  @media (min-width: 992px) {
    padding-inline: 70px;
  }
  @media (max-width: 991px) {
    padding-inline: 0px;
  }
  flex-wrap: wrap-reverse;
  margin-top: 30px;
  margin-left: 0px !important;
  margin-right: 0px !important;
  @media (max-width: 1199px) {
    margin-inline: 8%;
    margin-top: 0px;
  }
  padding-top: 50px;
`;

const StyledColImg = styled(Col)`
  display: flex;
  justify-content: start;
  align-items: center;
  @media (min-width: 1200px) {
    img {
      // height: 510px;
      // margin-top: -30px;
      width: 95%;
      object-fit: cover;
    }
  }
  @media (max-width: 1199px) {
    img {
      height: 250px;
      margin-top: 0px;
    }
  }
`;

const StyledColFacultyImg = styled(Col)`
  display: flex;
  justify-content: end;
  align-items: center;
  @media (min-width: 1200px) {
    img {
      width: 95%;
    }
  }
  @media (max-width: 1199px) {
    img {
      height: 250px;
      margin-top: 0px;
    }
  }
`;

const AboutUsContentCol = styled(Col)`
  flex-direction: column;
  display: flex;
  justify-content: center;

  p {
    font-size: 16px;
    margin-bottom: 10px;
    line-height: 28px !important;
    color: #636363;
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
`;

const MessageSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // background: rgba(16, 95, 67, 0.05);
  padding-block: 50px;

  // @media (min-width: 1200px) {
  //   height: 660px !important;
  // }
  // @media (max-width: 1199px) {
  //   height: 700px !important;
  // }
`;

const StyledMessageSectionRow = styled(Row)`
  display: flex;
  justify-content: center;
  @media (min-width: 992px) {
    padding-inline: 70px;
  }
  @media (max-width: 991px) {
    padding-inline: 0px;
  }
  margin-top: 30px;
  margin-left: 0px !important;
  margin-right: 0px !important;
  flex-wrap: wrap-reverse;
  @media (max-width: 1199px) {
    margin-inline: 8%;
    margin-top: 0px;
  }
`;

const StyledColMessageImg = styled(Col)`
  display: flex;
  justify-content: end;
  align-items: center;
  @media (min-width: 1200px) {
    img {
      width: 95%;
    }
  }
  @media (max-width: 1199px) {
    img {
      height: 250px;
      margin-top: 0px;
    }
  }
`;

const MessageContentCol = styled(Col)`
  flex-direction: column;
  display: flex;
  justify-content: center;

  p {
    font-size: 16px;
    margin-bottom: 10px;
    line-height: 28px !important;
    color: #636363;
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
`;

const GoalsAndObjectivesSection = styled.div`
  @media (min-width: 992px) {
    padding: 80px 80px 0;
  }
  @media (max-width: 991px) {
    padding: 20px 15px;
  }
  h1 {
    font-size: 30px;
    // font-weight: 700;
    line-height: 46px;
    color: #105f43;
    // text-align: end !important;
  }
  p {
    color: #636363;
    line-height: 28px;
    font-weight: 400;
    font-size: 16px;
    // text-align: end !important;
  }
`;

const PointsDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 14px;

  p {
    margin-bottom: 0px;
    margin-right: 12px;
    font-size: 16px;
  }
`;

const PointsRow = styled(Row)`
  // padding-inline: 20px;
`;

const MainBreadcrumbDiv = styled.div`
  border-bottom: 1px solid #dddddd;
  position: relative !important;
  z-index: 1 !important;
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
