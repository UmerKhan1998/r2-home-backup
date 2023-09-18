import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
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
import Asynchronous from "../public/images/Asynchronous.svg";
import Online from "../public/images/Online.svg";
import Onsite from "../public/images/Onsite.svg";
import Synchronous from "../public/images/Synchronous.svg";

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

  const DashboardRequestForInstructor = async () => {
    try {
      const response = await endpoints.DashboardRequestForInstructor(authToken);
      if (response.data.statusCode === "200") {
        toast.success("Request Submitted!");
      }
    } catch (error) {
      //console.log("error", error);
    }
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
                <Col span={24}>
                  <StyledAddCourseStapDiv>
                    <div className="couse-stap">
                      <h2>Let us know the nature of the course</h2>
                      <p>
                        This is your first step in the creation of a great
                        source. Please select from one of the options
                      </p>
                      <StyledRadioBoxContainer>
                        <StyledRadioBox>
                          <input type="radio" id="1" name="1" />
                          <label for="1"></label>
                          <div>
                            <img loading="lazy"src={Synchronous.src} />
                            <h4>Synchronous</h4>
                            <p>
                              A face to face course either done online or
                              offline
                            </p>
                          </div>
                        </StyledRadioBox>
                        <StyledRadioBox>
                          <input type="radio" id="2" name="1" />
                          <label for="2"></label>
                          <div>
                            <img loading="lazy"src={Asynchronous.src} />
                            <h4>Asynchronous</h4>
                            <p>A course which is self-paced</p>
                          </div>
                        </StyledRadioBox>
                      </StyledRadioBoxContainer>
                    </div>
                    {/* <div className="couse-stap">
                                            <h2>Is this course part of a program?</h2>
                                            <p>Please let us know if the course will be conducted onsite or online</p>
                                            <StyledRadioBoxContainer className="redio-yes-no">
                                                <StyledRadioBox>
                                                    <input type="radio" id="1" name="1" />
                                                    <label for="1"></label>
                                                    <div>
                                                        <span>Yes</span>
                                                    </div>
                                                </StyledRadioBox>
                                                <StyledRadioBox>
                                                    <input type="radio" id="2" name="1" />
                                                    <label className="red" for="2"></label>
                                                    <div>
                                                        <span>No</span>
                                                    </div>
                                                </StyledRadioBox>
                                            </StyledRadioBoxContainer>
                                        </div> */}
                    {/* <div className="couse-stap">
                                            <h2>Is this course part of a program?</h2>
                                            <p>Please let us know if the course will be conducted onsite or online</p>
                                            <StyledInputBoxContainer>
                                                <div className="input-container date">
                                                    <label>Start Date*</label>
                                                    <StyledDatePicker placeholder="Start" onChange={''} />
                                                </div>
                                                <div className="input-container date">
                                                    <label>End Date*</label>
                                                    <StyledDatePicker placeholder="To" onChange={''} />
                                                </div>
                                            </StyledInputBoxContainer>
                                        </div> */}
                    {/* <div className="couse-stap">
                                            <h2>Is this course part of a program?</h2>
                                            <p>Please let us know if the course will be conducted onsite or online</p>
                                            <StyledInputBoxContainer>
                                                <div className="input-container">
                                                    <label>Title *</label>
                                                    <StyledInput placeholder="Enter Title" onChange={''} />
                                                    <span className="input-total">200</span>
                                                </div>
                                            </StyledInputBoxContainer>
                                        </div> */}
                    {/* <div className="couse-stap">
                                            <h2>Is this course part of a program?</h2>
                                            <p>Please let us know if the course will be conducted onsite or online</p>
                                            <StyledInputBoxContainer>
                                                <div className="input-container">
                                                    <label>Overview *</label>
                                                    <StyledTextarea placeholder="Enter Title" rows={4} onChange={''} />
                                                    <Checkbox>Visible on course detail page</Checkbox>
                                                </div>
                                            </StyledInputBoxContainer>
                                        </div> */}
                    <StyledAddCourseStapButtons>
                      <CustomButton
                        customStyle={{
                          backgroundColor: "transparent",
                          color: "#105F43",
                          borderColor: "#105F43",
                          paddingInline: "35px",
                        }}
                      >
                        Back
                      </CustomButton>
                      <StyledAddCourseStapsCount>
                        <span>Step 1 of 4</span>
                      </StyledAddCourseStapsCount>
                      <CustomButton
                        customStyle={{
                          backgroundColor: "#105F43",
                          color: "#fff",
                          borderColor: "transparent",
                          paddingInline: "35px",
                        }}
                      >
                        Save & Go
                      </CustomButton>
                    </StyledAddCourseStapButtons>
                  </StyledAddCourseStapDiv>
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
const StyledAddCourseStapDiv = styled.div`
  padding: 30px;
  padding-top: 50px;
  background: #fff;
  border-radius: 8px;
  min-height: 420px;

  .redio-yes-no {
    .add-course__StyledRadioBox-sc-1xa2ixo-5 {
      padding: 10px 40px;
      width: auto;
      font-family: "TitilliumSemiBold";
    }
  }

  .couse-stap {
    min-height: 400px;
  }

  h2 {
    font-size: 24px;
    font-family: "TitilliumBold";
    text-align: center;
    margin-bottom: 5px;
  }
  p {
    font-size: 14px;
    font-family: "TitilliumNormal";
    text-align: center;
    margin-bottom: 30px;
  }
`;
const StyledRadioBoxContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px;
`;
const StyledAddCourseStapsCount = styled.div`
  text-align: center;
  // margin: 80px 0 40px 0;

  span {
    font-size: 14px;
    font-family: "TitilliumSemiBold";
  }
`;
const StyledAddCourseStapButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  // margin-top: 60px;
`;
const StyledRadioBox = styled.div`
  position: relative;
  width: 190px;
  padding: 25px 15px;
  background: #fff;
  text-align: center;
  box-shadow: 0px 5px 15px 0px #0000001a;
  cursor: pointer;

  label {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    cursor: pointer;
    border: 1px solid #c1c1c1;
    transition: all 0.3s;
    z-index: 1;

    :hover {
      background: #f8fffc;
      border-color: #105f43;
    }

    &.red:hover {
      background: #fff3f3;
      border-color: #ffa4a3;
    }
  }

  input {
    opacity: 0;
    visibility: hidden;
    display: none;

    :checked ~ label {
      background: #f8fffc;
      border-color: #105f43;
    }
    :checked ~ label.red {
      background: #fff3f3;
      border-color: #ffa4a3;
    }
  }

  > div {
    position: relative;
    pointer-events: none;
    z-index: 2;
  }

  img {
    height: 50px;
    margin-bottom: 10px;
  }
  h4 {
    margin-bottom: 4px;
    font-size: 15px;
    font-family: "TitilliumSemiBold";
  }
  p {
    margin: 0;
    font-size: 12px;
    line-height: 17px;
    font-family: "TitilliumSemiBold";
  }
`;
const StyledInputBoxContainer = styled.div`
  margin: auto;

  label {
    margin-bottom: 5px;
    display: inline-block;
    font-size: 13px;
    font-family: "TitilliumSemiBold";
  }

  .input-container {
    margin: auto;
    max-width: 500px;
    margin-bottom: 15px;

    &.date {
      max-width: 300px;
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

const StyledIndtructorFormDiv = styled.div`
  padding: 50px;
  background: #fff;
  border-radius: 8px;

  @media screen and (max-width: 800px) {
    padding: 30px;
  }
`;
const StyledApplyInstructorDiv = styled.div`
  h2 {
    margin-bottom: 10px;
    font-size: 40px;
    line-height: 44px;
    font-family: "TitilliumBold";
  }
  p {
    margin-bottom: 20px;
    font-size: 16px;
    line-height: 21px;
    font-family: "TitilliumNormal";
  }
  button {
    border-radius: 3px !important;
  }

  @media screen and (max-width: 800px) {
    h2 {
      font-size: 30px;
      line-height: 34px;
    }
    p {
      font-size: 14px;
      line-height: 18px;
    }
    img {
      margin-top: 50px;
    }
  }
`;
