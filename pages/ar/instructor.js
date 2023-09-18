import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import router from "next/router";
import { getCookies, setCookies } from "../../src/helpers/cookie";
import Preloader from "../../public/images/Preloader.gif";
import { R2Favicon } from "../../images";
import Header from "../../src/components/rtl/adminLayoutHeader";
import { Button, Col, Input, Row, Upload } from "antd";
import styled from "styled-components";
import { AiFillEye } from "react-icons/ai";
import { ImAttachment, ImCross } from "react-icons/im";
import CustomButton from "../../src/components/rtl/Button";
import { useSelector } from "react-redux";
import endpoints from "../../src/api";
import TextArea from "antd/lib/input/TextArea";
import ModalComp from "../../src/components/Modal/LoaderModal";

import IntroductionImage from "../../public/images/IntroductionImage.png";
import { toast } from "react-toastify";
import {
  application,
  Become_an_instructor_and_change,
  Come_teach,
  Get_started,
  including_your_own,
  is_in_process,
  kindly_track_progress_here,
  lives,
  submitted,
  thank_you_submitting_application,
  thank_you_submitting_request,
  tracking_your_application,
  with_us,
  your_instuctor_request,
} from "../../src/helpers/LanguageConstant";

const Instructor = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectItem, setSelectItem] = useState("/ar/instructor");
  const userDataState = useSelector((state) => state?.userDataReducer);

  const [isInsturctor, setIsInsturctor] = useState();
  const [instructorState, setInstructorState] = useState({});
  const [
    instructorRegistrationStatusState,
    setInstructorRegistrationStatusState,
  ] = useState("");

  //console.log('instructorRegistrationStatusState',instructorRegistrationStatusState)

  useLayoutEffect(() => {
    setInstructorState({
      ...instructorState,
      LMSUserId: userDataState?.id,
      FirstName_EN: userDataState?.firstName_EN,
      LastName_EN: userDataState?.lastName_EN,
      FirstName_AR: userDataState?.firstName_AR,
      LastName_AR: userDataState?.lastName_AR,
      Email: userDataState?.email,
      PhoneNumber: userDataState?.phoneNumber,
      PhotoUrl: userDataState?.photoUrl,
      BioData_EN: userDataState?.bioData_EN,
      BioData_AR: userDataState?.bioData_AR,
    });
    setIsInsturctor(userDataState?.insturctor);
  }, [userDataState]);

  const authToken = getCookies("token");
  const userStatus = getCookies("userStatus");
  const [isAuthorized, setAuthorized] = useState(false);
  useLayoutEffect(() => {
    if (authToken === undefined) {
      router.push("/sign-in");
    } else if (userStatus === undefined || userStatus === "false") {
      router.push("/");
    } else if (authToken || userStatus === "true") {
      setAuthorized(true);
    }
  }, []);

  const DashboardRequestForInstructor = async () => {
    try {
      const response = await endpoints.getInstructorTrainingRegistrationLov1(
        authToken,
        "Arabic"
      );
      //console.log("response", response);
      if (response.data.statusCode === "200") {
        // toast.success("Request Submitted!");
        router.push("/ar/instructor-registeration-step");
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [percentageState, setPercentageState] = useState([]);
  const [stepLoadingState, setStepLoadingState] = useState(false);
  //console.log("percentageState", percentageState);

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

          setInstructorRegistrationStatusState(
            response?.data?.data?.instructorRegistrationCode
          );

          setPercentageState(
            response?.data.data
              .lovServicesInstructorCategoryPercentageViewModels
          );
          // ApplicantPhoneDirect
          const specificIndex = data?.findIndex(
            (item) => item?.fieldType === "ApplicantPhoneDirect"
          );
          if (specificIndex >= 0) {
            let obj = data[specificIndex];
            obj.value_EN = phoneNumber;
            data[specificIndex] = obj;
          }
          // ApplicantPhoneDirect
          // //console.log("specificIndex", specificIndex);
          // ApplicantNameEnglish;
          const specificIndex1 = data?.findIndex(
            (item) => item?.fieldType === "ApplicantNameEnglish"
          );
          //console.log("specificIndex1", specificIndex1);
          if (specificIndex1 >= 0) {
            let obj1 = data[specificIndex1];
            //console.log("userDataReducer?.firstName_EN", firstName);
            obj1.value_EN = firstName;
            data[specificIndex1] = obj1;
          }
          // ApplicantNameEnglish

          // ApplicantNameEnglish
          const specificIndex2 = data?.findIndex(
            (item) => item?.fieldType === "ApplicantEmail"
          );
          if (specificIndex2 >= 0) {
            let obj2 = data[specificIndex2];
            obj2.value_EN = email;
            data[specificIndex2] = obj2;
          }
          // ApplicantNameEnglish
          //console.log("specificIndex2", specificIndex2);
          //console.log("data", data);
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

          setCookies(
            "trackingInsId",
            response?.data?.data?.instructorRegistrationCode
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

  useLayoutEffect(() => {
    getCourseDetailRecordFunc(authToken);
    // return removeCookies("courseId");
  }, [step]);

  const countArrRequiredFilled =
    percentageState &&
    percentageState?.reduce((accumulator, obj) => {
      if (obj.percentage === 100) {
        return accumulator + 1;
      }

      return accumulator;
    }, 0);

  //console.log("countArrRequiredFilled", countArrRequiredFilled);

  return (
    <>
      {isAuthorized ? (
        <div className="container">
          <Head>
            <title>Riyadh Second Health Cluster</title>
            <link rel="icon" href={R2Favicon} />
          </Head>
          <body>
            <ModalComp openModal={stepLoadingState} />

            <Header
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              selectItem={selectItem}
              setSelectItem={setSelectItem}
              name={""}
            >
              <Row gutter={[15, 15]}>
                <Col span={24}>
                  <StyledIndtructorFormDiv>
                    <Row gutter={20}>
                      <Col span={24}>
                        <StyledApplyInstructorDiv>
                          <Row>
                            <Col
                              span={24}
                              md={12}
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              {isInsturctor ? (
                                <div>
                                  <h2>
                                    {your_instuctor_request} <br />{" "}
                                    {is_in_process}
                                  </h2>
                                </div>
                              ) : (
                                <div>
                                  {percentageState?.length ===
                                  countArrRequiredFilled ? (
                                    <>
                                      <h2>
                                        {application} {submitted}
                                      </h2>
                                      <p>
                                        {thank_you_submitting_application}
                                        <br />
                                        {kindly_track_progress_here}
                                      </p>
                                      <CustomButton
                                        customStyle={{
                                          paddingInline: 60,
                                          background: "#105F43",
                                          color: "#fff",
                                        }}
                                        onClick={() => {
                                          setCookies(
                                            "trackingInsId",
                                            instructorRegistrationStatusState
                                          );
                                          router.push(
                                            "/ar/instructor-track-application"
                                          );
                                        }}
                                      >
                                        {tracking_your_application}
                                      </CustomButton>
                                    </>
                                  ) : (
                                    <>
                                      <h2>
                                        {Come_teach} <br /> {with_us}
                                      </h2>
                                      <p>
                                        {Become_an_instructor_and_change} <br />{" "}
                                        {lives} — {including_your_own}
                                      </p>
                                      <CustomButton
                                        customStyle={{
                                          paddingInline: 60,
                                          background: "#105F43",
                                          color: "#fff",
                                        }}
                                        onClick={DashboardRequestForInstructor}
                                      >
                                        {Get_started}
                                      </CustomButton>
                                    </>
                                  )}
                                </div>
                              )}
                            </Col>
                            <Col
                              span={24}
                              md={12}
                              style={{ textAlign: "center" }}
                            >
                              <img loading="lazy"width="80%" src={IntroductionImage.src} />
                            </Col>
                          </Row>
                        </StyledApplyInstructorDiv>
                      </Col>
                    </Row>
                  </StyledIndtructorFormDiv>
                </Col>
              </Row>
            </Header>
          </body>
        </div>
      ) : (
        <>
          <img loading="lazy"className="pre-loader" src={Preloader.src} />
        </>
      )}
    </>
  );
};

export default Instructor;

const MainHeading = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  font-family: "GESSTwoBold";
`;
const StyledIndtructorFormDiv = styled.div`
  padding: 50px;
  background: #fff;
  border-radius: 8px;

  @media screen and (max-width: 800px) {
    padding: 30px;
  }
`;
const StyledApplyInstructorDiv = styled.div`
  h2 {
    margin-bottom: 10px;
    font-size: 40px;
    line-height: 44px;
    font-family: "GESSTwoBold";
  }
  p {
    margin-bottom: 20px;
    font-size: 16px;
    line-height: 21px;
    // font-family: "TitilliumNormal";
  }
  button {
    border-radius: 3px !important;
  }

  @media screen and (max-width: 800px) {
    h2 {
      font-size: 30px;
      line-height: 34px;
    }
    p {
      font-size: 14px;
      line-height: 18px;
    }
    img {
      margin-top: 50px;
    }
  }
`;
const StyledInput = styled(Input)`
  background: #f8f8f8;
  border: 1px solid #c1c1c1;
  border-radius: 5px;
  padding: 10px 20px;
  margin-bottom: 15px;

  :focus {
    box-shadow: none !important;
  }
`;
const StyledLabelP = styled.p`
  font-size: 14px !important;
  margin-bottom: 10px !important;
  // font-family: "TitilliumNormal", sans-serif;
  color: #000 !important;
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
const StyledAiFillEye = styled(AiFillEye)`
  font-size: 20px;
  margin-right: 10px;
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

const StyledTextarea = styled(TextArea)`
  background: #f8f8f8;
  border: 1px solid #c1c1c1;
  border-radius: 5px;
  padding: 10px 20px;
  margin-bottom: 15px;

  :focus {
    box-shadow: none !important;
  }
`;
