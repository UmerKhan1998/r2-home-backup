import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../src/components/adminLayoutHeader";
import styled from "styled-components";
import { Button, Col, Empty, Modal, Row, Select } from "antd";
import Calendar from "react-calendar";
import endpoints from "../src/api";

import {
  clockSm,
  dashboardWelcome,
  RecentAchievement,
  RewardPoints,
  CoursesProgress,
  ProgramsProgress,
  TrainingsProgress,
  WebinarImg1,
  WebinarImg2,
  R2Favicon,
} from "../images";
import Image from "next/image";

import zoomLink from "../public/images/zoomLink.svg";
import Onsite from "../public/images/Onsite.svg";
import SurveryIcon from "../public/images/SurveryIcon.svg";
import AssessmentIcon from "../public/images/AssessmentIcon.svg";
import NoNotification from "../public/images/NoNotification.svg";
import Rolling from "../public/images/Rolling.gif";
import Preloader from "../public/images/Preloader.gif";
import NothingScheduled from "../public/images/NothingScheduled.svg";

import { AiOutlineRight } from "react-icons/ai";
import { getCookies, setCookies } from "../src/helpers/cookie";
import router from "next/router";
import moment from "moment";
import { FieldTimeOutlined } from "@ant-design/icons";
import CustomButton from "../src/components/Button";

const { Option } = Select;

const dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectItem, setSelectItem] = useState("dashboard");

  const authToken = getCookies("token");
  const userStatus = getCookies("userStatus");
  const [isAuthorized, setAuthorized] = useState(false);
  useLayoutEffect(() => {
    if (authToken === undefined) {
      router.push("sign-in");
    } else if (userStatus === undefined || userStatus === "false") {
      router.push("/");
    } else if (authToken || userStatus === "true") {
      setAuthorized(true);
    }
  }, []);

  const [scheduleCalendarprams, setscheduleCalendarprams] = useState({
    DayMonth: "Day",
    DT: moment(new Date()).format("YYYY-MM-DD"),
    language: "English",
  });
  const [scheduleCalendarState, setScheduleCalendarState] = useState();
  const [ScheduleCalendarValue, setScheduleCalendarValue] = useState(
    new Date()
  );

  const GetDashboardMasterScheduleFunc = async () => {
    try {
      const response = await endpoints.GetDashboardMasterSchedule(
        authToken,
        scheduleCalendarprams?.DayMonth,
        scheduleCalendarprams?.DT,
        scheduleCalendarprams?.language
      );
      if (response.data.statusCode === "200") {
        setScheduleCalendarState(response?.data?.data);
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  useLayoutEffect(() => {
    GetDashboardMasterScheduleFunc();
  }, [scheduleCalendarprams]);

  const [
    getDashboardMasterNoticeBoardState,
    setGetDashboardMasterNoticeBoardState,
  ] = useState({
    pageSize: 10,
    pageNo: 1,
    language: "English",
    search: "",
    sortBy: "",
  });
  const [getDashboardMasterNoticeBoard, setGetDashboardMasterNoticeBoard] =
    useState();
  const [getDashboardMasterState, setGetDashboardMasterState] = useState();
  const GetDashboardMasterNoticeBoard = async () => {
    try {
      const response = await endpoints.GetDashboardMasterNoticeBoard(
        authToken,
        getDashboardMasterNoticeBoardState?.pageSize,
        getDashboardMasterNoticeBoardState?.pageNo,
        getDashboardMasterNoticeBoardState?.language,
        getDashboardMasterNoticeBoardState?.search,
        getDashboardMasterNoticeBoardState?.sortBy
      );
      if (response.data.statusCode === "200") {
        setGetDashboardMasterNoticeBoard(response?.data?.data);
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  const GetDashboardMasterFunc = async () => {
    try {
      const response = await endpoints.GetDashboardMaster(authToken);
      if (response.data.statusCode === "200") {
        setGetDashboardMasterState(response?.data?.data);
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  const addNoticeBoardViewFunc = async (CourseTrainingNoticeBoardId) => {
    try {
      const response = await endpoints.AddNoticeBoardView(
        authToken,
        CourseTrainingNoticeBoardId
      );
      if (response.data.statusCode === "200") {
        GetDashboardMasterNoticeBoard();
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  const MarkAttendanceLMSUserFunc = async (
    courseTrainingLinkVenueId,
    courseTrainingRegistrationId
  ) => {
    try {
      const response = await endpoints.MarkAttendanceLMSUser(
        authToken,
        courseTrainingLinkVenueId,
        courseTrainingRegistrationId
      );
    } catch (error) {
      //console.log("error", error);
    }
  };

  useLayoutEffect(() => {
    GetDashboardMasterNoticeBoard();
    GetDashboardMasterFunc();
    setCookies("notFoundArabic", false);
  }, []);

  const getGreetingTime = (currentTime = moment()) => {
    if (!currentTime || !currentTime.isValid()) {
      return "Hello";
    }
    const splitAfternoon = 12;
    const splitEvening = 17;
    const currentHour = parseFloat(currentTime.format("HH"));
    if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
      return "Good Afternoon";
    } else if (currentHour >= splitEvening) {
      return "Good Evening";
    }
    return "Good Morning";
  };

  const [isZoomClassModalOpen, setIsZoomClassModalOpen] = useState();
  const [StartZoomTime, setStartZoomTime] = useState();
  const showAskToSubmitModal = () => {
    setIsZoomClassModalOpen(true);
  };
  const closeZoomClassModal = () => {
    setIsZoomClassModalOpen(false);
  };
  const ZoomActive = (time, duration) => {
    let Current_Utc_Date = moment.utc().local().format("DD-MM-YYYY");
    let Current_Utc_Time = moment.utc().local().format("HH:mm");
    let Given_Utc_Date = moment.utc(time).local().format("DD-MM-YYYY");
    let Given_Utc_Time = moment.utc(time).local().format("HH:mm");
    let Given_Utc_AddedTime = moment
      .utc(time)
      .local()
      .add(duration, "minutes")
      .format("HH:mm");
    if (Current_Utc_Date == Given_Utc_Date) {
      if (
        Current_Utc_Time >= Given_Utc_Time &&
        Current_Utc_Time <= Given_Utc_AddedTime
      ) {
        return true;
      } else {
        return false;
      }
    }
  };
  const chectZoomTimeOut = (dateTime, duration) => {
    let Current_Utc_Date = moment.utc();
    let Given_Utc_AddedTime = moment.utc(dateTime).add(duration, "minutes");
    if (Current_Utc_Date > Given_Utc_AddedTime) {
      return true;
    } else {
      return false;
    }
  };
  const checkType = (type) => {
    if (type === "Course") {
      return "course";
    } else if (type === "Training") {
      return "training";
    } else if (type === "Program") {
      return "program";
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
                <Col span={24} xl={14}>
                  <DashboardWelcomeDiv>
                    <div>
                      <p>
                        {getGreetingTime()},{" "}
                        {getDashboardMasterState?.userName_EN}
                      </p>
                      <h2>
                        {" "}
                        Welcome to {
                          getDashboardMasterState?.companyName_EN
                        }{" "}
                      </h2>
                    </div>
                    <div>
                      <div className="logout-time">
                        <img loading="lazy" src={clockSm} width={16} />
                        <span>
                          {" "}
                          You Logged-in at{" "}
                          {moment
                            .utc(getDashboardMasterState?.loginDateTime)
                            .local()
                            .format("h:mm a")}
                        </span>
                      </div>
                    </div>
                    <img
                      className="dashboard-welcome-img"
                      src={dashboardWelcome}
                    />
                  </DashboardWelcomeDiv>
                </Col>
                <Col span={24} sm={12} xl={5}>
                  <DashboardIconColumnCard>
                    <span className="icon">
                      <img loading="lazy" src={RecentAchievement} />
                    </span>
                    <div>
                      {/* <h2>Family Medicine II Rotation</h2> */}
                      <h2>
                        {getDashboardMasterState?.recentAchievement === "" ||
                        getDashboardMasterState?.recentAchievement === undefined
                          ? "Achievements"
                          : getDashboardMasterState?.recentAchievement}
                      </h2>
                      <p>Recent Achievement</p>
                    </div>
                  </DashboardIconColumnCard>
                </Col>
                <Col span={24} sm={12} xl={5}>
                  <DashboardIconColumnCard>
                    <span className="icon">
                      <img loading="lazy" src={RewardPoints} />
                    </span>
                    <div>
                      <h2>
                        {getDashboardMasterState?.reward === undefined ? (
                          "00"
                        ) : (
                          <>
                            {getDashboardMasterState?.reward < 10
                              ? 0 + "" + getDashboardMasterState?.reward
                              : getDashboardMasterState?.reward}
                          </>
                        )}
                      </h2>
                      <p>Reward Points</p>
                    </div>
                  </DashboardIconColumnCard>
                </Col>
                <Col span={24} sm={8}>
                  <DashboardIconRowCard>
                    <div>
                      <h2>
                        {getDashboardMasterState?.courseInprogress ===
                        undefined ? (
                          "00"
                        ) : (
                          <>
                            {getDashboardMasterState?.courseInprogress < 10
                              ? 0 +
                                "" +
                                getDashboardMasterState?.courseInprogress
                              : getDashboardMasterState?.courseInprogress}
                          </>
                        )}
                      </h2>
                      <p>Courses in Progress</p>
                    </div>
                    <span className="icon">
                      <img loading="lazy" src={CoursesProgress} />
                    </span>
                  </DashboardIconRowCard>
                </Col>
                <Col span={24} sm={8}>
                  <DashboardIconRowCard>
                    <div>
                      <h2>
                        {getDashboardMasterState?.programInprogress ===
                        undefined ? (
                          "00"
                        ) : (
                          <>
                            {getDashboardMasterState?.programInprogress < 10
                              ? 0 +
                                "" +
                                getDashboardMasterState?.programInprogress
                              : getDashboardMasterState?.programInprogress}
                          </>
                        )}
                      </h2>
                      <p>Programs in Progress</p>
                    </div>
                    <span className="icon">
                      <img loading="lazy" src={ProgramsProgress} />
                    </span>
                  </DashboardIconRowCard>
                </Col>
                <Col span={24} sm={8}>
                  <DashboardIconRowCard>
                    <div>
                      <h2>
                        {getDashboardMasterState?.trainingInprogress ===
                        undefined ? (
                          "00"
                        ) : (
                          <>
                            {getDashboardMasterState?.trainingInprogress < 10
                              ? 0 +
                                "" +
                                getDashboardMasterState?.trainingInprogress
                              : getDashboardMasterState?.trainingInprogress}
                          </>
                        )}
                      </h2>
                      <p>Trainings in Progress</p>
                    </div>
                    <span className="icon">
                      <img loading="lazy" src={TrainingsProgress} />
                    </span>
                  </DashboardIconRowCard>
                </Col>
                <Col span={24} lg={13}>
                  <Noticeboard>
                    <div className="noticeboard-header">
                      <h2>Noticeboard</h2>
                      <StyledSelect className="sort-by" defaultValue="Sort by">
                        <Option>Recent</Option>
                      </StyledSelect>
                    </div>
                    <div className="noticeboard-list">
                      {getDashboardMasterNoticeBoard?.dashboardMasterNoticeBoardListViewModels.map(
                        (item, index) => (
                          <div
                            className={`noticeboard-list-item ${
                              item?.viewed ? "new" : ""
                            }`}
                            key={index}
                          >
                            <div className="noticeboard-list-item-left">
                              <h2
                                onClick={() => {
                                  addNoticeBoardViewFunc(item?.id);
                                }}
                              >
                                <span>{item?.title_EN}</span>
                                {item?.viewed && (
                                  <span className="noticeboard-status">
                                    New
                                  </span>
                                )}
                              </h2>
                              <p>
                                {item?.courseTrainingTitle_EN} |{" "}
                                {moment
                                  .utc(item?.insertDate)
                                  .local()
                                  .format("MMMM DD, YYYY h:mm:ssa")}
                                {/* {moment()
                                  .add(item?.insertDate, "days")
                                  .calendar()} */}
                              </p>
                            </div>
                            <div>
                              {item?.recordType === "" ? (
                                ""
                              ) : (
                                <span
                                  className="noticeboard-category"
                                  style={{ backgroundColor: "#FFEBD9" }}
                                >
                                  {" "}
                                  {item?.recordType}{" "}
                                </span>
                              )}
                            </div>
                          </div>
                        )
                      )}
                      {getDashboardMasterNoticeBoard?.dashboardMasterNoticeBoardListViewModels ===
                        undefined && (
                        <>
                          <div className="dataLoader">
                            <img
                              loading="lazy"
                              alt={""}
                              src={Rolling}
                              width="40px"
                              height="40px"
                            />
                          </div>
                        </>
                      )}
                      {getDashboardMasterNoticeBoard
                        ?.dashboardMasterNoticeBoardListViewModels.length ===
                        0 && (
                        <>
                          <EmptyData style={{ marginTop: "30px" }}>
                            <Image
                              loading="lazy"
                              alt={""}
                              src={NoNotification}
                              width={40}
                              height={40}
                            />
                            <p>No Noticeboard Data</p>
                          </EmptyData>
                        </>
                      )}
                    </div>
                    <>
                      {/* <div className="noticeboard-list">
                        <div className="noticeboard-list-item new">
                          <div className="noticeboard-list-item-left">
                            <h2>
                              <span>New Year Sales Festival</span>
                              <span className="noticeboard-status">New</span>
                            </h2>
                            <p>Anesthesiology | 12 Jul 2021 | 19:26</p>
                          </div>
                          <div>
                            <span
                              className="noticeboard-category"
                              style={{ backgroundColor: "#FFEBD9" }}
                            >
                              Training
                            </span>
                          </div>
                        </div>
                        <div className="noticeboard-list-item new">
                          <div className="noticeboard-list-item-left">
                            <h2>
                              <span>New Course Available</span>
                              <span className="noticeboard-status">New</span>
                            </h2>
                            <p>Anesthesiology | 12 Jul 2021 | 19:26</p>
                          </div>
                          <div>
                            <span
                              className="noticeboard-category"
                              style={{ backgroundColor: "#EDFFCF" }}
                            >
                              Program
                            </span>
                          </div>
                        </div>
                        <div className="noticeboard-list-item">
                          <div className="noticeboard-list-item-left">
                            <h2>
                              <span>New Course Available</span>
                            </h2>
                            <p>Anesthesiology | 12 Jul 2021 | 19:26</p>
                          </div>
                          <div>
                            <span
                              className="noticeboard-category"
                              style={{ backgroundColor: "#CFEEFF" }}
                            >
                              Webinar
                            </span>
                          </div>
                        </div>
                        <div className="noticeboard-list-item">
                          <div className="noticeboard-list-item-left">
                            <h2>
                              <span>New Course Available</span>
                            </h2>
                            <p>Anesthesiology | 12 Jul 2021 | 19:26</p>
                          </div>
                          <div>
                            <span
                              className="noticeboard-category"
                              style={{ backgroundColor: "#CFEEFF" }}
                            >
                              Conference
                            </span>
                          </div>
                        </div>
                        <div className="noticeboard-list-item">
                          <div className="noticeboard-list-item-left">
                            <h2>
                              <span>New Course Available</span>
                            </h2>
                            <p>Anesthesiology | 12 Jul 2021 | 19:26</p>
                          </div>
                          <div>
                            <span
                              className="noticeboard-category"
                              style={{ backgroundColor: "#CFEEFF" }}
                            >
                              Conference
                            </span>
                          </div>
                        </div>
                      </div> */}
                    </>
                  </Noticeboard>
                </Col>
                <Col span={24} lg={11}>
                  <ScheduleCalendar>
                    <StyledScheduleCalendar
                      onChange={(e) => {
                        setscheduleCalendarprams({
                          ...scheduleCalendarprams,
                          DT: moment(e).format("YYYY-MM-DD"),
                        });
                        setScheduleCalendarValue(e);
                      }}
                      value={ScheduleCalendarValue}
                    />
                    <div className="todayschedule">
                      <h1>Today’s Schedule</h1>
                      {scheduleCalendarState?.length === 0 && (
                        <EmptySchedule>
                          <img
                            loading="lazy"
                            alt={""}
                            src={NothingScheduled.src}
                            width={40}
                            height={40}
                          />
                          <p>
                            You have nothing scheduled for today, <br /> Looks
                            like you are free
                          </p>
                        </EmptySchedule>
                      )}
                      <Row gutter={10}>
                        {scheduleCalendarState?.map((item, index) => (
                          <>
                            {index <= 2 && (
                              <Col span={24} lg={24} md={12}>
                                {item?.venueType === "Online" && (
                                  <>
                                    {ZoomActive(
                                      item?.venueDateTime,
                                      item?.duration_EN
                                    ) ? (
                                      <StyledCourseScheduledDiv
                                        onClick={() => {
                                          MarkAttendanceLMSUserFunc(
                                            item?.couseTrainingVenueId,
                                            item?.courseTrainingRegistrationId
                                          );
                                          window.open(
                                            item?.zoomJoinLink,
                                            "_blank"
                                          );
                                        }}
                                      >
                                        <StyledCourseScheduledInnerDiv>
                                          <div className="schedule-info">
                                            <div className="schedule-icon">
                                              <img
                                                loading="lazy"
                                                src={WebinarImg1}
                                              />
                                            </div>
                                            <div className="schedule-txt">
                                              <h2>{item?.venueName_EN}</h2>
                                              <p>
                                                {item?.venueLocation_EN} - Due
                                                date:{" "}
                                                {moment
                                                  .utc(item?.dueDate)
                                                  .local()
                                                  ?.format("YYYY-MM-DD")}{" "}
                                                |{" "}
                                                {moment
                                                  .utc(item?.dueDate)
                                                  .local()
                                                  .format("LT")}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="schedule-link">
                                            <ContentCenter>
                                              <div class="pulse active">
                                                <img
                                                  src={zoomLink?.src}
                                                  width="22px"
                                                />
                                              </div>
                                            </ContentCenter>
                                          </div>
                                        </StyledCourseScheduledInnerDiv>
                                      </StyledCourseScheduledDiv>
                                    ) : (
                                      <>
                                        {chectZoomTimeOut(
                                          item?.venueDateTime,
                                          item?.duration_EN
                                        ) ? (
                                          <StyledCourseScheduledDiv className="disabled">
                                            <StyledCourseScheduledInnerDiv>
                                              <div className="schedule-info">
                                                <div className="schedule-icon">
                                                  <img
                                                    loading="lazy"
                                                    src={WebinarImg1}
                                                  />
                                                </div>
                                                <div className="schedule-txt">
                                                  <h2>{item?.venueName_EN}</h2>
                                                  <p>
                                                    {item?.venueLocation_EN} -{" "}
                                                    Due date:{" "}
                                                    {moment
                                                      .utc(item?.dueDate)
                                                      .local()
                                                      ?.format(
                                                        "YYYY-MM-DD"
                                                      )}{" "}
                                                    |{" "}
                                                    {moment
                                                      .utc(item?.dueDate)
                                                      .local()
                                                      .format("LT")}
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="schedule-link">
                                                <img
                                                  src={zoomLink?.src}
                                                  width="22px"
                                                />
                                              </div>
                                            </StyledCourseScheduledInnerDiv>
                                          </StyledCourseScheduledDiv>
                                        ) : (
                                          <StyledCourseScheduledDiv
                                            onClick={() => {
                                              showAskToSubmitModal();
                                              setStartZoomTime(
                                                item?.venueDateTime
                                              );
                                            }}
                                          >
                                            <StyledCourseScheduledInnerDiv>
                                              <div className="schedule-info">
                                                <div className="schedule-icon">
                                                  <img
                                                    loading="lazy"
                                                    src={WebinarImg1}
                                                  />
                                                </div>
                                                <div className="schedule-txt">
                                                  <h2>{item?.venueName_EN}</h2>
                                                  <p>
                                                    {item?.venueLocation_EN} -{" "}
                                                    Due date:{" "}
                                                    {moment
                                                      .utc(item?.dueDate)
                                                      .local()
                                                      ?.format(
                                                        "YYYY-MM-DD"
                                                      )}{" "}
                                                    |{" "}
                                                    {moment
                                                      .utc(item?.dueDate)
                                                      .local()
                                                      .format("LT")}
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="schedule-link">
                                                <img
                                                  src={zoomLink?.src}
                                                  width="22px"
                                                />
                                              </div>
                                            </StyledCourseScheduledInnerDiv>
                                          </StyledCourseScheduledDiv>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                                {item?.venueType === "Onsite" && (
                                  <StyledCourseScheduledDiv>
                                    <StyledCourseScheduledInnerDiv>
                                      <div className="schedule-info">
                                        <div className="schedule-icon">
                                          <img
                                            loading="lazy"
                                            src={WebinarImg1}
                                          />
                                        </div>
                                        <div className="schedule-txt">
                                          <h2>{item?.venueName_EN}</h2>
                                          <p>
                                            {item?.venueLocation_EN} - Due date:{" "}
                                            {moment
                                              .utc(item?.dueDate)
                                              .local()
                                              ?.format("YYYY-MM-DD")}{" "}
                                            |{" "}
                                            {moment
                                              .utc(item?.dueDate)
                                              .local()
                                              .format("LT")}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="schedule-link">
                                        <img
                                          loading="lazy"
                                          src={Onsite?.src}
                                          width="22px"
                                        />
                                      </div>
                                    </StyledCourseScheduledInnerDiv>
                                  </StyledCourseScheduledDiv>
                                )}
                                {item?.venueType === "Assessment" && (
                                  <>
                                    {item?.subCategory === "Synchronous" && (
                                      <StyledCourseScheduledDiv
                                        onClick={() => {
                                          setCookies(
                                            "courseTrainingRegistrationId",
                                            item?.courseTrainingRegistrationId
                                          );
                                          router.push(
                                            `/${checkType(
                                              item?.recordType
                                            )}-assessments/${
                                              item?.couseTrainingFileId
                                            }`
                                          );
                                        }}
                                      >
                                        <StyledCourseScheduledInnerDiv>
                                          <div className="schedule-info">
                                            <div className="schedule-icon">
                                              <img
                                                loading="lazy"
                                                src={AssessmentIcon.src}
                                              />
                                            </div>
                                            <div className="schedule-txt">
                                              <h2>{item?.venueName_EN}</h2>
                                              <p>
                                                {item?.venueLocation_EN} - Due
                                                date:{" "}
                                                {moment
                                                  .utc(item?.dueDate)
                                                  .local()
                                                  ?.format("YYYY-MM-DD")}{" "}
                                                |{" "}
                                                {moment
                                                  .utc(item?.dueDate)
                                                  .local()
                                                  .format("LT")}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="schedule-link"></div>
                                        </StyledCourseScheduledInnerDiv>
                                      </StyledCourseScheduledDiv>
                                    )}
                                    {item?.subCategory === "Asynchronous" && (
                                      <StyledCourseScheduledDiv
                                        onClick={() => {
                                          setCookies(
                                            "courseTrainingRegistrationId",
                                            item?.courseTrainingRegistrationId
                                          );
                                          router.push(
                                            `/${checkType(
                                              item?.recordType
                                            )}-assessments/${
                                              item?.couseTrainingFileId
                                            }`
                                          );
                                        }}
                                      >
                                        <StyledCourseScheduledInnerDiv>
                                          <div className="schedule-info">
                                            <div className="schedule-icon">
                                              <img
                                                loading="lazy"
                                                src={AssessmentIcon.src}
                                              />
                                            </div>
                                            <div className="schedule-txt">
                                              <h2>{item?.venueName_EN}</h2>
                                              <p>{item?.venueLocation_EN}</p>
                                            </div>
                                          </div>
                                          <div className="schedule-link"></div>
                                        </StyledCourseScheduledInnerDiv>
                                      </StyledCourseScheduledDiv>
                                    )}
                                  </>
                                )}
                                {item?.venueType === "Survey" && (
                                  <>
                                    {item?.viewed ? (
                                      <StyledCourseScheduledDiv
                                        style={{
                                          opacity: "0.5",
                                          cursor: "not-allowed",
                                        }}
                                      >
                                        <StyledCourseScheduledInnerDiv>
                                          <div className="schedule-info">
                                            <div className="schedule-icon">
                                              <img
                                                loading="lazy"
                                                src={SurveryIcon.src}
                                              />
                                            </div>
                                            <div className="schedule-txt">
                                              <h2>{item?.venueName_EN}</h2>
                                              <p>{item?.venueLocation_EN}</p>
                                            </div>
                                          </div>
                                          <div className="schedule-link"></div>
                                        </StyledCourseScheduledInnerDiv>
                                      </StyledCourseScheduledDiv>
                                    ) : (
                                      <StyledCourseScheduledDiv
                                        onClick={() => {
                                          setCookies(
                                            "courseTrainingRegistrationId",
                                            item?.courseTrainingRegistrationId
                                          );
                                          router.push(
                                            `/${checkType(
                                              item?.recordType
                                            )}-surveys/${
                                              item?.couseTrainingFileId
                                            }`
                                          );
                                        }}
                                      >
                                        <StyledCourseScheduledInnerDiv>
                                          <div className="schedule-info">
                                            <div className="schedule-icon">
                                              <img
                                                loading="lazy"
                                                src={SurveryIcon.src}
                                              />
                                            </div>
                                            <div className="schedule-txt">
                                              <h2>{item?.venueName_EN}</h2>
                                              <p>{item?.venueLocation_EN}</p>
                                            </div>
                                          </div>
                                          <div className="schedule-link"></div>
                                        </StyledCourseScheduledInnerDiv>
                                      </StyledCourseScheduledDiv>
                                    )}
                                  </>
                                )}
                              </Col>
                            )}
                          </>
                        ))}
                      </Row>
                      <StyledViewAllDiv>
                        {scheduleCalendarState?.length >= 2 && (
                          <StyledViewScheduledButton1>
                            <Link href="my-schedule">View All</Link>
                            <AiOutlineRight style={{ fontSize: "10px" }} />
                          </StyledViewScheduledButton1>
                        )}
                      </StyledViewAllDiv>
                    </div>
                  </ScheduleCalendar>
                </Col>
              </Row>
              <StyledModal
                title={``}
                open={isZoomClassModalOpen}
                onOk={closeZoomClassModal}
                onCancel={closeZoomClassModal}
                width={480}
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
                    Your zoom class will start at <br />{" "}
                    <span style={{ fontWeight: "700" }}>
                      {moment
                        .utc(StartZoomTime)
                        .local()
                        .format("YYYY-MM-DD, LT")}
                    </span>
                  </p>
                  <CustomButton
                    onClick={() => {
                      closeZoomClassModal();
                    }}
                    customStyle={{
                      height: "35px",
                      backgroundColor: "#105f43",
                      color: "#fff",
                      borderColor: "#105f43",
                      paddingInline: "35px",
                      marginLeft: "10px",
                    }}
                  >
                    {" "}
                    OK{" "}
                  </CustomButton>
                </div>
              </StyledModal>
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

const DashboardWelcomeDiv = styled.div`
  position: relative;
  overflow: hidden;
  height: 200px;
  padding: 35px 30px;
  background: #105f43;
  border-radius: 8px;
  color: #fff;

  p {
    font-size: 12px;
    margin-bottom: 10px;
    font-family: "TitilliumLight";
  }
  h2 {
    display: block;
    width: 225px;
    font-size: 20px;
    color: #fff;
    line-height: 28px;
    font-family: "TitilliumSemiBold";
  }
  .logout-time {
    position: absolute;
    left: 0;
    bottom: 20px;
    width: 70%;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 5px 0 5px 30px;
    font-size: 11px;
    background: rgba(255, 255, 255, 0.1);
    z-index: 1;
  }
  .dashboard-welcome-img {
    position: absolute;
    bottom: 0;
    right: 10%;
    width: 225px;
    z-index: 2;
  }

  @media screen and (max-width: 600px) {
    height: auto;
    padding-bottom: 190px;

    .dashboard-welcome-img {
      right: 50%;
      transform: translateX(50%);
    }
    .logout-time {
      position: relative;
      width: 500%;
      margin-top: 30px;
      padding-left: 100%;
      margin-left: -100%;
    }

    h2 {
      width: 80%;
    }
  }
`;
const DashboardIconColumnCard = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  border-radius: 8px;
  background: #fff;
  font-family: "TitilliumNormal";

  .icon {
    width: 60px;
  }
  .icon img {
    width: 100%;
  }
  h2 {
    color: #105f43;
    font-size: 18px;
    line-height: 22px;
    // font-weight: 700;
    margin-bottom: 3px;
    font-family: "TitilliumBold";
  }
  p {
    margin-bottom: 0;
    font-size: 12px;
    font-family: "TitilliumSemiBold";
  }

  @media screen and (max-width: 1200px) {
    align-items: center;
    height: unset;
    flex-direction: row-reverse;
  }
`;
const DashboardIconRowCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-radius: 8px;
  background: #fff;
  font-family: "TitilliumNormal";

  .icon {
    width: 55px;
  }
  .icon img {
    width: 100%;
  }
  h2 {
    color: #105f43;
    font-size: 22px;
    line-height: 25px;
    color: #105f43;
    margin-bottom: 2px;
    font-family: "TitilliumBold";
  }
  p {
    margin-bottom: 0;
    font-size: 12px;
    color: #000;
    font-family: "TitilliumSemiBold";
  }
`;
const Noticeboard = styled.div`
  height: 100%;
  padding: 15px;
  background: #fff;
  border-radius: 8px;
  font-family: "TitilliumNormal";

  .noticeboard-header {
    display: flex;
    justify-content: space-between;
  }
  .noticeboard-header h2 {
    font-size: 18px;
    color: #030303;
    font-family: "TitilliumBold";
  }
  .sort-by {
    width: 90px !important;
  }
  .sort-by .ant-select-selector {
    background: #f3f3f3;
    border: 0;
    border-radius: 8px;
    color: #000;
    font-size: 12px;
  }
  .sort-by .ant-select-selection-item {
    color: #000;
  }
  .sort-by .ant-select-selector {
    box-shadow: none !important;
  }

  .noticeboard-list {
    position: relative;
    padding-top: 5px;
  }
  .noticeboard-list .noticeboard-list-item {
    position: relative;
    padding: 20px 0px 10px 20px;
    display: flex;
    justify-content: space-between;
  }
  .noticeboard-list .noticeboard-list-item:not(:last-child) {
    border-bottom: 1px solid #e8e8e8;
  }
  .noticeboard-list .noticeboard-list-item::before {
    content: "";
    position: absolute;
    top: 28px;
    left: 2px;
    width: 8px;
    height: 8px;
    background: #105f43;
  }
  .noticeboard-list-item-left {
    width: 60%;
  }
  .noticeboard-list-item-left h2 {
    font-size: 15px;
    margin-bottom: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: "TitilliumSemiBold";
    cursor: pointer;

    span:first-child {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .noticeboard-list-item.new .noticeboard-list-item-left h2 {
    font-family: "TitilliumBold";
  }
  .noticeboard-list-item-left h2 .noticeboard-status {
    width: 50px;
    height: 22px;
    line-height: 22px;
    background: #ff7474;
    font-size: 10px;
    font-family: "TitilliumSemiBold";
    color: #fff;
    border-radius: 4px;
    text-align: center;
  }
  .noticeboard-list-item-left p {
    font-size: 12px;
    color: #707070;
  }
  .noticeboard-list .noticeboard-category {
    width: 90px;
    padding: 5px 0;
    border-radius: 4px;
    text-align: center;
    display: inline-block;
    font-size: 13px;
  }

  @media screen and (max-width: 1200px) {
    .noticeboard-header h2 {
      font-size: 16px;
    }
    .noticeboard-list-item-left h2 {
      font-size: 14px;
    }
    .noticeboard-list-item-left h2 .noticeboard-status {
      width: 48px;
      height: 20px;
      line-height: 20px;
    }
  }
`;
const ScheduleCalendar = styled.div`
  height: 100%;
  padding: 15px;
  border-radius: 8px;
  background: #fff;
  font-family: "TitilliumNormal";

  .react-calendar__navigation {
    margin-bottom: 20px !important;

    .react-calendar__navigation__label {
      text-align: left;
      font-size: 18px;
      font-family: "TitilliumBold";
    }

    .react-calendar__navigation__prev-button {
      order: 1;
      font-size: 18px;
      line-height: 0;
    }
    .react-calendar__navigation__next-button {
      order: 2;
      font-size: 18px;
      line-height: 0;
      margin-left: 5px;
    }
  }

  .react-calendar__month-view__weekdays__weekday {
    text-transform: capitalize;
    font-size: 14px;
    color: #105f43;
    font-family: "TitilliumBold";
  }

  .todayschedule {
    padding-top: 10px;
    margin-top: 10px;
    border-top: 1px solid #dadada;
  }
  .todayschedule h1 {
    font-size: 18px;
    // font-weight: 600;
    color: #030303;
    margin-bottom: 12px;
    font-family: "TitilliumBold";
  }
  .todayschedule .todayschedule-items {
    display: flex;
    gap: 20px;
  }
  .todayschedule .todayschedule-item {
    width: 50%;
    background: #f9f9f9;
    padding: 10px 20px;
  }

  @media screen and (max-width: 1200px) {
    .react-calendar__navigation {
      .react-calendar__navigation__label {
        font-size: 16px;
      }

      .react-calendar__navigation__prev-button {
        font-size: 16px;
      }
      .react-calendar__navigation__next-button {
        font-size: 16px;
      }
    }
  }
`;
const StyledScheduleCalendar = styled(Calendar)`
  border: none;
  width: 100%;
  abbr[title] {
    text-decoration: none;
  }
  .react-calendar__navigation {
    padding-top: 0;
  }
  .react-calendar__viewContainer {
    padding-inline: 0 !important;
  }
  .react-calendar__navigation {
    height: 20px;
  }
  .react-calendar__navigation button {
    min-width: 20px;
  }

  .react-calendar__navigation .react-calendar__navigation__prev-button:hover,
  .react-calendar__navigation .react-calendar__navigation__prev-button:focus,
  .react-calendar__navigation .react-calendar__navigation__next-button:hover,
  .react-calendar__navigation .react-calendar__navigation__next-button:focus {
    background-color: #f0f0f0 !important;
  }

  .react-calendar__navigation .react-calendar__navigation__prev-button {
    background: #f0f0f0;
  }
  .react-calendar__navigation .react-calendar__navigation__next-button {
    background: #f0f0f0;
  }
  .react-calendar__tile--now {
    background: #105f438c;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #105f4373;
  }
`;
const StyledCourseScheduledDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 10px;
  background: #f9f9f9;
  border-radius: 4px;
  cursor: pointer;

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
const StyledCourseScheduledInnerDiv = styled.div`
  width: 100%;
  display: flex;

  .schedule-info {
    display: flex;
    flex: 1;

    .schedule-icon img {
      margin-right: 10px;
    }
    .schedule-txt {
      flex: 1;
    }
  }
  .schedule-link {
    a {
      position: relative;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
      border-radius: 100%;
      line-height: 0;
      background: #eef6f4;
      color: #105f43;
      border: 1px solid #72a794;
    }
  }

  h2 {
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 2px;
    font-family: "TitilliumBold";
  }
  p {
    margin-bottom: 0px;
    font-size: 11px;
    font-family: "TitilliumSemiBold";
    color: #707070;
  }
`;
const StyledViewScheduledButton = styled(Button)`
  color: #105f43;
  background: #fff;
  border: 1px solid #105f43;
  background: #f9f9f9 !important;
  padding-inline: 8px;
  margin-left: auto;
  height: 25px;
  font-size: 12px;
  display: flex;
  align-items: center;
  border-radius: 4px;

  a {
    color: inherit;
  }

  &:hover {
    color: #105f43 !important;
  }
  &:focus {
    color: #105f43 !important;
  }
`;
const EmptySchedule = styled.div`
  position: relative;
  padding: 20px 30px;
  text-align: center;

  p {
    font-size: 14px;
    color: #a6a6a6;
    margin: 10px 0 0 0;
    font-family: "TitilliumNormal";
  }
`;
const StyledViewAllDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;
`;
const StyledViewScheduledButton1 = styled(Button)`
  p {
    color: #105f43 !important;
  }
  background: #eef7f4;
  border-radius: 4px;
  border: none !important;
  background: #eef6f4 !important;
  padding-inline: 18px 14px;
  height: 27px;
  display: flex;
  align-items: center;

  a {
    color: #105f43;
    font-size: 12px;
    font-weight: 600;
    margin-right: 4px;
  }

  svg {
    color: #105f43 !important;
  }

  &:hover {
    color: #105f43 !important;
  }
  &:focus {
    color: #105f43 !important;
  }
`;
const StyledSelect = styled(Select)`
  width: 100% !important;
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

  @media screen and (max-width: 1200px) {
    .ant-select-selection-item {
      font-size: 12px;
    }
  }
`;
const EmptyData = styled.div`
  position: relative;
  padding: 20px 30px;
  text-align: center;

  p {
    font-size: 14px;
    color: #a6a6a6;
    margin: 10px 0 0 0;
    font-family: "TitilliumNormal";
  }
`;
const ContentCenter = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  .pulse.active {
    height: 22px;
    width: 22px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .pulse.active::before {
    content: "";
    position: absolute;
    border: 1px solid #4a8cffd6;
    width: calc(100% + 10px);
    height: calc(100% + 10px);
    border-radius: 50%;
    animation: pulse 1s linear infinite;
  }

  .pulse.active::after {
    content: "";
    position: absolute;
    border: 1px solid #4a8cffd6;
    width: calc(100% + 10px);
    height: calc(100% + 10px);
    border-radius: 50%;
    animation: pulse 1s linear infinite;
    animation-delay: 0.3s;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.5);
      opacity: 0;
    }
    50% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(1.3);
      opacity: 0;
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
