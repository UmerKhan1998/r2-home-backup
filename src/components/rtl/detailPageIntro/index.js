import React from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import { Row, Col } from "antd";
import Image from "next/image";

// components
import {
  CardImg1,
  CardImg2,
  Clock,
  CourseDetailCards1,
  CourseDetailCards10,
  CourseDetailCards2,
  CourseDetailCards3,
  CourseDetailCards4,
  CourseDetailCards5,
  CourseDetailCards6,
  CourseDetailCards7,
  CourseDetailCards8,
  CourseDetailCards9,
  CreditNumber,
  CurriculumImg1,
  CurriculumImg2,
  CurriculumImg3,
  CustomizedPrograms,
  DoubleArrowRight,
  EducationalConsultation,
  FeaturedCourse3,
  GoldStar,
  Internship,
  LanguageIcon,
  Lectures,
  LicenseTraining,
  OnlineEducation,
  PostGraduateTraining,
  R2Favicon,
  Share,
  SimulationTraining,
  Star,
  StudentsTraining,
  Subject,
  UserAvatarImg,
  Workshop,
} from "../../../../images";
import { AiFillStar, AiOutlineLock } from "react-icons/ai";
import {
  conflicts,
  courses,
  Disclosure,
  duration,
  ethics,
  Funding,
  instructor,
  No,
  optional_extras,
  pre_requisite,
  provided_by,
  required,
  study_method,
} from "../../../helpers/LanguageConstant";

const DetailPageIntro = ({ getCourseDetailId, name }) => {
  return (
    <StyledDiv dir="rtl">
      {getCourseDetailId?.title_AR === undefined ? (
        <>...</>
      ) : (
        <CourseDisplayNameDiv>
          <h1>{parse(`${getCourseDetailId?.title_AR}`)}</h1>
        </CourseDisplayNameDiv>
      )}
      {getCourseDetailId?.description_AR === undefined ? (
        <>...</>
      ) : (
        <p>{parse(`${getCourseDetailId?.description_AR}`)}</p>
      )}
      <Row gutter={[12, 12]}>
        {getCourseDetailId?.departmentName_AR !== "" &&
          getCourseDetailId?.departmentName_AR !== "-" && (
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <CourseDetailsCardsDiv>
                <img loading="lazy"alt={""} height={40} width={40} src={CourseDetailCards1} />
                <CourseDetailsCardsContentDiv>
                  <h3>
                    {name} {provided_by}
                  </h3>
                  {getCourseDetailId?.departmentName_AR === undefined ? (
                    <>...</>
                  ) : (
                    <h3 className="value_en">
                      {getCourseDetailId?.departmentName_AR}
                    </h3>
                  )}
                </CourseDetailsCardsContentDiv>
              </CourseDetailsCardsDiv>
            </Col>
          )}
        {getCourseDetailId?.duration_AR !== "" &&
          getCourseDetailId?.duration_AR !== "-" && (
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <CourseDetailsCardsDiv>
                <img loading="lazy"alt={""} height={40} width={40} src={CourseDetailCards2} />
                <CourseDetailsCardsContentDiv>
                  <h3>{duration}</h3>
                  {getCourseDetailId?.duration_AR === undefined ? (
                    <>...</>
                  ) : (
                    <h3 className="value_en">
                      {getCourseDetailId?.duration_AR}
                    </h3>
                  )}
                </CourseDetailsCardsContentDiv>
              </CourseDetailsCardsDiv>
            </Col>
          )}
        {getCourseDetailId?.duration_AR !== "" &&
          getCourseDetailId?.duration_AR !== "-" && (
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <CourseDetailsCardsDiv>
                <img loading="lazy"alt={""} height={40} width={40} src={CourseDetailCards3} />
                <CourseDetailsCardsContentDiv>
                  <h3>{study_method}</h3>
                  {getCourseDetailId?.duration_AR === undefined ? (
                    <>...</>
                  ) : (
                    <h3 className="value_en">
                      {getCourseDetailId?.duration_AR}
                    </h3>
                  )}
                </CourseDetailsCardsContentDiv>
              </CourseDetailsCardsDiv>
            </Col>
          )}
        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
          <CourseDetailsCardsDiv>
            <img loading="lazy"alt={""} height={40} width={40} src={CourseDetailCards4} />
            <CourseDetailsCardsContentDiv>
              <h3>{pre_requisite}</h3>
              {getCourseDetailId?.preRequisite === undefined ? (
                <>...</>
              ) : (
                <>
                  {getCourseDetailId?.preRequisite ? (
                    <h3 className="value_en">
                      {pre_requisite} {required}
                    </h3>
                  ) : (
                    <h3 className="value_en">
                      {No} {pre_requisite} {required}
                    </h3>
                  )}
                </>
              )}
            </CourseDetailsCardsContentDiv>
          </CourseDetailsCardsDiv>
        </Col>
        {getCourseDetailId?.optionalExtras_AR !== "" &&
          getCourseDetailId?.optionalExtras_AR !== "-" && (
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <CourseDetailsCardsDiv>
                <img loading="lazy"alt={""} height={40} width={40} src={CourseDetailCards5} />
                <CourseDetailsCardsContentDiv>
                  <h3>{optional_extras}</h3>

                  {getCourseDetailId?.optionalExtras_AR === undefined ? (
                    <>...</>
                  ) : (
                    <h3 className="value_en">
                      {getCourseDetailId?.optionalExtras_AR}
                    </h3>
                  )}
                </CourseDetailsCardsContentDiv>
              </CourseDetailsCardsDiv>
            </Col>
          )}
        {getCourseDetailId?.instructorName_AR !== "" &&
          getCourseDetailId?.instructorName_AR !== "-" && (
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <CourseDetailsCardsDiv>
                <img loading="lazy"alt={""} height={40} width={40} src={CourseDetailCards6} />
                <CourseDetailsCardsContentDiv>
                  <h3>{instructor}</h3>
                  {getCourseDetailId?.instructorName_AR === undefined ? (
                    <>...</>
                  ) : (
                    <h3 className="value_en">
                      {getCourseDetailId?.instructorName_AR}
                    </h3>
                  )}
                </CourseDetailsCardsContentDiv>
              </CourseDetailsCardsDiv>
            </Col>
          )}
        {getCourseDetailId?.courseEthics_AR !== "" &&
          getCourseDetailId?.courseEthics_AR !== "-" && (
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <CourseDetailsCardsDiv>
                <img loading="lazy"alt={""} height={40} width={40} src={CourseDetailCards7} />
                <CourseDetailsCardsContentDiv>
                  <h3>
                    {name} {ethics}
                  </h3>
                  {getCourseDetailId?.courseEthics_AR === undefined ? (
                    <>...</>
                  ) : (
                    <h3 className="value_en">
                      {getCourseDetailId?.courseEthics_AR}
                    </h3>
                  )}
                </CourseDetailsCardsContentDiv>
              </CourseDetailsCardsDiv>
            </Col>
          )}{" "}
        {getCourseDetailId?.disclosure_AR !== "" &&
          getCourseDetailId?.disclosure_AR !== "-" && (
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <CourseDetailsCardsDiv>
                <img loading="lazy"alt={""} height={40} width={40} src={CourseDetailCards8} />
                <CourseDetailsCardsContentDiv>
                  <h3>{Disclosure}</h3>
                  {getCourseDetailId?.disclosure_AR === undefined ? (
                    <>...</>
                  ) : (
                    <h3 className="value_en">
                      {getCourseDetailId?.disclosure_AR}
                    </h3>
                  )}
                </CourseDetailsCardsContentDiv>
              </CourseDetailsCardsDiv>
            </Col>
          )}
        {getCourseDetailId?.conflicts_AR !== "" &&
          getCourseDetailId?.conflicts_AR !== "-" && (
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <CourseDetailsCardsDiv>
                <img loading="lazy"alt={""} height={40} width={40} src={CourseDetailCards9} />
                <CourseDetailsCardsContentDiv>
                  <h3>{conflicts}</h3>
                  {getCourseDetailId?.conflicts_AR === undefined ? (
                    <>...</>
                  ) : (
                    <h3 className="value_en">
                      {getCourseDetailId?.conflicts_AR}
                    </h3>
                  )}
                </CourseDetailsCardsContentDiv>
              </CourseDetailsCardsDiv>
            </Col>
          )}
        {getCourseDetailId?.funding_AR !== "" &&
          getCourseDetailId?.funding_AR !== "-" && (
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <CourseDetailsCardsDiv>
                <img loading="lazy"alt={""} height={40} width={40} src={CourseDetailCards10} />
                <CourseDetailsCardsContentDiv>
                  <h3>{Funding}</h3>
                  {getCourseDetailId?.funding_AR === undefined ? (
                    <>...</>
                  ) : (
                    <h3 className="value_en">
                      {getCourseDetailId?.funding_AR}
                    </h3>
                  )}
                </CourseDetailsCardsContentDiv>
              </CourseDetailsCardsDiv>
            </Col>
          )}
      </Row>
    </StyledDiv>
  );
};

export default DetailPageIntro;

const StyledDiv = styled.div`
  img {
    max-width: 100% !important;
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

const CourseDetailsCardsDiv = styled.div`
  display: flex;
  background: #fff;
  padding: 20px;
  border: 1px solid #eaeaea;
  border-radius: 9px;
  // height: 109px;
  align-items: center;
  justify-content: start;

  @media (min-width: 992px) {
    h3 {
      margin-right: 20px;
      margin-bottom: 0px;
      font-size: 14px;
      font-weight: 500;
    }
  }
  @media (max-width: 991px) {
    h3 {
      margin-right: 0px;
      margin-bottom: 0px;
      font-size: 14px;
      font-weight: 500;
    }
  }
  img {
    object-fit: contain;
  }
  @media (max-width: 992px) {
    flex-direction: column;
    text-align: center;
    height: 100%;
    justify-content: center;
    h3 {
      margin-top: 0px;
      margin-left: 0;
    }
  }
`;

const CourseDetailsCardsContentDiv = styled.div`
  display: grid;
  .description {
    color: #a87e33;
  }
  h3 {
    // font-family: "GESSTwoBold", sans-serif;
  }
  .value_en {
    color: #a87e33;
    font-family: "GESSTwoLight", sans-serif;
    font-size: 12px;
  }
`;
