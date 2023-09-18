import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import router from "next/router";
import styled from "styled-components";
import {
  Avatar,
  Button,
  Checkbox,
  Col,
  Dropdown,
  Input,
  Menu,
  Modal,
  Row,
  Slider,
  Space,
} from "antd";
import CustomButton from "../../src/components/rtl/Button";
import endpoints from "../../src/api";

import Header from "../../src/components/header";
import Footer from "../../src/components/footer";
import { getCookies, setCookies } from "../../src/helpers/cookie";
import { AiOutlineRight } from "react-icons/ai";
import { R2Favicon } from "../.././images";

const RegisterationDashboard = () => {
  const courseId = getCookies("courseId");
  const token = getCookies("token");

  const [loading, setLoading] = useState("");
  const [registerationDashboardStep, setRegisterationDashboardStep] = useState(
    []
  );

  const getCourseDetailRecordFunc = async (id, token) => {
    try {
      if (id || token) {
        const response = await endpoints.getCourseTrainingRegistrationLov1(
          id,
          token
        );
        if (response) {
          setRegisterationDashboardStep(
            response?.data?.data
              ?.lovServicesCourseTrainingCategoryPercentageViewModels
          );
        }
      }
      setLoading(true);
    } catch (err) {
      //console.log("err", err);
      setLoading(false);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 12000);
    }
  };

  useLayoutEffect(() => {
    getCourseDetailRecordFunc(courseId, token);
  }, []);

  return (
    <div>
      <Head>
        <title>Riyadh Second Health Cluster</title>
        <link rel="icon" href={R2Favicon} />
      </Head>
      <body>
        <Header />

        {/* content */}
        <MainStyledSigninDiv>
          <Container>
            <StyledSigninDiv>
              <Row gutter={[32, 32]}>
                <ContentCol span={24}>
                  <h1>Let’s get started with your application journey</h1>
                  <p>
                    This is your application dashboard for you to track the
                    progress of your application submission
                  </p>

                  <Row gutter={[16, 16]}>
                    {registerationDashboardStep?.map((item, index) => (
                      <Col span={12} key={index}>
                        <DashboardCardDiv>
                          <TitleRow>
                            <h2>{item?.name_EN}</h2>
                            <LinkDiv
                            // onClick={() => {
                            //   setCookies("step", index);
                            //   router.push(`/registeration-step`);
                            // }}
                            >
                              <AiOutlineRight />
                            </LinkDiv>
                          </TitleRow>

                          <DescriptionRow>
                            <p>{item?.description}</p>
                          </DescriptionRow>

                          <StyledSliderDiv>
                            <StyledSlider
                              tooltipVisible={false}
                              defaultValue={item?.percentage}
                              disabled={true}
                            />
                            <ProgressLinkDiv>
                              <p>{item?.percentage}%</p>
                            </ProgressLinkDiv>
                          </StyledSliderDiv>
                        </DashboardCardDiv>
                      </Col>
                    ))}
                  </Row>
                </ContentCol>
              </Row>
            </StyledSigninDiv>
          </Container>
        </MainStyledSigninDiv>
        <Footer />
      </body>
    </div>
  );
};

export default RegisterationDashboard;

const MainStyledSigninDiv = styled.div``;

const StyledSigninDiv = styled.div`
  padding: 140px 0px 20px;
  h1 {
    font-family: "GESSTwoBold", sans-serif;
    // font-weight: 700;
    line-height: 51px;
    color: #181818;
    margin-bottom: 10px;
  }
  p {
    color: #8c8c8c;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }
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
    min-width: 1200px;
  }
  @media only screen and (min-width: 1259px) and (max-width: 1359px) {
    min-width: 1200px;
  }
  @media (min-width: 1342px) {
    min-width: 1200px;
  }
`;

const ContentCol = styled(Col)`
  text-align: center;
  h1 {
    font-family: "GESSTwoBold";
    // font-weight: 700;
    font-size: 40px;
    color: #181818;
  }
  p {
    color: #8c8c8c;
    font-family: "HacenSaudiArabiaRegular", sans-serif;
    font-weight: 400;
  }
`;

const DashboardCardDiv = styled.div`
  box-shadow: 5px 5px 31px 6px rgba(0, 0, 0, 0.05);
  background: #ffffff;
  border-radius: 14px;
  padding: 20px;
`;

const TitleRow = styled(Row)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    margin-bottom: 0px;
    font-size: 18px;
  }
`;

const ProgressLinkDiv = styled.div`
  border: 1px solid;
  padding: 10px;
  border-radius: 101px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 1px solid rgba(16, 95, 67, 0.15);
  background: rgba(16, 95, 67, 0.06);
  svg {
    color: #105f43;
    font-size: 20px;
  }
  p {
    color: #105f43 !important;
    margin-bottom: 0px;
    font-size: 10px !important;
  }
`;

const DescriptionRow = styled(Row)`
  p {
    text-align: start !important;
    color: #8c8c8c;
    font-weight: 400;
    font-size: 13px !important;
    font-family: "HacenSaudiArabiaRegular", sans-serif;
  }
`;

const StyledSliderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

const StyledSlider = styled(Slider)`
  width: 80% !important;
  .ant-slider-track {
    background-color: #a87e33 !important;
  }
  .ant-slider-handle {
    background-color: #a87e33 !important;
    border: solid 2px #a87e33 !important;
    display: none !important;
  }
`;

const LinkDiv = styled.div`
  border: 1px solid;
  padding: 10px;
  border-radius: 101px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 1px solid #c1c1c1;
  background: #f8f8f8;
  svg {
    color: #105f43;
    font-size: 20px;
  }
`;
