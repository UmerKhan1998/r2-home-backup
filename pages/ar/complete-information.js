import React, { useState, useLayoutEffect } from "react";
import Head from "next/head";
import Image from "next/image";
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
  Select,
  Space,
} from "antd";
import {
  CloseButton,
  CompleteInformation,
  MobileVerification,
  R2Favicon,
  RegisterationImg,
  RightClickCircle,
  SideDesign,
} from "../../images";
import CustomButton from "../../src/components/rtl/Button";
import { DownOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import ReactCodeInput from "react-code-input";
import router from "next/router";
import {
  courseTrainingRegisterationLovData,
  tokenAuth,
} from "../../src/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../src/components/rtl/header";
import Footer from "../../src/components/rtl/footer";
import { getCookies } from "../../src/helpers/cookie";
import endpoints from "../../src/api";
import { firefoxNumberFunc } from "../../src/helpers/firefoxNumberFunc";

const { Option } = Select;

const RegisterationStep = () => {
  const dispatch = useDispatch();

  const initialState = {
    iqama_no: "",
    nationality: "",
    speciality: "",
    sub_speciality: "",
  };

  const [registerationState, setRegisterationState] = useState(initialState);
  //console.log("registerationState", registerationState);

  const inputHandler = (e) =>
    setRegisterationState({
      ...registerationState,
      [e.target.name]: e.target.value,
    });

  const [iqamaNumberState, setIqamaNumberState] = useState(false);
  const [nationalityState, setNationalityState] = useState(false);

  const [specialityState, setSpecialityState] = useState(false);

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [getCourseDetailId, setGetCourseDetailId] = useState([]);
  //console.log("getCourseDetailId", getCourseDetailId);

  const getCourseDetailRecordFunc = async (id, token) => {
    try {
      // if (token && menuId) {
      // //console.log('menuId', menuId, token)
      if (id) {
        const response = await endpoints.getCourseTrainingRegistrationLov1(
          id,
          token
        );
        if (response) {
          setGetCourseDetailId(
            response?.data?.data?.lovServicesCourseTrainingCheckListViewModels
          );
          dispatch(
            courseTrainingRegisterationLovData(
              response?.data?.data
                ?.lovServicesCourseTrainingCategoryCheckListViewModels
            )
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
    const courseId = getCookies("courseId");
    const token = getCookies("token");
    //console.log("courseId", courseId);
    getCourseDetailRecordFunc(courseId, token);
  }, []);

  useLayoutEffect(() => {
    // getCourseTrainingRegistrationLovFunc();
    dispatch(
      tokenAuth({
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJmYzM1NWJlOS05ZTFlLTQ2NzYtYmFmNi05M2U2MjM3ZjgwODQiLCJVc2VyTmFtZSI6IkFiZHVsU2F0dGFyIiwiRW1haWwiOiJhc0BkaWdpdGFsZ3JhcGhpa3MuYWUiLCJFbXBsb3llZUlkIjoiIiwiS2V5IjoiOEMtNjUtMEYtMDctMkMtMkQtRjEtQkMtQkMtRjItOUEtOTAtNjQtMDQtREYtRUEtOUQiLCJleHAiOjE2OTg0ODYxNzcsImlzcyI6Imh0dHBzOi8vZGlnaXRhbGdyYXBoaWtzLmFlIiwiYXVkIjoiOEMtNjUtMEYtMDctMkMtMkQtRjEtQkMtQkMtRjItOUEtOTAtNjQtMDQtREYtRUEtOUQifQ.KopE7zhI1wHtFIsb8pDY-43QUCzqa8sKxjsQatxtBJ8",
        menuId: "17B77DE8-6FB3-423A-8B96-08DAB8C8C083",
      })
    );
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Riyadh Second Health Cluster</title>
        <link rel="icon" href={R2Favicon} />
      </Head>
      <body>
        {/* content */}
        <Header />

        <SideDesignDiv>
          <img loading="lazy"alt={""} height={500} width={500} src={SideDesign} />
        </SideDesignDiv>

        {step === 0 && (
          <MainStyledSigninDiv>
            <StyledSigninDiv>
              <StyledRegisterationRow>
                <Col span={6}>
                  <StyledSidebarDiv>
                    <TimelineDiv>
                      <TimelineContentDiv>
                        <p
                          style={{
                            borderLeft: "3px solid #A87E33",
                            paddingBottom: 10,
                            paddingLeft: 30,
                            marginBottom: 0,
                          }}
                        >
                          Nationality Info
                        </p>
                        <p
                          style={{
                            borderLeft: "3px solid #E7E7E7",
                            marginBottom: 0,
                            paddingLeft: 30,
                          }}
                        >
                          Speciality Info
                        </p>
                      </TimelineContentDiv>
                    </TimelineDiv>
                  </StyledSidebarDiv>
                </Col>
                <StyledSignInImgCol span={12}>
                  <FlexDiv>
                    <img loading="lazy"alt={""} height={30} width={30} src={CompleteInformation} />
                    <p>Complete Information</p>
                  </FlexDiv>

                  <InformationDiv>
                    <h1>Let’s Complete your information</h1>
                    <p>We would like to know you better</p>
                  </InformationDiv>

                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      {iqamaNumberState &&
                      registerationState?.iqama_no == "" ? (
                        <>
                          <StyledInput
                            type="number"
                            name={"iqama_no"}
                            value={registerationState?.iqama_no}
                            onChange={inputHandler}
                            placeholder={"National ID / Iqama Number"}
                            onClick={() => setIqamaNumberState(true)}
                            onKeyPress={(e) =>firefoxNumberFunc(e)}
                            />
                          <StyledErrorP style={{ color: "#fa4947" }}>
                            Iqama Number is Mandatory
                          </StyledErrorP>
                        </>
                      ) : (
                        <>
                          <StyledInput
                            type="number"
                            name={"iqama_no"}
                            value={registerationState?.iqama_no}
                            onChange={inputHandler}
                            placeholder={"National ID / Iqama Number"}
                            onClick={() => setIqamaNumberState(true)}
                            onKeyPress={(e) =>firefoxNumberFunc(e)}
                          />
                        </>
                      )}
                    </Col>
                    <Col span={12}>
                      {nationalityState &&
                      registerationState?.nationality == "" ? (
                        <>
                          <StyledSelect
                            defaultValue="Nationality"
                            name={"nationality"}
                            style={{
                              width: 120,
                            }}
                            onChange={(e) =>
                              setRegisterationState({
                                ...registerationState,
                                nationality: e,
                              })
                            }
                            onClick={() => setNationalityState(true)}
                          >
                            <Option value="Saudi">Saudi</Option>
                            <Option value="Pakistani">Pakistani</Option>
                            <Option value="German">German</Option>
                            <Option value="Australian">Australian</Option>
                          </StyledSelect>
                          <StyledErrorP style={{ color: "#fa4947" }}>
                            Nationality is Mandatory
                          </StyledErrorP>
                        </>
                      ) : (
                        <>
                          <StyledSelect
                            defaultValue="Nationality"
                            name={"nationality"}
                            style={{
                              width: 120,
                            }}
                            onChange={(e) =>
                              setRegisterationState({
                                ...registerationState,
                                nationality: e,
                              })
                            }
                            onClick={() => setNationalityState(true)}
                          >
                            <Option value="Saudi">Saudi</Option>
                            <Option value="Pakistani">Pakistani</Option>
                            <Option value="German">German</Option>
                            <Option value="Australian">Australian</Option>
                          </StyledSelect>
                        </>
                      )}
                    </Col>
                  </Row>
                </StyledSignInImgCol>
              </StyledRegisterationRow>
            </StyledSigninDiv>
          </MainStyledSigninDiv>
        )}

        {step === 1 && (
          <MainStyledSigninDiv>
            <StyledSigninDiv>
              <StyledRegisterationRow>
                <Col span={6}>
                  <StyledSidebarDiv>
                    <TimelineDiv>
                      <TimelineContentDiv>
                        <p
                          style={{
                            borderLeft: "3px solid #A87E33",
                            paddingBottom: 10,
                            marginBottom: 0,
                            paddingLeft: 30,
                          }}
                        >
                          Nationality Info
                        </p>
                        <p
                          style={{
                            borderLeft: "3px solid #A87E33",
                            marginBottom: 0,
                            paddingLeft: 30,
                          }}
                        >
                          Speciality Info
                        </p>
                      </TimelineContentDiv>
                    </TimelineDiv>
                  </StyledSidebarDiv>
                </Col>
                <StyledSignInImgCol span={12}>
                  <FlexDiv>
                    <img loading="lazy"alt={""} height={30} width={30} src={CompleteInformation} />
                    <p>Complete Information</p>
                  </FlexDiv>

                  <InformationDiv>
                    <h1>Let’s Complete your information</h1>
                    <p>We would like to know you better</p>
                  </InformationDiv>

                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      {specialityState &&
                      registerationState?.speciality == "" ? (
                        <>
                          <StyledSelect
                            defaultValue="Speciality"
                            name={"speciality"}
                            style={{
                              width: 120,
                            }}
                            onChange={(e) =>
                              setRegisterationState({
                                ...registerationState,
                                speciality: e,
                              })
                            }
                            onClick={() => setSpecialityState(true)}
                          >
                            <Option value="Speciality1">Speciality1</Option>
                            <Option value="Speciality2">Speciality2</Option>
                            <Option value="Speciality3">Speciality3</Option>
                            <Option value="Speciality4">Speciality4</Option>
                          </StyledSelect>
                          <StyledErrorP style={{ color: "#fa4947" }}>
                            Speciality is Mandatory
                          </StyledErrorP>
                        </>
                      ) : (
                        <>
                          <StyledSelect
                            defaultValue="Speciality"
                            name={"speciality"}
                            style={{
                              width: 120,
                            }}
                            onChange={(e) =>
                              setRegisterationState({
                                ...registerationState,
                                speciality: e,
                              })
                            }
                            onClick={() => setSpecialityState(true)}
                          >
                            <Option value="Saudi">Saudi</Option>
                            <Option value="Pakistani">Pakistani</Option>
                            <Option value="German">German</Option>
                            <Option value="Australian">Australian</Option>
                          </StyledSelect>
                        </>
                      )}
                    </Col>
                    <Col span={12}>
                      <StyledInput
                        type="text"
                        name={"sub_speciality"}
                        value={registerationState?.sub_speciality}
                        onChange={inputHandler}
                        placeholder={"Sub-specialty (if applicable)"}
                      />
                    </Col>
                  </Row>
                </StyledSignInImgCol>
              </StyledRegisterationRow>
            </StyledSigninDiv>
          </MainStyledSigninDiv>
        )}

        {step === 0 && (
          <SignInRow>
            <Container>
              <SpaceBetweenDiv>
                <CustomButton
                  customStyle={{
                    paddingInline: 30,
                    borderColor: "#105F43",
                    color: "#105F43",
                    borderRadius: 8,
                  }}
                  onClick={() => router.push("/personal-information")}
                >
                  Back
                </CustomButton>
                {registerationState?.iqama_no === "" ||
                registerationState?.nationality === "" ? (
                  <CustomButton
                    customStyle={{
                      paddingInline: 30,
                      background: "#E0E0E0",
                      borderRadius: 8,
                      color: "#fff",
                    }}
                    // onClick={() => setStep(1)}
                  >
                    Next
                  </CustomButton>
                ) : (
                  <CustomButton
                    customStyle={{
                      paddingInline: 30,
                      background: "#105F43",
                      borderRadius: 8,
                      color: "#fff",
                    }}
                    onClick={() => setStep(1)}
                  >
                    Next
                  </CustomButton>
                )}
              </SpaceBetweenDiv>
            </Container>
          </SignInRow>
        )}
        {step === 1 && (
          <SignInRow>
            <Container>
              <SpaceBetweenDiv>
                <CustomButton
                  customStyle={{
                    paddingInline: 30,
                    borderColor: "#105F43",
                    color: "#105F43",
                    borderRadius: 8,
                  }}
                  onClick={() => setStep(0)}
                >
                  Back
                </CustomButton>
                {registerationState?.speciality === "" ? (
                  <CustomButton
                    customStyle={{
                      paddingInline: 30,
                      background: "#E0E0E0",
                      borderRadius: 8,
                      color: "#fff",
                    }}
                    // onClick={() => setStep(2)}
                  >
                    Next
                  </CustomButton>
                ) : (
                  <CustomButton
                    customStyle={{
                      paddingInline: 30,
                      background: "#105F43",
                      borderRadius: 8,
                      color: "#fff",
                    }}
                    onClick={() => router.push("/additional-information")}
                  >
                    Next
                  </CustomButton>
                )}
              </SpaceBetweenDiv>
            </Container>
          </SignInRow>
        )}
        <Footer />
      </body>
    </div>
  );
};

export default RegisterationStep;

const MainStyledSigninDiv = styled.div`
  border-bottom: 1px solid #a9a9a9;
  .ant-btn:hover,
  .ant-btn:focus {
    color: #000 !important;
  }
`;

const StyledSignInImgCol = styled(Col)`
  padding: 30px 80px;
  //   display: flex;
  //   justify-content: start;
`;

const InformationDiv = styled.div`
  margin-top: 20px;
`;

const FlexDiv = styled.div`
  display: flex;
  img {
    height: 30px;
  }
  p {
    margin-bottom: 0px;
    margin-top: 2px;
    margin-left: 10px;
  }
`;

const StyledSigninDiv = styled.div`
  padding: 78px 0px 0px;

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

const StyledInput = styled(Input)`
  background: #f8f8f8;
  border: 1px solid #c1c1c1;
  border-radius: 5px;
  padding: 15px 20px;
`;

const SignInRow = styled(Row)`
  margin-block: 20px;
`;

const AfterFormP = styled.p`
  color: #105f43 !important;
  font-size: 14px !important;
  line-height: 24px !important;
  font-weight: 400 !important;
  font-family: "HacenSaudiArabiaRegular", sans-serif !important;
  margin-block: 15px !important;
`;

const NoteP = styled.p`
  color: #181818 !important;
  font-size: 14px !important;
  line-height: 24px !important;
  font-weight: 400 !important;
  font-family: "HacenSaudiArabiaRegular", sans-serif !important;
  margin-block: 15px !important;
  text-decoration: underline !important;
`;

const BeforeFormP = styled.p`
  color: #8c8c8c !important;
  font-size: 14px !important;
  line-height: 24px !important;
  font-weight: 400 !important;
  font-family: "HacenSaudiArabiaRegular", sans-serif !important;
`;

const StyledEmailBySmsRow = styled(Row)`
  display: flex !important;

  margin-top: 20px;

  .ant-col {
    margin-bottom: 20px !important;
  }

  .ant-input:nth-child(1) {
    margin-block: 0 !important;
  }

  p {
    color: #4a4a4a !important;
    font-weight: 400 !important;
    font-size: 14px !important;
    font-family: "HacenSaudiArabiaRegular" !important;
    line-height: 19px !important;
  }
`;

const LanguageButton = styled(Button)`
  height: 54px !important;
  top: -1px !important;
  width: 125px !important;
  font-family: "GESSTwoLight", sans-serif !important;
  font-weight: 500;
  padding: 0 16px 0 20px;

  @media (min-width: 1200px) {
    p {
      margin-bottom: 0px;
      font-size: 15px;
    }
  }

  @media (max-width: 1200px) {
    p {
      margin-bottom: 0px;
      font-size: 14px;
    }
  }

  svg {
    font-size: 13px;
    margin-top: 5px;
  }

  .ant-space-item {
    font-family: "GESSTwoLight", sans-serif !important;
    font-weight: 500;
  }
`;

const StyledNotificationMenu = styled(Menu)`
  width: 180px !important;
  padding: 20px 10px;
  left: 12px;
  border-radius: 5px 0 0 5px;
  line-height: 28px;

  h1 {
    margin-bottom: 0px !important;
    margin-inline: 10px !important;
    color: #fff;
  }
  p {
    margin-bottom: 0px !important;
    &:hover {
      // text-decoration: underline;
      cursor: pointer;
    }
  }
  .ant-dropdown-menu-item {
    margin-block: 5px;
    padding: 10px;
    border-radius: 6px;
  }
  backdrop-filter: blur(20px) !important;
  .ant-dropdown-placement-bottomRight {
    left: 690px !important;
  }

  .select-country {
    display: flex;
    margin-bottom: 10px;
    padding-block: 3px;
    background: #f6f6f6;
    padding-inline: 6px;
    &:hover {
      cursor: pointer;
    }
    &:nth-last-child(1) {
      margin-bottom: 0px;
    }
    p {
      margin-left: 10px;
    }
  }

  @media (min-width: 1200px) {
    .language-title {
      font-size: 15px;
    }
  }

  @media (max-width: 1199px) {
    .language-title {
      font-size: 14px;
    }
  }
`;

const StyledColoredP = styled.b`
  color: #8d6520 !important;
  font-weight: 400 !important;
  margin-left: 5px !important;
`;

const StyledResendOTPColoredP = styled.b`
  color: #8d6520 !important;
  font-weight: 400 !important;
  margin-left: 5px !important;
  cursor: pointer;
  &:hover {
    text-decoration: underline !important;
  }
`;

const StyledColoredPFlex = styled.p`
  display: flex;
  font-weight: 400 !important;
`;

const StyledColoredPFlex1 = styled.p`
  display: flex;
  font-weight: 400 !important;
  margin-top: 15px;
`;

const FlexEndDiv = styled.div`
  display: flex;
  justify-content: end;
`;

const SpaceBetweenDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FlexStartDiv = styled.div`
  display: flex;
  justify-content: start;
`;

const StyledRegisterationRow = styled(Row)``;

const StyledErrorP = styled.p`
  margin-bottom: 0px;
  color: #fa4947 !important;
  font-size: 13px !imporant;
`;

const StyledErrorP1 = styled.b`
  margin-bottom: 0px;
  color: #fa4947 !important;
  font-weight: 600;
  font-size: 13px !imporant;
`;

const StyledIncorrectPasswordModal = styled.div`
  h1 {
    margin-block: 15px !important;
    font-family: "GESSTwoBold", sans-serif !important;
    font-size: 22px;
  }
  p {
    margin-bottom: 0px !important;
    font-family: "HacenSaudiArabiaRegular", sans-serif !important;
    color: #8c8c8c !important;
  }
`;

const StyledBackCustomButton = styled(CustomButton)`
  &:hover {
    border-color: #105f43 !important;
  }
`;

const StyledContactRow = styled(Row)`
  p {
    margin-bottom: 0px;
    display: flex;
    align-items: center;
    margin-left: 6px;
  }
`;

const SecurityNoteP = styled.p`
  color: #181818;
  font-weight: 400;
  font-family: "HacenSaudiArabiaRegular", sans-serif;
  margin-block: 20px !important;
`;

const StyledSidebarDiv = styled.div`
  padding: 30px 40px;
  background: #f8f8f8;
  height: 464px;
`;

const SideDesignDiv = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
  align-items: end;
  width: 100%;
  //   z-index: 99;
  height: 544px;
  img {
    height: 420px;
  }
`;

const StyledSelect = styled(Select)`
  width: 100% !important;
  .ant-select-selector {
    height: 53px !important;
    align-items: center !important;
    background: #f8f8f8 !important;
    border: 1px solid #c1c1c1 !important;
    border-radius: 5px !important;
  }
`;

const TimelineDiv = styled.div`
  display: flex;
`;

const TimelineDotDiv = styled.div`
  border: 1px solid;
  margin-right: 15px;
  width: 5px;
  border-radius: 80px;
`;

const TimelineContentDiv = styled.div`
  p {
    margin-bottom: 10px;
    font-family: "HacenSaudiArabiaRegular", sans-serif;
  }
`;
