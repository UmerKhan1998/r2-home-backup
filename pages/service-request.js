import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import styled from "styled-components";

import Hero from "../src/components/Hero";
import RequestServiceModal from "../src/components/Modal/RequestServiceModal";
import RequestOtherServiceModal from "../src/components/Modal/RequestOtherServiceModal";
import endpoints from "../src/api";
import Image from "next/image";
import Link from "next/link";

import { Breadcrumb, Button, Col, Input, Row, Select, Upload } from "antd";
import {
  AboutUsOurVision,
  CardImg,
  CustomizedPrograms,
  EducationalConsultation,
  FacultyGroup,
  FeaturedCourse1,
  FeaturedCourse2,
  FeaturedCourse3,
  FeaturedCourse4,
  GoldenFan,
  GreenLoader,
  HeadMessage,
  Internship,
  IntroductionImage,
  LatestNewsResource1,
  LatestNewsResource2,
  LatestNewsResource3,
  LearningInstituteImage,
  LeftSideDesign,
  LicenseTraining,
  OnlineEducation,
  Points,
  PostGraduateTraining,
  R2Favicon,
  Service,
  ServiceImg,
  SideDesign,
  SimulationTraining,
  StudentsTraining,
  Workshop,
} from "../images";

import CustomButton from "../src/components/Button";
import LearningInstitueServices from "../src/components/LearningInstitueServices";
import Header from "../src/components/header";
import Footer from "../src/components/footer";
import SkeletonTextPlaceholder from "../src/components/SkeletonTextPlaceholder";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { menuService } from "../src/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";
import { AiFillEye } from "react-icons/ai";
import { ImAttachment, ImCross } from "react-icons/im";
import { CloseOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { emailValidation } from "../src/helpers/EmailValidation";
import { useEffect } from "react";

const ServiceRequest = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [courseType, setCourseType] = useState("");

  const [locationId, setLocationId] = useState([]);

  const [departFlag, setDepartFlag] = useState(false);

  const [courseTrainingCategoryId, setCourseTrainingCategoryId] = useState([]);

  const [levelId, setLevelId] = useState([]);

  const [priceState, setPriceState] = useState([0, 0]);
  const [onFilterLevelCheckFilter, setOnFilterLevelCheckFilter] = useState([]);

  const [emailState, setEmailState] = useState(false);
  const [nameState, setNameState] = useState(false);
  const [phoneState, setPhoneState] = useState(false);
  const [selectServiceState, setSelectServiceState] = useState(false);
  const [selectDepartmentState, setSelectDepartmentState] = useState(false);
  const [documentState,setDocumentState] = useState(false);
  const [queryDetailState, setQueryDetailState] = useState(false);
  const [urlState, setUrlState] = useState("");

  //console.log("priceState", priceState[0]);

  const [dateFromState, setDateFromState] = useState("");

  const [dateToState, setDateToState] = useState("");

  const [locationState, setLocationState] = useState();
  const [checkFilter, setCheckFilter] = useState([]);
  const [checkFilter1, setCheckFilter1] = useState([]);
  const [
    courseTrainingMasterCategoryIdState,
    setCourseTrainingMasterCategoryIdState,
  ] = useState([]);

  const [onFilterCategoryCheckFilter, setOnFilterCategoryCheckFilter] =
  useState([]);

  const FeaturedCoursesCarousalData = [
    {
      image: CardImg,
      featured_type: "Dental Esthetics",
      enrolled_students: 32,
      course_name: "Anesthesiology",
      time: "1 hours 30 minutes",
      rating: 4.9,
      total_ratings: 8,
      price: 35.0,
      onSite: false,
      onLine: true,
    },
    {
      image: CardImg,
      featured_type: "Dental Esthetics",
      enrolled_students: 32,
      course_name: "Anesthesiology",
      time: "1 hours 30 minutes",
      rating: 4.9,
      total_ratings: 8,
      price: 0,
      onSite: false,
      onLine: true,
    },
    {
      image: CardImg,
      featured_type: "Oral Surgery",
      enrolled_students: 32,
      course_name: "Anesthesiology",
      time: "1 hours 30 minutes",
      rating: 4.9,
      total_ratings: 8,
      price: 35.0,
      onSite: false,
      onLine: true,
    },
    {
      image: CardImg,
      featured_type: "Dental Esthetics",
      enrolled_students: 32,
      course_name: "Anesthesiology",
      time: "1 hours 30 minutes",
      rating: 4.9,
      total_ratings: 8,
      price: 0,
      onSite: false,
      onLine: true,
    },
    {
      image: CardImg,
      featured_type: "Dental Esthetics",
      enrolled_students: 32,
      course_name: "Anesthesiology",
      time: "1 hours 30 minutes",
      rating: 4.9,
      total_ratings: 8,
      price: 35.0,
      onSite: false,
      onLine: true,
    },
    {
      image: CardImg,
      featured_type: "Dental Esthetics",
      enrolled_students: 32,
      course_name: "Anesthesiology",
      time: "1 hours 30 minutes",
      rating: 4.9,
      total_ratings: 8,
      price: 0,
      onSite: false,
      onLine: true,
    },
    {
      image: CardImg,
      featured_type: "Dental Esthetics",
      enrolled_students: 32,
      course_name: "Anesthesiology",
      time: "1 hours 30 minutes",
      rating: 4.9,
      total_ratings: 8,
      price: 0,
      onSite: false,
      onLine: true,
    },
    {
      image: CardImg,
      featured_type: "Dental Esthetics",
      enrolled_students: 32,
      course_name: "Anesthesiology",
      time: "1 hours 30 minutes",
      rating: 4.9,
      total_ratings: 8,
      price: 35.0,
      onSite: false,
      onLine: true,
    },
    {
      image: CardImg,
      featured_type: "Dental Esthetics",
      enrolled_students: 32,
      course_name: "Anesthesiology",
      time: "1 hours 30 minutes",
      rating: 4.9,
      total_ratings: 8,
      price: 0,
      onSite: false,
      onLine: true,
    },
    {
      image: CardImg,
      featured_type: "Dental Esthetics",
      enrolled_students: 32,
      course_name: "Anesthesiology",
      time: "1 hours 30 minutes",
      rating: 4.9,
      total_ratings: 8,
      price: 35.0,
      onSite: false,
      onLine: true,
    },
  ];

  const whatWeOfferArr = [
    {
      img: Service,
      title: "Service 01",
    },
    {
      img: Service,
      title: "Service 02",
    },
    {
      img: Service,
      title: "Service 03",
    },
    {
      img: Service,
      title: "Service 04",
    },
    {
      img: Service,
      title: "Service 05",
    },
    {
      img: Service,
      title: "Service 06",
    },
  ];

  const [dataState, setDataState] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCourseTrainingCategoryFunc = async () => {
    try {
      setLoading(true);
      // if (token && menuId) {
      // //console.log('menuId', menuId, token)
      const response = await endpoints
        .GetRequestaServiceLov
        // token,
        // menuId,
        // PageSize,
        // PageNo,
        // Language,
        // Search,
        ();
      if (response) {
        //console.log("response", response);
        setDataState(response?.data?.data);
        setLoading(false);
      }
      // setTotalPaginationRecord(response?.data?.data?.totalRecord)
      // setDataState(response?.data?.data?.taxListViewModels)
      // setGetTaxState(response?.data?.data)
      setLoading(true);
    } catch (err) {
      //console.log("err", err);
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    getCourseTrainingCategoryFunc();
  }, []);

  const [dropdownCaretState, setDropdownCaretState] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [modalOtherState, setModalOtherState] = useState(false);
  const [selectService, setSelectService] = useState("");
  const [selectServiceId, setSelectServiceId] = useState("");

  const serviceEntity=useSelector(state=>state?.menuServiceReducer)
  const emailEntity=useSelector(state=>state)

  const initialState = {
    your_name: emailEntity?.userDataReducer?.firstName_EN + " " + emailEntity?.userDataReducer?.lastName_EN,
    your_email: emailEntity?.userDataReducer?.email,
    select_service: serviceEntity&&serviceEntity?.serviceName,
    service_id: serviceEntity&&serviceEntity?.serviceId,

    select_dept: emailEntity&&emailEntity?.menuServiceReducer?.departmentName,
    service_deptId: emailEntity&&emailEntity?.menuServiceReducer?.departmentId,
    
    number: emailEntity?.userDataReducer?.phoneNumber,
    query_detail: "",
    supporting_doc: "",
  };
  const [supportState, setSupportState] = useState(initialState);

  const inputHandler = (e) =>
    setSupportState({
      ...supportState,
      [e.target.name]: e.target.value,
    });

  useLayoutEffect(() => {
    setSupportState({
      ...supportState,
      your_name: emailEntity?.userDataReducer?.firstName_EN + " " + emailEntity?.userDataReducer?.lastName_EN,
      your_email: emailEntity?.userDataReducer?.email,
      select_service: serviceEntity&&serviceEntity?.serviceName,
      service_id: serviceEntity&&serviceEntity?.serviceId,

      select_dept: emailEntity&&emailEntity?.menuServiceReducer?.departmentName,
      service_deptId: emailEntity&&emailEntity?.menuServiceReducer?.departmentId,
    
      number: emailEntity?.userDataReducer?.phoneNumber,
      query_detail: "",
      supporting_doc: "",
    });
    if(serviceEntity?.serviceId!==""){
      setModalState(true)
    }
  }, [serviceEntity]);

  const [loadingState, setLoadingState] = useState(false);
  // console.log("loadingState", loadingState);

  const contactUsFunc = async (data) => {
    setLoadingState(true);

    try {
      const obj = {
        Attachment: data?.supporting_doc,
        Name: data?.your_name,
        Email: data?.your_email,
        ServiceId: selectServiceId?selectServiceId:supportState?.service_id,
        QueryDetail: data?.query_detail,
        ServiceName: selectService?selectService:supportState?.select_service,
        ContactNumber: data?.number,
      };
      //console.log("rmsObj", obj, token);

      const response = await endpoints.RequestAsAService(obj);
      if (response) {
        setLoadingState(false);
        // setRmsFeedbackState({ ...rmsFeedbackState, image: "", feedback: "" });
        // setPaymentResubmitState();
        toast.success("Thank you so much for submitting the Form. Our team will get back to you on given email address as soon as possible.");
        setSupportState({
          ...supportState,
          your_name: "",
          your_email: emailEntity?.userDataReducer?.email,
          select_service: "",
          service_id: "",
          number: "",
          query_detail: "",
          supporting_doc: "",
        });
        setModalState(false);
        setModalOtherState(false);
        setEmailState(false);
        setNameState(false);
        setPhoneState(false);
        setDocumentState(false);
        setSelectServiceState(false);
        setSelectDepartmentState(false);
        setQueryDetailState(false);
        setUrlState("");
      }
    } catch (err) {
      setLoadingState(false);
    }
};

  const [HeroLoading, setHeroLoading] = useState(true);
  const [getAllRequestaServiceLovState, setGetAllRequestaServiceLovState] = useState([]);

  const GetSliders = async (DepartmentId) => {
    setHeroLoading(true);
    try {
      // if (token && menuId) {
      const response = await endpoints.GetAllRequestaServiceLov(DepartmentId);
      if (response) {
        setGetAllRequestaServiceLovState(response?.data?.data)
        setHeroLoading(false);
      }
    } catch (err) {
      //console.log("err", err);
      setHeroLoading(false);
    }
  };

  const [GetStaticPagesState, setGetStaticPagesState] = useState();
  const GetStaticPages = async () => {
    try {
      const response = await endpoints.GetStaticPages("service-request");
      if (response?.data?.statusCode === "200") {
        setGetStaticPagesState(response?.data?.data);
      } else if (response?.data?.statusCode === "404") {
        router.push('/')
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const [emailValidationState, setEmailValidationState] = useState("");

  useEffect(() => {
    if (emailState) {
      setEmailValidationState(emailValidation(supportState?.your_email));
    }
  },[emailValidationState, supportState])

  useLayoutEffect(()=>{
    if(modalState){
      document.body.style.overflow = "hidden";
    }else{
      document.body.style.overflow = "visible";
    }
  },[modalState])

  const [getDepartmentLovState,setGetDepartmentLovState]=useState()
  // console.log('getDepartmentLovState',getDepartmentLovState)

  const [getDepartmentLovLoadingState,setGetDepartmentLovLoadingState]=useState(false)

    const GetDepartmentLovFunc = async () => {
    setGetDepartmentLovLoadingState(true);
    try {
        const response = await endpoints.GetDepartmentLov("");
        if (response) {
          setGetDepartmentLovState(response?.data?.data);
          setGetDepartmentLovLoadingState(false);
        }
    } catch (err) {
      setGetDepartmentLovLoadingState(false);
    }
  };

  useLayoutEffect(()=>{
    GetStaticPages()
    GetDepartmentLovFunc()
  },[])

  useLayoutEffect(() => {
    if(departFlag){
      GetSliders(getDepartmentLovState?.find(item=>item?.name_EN===supportState?.select_dept)?.id);
    }
  }, [supportState]);

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
          setCheckFilter={setCheckFilter}
          setCourseTrainingMasterCategoryIdState={
            setCourseTrainingMasterCategoryIdState
          }
          setOnFilterCategoryCheckFilter={setOnFilterCategoryCheckFilter}
          setCourseTrainingCategoryId={setCourseTrainingCategoryId}
          setOnFilterLevelCheckFilter={setOnFilterLevelCheckFilter}
          setLevelId={setLevelId}
          setPriceState={setPriceState}
          setDateFromState={setDateFromState}
          setDateToState={setDateToState}
          setLocationState={setLocationState}
          setLocationId={setLocationId}
          setCourseType={setCourseType}        
          setModalState={setModalState}
          />

{modalState && (
        <StyledDiv>
          <div
            className="modalBg"
            onClick={() => {
              setModalState(false);
              setEmailState(false);
              setNameState(false);
              setPhoneState(false);
              setSelectServiceState(false);
              setSelectDepartmentState(false);
              setQueryDetailState(false);
              setDocumentState(false);
              // dispatch(menuService({serviceId:"", serviceName:""}))
              dispatch(menuService({departmentId:"", departmentName:"", serviceId:"", serviceName:""}))
              setSupportState({
                ...supportState,
                your_name: "",
                your_email: "",
                select_service: "",
                service_id: "",
                number: "",
                query_detail: "",
                supporting_doc: "",
              });
            }}
          ></div>
          <ModalDiv>
            {/* {successMessageState !== "" ? (
              <Alert
                message="Success"
                description="Thank you so much for taking your time to contact us. Our
                      team will get back to you as soon as possible"
                type="success"
                showIcon
              />
            ) : ( */}
            <ConstenDiv>
              <>
                <StyledRequestServiceRow>
                  <h1>Request a Service</h1>
                  <StyledCloseOutlined             onClick={() => {
              setModalState(false);
              setEmailState(false);
              setNameState(false);
              setPhoneState(false);
              setDocumentState(false);
              setSelectServiceState(false);
              setSelectDepartmentState(false);
              setQueryDetailState(false);
              // dispatch(menuService({serviceId:"", serviceName:""}))
              dispatch(menuService({departmentId:"", departmentName:"", serviceId:"", serviceName:""}))
              setSupportState({
                ...supportState,
                your_name: "",
                your_email: "",
                select_service: "",
                service_id: "",
                number: "",
                query_detail: "",
                supporting_doc: "",
              });
            }} />
                </StyledRequestServiceRow>
                <p>
                  Please fill in the form below, and our team will respond
                  accordingly for your selected service
                </p>

                <Row gutter={[16, 8]}>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <StyledFlexLabelDiv>
                      <RequiredP>*</RequiredP>
                      <StyledLabelP>Name</StyledLabelP>
                    </StyledFlexLabelDiv>
                    <StyledInput
                      placeholder="Your Name"
                      name="your_name"
                      onChange={inputHandler}
                      value={supportState?.your_name!=='undefined undefined'?supportState?.your_name:""}
                      onBlur={() => setNameState(true)}
                      maxLength={500}
                    />
                    {nameState && (
                      <>
                        {(supportState?.your_name?.trim() === "undefined undefined"||supportState?.your_name?.trim() === "") && (
                          <StyledErrorP>Name is Mandatory</StyledErrorP>
                        )}
                      </>
                    )}
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <StyledFlexLabelDiv>
                      <RequiredP>*</RequiredP>
                      <StyledLabelP>Email</StyledLabelP>
                    </StyledFlexLabelDiv>
                    <StyledInput
                      placeholder="Your Email"
                      name="your_email"
                      onChange={inputHandler}
                      onBlur={() => setEmailState(true)}
                      value={supportState?.your_email}
                      maxLength={500}
                    />
                    <>
                        {emailValidationState === "Invalid Email" ? (
                          <StyledErrorP>Invalid Email</StyledErrorP>
                          ) : (
                            <>
                            {emailState&&(supportState?.your_email?.trim() === ""||supportState?.your_email?.trim() === undefined) && (
                            <>
                              <StyledErrorP>Email is Mandatory</StyledErrorP>
                          </>
                            )}
                          </>
                        )}
                      </>
                  </Col>

                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <StyledFlexLabelDiv>
                      <RequiredP>*</RequiredP>
                      <StyledLabelP>Selected Department</StyledLabelP>
                    </StyledFlexLabelDiv>
                    <StyledSelect
                      value={supportState?.select_dept}
                      disabled
                      style={{
                        width: 120,
                      }}
                      onBlur={() => setSelectDepartmentState(true)}

                      onChange={(value) =>
                        setSupportState({
                          ...supportState,
                          number: selectService,
                        })
                      }
                      options={[
                        {
                          value: "jack",
                          label: "Jack",
                        },
                      ]}
                    />
                    {selectDepartmentState&&
                     <>
                     {supportState?.select_dept?.trim() === "" && (
                       <StyledErrorP>Department is Mandatory</StyledErrorP>
                     )}
                   </>
                    }
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <StyledFlexLabelDiv>
                      <RequiredP>*</RequiredP>
                      <StyledLabelP>Selected Service</StyledLabelP>
                    </StyledFlexLabelDiv>
                    <StyledSelect
                      value={supportState?.select_service}
                      disabled
                      style={{
                        width: 120,
                      }}
                      onBlur={() => setSelectServiceState(true)}

                      onChange={(value) =>
                        setSupportState({
                          ...supportState,
                          number: selectService,
                        })
                      }
                      options={[
                        {
                          value: "jack",
                          label: "Jack",
                        },
                      ]}
                    />
                    {selectServiceState&&
                     <>
                     {supportState?.select_service?.trim() === "" && (
                       <StyledErrorP>Service is Mandatory</StyledErrorP>
                     )}
                   </>
                    }
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <StyledFlexLabelDiv>
                      <RequiredP>*</RequiredP>
                      <StyledLabelP>Contact Number</StyledLabelP>
                    </StyledFlexLabelDiv>
                    <StyledInputNumber
                      country={"sa"}
                      value={supportState?.number}
                      onBlur={() => setPhoneState(true)}
                      onChange={(phone) =>
                        setSupportState({ ...supportState, number: phone })
                      }
                    />
                    {phoneState && (
                      <>
                        {supportState?.number?.trim() === undefined ? (
                          <StyledErrorP>Phone number is Mandatory</StyledErrorP>
                        ):(
                          <>
                            {(supportState?.number?.slice(0, 1) === "0"||supportState?.number?.length<10) && (
                              <StyledErrorP>Enter valid number</StyledErrorP>
                            )}
                          </>
                        )} 
                      </>
                    )}
                  </Col>

                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <StyledFlexLabelDiv>
                      <RequiredP>*</RequiredP>
                      <StyledLabelP>Add Supporting Document</StyledLabelP>
                    </StyledFlexLabelDiv>
                    {supportState?.supporting_doc === "" ? (
                      <StyledUpload
                        maxCount={1}
                        {...{
                          name: "file",
                          action:
                            "https://www.google.com/",
                          headers: {
                            authorization: "authorization-text",
                          },
                          async onClick(){
                            setDocumentState(true);
                          },
                          async onChange(info) {
                            //console.log("info", info?.file?.type);
                            setDocumentState(true);
                            if (info.file.status !== "uploading") {
                              if (info?.file?.size < 5000000) {
                                if (
                                  info?.file?.type === "image/jpeg" ||
                                  info?.file?.type === "image/png" ||
                                  info?.file?.type === "application/pdf" ||
                                  info?.file?.type === "image/svg+xml"
                                ) {
                                  const getBase64 = (file) =>
                                    new Promise((resolve, reject) => {
                                      const reader = new FileReader();
                                      reader.readAsDataURL(file);
                                      reader.onload = () =>
                                        resolve(reader.result);
                                      reader.onerror = (error) => reject(error);
                                    });

                                  const blob = await getBase64(
                                    info.file.originFileObj
                                  );
                                  setUrlState(blob);
                                  setSupportState({
                                    ...supportState,
                                    supporting_doc: info.file.originFileObj,
                                  });
                                  // inputHandler(blob, innerIndex, "image");
                                } else {
                                  toast.error(
                                    "File type should be in JPG, PNG, PDF type"
                                  );
                                }
                              } else {
                                toast.error("File size must be less than 5MB");
                              }
                            }
                            if (info.file.status === "done") {
                              // setEditIndexState(121098021098);
                            } else if (info.file.status === "error") {
                              // setEditIndexState(121098021098);
                            }
                          },
                        }}
                      >
                        <Button icon={<ImAttachment />}>Click to Upload</Button>
                      </StyledUpload>
                    ) : (
                      <StyledImgDiv>
                        {urlState?.slice(17, 20) ===
                        "pdf" ? (
                          <StyledImgDivPdf>
                            <img
                              src={
                                "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
                              }
                              height={50}
                              width={50}
                            />
                            <CrossDiv1>
                              {/* <StyledAiFillEye
                                onClick={() =>
                                  window.open(
                                    supportState?.supporting_doc,
                                    "blank"
                                  )
                                }
                              /> */}
                              <StyledImCross
                                onClick={() =>
                                  setSupportState({
                                    ...supportState,
                                    supporting_doc: "",
                                  })
                                }
                              />
                            </CrossDiv1>
                          </StyledImgDivPdf>
                        ) : (
                          <>
                            <img
                              src={urlState}
                              height={50}
                              width={50}
                            />
                            <CrossDiv1>
                              {/* <StyledAiFillEye
                                onClick={() =>
                                  window.open(
                                    supportState?.supporting_doc,
                                    "blank"
                                  )
                                }
                              /> */}
                              <StyledImCross
                                onClick={() =>
                                  setSupportState({
                                    ...supportState,
                                    supporting_doc: "",
                                  })
                                }
                              />
                            </CrossDiv1>
                          </>
                        )}
                      </StyledImgDiv>
                    )}
                     {documentState&& (
                      <>
                        {supportState?.supporting_doc === "" && (
                          <StyledErrorP>Supporting Document is Mandatory</StyledErrorP>
                        )}
                      </>
                    )}
                  </Col>
                  <Col xl={24} lg={12} md={12} sm={24} xs={24}>
                    <StyledFlexLabelDiv>
                      <RequiredP>*</RequiredP>
                      <StyledLabelP>Query Detail</StyledLabelP>
                    </StyledFlexLabelDiv>
                    <StyledTextarea
                      rows={3}
                      placeholder="Enter your query detail"
                      name="query_detail"
                      onChange={inputHandler}
                      value={supportState?.query_detail}
                      onBlur={() => setQueryDetailState(true)}
                      maxLength={500}
                    />
                                        {queryDetailState && (
                      <>
                        {supportState?.query_detail?.trim() === "" && (
                          <StyledErrorP>Query detail is Mandatory</StyledErrorP>
                        )}
                      </>
                    )}
                  </Col>
                </Row>

                {emailValidationState !== "Invalid Email" &&
                // !loading &&
                supportState?.your_name !== "" &&
                supportState?.your_email !== "" &&
                // supportState?.select_service !== "" &&
                supportState?.number !== "" &&
                supportState?.number?.length>9 &&
                supportState?.number?.slice(0, 1) !== "0"&&
                supportState?.query_detail !== "" &&
                supportState?.supporting_doc !== "" ? (
                  <>
                  {loadingState?
                  <>
                  <CustomButton
                            customStyle={{
                              paddingInline: 30,
                              background: "#E0E0E0",
                              borderRadius: 8,
                              color: "#fff",
                              display: "flex",
                              alignItems: "center",
                              cursor: "not-allowed",
                      marginTop: 20,
                    }}
                          >
                            Submit &nbsp;
                            <Image alt={""} src={GreenLoader} height={20} width={20} />
                          </CustomButton></>
                :  
                  <CustomButton
                    customStyle={{
                      background: "#105F43",
                      color: "#fff",
                      width: 170,
                      marginTop: 20,
                    }}
                    onClick={() => contactUsFunc(supportState)}
                  >
                    Submit
                  </CustomButton>
                }

                  </>
                ) : (
                  <CustomButton
                    customStyle={{
                      background: "rgb(224, 224, 224)",
                      color: "#fff",
                      width: 170,
                      marginTop: 20,
                    }}
                    // onClick={() => contactUsFunc(supportState)}
                  >
                    Submit
                  </CustomButton>
                )}
              </>
            </ConstenDiv>
            {/* )} */}
          </ModalDiv>
        </StyledDiv>
      )}
       
        <RequestOtherServiceModal
          openModal={modalOtherState}
          modalOtherState={modalOtherState}
          setOpenModal={setModalOtherState}
          inputHandler={inputHandler}
          supportState={supportState}
          setSupportState={setSupportState}
          selectService={selectService}
          contactUsFunc={contactUsFunc}
          getAllRequestaServiceLovState={getAllRequestaServiceLovState}
          loadingState={loadingState}
          setDepartFlag={setDepartFlag}
          
          setDocumentState={setDocumentState}
          documentState={documentState}
          setEmailState={setEmailState}
          emailState={emailState}
          setNameState={setNameState}
          nameState={nameState}
          setPhoneState={setPhoneState}
          setSelectServiceState={setSelectServiceState}
          selectServiceState={selectServiceState}
          setSelectDepartmentState={setSelectDepartmentState}
          selectDepartmentState={selectDepartmentState}
          phoneState={phoneState}
          setQueryDetailState={setQueryDetailState}
          queryDetailState={queryDetailState}
          setUrlState={setUrlState}
          urlState={urlState}

          getDepartmentLovState={getDepartmentLovState}
        />
        <div onClick={() => setDropdownCaretState(false)}>
          {GetStaticPagesState?.contentValue &&
            Object.values(JSON.parse(GetStaticPagesState?.contentValue))?.map(
              (data, index) => (
                <>
                  {data["type"] === "top_banner" && (<>
                    <div key={index}>
                      <Hero 
                        name={"service-request"}
                        title={data?.content?.title_en}
                        background_color={data?.content?.background_color}
                      />
                    </div>
                  </>)}
                </>
              )
            )
          }

          <SideDesignDiv>
            <img src={SideDesign} />
          </SideDesignDiv>

          {/* Breadcrumb */}
          <MainBreadcrumbDiv>
            <Container>
              <BreadcrumbDiv>
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <Link href={"/"}>Home</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>Request a service</Breadcrumb.Item>
                </Breadcrumb>
              </BreadcrumbDiv>
            </Container>
          </MainBreadcrumbDiv>

          {GetStaticPagesState?.contentValue &&
            Object.values(JSON.parse(GetStaticPagesState?.contentValue))?.map(
              (data,index) => (
                <>
                  {data["type"] === "goals_objective" && (<>
                    <MainWhatWeofferingDivSection key={index}>
                      <Container>
                        <WhatWeofferingDivSection style={{paddingBottom: "0"}}>
                          <WhatWeOfferingCol xl={12} lg={12} md={24} sm={24} xs={24}>
                            <h3><b>{data?.content?.description_en}</b></h3>
                            <ul>
                              {data?.content?.lists?.map((item, index)=>(<>
                                {item?.text_en !== '' && (
                                  <li key={index}>{item?.text_en}</li>
                                )}
                              </>))}
                            </ul>
                          </WhatWeOfferingCol>
                        </WhatWeofferingDivSection>
                      </Container>
                    </MainWhatWeofferingDivSection>
                  </>)}
                </>
              )
            )
          }

          {GetStaticPagesState?.contentValue &&
            Object.values(JSON.parse(GetStaticPagesState?.contentValue))?.map(
              (data,index) => (
                <div key={index}>
                  {data["type"] === "text_with_image" && (<>
                  <MainWhatWeofferingDivSection>
                    {data["content"]?.align === "right" && (
                      <Container>
                        <WhatWeofferingDivSection style={{paddingTop: "20px"}}>
                          <WhatWeOfferingRow gutter={[48, 48]}>
                            <WhatWeOfferingCol xl={12} lg={24} md={24} sm={24} xs={24}>
                              <div>
                                <Row gutter={[28, 28]}>
                                  {dataState?.length > 0 ? (
                                    <>
                                      {dataState?.map((item, index) => (
                                        <Col
                                          xl={12}
                                          lg={12}
                                          md={12}
                                          sm={12}
                                          xs={24}
                                          key={index}
                                        >
                                          <WhatWeOfferCardsDiv
                                            onClick={() => {
                                              setModalState(true);
                                    // setSelectService(item?.title_EN);
                                    // setSelectServiceId(item?.id);
                                    
                                    dispatch(menuService({departmentId:item?.departmentId?.trim(), departmentName:item?.departmentName_EN?.trim(), serviceId:item?.id?.trim(), serviceName:item?.title_EN?.trim()}))
                                    // dispatch(menuService({serviceId:item?.id?.trim(), serviceName:item?.title_EN?.trim()}))
                                            }}
                                          >
                                            {item?.imageUrl!==""&&
                                            <img
                                            height={60}
                                              width={60}
                                              src={item?.imageUrl}
                                            />
                                          }
                                            <h3>{item?.title_EN}</h3>
                                          </WhatWeOfferCardsDiv>
                                        </Col>
                                      ))}
                                    </>
                                  ) : (
                                    <>
                                      {whatWeOfferArr?.map((item, index) => (
                                        <Col xl={12} lg={12} md={12} sm={12} xs={24} key={index}>
                                          <WhatWeOfferCardsDivSkeleton>
                                            <SkeletonTextPlaceholder
                                              height={"50px"}
                                              width={"50px"}
                                              borderRadius={"100%"}
                                            />
                                            <h3>
                                              <SkeletonTextPlaceholder
                                                height={"15px"}
                                                width={"80px"}
                                              />
                                            </h3>
                                          </WhatWeOfferCardsDivSkeleton>
                                        </Col>
                                      ))}
                                    </>
                                  )}
                                </Row>
                              </div>
                              <div className="request-pDiv">
                                <h3><b>{data?.content?.description_en}</b></h3>
                                {/* <p>Contact us here and we will get back to you</p> */}
                              </div>
                                {data?.content?.button_en !== "" && (
                                  <CustomButton
                                    customStyle={{
                                      background: "#105F43",
                                      color: "#fff",
                                      paddingInline: 30,
                                      cursor: "pointer",
                                    }}
                                    onClick={() => setModalOtherState(true)}
                                  >
                                    {data?.content?.button_en}
                                  </CustomButton>
                                )}
                            </WhatWeOfferingCol>
                            <WhatWeOfferingCol xl={12} lg={24} md={24} sm={24} xs={24}>
                              {data?.content?.image !== "" && (
                                <Image alt={""} height={400} width={700} src={data?.content?.image} />
                              )}

                              {/* <img loading="lazy"className="service-bg" src={ServiceImg} /> */}
                            </WhatWeOfferingCol>
                          </WhatWeOfferingRow>
                        </WhatWeofferingDivSection>
                      </Container>
                    )}
                    {data["content"]?.align === "left" && (
                      <Container>
                        <WhatWeofferingDivSection>
                          <WhatWeOfferingRow gutter={[48, 48]}>
                            <WhatWeOfferingCol xl={12} lg={24} md={24} sm={24} xs={24}>
                              {data?.content?.image !== "" && (
                                <Image alt={""} height={400} width={700} src={data?.content?.image} />
                              )}

                              {/* <img loading="lazy"className="service-bg" src={ServiceImg} /> */}
                            </WhatWeOfferingCol>
                            <WhatWeOfferingCol xl={12} lg={24} md={24} sm={24} xs={24}>
                              <div>
                                <Row gutter={[28, 28]}>
                                  {dataState?.length > 0 ? (
                                    <>
                                      {dataState?.map((item, index) => (
                                        <Col
                                          xl={12}
                                          lg={12}
                                          md={12}
                                          sm={12}
                                          xs={24}
                                          key={index}
                                        >
                                          <WhatWeOfferCardsDiv
                                            onClick={() => {
                                              setModalState(true);
                                    // setSelectService(item?.title_EN);
                                    // setSelectServiceId(item?.id);
                                    // dispatch(menuService({serviceId:item?.id?.trim(), serviceName:item?.title_EN?.trim()}))
                                    dispatch(menuService({departmentId:process.env.NEXT_PUBLIC_LEARNING_INSTITUTE_DEPARTMENT_ID, departmentName:process.env.NEXT_PUBLIC_LEARNING_INSTITUTE_DEPARTMENT_NAME, serviceId:item?.id?.trim(), serviceName:item?.title_EN?.trim()}))
                                            }}
                                          >
                                            {item?.imageUrl!==""&&
                                            <img
                                              height={60}
                                              width={60}
                                              src={item?.imageUrl}
                                            />
                                          }
                                          <h3>{item?.title_EN}</h3>
                                          </WhatWeOfferCardsDiv>
                                        </Col>
                                      ))}
                                    </>
                                  ) : (
                                    <>
                                      {whatWeOfferArr?.map((item, index) => (
                                        <Col xl={12} lg={12} md={12} sm={12} xs={24} key={index}>
                                          <WhatWeOfferCardsDivSkeleton>
                                            <SkeletonTextPlaceholder
                                              height={"50px"}
                                              width={"50px"}
                                              borderRadius={"100%"}
                                            />
                                            <h3>
                                              <SkeletonTextPlaceholder
                                                height={"15px"}
                                                width={"80px"}
                                              />
                                            </h3>
                                          </WhatWeOfferCardsDivSkeleton>
                                        </Col>
                                      ))}
                                    </>
                                  )}
                                </Row>
                              </div>
                              <div className="request-pDiv">
                                <h3><b>{data?.content?.description_en}</b></h3>
                                {/* <p>Contact us here and we will get back to you</p> */}
                              </div>
                                {data?.content?.button_en !== "" && (
                                  <CustomButton
                                    customStyle={{
                                      background: "#105F43",
                                      color: "#fff",
                                      paddingInline: 30,
                                      cursor: "pointer",
                                    }}
                                    onClick={() => setModalOtherState(true)}
                                  >
                                    {data?.content?.button_en}
                                  </CustomButton>
                                )}
                            </WhatWeOfferingCol>
                          </WhatWeOfferingRow>
                        </WhatWeofferingDivSection>
                      </Container>
                    )}
                  </MainWhatWeofferingDivSection>
                  </>)}
                </div>
              )
            )
          }

          <Footer />
        </div>
      </body>
    </div>
  );
};

export default ServiceRequest;

const BreadcrumbDiv = styled.div`
@media(min-width:992px){
  padding: 20px 70px;
}
  @media(max-width:991px){
    padding: 20px 30px;
  }
  // border-bottom: 1px solid #dddddd;
`;

const LeftSideDesignDiv = styled.div`
  position: absolute;
  display: flex;
  justify-content: start;
  width: 100%;
  z-index: 99;
  height: 650px;
  img {
  width: 100%;
  margin-top: 50px;
  }
`;

const AssociateCardSection = styled.div`
  padding: 80px 77px;
`;

const AssociateCardDiv = styled.div`
  background: rgba(168, 126, 51, 0.06);
  padding: 35px;
  border-radius: 9px;
  h1 {
    font-family: "TitilliumBold", sans-serif;
    // font-weight: 700;
    font-size: 30px;
    line-height: 46px;
    color: #105f43;
    margin-block: 14px;
  }
  p {
    line-height: 28px;
  }
`;

const AssociateCardRow = styled(Row)``;

const AssociateCardCol = styled(Col)``;

const AboutSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 1200px) {
    height: 750px !important;
  }
  @media (max-width: 1199px) {
    height: 700px !important;
  }
`;

const FacultySection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 1200px) {
    height: 750px !important;
  }
  @media (max-width: 1199px) {
    height: 700px !important;
  }
`;

const StyledAboutSectionRow = styled(Row)`
  display: flex;
  justify-content: center;
  padding-inline: 70px;
  margin-top: 30px;
  margin-left: 0px !important;
  margin-right: 0px !important;
  @media (max-width: 1199px) {
    margin-inline: 8%;
    margin-top: 0px;
  }
`;

const StyledColImg = styled(Col)`
  display: flex;
  justify-content: start;
  align-items: center;
  img {
    height: 510px;
    margin-top: -30px;
    object-fit: cover;
  }
  @media (max-width: 1199px) {
    img {
      height: 250px;
      margin-top: 0px;
    }
  }
`;

const StyledColFacultyImg = styled(Col)`
  display: flex;
  justify-content: end;
  align-items: center;
  img {
    height: 510px;
    margin-top: -30px;
    object-fit: cover;
  }
  @media (max-width: 1199px) {
    img {
      height: 250px;
      margin-top: 0px;
    }
  }
`;

const AboutUsContentCol = styled(Col)`
  flex-direction: column;
  display: flex;
  justify-content: center;

  p {
    font-size: 16px;
    margin-bottom: 10px;
    line-height: 28px !important;
    color: #636363;
  }
  h1 {
    font-size: 40px;
    // font-weight: 700;
    line-height: 46px;
    color: #105f43;
  }
  h3 {
    font-weight: 400;
    font-size: 22px;
    line-height: 34px;
    color: #000000;
  }
  @media (max-width: 991px) {
    h1 {
      font-size: 30px;
      // font-weight: 700;
      line-height: 36px;
      color: #105f43;
    }
  }
`;

const MessageSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(16, 95, 67, 0.05);
  @media (min-width: 1200px) {
    height: 660px !important;
  }
  @media (max-width: 1199px) {
    height: 700px !important;
  }
`;

const StyledMessageSectionRow = styled(Row)`
  display: flex;
  justify-content: center;
  padding-inline: 70px;
  margin-top: 30px;
  margin-left: 0px !important;
  margin-right: 0px !important;
  @media (max-width: 1199px) {
    margin-inline: 8%;
    margin-top: 0px;
  }
`;

const StyledColMessageImg = styled(Col)`
  display: flex;
  justify-content: end;
  align-items: center;
  img {
    height: 510px;
    margin-top: -30px;
    object-fit: cover;
  }
  @media (max-width: 1199px) {
    img {
      height: 250px;
      margin-top: 0px;
    }
  }
`;

const MessageContentCol = styled(Col)`
  flex-direction: column;
  display: flex;
  justify-content: center;

  p {
    font-size: 16px;
    margin-bottom: 10px;
    line-height: 28px !important;
    color: #636363;
  }
  h1 {
    font-size: 40px;
    // font-weight: 700;
    line-height: 46px;
    color: #105f43;
  }
  h3 {
    font-weight: 400;
    font-size: 22px;
    line-height: 34px;
    color: #000000;
  }
  @media (max-width: 991px) {
    h1 {
      font-size: 30px;
      // font-weight: 700;
      line-height: 36px;
      color: #105f43;
    }
  }
`;

const GoalsAndObjectivesSection = styled.div`
  padding: 80px 80px 0;
  h1 {
    font-size: 40px;
    // font-weight: 700;
    line-height: 46px;
    color: #105f43;
  }
  p {
    color: #636363;
    line-height: 28px;
    font-weight: 400;
    font-size: 16px;
  }
`;

const PointsDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 14px;

  p {
    margin-bottom: 0px;
    margin-left: 12px;
    font-size: 16px;
  }
`;

const PointsRow = styled(Row)`
  padding-inline: 20px;
`;

const MainBreadcrumbDiv = styled.div`
  border-bottom: 1px solid #dddddd;
  position: relative;
  z-index: 2;
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
    min-width: 1160px;
  }

  @media only screen and (min-width: 1259px) and (max-width: 1359px) {
    min-width: 1260px;
  }

  @media (min-width: 1342px) {
    min-width: 1260px;
  }
`;

const SideDesignDiv = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
  width: 100%;
  // z-index: 99;
  height: 580px;
`;

const MainWhatWeofferingDivSection = styled.div``;

const WhatWeofferingDivSection = styled.div`
  @media (min-width: 992px) {
    padding: 70px 80px;
  }
  @media (max-width: 991px) {
    padding: 70px 8%;
  }
`;

const WhatWeOfferingRow = styled(Row)``;

const WhatWeOfferingCol = styled(Col)`
  h1 {
    // font-weight: 700;
    font-size: 40px;
    line-height: 46px;
    color: #105f43;
    font-family: "TitilliumBold", sans-serif;
  }
  h3 {
    font-weight: 400;
    font-size: 22px;
  }
  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 27px;
    color: #636363;
  }
  .service-bg {
    width: 100%;
  }
  .request-pDiv {
    margin: 35px 0 25px;
    p {
      margin-bottom: 0px;
      line-height: 40px;
    }
  }
`;

const WhatWeOfferCardsDiv = styled.div`
  display: flex;
  background: #fff;
  padding: 20px 17px;
  border-radius: 9px;
  border: 1px solid #e7e7e7;
  height: 109px;
  align-items: center;
  justify-content: start;
  &:hover {
    box-shadow: 6px 6px 25px rgba(0, 0, 0, 0.09);
    cursor: pointer;
  }

  h3 {
    margin-left: 10px;
    margin-bottom: 0px;
    font-size: 14px;
    font-weight: 500;
  }
  img {
  }
`;
const WhatWeOfferCardsDivSkeleton = styled.div`
  display: flex;
  background: #fff;
  padding: 20px 17px;
  border-radius: 9px;
  height: 109px;
  align-items: center;
  justify-content: space-around;
  border: 1px solid #e7e7e7;
  &:hover {
    box-shadow: 6px 6px 25px rgba(0, 0, 0, 0.09);
    cursor: pointer;
  }

  h3 {
    margin-left: 10px;
    margin-bottom: 0px;
    font-size: 14px;
    font-weight: 500;
  }
  img {
  }
`;

const StyledDiv = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 10000002 !important;
  justify-content: center;

  @media (min-width: 992px) {
    align-items: center;
  }

  @media (max-width: 991px) {
    align-items: start;
  }

  .modalBg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 9999 !important;
  }
`;

const ModalDiv = styled.div`
  background: #fff;
  padding: 20px;
  width: 100%;
  max-width: 700px;
  // display: flex;
  // justify-content: center;

  z-index: 9999 !important;
  @media (min-width: 992px) {
    width: 100%;
    max-height: 620px;
    overflow: auto;
    &::-webkit-scrollbar {
      scrollbar-width: 0.5rem !important;
      width: 0.5rem !important;
    }

    &::-webkit-scrollbar-track {
      background-color: rgba(0, 0, 0, 0.1) !important;
      backdrop-filter: blur(20px) !important;
    }

    &::-webkit-scrollbar-thumb {
      background: #105f43;
      border-radius: 0.5em;
      box-shadow: inset 0.15em 0.1em 0.1em rgba(255, 255, 255, 0.5),
        inset -0.15em -0.15em 0.1em rgba(0, 0, 0, 0.3);
    }
  }
  @media (max-width: 991px) {
    width: 90%;
    margin-top: 30px;
    max-height: 520px;
    overflow-y: scroll;
  }
  
  @media (max-height: 650px) {
    margin-top: 10px;
    max-height: 68vh;
  }

  border-radius: 15px;
  p {
    color: #8c8c8c;
    margin-bottom: 0px;
    font-family: "InterNormal", sans-serif;
    font-weight: 400;
    margin-bottom: 10px;
    color: #8c8c8c;
  }
  h1 {
    color: #181818;
    font-family: "TitilliumBold", sans-serif;
    // font-weight: 700;
    font-size: 22px;
  }
  .description {
    margin-block: 15px;
  }
`;

const StyledContactRow = styled(Row)`
  img {
    // margin-right: 10px;
  }
  p {
    color: #000000 !important;
  }
`;

const StyledContactRow1 = styled(Row)`
  margin-top: 10px;
  p {
    color: #000000 !important;
  }
`;

const ImgDiv1 = styled.div`
  display: flex;
  justify-content: center;
  width: 30px;
  margin-right: 5px;
`;

const ImgDiv2 = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 11px;
  margin-left: 2px;
  align-items: center;
  img {
    height: 17px;
    width: 25px;
  }
`;

const ButtonRow = styled(Row)`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .ant-btn {
    width: 49%;
  }
`;

const StyledInput = styled(Input)`
  background: #f8f8f8;
  border: 1px solid rgba(245, 245, 245, 0.1);
  border-radius: 5px;
  padding: 11px 10px;
`;

const StyledTextarea = styled(TextArea)`
  background: #f8f8f8;
  border: 1px solid rgba(245, 245, 245, 0.1);
  padding: 15px;
  border-radius: 10px;
`;

const AgrrementRow = styled(Row)`
  .ant-checkbox {
    margin-bottom: 20px;
  }
`;

const StyledErrorP = styled.p`
  margin-bottom: 0px;
  color: #fa4947 !important;
  font-size: 13px !important;
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

const StyledFlexLabelDiv = styled.div`
  display: flex;
`;

const RequiredP = styled.p`
  margin-bottom: 0px;
  color: red !important;
  margin-right: 5px;
`;
const StyledLabelP = styled.p`
  font-size: 14px !important;
  margin-bottom: 5px !important;
  font-family: "TitilliumNormal", sans-serif;
  color: #000 !important;
`;
const StyledInputNumber = styled(PhoneInput)`
  background: #f8f8f8;
  border: 1px solid #c1c1c1;
  border-radius: 5px;
  padding: 5px 7px;
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

const StyledRequestServiceRow = styled(Row)`
  width: 100% !important;
  display: flex !important;
  justify-content: space-between !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3) !important;
  margin-bottom: 10px !important;
  h1 {
    // border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    margin-bottom: 10px;
  }
`;

const StyledCloseOutlined = styled(CloseOutlined)`
  font-size: 24px;
  cursor: pointer;
`;

const ConstenDiv = styled.div``;
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
const CrossDiv1 = styled.div`
  .file-img {
    height: 14px;
    width: 14px;
    cursor: pointer;
  }
  display: flex;
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

const StyledImgDivPdf = styled.div`
  width: 100%;
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
