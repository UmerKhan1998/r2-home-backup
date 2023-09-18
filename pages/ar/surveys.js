import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Header from "../../src/components/rtl/adminLayoutHeader";
import CustomTable from "../../src/components/rtl/Table/customTable";
import styled from "styled-components";
import { Button, Col, DatePicker, Input, Row, Select, Tabs } from "antd";

import {
  SearchIcon,
  WebinarImg1,
  TotalSurvey,
  UndertakenSurveys,
  PendingSurveys,
  R2Favicon,
} from "../../images";
import {} from "@ant-design/icons";

import { AiOutlineRight } from "react-icons/ai";

const { Option } = Select;

const dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectItem, setSelectItem] = useState("My Learning");

  const SurveysDashboardCards = [
    {
      img: TotalSurvey,
      total: "03",
      name: "Total Survey",
    },
    {
      img: UndertakenSurveys,
      total: "01",
      name: "Undertaken Surveys",
    },
    {
      img: PendingSurveys,
      total: "01",
      name: "Pending Surveys",
    },
  ];
  const surveysTableHead = [
    "Survey Name",
    "Creation Date",
    "Due Date",
    "Status",
    "",
  ];
  const [surveysTable, setSurveysTable] = useState([
    {
      survey_name: "Suvey 01",
      creation_date: "15 Aug 2022 17:23",
      due_date: "15 Aug 2022 17:23",
      status: "Pending",
    },
    {
      survey_name: "Suvey 02",
      creation_date: "15 Aug 2022 17:23",
      due_date: "15 Aug 2022 17:23",
      status: "Submitted",
    },
    {
      survey_name: "Suvey 03",
      creation_date: "15 Aug 2022 17:23",
      due_date: "15 Aug 2022 17:23",
      status: "Pending",
    },
  ]);

  return (
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
          {/* <Container style={{ paddingInline: "0" }}> */}
          <Row gutter={[15, 15]}>
            <Col span={24}>
              <MainHeading>Surveys</MainHeading>
            </Col>
            <Col span={24}>
              <AssessmentSummery>
                <Row gutter={16}>
                  {SurveysDashboardCards?.map((item, index) => (
                    <Col span={8} key={index}>
                      <div className="assessment-col">
                        <div>
                          <h4>{item?.total}</h4>
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
                  <Col span={8}>
                    <StyledInput
                      placeholder={"Search"}
                      suffix={<img loading="lazy"alt={""} height={15} width={15} src={SearchIcon} />}
                    />
                  </Col>
                  <Col span={4}>
                    <StyledSelect defaultValue="Assessement">
                      <Option value="1">1</Option>
                      <Option value="2">2</Option>
                      {/* {departmentArr?.map((item, index) => ( */}
                      {/* <Option key={index} value={item}>
                                    {item}
                                    </Option> */}
                      {/* ))} */}
                    </StyledSelect>
                  </Col>
                  <Col span={4}>
                    <StyledDatePicker />
                  </Col>
                  <Col span={5}>
                    <StyledSelect defaultValue="Instructor">
                      <Option value="1">1</Option>
                      <Option value="2">2</Option>
                      {/* {departmentArr?.map((item, index) => ( */}
                      {/* <Option key={index} value={item}>
                                    {item}
                                    </Option> */}
                      {/* ))} */}
                    </StyledSelect>
                  </Col>
                  <Col span={3}>
                    <StyledSelect defaultValue="Sort By">
                      <Option value="1">1</Option>
                      <Option value="2">2</Option>
                      {/* {departmentArr?.map((item, index) => ( */}
                      {/* <Option key={index} value={item}>
                                    {item}
                                    </Option> */}
                      {/* ))} */}
                    </StyledSelect>
                  </Col>
                </Row>
              </CourseFilterSearch>
            </Col>
            <Col span={24}>
              <CustomLearnerTable>
                <CustomTable
                  tableHead={surveysTableHead}
                  tableBody={surveysTable}
                  tableName="surveys"
                />
              </CustomLearnerTable>
            </Col>
          </Row>
          {/* </Container> */}
        </Header>
      </body>
    </div>
  );
};

export default dashboard;

const MainHeading = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  font-family: "GESSTwoLight", sans-serif;
`;
const AssessmentSummery = styled.div`
  margin-bottom: 20px;
  .assessment-col {
    padding: 16px 12px;
    background: #fff;
    border-radius: 5px;
    display: flex;
    align-items: center;
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
    font-family: "GESSTwoLight", sans-serif;
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
    font-family: "GESSTwoLight", sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #898989;
  }
  .ant-select-single.ant-select-open {
    color: #898989 !important;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100% !important;
`;

const StyledViewAllDiv = styled.div`
  display: flex;
  justify-content: center;
`;
