import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import Header from "../../src/components/adminLayoutHeader";
import styled from "styled-components";
import endpoints from "../../src/api";
import { Col, Input, message, Row, Select } from "antd";

import { R2Favicon, courseClock } from "../../images";
import Preloader from "../../public/images/Preloader.gif";

import { getCookies, setCookies } from "../../src/helpers/cookie";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import CustomButton from "../../src/components/Button";
import SkeletonTextPlaceholder from "../../src/components/SkeletonTextPlaceholder";
import Dragger from "antd/lib/upload/Dragger";
import { toast } from "react-toastify";
import moment from "moment";

const { Option } = Select;
const { TextArea } = Input;

const dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectItem, setSelectItem] = useState("course-assessment");

  const router = useRouter();
  const assessmentId = router.query;

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
    getDashboardInsideAssessmentInitialState,
    setGetDashboardInsideAssessmentInitialState,
  ] = useState({
    AssessmentId: assessmentId?.id,
    CourseTrainingRegistrationId: getCookies("courseTrainingRegistrationId"),
  });

  const [
    getDashboardInsideAssessmentState,
    setGetDashboardInsideAssessmentState,
  ] = useState();
  const [startAssessmentState, setStartAssessmentState] = useState();
  const [allAnsState, setAllAnsState] = useState(true);

  //console.log("jygigggglsgkdog", getDashboardInsideAssessmentState);

  const GetDashboardInsideSurveyFunc = async () => {
    try {
      const response = await endpoints.GetDashboardInsideAssessment(
        authToken,
        getDashboardInsideAssessmentInitialState?.AssessmentId,
        getDashboardInsideAssessmentInitialState?.CourseTrainingRegistrationId
      );
      if (response.data.statusCode === "200") {
        setGetDashboardInsideAssessmentState(response?.data?.data);
      }
    } catch (error) {
      //console.log("error", error);
    }
  };
  const AddAssessmentAnswerFunc = async () => {
    try {
      let AllQas = 0;
      let AllAsn = 0;
      getDashboardInsideAssessmentState?.dashboardInsideAssessmentQuestionViewModels?.map(
        (item, index) => {
          AllQas++;
          item?.dashboardInsideAssessmentAnswerViewModels?.map(
            (item, index) => {
              if (item?.markCorrect == true) {
                AllAsn++;
              }
            }
          );
        }
      );
      if (AllAsn >= AllQas) {
        const response = await endpoints.AddAssessmentAnswer(
          authToken,
          getDashboardInsideAssessmentState
        );
        if (response.data.statusCode === "200") {
          toast.success("Assessment Submitted!");
          GetDashboardInsideSurveyFunc();
          setCookies("startAssessmentState", false);
          setStartAssessmentState(false);
          viewCourseFile();
        }
      } else {
        toast.error("All Fields Are Required!");
      }
    } catch (error) {
      //console.log("error", error);
    }
  };
  const viewCourseFile = async () => {
    try {
      const viewFileObj = {
        courseTrainingRegistrationId:
          getDashboardInsideAssessmentInitialState?.CourseTrainingRegistrationId,
        courseTrainingFileId: getCookies("courseTrainingFileId"),
      };
      const response = await endpoints.AddFileView(authToken, viewFileObj);
      if (response.data.statusCode === "200") {
      }
    } catch (error) {
      //console.log("error", error);
    }
  };
  const uploadCustumResponse = async ({ file, onSuccess }) => {
    onSuccess("ok");
  };

  useLayoutEffect(() => {
    GetDashboardInsideSurveyFunc();
    if (getCookies("startAssessmentState") === "true") {
      setStartAssessmentState(true);
    } else {
      setStartAssessmentState(false);
    }
  }, []);

  var today = new Date();
  // var DD = String(today.getDate()).padStart(2, '0');
  // var MM = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  // var YYYY = today.getFullYear();
  // var hh = today.getHours();
  // var mm = today.getMinutes();
  // var ss = today.getSeconds();
  // var countDownDate = new Date(`${MM} ${DD}, ${YYYY} ${hh}:${mm}:${ss}`);
  // var countDownDate_end = new Date(`${MM} ${DD}, ${YYYY} ${hh}:${mm}:${ss}`);
  // //console.log("kufgjgflktoirhtirlkeshu", countDownDate, countDownDate_end);

  // const [durationState, setDurationState] = useState();
  // let currentTime = new Date();
  // //console.log("currentTime", currentTime, currentTime - 1);
  // const [abc, setAbc] = useState("--");
  // useLayoutEffect(()=>{
  //   const interval = setInterval(() => {
  //     setAbc(abc => abc -1)
  //   }, 60000);
  //   return () => clearInterval(interval);
  // }, [])
  // //console.log("lkgiulkgfughggh",abc);
  // useLayoutEffect(()=>{
  //   setAbc(parseInt(getDashboardInsideAssessmentState?.duration_EN))
  // }, [getDashboardInsideAssessmentState?.duration_EN])

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
                  {startAssessmentState ? (
                    <SurveysSection>
                      <h2 className="survey-title">
                        {getDashboardInsideAssessmentState?.name_EN ===
                        undefined ? (
                          <SkeletonTextPlaceholder width="40%" height="18px" />
                        ) : (
                          getDashboardInsideAssessmentState?.name_EN
                        )}
                        <div className="times">
                          <span className="left">
                            Time left: <b>{"--"} min</b>
                          </span>
                          <span className="total">
                            <img loading="lazy"src={courseClock} width="15px" />{" "}
                            {getDashboardInsideAssessmentState?.duration_EN}{" "}
                            mins
                          </span>
                        </div>
                      </h2>
                      <p className="survey-desc">
                        {" "}
                        Please take this Assessmenet about your experience in
                        this course{" "}
                      </p>

                      <SurveysQuastions>
                        {getDashboardInsideAssessmentState
                          ?.dashboardInsideAssessmentQuestionViewModels
                          .length === 0 && (
                          <>
                            <SkeletonTextPlaceholder width="60%" />
                            <br />
                            <SkeletonTextPlaceholder width="40%" />
                            <br />
                            <SkeletonTextPlaceholder width="50%" />
                          </>
                        )}
                        {getDashboardInsideAssessmentState?.dashboardInsideAssessmentQuestionViewModels?.map(
                          (item, qaId) => (
                            <div key={qaId}>
                              {item?.fieldType === "Radio" && (
                                <div className="surveys-quastion" key={qaId}>
                                  <div className="quastion-head">
                                    <h4>*1. {item?.question_EN}</h4>
                                  </div>
                                  <div
                                    className="quastion-body"
                                    onChange={(e) => {
                                      const Arr = {
                                        ...getDashboardInsideAssessmentState,
                                      };
                                      let obj2 =
                                        Arr
                                          .dashboardInsideAssessmentQuestionViewModels[
                                          qaId
                                        ]
                                          .dashboardInsideAssessmentAnswerViewModels;
                                      obj2.map((item, index) => {
                                        item.markCorrect = false;
                                      });
                                      let obj = obj2[e.target.value];
                                      obj.markCorrect = obj.markCorrect
                                        ? false
                                        : true;
                                      Arr.dashboardInsideAssessmentQuestionViewModels[
                                        qaId
                                      ].dashboardInsideAssessmentAnswerViewModels[
                                        e.target.value
                                      ] = obj;
                                      setGetDashboardInsideAssessmentState({
                                        ...Arr,
                                      });
                                    }}
                                  >
                                    {item?.dashboardInsideAssessmentAnswerViewModels?.map(
                                      (item, index) => (
                                        <label
                                          className="quastion-option radio"
                                          key={index}
                                        >
                                          <input
                                            type="radio"
                                            name={`opt_${qaId}`}
                                            value={index}
                                            required
                                          />{" "}
                                          <span className="quastion-border"></span>{" "}
                                          <span>{item?.answer_EN}</span>
                                        </label>
                                      )
                                    )}
                                  </div>
                                </div>
                              )}
                              {item?.fieldType === "CheckBox" && (
                                <div className="surveys-quastion" key={qaId}>
                                  <div className="quastion-head">
                                    <h4>*1. {item?.question_EN}</h4>
                                  </div>
                                  <div
                                    className="quastion-body"
                                    onChange={(e) => {
                                      const Arr = {
                                        ...getDashboardInsideAssessmentState,
                                      };
                                      let obj =
                                        Arr
                                          .dashboardInsideAssessmentQuestionViewModels[
                                          qaId
                                        ]
                                          .dashboardInsideAssessmentAnswerViewModels[
                                          e.target.value
                                        ];
                                      obj.markCorrect = obj.markCorrect
                                        ? false
                                        : true;
                                      Arr.dashboardInsideAssessmentQuestionViewModels[
                                        qaId
                                      ].dashboardInsideAssessmentAnswerViewModels[
                                        e.target.value
                                      ] = obj;
                                      setGetDashboardInsideAssessmentState({
                                        ...Arr,
                                      });
                                    }}
                                  >
                                    {item?.dashboardInsideAssessmentAnswerViewModels?.map(
                                      (item, index) => (
                                        <label
                                          className="quastion-option checkbox"
                                          key={index}
                                        >
                                          <input
                                            type="checkbox"
                                            name={`opt_${qaId}`}
                                            value={index}
                                            required
                                          />{" "}
                                          <span className="quastion-border"></span>{" "}
                                          <span>{item?.answer_EN}</span>
                                        </label>
                                      )
                                    )}
                                  </div>
                                </div>
                              )}
                              {item?.fieldType === "QuestionAnswer" && (
                                <div className="surveys-quastion">
                                  <div className="quastion-head">
                                    <h4>
                                      {" "}
                                      *1. {item?.question_EN}{" "}
                                      <span className="points">20 Points</span>{" "}
                                    </h4>
                                  </div>
                                  <div className="quastion-body">
                                    <AnsArea
                                      rows={4}
                                      placeholder="Your Answer"
                                      required
                                      onChange={(e) => {
                                        const Arr = {
                                          ...getDashboardInsideAssessmentState,
                                        };
                                        let obj =
                                          Arr
                                            .dashboardInsideAssessmentQuestionViewModels[
                                            qaId
                                          ]
                                            .dashboardInsideAssessmentAnswerViewModels[0];
                                        obj.answer_EN = e.target.value;
                                        Arr.dashboardInsideAssessmentQuestionViewModels[
                                          qaId
                                        ].dashboardInsideAssessmentAnswerViewModels[0] =
                                          obj;
                                        setGetDashboardInsideAssessmentState({
                                          ...Arr,
                                        });
                                      }}
                                    />
                                  </div>
                                </div>
                              )}
                              {item?.fieldType === "FileUpload" && (
                                <div className="surveys-quastion">
                                  <div className="quastion-head">
                                    <h4>
                                      {" "}
                                      *1. {item?.question_EN}{" "}
                                      <span className="points">
                                        {item?.score} Points
                                      </span>{" "}
                                    </h4>
                                  </div>
                                  <div className="quastion-body">
                                    <StyledDragger
                                      maxCount={1}
                                      {...{
                                        name: "file",
                                        customRequest: uploadCustumResponse,
                                        headers: {
                                          authorization: "authorization-text",
                                        },
                                        async onChange(info) {
                                          if (
                                            info.file.status !== "uploading"
                                          ) {
                                            const getBase64 = (file) =>
                                              new Promise((resolve, reject) => {
                                                const reader = new FileReader();
                                                reader.readAsDataURL(file);
                                                reader.onload = () =>
                                                  resolve(reader.result);
                                                reader.onerror = (error) =>
                                                  reject(error);
                                              });
                                            const blob = await getBase64(
                                              info.file.originFileObj
                                            );
                                            const Arr = {
                                              ...getDashboardInsideAssessmentState,
                                            };
                                            let obj =
                                              Arr
                                                .dashboardInsideAssessmentQuestionViewModels[
                                                qaId
                                              ]
                                                .dashboardInsideAssessmentAnswerViewModels[0];
                                            obj.answer_EN = blob;
                                            Arr.dashboardInsideAssessmentQuestionViewModels[
                                              qaId
                                            ].dashboardInsideAssessmentAnswerViewModels[0] =
                                              obj;
                                            setGetDashboardInsideAssessmentState(
                                              { ...Arr }
                                            );
                                          }
                                          if (info.file.status === "done") {
                                          } else if (
                                            info.file.status === "error"
                                          ) {
                                          }
                                        },
                                      }}
                                    >
                                      <p className="ant-upload-text">
                                        {" "}
                                        Drag & drop files here …{" "}
                                      </p>
                                      <p className="ant-upload-hint">
                                        {" "}
                                        Or browse on your computer{" "}
                                      </p>
                                    </StyledDragger>
                                  </div>
                                </div>
                              )}
                            </div>
                          )
                        )}
                        <>
                          {/* <div className="surveys-quastion">
                            <div className="quastion-head">
                              <h4>
                                *1. Qa1? <span className="points">10 Points</span>
                              </h4>
                            </div>
                            <div className="quastion-body">
                              <label className="quastion-option radio">
                                <input type="radio" name="" value="" />{" "}
                                <span className="quastion-border"></span>{" "}
                                <span>Ans 1</span>
                              </label>
                            </div>
                          </div>
                          <div className="surveys-quastion">
                            <div className="quastion-head">
                              <h4>
                                *1. Qa1? <span className="points">8 Points</span>
                              </h4>
                            </div>
                            <div className="quastion-body">
                              <label className="quastion-option checkbox">
                                <input type="checkbox" name="" value="" />{" "}
                                <span className="quastion-border"></span>{" "}
                                <span>Ans 1</span>
                              </label>
                            </div>
                          </div>
                          <div className="surveys-quastion">
                            <div className="quastion-head">
                              <h4>
                                *1. Qa1? <span className="points">20 Points</span>
                              </h4>
                            </div>
                            <div className="quastion-body">
                              <AnsArea rows={4} placeholder="Your Answer" />
                            </div>
                          </div>
                          <div className="surveys-quastion">
                            <div className="quastion-head">
                              <h4>
                                *1. Qa1? <span className="points">20 Points</span>
                              </h4>
                            </div>
                            <div className="quastion-body">
                              <StyledDragger {...props}>
                                <p className="ant-upload-text">
                                  Drag & drop files here …
                                </p>
                                <p className="ant-upload-hint">
                                  Or browse on your computer
                                </p>
                              </StyledDragger>
                            </div>
                          </div> */}
                        </>
                      </SurveysQuastions>

                      <Col
                        span={24}
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        {getDashboardInsideAssessmentState
                          ?.dashboardInsideAssessmentQuestionViewModels
                          .length === 0 ? (
                          <>
                            <CustomButton
                              onClick={() => {
                                setCookies("startAssessmentState", false);
                                setStartAssessmentState(false);
                              }}
                              customStyle={{
                                borderColor: "#105F43",
                                color: "#105F43",
                                height: "35px",
                                paddingInline: "30px",
                              }}
                            >
                              {" "}
                              Cancel{" "}
                            </CustomButton>
                            <CustomButton
                              customStyle={{
                                backgroundColor: "#e0e0e0",
                                color: "#fff",
                                height: "35px",
                                paddingInline: "30px",
                                marginLeft: "10px",
                              }}
                            >
                              {" "}
                              Submit{" "}
                            </CustomButton>
                          </>
                        ) : (
                          <>
                            <CustomButton
                              customStyle={{
                                borderColor: "#105F43",
                                color: "#105F43",
                                height: "35px",
                                paddingInline: "30px",
                              }}
                              onClick={() => {
                                setCookies("startAssessmentState", false);
                                setStartAssessmentState(false);
                              }}
                            >
                              {" "}
                              Cancel{" "}
                            </CustomButton>
                            {allAnsState ? (
                              <CustomButton
                                onClick={(e) => {
                                  e.preventDefault();
                                  AddAssessmentAnswerFunc();
                                }}
                                customStyle={{
                                  backgroundColor: "#105F43",
                                  color: "#fff",
                                  height: "35px",
                                  paddingInline: "30px",
                                  marginLeft: "10px",
                                }}
                              >
                                {" "}
                                Submit{" "}
                              </CustomButton>
                            ) : (
                              <CustomButton
                                customStyle={{
                                  backgroundColor: "#e0e0e0",
                                  color: "#fff",
                                  height: "35px",
                                  paddingInline: "30px",
                                  marginLeft: "10px",
                                }}
                              >
                                {" "}
                                Submit{" "}
                              </CustomButton>
                            )}
                          </>
                        )}
                      </Col>
                    </SurveysSection>
                  ) : (
                    <AssessSection>
                      <h2 className="survey-title">
                        {getDashboardInsideAssessmentState?.name_EN}{" "}
                        <span>Assessment Submissions</span>
                      </h2>
                      <p className="desc">
                        <div className="times">
                          <span className="left">Assessment</span>
                          <span className="total">
                            <img loading="lazy"src={courseClock} width="15px" />{" "}
                            {getDashboardInsideAssessmentState?.duration_EN}{" "}
                            mins
                          </span>
                        </div>
                        <span>
                          Attempt{" "}
                          {getDashboardInsideAssessmentState?.totalAttempts ===
                          0
                            ? "Unlimited"
                            : `${getDashboardInsideAssessmentState?.numberOfAttempts} of ${getDashboardInsideAssessmentState?.totalAttempts}`}
                        </span>
                      </p>

                      <AssessGrad>
                        <div className="grad-head">
                          <span>Submit your Assessment</span>
                          {getDashboardInsideAssessmentState?.numberOfAttempts <
                            getDashboardInsideAssessmentState?.totalAttempts && (
                            <CustomButton
                              onClick={() => {
                                setCookies("startAssessmentState", true);
                                setStartAssessmentState(true);
                              }}
                              customStyle={{
                                backgroundColor: "#105F43",
                                color: "#fff",
                                height: "38px",
                                paddingInline: "30px",
                                marginLeft: "10px",
                              }}
                            >
                              Start Assessment
                            </CustomButton>
                          )}
                          {getDashboardInsideAssessmentState?.totalAttempts ===
                            0 && (
                            <CustomButton
                              onClick={() => {
                                setCookies("startAssessmentState", true);
                                setStartAssessmentState(true);
                              }}
                              customStyle={{
                                backgroundColor: "#105F43",
                                color: "#fff",
                                height: "38px",
                                paddingInline: "30px",
                                marginLeft: "10px",
                              }}
                            >
                              Start Assessment
                            </CustomButton>
                          )}
                          {getDashboardInsideAssessmentState?.numberOfAttempts ==
                            getDashboardInsideAssessmentState?.totalAttempts &&
                            getDashboardInsideAssessmentState?.totalAttempts !=
                              0 && (
                              <CustomButton
                                customStyle={{
                                  backgroundColor: "rgb(224, 224, 224)",
                                  color: "#fff",
                                  height: "38px",
                                  paddingInline: "30px",
                                  marginLeft: "10px",
                                }}
                              >
                                Start Assessment
                              </CustomButton>
                            )}
                        </div>
                        <div className="grad-body">
                          <div className="receive">
                            <h2>Receive Grade</h2>
                            <p>
                              <span>To Pass</span>{" "}
                              {getDashboardInsideAssessmentState?.passingType ===
                                "Percentage" &&
                                getDashboardInsideAssessmentState?.passScore +
                                  "%"}{" "}
                              {getDashboardInsideAssessmentState?.passingType ===
                                "Score" &&
                                getDashboardInsideAssessmentState?.passScore}{" "}
                              or higher
                            </p>
                          </div>
                          <div className="your-grad">
                            <span>Your Grade</span>
                            <span className="grad-box">
                              {
                                getDashboardInsideAssessmentState?.obtainedPassingType
                              }
                            </span>
                          </div>
                        </div>
                      </AssessGrad>
                    </AssessSection>
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

const SurveysSection = styled.div`
  padding: 20px 25px;
  background: #fff;
  border-radius: 4px;

  .survey-title {
    display: flex;
    flex-wrap: wrap;

    font-size: 20px;
    font-family: "TitilliumBold";
    margin-bottom: 2px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .times {
      display: inline-block;
      font-size: 12px;
      font-family: "TitilliumSemiBold";

      .left {
        border: 1px solid #c7c7c7;
        padding: 3px 6px;
        border-radius: 3px;
        display: inline-block;

        b {
          font-family: "TitilliumBold";
        }
      }
      .total {
        margin-left: 8px;
      }
    }
  }
  .survey-desc {
    font-size: 14px;
    font-family: "TitilliumNormal";
    margin-bottom: 10px;
  }
`;
const SurveysQuastions = styled.div`
  padding: 20px 0;

  .surveys-quastion {
    border: 1px solid #c7c7c7;
    border-radius: 3px;
    margin-bottom: 20px;

    .quastion-head {
      padding: 8px 12px;
      background: #f2f2f2;
      border-top-right-radius: 3px;
      border-top-left-radius: 3px;
      border-bottom: 1px solid #c7c7c7;

      h4 {
        margin: 0;
        display: flex;
        justify-content: space-between;

        .points {
          display: inline-block;
          color: #000;
          background: #fff;
          font-size: 12px;
          padding: 2px 10px;
          border-radius: 3px;
        }
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
const AnsArea = styled(TextArea)`
  font-size: 14px;

  :focus {
    box-shadow: none;
  }
`;
const StyledDragger = styled(Dragger)`
  :hover {
    border: 1px solid;
    border-color: #105f43ad !important;
  }

  p.ant-upload-text {
    color: #aaaaaa !important;
    font-size: 18px !important;
  }
  p.ant-upload-hint {
    font-size: 13px !important;
    color: #2e2e2e !important;
  }
  // + .ant-upload-list-text {
  //   display: none !important;
  // }
`;

const AssessSection = styled.div`
  padding: 16px 25px;
  background: #fff;
  border-radius: 8px;

  .survey-title {
    display: flex;
    flex-wrap: wrap;

    font-size: 20px;
    font-family: "TitilliumBold";
    margin-bottom: 2px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      font-size: 14px;
    }
  }
  .desc {
    font-size: 14px;
    font-family: "TitilliumNormal";
    margin-bottom: 10px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .times {
      display: inline-block;

      .left {
        border-radius: 3px;
        display: inline-block;
      }
      .total {
        margin-left: 8px;
      }
    }
  }
`;
const AssessGrad = styled.div`
  border-radius: 4px;
  border: 1px solid #c9c9c9;
  margin-top: 30px;
  margin-bottom: 20px;

  .grad-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 25px;
    border-bottom: 1px solid #c9c9c9;

    > span {
      font-family: "TitilliumBold";
    }
  }
  .grad-body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 25px;

    .receive {
      h2 {
        margin: 0;
        font-size: 14px;
        font-family: "TitilliumSemiBold";
      }
      p {
        font-size: 12px;
        font-family: "TitilliumSemiBold";
        margin: 0;

        span {
          color: #105f43;
          font-family: "TitilliumBold";
          margin-right: 5px;
        }
      }
    }
    .your-grad {
      display: flex;
      align-items: center;
      font-family: "TitilliumSemiBold";

      .grad-box {
        border: 1px solid #c9c9c9;
        font-family: "TitilliumBold";
        border-radius: 3px;
        // width: 75px;
        padding-inline: 15px;
        height: 40px;
        font-size: 18px;
        margin-left: 12px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        line-height: 1;
      }
    }
  }
`;
