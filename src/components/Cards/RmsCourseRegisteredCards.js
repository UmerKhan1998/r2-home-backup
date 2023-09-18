import React from "react";
import { Col, Row } from "antd";
import Image from "next/image";
import { CardImg1, DoubleArrowRight, Share, Star } from "../../../images";
import CustomButton from "../Button";
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";
import { setCookies } from "../../helpers/cookie";
import { useRouter } from "next/router";

const CourseRegisteredCards = ({
  getCourseDetailId,
  RegisteredRowDetailArrData,
  AddCourseWishlist,
  isAuthorized,
  RemoveCourseWishlist,
  ThumbNail,
}) => {
  const router = useRouter();

  return (
    <CourseRegisterCard>
      <img loading="lazy"alt={""} height={200} width={300} src={ThumbNail} />
      <Row>
        <CourseRegisterHead1>
          <p className="sar">SAR</p>

          <p className="price">
            {getCourseDetailId?.priceMin} - {getCourseDetailId?.priceMax}
          </p>
        </CourseRegisterHead1>
      </Row>
      {RegisteredRowDetailArrData?.map((item, index) => (
        <RegisteredRowDetail key={index}>
          <Col span={2}>
            <div>
              <img loading="lazy"alt={""} height={200} width={300} src={item?.img} />
            </div>
          </Col>
          <Col span={10}>
            <p>{item?.title}</p>
          </Col>
          <Col span={12}>
            <p>{item?.description}</p>
          </Col>
        </RegisteredRowDetail>
      ))}
    </CourseRegisterCard>
  );
};

export default CourseRegisteredCards;

const CourseRegisterCard = styled.div`
  box-shadow: 6px 6px 25px rgba(0, 0, 0, 0.09);
  padding: 20px;
  border-radius: 9px;
  img {
    width: 100% !important;
  }
  .ant-row {
    margin-top: 10px;
  }
  .ant-row:last-child {
    border-bottom: none !important;
  }
`;

const CourseRegisterHead1 = styled.div`
  display: flex;
  align-items: end;
  .sar {
    margin-bottom: 5px;
    font-size: 18px;
    font-weight: 600;
    font-family: "TitilliumNormal", sans-serif;
  }
  .price {
    font-weight: 600;
    margin-bottom: 0px;
    font-size: 30px;
    font-family: "TitilliumNormal", sans-serif;
    margin-left: 5px;
  }
`;

const RegisteredRowDetail = styled(Row)`
  display: flex;
  img {
    height: 20px;
    object-fit: contain;
  }
  .ant-col:nth-child(1) {
    display: flex;
    justify-content: start;
  }
  .ant-col:nth-child(3) {
    display: flex;
    justify-content: end;
    p {
      text-align: end;
    }
  }
  border-bottom: 1px solid #ddd;
  @media (max-width: 992px) {
    align-items: center;
    div:nth-child(2) p {
      margin-left: 5px;
    }
  }
`;

const CustomButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 20px !important;
    width: 20px !important;
  }
  .regnow {
    color: white !important;
  }
  p {
    margin-bottom: 0px;
    margin-left: 10px;
  }
  .register {
    color: #fff !important;
  }
`;
