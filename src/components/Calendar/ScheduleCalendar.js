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
      dayPopoverFormat
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
`;
