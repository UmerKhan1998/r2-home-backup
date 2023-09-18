import React, { useState } from "react";

import { Badge, Calendar, Col, Modal, Row, Select } from "antd";
import styled from "styled-components";
import ScheduledCards from "../Cards/ScheduledCards";
import Image from "next/image";
import { Absent, Present } from "../../../images";
import moment from "moment";

const { Option } = Select;

const getListData = (dateString, data) => {
  let listData = [];
  // console.log('data\\',data);
  data?.forEach(function (value, index) {
    const date1 = new Date(value.date);
    const isoString = date1.toLocaleDateString();
    const date2 = new Date(dateString);
    const isoString2 = date2.toLocaleDateString();
    if (isoString == isoString2) {
      listData.push(value);
    }
  });
  // console.log('listData',listData);
  return listData || [];
};

const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const CalendarComp = ({
  scheduleArr,
  setCalendarDate,
  calendarDate,
  CourseTrainingVenueLMSUserWiseState,
  courseTrainingVenueLMSUserWiseInitialState,
  setCourseTrainingVenueLMSUserWiseInitialState,
  setSelectId,
  selectId,
  setClassVenueFlagState,
  classVenueFlagState,
  attendanceState
}) => {
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
    // console.log('scheduleArr',scheduleArr)
    const [viewMoreModal, setViewMoreModal] = useState(false);
    const listData = getListData(value?._d, scheduleArr);
    const handleOk = () => {
      setViewMoreModal(false);
    };
    const handleCancel = () => {
      setViewMoreModal(false);
    };

    return (
      <StyledDiv>
        <ul className="events">
          {listData.map((item, index) => (
            <div key={index}>
              {/* {console.log('listDataItem',item)} */}
              {item?.title === "Present" && (
                <>
                  <img loading="lazy"alt={""} src={Present} width={30} height={30} />
                  <p>{item?.title}</p>
                </>
              )}
              {item?.title === "Absent" && (
                <>
                  <img loading="lazy"alt={""} src={Absent} width={30} height={30} />
                  <p>{item?.title}</p>
                </>
              )}
            </div>
          ))}
        </ul>
        <StyledModal
          width={600}
          title="14 October 2022"
          open={viewMoreModal}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {scheduleArr?.map((item, index) => (
            <ScheduledCards
              title={item?.title}
              category={item?.category}
              time={item?.time}
              key={index}
            />
          ))}
        </StyledModal>
      </StyledDiv>
    );
  };

  const departmentArr = ["Anesthesiology", "Cardiology", "Dermatology"];
  const orderArr = ["Ascending", "Descending"];

  return (
    <StyledMainDiv>
      <StyledRow>
        <StyledInputCol span={6}>
          <StyledSelect
            defaultValue="All"
            // showSearch
            // onSearch={(e)=>setCourseTrainingVenueLMSUserWiseInitialState({ ...courseTrainingVenueLMSUserWiseInitialState, _srch:e})}
            style={{
              width: 120,
              marginRight: 10,
            }}
            onChange={(e) => setSelectId(e)}
            onFocus={() => setClassVenueFlagState(true)}
            onBlur={() => setClassVenueFlagState(false)}
          >
            {/* {console.log('CourseTrainingVenueLMSUserWiseState',CourseTrainingVenueLMSUserWiseState)} */}
            <Option value={""}>All</Option>
            {CourseTrainingVenueLMSUserWiseState?.map((item, index) => (
              <Option key={index} value={item?.id}>
                {item?.name_EN}
              </Option>
            ))}
          </StyledSelect>
          {/* <StyledSelect
            defaultValue="Sort By"
            style={{
              width: 120,
            }}
          >
            {orderArr?.map((item, index) => (
              <Option key={index} value={item}>
                {item}
              </Option>
            ))}
          </StyledSelect> */}
        </StyledInputCol>
      </StyledRow>
      {/* {console.log('calendarDate',calendarDate,attendanceState)} */}
      <StyledCalendar
        value={moment(attendanceState?attendanceState[0]?.attendanceDate:calendarDate)}
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
        onChange={(e) => {
          setCalendarDate(e?._d)}}
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

  .ant-picker-content {
    thead {
      tr {
        th {
          text-align: left !important;
        }
      }
    }
  }
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  ul {
    text-align: center;
  }
  .view_more {
    color: #a87e33;
    margin-bottom: 0px;
    text-align: center;
    &:hover {
      text-decoration: underline;
    }
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
  }

  @media (max-width: 991px) {
    .ant-picker-calendar .ant-picker-panel .ant-picker-date-panel {
      width: 100% !important;
      overflow: scroll !important;
    }
    .ant-picker-body {
      overflow-x: scroll !important;
    }
    .ant-picker-calendar .ant-picker-panel .ant-picker-content {
      width: 1000px !important;
      overflow-x: scroll !important;
    }
    .ant-picker-content {
      width: 1000px !important;
    }
    thead {
      overflow-x: scroll !important;
    }
    tbody {
      overflow-x: scroll !important;
    }
  }
`;

const StyledModal = styled(Modal)`
  .ant-modal-header {
    border-radius: 10px !important;
  }
  .ant-modal-title {
    display: flex;
    justify-content: center;
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

const StyledInputCol = styled(Col)`
  display: flex;
`;

const StyledSelect = styled(Select)`
  width: 100% !important;
  // border: 1px solid #c1c1c1 !important;
  .ant-select-selection-item {
    font-family: "TitilliumNormal", sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #898989;
  }
  .ant-select-single.ant-select-open {
    color: #898989 !important;
  }
`;

const StyledRow = styled(Row)`
  position: absolute;
  width: 100%;
  margin-top: 10px;
  margin-inline: 10px;
`;
