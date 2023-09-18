import React, { useLayoutEffect, useState } from "react";
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
  CoursesImageIcon,
  GolderRightArrow,
  KhatoonImg,
  ProgramsImageIcon,
  SignInImg,
  TabDotGrey,
  TabDotWhite,
  TrainingsImageIcon,
} from "../images";
import Preloader from "../public/images/Preloader.gif";
import CustomButton from "../src/components/Button";
import { DownOutlined } from "@ant-design/icons";

import ReCAPTCHA from "react-google-recaptcha";
import Header from "../src/components/header";
import Footer from "../src/components/footer";
import { getCookies, removeCookies, setCookies } from "../src/helpers/cookie";
import endpoints from "../src/api";
import { emailValidation } from "../src/helpers/EmailValidation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import router from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { userData } from "../src/redux/actions";
import { fourDigitCode } from "../src/helpers/LanguageConstant";
import { googleRecaptchaApiKey } from "../next.config";
import ReactCodeInput from "react-code-input";
import { toast } from "react-toastify";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const signInInitialState = {
    email: "",
    password: "",
    wanIp: "string",
    header: "string",
  };
  const [signInState, setSignInState] = useState(signInInitialState);
  const inputHandler = (e) =>
    setSignInState({ ...signInState, [e.target.name]: e.target.value });
  const [emailState, setEmailState] = useState(false);
  const [emailValidationState, setEmailValidationState] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [sendCodeState, setSendCodeState] = useState(false);

  const [mobileNumberCode, setMobileNumberCode] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  useLayoutEffect(() => {
    if (emailState) {
      setEmailValidationState(emailValidation(signInState?.email));
    }
  }, [emailValidationState, signInState]);

  const dashboardGetUserProfileFunc = async () => {
    try {
      const token = getCookies("token");
      if (token) {
        const response = await endpoints.DashboardGetUserProfile(token);
        if (response) {
          let userResponseData = response?.data?.data;
          userResponseData = {
            ...userResponseData,
            authToken: token,
          };
          setCookies("userData", JSON.stringify(userResponseData));
          dispatch(userData(userResponseData));
          router.push("/dashboard");
        }
      }
      // setLoading(true);
    } catch (err) {
      //console.log("err", err);
      // setLoading(false);
    }
  };

  const LMSAuthFunc = async (data) => {
    try {
      setLoading(true);
      if (data) {
        const response = await endpoints.LMSAuth(data);
        if (response) {
          setCookies("token", response?.data?.message);
          dashboardGetUserProfileFunc();
        }
      }
    } catch (error) {
      //console.log("error", error);
      setLoading(false);
    } finally {
      setTimeout(() => setLoading(false), 1200);
    }
  };
  const LMSAuthOTPGenerateFunc = async (data) => {
    try {
      setLoading(true);
      if (data) {
        const numberOTP = selectLanguage?.name + data;
        const response = await endpoints.OTPGenerate(numberOTP);
        if (
          response.data.statusCode === "403" ||
          response.data.statusCode === "404"
        ) {
          setEmailErrorMessage(response.data.message);
          emailError();
        } else {
          setSendCodeState(true);
        }
      }
    } catch (error) {
      //console.log("error", error);
      setLoading(false);
    } finally {
      setTimeout(() => setLoading(false), 1200);
    }
  };

  const LMSAuthOTPFunc = async (data) => {
    try {
      setLoading(true);
      if (data) {
        const obj = {
          phoneNumber: selectLanguage?.name + mobileNumber,
          otp: data,
          wanIp: "string",
          header: "string",
        };
        const response = await endpoints.LMSAuthOTP(obj);
        if (response) {
          // //console.log("response", response?.data?.message);
          toast.error(response?.data?.message);
          setCookies("token", response?.data?.message);
          dashboardGetUserProfileFunc();
        }
      }
    } catch (error) {
      //console.log("error", error);
      setLoading(false);
    } finally {
      setTimeout(() => setLoading(false), 1200);
    }
  };

  const emailError = () => {
    Modal.error({
      icon: <img loading="lazy" src={CloseButton} />,
      title: " ",
      content: (
        <StyledIncorrectPasswordModal>
          <h1>{emailErrorMessage}</h1>
          <p> The Email you entered is incorrect. Please try again. </p>
        </StyledIncorrectPasswordModal>
      ),
    });
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
      img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALYAAAB5CAMAAACjkCtXAAAAnFBMVEUBQRz///8AQRwALACssqwAMwAAMQAAPxgANgAAKgAAOg4AJQDr7uwALwD7/PsAGwDy9fMAEAAAEwAAFwAAIQBrf28AHQDP1tHh5uM2TzmUpJmhq6OAjYK0vbdUblqSn5XBxsECNxEVOxwAAABKZlAURCAfSisrTzIhQiU9Uj9HW0lWZ1d2iXspSC1hcWJddWOEl4o/WUEACAA3Wj8UVID0AAAFEUlEQVR4nO2bbXeiPBCGJQoJQZG2WlIRpd2q3dWq3f3//+0JoCDakkmfEOg5uf3QfpjkjFcmk8mLPUtGg36vI5J1G4E/EqbS5tJud0SGtk4Z2jplaOuUoa1ThrZOGdo6ZWjrlKGtU4a2ThnaOmVo65QG2thercUwu0Ub4b67jDb4Z9HG9tMsSJ7oj4ptZLvR0Aodqph1s7SxPR9aVkwxeHA6QBuRt5i3YSPVcd0obWQv0ibsNyCuu0Mb3y39tMnCrrNC3436hmjj50HWIvLqzQ6kS7TxXZI1YG+1gY3Gwz+kO7Txc+619UrqDccsOOd0/l0JapU2us8jxArHqN7QC63wJRsQRN3+sXYeNE0b2cvc3N8KskjP5SkytDF3erSNrJ3dJm2y8E+w7XrYvZ4zS3v1yN9D4lshhWd49bTxy8lr65WKjMkutYvnLP2zFpo3SBs58ck6uBPB7tFp2XnsCc2/T1uoHGCqpSMwRcjZFn2zd5kiQNZt4QA+DE/G/l4wITGZHMKi76MDDhH1QYKc5dk4XNXgQwh7H8ug7Jr9kggR5bTxhp2NE/fr1QNhZxMPL7sObPiEVE/bPhbGtYvHahZc9c3WLcb2Q4mwLv0htPrYH5OK6+EDbos2uUho93XBijCmtnePp+WctJLnlpYbZMel8Z0QGg/xx6x6CfIxGkyg5ata2vipjBEmKKNy5XNh+4seBgmzIgxNJ0pp00NpG04g2LKoCj2+Wx6RzXa3Ae2WVdPuRxdug9Zq+spD5E9eumIKr6WU0h6z0jb0IIGKV3zjNsoAwjg3QBs7fmkLo91zrcD7xomEStrpiBdioNhG99Y834u1R5vML2yDBwht5MYSm4NmaJdlVKq/IHB4fUoe7dEeDS6NgRS/d9SmkHa5r8k0FRw2XANsizYiFbejJm9MVNImyaUx37f/RNrDjyZOiBugXY3tNCH/BNpXmcRKZE4Q2qN9lbctqw/frnRmleSaNZdLVNKu1CRcDFo+t0u7UgGmkjj5bZF2pd7O5EpsxlujXdndZIr6DSUTpbTp/qqB8BywE7Qvd+652EMzS6VS2pVzklwxtDJpkXblVOqkYyNrpVLalTPAs6Yw3sU/kOTT4InrWf5CJp0gAnoyo5g2fr9O3VwHCO/T7HB2R0DhqP42YXbbzJ9D8wmaTBmoTFdM+9Po5vlkJczf2VjZkTV3IEOjmPblTdmlwndXCBHbb0l2KtQAbaGu9zhnzV7SCK9pR1Z8OgcfsBcmsm6LB7C8Ba6KTe/Il4UspuPXdDLPgNlSOe2LO/drDecbl94iR4i662mWgULxxXFTtMsXDrdig3+TEaF8RTm5hzAlzuM6ytMmeF/R7HuSzxTE8/2GuG6fy/WczXZeXFAG7+CnU7Jug2gUr3e+8JyFYTKIokEchqy85Av2djtXToXOb6VkFGxH8CJA1m0YjeJlGlzDvQPsuzna5TtAqBgWPvXRQLt4dQlUvAbv3hqlXbxxhWi4k927ybotQYRXRrvP6qobJU92N15dnoFn77cFChcT8J21Ftq9/LV8rePhYkVL827Q7uW/TZgn129eTuJr/eO37vf0/BKE/p4mgV9JiL7PZtu1Q2/NO0E7Fybe478pX82TkCuJB8cFHY+ofExrpJ19eHVKHIfgFRclIztz+WvzbtA+iZermKv3/w98dNFWa25+U2Zoi2Vo65ShrVOGtk4Z2jplaOuUoa1ThrZOGdo6ZWhr1H9ouWxli8r2yAAAAABJRU5ErkJggg==",
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

  const userDataState = useSelector((state) => state?.userDataReducer);
  const [isAuthorized, setAuthorized] = useState(false);
  useLayoutEffect(() => {
    if (userDataState?.authToken === undefined) {
      setAuthorized(true);
    } else {
      setAuthorized(true);
    }
  }, []);

  const handleInputChange = (e) => {
    setVerificationCode(e);
    // let fake = e;
    // if (fake?.length === 6) {
    //   // router.push("/complete-information");
    //   createLMSAuthorizationFunc(signInState, e, ip);
    // }
  };

  const registerArr = [
    {
      img: CoursesImageIcon,
      title: "Register for Courses",
      link: "courses-landing-page",
    },
    {
      img: TrainingsImageIcon,
      title: "Register for Trainings",
      link: "trainings-landing-page",
    },
    {
      img: ProgramsImageIcon,
      title: "Register for Programs",
      link: "programs-landing-page",
    },
  ];

  const [dropdownCaretState, setDropdownCaretState] = useState(false);

  return (
    <>
      {isAuthorized ? (
        <div className="container">
          <Head>
            <title>Riyadh Second Health Cluster</title>
            <link rel="icon" href="" />
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
                    <Row gutter={[32, 32]}>
                      <Col
                        className="content"
                        xl={12}
                        lg={12}
                        md={12}
                        sm={24}
                        xs={24}
                      >
                        <h1>Modify your Skills, by Registering with Us</h1>
                        <p>
                          We are really glad you decided to be a part of R2.
                          Please choose from the given list of programs or you
                          can continue with your previous application
                        </p>
                        <Row gutter={[24, 24]}>
                          {registerArr?.map((item, index) => (
                            <Col
                              xl={8}
                              lg={8}
                              md={8}
                              sm={24}
                              xs={24}
                              key={index}
                            >
                              <StyledCategoriesCards
                                onClick={() => router.push(`/${item?.link}`)}
                              >
                                <Image
                                  loading="lazy"
                                  alt={""}
                                  height={40}
                                  width={40}
                                  src={item?.img}
                                />
                                <h1>{item?.title}</h1>
                                <Image
                                  loading="lazy"
                                  alt={""}
                                  height={24}
                                  width={24}
                                  src={GolderRightArrow}
                                />
                              </StyledCategoriesCards>
                            </Col>
                          ))}
                        </Row>
                        <StyledColoredPFlex1>
                          Or
                          <StyledResendOTPColoredP
                            onClick={() => router.push(`/track-application`)}
                          >
                            Continue your Application
                          </StyledResendOTPColoredP>
                        </StyledColoredPFlex1>
                      </Col>
                      <StyledSignInImgCol
                        xl={12}
                        lg={12}
                        md={12}
                        sm={24}
                        xs={24}
                      >
                        <Image
                          loading="lazy"
                          alt={""}
                          height={500}
                          width={380}
                          src={KhatoonImg}
                        />
                      </StyledSignInImgCol>
                    </Row>
                  </StyledSigninDiv>
                </Container>
              </MainStyledSigninDiv>
              <SignInRow>
                <Container>
                  <CustomButton
                    customStyle={{
                      paddingInline: 30,
                      background: "#fff",
                      borderRadius: 8,
                      color: "#105F43",
                      border: "1px solid #105F43",
                    }}
                    onClick={() => router.push(`/`)}
                  >
                    Cancel
                  </CustomButton>
                </Container>
              </SignInRow>
              <Footer />
            </div>
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
  justify-content: end;
  img {
    width: 380px;
    object-fit: contain;
  }
`;

const StyledSignInCustomButtonImg = styled.img`
  margin-right: 10px !important;
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
    padding: 130px 0px 50px;
  }
  @media (max-width: 991px) {
    padding: 20px 0px 50px;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    p {
      margin-bottom: 35px;
    }
  }

  h1 {
    font-family: "TitilliumBold", sans-serif;
    // // font-weight: 700;
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
`;

const StyledInputNumber = styled(PhoneInput)`
  background: #f8f8f8;
  border: 1px solid #c1c1c1;
  border-radius: 5px;
  padding: 15px 20px;
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
    background: transparent !important;
  }
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
  .forgot_password {
    color: #a87e33 !important;
  }
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

const SendCodeRow = styled(Row)`
  justify-content: space-between !important;
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

const StyledCustomButton = styled(CustomButton)`
  border-radius: 5px !important;
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
    font-size: 18px;
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

const StyledColoredPFlex1 = styled.p`
  display: flex;
  font-weight: 400 !important;
  margin-top: 15px;
  img {
    padding-right: 7px !important;
  }
`;

const StyledResendOTPColoredP = styled.b`
  color: #105f43 !important;
  font-weight: 400 !important;
  margin-left: 5px !important;
  cursor: pointer;
  &:hover {
    text-decoration: underline !important;
  }
`;
