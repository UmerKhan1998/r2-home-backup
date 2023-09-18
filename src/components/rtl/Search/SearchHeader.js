import React, { useState, useLayoutEffect, useEffect } from "react";
import "antd/dist/antd.css";
import {
  SearchIcon,
  courseBullet,
  ProgramBullet,
  TrainingBullet,
  ActivityBullet,
  Logo,
} from "../../../../images";
import Image from "next/image";
import styled from "styled-components";
import endpoints from "../../../api/index";
import {
  Col,
  Row,
  Input,
  Popover,
  Divider,
  Skeleton,
  Drawer,
  Empty,
} from "antd";
import image from "next/image";
import Rolling from "../../../../public/images/Rolling.gif";
import { useRouter } from "next/router";
import { Link } from "react-scroll";
import {
  courses,
  popular,
  programs,
  trainings,
  view_all_results,
  WhatDoYouWantToLearn,
} from "../../../helpers/LanguageConstant";
const { Search } = Input;

const SearchHeader = () => {
  const router = useRouter();

  const [Courses, setCourses] = useState();
  const [Programs, setPrograms] = useState();
  const [Trainings, setTrainings] = useState();
  const [Activities, setActivities] = useState();
  const [SearchValue, setSearchValue] = useState("");
  const [isDesktop, setIsDesktop] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [getCourseTrainingSearchLovState, setGetCourseTrainingSearchLovState] =
    useState([]);

  // //console.log(
  //   "getCourseTrainingSearchLovState",
  //   getCourseTrainingSearchLovState
  // );

  const getCourseDetailRecordFunc = async (language, search) => {
    setLoading(true);
    try {
      const response = await endpoints.getCourseTrainingSearchLov(
        language,
        search
      );
      if (response) {
        //console.log("response", response?.data?.data);
        setGetCourseTrainingSearchLovState(response?.data?.data);
        setLoading(false);
      }
    } catch (err) {
      //console.log("err", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    // alert("Dg");
    // getCourseDetailRecordFunc("Arabic", SearchValue);
  }, [SearchValue]);

  //drawer's config
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  //dummy data
  const dummyCourses = [
    "Learn Medical Language and Terminology",
    "Learn Medical terminology Courses",
    "Learn Medical Writing for Health",
  ];
  const dummyPrograms = [
    "Learn Medi-Facial Skin Care Aesthetics",
    "Learn How to start in Medical Aesthetics",
    "Learn Clinical Photography in Dentistry",
  ];
  const dummyTrainings = [
    "Learn Chemicals and Health",
    "Learn Doctor of Naturopathic Medicine",
    "Learn Easy Anatomy and Physiology",
  ];
  const dummyActivities = [
    "Webinar of Learn Nursing",
    "Workshop of Learn Dermatology",
    "Symposium of Learn Dentistry",
  ];

  useLayoutEffect(() => {
    setCourses(dummyCourses);
    setPrograms(dummyPrograms);
    setTrainings(dummyTrainings);
    setActivities(dummyActivities);
  }, []);

  const searchOnChangeHandle = (e) => {
    let val = e.target.value;
    setSearchValue(val);
    getCourseDetailRecordFunc("Arabic", val);
    //console.log(val);
  };
  const searchOnSearchHandle = (val) => {
    //console.log(val);
  };

  const SearchListItem = ({ bulletImg, item }) => (
    <SearchListItemDiv
      dir="rtl"
      onClick={() => router.push(`/ar/course-detail/${item?.id}`)}
    >
      <img loading="lazy"alt={""} width={20} height={20} src={bulletImg} />
      <p>{item?.title_AR}</p>
    </SearchListItemDiv>
  );

  const SearchListItemProgram = ({ bulletImg, item }) => (
    <SearchListItemDiv
      dir="rtl"
      onClick={() => router.push(`/ar/program-detail/${item?.id}`)}
    >
      <img loading="lazy"alt={""} width={20} height={20} src={bulletImg} />
      <p>{item?.title_AR}</p>
    </SearchListItemDiv>
  );

  const SearchListItemTraining = ({ bulletImg, item }) => (
    <SearchListItemDiv
      dir="rtl"
      onClick={() => router.push(`/ar/training-detail/${item?.id}`)}
    >
      <img loading="lazy"alt={""} width={20} height={20} src={bulletImg} />
      <p>{item?.title_AR}</p>
    </SearchListItemDiv>
  );

  const seaarchOverlay = (
    <>
      <StyledDivForSearchHeader>
        <Row>
          <Col span={24}>
            <h1 className="what_learn_h1">{WhatDoYouWantToLearn}؟</h1>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <StyledSearch
              size="large"
              enterButton={<img loading="lazy"alt={""} width={20} height={20} src={SearchIcon} />}
              placeholder="يبحث"
              allowClear
              dir="rtl"
              className="mainSearchBar"
              onChange={searchOnChangeHandle}
              onSearch={() => getCourseDetailRecordFunc("Arabic", SearchValue)}
              // onSearch={searchOnSearchHandle}
            />
          </Col>
        </Row>
        <Divider type="vertical" />
        {getCourseTrainingSearchLovState?.length > 0 ? (
          <>
            {loading ? (
              <Row
                gutter={[16, 16]}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "70px",
                  width: "100%",
                }}
              >
                <img loading="lazy"alt={""} src={Rolling} width={50} height={50} />
              </Row>
            ) : (
              <Row gutter={[16, 16]} dir="rtl">
                {getCourseTrainingSearchLovState?.filter(
                  (item) => item?.recordType === "Course"
                )?.length > 0 && (
                  <Col md={12} sm={24}>
                    <h3 className="courses_h1">
                      {popular} {courses}
                    </h3>
                    {getCourseTrainingSearchLovState ? (
                      getCourseTrainingSearchLovState
                        ?.filter((item) => item?.recordType === "Course")
                        ?.slice(0, 6)
                        .map((course, index) => (
                          <SearchListItem
                            key={index}
                            bulletImg={courseBullet}
                            item={course}
                          />
                        ))
                    ) : (
                      <Skeleton active />
                    )}
                  </Col>
                )}
                {getCourseTrainingSearchLovState?.filter(
                  (item) => item?.recordType === "Program"
                )?.length > 0 && (
                  <Col md={12} sm={24}>
                    <h3 className="courses_h1">
                      {popular} {programs}
                    </h3>
                    {getCourseTrainingSearchLovState ? (
                      getCourseTrainingSearchLovState
                        ?.filter((item) => item?.recordType === "Program")
                        ?.slice(0, 6)
                        .map((course, index) => (
                          <SearchListItemProgram
                            key={index}
                            bulletImg={ProgramBullet}
                            item={course}
                          />
                        ))
                    ) : (
                      <Skeleton active />
                    )}
                  </Col>
                )}
                {getCourseTrainingSearchLovState?.filter(
                  (item) => item?.recordType === "Training"
                )?.length > 0 && (
                  <Col md={12} sm={24}>
                    {/* <h3>{SearchValue == "" && "Popular"} Trainings</h3> */}
                    <h3 className="courses_h1">
                      {popular} {trainings}
                    </h3>
                    {getCourseTrainingSearchLovState ? (
                      getCourseTrainingSearchLovState
                        ?.filter((item) => item?.recordType === "Training")
                        ?.slice(0, 6)
                        .map((course, index) => (
                          <SearchListItemTraining
                            key={index}
                            bulletImg={TrainingBullet}
                            item={course}
                          />
                        ))
                    ) : (
                      <Skeleton active />
                    )}
                  </Col>
                )}

                {/* <Col md={12} sm={24}>
            <h3>{SearchValue == "" && "Popular"} Activities</h3>
            {getCourseTrainingSearchLovState ? (
              getCourseTrainingSearchLovState
                ?.filter((item) => item?.recordType === "Activities")
                .map((course, index) => (
                  <SearchListItem
                    key={index}
                    bulletImg={courseBullet}
                    item={course}
                  />
                ))
            ) : (
              <Skeleton active />
            )}
          </Col> */}
              </Row>
            )}
          </>
        ) : (
          <>
            <Empty />
          </>
        )}

        <Divider type="vertical" style={{ marginBottom: "20px" }} />
        <SearchHeaderFooter>
          <button onClick={() => router.push(`/ar/courses-landing-page`)}>
            {view_all_results}
          </button>
        </SearchHeaderFooter>
      </StyledDivForSearchHeader>
    </>
  );

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

  const DesktopView = (
    <StyledDiv>
      <Popover
        placement="bottomRight"
        trigger="click"
        content={seaarchOverlay}
        arrowPointAtCenter
        onClick={() => getCourseDetailRecordFunc("Arabic", SearchValue)}
      >
        <PopOverDiv>
          <img loading="lazy"alt={""} width={20} height={20} src={SearchIcon} />
        </PopOverDiv>
      </Popover>
    </StyledDiv>
  );

  const SearchDrawerHeader = (
    <SidebarHeader>
      <Link href="/">
        <StyledAnchor>
          <img loading="lazy"alt={""} src={Logo} width={235} height={35} objectFit={"contain"} />
        </StyledAnchor>
      </Link>
      <MobileRightNavToggle
        onClick={() => {
          setOpen(false);
        }}
      >
        <svg
          width="30"
          height="29"
          viewBox="0 0 30 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              d="M6.21992 1.28181C6.1502 1.21209 6.09489 1.12931 6.05716 1.03821C6.01942 0.947114 6 0.849474 6 0.750868C6 0.652263 6.01942 0.554623 6.05716 0.463524C6.09489 0.372424 6.1502 0.289649 6.21992 0.219924C6.28965 0.1502 6.37242 0.0948912 6.46352 0.0571565C6.55462 0.0194218 6.65226 -7.34668e-10 6.75087 0C6.84947 7.34667e-10 6.94711 0.0194218 7.03821 0.0571565C7.12931 0.0948912 7.21209 0.1502 7.28181 0.219924L15 7.93961L22.7182 0.219924C22.7879 0.1502 22.8707 0.0948912 22.9618 0.0571565C23.0529 0.0194218 23.1505 0 23.2491 0C23.3477 0 23.4454 0.0194218 23.5365 0.0571565C23.6276 0.0948912 23.7104 0.1502 23.7801 0.219924C23.8498 0.289649 23.9051 0.372424 23.9428 0.463524C23.9806 0.554623 24 0.652263 24 0.750868C24 0.849474 23.9806 0.947114 23.9428 1.03821C23.9051 1.12931 23.8498 1.21209 23.7801 1.28181L16.0604 9L23.7801 16.7182C23.8498 16.7879 23.9051 16.8707 23.9428 16.9618C23.9806 17.0529 24 17.1505 24 17.2491C24 17.3477 23.9806 17.4454 23.9428 17.5365C23.9051 17.6276 23.8498 17.7104 23.7801 17.7801C23.7104 17.8498 23.6276 17.9051 23.5365 17.9428C23.4454 17.9806 23.3477 18 23.2491 18C23.1505 18 23.0529 17.9806 22.9618 17.9428C22.8707 17.9051 22.7879 17.8498 22.7182 17.7801L15 10.0604L7.28181 17.7801C7.21209 17.8498 7.12931 17.9051 7.03821 17.9428C6.94711 17.9806 6.84947 18 6.75087 18C6.65226 18 6.55462 17.9806 6.46352 17.9428C6.37242 17.9051 6.28965 17.8498 6.21992 17.7801C6.1502 17.7104 6.09489 17.6276 6.05716 17.5365C6.01942 17.4454 6 17.3477 6 17.2491C6 17.1505 6.01942 17.0529 6.05716 16.9618C6.09489 16.8707 6.1502 16.7879 6.21992 16.7182L13.9396 9L6.21992 1.28181Z"
              fill="#000"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_848_3950"
              x="0.667228"
              y="0"
              width="28.6655"
              height="28.6655"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="5.33277" />
              <feGaussianBlur stdDeviation="2.66639" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_848_3950"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_848_3950"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </MobileRightNavToggle>
    </SidebarHeader>
  );

  const MobileView = (
    <>
      <Drawer
        title={SearchDrawerHeader}
        placement={"right"}
        closable={false}
        onClose={onClose}
        open={open}
        key={"top"}
      >
        {seaarchOverlay}
      </Drawer>
      <button
        style={{
          display: "flex",
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
        }}
        onClick={() => {
          getCourseDetailRecordFunc("Arabic", SearchValue);
          showDrawer();
        }}
      >
        <img loading="lazy"alt={""} width={20} height={20} src={SearchIcon} />
      </button>
    </>
  );

  return <StyledDiv>{isDesktop ? DesktopView : MobileView}</StyledDiv>;
};

export default SearchHeader;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  // padding: 20px 15px;

  img {
    height: 32px !important;
  }
`;
const StyledAnchor = styled.a`
  display: flex;
`;
const MobileRightNavToggle = styled.div`
  padding: 5px;
  cursor: pointer;
  line-height: 0;
  height: 28px;

  > span {
    color: #000;
    font-size: 22px !important;
    margin-top: 0 !important;
  }
`;

const StyledDiv = styled.div`
  .ant-popover {
    top: 62px !important;
    position: fixed !important;
  }
`;

const PopOverDiv = styled.div`
  display: flex;
`;

const StyledDivForSearchHeader = styled.div`
  min-height: 350px;
  background-color: #fff;
  width: 55vw;
  padding: 10px;

  h1 {
    font-size: 20px;
  }

  h3 {
    margin-bottom: 10px;
  }

  .mainSearchBar button {
    height: 40px !important;
    border-radius: 0 !important;
    width: 40px !important;
    padding: 0 !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    font-weight: 400;
    font-size: 16px;

    img {
      filter: invert(1);
    }
  }

  .what_learn_h1 {
    text-align: end;
  }
  .courses_h1 {
    text-align: start;
  }
  @media only screen and (max-width: 991px) {
    width: 100%;
    padding: 0;
  }
`;

const StyledSearch = styled(Search)`
  .ant-input-group-wrapper {
    -moz-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    transform: scaleX(-1);
    -ms-filter: fliph;
    filter: fliph;
  }
  .ant-input {
    -moz-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    transform: scaleX(-1);
    -ms-filter: fliph;
    filter: fliph;
  }
  .ant-input-wrapper {
    -moz-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    transform: scaleX(-1);
    -ms-filter: fliph;
    filter: fliph;
  }
`;

const SearchListItemDiv = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 14px;
  // flex-direction: row-reverse;
  p {
    margin: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: calc(100% - 30px);
    padding-right: 10px;
    overflow: hidden;
    cursor: pointer;
    color: #1b1b1b;
    text-align: start;
  }
  p:hover {
    text-decoration: underline;
  }
`;

const SearchHeaderFooter = styled.div`
    background-color: #F3F7F5;
    color: #105F43;
    text-align: center;
    font-size: 14px;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 10px 0;
    width: 100%;
    button{
        border: none;
        background-color: transparent;
        text-decoration: underline;
        font-weight: bold;
        cursor:pointer;
    }
  
        
    }
`;
