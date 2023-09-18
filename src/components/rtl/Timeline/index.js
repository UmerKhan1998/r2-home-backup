import React, { useState } from "react";
import { Radio, Timeline } from "antd";
import styled from "styled-components";
import Image from "next/image";
import {
  Award,
  badge1Img,
  badge2Img,
  course1,
  CourseDetailCards1,
  FeaturedCourse1,
} from "../../../../images";
import { AiFillCheckCircle } from "react-icons/ai";
import moment from "moment";
import { Badge, Completed, Points } from "../../../helpers/LanguageConstant";

const TimelineComp = ({ data }) => {
  return (
    <StyledDiv>
      <Timeline mode={"left"}>
        {/* {data?.map((item, index) => (
          <Timeline.Item key={index} label={item?.date}>
            {item?.title}
          </Timeline.Item>
        ))} */}
        {data?.map((item, index) => (
          <Timeline.Item key={index} label={moment(item?.insertDate).format("MMMM DD, YYYY")}>
            <StyledBadgeHistoryDiv>
              <StyledTable>
                <StyledUnActiveTr>
                  <td>
                    <StyledCourseTitleDiv>
                      <StyledImage
                        width={70}
                        height={50}
                        src={FeaturedCourse1}
                      />
                      <div className="title">
                        <p>
                          {" "}
                          <b>{item?.gamificationTitle_AR}</b>{" "}
                        </p>
                        <FeaturedTypeDiv>
                          <p>{item?.departmentName_AR}</p>
                        </FeaturedTypeDiv>
                      </div>
                    </StyledCourseTitleDiv>
                  </td>
                  <td>
                    <StyledStatusDiv>
                      <AiFillCheckCircle color={"#5EA800"} />
                      <p>{Completed}</p>
                    </StyledStatusDiv>
                  </td>
                  <td>{item?.levelName_AR}</td>
                  <td>
                    <StyledStatusDiv>
                      <img loading="lazy"alt={""} height={20} width={20} src={Award} />
                      <p>
                        {item?.point} {Points}
                      </p>
                    </StyledStatusDiv>
                  </td>
                  <td>
                    <StyledBadgeDiv>
                      {/* {//console.log("fhgflkglkhdr", item?.imageUrl)} */}
                      <img loading="lazy"src={item?.imageUrl} height="20" width="20" />
                      <p>{Badge}</p>
                      {/* <p>{item?.badge}</p> */}
                    </StyledBadgeDiv>
                  </td>
                </StyledUnActiveTr>
              </StyledTable>
            </StyledBadgeHistoryDiv>
          </Timeline.Item>
        ))}
      </Timeline>
    </StyledDiv>
  );
};
export default TimelineComp;

const StyledDiv = styled.div`
  margin-top: 20px;
  min-width: 900px;

  .ant-timeline.ant-timeline-label .ant-timeline-item-label {
    width: calc(10% - 12px) !important;
  }
  .ant-timeline.ant-timeline-label .ant-timeline-item-tail {
    right: 11% !important;
  }
  .ant-timeline-item-tail {
    border-right: 2px solid #f0f0f0 !important;
    border-left: 0;
  }
  .ant-timeline.ant-timeline-label
    .ant-timeline-item-left
    .ant-timeline-item-content {
    right: calc(11% - 4px) !important;
    width: calc(88% - 14px) !important;
  }
  .ant-timeline.ant-timeline-label .ant-timeline-item-head {
    right: 11% !important;
  }
  .ant-timeline-item-head-blue {
    color: #105f43 !important;
    border-color: #105f43 !important;
  }
`;

const StyledTable = styled.table`
  width: 100% !important;
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  td {
    // border-bottom: 1px solid #dddddd;
    font-family: "GESSTwoLight", sans-serif;
    text-align: left;
    padding: 8px;
  }
  th {
    // border-right: 1px solid #dddddd;
    font-family: "GESSTwoLight", sans-serif;
    text-align: left;
    padding: 8px;
  }

  td:nth-child(1) {
    width: 336px;
  }
`;

const StyledUnActiveTr = styled.tr`
  //   cursor: pointer;
  //   border-inline: 1px solid rgba(0, 0, 0, 0.02);
`;

const StyledBadgeHistoryDiv = styled.div`
  background: #fafafa;
  border: 1px solid #f1f1f1;
  border-radius: 7px;
`;

const StyledImage = styled(Image)`
  border-radius: 5px !important;
`;

const StyledCategoryDiv = styled.div``;

const FeaturedTypeDiv = styled.div`
  padding: 4px 14px;
  background-color: #fee4b7;
  color: #a87e33;
  display: flex;
  align-items: center;
  // height: 28px;
  // width: 130px;
  display: flex;
  justify-content: center;
  border-radius: 3px;
  p {
    font-size: 12px;
  }

  p {
    margin-bottom: 0px;
    text-align: center;
  }

  @media (max-width: 400px) {
    font-size: 10px;
  }
`;

const StyledCourseTitleDiv = styled.div`
  display: flex;
  .title {
    margin-right: 15px;
  }
`;

const StyledStatusDiv = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-bottom: 0px;
    margin-right: 5px;
  }
  svg {
    margin-left: 10px;
  }
`;

const StyledBadgeDiv = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  p {
    margin-bottom: 0px;
  }
  svg {
    margin-right: 10px;
  }
`;
