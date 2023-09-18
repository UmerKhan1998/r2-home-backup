import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

import Hero from "../../src/components/rtl/Hero";
import endpoints from "../../src/api";
import parse from "html-react-parser";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper";

import { Breadcrumb, Col, Divider, Radio, Row, Slider } from "antd";
import {
  AboutUsOurVision,
  AcademicStudies,
  BoardOfTrust,
  IntroductionImage,
  KFMCLeaders,
  Leadership,
  LearningInstitute,
  LeftSideDesign,
  OurAccreditationImage,
  OurAssociateExecutiveAdministrations,
  OurMissionImage,
  OurPartnerLogo,
  OurStoriesImage,
  OurTrainingSites,
  President,
  R2Favicon,
  SideDesign,
  Simulation,
} from "../../images";
import CustomButton from "../../src/components/Button";
import OurStories from "../../src/components/rtl/OurStories";
import router from "next/router";
import Header from "../../src/components/rtl/header";
import Footer from "../../src/components/rtl/footer";
import { removeCookies } from "../../src/helpers/cookie";
import {
  about_us,
  about_us_para,
  AcademicStudiesText,
  board_of_trusted,
  CPDSimulationText,
  footer_para,
  founder,
  home,
  IntoductionTo,
  intro_para,
  leaders,
  leadership,
  LearningInstituteText,
  our_accreditation,
  our_associate_executive_administrations,
  our_mission,
  our_stories,
  our_training_sites,
  our_vision,
  president,
  read_more,
  riyadh_second_health_cluster,
  simulationText,
  simulation_training,
} from "../../src/helpers/LanguageConstant";

const AboutUsPage = () => {
  const OurStoriesArr = [
    {
      img: OurStoriesImage,
      heading: our_stories,
      paragraph: about_us_para,
    },
    {
      img: OurStoriesImage,
      heading: our_stories,
      paragraph: about_us_para,
    },
    {
      img: OurStoriesImage,
      heading: our_stories,
      paragraph: about_us_para,
    },
    {
      img: OurStoriesImage,
      heading: our_stories,
      paragraph: about_us_para,
    },
    {
      img: OurStoriesImage,
      heading: our_stories,
      paragraph: about_us_para,
    },
  ];

  useLayoutEffect(() => {
    removeCookies("courseId");
  }, []);

  const [GetStaticPagesState, setGetStaticPagesState] = useState([]);
  //console.log("GetStaticPagesState", GetStaticPagesState);

  const GetStaticPages = async () => {
    try {
      const response = await endpoints.GetStaticPages("about-us");
      //console.log("hgfrgfkdgfdsifufd", response?.data);
      if (response?.data?.statusCode === "200") {
        setGetStaticPagesState(response?.data?.data);
      } else if (response?.data?.statusCode === "404") {
        router.push("/ar");
      }
    } catch (err) {
      //console.log("err", err);
    }
  };

  useLayoutEffect(() => {
    removeCookies("courseId");
    GetStaticPages();
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
            (data, index) => (
              <div key={index}>
                {data["type"] === "top_banner" && (
                  <div>
                    <Hero
                      name={"about-us-page"}
                      title={data["content"]?.title_ar}
                      background={data["content"]?.background_color}
                      image={data["content"]?.image}
                    />

                    <SectionAfterHero>
                      <Container>
                        <SectionAfterHeroRow>
                          {data["content"]?.tabs?.map((item, index) => (
                            <SectionAfterHeroCol
                              key={index}
                              onClick={() =>
                                router.push(`/ar/${item?.link_ar}`)
                              }
                              span={8}
                            >
                              <Row>
                                <AlignCenter>
                                  <TitleDiv>{item?.title_ar}</TitleDiv>
                                </AlignCenter>
                                <ImgDiv>
                                  {item?.image !== "" &&
                                    item?.image !== null && (
                                      <img
                                        height={30}
                                        width={30}
                                        src={item?.image}
                                      />
                                    )}
                                </ImgDiv>
                              </Row>
                            </SectionAfterHeroCol>
                          ))}

                          {/* <SectionAfterHeroCol
                              span={8}
                              onClick={() => router.push("/academic-studies")}
                            >
                              <Row>
                                <AlignCenter>
                                  <TitleDiv>Academic Studies</TitleDiv>
                                </AlignCenter>
                                <ImgDiv>
                                  <img loading="lazy"alt={""}
                                    height={30}
                                    width={30}
                                    src={AcademicStudies}
                                  />
                                </ImgDiv>
                              </Row>
                            </SectionAfterHeroCol>
                            <SectionAfterHeroCol
                              span={8}
                              onClick={() => router.push("/simulation")}
                            >
                              <Row>
                                <AlignCenter>
                                  <TitleDiv>(CPD) & Simulation</TitleDiv>
                                </AlignCenter>
                                <ImgDiv>
                                  <img loading="lazy"alt={""} height={30} width={30} src={Simulation} />
                                </ImgDiv>
                              </Row>
                            </SectionAfterHeroCol> */}
                        </SectionAfterHeroRow>
                      </Container>
                    </SectionAfterHero>
                    <MainBreadcrumbDiv>
                      <Container>
                        <BreadcrumbDiv dir="rtl">
                          <Breadcrumb>
                            <Breadcrumb.Item>
                              <Link href={"/ar"}>{home}</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>{about_us}</Breadcrumb.Item>
                          </Breadcrumb>
                        </BreadcrumbDiv>
                      </Container>
                    </MainBreadcrumbDiv>
                  </div>
                )}

                {data["type"] === "text_with_image" && (
                  <>
                    <AboutSection>
                      <Container>
                        {data["content"]?.heading_ar && (
                          <>
                            <LeadershipH1>
                              {data["content"]?.heading_ar}
                            </LeadershipH1>
                          </>
                        )}
                        <StyledAboutSectionRow dir="rtl" gutter={[24, 24]}>
                          {data["content"]?.align === "right" && (
                            <>
                              <StyledColImg
                                xl={12}
                                lg={24}
                                md={24}
                                sm={24}
                                xs={24}
                              >
                                {/* <img loading="lazy"src={IntroductionImage} /> */}
                                {data["content"]?.image !== "" &&
                                  data["content"]?.image !== null && (
                                    <Image
                                      height={480}
                                      width={500}
                                      src={data["content"]?.image}
                                    />
                                  )}
                              </StyledColImg>
                              <AboutUsContentCol
                                xl={12}
                                lg={24}
                                md={24}
                                sm={24}
                                xs={24}
                              >
                                <h1
                                  style={{
                                    fontFamily: "'GESSTwoBold', sans-serif",
                                    width: "510px",
                                    marginBottom: "20px",
                                  }}
                                >
                                  {data["content"]?.title_ar}
                                </h1>
                                <p>{data["content"]?.description_ar}</p>
                                {data["content"]?.button_ar !== "" && (
                                  <div>
                                    <CustomButton
                                      onClick={() =>
                                        router.push(
                                          data["content"]?.button_link
                                        )
                                      }
                                      customStyle={{
                                        backgroundColor: "#105F43",
                                        color: "#fff",
                                        // width: "100px",
                                      }}
                                    >
                                      {data["content"]?.button_ar}
                                    </CustomButton>
                                  </div>
                                )}
                              </AboutUsContentCol>
                            </>
                          )}
                          {data["content"]?.align === "left" && (
                            <>
                              <AboutUsContentCol
                                xl={12}
                                lg={24}
                                md={24}
                                sm={24}
                                xs={24}
                              >
                                <h1
                                  style={{
                                    fontFamily: "'GESSTwoBold', sans-serif",
                                    width: "510px",
                                    marginBottom: "20px",
                                  }}
                                >
                                  {data["content"]?.title_ar}
                                </h1>
                                <p>{data["content"]?.description_ar}</p>
                                {data["content"]?.button_ar === "" && (
                                  <div>
                                    <CustomButton
                                      onClick={() =>
                                        router.push(
                                          data["content"]?.button_link
                                        )
                                      }
                                      customStyle={{
                                        backgroundColor: "#105F43",
                                        color: "#fff",
                                        // width: "100px",
                                      }}
                                    >
                                      {data["content"]?.button_ar}
                                    </CustomButton>
                                  </div>
                                )}
                              </AboutUsContentCol>
                              <StyledColImg
                                xl={12}
                                lg={24}
                                md={24}
                                sm={24}
                                xs={24}
                              >
                                {/* <img loading="lazy"src={IntroductionImage} /> */}
                                {data["content"]?.image !== "" &&
                                  data["content"]?.image !== null && (
                                    <Image
                                      height={480}
                                      width={500}
                                      src={data["content"]?.image}
                                    />
                                  )}
                              </StyledColImg>
                            </>
                          )}
                        </StyledAboutSectionRow>
                      </Container>
                      <SideDesignDiv>
                        {/* <img loading="lazy"src={SideDesign} /> */}
                        <img loading="lazy"alt={""} height={500} width={500} src={SideDesign} />
                      </SideDesignDiv>{" "}
                    </AboutSection>
                  </>
                )}
                {data["type"] === "three_card" && (
                  <>
                    <LeadershipRow gutter={[24, 24]}>
                      {data["content"]?.cards?.map((item, index) => (
                        <Col xl={5} md={24} key={index}>
                          <LeadershipCard>
                            {/* <img loading="lazy"src={BoardOfTrust} /> */}
                            <Image height={250} width={250} src={item?.image} />

                            <h2>{item?.title_ar}</h2>
                            <p>{item?.description_ar}</p>
                          </LeadershipCard>
                        </Col>
                      ))}
                    </LeadershipRow>
                  </>
                )}
                {data["type"] === "slider" && (
                  <>
                    {/* Leadership */}
                    <MainOurStories>
                      <Container>
                        <OurStories OurStoriesArr={data?.content?.sliders} />
                      </Container>
                    </MainOurStories>
                  </>
                )}
                {data["type"] === "card_with_bg_image" && (
                  <>
                    <OurAccreditationDiv>
                      <OurAccreditationBgContentDiv>
                        <ContentDiv>
                          <AccreditationContainer dir="rtl">
                            <h1>{our_accreditation}</h1>
                            <p>{about_us_para}</p>

                            <Row gutter={[32, 32]}>
                              {data?.content?.cards?.map((item, index) => (
                                <Col md={8} sm={24} xs={24} key={index}>
                                  <OurAccreditationCard>
                                    {/* <img loading="lazy"src={OurPartnerLogo} /> */}
                                    <Image alt={""}
                                      height={250}
                                      width={550}
                                      src={item?.image}
                                    />
                                  </OurAccreditationCard>
                                </Col>
                              ))}
                            </Row>
                          </AccreditationContainer>
                        </ContentDiv>
                      </OurAccreditationBgContentDiv>
                      <OurAccreditationBgImgDiv>
                        {/* <img loading="lazy"src={OurAccreditationImage} /> */}
                        <Image
                          height={500}
                          width={1350}
                          src={OurAccreditationImage}
                          objectFit="cover"
                        />
                      </OurAccreditationBgImgDiv>
                    </OurAccreditationDiv>
                  </>
                )}
                {/* {data["type"] === "slider" && (
                  <>
                    <MainOurStories>
                      <Container>
                        <OurStories OurStoriesArr={data?.content?.sliders} />
                      </Container>
                    </MainOurStories>
                  </>
                )} */}
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
        <link rel="icon" href={R2Favicon} />
      </Head>
      <body>
        <Header />

        {GetStaticPagesState?.contentValue &&
          Object.values(JSON.parse(GetStaticPagesState?.contentValue))?.map(
            (data, index) => (
              <div key={index}>
                {data["type"] === "top_banner" && (
                  <div>
                    <Hero
                      name={"about-us-page"}
                      title={data["content"]?.title_ar}
                      background={data["content"]?.background_color}
                      image={data["content"]?.image}
                    />

                    <SectionAfterHero>
                      <SectionAfterHeroRow>
                        <Swiper
                          spaceBetween={0}
                          slidesPerView={1}
                          loop={true}
                          modules={[Autoplay]}
                          autoplay={true}
                          speed={500}
                        >
                          {data["content"]?.tabs?.map((item, index) => (
                            <SwiperSlide>
                              <SectionAfterHeroCol
                                onClick={() =>
                                  router.push(`/ar/${item?.link_ar}`)
                                }
                                span={24}
                                key={index}
                              >
                                <Row>
                                  <AlignCenter>
                                    <TitleDiv>{item?.title_ar}</TitleDiv>
                                  </AlignCenter>
                                  <ImgDiv>
                                    {item?.image !== "" &&
                                      item?.image !== null && (
                                        <img loading="lazy"alt={""}
                                          height={30}
                                          width={30}
                                          src={item?.image}
                                        />
                                      )}
                                  </ImgDiv>
                                </Row>
                              </SectionAfterHeroCol>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </SectionAfterHeroRow>
                    </SectionAfterHero>
                    <MainBreadcrumbDiv>
                      <Container>
                        <BreadcrumbDiv dir="rtl">
                          <Breadcrumb>
                            <Breadcrumb.Item>
                              <Link href={"/"}>{home}</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>{about_us}</Breadcrumb.Item>
                          </Breadcrumb>
                        </BreadcrumbDiv>
                      </Container>
                    </MainBreadcrumbDiv>
                  </div>
                )}

                {data["type"] === "text_with_image" && (
                  <>
                    <AboutSection>
                      <Container>
                        {data["content"]?.heading_ar && (
                          <>
                            <LeadershipH1>
                              {data["content"]?.heading_ar}
                            </LeadershipH1>
                          </>
                        )}
                        <StyledAboutSectionRow gutter={[24, 24]}>
                          {data["content"]?.align === "right" && (
                            <>
                              <StyledColImg
                                xl={12}
                                lg={24}
                                md={24}
                                sm={24}
                                xs={24}
                              >
                                {/* <img loading="lazy"src={IntroductionImage} /> */}
                                {data["content"]?.image !== "" &&
                                  data["content"]?.image !== null && (
                                    <Image
                                      height={480}
                                      width={500}
                                      src={data["content"]?.image}
                                    />
                                  )}
                              </StyledColImg>
                              <AboutUsContentCol
                                xl={12}
                                lg={24}
                                md={24}
                                sm={24}
                                xs={24}
                                style={{ textAlign: "right" }}
                              >
                                <h1
                                  style={{
                                    fontFamily: "'GESSTwoBold', sans-serif",
                                    // width: "510px",
                                    marginBottom: "20px",
                                  }}
                                >
                                  {data["content"]?.title_ar}
                                </h1>
                                <p>{data["content"]?.description_ar}</p>
                                {data["content"]?.button_ar !== "" && (
                                  <div>
                                    <CustomButton
                                      onClick={() =>
                                        router.push(
                                          data["content"]?.button_link
                                        )
                                      }
                                      customStyle={{
                                        backgroundColor: "#105F43",
                                        color: "#fff",
                                        // width: "100px",
                                      }}
                                    >
                                      {data["content"]?.button_ar}
                                    </CustomButton>
                                  </div>
                                )}
                              </AboutUsContentCol>
                            </>
                          )}
                          {data["content"]?.align === "left" && (
                            <>
                              <AboutUsContentCol
                                xl={12}
                                lg={24}
                                md={24}
                                sm={24}
                                xs={24}
                                style={{ textAlign: "right" }}
                              >
                                <h1
                                  style={{
                                    fontFamily: "'GESSTwoBold', sans-serif",
                                    // width: "510px",
                                    marginBottom: "20px",
                                  }}
                                >
                                  {data["content"]?.title_ar}
                                </h1>
                                <p>{data["content"]?.description_ar}</p>
                                {data["content"]?.button_ar === "" && (
                                  <div>
                                    <CustomButton
                                      onClick={() =>
                                        router.push(
                                          data["content"]?.button_link
                                        )
                                      }
                                      customStyle={{
                                        backgroundColor: "#105F43",
                                        color: "#fff",
                                        // width: "100px",
                                      }}
                                    >
                                      {data["content"]?.button_ar}
                                    </CustomButton>
                                  </div>
                                )}
                              </AboutUsContentCol>
                              <StyledColImg
                                xl={12}
                                lg={24}
                                md={24}
                                sm={24}
                                xs={24}
                              >
                                {/* <img loading="lazy"src={IntroductionImage} /> */}
                                {data["content"]?.image !== "" &&
                                  data["content"]?.image !== null && (
                                    <Image
                                      height={480}
                                      width={500}
                                      src={data["content"]?.image}
                                    />
                                  )}
                              </StyledColImg>
                            </>
                          )}
                        </StyledAboutSectionRow>
                      </Container>
                      <SideDesignDiv>
                        {/* <img loading="lazy"src={SideDesign} /> */}
                        <img loading="lazy"alt={""} height={500} width={500} src={SideDesign} />
                      </SideDesignDiv>{" "}
                    </AboutSection>
                  </>
                )}
                {data["type"] === "three_card" && (
                  <>
                    <LeadershipRow gutter={[24, 24]}>
                      {data["content"]?.cards?.map((item, index) => (
                        <Col xl={5} lg={5} md={5} sm={24} xs={24} key={index}>
                          <LeadershipCard>
                            {/* <img loading="lazy"src={BoardOfTrust} /> */}
                            <Image height={250} width={250} src={item?.image} />

                            <h2>{item?.title_ar}</h2>
                            <p>{item?.description_ar}</p>
                          </LeadershipCard>
                        </Col>
                      ))}
                    </LeadershipRow>
                  </>
                )}
                {data["type"] === "slider" && (
                  <>
                    {/* Leadership */}
                    <MainOurStories>
                      <MobileContainer>
                        <OurStories OurStoriesArr={data?.content?.sliders} />
                      </MobileContainer>
                    </MainOurStories>
                  </>
                )}
                {data["type"] === "card_with_bg_image" && (
                  <>
                    <OurAccreditationDiv>
                      <OurAccreditationBgContentDiv>
                        <ContentDiv>
                          <AccreditationContainerMobile>
                            <h1>{our_accreditation}</h1>
                            <p>{about_us_para}</p>

                            <Row
                              gutter={[32, 32]}
                              style={{ marginTop: "20px" }}
                            >
                              {data?.content?.cards?.map((item, index) => (
                                <Col sm={12} xs={24} key={index}>
                                  <OurAccreditationCard>
                                    {/* <img loading="lazy"src={OurPartnerLogo} /> */}
                                    <Image alt={""}
                                      height={250}
                                      width={550}
                                      src={item?.image}
                                    />
                                  </OurAccreditationCard>
                                </Col>
                              ))}
                            </Row>
                          </AccreditationContainerMobile>
                        </ContentDiv>
                      </OurAccreditationBgContentDiv>
                      <OurAccreditationBgImgDiv>
                        {/* <img loading="lazy"src={OurAccreditationImage} /> */}
                        <Image
                          height={500}
                          width={1350}
                          src={OurAccreditationImage}
                          objectFit="cover"
                        />
                      </OurAccreditationBgImgDiv>
                    </OurAccreditationDiv>
                  </>
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

export default AboutUsPage;

const CoursesSection = styled.div`
  .ant-row {
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
`;

const SectionAfterHeroCol = styled(Col)`
  // border-right: 1px solid #ddd !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  cursor: pointer;

  .ant-row {
    justify-content: center !important;
  }
`;

const SectionAfterHero = styled.div`
  .ant-row {
    padding: 0px 50px;
  }
  background-color: #a87e33;
  margin-top: -4px;
  .ant-col:last-child {
    border-right: rgba(16, 95, 67, 0.06) important;
  }
`;

const Head1Section = styled.div`
  .ant-row {
    padding: 10px 80px;
    justify-content: space-between;
    h1 {
      margin-bottom: 0px;
      // font-weight: 700;
      font-size: 28px;
      line-height: 46px;
      color: #105f43;
    }
  }
`;

const Head1SectionDiv = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-bottom: 0px;
    margin-right: 15px;
    font-weight: 500;
  }
`;

const ImgDiv = styled.div`
  margin-left: 15px;
`;

const TitleDiv = styled.p`
  margin-bottom: 0px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #fff;
  font-family: "GESSTwoLight", sans-serif;
`;

const DescriptionDiv = styled.p`
  margin-bottom: 0px;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #717171;
`;

const AlignCenter = styled.div`
  display: grid;
  align-items: center;
`;

const BreadcrumbDiv = styled.div`
  padding: 20px 70px;

  @media (max-width: 992px) {
    padding: 20px 0;
  }
`;

const MainBreadcrumbDiv = styled.div`
  border-bottom: 1px solid #dddddd;
`;

const StyledDivider = styled(Divider)`
  margin: 14px 0 !important;
`;

const CoursesRow = styled(Row)`
  padding-inline: 66px;
  padding-bottom: 20px;
`;

const FilterDiv = styled.div`
  .ant-row {
    justify-content: space-between;
    h1 {
      margin-bottom: 0px;
      font-size: 20px;
      font-weight: 500;
    }
  }

  .ant-collapse-arrow {
    right: 6px !important;
  }

  .ant-collapse-header {
    padding: 12px 0px !important;
  }

  background: #fafafa;
  padding: 20px;
  border-radius: 15px;
  .ant-collapse-content > .ant-collapse-content-box {
    padding-bottom: 16px !important;
    padding-inline: 0px !important;
  }

  .ant-checkbox-wrapper {
    margin-left: 0px !important;
    margin-bottom: 6px !important;
  }

  .ant-collapse-content-box {
    display: grid !important;
  }
`;

const CloseDiv = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-bottom: 0px;
    margin-left: 5px;
  }
  &:hover {
    cursor: pointer;
  }
`;

const StyledSlider = styled(Slider)`
  .ant-slider-track {
    background-color: #424242 !important;
  }
  .ant-slider-handle {
    background-color: #424242 !important;
    border: solid 2px #424242 !important;
  }
`;

const PriceRangeDiv = styled.div`
  display: flex;
  p {
    margin-bottom: 0px;
  }
  .sar {
    font-size: 12px;
    display: display;
    // align-items: end;
    // font-weight: 900;
    margin-right: 5px;
    margin-top: 8px;
    color: #838383 !important;
  }
  .price {
    font-size: 19px;
    display: flex;
    align-items: end;
    color: #838383 !important;
  }
`;

const DateRangeDiv = styled.div`
  display: grid;
  width: 100% !important;

  p {
    margin-bottom: 0px;
  }
  .sar {
    font-size: 12px;
    display: display;
    // align-items: end;
    // font-weight: 900;
    margin-right: 5px;
    margin-top: 13px;
  }
  .price {
    font-size: 24px;
    display: flex;
    align-items: end;
  }
  .ant-picker {
    width: 100% !important;
    height: 42px !important;
    border: 1px solid #636363 !important;
    background-color: #fafafa !important;
    border-radius: 6px !important;
  }
  .ant-radio-checked .ant-radio-inner {
    border-color: #105f43 !important;
  }
`;

const DateRangeDiv1 = styled.div`
  display: grid;
  width: 100% !important;
  margin-top: 20px;

  p {
    margin-bottom: 0px;
  }
  .sar {
    font-size: 12px;
    display: display;
    // align-items: end;
    // font-weight: 900;
    margin-right: 5px;
    margin-top: 13px;
  }
  .price {
    font-size: 24px;
    display: flex;
    align-items: end;
  }
  .ant-picker {
    width: 100% !important;
    height: 42px !important;
    border: 1px solid #636363 !important;
    background-color: #fafafa !important;
    border-radius: 6px !important;
  }
  .ant-radio-checked .ant-radio-inner {
    border-color: #105f43 !important;
  }
`;

const PriceRangeRow = styled(Row)`
  justify-content: space-between;
`;

const DateRangeRow = styled(Row)`
  justify-content: space-between;
  width: 100% !important;
`;

const StyledGroup = styled(Radio.Group)`
  display: flex;
  justify-content: space-between;
`;

const OptionTopDiv = styled.div`
  margin-top: 6px;
`;

const PaginationRow = styled(Row)`
  justify-content: center;
  margin-top: 50px;
  .ant-pagination-prev {
    display: none !important;
  }
  div {
    box-shadow: 6px 6px 25px rgba(0, 0, 0, 0.09) !important;
    padding: 7px !important;
    border-radius: 9px !important;
  }
  .ant-pagination-item {
    border-radius: 5px !important;
    border: none !important;
    background: #f8f8f8 !important;
    a {
      color: #adadad !important;
    }
    a:hover {
      color: #adadad !important;
    }
  }
  .ant-pagination-item-active {
    background: #105f43 !important;
    color: #fff !important;
    border-color: #105f43 !important;
  }
  .ant-pagination-item-active a {
    color: #fff !important;
  }
  .ant-pagination-item:focus-visible,
  .ant-pagination-item:hover {
    border-color: #105f43 !important;
    color: #105f43 !important;
  }
  .ant-pagination-item:hover a {
    color: #105f43 !important;
  }

  .ant-pagination-prev:focus-visible .ant-pagination-item-link,
  .ant-pagination-next:focus-visible .ant-pagination-item-link,
  .ant-pagination-prev:hover .ant-pagination-item-link,
  .ant-pagination-next:hover .ant-pagination-item-link {
    border-radius: 5px !important;
    border: none !important;
    background: #f8f8f8 !important;
  }

  .ant-pagination-next {
    border-radius: 5px !important;
    border: none !important;
    background: #f8f8f8 !important;
    a {
      color: #adadad !important;
    }
  }
`;

const SectionAfterHeroRow = styled(Row)`
  background-color: #a87e33;
  .ant-col {
    padding-block: 15px !important;
  }
  .ant-col:nth-child(1) {
    background-color: #94681a;
  }
  .ant-col:nth-child(2) {
    background-color: #b58a3d;
  }
  .ant-col:nth-child(3) {
    background-color: #94681a;
  }

  @media (max-width: 992px) {
    padding: 0 !important;
  }
`;

const AboutSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 1200px) {
    height: 600px !important;
  }
  @media (max-width: 1199px) {
    height: 700px !important;
  }

  @media (max-width: 1199px) {
    height: auto !important;
  }
`;

const StyledAboutSectionRow = styled(Row)`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  padding-inline: 60px;
  margin-left: 0px !important;
  margin-right: 0px !important;
  @media (max-width: 1199px) {
    margin-inline: 8%;
    margin-top: 0px;
  }

  @media (max-width: 992px) {
    padding: 50px 0;
  }
`;

const StyledColImg = styled(Col)`
  display: flex;
  justify-content: start;
  align-items: start;
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

  @media (max-width: 1199px) {
    justify-content: center;
  }
`;

const AboutUsContentCol = styled(Col)`
  flex-direction: column;
  display: flex;
  justify-content: center;

  p {
    font-size: 16px;
    margin-bottom: 10px;
    line-height: 32px !important;
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
      font-size: 22px;
      // font-weight: 700;
      line-height: 30px;
      color: #105f43;
    }
    p {
      font-size: 14px;
      line-height: unset !important;
    }
  }
`;

const SideDesignDiv = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
  width: 100%;
  z-index: 0;
  height: 580px;
  pointer-events: none;
`;

const OurVisionSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff9ef;
  @media (min-width: 1200px) {
    height: 530px !important;
  }
  @media (max-width: 1199px) {
    height: 680px !important;
  }

  @media (max-width: 992px) {
    height: auto !important;
  }
`;

const StyledOurVisionSectionRow = styled(Row)`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  padding-inline: 73px;
  @media (max-width: 1199px) {
    margin-inline: 8%;
    margin-top: 0px;
    flex-wrap: wrap-reverse;
  }
  @media (max-width: 992px) {
    padding-inline: 0;
    padding-block: 50px;
    margin-inline: 0;
  }
`;

const StyledColOurVisionImg = styled(Col)`
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

  @media (max-width: 992px) {
    justify-content: center;
  }
`;

const OurVisionContentCol = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    font-size: 16px;
    margin-bottom: 12px;
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
      font-size: 22px;
      // font-weight: 700;
      line-height: 30px;
      color: #105f43;
    }
    p {
      font-size: 14px;
      line-height: unset !important;
    }
  }
`;

const LeftSideDesignDiv = styled.div`
  position: absolute;
  display: flex;
  justify-content: start;
  width: 100%;
  z-index: 0;
  height: 650px;
  pointer-events: none;
  img {
  width: 100%;
  margin-top: 50px;
  }
`;

// our mission
const OurMissionSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-inline: 75px;
  align-items: center;
  background: #fff;
  @media (min-width: 1200px) {
    height: 600px !important;
  }
  @media (max-width: 1199px) {
    height: 680px !important;
  }
  @media (max-width: 992px) {
    height: auto !important;
    padding: 50px 0;
  }
`;

const StyledOurMissionSectionRow = styled(Row)`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  @media (max-width: 1199px) {
    margin-inline: 8%;
    margin-top: 0px;
    flex-wrap: wrap-reverse;
  }
  @media (max-width: 992px) {
    margin-inline: 0;
  }
`;

const StyledColOurMissionImg = styled(Col)`
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
  @media (max-width: 992px) {
    justify-content: center;
  }
`;

const OurMissionContentCol = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    font-size: 16px;
    margin-bottom: 10px;
    line-height: 28px !important;
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
      font-size: 22px;
      // font-weight: 700;
      line-height: 30px;
      color: #105f43;
    }
    p {
      font-size: 14px;
      line-height: unset !important;
    }
  }
`;

// our training sites
const OurTrainingSitesSection = styled.div`
  width: 100%;
  display: flex;
  padding-inline: 75px;
  justify-content: center;
  align-items: center;
  background: #fff;
  @media (min-width: 1200px) {
    height: 600px !important;
  }
  @media (max-width: 1199px) {
    height: 680px !important;
  }

  @media (max-width: 992px) {
    height: auto !important;
    padding-inline: 0 !important;
    padding-block: 50px;
  }
`;

const StyledOurTrainingsSitesSectionRow = styled(Row)`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  @media (max-width: 1199px) {
    margin-inline: 8%;
    margin-top: 0px;
    // flex-wrap: wrap-reverse;
  }
  @media (max-width: 992px) {
    margin-inline: 0 !important;
  }
`;

const StyledColOurTrainingSitesImg = styled(Col)`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: -30px;
  img {
    // height: 440px;
    width: 95%;
  }
  @media (max-width: 1199px) {
    img {
      height: 250px;
      width: 350px;
      margin-top: 0px;
    }
  }
  @media (max-width: 992px) {
    margin-top: 0 !important;
  }
`;

const StyledColOurTrainingSitesImg1 = styled(Col)`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: -30px;
  img {
    // height: 440px;
    width: 95%;
  }
  @media (max-width: 1199px) {
    img {
      height: 250px;
      margin-top: 0px;
    }
  }
  @media (max-width: 992px) {
    justify-content: center;
  }
`;

const OurTrainingSitesContentCol = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    font-size: 16px;
    margin-bottom: 10px;
    line-height: 28px !important;
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
      font-size: 22px;
      // font-weight: 700;
      line-height: 30px;
      color: #105f43;
    }
    p {
      font-size: 14px;
      line-height: unset !important;
    }
  }
`;

const FounderAndChancellorContentCol = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    font-size: 16px;
    margin-bottom: 10px;
    line-height: 28px !important;
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
      font-size: 22px;
      // font-weight: 700;
      line-height: 30px;
      color: #000;
    }
    p {
      font-size: 14px;
      line-height: unset !important;
    }
  }
`;

const LeadershipH1 = styled.h1`
  margin-bottom: 50px;
  text-align: center;
  color: #105f43;
  font-size: 36px;
  // font-weight: 700;
  line-height: 52px;
  font-family: "GESSTwoBold", sans-serif;

  @media (max-width: 992px) {
    font-size: 32px;
    margin-bottom: 10px;
    text-align: start;
  }
`;

// OurLeadershipSection
const OurLeadershipSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-block: 80px;

  // @media (min-width: 1200px) {
  //   height: 1050px !important;
  // }
  // @media (max-width: 1199px) {
  //   height: 1100px !important;
  // }

  @media (max-width: 992px) {
    padding-block: 50px;
  }
`;

const OurLeadershipDiv = styled.div`
  width: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
  background: #fff;
`;

const StyledOurLeadershipSectionRow = styled(Row)`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  margin-inline: 80px;
  @media (max-width: 1199px) {
    margin-inline: 8%;
    margin-top: 0px;
    flex-wrap: wrap-reverse;
  }
  @media (max-width: 992px) {
    margin-inline: 0 !important;
  }
`;

const OurAccreditationDiv = styled.div`
  position: relative;
`;

const OurAccreditationBgImgDiv = styled.div`
  img {
    width: 100% !important;
    height: 500px;
    object-fit: cover;
  }
  height: 500px;

  @media (max-width: 992px) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;

    img {
      height: 100%;
    }
  }
`;

const OurAccreditationBgContentDiv = styled.div`
  position: absolute;
  height: 500px;
  width: 100%;
  padding: 8px 80px;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 992px) {
    position: relative;
    height: auto !important;
    padding: 50px 20px !important;
    z-index: 2;
  }
`;

const ContentDiv = styled.div`
  h1 {
    font-family: "GESSTwoBold", sans-serif;
    text-align: center;
    color: #105f43;
    font-size: 40px;
  }
  p {
    line-height: 28px;
    font-size: 16px;
    font-weight: 400;
    color: #636363;
  }
`;

const OurAccreditationCard = styled.div`
  background: #fff;
  padding: 50px;
  display: flex;
  justify-content: center;
  border: 1px solid rgba(18, 96, 67, 0.28);
  border-radius: 24px;
  height: 170px;
  align-items: center;
  img {
    height: 70px !important;
    object-fit: contain !important;
  }
`;

const LeadershipCard = styled.div`
  h2 {
    font-family: "GESSTwoLight", sans-serif;
    font-weight: 600;
    font-size: 18px;
    line-height: 12px;
    color: #000000;
    margin-top: 24px;
  }

  p {
    font-weight: 400;
    font-size: 12px;
    line-height: 19px;
    color: #636363;
  }

  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    // height: 200px;
    width: 100%;
  }
`;

const LeadershipRow = styled(Row)`
  justify-content: center !important;
  margin-top: 40px;
  margin-bottom: 80px;
  margin-left: 0px !important;
  margin-right: 0px !important;

  h2 {
    text-align: center;
  }
  p {
    text-align: center;
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
    min-width: 992px;
  }

  @media only screen and (min-width: 1160px) and (max-width: 1258px) {
    min-width: 1160px;
  }

  @media only screen and (min-width: 1259px) and (max-width: 1359px) {
    // min-width: 1260px;
    min-width: 1220px;
  }

  @media (min-width: 1342px) {
    // min-width: 1340px;
    min-width: 1260px;
  }
`;

const AccreditationContainer = styled.div`
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
    // min-width: 1200px;
    min-width: 1120px;
  }

  @media (min-width: 1342px) {
    // min-width: 1200px;
    min-width: 1120px;
  }

  @media (max-width: 992px) {
    padding: 0;

    h1 {
      font-size: 22px;
      text-align: center;
    }
    p {
      font-size: 14px;
      line-height: unset !important;
      text-align: center;
    }
  }
`;

const AccreditationContainerMobile = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  h1 {
    text-align: end !important;
  }
  p {
    text-align: end !important;
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
    min-width: 1200px;
  }

  @media (min-width: 1342px) {
    min-width: 1200px;
  }

  @media (max-width: 992px) {
    padding: 0;

    h1 {
      font-size: 22px;
      text-align: right;
    }
    p {
      font-size: 14px;
      line-height: unset !important;
      text-align: right;
    }
  }
`;

const MainOurStories = styled.div`
  background: rgba(16, 95, 67, 0.05);
`;

const StyledCustomButton = styled(CustomButton)`
  background-color: #105f43 !important;
  color: #fff !important;
  z-index: 99 !important;
`;

const StyledAboutUsh1 = styled.h1`
  font-family: GESSTwoBold, sans-serif;
  margin-bottom: 20px;
  @media (min-width: 992px) {
    width: 510px;
  }
`;

const MobileContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;

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
    // min-width: 1260px;
    min-width: 1220px;
  }

  @media (min-width: 1342px) {
    // min-width: 1340px;
    min-width: 1260px;
  }
`;
