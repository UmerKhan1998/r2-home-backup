import React, { useState, useLayoutEffect } from "react";
import Head from "next/head";
import Header from "../src/components/adminLayoutHeader";
import styled from "styled-components";
import endpoints from "../src/api/index";

import { Col, Row } from "antd";

import MyCalendarComp from "../src/components/Calendar";
import moment from "moment";
import Preloader from "../public/images/Preloader.gif";
import { getCookies } from "../src/helpers/cookie";
import { R2Favicon } from "../images";
import router from "next/router";

const EditTax = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectItem, setSelectItem] = useState("dashboard");
  const [attendanceState, setAttendanceState] = useState([]);

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

  const [dateStringState, setDateStringState] = useState(
    moment().format("YYYY-MM-DD")
  );

  // //console.log("attendanceState", attendanceState);

  const scheduleArr = [];
  attendanceState?.map((item, index) => {
    const obj = {
      title: item?.status,
      date: moment(item?.attendanceDate)?.format("YYYY-MM-DD"),
      display: "background",
      color: item?.status === "Present" ? "#C3EDD2" : "#FFD2C4",
    };
    scheduleArr.push(obj);
  });

  const [loading, setLoading] = useState(false);

  const getFeaturedRecordFunc = async (obj, token) => {
    try {
      const response = await endpoints.DashboardGetAttendanceFunc(obj, token);
      if (response) {
        // //console.log("responseAkuo", response?.data?.data);
        setAttendanceState(response?.data?.data);
      }
      // setTotalPaginationRecord(response?.data?.data?.totalRecord)
      // setDataState(response?.data?.data?.taxListViewModels)
      // setGetTaxState(response?.data?.data)
      setLoading(true);
    } catch (err) {
      setLoading(false);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 12000);
    }
  };

  useLayoutEffect(() => {
    const obj = {
      attendanceDate: moment(),
      dayMonth: "Month",
      courseTrainingLinkVenueId: "",
      instructorId: "",
      status: "",
    };
    const token = getCookies("token");
    // //console.log("obj,token", obj, token);
    getFeaturedRecordFunc(obj, token);
  }, []);

  const [scheduleCalendarState, setScheduleCalendarState] = useState();

  // //console.log("scheduleCalendarState", scheduleCalendarState);

  const GetDashboardMasterScheduleFunc = async () => {
    try {
      const response = await endpoints.GetDashboardMasterSchedule(
        authToken,
        "Month",
        dateStringState,
        "English"
      );
      if (response.data.statusCode === "200") {
        // //console.log("scheduleCalendarStateResponse", response?.data?.data);
        setScheduleCalendarState(response?.data?.data);
      }
    } catch (error) {
      //console.log("error", error);
    } finally {
      // setTimeout(() => setLoading(false), 1200);
    }
  };

  useLayoutEffect(() => {
    GetDashboardMasterScheduleFunc();
  }, [dateStringState]);

  const scheduleArrDya = [];
  scheduleCalendarState?.map((item, index) => {
    const obj = {
      title: item?.courseTrainingTitle,
      date: new Date(moment(item?.venueDateTime)?.format("YYYY, MM, DD")),
      // display: "background",
      // color: item?.status === "Present" ? "#C3EDD2" : "#FFD2C4",
    };
    scheduleArrDya.push(obj);
  });

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
                <StyledMainFilterRow gutter={[24, 24]}>
                  <StyledFilterRow gutter={[16, 16]}>
                    <Col span={24}>
                      <MainHeading>My Schedule</MainHeading>
                    </Col>
                  </StyledFilterRow>
                </StyledMainFilterRow>
                {/* callendar */}

                <AttendanceCalander>
                  {/* <MyCalendarComp scheduledArr={scheduledArr} /> */}
                  {/* {//console.log("scheduleArrDya", scheduleArrDya)} */}
                  <MyCalendarComp
                    scheduleArr={scheduleCalendarState}
                    dateStringState={dateStringState}
                    setDateStringState={setDateStringState}
                  />
                </AttendanceCalander>
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
const AttendanceCalander = styled.div`
  position: relative;
  padding: 10px;
  background: #fff;
  border-radius: 10px;
  margin-top: 20px;

  .fc-dayGridMonth-view.fc-view.fc-daygrid {
    overflow: auto;

    ::-webkit-scrollbar {
      height: 2px;
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
    }

    .fc-scrollgrid.fc-scrollgrid-liquid {
      min-width: 800px;
    }
  }

  .fc-view-harness.fc-view-harness-active {
    height: unset !important;
  }

  .fc-dayGridMonth-view.fc-view.fc-daygrid {
    position: relative !important;
  }

  .fc-scroller.fc-scroller-liquid-absolute {
    position: relative !important;
  }
  .fc-daygrid-day-events {
    display: flex !important;
    flex-direction: column-reverse !important;
  }
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
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border: 1px solid #bcbcbc !important;
  }
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    display: flex !important;
    align-items: center !important;
    border-radius: 7px !important;
  }
  .ant-picker-cell {
    z-index: 1 !important;
  }
`;
const StyledMainFilterRow = styled(Row)`
  margin-inline: -4px !important;
`;
