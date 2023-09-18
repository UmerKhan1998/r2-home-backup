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
  Row,
  Space,
} from "antd";
import { R2Favicon, SignInImg, TabDotGrey, TabDotWhite } from "../images";
import CustomButton from "../src/components/Button";
import endpoints from "../src/api";
import { DownOutlined } from "@ant-design/icons";
import ReCAPTCHA from "react-google-recaptcha";
import Header from "../src/components/header";
import Footer from "../src/components/footer";
import router from "next/router";
import { toast } from "react-toastify";
import { googleRecaptchaApiKey } from "../next.config";
import { useLayoutEffect } from "react";
import { message_en, passwordValidation } from "../src/helpers/passwordValidation";

const SignUp = () => {
  const initialState = {
    password: "",
    confirm_password: "",
  };

  const [loading, setLoading] = useState(false);
  const [rememberCheckedState, setRememberCheckedState] = useState("");
  const [signUpState, setSignUpState] = useState(initialState);
  //console.log("rememberCheckedState", rememberCheckedState);

  const inputHandler = (e) =>
    setSignUpState({ ...signUpState, [e.target.name]: e.target.value });

  function onChange(value) {
    setRememberCheckedState(value);
  }

  const createLMSUsersFunc = async (data) => {
    try {
      setLoading(true);
      //console.log("data", data);
      //console.log("router.query", router?.query?.id);

      const obj = {
        passwordKey: router?.query?.id,
        password: data?.password,
      };

      //console.log("obj", obj);

      const response = await endpoints.ForgetPassword(obj);

      if (response) {
        //console.log("response", response?.data?.statusCode);
        if (response?.data?.statusCode === "200") {
          toast.success(`${response?.data?.message}`);
          router.push("/sign-in");
        } else {
          toast.error(`${response?.data?.message}`);
        }
      }
    } catch (error) {
      //console.log("error", error);
      setLoading(false);
    }
  };

  const [passwordValidationState,setPasswordValidationState]=useState()
  const [passwordState,setPasswordState]=useState(false)

  useLayoutEffect(() => {
    if (passwordState) {
      setPasswordValidationState(passwordValidation(signUpState?.password));
    }
  }, [passwordValidationState, signUpState]);

  return (
    <div className="container">
      <Head>
        <title>Riyadh Second Health Cluster</title>
        <link rel="icon" href={R2Favicon} />
      </Head>
      <body>
        {/* content */}
        <Header />

        <MainStyledSigninDiv>
          <Container>
            <StyledSigninDiv>
              <Row gutter={[32, 32]}>
                <Col span={12}>
                  <h1>Create a New Password</h1>
                  <p>Welcome! Let’s get started</p>
                  <StyledAlertBanner>
                    <p>
                      Check your email / phone number for further instructions
                      resetting your password
                    </p>
                  </StyledAlertBanner>
                  <>
                    <StyledInputPasswordRow>
                      <StyledInput.Password
                        type="password"
                        name={"password"}
                        value={signUpState?.password}
                        onChange={(e)=>inputHandler(e)}
                        placeholder={"Enter New Password"}
                        onClick={()=>setPasswordState(true)}
                      />
                      {/* {passwordState&&signUpState?.password===""&&
                        <StyledErrorP>Password not matched</StyledErrorP>
                      } */}
                      {passwordState&&signUpState?.password===""?(
                        <StyledErrorP>
                          Password is Mandatory
                        </StyledErrorP>
                      ) : (
                        <>
                          {passwordState && (
                            <>
                              {signUpState?.password === undefined && (
                                <StyledErrorP>
                                  {passwordValidationState==="Invalid Password"&&message_en}
                                </StyledErrorP>
                              )}
                              {passwordValidationState ===
                              "Invalid Password" ? (
                                <StyledErrorP>
                                  {passwordValidationState==="Invalid Password"&&message_en}
                                </StyledErrorP>
                              ) : (
                                <>
                                  {signUpState?.password === "" && (
                                    <StyledErrorP>
                                      {passwordValidationState}
                                    </StyledErrorP>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}
                      <StyledInput1.Password
                        type="password"
                        name={"confirm_password"}
                        value={signUpState?.confirm_password}
                        onChange={inputHandler}
                        placeholder={"Confirm New Password"}
                      />
                      {(signUpState?.password !== signUpState?.confirm_password && signUpState?.confirm_password !== "" && signUpState?.password !== "") && (
                        <StyledErrorP>Password not matched</StyledErrorP>
                      )}
                    </StyledInputPasswordRow>

                    <RememberRow>
                      {/* <Checkbox
                        onChange={(e) =>
                          setRememberCheckedState(e.target.checked)
                        }
                      >
                        Remember me
                      </Checkbox> */}
                    </RememberRow>
                  </>{" "}
                  <ReCAPTCHA
                    sitekey={googleRecaptchaApiKey?.siteKey}
                    security={"6Lez5S4jAAAAAGCH5VsqJCb7JHjhcwtLTgA9po8H"}
                    onChange={onChange}
                  />
                </Col>
                <StyledSignInImgCol span={12}>
                  {/* <img loading="lazy"src={SignInImg} /> */}
                  <img loading="lazy"alt={""} height={500} width={350} src={SignInImg} />
                </StyledSignInImgCol>
              </Row>
            </StyledSigninDiv>
          </Container>
        </MainStyledSigninDiv>
        <SignInRow>
          <Container>
            {signUpState?.password !== "" &&
            signUpState?.password === signUpState?.confirm_password &&
            passwordValidationState !== "Invalid Password" &&
            rememberCheckedState ? (
              <CustomButton
                customStyle={{
                  paddingInline: 30,
                  background: "#105F43",
                  borderRadius: 8,
                  color: "#fff",
                }}
                onClick={() => {
                  createLMSUsersFunc(signUpState);
                }}
              >
                Save Password
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
                Save Password
              </CustomButton>
            )}
          </Container>
        </SignInRow>
        <Footer />
      </body>
    </div>
  );
};

export default SignUp;

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
  padding: 110px 0px 20px;

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
    min-width: 1120px;
  }

  @media only screen and (min-width: 1259px) and (max-width: 1359px) {
    min-width: 1120px;
  }

  @media (min-width: 1342px) {
    min-width: 1120px;
  }
`;

const StyledInput = styled(Input)`
  background: #f8f8f8;
  border: 1px solid #c1c1c1;
  border-radius: 5px;
  padding: 15px 20px;
  // margin-bottom: 20px;
  &:nth-child(1) {
    margin-top: 20px;
  }
`;

const StyledInputPasswordRow = styled(Row)`
  .ant-input-password {
    background: #f8f8f8 !important;
    border: 1px solid #c1c1c1 !important;
    border-radius: 5px !important;
    padding: 15px 20px !important;
    // margin-bottom: 20px;
    &:nth-child(1) {
      margin-top: 20px;
    }
    &:nth-child(2) {
      margin-top: 20px;
    }
  }
  input {
    background-color: transparent;
  }
`;

const StyledInput1 = styled(Input)`
  background: #f8f8f8;
  border: 1px solid #c1c1c1;
  border-radius: 5px;
  padding: 15px 20px;
  &:nth-child(1) {
    margin-top: 20px;
  }
`;

const RememberRow = styled(Row)`
  justify-content: space-between !important;
  margin-top: 10px;
  p {
    color: #a87e33 !important;
    cursor: pointer;
  }
  p:hover {
    text-decoration: underline;
  }
  .ant-checkbox {
    margin-bottom: 20px;
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
