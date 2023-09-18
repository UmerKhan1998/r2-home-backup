import React from "react";
import { Badge, Row } from "antd";
import styled from "styled-components";
import { price_detail, sar } from "../../../helpers/LanguageConstant";

const PriceDetailCards = ({ getCourseDetailId }) => {
  return (
    <RelatedCourseCard dir="rtl">
      <h2>{price_detail}</h2>
      {getCourseDetailId?.detailRecordPriceViewModels?.map((item, index) => (
        <PriceRow key={index}>
          <StyledBadgeDiv>
            <Badge color="#105F43" status="success" />
            <p>{item?.name_AR}</p>
          </StyledBadgeDiv>
          <PriceDiv1>
            <>
              <p className="sar">{sar}</p>&nbsp;
              <p>{item?.price}</p>
            </>
          </PriceDiv1>
        </PriceRow>
      ))}
    </RelatedCourseCard>
  );
};

export default PriceDetailCards;

const RelatedCourseCard = styled.div`
  box-shadow: 6px 6px 25px rgba(0, 0, 0, 0.09);
  padding: 20px;
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

const PriceRow = styled(Row)`
  justify-content: space-between;
  align-items: center;
  padding-block: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  &:nth-last-child(1) {
    border-bottom: 1px solid rgba(0, 0, 0, 0);
  }
  .read-more {
    color: #a87e33;
  }
  p {
    margin-bottom: 0px;
  }
`;

const StyledBadgeDiv = styled.div`
  display: flex;
  p {
    // font-family: "TitilliumNormal";
    font-size: 14px;
    margin-bottom: 0px;
    margin-right: 7px;
    display: flex;
    align-items: center;
  }
  .ant-badge {
    color: #105f43 !important;
  }
  @media (max-width: 992px) {
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      margin-right: 5px;
    }
  }
`;

const PriceDiv1 = styled.div`
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
    font-family: "GESSTwoBold", sans-serif;
  }
`;
