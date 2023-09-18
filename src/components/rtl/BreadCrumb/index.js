import { Breadcrumb } from "antd";
import React from "react";
import Links from "next/link";
import styled from "styled-components";
import { home } from "../../../helpers/LanguageConstant";

const BreadCrumb = ({ getCourseDetailId, link, name }) => {
  return (
    <MainBreadcrumbDiv>
      <Container>
        <BreadcrumbDiv dir="rtl">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Links href="/ar">{home}</Links>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Links href={link}>{name}</Links>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{getCourseDetailId?.title_AR}</Breadcrumb.Item>
          </Breadcrumb>
        </BreadcrumbDiv>
      </Container>
    </MainBreadcrumbDiv>
  );
};

export default BreadCrumb;

const MainBreadcrumbDiv = styled.div`
  border-bottom: 1px solid #dddddd;
`;

const BreadcrumbDiv = styled.div`
  padding: 20px 70px;
  @media (max-width: 992px) {
    padding: 10px;
  }
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
    // min-width: 1340px;
    min-width: 1260px;
  }
`;
