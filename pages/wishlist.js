import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import Header from "../src/components/adminLayoutHeader";
import styled from "styled-components";
import { Button, Col, Empty, Input, Row, Select, Tabs } from "antd";

import { R2Favicon } from "../images";
import Preloader from "../public/images/Preloader.gif";
import { AiOutlineRight } from "react-icons/ai";
import CoursesCards from "../src/components/Cards/CoursesCards";
import { useSelector } from "react-redux";
import router from "next/router";
import endpoints from "../src/api";
import { getCookies, setCookies } from "../src/helpers/cookie";
import { toast } from "react-toastify";

const dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectItem, setSelectItem] = useState("wishlist");

  const authToken = getCookies("token");
  const userStatus = getCookies("userStatus");
  const [isAuthorized, setAuthorized] = useState(false);
  useLayoutEffect(() => {
    if (authToken === undefined) {
      router.push("/sign-in");
    } else if (userStatus === undefined || userStatus === "false") {
      router.push("/");
    } else if (authToken || userStatus === "true") {
      setAuthorized(true);
    }
  }, []);

  const [dashboardMainState, setDashboardMainState] = useState({
    recordType: "",
    pageSize: 100,
    pageNo: 1,
    language: "English",
    search: "",
    progressStatus: "",
    instructorId: "",
    sortBy: "",
    subCategory: "",
  });
  const [dashboardMainLoading, setDashboardMainLoading] = useState(true);
  const [myCourses, setMyCourses] = useState();
  const LearnerDashboardFavouriteListFunc = async () => {
    setDashboardMainLoading(true)
    try {
      const response = await endpoints.LearnerDashboardFavouriteList(
        authToken,
        dashboardMainState
      );
      if (response.data.statusCode === "200") {
        setMyCourses(response?.data?.data);
        setAddWishlistDisabled();
        setDashboardMainLoading(false)
      } else {
        setMyCourses(response?.data);
        setDashboardMainLoading(false)
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  useLayoutEffect(() => {
    LearnerDashboardFavouriteListFunc();
    setCookies("activeQa", false);
    setCookies("activeReview", false);
    setCookies("activeDiscussionBoard", false);
    setCookies("activeCertificate", false);
  }, []);

  const [AddWishlistDisabled, setAddWishlistDisabled] = useState();
  // Add Course Whishlist
  const AddCourseWhishlist = async (data) => {
    try {
      if (data) {
        const response = await endpoints.AddFavourite(authToken, data);
        if (response.data.statusCode === "200") {
          LearnerDashboardFavouriteListFunc();
          toast.success("Added to Wishlist");
        }
      }
    } catch (error) {
      //console.log("error", error);
    }
  };
  const RemoveCourseWhishlist = async (data) => {
    try {
      if (data) {
        const response = await endpoints.AddFavourite(authToken, data);
        if (response.data.statusCode === "200") {
          LearnerDashboardFavouriteListFunc();
          toast.success("Removed From Wishlist");
        }
      }
    } catch (error) {
      //console.log("error", error);
    }
  };
  // Add Course Whishlist End

  return (
    <>
      {isAuthorized ? (
        <div className="container">
          <Head>
            <title>Riyadh Second Health Cluster</title>
            <link rel="icon" href={R2Favicon} />
          </Head>
          <body>
            <Header
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              selectItem={selectItem}
              setSelectItem={setSelectItem}
              name={""}
            >
              <Row gutter={[15, 15]}>
                <Col span={24}>
                  <MainHeading>Wishlist</MainHeading>
                </Col>
                <Col span={24}>
                  <CourseCards>
                    <Row gutter={12}>
                      
                      {dashboardMainLoading ? (<>
                        <Col span={12}>
                          <CoursesCards type="loading" />
                        </Col>
                        <Col span={12}>
                          <CoursesCards type="loading" />
                        </Col>
                        <Col span={12}>
                          <CoursesCards type="loading" />
                        </Col>
                        <Col span={12}>
                          <CoursesCards type="loading" />
                        </Col>
                      </>) : (<>
                        {myCourses?.dashboardMainViewModels?.map(
                          (item, index) => (
                            <Col span={12} key={index}>
                              <CoursesCards
                                index={index}
                                courseTrainingRegistrationId={
                                  item?.courseTrainingRegistrationId
                                }
                                courseTrainingId={item?.courseTrainingId}
                                title={item?.title_EN}
                                creditHours={item?.creditHours}
                                categoryName={item?.departmentName_EN}
                                description={item?.description}
                                percent={item?.percentageComplete}
                                instructor={item?.instructorName_EN}
                                duration={item?.duration_EN}
                                site={item?.subCategory_EN}
                                subCategory={item?.subCategory_EN}
                                inFavourite={item?.favourite}
                                AddCourseWhishlist={AddCourseWhishlist}
                                RemoveCourseWhishlist={RemoveCourseWhishlist}
                                AddWishlistDisabled={AddWishlistDisabled}
                                setAddWishlistDisabled={setAddWishlistDisabled}
                                type={item?.recordType}
                                courseAlreadyRegistered={
                                  item?.courseAlreadyRegistered
                                }
                                DetailPageSlug={
                                  item?.courseAlreadyRegistered
                                    ? `inside/${item?.courseTrainingRegistrationId}`
                                    : `detail/${item?.courseTrainingId}`
                                }
                              />
                            </Col>
                          )
                        )}
                        {myCourses?.statusCode === "404" && (
                          <EmptyData>
                            <Empty
                              image={Empty.PRESENTED_IMAGE_SIMPLE}
                              description={myCourses?.message}
                            />
                          </EmptyData>
                        )}
                      </>)}
                    </Row>
                  </CourseCards>
                </Col>
              </Row>
            </Header>
          </body>
        </div>
      ) : (
        <>
          <img loading="lazy"className="pre-loader" src={Preloader.src} />
        </>
      )}
    </>
  );
};

export default dashboard;

const MainHeading = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  font-family: "TitilliumNormal", sans-serif;
`;
const CoursesTabs = styled(Tabs)`
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #105f43;
  }
  .ant-tabs-ink-bar {
    background: #105f43;
  }
  .ant-tabs {
    color: #a8a8a8 !important;
  }
  .ant-tabs-tab:hover {
    color: #a8a8a8 !important;
  }
  .ant-tabs-nav::before {
    border-color: #a8a8a8 !important;
  }
`;
const CourseFilterSearch = styled.div`
  margin-bottom: 20px;
  border-radius: 10px;
`;
const CourseCards = styled.div``;
const CourseCard = styled.div`
  padding: 15px;
  background: #fff;
  border-radius: 10px;
  display: flex;
  margin-bottom: 6px;

  .course-img {
    position: relative;
  }
  .course-img .course-whishlist-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 22px;
    height: 22px;
    background: #fff;
    border-radius: 4px;
    padding: 4px 3px;
    line-height: 0;
    cursor: pointer;
  }
  .course-img .course-whishlist-icon img {
    pointer-events: none;
  }

  .course-desc {
    padding-left: 15px;
  }
  .course-desc .course-title {
    display: flex;
    justify-content: space-between;
  }
  .course-desc .course-title .course-action {
    display: flex;
    align-items: center;
  }
  .course-desc .course-title .course-action span {
    display: inline-block;
    padding: 0 5px;
    cursor: pointer;
  }
  .course-desc .course-title .course-action span:not(:last-child) {
    border-right: 1px solid #e8e8e8;
  }
  .course-desc .course-title h4 {
    font-size: 18px;
    // font-weight: 700;
    margin-bottom: 4px;
  }
  .course-desc .course-description {
  }
  .course-desc .course-description .department {
    display: inline-block;
    padding: 2px 8px;
    font-size: 11px;
    border-radius: 4px;
    color: #a87e33;
    background: #fee4b7;
    margin-bottom: 8px;
  }
  .course-desc .course-description p {
    font-size: 12px;
    color: #9e9e9e;
    padding-right: 10px;
    margin-bottom: 5px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .course-desc .course-progress {
    margin-bottom: 10px;
  }
  .course-desc .course-progress .percentage {
    display: flex;
    justify-content: space-between;
  }
  .course-desc .course-progress .percentage > span {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 2px;
    display: inline-block;
  }
  .course-desc .course-progress .percentage .percentage-status {
    font-size: 10px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .course-desc .course-progress .progress-seek {
    height: 2px;
    background: #e6e6e6;
  }
  .course-desc .course-progress .progress-seek span {
    display: block;
    height: 2px;
    background: #a87e33;
  }
  .course-desc .course-duration {
    font-size: 12px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .course-desc .course-duration > div {
    display: flex;
    align-items: center;
    font-weight: 600;
  }
  .course-desc .course-duration span {
    color: #a87e33;
    margin-right: 8px;
    font-weight: 600;
    line-height: 1px;
  }
  .course-btn {
    text-align: right;
  }
  .course-btn a {
    display: inline-block;
    padding: 3px 10px;
    border: 1px solid #105f43ad;
    border-radius: 4px;
    margin-top: 15px;
    color: #105f43;
    font-size: 12px;
    // font-weight: 700;
  }
`;

// const DashboardIconColumnCard = styled.div``

const StyledInput = styled(Input)`
  border-radius: 4px !important;
`;

const StyledCoursesRow = styled(Row)`
  margin-top: 15px;
`;

const StyledCourseScheduledMainDiv = styled.div`
  padding: 0;
`;

const StyledCourseScheduledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between !important;
  width: 100%;
  padding: 6px 8px;
  background: #f9f9f9;
  margin-block: 10px;
  // margin: 20px 12px 10px;
  img {
    margin-right: 10px;
  }
`;

const StyledCourseScheduledInnerDiv = styled.div`
  h2 {
    margin-bottom: 0px;
    font-family: "TitilliumNormal", sans-serif;
    // font-weight: 700;
    font-size: 12px;
    line-height: 24px;
  }
  p {
    margin-bottom: 0px;
    font-size: 9px;
  }
`;

const StyledAiOutlineRight = styled(AiOutlineRight)``;

const StyledViewScheduledButton = styled(Button)`
  color: #105f43;
  background: #fff;
  border: 1px solid #105f43;
  background: #f9f9f9 !important;
  border-radius: 5px !important;
  padding-inline: 8px;
  height: 27px;
  display: flex;
  align-items: center;
  border-radius: 3px;

  &:hover {
    color: #105f43 !important;
  }
  &:focus {
    color: #105f43 !important;
  }
`;

const StyledSelect = styled(Select)`
  width: 100% !important;
  border-radius: 4px !important;
  // border: 1px solid #c1c1c1 !important;

  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border: 1px solid #c1c1c1 !important;
  }
  .ant-select-selection-item {
    font-family: "TitilliumNormal", sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #898989;
  }
  .ant-select-single.ant-select-open {
    color: #898989 !important;
  }
`;

const StyledViewAllDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const EmptyData = styled.div`
  width: 100%;
  height: auto;
  margin: 0 8px;
  border-radius: 8px;
  background: #fff;
`;
