import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import styled from "styled-components";

const BigCalendar = ({ scheduleArr }) => {
  return (
    <StyledFullCalendar
      plugins={[dayGridPlugin]}
      events={scheduleArr}
      initialView="dayGridMonth"
      // eventDidMount={(info) => //console.log("StyledFullCalendarInfo", info)}
      popup={true}
      // views={{
      //   timeGrid: {
      //     count: true,
      //     eventLimit: 2, // adjust to 6 only for timeGridWeek/timeGridDay
      //   },
      // }}
      // eventLimit={3}
      // views={3}
      // step={60}
      // components={{
      //   eventWrapper: ({ event, children }) => (
      //     <div
      //       onContextMenu={(e) => {
      //         alert(`${event.title} is clicked.`);
      //         e.preventDefault();
      //       }}
      //     >
      //       {children}
      //     </div>
      //   ),
      // }}
    />
  );
};

export default BigCalendar;

const StyledFullCalendar = styled(FullCalendar)`
  a {
    color: #000 !important;
  }
  .fc-scrollgrid-sync-inner {
    a {
      color: #000 !important;
    }
  }
  .fc-toolbar {
    display: flex !important;
    flex-direction: row-reverse !important;
  }
`;
