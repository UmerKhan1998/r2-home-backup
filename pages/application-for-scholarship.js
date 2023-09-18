import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import router from "next/router";
import { getCookies, setCookies } from "../src/helpers/cookie";
import Preloader from "../public/images/Preloader.gif";
import { GolderRightArrow, R2Favicon, TrainingBullet } from "../images";
import Header from "../src/components/header";
import { Button, Col, Input, Row, Upload } from "antd";
import styled from "styled-components";
import { AiFillEye } from "react-icons/ai";
import { ImAttachment, ImCross } from "react-icons/im";
import CustomButton from "../src/components/Button";
import { useSelector } from "react-redux";
import endpoints from "../src/api";
import TextArea from "antd/lib/input/TextArea";
import ModalComp from "../src/components/Modal/LoaderModal";

import IntroductionImage from "../public/images/IntroductionImage.png";
import { toast } from "react-toastify";

const Instructor = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectItem, setSelectItem] = useState("scholarship");
  const userDataState = useSelector((state) => state?.userDataReducer);

  const [isInsturctor, setIsInsturctor] = useState();
  const [instructorState, setInstructorState] = useState({});
  const [
    instructorRegistrationStatusState,
    setInstructorRegistrationStatusState,
  ] = useState("");

  useLayoutEffect(() => {
    setInstructorState({
      ...instructorState,
      LMSUserId: userDataState?.id,
      FirstName_EN: userDataState?.firstName_EN,
      LastName_EN: userDataState?.lastName_EN,
      FirstName_AR: userDataState?.firstName_AR,
      LastName_AR: userDataState?.lastName_AR,
      Email: userDataState?.email,
      PhoneNumber: userDataState?.phoneNumber,
      PhotoUrl: userDataState?.photoUrl,
      BioData_EN: userDataState?.bioData_EN,
      BioData_AR: userDataState?.bioData_AR,
    });
    setIsInsturctor(userDataState?.insturctor);
  }, [userDataState]);

  const authToken = getCookies("token2");
  const userStatus = getCookies("userStatus");
  const [isAuthorized, setAuthorized] = useState(false);
  useLayoutEffect(() => {
    if (authToken === undefined) {
      router.push("/sign-in");
    }
    // } else if (userStatus === undefined || userStatus === "false") {
    //   router.push("/");
    // } else if (authToken || userStatus === "true") {
    //   setAuthorized(true);
    // }
  }, []);

  const DashboardRequestForInstructor = async () => {
    try {
      const response = await endpoints.getInstructorTrainingRegistrationLov1(
        authToken
      );
      if (response.data.statusCode === "200") {
        // toast.success("Request Submitted!");
        router.push("/instructor-registeration-step");
      }
    } catch (error) {}
  };

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [percentageState, setPercentageState] = useState([]);
  const [
    dashboardRequestForScholarshipState,
    setDashboardRequestForScholarshipState,
  ] = useState([]);
  const [stepLoadingState, setStepLoadingState] = useState(false);

  const getCourseDetailRecordFunc = async (token) => {
    setStepLoadingState(true);
    try {
      if (token) {
        const response = await endpoints.DashboardRequestForScholarship(token);

        if (response) {
          setDashboardRequestForScholarshipState(response?.data?.data);

          setStepLoadingState(false);
        }
      }
    } catch (err) {
      setStepLoadingState(false);
    }
  };

  useLayoutEffect(() => {
    getCourseDetailRecordFunc(authToken);
    // return removeCookies("courseId");
  }, [step]);

  const countArrRequiredFilled =
    percentageState &&
    percentageState?.reduce((accumulator, obj) => {
      if (obj.percentage === 100) {
        return accumulator + 1;
      }

      return accumulator;
    }, 0);

  return (
    <>
      {/* {isAuthorized ? ( */}
      <div className="container">
        <Head>
          <title>Riyadh Second Health Cluster</title>
          <link rel="icon" href={R2Favicon} />
        </Head>
        <body>
          <ModalComp openModal={stepLoadingState} />

          <Header
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            selectItem={selectItem}
            setSelectItem={setSelectItem}
            name={""}
          />
          <Container>
            <StyledIndtructorFormDiv>
              <Row gutter={20}>
                <Col span={24}>
                  <StyledApplyInstructorDiv>
                    <Row>
                      <Col
                        md={24}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <StyledCategoriesCardsDiv>
                          <StyledCategoriesCardsRow gutter={[16, 16]}>
                            {dashboardRequestForScholarshipState?.map(
                              (item,index) => (
                                <Col key={index} xl={12} lg={12} md={12} sm={24} xs={24}>
                                  <StyledCategoriesCards
                                    onClick={() => {
                                      setCookies("scholarshipId", item?.id);
                                      setCookies(
                                        "scholarshipTrackingId",
                                        item?.scholarshipRegistrationCode
                                      );
                                      if (
                                        item?.scholarshipRegistrationStatus ===
                                        true
                                      ) {
                                        router.push(
                                          "/scholarship-track-application"
                                        );
                                      } else {
                                        router.push(
                                          "/application-scholarship-registeration-step"
                                        );
                                      }
                                    }}
                                  >
                                    <img loading="lazy"alt={""}
                                      height={40}
                                      width={40}
                                      src={TrainingBullet}
                                    />
                                    <h1>{item?.name_EN}</h1>
                                    <img loading="lazy"alt={""}
                                      height={24}
                                      width={24}
                                      src={GolderRightArrow}
                                    />
                                  </StyledCategoriesCards>
                                </Col>
                              )
                            )}
                          </StyledCategoriesCardsRow>
                        </StyledCategoriesCardsDiv>
                      </Col>
                      {/* <Col
                              md={10}
                              style={{ textAlign: "center" }}
                            >
                              <img loading="lazy"width="80%" src={IntroductionImage.src} />
                            </Col> */}
                    </Row>
                  </StyledApplyInstructorDiv>
                </Col>
              </Row>
            </StyledIndtructorFormDiv>
          </Container>
        </body>
      </div>
      {/* ) : (
        <>
          <img loading="lazy"className="pre-loader" src={Preloader.src} />
        </>
      )} */}
    </>
  );
};

export default Instructor;

const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;

  display: flex;

  justify-content: space-between;

  @media (min-width: 576px) {
    max-width: 576px;
  }

  @media (min-width: 768px) {
    max-width: 768px;
  }

  @media (min-width: 992px) {
    max-width: 992px;
  }

  @media (min-width: 1200px) {
    // min-width: 1200px;
    min-width: 1125px;
  }
`;

const MainHeading = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  font-family: "TitilliumNormal", sans-serif;
`;
const StyledIndtructorFormDiv = styled.div`
  padding: 170px 0 50px;
  background: #fff;
  border-radius: 8px;

  @media screen and (max-width: 800px) {
    padding: 30px;
  }
`;
const StyledApplyInstructorDiv = styled.div`
  h2 {
    margin-bottom: 10px;
    font-size: 40px;
    line-height: 44px;
    font-family: "TitilliumBold";
  }
  p {
    margin-bottom: 20px;
    font-size: 16px;
    line-height: 21px;
    font-family: "TitilliumNormal";
  }
  button {
    border-radius: 3px !important;
  }

  @media screen and (max-width: 800px) {
    h2 {
      font-size: 30px;
      line-height: 34px;
    }
    p {
      font-size: 14px;
      line-height: 18px;
    }
    img {
      margin-top: 50px;
    }
  }
`;
const StyledInput = styled(Input)`
  background: #f8f8f8;
  border: 1px solid #c1c1c1;
  border-radius: 5px;
  padding: 10px 20px;
  margin-bottom: 15px;

  :focus {
    box-shadow: none !important;
  }
`;
const StyledLabelP = styled.p`
  font-size: 14px !important;
  margin-bottom: 10px !important;
  font-family: "TitilliumNormal", sans-serif;
  color: #000 !important;
`;
const StyledImgDivPdf = styled.div`
  img {
    width: 49px;
    height: 62px;
    object-fit: contain;
    border-radius: 10px;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledAiFillEye = styled(AiFillEye)`
  font-size: 20px;
  margin-right: 10px;
  cursor: pointer;
`;
const StyledImCross = styled(ImCross)`
  font-size: 14px;
  cursor: pointer;
`;
const CrossDiv1 = styled.div`
  .file-img {
    height: 14px;
    width: 14px;
    cursor: pointer;
  }
  display: flex;
  align-items: center;
`;
const StyledUpload = styled(Upload)`
  .ant-btn {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    width: 100% !important;
    align-items: center;
    height: 45px !important;
    border-radius: 5px !important;
  }
  .ant-upload {
    width: 100% !important;
  }
  .ant-upload-list-item-card-actions-btn {
    display: none !important;
  }
  .ant-upload-span {
    display: none !important;
  }
  .ant-upload-list-item-error {
    display: none !important;
  }
  .ant-upload-list-item-done {
    display: none !important;
  }
`;

const StyledTextarea = styled(TextArea)`
  background: #f8f8f8;
  border: 1px solid #c1c1c1;
  border-radius: 5px;
  padding: 10px 20px;
  margin-bottom: 15px;

  :focus {
    box-shadow: none !important;
  }
`;

const StyledCategoriesCards = styled.div`
  padding: 24px 30px;
  background: #ffffff;
  cursor: pointer;
  border: 2px solid #c1c1c1;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s;
  h1 {
    font-size: 16px;
    font-weight: 600;
    font-family: "TitilliumNormal", sans-serif;
    color: #2e2e2e;
    line-height: 27px;
    text-align: center;
    margin-block: 10px;
  }
  img {
    margin-bottom: 15px;
  }
  &:hover {
    border-color: #105f43 !important;
    background: #f8fffc !important;
  }
`;

const StyledCategoriesCardsDiv = styled.div`
  width: 100%;
`;

const StyledCategoriesCardsRow = styled(Row)`
  margin-bottom: 15px;
`;
