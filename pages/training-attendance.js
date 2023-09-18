import React, { useState } from "react";
import Head from "next/head";
import Header from "../src/components/adminLayoutHeader";
import styled from "styled-components";
import endpoints from "../src/api/index";

import { Col, Row } from "antd";

import MyCalendarComp from "../src/components/Calendar/attendance";
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import Preloader from "../public/images/Preloader.gif";
import { getCookies } from "../src/helpers/cookie";
import { R2Favicon } from "../images";
import router from "next/router";

const EditTax = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectItem, setSelectItem] = useState("training-attendance");
  const [attendanceState, setAttendanceState] = useState([]);
  const [calendarDate, setCalendarDate] = useState();

  const [
    courseTrainingVenueLMSUserWiseInitialState,
    setCourseTrainingVenueLMSUserWiseInitialState,
  ] = useState({
    RecordType: "Training",
    Language: "English",
    _srch: "",
    id: "",
  });

  const [
    CourseTrainingVenueLMSUserWiseState,
    setCourseTrainingVenueLMSUserWiseState,
  ] = useState();

  const [
    courseTrainingVenueLMSUserWiseLoadingState,
    setCourseTrainingVenueLMSUserWiseLoadingState,
  ] = useState(false);

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

  //console.log("loading", loading);

  const userDataState = useSelector((state) => state?.userDataReducer);

  //console.log("userDataState", userDataState?.authToken);

  const getFeaturedRecordFunc = async (obj, token) => {
    try {
      const response = await endpoints.DashboardGetAttendanceFunc(obj, token);
      if (response) {
        //console.log("responseAkuo", response?.data?.data);
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
  const [selectId,setSelectId]=useState('')

  useLayoutEffect(() => {
    const obj = {
      attendanceDate:
        calendarDate !== undefined ? moment(calendarDate) : moment(),
      dayMonth: "Month",
      courseTrainingLinkVenueId: selectId,
      instructorId: "",
      status: "",
      recordType: "Training",
    };
    const token = getCookies("token");
    //console.log("obj,token", obj, token);
    getFeaturedRecordFunc(obj, token);
  }, [calendarDate,courseTrainingVenueLMSUserWiseInitialState, selectId]);

  const CourseTrainingVenueLMSUserWise = async () => {
    try {
      setCourseTrainingVenueLMSUserWiseLoadingState(true);
      const response = await endpoints.CourseTrainingVenueLMSUserWise(
        authToken,
        courseTrainingVenueLMSUserWiseInitialState?.RecordType,
        courseTrainingVenueLMSUserWiseInitialState?.Language,
        courseTrainingVenueLMSUserWiseInitialState?._srch
      );
      if (response?.data?.statusCode === "200") {
        setCourseTrainingVenueLMSUserWiseState(response?.data?.data);
        setCourseTrainingVenueLMSUserWiseLoadingState(false);
      }
    } catch (err) {
      setCourseTrainingVenueLMSUserWiseLoadingState(false);
    }
  };

  useLayoutEffect(() => {
    CourseTrainingVenueLMSUserWise();
  }, [courseTrainingVenueLMSUserWiseInitialState]);

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
                      <MainHeading>Attendance</MainHeading>
                    </Col>
                  </StyledFilterRow>
                </StyledMainFilterRow>
                {/* callendar */}

                <AttendanceCalander>
                  {/* <MyCalendarComp scheduledArr={scheduledArr} /> */}
                  <MyCalendarComp
                    scheduleArr={scheduleArr}
                    setCalendarDate={setCalendarDate}
                    CourseTrainingVenueLMSUserWiseState={
                      CourseTrainingVenueLMSUserWiseState
                    }
                    setCourseTrainingVenueLMSUserWiseInitialState={
                      setCourseTrainingVenueLMSUserWiseInitialState
                    }
                    courseTrainingVenueLMSUserWiseInitialState={
                      courseTrainingVenueLMSUserWiseInitialState
                    }
                    setSelectId={setSelectId}
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
  
  .ant-picker-cell .ant-picker-cell-inner {
    z-index: 1 !important;
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
`;
const StyledMainFilterRow = styled(Row)`
  margin-inline: -4px !important;
`;
