import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";

import Header from "../src/components/adminLayoutHeader";

import styled from "styled-components";
import endpoints from "../src/api";
import CustomTable from "../src/components/Table/customTable";
import "react-phone-input-2/lib/style.css";

import { Col, Menu, Row } from "antd";

import { R2Favicon, User } from "../images";
import Preloader from "../public/images/Preloader.gif";
import Rolling from "../public/images/Rolling.gif";
import CustomButton from "../src/components/Button";
import { getCookies } from "../src/helpers/cookie";
import { toast } from "react-toastify";
import router from "next/router";
import Image from "next/image";

const EditTax = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectItem, setSelectItem] = useState("notification-setting");

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

  const [getNotificationSettingState, setGetNotificationSettingState] =
    useState();
  const getNotificationFunc = async () => {
    try {
      const response = await endpoints.getNotificationSetting(authToken);
      if (response) {
        setGetNotificationSettingState(response?.data?.data);
      }
    } catch (err) {}
  };
  const [Loading, setLoading] = useState();
  const addNotificationSettingFunc = async (data) => {
    try {
      setLoading(true);
      const response = await endpoints.AddNotificationSetting(data, authToken);
      if (response) {
        toast.success("Record Saved Successfully!");
        setLoading(false);
      }
    } catch (error) {
      //console.log(error);
    }
  };

  useLayoutEffect(() => {
    getNotificationFunc();
  }, []);

  const notificationSettingStateHead = ["S.No", "Name", "Action"];

  return (
    <>
      {isAuthorized ? (
        <div className="container">
          <Head>
            <title>Riyadh Second Health Cluster</title>
            <link rel="icon" href={R2Favicon} />
          </Head>
          <body>
            <StyledDiv>
              <Header
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                selectItem={selectItem}
                setSelectItem={setSelectItem}
                name={""}
              >
                <Row gutter={[15, 15]}>
                  <Col span={24}>
                    <MainHeading>Notification Setting</MainHeading>
                  </Col>
                  <Col span={24}>
                    <CustomLearnerTable>
                      <CustomTable
                        getNotificationSettingState={
                          getNotificationSettingState
                        }
                        setGetNotificationSettingState={
                          setGetNotificationSettingState
                        }
                        tableHead={notificationSettingStateHead}
                        tableName="notification_setting"
                      />
                    </CustomLearnerTable>
                    <Col
                      span={24}
                      style={{
                        textAlign: "right",
                        paddingTop: "10px",
                        paddingInline: "10px",
                      }}
                    >
                      {Loading ? (
                        <CustomButton
                          customStyle={{
                            background: "#e0e0e0",
                            color: "#fff",
                            border: "1px solid #105F43",
                            borderRadius: "5px",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          {" "}
                          Save & Update{" "}
                          <Image alt={""}
                            src={Rolling}
                            width="16px"
                            height="16px"
                          />{" "}
                        </CustomButton>
                      ) : (
                        <CustomButton
                          customStyle={{
                            background: "#105F43",
                            color: "#fff",
                            border: "1px solid #105F43",
                            borderRadius: "5px",
                          }}
                          onClick={() =>
                            addNotificationSettingFunc(
                              getNotificationSettingState
                            )
                          }
                        >
                          Save & Update
                        </CustomButton>
                      )}
                    </Col>
                  </Col>
                </Row>
              </Header>
            </StyledDiv>
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

export default EditTax;

const MainHeading = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  font-family: "TitilliumNormal", sans-serif;
`;
const StyledFilterRow = styled(Row)`
  width: 100% !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
  // margin-bottom: 20px !important;
  // .ant-col{
  //   padding-left: 0px !important;
  //   padding-right: 0px !important;
  // }
`;
const StyledDiv = styled.div`
  .ant-upload {
    width: 100% !important;
  }
  .ant-picker {
    width: 100% !important;
  }
  .react-switch-bg {
  }
`;
const StyledMainFilterRow = styled(Row)`
  // margin-inline: -4px !important;
`;
const StyledProfileCardDiv = styled.div`
  background: #fff;
  padding: 20px;
  // padding: 20px 20px 40px;
  border-radius: 5px;
`;
const StyledFormDiv = styled.div`
  margin-top: 20px;
`;
const StyledUpdateBtnDiv = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 30px;
`;
const StyledMainDiv = styled.div`
  display: Flex;
  // align-items: center;
  p {
    margin-bottom: 0px;
    display: Flex;
    align-items: center;
  }
  .label {
    font-weight: bold;
  }
  .label-sub {
    font-size: 10px;
  }
`;
const StyledNotificationMenu = styled(Menu)`
  width: 180px !important;
  padding: 20px 10px;
  left: 12px;
  border-radius: 5px 0 0 5px;
  line-height: 28px;
  h1 {
    margin-bottom: 0px !important;
    margin-inline: 10px !important;
    color: #fff;
  }
  p {
    margin-bottom: 0px !important;
    &:hover {
      // text-decoration: underline;
      cursor: pointer;
    }
  }
  .ant-dropdown-menu-item {
    margin-block: 5px;
    padding: 10px;
    border-radius: 6px;
  }
  backdrop-filter: blur(20px) !important;
  .ant-dropdown-placement-bottomRight {
    left: 690px !important;
  }
  .select-country {
    display: flex;
    margin-bottom: 10px;
    padding-block: 3px;
    background: #f6f6f6;
    padding-inline: 6px;
    &:hover {
      cursor: pointer;
    }
    &:nth-last-child(1) {
      margin-bottom: 0px;
    }
    p {
      margin-left: 10px;
    }
  }
  @media (min-width: 1200px) {
    .language-title {
      font-size: 15px;
    }
  }
  @media (max-width: 1199px) {
    .language-title {
      font-size: 14px;
    }
  }
`;
const StyledFormInputRow = styled(Row)`
  width: 100% !important;
  .ant-col {
    display: flex;
    align-items: center;
  }
`;
const CustomLearnerTable = styled.div`
  padding: 10px 20px;
  border-radius: 10px;
  background: #fff;
  overflow-x: auto;

  th:not(:first-child) {
    text-align: left;
  }

  ::-webkit-scrollbar {
    height: 2px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(16, 95, 67, 0.6);
  }
`;
