import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Header from "../src/components/adminLayoutHeader";
import CustomTable from "../src/components/Table/customTable";
import styled from "styled-components";
import endpoints from "../src/api";
import { Col, DatePicker, Empty, Input, Row, Select, Tabs } from "antd";

import { SearchIcon, R2Favicon } from "../images";
import Preloader from "../public/images/Preloader.gif";
import Rolling from "../public/images/Rolling.gif";
import { useSelector } from "react-redux";
import router from "next/router";
import { getCookies } from "../src/helpers/cookie";

const { Option } = Select;

const dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectItem, setSelectItem] = useState("activities-payment-receipts");
  const userDataState = useSelector((state) => state?.userDataReducer);

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

  const [paymentReceiptsTableState, setPaymentReceiptsTableState] = useState({
    search: "",
    language: "English",
    recordType: "Activities",
    issueDate: "",
    sortBy: "",
    departmentId: "",
  });
  const [paymentReceiptsLoading, setPaymentReceiptsLoading] = useState(true);
  const [paymentReceiptsTable, setPaymentReceiptsTable] = useState();
  const GetDashboardReceiptFunc = async () => {
    setPaymentReceiptsLoading(true)
    try {
      const response = await endpoints.GetDashboardReceipt(
        authToken,
        userDataState?.id,
        paymentReceiptsTableState
      );
      if (response.data.statusCode === "200") {
        setPaymentReceiptsTable(response?.data?.data);
        setPaymentReceiptsLoading(false)
      } else {
        setPaymentReceiptsTable(response?.data);
        setPaymentReceiptsLoading(false)
      }
    } catch (error) {
      //console.log("error", error);
    }
  };
  const [getDepartmentState, setGetDepartmentState] = useState();
  const GetDepartmentFunc = async () => {
    try {
      const response = await endpoints.GetDepartment(authToken);
      if (response?.data?.statusCode === "200") {
        setGetDepartmentState(response?.data?.data);
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

  useLayoutEffect(() => {
    if (userDataState?.id != undefined) {
      GetDepartmentFunc();
      GetSortFunc();
    }
  }, [userDataState?.id]);

  useLayoutEffect(() => {
    if (userDataState?.id != undefined) {
      GetDashboardReceiptFunc();
    }
  }, [userDataState?.id, paymentReceiptsTableState]);

  const paymentReceiptsTableHead = [
    "Name",
    "Department",
    "Date",
    "Price",
    "Payment Method",
    "Actions",
  ];

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
                  <MainHeading>Payment Receipts</MainHeading>
                </Col>
                <Col span={24}>
                  <CourseFilterSearch>
                    <Row gutter={12}>
                      <Col span={12} md={8}>
                        <StyledInput
                          onChange={(e) => {
                            setPaymentReceiptsTableState({
                              ...paymentReceiptsTableState,
                              search: e.target.value,
                            });
                          }}
                          placeholder={"Search"}
                          suffix={
                            <img loading="lazy"alt={""} height={15} width={15} src={SearchIcon} />
                          }
                        />
                      </Col>
                      <Col span={12} md={7}>
                        <StyledSelect
                          onChange={(e) => {
                            setPaymentReceiptsTableState({
                              ...paymentReceiptsTableState,
                              departmentId: e,
                            });
                          }}
                          defaultValue="Select Department"
                        >
                          <Option value=""> All </Option>
                          {getDepartmentState?.map((item, index) => (
                            <Option key={index} value={item?.id}>
                              {" "}
                              {item?.name_EN}{" "}
                            </Option>
                          ))}
                        </StyledSelect>
                      </Col>
                      <Col span={12} md={6}>
                        <StyledDatePicker
                          onChange={(e) => {
                            setPaymentReceiptsTableState({
                              ...paymentReceiptsTableState,
                              issueDate: e,
                            });
                          }}
                          placeholder="Date"
                        />
                      </Col>
                      <Col span={12} md={3}>
                        <StyledSelect
                          onChange={(e) => {
                            setPaymentReceiptsTableState({
                              ...paymentReceiptsTableState,
                              sortBy: e,
                            });
                          }}
                          defaultValue="Sort By"
                        >
                          <Option value=""> All </Option>
                          {getSortStatus?.map((item, index) => (
                            <Option key={index} value={item?.id}>
                              {" "}
                              {item?.name_EN}{" "}
                            </Option>
                          ))}
                        </StyledSelect>
                      </Col>
                    </Row>
                  </CourseFilterSearch>

                  <CustomLearnerTable>
                    {paymentReceiptsLoading ? (
                      <div
                        style={{
                          textAlign: "center",
                          paddingTop: "30px",
                          paddingBottom: "30px",
                        }}
                      >
                        <img loading="lazy"src={Rolling.src} width="40px" height="40px" />
                      </div>
                    ) : (<>
                      <CustomTable
                        tableHead={paymentReceiptsTableHead}
                        tableBody={paymentReceiptsTable}
                        tableName="payment_receipts"
                      />
                    </>)}
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

  @media screen and (max-width: 800px) {
    margin-bottom: 5px;
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

const EmptyData = styled.div`
  width: 100%;
  height: auto;
  border-radius: 8px;
  background: #fff;
`;
