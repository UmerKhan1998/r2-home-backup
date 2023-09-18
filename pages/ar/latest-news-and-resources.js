import React, { useLayoutEffect, useRef, useState, useMemo } from "react";
import Head from "next/head";
// import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Links from "next/link";
import endpoints from "../../src/api/index";

import styled from "styled-components";
import {
  Row,
  Col,
  Checkbox,
  Collapse,
  Rate,
  Divider,
  Breadcrumb,
  Input,
} from "antd";
import CustomButton from "../../src/components/rtl/Button";

// components
import {
  CardImg,
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
  Geo,
  GoldStar,
  Internship,
  LanguageIcon,
  LatestNewsResourceImg,
  Lectures,
  LicenseTraining,
  Mail,
  OnlineEducation,
  Phone,
  PostGraduateTraining,
  R2Favicon,
  RecentPostImg,
  Share,
  SideDesign,
  SimulationTraining,
  Star,
  StudentsTraining,
  Subject,
  SupportImage,
  UserAvatarImg,
  Workshop,
} from "../../images";
import { AiFillTwitterCircle, AiOutlineLock } from "react-icons/ai";

import Hero from "../../src/components/rtl/Hero";

import ReactPlayer from "react-player";
import Header from "../../src/components/rtl/header";
import Footer from "../../src/components/rtl/footer";
import { BsFacebook } from "react-icons/bs";
import { RiWhatsappFill } from "react-icons/ri";
import router from "next/router";
import { getCookies } from "../../src/helpers/cookie";
import moment from "moment";
import {
  home,
  latestNewsResources,
  Posts,
  read_more,
  Recent,
} from "../../src/helpers/LanguageConstant";

const { TextArea } = Input;

const Contact = () => {
  const authToken = getCookies("token");
  const [getGetNewsAndResourcesState, setGetNewsAndResourcesState] = useState();
  const GetNewsAndResourcesFunc = async () => {
    try {
      const response = await endpoints.GetNewsAndResources(authToken);
      if (response?.data?.statusCode === "200") {
        setGetNewsAndResourcesState(response?.data?.data);
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  const [getGetNewsAndResourcesTakeState, setGetNewsAndResourcesTakeState] =
    useState();
  const GetNewsAndResourcesTakeFunc = async () => {
    try {
      const response = await endpoints.GetNewsAndResourcesTake(authToken);
      if (response?.data?.statusCode === "200") {
        setGetNewsAndResourcesTakeState(response?.data?.data);
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  useLayoutEffect(() => {
    GetNewsAndResourcesFunc();
    GetNewsAndResourcesTakeFunc();
  }, []);

  const removeElement = (Description) => {
    const regexForStripHTML = /(<([^>]+)>)/gi;
    const text = Description;
    const stripContent = text?.replaceAll(regexForStripHTML, "");
    return stripContent;
  };

  // //console.log("hgfidjgfdgudiuvgkjgoidsf", getGetNewsAndResourcesState);

  const initialState = {
    your_name: "",
    your_email: "",
    subject: "",
    message: "",
  };

  const [scroll, setScroll] = useState(0);

  const [supportState, setSupportState] = useState(initialState);

  useLayoutEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  });

  const contactArr = [
    {
      img: Phone,
      title: "Telephone",
      contact1: "+971 123 000 0000",
      contact2: "+971 123 000 0000",
    },
    {
      img: Mail,
      title: "Our Mail",
      contact1: "ata@kfmc.med.sa",
      contact2: "Support@kfmc.med.sa",
    },
    {
      img: Geo,
      title: "Location",
      contact1: "59046 Riyadh 11525",
      contact2: "Kingdom of Saudi Arabia",
    },
  ];

  const inputHandler = (e) =>
    setSupportState({
      ...supportState,
      [e.target.name]: e.target.value,
    });

  const recentPostArr = [
    {
      date: "January 11, 2022",
      para: "Postgraduate Studies & Scholarships Department",
    },
    {
      date: "January 11, 2022",
      para: "Postgraduate Studies & Scholarships Department",
    },
    {
      date: "January 11, 2022",
      para: "Postgraduate Studies & Scholarships Department",
    },
    {
      date: "January 11, 2022",
      para: "Postgraduate Studies & Scholarships Department",
    },
    {
      date: "January 11, 2022",
      para: "Postgraduate Studies & Scholarships Department",
    },
  ];

  const blogsArr = [
    {
      title: "Postgraduate Studies & Scholarships Department",
      date: "January 11, 2022 / by Umer bin Hashim",
      para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    },
    {
      title: "Postgraduate Studies & Scholarships Department",
      date: "January 11, 2022 / by Umer bin Hashim",
      para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    },
    {
      title: "Postgraduate Studies & Scholarships Department",
      date: "January 11, 2022 / by Umer bin Hashim",
      para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    },
  ];

  const departmentArr = [
    "All",
    "Learning Institute",
    "Academic Studies",
    "(CPD) & Simulation",
  ];

  const onChange = (checkedValues) => {
    //console.log("checked = ", checkedValues);
  };

  const [dropdownCaretState, setDropdownCaretState] = useState(false);

  const DesktopView = (
    <div>
      <Head>
        <title>Riyadh Second Health Cluster</title>
        <link rel="icon" href={R2Favicon} />
      </Head>
      <body>
        <Header
          dropdownCaretState={dropdownCaretState}
          setDropdownCaretState={setDropdownCaretState}
        />

        <div onClick={() => setDropdownCaretState(false)}>
          <div>
            <div>
              <Hero name={"latest_news_resources"} />
            </div>

            <MainBreadcrumbDiv>
              <Container>
                <BreadcrumbDiv dir="rtl">
                  <Breadcrumb>
                    <Breadcrumb.Item>
                      <Links href={"/ar"}>{home}</Links>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>{latestNewsResources}</Breadcrumb.Item>
                  </Breadcrumb>
                </BreadcrumbDiv>
              </Container>
            </MainBreadcrumbDiv>

            <SideDesignDiv>
              <img loading="lazy"alt={""} height={500} width={500} src={SideDesign} />
            </SideDesignDiv>

            <Container>
              <StyledBlogRow dir="rtl" gutter={[24, 24]}>
                <Col span={18}>
                  {getGetNewsAndResourcesState?.map((item, index) => (
                    <StyledBlogMainDiv key={index}>
                      <StyledBlogDiv>
                        <img
                          width={"100%"}
                          height={""}
                          src={(item?.bannerImage_AR === "" || item?.bannerImage_AR === null) ? (item?.bannerImage_EN) : (item?.bannerImage_AR)}
                        />
                      </StyledBlogDiv>
                      <StyledSocialRow>
                        <StyledTypeCategoryDiv>
                          <p>{item?.departmentName}</p>
                        </StyledTypeCategoryDiv>
                        <StyledSocialLinksDiv>
                          <BsFacebook color="#3B5998" size={26} />
                          <AiFillTwitterCircle color="#1DA1F2" size={30} />
                          <RiWhatsappFill color="#00D95F" size={30} />
                        </StyledSocialLinksDiv>
                      </StyledSocialRow>
                      <StyledContentRow>
                        <h1>{(item?.title_AR === "" || item?.title_AR === null) ? (item?.title_EN) : (item?.title_AR)}</h1>
                        <p>{moment(item?.insertDate).format("ll")}</p>
                      </StyledContentRow>
                      <p className="desc">{removeElement((item?.body_AR === "" || item?.body_AR === null) ? (item?.body_EN) : (item?.body_AR))}</p>
                      <CustomButton
                        customStyle={{ background: "#105F43", color: "#fff" }}
                        onClick={() =>
                          router.push(
                            `/ar/latest-news-and-resources/${item?.id}`
                          )
                        }
                      >
                        {read_more}
                      </CustomButton>
                    </StyledBlogMainDiv>
                  ))}
                </Col>
                <Col span={6}>
                  <StyledRecentlyPostDiv>
                    <h2>
                      {Recent} {Posts}
                    </h2>
                    {getGetNewsAndResourcesTakeState?.map((item, index) => (
                      <StyledRecentlyPostInnerDiv
                        style={{ cursor: "pointer" }}
                        key={index}
                        onClick={() => {
                          router.push(`/latest-news-and-resources/${item?.id}`);
                        }}
                      >
                        <img
                          src={(item?.bannerImage_AR === "" || item?.bannerImage_AR === null) ? (item?.bannerImage_EN) : (item?.bannerImage_AR)}
                          width={80}
                          height={80}
                        />
                        <StyledRecentlyPostInnerContentDiv>
                          <p className="date">
                            {moment(item?.insertDate).format("ll")}
                          </p>
                          <p className="para">{(item?.title_AR === "" || item?.title_AR === null) ? (item?.title_EN) : (item?.title_AR)}</p>
                        </StyledRecentlyPostInnerContentDiv>
                      </StyledRecentlyPostInnerDiv>
                    ))}
                  </StyledRecentlyPostDiv>
                  {/* <StyledRecentlyPostDiv1>
                    <h2>Associate Executive Administration</h2>
                    <Checkbox.Group
                      style={{
                        width: "100%",
                      }}
                      onChange={onChange}
                    >
                      <StyledCheckBoxRow>
                        {departmentArr?.map((item, index) => (
                          <Col span={24} key={index}>
                            <Checkbox value={item}>{item}</Checkbox>
                          </Col>
                        ))}
                      </StyledCheckBoxRow>
                    </Checkbox.Group>
                  </StyledRecentlyPostDiv1> */}
                </Col>
              </StyledBlogRow>
            </Container>
          </div>
          <Footer />
        </div>
      </body>
    </div>
  );
  const MobileView = (
    <div>
      <Head>
        <title>Riyadh Second Health Cluster</title>
        <link rel="icon" href={R2Favicon} />
      </Head>
      <body>
        <Header />

        <div>
          <div>
            <Hero name={"latest_news_resources"} />
          </div>

          <MainBreadcrumbDiv>
            <Container>
              <BreadcrumbDiv dir="rtl">
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <Links href={"/"}>{home}</Links>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>{latestNewsResources}</Breadcrumb.Item>
                </Breadcrumb>
              </BreadcrumbDiv>
            </Container>
          </MainBreadcrumbDiv>

          <SideDesignDiv>
            <img loading="lazy"alt={""} height={100} width={5} src={SideDesign} />
          </SideDesignDiv>

          <Container>
            <StyledBlogRow dir="rtl" gutter={[24, 24]}>
              <Col xl={18} lg={18} md={18} sm={24} xs={24}>
                {getGetNewsAndResourcesState?.map((item, index) => (
                  <StyledBlogMainDiv key={index}>
                    <StyledBlogDiv>
                      <img loading="lazy"width={"100%"} height={"100%"} src={(item?.bannerImage_AR === "" || item?.bannerImage_AR === null) ? (item?.bannerImage_EN) : (item?.bannerImage_AR)} />
                    </StyledBlogDiv>
                    <StyledSocialRow>
                      <StyledTypeCategoryDiv>
                        <p>{item?.departmentName}</p>
                      </StyledTypeCategoryDiv>
                      <StyledSocialLinksDiv>
                        <BsFacebook color="#3B5998" size={26} />
                        <AiFillTwitterCircle color="#1DA1F2" size={30} />
                        <RiWhatsappFill color="#00D95F" size={30} />
                      </StyledSocialLinksDiv>
                    </StyledSocialRow>
                    <StyledContentRow>
                      <h1>{(item?.title_AR === "" || item?.title_AR === null) ? (item?.title_EN) : (item?.title_AR)}</h1>
                      <p>{moment(item?.insertDate).format("ll")}</p>
                    </StyledContentRow>
                    <p className="desc">{removeElement((item?.body_AR === "" || item?.body_AR === null) ? (item?.body_EN) : (item?.body_AR))}</p>
                    <CustomButton
                      customStyle={{ background: "#105F43", color: "#fff" }}
                      onClick={() =>
                        router.push(`/ar/latest-news-and-resources/${item?.id}`)
                      }
                    >
                      {read_more}
                    </CustomButton>
                  </StyledBlogMainDiv>
                ))}
              </Col>
              <Col xl={6} lg={6} md={6} sm={24} xs={24}>
                <StyledRecentlyPostDiv>
                  <h2>{Recent} {Posts}</h2>
                  {getGetNewsAndResourcesTakeState?.map((item, index) => (
                    <StyledRecentlyPostInnerDiv key={index}
                    onClick={() => {
                      router.push(`/latest-news-and-resources/${item?.id}`);
                    }}>
                      <img loading="lazy"src={(item?.bannerImage_AR === "" || item?.bannerImage_AR === null) ? (item?.bannerImage_EN) : (item?.bannerImage_AR)} width={80} height={80} style={{marginRight: "10px"}} />
                      <StyledRecentlyPostInnerContentDiv>
                        <p className="date">{moment(item?.insertDate).format("ll")}</p>
                        <p className="para">{(item?.title_AR === "" || item?.title_AR === null) ? (item?.title_EN) : (item?.title_AR)}</p>
                      </StyledRecentlyPostInnerContentDiv>
                    </StyledRecentlyPostInnerDiv>
                  ))}
                </StyledRecentlyPostDiv>
                {/* <StyledRecentlyPostDiv1>
                  <h2>Associate Executive Administration</h2>
                  <Checkbox.Group
                    style={{
                      width: "100%",
                    }}
                    onChange={onChange}
                  >
                    <StyledCheckBoxRow>
                      {departmentArr?.map((item, index) => (
                        <Col span={24} key={index}>
                          <Checkbox value={item}>{item}</Checkbox>
                        </Col>
                      ))}
                    </StyledCheckBoxRow>
                  </Checkbox.Group>
                </StyledRecentlyPostDiv1> */}
              </Col>
            </StyledBlogRow>
          </Container>
        </div>
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

export default Contact;

const BreadcrumbDiv = styled.div`
  padding: 20px 0px;

  @media (max-width: 992px) {
    padding: 20px 0;
  }
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
    min-width: 1120px;
  }

  @media (min-width: 1342px) {
    min-width: 1120px;
  }
`;

const ContactRow = styled(Row)`
  border-bottom: 1px solid #ddd;
  .ant-col:nth-child(3) {
    border-right: 1px solid transparent !important;
  }
  padding: 40px 0;
  margin: 0 70px 40px;

  @media (max-width: 992px) {
    margin: 40px 0 !important;
    padding: 0 !important;
  }
`;

const ContactCol = styled(Col)`
  border-right: 1px solid #ddd;

  h1 {
    margin-bottom: 0px;
    font-family: "TitilliumBold", sans-serif;
    // font-weight: 700;
    font-size: 24px;
    line-height: 22px;
    color: #105f43;
    margin: 15px 0 12px 0;
  }

  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    margin-block: 15px;
    object-fit: contain;
  }

  @media (max-width: 992px) {
    border: 0;
    padding-block: 30px;

    :not(:last-child) {
      border-bottom: 1px solid #ddd;
    }
  }
`;

const PhoneNumberDiv = styled.div`
  p {
    margin-bottom: 8px;
    text-align: center;
  }
`;

const StyledSupportImageRow = styled(Row)`
  justify-content: center;
`;

const StyledSupportImageCol1 = styled(Col)``;

const StyledSupportImageCol2 = styled(Col)`
  img {
    width: 100%;
  }
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 992px) {
    margin: 30px 0;
  }
`;

const StyledInput = styled(Input)`
  margin-bottom: 20px;
  background: #f8f8f8;
  border: 1px solid rgba(245, 245, 245, 0.1);
  border-radius: 10px;
  padding: 15px;
`;

const StyledTextarea = styled(TextArea)`
  margin-bottom: 20px;
  background: #f8f8f8;
  border: 1px solid rgba(245, 245, 245, 0.1);
  padding: 15px;
  border-radius: 10px;
`;

const AgrrementRow = styled(Row)`
  .ant-checkbox {
    margin-bottom: 20px;
  }
`;

const SupportSection = styled.div`
  margin-block: 70px;
`;

const StyledBlogRow = styled(Row)`
  // padding-inline: 70px;
  padding-block: 40px;
`;

const StyledRecentlyPostDiv = styled.div`
  // border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 7px;
  box-shadow: 6px 6px 25px rgba(0, 0, 0, 0.09);
  padding: 20px;
  h2 {
    color: #105f43;
    font-family: "GESSTwoBold", sans-serif;
    margin-bottom: 0px;
  }
`;

const StyledRecentlyPostDiv1 = styled.div`
  // border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 7px;
  box-shadow: 6px 6px 25px rgba(0, 0, 0, 0.09);
  padding: 15px;
  margin-top: 24px;
  h2 {
    color: #105f43;
    font-family: "GESSTwoBold", sans-serif;
    margin-bottom: 20px;
  }
`;

const StyledSocialLinksDiv = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 12px;
  }
`;

const StyledContentRow = styled(Row)`
  margin-top: 15px;
  display: grid;
  h1 {
    font-family: "GESSTwoBold", sans-serif;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StyledTypeCategoryDiv = styled.div`
  background: #f1f6f4 !important;
  padding: 6px 10px;
  border-radius: 4px;

  p {
    margin-bottom: 0px;
    color: #105f43;
    font-family: "TitilliumMedium", sans-serif;
  }
`;

const StyledRecentlyPostInnerDiv = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  padding-top: 15px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  &:nth-child(1) {
    padding-top: 0px;
    border-top: 1px solid rgba(0, 0, 0, 0) !important;
  }
  &:nth-last-child {
    padding-bottom: 0px;
  }
`;

const StyledRecentlyPostInnerContentDiv = styled.div`
  margin-right: 10px;
  .date {
    font-family: "TitilliumMedium", sans-serif;
    color: #105f43;
  }
  .para {
    font-size: 10px;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  p {
    margin-bottom: 0px;
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

const StyledSocialRow = styled(Row)`
  margin-top: 15px;
`;

const StyledBlogDiv = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px;
  @media (min-width: 992px) {
    // height: 278px;
  }
  @media (max-width: 991px) {
    // height: 120px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
`;

const StyledBlogMainDiv = styled.div`
  margin-bottom: 40px;
  &:nth-last-child(1) {
    margin-bottom: 0px;
  }

  .desc {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StyledCheckBoxRow = styled(Row)`
  display: grid !important;
  .ant-col {
    margin-bottom: 15px;
  }
`;
