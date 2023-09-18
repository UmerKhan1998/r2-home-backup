import React, { useLayoutEffect, useRef, useState } from "react";
import Head from "next/head";
import Header from "../../src/components/adminLayoutHeader";
import styled from "styled-components";
import endpoints from "../../src/api";
import { Col, Empty, Input, message, Modal, Row, Select } from "antd";

import { R2Favicon, courseClock } from "../../images";
import Preloader from "../../public/images/Preloader.gif";
import Rolling from "../../public/images/Rolling.gif";

import { getCookies, setCookies } from "../../src/helpers/cookie";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import CustomButton from "../../src/components/Button";
import SkeletonTextPlaceholder from "../../src/components/SkeletonTextPlaceholder";
import Dragger from "antd/lib/upload/Dragger";
import { toast } from "react-toastify";
import moment from "moment";
import { FieldTimeOutlined } from "@ant-design/icons";
import Image from "next/image";

const { Option } = Select;
const { TextArea } = Input;

const dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectItem, setSelectItem] = useState("programs");

  const [isSessionOutModalOpen, setIsSessionOutModalOpen] = useState();
  const showSessionOutModal = () => {
    setIsSessionOutModalOpen(true);
  };
  const closeSessionOutModal = () => {
    setIsSessionOutModalOpen(false);
  };
  const [isAskToSubmitModalOpen, setIsAskToSubmitModalOpen] = useState();
  const showAskToSubmitModal = () => {
    setIsAskToSubmitModalOpen(true);
  };
  const closeAskToSubmitModal = () => {
    setIsAskToSubmitModalOpen(false);
  };

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
    CourseTrainingRegistrationId: '',
    FileId: assessmentId?.id,
  });

  const [
    getDashboardInsideAssessmentState,
    setGetDashboardInsideAssessmentState,
  ] = useState();
  const [startAssessmentState, setStartAssessmentState] = useState(false);
  const [allAnsState, setAllAnsState] = useState(true);
  const [AnsSubmit, setAnsSubmit] = useState(true);
  const [UploadError, setUploadError] = useState(false);

  const [GetDashboardInsideSurveyLoader, setGetDashboardInsideSurveyLoader] = useState(true);
  const GetDashboardInsideSurveyFunc = async () => {
    setGetDashboardInsideSurveyLoader(true)
    try {
      const response = await endpoints.GetDashboardInsideAssessment(
        authToken,
        getDashboardInsideAssessmentInitialState?.CourseTrainingRegistrationId,
        getDashboardInsideAssessmentInitialState?.FileId
      );
      if (response.data.statusCode === "200") {
        setGetDashboardInsideAssessmentState(response?.data?.data);
        setGetDashboardInsideSurveyLoader(false)
      } else {
        setGetDashboardInsideSurveyLoader(false)
      }
    } catch (error) {
      setGetDashboardInsideSurveyLoader(false)
      //console.log("error", error);
    }
  };
  const [RemainingQuestion, setRemainingQuestion] = useState();
  const [assessmentTimeEl, setAssessmentTimeEl] = useState();
  const CheckAssessmentAnswerFunc = async () => {
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
      if (AllAsn == AllQas) {
        AddAssessmentAnswerFunc();
      }
      if (AllAsn < AllQas) {
        if (assessmentTimeEl !== "00:00") {
          setRemainingQuestion(AllQas - AllAsn);
          showAskToSubmitModal();
        }
      }
    } catch (error) {
      //console.log("error", error);
    }
  };
  const AddAssessmentAnswerFunc = async () => {
    try {
      setAnsSubmit(false);
      const response = await endpoints.AddAssessmentAnswer(
        authToken,
        getDashboardInsideAssessmentState
      );
      if (response.data.statusCode === "200") {
        toast.success("Assessment Submitted!");
        if(getDashboardInsideAssessmentInitialState?.FileId) {
          GetDashboardInsideSurveyFunc();
        }
        setCookies("startAssessmentState", false);
        setStartAssessmentState(false);
        // viewCourseFile();
        setTimeAlert(false);
        setAnsSubmit(true);
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
        fieldRecordType: "File",
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
    setGetDashboardInsideAssessmentInitialState({...getDashboardInsideAssessmentInitialState, 
      CourseTrainingRegistrationId: getCookies("courseTrainingRegistrationId")
    })
    if(getDashboardInsideAssessmentInitialState?.CourseTrainingRegistrationId !== '') {
      GetDashboardInsideSurveyFunc();
    }
    // if(getCookies("startAssessmentState") === "true") {
    //   setStartAssessmentState(true)
    // } else {
    //   setStartAssessmentState(false)
    // }
  }, [getDashboardInsideAssessmentInitialState?.CourseTrainingRegistrationId]);

  const getIndex = (index) => {
    return index + 1;
  };

  const [timeAlert, setTimeAlert] = useState(false);
  function startTimer() {
    var presentTime = assessmentTimeEl;
    var timeArray = presentTime.split(/[:]+/);
    var m = parseInt(timeArray[0]);
    var s = parseInt(checkSecond(timeArray[1] - 1));
    if (s == 59) {
      m = m - 1;
    }
    if (m < 0) {
      return;
    }
    if (m < getDashboardInsideAssessmentState?.duration_EN / 2) {
      setTimeAlert(true);
    }
    setAssessmentTimeEl(("0" + m).slice(-2) + ":" + ("0" + s).slice(-2));
  }
  function checkSecond(sec) {
    if (sec < 10 && sec >= 0) {
      sec = "0" + sec;
    }
    if (sec < 0) {
      sec = "59";
    }
    return sec;
  }
  useLayoutEffect(() => {
    setAssessmentTimeEl(`${getDashboardInsideAssessmentState?.duration_EN}:00`);
  }, [getDashboardInsideAssessmentState?.duration_EN]);
  useLayoutEffect(() => {
    if (startAssessmentState) {
      const interval = setInterval(() => {
        startTimer();
      }, 1000);
      if (assessmentTimeEl === "00:00") {
        clearInterval(interval);
        showSessionOutModal();
      }
      return () => clearInterval(interval);
    }
  }, [startAssessmentState, assessmentTimeEl]);

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
                          {(getDashboardInsideAssessmentState?.dashboardInsideAssessmentQuestionViewModels.length !== 0) && (
                            <span className="left">
                              Time left:{" "}
                              <b>
                                {timeAlert ? (
                                  <span style={{ color: "#ff0032" }}>
                                    {assessmentTimeEl}
                                  </span>
                                ) : (
                                  assessmentTimeEl
                                )}{" "}
                                min
                              </b>
                            </span>
                          )}
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
                        this Program{" "}
                      </p>

                      {(getDashboardInsideAssessmentState?.dashboardInsideAssessmentQuestionViewModels.length === 0) ? (
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
                                      <h4>
                                        *{getIndex(qaId)}. {item?.question_EN}
                                      </h4>
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
                                      <h4>
                                        *{getIndex(qaId)}. {item?.question_EN}
                                      </h4>
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
                                  <div className="surveys-quastion" key={qaId}>
                                    <div className="quastion-head">
                                      <h4>
                                        {" "}
                                        *{getIndex(qaId)}. {item?.question_EN}{" "}
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
                                          obj.markCorrect =
                                            obj.answer_EN === "" ? false : true;
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
                                  <div className="surveys-quastion" key={qaId}>
                                    <div className="quastion-head">
                                      <h4>
                                        {" "}
                                        *{getIndex(qaId)}. {item?.question_EN}{" "}
                                        <span className="points">
                                          {item?.score} Points
                                        </span>{" "}
                                      </h4>
                                    </div>
                                    <div
                                      className={`quastion-body ${
                                        UploadError ? "uplod-error" : ""
                                      }`}
                                    >
                                      <StyledDragger
                                        maxCount={1}
                                        {...{
                                          name: "file",
                                          customRequest: uploadCustumResponse,
                                          headers: {
                                            authorization: "authorization-text",
                                          },
                                          async onChange(info) {
                                            setUploadError(false);
                                            if (
                                              info.file.status !== "uploading"
                                            ) {
                                              if (info?.file?.size < 5000000) {
                                                if (
                                                  info?.file?.type ===
                                                    "image/jpeg" ||
                                                  info?.file?.type ===
                                                    "image/jpg" ||
                                                  info?.file?.type ===
                                                    "image/png" ||
                                                  info?.file?.type ===
                                                    "application/pdf" ||
                                                  info?.file?.type ===
                                                    "application/msword" ||
                                                  info?.file?.type ===
                                                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                                                  info?.file?.type ===
                                                    "image/svg+xml"
                                                ) {
                                                  const getBase64 = (file) =>
                                                    new Promise(
                                                      (resolve, reject) => {
                                                        const reader =
                                                          new FileReader();
                                                        reader.readAsDataURL(
                                                          file
                                                        );
                                                        reader.onload = () =>
                                                          resolve(reader.result);
                                                        reader.onerror = (
                                                          error
                                                        ) => reject(error);
                                                      }
                                                    );
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
                                                  obj.markCorrect =
                                                    obj.answer_EN === ""
                                                      ? false
                                                      : true;
                                                  Arr.dashboardInsideAssessmentQuestionViewModels[
                                                    qaId
                                                  ].dashboardInsideAssessmentAnswerViewModels[0] =
                                                    obj;
                                                  setGetDashboardInsideAssessmentState(
                                                    { ...Arr }
                                                  );
                                                } else {
                                                  info.file.status = "error";
                                                  toast.error(
                                                    "Please Select the correct file format"
                                                  );
                                                  setUploadError(true);
                                                }
                                              } else {
                                                info.file.status = "error";
                                                toast.error(
                                                  "File Size must be less than 5MB"
                                                );
                                                setUploadError(true);
                                              }
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
                      )}

                      <Col
                        span={24}
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        {getDashboardInsideAssessmentState
                          ?.dashboardInsideAssessmentQuestionViewModels
                          .length === 0 ? (
                          <>
                            <CustomButton
                              customStyle={{
                                borderColor: "#105F43",
                                color: "#105F43",
                                height: "35px",
                                paddingInline: "30px",
                                marginLeft: "10px",
                              }}
                              onClick={()=>{
                                history.back()
                              }}
                            >
                              Back
                            </CustomButton>
                          </>
                        ) : (
                          <>
                            {AnsSubmit ? (
                              <CustomButton
                                onClick={(e) => {
                                  e.preventDefault();
                                  CheckAssessmentAnswerFunc();
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
                                  display: "inline-flex",
                                  gap: "5px",
                                  alignItems: "center",
                                }}
                              >
                                Submit{" "}
                                <Image alt={""}
                                  src={Rolling}
                                  width="15px"
                                  height="15px"
                                />
                              </CustomButton>
                            )}
                          </>
                        )}
                      </Col>
                    </SurveysSection>
                  ) : (<>
                    <AssessSection>
                      {(GetDashboardInsideSurveyLoader) ? (
                        <div style={{ textAlign: "center", paddingBlock: "30px" }}>
                          <img loading="lazy"src={Rolling.src} width="40px" height="40px" />
                        </div>
                      ) : (<>
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
                              <>
                                {getDashboardInsideAssessmentState?.obtainedPassingType ===
                                  "Inprogress" ||
                                getDashboardInsideAssessmentState?.obtainedPassingType ===
                                  "Pass" ? (
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
                                ) : (
                                  <CustomButton
                                    onClick={() => {
                                      setCookies("startAssessmentState", true);
                                      setStartAssessmentState(true);
                                      // setAssessmentTimeEl(`0:20`)
                                      setAssessmentTimeEl(
                                        `${getDashboardInsideAssessmentState?.duration_EN}:00`
                                      );
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
                              </>
                            )}
                            {getDashboardInsideAssessmentState?.totalAttempts ===
                              0 && (
                              <>
                                {getDashboardInsideAssessmentState?.obtainedPassingType ===
                                  "Inprogress" ||
                                getDashboardInsideAssessmentState?.obtainedPassingType ===
                                  "Pass" ? (
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
                                ) : (
                                  <CustomButton
                                    onClick={() => {
                                      setCookies("startAssessmentState", true);
                                      setStartAssessmentState(true);
                                      // setAssessmentTimeEl(`0:20`)
                                      setAssessmentTimeEl(
                                        `${getDashboardInsideAssessmentState?.duration_EN}:00`
                                      );
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
                              </>
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
                                {getDashboardInsideAssessmentState?.obtainedPassingType ===
                                ""
                                  ? "--"
                                  : getDashboardInsideAssessmentState?.obtainedPassingType}
                              </span>
                            </div>
                          </div>
                        </AssessGrad>
                      </>)}
                    </AssessSection>
                  </>)}
                </Col>
              </Row>
            </Header>
          </body>
          <StyledModal
            title={``}
            open={isSessionOutModalOpen}
            onOk={closeSessionOutModal}
            onCancel={closeSessionOutModal}
            width={480}
            maskClosable={false}
          >
            <div className="time-out-modal">
              <FieldTimeOutlined
                style={{
                  fontSize: "55px",
                  color: "#a87e33",
                  marginBottom: "16px",
                }}
              />
              <p>
                Sorry you have run out of time, Kindly wait for results for another attempt if there are any
              </p>
              <CustomButton
                onClick={() => {
                  closeSessionOutModal();
                  setCookies("startAssessmentState", false);
                  setStartAssessmentState(false);
                  AddAssessmentAnswerFunc();
                }}
                customStyle={{
                  backgroundColor: "#105f43",
                  color: "#fff",
                  borderColor: "#105f43",
                  paddingInline: "35px",
                }}
              >
                Ok
              </CustomButton>
            </div>
          </StyledModal>
          <StyledModal
            title={``}
            open={isAskToSubmitModalOpen}
            onOk={closeAskToSubmitModal}
            onCancel={closeAskToSubmitModal}
            width={480}
            maskClosable={false}
          >
            <div className="time-out-modal">
              <FieldTimeOutlined
                style={{
                  fontSize: "55px",
                  color: "#a87e33",
                  marginBottom: "16px",
                }}
              />
              <p>
                {RemainingQuestion} Questions Remaining, Do you still want to
                Submit?
              </p>
              <CustomButton
                onClick={() => {
                  closeAskToSubmitModal();
                }}
                customStyle={{
                  backgroundColor: "transparent",
                  color: "#105f43",
                  borderColor: "#105f43",
                  paddingInline: "35px",
                }}
              >
                {" "}
                No{" "}
              </CustomButton>
              <CustomButton
                onClick={() => {
                  closeAskToSubmitModal();
                  setCookies("startAssessmentState", false);
                  setStartAssessmentState(false);
                  AddAssessmentAnswerFunc();
                }}
                customStyle={{
                  backgroundColor: "#105f43",
                  color: "#fff",
                  borderColor: "#105f43",
                  paddingInline: "35px",
                  marginLeft: "10px",
                }}
              >
                {" "}
                Yes{" "}
              </CustomButton>
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

      &.uplod-error {
        .ant-upload-list.ant-upload-list-text {
          display: none;
        }
      }

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

const StyledModal = styled(Modal)`
  top: 100px !important;
  width: 100% !important;
  max-width: 400px !important;

  .time-out-modal {
    text-align: center;

    p {
      font-size: 17px;
    }
  }

  .ant-modal-header {
    // border-radius: 14px 14px 0 0 !important;
    // background: #0c5439 !important;
    display: none;
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
    border-radius: 4px !important;
  }

  @media screen and (max-width: 800px) {
    margin: auto;
    max-width: calc(100% - 20px) !important;
  }
`;
const EmptyData = styled.div`
  width: 100%;
  height: auto;
  border-radius: 8px;
  background: #fff;
`;