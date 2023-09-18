import React, { useEffect, useLayoutEffect, useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import Image from "next/image";

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
  GreenLoader,
  R2Favicon,
  SignInImg,
  TabDotGrey,
  TabDotWhite,
} from "../../images";
import Preloader from "../../public/images/Preloader.gif";
import CustomButton from "../../src/components/rtl/Button";

import ReCAPTCHA from "react-google-recaptcha";
import Header from "../../src/components/rtl/header";
import Footer from "../../src/components/rtl/footer";
import {
  getCookies,
  removeCookies,
  setCookies,
} from "../../src/helpers/cookie";
import endpoints from "../../src/api";
import { emailValidation } from "../../src/helpers/EmailValidation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import router from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../src/redux/actions";
import { googleRecaptchaApiKey } from "../../next.config";
import ReactCodeInput from "react-code-input";
import { toast } from "react-toastify";
import {
  message_ar,
  passwordValidation,
} from "../../src/helpers/passwordValidation";

import {
  account_verification,
  email,
  email_is_mandatory,
  forgot_password,
  invalid_email,
  invalid_otp,
  invalid_password,
  is_mandatory,
  or,
  password,
  remember_me,
  resend_code,
  send_code,
  sign_in,
  sign_in_by_email,
  sign_in_by_sms,
  sign_in_to_your_account,
  sms_verify_para,
  welcome_let_get_started,
} from "../../src/helpers/LanguageConstant";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [passwordState, setPasswordState] = useState(false);

  const authToken = getCookies("token");
  const userStatus = getCookies("userStatus");
  const [isAuthorized, setAuthorized] = useState(false);
  useLayoutEffect(() => {
    if (authToken === undefined) {
      setAuthorized(true);
    } else if (userStatus === undefined || userStatus === "false") {
      setAuthorized(true);
    } else if (authToken || userStatus === "true") {
      router.push("/ar/dashboard");
    }
  }, []);

  const signInInitialState = {
    email: "",
    password: "",
    wanIp: "string",
    header: "string",
  };
  const [signInState, setSignInState] = useState(signInInitialState);

  const [passwordValidationState, setPasswordValidationState] = useState();
  // console.log('passwordValidationState',passwordValidationState)
  // console.log('signInState',signInState)

  const inputHandler = (e) =>
    setSignInState({ ...signInState, [e.target.name]: e.target.value });
  const [emailState, setEmailState] = useState(false);
  const [emailValidationState, setEmailValidationState] = useState("");
  const [sendCodeState, setSendCodeState] = useState(false);

  const [mobileNumberCode, setMobileNumberCode] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  useLayoutEffect(() => {
    if (emailState) {
      setEmailValidationState(emailValidation(signInState?.email));
    }
    if (passwordState) {
      setPasswordValidationState(passwordValidation(signInState?.password));
    }
  }, [emailValidationState, passwordValidationState, signInState]);

  const dashboardGetUserProfileFunc = async () => {
    try {
      const authToken = getCookies("token");
      if (authToken) {
        const response = await endpoints.DashboardGetUserProfile(authToken);
        if (response) {
          let userResponseData = response?.data?.data;
          userResponseData = {
            ...userResponseData,
            authToken: authToken,
          };
          dispatch(userData(userResponseData));
          router.push("/ar/dashboard");
        }
      }
    } catch (err) {
      //console.log("err", err);
    }
  };

  const LMSAuthFunc = async (data) => {
    setLoading(true);
    try {
      if (data) {
        const response = await endpoints.LMSAuth(data);
        //console.log("LMSAuthFunc", response);
        if (response?.data?.statusCode === "200") {
          if (response?.data?.data?.approved === false) {
            setCookies("userStatus", "false");
            toast.warn("Ask RMS");
          } else {
            setCookies("userStatus", response?.data?.data?.approved);
            setCookies("token", response?.data?.message);
            dashboardGetUserProfileFunc();
            setLoading(false);
          }
        } else if (response?.data?.statusCode === "403") {
          toast.error(`${invalid_email} ${or} ${password}!`);
        } else {
          toast.error(response?.data?.message);
        }
      }
    } catch (error) {
      toast.error(`${invalid_email} ${or} ${password}!`);
      setLoading(false);
    }
  };
  const LMSAuthOTPGenerateFunc = async (data) => {
    try {
      setLoading(true);
      if (data) {
        const numberOTP = data;
        const response = await endpoints.OTPGenerate(numberOTP);
        if (response.data.statusCode === "200") {
          setSendCodeState(true);
        } else if (
          response?.data?.statusCode === "403" ||
          response?.data?.statusCode === "403"
        ) {
          toast.error(`${invalid_otp}!`);
        } else {
          toast.error(response?.data?.message);
        }
      }
    } catch (error) {
      if (error?.response?.data?.statusCode === "403") {
        toast.error(`${invalid_email} ${or} ${password}!`);
      } else {
        toast.error(response?.data?.message);
      }
      setLoading(false);
    }
  };

  const LMSAuthOTPFunc = async (data) => {
    try {
      setLoading(true);
      if (data) {
        const obj = {
          phoneNumber: mobileNumber,
          otp: data,
          wanIp: "string",
          header: "string",
        };
        const response = await endpoints.LMSAuthOTP(obj);
        if (response?.data?.statusCode === "200") {
          if (response?.data?.data?.approved === false) {
            setCookies("userStatus", "false");
            toast.error("لم تتم الموافقة على حسابك! يرجى الاتصال بالمسؤول");
          } else {
            setCookies("userStatus", response?.data?.data?.approved);
            setCookies("token", response?.data?.message);
            dashboardGetUserProfileFunc();
            setLoading(false);
          }
        } else if (response?.data?.statusCode === "403") {
          toast.error(`${invalid_otp}!`);
        } else {
          toast.error(response?.data?.message);
        }
      }
    } catch (error) {
      if (error?.response?.data?.statusCode === "403") {
        toast.error("لم تتم الموافقة على حسابك! يرجى الاتصال بالمسؤول");
      } else {
        toast.error(response?.data?.message);
      }
      setLoading(false);
    }
  };

  const [activeSign, setActiveSign] = useState("email");
  const [captchaState, setCaptchaState] = useState(false);

  const [selectLanguage, setSelectLanguage] = useState({
    img: "data:image/png;base64,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",
    name: "+966",
  });

  const countryArr = [
    {
      img: "data:image/png;base64,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",
      name: "+966",
    },
    {
      img: "data:image/png;base64,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",
      name: "+92",
    },
  ];

  const menu1 = (
    <StyledNotificationMenu>
      {countryArr?.map((item, index) => (
        <div
          key={index}
          onClick={() =>
            setSelectLanguage({ img: item?.img, name: item?.name })
          }
          className={"select-country"}
        >
          <Avatar size={24} src={item?.img} />
          <p className="language-title">{item?.name}</p>
        </div>
      ))}
    </StyledNotificationMenu>
  );

  function onChange(value) {
    if (value) {
      setCaptchaState(true);
    } else {
      setCaptchaState(false);
    }
  }

  useLayoutEffect(() => {
    removeCookies("courseId");
  }, []);

  const handleInputChange = (e) => {
    setVerificationCode(e);
    // let fake = e;
    // if (fake?.length === 6) {
    //   // router.push("/complete-information");
    //   createLMSAuthorizationFunc(signInState, e, ip);
    // }
  };

  const [dropdownCaretState, setDropdownCaretState] = useState(false);

  const [timerCounter, setTimerCounter] = useState(0);
  //console.log("timerCounter", timerCounter);

  // First Attempts
  useEffect(() => {
    const timer =
      timerCounter > 0 &&
      setInterval(() => setTimerCounter(timerCounter - 1), 1000);
    return () => clearInterval(timer);
  }, [timerCounter]);
  //console.log("timerCounter", timerCounter);

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
              dropdownCaretState={dropdownCaretState}
              setDropdownCaretState={setDropdownCaretState}
            />

            {/* content */}

            <div onClick={() => setDropdownCaretState(false)}>
              <MainStyledSigninDiv>
                <Container>
                  <StyledSigninDiv>
                    <Row dir="rtl" gutter={[32, 32]}>
                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        {sendCodeState ? (
                          <h1>{account_verification}</h1>
                        ) : (
                          <h1>{sign_in_to_your_account}</h1>
                        )}
                        <p>{welcome_let_get_started}</p>

                        <Row style={{ marginBottom: "20px" }}>
                          {activeSign === "email" ? (
                            <CustomButton
                              customStyle={{
                                background: "#A87E33",
                                border: "1px solid #A87E33",
                                color: "#fff",
                                padding: "22px 30px",
                                display: "flex",
                                alignItems: "center",
                                marginLeft: 15,
                              }}
                              onClick={() => setActiveSign("email")}
                            >
                              <StyledSignInCustomButtonImg src={TabDotWhite} />
                              {sign_in_by_email}
                              {/* Sign in by Email */}
                            </CustomButton>
                          ) : (
                            <CustomButton
                              customStyle={{
                                color: "#B7B7B7",
                                padding: "22px 30px",
                                display: "flex",
                                marginLeft: 15,
                                alignItems: "center",
                              }}
                              onClick={() => setActiveSign("email")}
                            >
                              <StyledSignInCustomButtonImg src={TabDotGrey} />
                              {sign_in_by_email}
                              {/* Sign in by Email */}
                            </CustomButton>
                          )}

                          {activeSign === "sms" ? (
                            <CustomButton
                              customStyle={{
                                background: "#A87E33",
                                border: "1px solid #A87E33",
                                // borderRadius: "5px !important",
                                color: "#fff",
                                padding: "22px 30px",
                                display: "flex",
                                alignItems: "center",
                                marginTop: 20,
                              }}
                              onClick={() => setActiveSign("sms")}
                            >
                              <StyledSignInCustomButtonImg src={TabDotWhite} />
                              {sign_in_by_sms}
                              {/* Sign in by SMS */}
                            </CustomButton>
                          ) : (
                            <CustomButton
                              customStyle={{
                                color: "#B7B7B7",
                                padding: "22px 30px",
                                display: "flex",
                                alignItems: "center",
                                marginTop: 20,
                              }}
                              onClick={() => setActiveSign("sms")}
                            >
                              <StyledSignInCustomButtonImg src={TabDotGrey} />
                              {sign_in_by_sms}
                              {/* Sign in by SMS */}
                            </CustomButton>
                          )}
                        </Row>
                        {activeSign === "email" ? (
                          <>
                            <Row gutter={["20px", "20px"]}>
                              <Col span={24}>
                                <StyledInput
                                  type="text"
                                  name={"email"}
                                  value={signInState?.email}
                                  onChange={(e) => {
                                    inputHandler(e);
                                  }}
                                  placeholder={email}
                                  onClick={() => setEmailState(true)}
                                  maxLength={100}
                                />
                                {emailState && (
                                  <>
                                    {signInState?.email === "" ? (
                                      <StyledErrorP>
                                        {email_is_mandatory}
                                      </StyledErrorP>
                                    ) : (
                                      <>
                                        {emailState && (
                                          <>
                                            {signInState?.email ===
                                              undefined && (
                                              <StyledErrorP>
                                                {email_is_mandatory}
                                              </StyledErrorP>
                                            )}
                                            {emailValidationState ===
                                            "Invalid Email" ? (
                                              <StyledErrorP>
                                                {invalid_email}
                                              </StyledErrorP>
                                            ) : (
                                              <>
                                                {signInState?.email === "" && (
                                                  <StyledErrorP>
                                                    {email_is_mandatory}
                                                  </StyledErrorP>
                                                )}
                                              </>
                                            )}
                                          </>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                              </Col>
                              <StyledInputPasswordCol span={24}>
                                <StyledInput.Password
                                  type="password"
                                  name={"password"}
                                  value={signInState?.password}
                                  onChange={inputHandler}
                                  placeholder={password}
                                  onClick={() => setPasswordState(true)}
                                  maxLength={100}
                                />
                                {/* {passwordValidationState==="Invalid Password" && (
                                  <StyledErrorP>
                                    {invalid_password}
                                  </StyledErrorP>
                                )}
                                {passwordValidationState==="Password is mandatory" && (
                                  <StyledErrorP>
                                    {password} {is_mandatory}
                                  </StyledErrorP>
                                )} */}

                                {signInState?.password === "" &&
                                passwordState ? (
                                  <StyledErrorP>
                                    {password}
                                    {is_mandatory}
                                  </StyledErrorP>
                                ) : (
                                  <>
                                    {/* {passwordState && (
                                      <>
                                        {signInState?.password === undefined && (
                                          <StyledErrorP>
                                           {password}{is_mandatory}
                                          </StyledErrorP>
                                        )}
                                        {passwordValidationState ===
                                        "Invalid Password" ? (
                                          <StyledErrorP>
                                            {message_ar}
                                          </StyledErrorP>
                                        ) : (
                                          <>
                                            {signInState?.password === "" && (
                                              <StyledErrorP>
                                               {password}{is_mandatory}
                                              </StyledErrorP>
                                            )}
                                          </>
                                        )}
                                      </>
                                    )} */}
                                  </>
                                )}
                              </StyledInputPasswordCol>
                              {/* {passwordState &&
                                  signInState?.password === "" && (
                                    <StyledErrorP>
                                      كلمة المرور إلزامية
                                    </StyledErrorP>
                                  )} */}
                              <Col span={24}>
                                <RememberRow>
                                  <Checkbox>{remember_me}</Checkbox>
                                  <p
                                    className="forgot_password"
                                    onClick={() =>
                                      router.push("/ar/forgot-password")
                                    }
                                  >
                                    {forgot_password}؟
                                  </p>
                                </RememberRow>
                              </Col>
                              <Col>
                                <ReCAPTCHA
                                  sitekey={googleRecaptchaApiKey?.siteKey}
                                  onChange={onChange}
                                />
                              </Col>
                            </Row>
                          </>
                        ) : (
                          <>
                            {sendCodeState ? (
                              <StyledEmailBySmsRow>
                                {/* <Col span={6}>
                                <Dropdown overlay={menu1}>
                                  <LanguageButton>
                                    <Space>
                                      <Avatar
                                        size={24}
                                        src={selectLanguage?.img}
                                      />
                                      <p>{selectLanguage?.name}</p>
                                      <DownOutlined />
                                    </Space>
                                  </LanguageButton>
                                </Dropdown>
                              </Col> */}
                                <Col span={24}>
                                  {/* <StyledInput
                                  name="otp"
                                  type={"number"}
                                  maxLength="6"
                                  value={mobileNumber}
                                  onChange={(e) =>
                                    setMobileNumber(e.target.value)
                                  }
                                  placeholder={"Mobile Number"}
                                /> */}
                                  <StyledInputNumber
                                    country={"sa"}
                                    value={mobileNumber}
                                    onChange={(phone) => {
                                      setMobileNumber(phone);
                                      //console.log("phone", phone);
                                    }}
                                  />
                                </Col>

                                <StyledReactCodeInput
                                  onChange={handleInputChange}
                                  type="number"
                                  fields={6}
                                />
                                {/* <StyledInput1
                                placeholder={"Verification Code"}
                                maxLength="6"
                                value={verificationCode}
                                onChange={(e) => {
                                  setVerificationCode(e.target.value);
                                }}
                              /> */}
                              </StyledEmailBySmsRow>
                            ) : (
                              <StyledEmailBySmsRow>
                                {/* <Col span={6}>
                                <Dropdown overlay={menu1}>
                                  <LanguageButton>
                                    <Space>
                                      <Avatar
                                        size={24}
                                        src={selectLanguage?.img}
                                      />
                                      <p>{selectLanguage?.name}</p>
                                      <DownOutlined />
                                    </Space>
                                  </LanguageButton>
                                </Dropdown>
                              </Col> */}
                                <Col span={24}>
                                  {/* <StyledInput
                                  name="otp"
                                  type={"number"}
                                  maxLength="6"
                                  value={mobileNumber}
                                  onChange={(e) =>
                                    setMobileNumber(e.target.value)
                                  }
                                  placeholder={"Mobile Number"}
                                /> */}
                                  <StyledInputNumber
                                    country={"sa"}
                                    value={mobileNumber}
                                    onChange={(phone) => {
                                      setMobileNumber(phone);
                                      //console.log("phone", phone);
                                    }}
                                  />
                                </Col>
                                <p>6 {sms_verify_para}!</p>

                                <Col span={24}>
                                  <RememberRow>
                                    <Checkbox>{remember_me}</Checkbox>
                                    {/* <p
                                    className="forgot_password"
                                    onClick={() =>
                                      router.push("/phone-forgot-password")
                                    }
                                  >
                                    Forgot password?
                                  </p> */}
                                  </RememberRow>
                                </Col>
                              </StyledEmailBySmsRow>
                            )}
                          </>
                        )}
                      </Col>
                      <StyledSignInImgCol
                        xl={12}
                        lg={12}
                        md={12}
                        sm={24}
                        xs={24}
                      >
                        <img
                          loading="lazy"
                          alt={""}
                          height={500}
                          width={380}
                          src={SignInImg}
                        />
                      </StyledSignInImgCol>
                    </Row>
                  </StyledSigninDiv>
                </Container>
              </MainStyledSigninDiv>
              <SignInRow>
                <ContainerNext>
                  {activeSign === "email" ? (
                    <>
                      {timerCounter !== 0 ||
                      signInState?.email === "" ||
                      signInState?.password === "" ||
                      emailValidationState === "Invalid Email" ||
                      !captchaState ? (
                        <CustomButton
                          customStyle={{
                            paddingInline: 30,
                            background: "#E0E0E0",
                            borderRadius: 8,
                            color: "#fff",
                          }}
                        >
                          {sign_in}
                        </CustomButton>
                      ) : (
                        <CustomButton
                          customStyle={{
                            paddingInline: 30,
                            background: "#105F43",
                            borderRadius: 8,
                            color: "#fff",
                          }}
                          onClick={() => {
                            LMSAuthFunc(signInState);
                            setTimerCounter(3);
                          }}
                        >
                          {sign_in}
                        </CustomButton>
                      )}
                    </>
                  ) : (
                    <>
                      {!sendCodeState ? (
                        <>
                          {mobileNumber?.length > 0 ? (
                            <>
                              {timerCounter === 0 ? (
                                <CustomButton
                                  customStyle={{
                                    paddingInline: 30,
                                    background: "#105F43",
                                    borderRadius: 8,
                                    color: "#fff",
                                  }}
                                  onClick={() => {
                                    LMSAuthOTPGenerateFunc(mobileNumber);
                                    setTimerCounter(3);
                                  }}
                                >
                                  {send_code}
                                </CustomButton>
                              ) : (
                                <CustomButton
                                  customStyle={{
                                    paddingInline: 30,
                                    background: "#E0E0E0",
                                    borderRadius: 8,
                                    color: "#fff",
                                  }}
                                  // onClick={() =>
                                  //   LMSAuthOTPGenerateFunc(mobileNumber)
                                  // }
                                >
                                  {send_code}
                                </CustomButton>
                              )}
                            </>
                          ) : (
                            <>
                              <CustomButton
                                customStyle={{
                                  paddingInline: 30,
                                  background: "#E0E0E0",
                                  borderRadius: 8,
                                  color: "#fff",
                                }}
                              >
                                {send_code}
                              </CustomButton>
                            </>
                          )}
                        </>
                      ) : (
                        <SendCodeRow>
                          <CustomButton
                            customStyle={{
                              paddingInline: 30,
                              // background: "#E0E0E0",
                              borderRadius: 8,
                              color: "#105F43",
                              border: "1px solid #105F43",
                            }}
                            onClick={() => {
                              // setSendCodeState(false);
                              LMSAuthOTPGenerateFunc(mobileNumber);
                            }}
                          >
                            {resend_code}
                          </CustomButton>
                          {timerCounter !== 0 ? (
                            <CustomButton
                              customStyle={{
                                paddingInline: 30,
                                background: "#E0E0E0",
                                borderRadius: 8,
                                color: "#fff",
                                textAlign: "center",
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                              }}
                            >
                              {sign_in}
                              <img
                                loading="lazy"
                                alt={""}
                                src={GreenLoader}
                                height={20}
                                width={20}
                              />
                            </CustomButton>
                          ) : (
                            <>
                              {verificationCode?.length === 6 ? (
                                <CustomButton
                                  customStyle={{
                                    paddingInline: 30,
                                    background: "#105F43",
                                    borderRadius: 8,
                                    color: "#fff",
                                  }}
                                  onClick={() => {
                                    LMSAuthOTPFunc(verificationCode);
                                    setTimerCounter(8);
                                  }}
                                >
                                  {sign_in}
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
                                  {sign_in}
                                </CustomButton>
                              )}
                            </>
                          )}
                        </SendCodeRow>
                      )}
                    </>
                  )}
                </ContainerNext>
              </SignInRow>
            </div>
            <Footer />
          </body>
        </div>
      ) : (
        <>
          {" "}
          <img loading="lazy" className="pre-loader" src={Preloader.src} />
        </>
      )}
    </>
  );
};

export default SignIn;

const MainStyledSigninDiv = styled.div`
  border-bottom: 1px solid #a9a9a9;
`;

const StyledSignInImgCol = styled(Col)`
  height: 464px;

  display: flex;
  justify-content: center;
  img {
    width: 380px;
    object-fit: contain;
  }
`;

const StyledSignInCustomButtonImg = styled.img`
  margin-left: 10px !important;
`;

const StyledErrorP = styled.p`
  margin-bottom: 0px;
  color: #fa4947 !important;
  font-size: 13px !important;
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
    padding: 20px 0px 20px;
  }

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
`;

const StyledInput1 = styled(Input)`
  background: #f8f8f8;
  border: 1px solid #c1c1c1;
  border-radius: 5px;
  padding: 15px 20px;
  margin-bottom: 20px;
  margin-top: 0px;
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

const SendCodeRow = styled(Row)`
  justify-content: space-between !important;
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

const StyledCustomButton = styled(CustomButton)`
  border-radius: 5px !important;
`;
const StyledInputPasswordCol = styled(Col)`
  .ant-input {
    background: transparent !important;
  }
  .ant-input-password {
    background: #f8f8f8 !important;
    border: 1px solid #c1c1c1 !important;
    border-radius: 5px !important;
    padding: 15px 20px !important;
  }
`;

const StyledInputNumber = styled(PhoneInput)`
  background: #f8f8f8;
  border: 1px solid #c1c1c1;
  border-radius: 5px;
  padding: 15px 40px;
  width: 100%;
  .flag-dropdown {
    position: absolute !important;
    top: 0 !important;
    bottom: 0 !important;
    background: transparent !important;
    padding: 0 !important;
    background-color: transparent !important;
    border: 1px solid transparent !important;
    border-radius: 3px 0 0 3px !important;
  }
  .react-tel-input .flag-dropdown.open .selected-flag {
    background: transparent !important;
    border-radius: 3px 0 0 0 !important;
  }
  .selected-flag:hover {
    background-color: transparent !important;
  }
  .react-tel-input {
    border: none !important;
  }
  .form-control {
    border: none !important;
    padding-right: 38px !important;
    background: transparent !important;
    // padding-left: unset !important;
    font-family: "GESSTwoLight";
    -moz-transform: scaleX(-1);
  }
`;

const StyledReactCodeInput = styled(ReactCodeInput)`
  input {
    font-family: "GESSTwoLight", sans-serif !important;
  }
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

const ContainerNext = styled.div`
  @media (max-width: 991px) {
    width: 100%;
    padding-inline: 20px;
  }
  @media (min-width: 992px) {
    min-width: 992px;
  }
  @media only screen and (min-width: 1160px) and (max-width: 1258px) {
    // min-width: 1200px;
    min-width: 1120px;
    max-width: 100%;
    margin: 0 auto;
    padding: 0 1rem;
  }
  @media only screen and (min-width: 1259px) and (max-width: 1359px) {
    // min-width: 1200px;
    min-width: 1120px;
    max-width: 100%;
    margin: 0 auto;
    padding: 0 1rem;
  }
  @media (min-width: 1342px) {
    // min-width: 1200px;
    min-width: 1120px;
    max-width: 100%;
    margin: 0 auto;
    padding: 0 1rem;
  }
`;
