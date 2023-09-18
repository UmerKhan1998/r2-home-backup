import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Header from "../src/components/adminLayoutHeader";
import styled from "styled-components";
import { Button, Col, DatePicker, Empty, Input, Row, Select } from "antd";

import { R2Favicon, SearchIcon } from "../images";
import Preloader from "../public/images/Preloader.gif";
import NoCertificates from "../public/images/NoCertificates.svg";
import {} from "@ant-design/icons";
import endpoints from "../src/api";

import { AiOutlineRight } from "react-icons/ai";

import CertificatesCardsComp from "../src/components/Cards/CertificatesCards";
import { useSelector } from "react-redux";
import router from "next/router";
import { getCookies } from "../src/helpers/cookie";
import SkeletonTextPlaceholder from "../src/components/SkeletonTextPlaceholder";

const { Option } = Select;

const dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectItem, setSelectItem] = useState("activities-certificates");

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

  const [SearchState, setSearchState] = useState("");

  const [GetCertificateLMSUserLoading, setGetCertificateLMSUserLoading] = useState(true);
  const [GetCertificateLMSUser, setGetCertificateLMSUser] = useState([]);
  const [GetCertificateLMSUserState, setGetCertificateLMSUserState] = useState({
    sortBy: "",
    subCategory: "",
    issueDate: "",
    recordType: "Activities",
  });
  const GetCertificateLMSUserFunc = async () => {
    setGetCertificateLMSUserLoading(true)
    try {
      const response = await endpoints.GetCertificateLMSUser(
        authToken,
        GetCertificateLMSUserState
      );
      if (response.data.statusCode === "200") {
        setGetCertificateLMSUser(response?.data);
        setGetCertificateLMSUserLoading(false)
      } else if (response.data.statusCode === "404") {
        setGetCertificateLMSUser(response?.data);
        setGetCertificateLMSUserLoading(false)
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  const [getSortStatus, setGetSortStatus] = useState();
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

  const [
    getCourseTrainingSubCategoryStatus,
    setGetCourseTrainingSubCategoryStatus,
  ] = useState();
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
    GetCertificateLMSUserFunc();
  }, [GetCertificateLMSUserState]);
  useLayoutEffect(() => {
    GetSortFunc();
    GetCourseTrainingSubCategoryFunc();
  }, []);

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
                  <MainHeading>Certificates</MainHeading>
                </Col>
                <Col span={24}>
                  <CourseFilterSearch>
                    <Row gutter={12}>
                      <Col span={12} md={9}>
                        <StyledInput
                          autoComplete="off"
                          onChange={(e) => {
                            setSearchState(e.target.value);
                          }}
                          placeholder={"Search"}
                          name="search"
                          suffix={
                            <img loading="lazy"alt={""} height={15} width={15} src={SearchIcon} />
                          }
                        />
                      </Col>
                      <Col span={12} md={9}>
                        <StyledSelect
                          defaultValue="Category"
                          onChange={(e) => {
                            setGetCertificateLMSUserState({
                              ...GetCertificateLMSUserState,
                              recordType: e,
                            });
                          }}
                        >
                          <Option value="Activities">All</Option>
                          <Option value="Webinar">Webinars</Option>
                          <Option value="Conference">Conferences</Option>
                          <Option value="Symposiums">Symposiums</Option>
                          <Option value="Workshop">Workshops</Option>
                          {/* {getCourseTrainingSubCategoryStatus?.map(
                            (item, index) => (
                              <Option key={index} value={item?.id}>
                                {item?.name_EN}
                              </Option>
                            )
                          )} */}
                        </StyledSelect>
                      </Col>
                      <Col span={12} md={6}>
                        <StyledSelect
                          defaultValue="Sort By"
                          onChange={(e) => {
                            setGetCertificateLMSUserState({
                              ...GetCertificateLMSUserState,
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
                </Col>
                <Col span={24}>
                  <CertificatesCards>
                    {GetCertificateLMSUserLoading ? (
                      <div className="certificate-card">
                        <Row>
                          <Col span={24} md={5} lg={3}>
                            <div className="certificate-img">
                              {
                                <SkeletonTextPlaceholder
                                  width="100px"
                                  height="80px"
                                />
                              }
                            </div>
                          </Col>
                          <Col span={24} md={15} lg={17}>
                            <div className="certificate-dec">
                              <span>
                                {
                                  <SkeletonTextPlaceholder
                                    width="50px"
                                    height="16px"
                                  />
                                }
                              </span>
                              <h3>
                                {
                                  <SkeletonTextPlaceholder
                                    width="300px"
                                    height="25px"
                                  />
                                }
                              </h3>
                              <div className="date-department">
                                <span>
                                  {
                                    <SkeletonTextPlaceholder
                                      width="110px"
                                      height="20px"
                                    />
                                  }
                                </span>
                              </div>
                              <div className="date-department">
                                <span>
                                  {
                                    <SkeletonTextPlaceholder
                                      width="80px"
                                      height="18px"
                                    />
                                  }
                                </span>
                              </div>
                            </div>
                          </Col>
                          <Col span={12} md={4}>
                            <div className="certificate-action">
                              <SkeletonTextPlaceholder
                                width="90px"
                                height="30px"
                              />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    ) : (<>
                      {GetCertificateLMSUser?.data?.map((item, index) => (
                        <div key={index}>
                          {item.courseTrainingTitle_EN &&
                            item.courseTrainingTitle_EN
                              .toLowerCase()
                              .includes(SearchState.toLowerCase()) && (
                              <CertificatesCardsComp
                                title={item?.courseTrainingTitle_EN}
                                issueDate={item?.issueDate}
                                departmentName={item?.departmentName_EN}
                                categoryName="Certification"
                                courseTrainingRegistrationId={
                                  item?.courseTrainingRegistrationId
                                }
                              />
                            )}
                        </div>
                      ))}
                      {GetCertificateLMSUser?.statusCode === "404" && (
                        <EmptyData>
                          <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description="No Record Found!"
                          />
                        </EmptyData>
                      )}
                    </>)}
                  </CertificatesCards>
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
const CourseFilterSearch = styled.div`
  margin-bottom: 8px;
  border-radius: 10px;
`;
const CertificatesCards = styled.div`
  padding: 25px 30px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 5px 5px 31px rgb(0 0 0 / 10%);

  .certificate-card {
    padding-top: 25px;
    padding-bottom: 25px;
  }

  .certificate-card:first-child {
    padding-top: 0;
  }

  .certificate-card:last-child {
    padding-bottom: 0;
  }

  .certificate-card:not(:last-child) {
    border-bottom: 1px solid #e1e1e1;
  }

  .certificate-card .certificate-img img {
    width: 100px;
    margin-right: 20px;
  }

  .certificate-dec {
    padding-right: 20px;
  }
  .certificate-dec > span {
    font-size: 12px;
    font-weight: 600;
  }
  .certificate-dec h3 {
    font-size: 20px;
    color: #105f43;
    margin-bottom: 12px;
  }
  .certificate-card .certificate-dec .date-department {
    font-size: 12px;
    margin-bottom: 6px;
    font-weight: 600;
  }
  .certificate-card .certificate-dec .date-department span {
    color: #979797;
  }
  .certificate-dec a {
    color: #a87e33;
    margin-top: 25px;
    display: inline-block;
    text-decoration: underline;
    font-weight: 600;
  }

  .certificate-card .certificate-action {
    text-align: right;

    a[disabled]:hover,
    a[disabled] {
      border-color: #e0e0e0;
      color: #fff;
      background-color: #e0e0e0;
      cursor: not-allowed;
    }
  }
  .certificate-card .certificate-action a {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: #fff;
    background: #105f43;
    padding: 5px 12px;
    border-radius: 4px;
    white-space: nowrap;
  }

  @media screen and (max-width: 768px) {
    .certificate-card {
      .ant-row {
        flex-direction: column;
        gap: 15px;

        .certificate-action {
          text-align: left;
        }
      }
    }
  }
`;

// const DashboardIconColumnCard = styled.div``

const StyledInput = styled(Input)`
  border-radius: 4px !important;

  @media screen and (max-width: 800px) {
    margin-bottom: 5px;
  }
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

  @media screen and (max-width: 800px) {
    margin-bottom: 5px;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100% !important;
`;

const StyledViewAllDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const EmptyData = styled.div`
  position: relative;
  padding: 1px 30px;
  text-align: center;

  p {
    font-size: 14px;
    color: #a6a6a6;
    margin: 10px 0 0 0;
    font-family: "TitilliumNormal";
  }
`;
