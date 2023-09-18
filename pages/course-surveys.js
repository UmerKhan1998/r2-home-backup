import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Header from "../src/components/adminLayoutHeader";
import Rolling from "../public/images/Rolling.gif";
import CustomTable from "../src/components/Table/customTable";
import styled from "styled-components";
import endpoints from "../src/api";
import { Col, DatePicker, Input, Row, Select } from "antd";

import {
  SearchIcon,
  TotalSurvey,
  UndertakenSurveys,
  PendingSurveys,
  R2Favicon,
  TotalAssisment,
  Passed,
  NeedsRemediation,
  Pending,
} from "../images";
import Preloader from "../public/images/Preloader.gif";

import router from "next/router";
import { getCookies, setCookies } from "../src/helpers/cookie";

const { Option } = Select;

const dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectItem, setSelectItem] = useState("course-surveys");

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

  const surveysTableHead = [
    "Survey Name",
    "Instructor Name",
    "Course",
    // "Creation Date",
    // "Due Date",
    "Status",
    "",
  ];

  const [getSortStatus, setGetSortStatus] = useState();
  const [getInstructorStatus, setGetInstructorStatus] = useState();
  const [assessmentsTable, setAssessmentsTable] = useState([]);
  const [totalState, setTotalState] = useState();

  // const passedTotal = assessmentsTable?.filter(
  //   (item) => item?.passingStatus === "Passed"
  // )?.length;
  // const pendingTotal = assessmentsTable?.filter(
  //   (item) => item?.passingStatus === "Inprogress"
  // )?.length;

  // //console.log("pendingTotal", pendingTotal);

  // const OthersStatusTotal = assessmentsTable?.filter(
  //   (item) => item?.passingStatus === "Failed"
  // )?.length;

  const SurveysDashboardCards = [
    {
      img: TotalSurvey,
      total: assessmentsTable?.totalSurvey,
      name: "Total Survey",
    },

    {
      img: NeedsRemediation,
      total: assessmentsTable?.totalPassed,
      name: "Total Submitted",
    },

    {
      img: PendingSurveys,
      total: assessmentsTable?.totalPending,
      name: "Pending Surveys",
    },
  ];

  const initialState = {
    search: "",
    assessmentId: "",
    date: "",
    instructorId: "",
    sortBy: "",
  };

  const [surveysTable, setSurveysTable] = useState(initialState);

  //console.log("surveysTable", surveysTable);

  const inputHandler = (e) =>
    setSurveysTable({
      ...surveysTable,
      [e?.target?.name]: e?.target?.value,
    });

  const [loadingState, setLoadingState] = useState(true);

  const dashboardGetAssessmentFunc = async (token, data) => {
    setLoadingState(true);

    //console.log("token, data", token, data);

    try {
      const obj = {
        RecordTYPE: "Course",
        assessmentId: data?.assessmentId,
        search: data?.search,
        language: "English",
        date: data?.date,
        instructorId: data?.instructorId,
        sortBy: data?.sortBy,
      };
      //console.log("rmsObj", obj);

      const response = await endpoints.dashboardGetSurvey(token, obj);
      if (response) {
        setAssessmentsTable(response?.data?.data);
        setLoadingState(false);
      }
      setLoadingState("");
    } catch (err) {
      setLoadingState(false);
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

  useLayoutEffect(() => {
    dashboardGetAssessmentFunc(authToken, surveysTable);
    GetSortFunc();
    GetInstructorFunc();
  }, [surveysTable]);

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
                  <MainHeading>Surveys</MainHeading>
                </Col>
                <Col span={24}>
                  <AssessmentSummery>
                    <Row gutter={16}>
                      {SurveysDashboardCards?.map((item, index) => (
                        <Col span={24} lg={8} sm={12} key={index}>
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
                      <Col span={12} md={10}>
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
                            setSurveysTable({
                              ...surveysTable,
                              assessmentId: e,
                            })
                          }
                        >
                          {/* {assessmentsTable?.map((item, index) => (
                            <Option key={index} value={item?.assessmentId}>
                              {item?.title_EN}
                            </Option>
                          ))} */}
                      {/* </StyledSelect>
                      </Col> */}
                      {/* <Col span={12} md={6}>
                        <StyledDatePicker
                          onChange={(date, dateString) => {
                            setSurveysTable({
                              ...surveysTable,
                              date: date?._d,
                            });
                          }}
                        />
                      </Col> */}
                      <Col span={12} md={8}>
                        <StyledSelect
                          defaultValue="Instructor"
                          name={"instructorId"}
                          onChange={(e) =>
                            setSurveysTable({
                              ...surveysTable,
                              instructorId: e,
                            })
                          }
                        >
                          <Option value="">All</Option>
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
                      <Col span={12} md={6}>
                        <StyledSelect
                          defaultValue="Sort By"
                          name={"sortBy"}
                          onChange={(e) =>
                            setSurveysTable({
                              ...surveysTable,
                              sortBy: e,
                            })
                          }
                        >
                          <Option value="">All</Option>
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
                  {loadingState ? (
                    <div
                      style={{
                        textAlign: "center",
                        paddingTop: "30px",
                        paddingBottom: "30px",
                        borderRadius: 10,
                        backgroundColor: "#fff",
                      }}
                    >
                      <img loading="lazy"src={Rolling.src} width="40px" height="40px" />
                    </div>
                  ) : (
                    <CustomLearnerTable>
                      <CustomTable
                        tableHead={surveysTableHead}
                        tableBody={
                          assessmentsTable?.dashboardSurveyListViewModels
                        }
                        tableName="surveys"
                      />
                    </CustomLearnerTable>
                  )}
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
