import React, { useState, useLayoutEffect, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import {
  Avatar,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Dropdown,
  Input,
  Menu,
  message,
  Modal,
  Radio,
  Row,
  Select,
  Slider,
  Space,
  Upload,
} from "antd";
import parse from 'html-react-parser';

import {
  CloseButton,
  CompleteInformation,
  Cross,
  Excel,
  GreenLoader,
  Loader,
  MobileVerification,
  Powerpoint,
  R2Favicon,
  RegisterationImg,
  RightClickCircle,
  SideDesign,
  Word,
} from "../../images";
import CustomButton from "../../src/components/rtl/Button";
import ModalComp from "../../src/components/rtl/Modal/LoaderModal";
import Preloader from "../../public/images/Preloader.gif";

import { DownOutlined, UploadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import ReactCodeInput from "react-code-input";
import router from "next/router";
import {
  courseTrainingRegisterationLovData,
  tokenAuth,
} from "../../src/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../src/components/rtl/adminLayoutHeader";
import Footer from "../../src/components/rtl/footer";
import {
  getCookies,
  removeCookies,
  setCookies,
} from "../../src/helpers/cookie";
import endpoints from "../../src/api";
import { ImAttachment, ImCross } from "react-icons/im";
import { emailValidation } from "../../src/helpers/EmailValidation";
import moment from "moment";
import { AiFillEye, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { toast } from "react-toastify";
import {
  back,
  CCEEmployeeIdError,
  click_to_upload,
  let_get_started_with_your_application_journey,
  let_get_started_with_your_application_journey_para,
  next,
  this_field_is_mandatory,
  Download,
  view,
  close,
} from "../../src/helpers/LanguageConstant";
import { firefoxNumberFunc } from "../../src/helpers/firefoxNumberFunc";

const { Option } = Select;

const RegisterationStep = () => {
  const dispatch = useDispatch();

  const courseId = getCookies("courseId");
  const [collapsed, setCollapsed] = useState(false);
  const [selectItem, setSelectItem] = useState("instructor");
  const token = getCookies("token");

  const authToken = getCookies("token");
  const userStatus = getCookies("userStatus");
  const [isAuthorized, setAuthorized] = useState(false);
  useLayoutEffect(() => {
    if (authToken === undefined) {
      router.push("sign-in");
    } else if (userStatus === undefined || userStatus === "false") {
      router.push("/");
    } else if (authToken || userStatus === "true") {
      setAuthorized(true);
    }
  }, []);

  const registerationReducerState = useSelector(
    (state) => state?.courseTrainingLovDataReducer
  );

  useLayoutEffect(() => {
    // if (!token || courseId === undefined) {
    //   router.push("/");
    // }
  }, []);

  const [stepLoadingState, setStepLoadingState] = useState(false);
  const [nextLoadingState, setNextLoadingState] = useState(false);
  const [nextLoadingState1, setNextLoadingState1] = useState(false);
  const [employeeId, setEmployeeId] = useState();
  const [mandatoryFieldState, setMandatoryFieldState] = useState(false);
  const [mandatoryRadioFieldState, setMandatoryRadioFieldState] =
    useState(false);

  const [employeeIdState, setEmployeeIdState] = useState("200");

  const [emailValidationState, setEmailValidationState] = useState("");

  const [fileUploadState, setFileUploadState] = useState({});

  const [registerCourseTrainingState, setRegisterCourseTrainingState] =
    useState({});

  const [registerCourseTrainingEditState, setRegisterCourseTrainingEditState] =
    useState([]);

  const [editIndexState, setEditIndexState] = useState({});

  const [fileState, setFileState] = useState({});

  const [registerationFormStepState, setRegisterationFormStepState] = useState(
    {}
  );

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [getResgisterCoursePopulateState, setGetResgisterCoursePopulateState] =
    useState(false);

  const [getCourseDetailId, setGetCourseDetailId] = useState([]);
  const [getCourseDetailIdData, setGetCourseDetailIdData] = useState([]);

  const [presistState, setPresistState] = useState();
  const [ccEmployeeIndex, setCcEmployeeIndex] = useState();
  const [ccEmployeeValue, setCcEmployeeValue] = useState();

  const [startDateState, setStartDateState] = useState("");
  const [endDateEnable, setEndDateEnable] = useState(true);

  const [createLoading, setCreateLoading] = useState(false);

  const [objectArrConvertState, setObjectArrConvertState] = useState([]);
  const [registerationFeildStep, setRegisterationFeildStep] = useState([]);
  const [registerationDashboardStep, setRegisterationDashboardStep] = useState(
    []
  );

  const [dashboardState, setDashboardState] = useState(true);

  const getActiveDirectoryEmployeeIDFunc = async (id, token) => {
    setLoading(true);
    try {
      if (id) {
        const response = await endpoints.getActiveDirectoryEmployeeID(
          token,
          id
        );
        if (response) {
          setEmployeeIdState(response?.data?.statusCode);
          setLoading(false);
        }
      }
    } catch (err) {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    getActiveDirectoryEmployeeIDFunc(employeeId, token);
  }, [token, employeeId]);

  useLayoutEffect(() => {
    setCcEmployeeValue(
      getCourseDetailId[step]?.lovServicesInstructorCheckListViewModels[
        ccEmployeeIndex + 1
      ]?.value_EN
    );

    setCcEmployeeValue(presistState);

    const presistVariable =
    getCourseDetailId&&getCourseDetailId[step]?.lovServicesInstructorCheckListViewModels[ccEmployeeIndex]
        ?.value_EN;

    setPresistState(presistVariable);
  }, [presistState, getCourseDetailId, ccEmployeeValue]);

  const props = {};

  const [sideMenuPercentState, setSideMenuPercentState] = useState([]);

  const userDataReducer = useSelector((state) => state?.userDataReducer);
  // console.log(
  //   "userDataReducer",
  //   `${userDataReducer?.firstName_AR}`,
  //   `${userDataReducer?.email}`,
  //   `${userDataReducer?.phoneNumber}`
  // );

  const getCourseDetailRecordFunc = async (token) => {
    setStepLoadingState(true);
    try {
      if (token) {
        const response = await endpoints.getInstructorTrainingRegistrationLov1(
          token,
          "Arabic"
        );

        if (response) {
          const data =
            response?.data?.data
              ?.lovServicesInstructorCategoryCheckListViewModels[step]
              ?.lovServicesInstructorCheckListViewModels;
 
              const Language = response?.data.data?.language
              if(Language && Language === "English"){
                router.push("/instructor-registeration-step")
              }
  
          // ApplicantPhoneDirect
          const specificIndex = data?.findIndex(
            (item) => item?.fieldType === "ApplicantPhoneDirect"
          );
          if (specificIndex >= 0) {
            let obj = data[specificIndex];
            obj.value_EN = phoneNumber?phoneNumber:obj.value_EN;
            data[specificIndex] = obj;
          }
          // ApplicantPhoneDirect
          // console.log("specificIndex", specificIndex);
          // ApplicantNameEnglish;
          const specificIndex1 = data?.findIndex(
            (item) => item?.fieldType === "ApplicantNameEnglish"
          );
          if (specificIndex1 >= 0) {
            let obj1 = data[specificIndex1];
            obj1.value_EN = firstName?firstName:obj1.value_EN;
            data[specificIndex1] = obj1;
          }
          // ApplicantNameEnglish

          // ApplicantNameEnglish
          const specificIndex2 = data?.findIndex(
            (item) => item?.fieldType === "ApplicantEmail"
          );
          if (specificIndex2 >= 0) {
            let obj2 = data[specificIndex2];
            obj2.value_EN = email?email:obj2.value_EN;
            data[specificIndex2] = obj2;
          }
          // ApplicantNameEnglish
          setRegisterCourseTrainingEditState(
            data
            // response?.data?.data
            //   ?.lovServicesCourseTrainingCategoryCheckListViewModels[step]
            //   ?.lovServicesInstructorCheckListViewModels
          );

          setRegisterCourseTrainingState(
            response?.data?.data
              ?.lovServicesInstructorCategoryCheckListViewModels[step]
              ?.lovServicesInstructorCheckListViewModels
          );

          setGetCourseDetailId(
            response?.data?.data
              ?.lovServicesInstructorCategoryCheckListViewModels
          );

          setGetCourseDetailIdData(
            response?.data?.data
              ?.lovServicesInstructorCategoryCheckListViewModels
          );
          setSideMenuPercentState(
            response?.data?.data
              ?.lovServicesInstructorCategoryPercentageViewModels
          );
          setRegisterationDashboardStep(
            response?.data?.data
              ?.lovServicesInstructorCategoryPercentageViewModels
          );
          dispatch(
            courseTrainingRegisterationLovData(
              response?.data?.data
                ?.lovServicesInstructorCategoryCheckListViewModels
            )
          );
          setStepLoadingState(false);
        }
      }
    } catch (err) {
      setStepLoadingState(false);
    }
  };

  const checkListCategoryId = getCourseDetailId[step]?.checkListCategoryId;

  const [trackingIdState, setTrackingIdState] = useState("");

  const editCourseTrainingRegistrationFunc = async (token, data) => {
    setNextLoadingState(true);
    let objectArr;

    let arr = [];

    try {
      if (
        (token || checkListCategoryId || registerCourseTrainingEditState, arr)
      ) {
        const obj = {
          language: "Arabic",
          checkListCategoryId: checkListCategoryId,
          instructorRegistrationCheckListCustomFieldViewModels:
            registerCourseTrainingEditState,
        };

        const response = await endpoints.createInstructorTrainingRegistration(
          token,
          obj
        );
        if (response) {
          setTrackingIdState(response?.data?.message);
          setCookies("trackingInsId", response?.data?.message);
          if (step < getCourseDetailId?.length - 1) {
            setStep(step + 1);
          }
          setNextLoadingState(false);
        }
      }
      setFileUploadState("");
    } catch (err) {
      setNextLoadingState(false);
    }
  };

  const registerationFormStepStateObjKeys = Object?.keys(
    registerationFormStepState
  );

  useLayoutEffect(() => {}, [registerationFeildStep]);

  useLayoutEffect(() => {
    getCourseDetailRecordFunc(token);
    // return removeCookies("courseId");
  }, [step]);

  // useLayoutEffect(() => {
  //   getCourseDetailRecordFunc(token);
  //   // return removeCookies("courseId");
  // }, [step, userDataReducer]);

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

  const dateFormat = "YYYY/MM/DD";

  const onFilterChange = (id) => {
    const index = registerationFeildStep?.indexOf(id);
    let fake = [];
    if (index !== -1) {
      fake = registerationFeildStep.filter((item) => item !== id);
      setRegisterationFeildStep(fake);
    } else {
      fake = [...registerationFeildStep, id];
      setRegisterationFeildStep(fake);
    }
    // updaetFunc(fake);
  };

  const countArr = getCourseDetailId[
    step
  ]?.lovServicesInstructorCheckListViewModels?.reduce((accumulator, obj) => {
    if (obj.value_EN !== "" || obj.value_EN !== null) {
      return accumulator + 1;
    }

    return accumulator;
  }, 0);

  const countArrRequired = getCourseDetailId[
    step
  ]?.lovServicesInstructorCheckListViewModels?.reduce((accumulator, obj) => {
    if (obj.required !== false) {
      return accumulator + 1;
    }

    return accumulator;
  }, 0);

  const countArrRequiredFilled =
    registerCourseTrainingEditState &&
    registerCourseTrainingEditState?.reduce((accumulator, obj) => {
      if (
        obj.required !== false &&
        (obj.value_EN !== null ? obj.value_EN : obj.value_EN) !== null &&
        (obj.value_EN !== "" ? obj.value_EN : obj.value_EN) !== ""
      ) {
        return accumulator + 1;
      }

      return accumulator;
    }, 0);

  const countArrRequiredPercentageFilled = registerationDashboardStep?.reduce(
    (accumulator, obj) => {
      if (obj.percentage === 100) {
        return accumulator + 1;
      }

      return accumulator;
    },
    0
  );

  const inputHandler = (e, i, t) => {
    const Arr = [...registerCourseTrainingEditState];
    let obj = Arr[i];
    obj.value_EN = t === "input" ? e.target.value : e;
    Arr[i] = obj;
    setRegisterCourseTrainingEditState([...Arr]);
  };

  // const getCourseProgressRecordFunc = async (token) => {
  //   setLoading(true);
  //   try {
  //     if (token) {
  //       const response = await endpoints.getInstructorTrainingRegistrationLov1(
  //         token
  //       );
  //       if (response) {
  //         console.log("response", response);
  //         setRegisterationDashboardStep(
  //           response?.data?.data
  //             ?.lovServicesInstructorCategoryPercentageViewModels
  //         );
  //         setLoading(false);
  //       }
  //     }
  //   } catch (err) {
  //     setLoading(false);
  //   }
  // };

  // useLayoutEffect(() => {
  //   getCourseProgressRecordFunc(token);
  // }, []);

  useLayoutEffect(() => {
    // let fake = registerCourseTrainingEditState;
    // console.log("fake", fake);
    // if (fake.length > 0) {
    //   console.log("chl gya");
    //   const specificIndex =
    //     fake &&
    //     fake?.findIndex((item) => item?.fieldType === "ApplicantPhoneDirect");
    //   console.log("specificIndex", specificIndex);
    //   inputHandler("ApplicantPhoneDirect", specificIndex, "phone_number");
    // }
    // const Arr = [...registerCourseTrainingEditState];
    // let obj = Arr[specificIndex];
    // obj?.value_EN = "1234";
    // console.log("objPakra", obj);
    // obj.fieldType === "ApplicantPhoneDirect";
    // Arr[registerCourseTrainingEditState?.indexOf(specificIndex)] = obj;
    // setRegisterCourseTrainingEditState([...Arr]);
  }, []);

  const [dropdownCaretState, setDropdownCaretState] = useState(false);

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current.isBefore(moment(), "day");
  };

  const disabledTrainingEndDate = (current) => {
    // Can not select days before today and today
    return current.isSameOrBefore(moment(startDateState), "day");
  };

  return (
    <StyledDiv>
    {isAuthorized ? (
    <div className="container">
      <Head>
        <title>Riyadh Second Health Cluster</title>
        <link rel="icon" href={R2Favicon} />
      </Head>
      <body>
        {/* {stepLoadingState ? <></> : <></>} */}

        <ModalComp
          openModal={nextLoadingState}
          // setOpenModal={setOpenModal}
          // registerationStep={registerationStep}
          // setRegisterationStep={setRegisterationStep}
          // signInState={signInState}
          // createLMSUsersFunc={createLMSUsersFunc}
          // invalidNumberState={invalidNumberState}
        />
        {nextLoadingState1&&
        <ModalComp
          openModal={nextLoadingState1}
          // setOpenModal={setOpenModal}
          // registerationStep={registerationStep}
          // setRegisterationStep={setRegisterationStep}
          // signInState={signInState}
          // createLMSUsersFunc={createLMSUsersFunc}
          // invalidNumberState={invalidNumberState}
        />
        }

        {/* <Header
          dropdownCaretState={dropdownCaretState}
          setDropdownCaretState={setDropdownCaretState}
        /> */}
        <div onClick={() => setDropdownCaretState(false)}>
          <Header
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            selectItem={selectItem}
            setSelectItem={setSelectItem}
            name={""}
          >
            {/* <SideDesignDiv>
              <img loading="lazy"alt={""} height={500} width={500} src={SideDesign} />
            </SideDesignDiv> */}
            {dashboardState ? (
              <MainStyledSigninDiv1>
                <Container>
                  <StyledSigninDiv1>
                    <Row gutter={[32, 32]}>
                      <ContentCol span={24}>
                        <h1>{let_get_started_with_your_application_journey}</h1>
                        <p>
                          {let_get_started_with_your_application_journey_para}
                        </p>

                        <Row gutter={[16, 16]}>
                          {registerationDashboardStep?.map((item, index) => (
                            <Col
                              key={index}
                              xl={12}
                              lg={12}
                              md={24}
                              sm={24}
                              xs={24}
                            >
                              {item?.percentage === 0 &&
                              index != 0 &&
                              registerationDashboardStep[index - 1]
                                ?.percentage != 100 ? (
                                <DashboardCardDisabledDiv>
                                  <TitleRowDisabled>
                                    <h2>{item?.name_AR}</h2>
                                    <LinkDivDisabled
                                      onClick={() => setStep(index)}
                                    >
                                      <AiOutlineLeft />
                                    </LinkDivDisabled>
                                  </TitleRowDisabled>

                                  <DescriptionRow>
                                    <p>{item?.description}</p>
                                  </DescriptionRow>

                                  <StyledSliderDiv>
                                    <StyledSlider
                                      tooltipVisible={false}
                                      defaultValue={item?.percentage}
                                      disabled={true}
                                    />
                                    <ProgressLinkDivDisabled>
                                      <p>{item?.percentage}%</p>
                                    </ProgressLinkDivDisabled>
                                  </StyledSliderDiv>
                                </DashboardCardDisabledDiv>
                              ) : (
                                <DashboardCardDiv>
                                  <TitleRow>
                                    <h2>{item?.name_AR}</h2>
                                    <LinkDiv
                                      onClick={() => {
                                        setStep(index);
                                        setDashboardState(false);
                                      }}
                                    >
                                      <AiOutlineLeft />
                                    </LinkDiv>
                                  </TitleRow>

                                  <DescriptionRow>
                                    <p>{item?.description}</p>
                                  </DescriptionRow>

                                  <StyledSliderDiv>
                                    <StyledSlider
                                      tooltipVisible={false}
                                      defaultValue={item?.percentage}
                                      disabled={true}
                                    />
                                    <ProgressLinkDiv>
                                      <p>{item?.percentage}%</p>
                                    </ProgressLinkDiv>
                                  </StyledSliderDiv>
                                </DashboardCardDiv>
                              )}
                            </Col>
                          ))}
                        </Row>
                      </ContentCol>
                    </Row>
                  </StyledSigninDiv1>
                </Container>
              </MainStyledSigninDiv1>
            ) : (
              <>
                <MainStyledSigninDiv>
                  <StyledSigninDiv>
                    <StyledRegisterationRow>
                      <Col xl={6} lg={6} md={6} sm={0} xs={0}>
                        <StyledSidebarDiv>
                          <TimelineDiv>
                            <TimelineContentDiv>
                              {sideMenuPercentState?.map((item, index) => (
                                <div key={index}>
                                  {item?.percentage === 100 ? (
                                    <p
                                      style={{
                                        borderRight: "3px solid #A87E33",
                                        paddingRight: 15,
                                        lineHeight: "35px",
                                        marginBottom: 0,
                                        fontWeight: 700,
                                      }}
                                    >
                                      {item?.name_AR}
                                    </p>
                                  ) : (
                                    <p
                                      style={{
                                        borderRight: "3px solid #E7E7E7",
                                        paddingRight: 15,
                                        lineHeight: "35px",
                                        marginBottom: 0,
                                      }}
                                    >
                                      {item?.name_AR}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </TimelineContentDiv>
                          </TimelineDiv>
                          {trackingIdState === "" ? (
                            <></>
                          ) : (
                            <StyledTrackingDiv>
                              <p>رقم الطلب الخاص بك</p>
                              <p>
                                <b>{trackingIdState}</b>
                              </p>
                            </StyledTrackingDiv>
                          )}
                        </StyledSidebarDiv>
                      </Col>
                      <StyledSignInImgCol
                        xl={12}
                        lg={12}
                        md={12}
                        sm={24}
                        xs={24}
                      >
                        {getCourseDetailId?.map((item, mainIndex) => (
                          <div key={mainIndex}>
                            {step === mainIndex && (
                              <>
                                <FlexDiv>
                                  <img loading="lazy"alt={""}
                                    height={30}
                                    width={30}
                                    src={CompleteInformation}
                                  />
                                  <p>{item?.name_AR}</p>
                                </FlexDiv>
                                <StyledTitiliumHead>
                                  {item?.description_AR}
                                </StyledTitiliumHead>

                                <Row gutter={[16, 16]}>
                                  {item?.lovServicesInstructorCheckListViewModels?.map(
                                    (item, innerIndex) => (
                                      <Col key={innerIndex} span={24}>
                                        {item?.fieldSubType === "file" && (
                                          <>
                                            {item?.required === true ? (
                                              <StyledFlexLabelDiv>
                                                <RequiredP>*</RequiredP>
                                                <StyledLabelP>
                                                  {item?.name_AR}
                                                </StyledLabelP>
                                              </StyledFlexLabelDiv>
                                            ) : (
                                              <StyledLabelP>
                                                {item?.name_AR}
                                              </StyledLabelP>
                                            )}
                                            {registerCourseTrainingState[
                                              innerIndex
                                            ]?.value_EN === null ||
                                            registerCourseTrainingState[
                                              innerIndex
                                            ]?.value_EN === "" ? (
                                              <>
                                                <StyledUpload
                                                  maxCount={1}
                                                  onClick={() =>
                                                    {setMandatoryFieldState(true);
                                                      setEditIndexState(
                                                              innerIndex
                                                            );
                                                   }
                                                  }
                                                  {...{
                                                    name: "file",
                                                    action:
                                                      "https://www.google.com/",
                                                    headers: {
                                                      authorization:
                                                        "authorization-text",
                                                    },
                                                    async onChange(info) {
                                                      if (
                                                        info.file.status !==
                                                        "uploading"
                                                      ) {
                                                        if (
                                                          info?.file?.size <
                                                          5000000
                                                        ) {
                                                          if (
                                                            info?.file?.type ===
                                                              "image/jpeg" ||
                                                            info?.file?.type ===
                                                              "image/png" ||
                                                            info?.file?.type ===
                                                              "application/pdf" ||
                                                            info?.file?.type ===
                                                              "image/svg+xml"
                                                          ) {
                                                            setFileState(
                                                              info.file
                                                            );

                                                            const getBase64 = (
                                                              file
                                                            ) =>
                                                              new Promise(
                                                                (
                                                                  resolve,
                                                                  reject
                                                                ) => {
                                                                  const reader =
                                                                    new FileReader();
                                                                  reader.readAsDataURL(
                                                                    file
                                                                  );
                                                                  reader.onload =
                                                                    () =>
                                                                      resolve(
                                                                        reader.result
                                                                      );
                                                                  reader.onerror =
                                                                    (error) =>
                                                                      reject(
                                                                        error
                                                                      );
                                                                }
                                                              );

                                                            const blob =
                                                              await getBase64(
                                                                info.file
                                                                  .originFileObj
                                                              );
                                                            inputHandler(
                                                              blob,
                                                              innerIndex,
                                                              "image"
                                                            );
                                                          } else {
                                                            toast.error(
                                                              "File type should be in JPG, PNG, PDF type"
                                                            );
                                                          }
                                                        } else {
                                                          toast.error(
                                                            "File size must be less than 5MB"
                                                          );
                                                        }
                                                      }
                                                      if (
                                                        info.file.status ===
                                                        "done"
                                                      ) {
                                                        setEditIndexState(
                                                          121098021098
                                                        );
                                                      } else if (
                                                        info.file.status ===
                                                        "error"
                                                      ) {
                                                        setEditIndexState(
                                                          121098021098
                                                        );
                                                      }
                                                    },
                                                  }}
                                                >
                                                  <Button
                                                    icon={<ImAttachment />}
                                                  >
                                                    {click_to_upload}
                                                  </Button>
                                                </StyledUpload>
                                                {item?.required === true &&
                                                  registerCourseTrainingEditState[
                                                    innerIndex
                                                  ]?.value_EN === "" &&
                                                  mandatoryFieldState ===
                                                    true&& editIndexState===innerIndex && (
                                                    <StyledErrorP
                                                      style={{
                                                        color: "#fa4947",
                                                      }}
                                                    >
                                                      {this_field_is_mandatory}
                                                    </StyledErrorP>
                                                  )}
                                              </>
                                            ) : (
                                              <>
                                                {item?.value_EN?.slice(-4) ===
                                                ".pdf" ? (
                                                  <StyledImgDivPdf>
                                                    <img
                                                      src={
                                                        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
                                                      }
                                                      height={50}
                                                      width={50}
                                                    />
                                                    <CrossDiv1 title={view}>
                                                      <StyledAiFillEye
                                                     title={view}
                                                        onClick={() =>
                                                          window.open(
                                                            item?.value_EN !==
                                                              ""
                                                              ? item?.value_EN
                                                              : item?.value_EN,
                                                            "blank"
                                                          )
                                                        }
                                                      />
                                                      <StyledImCross
                                                    title={close}
                                                        onClick={() =>
                                                          inputHandler(
                                                            "",
                                                            innerIndex,
                                                            "image"
                                                          )
                                                        }
                                                      />
                                                    </CrossDiv1>
                                                  </StyledImgDivPdf>
                                                ) : (item?.value_EN !== ""
                                                    ? item?.value_EN
                                                    : item?.value_EN
                                                  )?.slice(-4) === "jpeg" ? (
                                                  <StyledImgDiv>
                                                    <img
                                                      src={
                                                        item?.value_EN !== ""
                                                          ? item?.value_EN
                                                          : item?.value_EN
                                                      }
                                                      height={50}
                                                      width={50}
                                                    />
                                                    <CrossDiv1 title={view}>
                                                      <StyledAiFillEye
                                                     title={view}
                                                        onClick={() =>
                                                          window.open(
                                                            item?.value_EN !==
                                                              ""
                                                              ? item?.value_EN
                                                              : item?.value_EN,
                                                            "blank"
                                                          )
                                                        }
                                                      />
                                                      <StyledImCross
                                                    title={close}
                                                        onClick={() =>
                                                          inputHandler(
                                                            "",
                                                            innerIndex,
                                                            "image"
                                                          )
                                                        }
                                                      />
                                                    </CrossDiv1>
                                                  </StyledImgDiv>
                                                ) : item?.value_EN?.slice(
                                                    -4
                                                  ) === "word" ? (
                                                  <StyledImgDivWord>
                                                    <img
                                                      src={Word}
                                                      height={50}
                                                      width={50}
                                                    />
                                                    <CrossDiv1 title={view}>
                                                      <StyledAiFillEye
                                                     title={view}
                                                        onClick={() =>
                                                          window.open(
                                                            item?.value_EN,
                                                            "blank"
                                                          )
                                                        }
                                                      />
                                                      <StyledImCross
                                                    title={close}
                                                        onClick={() =>
                                                          inputHandler(
                                                            "",
                                                            innerIndex,
                                                            "image"
                                                          )
                                                        }
                                                      />
                                                    </CrossDiv1>
                                                  </StyledImgDivWord>
                                                ) : item?.value_EN?.slice(
                                                    -4
                                                  ) === "xcel" ? (
                                                  <StyledImgDivWord>
                                                    <img
                                                      src={Excel}
                                                      height={50}
                                                      width={50}
                                                    />
                                                    <CrossDiv1 title={view}>
                                                      <StyledAiFillEye
                                                     title={view}
                                                        onClick={() =>
                                                          window.open(
                                                            item?.value_EN,
                                                            "blank"
                                                          )
                                                        }
                                                      />
                                                      <StyledImCross
                                                    title={close}
                                                        onClick={() =>
                                                          inputHandler(
                                                            "",
                                                            innerIndex,
                                                            "image"
                                                          )
                                                        }
                                                      />
                                                    </CrossDiv1>
                                                  </StyledImgDivWord>
                                                ) : item?.value_EN?.slice(
                                                    -12
                                                  ) === "presentation" ? (
                                                  <StyledImgDivWord>
                                                    <img
                                                      src={Powerpoint}
                                                      height={50}
                                                      width={50}
                                                    />
                                                    <CrossDiv1 title={view}>
                                                      <StyledAiFillEye
                                                     title={view}
                                                        onClick={() =>
                                                          window.open(
                                                            item?.value_EN,
                                                            "blank"
                                                          )
                                                        }
                                                      />
                                                      <StyledImCross
                                                    title={close}
                                                        onClick={() =>
                                                          inputHandler(
                                                            "",
                                                            innerIndex,
                                                            "image"
                                                          )
                                                        }
                                                      />
                                                    </CrossDiv1>
                                                  </StyledImgDivWord>
                                                ) : item?.value_EN?.slice(
                                                    17,
                                                    20
                                                  ) === "pdf" ? (
                                                  <StyledImgDivPdf>
                                                    <img
                                                      src={
                                                        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
                                                      }
                                                      height={50}
                                                      width={50}
                                                    />
                                                    <CrossDiv1 title={view}>
                                                      <StyledAiFillEye
                                                     title={view}
                                                        onClick={() =>
                                                          window.open(
                                                            item?.value_EN !==
                                                              ""
                                                              ? item?.value_EN
                                                              : item?.value_EN,
                                                            "blank"
                                                          )
                                                        }
                                                      />
                                                      <StyledImCross
                                                    title={close}
                                                        onClick={() =>
                                                          inputHandler(
                                                            "",
                                                            innerIndex,
                                                            "image"
                                                          )
                                                        }
                                                      />
                                                    </CrossDiv1>
                                                  </StyledImgDivPdf>
                                                ) : item?.value_EN?.slice(
                                                    19,
                                                    23
                                                  ) === "word" ? (
                                                  <StyledImgDivPdf>
                                                    <img
                                                      src={Word}
                                                      height={50}
                                                      width={50}
                                                    />
                                                    <CrossDiv1 title={view}>
                                                      <StyledAiFillEye
                                                     title={view}
                                                        onClick={() =>
                                                          window.open(
                                                            item?.value_EN,
                                                            "blank"
                                                          )
                                                        }
                                                      />
                                                      <StyledImCross
                                                    title={close}
                                                        onClick={() =>
                                                          inputHandler(
                                                            "",
                                                            innerIndex,
                                                            "image"
                                                          )
                                                        }
                                                      />
                                                    </CrossDiv1>
                                                  </StyledImgDivPdf>
                                                ) : item?.value_EN?.slice(
                                                    66,
                                                    78
                                                  ) === "presentation" ? (
                                                  <StyledImgDivPdf>
                                                    <img
                                                      src={Powerpoint}
                                                      height={50}
                                                      width={50}
                                                    />
                                                    <CrossDiv1 title={view}>
                                                      <StyledAiFillEye
                                                     title={view}
                                                        onClick={() =>
                                                          window.open(
                                                            item?.value_EN,
                                                            "blank"
                                                          )
                                                        }
                                                      />
                                                      <StyledImCross
                                                    title={close}
                                                        onClick={() =>
                                                          inputHandler(
                                                            "",
                                                            innerIndex,
                                                            "image"
                                                          )
                                                        }
                                                      />
                                                    </CrossDiv1>
                                                  </StyledImgDivPdf>
                                                ) : item?.value_EN?.slice(
                                                    24,
                                                    29
                                                  ) === "excel" ? (
                                                  <StyledImgDivPdf>
                                                    <img
                                                      src={Excel}
                                                      height={50}
                                                      width={50}
                                                    />
                                                    <CrossDiv1 title={view}>
                                                      <StyledAiFillEye
                                                     title={view}
                                                        onClick={() =>
                                                          window.open(
                                                            item?.value_EN,
                                                            "blank"
                                                          )
                                                        }
                                                      />
                                                      <StyledImCross
                                                    title={close}
                                                        onClick={() =>
                                                          inputHandler(
                                                            "",
                                                            innerIndex,
                                                            "image"
                                                          )
                                                        }
                                                      />
                                                    </CrossDiv1>
                                                  </StyledImgDivPdf>
                                                ) : (
                                                  <StyledImgDiv>
                                                    <img
                                                      src={
                                                        item?.value_EN !== ""
                                                          ? item?.value_EN
                                                          : item?.value_EN
                                                      }
                                                      height={50}
                                                      width={50}
                                                    />
                                                    <CrossDiv1 title={view}>
                                                      {(item?.value_EN !== ""
                                                        ? item?.value_EN
                                                        : item?.value_EN
                                                      )?.slice(0, 4) !==
                                                        "data" && (
                                                        <StyledAiFillEye
                                                     title={view}
                                                          onClick={() => {
                                                            window.open(
                                                              item?.value_EN !==
                                                                ""
                                                                ? item?.value_EN
                                                                : item?.value_EN,
                                                              "blank"
                                                            );
                                                          }}
                                                        />
                                                      )}
                                                      <StyledImCross
                                                    title={close}
                                                        onClick={() =>
                                                          inputHandler(
                                                            "",
                                                            innerIndex,
                                                            "image"
                                                          )
                                                        }
                                                      />
                                                    </CrossDiv1>
                                                  </StyledImgDiv>
                                                )}
                                              </>
                                            )}
                                          </>
                                        )}

                                        {item?.fieldType === "Text" && (
                                          <>
                                            {item?.required === true ? (
                                              <StyledFlexLabelDiv>
                                                <RequiredP>*</RequiredP>
                                                <StyledLabelP>
                                                  {item?.name_AR}
                                                </StyledLabelP>
                                              </StyledFlexLabelDiv>
                                            ) : (
                                              <StyledLabelP>
                                                {item?.name_AR}
                                              </StyledLabelP>
                                            )}
                                            <StyledInput
                                              type="text"
                                              placeholder={item?.value_EN}
                                              onClick={() =>
                                                setMandatoryFieldState(true)
                                              }
                                              maxLength={500}
                                              name={item?.checkListDetailId}
                                              autoComplete={"off"}
                                              onChange={(e) =>
                                                inputHandler(
                                                  e,
                                                  innerIndex,
                                                  "input"
                                                )
                                              }
                                              value={
                                                registerCourseTrainingEditState[
                                                  innerIndex
                                                ]?.value_EN
                                              }
                                            />
                                            {item?.required === true &&
                                              registerCourseTrainingEditState[
                                                innerIndex
                                              ]?.value_EN === "" &&
                                              mandatoryFieldState === true && (
                                                <StyledErrorP
                                                  style={{ color: "#fa4947" }}
                                                >
                                                  {this_field_is_mandatory}
                                                </StyledErrorP>
                                              )}
                                          </>
                                        )}
                                        {item?.fieldSubType === "download" && (
                                          <>
                                            {item?.required === true ? (
                                              <StyledFlexLabelDiv>
                                                <RequiredP>*</RequiredP>
                                                <StyledLabelP>
                                                  {item?.name_AR}
                                                </StyledLabelP>
                                              </StyledFlexLabelDiv>
                                            ) : (
                                              <StyledLabelP>
                                                {item?.name_AR}
                                              </StyledLabelP>
                                            )}
                                            <CustomButton
                                              className={"download_btn"}
                                              onClick={() =>
                                                window.open(
                                                  item?.value_EN,
                                                  "blank"
                                                )
                                              }
                                            >
                                              {Download}
                                            </CustomButton>
                                            {/* <StyledInput
                                              type="text"
                                              placeholder={item?.value_EN}
                                              onClick={() =>
                                                setMandatoryFieldState(true)
                                              }
                                              name={item?.checkListDetailId}
                                              autoComplete={"off"}
                                              onChange={(e) =>
                                                inputHandler(
                                                  e,
                                                  innerIndex,
                                                  "input"
                                                )
                                              }
                                              value={
                                                registerCourseTrainingEditState[
                                                  innerIndex
                                                ]?.value_EN
                                              }
                                            /> */}
                                            {item?.required === true &&
                                              registerCourseTrainingEditState[
                                                innerIndex
                                              ]?.value_EN === "" &&
                                              mandatoryFieldState === true && (
                                                <StyledErrorP
                                                  style={{ color: "#fa4947" }}
                                                >
                                                  {this_field_is_mandatory}
                                                </StyledErrorP>
                                              )}
                                          </>
                                        )}

                                        {item?.fieldSubType === "String" && (
                                          <>
                                            {item?.required === true ? (
                                              <StyledFlexLabelDiv>
                                                <RequiredP>*</RequiredP>
                                                <StyledLabelP>
                                                  {item?.name_AR}
                                                </StyledLabelP>
                                              </StyledFlexLabelDiv>
                                            ) : (
                                              <StyledLabelP>
                                                {item?.name_AR}
                                              </StyledLabelP>
                                            )}
                                            <StyledInput
                                              type="text"
                                              placeholder={item?.value_EN}
                                              onClick={() =>
                                                setMandatoryFieldState(true)
                                              }
                                              name={item?.checkListDetailId}
                                              autoComplete={"off"}
                                              onChange={(e) =>
                                                inputHandler(
                                                  e,
                                                  innerIndex,
                                                  "input"
                                                )
                                              }
                                              value={
                                                registerCourseTrainingEditState[
                                                  innerIndex
                                                ]?.value_EN
                                              }
                                            />
                                            {item?.required === true &&
                                              registerCourseTrainingEditState[
                                                innerIndex
                                              ]?.value_EN === "" &&
                                              mandatoryFieldState === true && (
                                                <StyledErrorP
                                                  style={{ color: "#fa4947" }}
                                                >
                                                  {this_field_is_mandatory}
                                                </StyledErrorP>
                                              )}
                                          </>
                                        )}
                                        {item?.fieldSubType === "Email" && (
                                          <>
                                            {emailValidationState ===
                                            "Invalid Email" ? (
                                              <>
                                                {item?.required === true ? (
                                                  <StyledFlexLabelDiv>
                                                    <RequiredP>*</RequiredP>
                                                    <StyledLabelP>
                                                      {item?.name_AR}
                                                    </StyledLabelP>
                                                  </StyledFlexLabelDiv>
                                                ) : (
                                                  <StyledLabelP>
                                                    {item?.name_AR}
                                                  </StyledLabelP>
                                                )}
                                                <StyledInput
                                                  type="text"
                                                  placeholder={item?.value_EN}
                                                  autoComplete={"off"}
                                                  onClick={() =>
                                                    setMandatoryFieldState(true)
                                                  }
                                                  onChange={(e) => {
                                                    inputHandler(
                                                      e,
                                                      innerIndex,
                                                      "input"
                                                    );
                                                    setEmailValidationState(
                                                      emailValidation(
                                                        e.target.value
                                                      )
                                                    );
                                                  }}
                                                  value={
                                                    registerCourseTrainingEditState[
                                                      innerIndex
                                                    ]?.value_EN
                                                  }
                                                />
                                                <StyledErrorP>
                                                  Invalid Email
                                                </StyledErrorP>
                                              </>
                                            ) : (
                                              <>
                                                {item?.required === true ? (
                                                  <StyledFlexLabelDiv>
                                                    <RequiredP>*</RequiredP>
                                                    <StyledLabelP>
                                                      {item?.name_AR}
                                                    </StyledLabelP>
                                                  </StyledFlexLabelDiv>
                                                ) : (
                                                  <StyledLabelP>
                                                    {item?.name_AR}
                                                  </StyledLabelP>
                                                )}
                                                <StyledInput
                                                  type="text"
                                                  placeholder={item?.value_EN}
                                                  autoComplete={"off"}
                                                  onClick={() =>
                                                    setMandatoryFieldState(true)
                                                  }
                                                  onChange={(e) => {
                                                    inputHandler(
                                                      e,
                                                      innerIndex,
                                                      "input"
                                                    );
                                                    setEmailValidationState(
                                                      emailValidation(
                                                        e.target.value
                                                      )
                                                    );
                                                  }}
                                                  value={
                                                    registerCourseTrainingEditState[
                                                      innerIndex
                                                    ]?.value_EN
                                                  }
                                                />
                                                {item?.required === true &&
                                                  registerCourseTrainingEditState[
                                                    innerIndex
                                                  ]?.value_EN === "" &&
                                                  mandatoryFieldState ===
                                                    true && (
                                                    <StyledErrorP
                                                      style={{
                                                        color: "#fa4947",
                                                      }}
                                                    >
                                                      {this_field_is_mandatory}
                                                    </StyledErrorP>
                                                  )}
                                              </>
                                            )}
                                          </>
                                        )}
                                                  {item?.fieldSubType === "number" &&
                                        item?.fieldType !== "Number" &&
                                        item?.fieldType !== "IqamaNumber"&&
                                        item?.fieldType !== "GPA" && (
                                          <>
                                            {item?.required === true ? (
                                              <StyledFlexLabelDiv>
                                                <RequiredP>*</RequiredP>
                                                <StyledLabelP>
                                                  {item?.name_AR}
                                                </StyledLabelP>
                                              </StyledFlexLabelDiv>
                                            ) : (
                                              <StyledLabelP>
                                                {item?.name_AR}
                                              </StyledLabelP>
                                            )}
                                            <>
                                              <StyledInput
                                                type="number"
                                                placeholder={item?.value_EN}
                                                autoComplete={"off"}
                                                min={1}
                                              // onPaste={(e)=>e.preventDefault()}
                                              onClick={() =>
                                                  setMandatoryFieldState(true)
                                                }
                                                onKeyDown={(e) =>
                                                  [
                                                    "e",
                                                    "E",
                                                    "+",
                                                    "-",
                                                    ".",
                                                  ].includes(e.key) &&
                                                  e.preventDefault()
                                                }
                                                onKeyPress={(e) =>firefoxNumberFunc(e)}

                                                onChange={(e) => {
                                                  [
                                                    "e",
                                                    "E",
                                                    "+",
                                                    "-",
                                                  ].includes(e.key) &&
                                                    e.preventDefault();
                                                  setGpaState(e?.target?.value);
                                                  const re = /^[0-9\b]+$/;
                                                  // if (
                                                  //   e.target.value == "" ||
                                                  //   re.test(e.target.value)
                                                  // ) {
                                                    inputHandler(
                                                      e,
                                                      innerIndex,
                                                      "input"
                                                    );
                                                  // }
                                                }}
                                                value={
                                                  registerCourseTrainingEditState[
                                                    innerIndex
                                                  ]?.value_EN
                                                }
                                              />
                                              {gpaState !== "" &&
                                                gpaState < 0 && (
                                                  <StyledErrorP
                                                    style={{ color: "#fa4947" }}
                                                  >
                                                    {CGPA_negative}
                                                  </StyledErrorP>
                                                )}
                                              {item?.required === true &&
                                                registerCourseTrainingEditState[
                                                  innerIndex
                                                ]?.value_EN === "" &&
                                                mandatoryFieldState ===
                                                  true && (
                                                  <StyledErrorP
                                                    style={{ color: "#fa4947" }}
                                                  >
                                                    {this_field_is_mandatory}
                                                  </StyledErrorP>
                                                )}
                                            </>
                                          </>
                                        )}
                                             {item?.fieldSubType === "number" &&
                                        item?.fieldType === "GPA" && (
                                          <>
                                            {item?.required === true ? (
                                              <StyledFlexLabelDiv>
                                                <RequiredP>*</RequiredP>
                                                <StyledLabelP>
                                                  {item?.name_AR}
                                                </StyledLabelP>
                                              </StyledFlexLabelDiv>
                                            ) : (
                                              <StyledLabelP>
                                                {item?.name_AR}
                                              </StyledLabelP>
                                            )}
                                            <>
                                              <StyledInput
                                                type="number"
                                                placeholder={item?.value_EN}
                                                autoComplete={"off"}
                                              // onPaste={(e)=>e.preventDefault()}
                                              min={1}
                                                onClick={() =>
                                                  setMandatoryFieldState(true)
                                                }
                                                onKeyDown={(e) =>
                                                  [
                                                    "e",
                                                    "E",
                                                    "+",
                                                    "-",
                                                  ].includes(e.key) &&
                                                  e.preventDefault()
                                                }
                                              onKeyPress={(e) =>firefoxNumberFunc(e)}

                                                onChange={(e) => {
                                                  [
                                                    "e",
                                                    "E",
                                                    "+",
                                                    "-",
                                                  ].includes(e.key) &&
                                                    e.preventDefault();
                                                  setGpaState(e?.target?.value);
                                                  // if (
                                                  //   e.target.value == "" ||
                                                  //   re.test(e.target.value)
                                                  // ) {
                                                  inputHandler(
                                                    e,
                                                    innerIndex,
                                                    "input"
                                                  );
                                                  // }
                                                }}
                                                value={
                                                  registerCourseTrainingEditState[
                                                    innerIndex
                                                  ]?.value_EN
                                                }
                                              />
                                              {gpaState !== "" &&
                                                gpaState < 0 && (
                                                  <StyledErrorP
                                                    style={{ color: "#fa4947" }}
                                                  >
                                                    {/* Number should be greater
                                                    than 0 */}
                                                    {CGPA_negative}
                                                  </StyledErrorP>
                                                )}
                                              {item?.required === true &&
                                                registerCourseTrainingEditState[
                                                  innerIndex
                                                ]?.value_EN === "" &&
                                                mandatoryFieldState ===
                                                  true && (
                                                  <StyledErrorP
                                                    style={{
                                                      color: "#fa4947",
                                                    }}
                                                  >
                                                    {this_field_is_mandatory}
                                                  </StyledErrorP>
                                                )}
                                            </>
                                          </>
                                        )}
                                        {item?.fieldSubType === "number" &&
                                        item?.fieldType === "Number" && (
                                          <>
                                            {item?.required === true ? (
                                              <StyledFlexLabelDiv>
                                                <RequiredP>*</RequiredP>
                                                <StyledLabelP>
                                                  {item?.name_AR}
                                                </StyledLabelP>
                                              </StyledFlexLabelDiv>
                                            ) : (
                                              <StyledLabelP>
                                                {item?.name_AR}
                                              </StyledLabelP>
                                            )}
                                            <>
                                              <StyledInput
                                                type="number"
                                                placeholder={item?.value_EN}
                                                autoComplete={"off"}
                                              // onPaste={(e)=>e.preventDefault()}
                                              min={1}
                                                onClick={() =>
                                                  setMandatoryFieldState(true)
                                                }
                                                onKeyDown={(e) =>
                                                  [
                                                    "e",
                                                    "E",
                                                    "+",
                                                    "-",
                                                  ].includes(e.key) &&
                                                  e.preventDefault()
                                                }
                                                onKeyPress={(e) =>firefoxNumberFunc(e)}

                                                onChange={(e) => {
                                                  [
                                                    "e",
                                                    "E",
                                                    "+",
                                                    "-",
                                                  ].includes(e.key) &&
                                                    e.preventDefault();
                                                  // if (
                                                  //   e.target.value == "" ||
                                                  //   re.test(e.target.value)
                                                  // ) {
                                                  inputHandler(
                                                    e,
                                                    innerIndex,
                                                    "input"
                                                  );
                                                  // }
                                                }}
                                                value={
                                                  registerCourseTrainingEditState[
                                                    innerIndex
                                                  ]?.value_EN
                                                }
                                              />
                                              {gpaState !== "" &&
                                                gpaState < 0 && (
                                                  <StyledErrorP
                                                    style={{ color: "#fa4947" }}
                                                  >
                                                    {/* Number should be greater
                                                    than 0 */}
                                                    {CGPA_negative}
                                                  </StyledErrorP>
                                                )}
                                              {item?.required === true &&
                                                registerCourseTrainingEditState[
                                                  innerIndex
                                                ]?.value_EN === "" &&
                                                mandatoryFieldState ===
                                                  true && (
                                                  <StyledErrorP
                                                    style={{
                                                      color: "#fa4947",
                                                    }}
                                                  >
                                                    {this_field_is_mandatory}
                                                  </StyledErrorP>
                                                )}
                                            </>
                                          </>
                                        )}
                                      {item?.fieldType === "IqamaNumber" && (
                                        <>
                                          {item?.required === true ? (
                                            <StyledFlexLabelDiv>
                                              <RequiredP>*</RequiredP>
                                              <StyledLabelP>
                                                {item?.name_AR}
                                              </StyledLabelP>
                                            </StyledFlexLabelDiv>
                                          ) : (
                                            <StyledLabelP>
                                              {item?.name_AR}
                                            </StyledLabelP>
                                          )}
                                          <>
                                            <StyledInput
                                              type="text"
                                              placeholder={item?.value_EN}
                                              autoComplete={"off"}
                                              maxLength={10}
                                              // onPaste={(e)=>e.preventDefault()}
                                              onClick={() =>
                                                setMandatoryFieldState(true)
                                              }
                                              onKeyDown={(e) =>
                                                [
                                                  "e",
                                                  "E",
                                                  "+",
                                                  "-",
                                                  ".",
                                                ].includes(e.key) &&
                                                e.preventDefault()
                                              }
                                              onKeyPress={(e) =>firefoxNumberFunc(e)}

                                              onChange={(e) => {
                                                [
                                                  "e",
                                                  "E",
                                                  "+",
                                                  "-",
                                                  ".",
                                                ].includes(e.key) &&
                                                  e.preventDefault();
                                                // if (
                                                //   e.target.value == "" ||
                                                //   re.test(e.target.value)
                                                // ) {
                                                  inputHandler(
                                                    e.target.value.replace(
                                                      /[^\d]/g,
                                                      ""
                                                    ),
                                                    innerIndex,
                                                    "icama"
                                                  );
                                                // }
                                              }}
                                              value={
                                                registerCourseTrainingEditState[
                                                  innerIndex
                                                ]?.value_EN
                                              }
                                            />
                                            {item?.required === true &&
                                              registerCourseTrainingEditState[
                                                innerIndex
                                              ]?.value_EN === "" &&
                                              mandatoryFieldState === true && (
                                                <StyledErrorP
                                                  style={{ color: "#fa4947" }}
                                                >
                                                  {this_field_is_mandatory}
                                                </StyledErrorP>
                                              )}
                                          </>
                                        </>
                                      )}
                                        {item?.fieldSubType ===
                                          "DateTimePicker" && (
                                          <>
                                            {item?.required === true ? (
                                              <StyledFlexLabelDiv>
                                                <RequiredP>*</RequiredP>
                                                <StyledLabelP>
                                                  {item?.name_AR}
                                                </StyledLabelP>
                                              </StyledFlexLabelDiv>
                                            ) : (
                                              <StyledLabelP>
                                                {item?.name_AR}
                                              </StyledLabelP>
                                            )}
                                            <StyledDatePicker
                                              showTime
                                              onClick={() =>
                                                setMandatoryFieldState(true)
                                              }
                                              onChange={(e) =>
                                                inputHandler(
                                                  e?._d,
                                                  innerIndex,
                                                  "date"
                                                )
                                              }
                                              placeholder={
                                                registerCourseTrainingEditState[
                                                  innerIndex
                                                ]?.value_EN
                                              }
                                              onOk={(value) => {}}
                                            />
                                            {item?.required === true &&
                                              registerCourseTrainingEditState[
                                                innerIndex
                                              ]?.value_EN === "" &&
                                              mandatoryFieldState === true && (
                                                <StyledErrorP
                                                  style={{ color: "#fa4947" }}
                                                >
                                                  {this_field_is_mandatory}
                                                </StyledErrorP>
                                              )}
                                          </>
                                        )}
                                        {item?.fieldSubType === "date" &&
                                          item?.fieldType !== "DateOfBirth" &&
                                          item?.fieldType !== "StartingDate" &&
                                          item?.fieldType !== "EndDate" &&
                                          item?.fieldType !==
                                            "GraduatedYear" && (
                                            <>
                                              {item?.required === true ? (
                                                <StyledFlexLabelDiv>
                                                  <RequiredP>*</RequiredP>
                                                  <StyledLabelP>
                                                    {item?.name_AR}
                                                  </StyledLabelP>
                                                </StyledFlexLabelDiv>
                                              ) : (
                                                <StyledLabelP>
                                                  {item?.name_AR}
                                                </StyledLabelP>
                                              )}{" "}
                                              <StyledDatePicker
                                                format={dateFormat}
                                                disabledDate={disabledDate}
                                                onClick={() =>
                                                  setMandatoryFieldState(true)
                                                }
                                                onChange={(e) =>
                                                  inputHandler(
                                                    e?._d,
                                                    innerIndex,
                                                    "date"
                                                  )
                                                }
                                                placeholder={
                                                  registerCourseTrainingEditState[
                                                    innerIndex
                                                  ]?.value_EN !== null &&
                                                  moment(
                                                    registerCourseTrainingEditState[
                                                      innerIndex
                                                    ]?.value_EN
                                                  ).format("L")
                                                }
                                              />
                                              {item?.required === true &&
                                                registerCourseTrainingEditState[
                                                  innerIndex
                                                ]?.value_EN === "" &&
                                                mandatoryFieldState ===
                                                  true && (
                                                  <StyledErrorP
                                                    style={{ color: "#fa4947" }}
                                                  >
                                                    {this_field_is_mandatory}
                                                  </StyledErrorP>
                                                )}
                                            </>
                                          )}
                                        {item?.fieldSubType === "date" &&
                                          item?.fieldType ===
                                            "StartingDate" && (
                                            <>
                                              {item?.required === true ? (
                                                <StyledFlexLabelDiv>
                                                  <RequiredP>*</RequiredP>
                                                  <StyledLabelP>
                                                    {item?.name_AR}
                                                  </StyledLabelP>
                                                </StyledFlexLabelDiv>
                                              ) : (
                                                <StyledLabelP>
                                                  {item?.name_AR}
                                                </StyledLabelP>
                                              )}{" "}
                                              <StyledDatePicker
                                                format={dateFormat}
                                                disabledDate={disabledDate}
                                                onClick={() =>
                                                  setMandatoryFieldState(true)
                                                }
                                                onChange={(e) => {
                                                  inputHandler(
                                                    e?._d,
                                                    innerIndex,
                                                    "date"
                                                  );
                                                  setStartDateState(e?._d);
                                                  setEndDateEnable(false);
                                                }}
                                                placeholder={
                                                  registerCourseTrainingEditState[
                                                    innerIndex
                                                  ]?.value_EN !== null &&
                                                  moment(
                                                    registerCourseTrainingEditState[
                                                      innerIndex
                                                    ]?.value_EN
                                                  ).format("L")
                                                }
                                              />
                                              {item?.required === true &&
                                                registerCourseTrainingEditState[
                                                  innerIndex
                                                ]?.value_EN === "" &&
                                                mandatoryFieldState ===
                                                  true && (
                                                  <StyledErrorP
                                                    style={{ color: "#fa4947" }}
                                                  >
                                                    {this_field_is_mandatory}
                                                  </StyledErrorP>
                                                )}
                                            </>
                                          )}
                                        {item?.fieldSubType === "date" &&
                                          item?.fieldType === "EndDate" && (
                                            <>
                                              {item?.required === true ? (
                                                <StyledFlexLabelDiv>
                                                  <RequiredP>*</RequiredP>
                                                  <StyledLabelP>
                                                    {item?.name_AR}
                                                  </StyledLabelP>
                                                </StyledFlexLabelDiv>
                                              ) : (
                                                <StyledLabelP>
                                                  {item?.name_AR}
                                                </StyledLabelP>
                                              )}{" "}
                                              <StyledDatePicker
                                                disabled={endDateEnable}
                                                format={dateFormat}
                                                disabledDate={
                                                  disabledTrainingEndDate
                                                }
                                                onClick={() =>
                                                  setMandatoryFieldState(true)
                                                }
                                                onChange={(e) => {
                                                  inputHandler(
                                                    e?._d,
                                                    innerIndex,
                                                    "date"
                                                  );
                                                  setStartDateState(e?._d);
                                                  setEndDateEnable(false);
                                                }}
                                                placeholder={
                                                  registerCourseTrainingEditState[
                                                    innerIndex
                                                  ]?.value_EN !== null &&
                                                  moment(
                                                    registerCourseTrainingEditState[
                                                      innerIndex
                                                    ]?.value_EN
                                                  ).format("L")
                                                }
                                              />
                                              {item?.required === true &&
                                                registerCourseTrainingEditState[
                                                  innerIndex
                                                ]?.value_EN === "" &&
                                                mandatoryFieldState ===
                                                  true && (
                                                  <StyledErrorP
                                                    style={{ color: "#fa4947" }}
                                                  >
                                                    {this_field_is_mandatory}
                                                  </StyledErrorP>
                                                )}
                                            </>
                                          )}
                                        {item?.fieldSubType ===
                                          "DatePicker" && (
                                          <>
                                            {item?.required === true ? (
                                              <StyledFlexLabelDiv>
                                                <RequiredP>*</RequiredP>
                                                <StyledLabelP>
                                                  {item?.name_AR}
                                                </StyledLabelP>
                                              </StyledFlexLabelDiv>
                                            ) : (
                                              <StyledLabelP>
                                                {item?.name_AR}
                                              </StyledLabelP>
                                            )}{" "}
                                            <StyledDatePicker
                                              format={dateFormat}
                                              onClick={() =>
                                                setMandatoryFieldState(true)
                                              }
                                              onChange={(e) =>
                                                inputHandler(
                                                  e?._d,
                                                  innerIndex,
                                                  "date"
                                                )
                                              }
                                              placeholder={
                                                registerCourseTrainingEditState[
                                                  innerIndex
                                                ]?.value_EN
                                              }
                                            />
                                            {item?.required === true &&
                                              registerCourseTrainingEditState[
                                                innerIndex
                                              ]?.value_EN === "" &&
                                              mandatoryFieldState === true && (
                                                <StyledErrorP
                                                  style={{ color: "#fa4947" }}
                                                >
                                                  {this_field_is_mandatory}
                                                </StyledErrorP>
                                              )}
                                          </>
                                        )}

                                        {item?.fieldSubType === "checkbox-group" && (
                                          <>
                                            {item?.required === true ? (
                                              <StyledFlexLabelDiv>
                                                <RequiredP>*</RequiredP>
                                                <StyledLabelP>
                                                  {item?.name_AR}
                                                </StyledLabelP>
                                              </StyledFlexLabelDiv>
                                            ) : (
                                              <StyledLabelP>
                                                {item?.name_AR}
                                              </StyledLabelP>
                                            )}{" "}
                                            {/* <Checkbox.Group
                                              style={{
                                                width: "100%",
                                              }}
                                              // defaultValue={item?.value_EN?.split(",")}
                                              onClick={() =>
                                                setMandatoryFieldState(true)
                                              }
                                              onChange={(e) =>
                                                inputHandler(
                                                  e?.toString(),
                                                  innerIndex,
                                                  "checkbox"
                                                )
                                              }
                                              value={registerCourseTrainingEditState[
                                                innerIndex
                                              ]?.value_EN?.split(",")}
                                            >
                                              <StyledCheckBoxOptionRow>
                                                {item?.options_EN?.map(
                                                  (item, index) => (
                                                    <Checkbox
                                                      key={index}
                                                      value={item}
                                                    >
                                                    {parse(item)}
                                                    </Checkbox>
                                                  )
                                                )}
                                              </StyledCheckBoxOptionRow>
                                            </Checkbox.Group> */}
                                            <StyledCheckBoxOptionRow>
                                            {item?.options_EN?.map(
                                              (item, index) => (
                                                <div key={index}>
                                                  <input
                                                    type="checkbox"
                                                    color={"#105f43"}
                                                    onChange={(e) => {
                                                      // if (e.target && e.target.value === "") {
                                                      //   inputHandler(e, innerIndex, "input");
                                                      // } else {
                                                      //   inputHandler(e, innerIndex, "input");
                                                      // }

                                                      inputHandlerCheckbox(
                                                        e,
                                                        innerIndex,
                                                        "input"
                                                      );
                                                    }}
                                                    // value={isCheckbox ? "" : item}
                                                    value={item}
                                                  />
                                                  <label
                                                    style={{ marginRight: 5 }}
                                                    htmlFor="vehicle1"
                                                  >
                                                    {parse(item)}
                                                  </label>
                                                </div>
                                              )
                                            )}
                                          </StyledCheckBoxOptionRow>
                                            {item?.required === true &&
                                              registerCourseTrainingEditState[
                                                innerIndex
                                              ]?.value_EN === "" &&
                                              mandatoryFieldState === true && (
                                                <StyledErrorP
                                                  style={{ color: "#fa4947" }}
                                                >
                                                  {this_field_is_mandatory}
                                                </StyledErrorP>
                                              )}
                                          </>
                                        )}

                                        {item?.fieldSubType === "Select" && (
                                          <>
                                            {item?.required === true ? (
                                              <StyledFlexLabelDiv>
                                                <RequiredP>*</RequiredP>
                                                <StyledLabelP>
                                                  {item?.name_AR}
                                                </StyledLabelP>
                                              </StyledFlexLabelDiv>
                                            ) : (
                                              <StyledLabelP>
                                                {item?.name_AR}
                                              </StyledLabelP>
                                            )}{" "}
                                            <StyledSelect
                                              onClick={() =>
                                                setMandatoryFieldState(true)
                                              }
                                              onChange={(e) =>
                                                inputHandler(
                                                  e,
                                                  innerIndex,
                                                  "select"
                                                )
                                              }
                                              value={
                                                registerCourseTrainingEditState[
                                                  innerIndex
                                                ]?.value_EN
                                              }
                                              style={{
                                                width: 120,
                                              }}
                                            >
                                              {item?.options_EN?.map(
                                                (item, index) => (
                                                  <Option
                                                    key={index}
                                                    value={item}
                                                  >
                                                    {item}
                                                  </Option>
                                                )
                                              )}
                                            </StyledSelect>
                                            {item?.required === true &&
                                              registerCourseTrainingEditState[
                                                innerIndex
                                              ]?.value_EN === "" &&
                                              mandatoryFieldState === true && (
                                                <StyledErrorP
                                                  style={{ color: "#fa4947" }}
                                                >
                                                  {this_field_is_mandatory}
                                                </StyledErrorP>
                                              )}
                                          </>
                                        )}
                                        {item?.fieldSubType ===
                                          "MultiSelect" && (
                                          <>
                                            {item?.required === true ? (
                                              <StyledFlexLabelDiv>
                                                <RequiredP>*</RequiredP>
                                                <StyledLabelP>
                                                  {item?.name_AR}
                                                </StyledLabelP>
                                              </StyledFlexLabelDiv>
                                            ) : (
                                              <StyledLabelP>
                                                {item?.name_AR}
                                              </StyledLabelP>
                                            )}{" "}
                                            <StyledSelect
                                              mode="multiple"
                                              placeholder={"Please Select"}
                                              onClick={() =>
                                                setMandatoryFieldState(true)
                                              }
                                              onChange={(e) =>
                                                inputHandler(
                                                  e,
                                                  innerIndex,
                                                  "multiselect"
                                                )
                                              }
                                              value={
                                                registerCourseTrainingEditState[
                                                  innerIndex
                                                ]?.value_EN
                                              }
                                              style={{
                                                width: 120,
                                              }}
                                            >
                                              {item?.options_EN?.map(
                                                (item, index) => (
                                                  <Option
                                                    key={index}
                                                    value={item}
                                                  >
                                                    {item}
                                                  </Option>
                                                )
                                              )}
                                            </StyledSelect>
                                            {item?.required === true &&
                                              registerCourseTrainingEditState[
                                                innerIndex
                                              ]?.value_EN === "" &&
                                              mandatoryFieldState === true && (
                                                <StyledErrorP
                                                  style={{ color: "#fa4947" }}
                                                >
                                                  {this_field_is_mandatory}
                                                </StyledErrorP>
                                              )}
                                          </>
                                        )}
                                        {item?.fieldSubType === "Radio" && (
                                          <>
                                            {item?.required === true ? (
                                              <StyledFlexLabelDiv>
                                                <RequiredP>*</RequiredP>
                                                <StyledLabelP>
                                                  {item?.name_AR}
                                                </StyledLabelP>
                                              </StyledFlexLabelDiv>
                                            ) : (
                                              <StyledLabelP>
                                                {item?.name_AR}
                                              </StyledLabelP>
                                            )}{" "}
                                            <StyledRadioButtonDiv>
                                              <Radio.Group
                                                onChange={(e) =>
                                                  inputHandler(
                                                    e,
                                                    innerIndex,
                                                    "input"
                                                  )
                                                }
                                                value={
                                                  registerCourseTrainingEditState[
                                                    innerIndex
                                                  ]?.value_EN
                                                }
                                                // defaultValue={item?.value_EN}
                                              >
                                                {item?.options_EN?.map(
                                                  (item, index) => (
                                                    <Radio.Button
                                                      key={index}
                                                      value={item}
                                                    >
                                                      {item}
                                                    </Radio.Button>
                                                  )
                                                )}
                                              </Radio.Group>
                                            </StyledRadioButtonDiv>
                                            {item?.required === true &&
                                              registerCourseTrainingEditState[
                                                innerIndex
                                              ]?.value_EN === "" &&
                                              mandatoryRadioFieldState ===
                                                false && (
                                                <StyledErrorP
                                                  style={{ color: "#fa4947" }}
                                                >
                                                  {this_field_is_mandatory}
                                                </StyledErrorP>
                                              )}
                                          </>
                                        )}
                                        {item?.fieldSubType ===
                                          "CCEEmployee" && (
                                          <>
                                            {item?.required === true ? (
                                              <StyledFlexLabelDiv>
                                                <RequiredP>*</RequiredP>
                                                <StyledLabelP>
                                                  {item?.name_AR}
                                                </StyledLabelP>
                                              </StyledFlexLabelDiv>
                                            ) : (
                                              <StyledLabelP>
                                                {item?.name_AR}
                                              </StyledLabelP>
                                            )}{" "}
                                            <StyledRadioButtonDiv>
                                              <Radio.Group
                                                onClick={() =>
                                                  setMandatoryFieldState(true)
                                                }
                                                onChange={(e) => {
                                                  inputHandler(
                                                    e,
                                                    innerIndex,
                                                    "input"
                                                  );
                                                  setCcEmployeeValue(
                                                    e.target?.value
                                                  );
                                                setCcEmployeeIndex(innerIndex)
                                                  e.target?.value === "No"
                                                    ? (inputHandler(
                                                        "",
                                                        innerIndex + 1,
                                                        "radio"
                                                      ),
                                                      setEmployeeIdState("200"))
                                                    : setEmployeeIdState("400");
                                                }}
                                                value={
                                                  registerCourseTrainingEditState[
                                                    innerIndex
                                                  ]?.value_EN
                                                }
                                                // defaultValue={item?.value_EN}
                                              >
                                                {item?.options_EN?.map(
                                                  (item, index) => (
                                                    <Radio.Button
                                                      key={index}
                                                      value={item}
                                                    >
                                                      {item}
                                                    </Radio.Button>
                                                  )
                                                )}
                                              </Radio.Group>
                                            </StyledRadioButtonDiv>
                                            {item?.required === true &&
                                              registerCourseTrainingEditState[
                                                innerIndex
                                              ]?.value_EN === "" &&
                                              mandatoryRadioFieldState ===
                                                false && (
                                                <StyledErrorP
                                                  style={{ color: "#fa4947" }}
                                                >
                                                  {this_field_is_mandatory}
                                                </StyledErrorP>
                                              )}
                                          </>
                                        )}
                                        {item?.fieldSubType ===
                                          "ApplicantNameEnglish" && (
                                          <>
                                            {item?.required === true ? (
                                              <StyledFlexLabelDiv>
                                                <RequiredP>*</RequiredP>
                                                <StyledLabelP>
                                                  {item?.name_AR}
                                                </StyledLabelP>
                                              </StyledFlexLabelDiv>
                                            ) : (
                                              <StyledLabelP>
                                                {item?.name_AR}
                                              </StyledLabelP>
                                            )}
                                            <StyledInput
                                              type="text"
                                              placeholder={item?.value_EN}
                                              onClick={() =>
                                                setMandatoryFieldState(true)
                                              }
                                              name={item?.checkListDetailId}
                                              autoComplete={"off"}
                                              onChange={(e) =>
                                                inputHandler(
                                                  e,
                                                  innerIndex,
                                                  "input"
                                                )
                                              }
                                              value={
                                                registerCourseTrainingEditState[
                                                  innerIndex
                                                ]?.value_EN
                                              }
                                            />
                                            {item?.required === true &&
                                              registerCourseTrainingEditState[
                                                innerIndex
                                              ]?.value_EN === "" &&
                                              mandatoryFieldState === true && (
                                                <StyledErrorP
                                                  style={{ color: "#fa4947" }}
                                                >
                                                  {this_field_is_mandatory}
                                                </StyledErrorP>
                                              )}
                                          </>
                                        )}
                                        {item?.fieldSubType ===
                                          "ApplicantNameArabic" && (
                                          <>
                                            {item?.required === true ? (
                                              <StyledFlexLabelDiv>
                                                <RequiredP>*</RequiredP>
                                                <StyledLabelP>
                                                  {item?.name_AR}
                                                </StyledLabelP>
                                              </StyledFlexLabelDiv>
                                            ) : (
                                              <StyledLabelP>
                                                {item?.name_AR}
                                              </StyledLabelP>
                                            )}
                                            <StyledInput
                                              type="text"
                                              placeholder={item?.value_EN}
                                              onClick={() =>
                                                setMandatoryFieldState(true)
                                              }
                                              name={item?.checkListDetailId}
                                              autoComplete={"off"}
                                              onChange={(e) =>
                                                inputHandler(
                                                  e,
                                                  innerIndex,
                                                  "input"
                                                )
                                              }
                                              value={
                                                registerCourseTrainingEditState[
                                                  innerIndex
                                                ]?.value_EN
                                              }
                                            />
                                            {item?.required === true &&
                                              registerCourseTrainingEditState[
                                                innerIndex
                                              ]?.value_EN === "" &&
                                              mandatoryFieldState === true && (
                                                <StyledErrorP
                                                  style={{ color: "#fa4947" }}
                                                >
                                                  {this_field_is_mandatory}
                                                </StyledErrorP>
                                              )}
                                          </>
                                        )}
                                        {item?.fieldSubType ===
                                          "ApplicantEmail" && (
                                          <>
                                            {emailValidationState ===
                                            "Invalid Email" ? (
                                              <>
                                                {item?.required === true ? (
                                                  <StyledFlexLabelDiv>
                                                    <RequiredP>*</RequiredP>
                                                    <StyledLabelP>
                                                      {item?.name_AR}
                                                    </StyledLabelP>
                                                  </StyledFlexLabelDiv>
                                                ) : (
                                                  <StyledLabelP>
                                                    {item?.name_AR}
                                                  </StyledLabelP>
                                                )}
                                                <StyledInput
                                                  type="text"
                                                  placeholder={item?.value_EN}
                                                  autoComplete={"off"}
                                                  onClick={() =>
                                                    setMandatoryFieldState(true)
                                                  }
                                                  onChange={(e) => {
                                                    inputHandler(
                                                      e,
                                                      innerIndex,
                                                      "input"
                                                    );
                                                    setEmailValidationState(
                                                      emailValidation(
                                                        e.target.value
                                                      )
                                                    );
                                                  }}
                                                  value={
                                                    registerCourseTrainingEditState[
                                                      innerIndex
                                                    ]?.value_EN
                                                  }
                                                />
                                                <StyledErrorP>
                                                  Invalid Email
                                                </StyledErrorP>
                                              </>
                                            ) : (
                                              <>
                                                {item?.required === true ? (
                                                  <StyledFlexLabelDiv>
                                                    <RequiredP>*</RequiredP>
                                                    <StyledLabelP>
                                                      {item?.name_AR}
                                                    </StyledLabelP>
                                                  </StyledFlexLabelDiv>
                                                ) : (
                                                  <StyledLabelP>
                                                    {item?.name_AR}
                                                  </StyledLabelP>
                                                )}
                                                <StyledInput
                                                  type="text"
                                                  placeholder={item?.value_EN}
                                                  autoComplete={"off"}
                                                  onClick={() =>
                                                    setMandatoryFieldState(true)
                                                  }
                                                  onChange={(e) => {
                                                    inputHandler(
                                                      e,
                                                      innerIndex,
                                                      "input"
                                                    );
                                                    setEmailValidationState(
                                                      emailValidation(
                                                        e.target.value
                                                      )
                                                    );
                                                  }}
                                                  value={
                                                    registerCourseTrainingEditState[
                                                      innerIndex
                                                    ]?.value_EN
                                                  }
                                                />
                                                {item?.required === true &&
                                                  registerCourseTrainingEditState[
                                                    innerIndex
                                                  ]?.value_EN === "" &&
                                                  mandatoryFieldState ===
                                                    true && (
                                                    <StyledErrorP
                                                      style={{
                                                        color: "#fa4947",
                                                      }}
                                                    >
                                                      {this_field_is_mandatory}
                                                    </StyledErrorP>
                                                  )}
                                              </>
                                            )}
                                          </>
                                        )}
                                        {item?.fieldSubType ===
                                          "ApplicantPhoneDirect" && (
                                          <>
                                            {item?.required === true ? (
                                              <StyledFlexLabelDiv>
                                                <RequiredP>*</RequiredP>
                                                <StyledLabelP>
                                                  {item?.name_AR}
                                                </StyledLabelP>
                                              </StyledFlexLabelDiv>
                                            ) : (
                                              <StyledLabelP>
                                                {item?.name_AR}
                                              </StyledLabelP>
                                            )}
                                            <>
                                              <StyledInput
                                                type="number"
                                                placeholder={item?.value_EN}
                                                autoComplete={"off"}
                                                onClick={() =>
                                                  setMandatoryFieldState(true)
                                                }
                                                onChange={(e) =>
                                                  inputHandler(
                                                    e,
                                                    innerIndex,
                                                    "input"
                                                  )
                                                }
                                                value={
                                                  registerCourseTrainingEditState[
                                                    innerIndex
                                                  ]?.value_EN
                                                }
                                              />
                                              {item?.required === true &&
                                                registerCourseTrainingEditState[
                                                  innerIndex
                                                ]?.value_EN === "" &&
                                                mandatoryFieldState ===
                                                  true && (
                                                  <StyledErrorP
                                                    style={{ color: "#fa4947" }}
                                                  >
                                                    {this_field_is_mandatory}
                                                  </StyledErrorP>
                                                )}
                                            </>
                                          </>
                                        )}
                                        {item?.fieldSubType ===
                                          "CCEEmployeeId" && (
                                          <>
                                            {ccEmployeeValue === "Yes" ? (
                                              <>
                                                {item?.required === true ? (
                                                  <StyledFlexLabelDiv>
                                                    <RequiredP>*</RequiredP>
                                                    <StyledLabelP>
                                                      {item?.name_AR}
                                                    </StyledLabelP>
                                                  </StyledFlexLabelDiv>
                                                ) : (
                                                  <StyledLabelP>
                                                    {item?.name_AR}
                                                  </StyledLabelP>
                                                )}{" "}
                                                <StyledInput
                                                  type="text"
                                                  placeholder={item?.value_EN}
                                                  onWheel={(event) =>
                                                    event.currentTarget.blur()
                                                  }
                                                  onChange={(e) => {
                                                    inputHandler(
                                                      e,
                                                      innerIndex,
                                                      "input"
                                                    );
                                                    setEmployeeId(
                                                      e.target.value
                                                    );
                                                  }}
                                                  value={
                                                    registerCourseTrainingEditState[
                                                      innerIndex
                                                    ]?.value_EN
                                                  }
                                                />
                                                {employeeIdState === "404" && (
                                                  <StyledErrorP>
                                                    {CCEEmployeeIdError}
                                                  </StyledErrorP>
                                                )}
                                                {item?.required === true &&
                                                  registerCourseTrainingEditState[
                                                    innerIndex
                                                  ]?.value_EN === "" &&
                                                  mandatoryFieldState ===
                                                    true && (
                                                    <StyledErrorP
                                                      style={{
                                                        color: "#fa4947",
                                                      }}
                                                    >
                                                      {this_field_is_mandatory}
                                                    </StyledErrorP>
                                                  )}
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                          </>
                                        )}
                                      </Col>
                                    )
                                  )}
                                </Row>
                              </>
                            )}
                          </div>
                        ))}
                      </StyledSignInImgCol>
                    </StyledRegisterationRow>
                  </StyledSigninDiv>
                </MainStyledSigninDiv>
                <SignInRow>
                  <NextContainer>
                    <SpaceBetweenDiv>
                      {step === 0 ? (
                        <CustomButton
                          customStyle={{
                            paddingInline: 30,
                            borderColor: "#105F43",
                            color: "#105F43",
                            borderRadius: 8,
                            visibility: "hidden",
                          }}
                          onClick={() => {
                            if (step > 0) setStep(step - 1);
                            getCourseDetailRecordFunc(token);
                            setGetResgisterCoursePopulateState(true);
                            window.scrollTo(0, 0);
                          }}
                        >
                          {back}
                        </CustomButton>
                      ) : (
                        <CustomButton
                          customStyle={{
                            paddingInline: 30,
                            borderColor: "#105F43",
                            color: "#105F43",
                            borderRadius: 8,
                          }}
                          onClick={() => {
                            if (step > 0) setStep(step - 1);
                            getCourseDetailRecordFunc(courseId, token);
                            setGetResgisterCoursePopulateState(true);
                            window.scrollTo(0, 0);
                          }}
                        >
                          {back}
                        </CustomButton>
                      )}
                      {(createLoading ||
                        countArrRequiredFilled === countArrRequired) &&
                      employeeIdState === "200" &&
                      emailValidationState !== "Invalid Email" ? (
                        <>
                          {stepLoadingState ? (
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
                          ) : (
                            <CustomButton
                              customStyle={{
                                paddingInline: 30,
                                background: "#105F43",
                                borderRadius: 8,
                                color: "#fff",
                              }}
                              onClick={() => {
                                setMandatoryFieldState(false);

                                if (step - 1) {
                                }
                                setRegisterCourseTrainingState("");
                                setRegisterationFormStepState("");
                                setFileUploadState("");

                                if (step + 1 === getCourseDetailId.length) {
                                  setNextLoadingState1(true)
                                  router.push("/ar/instructor-request-finish");
                                }

                                editCourseTrainingRegistrationFunc(
                                  getCookies("token"),
                                  registerCourseTrainingEditState
                                );

                                getCourseDetailRecordFunc(token);
                                window.scrollTo(0, 0);
                              }}
                            >
                              {next}
                            </CustomButton>
                          )}
                        </>
                      ) : (
                        <>
                          <StyledDisabledCustomButton
                            customStyle={{
                              paddingInline: 30,
                              background: "rgb(224, 224, 224)",
                              borderRadius: 8,
                              color: "#fff",
                            }}
                          >
                            {next}
                          </StyledDisabledCustomButton>
                        </>
                      )}
                    </SpaceBetweenDiv>
                  </NextContainer>
                </SignInRow>
              </>
            )}
          </Header>

          {/* <Footer /> */}
        </div>
      </body>
    </div>
      ) : (
        <>
          <img loading="lazy"className="pre-loader" src={Preloader.src} />
        </>
      )}
    </StyledDiv>

  );
};

export default RegisterationStep;

const StyledDiv=styled.div`
.ant-select-arrow{
  position: absolute !important;
  left: 11px !important;
  right: unset !important;
}
.ant-select-single.ant-select-show-arrow .ant-select-selection-item{
  padding-left: 18px !important;
  padding-right: 0px !important;
}
.ant-select-single.ant-select-show-arrow .ant-select-selection-search{
  right: 11px !important;
}
`
const MainStyledSigninDiv = styled.div`
  border-bottom: 1px solid #a9a9a9;
  .ant-btn:hover,
  .ant-btn:focus {
    color: #000 !important;
  }
  @media (max-width: 991px) {
    padding-bottom: 20px;
  }
  .download_btn {
    background-color: #064b33 !important;
    color: rgb(255, 255, 255) !important;
    padding-inline: 28px !important;
    height: 36px !important;
    font-size: 14px !important;
    font-weight: 500 !important;
  }
  .download_btn:focus {
    background-color: #064b33 !important;
    color: rgb(255, 255, 255) !important;
    padding-inline: 28px !important;
    height: 36px !important;
    font-size: 14px !important;
    font-weight: 500 !important;
  }
  .download_btn:hover {
    background-color: #064b33 !important;
    color: rgb(255, 255, 255) !important;
    padding-inline: 28px !important;
    height: 36px !important;
    font-size: 14px !important;
    font-weight: 500 !important;
  }
`;

const StyledSignInImgCol = styled(Col)`
  @media (min-width: 991px) {
    padding: 30px 80px;
  }
  @media (max-width: 991px) {
    padding: 0px 15px;
  }
  //   display: flex;
  //   justify-content: start;
`;

const InformationDiv = styled.div`
  margin-top: 20px;
`;

const FlexDiv = styled.div`
  display: flex;
  margin-bottom: 20px;
  img {
    height: 30px;
  }
  p {
    margin-bottom: 0px;
    margin-top: 2px;
    margin-right: 10px;
  }
`;

const StyledSigninDiv = styled.div`
  @media (min-width: 991px) {
    padding: 0px 0px 0px;
  }
  @media (max-width: 991px) {
    padding: 30px 0px 0px;
  }
  h1 {
    font-family: "GESSTwoBold", sans-serif;
    font-weight: 700;
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
  min-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  // @media (min-width: 576px) {
  //   max-width: 576px;
  // }
  // @media (min-width: 768px) {
  //   max-width: 768px;
  // }
  // @media (min-width: 992px) {
  //   min-width: 992px;
  // }
  // @media only screen and (min-width: 1160px) and (max-width: 1258px) {
  //   // min-width: 1200px;
  //   min-width: 1120px;
  // }
  // @media only screen and (min-width: 1259px) and (max-width: 1359px) {
  //   // min-width: 1200px;
  //   min-width: 1120px;
  // }
  // @media (min-width: 1342px) {
  //   // min-width: 1200px;
  //   min-width: 1120px;
  // }
`;

const NextContainer = styled.div`
  min-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  // @media (min-width: 576px) {
  //   max-width: 576px;
  // }
  // @media (min-width: 768px) {
  //   max-width: 768px;
  // }
  // @media (min-width: 992px) {
  //   min-width: 992px;
  // }
  // @media only screen and (min-width: 1160px) and (max-width: 1258px) {
  //   // min-width: 1200px;
  //   min-width: 1120px;
  // }
  // @media only screen and (min-width: 1259px) and (max-width: 1359px) {
  //   // min-width: 1200px;
  //   min-width: 1120px;
  // }
  // @media (min-width: 1342px) {
  //   // min-width: 1200px;
  //   min-width: 1120px;
  // }
  // margin-inline: 4%;
  // width: 100%;
`;

const StyledInput = styled(Input)`
  background: #f8f8f8;
  border: 1px solid #c1c1c1;
  border-radius: 5px;
  padding: 10px 20px;
  font-family: "GESSTwoLight", sans-serif !important;
`;

const SignInRow = styled(Row)`
  margin-block: 20px;
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

const StyledErrorP1 = styled.b`
  margin-bottom: 0px;
  color: #fa4947 !important;
  font-weight: 600;
  font-size: 12px !important;
`;

const StyledIncorrectPasswordModal = styled.div`
  h1 {
    margin-block: 15px !important;
    font-family: "GESSTwoBold", sans-serif !important;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
    height: 45px !important;
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
    // font-family: "InterNormal", sans-serif;
    font-size: 13px;
  }
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

const StyledLabelP = styled.p`
  font-size: 14px !important;
  margin-bottom: 15px !important;
  font-family: "TitilliumNormal", sans-serif;
  color: #000 !important;
`;
const StyledCheckBoxOptionRow = styled(Row)`
  display: grid !important;
  .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin-left: 0px !important;
  }
      
  div{
    label{

      a{
        color: #A87E33 !important;
      }
      a:hover{
        color: #A87E33 !important;
      }    }
  }
`;
const StyledDatePicker = styled(DatePicker)`
  background: #f8f8f8;
  border: 1px solid #c1c1c1;
  border-radius: 5px;
  padding: 10px 20px;
  width: 100% !important;
`;
const StyledRadioButtonDiv = styled.div`
  .ant-radio-button-wrapper-checked {
    border-color: #105f43 !important;
    color: #fff !important;
    background-color: #105f43 !important;
  }
  .ant-radio-button-wrapper:hover{
    color: #000 !important;
  }
  .ant-radio-button-wrapper {
    margin-right: 10px;
    border-radius: 6px;
  }
  // .ant-radio-button-wrapper:hover {
  //   color: #105f43 !important;
  // }
  .ant-radio-button-wrapper-checked:not(
      .ant-radio-button-wrapper-disabled
    )::before {
    background-color: none !important;
  }
  .ant-radio-button-wrapper:not(:first-child)::before {
    background-color: #d9d9d9 !important;
  }
  .ant-radio-button-wrapper-checked:hover{
    color: #fff !important;
  }
`;

const AttachmentDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-inline: 15px;
  margin-block: 10px;
  margin-block: 15px .file-name {
    margin-right: 10px;
  }
  .file-size {
    margin-left: 10px;
  }
  .file-img {
    height: 14px;
  }
  p {
    margin-bottom: 0px;
  }
`;

const FlexDiv1 = styled.div`
  display: flex;
`;

const CrossDiv = styled.div`
  cursor: pointer;
`;

const StyledDisabledCustomButton = styled(CustomButton)`
  cursor: not-allowed !important;
`;

const StyledImgDiv = styled.div`
  img {
    width: 100px;
    height: 60px;
    object-fit: cover;
    border-radius: 10px;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledImgDivWord = styled.div`
  img {
    width: 60px;
    height: 60px;
    // object-fit: cover;
    border-radius: 10px;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const StyledCustomButton = styled.button`
  .ant-btn:hover {
    color: none !important;
  }
  cursor: pointer;
  background-color: rgb(16, 95, 67);
  color: rgb(255, 255, 255);
  padding: 7px 10px;
  border-radius: 6px;
`;

const StyledAiFillEye = styled(AiFillEye)`
  font-size: 20px;
  margin-left: 10px;
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

const StyledTitiliumHead = styled.h1`
  font-family: "TitilliumNormal", sans-serif;
  // margin-bottom: 0px !important;
  line-height: 40px !important;
`;

const RequiredP = styled.p`
  margin-bottom: 0px;
  color: red !important;
  margin-left: 5px;
`;

const StyledFlexLabelDiv = styled.div`
  display: flex;
`;

const MainStyledSigninDiv1 = styled.div``;

const StyledSigninDiv1 = styled.div`
  @media (min-width: 992px) {
    // padding: 140px 0px 20px;
    padding: 0px 0px 20px;
  }
  @media (max-width: 991px) {
    padding: 30px 0px 20px;
  }
  h1 {
    font-family: "GESSTwoBold", sans-serif;
    font-weight: 700;
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

const ContentCol = styled(Col)`
  text-align: center;
  @media (min-width: 992px) {
    h1 {
      font-family: "GESSTwoBold";
      font-weight: 700;
      font-size: 35px;
      color: #181818;
    }
  }
  @media (max-width: 991px) {
    h1 {
      font-family: "GESSTwoBold";
      font-weight: 700;
      font-size: 32px;
      color: #181818;
      margin-bottom: 5px !important;
    }
  }
  p {
    color: #8c8c8c;
    // font-family: "InterNormal", sans-serif;
    font-weight: 400;
    font-size: 14px !important;
  }
`;

const DashboardCardDiv = styled.div`
  box-shadow: 5px 5px 31px 6px rgba(0, 0, 0, 0.05);
  background: #ffffff;
  border-radius: 14px;
  padding: 20px;
`;

const DashboardCardDisabledDiv = styled.div`
  background: #ffffff;
  border-radius: 14px;
  padding: 20px;
`;

const TitleRow = styled(Row)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    margin-bottom: 0px;
    font-size: 16px;
  }
`;

const TitleRowDisabled = styled(Row)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    margin-bottom: 0px;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.2) !important;
  }
`;

const ProgressLinkDiv = styled.div`
  border: 1px solid;
  border-radius: 101px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 1px solid rgba(16, 95, 67, 0.15);
  background: rgba(16, 95, 67, 0.06);
  height: 20px;
  padding: 20px 0;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    color: #105f43;
    font-size: 20px;
  }
  p {
    color: #105f43 !important;
    margin-bottom: 0px;
    font-size: 10px !important;
  }
`;

const ProgressLinkDivDisabled = styled.div`
  border: 1px solid;
  border-radius: 101px;
  display: flex;
  align-items: center;
  cursor: no-drop;
  border: 1px solid rgba(16, 95, 67, 0.15);
  // background: rgba(16, 95, 67, 0.06);
  height: 20px;
  padding: 20px 0;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    color: #105f43;
    font-size: 20px;
  }
  p {
    color: #105f43 !important;
    margin-bottom: 0px;
    font-size: 10px !important;
    opacity: 0.4 !important;
  }
`;

const DescriptionRow = styled(Row)`
  p {
    text-align: start !important;
    color: #8c8c8c;
    font-weight: 400;
    font-size: 13px !important;
    // font-family: "InterNormal", sans-serif;
  }
`;

const StyledSliderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

const StyledSlider = styled(Slider)`
  width: 80% !important;
  .ant-slider-track {
    background-color: #a87e33 !important;
  }
  .ant-slider-handle {
    background-color: #a87e33 !important;
    border: solid 2px #a87e33 !important;
    display: none !important;
  }
`;

const LinkDiv = styled.div`
  border: 1px solid;
  padding: 10px;
  border-radius: 101px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 1px solid #c1c1c1;
  background: #f8f8f8;
  svg {
    color: #105f43;
    font-size: 20px;
  }
`;

const LinkDivDisabled = styled.div`
  border: 1px solid;
  padding: 10px;
  border-radius: 101px;
  display: flex;
  align-items: center;
  cursor: no-drop;
  border: 1px solid rgba(16, 95, 67, 0.15);
  // background: #f8f8f8;
  svg {
    color: #105f43;
    font-size: 20px;
    opacity: 0.2 !important;
  }
`;

const StyledErrorP = styled.p`
  margin-bottom: 0px;
  color: #fa4947 !important;
  font-size: 13px !important;
`;

const StyledTrackingDiv = styled.div`
  p {
    margin-bottom: 0px;
  }
`;
``;
