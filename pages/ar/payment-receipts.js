import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Header from "../../src/components/rtl/adminLayoutHeader";
import CustomTable from "../../src/components/rtl/Table/customTable";
import styled from "styled-components";
import { Col, DatePicker, Input, Row, Select, Tabs } from "antd";

import {
  SearchIcon,
  Receipt1,
  Receipt2,
  Receipt3,
  Receipt4,
  R2Favicon,
} from "../../images";
import {} from "@ant-design/icons";

const { Option } = Select;

const dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectItem, setSelectItem] = useState("My Learning");

  const paymentReceiptsTableHead = [
    "Course name",
    "Department",
    "Date",
    "Price",
    "Payment Method",
    "Actions",
  ];
  const [paymentReceiptsTable, setPaymentReceiptsTable] = useState([
    {
      course_name: {
        img: Receipt1,
        name: "Course of Anesthesiology",
      },
      department: "Dental Esthetics",
      date: "05-30-2022",
      price: "SAR 35.00",
      payment_method: "SAR 35.00 Paypal",
    },
    {
      course_name: {
        img: Receipt2,
        name: "Course of Dermatology",
      },
      department: "Dental Esthetics",
      date: "08-20-2021",
      price: "SAR 35.00",
      payment_method: "SAR 35.00 Myfatoorah",
    },
    {
      course_name: {
        img: Receipt3,
        name: "Course of Obstetrics & Gynecology",
      },
      department: "Dental Esthetics",
      date: "06-30-2022",
      price: "SAR 35.00",
      payment_method: "SAR 35.00 Myfatoorah",
    },
    {
      course_name: {
        img: Receipt4,
        name: "Course of Anesthesiology",
      },
      department: "Dental Esthetics",
      date: "06-30-2022",
      price: "SAR 35.00",
      payment_method: "SAR 35.00 Paypal",
    },
    {
      course_name: {
        img: Receipt1,
        name: "Course of Obstetrics & Gynecology",
      },
      department: "Dental Esthetics",
      date: "05-30-2022",
      price: "SAR 35.00",
      payment_method: "SAR 35.00 Myfatoorah",
    },
    {
      course_name: {
        img: Receipt1,
        name: "Course of Anesthesiology",
      },
      department: "Dental Esthetics",
      date: "05-30-2022",
      price: "SAR 35.00",
      payment_method: "SAR 35.00 Paypal",
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
              <MainHeading>Payment Receipts</MainHeading>
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
                    <StyledSelect defaultValue="Select Course">
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
                    <StyledSelect defaultValue="Select Department">
                      <Option value="1">1</Option>
                      <Option value="2">2</Option>
                      {/* {departmentArr?.map((item, index) => ( */}
                      {/* <Option key={index} value={item}>
                                    {item}
                                    </Option> */}
                      {/* ))} */}
                    </StyledSelect>
                  </Col>
                  <Col span={5}>
                    <StyledDatePicker placeholder="Date" />
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

              <CustomLearnerTable>
                <CustomTable
                  tableHead={paymentReceiptsTableHead}
                  tableBody={paymentReceiptsTable}
                  tableName="payment_receipts"
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
const CourseFilterSearch = styled.div`
  margin-bottom: 20px;
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
