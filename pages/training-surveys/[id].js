import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import Header from "../../src/components/adminLayoutHeader";
import styled from "styled-components";
import endpoints from "../../src/api";
import { Col, Empty, Row } from "antd";

import { R2Favicon } from "../../images";
import Preloader from "../../public/images/Preloader.gif";
import Submited from "../../public/images/Submited.svg";
import Rolling from "../../public/images/Rolling.gif";

import { getCookies, setCookies } from "../../src/helpers/cookie";
import { useRouter } from "next/router";
import CustomButton from "../../src/components/Button";
import SkeletonTextPlaceholder from "../../src/components/SkeletonTextPlaceholder";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import Image from "next/image";

const dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectItem, setSelectItem] = useState("training");

  const router = useRouter();
  const surveysId = router.query;

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

  const [
    getDashboardInsideSurveyInitialState,
    setGetDashboardInsideSurveyInitialState,
  ] = useState({
    AssessmentId: surveysId?.id,
    CourseTrainingRegistrationId: "",
    FileId: surveysId?.id,
  });

  const [getDashboardInsideSurveyState, setGetDashboardInsideSurveyState] =
    useState();
  const [surveyCountStart, setSurveyCountStart] = useState(0);
  const [surveyCountEnd, setSurveyCountEnd] = useState(2);

  const GetDashboardInsideSurveyFunc = async () => {
    try {
      const response = await endpoints.GetDashboardInsideSurvey(
        authToken,
        getCookies("courseTrainingRegistrationId"),
        getDashboardInsideSurveyInitialState?.FileId
      );
      if (response.data.statusCode === "200") {
        setGetDashboardInsideSurveyState(response?.data?.data);
      } else if (response.data.statusCode === "404") {
        setGetDashboardInsideSurveyState(response?.data);
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  const [SubmitLoading, setSubmitLoading] = useState(false);
  const AddSurveyAnswerFunc = async () => {
    setSubmitLoading(true);
    try {
      let AllQas = 0;
      let AllAsn = 0;
      getDashboardInsideSurveyState?.dashboardInsideSurveyQuestionViewModels?.map(
        (item, index) => {
          AllQas++;
          item?.dashboardInsideSurveyAnswerViewModels?.map((item, index) => {
            if (item?.markCorrect == true) {
              AllAsn++;
            }
          });
        }
      );
      if (AllAsn == AllQas) {
        const response = await endpoints.AddSurveyAnswer(
          authToken,
          getDashboardInsideSurveyState
        );
        if (response.data.statusCode === "200") {
          // viewCourseFile();
          setSurveySubmited(true);
          setSubmitLoading(false);
        }
      } else {
        toast.error("All Fields are Required!");
        setSubmitLoading(false);
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  const [SurveySubmited, setSurveySubmited] = useState(false);
  const viewCourseFile = async () => {
    try {
      const viewFileObj = {
        courseTrainingRegistrationId:
          getDashboardInsideSurveyInitialState?.CourseTrainingRegistrationId,
        courseTrainingFileId: getCookies("courseTrainingFileId"),
        fieldRecordType: "File",
      };
      const response = await endpoints.AddFileView(authToken, viewFileObj);
      if (response.data.statusCode === "200") {
        setSurveySubmited(true);
        setSubmitLoading(false);
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  useLayoutEffect(() => {
    setGetDashboardInsideSurveyInitialState({
      ...getDashboardInsideSurveyInitialState,
      CourseTrainingRegistrationId: getCookies(
        "courseTrainingRegistrationId"
      ),
    });
    if (
      getDashboardInsideSurveyInitialState?.CourseTrainingRegistrationId !== ""
    ) {
      GetDashboardInsideSurveyFunc();
    }
  }, [getDashboardInsideSurveyInitialState?.CourseTrainingRegistrationId]);

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
              <Row gutter={["15px", "15px"]}>
                <Col span={24}>
                  {SurveySubmited === false ? (
                    <>
                      <SurveysSection>
                        {getDashboardInsideSurveyState?.statusCode === "404" ? (
                          <>
                            <Col span={24}>
                              <EmptyData>
                                <Empty
                                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                                  description={"No Survey Found"}
                                />
                              </EmptyData>
                            </Col>
                            <Col
                              span={24}
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <CustomButton
                                onClick={(e) => {
                                  e.preventDefault();
                                  history.back();
                                }}
                                customStyle={{
                                  borderColor: "#105F43",
                                  color: "#105F43",
                                  height: "35px",
                                  paddingInline: "50px",
                                }}
                              >
                                <ArrowLeftOutlined
                                  style={{ fontSize: "11px" }}
                                />{" "}
                                Back
                              </CustomButton>
                            </Col>
                          </>
                        ) : (
                          <>
                            <h2 className="survey-title">
                              {getDashboardInsideSurveyState?.name_EN ===
                              undefined ? (
                                <SkeletonTextPlaceholder
                                  width="40%"
                                  height="18px"
                                />
                              ) : (
                                getDashboardInsideSurveyState?.name_EN
                              )}
                            </h2>
                            <p className="survey-desc">
                              {getDashboardInsideSurveyState?.statusCode ===
                              "404" ? (
                                <SkeletonTextPlaceholder
                                  width="30%"
                                  height="18px"
                                />
                              ) : (
                                "Please take this survey about your experience in this course"
                              )}
                            </p>

                            {getDashboardInsideSurveyState
                              ?.dashboardInsideSurveyQuestionViewModels
                              .length === 0 &&
                            getDashboardInsideSurveyState?.dashboardInsideSurveyQuestionViewModels !==
                              undefined ? (
                              <Col span={24}>
                                <EmptyData>
                                  <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    description={"No Questions Found"}
                                  />
                                </EmptyData>
                              </Col>
                            ) : (
                              <SurveysQuastions>
                                {getDashboardInsideSurveyState?.statusCode ===
                                  "404" && (
                                  <div className="surveys-quastion">
                                    <div className="quastion-head">
                                      <SkeletonTextPlaceholder
                                        width={"40%"}
                                        height={"18px"}
                                      />
                                    </div>
                                    <div className="quastion-body">
                                      <SkeletonTextPlaceholder
                                        width={"60%"}
                                        height={"15px"}
                                      />
                                    </div>
                                  </div>
                                )}
                                {getDashboardInsideSurveyState?.dashboardInsideSurveyQuestionViewModels
                                  ?.slice(surveyCountStart, surveyCountEnd)
                                  ?.map((item, qaId) => (
                                    <div key={qaId}>
                                      {item?.fieldType === "Radio" && (
                                        <div
                                          className="surveys-quastion"
                                          key={qaId}
                                        >
                                          <div className="quastion-head">
                                            <h4>
                                              *{qaId + 1}. {item?.question_EN}?
                                            </h4>
                                          </div>
                                          <div
                                            className="quastion-body"
                                            onChange={(e) => {
                                              const Arr = {
                                                ...getDashboardInsideSurveyState,
                                              };
                                              let obj2 =
                                                Arr
                                                  .dashboardInsideSurveyQuestionViewModels[
                                                  qaId + surveyCountStart
                                                ]
                                                  .dashboardInsideSurveyAnswerViewModels;
                                              obj2.map((item, index) => {
                                                item.markCorrect = false;
                                              });
                                              let obj = obj2[e.target.value];
                                              obj.markCorrect = obj.markCorrect
                                                ? false
                                                : true;
                                              Arr.dashboardInsideSurveyQuestionViewModels[
                                                qaId + surveyCountStart
                                              ].dashboardInsideSurveyAnswerViewModels[
                                                e.target.value
                                              ] = obj;
                                              setGetDashboardInsideSurveyState({
                                                ...Arr,
                                              });
                                            }}
                                          >
                                            {item?.dashboardInsideSurveyAnswerViewModels?.map(
                                              (item, index) => (
                                                <div key={index}>
                                                  {item?.markCorrect ===
                                                  true ? (
                                                    <label
                                                      className="quastion-option radio"
                                                      key={index}
                                                    >
                                                      <input
                                                        type="radio"
                                                        name={`opt_${qaId}`}
                                                        value={index}
                                                        checked
                                                      />{" "}
                                                      <span className="quastion-border"></span>{" "}
                                                      <span>
                                                        {item?.answer_EN}
                                                      </span>
                                                    </label>
                                                  ) : (
                                                    <label
                                                      className="quastion-option radio"
                                                      key={index}
                                                    >
                                                      <input
                                                        type="radio"
                                                        name={`opt_${qaId}`}
                                                        value={index}
                                                      />{" "}
                                                      <span className="quastion-border"></span>{" "}
                                                      <span>
                                                        {item?.answer_EN}
                                                      </span>
                                                    </label>
                                                  )}
                                                </div>
                                              )
                                            )}
                                          </div>
                                        </div>
                                      )}
                                      {item?.fieldType === "CheckBox" && (
                                        <div
                                          className="surveys-quastion"
                                          key={qaId}
                                        >
                                          <div className="quastion-head">
                                            <h4>
                                              *{qaId + 1}. {item?.question_EN}?
                                            </h4>
                                          </div>
                                          <div
                                            className="quastion-body"
                                            onChange={(e) => {
                                              const Arr = {
                                                ...getDashboardInsideSurveyState,
                                              };
                                              //console.log('array',Arr)
                                              let obj =
                                                Arr
                                                  .dashboardInsideSurveyQuestionViewModels[
                                                  qaId + surveyCountStart
                                                ]
                                                  .dashboardInsideSurveyAnswerViewModels[
                                                  e.target.value
                                                ];
                                              obj.markCorrect = obj.markCorrect
                                                ? false
                                                : true;
                                              Arr.dashboardInsideSurveyQuestionViewModels[
                                                qaId + surveyCountStart
                                              ].dashboardInsideSurveyAnswerViewModels[
                                                e.target.value
                                              ] = obj;
                                              setGetDashboardInsideSurveyState({
                                                ...Arr,
                                              });
                                            }}
                                          >
                                            {item?.dashboardInsideSurveyAnswerViewModels?.map(
                                              (item, index) => (
                                                <div key={index}>
                                                  {item?.markCorrect ===
                                                  true ? (
                                                    <label
                                                      className="quastion-option checkbox"
                                                      key={index}
                                                    >
                                                      <input
                                                        type="checkbox"
                                                        name={`opt_${qaId}`}
                                                        value={index}
                                                        checked
                                                      />{" "}
                                                      <span className="quastion-border"></span>{" "}
                                                      <span>
                                                        {item?.answer_EN}
                                                      </span>
                                                    </label>
                                                  ) : (
                                                    <label
                                                      className="quastion-option checkbox"
                                                      key={index}
                                                    >
                                                      <input
                                                        type="checkbox"
                                                        name={`opt_${qaId}`}
                                                        value={index}
                                                      />{" "}
                                                      <span className="quastion-border"></span>{" "}
                                                      <span>
                                                        {item?.answer_EN}
                                                      </span>
                                                    </label>
                                                  )}
                                                </div>
                                              )
                                            )}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                              </SurveysQuastions>
                            )}

                            {getDashboardInsideSurveyState?.statusCode !==
                            "404" ? (
                              <>
                                {getDashboardInsideSurveyState
                                  ?.dashboardInsideSurveyQuestionViewModels
                                  .length === 0 &&
                                getDashboardInsideSurveyState?.dashboardInsideSurveyQuestionViewModels !==
                                  undefined ? (
                                  <Col
                                    span={24}
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <CustomButton
                                      onClick={(e) => {
                                        e.preventDefault();
                                        history.back();
                                      }}
                                      customStyle={{
                                        borderColor: "#105F43",
                                        color: "#105F43",
                                        height: "35px",
                                        paddingInline: "50px",
                                      }}
                                    >
                                      <ArrowLeftOutlined
                                        style={{ fontSize: "11px" }}
                                      />{" "}
                                      Back
                                    </CustomButton>
                                  </Col>
                                ) : (
                                  <Col
                                    span={24}
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    {surveyCountStart === 0 ? (
                                      <CustomButton
                                        customStyle={{
                                          paddingInline: "30px",
                                          borderColor: "#d9d9d9",
                                          color: "#d9d9d9",
                                          height: "35px",
                                          pointerEvents: "none",
                                        }}
                                      >
                                        Back
                                      </CustomButton>
                                    ) : (
                                      <CustomButton
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setSurveyCountStart(
                                            surveyCountStart - 2
                                          );
                                          setSurveyCountEnd(surveyCountEnd - 2);
                                        }}
                                        customStyle={{
                                          borderColor: "#105F43",
                                          color: "#105F43",
                                          height: "35px",
                                          paddingInline: "30px",
                                        }}
                                      >
                                        Back
                                      </CustomButton>
                                    )}
                                    {surveyCountEnd >=
                                    getDashboardInsideSurveyState
                                      ?.dashboardInsideSurveyQuestionViewModels
                                      ?.length ? (
                                      <>
                                        {SubmitLoading ? (
                                          <CustomButton
                                            customStyle={{
                                              display: "inline-flex",
                                              alignItems: "center",
                                              gap: "5px",
                                              backgroundColor: "#e0e0e0",
                                              color: "#fff",
                                              height: "35px",
                                              paddingInline: "30px",
                                            }}
                                          >
                                            Submit{" "}
                                            <img
                                              loading="lazy"
                                              alt={""}
                                              src={Rolling.src}
                                              width="15px"
                                              height="15px"
                                            />
                                          </CustomButton>
                                        ) : (
                                          <CustomButton
                                            onClick={(e) => {
                                              e.preventDefault();
                                              AddSurveyAnswerFunc();
                                            }}
                                            customStyle={{
                                              backgroundColor: "#105F43",
                                              color: "#fff",
                                              height: "35px",
                                              paddingInline: "30px",
                                            }}
                                          >
                                            Submit
                                          </CustomButton>
                                        )}
                                      </>
                                    ) : (
                                      <CustomButton
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setSurveyCountStart(
                                            surveyCountStart + 2
                                          );
                                          setSurveyCountEnd(surveyCountEnd + 2);
                                        }}
                                        customStyle={{
                                          backgroundColor: "#105F43",
                                          color: "#fff",
                                          height: "35px",
                                          paddingInline: "30px",
                                        }}
                                      >
                                        Next
                                      </CustomButton>
                                    )}
                                  </Col>
                                )}
                              </>
                            ) : (
                              <Col
                                span={24}
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <CustomButton
                                  onClick={(e) => {
                                    e.preventDefault();
                                    history.back();
                                  }}
                                  customStyle={{
                                    borderColor: "#105F43",
                                    color: "#105F43",
                                    height: "35px",
                                    paddingInline: "50px",
                                  }}
                                >
                                  <ArrowLeftOutlined
                                    style={{ fontSize: "11px" }}
                                  />{" "}
                                  Back
                                </CustomButton>
                              </Col>
                            )}
                          </>
                        )}
                      </SurveysSection>
                    </>
                  ) : (
                    <SurveysSection>
                      <div className="submited">
                        <div>
                          <h1>Your Survey has been Submitted</h1>
                          <img
                            src={Submited?.src}
                            width="100px"
                            height="100px"
                          />
                          <p>Thank you so much for submitting the survey</p>
                          <CustomButton
                            customStyle={{
                              paddingInline: "30px",
                              borderColor: "#105F43",
                              color: "#105F43",
                              height: "35px",
                            }}
                            onClick={() => {
                              history.back();
                            }}
                          >
                            Back
                          </CustomButton>
                        </div>
                      </div>
                    </SurveysSection>
                  )}
                </Col>
              </Row>
            </Header>
          </body>
        </div>
      ) : (
        <>
          <img loading="lazy" className="pre-loader" src={Preloader.src} />
        </>
      )}
    </>
  );
};

export default dashboard;

const SurveysSection = styled.div`
  padding: 20px 25px;
  background: #fff;
  border-radius: 8px;
  .survey-title {
    font-size: 20px;
    font-family: "TitilliumBold";
    margin-bottom: 2px;
  }
  .survey-desc {
    font-size: 14px;
    font-family: "TitilliumNormal";
    margin-bottom: 10px;
  }

  .submited {
    min-height: 400px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
      font-size: 20px;
      font-family: "TitilliumBold";
      margin-bottom: 25px;
    }
    img {
      margin-bottom: 25px;
    }
    p {
      font-size: 14px;
      margin-bottom: 30px;
      font-family: "TitilliumSemiBold";
    }
  }
`;
const SurveysQuastions = styled.div`
  padding: 20px 0;
  
  .surveys-quastion {
    border: 1px solid #C7C7C7;
    border-radius: 3px;
    margin-bottom: 20px;
    .quastion-head {
      padding: 8px 12px;
      background: #F2F2F2;
      border-top-right-radius: 3px;
      border-top-left-radius: 3px;
      border-bottom: 1px solid #C7C7C7;
      h4 {
        margin: 0;
      }
    }
    .quastion-body {
      padding: 15px;

      .quastion-option {
        position: relative;
        display: block;
        border: 1px dashed transparent;
        padding: 7px 5px;
        font-size: 12px;
        font-family: "TitilliumSemiBold";
        padding-left: 30px;
        cursor: pointer;
        margin-bottom: 8px;
        transition: 0.3s;

        .quastion-border {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 3px;
          border: 1px dashed transparent;
          transition: 0.3s;
        }
        .quastion-border::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 8px;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          border-radius: 100%;
          border: 1px solid #c7c7c7;
          transition: all .1s;
        }
        .quastion-border::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 11px;
          transform: translateY(-50%);
          width: 10px;
          height: 10px;
          border-radius: 100%;
          transition: all .1s;
        }

        :hover .quastion-border {
          border-color: #c1c1c1;
        }

        &.checkbox {
          .quastion-border::after,
          .quastion-border::before {
            border-radius: 3px;
          }
        }

        input {
          width: 0;
          height: 0;
          opacity: 0;

          :checked {
            + .quastion-border {
              border: 1px solid #105f43ad;

              ::after {
                background: #105f43;
              }
            }
          }
        }

        &.checkbox input {
          + .quastion-border {
            ::after {
              left: 10px;
              width: 12px;
              height: 12px;
            }
          }
          :checked {
            + .quastion-border {
            ::before {
              background: #105f43;
            }
            ::after {
              content: '✓';
              color: #fff;
              text-align: center;
              line-height: 12px;
              font-size: 9px;
              font-family: "TitilliumBold";
            }
          }
        }
      }
    }
  }
`;
const EmptyData = styled.div`
  width: 100%;
  height: auto;
  border-radius: 8px;
  background: #fff;
`;
