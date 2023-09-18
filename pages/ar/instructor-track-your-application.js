import React, { useState, useLayoutEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import Image from "next/image";

import endpoints from "../../src/api";

import { Button, Col, Input, Row, Select, Tag, Timeline, Upload } from "antd";
import { GreenLoader, R2Favicon, SideDesign } from "../../images";

import { AiFillEye, AiOutlineRight } from "react-icons/ai";
import Header from "../../src/components/rtl/header";
import Footer from "../../src/components/rtl/footer";
import { getCookies } from "../../src/helpers/cookie";
import moment from "moment";
import { ImAttachment } from "react-icons/im";
import CustomButton from "../../src/components/rtl/Button";
import {
  Information,
  Name,
  Resubmit,
  Submit,
  submitted,
  tracking,
  tracking_your_application,
} from "../../src/helpers/LanguageConstant";
import { toast } from "react-toastify";
import { useRouter } from 'next/router';

const TrackYourApplication = () => {
  const router= useRouter();
  const token = getCookies("token");
  const trackingId = getCookies("trackingInsId");
  const [loading, setLoading] = useState(false);
  const [submitState, setSubmitState] = useState("");
  const [rmsFeedbackState, setRmsFeedbackState] = useState("");
  const [paymentResubmitState, setPaymentResubmitState] = useState("");
  const [dashboardTrackAppState, setDashboardTrackAppState] = useState([]);
  const [dropdownStatusState, setDropdownStatusState] = useState("Select");
  const [loadingState, setLoadingState] = useState(false);

  //console.log("dropdownStatusState", dropdownStatusState);
  //console.log("dashboardTrackAppState", dashboardTrackAppState);
  //console.log("submitState", submitState);
  //console.log("loading", loading);

  const getDashboardTrackApplicatonFunc = async (token, code) => {
    try {
      const response = await endpoints.DashboardTrackApplicatonInstructor(
        token,
        code
      );
      if (response) {
        setDashboardTrackAppState(response?.data?.data);
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  useLayoutEffect(() => {
    if (trackingId === undefined) {
      router.push("/ar");
    }

    getDashboardTrackApplicatonFunc(token, trackingId);
  }, []);

  const rmsCourseTrainingRegistrationFeedbackFunc = async (
    token,
    image,
    feedback,
    id
  ) => {
    try {
      const obj = {
        Image: image,
        RMSInstructorRegistrationId: id,
        Feedback: feedback,
      };
      //console.log("rmsObj", obj);

      const response = await endpoints.rmsInstructorRegistrationFeedback(
        token,
        obj
      );
      if (response) {
        //console.log("responseObj", response);
        setSubmitState();
      }
    } catch (err) {
      //console.log("err", err);
    }

    getDashboardTrackApplicatonFunc(token, trackingId);
  };

  const AddPaymentFuncP = async (token, image, paymentMethod, amount, id) => {
    setLoadingState(true);

    try {
      const obj = {
        Id: id,
        ModeofPayment: paymentMethod,
        Amount: amount,
        DepositSlipImage: image,
        TransactionId: "",
      };
      //console.log("rmsObj", obj, token);

      const response = await endpoints.AddPaymentFunc(token, obj);
      if (response) {
        //console.log("response", response);
        setLoadingState(false);
        // setRmsFeedbackState({ ...rmsFeedbackState, image: "", feedback: "" });
        setPaymentResubmitState();
      }
    } catch (err) {
      setLoadingState(false);
    }

    getDashboardTrackApplicatonFunc(token, trackingId);
  };

  const filterTrue =
  dashboardTrackAppState?.learnerDashboardApplicationTrackTimeLineViewModels?.some(
    (item) => item?.status === "Approved"
  );
const filterTrueInvPaid =
  dashboardTrackAppState?.learnerDashboardApplicationTrackTimeLineViewModels?.some(
    (item) => item?.invoiceStatus === "Paid"
  );
const filterTrueInvPending =
  dashboardTrackAppState?.learnerDashboardApplicationTrackTimeLineViewModels?.some(
    (item) => item?.invoiceStatus === "Pending"
  );
  //console.log("filterTrue", filterTrue);

  return (
    <div className="container">
      <Head>
        <title>Riyadh Second Health Cluster</title>
        <link rel="icon" href={R2Favicon} />
      </Head>
      <body>
        <Header />

        <SideDesignDiv>
          {/* <img loading="lazy"src={SideDesign} /> */}
          <img loading="lazy"alt={""} height={500} width={500} src={SideDesign} />
        </SideDesignDiv>

        <MainWhatWeofferingDivSection>
          <Container>
            <WhatWeofferingDivSection>
              <h1>{tracking_your_application}</h1>
              <p className="tracking_no">
                {trackingId} # {tracking}
              </p>
              <Row dir="rtl" gutter={[32, 32]}>
                <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                  <TrackApplicationCardDiv1>
                    <ApplicationStatusRow>
                      <h1>
                        {dashboardTrackAppState?.courseTrainingRecordType_AR}{" "}
                        {Information}
                      </h1>
                    </ApplicationStatusRow>
                    <CourseRow>
                      <p className="label">
                        {dashboardTrackAppState?.courseTrainingRecordType_AR}{" "}
                        {Name}
                      </p>
                      <p className="course_name">
                        {dashboardTrackAppState?.firstName_AR}{" "}
                        {dashboardTrackAppState?.lastName_AR}
                      </p>
                    </CourseRow>
                    <CourseRow>
                      <p className="label">
                        {dashboardTrackAppState?.courseTrainingRecordType_AR}{" "}
                        تاريخ تطبيق
                      </p>
                      <p className="course_name">
                        {dashboardTrackAppState?.insertDate &&
                          moment(dashboardTrackAppState?.insertDate).format(
                            "ll"
                          )}
                      </p>
                    </CourseRow>
                  </TrackApplicationCardDiv1>
                </Col>
                {dashboardTrackAppState
                  ?.instructorDashboardApplicationTrackTimeLineViewModels
                  ?.length > 0 && (
                  <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                    <TrackApplicationCardDiv2ActiveBtn dir="rtl">
                      <AdditionalInformationRow>
                        <h1>
                          {tracking} {Information}
                        </h1>
                      </AdditionalInformationRow>

                      {dashboardTrackAppState?.instructorDashboardApplicationTrackTimeLineViewModels?.map(
                        (item, index) => (
                          <>
                            {item?.status === "ForwardtoFinance" ? (
                              <StyledTimeline mode={"right"}>
                                <Timeline.Item
                                  key={index}
                                  color={item?.statusColorNameValue}
                                  label={
                                    <ApplicationStatusDateDiv>
                                      <p>
                                        {moment(item?.dt).format(
                                          "YYYY ,DD MMM"
                                        )}
                                      </p>
                                    </ApplicationStatusDateDiv>
                                  }
                                >
                                  <StyledTimeLineRow>
                                    <StyledcommentsDiv>
                                      <p className="Bold">
                                        {item?.statusValue_AR}
                                      </p>
                                      <p className="Light">
                                        تهانينا! تمت الموافقة على طلبك وتحويله
                                        إلى قسم التمويل ، يرجى الانتظار للحصول
                                        على رابط الدفع
                                      </p>
                                    </StyledcommentsDiv>
                                  </StyledTimeLineRow>
                                </Timeline.Item>
                              </StyledTimeline>
                            ) : (
                              <>
                                {item?.status === "PaymentReceived" && (
                                  <StyledTimeline mode={"right"}>
                                    <Timeline.Item
                                      key={index}
                                      color={item?.statusColorNameValue}
                                      label={
                                        <ApplicationStatusDateDiv>
                                          <p>
                                            {moment(item?.dt).format(
                                              "YYYY ,DD MMM"
                                            )}
                                          </p>
                                        </ApplicationStatusDateDiv>
                                      }
                                    >
                                      <StyledTimeLineRow>
                                        <StyledcommentsDiv>
                                          <p className="Bold">
                                            {item?.statusValue_AR}
                                          </p>
                                          <p className="Light">
                                            {item?.comments}
                                          </p>
                                        </StyledcommentsDiv>
                                        {/* <StyledAiFillEye
                                          onClick={() =>
                                            window.open(
                                              item?.depositSlipUrl,
                                              "blank"
                                            )
                                          }
                                        /> */}
                                      </StyledTimeLineRow>
                                    </Timeline.Item>
                                  </StyledTimeline>
                                )}
                                {item?.status === "PaymentProceed" && (
                                  <StyledTimeline mode={"right"}>
                                    <Timeline.Item
                                      key={index}
                                      color={item?.statusColorNameValue}
                                      label={
                                        <ApplicationStatusDateDiv>
                                          <p>
                                            {moment(item?.dt).format(
                                              "YYYY ,DD MMM"
                                            )}
                                          </p>
                                        </ApplicationStatusDateDiv>
                                      }
                                    >
                                      <StyledTimeLineRow>
                                        <StyledcommentsDiv
                                          style={{
                                            display: "grid",
                                            width: "100%",
                                          }}
                                        >
                                          <Row style={{ display:"flex",
                                        justifyContent:"space-between", alignItems:"center" }}>
                                            <Col span={10}>
                                              <p className="Bold">
                                                {item?.statusValue_AR}
                                              </p>
                                              <p className="Light">
                                                الرجاء تحديد خيار الدفع
                                              </p>
                                            </Col>

                                            <>
                                            {filterTrue&&filterTrueInvPaid ? (
                                                <Col
                                                  span={14}
                                                  style={{
                                                    display: "flex",
                                                    justifyContent: "end",
                                                    alignItems: "center",
                                                  }}
                                                >
                                                  <StyledSubmittedP>
                                                    {submitted}
                                                  </StyledSubmittedP>
                                                </Col>
                                              ) : (
                                                <>
                                                   {filterTrue&&filterTrueInvPending?
                                                 <Col
                                                  span={14}
                                                  style={{
                                                    display: "flex",
                                                    justifyContent: "end",
                                                    alignItems: "center",
                                                  }}
                                                >
                                                  <StyledSubmittedP>
                                                    {Submit}
                                                  </StyledSubmittedP>
                                                </Col>
                                               : <>
                                                {loadingState?
                                                <>
                            <img loading="lazy"src={GreenLoader} height={20} width={20} />
                                                
                                                </>:
                                                  <Col span={14}>
                                                    <StyledSelectDropDown
                                                      defaultValue="Select"
                                                      onChange={(value) => {
                                                        setDropdownStatusState(
                                                          value
                                                        );
                                                      }}
                                                      options={[
                                                        {
                                                          value:
                                                            "Upload Payment Proof",
                                                          label:
                                                            "Upload Payment Proof",
                                                        },
                                                        {
                                                          value:
                                                            "Online Payment",
                                                          label:
                                                            "Online Payment",
                                                        },
                                                      ]}
                                                    />
                                                    {dropdownStatusState ===
                                                    "Upload Payment Proof" ? (
                                                      <p
                                                        onClick={() => {
                                                          if (
                                                            paymentResubmitState
                                                          ) {
                                                            setPaymentResubmitState();
                                                          } else {
                                                            setPaymentResubmitState(
                                                              item?.id
                                                            );
                                                          }
                                                        }}
                                                        style={{
                                                          textAlign: "center",
                                                        }}
                                                        className="resubmit"
                                                      >
                                                        تحميل إثبات الدفع
                                                      </p>
                                                    ) : (
                                                      <p
                                                        style={{
                                                          textAlign: "center",
                                                        }}
                                                        className="resubmit"
                                                      >
                                                        الرجاء تحديد طريقة الدفع
                                                      </p>
                                                    )}
                                                  </Col>
                                                }
                                               </>}
                                                </>
                                              )}
                                            </>
                                          </Row>
                                        </StyledcommentsDiv>
                                      </StyledTimeLineRow>
                                    </Timeline.Item>
                                  </StyledTimeline>
                                )}
                                {paymentResubmitState === item?.id && (
                                  <>
                                    <StyledBoldP>
                                      * يرجى تحميل إيصال الدفع الخاص بك
                                    </StyledBoldP>
                                    <StyledUpload
                                      maxCount={1}
                                      {...{
                                        name: "file",
                                        action:
                                          "https://www.google.com/",
                                        headers: {
                                          authorization: "authorization-text",
                                        },
                                        async onChange(info) {
                                          if (
                                            info?.file?.status !== "uploading"
                                          ) {
                                            if (
                                              info?.file?.type ===
                                                "image/jpeg" ||
                                              info?.file?.type ===
                                                "image/png" ||
                                              info?.file?.type ===
                                                "application/pdf" ||
                                              info?.file?.type ===
                                                "image/svg+xml"
                                            ) {
                                              AddPaymentFuncP(
                                                getCookies("token"),
                                                info?.file?.originFileObj,
                                                "CashDeposit",
                                                item?.invoiceAmount,
                                                dashboardTrackAppState?.registrationId
                                              );
                                              setPaymentResubmitState();
                                            } else {
                                              toast.error(
                                                "File type should be in JPG, PNG, PDF type"
                                              );
                                            }
                                          }
                                          if (info?.file?.status === "done") {
                                            // setEditIndexState(121098021098);
                                          } else if (
                                            info?.file?.status === "error"
                                          ) {
                                            // setEditIndexState(121098021098);
                                          }
                                        },
                                      }}
                                    >
                                      <Button icon={<ImAttachment />}>
                                        انقر للتحميل
                                      </Button>
                                    </StyledUpload>
                                  </>
                                )}
                                {item?.status === "InitialApproval" && (
                                  <StyledTimeline mode={"left"}>
                                    <Timeline.Item
                                      key={index}
                                      color={item?.statusColorNameValue}
                                      label={
                                        <ApplicationStatusDateDiv>
                                          <p>
                                            {moment(item?.dt).format(
                                              "YYYY ,DD MMM"
                                            )}
                                          </p>
                                        </ApplicationStatusDateDiv>
                                      }
                                    >
                                      <StyledTimeLineRow>
                                        <StyledcommentsDiv>
                                          <p className="Bold">
                                            {item?.statusValue_AR}
                                          </p>
                                          <p className="Light">
                                            {item?.comments}
                                          </p>
                                        </StyledcommentsDiv>
                                      </StyledTimeLineRow>
                                    </Timeline.Item>
                                  </StyledTimeline>
                                )}
                                {item?.status === "AssignedToRMS" && (
                                  <StyledTimeline mode={"left"}>
                                    <Timeline.Item
                                      key={index}
                                      color={item?.statusColorNameValue}
                                      label={
                                        <ApplicationStatusDateDiv>
                                          <p>
                                            {moment(item?.dt).format(
                                              "YYYY ,DD MMM"
                                            )}
                                          </p>
                                        </ApplicationStatusDateDiv>
                                      }
                                    >
                                      <StyledTimeLineRow>
                                        <StyledcommentsDiv>
                                          <p className="Bold">
                                            {item?.statusValue_AR}
                                          </p>
                                          <p className="Light">
                                            {item?.comments}
                                          </p>
                                        </StyledcommentsDiv>
                                      </StyledTimeLineRow>
                                    </Timeline.Item>
                                  </StyledTimeline>
                                )}
                                {item?.status === "AssignedToManager" && (
                                  <StyledTimeline mode={"left"}>
                                    <Timeline.Item
                                      key={index}
                                      color={item?.statusColorNameValue}
                                      label={
                                        <ApplicationStatusDateDiv>
                                          <p>
                                            {moment(item?.dt).format(
                                              "YYYY ,DD MMM"
                                            )}
                                          </p>
                                        </ApplicationStatusDateDiv>
                                      }
                                    >
                                      <StyledTimeLineRow>
                                        <StyledcommentsDiv>
                                          <p className="Bold">
                                            {item?.statusValue_AR}
                                          </p>
                                          <p className="Light">
                                            {item?.comments}
                                          </p>
                                        </StyledcommentsDiv>
                                      </StyledTimeLineRow>
                                    </Timeline.Item>
                                  </StyledTimeline>
                                )}
                                {item?.status === "Assigned" && (
                                  <StyledTimeline mode={"left"}>
                                    <Timeline.Item
                                      key={index}
                                      color={item?.statusColorNameValue}
                                      label={
                                        <ApplicationStatusDateDiv>
                                          <p>
                                            {moment(item?.dt).format(
                                              "YYYY ,DD MMM"
                                            )}
                                          </p>
                                        </ApplicationStatusDateDiv>
                                      }
                                    >
                                      <StyledTimeLineRow>
                                        <StyledcommentsDiv>
                                          <p className="Bold">
                                            {item?.statusValue_AR}
                                          </p>
                                          <p className="Light">
                                            {item?.comments}
                                          </p>
                                        </StyledcommentsDiv>
                                      </StyledTimeLineRow>
                                    </Timeline.Item>
                                  </StyledTimeline>
                                )}
                                {item?.status === "Inprogress" && (
                                  <StyledTimeline mode={"left"}>
                                    <Timeline.Item
                                      key={index}
                                      color={item?.statusColorNameValue}
                                      label={
                                        <ApplicationStatusDateDiv>
                                          <p>
                                            {moment(item?.dt).format(
                                              "YYYY ,DD MMM"
                                            )}
                                          </p>
                                        </ApplicationStatusDateDiv>
                                      }
                                    >
                                      <StyledTimeLineRow>
                                        <StyledcommentsDiv>
                                          <p className="Bold">
                                            {item?.statusValue_AR}
                                          </p>
                                          <p className="Light">
                                            {item?.comments}
                                          </p>
                                        </StyledcommentsDiv>
                                      </StyledTimeLineRow>
                                    </Timeline.Item>
                                  </StyledTimeline>
                                )}
                                {item?.status === "Refusal" && (
                                  <StyledTimeline mode={"left"}>
                                    <Timeline.Item
                                      key={index}
                                      color={item?.statusColorNameValue}
                                      label={
                                        <ApplicationStatusDateDiv>
                                          <p>
                                            {moment(item?.dt).format(
                                              "YYYY ,DD MMM"
                                            )}
                                          </p>
                                        </ApplicationStatusDateDiv>
                                      }
                                    >
                                      <StyledTimeLineRow>
                                        <StyledcommentsDiv>
                                          <p className="Bold">
                                            {item?.statusValue_AR}
                                          </p>
                                          <p className="Light">
                                            {item?.comments}
                                          </p>
                                        </StyledcommentsDiv>
                                      </StyledTimeLineRow>
                                    </Timeline.Item>
                                  </StyledTimeline>
                                )}
                                {item?.status === "RejectByManager" && (
                                  <StyledTimeline mode={"left"}>
                                    <Timeline.Item
                                      key={index}
                                      color={item?.statusColorNameValue}
                                      label={
                                        <ApplicationStatusDateDiv>
                                          <p>
                                            {moment(item?.dt).format(
                                              "YYYY ,DD MMM"
                                            )}
                                          </p>
                                        </ApplicationStatusDateDiv>
                                      }
                                    >
                                      <StyledTimeLineRow>
                                        <StyledcommentsDiv>
                                          <p className="Bold">
                                            {item?.statusValue_AR}
                                          </p>
                                          <p className="Light">
                                            {item?.comments}
                                          </p>
                                        </StyledcommentsDiv>
                                      </StyledTimeLineRow>
                                    </Timeline.Item>
                                  </StyledTimeline>
                                )}
                                {item?.status === "AdditionalRequirement" && (
                                  <>
                                    <StyledTimeline mode={"left"}>
                                      <Timeline.Item
                                        key={index}
                                        color={item?.statusColorNameValue}
                                        label={
                                          <ApplicationStatusDateDiv>
                                            <p>
                                              {moment(item?.dt).format(
                                                "YYYY ,DD MMM"
                                              )}
                                            </p>
                                          </ApplicationStatusDateDiv>
                                        }
                                      >
                                        <StyledTimeLineRow>
                                          <StyledcommentsDiv>
                                            <p className="Bold">
                                              {item?.statusValue_AR}
                                            </p>
                                            <p className="Light">
                                              {item?.comments}
                                            </p>
                                          </StyledcommentsDiv>
                                          <StyledTimeLineRowLastDiv>
                                            {item?.feedback ? (
                                              <p className="submit">
                                                {submitted}
                                              </p>
                                            ) : (
                                              <p
                                                onClick={() => {
                                                  if (submitState) {
                                                    setSubmitState();
                                                  } else {
                                                    setSubmitState(item?.id);
                                                  }
                                                }}
                                                className="resubmit"
                                              >
                                                {Submit}
                                              </p>
                                            )}
                                          </StyledTimeLineRowLastDiv>
                                        </StyledTimeLineRow>
                                      </Timeline.Item>
                                    </StyledTimeline>
                                    {submitState === item?.id}
                                    {submitState === item?.id && (
                                      <>
                                        {item?.allowFileUpload ? (
                                          <>
                                            <StyledBoldP>
                                              {item?.subject}
                                            </StyledBoldP>
                                            <StyledUpload
                                              maxCount={1}
                                              {...{
                                                name: "file",
                                                action:
                                                  "https://www.google.com/",
                                                headers: {
                                                  authorization:
                                                    "authorization-text",
                                                },
                                                async onChange(info) {
                                                  if (
                                                    info?.file?.status !==
                                                    "uploading"
                                                  ) {
                                                    if (
                                                      info?.file?.type ===
                                                        "image/jpeg" ||
                                                      info?.file?.type ===
                                                        "image/png" ||
                                                      info?.file?.type ===
                                                        "application/pdf" ||
                                                      info?.file?.type ===
                                                        "image/svg+xml"
                                                    ) {
                                                      rmsCourseTrainingRegistrationFeedbackFunc(
                                                        getCookies("token"),
                                                        info?.file
                                                          ?.originFileObj,
                                                        "",
                                                        item?.id
                                                      );
                                                    } else {
                                                      toast.error(
                                                        "File type should be in JPG, PNG, PDF type"
                                                      );
                                                    }
                                                  }
                                                  if (
                                                    info?.file?.status ===
                                                    "done"
                                                  ) {
                                                    // setEditIndexState(121098021098);
                                                  } else if (
                                                    info?.file?.status ===
                                                    "error"
                                                  ) {
                                                    // setEditIndexState(121098021098);
                                                  }
                                                  // setSubmitState();
                                                },
                                              }}
                                            >
                                              <Button icon={<ImAttachment />}>
                                                انقر للتحميل
                                              </Button>
                                            </StyledUpload>
                                          </>
                                        ) : (
                                          <>
                                            <p>{item?.subject}</p>
                                            <StyledSubmitDiv>
                                              <StyledInput
                                                type="text"
                                                name="feedback"
                                                onChange={(e) =>
                                                  setRmsFeedbackState(
                                                    e?.target?.value
                                                  )
                                                }
                                                placeholder={
                                                  item?.subject
                                                    ? item?.subject
                                                    : item?.comments
                                                }
                                              />
                                              {rmsFeedbackState?.trim() === "" ? (
                                                <CustomButton
                                                  customStyle={{
                                                    height: "40px",
                                                    background: "#E0E0E0",
                                                    borderRadius: 8,
                                                    color: "#fff",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    cursor: "not-allowed",
                                                    marginRight: " 10px",
                                                  }}
                                                >
                                                  {Submit}
                                                </CustomButton>
                                              ) : (
                                                <CustomButton
                                                  customStyle={{
                                                    height: "40px",
                                                    background: "#064B33",
                                                    color: "#fff",
                                                    marginRight: " 10px",
                                                  }}
                                                  onClick={() =>
                                                    rmsCourseTrainingRegistrationFeedbackFunc(
                                                      getCookies("token"),
                                                      "",
                                                      rmsFeedbackState,
                                                      item?.id
                                                    )
                                                  }
                                                >
                                                  {Submit}
                                                </CustomButton>
                                              )}
                                            </StyledSubmitDiv>
                                          </>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}

                                {item?.status === "Approved" && (
                                  <StyledTimeline mode={"left"}>
                                    <Timeline.Item
                                      key={index}
                                      color={item?.statusColorNameValue}
                                      label={
                                        <ApplicationStatusDateDiv>
                                          <p>
                                            {moment(item?.dt).format(
                                              "YYYY ,DD MMM"
                                            )}
                                          </p>
                                        </ApplicationStatusDateDiv>
                                      }
                                    >
                                      <StyledTimeLineRow>
                                        <StyledcommentsDiv>
                                          <p className="Bold">
                                            {item?.statusValue_AR}
                                          </p>
                                          <p className="Light">
                                            تهانينا! التطبيق الخاص بك لديه
                                            تمت الموافقة.
                                          </p>
                                        </StyledcommentsDiv>
                                      </StyledTimeLineRow>
                                    </Timeline.Item>
                                  </StyledTimeline>
                                )}
                                {/* {item?.status === "Approved" && (
                                  <StyledTimeline mode={"left"}>
                                    <Timeline.Item
                                      key={index}
                                      color={item?.statusColorNameValue}
                                      label={
                                        <ApplicationStatusDateDiv>
                                          <p>
                                            {moment(item?.dt).format(
                                              "YYYY ,DD MMM"
                                            )}
                                          </p>
                                        </ApplicationStatusDateDiv>
                                      }
                                    >
                                      <StyledTimeLineRow>
                                        <StyledcommentsDiv>
                                          <p className="Bold">
                                            {item?.statusValue_AR}
                                          </p>
                                          <p className="Light">
                                            تهانينا! تمت الموافقة على دورتك.
                                            يرجى التحقق من بريدك الإلكتروني
                                            للحصول على بيانات اعتماد تسجيل
                                            الدخول
                                          </p>
                                        </StyledcommentsDiv>
                                      </StyledTimeLineRow>
                                    </Timeline.Item>
                                  </StyledTimeline>
                                )} */}
                                {item?.status === "BeingProcessed" && (
                                  <StyledTimeline mode={"left"}>
                                    <Timeline.Item
                                      key={index}
                                      color={item?.statusColorNameValue}
                                      label={
                                        <ApplicationStatusDateDiv>
                                          <p>
                                            {moment(item?.dt).format(
                                              "YYYY ,DD MMM"
                                            )}
                                          </p>
                                        </ApplicationStatusDateDiv>
                                      }
                                    >
                                      <StyledTimeLineRow>
                                        <StyledcommentsDiv>
                                          <p className="Bold">
                                            {item?.statusValue_AR}
                                          </p>
                                          {/* <p className="Light">
                                            تهانينا! تمت الموافقة على دورتك.
                                            يرجى التحقق من بريدك الإلكتروني
                                            للحصول على بيانات اعتماد تسجيل
                                            الدخول
                                          </p> */}
                                        </StyledcommentsDiv>
                                      </StyledTimeLineRow>
                                    </Timeline.Item>
                                  </StyledTimeline>
                                )}
                              </>
                            )}
                          </>
                        )
                      )}

                      {/* <Timeline.Item
                          color="red"
                          label={
                            <ApplicationStatusDateDiv>
                              <p>10 Feb, 2022</p>
                            </ApplicationStatusDateDiv>
                          }
                        >
                          <StyledTimeLineRowLast>
                            <p>Rejected</p>
                            <StyledTimeLineRowLastDiv>
                              <p className="resubmit">Resubmit</p>
                            </StyledTimeLineRowLastDiv>
                          </StyledTimeLineRowLast>
                        </Timeline.Item> */}
                    </TrackApplicationCardDiv2ActiveBtn>
                  </Col>
                )}
              </Row>
            </WhatWeofferingDivSection>
          </Container>
        </MainWhatWeofferingDivSection>
        <Footer />
      </body>
    </div>
  );
};

export default TrackYourApplication;

const TrackApplicationCardDiv = styled.div`
  background: #ffffff;
  box-shadow: 5px 5px 31px 6px rgba(0, 0, 0, 0.05);
  border-radius: 14px;
  padding: 20px 20px 10px;
`;

const TrackApplicationCardDiv1 = styled.div`
  margin-bottom: 20px;
  background: #ffffff;
  box-shadow: 5px 5px 31px 6px rgba(0, 0, 0, 0.05);
  border-radius: 14px;
  padding: 20px;
`;

const TrackApplicationCardDiv2ActiveBtn = styled.div`
  background: #ffffff;
  box-shadow: 5px 5px 31px 6px rgba(0, 0, 0, 0.05);
  border-radius: 14px;
  padding: 20px 20px 20px;
  // height: 290px !important;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: start;
  h1 {
    text-align: center !important;
  }
`;

const TrackApplicationCardDiv2 = styled.div`
  background: #ffffff;
  box-shadow: 5px 5px 31px 6px rgba(0, 0, 0, 0.05);
  border-radius: 14px;
  padding: 20px 20px 0px;
  height: 290px !important;
`;

const BreadcrumbDiv = styled.div`
  padding: 20px 70px;
  // border-bottom: 1px solid #dddddd;
`;

const LeftSideDesignDiv = styled.div`
  position: absolute;
  display: flex;
  justify-content: start;
  width: 100%;
  z-index: 99;
  height: 650px;
  img {
  width: 100%;
    margin-top: 50px;
  }
`;

const AssociateCardSection = styled.div`
  padding: 80px 77px;
`;

const AssociateCardDiv = styled.div`
  background: rgba(168, 126, 51, 0.06);
  padding: 35px;
  border-radius: 9px;
  h1 {
    font-family: "GESSTwoBold", sans-serif;
    // font-weight: 700;
    font-size: 30px;
    line-height: 46px;
    color: #105f43;
    margin-block: 14px;
  }
  p {
    line-height: 28px;
  }
`;

const AssociateCardRow = styled(Row)``;

const AssociateCardCol = styled(Col)``;

const AboutSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 1200px) {
    height: 750px !important;
  }
  @media (max-width: 1199px) {
    height: 700px !important;
  }
`;

const FacultySection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 1200px) {
    height: 750px !important;
  }
  @media (max-width: 1199px) {
    height: 700px !important;
  }
`;

const StyledAboutSectionRow = styled(Row)`
  display: flex;
  justify-content: center;
  padding-inline: 70px;
  margin-top: 30px;
  margin-left: 0px !important;
  margin-right: 0px !important;
  @media (max-width: 1199px) {
    margin-inline: 8%;
    margin-top: 0px;
  }
`;

const StyledColImg = styled(Col)`
  display: flex;
  justify-content: start;
  align-items: center;
  img {
    height: 510px;
    margin-top: -30px;
    object-fit: cover;
  }
  @media (max-width: 1199px) {
    img {
      height: 250px;
      margin-top: 0px;
    }
  }
`;

const StyledColFacultyImg = styled(Col)`
  display: flex;
  justify-content: end;
  align-items: center;
  img {
    height: 510px;
    margin-top: -30px;
    object-fit: cover;
  }
  @media (max-width: 1199px) {
    img {
      height: 250px;
      margin-top: 0px;
    }
  }
`;

const AboutUsContentCol = styled(Col)`
  flex-direction: column;
  display: flex;
  justify-content: center;
  p {
    font-size: 16px;
    margin-bottom: 10px;
    line-height: 28px !important;
    color: #636363;
  }
  h1 {
    font-size: 40px;
    // font-weight: 700;
    line-height: 46px;
    color: #105f43;
  }
  h3 {
    font-weight: 400;
    font-size: 22px;
    line-height: 34px;
    color: #000000;
  }
  @media (max-width: 991px) {
    h1 {
      font-size: 30px;
      // font-weight: 700;
      line-height: 36px;
      color: #105f43;
    }
  }
`;

const MessageSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(16, 95, 67, 0.05);
  @media (min-width: 1200px) {
    height: 660px !important;
  }
  @media (max-width: 1199px) {
    height: 700px !important;
  }
`;

const StyledMessageSectionRow = styled(Row)`
  display: flex;
  justify-content: center;
  padding-inline: 70px;
  margin-top: 30px;
  margin-left: 0px !important;
  margin-right: 0px !important;
  @media (max-width: 1199px) {
    margin-inline: 8%;
    margin-top: 0px;
  }
`;

const StyledColMessageImg = styled(Col)`
  display: flex;
  justify-content: end;
  align-items: center;
  img {
    height: 510px;
    margin-top: -30px;
    object-fit: cover;
  }
  @media (max-width: 1199px) {
    img {
      height: 250px;
      margin-top: 0px;
    }
  }
`;

const MessageContentCol = styled(Col)`
  flex-direction: column;
  display: flex;
  justify-content: center;
  p {
    font-size: 16px;
    margin-bottom: 10px;
    line-height: 28px !important;
    color: #636363;
  }
  h1 {
    font-size: 40px;
    // font-weight: 700;
    line-height: 46px;
    color: #105f43;
  }
  h3 {
    font-weight: 400;
    font-size: 22px;
    line-height: 34px;
    color: #000000;
  }
  @media (max-width: 991px) {
    h1 {
      font-size: 30px;
      // font-weight: 700;
      line-height: 36px;
      color: #105f43;
    }
  }
`;

const GoalsAndObjectivesSection = styled.div`
  padding: 80px 80px 0;
  h1 {
    font-size: 40px;
    // font-weight: 700;
    line-height: 46px;
    color: #105f43;
  }
  p {
    color: #636363;
    line-height: 28px;
    font-weight: 400;
    font-size: 16px;
  }
`;

const PointsDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 14px;
  p {
    margin-bottom: 0px;
    margin-left: 12px;
    font-size: 16px;
  }
`;

const PointsRow = styled(Row)`
  padding-inline: 20px;
`;

const MainBreadcrumbDiv = styled.div`
  border-bottom: 1px solid #dddddd;
`;

const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  @media (min-width: 576px) {
    max-width: 576px;
  }
  @media (min-width: 768px) {
    max-width: 768px;
  }
  @media (min-width: 992px) {
    min-width: 992px;
  }
  @media only screen and (min-width: 1160px) and (max-width: 1258px) {
    min-width: 1160px;
  }
  @media only screen and (min-width: 1259px) and (max-width: 1359px) {
    min-width: 1260px;
  }
  @media (min-width: 1342px) {
    min-width: 1340px;
  }
`;

const SideDesignDiv = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
  width: 100%;
  z-index: 1 !important;
  height: 580px;
`;

const MainWhatWeofferingDivSection = styled.div`
  position: relative;
  z-index: 3 !important;
  display: flex;
  // align-items: center;
  .ant-upload-list{
    display:none !important
      }    
`;

const WhatWeofferingDivSection = styled.div`
  @media (min-width: 992px) {
    padding: 140px 80px 80px;
  }
  @media (max-width: 991px) {
    padding: 70px 0;
  }
  text-align: center;
  h1 {
    font-family: "GESSTwoBold";
    // font-weight: 700;
    color: #181818;
  }
  img {
    // margin-block: 20px;
    // height: 80px;
  }
  .tracking_no {
    font-family: "GESSTwoLight";
    margin-bottom: 30px;
  }
`;

const WhatWeOfferingRow = styled(Row)``;

const WhatWeOfferingCol = styled(Col)`
  h1 {
    // font-weight: 700;
    font-size: 40px;
    line-height: 46px;
    color: #105f43;
    font-family: "GESSTwoBold", sans-serif;
  }
  h3 {
    font-weight: 400;
    font-size: 22px;
  }
  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 27px;
    color: #636363;
  }
  .service-bg {
    width: 100%;
  }
  .request-pDiv {
    margin: 35px 0 25px;
    p {
      margin-bottom: 0px;
      line-height: 40px;
    }
  }
`;

const WhatWeOfferCardsDiv = styled.div`
  display: flex;
  background: #fff;
  padding: 20px 17px;
  box-shadow: 6px 6px 25px rgba(0, 0, 0, 0.09);
  border-radius: 9px;
  height: 109px;
  align-items: center;
  justify-content: start;
  h3 {
    margin-left: 10px;
    margin-bottom: 0px;
    font-size: 14px;
    font-weight: 500;
  }
  img {
  }
`;

const LinkP = styled.p`
  color: #a87e33;
  cursor: pointer !important;
  width: 120px;
  &:hover {
    text-decoration: underline !important;
  }
`;

const LinkDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const ApplicationStatusRow = styled(Row)`
  display: flex;
  justify-content: start;
  h1 {
    margin-bottom: 0px;
    font-family: "GESSTwoBold";
    // font-weight: 600;
    color: #181818;
    font-size: 22px;
    display: flex;
    align-items: center;
  }
`;

const AdditionalInformationRow = styled(Row)`
  display: flex;
  justify-content: space-between;
  h1 {
    margin-bottom: 20px;
    font-family: "GESSTwoLight";
    font-weight: 600;
    color: #181818;
    font-size: 22px;
    display: flex;
    align-items: center;
  }
`;

const StyledApplicationStatusCustomButton = styled(Button)`
  border-radius: 19px !important;
  background: #f8f8f8 !important;
  border: 1px solid #c1c1c1 !important;
  borderradius: 19px !important;
  color: #105f43 !important;
  display: flex !important;
  align-items: center !important;
  width: 155px !important;
  justify-content: space-between !important;
  p {
    margin-bottom: 0px;
  }
  svg {
    margin-top: 2px !important;
  }
`;

const StyledAiOutlineRight = styled(AiOutlineRight)`
  color: #105f43 !important;
`;

const ApplicationStatusTagsDiv = styled.div`
  background: #effaeb;
  border: 1px solid #effaeb;
  color: #105f43;
  font-family: InterNormal, sans-serif;
  font-weight: 400;
  font-size: 14px;
  border-radius: 7px;
  padding: 3px 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  p {
    margin-bottom: 0px;
    cursor: pointer;
  }
`;

const ApplicationRejectedStatusTagsDiv = styled.div`
  background: #ffa4a3;
  border: 1px solid #effaeb;
  color: #fff;
  font-family: InterNormal, sans-serif;
  font-weight: 400;
  font-size: 14px;
  border-radius: 7px;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 3px 10px;
  p {
    margin-bottom: 0px;
    cursor: pointer;
  }
`;

const StyledTagRow = styled(Row)`
  margin-top: 15px;
`;

const CourseRow = styled(Row)`
  display: block !important;
  text-align: start;
  border-bottom: 1px solid #eaeaea;
  p {
    margin-bottom: 0px;
    text-align: end;
  }
  .label {
    color: #8c8c8c !important;
    margin-top: 10px;
    margin-bottom: 5px;
    text-align: start;
  }
  .course_name {
    color: #000000;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 10px;
    font-family: InterNormal, sans-serif;
    text-align: start;
  }
`;

const StyledTimeline = styled(Timeline)`
  display: grid !important;
  justify-content: start !important;
  .ant-timeline-item {
    padding-bottom: 15px !important;
  }
  .ant-timeline-item-content {
    width: 100% !important;
  }
  .ant-timeline-item-last {
    margin-bottom: 0px !important;
  }
  .ant-timeline-item:nth-last-child {
    margin-bottom: 0px !important;
  }
  .ant-timeline-item-head-green {
    color: #105f43 !important;
    border-color: #105f43 !important;
    background: #4c8772 !important;
  }
  .ant-timeline-item-head-yellow {
    color: #105f43 !important;
    border-color: #ffda94 !important;
    background: #ffe3af;
  }
  .ant-timeline-item-head-red {
    color: #105f43 !important;
    border-color: #ffa4a3 !important;
    background: #ffbbba;
  }
  .ant-timeline-item-content {
    right: calc(50% - -16px) !important;
  }
`;

const StyledSubmittedP = styled.p`
  cursor: pointer;
  color: #064b33;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledTimeLineRow = styled(Row)`
  display: flex;
  align-items: center !important;
  justify-content: space-between !important;
  border-bottom: 1px solid #c1c1c1;
  padding-bottom: 15px;
  .resubmit {
    margin-bottom: 0px !important;
    margin-left: 5px !important;
    cursor: pointer;
    color: #a87e33;
    &:hover {
      text-decoration: underline;
    }
  }
  .submit {
    margin-bottom: 0px !important;
    margin-left: 5px !important;
    color: #064b33;
    // cursor: pointer;
    // &:hover {
    //   text-decoration: underline;
    // }
  }
  p {
    font-size: 12px;
    margin-bottom: 0px;
  }
  @media (min-width: 1342px) {
    width: 300px !important;
  }
  @media only screen and (min-width: 1260px) and (max-width: 1341px) {
    width: 290px !important;
  }
  @media only screen and (min-width: 1160px) and (max-width: 1259px) {
    width: 260px !important;
  }
  @media only screen and (min-width: 992px) and (max-width: 1161px) {
    width: 180px !important;
  }
  @media (max-width: 991px) {
    width: 180px !important;
  }
`;

const StyledTimeLineRowLast = styled(Row)`
  display: flex;
  justify-content: space-between !important;
  @media (min-width: 1342px) {
    width: 320px !important;
  }
  @media only screen and (min-width: 1260px) and (max-width: 1341px) {
    width: 290px !important;
  }
  @media only screen and (min-width: 1160px) and (max-width: 1259px) {
    width: 260px !important;
  }
  @media only screen and (min-width: 992px) and (max-width: 1161px) {
    width: 180px !important;
  }
`;

const ApplicationStatusDateDiv = styled.div`
  background: #f0f0f0 !important;
  border-radius: 7px !important;
  color: #000000 !important;
  font-size: 14px !important;
  font-family: InterNormal, sans-serif !important;
  font-weight: 400 !important;
  // width: 100px;
  @media only screen and (min-width: 1161px) {
    padding: 4px 7px !important;
  }
  @media only screen and (min-width: 992px) and (max-width: 1160px) {
    padding: 4px 4px !important;
  }
  p {
    margin-bottom: 0px;
    text-align: center;
  }
`;

const StyledTimeLineRowLastDiv = styled.div`
  display: flex;
  .resubmit {
    margin-bottom: 0px !important;
    margin-right: 5px !important;
    cursor: pointer;
    color: #a87e33;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const StyledPayRow = styled(Row)`
  display: flex;
  justify-content: center;
  width: 100%;
  .ant-btn {
    padding-inline: 40px !important;
  }
`;

const StyledcommentsDiv = styled.div`
  display: grid;
  .Bold {
    font-weight: bold !important;
    text-align: start;
  }
  .Light {
    text-align: start;
  }
  .ant-row {
    display: flex;
    justify-content: space-between;
  }
`;

const StyledUpload = styled(Upload)`
  width: 93% !important;
  .ant-btn {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    width: 100% !important;
    align-items: center;
    height: 35px !important;
    border-radius: 5px !important;
    margin-bottom: 20px;
  }
  .ant-input {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    width: 100% !important;
    align-items: center;
    height: 35px !important;
    border-radius: 5px !important;
    margin-bottom: 20px;
  }
  .ant-upload {
    width: 100% !important;
  }
  .ant-upload-list-item-card-actions-btn {
    display: none !important;
  }
  .ant-upload-span {
    display: none !important;
  }
  .ant-upload-list-item-error {
    display: none !important;
  }
  .ant-upload-list-item-done {
    display: none !important;
  }
  .ant-btn:hover {
    color: #000 !important;
  }
  .ant-btn:focus {
    color: #000 !important;
  }
`;

const StyledInput = styled(Input)`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  width: 100% !important;
  align-items: center;
  height: 40px !important;
  border-radius: 5px !important;
  margin-bottom: 20px;
`;

const StyledSubmitDiv = styled.div`
  display: flex;
  width: 94%;
`;

const StyledSelectDropDown = styled(Select)`
  .ant-select-selector {
    border-left: 1px solid #fff !important;
    border-right: 1px solid #fff !important;
    border-top: 1px solid #fff !important;
    border-bottom: 1px solid #d9d9d9 !important;
    width: 180px !important;
  }
`;

const StyledBoldP = styled.p`
  font-weight: bold;
  font-size: 12px;
`;

const StyledAiFillEye = styled(AiFillEye)`
  font-size: 20px;
  margin-right: 10px;
  cursor: pointer;
`;
