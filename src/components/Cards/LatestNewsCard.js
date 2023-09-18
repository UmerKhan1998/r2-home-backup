import React from "react";
import { Card, Col, Row, Rate, Badge, Divider } from "antd";
import styled from "styled-components";
import { GiAlarmClock } from "react-icons/gi";
import { FiMonitor } from "react-icons/fi";
import { Clock, OnSite, TV } from "../../../images";
import router from "next/router";
import Image from "next/image";

const LatestNewsCard = ({
  ThumbnailImage,
  FeaturedType,
  CourseName,
  Description,
  name,
  id,
}) => {
  const removeElement = (Description) => {
    const regexForStripHTML = /(<([^>]+)>)/gi;
    const text = Description;
    const stripContent = text?.replaceAll(regexForStripHTML, "");
    //console.log("stripContent", text, stripContent);
    return stripContent;
  };

  return (
    <StyledCardsDiv>
      <>
        {/* <Card
          hoverable
          cover={<img loading="lazy"alt="example" src={ThumbnailImage} />}
          onClick={() => router.push(`/latest-news-and-resources/${id}`)}
        > */}
        <div
          className="card"
          onClick={() => router.push(`/latest-news-and-resources/${id}`)}
        >
          <img loading="lazy"alt={""} width={250} height={180} src={ThumbnailImage} />
          <FeaturedTypeRow>
            <FeaturedTypeDiv>
              <p>{FeaturedType}</p>
            </FeaturedTypeDiv>
          </FeaturedTypeRow>
          <DisplayNameRow>
            <h1>{CourseName}</h1>
          </DisplayNameRow>

          <StyledLatestNewsDescription>
            {removeElement(Description)}
          </StyledLatestNewsDescription>

          <PriceRow>
            <StyledStartDiv>
              <p
                className="read-more"
                onClick={() => router.push(`/latest-news-and-resources/${id}`)}
              >
                Read More
              </p>
            </StyledStartDiv>
          </PriceRow>
        </div>

        {/* </Card> */}
      </>
    </StyledCardsDiv>
  );
};

export default LatestNewsCard;

const StyledCardsDiv = styled.div`
  // margin-top: 10px;
  // margin-bottom: 10px;
  max-width: 299px;

  padding: 35px 9px;

  @media (max-width: 800px) {
    width: 50%;
    max-width: 50%;
  }
  @media (max-width: 600px) {
    width: 100%;
    max-width: 100%;
  }
  .ant-card-cover img {
    border-radius: 23px !important;
    height: auto !important;
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

  .card {
    padding: 15px !important;
    border-radius: 10px !important;
    border: 1px solid #f0f0f0 !important;
    background-color: #fff !important;
    cursor: pointer;
    span{
      width:100% !important;
    }
    img {
      margin-bottom: 15px !important;
      width:100% !important;
    }
    &:hover {
      box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16),
        0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09) !important;
      transition: 0.2s all ease-in;
    }
  }

  @media (max-width: 500px) {
    padding: 35px 0;
    .ant-card-cover img {
      border-radius: 23px !important;
      height: 170px !important;
      width: 100% !important;
      padding: 17px !important;
    }
  }
`;

const StyledLatestNewsDescription = styled.p`
  color: #a5a4a4;
  font-size: 11px;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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
  padding: 14px;
  background-color: #fee4b7;
  color: #a87e33;
  display: flex;
  align-items: center;
  height: 28px;
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
`;

const StyledStartDiv = styled.div`
  display: flex;
  justify-content: start;
  p {
    color: #a5a4a4;
  }
  &:hover {
    .read-more {
      text-decoration: underline;
    }
  }
`;
const StyledEnrolledDiv = styled.div`
  display: flex;
  justify-content: end;
  p {
    color: #a5a4a4;
    font-size: 14px;
  }
`;

const FeaturedTypeRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DisplayNameRow = styled.div`
  h1 {
    font-size: 16px;
    margin-bottom: 0px;
    // font-weight: bold;
    margin-block: 10px;
    font-family: "TitilliumBold", sans-serif;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    // width: 250px;
    // white-space: nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;
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
    font-size: 14px;
    display: flex;
    align-items: end;
    margin-bottom: 2px;
    font-weight: 800;
  }
  p {
    font-size: 22px;
  }
`;

const NameP = styled.p`
  margin-bottom: 0px;
  color: #a87e33;
`;
