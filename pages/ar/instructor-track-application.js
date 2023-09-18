import React, { useEffect, useState } from "react";
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
  Row,
  Space,
} from "antd";
import {
  R2Favicon,
  SideDesign,
  SignInImg,
  TabDotGrey,
  TabDotWhite,
} from "../../images";
import CustomButton from "../../src/components/rtl/Button";
import { DownOutlined } from "@ant-design/icons";
import router from "next/router";
import Header from "../../src/components/rtl/header";
import Footer from "../../src/components/rtl/footer";
import endpoints from "../../src/api";
import { getCookies, setCookies } from "../../src/helpers/cookie";
import {
  confirm,
  please_provide_your_tracking,
  tracking_your_application,
} from "../../src/helpers/LanguageConstant";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const trackingId = getCookies("trackingInsId");

  const initialState = {
    emailOrPhone: `${trackingId ? trackingId : ""}`,
  };

  const [signUpState, setSignUpState] = useState(initialState);

  //console.log("signUpState", signUpState);

  const inputHandler = (e) =>
    setSignUpState({ ...signUpState, [e.target.name]: e.target.value });

  const [loading, setLoading] = useState(false);

  const createLMSAuthorizationFunc = async (code) => {
    try {
      setLoading(true);

      //console.log("dataPayload", code);

      if (code) {
        const response = await endpoints.getApplicationOTP(code);
        if (response?.data?.message !== "Invalid OTP") {
          // router.push("/registeration-step");
          // toast.success("New Level Added Successfully");
          router.push(`/authentication/${code}`);
        } else {
          toast.error("Invalid OTP");
        }
        // setCookies("token", response?.data?.message);
      }
    } catch (error) {
      // setErrors(error.response.data.errors);
      // setErrorMessage(error.response.data.message);
      // //console.log("asattar", error);
      setLoading(false);
    } finally {
      setTimeout(() => setLoading(false), 1200);
    }
  };

  const [dropdownCaretState, setDropdownCaretState] = useState(false);

  const GetValidateApplicationFunc = async (code) => {
    try {
      // if (token && menuId) {
      // //console.log('menuId', menuId, token)
      if (code) {
        const response = await endpoints.GetValidateApplicationInstructor(code);
        if (response) {
          if (response?.data?.message !== "Invalid Tracking Number") {
            router.push(`/ar/instructor-authentication/${code}`);
          } else {
            toast.error("Invalid Tracking Number");
          }
        }
      }
      setLoading(true);
    } catch (err) {
      //console.log("err", err);
      setLoading(false);
    }
  };

  const [timerCounter, setTimerCounter] = useState(0);
  //console.log('timerCounter',timerCounter)

  // First Attempts
  useEffect(() => {
    const timer =
      timerCounter > 0 &&
      setInterval(() => setTimerCounter(timerCounter - 1), 1000);
    return () => clearInterval(timer);
  }, [timerCounter]);
  //console.log("timerCounter", timerCounter);

  return (
    <div className="container">
      <Head>
        <title>Riyadh Second Health Cluster</title>
        <link rel="icon" href={R2Favicon} />
      </Head>
      <body>
        <Header
          dropdownCaretState={dropdownCaretState}
          setDropdownCaretState={setDropdownCaretState}
        />

        <div onClick={() => setDropdownCaretState(false)}>
          {/* content */}
          <SideDesignDiv>
            <img loading="lazy"alt={""} height={500} width={500} src={SideDesign} />
          </SideDesignDiv>

          <MainStyledSigninDiv dir="rtl">
            <Container>
              <StyledSigninDiv>
                <Row gutter={[32, 32]}>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <h1>دعونا {tracking_your_application}</h1>
                    {/* <p>
                      تحتاج إلى إرفاق بعض المستندات حتى نتمكن من التحقق من طلبك
                    </p> */}

                    <>
                      <Row>
                        <p>
                          <b># {please_provide_your_tracking}</b>
                        </p>
                        <StyledInput
                          type="text"
                          name={"emailOrPhone"}
                          value={signUpState?.emailOrPhone}
                          onChange={inputHandler}
                          placeholder={"# تتبع"}
                        />
                      </Row>
                    </>
                  </Col>
                </Row>
              </StyledSigninDiv>
            </Container>
          </MainStyledSigninDiv>
          <SignInRow>
            <Container>
              {timerCounter === 0 && signUpState?.emailOrPhone?.trim()?.length > 0 ? (
                <CustomButton
                  customStyle={{
                    paddingInline: 30,
                    background: "#105F43",
                    borderRadius: 8,
                    color: "#fff",
                  }}
                  onClick={() => {
                    // router.push("/track-your-application");
                    // router.push(`/authentication/${signUpState?.emailOrPhone}`);
                    // createLMSAuthorizationFunc(signUpState?.emailOrPhone);
                    setCookies("trackingInsCode", signUpState?.emailOrPhone);
                    GetValidateApplicationFunc(signUpState?.emailOrPhone);
                    setTimerCounter(8);
                  }}
                >
                  {confirm}
                </CustomButton>
              ) : (
                <CustomButton
                  customStyle={{
                    paddingInline: 30,
                    background: "#E0E0E0",
                    borderRadius: 8,
                    color: "#fff",
                    cursor:"no-drop"
                  }}
                >
                  {confirm}
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
  height: 580px;
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
@media(min-width:992px){
  padding: 100px 0px 20px;
}
@media(max-width:991px){
  padding: 20px 0px 20px;
}

  h1 {
    font-family: "GESSTwoBold", sans-serif;
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
  margin-bottom: 20px;
  font-family: GESSTwoLight;
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
  .track-application__Container-sc-ftax8u-5 {
    display: flex !important;
    justify-content: end !important;
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

const SideDesignDiv = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
  width: 100%;
  height: 580px;
`;
