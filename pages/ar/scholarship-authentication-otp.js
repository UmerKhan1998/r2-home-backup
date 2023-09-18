import React, { useState, useLayoutEffect, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { removeCookies } from "../../src/helpers/cookie";
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
  GreenLoader,
  Loader,
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
import ModalComp from "../../src/components/Modal/PersonalInformationConfirmationModal";
import { emailValidation } from "../../src/helpers/EmailValidation";
import { getCookies, setCookies } from "../../src/helpers/cookie";
import endpoints from "../../src/api";
import { useDispatch, useSelector } from "react-redux";
import { courseTrainingRegisterationLovData } from "../../src/redux/actions";
import Header from "../../src/components/rtl/header";
import Footer from "../../src/components/footer";
import axios from "axios";
import { toast } from "react-toastify";
import {
  back,
  code_para,
  didnt_receive_para,
  next,
  Please_enter_digit_code_sent_to_your_mobile_number,
  resend_OTP,
  resend_possible,
  we_would_like_to_verify_your_mobile_number,
} from "../../src/helpers/LanguageConstant";

// import { NextRequest } from "next/server";

const PersonalInformation = () => {
  const dispatch = useDispatch();
  const uk = useSelector((state) => state);

  const [securityCode, setSecurityCode] = useState("");

  //console.log("securityCode", securityCode);

  const initialState = {
    firstName_EN: "",
    lastName_EN: "",
    firstName_AR: "string",
    lastName_AR: "string",
    email: getCookies("email"),
    active: true,
    phone_number: "",
    confirm_email: "",
    code: "",
  };

  const [ip, setIP] = useState("");

  //console.log("ip", ip);
  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    //console.log(".ip", res?.data?.ip);
    setIP(res?.data?.ip);
  };

  const [signInState, setSignInState] = useState(initialState);

  //console.log("signInState", signInState);

  const [registerationStep, setRegisterationStep] = useState(0);

  const [emailValidationState, setEmailValidationState] = useState("");

  //console.log("emailValidationState", emailValidationState);

  const inputHandler = (e) =>
    setSignInState({ ...signInState, [e.target.name]: e.target.value });

  const emailInputHandler = (e) => {
    setSignInState({ ...signInState, email: e.target.value });
  };

  useLayoutEffect(() => {
    if (emailState) {
      setEmailValidationState(emailValidation(signInState?.email));
    }
    removeCookies('specialityId')
  }, [emailValidationState, signInState]);

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

  useLayoutEffect(() => {
    getData();
  }, [emailValidationState]);

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

  const formArr = [
    {
      type: "text",
      name: "firstName_EN",
      value: signInState?.firstName_EN,
      placeholder: "First Name",
    },
    {
      type: "text",
      name: "lastName_EN",
      value: signInState?.lastName_EN,
      placeholder: "Last Name",
    },
    {
      type: "text",
      name: "email",
      value: signInState?.email,
      placeholder: "Email",
    },
    {
      type: "text",
      name: "confirm_email",
      value: signInState?.confirm_email,
      placeholder: "Confirm Email",
    },
  ];

  const [firstNameState, setFirstNameState] = useState(false);
  const [lastNameState, setLastNameState] = useState(false);
  const [emailState, setEmailState] = useState(false);
  const [confirmEmailState, setConfirmEmailState] = useState(false);
  const [phoneNumberState, setPhoneNumberState] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setSecurityCode(e);
    let fake = e;
  };

  const [openModal, setOpenModal] = useState(false);
  const [getCourseDetailId, setGetCourseDetailId] = useState([]);
  //console.log("getCourseDetailId", getCourseDetailId);

  // const getCourseDetailRecordFunc = async (id) => {
  //   try {
  //     // if (token && menuId) {
  //     // //console.log('menuId', menuId, token)
  //     if (id) {
  //       const response = await endpoints.getCourseTrainingRegistrationLov(id);
  //       if (response) {
  //         //console.log(
  //           "response",
  //           response?.data?.data
  //             ?.lovServicesCourseTrainingCategoryCheckListViewModels
  //         );
  //         setGetCourseDetailId(
  //           response?.data?.data?.lovServicesCourseTrainingCheckListViewModels
  //         );
  //         dispatch(
  //           courseTrainingRegisterationLovData(
  //             response?.data?.data
  //               ?.lovServicesCourseTrainingCategoryCheckListViewModels
  //           )
  //         );
  //       }
  //     }
  //     setLoading(true);
  //   } catch (err) {
  //     //console.log("err", err);
  //     setLoading(false);
  //   } finally {
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 12000);
  //   }
  // };

  const [timerState, setTimerState] = useState(false);
  //console.log("timerState", timerState);

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      setTimerState(true);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const [timerCounter, setTimerCounter] = useState(5);

  // First Attempts
  useEffect(() => {
    const timer =
      timerCounter > 0 &&
      setInterval(() => setTimerCounter(timerCounter - 1), 1000);
    return () => clearInterval(timer);
  }, [timerCounter]);
  //console.log("timerCounter", timerCounter);

  const [timerCounter1, setTimerCounter1] = useState(5);

  // First Attempts
  useEffect(() => {
    const timer =
      timerCounter1 > 0 &&
      setInterval(() => setTimerCounter1(timerCounter1 - 1), 1000);
    return () => clearInterval(timer);
  }, [timerCounter1]);
  //console.log("timerCounter1", timerCounter1);

  const [invalidNumberState, setInvalidNumberState] = useState();

  const createLMSUsersFunc = async () => {
    setLoading(true);
    try {
      const obj = {
        firstName_EN: getCookies("firstName_EN"),
        lastName_EN: getCookies("lastName_EN"),
        firstName_AR: getCookies("firstName_AR"),
        lastName_AR: getCookies("lastName_AR"),
        email: getCookies("email"),
        active: true,
        phoneNumber: getCookies("phone"),
        // courseTrainingId: getCookies("courseId"),
      };

      //console.log("dataPayloadResponseObj", obj);
      const response = await endpoints.ScholarShipUserRegistration(obj);
      //console.log("dataPayloadResponse", response);

      if (response) {
        if (response?.data?.statusCode === "200") {
          // router.push("/authentication-otp");
        } else {
        }
        //console.log("response", response?.data?.data);
        // setCookies("trackingId", response?.data?.data);
        setInvalidNumberState(response?.data?.message);
      }
    } catch (error) {
      // setErrors(error.response.data.errors);
      // setErrorMessage(error.response.data.message);
      //console.log("asattar", error);
      setLoading(false);
    }
  };

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

          // courseTrainingId: getCookies("courseId"),
          // active: data?.active,
          // phoneNumber: data?.phone_number,
        };

        const response = await endpoints.createLMSAuthorization(obj);
        if (response?.data?.statusCode === "200") {
          //console.log("rtoken", response?.data?.data?.approved);
          setCookies("userStatus", response?.data?.data?.approved);
          router.push("/ar/application-for-scholarship");
          // toast.success("New Level Added Successfully");
          setCookies("token2", response?.data?.message);
        } else {
          toast.error("Invalid OTP");
        }
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

  const [termsAndCondition, setTermsAndCondition] = useState(false);

  //console.log("termsAndCondition", termsAndCondition);

  const ukMated = signInState?.email === signInState?.confirm_email;
  {
    //console.log("ukMated", ukMated);
  }

  const phone = getCookies("phone");
  //console.log("phone", phone);

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
                <StyledRegisterationRow dir="rtl" gutter={[32, 32]}>
                  <Col span={24}>
                    <h1>{we_would_like_to_verify_your_mobile_number}</h1>
                    <BeforeFormP>
                      {Please_enter_digit_code_sent_to_your_mobile_number}
                    </BeforeFormP>
                    <StyledContactRow>
                      {/* <img loading="lazy"src={MobileVerification} /> */}
                      <Image alt={""} height={30} width={30} src={MobileVerification} />
                      {/* <p>{selectLanguage?.name}</p> */}
                      {/* <p>*******{signInState?.phone?.slice(8, 11)}</p> */}
                      <p>+{phone?.slice(0, 4)}</p>*****
                      <p>{phone?.slice(-3)}</p>
                    </StyledContactRow>

                    <SecurityNoteP>{code_para}</SecurityNoteP>

                    {timerCounter > 0 ? (
                      <StyledReactCodeInputDisabled
                        // onChange={handleInputChange}
                        disabled
                        type="number"
                        fields={6}
                      />
                    ) : (
                      <StyledReactCodeInput
                        onChange={handleInputChange}
                        type="number"
                        fields={6}
                      />
                    )}

                    {timerCounter === 0 ? (
                      <StyledColoredPFlex1>
                        {didnt_receive_para}
                        <StyledResendOTPColoredP
                          // onClick={() => router.push("/personal-information")}
                          onClick={() => {
                            createLMSUsersFunc();
                            setTimerCounter(5);
                            setSecurityCode("")
                          }}
                        >
                          {resend_OTP}
                        </StyledResendOTPColoredP>
                      </StyledColoredPFlex1>
                    ) : (
                      <div>
                        <StyledColoredPFlex1>
                          <Image alt={""} src={Loader} height={24} width={24} />
                          {resend_possible}
                          <StyledResendOTPColoredP
                            onClick={() => setRegisterationStep(0)}
                          >
                            {timerCounter} sec
                          </StyledResendOTPColoredP>
                        </StyledColoredPFlex1>
                      </div>
                    )}
                  </Col>
                </StyledRegisterationRow>
              </StyledSigninDiv1>
            </Container>
          </MainStyledSigninDiv>
          <SignInRow dir={"rtl"}>
            <ContainerNext>
              <FlexStartDiv>
                <StyledBackCustomButton
                  customStyle={{
                    paddingInline: 30,
                    borderColor: "#105F43",
                    color: "#105F43",
                    borderRadius: 8,
                  }}
                  onClick={() => router.back()}
                >
                  {back}
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
                        onClick={() => {
                          createLMSAuthorizationFunc(
                            signInState,
                            securityCode,
                            ip
                          );
                          setTimerCounter1(8);
                        }}
                      >
                        {next}
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
                        {next} &nbsp;
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
                    {next}
                  </CustomButton>
                )}
              </FlexStartDiv>
            </ContainerNext>
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
    font-family: "GESSTwoBold", sans-serif;
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

const SignInRow = styled(Row)`
  padding-block: 20px;
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
  // font-family: "InterMedium", sans-serif !important;
  margin-bottom: 0px !important;
`;

const NoteP = styled.p`
  color: #181818 !important;
  font-size: 14px !important;
  line-height: 24px !important;
  font-weight: 400 !important;
  // font-family: "InterMedium", sans-serif !important;
  margin-block: 15px !important;
  text-decoration: underline !important;
`;

const BeforeFormP = styled.p`
  color: #8c8c8c !important;
  font-size: 12px !important;
  line-height: 24px !important;
  font-weight: 400 !important;
  // font-family: "InterMedium", sans-serif !important;
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
    // font-family: "InterMedium" !important;
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
  margin-right: 5px !important;
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
  img {
    padding-left: 7px !important;
  }
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
    // font-family: "InterNormal", sans-serif !important;
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
    font-family: "GESSTwoLight", sans-serif !important;
    margin-bottom: 0px;
    display: flex;
    align-items: center;
    margin-right: 6px;
  }
`;

const SecurityNoteP = styled.p`
  color: #181818;
  font-weight: 400;
  // font-family: "InterMedium", sans-serif;
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

const StyledReactCodeInputDisabled = styled(ReactCodeInput)`
  @media (min-width: 992px) {
    input {
      border: 1px solid #fff !important;
      // border-bottom: 1px solid #000 !important;
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
      // border-bottom: 1px solid #000 !important;
      margin-right: 7px !important;
      font-size: 18px !important;
      width: 38px !important;
      outline: none !important;
      text-align: center !important;
    }
  }
  input:active {
    border: 1px solid #fff !important;
    // border-bottom: 1px solid #000 !important;
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

const JCenter = styled.div`
  @media (max-width: 991px) {
    display: flex;
    justify-content: center;
  }
`;
