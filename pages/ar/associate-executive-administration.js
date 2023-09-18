import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import router from "next/router";
import Image from "next/image";
import Link from "next/link";

import Hero from "../../src/components/rtl/Hero";

import endpoints from "../../src/api";

import { Breadcrumb, Col, Row } from "antd";
import { GoldenFan, LeftSideDesign, R2Favicon } from "../../images";

import CustomButton from "../../src/components/rtl/Button";
import Header from "../../src/components/rtl/header";
import Footer from "../../src/components/rtl/footer";
import {
  about_us,
  associate_executive_administration,
  home,
  LearningInstituteHeroText,
  read_more,
} from "../../src/helpers/LanguageConstant";

const AssociateExecutiveAdministration = () => {
  const AssociateCardArr = [
    {
      title: "(CPD) والمحاكاة",
      description:
      " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      link: "/ar/simulation",
    },
    {
      title: "دراسات أكاديمية",
      description:
        " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      link: "/ar/academic-studies",
    },
    {
      title: "معهد التعلم",
      description:
        " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      link: "/ar/learning-institute",
    },
  ];

  const [GetStaticPagesState, setGetStaticPagesState] = useState([]);
  const GetStaticPages = async () => {
    try {
      const response = await endpoints.GetStaticPages("associate-executive-administration");
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
                {data["type"] === "top_banner" && (<>
                  <div>
                    <Hero 
                      title={data?.content?.title_ar}
                      name={"associate-executive-administration"}
                    />
                  </div>
                  
                  <LeftSideDesignDiv>
                    <Image alt={""} height={500} width={500} src={LeftSideDesign} />
                  </LeftSideDesignDiv>
                  
                  {/* Breadcrumb */ }
                  <MainBreadcrumbDiv>
                    <Container>
                      <BreadcrumbDiv dir="rtl">
                        <Breadcrumb>
                          <Breadcrumb.Item>
                            <Link href={"/ar"}>{home}</Link>
                          </Breadcrumb.Item>
                          <Breadcrumb.Item>
                            <Link href={"/ar/about-us"}>{about_us}</Link>
                          </Breadcrumb.Item>
                          <Breadcrumb.Item>
                            {associate_executive_administration}
                          </Breadcrumb.Item>
                        </Breadcrumb>
                      </BreadcrumbDiv>
                    </Container>
                  </MainBreadcrumbDiv>
                </>)}
                {data["type"] === "three_card" && (
                  <Container>
                    <AssociateCardSection>
                      <AssociateCardRow gutter={[48, 48]}>
                        {data?.content?.cards?.map((item, index) => (
                          <AssociateCardCol key={index} xl={8} lg={12}>
                            <AssociateCardDiv dir="rtl">
                              {/* <img loading="lazy"src={GoldenFan} /> */}
                              <img loading="lazy"alt={""} height={50} width={50} src={item?.image} />
                  
                              <h1>{item?.title_ar}</h1>
                              <p>{item?.description_ar} </p>
                              <CustomButton
                                customStyle={{
                                  background: "#105F43",
                                  borderRadius: "10px",
                                  color: "#fff",
                                  cursor: "pointer",
                                }}
                                onClick={() => router.push(`/ar/${item?.button_link}`)}
                              >
                                {item?.button_ar}
                              </CustomButton>
                            </AssociateCardDiv>
                          </AssociateCardCol>
                        ))}
                      </AssociateCardRow>
                    </AssociateCardSection>
                  </Container>
                )}
              </div>
            )
          )
        }
        
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
              (data,index) => (
                <div key={index}>
                  {data["type"] === "top_banner" && (<>
                   <div>
                    <Hero 
                      title={data?.content?.title_ar}
                      name={"associate-executive-administration"}
                    />
                  </div>

                  <LeftSideDesignDiv>
                    <Image alt={""} height={500} width={500} src={LeftSideDesign} />
                  </LeftSideDesignDiv>

                  {/* Breadcrumb */ }
                  <MainBreadcrumbDiv>
                    <Container>
                      <BreadcrumbDiv dir="rtl">
                        <Breadcrumb>
                          <Breadcrumb.Item>
                            <Link href={"/ar"}>{home}</Link>
                          </Breadcrumb.Item>
                          <Breadcrumb.Item>
                            <Link href={"/ar/about-us"}>{about_us}</Link>
                          </Breadcrumb.Item>
                          <Breadcrumb.Item>
                            {associate_executive_administration}
                          </Breadcrumb.Item>
                        </Breadcrumb>
                      </BreadcrumbDiv>
                    </Container>
                  </MainBreadcrumbDiv>
                  </>)}
                  {data["type"] === "three_card" && (
                    <Container>
                      <AssociateCardSection>
                        <AssociateCardRow dir="rtl" gutter={[28, 28]}>
                          {data?.content?.cards?.map((item, index) => (
                            <AssociateCardCol sm={12} key={index}>
                              <AssociateCardDiv>
                                <img loading="lazy"alt={""} height={50} width={50} src={item?.image} />

                                <h1>{item?.title_ar}</h1>
                                <p>{item?.description_ar} </p>
                                <CustomButton
                                  customStyle={{
                                    background: "#105F43",
                                    borderRadius: "10px",
                                    color: "#fff",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => router.push(`/ar/${item?.button_link}`)}
                                >
                                  {item?.button_ar}
                                </CustomButton>
                              </AssociateCardDiv>
                            </AssociateCardCol>
                          ))}
                        </AssociateCardRow>
                      </AssociateCardSection>
                    </Container>
                  )}
                </div>
              )
            )
          }

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
  padding: 20px 0;

  @media (max-width: 992px) {
    padding: 20px 0;
  }
`;

const LeftSideDesignDiv = styled.div`
  position: absolute;
  display: flex;
  justify-content: start;
  width: 100%;
  z-index: 0;
  height: 650px;
  img {
  width: 100%;
  margin-top: 50px;
  }
`;

const AssociateCardSection = styled.div`
  padding: 80px 0;

  @media (max-width: 992px) {
    padding: 50px 0;
  }
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

const AssociateCardRow = styled(Row)`
  margin-inline: 0px !important;
`;

const AssociateCardCol = styled(Col)``;

const MainBreadcrumbDiv = styled.div`
  border-bottom: 1px solid #dddddd;
  position: relative;
`;

const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 576px) {
    max-width: 776px;
  }

  @media (min-width: 768px) {
    max-width: 768px;
  }

  @media (min-width: 992px) {
    min-width: 992px;
  }

  @media only screen and (min-width: 1160px) and (max-width: 1258px) {
    min-width: 1120px;
  }

  @media only screen and (min-width: 1259px) and (max-width: 1359px) {
    min-width: 1120px;
  }

  @media (min-width: 1342px) {
    min-width: 1120px;
  }
`;
