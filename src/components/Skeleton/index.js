import React, { useState,useLayoutEffect } from "react";
import { Card, Col, Row, Rate, Badge, Divider } from "antd";
import styled from "styled-components";
import { GiAlarmClock } from "react-icons/gi";
import { FiMonitor } from "react-icons/fi";
import { Clock, OnSite, TV } from "../../../images";
import Image from "next/image";

const FeaturedCard = ({
  Img,
  FeaturedType,
  EnrolledStudents,
  CourseName,
  Time,
  Rating,
  TotalRatings,
  MinPrice,
  MaxPrice,
  onSite,
  onLine,
  SubCategory,
  paidFree,
  cme,
  name,
  page,
}) => {
  const [isDesktop, setIsDesktop] = useState(false);

  const DesktopView = (
    <>
  {page === "courses-landing-page" ? (
    <StyledCardsDiv>
      <>
        <Card
          hoverable
          cover={
            <StyledImageTitleDiv>
              {/* <StyledCmeDiv>
                      <p>(16 CME)</p>
                    </StyledCmeDiv> */}
              <StyledImageWidthFullDiv>
                {/* <img loading="lazy"alt={""} src={Img} height={500} width={500} alt="example" /> */}
                {/* <img loading="lazy"alt={""} src={''} height={500} width={500} alt="example" /> */}
              </StyledImageWidthFullDiv>
            </StyledImageTitleDiv>
          }
        >
          <FeaturedTypeRow>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
          </FeaturedTypeRow>
          <DisplayNameRow>
            <h1>{CourseName}</h1>
          </DisplayNameRow>
          <StyledSkeletonNameP></StyledSkeletonNameP>
          <StyledSkeletonNameP1></StyledSkeletonNameP1>
          <StyledSkeletonNameP2></StyledSkeletonNameP2>
          <FeaturedTypeRow1>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
          </FeaturedTypeRow1>

          <Divider />
          <FeaturedTypeRow1>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
          </FeaturedTypeRow1>
        </Card>
      </>
    </StyledCardsDiv>
  ) : page === "home-page" ? (
    <StyledCardsDiv2>
      <>
        <Card
          hoverable
          cover={
            <StyledImageTitleDiv>
              {/* <StyledCmeDiv>
                      <p>(16 CME)</p>
                    </StyledCmeDiv> */}
              <StyledImageWidthFullDiv>
                {/* <img loading="lazy"alt={""} src={Img} height={500} width={500} alt="example" /> */}
                {/* <img loading="lazy"alt={""} src={''} height={500} width={500} alt="example" /> */}
              </StyledImageWidthFullDiv>
            </StyledImageTitleDiv>
          }
        >
          <FeaturedTypeRow>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
          </FeaturedTypeRow>
          <DisplayNameRow>
            <h1>{CourseName}</h1>
          </DisplayNameRow>
          <StyledSkeletonNameP></StyledSkeletonNameP>
          <StyledSkeletonNameP1></StyledSkeletonNameP1>
          <StyledSkeletonNameP2></StyledSkeletonNameP2>
          <FeaturedTypeRow1>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
          </FeaturedTypeRow1>

          <Divider />
          <FeaturedTypeRow1>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
          </FeaturedTypeRow1>
        </Card>
      </>
    </StyledCardsDiv2>
  ) : (
    <StyledCardsDiv1>
      <>
        <Card
          hoverable
          cover={
            <StyledImageTitleDiv>
              {/* <StyledCmeDiv>
                  <p>(16 CME)</p>
                </StyledCmeDiv> */}
              <StyledImageWidthFullDiv>
                {/* <img loading="lazy"alt={""} src={Img} height={500} width={500} alt="example" /> */}
                {/* <img loading="lazy"alt={""} src={''} height={500} width={500} alt="example" /> */}
              </StyledImageWidthFullDiv>
            </StyledImageTitleDiv>
          }
        >
          <FeaturedTypeRow>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
          </FeaturedTypeRow>
          <DisplayNameRow>
            <h1>{CourseName}</h1>
          </DisplayNameRow>
          <StyledSkeletonNameP></StyledSkeletonNameP>
          <StyledSkeletonNameP1></StyledSkeletonNameP1>
          <StyledSkeletonNameP2></StyledSkeletonNameP2>
          <FeaturedTypeRow1>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
          </FeaturedTypeRow1>

          <Divider />
          <FeaturedTypeRow1>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
          </FeaturedTypeRow1>
        </Card>
      </>
    </StyledCardsDiv1>
  )}
  </>
  )

  const MobileView = (
    <>
  {page === "courses-landing-page" ? (
    <StyledCardsDiv>
      <>
        <Card
          hoverable
          cover={
            <StyledImageTitleDiv>
              {/* <StyledCmeDiv>
                      <p>(16 CME)</p>
                    </StyledCmeDiv> */}
              <StyledImageWidthFullDiv>
                {/* <img loading="lazy"alt={""} src={Img} height={500} width={500} alt="example" /> */}
                {/* <img loading="lazy"alt={""} src={''} height={500} width={500} alt="example" /> */}
              </StyledImageWidthFullDiv>
            </StyledImageTitleDiv>
          }
        >
          {/* <FeaturedTypeRow>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
          </FeaturedTypeRow> */}
          <DisplayNameRow>
            <h1>{CourseName}</h1>
          </DisplayNameRow>
          {/* <StyledSkeletonNameP></StyledSkeletonNameP> */}
          {/* <StyledSkeletonNameP1></StyledSkeletonNameP1> */}
          {/* <StyledSkeletonNameP2></StyledSkeletonNameP2> */}
          <FeaturedTypeRow1>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
          </FeaturedTypeRow1>

          <Divider />
          <FeaturedTypeRow1>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
          </FeaturedTypeRow1>
        </Card>
      </>
    </StyledCardsDiv>
  ) : page === "home-page" ? (
    <StyledCardsDiv2>
      <>
        <Card
          hoverable
          cover={
            <StyledImageTitleDiv>
              {/* <StyledCmeDiv>
                      <p>(16 CME)</p>
                    </StyledCmeDiv> */}
              <StyledImageWidthFullDiv>
                {/* <img loading="lazy"alt={""} src={Img} height={500} width={500} alt="example" /> */}
                {/* <img loading="lazy"alt={""} src={''} height={500} width={500} alt="example" /> */}
              </StyledImageWidthFullDiv>
            </StyledImageTitleDiv>
          }
        >
          <FeaturedTypeRow>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
          </FeaturedTypeRow>
          <DisplayNameRow>
            <h1>{CourseName}</h1>
          </DisplayNameRow>
          <StyledSkeletonNameP></StyledSkeletonNameP>
          <StyledSkeletonNameP1></StyledSkeletonNameP1>
          <StyledSkeletonNameP2></StyledSkeletonNameP2>
          <FeaturedTypeRow1>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
          </FeaturedTypeRow1>

          <Divider />
          <FeaturedTypeRow1>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
          </FeaturedTypeRow1>
        </Card>
      </>
    </StyledCardsDiv2>
  ) : (
    <StyledCardsDiv1>
      <>
        <Card
          hoverable
          cover={
            <StyledImageTitleDiv>
              {/* <StyledCmeDiv>
                  <p>(16 CME)</p>
                </StyledCmeDiv> */}
              <StyledImageWidthFullDiv>
                {/* <img loading="lazy"alt={""} src={Img} height={500} width={500} alt="example" /> */}
                {/* <img loading="lazy"alt={""} src={''} height={500} width={500} alt="example" /> */}
              </StyledImageWidthFullDiv>
            </StyledImageTitleDiv>
          }
        >
          <FeaturedTypeRow>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
          </FeaturedTypeRow>
          <DisplayNameRow>
            <h1>{CourseName}</h1>
          </DisplayNameRow>
          <StyledSkeletonNameP></StyledSkeletonNameP>
          <StyledSkeletonNameP1></StyledSkeletonNameP1>
          <StyledSkeletonNameP2></StyledSkeletonNameP2>
          <FeaturedTypeRow1>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
          </FeaturedTypeRow1>

          <Divider />
          <FeaturedTypeRow1>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
          </FeaturedTypeRow1>
        </Card>
      </>
    </StyledCardsDiv1>
  )}
  </>

  )
  
  //layout effect to check whether the screen is desktop or mobile
  useLayoutEffect(() => {
    if (window.innerWidth > 991) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth > 991) {
        setIsDesktop(true);
      } else {
        setIsDesktop(false);
      }
    };
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);
  return <>{isDesktop ? DesktopView : MobileView}</>;
};

export default FeaturedCard;

const StyledCardsDiv = styled.div`
  // padding: 35px 12px;
  // padding: 0px 12px;

  .ant-card-cover img {
    border-radius: 23px !important;
    height: 230px !important;
    width: 100% !important;
    padding: 17px !important;
    object-fit: cover !important;
  }
  .ant-card-bordered {
    border-radius: 15px !important;
  }
  .ant-card-body {
    padding: 0px 14px 14px !important;
  }
  .ant-rate {
    color: #f8d727 !important;
    font-size: 15px !important;
  }
  .ant-btn: hover;
  .ant-divider-horizontal {
    margin-block: 5px;
  }
  .ant-divider {
    border-top: 2px solid rgba(0, 0, 0, 0.06) !important;
  }
  .ant-rate-star {
    margin-right: 4px !important;
  }

  @media (max-width: 500px) {
    overflow-x: hidden;
    border-radius:15px;
    .ant-card-cover img {
      border-radius: 23px !important;
      height: 170px !important;
      width: 100% !important;
      padding: 17px !important;
    }
    .ant-card-body {
      margin: 10px !important;
      padding: 0 !important;
      overflow-x: hidden;
    }
  }
`;

const StyledCardsDiv1 = styled.div`
  padding: 0px 12px;
  .ant-card-cover img {
    border-radius: 23px !important;
    height: 210px !important;
    width: 100% !important;
    padding: 17px !important;
    object-fit: contain !important;
  }
  .ant-card-bordered {
    border-radius: 15px !important;
  }
  .ant-card-body {
    padding: 0px 14px 14px !important;
  }
  .ant-rate {
    color: #f8d727 !important;
    font-size: 15px !important;
  }
  .ant-btn: hover;
  .ant-divider-horizontal {
    margin-block: 5px;
  }
  .ant-divider {
    border-top: 2px solid rgba(0, 0, 0, 0.06) !important;
  }
  .ant-rate-star {
    margin-right: 4px !important;
  }

  @media (max-width: 384px) {
    .ant-card {
      width: 236px !important;
      box-shadow: 6px 6px 25px rgba(0, 0, 0, 0.09) !important;
    }

    .ant-card-cover img {
      border-radius: 23px !important;
      height: 170px !important;
      width: 100% !important;
      padding: 17px !important;
    }
  }
`;

const StyledCardsDiv2 = styled.div`
  padding: 35px 12px;
  width: 270px;
  .ant-card-cover img {
    border-radius: 23px !important;
    height: 210px !important;
    width: 100% !important;
    padding: 17px !important;
    object-fit: contain !important;
  }
  .ant-card-bordered {
    border-radius: 15px !important;
  }
  .ant-card-body {
    padding: 0px 14px 14px !important;
  }
  .ant-rate {
    color: #f8d727 !important;
    font-size: 15px !important;
  }
  .ant-btn: hover;
  .ant-divider-horizontal {
    margin-block: 5px;
  }
  .ant-divider {
    border-top: 2px solid rgba(0, 0, 0, 0.06) !important;
  }
  .ant-rate-star {
    margin-right: 4px !important;
  }

  @media (max-width: 384px) {
    .ant-card {
      width: 236px !important;
      box-shadow: 6px 6px 25px rgba(0, 0, 0, 0.09) !important;
    }

    .ant-card-cover img {
      border-radius: 23px !important;
      height: 170px !important;
      width: 100% !important;
      padding: 17px !important;
    }
  }
`;

const StyledCardsP = styled.p`
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (min-width: 992px) {
    width: 300px;
  }
  @media (max-width: 991px) {
    width: 200px;
  }
`;

const FeaturedTypeDiv = styled.div`
position: relative;
  padding: 10px 50px;
  background-color: rgba(0, 0, 0, 0.03);
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
  
  overflow: hidden;
  @media (max-width: 400px) {
    font-size: 10px;
  }
   ::before {
    content: "";
    position: absolute;
    top: 0;
    left: -300px;
    width: 300px;
    height: 100%;
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.2) 20%,
      rgb(216 216 216 / 50%) 60%,
      rgba(255, 255, 255, 0)
    );
    -webkit-animation: shimmer 3s infinite;
    animation: shimmer 3s infinite;
  }

  @keyframes shimmer {
    100% {
      left: 100%;
    }
  }
`;

const StyledEndDiv = styled.div`
  display: flex;
  justify-content: end;
  p {
    color: #a5a4a4;
  }
  &:hover {
    .read-more {
      text-decoration: underline;
      font-size: 14px;
    }
  }
`;
const StyledEnrolledDiv = styled.div`
  display: flex;
  justify-content: end;
  align-items: center !important;
  p {
    color: #a5a4a4;
    font-size: 14px;
    margin-bottom: 0px;
  }
  @media (max-width: 400px) {
    p {
      color: #a5a4a4;
      font-size: 10px;
    }
  }
`;

const FeaturedTypeRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const FeaturedTypeRow1 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const DisplayNameRow = styled.div`
  h1 {
    font-size: 18px;
    margin-bottom: 0px;
    font-weight: bold;
    width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: "TitilliumBold", sans-serif;
  }

  @media (max-width: 400px) {
    h1 {
      font-size: 18px;
      margin-bottom: 0px;
      font-weight: bold;
      width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const StarRatingDiv = styled.div`
  display: flex;
  align-items: center;
  .total {
    color: #ffaa46;
    margin-inline: 7px;
  }
  .ant-rate {
    color: #ffaa46 !important;
  }
  svg {
    font-size: 12px;
  }
  p {
    margin-bottom: 0px;
    font-size: 12px;
  }
`;

const CourseDurationRow = styled(Row)`
  display: flex;
  justify-content: space-between;
  margin-block: 5px;
  p {
    margin-bottom: 0px;
    margin-left: 5px;
  }
`;

const TimerDiv = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-bottom: 0px;
    margin-left: 5px;
    font-size: 12px;
    color: #000;
  }
`;

const PriceRow = styled(Row)`
  justify-content: space-between;
  align-items: center;
  .read-more {
    color: #a87e33;
  }
  p {
    margin-bottom: 0px;
  }
`;

const PriceDiv = styled.div`
  display: flex;
  .sar {
    font-size: 10px;
    display: flex;
    align-items: end;
    margin-bottom: 3px;
    // font-weight: 700;
  }
  p {
    font-size: 18px;
    font-weight: 400;
    font-family: "TitilliumBold", sans-serif;
  }
`;

const StyledSkeletonNameP = styled.div`
position: relative;
  background-color: rgba(0, 0, 0, 0.03);
  padding: 10px 20px;
  margin-block: 10px;
  overflow: hidden;
  @media (max-width: 400px) {
    font-size: 10px;
  }
   ::before {
    content: "";
    position: absolute;
    top: 0;
    left: -300px;
    width: 300px;
    height: 100%;
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.2) 20%,
      rgb(216 216 216 / 50%) 60%,
      rgba(255, 255, 255, 0)
    );
    -webkit-animation: shimmer 3s infinite;
    animation: shimmer 3s infinite;
  }

  @keyframes shimmer {
    100% {
      left: 100%;
    }
  }
  `;
const StyledSkeletonNameP1 = styled.div`
position: relative;
background-color: rgba(0, 0, 0, 0.03);
  padding: 10px 20px;
  width: 155px;
  margin-top: 10px;
  overflow: hidden;
  @media (max-width: 400px) {
    font-size: 10px;
  }
   ::before {
    content: "";
    position: absolute;
    top: 0;
    left: -300px;
    width: 300px;
    height: 100%;
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.2) 20%,
      rgb(216 216 216 / 50%) 60%,
      rgba(255, 255, 255, 0)
    );
    -webkit-animation: shimmer 3s infinite;
    animation: shimmer 3s infinite;
  }

  @keyframes shimmer {
    100% {
      left: 100%;
    }
  }`;
const StyledSkeletonNameP2 = styled.div`
position: relative;
background-color: rgba(0, 0, 0, 0.03);
  padding: 10px 20px;
  width: 125px;
  margin-top: 10px;
  overflow: hidden;
  @media (max-width: 400px) {
    font-size: 10px;
  }
   ::before {
    content: "";
    position: absolute;
    top: 0;
    left: -300px;
    width: 300px;
    height: 100%;
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.2) 20%,
      rgb(216 216 216 / 50%) 60%,
      rgba(255, 255, 255, 0)
    );
    -webkit-animation: shimmer 3s infinite;
    animation: shimmer 3s infinite;
  }

  @keyframes shimmer {
    100% {
      left: 100%;
    }
  }`;

const NameP = styled.p`
  margin-bottom: 0px;
  color: #a87e33;
`;

const StyledImageTitleDiv = styled.div``;

const StyledImageWidthFullDiv = styled.div`
position: relative;
  height: 150px;
  background: rgba(0, 0, 0, 0.03);
  margin: 20px;
  border-radius: 10px;
  div {
    width: 100% !important;
  }
  @media (max-width: 500px) {
    margin: 10px;
  }
  overflow: hidden;
  @media (max-width: 400px) {
    font-size: 10px;
  }
   ::before {
    content: "";
    position: absolute;
    top: 0;
    left: -300px;
    width: 300px;
    height: 100%;
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.2) 20%,
      rgb(216 216 216 / 50%) 60%,
      rgba(255, 255, 255, 0)
    );
    -webkit-animation: shimmer 3s infinite;
    animation: shimmer 3s infinite;
  }

  @keyframes shimmer {
    100% {
      left: 100%;
    }
  }
  `;

const StyledCmeDiv = styled.div`
  background: #c2f2e1 !important;
  border-radius: 4px !important;
  position: absolute;
  z-index: 99 !important;
  top: 30px;
  left: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 5px;

  p {
    margin-bottom: 0px;
  }
`;

const StyledCmeDiv1 = styled.div`
  background: #fff3df !important;
  color: #a87e33;
  border-radius: 4px !important;
  position: absolute;
  z-index: 99 !important;
  top: 30px;
  left: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 5px;

  p {
    margin-bottom: 0px;
  }
`;
