import React, { useEffect, useLayoutEffect, useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import Image from "next/image";
import {
  Alert,
  Avatar,
  Button,
  Checkbox,
  Col,
  Dropdown,
  Input,
  Menu,
  Row,
  Space,
} from "antd";
import { R2Favicon, SignInImg, TabDotGrey, TabDotWhite } from "../images";
import CustomButton from "../src/components/Button";
import { DownOutlined } from "@ant-design/icons";
import Header from "../src/components/header";
import Footer from "../src/components/footer";
import endpoints from "../src/api";
import { toast } from "react-toastify";
import { emailValidation } from "../src/helpers/EmailValidation";

const ForgotPassword = () => {
  const initialState = {
    email: "",
    phoneNumber: "",
  };

  const [signUpState, setSignUpState] = useState(initialState);
  const [loading, setLoading] = useState(initialState);
  const [emailState, setEmailState] = useState(false);

  const [emailValidationState, setEmailValidationState] = useState("");

  //console.log("emailValidationState", emailValidationState);
  //console.log("loading", loading);

  const [timerState, setTimerState] = useState(false);
  const [successMessageState, setSuccessMessageState] = useState("");
  //console.log("timerState", timerState);

  const [timerCounter, setTimerCounter] = useState(3);

  // First Attempts
  useEffect(() => {
    const timer =
      timerCounter > 0 &&
      setInterval(() => setTimerCounter(timerCounter - 1), 1000);
    return () => clearInterval(timer);
  }, [timerCounter]);
  //console.log("timerCounter", timerCounter);

  useLayoutEffect(() => {
    if (emailState) {
      setEmailValidationState(emailValidation(signUpState?.email));
    }
  }, [emailValidationState, signUpState]);

  //console.log("emailValidationState", emailValidationState);

  const inputHandler = (e) =>
    setSignUpState({ ...signUpState, [e.target.name]: e.target.value });
  //console.log("signUpState", signUpState);

  const createLMSUsersFunc = async (data) => {
    try {
      setLoading(true);

      const response = await endpoints.forgetPasswordRequest(data);

      if (response) {
        // //console.log("response", response?.data.statusCode);
        if (response?.data.statusCode === "404") {
          toast.error(
            `Email not found`
          );
        } else {
          // toast.success(`${response?.data?.message}`);
          setSuccessMessageState(response?.data?.message);
          if(response?.data?.message!==""){
            setSignUpState({...signUpState, email:""});
            setEmailState(false)
          }
          // console.log('101',response?.data?.message)
        }
        setLoading(false);
      }
    } catch (error) {
      //console.log("error", error);
      setLoading(false);
    }
  };

  const [dropdownCaretState, setDropdownCaretState] = useState(false);

  return (
    <div className="container">
      <Head>
        <title>Riyadh Second Health Cluster</title>
        <link rel="icon" href={R2Favicon} />
      </Head>
      <body>
        {/* content */}
        <Header
          dropdownCaretState={dropdownCaretState}
          setDropdownCaretState={setDropdownCaretState}
        />

        <div onClick={() => setDropdownCaretState(false)}>
          <MainStyledSigninDiv>
            <Container>
              <StyledSigninDiv>
                <Row gutter={[32, 32]}>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <>
                      <h1>Forgot Password</h1>
                      <p>Welcome! Let’s get started</p>
                      <Row>
                        <StyledInput
                          type="text"
                          name={"email"}
                          value={signUpState?.email}
                          onChange={inputHandler}
                          placeholder={"Email"}
                          onClick={() => setEmailState(true)}
                        />
                        {emailValidationState === "Invalid Email" ? (
                          <>
                            <StyledErrorP>Invalid Email</StyledErrorP>
                          </>
                        ) : (
                          <>
                            {emailState && signUpState?.email == "" && (
                              <StyledErrorP>Email is Mandatory</StyledErrorP>
                            )}
                          </>
                        )}
                      </Row>
                      {successMessageState !== "" && (
                        <StyledAlert
                          message="Success"
                          description="Check your email!"
                          type="success"
                          showIcon
                        />
                      )}{" "}
                    </>
                  </Col>
                  <StyledSignInImgCol xl={12} lg={12} md={12} sm={24} xs={24}>
                    {/* <img loading="lazy"src={SignInImg} /> */}
                    <img loading="lazy"alt={""} height={500} width={380} src={SignInImg} />
                  </StyledSignInImgCol>
                </Row>
              </StyledSigninDiv>
            </Container>
          </MainStyledSigninDiv>
          <SignInRow>
            <Container>
              {emailValidationState !== "Invalid Email" &&
              signUpState?.email !== "" ? (
                <>
                  {/* {loading ? (
                    <CustomButton
                      customStyle={{
                        paddingInline: 30,
                        background: "#E0E0E0",
                        borderRadius: 8,
                        color: "#fff",
                      }}
                    >
                      Confirm
                    </CustomButton>
                  ) : ( */}
                  {timerCounter === 0 ? (
                    <CustomButton
                      customStyle={{
                        paddingInline: 30,
                        background: "#105F43",
                        borderRadius: 8,
                        color: "#fff",
                      }}
                      onClick={() => {
                        createLMSUsersFunc(signUpState);
                        setTimerCounter(3);
                        setInterval(() => {
                          setTimerState(true);
                        }, 5000);
                        window.scrollTo(0, 0);
                      }}
                    >
                      Confirm
                    </CustomButton>
                  ) : (
                    <CustomButton
                      customStyle={{
                        paddingInline: 30,
                        background: "#E0E0E0",
                        borderRadius: 8,
                        color: "#fff",
                      }}
                    >
                      Confirm
                    </CustomButton>
                  )}
                  {/* )} */}
                </>
              ) : (
                <CustomButton
                  customStyle={{
                    paddingInline: 30,
                    background: "#E0E0E0",
                    borderRadius: 8,
                    color: "#fff",
                  }}
                >
                  Confirm
                </CustomButton>
              )}
            </Container>
          </SignInRow>
          <Footer />
        </div>
      </body>
    </div>
  );
};

export default ForgotPassword;

const MainStyledSigninDiv = styled.div`
  border-bottom: 1px solid #a9a9a9;
`;

const StyledSignInImgCol = styled(Col)`
  height: 464px;

  display: flex;
  justify-content: center;
  img {
    width: 380px;
  }
`;

const StyledSignInCustomButtonImg = styled.img`
  margin-right: 10px !important;
`;

const StyledSignInCustomButton = styled(CustomButton)`
  border-radius: 5px !important;
  img {
    margin-right: 10px !important;
  }
`;

const StyledSigninDiv = styled.div`
  @media (min-width: 992px) {
    padding: 100px 0px 20px;
  }
  @media (max-width: 991px) {
    padding: 20px 0px;
  }

  h1 {
    font-family: "TitilliumBold", sans-serif;
  }

  p {
    color: #8c8c8c;
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
    // min-width: 1200px;
    min-width: 1120px;
  }

  @media only screen and (min-width: 1259px) and (max-width: 1359px) {
    // min-width: 1200px;
    min-width: 1120px;
  }

  @media (min-width: 1342px) {
    // min-width: 1200px;
    min-width: 1120px;
  }
`;

const StyledInput = styled(Input)`
  background: #f8f8f8;
  border: 1px solid #c1c1c1;
  border-radius: 5px;
  padding: 15px 20px;
  &:nth-child(1) {
    margin-top: 10px;
  }
`;

const StyledInput1 = styled(Input)`
  background: #f8f8f8;
  border: 1px solid #c1c1c1;
  border-radius: 5px;
  padding: 15px 20px;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const RememberRow = styled(Row)`
  justify-content: space-between !important;
  p {
    color: #a87e33 !important;
    cursor: pointer;
  }
  p:hover {
    text-decoration: underline;
  }
`;

const SignInRow = styled(Row)`
  margin-block: 20px;
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

const StyledEmailBySmsRow = styled(Row)`
  display: flex !important;

  margin-top: 20px;

  .ant-input:nth-child(1) {
    margin-block: 0 !important;
  }
`;

const SendCodeRow = styled(Row)`
  justify-content: space-between !important;
`;

const StyledAlertBanner = styled.div`
  background: #f8f8f8;
  border: 1px solid #f8f8f8;
  border-radius: 5px;
  padding: 15px;
  p {
    color: #105f43;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 0;
  }
`;

const StyledErrorP = styled.p`
  margin-bottom: 0px;
  color: #fa4947 !important;
  font-size: 13px !important;
`;

const StyledAlert = styled(Alert)`
  margin-top: 20px;
`;
