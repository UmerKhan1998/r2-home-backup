import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import Header from "../src/components/adminLayoutHeader";
import styled from "styled-components";
import { Col, Row, Input, Select } from "antd";

import { SearchBgIcon, LogoLight, R2Favicon } from "../images";
import Preloader from "../public/images/Preloader.gif";
import Rolling from "../public/images/Rolling.gif";
import router from "next/router";
import { getCookies } from "../src/helpers/cookie";
import endpoints from "../src/api";
import moment from "moment";
import Image from "next/image";

const dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectItem, setSelectItem] = useState("my-learning-path");

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

  const [getDashboardLearningPathInitialState, setGetDashboardLearningPath] =
    useState({
      courseTrainingId: "",
      currentPastAll: "A",
    });

  const [recordType, setRecordType] = useState("");
  const [getDashboardLearningPathState, setGetDashboardLearningPathState] =
    useState();
  const [
    getDashboardLearningPathSingleState,
    setGetDashboardLearningPathSingleState,
  ] = useState();

  const GetDashboardLearningPathFunc = async () => {
    try {
      const response = await endpoints.GetDashboardLearningPath(
        authToken,
        getDashboardLearningPathInitialState?.courseTrainingId,
        getDashboardLearningPathInitialState?.currentPastAll
      );
      if (response?.data?.statusCode === "200") {
        setGetDashboardLearningPathState(response?.data?.data);
        setGetDashboardLearningPathSingleState(
          response?.data?.data?.dashboardLearningPathViewModels[0]
        );
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  useLayoutEffect(() => {
    GetDashboardLearningPathFunc();
  }, [getDashboardLearningPathInitialState?.courseTrainingId]);

  const [GetAllCourseTrainingRegistrationByLMSUserIdState, setGetAllCourseTrainingRegistrationByLMSUserIdState] = useState();
  const GetAllCourseTrainingRegistrationByLMSUserIdFunc = async () => {
    try {
      const response = await endpoints.GetAllCourseTrainingRegistrationByLMSUserId(authToken);
      if (response?.data?.statusCode === "200") {
        setGetAllCourseTrainingRegistrationByLMSUserIdState(response?.data?.data)
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useLayoutEffect(() => {
    GetAllCourseTrainingRegistrationByLMSUserIdFunc();
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
                  <MainHeading>
                    <span>Learning Path</span>
                    <StyledSelect
                      defaultValue="All"
                      onChange={(e) => {
                        setRecordType(e)
                      }}
                    >
                      <Option value="">All</Option>
                      {GetAllCourseTrainingRegistrationByLMSUserIdState?.map((item, index)=>(<>
                        <Option value={item?.recordType_EN} key={index}>{item?.recordType_EN}</Option>
                      </>))}
                    </StyledSelect>
                  </MainHeading>
                </Col>

                <Col span={24} lg={16}>
                  <LearningCourses>
                    {getDashboardLearningPathState?.dashboardLearningPathViewModels ===
                    undefined ? (
                      <LearningCourse
                        style={{ textAlign: "center", paddingTop: "40px" }}
                      >
                        <img loading="lazy"alt={""} src={Rolling} width="40px" height="40px" />
                      </LearningCourse>
                    ) : (
                      <>
                        {getDashboardLearningPathState?.dashboardLearningPathViewModels?.map(
                          (item, index) => (
                            <div key={index}>
                              {(item?.masterRecordType === recordType ||
                                recordType === "") && (
                                <LearningCourse>
                                  <div
                                    className="learner-course-head"
                                    onClick={() => {
                                      setGetDashboardLearningPathSingleState(
                                        getDashboardLearningPathState
                                          ?.dashboardLearningPathViewModels[
                                          index
                                        ]
                                      );
                                    }}
                                  >
                                    <div className="start-date">
                                      <div>Start Date</div>
                                      <span>
                                        {moment(item?.insertDate).format("MMMM DD, YYYY")}
                                      </span>
                                    </div>
                                    <div className="course-name">
                                      {item?.title_EN}
                                    </div>
                                  </div>
                                  <div className="course-modules">
                                    {item?.dashboardLearningPathSectionViewModels?.map(
                                      (item, index) => (
                                        <>
                                          <div
                                            className={`course-module ${
                                              item?.percentageComplete === 100
                                                ? "active"
                                                : ""
                                            }`}
                                            key={index}
                                          >
                                            <div className="module-date">
                                              {/* <span>Nov 15, 2020</span> */}
                                              <span>
                                                {moment(
                                                  item?.insertDate
                                                ).format("MMMM DD, YYYY")}
                                              </span>
                                            </div>
                                            <div className="module-card">
                                              <span className="timeline"></span>
                                              <div>
                                                <h4>{item?.sectionTitle_EN}</h4>
                                                <span>
                                                  {item?.sectionDescription_EN}
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      )
                                    )}
                                  </div>
                                </LearningCourse>
                              )}
                            </div>
                          )
                        )}
                      </>
                    )}
                  </LearningCourses>
                </Col>
                <Col span={24} lg={8}>
                  <LearningModule>
                    {getDashboardLearningPathSingleState?.title_EN ===
                    undefined ? (
                      <div style={{ textAlign: "center", paddingTop: "40px" }}>
                        <img loading="lazy"alt={""} src={Rolling} width="40px" height="40px" />
                      </div>
                    ) : (
                      <>
                        {/* {(getDashboardLearningPathState?.dashboardLearningPathViewModels[0].recordType === recordType || recordType === "") ? (<> */}
                        <h3>{getDashboardLearningPathSingleState?.title_EN}</h3>
                        <div
                          className="module-percentage"
                          style={{
                            background: `conic-gradient(#105F43 0%, #105F43 ${getDashboardLearningPathSingleState?.percentageComplete}%, #F8FDFB 0%, #F8FDFB 100%)`,
                          }}
                        >
                          <div>
                            <span className="number">
                              {
                                getDashboardLearningPathSingleState?.percentageComplete
                              }
                              %
                            </span>
                            <span>
                              {getDashboardLearningPathSingleState?.percentageComplete <
                              100
                                ? "InCompleted"
                                : "Completed"}
                            </span>
                          </div>
                        </div>
                        {/* <p style={{fontSize: "14px", fontFamily: 'TitilliumSemiBold'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text.</p> */}
                        <div className="module-badge">
                          <h4>Required Badge</h4>
                          <span>
                            You must earn this badge to complete this step
                          </span>
                          {/* <div className="module-badge-card">
                            <div className="badge-card-img">
                              <img loading="lazy"src={LogoLight} width="25px" />
                            </div>
                            <div className="badge-card-txt">
                              <h4>Residency in Public Health</h4>
                              <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text.</span>
                            </div>
                          </div> */}
                        </div>
                        {/* </>) : (
                        ""
                      )} */}
                      </>
                    )}
                  </LearningModule>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "TitilliumNormal", sans-serif;
`;

const LearningCourses = styled.div`
  height: 100%;
  padding: 15px 20px;
  background: #fff;
  border-radius: 10px;
`;
const LearningCourse = styled.div`
  &:not(:last-child) {
    margin-bottom: 40px;
  }

  .learner-course-head {
    display: flex;
    padding-top: 20px;
    cursor: pointer;

    .start-date {
      width: 100px;

      @media screen and (max-width: 800px) {
        width: 80px;
      }

      div {
        font-size: 13px;
        // font-weight: 700;
        line-height: 13px;
        font-family: "TitilliumBold";
      }
      span {
        font-size: 12px;
        font-family: "TitilliumSemiBold";

        @media screen and (max-width: 800px) {
          width: 80px;
          font-size: 10px;
          font-family: "TitilliumBold";
        }
      }
    }
    .course-name {
      position: relative;
      width: calc(100% - 100px);
      padding-left: 24px;
      font-size: 16px;
      // font-weight: 700;
      line-height: 14px;
      color: #000;
      padding-bottom: 50px;
      font-family: "TitilliumNormal";

      @media screen and (max-width: 800px) {
        width: calc(100% - 80px);
      }
    }
    .course-name::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 1px;
      height: 100%;
      background: #868686;
    }
    .course-name::after {
      content: "";
      position: absolute;
      top: 0;
      left: -6px;
      width: 14px;
      height: 14px;
      border-radius: 100%;
      border: 3px solid #fff;
      outline: 1px solid #868686;
      background: #a87e33;
    }
  }
  .course-modules {
    .course-module {
      display: flex;

      .module-date {
        width: 100px;
        display: flex;
        // align-items: center;
        font-size: 12px;
        color: #050505;
        padding-top: 12px;
        padding-bottom: 15px;
        font-family: "TitilliumSemiBold";

        @media screen and (max-width: 800px) {
          width: 80px;
          font-size: 10px;
          font-family: "TitilliumBold";
        }
      }
      .module-card {
        position: relative;
        width: calc(100% - 100px);
        padding-left: 40px;
        margin-bottom: 18px;

        @media screen and (max-width: 800px) {
          width: calc(100% - 80px);
        }

        > div {
          position: relative;
          padding: 8px 22px;
          border-radius: 5px;
          // background-image: url(/images/ModuleBgLight.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-color: #fafafa;
          border: 1px solid #eee;
          margin-left: 10px;

          ::before {
            content: "";
            position: absolute;
            top: 10px;
            left: -7px;
            width: 12px;
            height: 12px;
            background: #fafafa;
            border-left: 1px solid #eee;
            border-bottom: 1px solid #eee;
            transform: rotate(45deg);
            border-bottom-left-radius: 4px;
          }

          h4 {
            margin: 0;
            font-size: 14px;
            font-weight: 600;
            line-height: 16px;
            margin-bottom: 2px;
          }
          span {
            display: block;
            font-size: 12px;
            color: #707070;
            line-height: 16px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
      .module-card .timeline {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 1px;
        height: calc(100% + 18px);
        background: #868686;
      }
      .module-card .timeline::before {
        content: "";
        position: absolute;
        top: 18px;
        left: 0;
        transform: translateY(-50%);
        width: 18px;
        height: 1px;
        background: #868686;
      }
      .module-card .timeline::after {
        content: "";
        position: absolute;
        left: 18px;
        top: 18px;
        transform: translateY(-50%);
        width: 14px;
        height: 14px;
        border-radius: 100%;
        border: 3px solid #fff;
        outline: 1px solid #868686;
      }
    }
    .course-module:last-child .module-card .timeline {
      height: 18px;
    }
    .course-module.active {
      .module-card > div {
        background-color: #f8fdfb;
        border-color: #105f43;
        // background-image: url(/images/ModuleBgGreen.png);

        ::before {
          background-color: #f8fdfb;
          border-color: #105f43;
        }
      }

      .module-card .timeline::after {
        background: #105f43;
      }
    }
  }

  @media screen and (max-width: 800px) {
    .learner-course-head {
      .course-name {
        line-height: 20px;
      }
    }
  }
`;

const LearningModule = styled.div`
  position: sticky;
  top: 65px;
  min-height: 300px;
  padding: 15px 20px;
  background: #fff;
  border-radius: 10px;

  h3 {
    width: 90%;
    margin: auto;
    font-size: 18px;
    // font-weight: 600;
    padding-top: 10px;
    text-align: center;
    font-family: "TitilliumBold";
  }

  .module-percentage {
    width: 100px;
    height: 100px;
    margin: 30px auto;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    > div {
      width: calc(100% - 10px);
      height: calc(100% - 10px);
      background: #fff;
      border-radius: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      span {
        display: block;
        text-align: center;
        font-size: 10px;
      }
      .number {
        font-size: 14px;
        font-weight: 600;
        line-height: 14px;
      }
    }
  }

  .module-badge {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #eee;

    h4 {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 1px;
    }
    span {
      color: #707070;
      font-size: 12px;
      display: inline-block;
    }

    .module-badge-card {
      margin-top: 20px;
      padding: 10px 15px;
      border: 1px solid #cdcccc;
      border-radius: 4px;
      display: flex;

      .badge-card-img {
        width: 40px;
      }
      .badge-card-txt {
        width: calc(100% - 40px);
      }
    }
  }
`;

const StyledInput = styled(Input)`
  border-radius: 4px;
  border-color: #b6b6b6;
`;

const StyledSelect = styled(Select)`
  width: 50%;
  max-width: 300px;
`;
