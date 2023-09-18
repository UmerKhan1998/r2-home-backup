import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import Header from "../src/components/adminLayoutHeader";
import styled from "styled-components";
import endpoints from "../src/api";
import { Col, Row } from "antd";

import { R2Favicon, courseClock } from "../images";
import Preloader from "../public/images/Preloader.gif";

import { getCookies, setCookies, removeCookies } from "../src/helpers/cookie";
import { useRouter } from "next/router";
import CustomButton from "../src/components/Button";

const dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectItem, setSelectItem] = useState("My Learning");

  const router = useRouter();
  const surveysId = router.query;

  const authToken = getCookies("token");
  const userStatus = getCookies("userStatus");
  const [isAuthorized, setAuthorized] = useState(false);
  useLayoutEffect(() => {
    if (authToken === undefined) {
      router.push("/sign-in");
    } else if (userStatus === undefined || userStatus === "false") {
      router.push("/");
    } else if (authToken || userStatus === "true") {
      setAuthorized(true);
    }
  }, []);

  const [
    getDashboardInsideSurveyInitialState,
    setGetDashboardInsideSurveyInitialState,
  ] = useState({
    AssessmentId: surveysId?.id,
    CourseTrainingRegistrationId: getCookies("courseTrainingRegistrationId"),
  });

  const [getDashboardInsideSurveyState, setGetDashboardInsideSurveyState] =
    useState();
  const GetDashboardInsideSurveyFunc = async () => {
    try {
      const response = await endpoints.GetDashboardInsideSurvey(
        authToken,
        getDashboardInsideSurveyInitialState?.AssessmentId,
        getDashboardInsideSurveyInitialState?.CourseTrainingRegistrationId
      );
      if (response.data.statusCode === "200") {
        setGetDashboardInsideSurveyState(response?.data?.data);
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  useLayoutEffect(() => {}, []);

  return (
    <>
      {isAuthorized ? (
        <div className="container">
          <Head>
            <title>Riyadh Second Health Cluster</title>
            <link rel="icon" href={R2Favicon} />
          </Head>
          <body>
            <Header
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              selectItem={selectItem}
              setSelectItem={setSelectItem}
              name={""}
            >
              <Row gutter={["15px", "15px"]}>
                <Col span={24}>
                  <AssessSection>
                    <h2 className="survey-title">
                      Assess your understandings{" "}
                      <span>Assessment Submissions</span>
                    </h2>
                    <p className="desc">
                      <div className="times">
                        <span className="left">Assessment</span>
                        <span className="total">
                          <img loading="lazy"src={courseClock} width="15px" /> 30 mins
                        </span>
                      </div>
                      <span>Attempt 0 of 3</span>
                    </p>

                    <AssessGrad>
                      <div className="grad-head">
                        <span>Submit your Assessment</span>
                        <CustomButton
                          onClick={() => {
                            router.push(
                              "/course-assessments/0f7e2490-d8ad-49c7-9a52-08dad9c7cfb7"
                            );
                          }}
                          customStyle={{
                            backgroundColor: "#105F43",
                            color: "#fff",
                            height: "38px",
                            paddingInline: "30px",
                            marginLeft: "10px",
                          }}
                        >
                          Start Assessment
                        </CustomButton>
                      </div>
                      <div className="grad-body">
                        <div className="receive">
                          <h2>Receive Grade</h2>
                          <p>
                            <span>To Pass</span> 40% or higher
                          </p>
                        </div>
                        <div className="your-grad">
                          <span>Your Grade</span>
                          <span className="grad-box">-</span>
                        </div>
                      </div>
                    </AssessGrad>
                  </AssessSection>
                </Col>
              </Row>
            </Header>
          </body>
        </div>
      ) : (
        <>
          <img loading="lazy"className="pre-loader" src={Preloader.src} />
        </>
      )}
    </>
  );
};

export default dashboard;

const AssessSection = styled.div`
  padding: 16px 25px;
  background: #fff;
  border-radius: 8px;

  .survey-title {
    font-size: 20px;
    font-family: "TitilliumBold";
    margin-bottom: 2px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      font-size: 14px;
    }
  }
  .desc {
    font-size: 14px;
    font-family: "TitilliumNormal";
    margin-bottom: 10px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .times {
      display: inline-block;

      .left {
        border-radius: 3px;
        display: inline-block;
      }
      .total {
        margin-left: 8px;
      }
    }
  }
`;
const AssessGrad = styled.div`
  border-radius: 4px;
  border: 1px solid #c9c9c9;
  margin-top: 30px;
  margin-bottom: 20px;

  .grad-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 25px;
    border-bottom: 1px solid #c9c9c9;

    > span {
      font-family: "TitilliumBold";
    }
  }
  .grad-body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 25px;

    .receive {
      h2 {
        margin: 0;
        font-size: 14px;
        font-family: "TitilliumSemiBold";
      }
      p {
        font-size: 12px;
        font-family: "TitilliumSemiBold";
        margin: 0;

        span {
          color: #105f43;
          font-family: "TitilliumBold";
          margin-right: 5px;
        }
      }
    }
    .your-grad {
      font-family: "TitilliumSemiBold";

      .grad-box {
        border: 1px solid #c9c9c9;
        font-family: "TitilliumBold";
        border-radius: 3px;
        width: 75px;
        height: 40px;
        font-size: 18px;
        margin-left: 12px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        line-height: 1;
      }
    }
  }
`;
