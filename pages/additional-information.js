import React, { useState } from "react";
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
} from "../images";
import CustomButton from "../src/components/Button";
import { DownOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import ReactCodeInput from "react-code-input";
import router from "next/router";
import Header from "../src/components/header";
import Footer from "../src/components/footer";
import { firefoxNumberFunc } from "../src/helpers/firefoxNumberFunc";

const { Option } = Select;

const EmploymentAssociation = () => {
  const initialState = {
    employment: Boolean,
    employeeId: "",
    question1: Boolean,
    question2: Boolean,
    question3: Boolean,
    question4: Boolean,
  };

  const [employementState, setEmployementState] = useState(initialState);

  const [employeeIdState, setEmployeeIdState] = useState(false);

  //console.log("employementState", employementState);

  const inputHandler = (e) =>
    setEmployementState({
      ...employementState,
      [e.target.name]: e.target.value,
    });

  const [onClickState, setOnClickState] = useState();
  const [onClickState1, setOnClickState1] = useState();
  const [onClickState2, setOnClickState2] = useState();
  const [onClickState3, setOnClickState3] = useState();
  const [onClickState4, setOnClickState4] = useState();

  const [step, setStep] = useState(0);

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
                            marginBottom: 0,
                            paddingLeft: 30,
                          }}
                        >
                          CC2 Employee Info
                        </p>
                      </TimelineContentDiv>
                    </TimelineDiv>
                  </StyledSidebarDiv>
                </Col>
                <StyledSignInImgCol span={18}>
                  <FlexDiv>
                    {/* <img loading="lazy"src={CompleteInformation} /> */}
                    <img loading="lazy"alt={""} height={500} width={500} src={CompleteInformation} />
                    <p>Complete Information</p>
                  </FlexDiv>

                  <InformationDiv>
                    <h1>Your CC2 Employment Association</h1>
                    <p>
                      Second we need basic information about regarding your CC2
                      employment
                    </p>
                  </InformationDiv>

                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      <p>
                        <b>Are you a CC2 employee?</b>
                      </p>

                      {onClickState ? (
                        <CustomButton
                          customStyle={{
                            height: 50,
                            width: 70,
                            marginRight: 15,
                            background: "#105F43",
                            color: "#fff",
                          }}
                        >
                          Yes
                        </CustomButton>
                      ) : (
                        <CustomButton
                          customStyle={{
                            height: 50,
                            width: 70,
                            marginRight: 15,
                            background: "#fff",
                            color: "#000",
                          }}
                          onClick={() => {
                            setEmployementState({
                              ...employementState,
                              employment: true,
                            });
                            setOnClickState(true);
                          }}
                        >
                          Yes
                        </CustomButton>
                      )}
                      {onClickState === false ? (
                        <CustomButton
                          customStyle={{
                            height: 50,
                            width: 70,
                            marginRight: 15,
                            background: "#626262",
                            color: "#fff",
                          }}
                        >
                          No
                        </CustomButton>
                      ) : (
                        <CustomButton
                          customStyle={{
                            height: 50,
                            width: 70,
                            marginRight: 15,
                            background: "#fff",
                            color: "#000",
                          }}
                          onClick={() => {
                            setEmployementState({
                              ...employementState,
                              employment: false,
                            });
                            setOnClickState(false);
                          }}
                        >
                          No
                        </CustomButton>
                      )}

                      {employementState?.employment === true ? (
                        <>
                          <EmpolyeeIdP>
                            <b>Please Provide your Employee ID</b>
                          </EmpolyeeIdP>
                          <Row>
                            <Col span={12}>
                              {employeeIdState &&
                              employementState?.employeeId == "" ? (
                                <>
                                  <StyledInput
                                    type="number"
                                    name={"employeeId"}
                                    value={employementState?.employeeId}
                                    onKeyPress={(e) =>firefoxNumberFunc(e)}
                                    onChange={inputHandler}
                                    placeholder={"Employee Id"}
                                    onClick={() => setEmployeeIdState(true)}
                                  />
                                  <StyledErrorP style={{ color: "#fa4947" }}>
                                    Employee Id is Mandatory
                                  </StyledErrorP>
                                </>
                              ) : (
                                <>
                                  <StyledInput
                                    type="number"
                                    name={"employeeId"}
                                    value={employementState?.employeeId}
                                    onKeyPress={(e) =>firefoxNumberFunc(e)}
                                    onChange={inputHandler}
                                    placeholder={"Employee Id"}
                                    onClick={() => setEmployeeIdState(true)}
                                  />
                                </>
                              )}
                            </Col>
                          </Row>
                        </>
                      ) : (
                        <></>
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
                            marginBottom: 0,
                            paddingLeft: 30,
                          }}
                        >
                          Non CC2 Employee Info
                        </p>
                      </TimelineContentDiv>
                    </TimelineDiv>
                  </StyledSidebarDiv>
                </Col>
                <StyledSignInImgCol span={18}>
                  <FlexDiv>
                    <img loading="lazy"alt={""} height={30} width={30} src={CompleteInformation} />

                    {/* <img loading="lazy"src={CompleteInformation} /> */}
                    <p>Complete Information</p>
                  </FlexDiv>

                  <InformationDiv>
                    <h1>Your CC2 Employment Association</h1>
                    <p>
                      Second we need basic information about regarding your CC2
                      employment
                    </p>
                  </InformationDiv>

                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      {/* Question 1 */}
                      <>
                        <p>
                          <b>
                            Are you a staff of a company that is contracted with
                            CC2?
                          </b>
                        </p>

                        {onClickState1 ? (
                          <CustomButton
                            customStyle={{
                              height: 50,
                              width: 70,
                              marginRight: 15,
                              background: "#105F43",
                              color: "#fff",
                            }}
                          >
                            Yes
                          </CustomButton>
                        ) : (
                          <CustomButton
                            customStyle={{
                              height: 50,
                              width: 70,
                              marginRight: 15,
                              background: "#fff",
                              color: "#000",
                            }}
                            onClick={() => {
                              setEmployementState({
                                ...employementState,
                                question1: true,
                              });
                              setOnClickState1(true);
                            }}
                          >
                            Yes
                          </CustomButton>
                        )}
                        {onClickState1 === false ? (
                          <CustomButton
                            customStyle={{
                              height: 50,
                              width: 70,
                              marginRight: 15,
                              background: "#626262",
                              color: "#fff",
                            }}
                          >
                            No
                          </CustomButton>
                        ) : (
                          <CustomButton
                            customStyle={{
                              height: 50,
                              width: 70,
                              marginRight: 15,
                              background: "#fff",
                              color: "#000",
                            }}
                            onClick={() => {
                              setEmployementState({
                                ...employementState,
                                question1: false,
                              });
                              setOnClickState1(false);
                            }}
                          >
                            No
                          </CustomButton>
                        )}
                      </>
                      {/* Question 2 */}
                      <QuestonDiv>
                        <p>
                          <b>Are you a trainee at CC2?</b>
                        </p>

                        {onClickState2 ? (
                          <CustomButton
                            customStyle={{
                              height: 50,
                              width: 70,
                              marginRight: 15,
                              background: "#105F43",
                              color: "#fff",
                            }}
                          >
                            Yes
                          </CustomButton>
                        ) : (
                          <CustomButton
                            customStyle={{
                              height: 50,
                              width: 70,
                              marginRight: 15,
                              background: "#fff",
                              color: "#000",
                            }}
                            onClick={() => {
                              setEmployementState({
                                ...employementState,
                                question2: true,
                              });
                              setOnClickState2(true);
                            }}
                          >
                            Yes
                          </CustomButton>
                        )}
                        {onClickState2 === false ? (
                          <CustomButton
                            customStyle={{
                              height: 50,
                              width: 70,
                              marginRight: 15,
                              background: "#626262",
                              color: "#fff",
                            }}
                          >
                            No
                          </CustomButton>
                        ) : (
                          <CustomButton
                            customStyle={{
                              height: 50,
                              width: 70,
                              marginRight: 15,
                              background: "#fff",
                              color: "#000",
                            }}
                            onClick={() => {
                              setEmployementState({
                                ...employementState,
                                question2: false,
                              });
                              setOnClickState2(false);
                            }}
                          >
                            No
                          </CustomButton>
                        )}
                      </QuestonDiv>

                      {/* Question 3 */}
                      <QuestonDiv>
                        <p>
                          <b>Are you a volunteer at CC2?</b>
                        </p>

                        {onClickState3 ? (
                          <CustomButton
                            customStyle={{
                              height: 50,
                              width: 70,
                              marginRight: 15,
                              background: "#105F43",
                              color: "#fff",
                            }}
                          >
                            Yes
                          </CustomButton>
                        ) : (
                          <CustomButton
                            customStyle={{
                              height: 50,
                              width: 70,
                              marginRight: 15,
                              background: "#fff",
                              color: "#000",
                            }}
                            onClick={() => {
                              setEmployementState({
                                ...employementState,
                                question3: true,
                              });
                              setOnClickState3(true);
                            }}
                          >
                            Yes
                          </CustomButton>
                        )}
                        {onClickState3 === false ? (
                          <CustomButton
                            customStyle={{
                              height: 50,
                              width: 70,
                              marginRight: 15,
                              background: "#626262",
                              color: "#fff",
                            }}
                          >
                            No
                          </CustomButton>
                        ) : (
                          <CustomButton
                            customStyle={{
                              height: 50,
                              width: 70,
                              marginRight: 15,
                              background: "#fff",
                              color: "#000",
                            }}
                            onClick={() => {
                              setEmployementState({
                                ...employementState,
                                question3: false,
                              });
                              setOnClickState3(false);
                            }}
                          >
                            No
                          </CustomButton>
                        )}
                      </QuestonDiv>

                      {/* Question 4 */}
                      <QuestonDiv>
                        <p>
                          <b>Are you a first degree relative of a CC2 staff?</b>
                        </p>

                        {onClickState4 ? (
                          <CustomButton
                            customStyle={{
                              height: 50,
                              width: 70,
                              marginRight: 15,
                              background: "#105F43",
                              color: "#fff",
                            }}
                          >
                            Yes
                          </CustomButton>
                        ) : (
                          <CustomButton
                            customStyle={{
                              height: 50,
                              width: 70,
                              marginRight: 15,
                              background: "#fff",
                              color: "#000",
                            }}
                            onClick={() => {
                              setEmployementState({
                                ...employementState,
                                question4: true,
                              });
                              setOnClickState4(true);
                            }}
                          >
                            Yes
                          </CustomButton>
                        )}
                        {onClickState4 === false ? (
                          <CustomButton
                            customStyle={{
                              height: 50,
                              width: 70,
                              marginRight: 15,
                              background: "#626262",
                              color: "#fff",
                            }}
                          >
                            No
                          </CustomButton>
                        ) : (
                          <CustomButton
                            customStyle={{
                              height: 50,
                              width: 70,
                              marginRight: 15,
                              background: "#fff",
                              color: "#000",
                            }}
                            onClick={() => {
                              setEmployementState({
                                ...employementState,
                                question4: false,
                              });
                              setOnClickState4(false);
                            }}
                          >
                            No
                          </CustomButton>
                        )}
                      </QuestonDiv>
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
                  onClick={() => router.push("/complete-information")}
                >
                  Back
                </CustomButton>
                {employementState?.employment === false ? (
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
                ) : (
                  <>
                    {employementState?.employeeId === "" ||
                    employementState?.employeeId === undefined ? (
                      <CustomButton
                        customStyle={{
                          paddingInline: 30,
                          background: "#E0E0E0",
                          borderRadius: 8,
                          color: "#fff",
                        }}
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
                        onClick={() => router.push("/institution-information")}
                      >
                        Next
                      </CustomButton>
                    )}
                  </>
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
                {employementState?.question1?.name === "Boolean" ||
                employementState?.question2?.name === "Boolean" ||
                employementState?.question3?.name === "Boolean" ||
                employementState?.question4?.name === "Boolean" ? (
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
                    onClick={() => router.push("/institution-information")}
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

export default EmploymentAssociation;

const MainStyledSigninDiv = styled.div`
  border-bottom: 1px solid #a9a9a9;

  .ant-btn:focus {
    color: #fff !important;
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
    font-family: "TitilliumBold", sans-serif;
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
  //   .ant-btn:hover {
  //     color: #fff !important;
  //   }
`;

const AfterFormP = styled.p`
  color: #105f43 !important;
  font-size: 14px !important;
  line-height: 24px !important;
  font-weight: 400 !important;
  font-family: "InterMedium", sans-serif !important;
  margin-block: 15px !important;
`;

const NoteP = styled.p`
  color: #181818 !important;
  font-size: 14px !important;
  line-height: 24px !important;
  font-weight: 400 !important;
  font-family: "InterMedium", sans-serif !important;
  margin-block: 15px !important;
  text-decoration: underline !important;
`;

const BeforeFormP = styled.p`
  color: #8c8c8c !important;
  font-size: 14px !important;
  line-height: 24px !important;
  font-weight: 400 !important;
  font-family: "InterMedium", sans-serif !important;
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
    font-family: "InterMedium" !important;
    line-height: 19px !important;
  }
`;

const LanguageButton = styled(Button)`
  height: 54px !important;
  top: -1px !important;
  width: 125px !important;
  font-family: "TitilliumNormal", sans-serif !important;
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
    font-family: "TitilliumNormal", sans-serif !important;
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
  font-size: 13px !important;
`;

const StyledErrorP1 = styled.b`
  margin-bottom: 0px;
  color: #fa4947 !important;
  font-weight: 600;
  font-size: 14px;
`;

const StyledIncorrectPasswordModal = styled.div`
  h1 {
    margin-block: 15px !important;
    font-family: "TitilliumBold", sans-serif !important;
    font-size: 22px;
  }
  p {
    margin-bottom: 0px !important;
    font-family: "InterNormal", sans-serif !important;
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
  font-family: "InterMedium", sans-serif;
  margin-block: 20px !important;
`;

const StyledSidebarDiv = styled.div`
  padding: 30px 40px;
  background: #f8f8f8;
  height: 100%;
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
    font-family: "InterNormal", sans-serif;
  }
`;

const EmpolyeeIdP = styled.p`
  margin-top: 20px;
`;

const QuestonDiv = styled.div`
  margin-top: 15px;
`;
