import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Header from "../../src/components/rtl/adminLayoutHeader";
import CoursesCards from "../../src/components/Cards/CoursesCards";
import styled from "styled-components";
import { Col, Input, Row, Select, Tabs, Empty } from "antd";

import SearchIcon from "../../public/images/SearchIcon.png";
import endpoints from "../../src/api";
import { R2Favicon } from "../../images";
import Preloader from "../../public/images/Preloader.gif";
import router from "next/router";
import { getCookies } from "../../src/helpers/cookie";
import { toast } from "react-toastify";
import CustomButton from "../../src/components/Button";

const { Option } = Select;

const dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectItem, setSelectItem] = useState("courses-activities");

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
    recordType: "Symposium",
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

  const GetDashboardMainFunc = async (data) => {
    try {
      if (data) {
        const response = await endpoints.GetDashboardMain(authToken, data);
        if (response.data.statusCode === "200") {
          setMyCourses(response?.data?.data);
        } else {
          setMyCourses(response?.data);
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
      const response = await endpoints.GetInstructor(authToken, "Activities");
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
  }, []);

  // Add Course Whishlist
  const AddCourseWhishlist = async (data) => {
    try {
      if (data) {
        const response = await endpoints.AddFavourite(authToken, data);
        if (response.data.statusCode === "200") {
          GetDashboardMainFunc(dashboardMainState);
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
          GetDashboardMainFunc(dashboardMainState);
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
                  <MainHeading>
                    <span>Activities</span>
                  </MainHeading>
                </Col>
                <Col span={24}>
                  <CoursesTabs defaultActiveKey="1">
                    <Tabs.TabPane tab={"All"} key="1">
                      <CourseFilterSearch>
                        <Row gutter={12}>
                          <Col span={12} md={8}>
                            <StyledInput
                              placeholder={"Search"}
                              name="search"
                              suffix={
                                <img loading="lazy"alt={""}
                                  height={15}
                                  width={15}
                                  src={SearchIcon}
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
                              defaultValue="Category"
                              onChange={(e) => {
                                setDashboardMainState({
                                  ...dashboardMainState,
                                  subCategory: e,
                                });
                              }}
                            >
                              {getCourseTrainingSubCategoryStatus?.map(
                                (item, index) => (
                                  <Option key={index} value={item?.id}>
                                    {item?.name_EN}
                                  </Option>
                                )
                              )}
                            </StyledSelect>
                          </Col>
                          <Col span={12} md={6}>
                            <StyledSelect
                              defaultValue="Instructor"
                              onChange={(e) => {
                                setDashboardMainState({
                                  ...dashboardMainState,
                                  instructorId: e,
                                });
                              }}
                            >
                              {getInstructorStatus?.map((item, index) => (
                                <Option key={index} value={item?.id}>
                                  {item?.name_EN}
                                </Option>
                              ))}
                            </StyledSelect>
                          </Col>
                          <Col span={12} md={5}>
                            <StyledSelect
                              defaultValue="Sort By"
                              onChange={(e) => {
                                setDashboardMainState({
                                  ...dashboardMainState,
                                  sortBy: e,
                                });
                              }}
                            >
                              {getSortStatus?.map((item, index) => (
                                <Option key={index} value={item?.id}>
                                  {item?.name_EN}
                                </Option>
                              ))}
                            </StyledSelect>
                          </Col>
                        </Row>
                      </CourseFilterSearch>
                      <CourseCards>
                        <Row gutter={12}>
                          {myCourses?.dashboardMainViewModels?.map(
                            (item, index) => (
                              <Col span={12} key={index}>
                                <CoursesCards
                                  courseTrainingRegistrationId={
                                    item?.courseTrainingRegistrationId
                                  }
                                  title={item?.title_EN}
                                  creditHours={item?.creditHours}
                                  categoryName={item?.departmentName_EN}
                                  description={item?.description}
                                  percent={item?.percentageComplete}
                                  instructor={item?.instructorName_EN}
                                  duration={item?.duration_EN}
                                  site={item?.subCategory}
                                  inFavourite={item?.favourite}
                                  AddCourseWhishlist={AddCourseWhishlist}
                                  RemoveCourseWhishlist={RemoveCourseWhishlist}
                                  type={item?.recordType}
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
                        </Row>
                      </CourseCards>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={"Webinars"} key="2">
                      <CourseFilterSearch>
                        <Row gutter={12}>
                          <Col span={12} md={8}>
                            <StyledInput
                              placeholder={"Search"}
                              name="search"
                              suffix={
                                <img loading="lazy"alt={""}
                                  height={15}
                                  width={15}
                                  src={SearchIcon}
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
                              defaultValue="Category"
                              onChange={(e) => {
                                setDashboardMainState({
                                  ...dashboardMainState,
                                  subCategory: e,
                                });
                              }}
                            >
                              {getCourseTrainingSubCategoryStatus?.map(
                                (item, index) => (
                                  <Option key={index} value={item?.id}>
                                    {item?.name_EN}
                                  </Option>
                                )
                              )}
                            </StyledSelect>
                          </Col>
                          <Col span={12} md={6}>
                            <StyledSelect
                              defaultValue="Instructor"
                              onChange={(e) => {
                                setDashboardMainState({
                                  ...dashboardMainState,
                                  instructorId: e,
                                });
                              }}
                            >
                              {getInstructorStatus?.map((item, index) => (
                                <Option key={index} value={item?.id}>
                                  {item?.name_EN}
                                </Option>
                              ))}
                            </StyledSelect>
                          </Col>
                          <Col span={12} md={5}>
                            <StyledSelect
                              defaultValue="Sort By"
                              onChange={(e) => {
                                setDashboardMainState({
                                  ...dashboardMainState,
                                  sortBy: e,
                                });
                              }}
                            >
                              {getSortStatus?.map((item, index) => (
                                <Option key={index} value={item?.id}>
                                  {item?.name_EN}
                                </Option>
                              ))}
                            </StyledSelect>
                          </Col>
                        </Row>
                      </CourseFilterSearch>
                      <CourseCards>
                        <Row gutter={12}>
                          {myCourses?.dashboardMainViewModels?.map(
                            (item, index) => (
                              <>
                                {item?.percentageComplete < 100 &&
                                  item?.percentageComplete > 0 && (
                                    <Col span={12} key={index}>
                                      <CoursesCards
                                        courseTrainingRegistrationId={
                                          item?.courseTrainingRegistrationId
                                        }
                                        title={item?.title_EN}
                                        creditHours={item?.creditHours}
                                        categoryName={item?.departmentName_EN}
                                        description={item?.description}
                                        percent={item?.percentageComplete}
                                        instructor={item?.instructorName_EN}
                                        duration={item?.duration_EN}
                                        site={item?.subCategory}
                                        inFavourite={item?.favourite}
                                        AddCourseWhishlist={AddCourseWhishlist}
                                        RemoveCourseWhishlist={
                                          RemoveCourseWhishlist
                                        }
                                        type={item?.recordType}
                                      />
                                    </Col>
                                  )}
                                {myCourses?.statusCode === "404" && (
                                  <EmptyData>
                                    <Empty
                                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                                      description={myCourses?.message}
                                    />
                                  </EmptyData>
                                )}
                              </>
                            )
                          )}
                        </Row>
                      </CourseCards>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={"Conferences"} key="3">
                      <CourseFilterSearch>
                        <Row gutter={12}>
                          <Col span={12} md={8}>
                            <StyledInput
                              placeholder={"Search"}
                              name="search"
                              suffix={
                                <img loading="lazy"alt={""}
                                  height={15}
                                  width={15}
                                  src={SearchIcon}
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
                              defaultValue="Category"
                              onChange={(e) => {
                                setDashboardMainState({
                                  ...dashboardMainState,
                                  subCategory: e,
                                });
                              }}
                            >
                              {getCourseTrainingSubCategoryStatus?.map(
                                (item, index) => (
                                  <Option key={index} value={item?.id}>
                                    {item?.name_EN}
                                  </Option>
                                )
                              )}
                            </StyledSelect>
                          </Col>
                          <Col span={12} md={6}>
                            <StyledSelect
                              defaultValue="Instructor"
                              onChange={(e) => {
                                setDashboardMainState({
                                  ...dashboardMainState,
                                  instructorId: e,
                                });
                              }}
                            >
                              {getInstructorStatus?.map((item, index) => (
                                <Option key={index} value={item?.id}>
                                  {item?.name_EN}
                                </Option>
                              ))}
                            </StyledSelect>
                          </Col>
                          <Col span={12} md={5}>
                            <StyledSelect
                              defaultValue="Sort By"
                              onChange={(e) => {
                                setDashboardMainState({
                                  ...dashboardMainState,
                                  sortBy: e,
                                });
                              }}
                            >
                              {getSortStatus?.map((item, index) => (
                                <Option key={index} value={item?.id}>
                                  {item?.name_EN}
                                </Option>
                              ))}
                            </StyledSelect>
                          </Col>
                        </Row>
                      </CourseFilterSearch>
                      <CourseCards>
                        <Row gutter={12}>
                          {myCourses?.dashboardMainViewModels?.map(
                            (item, index) => (
                              <>
                                {item?.percentageComplete >= 100 && (
                                  <Col span={12} key={index}>
                                    <CoursesCards
                                      courseTrainingRegistrationId={
                                        item?.courseTrainingRegistrationId
                                      }
                                      title={item?.title_EN}
                                      creditHours={item?.creditHours}
                                      categoryName={item?.departmentName_EN}
                                      description={item?.description}
                                      percent={item?.percentageComplete}
                                      instructor={item?.instructorName_EN}
                                      duration={item?.duration_EN}
                                      site={item?.subCategory}
                                      inFavourite={item?.favourite}
                                      AddCourseWhishlist={AddCourseWhishlist}
                                      RemoveCourseWhishlist={
                                        RemoveCourseWhishlist
                                      }
                                      type={item?.recordType}
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
                                description={myCourses?.message}
                              />
                            </EmptyData>
                          )}
                        </Row>
                      </CourseCards>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={"Symposiums"} key="4">
                      <CourseFilterSearch>
                        <Row gutter={12}>
                          <Col span={12} md={8}>
                            <StyledInput
                              placeholder={"Search"}
                              name="search"
                              suffix={
                                <img loading="lazy"alt={""}
                                  height={15}
                                  width={15}
                                  src={SearchIcon}
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
                              defaultValue="Category"
                              onChange={(e) => {
                                setDashboardMainState({
                                  ...dashboardMainState,
                                  subCategory: e,
                                });
                              }}
                            >
                              {getCourseTrainingSubCategoryStatus?.map(
                                (item, index) => (
                                  <Option key={index} value={item?.id}>
                                    {item?.name_EN}
                                  </Option>
                                )
                              )}
                            </StyledSelect>
                          </Col>
                          <Col span={12} md={6}>
                            <StyledSelect
                              defaultValue="Instructor"
                              onChange={(e) => {
                                setDashboardMainState({
                                  ...dashboardMainState,
                                  instructorId: e,
                                });
                              }}
                            >
                              {getInstructorStatus?.map((item, index) => (
                                <Option key={index} value={item?.id}>
                                  {item?.name_EN}
                                </Option>
                              ))}
                            </StyledSelect>
                          </Col>
                          <Col span={12} md={5}>
                            <StyledSelect
                              defaultValue="Sort By"
                              onChange={(e) => {
                                setDashboardMainState({
                                  ...dashboardMainState,
                                  sortBy: e,
                                });
                              }}
                            >
                              {getSortStatus?.map((item, index) => (
                                <Option key={index} value={item?.id}>
                                  {item?.name_EN}
                                </Option>
                              ))}
                            </StyledSelect>
                          </Col>
                        </Row>
                      </CourseFilterSearch>
                      <CourseCards>
                        <Row gutter={12}>
                          {myCourses?.dashboardMainViewModels?.map(
                            (item, index) => (
                              <>
                                {item?.percentageComplete >= 100 && (
                                  <Col span={12} key={index}>
                                    <CoursesCards
                                      courseTrainingRegistrationId={
                                        item?.courseTrainingRegistrationId
                                      }
                                      title={item?.title_EN}
                                      creditHours={item?.creditHours}
                                      categoryName={item?.departmentName_EN}
                                      description={item?.description}
                                      percent={item?.percentageComplete}
                                      instructor={item?.instructorName_EN}
                                      duration={item?.duration_EN}
                                      site={item?.subCategory}
                                      inFavourite={item?.favourite}
                                      AddCourseWhishlist={AddCourseWhishlist}
                                      RemoveCourseWhishlist={
                                        RemoveCourseWhishlist
                                      }
                                      type={item?.recordType}
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
                                description={myCourses?.message}
                              />
                            </EmptyData>
                          )}
                        </Row>
                      </CourseCards>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={"Workshops"} key="5">
                      <CourseFilterSearch>
                        <Row gutter={12}>
                          <Col span={12} md={8}>
                            <StyledInput
                              placeholder={"Search"}
                              name="search"
                              suffix={
                                <img loading="lazy"alt={""}
                                  height={15}
                                  width={15}
                                  src={SearchIcon}
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
                              defaultValue="Category"
                              onChange={(e) => {
                                setDashboardMainState({
                                  ...dashboardMainState,
                                  subCategory: e,
                                });
                              }}
                            >
                              {getCourseTrainingSubCategoryStatus?.map(
                                (item, index) => (
                                  <Option key={index} value={item?.id}>
                                    {item?.name_EN}
                                  </Option>
                                )
                              )}
                            </StyledSelect>
                          </Col>
                          <Col span={12} md={6}>
                            <StyledSelect
                              defaultValue="Instructor"
                              onChange={(e) => {
                                setDashboardMainState({
                                  ...dashboardMainState,
                                  instructorId: e,
                                });
                              }}
                            >
                              {getInstructorStatus?.map((item, index) => (
                                <Option key={index} value={item?.id}>
                                  {item?.name_EN}
                                </Option>
                              ))}
                            </StyledSelect>
                          </Col>
                          <Col span={12} md={5}>
                            <StyledSelect
                              defaultValue="Sort By"
                              onChange={(e) => {
                                setDashboardMainState({
                                  ...dashboardMainState,
                                  sortBy: e,
                                });
                              }}
                            >
                              {getSortStatus?.map((item, index) => (
                                <Option key={index} value={item?.id}>
                                  {item?.name_EN}
                                </Option>
                              ))}
                            </StyledSelect>
                          </Col>
                        </Row>
                      </CourseFilterSearch>
                      <CourseCards>
                        <Row gutter={12}>
                          {myCourses?.dashboardMainViewModels?.map(
                            (item, index) => (
                              <>
                                {item?.percentageComplete >= 100 && (
                                  <Col span={12} key={index}>
                                    <CoursesCards
                                      courseTrainingRegistrationId={
                                        item?.courseTrainingRegistrationId
                                      }
                                      title={item?.title_EN}
                                      creditHours={item?.creditHours}
                                      categoryName={item?.departmentName_EN}
                                      description={item?.description}
                                      percent={item?.percentageComplete}
                                      instructor={item?.instructorName_EN}
                                      duration={item?.duration_EN}
                                      site={item?.subCategory}
                                      inFavourite={item?.favourite}
                                      AddCourseWhishlist={AddCourseWhishlist}
                                      RemoveCourseWhishlist={
                                        RemoveCourseWhishlist
                                      }
                                      type={item?.recordType}
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
                                description={myCourses?.message}
                              />
                            </EmptyData>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "TitilliumNormal", sans-serif;
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
    font-family: "TitilliumSemiBold";
  }
  .ant-tabs-nav::before {
    border-color: #a8a8a8 !important;
  }
  .ant-tabs-tab-btn {
    font-weight: 500;
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
    font-family: "TitilliumNormal", sans-serif;
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
