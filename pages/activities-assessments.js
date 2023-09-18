import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Header from "../src/components/adminLayoutHeader";
import CustomTable from "../src/components/Table/customTable";
import styled from "styled-components";
import { Col, DatePicker, Empty, Input, Row, Select } from "antd";

import {
  SearchIcon,
  TotalAssisment,
  Passed,
  NeedsRemediation,
  Pending,
  Instructor1,
  Instructor2,
  Instructor3,
  R2Favicon,
} from "../images";
import Preloader from "../public/images/Preloader.gif";
import { useSelector } from "react-redux";
import router from "next/router";
import { getCookies } from "../src/helpers/cookie";
import endpoints from "../src/api";

const dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectItem, setSelectItem] = useState("activities-assessments");

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

  const assessmentsTableHead = [
    "Instructor",
    "Assessment",
    "Activities",
    "Passing Score",
    "My Grade",
    "Status",
    "Action",
  ];
  const [getSortStatus, setGetSortStatus] = useState();
  const [getInstructorStatus, setGetInstructorStatus] = useState();
  const [assessmentsTable, setAssessmentsTable] = useState([]);

  const AssessmentDashboardCards = [
    {
      img: TotalAssisment,
      total: assessmentsTable?.totalAssessments,
      name: "Total Assessment",
    },
    {
      img: Passed,
      total: assessmentsTable?.totalPassed,
      name: "Passed",
    },
    {
      img: NeedsRemediation,
      total: assessmentsTable?.totalRemendiation,
      name: "Needs remediation",
    },
    {
      img: Pending,
      total: assessmentsTable?.totalPending,
      name: "Pending",
    },
  ];

  const [courseAssessmentState, setCourseAssessmentState] = useState({
    RecordTYPE: "Activities",
    search: "",
    assessmentId: "",
    date: "",
    instructorId: "",
    sortBy: "",
  });

  const inputHandler = (e) =>
    setCourseAssessmentState({
      ...courseAssessmentState,
      [e?.target?.name]: e?.target?.value,
    });

  const dashboardGetAssessmentFunc = async () => {
    try {
      const response = await endpoints.dashboardGetAssessment(
        authToken,
        courseAssessmentState
      );
      if (response?.data?.statusCode === "200") {
        setAssessmentsTable(response?.data?.data);
      }
    } catch (error) {
      //console.log(error);
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

  useLayoutEffect(() => {
    GetSortFunc();
    GetInstructorFunc();
  }, []);
  useLayoutEffect(() => {
    dashboardGetAssessmentFunc();
  }, [courseAssessmentState]);

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
                  <MainHeading>Assessments</MainHeading>
                </Col>
                <Col span={24}>
                  <AssessmentSummery>
                    <Row gutter={16}>
                      {AssessmentDashboardCards?.map((item, index) => (
                        <Col span={24} lg={6} sm={12} key={index}>
                          <div className="assessment-col">
                            <div>
                              <h4>{item?.total ? item?.total : 0}</h4>
                              <p>{item?.name}</p>
                            </div>
                            <div>
                              <img loading="lazy"src={item?.img} width="60px" />
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </AssessmentSummery>
                </Col>
                <Col span={24}>
                  <CourseFilterSearch>
                    <Row gutter={12}>
                      <Col span={12} md={12}>
                        <StyledInput
                          placeholder={"Search"}
                          name={"search"}
                          onChange={inputHandler}
                          suffix={
                            <img loading="lazy"alt={""} height={15} width={15} src={SearchIcon} />
                          }
                        />
                      </Col>
                      {/* <Col span={12} md={4}>
                        <StyledSelect
                          defaultValue="Assessement"
                          name={"assessmentId"}
                          onChange={(e) =>
                            setCourseAssessmentState({
                              ...courseAssessmentState,
                              assessmentId: e,
                            })
                          }
                        >
                          {//console.log("assessmentsTable", assessmentsTable)}
                          {assessmentsTable?.dashboardAssessmentListViewModels?.map(
                            (item, index) => (
                              <Option key={index} value={item?.assessmentId}>
                                {item?.title_EN}
                              </Option>
                            )
                          )}
                        </StyledSelect>
                      </Col> */}
                      <Col span={12} md={4}>
                        <StyledDatePicker
                          onChange={(date, dateString) => {
                            setCourseAssessmentState({
                              ...courseAssessmentState,
                              date: date?._d,
                            });
                          }}
                        />
                      </Col>
                      <Col span={12} md={5}>
                        <StyledSelect
                          defaultValue="Instructor"
                          name={"instructorId"}
                          onChange={(e) =>
                            setCourseAssessmentState({
                              ...courseAssessmentState,
                              instructorId: e,
                            })
                          }
                        >
                          {getInstructorStatus?.map((item, index) => (
                            <Option key={index} value={item?.id}>
                              {item?.name_EN}
                            </Option>
                          ))}
                          {/* {departmentArr?.map((item, index) => ( */}
                          {/* <Option key={index} value={item}>
                                        {item}
                                        </Option> */}
                          {/* ))} */}
                        </StyledSelect>
                      </Col>
                      <Col span={12} md={3}>
                        <StyledSelect
                          defaultValue="Sort By"
                          name={"sortBy"}
                          onChange={(e) =>
                            setCourseAssessmentState({
                              ...courseAssessmentState,
                              sortBy: e,
                            })
                          }
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
                  <CustomLearnerTable>
                    <CustomTable
                      tableHead={assessmentsTableHead}
                      tableBody={
                        assessmentsTable?.dashboardAssessmentListViewModels
                      }
                      tableName="assessments"
                    />
                  </CustomLearnerTable>
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
const AssessmentSummery = styled.div`
  margin-bottom: 5px;
  .assessment-col {
    padding: 16px 12px;
    background: #fff;
    border-radius: 5px;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    justify-content: space-between;
  }
  .assessment-col h4 {
    font-size: 20px;
    // font-weight: 700;
    color: #105f43;
    margin-bottom: 2px;
  }
  .assessment-col p {
    margin: 0;
    font-size: 12px;
    // font-weight: 700;
  }
`;
const CourseFilterSearch = styled.div`
  border-radius: 10px;
`;
// Table Style
const CustomLearnerTable = styled.div`
  padding: 10px 20px;
  border-radius: 10px;
  background: #fff;
  overflow-x: auto;

  ::-webkit-scrollbar {
    height: 2px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(16, 95, 67, 0.6);
  }
`;
// Table Style End

const StyledInput = styled(Input)`
  border-radius: 4px !important;

  @media screen and (max-width: 800px) {
    margin-bottom: 5px;
  }
`;

const StyledSelect = styled(Select)`
  width: 100% !important;
  border-radius: 4px !important;

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
