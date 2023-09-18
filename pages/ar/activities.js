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
  Activities,
  webinars,
  conferences,
  workshops,
  symposiums,
  Search,
  Category,
  Instructor,
  Sort_by,
  Added_to_Wishlist,
  remove_from_wishlist,
  All,
  No_Record_Found,
} from "../../src/helpers/LanguageConstant";

const { Option } = Select;

const dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectItem, setSelectItem] = useState("/ar/activities");

  const [getProgressStatus, setgetProgressStatus] = useState();
  const [getSortStatus, setGetSortStatus] = useState();
  const [getInstructorStatus, setGetInstructorStatus] = useState();
  const [
    getCourseTrainingSubCategoryStatus,
    setGetCourseTrainingSubCategoryStatus,
  ] = useState();

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

  const [
    dashboardMainWebinarsinitialState,
    setDashboardMainWebinarsinitialState,
  ] = useState({
    recordType: "Webinar",
    pageSize: 6,
    pageNo: 1,
    language: "English",
    search: "",
    progressStatus: "",
    instructorId: "",
    sortBy: "",
    subCategory: "",
  });
  const [webinarsState, setWebinarsState] = useState();

  const [dashboardMainWebinarLoading, setDashboardMainWebinarLoading] =
    useState(true);
  const GetDashboardMainWebinarsFunc = async (data) => {
    setDashboardMainWebinarLoading(true);
    try {
      if (data) {
        const response = await endpoints.GetDashboardMain(authToken, data);
        if (response.data.statusCode === "200") {
          setWebinarsState(response?.data?.data);
          setAddWishlistDisabled();
          setDashboardMainWebinarLoading(false);
        } else {
          setWebinarsState(response?.data);
          setDashboardMainWebinarLoading(false);
        }
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  const [dashboardMaininitialState, setDashboardMainConferencesinitialState] =
    useState({
      recordType: "Conference",
      pageSize: 6,
      pageNo: 1,
      language: "English",
      search: "",
      progressStatus: "",
      instructorId: "",
      sortBy: "",
      subCategory: "",
    });
  const [conferencesState, setConferencesState] = useState();

  const [dashboardMainConferenceLoading, setDashboardMainConferenceLoading] =
    useState(true);
  const GetDashboardMainConferencesFunc = async (data) => {
    setDashboardMainConferenceLoading(true);
    try {
      if (data) {
        const response = await endpoints.GetDashboardMain(authToken, data);
        if (response.data.statusCode === "200") {
          setConferencesState(response?.data?.data);
          setAddWishlistDisabled();
          setDashboardMainConferenceLoading(false);
        } else {
          setConferencesState(response?.data);
          setDashboardMainConferenceLoading(false);
        }
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  const [dashboardSymposiumsState, setDashboardMainSymposiumsinitialState] =
    useState({
      recordType: "Symposiums",
      pageSize: 6,
      pageNo: 1,
      language: "English",
      search: "",
      progressStatus: "",
      instructorId: "",
      sortBy: "",
      subCategory: "",
    });
  const [symposiumsState, setSymposiumsState] = useState();

  const [dashboardMainSymposiumLoading, setDashboardMainSymposiumLoading] =
    useState(true);
  const GetDashboardMainSymposiumsFunc = async (data) => {
    setDashboardMainSymposiumLoading(true);
    try {
      if (data) {
        const response = await endpoints.GetDashboardMain(authToken, data);
        if (response.data.statusCode === "200") {
          setSymposiumsState(response?.data?.data);
          setAddWishlistDisabled();
          setDashboardMainSymposiumLoading(false);
        } else {
          setSymposiumsState(response?.data);
          setDashboardMainSymposiumLoading(false);
        }
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  const [dashboardWorkshopsState, setDashboardMainWorkshopsinitialState] =
    useState({
      recordType: "Workshop",
      pageSize: 6,
      pageNo: 1,
      language: "English",
      search: "",
      progressStatus: "",
      instructorId: "",
      sortBy: "",
      subCategory: "",
    });
  const [workshopsState, setWorkshopsState] = useState();

  const [dashboardMainWorkshopLoading, setDashboardMainWorkshopLoading] =
    useState(true);
  const GetDashboardMainWorkshopsFunc = async (data) => {
    setDashboardMainWorkshopLoading(true);
    try {
      if (data) {
        const response = await endpoints.GetDashboardMain(authToken, data);
        if (response.data.statusCode === "200") {
          setWorkshopsState(response?.data?.data);
          setAddWishlistDisabled();
          setDashboardMainWorkshopLoading(false);
        } else {
          setWorkshopsState(response?.data);
          setDashboardMainWorkshopLoading(false);
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

  const [AddWishlistDisabled, setAddWishlistDisabled] = useState();
  // Add Course Whishlist
  const AddCourseWhishlist = async (data) => {
    try {
      if (data) {
        const response = await endpoints.AddFavourite(authToken, data);
        if (response.data.statusCode === "200") {
          toast.success(Added_to_Wishlist);
          GetDashboardMainWebinarsFunc(dashboardMainWebinarsinitialState);
          GetDashboardMainConferencesFunc(dashboardMaininitialState);
          GetDashboardMainSymposiumsFunc(dashboardSymposiumsState);
          GetDashboardMainWorkshopsFunc(dashboardWorkshopsState);
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
          toast.success(remove_from_wishlist);
          GetDashboardMainWebinarsFunc(dashboardMainWebinarsinitialState);
          GetDashboardMainConferencesFunc(dashboardMaininitialState);
          GetDashboardMainSymposiumsFunc(dashboardSymposiumsState);
          GetDashboardMainWorkshopsFunc(dashboardWorkshopsState);
        }
      }
    } catch (error) {
      //console.log("error", error);
    }
  };
  // Add Course Whishlist End

  const [TabsIndex, setTabsIndex] = useState(0);
  const TabsArrayKey = [webinars, conferences, symposiums, workshops];
  const TabsArray = [
    <>
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
                setDashboardMainWebinarsinitialState({
                  ...dashboardMainWebinarsinitialState,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          </Col>
          <Col span={12} md={5}>
            <StyledSelect
              defaultValue={Category}
              onChange={(e) => {
                setDashboardMainWebinarsinitialState({
                  ...dashboardMainWebinarsinitialState,
                  subCategory: e,
                });
              }}
            >
              <Option value="">{All}</Option>
              {getCourseTrainingSubCategoryStatus?.map((item, index) => (
                <Option key={index} value={item?.id}>
                  {item?.name_AR}
                </Option>
              ))}
            </StyledSelect>
          </Col>
          <Col span={12} md={6}>
            <StyledSelect
              defaultValue={Instructor}
              onChange={(e) => {
                setDashboardMainWebinarsinitialState({
                  ...dashboardMainWebinarsinitialState,
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
                setDashboardMainWebinarsinitialState({
                  ...dashboardMainWebinarsinitialState,
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
          {dashboardMainWebinarLoading ? (
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
              {webinarsState?.dashboardMainViewModels?.map((item, index) => (
                <>
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
                      RemoveCourseWhishlist={RemoveCourseWhishlist}
                      AddWishlistDisabled={AddWishlistDisabled}
                      setAddWishlistDisabled={setAddWishlistDisabled}
                      type={item?.recordType}
                      courseAlreadyRegistered={item?.courseAlreadyRegistered}
                      DetailPageSlug={`inside/${item?.courseTrainingRegistrationId}`}
                    />
                  </Col>
                </>
              ))}
              {webinarsState?.statusCode === "404" && (
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
        {webinarsState?.totalRecord > 10 && (
          <Row>
            <StyledPagination
              defaultCurrent={1}
              current={dashboardMainWebinarsinitialState?.pageNo}
              onChange={(e) =>
                setDashboardMainWebinarsinitialState({
                  ...dashboardMainWebinarsinitialState,
                  pageNo: e,
                })
              }
              total={webinarsState?.totalRecord}
            />
          </Row>
        )}
      </CourseCards>
    </>,
    <>
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
                setDashboardMainConferencesinitialState({
                  ...dashboardMaininitialState,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          </Col>
          <Col span={12} md={5}>
            <StyledSelect
              defaultValue={Category}
              onChange={(e) => {
                setDashboardMainConferencesinitialState({
                  ...dashboardMaininitialState,
                  subCategory: e,
                });
              }}
            >
              <Option value="">{All}</Option>
              {getCourseTrainingSubCategoryStatus?.map((item, index) => (
                <Option key={index} value={item?.id}>
                  {item?.name_AR}
                </Option>
              ))}
            </StyledSelect>
          </Col>
          <Col span={12} md={6}>
            <StyledSelect
              defaultValue={Instructor}
              onChange={(e) => {
                setDashboardMainConferencesinitialState({
                  ...dashboardMaininitialState,
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
                setDashboardMainConferencesinitialState({
                  ...dashboardMaininitialState,
                  sortBy: e,
                });
              }}
            >
              <Option value="">{All}</Option>
              {getSortStatus?.map((item, index) => (
                <Option key={index} value={item?.id}>
                  {" "}
                  {item?.name_AR}{" "}
                </Option>
              ))}
            </StyledSelect>
          </Col>
        </Row>
      </CourseFilterSearch>
      <CourseCards>
        <Row gutter={12}>
          {dashboardMainConferenceLoading ? (
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
              {conferencesState?.dashboardMainViewModels?.map((item, index) => (
                <>
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
                      RemoveCourseWhishlist={RemoveCourseWhishlist}
                      AddWishlistDisabled={AddWishlistDisabled}
                      setAddWishlistDisabled={setAddWishlistDisabled}
                      type={item?.recordType}
                      courseAlreadyRegistered={item?.courseAlreadyRegistered}
                      DetailPageSlug={`inside/${item?.courseTrainingRegistrationId}`}
                    />
                  </Col>
                </>
              ))}
              {conferencesState?.statusCode === "404" && (
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
        {conferencesState?.totalRecord > 10 && (
          <Row>
            <StyledPagination
              defaultCurrent={1}
              current={dashboardMaininitialState?.pageNo}
              onChange={(e) =>
                setDashboardMainConferencesinitialState({
                  ...dashboardMaininitialState,
                  pageNo: e,
                })
              }
              total={conferencesState?.totalRecord}
            />
          </Row>
        )}
      </CourseCards>
    </>,
    <>
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
                setDashboardMainSymposiumsinitialState({
                  ...dashboardSymposiumsState,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          </Col>
          <Col span={12} md={5}>
            <StyledSelect
              defaultValue={Category}
              onChange={(e) => {
                setDashboardMainSymposiumsinitialState({
                  ...dashboardSymposiumsState,
                  subCategory: e,
                });
              }}
            >
              <Option value="">{All}</Option>
              {getCourseTrainingSubCategoryStatus?.map((item, index) => (
                <Option key={index} value={item?.id}>
                  {item?.name_AR}
                </Option>
              ))}
            </StyledSelect>
          </Col>
          <Col span={12} md={6}>
            <StyledSelect
              defaultValue={Instructor}
              onChange={(e) => {
                setDashboardMainSymposiumsinitialState({
                  ...dashboardSymposiumsState,
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
                setDashboardMainSymposiumsinitialState({
                  ...dashboardSymposiumsState,
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
          {dashboardMainSymposiumLoading ? (
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
              {symposiumsState?.dashboardMainViewModels?.map((item, index) => (
                <>
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
                      RemoveCourseWhishlist={RemoveCourseWhishlist}
                      AddWishlistDisabled={AddWishlistDisabled}
                      setAddWishlistDisabled={setAddWishlistDisabled}
                      type={item?.recordType}
                      courseAlreadyRegistered={item?.courseAlreadyRegistered}
                      DetailPageSlug={`inside/${item?.courseTrainingRegistrationId}`}
                    />
                  </Col>
                </>
              ))}
              {symposiumsState?.statusCode === "404" && (
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
        {symposiumsState?.totalRecord > 10 && (
          <Row>
            <StyledPagination
              defaultCurrent={1}
              current={dashboardSymposiumsState?.pageNo}
              onChange={(e) =>
                setDashboardMainSymposiumsinitialState({
                  ...dashboardSymposiumsState,
                  pageNo: e,
                })
              }
              total={symposiumsState?.totalRecord}
            />
          </Row>
        )}
      </CourseCards>
    </>,
    <>
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
                setDashboardMainWorkshopsinitialState({
                  ...dashboardWorkshopsState,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          </Col>
          <Col span={12} md={5}>
            <StyledSelect
              defaultValue={Category}
              onChange={(e) => {
                setDashboardMainWorkshopsinitialState({
                  ...dashboardWorkshopsState,
                  subCategory: e,
                });
              }}
            >
              <Option value="">{All}</Option>
              {getCourseTrainingSubCategoryStatus?.map((item, index) => (
                <Option key={index} value={item?.id}>
                  {item?.name_AR}
                </Option>
              ))}
            </StyledSelect>
          </Col>
          <Col span={12} md={6}>
            <StyledSelect
              defaultValue={Instructor}
              onChange={(e) => {
                setDashboardMainWorkshopsinitialState({
                  ...dashboardWorkshopsState,
                  instructorId: e,
                });
              }}
            >
              <Option value="">{All}</Option>
              {getInstructorStatus?.map((item, index) => (
                <Option key={index} value={item?.id}>
                  {" "}
                  {item?.name_AR}{" "}
                </Option>
              ))}
            </StyledSelect>
          </Col>
          <Col span={12} md={5}>
            <StyledSelect
              defaultValue={{ Sort_by }}
              onChange={(e) => {
                setDashboardMainWorkshopsinitialState({
                  ...dashboardWorkshopsState,
                  sortBy: e,
                });
              }}
            >
              <Option value="">{All}</Option>
              {getSortStatus?.map((item, index) => (
                <Option key={index} value={item?.id}>
                  {" "}
                  {item?.name_AR}{" "}
                </Option>
              ))}
            </StyledSelect>
          </Col>
        </Row>
      </CourseFilterSearch>
      <CourseCards>
        <Row gutter={12}>
          {dashboardMainWorkshopLoading ? (
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
              {workshopsState?.dashboardMainViewModels?.map((item, index) => (
                <>
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
                      RemoveCourseWhishlist={RemoveCourseWhishlist}
                      AddWishlistDisabled={AddWishlistDisabled}
                      setAddWishlistDisabled={setAddWishlistDisabled}
                      type={item?.recordType}
                      courseAlreadyRegistered={item?.courseAlreadyRegistered}
                      DetailPageSlug={`inside/${item?.courseTrainingRegistrationId}`}
                    />
                  </Col>
                </>
              ))}
              {workshopsState?.statusCode === "404" && (
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
        {workshopsState?.totalRecord > 10 && (
          <Row>
            <StyledPagination
              defaultCurrent={1}
              current={dashboardWorkshopsState?.pageNo}
              onChange={(e) =>
                setDashboardMainWorkshopsinitialState({
                  ...dashboardWorkshopsState,
                  pageNo: e,
                })
              }
              total={workshopsState?.totalRecord}
            />
          </Row>
        )}
      </CourseCards>
    </>,
  ];

  useLayoutEffect(() => {
    GetDashboardMainWebinarsFunc(dashboardMainWebinarsinitialState);
  }, [
    dashboardMainWebinarsinitialState?.search,
    dashboardMainWebinarsinitialState?.progressStatus,
    dashboardMainWebinarsinitialState?.sortBy,
    dashboardMainWebinarsinitialState?.instructorId,
    dashboardMainWebinarsinitialState?.subCategory,
  ]);

  useLayoutEffect(() => {
    GetDashboardMainConferencesFunc(dashboardMaininitialState);
  }, [
    dashboardMaininitialState?.search,
    dashboardMaininitialState?.progressStatus,
    dashboardMaininitialState?.sortBy,
    dashboardMaininitialState?.instructorId,
    dashboardMaininitialState?.subCategory,
  ]);

  useLayoutEffect(() => {
    GetDashboardMainSymposiumsFunc(dashboardSymposiumsState);
  }, [
    dashboardSymposiumsState?.search,
    dashboardSymposiumsState?.progressStatus,
    dashboardSymposiumsState?.sortBy,
    dashboardSymposiumsState?.instructorId,
    dashboardSymposiumsState?.subCategory,
  ]);

  useLayoutEffect(() => {
    GetDashboardMainWorkshopsFunc(dashboardWorkshopsState);
  }, [
    dashboardWorkshopsState?.search,
    dashboardWorkshopsState?.progressStatus,
    dashboardWorkshopsState?.sortBy,
    dashboardWorkshopsState?.instructorId,
    dashboardWorkshopsState?.subCategory,
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
                  <MainHeading>{Activities}</MainHeading>
                </Col>
                <Col span={24}>
                  <CoursesTabs>
                    <div className="tabs-head">
                      {TabsArrayKey?.map((item, index) => (
                        <a
                          className={index === TabsIndex && "active"}
                          onClick={() => {
                            setTabsIndex(index);
                          }}
                        >
                          {" "}
                          {item}{" "}
                        </a>
                      ))}
                    </div>
                    <div className="tabs-body">
                      {TabsArray?.map((item, index) => (
                        <>{index === TabsIndex && item}</>
                      ))}
                    </div>
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
const CoursesTabs = styled.div`
  position: relative;

  .tabs-head {
    overflow-y: hidden;
    overflow-x: auto;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #a8a8a8;

    &::-webkit-scrollbar {
      height: 0;
    }

    a {
      display: inline-block;
      font-size: 14px;
      color: #a8a8a8;
      padding: 10px 0;
      margin-bottom: -1px;
      white-space: nowrap;
      user-select: none;
      border-bottom: 2px solid transparent;

      &.active {
        color: #105f43;
        font-weight: 500;
        text-shadow: 0 0 0.25px #105f43;
        border-bottom: 2px solid #105f43;
      }

      &:not(:last-child) {
        margin-left: 32px;
      }
    }
  }

  .tabs-body {
    padding: 16px 0;
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
    // font-family: "TitilliumNormal", sans-serif;
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
