import React from "react";
import Head from "next/head";
import styled from "styled-components";
import Image from "next/image";

import Hero from "../../src/components/rtl/Hero";

import { Breadcrumb, Col, Row } from "antd";
import {
  AboutUsOurVision,
  CardImg,
  CustomizedPrograms,
  EducationalConsultation,
  FacultyGroup,
  FeaturedCourse1,
  FeaturedCourse2,
  FeaturedCourse3,
  FeaturedCourse4,
  GoldenFan,
  HeadMessage,
  Internship,
  IntroductionImage,
  LatestNewsResource1,
  LatestNewsResource2,
  LatestNewsResource3,
  LearningInstituteImage,
  LeftSideDesign,
  LicenseTraining,
  OnlineEducation,
  Points,
  PostGraduateTraining,
  R2Favicon,
  RequestSubmissionImg,
  Service,
  ServiceImg,
  SideDesign,
  SimulationTraining,
  StudentsTraining,
  Workshop,
} from "../../images";

import CustomButton from "../../src/components/rtl/Button";
import LearningInstitueServices from "../../src/components/rtl/LearningInstitueServices";
import Header from "../../src/components/rtl/header";
import Footer from "../../src/components/rtl/footer";

const RequestFinish = () => {
  const FeaturedCoursesCarousalData = [
    {
      image: CardImg,
      featured_type: "Dental Esthetics",
      enrolled_students: 32,
      course_name: "Anesthesiology",
      time: "1 hours 30 minutes",
      rating: 4.9,
      total_ratings: 8,
      price: 35.0,
      onSite: false,
      onLine: true,
    },
    {
      image: CardImg,
      featured_type: "Dental Esthetics",
      enrolled_students: 32,
      course_name: "Anesthesiology",
      time: "1 hours 30 minutes",
      rating: 4.9,
      total_ratings: 8,
      price: 0,
      onSite: false,
      onLine: true,
    },
    {
      image: CardImg,
      featured_type: "Oral Surgery",
      enrolled_students: 32,
      course_name: "Anesthesiology",
      time: "1 hours 30 minutes",
      rating: 4.9,
      total_ratings: 8,
      price: 35.0,
      onSite: false,
      onLine: true,
    },
    {
      image: CardImg,
      featured_type: "Dental Esthetics",
      enrolled_students: 32,
      course_name: "Anesthesiology",
      time: "1 hours 30 minutes",
      rating: 4.9,
      total_ratings: 8,
      price: 0,
      onSite: false,
      onLine: true,
    },
    {
      image: CardImg,
      featured_type: "Dental Esthetics",
      enrolled_students: 32,
      course_name: "Anesthesiology",
      time: "1 hours 30 minutes",
      rating: 4.9,
      total_ratings: 8,
      price: 35.0,
      onSite: false,
      onLine: true,
    },
    {
      image: CardImg,
      featured_type: "Dental Esthetics",
      enrolled_students: 32,
      course_name: "Anesthesiology",
      time: "1 hours 30 minutes",
      rating: 4.9,
      total_ratings: 8,
      price: 0,
      onSite: false,
      onLine: true,
    },
    {
      image: CardImg,
      featured_type: "Dental Esthetics",
      enrolled_students: 32,
      course_name: "Anesthesiology",
      time: "1 hours 30 minutes",
      rating: 4.9,
      total_ratings: 8,
      price: 0,
      onSite: false,
      onLine: true,
    },
    {
      image: CardImg,
      featured_type: "Dental Esthetics",
      enrolled_students: 32,
      course_name: "Anesthesiology",
      time: "1 hours 30 minutes",
      rating: 4.9,
      total_ratings: 8,
      price: 35.0,
      onSite: false,
      onLine: true,
    },
    {
      image: CardImg,
      featured_type: "Dental Esthetics",
      enrolled_students: 32,
      course_name: "Anesthesiology",
      time: "1 hours 30 minutes",
      rating: 4.9,
      total_ratings: 8,
      price: 0,
      onSite: false,
      onLine: true,
    },
    {
      image: CardImg,
      featured_type: "Dental Esthetics",
      enrolled_students: 32,
      course_name: "Anesthesiology",
      time: "1 hours 30 minutes",
      rating: 4.9,
      total_ratings: 8,
      price: 35.0,
      onSite: false,
      onLine: true,
    },
  ];

  const whatWeOfferArr = [
    {
      img: Service,
      title: "Service 01",
    },
    {
      img: Service,
      title: "Service 02",
    },
    {
      img: Service,
      title: "Service 03",
    },
    {
      img: Service,
      title: "Service 04",
    },
    {
      img: Service,
      title: "Service 05",
    },
    {
      img: Service,
      title: "Service 06",
    },
  ];

  return (
    <div className="container">
      <Head>
        <title>Riyadh Second Health Cluster</title>
        <link rel="icon" href={R2Favicon} />
      </Head>
      <body>
        <Header />

        <SideDesignDiv>
          <img loading="lazy"alt={""} height={500} width={500} src={SideDesign} />
        </SideDesignDiv>

        <MainWhatWeofferingDivSection>
          <Container>
            <WhatWeofferingDivSection>
              <h1>Your Payment was Successful!</h1>
              {/* <img loading="lazy"src={RequestSubmissionImg} /> */}
              <img loading="lazy"alt={""} height={40} width={40} src={RequestSubmissionImg} />

              <h2>Thank you so much for your payment</h2>
              <p className={"payment-p"}>
                Your payment of SAR 35.00 was successfully completed
              </p>
              <LinkDiv>
                <LinkP>View reciept</LinkP>
                <CustomButton
                  customStyle={{
                    background: "#105F43",
                    color: "#fff",
                  }}
                >
                  Go the Learner Portal
                </CustomButton>
              </LinkDiv>
              <p className="p-bold">
                Your password has been sent to your email.
              </p>
              <p className="p-bold">
                Kindly check your email and login using this password
              </p>
            </WhatWeofferingDivSection>
          </Container>
        </MainWhatWeofferingDivSection>
        <Footer />
      </body>
    </div>
  );
};

export default RequestFinish;

const BreadcrumbDiv = styled.div`
  padding: 20px 70px;
  // border-bottom: 1px solid #dddddd;
`;

const LeftSideDesignDiv = styled.div`
  position: absolute;
  display: flex;
  justify-content: start;
  width: 100%;
  z-index: 99;
  height: 650px;
  img {
  width: 100%;
  margin-top: 50px;
  }
`;

const AssociateCardSection = styled.div`
  padding: 80px 77px;
`;

const AssociateCardDiv = styled.div`
  background: rgba(168, 126, 51, 0.06);
  padding: 35px;
  border-radius: 9px;
  h1 {
    font-family: "GESSTwoBold", sans-serif;
    // font-weight: 700;
    font-size: 30px;
    line-height: 46px;
    color: #105f43;
    margin-block: 14px;
  }
  p {
    line-height: 28px;
  }
`;

const AssociateCardRow = styled(Row)``;

const AssociateCardCol = styled(Col)``;

const AboutSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 1200px) {
    height: 750px !important;
  }
  @media (max-width: 1199px) {
    height: 700px !important;
  }
`;

const FacultySection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 1200px) {
    height: 750px !important;
  }
  @media (max-width: 1199px) {
    height: 700px !important;
  }
`;

const StyledAboutSectionRow = styled(Row)`
  display: flex;
  justify-content: center;
  padding-inline: 70px;
  margin-top: 30px;
  margin-left: 0px !important;
  margin-right: 0px !important;
  @media (max-width: 1199px) {
    margin-inline: 8%;
    margin-top: 0px;
  }
`;

const StyledColImg = styled(Col)`
  display: flex;
  justify-content: start;
  align-items: center;
  img {
    height: 510px;
    margin-top: -30px;
    object-fit: cover;
  }
  @media (max-width: 1199px) {
    img {
      height: 250px;
      margin-top: 0px;
    }
  }
`;

const StyledColFacultyImg = styled(Col)`
  display: flex;
  justify-content: end;
  align-items: center;
  img {
    height: 510px;
    margin-top: -30px;
    object-fit: cover;
  }
  @media (max-width: 1199px) {
    img {
      height: 250px;
      margin-top: 0px;
    }
  }
`;

const AboutUsContentCol = styled(Col)`
  flex-direction: column;
  display: flex;
  justify-content: center;

  p {
    font-size: 16px;
    margin-bottom: 10px;
    line-height: 28px !important;
    color: #636363;
  }
  h1 {
    font-size: 40px;
    // font-weight: 700;
    line-height: 46px;
    color: #105f43;
  }
  h3 {
    font-weight: 400;
    font-size: 22px;
    line-height: 34px;
    color: #000000;
  }
  @media (max-width: 991px) {
    h1 {
      font-size: 30px;
      // font-weight: 700;
      line-height: 36px;
      color: #105f43;
    }
  }
`;

const MessageSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(16, 95, 67, 0.05);
  @media (min-width: 1200px) {
    height: 660px !important;
  }
  @media (max-width: 1199px) {
    height: 700px !important;
  }
`;

const StyledMessageSectionRow = styled(Row)`
  display: flex;
  justify-content: center;
  padding-inline: 70px;
  margin-top: 30px;
  margin-left: 0px !important;
  margin-right: 0px !important;
  @media (max-width: 1199px) {
    margin-inline: 8%;
    margin-top: 0px;
  }
`;

const StyledColMessageImg = styled(Col)`
  display: flex;
  justify-content: end;
  align-items: center;
  img {
    height: 510px;
    margin-top: -30px;
    object-fit: cover;
  }
  @media (max-width: 1199px) {
    img {
      height: 250px;
      margin-top: 0px;
    }
  }
`;

const MessageContentCol = styled(Col)`
  flex-direction: column;
  display: flex;
  justify-content: center;

  p {
    font-size: 16px;
    margin-bottom: 10px;
    line-height: 28px !important;
    color: #636363;
  }
  h1 {
    font-size: 40px;
    // font-weight: 700;
    line-height: 46px;
    color: #105f43;
  }
  h3 {
    font-weight: 400;
    font-size: 22px;
    line-height: 34px;
    color: #000000;
  }
  @media (max-width: 991px) {
    h1 {
      font-size: 30px;
      // font-weight: 700;
      line-height: 36px;
      color: #105f43;
    }
  }
`;

const GoalsAndObjectivesSection = styled.div`
  padding: 80px 80px 0;
  h1 {
    font-size: 40px;
    // font-weight: 700;
    line-height: 46px;
    color: #105f43;
  }
  p {
    color: #636363;
    line-height: 28px;
    font-weight: 400;
    font-size: 16px;
  }
`;

const PointsDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 14px;

  p {
    margin-bottom: 0px;
    margin-left: 12px;
    font-size: 16px;
  }
`;

const PointsRow = styled(Row)`
  padding-inline: 20px;
`;

const MainBreadcrumbDiv = styled.div`
  border-bottom: 1px solid #dddddd;
`;

const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 576px) {
    max-width: 576px;
  }

  @media (min-width: 768px) {
    max-width: 768px;
  }

  @media (min-width: 992px) {
    min-width: 992px;
  }

  @media only screen and (min-width: 1160px) and (max-width: 1258px) {
    min-width: 1160px;
  }

  @media only screen and (min-width: 1259px) and (max-width: 1359px) {
    min-width: 1260px;
  }

  @media (min-width: 1342px) {
    min-width: 1340px;
  }
`;

const SideDesignDiv = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
  width: 100%;
  z-index: 1 !important;
  height: 580px;
`;

const MainWhatWeofferingDivSection = styled.div`
  position: relative;
  z-index: 3 !important;
  height: 640px !important;
  display: flex;
  align-items: center;
`;

const WhatWeofferingDivSection = styled.div`
  @media (min-width: 992px) {
    padding: 70px 80px 0px;
  }
  @media (max-width: 991px) {
    padding: 70px 8%;
  }
  text-align: center;
  h1 {
    font-family: "GESSTwoBold";
    // font-weight: 700;
    color: #181818;
  }

  img {
    margin-block: 20px;
    height: 80px;
  }

  .payment-p {
    color: #b7b7b7 !important;
  }

  .p-bold {
    color: #181818;
    font-family: HacenSaudiArabiaRegular, sans-serif;
    font-weight: 500;
    font-size: 16px;
  }
`;

const WhatWeOfferingRow = styled(Row)``;

const WhatWeOfferingCol = styled(Col)`
  h1 {
    // font-weight: 700;
    font-size: 40px;
    line-height: 46px;
    color: #105f43;
    font-family: "GESSTwoBold", sans-serif;
  }
  h3 {
    font-weight: 400;
    font-size: 22px;
  }
  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 27px;
    color: #636363;
  }
  .service-bg {
    width: 100%;
  }
  .request-pDiv {
    margin: 35px 0 25px;
    p {
      margin-bottom: 0px;
      line-height: 40px;
    }
  }
`;

const WhatWeOfferCardsDiv = styled.div`
  display: flex;
  background: #fff;
  padding: 20px 17px;
  box-shadow: 6px 6px 25px rgba(0, 0, 0, 0.09);
  border-radius: 9px;
  height: 109px;
  align-items: center;
  justify-content: start;

  h3 {
    margin-left: 10px;
    margin-bottom: 0px;
    font-size: 14px;
    font-weight: 500;
  }
  img {
  }
`;

const LinkP = styled.p`
  color: #a87e33;
  cursor: pointer !important;
  width: 120px;
  margin-bottom: 0px;
  &:hover {
    text-decoration: underline !important;
  }
`;

const LinkDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
