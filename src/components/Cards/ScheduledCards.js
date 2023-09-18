import React from "react";
import { Badge, Col, Row } from "antd";
import styled from "styled-components";
import moment from "moment";

const ScheduledCards = ({ title, category, time, color }) => {
  //console.log("color", color);
  return (
    <StyledScheduledRowDiv>
      <StyledRow>
        <div span={8}>
          <Badge color={color} text={title} />
        </div>
        <div span={10}>
          {category === "Program" && (
            <StyledProgramDiv
              style={{
                background: "#ffd8bf",
                opacity: 0.6,
                color: "#000",
                fontWeight: "bold",
                fontSize: "12px",
                padding: "2px 12px",
              }}
            >
              <p>{category}</p>
            </StyledProgramDiv>
          )}
          {category === "Course" && (
            <StyledProgramDiv1
              style={{
                background: "#d9f7be",
                opacity: 0.6,
                color: "#000",
                fontWeight: "bold",
                fontSize: "12px",
                padding: "2px 12px",
              }}
            >
              <p>{category}</p>
            </StyledProgramDiv1>
          )}
          {category === "Workshop" && (
            <StyledProgramDiv1
              style={{
                background: "#d9f7be",
                opacity: 0.6,
                color: "#000",
                fontWeight: "bold",
                fontSize: "12px",
                padding: "2px 12px",
              }}
            >
              <p>{category}</p>
            </StyledProgramDiv1>
          )}
          {category === "Symposiums" && (
            <StyledProgramDiv1
              style={{
                background: "#d6e4ff",
                opacity: 0.6,
                color: "#000",
                fontWeight: "bold",
                fontSize: "12px",
                padding: "2px 12px",
              }}
            >
              <p>{category}</p>
            </StyledProgramDiv1>
          )}
          {category === "Training" && (
            <StyledProgramDiv1
              style={{
                background: "#ffd6e7",
                opacity: 0.6,
                color: "#000",
                fontWeight: "bold",
                fontSize: "12px",
                padding: "2px 12px",
              }}
            >
              <p>{category}</p>
            </StyledProgramDiv1>
          )}
          {category === "Conference" && (
            <StyledProgramDiv2
              style={{
                background: "#b5f5ec",
                opacity: 0.6,
                color: "#000",
                fontWeight: "bold",
                fontSize: "12px",
                padding: "2px 12px",
              }}
            >
              <p>{category}</p>
            </StyledProgramDiv2>
          )}
          {category === "Webinar" && (
            <StyledProgramDiv3
              style={{
                background: "#ffffb8",
                opacity: 0.6,
                color: "#000",
                fontWeight: "bold",
                fontSize: "12px",
                padding: "2px 12px",
              }}
            >
              <p>{category}</p>
            </StyledProgramDiv3>
          )}
          <p className="time">{moment(time)?.format("hh:mm a")}</p>
        </div>
      </StyledRow>
    </StyledScheduledRowDiv>
  );
};

export default ScheduledCards;

const StyledRow = styled(Row)`
  width: 100% !important;
  justify-content: space-between;
  div {
    display: flex;
    gap: 15px;
  }
`;

const StyledScheduledRowDiv = styled.div`
  display: flex;
  // justify-content: space-between;
  padding: 15px;
  // background: #f5f5f5;
  border-radius: 5px;
  .time {
    margin-bottom: 0px;
    text-align: end;
  }
  margin-bottom: 10px;
  &:nth-last-child(1) {
    margin-bottom: 0px;
  }
`;

const StyledProgramDiv = styled.div`
  // background: #ffdfa6;
  border-radius: 5px;
  padding: 1px 7px;
  p {
    margin-bottom: 0px;
  }
`;

const StyledProgramDiv1 = styled.div`
  // background: #cfeeff;
  border-radius: 5px;
  padding: 1px 7px;
  p {
    margin-bottom: 0px;
  }
`;

const StyledProgramDiv2 = styled.div`
  // background: #cfddff;
  border-radius: 5px;
  padding: 1px 7px;
  p {
    margin-bottom: 0px;
  }
`;

const StyledProgramDiv3 = styled.div`
  // background: #cce07b;
  border-radius: 5px;
  padding: 1px 7px;
  p {
    margin-bottom: 0px;
  }
`;
