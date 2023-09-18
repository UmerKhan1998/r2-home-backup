import React, { useState } from "react";

import { Badge, Calendar, Modal } from "antd";
import styled from "styled-components";
import ScheduledCards from "../../../components/rtl/Cards/ScheduledCards";
import moment from "moment";
import { LOCATION, Name, Time, Type, Venue, course, view_more } from "../../../helpers/LanguageConstant";
import { DATE } from "../../../helpers/LanguageConstant";

import { AssessmentIcon, SurveryIcon, WebinarImg1, WebinarImg2 } from "../../../../images";
import zoomLink from "../../../../public/images/zoomLink.svg";
import Link from "next/link";
import router from "next/router";
import { getCookies, setCookies } from "../../../helpers/cookie";
import endpoints from '../../../api/index';

const authToken = getCookies("token");

const getListData = (dateString, data) => {
  let listData = [];
  // //console.log("dateString", dateString);

  data?.forEach(function (value, index) {
    const date1 = new Date(value.venueDateTime);
    const isoString = date1.toLocaleDateString();
    const date2 = new Date(dateString);
    const isoString2 = date2.toLocaleDateString();
    // //console.log("value", value);
    // //console.log("aliala", isoString, isoString2);
    if (isoString == isoString2) {
      listData.push({
        type:
          (value.recordType == "Course" && "green") ||
          (value.recordType == "Webinar" && "gold") ||
          (value.recordType == "Symposiums" && "geekblue") ||
          (value.recordType == "Conference" && "cyan") ||
          (value.recordType == "Training" && "pink") ||
          (value.recordType == "Program" && "volcano") ||
          (value.recordType == "Workshop" && "lime"),
          content: value.venueName_EN,
          venueType: value.venueType,
          location: value.venueLocation_EN,
          title: value.courseTrainingTitle_EN,
          recordType: value.recordType,
          venueDateTime: value?.venueDateTime,
          couseTrainingFileId: value?.couseTrainingFileId,
          duration_EN: value?.duration_EN,
          zoomJoinLink: value?.zoomJoinLink,
          courseTrainingRegistrationId: value?.courseTrainingRegistrationId,
          couseTrainingVenueId: value?.couseTrainingVenueId,
          viewed: value?.viewed,
        });
    }
  });
  return listData || [];
};

const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const CalendarComp = ({ scheduleArr, dateStringState, setDateStringState }) => {
  const [dates, setDates] = useState([]);

  // //console.log("dateStringState", dateStringState);

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value) => {
    // //console.log("value_ddd", value._d);
    const [viewMoreModal, setViewMoreModal] = useState(false);
    const listData = getListData(value._d, scheduleArr);
    const handleOk = () => {
      setViewMoreModal(false);
    };
    const handleCancel = () => {
      setViewMoreModal(false);
    };

    // //console.log(
    //   'moment("Tue Feb 07 2023 07:06:43 GMT+0000").format("dd")',
    //   parseInt(moment("Tue Feb 07 2023 07:06:43 GMT+0000").format("mm"))
    // );
    const ZoomActive = (time, duration) => {
      let Current_Utc_Date = moment.utc().local().format('DD-MM-YYYY');
      let Current_Utc_Time = moment.utc().local().format('HH:mm');
      let Given_Utc_Date = moment.utc(time).local().format('DD-MM-YYYY')
      let Given_Utc_Time = moment.utc(time).local().format('HH:mm')
      let Given_Utc_AddedTime = moment.utc(time).local().add(duration, 'minutes').format('HH:mm');

      
      if (Current_Utc_Date == Given_Utc_Date) {
        if (Current_Utc_Time >= Given_Utc_Time && Current_Utc_Time <= Given_Utc_AddedTime) {
          return true
        } else {
          return false
        }
      }
    }

    const chectZoomTimeOut = (dateTime, duration) => {
      let Current_Utc_Date = moment.utc();
      let Given_Utc_AddedTime = moment.utc(dateTime).add(duration, 'minutes');
      if (Current_Utc_Date > Given_Utc_AddedTime) {
          return true
      } else {
          return false
      }
  }

    const MarkAttendanceLMSUserFunc = async (
      courseTrainingLinkVenueId,
      courseTrainingRegistrationId
    ) => {
      try {
        if(courseTrainingLinkVenueId){
          const response = await endpoints.MarkAttendanceLMSUser(
            authToken,
            courseTrainingLinkVenueId,
            courseTrainingRegistrationId
            );
            // console.log('responseMurtaxa',response)
          }
      } catch (error) {
        console.log("error", error);
      }
    };

    return (
      <StyledDiv>
        <ul className="events">
          {listData.map((item, index) => (
            <>
              <li key={item.content}>
                <Badge status={item.type} text={item.content} />
              </li>
            </>
          ))}
          {listData?.length > 0 && (
            <p
              className="view_more"
              onClick={() => {
                setViewMoreModal(true);

                setDates(listData);
              }}
            >
              {view_more}
            </p>
          )}
        </ul>
        <StyledModal
          width={1000}
          title={moment(dateStringState).format("DD MMMM YYYY")}
          open={viewMoreModal}
          onOk={handleOk}
          onCancel={handleCancel}
        >
           <StyledTable dir="rtl" bordered={true}>
  <tr>
    <th></th>
    <th>{Venue} {Name}</th>
    <th>{Venue} {Type}</th>
    <th>{LOCATION}</th>
    <th>{Name}</th>
    <th>{Type}</th>
    <th>{Time}</th>
  </tr>
  {dates?.map((item,index)=>
  <tr key={index}>
    <td>
    <Badge color={item?.type} />
    </td>
    <td>{item?.content}</td>
    {/* {console.log('item?.venueType',item)} */}
                <td style={{ 
                       display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "110px"
     }}>
                {item?.venueType==="Survey"&& (<>
                  {(!item?.viewed) ? (
                    <div style={{ cursor:"pointer" }} onClick={()=>{
                      setCookies(
                        "courseTrainingRegistrationId",
                        item?.courseTrainingRegistrationId
                      );
                      router.push(`${item?.recordType?.toLowerCase()}-surveys/${item?.couseTrainingFileId}`)}}>
                    <img loading="lazy"src={SurveryIcon} style={{ marginLeft:5 }} />                
                    </div>
                  ) : (
                    <div style={{opacity: "0.5", cursor: "not-allowed"}}>
                    <img loading="lazy"src={SurveryIcon} style={{ marginLeft:5 }} />                
                    </div>
                  )}
                </>)}
                {item?.venueType==="Assessment"&& (<>
                    <div style={{ cursor:"pointer" }} onClick={()=>{
                      setCookies(
                        "courseTrainingRegistrationId",
                        item?.courseTrainingRegistrationId
                      );
                      router.push(`${item?.recordType?.toLowerCase()}-assessments/${item?.couseTrainingFileId}`)}}>
                    <img loading="lazy"src={AssessmentIcon} style={{ marginLeft:5 }} />                
                    </div>
                </>)}
                {item?.venueType==="Onsite"&& (<>
                    <div style={{ cursor:"pointer" }}>
                    <img loading="lazy"src={WebinarImg2} style={{ marginLeft:5 }} />                
                    </div>
                </>)}
                {item?.venueType==="Online"&& (
                  <>
                    {ZoomActive(
                      item?.venueDateTime,
                      item?.duration_EN
                    ) ? (
                      <div style={{ cursor:"pointer" }} onClick={() => {
                        MarkAttendanceLMSUserFunc(
                          item?.couseTrainingVenueId,
                          item?.courseTrainingRegistrationId
                        );
                        window.open(
                          item?.zoomJoinLink,
                          "_blank"
                        );
                      }}>
                        <ContentCenter>
                          <div class="pulse active">
                            <img loading="lazy"src={zoomLink?.src} width="22px" />
                          </div>
                        </ContentCenter>
                      </div>
                     ) : (
                      <>
                        {chectZoomTimeOut(
                          item?.venueDateTime,
                          item?.duration_EN
                        ) ? (
                          <div style={{ opacity:"0.5" }}>
                            <ContentCenter>
                              <div class="pulse">
                                <img loading="lazy"src={zoomLink?.src} width="22px" />
                              </div>
                            </ContentCenter>
                          </div>
                        ) : (
                          <div style={{ cursor:"pointer" }} onClick={() => {
                            window.open(
                              item?.zoomJoinLink,
                              "_blank"
                            );
                          }}>
                            <ContentCenter>
                              <div class="pulse">
                                <img loading="lazy"src={zoomLink?.src} width="22px" />
                              </div>
                            </ContentCenter>
                          </div>
                        )}
                      </>
                    )} 
                  </>
                // <>
                //     <div style={{ cursor:"pointer" }} onClick={()=>{
                //       setCookies(
                //         "courseTrainingRegistrationId",
                //         item?.courseTrainingRegistrationId
                //       );
                //       router.push(`${item?.recordType?.toLowerCase()}-assessments/${item?.couseTrainingFileId}`)}}>
                //     <img loading="lazy"src={WebinarImg1} style={{ marginLeft:5 }} />                
                //     </div>
                // </>
                )}
                  {item?.venueType}
                </td>

                
                {item?.venueType === "Onsite" ? (
                  <>
                  <td>
                    {item?.location}</td>
                  </>
):(                  <td>-</td>
                )}
    <td>{item?.title}</td>
    <td>{item?.recordType}</td>
    {item?.venueType==="Survey"?
                <td>-</td>
                :    <td>{moment(item?.time)?.format("hh:mm a")}</td>
              }
              </tr>
    )}

</StyledTable>
          {/* {dates?.map((item, index) => (
            <>

              <ScheduledCards
                title={item?.content}
                category={item?.recordType}
                time={item?.venueDateTime}
                color={item?.type}
              />
            </>
          ))} */}
        </StyledModal>
      </StyledDiv>
    );
  };

  return (
    <StyledMainDiv>
      <StyledCalendar
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
        onChange={(e) => {
          setDateStringState(moment(e?._d).format("YYYY-MM-DD"));
        }}
      />
    </StyledMainDiv>
  );
};

export default CalendarComp;

const StyledMainDiv = styled.div`
  .ant-radio-group {
    display: none !important;
  }

  .ant-picker-cell:hover:not(.ant-picker-cell-selected):not(
      .ant-picker-cell-range-start
    ):not(.ant-picker-cell-range-end):not(
      .ant-picker-cell-range-hover-start
    ):not(.ant-picker-cell-range-hover-end)
    .ant-picker-cell-inner {
    background: #fff !important;
  }

  .ant-picker-calendar-header .ant-picker-calendar-month-select {
    margin-right: 8px;
  }

  .ant-picker-calendar-full
    .ant-picker-panel
    .ant-picker-cell-selected
    .ant-picker-calendar-date
    .ant-picker-calendar-date-value {
    color: #fff;
    background: #105f43;
    width: 30px;
    height: 30px;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
  }

  .ant-picker-calendar-full
    .ant-picker-panel
    .ant-picker-cell-selected
    .ant-picker-calendar-date {
    border: 1px solid #105f43 !important;
    background: none !important;
    border-radius: 10px !important;
  }

  .ant-picker-calendar-full .ant-picker-panel .ant-picker-calendar-date-today {
    border: 1px solid #105f43 !important;
    border-radius: 10px !important;
  }

  .ant-picker-calendar-full .ant-picker-panel .ant-picker-calendar-date {
    border: 1px solid #bcbcbc !important;
    background: none !important;
    border-radius: 10px !important;
  }
  .ant-picker-calendar-full .ant-picker-panel .ant-picker-body th,
  .ant-picker-calendar-full .ant-picker-panel .ant-picker-body td {
    padding: 5px !important;
  }
`;

const StyledDiv = styled.div`
  .view_more {
    color: #a87e33;
    margin-bottom: 0px;
    text-align: center;
    &:hover {
      text-decoration: underline;
    }
  }
  .ant-badge-status-text {
    margin-right: 8px !important;
  }
`;

const StyledCalendar = styled(Calendar)`
  .ant-picker-calendar-date-value {
    text-align: start !important;
  }

  .events {
    padding: 0px !important;
  }

  .ant-picker-calendar-header {
    padding-inline: 10px !important;
    display:flex;
  }

  @media(max-width:991px){
    .ant-picker-calendar .ant-picker-panel .ant-picker-date-panel{
      width: 100% !important;
      overflow: scroll !important;
    }
    .ant-picker-body{
      overflow-x: scroll !important;
  }
  .ant-picker-calendar .ant-picker-panel .ant-picker-content{
    width: 1000px !important;
  overflow-x: scroll !important;
}
.ant-picker-content{
  width: 1000px !important;
}
thead{
  overflow-x: scroll !important;
}
tbody{
  overflow-x: scroll !important;
}
}
`;

const StyledModal = styled(Modal)`
  .ant-modal-header {
    border-radius: 10px !important;
  }
  .ant-modal-title {
    font-family: "GESSTwoLight";
  }
  .ant-modal-title {
    display: flex;
    justify-content: center;
  }

  .ant-modal-body {
    height: 560px;
    overflow-y: scroll;
    /* scrollbar */
  }
  .ant-modal-body:-webkit-scrollbar {
    scrollbar-width: 0.5rem !important;
    width: 0.5rem !important;
  }

  .ant-modal-body:-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1) !important;
    backdrop-filter: blur(20px) !important;
  }

  .ant-modal-body:-webkit-scrollbar-thumb {
    background: #105f43;
    border-radius: 0.5em;
    box-shadow: inset 0.15em 0.1em 0.1em rgba(255, 255, 255, 0.5),
      inset -0.15em -0.15em 0.1em rgba(0, 0, 0, 0.3);
  }

  .ant-modal-footer {
    padding: none !important;
    text-align: right;
    background: transparent;
    border-top: none !important;
    .ant-btn {
      display: none !important;
    }
  }
  
  table {
    font-family: arial, sans-serif !important;
    border-collapse: collapse !important;
    width: 100% !important;
  }
  
  td, th {
    border: 1px solid #dddddd !important;
    text-align: right !important;
    padding: 8px !important;
  }
  
  tr:nth-child(even) {
    // background-color: #dddddd !important;
  }
`;

const StyledScheduledRowDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 5px;
  .time {
    margin-bottom: 0px;
  }
  margin-bottom: 10px;
  &:nth-last-child(1) {
    margin-bottom: 0px;
  }
`;

const StyledProgramDiv = styled.div`
  background: #ffdfa6;
  border-radius: 5px;
  padding: 1px 7px;
  p {
    margin-bottom: 0px;
  }
`;

const StyledProgramDiv1 = styled.div`
  background: #cfeeff;
  border-radius: 5px;
  padding: 1px 7px;
  p {
    margin-bottom: 0px;
  }
`;

const StyledProgramDiv2 = styled.div`
  background: #cfddff;
  border-radius: 5px;
  padding: 1px 7px;
  p {
    margin-bottom: 0px;
  }
`;

const StyledProgramDiv3 = styled.div`
  background: #cce07b;
  border-radius: 5px;
  padding: 1px 7px;
  p {
    margin-bottom: 0px;
  }
`;

const StyledTable=styled.table`
td, th {
  font-family: "GESSTwoBold", sans-serif !important;
}
`
const ContentCenter = styled.div`
  margin-left: 7px;
  margin-right: 1px;
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