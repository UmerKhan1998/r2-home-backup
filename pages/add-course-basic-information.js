import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import router from "next/router";
import { getCookies, setCookies, removeCookies } from "../src/helpers/cookie";
import { R2Favicon } from "../images";
import Header from "../src/components/adminLayoutHeader";
import { Checkbox, Col, DatePicker, Input, Row } from "antd";
import styled from "styled-components";
import CustomButton from "../src/components/Button";
import { useSelector } from "react-redux";
import endpoints from "../src/api";
import TextArea from "antd/lib/input/TextArea";
import { toast } from "react-toastify";

import Preloader from "../public/images/Preloader.gif";
import UploadVideoIcon from "../public/images/UploadVideoIcon.svg";
import Rolling from "../public/images/Rolling.gif";
// import DemoVideo from '../public/images/DemoVideo.mp4';

import Asynchronous from "../public/images/Asynchronous.svg";
import Online from "../public/images/Online.svg";
import Onsite from "../public/images/Onsite.svg";
import Synchronous from "../public/images/Synchronous.svg";
import Dragger from "antd/lib/upload/Dragger";
import { CloseOutlined } from "@ant-design/icons";

const Instructor = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectItem, setSelectItem] = useState("instructor");
  const userDataState = useSelector((state) => state?.userDataReducer);

  useLayoutEffect(() => {}, [userDataState]);

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

  const uploadCustumResponse = async ({ file, onSuccess }) => {
    onSuccess("ok");
  };

  const [videoUploadLoading, setVideoUploadLoading] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const UploadVideoIconProps = {
    name: "file",
    multiple: false,
    customRequest: uploadCustumResponse,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        setVideoUploadLoading(true);
        // //console.log("luyshfkfdy", info.file);
      }
      if (status === "done") {
        setVideoUploadLoading(false);
        setVideoUploaded(true);
        // //console.log(`luyshfkfdy ${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        //console.log(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      //console.log('Dropped files', e.dataTransfer.files);
    },
  };

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
                  <MainHeading>Add New Course</MainHeading>
                </Col>
              </Row>
              <Row gutter={[15, 15]}>
                <Col span={24} lg={6}>
                  <CourseBasicInformationSidebar>
                    <ul>
                      <span>Basic Course Information</span>
                      <li className="active">
                        <Link href="">Course Title</Link>
                      </li>
                      <li>
                        <Link href="">Duration</Link>
                      </li>
                      <li>
                        <Link href="">Introduction Video</Link>
                      </li>
                    </ul>
                    <ul>
                      <span>Course Planning</span>
                      <li>
                        <Link href="">Summary</Link>
                      </li>
                      <li>
                        <Link href="">Overview</Link>
                      </li>
                      <li>
                        <Link href="">Description</Link>
                      </li>
                      <li>
                        <Link href="">Who is this course for?</Link>
                      </li>
                      <li>
                        <Link href="">Requirements</Link>
                      </li>
                    </ul>
                    <ul>
                      <span>Financial</span>
                      <li>
                        <Link href="">Basic Financial Information</Link>
                      </li>
                      <li>
                        <Link href="">Categorical Information</Link>
                      </li>
                    </ul>
                    <ul>
                      <span>Configuration</span>
                      <li>
                        <Link href="">Department Information</Link>
                      </li>
                      <li>
                        <Link href="">Category</Link>
                      </li>
                      <li>
                        <Link href="">Course Arrangement</Link>
                      </li>
                    </ul>
                  </CourseBasicInformationSidebar>
                </Col>
                <Col span={24} lg={18}>
                  {/* <CourseBasicInformationFields>
                                        <div className="basic-information-head">
                                            <h2 className="title">Suggest the most suitable title for your course</h2>
                                            <p className="desc">A title gives a sneak peak into the course, so choose wisely</p>
                                        </div>
                                        <StyledInputBoxContainer>
                                            <div className="input-container">
                                                <label>Title *</label>
                                                <StyledInput placeholder="Enter Title" onChange={''} />
                                                <span className="input-total">200</span>
                                            </div>
                                        </StyledInputBoxContainer>

                                        <StyledAddCourseStapButtons>
                                            <CustomButton
                                                customStyle={{ height: "35px", backgroundColor: "transparent", color: "#105F43", borderColor: "#105F43", paddingInline: "20px" }}
                                            >Back</CustomButton>
                                            <CustomButton
                                                customStyle={{ height: "35px", backgroundColor: "#105F43", color: "#fff", borderColor: "transparent", paddingInline: "20px", marginLeft: "10px" }}
                                            >Save & Go</CustomButton>
                                        </StyledAddCourseStapButtons>
                                    </CourseBasicInformationFields> */}
                  <CourseBasicInformationFields>
                    <div className="basic-information-head">
                      <h2 className="title">
                        What will be the start date and end date for this
                        course?
                      </h2>
                      <p className="desc">
                        If you are unsure about this right now, you can always
                        comeback and change
                      </p>
                    </div>
                    <StyledInputBoxContainer>
                      <Row gutter={[15, 15]}>
                        <Col span={24} lg={12}>
                          <div className="input-container date">
                            <label>Start Date*</label>
                            <StyledDatePicker
                              placeholder="Start"
                              onChange={""}
                            />
                          </div>
                        </Col>
                        <Col span={24} lg={12}>
                          <div className="input-container date">
                            <label>End Date*</label>
                            <StyledDatePicker placeholder="To" onChange={""} />
                          </div>
                        </Col>
                      </Row>
                    </StyledInputBoxContainer>

                    <StyledAddCourseStapButtons>
                      <CustomButton
                        customStyle={{
                          height: "35px",
                          backgroundColor: "transparent",
                          color: "#105F43",
                          borderColor: "#105F43",
                          paddingInline: "20px",
                        }}
                      >
                        Back
                      </CustomButton>
                      <CustomButton
                        customStyle={{
                          height: "35px",
                          backgroundColor: "#105F43",
                          color: "#fff",
                          borderColor: "transparent",
                          paddingInline: "20px",
                          marginLeft: "10px",
                        }}
                      >
                        Save & Go
                      </CustomButton>
                    </StyledAddCourseStapButtons>
                  </CourseBasicInformationFields>
                  {/* <CourseBasicInformationFields>
                                        <div className="basic-information-head">
                                            <h2 className="title">Introduction Video</h2>
                                            <p className="desc">Your Introduction video vocally defines the objectives of your course. Upload a video that is short, crisp and clearly communicates learning objectives and outcomes </p>
                                        </div>
                                        <StyledInputBoxContainer>
                                            {(videoUploaded) ? (
                                                <UploadedVideoDiv>
                                                    <span>
                                                        <span className="remove-video" onClick={()=>{setVideoUploaded(false)}}><CloseOutlined /></span>
                                                        <video src="https://stage-api.cyfersoft.com/Storage//CourseTraining/8e60c350-824d-4206-a706-08dad9aa7a4d/DemoVideo/index.webm" oncontextmenu="return false;" controlsList="nodownload" controls></video>
                                                    </span>
                                                </UploadedVideoDiv>
                                            ) : (
                                                <StyledDragger {...UploadVideoIconProps}>
                                                    <p className="ant-upload-drag-icon"><img loading="lazy"src={UploadVideoIcon?.src} width="50px" height="50px" /></p>
                                                    <p className="ant-upload-text">Drag & Drop <span style={{color: "#A87E33"}}>Video</span> <span style={{display: (videoUploadLoading) ? ("inline-block") : ("none")}}><img loading="lazy"alt={""} src={Rolling} width="15px" height="15px" /></span></p>
                                                    <p className="ant-upload-hint">Or browse on your computer</p>
                                                </StyledDragger>
                                            )}
                                        </StyledInputBoxContainer>

                                        <StyledAddCourseStapButtons>
                                            <CustomButton
                                                customStyle={{ height: "35px", backgroundColor: "transparent", color: "#105F43", borderColor: "#105F43", paddingInline: "20px" }}
                                            >Back</CustomButton>
                                            <CustomButton
                                                customStyle={{ height: "35px", backgroundColor: "#105F43", color: "#fff", borderColor: "transparent", paddingInline: "20px", marginLeft: "10px" }}
                                            >Save & Go</CustomButton>
                                        </StyledAddCourseStapButtons>
                                    </CourseBasicInformationFields> */}
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

export default Instructor;

const MainHeading = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  font-family: "TitilliumNormal", sans-serif;
`;
const CourseBasicInformationSidebar = styled.div`
  padding: 15px 25px;
  background: #fff;
  border-radius: 4px;

  ul {
    margin: 0;
    padding: 0;

    :not(:last-child) {
      margin-bottom: 15px;
    }

    > span {
      display: block;
      margin-bottom: 6px;
      font-size: 14px;
      font-family: "TitilliumBold";
    }
    li {
      position: relative;
      list-style: none;

      &.active {
        a {
          color: #105f43;
          font-family: "TitilliumBold";

          :before {
            background: #105f43;
          }
        }
      }

      a {
        position: relative;
        font-size: 12px;
        font-family: "TitilliumSemiBold";
        color: #181818;
        padding: 4px 0px;
        display: flex;
        justify-content: space-between;

        :before {
          content: "";
          position: absolute;
          top: 6px;
          left: -10px;
          width: 2px;
          height: calc(100% - 12px);
          background: transparent;
        }
      }
    }
  }
`;
const CourseBasicInformationFields = styled.div`
  padding: 15px 25px;
  background: #fff;
  border-radius: 4px;

  .basic-information-head {
    padding-bottom: 10px;
    border-bottom: 1px solid #b0b0b0;

    .title {
      font-size: 16px;
      margin: 0;
      margin-bottom: 4px;
      font-family: "TitilliumBold";
    }
    .desc {
      font-size: 12px;
      color: #636363;
      font-family: "TitilliumSemiBold";
    }
  }
`;
const StyledInputBoxContainer = styled.div`
  margin: auto;
  padding: 25px 0;

  label {
    margin-bottom: 5px;
    display: inline-block;
    font-size: 13px;
    font-family: "TitilliumSemiBold";
  }

  .input-container {
    margin-bottom: 15px;

    &.date {
    }

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
const StyledAddCourseStapButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const StyledDragger = styled(Dragger)`
  :hover {
    border-color: #105f43 !important;
  }

  .ant-upload-drag-icon {
    margin-bottom: 12px !important;
  }

  .ant-upload-text {
    font-size: 16px;
    font-family: "TitilliumBold";
  }
  .ant-upload-hint {
    font-size: 14px;
    font-family: "TitilliumSemiBold";
  }

  + .ant-upload-list-text {
    display: none !important;
  }
`;
const UploadedVideoDiv = styled.div`
  position: relative;
  text-align: center;

  > span {
    display: inline-block;
    position: relative;
    line-height: 0;

    .remove-video {
      position: absolute;
      top: -8px;
      right: -8px;
      width: 20px;
      height: 20px;
      border-radius: 100%;
      color: #fff;
      background: #ff6967;
      text-align: center;
      line-height: 19px;
      font-size: 12px;
      cursor: pointer;
      opacity: 0;
      transition: all 0.1s;
      z-index: 10;
    }
    :hover .remove-video {
      opacity: 1;
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

  input {
    font-size: 12px;
  }
  input::placeholder {
    color: #2e2e2e;
  }
`;
const StyledInput = styled(Input)`
  width: 100%;
  padding: 8px 14px 8px;
  font-size: 12px;
  border-radius: 2px;

  :focus {
    box-shadow: none !important;
  }
`;
const StyledTextarea = styled(TextArea)`
  width: 100%;
  padding: 8px 14px 8px;
  font-size: 12px;
  border-radius: 2px;

  :focus {
    box-shadow: none !important;
  }
`;
