import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Header from "../../src/components/rtl/adminLayoutHeader";
import CoursesCards from "../../src/components/rtl/Cards/CoursesCards";
import styled from "styled-components";
import { Col, Input, Row, Select, Tabs, Empty, Pagination } from "antd";

import SearchIcon from "../../public/images/SearchIcon.png";
import endpoints from "../../src/api";
import { R2Favicon } from "../../images";
import Preloader from "../../public/images/Preloader.gif";
import router from "next/router";
import { getCookies, setCookies } from "../../src/helpers/cookie";
import { toast } from "react-toastify";
import CustomButton from "../../src/components/Button";

import {
  My_Courses,
  All,
  Active,
  Completed,
  Search,
  Category,
  Instructor,
  Sort_by,
  remove_from_wishlist,
  Added_to_Wishlist,
  No_Record_Found,
} from "../../src/helpers/LanguageConstant";

const { Option } = Select;

const dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectItem, setSelectItem] = useState("/ar/courses");

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

  const initialdashboardMainState = {
    recordType: "Course",
    pageSize: 6,
    pageNo: 1,
    language: "English",
    search: "",
    progressStatus: "",
    instructorId: "",
    sortBy: "",
    subCategory: "",
  };
  const [dashboardMainState, setDashboardMainState] = useState(
    initialdashboardMainState
  );
  const [myCourses, setMyCourses] = useState();
  const [getProgressStatus, setgetProgressStatus] = useState();
  const [getSortStatus, setGetSortStatus] = useState();
  const [getInstructorStatus, setGetInstructorStatus] = useState();
  const [
    getCourseTrainingSubCategoryStatus,
    setGetCourseTrainingSubCategoryStatus,
  ] = useState();

  const [dashboardMainLoading, setDashboardMainLoading] = useState(true);

  const GetDashboardMainFunc = async (data) => {
    setDashboardMainLoading(true);
    try {
      if (data) {
        const response = await endpoints.GetDashboardMain(authToken, data);
        if (response.data.statusCode === "200") {
          setMyCourses(response?.data?.data);
          setAddWishlistDisabled();
          setDashboardMainLoading(false);
        } else {
          setMyCourses(response?.data);
          setDashboardMainLoading(false);
        }
      }
    } catch (error) {
      //console.log("error", error);
    }
  };
  const GetStatusFunc = async () => {
    try {
      const response = await endpoints.GetStatus(authToken);
      if (response?.data?.statusCode === "200") {
        setgetProgressStatus(response?.data?.data);
      }
    } catch (error) {
      //console.log("error", error);
    }
  };
  const GetSortFunc = async () => {
    try {
      const response = await endpoints.GetSort(authToken);
      if (response?.data?.statusCode === "200") {
        setGetSortStatus(response?.data?.data);
      }
    } catch (error) {
      //console.log("error", error);
    }
  };
  const GetInstructorFunc = async () => {
    try {
      const response = await endpoints.GetInstructor(authToken, "Course");
      if (response?.data?.statusCode === "200") {
        setGetInstructorStatus(response?.data?.data);
      }
    } catch (error) {
      //console.log("error", error);
    }
  };
  const GetCourseTrainingSubCategoryFunc = async () => {
    try {
      const response = await endpoints.GetCourseTrainingSubCategory(authToken);
      if (response?.data?.statusCode === "200") {
        setGetCourseTrainingSubCategoryStatus(response?.data?.data);
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  useLayoutEffect(() => {
    GetDashboardMainFunc(dashboardMainState);
  }, [
    dashboardMainState?.search,
    dashboardMainState?.progressStatus,
    dashboardMainState?.sortBy,
    dashboardMainState?.instructorId,
    dashboardMainState?.subCategory,
  ]);

  useLayoutEffect(() => {
    GetStatusFunc();
    GetSortFunc();
    GetInstructorFunc();
    GetCourseTrainingSubCategoryFunc();
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
          GetDashboardMainFunc(dashboardMainState);
          toast.success(Added_to_Wishlist);
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
          GetDashboardMainFunc(dashboardMainState);
          toast.success(remove_from_wishlist);
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
          <>
            <Header
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              selectItem={selectItem}
              setSelectItem={setSelectItem}
              name={""}
            >
              <Row>
                <Col span={24}>
                  <MainHeading>{My_Courses}</MainHeading>
                </Col>
                <Col span={24}>
                  <CoursesTabs defaultActiveKey="1">
                    <Tabs.TabPane
                      tab={`${All} (${
                        myCourses?.totalRecord > 99
                          ? "99+"
                          : myCourses?.totalRecord === undefined
                          ? "0"
                          : myCourses?.totalRecord
                      })`}
                      key="1"
                    >
                      <CourseFilterSearch>
                        <Row gutter={12}>
                          <Col span={12} md={8}>
                            <StyledInput
                              autocomplete="off"
                              placeholder={Search}
                              name="search"
                              suffix={
                                <img
                                  loading="lazy"
                                  alt={""}
                                  height={15}
                                  width={15}
                                  src={SearchIcon?.src}
                                />
                              }
                              onChange={(e) => {
                                setDashboardMainState({
                                  ...dashboardMainState,
                                  [e.target.name]: e.target.value,
                                });
                              }}
                            />
                          </Col>
                          <Col span={12} md={5}>
                            <StyledSelect
                              defaultValue={Category}
                              onChange={(e) => {
                                setDashboardMainState({
                                  ...dashboardMainState,
                                  subCategory: e,
                                });
                              }}
                            >
                              <Option value="">{All}</Option>
                              {getCourseTrainingSubCategoryStatus?.map(
                                (item, index) => (
                                  <Option key={index} value={item?.id}>
                                    {item?.name_AR}
                                  </Option>
                                )
                              )}
                            </StyledSelect>
                          </Col>
                          <Col span={12} md={6}>
                            <StyledSelect
                              defaultValue={Instructor}
                              onChange={(e) => {
                                setDashboardMainState({
                                  ...dashboardMainState,
                                  instructorId: e,
                                });
                              }}
                            >
                              <Option value="">{All}</Option>
                              {getInstructorStatus?.map((item, index) => (
                                <Option key={index} value={item?.id}>
                                  {item?.name_AR}
                                </Option>
                              ))}
                            </StyledSelect>
                          </Col>
                          <Col span={12} md={5}>
                            <StyledSelect
                              defaultValue={Sort_by}
                              onChange={(e) => {
                                setDashboardMainState({
                                  ...dashboardMainState,
                                  sortBy: e,
                                });
                              }}
                            >
                              <Option value="">{All}</Option>
                              {getSortStatus?.map((item, index) => (
                                <Option key={index} value={item?.id}>
                                  {item?.name_AR}
                                </Option>
                              ))}
                            </StyledSelect>
                          </Col>
                        </Row>
                      </CourseFilterSearch>
                      <CourseCards>
                        <Row gutter={12}>
                          {dashboardMainLoading ? (
                            <>
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
                            </>
                          ) : (
                            <>
                              {myCourses?.dashboardMainViewModels?.map(
                                (item, index) => (
                                  <Col span={12} key={index}>
                                    <CoursesCards
                                      index={index}
                                      courseTrainingRegistrationId={
                                        item?.courseTrainingRegistrationId
                                      }
                                      courseTrainingId={item?.courseTrainingId}
                                      title={item?.title_AR}
                                      creditHours={item?.creditHours}
                                      categoryName={item?.departmentName_AR}
                                      description={item?.description}
                                      percent={item?.percentageComplete}
                                      instructor={item?.instructorName_AR}
                                      duration={item?.duration_AR}
                                      site={item?.subCategory_EN}
                                      subCategory={item?.subCategory_AR}
                                      inFavourite={item?.favourite}
                                      AddCourseWhishlist={AddCourseWhishlist}
                                      RemoveCourseWhishlist={
                                        RemoveCourseWhishlist
                                      }
                                      AddWishlistDisabled={AddWishlistDisabled}
                                      setAddWishlistDisabled={
                                        setAddWishlistDisabled
                                      }
                                      type={item?.recordType}
                                      courseAlreadyRegistered={
                                        item?.courseAlreadyRegistered
                                      }
                                      DetailPageSlug={`inside/${item?.courseTrainingRegistrationId}`}
                                    />
                                  </Col>
                                )
                              )}
                              {myCourses?.statusCode === "404" && (
                                <EmptyData>
                                  <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    description={No_Record_Found}
                                  />
                                </EmptyData>
                              )}
                            </>
                          )}
                        </Row>
                        {myCourses?.totalRecord > 10 && (
                          <Row>
                            <StyledPagination
                              defaultCurrent={1}
                              current={dashboardMainState?.pageNo}
                              onChange={(e) =>
                                setDashboardMainState({
                                  ...dashboardMainState,
                                  pageNo: e,
                                })
                              }
                              total={myCourses?.totalRecord}
                            />
                          </Row>
                        )}
                      </CourseCards>
                    </Tabs.TabPane>
                    <Tabs.TabPane
                      tab={`${Active} (${
                        myCourses?.totalActive > 99
                          ? "99+"
                          : myCourses?.totalActive === undefined
                          ? "0"
                          : myCourses?.totalActive
                      })`}
                      key="2"
                    >
                      <CourseFilterSearch>
                        <Row gutter={12}>
                          <Col span={12} md={8}>
                            <StyledInput
                              autocomplete="off"
                              placeholder={Search}
                              name="search"
                              suffix={
                                <img
                                  loading="lazy"
                                  alt={""}
                                  height={15}
                                  width={15}
                                  src={SearchIcon?.src}
                                />
                              }
                              onChange={(e) => {
                                setDashboardMainState({
                                  ...dashboardMainState,
                                  [e.target.name]: e.target.value,
                                });
                              }}
                            />
                          </Col>
                          <Col span={12} md={5}>
                            <StyledSelect
                              defaultValue={Category}
                              onChange={(e) => {
                                setDashboardMainState({
                                  ...dashboardMainState,
                                  subCategory: e,
                                });
                              }}
                            >
                              <Option value="">{All}</Option>
                              {getCourseTrainingSubCategoryStatus?.map(
                                (item, index) => (
                                  <Option key={index} value={item?.id}>
                                    {item?.name_AR}
                                  </Option>
                                )
                              )}
                            </StyledSelect>
                          </Col>
                          <Col span={12} md={6}>
                            <StyledSelect
                              defaultValue={Instructor}
                              onChange={(e) => {
                                setDashboardMainState({
                                  ...dashboardMainState,
                                  instructorId: e,
                                });
                              }}
                            >
                              <Option value="">{All}</Option>
                              {getInstructorStatus?.map((item, index) => (
                                <Option key={index} value={item?.id}>
                                  {item?.name_AR}
                                </Option>
                              ))}
                            </StyledSelect>
                          </Col>
                          <Col span={12} md={5}>
                            <StyledSelect
                              defaultValue={Sort_by}
                              onChange={(e) => {
                                setDashboardMainState({
                                  ...dashboardMainState,
                                  sortBy: e,
                                });
                              }}
                            >
                              <Option value="">{All}</Option>
                              {getSortStatus?.map((item, index) => (
                                <Option key={index} value={item?.id}>
                                  {item?.name_AR}
                                </Option>
                              ))}
                            </StyledSelect>
                          </Col>
                        </Row>
                      </CourseFilterSearch>
                      <CourseCards>
                        <Row gutter={12}>
                          {dashboardMainLoading ? (
                            <>
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
                            </>
                          ) : (
                            <>
                              {myCourses?.dashboardMainViewModels?.map(
                                (item, index) => (
                                  <>
                                    {!item?.certificateIssue && (
                                      <Col span={12} key={index}>
                                        <CoursesCards
                                          index={index}
                                          courseTrainingRegistrationId={
                                            item?.courseTrainingRegistrationId
                                          }
                                          courseTrainingId={
                                            item?.courseTrainingId
                                          }
                                          title={item?.title_AR}
                                          creditHours={item?.creditHours}
                                          categoryName={item?.departmentName_AR}
                                          description={item?.description}
                                          percent={item?.percentageComplete}
                                          instructor={item?.instructorName_AR}
                                          duration={item?.duration_AR}
                                          site={item?.subCategory_EN}
                                          subCategory={item?.subCategory_AR}
                                          inFavourite={item?.favourite}
                                          AddCourseWhishlist={
                                            AddCourseWhishlist
                                          }
                                          RemoveCourseWhishlist={
                                            RemoveCourseWhishlist
                                          }
                                          AddWishlistDisabled={
                                            AddWishlistDisabled
                                          }
                                          setAddWishlistDisabled={
                                            setAddWishlistDisabled
                                          }
                                          type={item?.recordType}
                                          courseAlreadyRegistered={
                                            item?.courseAlreadyRegistered
                                          }
                                          DetailPageSlug={`inside/${item?.courseTrainingRegistrationId}`}
                                        />
                                      </Col>
                                    )}
                                  </>
                                )
                              )}
                              {myCourses?.statusCode === "404" && (
                                <EmptyData>
                                  <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    description={No_Record_Found}
                                  />
                                </EmptyData>
                              )}
                            </>
                          )}
                        </Row>
                      </CourseCards>
                    </Tabs.TabPane>
                    <Tabs.TabPane
                      tab={`${Completed} (${
                        myCourses?.totalComplete > 99
                          ? "99+"
                          : myCourses?.totalComplete === undefined
                          ? "0"
                          : myCourses?.totalComplete
                      })`}
                      key="3"
                    >
                      <CourseFilterSearch>
                        <Row gutter={12}>
                          <Col span={12} md={8}>
                            <StyledInput
                              autocomplete="off"
                              placeholder={Search}
                              name="search"
                              suffix={
                                <img
                                  loading="lazy"
                                  alt={""}
                                  height={15}
                                  width={15}
                                  src={SearchIcon?.src}
                                />
                              }
                              onChange={(e) => {
                                setDashboardMainState({
                                  ...dashboardMainState,
                                  [e.target.name]: e.target.value,
                                });
                              }}
                            />
                          </Col>
                          <Col span={12} md={5}>
                            <StyledSelect
                              defaultValue={Category}
                              onChange={(e) => {
                                setDashboardMainState({
                                  ...dashboardMainState,
                                  subCategory: e,
                                });
                              }}
                            >
                              <Option value="">{All}</Option>
                              {getCourseTrainingSubCategoryStatus?.map(
                                (item, index) => (
                                  <Option key={index} value={item?.id}>
                                    {item?.name_AR}
                                  </Option>
                                )
                              )}
                            </StyledSelect>
                          </Col>
                          <Col span={12} md={6}>
                            <StyledSelect
                              defaultValue={Instructor}
                              onChange={(e) => {
                                setDashboardMainState({
                                  ...dashboardMainState,
                                  instructorId: e,
                                });
                              }}
                            >
                              <Option value="">{All}</Option>
                              {getInstructorStatus?.map((item, index) => (
                                <Option key={index} value={item?.id}>
                                  {item?.name_AR}
                                </Option>
                              ))}
                            </StyledSelect>
                          </Col>
                          <Col span={12} md={5}>
                            <StyledSelect
                              defaultValue={Sort_by}
                              onChange={(e) => {
                                setDashboardMainState({
                                  ...dashboardMainState,
                                  sortBy: e,
                                });
                              }}
                            >
                              <Option value="">{All}</Option>
                              {getSortStatus?.map((item, index) => (
                                <Option key={index} value={item?.id}>
                                  {item?.name_AR}
                                </Option>
                              ))}
                            </StyledSelect>
                          </Col>
                        </Row>
                      </CourseFilterSearch>
                      <CourseCards>
                        <Row gutter={12}>
                          {dashboardMainLoading ? (
                            <>
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
                            </>
                          ) : (
                            <>
                              {myCourses?.dashboardMainViewModels?.map(
                                (item, index) => (
                                  <>
                                    {item?.certificateIssue && (
                                      <Col span={12} key={index}>
                                        <CoursesCards
                                          index={index}
                                          courseTrainingRegistrationId={
                                            item?.courseTrainingRegistrationId
                                          }
                                          courseTrainingId={
                                            item?.courseTrainingId
                                          }
                                          title={item?.title_AR}
                                          creditHours={item?.creditHours}
                                          categoryName={item?.departmentName_AR}
                                          description={item?.description}
                                          percent={item?.percentageComplete}
                                          instructor={item?.instructorName_AR}
                                          duration={item?.duration_AR}
                                          site={item?.subCategory_EN}
                                          subCategory={item?.subCategory_AR}
                                          inFavourite={item?.favourite}
                                          AddCourseWhishlist={
                                            AddCourseWhishlist
                                          }
                                          RemoveCourseWhishlist={
                                            RemoveCourseWhishlist
                                          }
                                          AddWishlistDisabled={
                                            AddWishlistDisabled
                                          }
                                          setAddWishlistDisabled={
                                            setAddWishlistDisabled
                                          }
                                          type={item?.recordType}
                                          courseAlreadyRegistered={
                                            item?.courseAlreadyRegistered
                                          }
                                          DetailPageSlug={`inside/${item?.courseTrainingRegistrationId}`}
                                        />
                                      </Col>
                                    )}
                                  </>
                                )
                              )}
                              {myCourses?.statusCode === "404" && (
                                <EmptyData>
                                  <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    description={No_Record_Found}
                                  />
                                </EmptyData>
                              )}
                            </>
                          )}
                        </Row>
                      </CourseCards>
                    </Tabs.TabPane>
                  </CoursesTabs>
                </Col>
              </Row>
            </Header>
          </>
        </div>
      ) : (
        <>
          <img loading="lazy" className="pre-loader" src={Preloader.src} />
        </>
      )}
    </>
  );
};

export default dashboard;

const MainHeading = styled.h3`
  font-size: 20px;
  // font-weight: 600;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "GESSTwoBold";
`;
const CoursesTabs = styled(Tabs)`
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #105f43;
    font-weight: 500;
  }
  .ant-tabs-ink-bar {
    background: #105f43;
  }
  .ant-tabs {
    color: #a8a8a8 !important;
  }
  .ant-tabs-tab {
    font-size: 15px;
    color: #a8a8a8 !important;
  }
  .ant-tabs-tab:not(:first-child) {
    margin: 0 20px 0 0;
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
const StyledInput = styled(Input)`
  border-radius: 5px !important;
  box-shadow: none !important;

  @media screen and (max-width: 800px) {
    margin-bottom: 5px;
  }
`;
const StyledSelect = styled(Select)`
  width: 100% !important;

  .ant-select-selector {
    border-radius: 5px !important;
    box-shadow: none !important;
  }

  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border: 1px solid #c1c1c1 !important;
  }
  .ant-select-selection-item {
    // font-family: "GESSTwoLight", sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #898989;
  }
  .ant-select-single.ant-select-open {
    color: #898989 !important;
  }

  @media screen and (max-width: 800px) {
    margin-bottom: 5px;
  }
`;

const EmptyData = styled.div`
  width: 100%;
  height: auto;
  margin: 0 8px;
  border-radius: 8px;
  background: #fff;
`;
const StyledPagination = styled(Pagination)`
  background: #fff;
  margin: 20px auto 0 auto;
  padding: 5px 7px;
  border-radius: 5px;

  > li {
    background-color: #f8f8f8;
    border: 0;
    outline: 0;
    border-radius: 4px;

    &.ant-pagination-item-active {
      background-color: #105f43;

      a {
        color: #fff !important;
      }
    }

    &.ant-pagination-prev {
      margin-right: 0;
    }

    &.ant-pagination-next {
      margin-right: 8px;
    }

    button {
      border-color: transparent;
      border-radius: 4px;

      .anticon {
        transform: scaleX(-1);
      }
    }
  }
`;
