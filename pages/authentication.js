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
  Space,
} from "antd";
import {
  CloseButton,
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
import ModalComp from "../src/components/Modal/PersonalInformationConfirmationModal";
import { emailValidation } from "../src/helpers/EmailValidation";
import { getCookies, setCookies } from "../src/helpers/cookie";
import endpoints from "../src/api";
import { useDispatch, useSelector } from "react-redux";
import { courseTrainingRegisterationLovData } from "../src/redux/actions";
import Header from "../src/components/header";
import Footer from "../src/components/footer";
import axios from "axios";
import { toast } from "react-toastify";
import { firefoxNumberFunc } from "../src/helpers/firefoxNumberFunc";

// import { NextRequest } from "next/server";

const PersonalInformation = () => {
  const [securityCode, setSecurityCode] = useState("");
  const [selectLanguage, setSelectLanguage] = useState({
    img: "data:image/png;base64,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",
    name: "+966",
  });

  //console.log("securityCode", securityCode);

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setSecurityCode(e);
    let fake = e;
    if (fake?.length === 6) {
      // router.push("/complete-information");
      //   createLMSAuthorizationFunc(signInState, e, ip);
    }
  };

  useLayoutEffect(() => {
    const courseId = getCookies("courseId");
    //console.log("courseId", courseId);
  }, []);

  const [timerCounter1, setTimerCounter1] = useState(5);

  // First Attempts
  useEffect(() => {
    const timer =
      timerCounter1 > 0 &&
      setInterval(() => setTimerCounter1(timerCounter1 - 1), 1000);
    return () => clearInterval(timer);
  }, [timerCounter1]);
  //console.log("timerCounter1", timerCounter1);

  const createLMSAuthorizationFunc = async (data, code, wanIp) => {
    try {
      setLoading(true);
      setTimerCounter1(5);
      //console.log("dataPayload", code);

      if (securityCode) {
        //console.log("securityCode", securityCode);

        const obj = {
          // firstName_EN: data?.firstName_EN,
          // lastName_EN: data?.lastName_EN,
          // firstName_AR: data?.firstName_AR,
          // lastName_AR: data?.lastName_AR,
          email: data?.email,
          otp: code,
          wanIp: wanIp ? wanIp : "-",
          header: "string",

          courseTrainingId: getCookies("courseId"),
          // active: data?.active,
          // phoneNumber: data?.phone_number,
        };

        const response = await endpoints.createLMSAuthorization(obj);
        if (response?.data?.message !== "Invalid OTP") {
          router.push("/registeration-step");
          // toast.success("New Level Added Successfully");
        } else {
          toast.error("Invalid OTP");
        }
        //console.log("rtoken", response?.data?.message);
        setCookies("token", response?.data?.message);
      }
    } catch (error) {
      // setErrors(error.response.data.errors);
      // setErrorMessage(error.response.data.message);
      //console.log("asattar", error);
      setLoading(false);
    } finally {
      setTimeout(() => setLoading(false), 1200);
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Riyadh Second Health Cluster</title>
        <link rel="icon" href={R2Favicon} />
      </Head>
      <body>
        <Header />

        {/* content */}

        <>
          <SideDesignDiv>
            {/* <img loading="lazy"src={SideDesign} /> */}
            <img loading="lazy"alt={""} height={500} width={500} src={SideDesign} />
          </SideDesignDiv>

          <MainStyledSigninDiv>
            <Container>
              <StyledSigninDiv1>
                <StyledRegisterationRow gutter={[32, 32]}>
                  <Col span={24}>
                    <h1>We would like to verify your mobile number</h1>
                    <BeforeFormP>
                      Please enter the 6 digit code sent to your mobile number
                    </BeforeFormP>
                    <StyledContactRow>
                      {/* <img loading="lazy"src={MobileVerification} /> */}
                      <img loading="lazy"alt={""} height={30} width={30} src={MobileVerification} />

                      <p>{selectLanguage?.name}</p>
                      {/* <p>*******{signInState?.phone_number?.slice(8, 11)}</p> */}
                    </StyledContactRow>

                    <SecurityNoteP>
                      Please enter your security code
                    </SecurityNoteP>

                    <StyledReactCodeInput
                      onChange={handleInputChange}
                      type="number"
                      fields={6}
                      onKeyPress={(e) =>firefoxNumberFunc(e)}
                      />

                    <StyledColoredPFlex1>
                      Didn’t receive it?.{" "}
                      <StyledResendOTPColoredP
                        onClick={() => {
                          setRegisterationStep(0);
                          setSecurityCode("")
                        }}
                      >
                        Resend OTP
                      </StyledResendOTPColoredP>
                    </StyledColoredPFlex1>
                  </Col>
                </StyledRegisterationRow>
              </StyledSigninDiv1>
            </Container>
          </MainStyledSigninDiv>
          <SignInRow>
            <Container>
              <FlexStartDiv>
                <StyledBackCustomButton
                  customStyle={{
                    paddingInline: 30,
                    borderColor: "#105F43",
                    color: "#105F43",
                    borderRadius: 8,
                  }}
                  onClick={() => setRegisterationStep(0)}
                >
                  Back
                </StyledBackCustomButton>

                {securityCode?.length === 6 ? (
                  <>
                    {timerCounter1 === 0 && securityCode?.length === 6 ? (
                      <CustomButton
                        customStyle={{
                          paddingInline: 30,
                          background: "#105F43",
                          borderRadius: 8,
                          color: "#fff",
                        }}
                        onClick={() =>
                          createLMSAuthorizationFunc(
                            signInState,
                            securityCode,
                            ip
                          )
                        }
                      >
                        Next
                      </CustomButton>
                    ) : (
                      <CustomButton
                        customStyle={{
                          paddingInline: 30,
                          background: "#E0E0E0",
                          borderRadius: 8,
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          cursor: "not-allowed",
                        }}
                      >
                        Next &nbsp;
                        <img loading="lazy"alt={""} src={GreenLoader} height={20} width={20} />
                      </CustomButton>
                    )}
                  </>
                ) : (
                  <CustomButton
                    customStyle={{
                      paddingInline: 30,
                      background: "#E0E0E0",
                      borderRadius: 8,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      cursor: "not-allowed",
                    }}
                  >
                    Next
                  </CustomButton>
                )}
              </FlexStartDiv>
            </Container>
          </SignInRow>
        </>
        {/* <Footer /> */}
      </body>
    </div>
  );
};

export default PersonalInformation;

const MainStyledSigninDiv = styled.div`
  border-bottom: 1px solid #a9a9a9;
  .ant-btn:hover,
  .ant-btn:focus {
    color: #000 !important;
  }
`;

const StyledSignInImgCol = styled(Col)`
  height: 464px;
  display: flex;
  justify-content: center;
  img {
    width: 400px;
  }
`;

const StyledSigninDiv = styled.div`
  @media (min-width: 992px) {
    padding: 100px 0px 10px;
  }
  @media (max-width: 992px) {
    padding: 10px 0px 10px;
  }
  h1 {
    font-family: "TitilliumBold", sans-serif;
    // font-weight: 700;
    line-height: 35px;
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

const StyledSigninDiv1 = styled.div`
  padding: 140px 0px 120px;
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
`;

const AfterFormPDiv = styled.p`
  background: #f8f8f8;
  border: 1px solid #f8f8f8;
  border-radius: 5px;
  margin-block: 15px !important;
  padding: 15px;
`;

const AfterFormP = styled.p`
  color: #105f43 !important;
  font-size: 12px !important;
  line-height: 24px !important;
  font-weight: 400 !important;
  font-family: "InterMedium", sans-serif !important;
  margin-bottom: 0px !important;
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
  font-size: 12px !important;
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

const FlexStartDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledRegisterationRow = styled(Row)`
  align-items: center !important;
`;

const StyledErrorP = styled.p`
  margin-bottom: 0px;
  color: #fa4947 !important;
  font-size: 13px !important;
`;

const StyledErrorP1 = styled.b`
  margin-bottom: 0px;
  color: #fa4947 !important;
  font-weight: 600;
  font-size: 13px !important;
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

const SideDesignDiv = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
  width: 100%;
  // z-index: 99;
  height: 580px;
`;

const StyledReactCodeInput = styled(ReactCodeInput)`
  @media (min-width: 992px) {
    input {
      border: 1px solid #fff !important;
      border-bottom: 1px solid #000 !important;
      margin-right: 10px !important;
      font-size: 18px !important;
      width: 50px !important;
      outline: none !important;
      text-align: center !important;
    }
  }
  @media (max-width: 991px) {
    input {
      border: 1px solid #fff !important;
      border-bottom: 1px solid #000 !important;
      margin-right: 7px !important;
      font-size: 18px !important;
      width: 38px !important;
      outline: none !important;
      text-align: center !important;
    }
  }
  input:active {
    border: 1px solid #fff !important;
    border-bottom: 1px solid #000 !important;
    margin-right: 10px !important;
    font-size: 18px !important;
  }
`;
