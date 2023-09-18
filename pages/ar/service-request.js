import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import styled from "styled-components";

import Hero from "../../src/components/rtl/Hero";
import RequestServiceModal from "../../src/components/rtl/Modal/RequestServiceModal";
import RequestOtherServiceModal from "../../src/components/rtl/Modal/RequestOtherServiceModal";
import endpoints from "../../src/api";
import Image from "next/image";
import Link from "next/link";

import { Breadcrumb, Col, Row } from "antd";
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
} from "../../images";

import CustomButton from "../../src/components/rtl/Button";
import Header from "../../src/components/rtl/header";
import Footer from "../../src/components/rtl/footer";
import SkeletonTextPlaceholder from "../../src/components/rtl/SkeletonTextPlaceholder";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { menuService } from "../../src/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  contact_us,
  home,
  request_other_services,
  request_service,
} from "../../src/helpers/LanguageConstant";

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
  //console.log("priceState", priceState[0]);

  const [emailState, setEmailState] = useState(false);
  const [nameState, setNameState] = useState(false);
  const [selectServiceState, setSelectServiceState] = useState(false);
  const [selectDepartmentState, setSelectDepartmentState] = useState(false);
  const [phoneState, setPhoneState] = useState(false);
  const [queryDetailState, setQueryDetailState] = useState(false);
  const [urlState, setUrlState] = useState("");
  const [documentState,setDocumentState] = useState(false);

  const [dateFromState, setDateFromState] = useState("");

  const [dateToState, setDateToState] = useState("");
  const [checkFilter, setCheckFilter] = useState([]);
  const [checkFilter1, setCheckFilter1] = useState([]);
  const [
    courseTrainingMasterCategoryIdState,
    setCourseTrainingMasterCategoryIdState,
  ] = useState([]);
  const [onFilterCategoryCheckFilter, setOnFilterCategoryCheckFilter] =
    useState([]);

  const [locationState, setLocationState] = useState();
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
  //console.log("selectService", selectService);

  const serviceEntity=useSelector(state=>state?.menuServiceReducer)
  const emailEntity=useSelector(state=>state)

  const initialState = {
    your_name: emailEntity?.userDataReducer?.firstName_AR + " " + emailEntity?.userDataReducer?.lastName_AR,
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
      your_name: emailEntity?.userDataReducer?.firstName_AR + " " + emailEntity?.userDataReducer?.lastName_AR,
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
        toast.success("شكرا جزيلا على تقديم النموذج. سيقوم فريقنا بالرد عليك على عنوان البريد الإلكتروني المحدد في أقرب وقت ممكن.");
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
      // //console.log('menuId', menuId, token)
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
        router.push('/ar')
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  
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
        <RequestServiceModal
          openModal={modalState}
          setOpenModal={setModalState}
          inputHandler={inputHandler}
          supportState={supportState}
          setSupportState={setSupportState}
          selectService={selectService}
          contactUsFunc={contactUsFunc}
          loadingState={loadingState}
          setDocumentState={setDocumentState}
          documentState={documentState}

          setEmailState={setEmailState}
          emailState={emailState}
          setNameState={setNameState}
          nameState={nameState}
          setPhoneState={setPhoneState}
          phoneState={phoneState}
          setSelectServiceState={setSelectServiceState}
          selectServiceState={selectServiceState}

          setQueryDetailState={setQueryDetailState}
          queryDetailState={queryDetailState}
          setUrlState={setUrlState}
          urlState={urlState}
        />
        <RequestOtherServiceModal
          openModal={modalOtherState}
          setOpenModal={setModalOtherState}
          inputHandler={inputHandler}
          supportState={supportState}
          setSupportState={setSupportState}
          selectService={selectService}
          contactUsFunc={contactUsFunc}
          getAllRequestaServiceLovState={getAllRequestaServiceLovState}
          loadingState={loadingState}
          setDocumentState={setDocumentState}
          documentState={documentState}
          setDepartFlag={setDepartFlag}

          setEmailState={setEmailState}
          emailState={emailState}
          setNameState={setNameState}
          nameState={nameState}
          setPhoneState={setPhoneState}
          phoneState={phoneState}          
          setSelectServiceState={setSelectServiceState}
          selectServiceState={selectServiceState}

          setQueryDetailState={setQueryDetailState}
          queryDetailState={queryDetailState}
          setUrlState={setUrlState}
          urlState={urlState}
          getDepartmentLovState={getDepartmentLovState}
          setSelectDepartmentState={setSelectDepartmentState}
          selectDepartmentState={selectDepartmentState}
        />
        <div onClick={() => setDropdownCaretState(false)}>
          {GetStaticPagesState?.contentValue &&
            Object.values(JSON.parse(GetStaticPagesState?.contentValue))?.map(
              (data,index) => (
                <div key={index}>
                  {data["type"] === "top_banner" && (<>
                    <div>
                      <Hero 
                        name={"service-request"}
                        title={data?.content?.title_ar}
                        background_color={data?.content?.background_color}
                      />
                    </div>
                  </>)}
                </div>
              )
            )
          }

          <SideDesignDiv>
            <img loading="lazy"src={SideDesign} />
          </SideDesignDiv>

          {/* Breadcrumb */}
          <MainBreadcrumbDiv>
            <Container>
              <BreadcrumbDiv dir="rtl">
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <Link href={"/ar"}>{home}</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>{request_service}</Breadcrumb.Item>
                </Breadcrumb>
              </BreadcrumbDiv>
            </Container>
          </MainBreadcrumbDiv>

          {GetStaticPagesState?.contentValue &&
            Object.values(JSON.parse(GetStaticPagesState?.contentValue))?.map(
              (data,index) => (
                <div key={index}>
                  {data["type"] === "goals_objective" && (<>
                    <MainWhatWeofferingDivSection dir="rtl">
                      <Container>
                        <WhatWeofferingDivSection style={{paddingBottom: "0"}}>
                        <WhatWeOfferingCol xl={12} lg={12} md={24} sm={24} xs={24}>
                            <h3><b>{data?.content?.description_ar}</b></h3>
                            <ul>
                              {data?.content?.lists?.map((item, index)=>(<>
                                {item?.text_ar !== '' && (
                                  <li key={index}>{item?.text_ar}</li>
                                )}
                              </>))}
                            </ul>
                          </WhatWeOfferingCol>
                        </WhatWeofferingDivSection>
                      </Container>
                    </MainWhatWeofferingDivSection>
                  </>)}
                </div>
              )
            )
          }

          {GetStaticPagesState?.contentValue &&
            Object.values(JSON.parse(GetStaticPagesState?.contentValue))?.map(
              (data, index) => (
                <div key={index}>
                  {data["type"] === "text_with_image" && (<>
                  <MainWhatWeofferingDivSection>
                    {data["content"]?.align === "right" && (
                      <Container>
                        <WhatWeofferingDivSection style={{paddingTop: "20px"}}>
                          <WhatWeOfferingRow dir="rtl" gutter={[48, 48]}>
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
                                    // setSelectService(item?.title_AR);
                                    // setSelectServiceId(item?.id);
                                    dispatch(menuService({departmentId:item?.departmentId?.trim(), departmentName:item?.departmentName_AR?.trim(), serviceId:item?.id?.trim(), serviceName:item?.title_AR?.trim()}))
                                            }}
                                          >
                                            {item?.imageUrl!==""&&
                                            <img
                                              height={60}
                                              width={60}
                                              src={item?.imageUrl}
                                            />
                                          }
                                            <h3>{item?.title_AR}</h3>
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
                                <h3><b>{data?.content?.description_ar}</b></h3>
                                {/* <p>Contact us here and we will get back to you</p> */}
                              </div>
                                {data?.content?.button_ar !== "" && (
                                  <CustomButton
                                    customStyle={{
                                      background: "#105F43",
                                      color: "#fff",
                                      paddingInline: 30,
                                      cursor: "pointer",
                                    }}
                                    onClick={() => setModalOtherState(true)}
                                  >
                                    {data?.content?.button_ar}
                                  </CustomButton>
                                )}
                            </WhatWeOfferingCol>
                            <WhatWeOfferingCol xl={12} lg={24} md={24} sm={24} xs={24}>
                              {data?.content?.image !== "" && (
                                <img loading="lazy"alt={""} height={400} width={700} src={data?.content?.image} />
                              )}
                            </WhatWeOfferingCol>
                          </WhatWeOfferingRow>
                        </WhatWeofferingDivSection>
                      </Container>
                    )}
                    {data["content"]?.align === "left" && (
                      <Container>
                        <WhatWeofferingDivSection>
                          <WhatWeOfferingRow dir="rtl" gutter={[48, 48]}>
                            <WhatWeOfferingCol xl={12} lg={24} md={24} sm={24} xs={24}>
                              {data?.content?.image !== "" && (
                                <img loading="lazy"alt={""} height={400} width={700} src={data?.content?.image} />
                              )}
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
                                    // setSelectService(item?.title_AR);
                                    // setSelectServiceId(item?.id);
                                    // dispatch(menuService({departmentId:process.env.NEXT_PUBLIC_LEARNING_INSTITUTE_DEPARTMENT_ID, departmentName:process.env.NEXT_PUBLIC_LEARNING_INSTITUTE_DEPARTMENT_NAME_AR, serviceId:item?.id?.trim(), serviceName:item?.title_AR?.trim()}))
                                    dispatch(menuService({departmentId:item?.departmentId?.trim(), departmentName:item?.departmentName_AR?.trim(), serviceId:item?.id?.trim(), serviceName:item?.title_AR?.trim()}))
                                            }}
                                          >
                                            {item?.imageUrl!==""&&
                                            <img
                                              height={60}
                                              width={60}
                                              src={item?.imageUrl}
                                            />
                                          }
                                            <h3>{item?.title_AR}</h3>
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
                                <h3><b>{data?.content?.description_ar}</b></h3>
                                {/* <p>Contact us here and we will get back to you</p> */}
                              </div>
                                {data?.content?.button_ar !== "" && (
                                  <CustomButton
                                    customStyle={{
                                      background: "#105F43",
                                      color: "#fff",
                                      paddingInline: 30,
                                      cursor: "pointer",
                                    }}
                                    onClick={() => setModalOtherState(true)}
                                  >
                                    {data?.content?.button_ar}
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
  border: 1px solid #e7e7e7;
  border-radius: 9px;
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
  box-shadow: 6px 6px 25px rgba(0, 0, 0, 0.09);
  border-radius: 9px;
  height: 109px;
  align-items: center;
  justify-content: space-around;

  h3 {
    margin-left: 10px;
    margin-bottom: 0px;
    font-size: 14px;
    font-weight: 500;
  }
  img {
  }
`;
