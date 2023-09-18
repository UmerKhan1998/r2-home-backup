import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { Row, Col, Collapse } from "antd";
import {
  AssessmentIcon,
  CurriculumImg1,
  CurriculumImg2,
  CurriculumImg3,
  SurveryIcon,
} from "../../../../images";
import { AiOutlineLock } from "react-icons/ai";
import {
  curricullum,
  Introduction,
  lecturesText,
  LOCATION,
  sections,
  total,
  video_for_introduction,
} from "../../../helpers/LanguageConstant";
import OnSite from "../../../../public/images/Onsite.svg";

const { Panel } = Collapse;

const DetailPageCurricullum = ({
  getCourseDetailId,
  setOpenModal,
  setUrlState,
}) => {
  return (
    <div dir="rtl">
      <CourseCurriculumDiv>
        <CourseDisplayNameDiv>
          <h1>{curricullum}</h1>
        </CourseDisplayNameDiv>
        <CourseCurriculumRowMBottom>
          <CurricullumContentCol span={8}>
            <img loading="lazy"alt={""} height={40} width={40} src={CurriculumImg1} />
            <CurricullumContentDiv>
              <h2>{getCourseDetailId?.sectionTotal}</h2>
              <p>{sections}</p>
            </CurricullumContentDiv>
          </CurricullumContentCol>
          <CurricullumContentCol span={8}>
            <img loading="lazy"alt={""} height={40} width={40} src={CurriculumImg2} />

            <CurricullumContentDiv>
              <h2>{getCourseDetailId?.lectureTotal}</h2>
              <p>{lecturesText}</p>
            </CurricullumContentDiv>
          </CurricullumContentCol>
          <CurricullumContentCol span={8}>
            <img loading="lazy"alt={""} height={40} width={40} src={CurriculumImg3} />

            <CurricullumContentDiv>
              <h2>{getCourseDetailId?.duration_AR}</h2>
              <p>{total}</p>
            </CurricullumContentDiv>
          </CurricullumContentCol>
        </CourseCurriculumRowMBottom>
        {getCourseDetailId?.demoVideo_AR !== "" && (
          <StyledCollapse
            expandIconPosition="right"
            bordered={false}
            defaultActiveKey={["0"]}
            ghost
          >
            <Panel header={Introduction}>
              {/* {item?.detailRecordFileViewModels?.length > 0 && ( */}
              <>
                {/* {item?.detailRecordFileViewModels?.map(
                            (item, index) => ( */}
                <Row>
                  <StyledCollapseCol span={22}>
                    <p
                      onClick={() => {
                        setOpenModal(true);
                        setUrlState(getCourseDetailId?.demoVideo_AR);
                      }}
                    >
                      {video_for_introduction}
                    </p>
                  </StyledCollapseCol>
                </Row>
                {/* )
                          )} */}
              </>
              {/* )} */}
            </Panel>
          </StyledCollapse>
        )}
        {getCourseDetailId?.detailRecordCourseTrainingViewModels?.map(
          (item, index) => (
            <div key={index}>
              <StyledRecordTypeH1>{item?.recordType_AR}</StyledRecordTypeH1>
              {item?.detailRecordSectionViewModel?.map((item, index) => (
                <>
                  {/* {item?.detailRecordFileViewModels?.length > 0 && ( */}
                  <StyledCollapse
                    expandIconPosition="right"
                    bordered={false}
                    // defaultActiveKey={["0"]}
                    ghost
                  >
                    <Panel header={`${item?.title_AR}`} key={index}>
                      {item?.detailRecordFileViewModels?.length > 0 && (
                        <>
                          {item?.detailRecordFileViewModels?.map(
                            (item, index) => (
                              <Row key={index}>
                                <StyledCollapseCol span={22}>
                                  {item?.freePaid === "Free" ? (
                                    <>
                                      {item?.fieldType === "File" && (
                                        <img
                                          style={{
                                            width: 22,
                                            height: 22,
                                            marginLeft: 8,
                                          }}
                                          src={SurveryIcon}
                                        />
                                      )}
                                      {item?.fieldType === "Survey" && (
                                        <img
                                          style={{
                                            width: 22,
                                            height: 22,
                                            marginLeft: 8,
                                          }}
                                          src={SurveryIcon}
                                        />
                                      )}
                                      {item?.fieldType === "Assessment" && (
                                        <img
                                          style={{
                                            width: 22,
                                            height: 22,
                                            marginLeft: 8,
                                          }}
                                          src={AssessmentIcon}
                                        />
                                      )}
                                      <p
                                      // onClick={() => {
                                      //   setOpenModal(true);
                                      //   setUrlState(item?.url_AR);
                                      // }}
                                      >
                                        {item?.title_AR}{" "}
                                      </p>
                                    </>
                                  ) : (
                                    <>
                                      {item?.fieldType === "File" && (
                                        <img
                                          style={{
                                            width: 22,
                                            height: 22,
                                            marginLeft: 8,
                                          }}
                                          src={SurveryIcon}
                                        />
                                      )}
                                      {item?.fieldType === "Survey" && (
                                        <img
                                          style={{
                                            width: 22,
                                            height: 22,
                                            marginLeft: 8,
                                          }}
                                          src={SurveryIcon}
                                        />
                                      )}
                                      {item?.fieldType === "Assessment" && (
                                        <img
                                          style={{
                                            width: 22,
                                            height: 22,
                                            marginLeft: 8,
                                          }}
                                          src={AssessmentIcon}
                                        />
                                      )}
                                      <p>{item?.title_AR} </p>
                                    </>
                                  )}
                                </StyledCollapseCol>
                                {/* {item?.freePaid === "Paid" && ( */}
                                <StyledCollapseCol2 span={2}>
                                  <AiOutlineLock />
                                </StyledCollapseCol2>
                                {/* )} */}
                              </Row>
                            )
                          )}
                        </>
                      )}
                      {item?.detailRecordLinkVenueViewModels?.map(
                        (item, index) => (
                          <Row key={index}>
                            <StyledCollapseCol span={22}>
                              <img
                                style={{ width: 22, height: 22, marginLeft: 8 }}
                                src={OnSite.src}
                              />
                              <p>{item?.title_AR}</p>
                            </StyledCollapseCol>
                          </Row>
                        )
                      )}
                    </Panel>
                  </StyledCollapse>
                  {/* )} */}
                </>
              ))}
            </div>
          )
        )}
        {getCourseDetailId?.detailRecordLinkVenueViewModels?.map(
          (item, index) => (
            <div key={index}>
              <p>{item?.location_AR}</p>
              {/* <p>{item?.recordType}</p>
              {item?.detailRecordSectionViewModel?.map((item, index) => (
                <StyledCollapse
                  expandIconPosition="right"
                  bordered={false}
                  defaultActiveKey={["0"]}
                  ghost
                >
                  <Panel header={`${item?.title_AR}`} key={index}>
                    {item?.detailRecordFileViewModels?.map((item, index) => (
                      <Row key={index}>
                        <StyledCollapseCol span={22}>
                          {item?.freePaid === "Free" ? (
                            <p
                              onClick={() => {
                                setOpenModal(true);
                                setUrlState(item?.url_AR);
                              }}
                            >
                              {item?.title_AR}{" "}
                            </p>
                          ) : (
                            <p>{item?.title_AR} </p>
                          )}
                        </StyledCollapseCol>
                        {item?.freePaid === "Paid" && (
                          <StyledCollapseCol2 span={2}>
                            <AiOutlineLock />
                          </StyledCollapseCol2>
                        )}
                      </Row>
                    ))}
                  </Panel>
                </StyledCollapse>
              ))} */}
            </div>
          )
        )}
      </CourseCurriculumDiv>
    </div>
  );
};

export default DetailPageCurricullum;

const CourseCurriculumDiv = styled.div`
  h3 {
    // font-weight: 700;
  }
  span {
    // color: #636363 !important;
  }
  label {
    margin-bottom: 10px !important;
  }
  label:last-child {
    margin-bottom: 0px !important;
  }
  .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin-left: 0px !important;
  }
  p {
    line-height: 32px;
    // font-size: 16px;
    color: #636363;
    font-weight: 400;
  }
  .ant-row p h2 {
    font-weight: 400 !important;
    font-size: 16px !important;
  }
  @media (max-width: 500px) {
    ul li div {
      width: 100% !important;
      font-size: 16px;
    }
  }
`;

const CourseDisplayNameDiv = styled.div`
  padding: 10px;
  margin-bottom: 20px;
  background: rgba(16, 95, 67, 0.06);
  border-radius: 9px;
  h1 {
    font-family: "GESSTwoBold", sans-serif;
    margin-bottom: 0px;
    font-size: 17px;
    color: #105f43;
    // font-weight: 700;
  }

  p {
    margin-block: 20px;
    font-size: 12px;
    font-weight: 400;
    color: #636363;
  }
`;

const CourseCurriculumRowMBottom = styled(Row)`
  margin-bottom: 20px;
`;

const CurricullumContentCol = styled(Col)`
  display: flex;
  align-items: center;
  img {
    height: 50px;
  }
`;

const CurricullumContentDiv = styled.div`
  display: grid;

  @media (min-width: 1200px) {
    padding-right: 15px;
  }

  @media (max-width: 1199px) {
    padding-left: 3px;
  }

  h2 {
    color: #a87e33;
    margin-bottom: 0px;
    font-weight: 600;
    font-size: 16px;
    font-family: "GESSTwoBold", sans-serif;
    line-height: 22px;
    word-break: inherit;
  }
  p {
    margin-bottom: 0px;
    font-weight: 400;
    font-size: 15px;
    font-family: "GESSTwoLight", sans-serif;
    word-break: inherit;
  }
  @media (max-width: 992px) {
    margin-right: 3px;
  }
`;

const StyledCollapse = styled(Collapse)`
  margin-bottom: 10px;
  .ant-collapse-content-box {
    p {
      padding-left: 0px !important;
      line-height: 32px !important;
    }
    background-color: #fff !important;
    padding-inline: 16px;
    padding-bottom: 2px;
  }
  .ant-collapse-header {
    background-color: #f6f5f5 !important;
    font-family: "GESSTwoLight" !important;
  }
  .ant-row {
    justify-content: space-between !important;
    margin-bottom: 8px;
  }
`;

const StyledCollapseCol = styled(Col)`
  display: flex;
  align-items: center;
  p {
    margin-bottom: 0px;
    cursor: pointer;
  }
  &:hover {
    p {
      text-decoration: underline;
    }
  }
`;

const StyledCollapseCol2 = styled(Col)`
  display: flex;
  align-items: center;
  // justify-content: center;
  justify-content: end;
  p {
    margin-bottom: 0px;
  }
`;
const StyledRecordTypeH1 = styled.h1`
  font-size: 16px;
  font-weight: bold;
  font-family: "TitilliumBold";
`;
