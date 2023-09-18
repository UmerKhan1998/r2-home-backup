import React from "react";
import { Col, Row } from "antd";
import Image from "next/image";
import { CardImg1, DoubleArrowRight, Share, Star } from "../../../../images";
import CustomButton from "../Button";
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";
import { setCookies } from "../../../helpers/cookie";
import { useRouter } from "next/router";
import {
  add_to_whishlist,
  already_registered,
  register_now,
  remove_from_wishlist,
  sar,
  share,
} from "../../../helpers/LanguageConstant";

const CourseRegisteredCards = ({
  getCourseDetailId,
  RegisteredRowDetailArrData,
  AddCourseWishlist,
  isAuthorized,
  RemoveCourseWishlist,
  ThumbNail,
  name,
  label,
  setOpenShareModal,
}) => {
  const router = useRouter();

  return (
    <CourseRegisterCard dir="rtl">
      <img loading="lazy"alt={""} height={220} width={300} src={ThumbNail} />
      {/* <img loading="lazy"alt={""} height={200} width={300} src={ThumbNail} /> */}
      <Row>
        <CourseRegisterHead1>
          <p className="sar">{sar}</p>

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
            <p style={{ fontFamily: "GESSTwoLight" }}>{item?.title}</p>
          </Col>
          <Col span={12}>
            <p style={{ fontFamily: "GESSTwoLight" }}>{item?.description}</p>
          </Col>
        </RegisteredRowDetail>
      ))}
      <CustomButton
        customStyle={{
          background: "#105F43",
          color: "#fff",
          height: "50px",
          width: "100%",
        }}
        onClick={() => {
          setCookies("courseId", router.asPath.split("/")[3]);
          if (getCourseDetailId?.registrationStatus) {
            if (getCourseDetailId?.approvedStatus) {
              router.push(
                `/ar/${name}-inside/${getCourseDetailId?.courseTrainingRegistrationId}`
              );
            } else {
              setCookies(
                "trackingId",
                getCourseDetailId?.courseTrainingRegistrationCode
              );
              router.push(`/ar/track-application`);
            }
          } else {
            router.push(`/ar/personal-information`);
          }
        }}
      >
        <CustomButtonDiv>
          <img loading="lazy"height={200} width={300} src={DoubleArrowRight} />
          {getCourseDetailId?.registrationStatus ? (
            <p className="register">
              {label} {already_registered}
            </p>
          ) : (
            <p className="register">{register_now}</p>
          )}
        </CustomButtonDiv>
      </CustomButton>
      {getCourseDetailId?.favourite === false ? (
        <CustomButton
          customStyle={{
            background: "rgba(16, 95, 67, 0.1)",
            color: "#105F43",
            height: "50px",
            width: "100%",
            marginTop: 15,
          }}
          onClick={() => {
            AddCourseWishlist(router.asPath.split("/")[3]);

            if (!isAuthorized) {
              router.push("/ar/sign-in");
            }
          }}
        >
          <CustomButtonDiv>
            <img loading="lazy"height={200} width={300} src={Star} />
            <p>{add_to_whishlist}</p>
          </CustomButtonDiv>
        </CustomButton>
      ) : (
        <CustomButton
          customStyle={{
            background: "rgba(16, 95, 67, 0.1)",
            color: "#105F43",
            height: "50px",
            width: "100%",
            marginTop: 15,
          }}
          onClick={() => {
            RemoveCourseWishlist(router.asPath.split("/")[3]);
          }}
        >
          <CustomButtonDiv>
            <AiFillStar color="#064B33" />
            <p>{remove_from_wishlist}</p>
          </CustomButtonDiv>
        </CustomButton>
      )}

      <CustomButton
        customStyle={{
          background: "#fff",
          color: "#000",
          height: "50px",
          width: "100%",
          marginTop: 15,
          border: "1.5px solid #F5F5F5",
        }}
        onClick={() => setOpenShareModal(true)}
      >
        <CustomButtonDiv>
          <img loading="lazy"height={200} width={300} src={Share} />
          <p>{share}</p>
        </CustomButtonDiv>
      </CustomButton>
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
  span{
    width: 100% !important;
  }
`;

const CourseRegisterHead1 = styled.div`
  display: flex;
  align-items: end;
  .sar {
    margin-bottom: 5px;
    font-size: 18px;
    font-weight: 600;
    font-family: "GESSTwoBold", sans-serif;
  }
  .price {
    font-weight: 600;
    margin-bottom: 0px;
    font-size: 30px;
    font-family: "GESSTwoBold", sans-serif;
    margin-right: 5px;
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
      margin-right: 5px;
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
    -moz-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    transform: scaleX(-1);
    -ms-filter: fliph;
    filter: fliph;
  }
  .regnow {
    color: white !important;
  }
  p {
    margin-bottom: 0px;
    margin-right: 10px;
  }
  .register {
    color: #fff !important;
  }
`;
