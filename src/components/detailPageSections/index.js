import React from "react";
import styled from "styled-components";
import { Row, Col, Rate } from "antd";
import parse from "html-react-parser";

const DetailPageSection = ({ getCourseDetailId, name }) => {
  return (
    <StyledDiv>
      <CourseDescriptionDetailCard id="description">
        <CourseCurriculumDiv>
          <CourseDisplayNameDiv>
            <h1>Description</h1>
          </CourseDisplayNameDiv>
          <Row>
            <p>
              {parse(
                `${
                  getCourseDetailId?.description_EN
                    ? getCourseDetailId?.description_EN
                    : "..."
                }`
              )}
            </p>
          </Row>
        </CourseCurriculumDiv>
      </CourseDescriptionDetailCard>
      {parse(`${getCourseDetailId?.whoisthisfor_EN}`) !== "" &&
        parse(`${getCourseDetailId?.whoisthisfor_EN}`) !== "-" && (
          <CourseWhoIsThisCourseDetailCard id="who">
            <CourseCurriculumDiv>
              <CourseDisplayNameDiv>
                <h1>What is this {name} for?</h1>
              </CourseDisplayNameDiv>

              <CourseLevelDiv>
                <Row>
                  <p>
                    {parse(
                      `${
                        getCourseDetailId?.whoisthisfor_EN
                          ? getCourseDetailId?.whoisthisfor_EN
                          : "..."
                      }`
                    )}
                  </p>
                </Row>
              </CourseLevelDiv>
            </CourseCurriculumDiv>
          </CourseWhoIsThisCourseDetailCard>
        )}
      {parse(`${getCourseDetailId?.requirement_EN}`) !== "" &&
        parse(`${getCourseDetailId?.requirement_EN}`) !== "-" && (
          <CourseRequirementsDetailCard id="requirements">
            <CourseCurriculumDiv>
              <CourseDisplayNameDiv>
                <h1>Requirements</h1>
              </CourseDisplayNameDiv>

              <StyledRequirementsRow>
                {parse(
                  `${
                    getCourseDetailId?.requirement_EN
                      ? getCourseDetailId?.requirement_EN
                      : "..."
                  }`
                )}
              </StyledRequirementsRow>
            </CourseCurriculumDiv>
          </CourseRequirementsDetailCard>
        )}

      {getCourseDetailId?.detailRecordReviewViewModels?.length > 0 && (
        <>
          <CourseReviewDetailCard id="reviews">
            <CourseCurriculumDiv>
              <CourseDisplayNameDiv>
                <h1>Reviews</h1>
              </CourseDisplayNameDiv>

              {getCourseDetailId?.detailRecordReviewViewModels?.map(
                (item, index) => (
                  <StyledReviewRow key={index}>
                    <StyledTitleRow>
                      <p className={"title"}>
                        <b>{item?.userName_EN}</b>
                      </p>
                      <Rate
                        allowHalf
                        disabled
                        defaultValue={item?.rating}
                        color={"#ffaa46"}
                      />
                    </StyledTitleRow>
                    <p>{item?.review_EN}</p>
                  </StyledReviewRow>
                )
              )}
            </CourseCurriculumDiv>
          </CourseReviewDetailCard>
        </>
      )}
    </StyledDiv>
  );
};

export default DetailPageSection;

const StyledDiv = styled.div`
  img {
    max-width: 100% !important;
  }
`;

const CourseDescriptionDetailCard = styled.div`
  border: 1px solid #d1d1d1;
  border-radius: 9px;
  padding: 20px;
  margin-top: 20px;
  @media (max-width: 992px) {
    border: none !important;
    padding: 10px 5px;
  }
`;

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
    font-family: "TitilliumBold", sans-serif;
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

const CourseWhoIsThisCourseDetailCard = styled.div`
  border: 1px solid #d1d1d1;
  border-radius: 9px;
  padding: 20px;
  margin-top: 20px;
  @media (max-width: 992px) {
    border: none !important;
    padding: 10px 5px;
  }
`;

const CourseLevelDiv = styled.div`
  h1 {
    font-size: 20px;
    font-weight: 600;
    font-family: "TitilliumNormal", sans-serif;
    line-height: 22px;
  }
`;

const CourseRequirementsDetailCard = styled.div`
  border: 1px solid #d1d1d1;
  border-radius: 9px;
  padding: 20px;
  margin-top: 20px;
  overflow: hidden;
  @media (max-width: 992px) {
    border: none !important;
    padding: 10px 5px;
  }
  p {
    word-break: break-word !important;
  }
  @media (max-width: 500px) {
    overflow: hidden;
  }
`;

const StyledRequirementsRow = styled(Row)`
  p {
    width: none !important;
  }
`;

const CourseReviewDetailCard = styled.div`
  border: 1px solid #d1d1d1;
  border-radius: 9px;
  padding: 20px;
  margin-top: 20px;
  @media (max-width: 992px) {
    border: none !important;
    padding: 10px 5px;
  }
`;

const StyledReviewRow = styled(Row)`
  display: flex;
  flex-direction: column;
  .title {
    margin-bottom: 0px;
  }
`;

const StyledTitleRow = styled(Row)`
  display: flex;
  justify-content: space-between;
  .title {
    margin-bottom: 0px;
  }
`;
