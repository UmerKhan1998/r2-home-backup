import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";

import Header from "../src/components/adminLayoutHeader";

import styled from "styled-components";
import endpoints from "../src/api";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../src/components/Table/customTable";
import Rolling from "../public/images/Rolling.gif";
import UploadImageAvatar from "../src/components/Avatar/UploadImageAvatar";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Empty,
  Input,
  Menu,
  Modal,
  Row,
  Select,
  Tabs,
  Timeline,
  TimePicker,
  Upload,
} from "antd";

const { TextArea } = Input;

import { SearchIcon, R2Favicon, User, GreenLoader } from "../images";
import Preloader from "../public/images/Preloader.gif";
import CustomButton from "../src/components/Button";
import { AiOutlineCloudUpload, AiOutlineRight } from "react-icons/ai";
import { getCookies, setCookies } from "../src/helpers/cookie";
import moment from "moment";
import { getBase64 } from "../src/helpers/base64Func";
import { toast } from "react-toastify";
import { userData } from "../src/redux/actions";
import router from "next/router";

const EditTax = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [selectItem, setSelectItem] = useState("reminders-settings");

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

  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const showLanguageModal = () => {
    setIsLanguageModalOpen(true);
  };
  const closeLanguageModal = () => {
    setIsLanguageModalOpen(false);
    setAddReminderSettingState({
      dateTime: moment(),
      message: "",
      subject: "",
    });
  };

  const [addReminderSettingState, setAddReminderSettingState] = useState({
    dateTime: moment(),
    message: "",
    subject: "",
  });

  const [reminderSettingState, setReminderSettingState] = useState();
  const [addLoading, setAddLoading] = useState(false);

  const AddReminderSettingFunc = async () => {
    setAddLoading(true);
    try {
      if (
        addReminderSettingState?.dateTime != "" &&
        addReminderSettingState?.message != "" &&
        addReminderSettingState?.subject != ""
      ) {
        const response = await endpoints.AddReminderSetting(
          authToken,
          addReminderSettingState
        );
        if (response?.data?.statusCode === "200") {
          closeLanguageModal();
          GetReminderSettingFunc();
          setAddReminderSettingState({
            dateTime: moment(),
            message: "",
            subject: "",
          });
          setAddLoading(false);
        } else if (response?.data?.statusCode === "405") {
          //console.log("");
        }
      } else {
        toast.error("All Fields Are Required!");
        setTimeout(()=>{
          setAddLoading(false);
        }, 5000)
      }
    } catch (error) {
      //console.log("error", error);
      setAddLoading(false);
    }
  };

  const [GetReminderSettingState, setGetReminderSettingState] = useState({
    PageSize: "1000",
    PageNo: "1",
    Language: "English",
    Search: "",
  });
  const GetReminderSettingFunc = async () => {
    try {
      const response = await endpoints.GetReminderSetting(
        authToken,
        GetReminderSettingState
      );
      if (response?.data?.statusCode === "200") {
        setReminderSettingState(response?.data?.data);
      } else {
        setReminderSettingState(response?.data);
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  const disabledDate = (current) => {
    return current.isBefore(moment(), "day");
  };

  const reminderSettingStateHead = ["S.No", "Subject", "Message", "Date Time"];

  useLayoutEffect(() => {
    GetReminderSettingFunc();
  }, []);

  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  const currentDate = new Date();
const currentHour = currentDate.getHours();
const currentMin = currentDate.getMinutes()+1;
const currentSec = currentDate;

  return (
    <>
      {isAuthorized ? (
        <div className="container">
          <Head>
            <title>Riyadh Second Health Cluster</title>
            <link rel="icon" href={R2Favicon} />
          </Head>
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
                  <MainHeading>
                    <span>Reminders Settings</span>
                    <CustomButton
                      customStyle={{
                        paddingInline: 30,
                        background: "#105F43",
                        color: "#fff",
                        border: 0,
                        height: "unset",
                      }}
                      onClick={() => {
                        showLanguageModal();
                      }}
                    >
                      Add Reminder
                    </CustomButton>
                  </MainHeading>
                </Col>
                <Col span={24}>
                  <CustomLearnerTable>
                    {reminderSettingState?.statusCode === "404" && (
                      <EmptyData>
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description="No Record Found!"
                        />
                      </EmptyData>
                    )}
                    {reminderSettingState?.totalRecord > 0 && (
                      <CustomTable
                        tableHead={reminderSettingStateHead}
                        tableBody={
                          reminderSettingState?.remaindersettingListViewModels
                        }
                        tableName="reminders_settings"
                      />
                    )}
                    {reminderSettingState === undefined && (
                      <div
                        style={{ textAlign: "center", paddingBlock: "40px" }}
                      >
                        <img loading="lazy"src={Rolling.src} width="40px" height="40px" />
                      </div>
                    )}
                  </CustomLearnerTable>
                </Col>
              </Row>
            </Header>
          </StyledDiv>

          <StyledModal
            title={`Add Reminder`}
            open={isLanguageModalOpen}
            onOk={closeLanguageModal}
            onCancel={closeLanguageModal}
            width={480}
          >
            <StyledInputBoxContainer>
              <div className="input-container">
                <label>Subject</label>
                <StyledInput
                  placeholder="Enter Subject"
                  value={addReminderSettingState?.subject}
                  onChange={(e) => {
                    setAddReminderSettingState({
                      ...addReminderSettingState,
                      subject: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="input-container">
                <label>Date Time</label>
                <StyledDatePicker
                  placeholder="Reminder Date Time"
                  showTime
                  disabledDate={disabledDate}
                  disabledTime={() => ({
                    disabledHours: () => range(0, 24).splice(0, currentHour),
                    disabledMinutes: () => range(0, currentMin),
                    disabledSeconds: () => [0, currentSec],
                  })}
                  value={moment(addReminderSettingState?.dateTime)}
                  onChange={(e) => {
                    setAddReminderSettingState({
                      ...addReminderSettingState,
                      dateTime: moment(e?._d)?.format(),
                    });
                  }}
                />
              </div>
              <div className="input-container">
                <label>Message</label>
                <StyledTextarea
                  placeholder="Enter Message"
                  rows={5}
                  value={addReminderSettingState?.message}
                  onChange={(e) => {
                    setAddReminderSettingState({
                      ...addReminderSettingState,
                      message: e.target.value,
                    });
                  }}
                />
              </div>
            </StyledInputBoxContainer>
            <div style={{ textAlign: "right", display:"flex", justifyContent:"end" }}>
              {addLoading ? (
                <CustomButton
                  customStyle={{
                    height: "35px",
                    background: "#E0E0E0",
                    color: "#fff",
                    border: "1px solid #105F43",
                    borderRadius: "5px",
                    paddingInline: "30px",
                    display:"flex",
                    alignItems:"center",
                  }}
                >
                  Add &nbsp;
                  <img loading="lazy"alt={""} src={GreenLoader} height={20} width={20} />
                </CustomButton>
              ) : (
                <CustomButton
                  customStyle={{
                    height: "35px",
                    background: "#105F43",
                    color: "#fff",
                    border: "1px solid #105F43",
                    borderRadius: "5px",
                    paddingInline: "30px",
                  }}
                  onClick={() => {
                    AddReminderSettingFunc();
                  }}
                >
                  Add
                </CustomButton>
              )}
            </div>
          </StyledModal>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "TitilliumNormal", sans-serif;
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
const StyledModal = styled(Modal)`
  top: 40px !important;
  width: 100% !important;
  max-width: 600px !important;

  .ant-modal-header {
    border-radius: 14px 14px 0 0 !important;
    background: #0c5439 !important;
  }
  .ant-modal-footer {
    display: none !important;
  }
  .ant-modal-title {
    color: #fff !important;
  }
  .anticon-close {
    color: #fff !important;
  }
  .ant-modal-content {
    border-radius: 14px !important;
  }

  @media screen and (max-width: 800px) {
    margin: auto;
    max-width: calc(100% - 20px) !important;
  }
`;
const StyledInputBoxContainer = styled.div`
  label {
    margin-bottom: 5px;
    display: inline-block;
    font-size: 14px;
    font-family: "TitilliumSemiBold";
  }

  .input-container {
    margin-bottom: 15px;

    .ant-checkbox-wrapper {
      margin-top: 5px;
      display: flex;
      font-size: 12px;
    }

    .input-total {
      text-align: right;
      display: block;
      font-size: 10px;
      padding: 0 5px;
      font-family: "TitilliumSemiBold";
    }
  }
`;
const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  padding: 6px 12px 6px;

  :hover,
  &.ant-picker-focused {
    border-color: #d9d9d9;
    box-shadow: none;
  }

  .ant-picker-suffix {
    color: #2e2e2e82;
  }

  input::placeholder {
    color: #bfbfbf !important;
  }
  input {
    font-size: 14px;
  }
  input::placeholder {
    color: #2e2e2e;
  }
`;
const StyledInput = styled(Input)`
  width: 100%;
  padding: 8px 14px 8px;
  font-size: 14px;
  border-radius: 4px;

  :focus {
    box-shadow: none !important;
  }
`;
const StyledTextarea = styled(TextArea)`
  width: 100%;
  padding: 8px 14px 8px;
  font-size: 14px;
  border-radius: 4px;

  :focus {
    box-shadow: none !important;
  }
`;
const EmptyData = styled.div`
  width: 100%;
  height: auto;
  border-radius: 8px;
  background: #fff;
`;
