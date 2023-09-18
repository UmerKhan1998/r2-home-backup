import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import router from "next/router";
import { getCookies, setCookies } from "../../src/helpers/cookie";
import Preloader from "../../public/images/Preloader.gif";
import { GolderRightArrow, R2Favicon, TrainingBullet } from "../../images";
import Header from "../../src/components/rtl/adminLayoutHeader";
import { Button, Col, Input, Row, Upload } from "antd";
import styled from "styled-components";
import { AiFillEye } from "react-icons/ai";
import { ImAttachment, ImCross } from "react-icons/im";
import { useSelector } from "react-redux";
import endpoints from "../../src/api";
import TextArea from "antd/lib/input/TextArea";
import ModalComp from "../../src/components/Modal/LoaderModal";

const Instructor = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectItem, setSelectItem] = useState("/ar/scholarship");
  const userDataState = useSelector((state) => state?.userDataReducer);

  const [isInsturctor, setIsInsturctor] = useState();
  const [instructorState, setInstructorState] = useState({});
  const [
    instructorRegistrationStatusState,
    setInstructorRegistrationStatusState,
  ] = useState("");

  useLayoutEffect(() => {
    setInstructorState({
      ...instructorState,
      LMSUserId: userDataState?.id,
      FirstName_AR: userDataState?.firstName_AR,
      LastName_AR: userDataState?.lastName_AR,
      FirstName_AR: userDataState?.firstName_AR,
      LastName_AR: userDataState?.lastName_AR,
      Email: userDataState?.email,
      PhoneNumber: userDataState?.phoneNumber,
      PhotoUrl: userDataState?.photoUrl,
      BioData_AR: userDataState?.bioData_AR,
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
        authToken
      );
      //console.log("response", response);
      if (response.data.statusCode === "200") {
        // toast.success("Request Submitted!");
        router.push("/instructor-registeration-step");
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [percentageState, setPercentageState] = useState([]);
  const [
    dashboardRequestForScholarshipState,
    setDashboardRequestForScholarshipState,
  ] = useState([]);
  const [stepLoadingState, setStepLoadingState] = useState(false);

  const getCourseDetailRecordFunc = async (token) => {
    setStepLoadingState(true);
    try {
      if (token) {
        const response = await endpoints.DashboardRequestForScholarship(token);

        if (response) {
          setDashboardRequestForScholarshipState(response?.data?.data);

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
            <ModalComp
              openModal={stepLoadingState}
              // setOpenModal={setOpenModal}
              // registerationStep={registerationStep}
              // setRegisterationStep={setRegisterationStep}
              // signInState={signInState}
              // createLMSUsersFunc={createLMSUsersFunc}
              // invalidNumberState={invalidNumberState}
            />

            <Header
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              selectItem={selectItem}
              setSelectItem={setSelectItem}
              name={""}
            >
              <Row gutter={[15, 15]}>
                {/* <Col span={24}>
                                    <MainHeading>Request as an Instructor</MainHeading>
                                </Col> */}
                <Col span={24}>
                  <StyledIndtructorFormDiv>
                    {/* <Row gutter={20}>
											<Col span={12}>
												<StyledLabelP> First Name </StyledLabelP>
												<StyledInput
													type="text"
													placeholder={'First Name'}
													autoComplete={"off"}
													onChange={(e) => {}}
													value={instructorState?.FirstName_AR}
												/>
											</Col>
											<Col span={12}>
												<StyledLabelP> Last Name </StyledLabelP>
												<StyledInput
													type="text"
													placeholder={'Last Name'}
													autoComplete={"off"}
													onChange={(e) => {}}
													value={instructorState?.LastName_AR}
												/>
											</Col>
											<Col span={12}>
												<StyledLabelP> Email </StyledLabelP>
												<StyledInput
													type="text"
													placeholder={instructorState?.Email}
													autoComplete={"off"}
													onChange={(e) => {}}
													disabled
												/>
											</Col>
											<Col span={12}>
												<StyledLabelP> PhoneNumber </StyledLabelP>
												<StyledInput
													type="number"
													placeholder={instructorState?.PhoneNumber}
													autoComplete={"off"}
													onChange={(e) => {}}
													disabled
												/>
											</Col>
											<Col span={24}>
												<StyledLabelP> Bio Data </StyledLabelP>
												<StyledTextarea
													rows={5}
													placeholder="Bio Data"
													onChange={(e) => {}}
													value={instructorState?.BioData_AR}
												/>
											</Col>
											<Col span={24} style={{textAlign: "right"}}>
												<CustomButton
													customStyle={{
														paddingInline: 30,
														background: "#105F43",
														borderRadius: 8,
														color: "#fff"
													}}
													onClick={() => {}}
												>
													Submit
												</CustomButton>
											</Col>
											
										</Row> */}
                    {/* <StyledLabelP>
											Label
										</StyledLabelP> */}
                    {/* <StyledUpload
											maxCount={1}
											{...{
												name: "file",
												action:
													"https://www.google.com/",
												headers: {
													authorization:
													"authorization-text",
												},
												async onChange(info) {
													if (info.file.status !== "uploading" ) {
													//console.log("info.file", info.file);

													const getBase64 = (file) =>
														new Promise(
														(resolve, reject) => {
															const reader =
															new FileReader();
															reader.readAsDataURL(
															file
															);
															reader.onload = () =>
															resolve(
																reader.result
															);
															reader.onerror = (
															error
															) => reject(error);
														}
														);

													const blob =
														await getBase64( info.file.originFileObj );
														//console.log("info.file", blob);
													}
													if (info.file.status === "done") {
														
													} else if (info.file.status === "error") {
														
													}
												},
											}}
											>
											<Button icon={<ImAttachment />}>
												Click to Upload
											</Button>
										</StyledUpload>
										<StyledImgDivPdf>
											<img
												src={
												"https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
												}
												height={50}
												width={50}
											/>
											<CrossDiv1>
												<StyledAiFillEye
												onClick={() =>
													window.open(
													item?.value_AR,
													"blank"
													)
												}
												/>
												<StyledImCross
												onClick={() =>
													inputHandler(
													"",
													innerIndex,
													"image"
													)
												}
												/>
											</CrossDiv1>
										</StyledImgDivPdf> */}

                    <Row gutter={20}>
                      <Col span={24}>
                        <StyledApplyInstructorDiv>
                          {/* <MainHeading>Request as an Instructor</MainHeading>
													<p>Want to Apply</p>
													
													<CustomButton
														customStyle={{
															paddingInline: 50,
															background: "#105F43",
															borderRadius: 8,
															color: "#fff"
														}}
														onClick={() => {}}
													>
														Apply
													</CustomButton> */}

                          <Row>
                            <Col
                              md={24}
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <StyledCategoriesCardsDiv>
                                <StyledCategoriesCardsRow gutter={[16, 16]}>
                                  {dashboardRequestForScholarshipState?.map(
                                    (item,index) => (
                                      <Col span={12} key={index}>
                                        <StyledCategoriesCards
                                          onClick={() => {
                                            setCookies(
                                              "scholarshipId",
                                              item?.id
                                            );
                                            setCookies(
                                              "scholarshipTrackingId",
                                              item?.scholarshipRegistrationCode
                                            );
                                            if (
                                              item?.scholarshipRegistrationStatus ===
                                              true
                                            ) {
                                              router.push(
                                                "/scholarship-track-application"
                                              );
                                            } else {
                                              router.push(
                                                "/scholarship-registeration-step"
                                              );
                                            }
                                          }}
                                        >
                                          <img loading="lazy"alt={""}
                                            height={40}
                                            width={40}
                                            src={TrainingBullet}
                                          />
                                          <h1>{item?.name_AR}</h1>
                                          <img loading="lazy"alt={""}
                                            height={24}
                                            width={24}
                                            src={GolderRightArrow}
                                          />
                                        </StyledCategoriesCards>
                                      </Col>
                                    )
                                  )}
                                </StyledCategoriesCardsRow>
                              </StyledCategoriesCardsDiv>
                            </Col>
                            {/* <Col
                              md={10}
                              style={{ textAlign: "center" }}
                            >
                              <img loading="lazy"width="80%" src={IntroductionImage.src} />
                            </Col> */}
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
  font-family: "GESSTwoLight", sans-serif;
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
    font-family: "GESSTwoLight";
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
  font-family: "GESSTwoLight", sans-serif;
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
    font-size: 16px;
    font-weight: 600;
    font-family: "GESSTwoLight", sans-serif;
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

const StyledCategoriesCardsDiv = styled.div`
  width: 100%;
`;

const StyledCategoriesCardsRow = styled(Row)`
  margin-bottom: 15px;
`;
