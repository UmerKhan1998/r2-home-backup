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
} from "../../../images";
import { AiFillStar, AiOutlineLock } from "react-icons/ai";

const DetailPageIntro = ({ getCourseDetailId, name, loading }) => {
  return (
    <StyledDiv>
      {getCourseDetailId?.title_EN === undefined ? (
        <>...</>
      ) : (
        <CourseDisplayNameDiv>
          <h1>{parse(`${getCourseDetailId?.title_EN}`)}</h1>
        </CourseDisplayNameDiv>
      )}
      {getCourseDetailId?.description_EN === undefined ? (
        <>...</>
      ) : (
        <p>{parse(`${getCourseDetailId?.description_EN}`)}</p>
      )}
      <Row gutter={[12, 12]}>
        {getCourseDetailId?.departmentName_EN !== "" &&
          getCourseDetailId?.departmentName_EN !== "-" && (
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <CourseDetailsCardsDiv>
                <img loading="lazy"alt={""} height={40} width={40} src={CourseDetailCards1} />
                <CourseDetailsCardsContentDiv>
                  <h3>{name} Provided by</h3>
                  {getCourseDetailId?.departmentName_EN === undefined ? (
                    <>...</>
                  ) : (
                    <h3 className="value_en">
                      {getCourseDetailId?.departmentName_EN}
                    </h3>
                  )}
                </CourseDetailsCardsContentDiv>
              </CourseDetailsCardsDiv>
            </Col>
          )}
        {getCourseDetailId?.duration_EN !== "" &&
          getCourseDetailId?.duration_EN !== "-" && (
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <CourseDetailsCardsDiv>
                <img loading="lazy"alt={""} height={40} width={40} src={CourseDetailCards2} />
                <CourseDetailsCardsContentDiv>
                  <h3>Duration</h3>
                  {getCourseDetailId?.duration_EN === undefined ? (
                    <>...</>
                  ) : (
                    <h3 className="value_en">
                      {getCourseDetailId?.duration_EN}
                    </h3>
                  )}
                </CourseDetailsCardsContentDiv>
              </CourseDetailsCardsDiv>
            </Col>
          )}
        {getCourseDetailId?.duration_EN !== "" &&
          getCourseDetailId?.duration_EN !== "-" && (
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <CourseDetailsCardsDiv>
                <img loading="lazy"alt={""} height={40} width={40} src={CourseDetailCards3} />
                <CourseDetailsCardsContentDiv>
                  <h3>Study method</h3>
                  {getCourseDetailId?.duration_EN === undefined ? (
                    <>...</>
                  ) : (
                    <h3 className="value_en">
                      {getCourseDetailId?.duration_EN}
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
              <h3>Pre-requisite</h3>
              {getCourseDetailId?.preRequisite === undefined ? (
                <>...</>
              ) : (
                <>
                  {getCourseDetailId?.preRequisite ? (
                    <h3 className="value_en">Pre-requisite required</h3>
                  ) : (
                    <h3 className="value_en">No Pre-requisite required</h3>
                  )}
                </>
              )}
            </CourseDetailsCardsContentDiv>
          </CourseDetailsCardsDiv>
        </Col>
        <>
          {getCourseDetailId?.optionalExtras_EN !== "" &&
            getCourseDetailId?.optionalExtras_EN !== "-" && (
              <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                <CourseDetailsCardsDiv>
                  <img loading="lazy"alt={""} height={40} width={40} src={CourseDetailCards5} />
                  <CourseDetailsCardsContentDiv>
                    <h3>Optional extras</h3>
                    {getCourseDetailId?.optionalExtras_EN === undefined ? (
                      <>...</>
                    ) : (
                      <h3 className="value_en">
                        {getCourseDetailId?.optionalExtras_EN}
                      </h3>
                    )}
                  </CourseDetailsCardsContentDiv>
                </CourseDetailsCardsDiv>
              </Col>
            )}
        </>
        <>
          {getCourseDetailId?.instructorName_EN !== "" &&
            getCourseDetailId?.instructorName_EN !== "-" && (
              <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                <CourseDetailsCardsDiv>
                  <img loading="lazy"alt={""} height={40} width={40} src={CourseDetailCards6} />
                  <CourseDetailsCardsContentDiv>
                    <h3>Instructor</h3>
                    {getCourseDetailId?.instructorName_EN === undefined ? (
                      <>...</>
                    ) : (
                      <h3 className="value_en">
                        {getCourseDetailId?.instructorName_EN}
                      </h3>
                    )}
                  </CourseDetailsCardsContentDiv>
                </CourseDetailsCardsDiv>
              </Col>
            )}
        </>
        {getCourseDetailId?.courseEthics_EN !== "" &&
          getCourseDetailId?.courseEthics_EN !== "-" && (
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <CourseDetailsCardsDiv>
                <img loading="lazy"alt={""} height={40} width={40} src={CourseDetailCards7} />
                <CourseDetailsCardsContentDiv>
                  <h3>{name} Ethics</h3>
                  {getCourseDetailId?.courseEthics_EN === undefined ? (
                    <>...</>
                  ) : (
                    <h3 className="value_en">
                      {getCourseDetailId?.courseEthics_EN}
                    </h3>
                  )}
                </CourseDetailsCardsContentDiv>
              </CourseDetailsCardsDiv>
            </Col>
          )}{" "}
        {getCourseDetailId?.disclosure_EN !== "" &&
          getCourseDetailId?.disclosure_EN !== "-" && (
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <CourseDetailsCardsDiv>
                <img loading="lazy"alt={""} height={40} width={40} src={CourseDetailCards8} />
                <CourseDetailsCardsContentDiv>
                  <h3>Disclosure</h3>
                  {getCourseDetailId?.disclosure_EN === undefined ? (
                    <>...</>
                  ) : (
                    <h3 className="value_en">
                      {getCourseDetailId?.disclosure_EN}
                    </h3>
                  )}
                </CourseDetailsCardsContentDiv>
              </CourseDetailsCardsDiv>
            </Col>
          )}
        {getCourseDetailId?.conflicts_EN !== "" &&
          getCourseDetailId?.conflicts_EN !== "-" && (
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <CourseDetailsCardsDiv>
                <img loading="lazy"alt={""} height={40} width={40} src={CourseDetailCards9} />
                <CourseDetailsCardsContentDiv>
                  <h3>Conflicts</h3>
                  {getCourseDetailId?.conflicts_EN === undefined ? (
                    <>...</>
                  ) : (
                    <h3 className="value_en">
                      {getCourseDetailId?.conflicts_EN}
                    </h3>
                  )}
                </CourseDetailsCardsContentDiv>
              </CourseDetailsCardsDiv>
            </Col>
          )}
        {getCourseDetailId?.funding_EN !== "" &&
          getCourseDetailId?.funding_EN !== "-" && (
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <CourseDetailsCardsDiv>
                <img loading="lazy"alt={""} height={40} width={40} src={CourseDetailCards10} />
                <CourseDetailsCardsContentDiv>
                  <h3>Funding</h3>
                  {getCourseDetailId?.funding_EN === undefined ? (
                    <>...</>
                  ) : (
                    <h3 className="value_en">
                      {getCourseDetailId?.funding_EN}
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

const StyledDiv=styled.div`
img{max-width: 100% !important;
}
`

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

const CourseDetailsCardsDiv = styled.div`
  display: flex;
  background: #fff;
  padding: 20px 15px;
  border: 1px solid #eaeaea;
  border-radius: 9px;
  // height: 109px;
  align-items: center;
  justify-content: start;

  h3 {
    margin-left: 20px;
    margin-bottom: 0px;
    font-size: 13px;
    font-weight: 500;
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
      margin-top: 5px;
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
    font-family: "TitilliumSemiBold", sans-serif;
  }
  .value_en {
    font-size: 13px;
    color: #a87e33;
  }
`;
