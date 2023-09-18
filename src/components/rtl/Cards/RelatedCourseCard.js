import React from "react";
import { Row, Col, Rate } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";

// components
import { CardImg1 } from "../../../../images";
import { cme_text, related, sar } from "../../../helpers/LanguageConstant";
const RelatedCourseCardComp = ({
  getCourseDetailId,
  name,
  link,
  ThumbNail,
}) => {
  const router = useRouter();
  return (
    <RelatedCourseCard dir="rtl">
      <h2>
        {related} {name}
      </h2>
      {getCourseDetailId?.detailRecordRelatedCourseViewModels?.map(
        (item, index) => (
          <RelateCoursesCards
            onClick={() => router.push(`${link}/${item?.id}`)}
            key={index}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                {/* <img loading="lazy"alt={""}src={CardImg1} /> */}
                {name === "البرامج" ||
                name === "ورش عمل" ||
                name === "ندوات" ? (
                  <StyledCmeDiv1>
                    <p>
                      ({item?.creditHours} {cme_text})
                    </p>
                  </StyledCmeDiv1>
                ) : (
                  <StyledCmeDiv>
                    <p>
                      ({item?.creditHours} {cme_text})
                    </p>
                  </StyledCmeDiv>
                )}

                <Image
                  loading="lazy"
                  alt={""}
                  height={250}
                  width={300}
                  src={ThumbNail}
                />
              </Col>
              <Col span={12}>
                {item?.title_EN?.length < 20 ? (
                  <h3>{item?.title_EN}</h3>
                ) : (
                  <h3>{item?.title_EN?.slice(0, 20)}...</h3>
                )}
                <Rate allowHalf disabled value={item?.rate} />
                <PriceDiv>
                  <p className="sar">{sar}</p>{" "}
                  {/* {getCourseDetailId?.priceMin === 0 ? (
                  <p className="price">
                    {getCourseDetailId?.priceMax} -{" "}
                    {getCourseDetailId?.priceMax}
                  </p>
                ) : (
                  <p className="price">
                    {getCourseDetailId?.priceMin} -{" "}
                    {getCourseDetailId?.priceMax}
                  </p>
                )} */}
                  <p className="price">
                    {getCourseDetailId?.priceMin} -{" "}
                    {getCourseDetailId?.priceMax}
                  </p>
                </PriceDiv>
              </Col>
            </Row>
          </RelateCoursesCards>
        )
      )}
    </RelatedCourseCard>
  );
};

export default RelatedCourseCardComp;

const RelatedCourseCard = styled.div`
  box-shadow: 6px 6px 25px rgba(0, 0, 0, 0.09);
  padding: 15px;
  border-radius: 9px;
  margin-block: 40px;
  h2 {
    font-family: "GESSTwoBold", sans-serif;
    // font-weight: 700;
    font-size: 17px;
    line-height: 22px;
    color: #105f43;
  }
`;
const RelateCoursesCards = styled.div`
  margin-bottom: 15px;
  img {
    width: 100%;
  }
  h3 {
    // font-family: "TitilliumNormal", sans-serif;
    font-weight: 600;
    font-size: 15px;
    line-height: 22px;
    color: #000000;
    margin-bottom: 0px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    // width: 95px;
  }
  .ant-rate {
    color: #ffaa46;
    font-size: 14px;
  }
  .ant-rate-star {
    margin-right: 4px !important;
  }

  .ant-col:nth-child(2) {
    line-height: 30px;
  }

  .ant-row {
    align-items: center !important;
  }
  cursor: pointer;
`;

const StyledCmeDiv = styled.div`
  background: #c2f2e1 !important;
  border-radius: 3px !important;
  position: absolute;
  z-index: 99 !important;
  top: 16px;
  right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1px 4px;

  p {
    margin-bottom: 0px;
    font-family: GESSTwoLight;
    font-size: 10px;
  }
`;

const StyledCmeDiv1 = styled.div`
  background: #fff3df !important;
  border-radius: 3px !important;
  position: absolute;
  z-index: 99 !important;
  top: 16px;
  right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1px 4px;

  p {
    margin-bottom: 0px;
    font-family: GESSTwoLight;
    font-size: 10px;
  }
`;

const PriceDiv = styled.div`
  display: flex;
  align-items: end;

  .sar {
    font-size: 10px;
    font-weight: 600;
    font-family: GESSTwoBold;
    margin-bottom: -2px;
  }
  .price {
    font-size: 14px;
    font-weight: 600;
    font-family: GESSTwoBold;
    margin-bottom: 0px;
    margin-right: 5px;
  }
`;
