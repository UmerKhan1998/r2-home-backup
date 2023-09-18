import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
// import OurFeaturedCourseCarousel from "../src/components/Carousel/OurFeaturedCourse";
import endpoints from "../../src/api";
import SkeletonComp from "../../src/components/rtl/Skeleton";
import Hero from "../../src/components/rtl/Hero";
import Link from "next/link";
import router from "next/router";
//swiper imports
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import FilterComp from "../../src/components/rtl/FilterComp.js";
import FilterCompMobileView from "../../src/components/rtl/FilterComp.js/MobileView";

//next.config
import { brand } from "../../next.config";
import {
  Breadcrumb,
  Checkbox,
  Col,
  Collapse,
  DatePicker,
  Divider,
  Pagination,
  Radio,
  Empty,
  Row,
  Select,
  Slider,
} from "antd";
import {
  CaretRightOutlined,
  DownOutlined,
  FilterOutlined,
  LeftOutlined,
  RightOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import {
  CardImg,
  SymposiumsCardImg,
  FeaturedCourse1,
  FeaturedCourse2,
  FeaturedCourse3,
  FeaturedCourse4,
  Interns,
  R2Favicon,
  SectionAfterHeroImg1,
  SectionAfterHeroImg2,
  SectionAfterHeroImg3,
} from "../../images";
import FeaturedCard from "../../src/components/rtl/Cards/FeaturedCard";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Header from "../../src/components/rtl/header";
import Footer from "../../src/components/rtl/footer";
import CustomButton from "../../src/components/rtl/Button";
import {
  Asynchronous,
  Category,
  clear,
  courses,
  DATE,
  develop_your_skills_in_a_huge_range_of,
  expert_instruction,
  filter,
  find_the_right_instructor_for_you,
  From,
  home,
  in2,
  Level,
  LOCATION,
  of,
  online,
  onsite,
  PRICE,
  Refine,
  Results,
  sar,
  showing,
  subjects,
  symposium,
  symposiums,
  Synchronous,
  thousands_of_satisfied_students,
  to,
  Type,
} from "../../src/helpers/LanguageConstant";

const { Option } = Select;

const { Panel } = Collapse;
const CourseLandingPage = () => {
  const [checkFilter, setCheckFilter] = useState([]);
  const [checkFilter1, setCheckFilter1] = useState([]);
  const [pageSize, setPageSize] = useState(9);
  const [pageNo, setPageNo] = useState(1);
  const [language, setLanguage] = useState("English");
  const [loadingDetailRecord, setLoadingDetailRecord] = useState(true);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState("");
  const [swiper, setSwiper] = useState(null);
  const [dropdownCaretState, setDropdownCaretState] = useState(false);

  const initialState = {
    courseTrainingMasterCategoryId: "",
    courseTrainingCategoryId: "",
    levelId: "",
    priceMin: 0,
    priceMax: 0,
    dateFrom: "",
    dateTo: "",
    subCategory: "",
    locationId: "",
  };

  const [getAllCoursesRecordFilterState, setGetAllCoursesRecordFilterState] =
    useState(initialState);

  const getAllCoursesRecordInputHandler = (e) =>
    setGetAllCoursesRecordFilterState({
      ...getAllCoursesRecordFilterState,
      [e.target.name]: e.target.value,
    });

  const [getAllRecordsState, setGetAllRecordsState] = useState([]);
  //console.log("getAllRecordsState", getAllRecordsState);

  const [totalRecord, setTotalRecord] = useState();
  //console.log("totalRecord", totalRecord);

  const [
    courseTrainingMasterCategoryIdState,
    setCourseTrainingMasterCategoryIdState,
  ] = useState([]);

  const [courseTrainingCategoryId, setCourseTrainingCategoryId] = useState([]);

  const [levelId, setLevelId] = useState([]);

  const [priceState, setPriceState] = useState([0, 0]);

  //console.log("priceState", priceState[0]);

  const [dateFromState, setDateFromState] = useState("");

  const [dateToState, setDateToState] = useState("");

  const [locationState, setLocationState] = useState("");
  const [courseType, setCourseType] = useState("");

  const [locationId, setLocationId] = useState([]);

  const [isDesktop, setIsDesktop] = useState(false);
  const [statusCodeStatus, setStatusCodeStatus] = useState();

  const getAllRecordFunc = async (data, sea) => {
    setLoadingDetailRecord(true);
    try {
      // if (token && menuId) {
      // //console.log('menuId', menuId, token)
      const response = await endpoints.getAllRecord(
        "Symposiums",
        pageSize,
        pageNo,
        language,
        sea,
        {
          courseTrainingMasterCategoryId: courseTrainingMasterCategoryIdState,
          courseTrainingCategoryId: courseTrainingCategoryId,
          levelId,
          priceMin: priceState[0],
          priceMax: priceState[1],
          dateFrom: dateFromState,
          dateTo: dateToState,
          subCategory: locationState,
          locationId,
          category: courseType,
        }
      );
      if (response) {
        //console.log("responseDetailRecord", response);
        setGetAllRecordsState(response?.data.data?.levelListViewModels);
        setStatusCodeStatus(response?.data?.statusCode);
        setTotalRecord(response?.data?.data?.totalRecord);
        setLoadingDetailRecord(false);
      }
      // setTotalPaginationRecord(response?.data?.data?.totalRecord)
      // setDataState(response?.data?.data?.taxListViewModels)
      // setGetTaxState(response?.data?.data)
    } catch (err) {
      //console.log("err", err);
      setLoading(false);
    }
  };

  const [filterArr, setFilterArr] = useState([]);
  //console.log("filterArr", filterArr);

  const getCourseTrainingMasterCategoryFunc = async () => {
    setLoading(true);
    try {
      // if (token && menuId) {
      // //console.log('menuId', menuId, token)
      const response = await endpoints
        .getCourseTrainingMasterCategory
        // token,
        // menuId,
        // PageSize,
        // PageNo,
        // Language,
        // Search,
        ();
      if (response) {
        setFilterArr(response?.data?.data);
        setLoading(false);
      }
      // setTotalPaginationRecord(response?.data?.data?.totalRecord)
      // setDataState(response?.data?.data?.taxListViewModels)
      // setGetTaxState(response?.data?.data)
    } catch (err) {
      //console.log("err", err);
      setLoading(false);
    }
  };

  const [filterArr1, setFilterArr1] = useState([]);
  //console.log("filterArr1", filterArr1);

  const getCourseTrainingCategoryFunc = async () => {
    setLoading(true);
    try {
      // if (token && menuId) {
      // //console.log('menuId', menuId, token)
      const response = await endpoints
        .getCourseTrainingCategory
        // token,
        // menuId,
        // PageSize,
        // PageNo,
        // Language,
        // Search,
        ();
      if (response) {
        //console.log("response", response);
        setFilterArr1(response?.data?.data);
        setLoading(false);
      }
      // setTotalPaginationRecord(response?.data?.data?.totalRecord)
      // setDataState(response?.data?.data?.taxListViewModels)
      // setGetTaxState(response?.data?.data)
    } catch (err) {
      //console.log("err", err);
      setLoading(false);
    }
  };

  const [filterArr2, setFilterArr2] = useState([]);
  //console.log("filterArr2", filterArr2);

  const getLevelFunc = async () => {
    setLoading(true);
    try {
      // if (token && menuId) {
      // //console.log('menuId', menuId, token)
      const response = await endpoints
        .getLevel
        // token,
        // menuId,
        // PageSize,
        // PageNo,
        // Language,
        // Search,
        ();
      if (response) {
        //console.log("response", response);
        setFilterArr2(response?.data?.data);
        setLoading(false);
      }
      // setTotalPaginationRecord(response?.data?.data?.totalRecord)
      // setDataState(response?.data?.data?.taxListViewModels)
      // setGetTaxState(response?.data?.data)
    } catch (err) {
      //console.log("err", err);
      setLoading(false);
    }
  };

  const [filterArr3, setFilterArr3] = useState([]);
  //console.log("filterArr3", filterArr3);

  const getLocationFunc = async () => {
    setLoading(true);
    try {
      // if (token && menuId) {
      // //console.log('menuId', menuId, token)
      const response = await endpoints
        .getLocation
        // token,
        // menuId,
        // PageSize,
        // PageNo,
        // Language,
        // Search,
        ();
      if (response) {
        //console.log("response", response);
        setFilterArr3(response?.data?.data);
        setLoading(false);
      }
      // setTotalPaginationRecord(response?.data?.data?.totalRecord)
      // setDataState(response?.data?.data?.taxListViewModels)
      // setGetTaxState(response?.data?.data)
    } catch (err) {
      //console.log("err", err);
      setLoading(false);
    }
  };

  // const filterArr = [
  //   {
  //     header: "TYPE",
  //     options: ["Clinical", "Non Clinical"],
  //   },
  // ];

  // const filterArr1 = [
  //   {
  //     header: "CATEGORY",
  //     options: [
  //       "Dental Assistant",
  //       "Dental Public Health",
  //       "Oral Surgery",
  //       "General Dentistry",
  //       "Oral Pathology",
  //       "Orthodontics",
  //       "Conservative Dentistry",
  //       "Pediatric Dentistry",
  //       "Periodontics",
  //       "Prosthodontics",
  //       "Oral and Maxillofacial Radiology",
  //       "Oral and Maxillofacial Surgery",
  //       "Restoratrive Dentistry",
  //       "Advanced General Dentistry",
  //       "Oral Biology",
  //       "Endodontics",
  //     ],
  //   },
  // ];

  // const filterArr2 = [
  //   {
  //     header: "LEVEL",
  //     options: ["Beginner", "Intermediate", "Expert"],
  //   },
  // ];

  const handleChange = (value) => {
    //console.log(`selected ${value}`);
  };

  //console.log("checkFilter", checkFilter);

  const updaetFunc = (data) => setCourseTrainingMasterCategoryIdState(data);

  const updaetCategoryFunc = (data) => setCourseTrainingCategoryId(data);

  const updaetLevelFunc = (data) => setLevelId(data);

  const updaetLocationFunc = (data) => setLocationId(data);

  const onFilterChange = (id) => {
    const index = checkFilter?.indexOf(id);
    //console.log("fire", index);
    let fake = [];
    if (index !== -1) {
      fake = checkFilter.filter((item) => item !== id);
      setCheckFilter(fake);
    } else {
      fake = [...checkFilter, id];
      setCheckFilter(fake);
    }
    //console.log("fake", fake);
    updaetFunc(fake);
  };

  const [onFilterCategoryCheckFilter, setOnFilterCategoryCheckFilter] =
    useState([]);

  const onFilterCategoryChange = (id) => {
    const index = onFilterCategoryCheckFilter?.indexOf(id);
    //console.log("fire", index);
    let fake = [];
    if (index !== -1) {
      fake = onFilterCategoryCheckFilter.filter((item) => item !== id);
      setOnFilterCategoryCheckFilter(fake);
    } else {
      fake = [...onFilterCategoryCheckFilter, id];
      setOnFilterCategoryCheckFilter(fake);
    }
    //console.log("fake", fake);
    updaetCategoryFunc(fake);
  };

  const [onFilterLevelCheckFilter, setOnFilterLevelCheckFilter] = useState([]);

  const onFilterLevelChange = (id) => {
    const index = onFilterLevelCheckFilter?.indexOf(id);
    //console.log("fire", index);
    let fake = [];
    if (index !== -1) {
      fake = onFilterLevelCheckFilter.filter((item) => item !== id);
      setOnFilterLevelCheckFilter(fake);
    } else {
      fake = [...onFilterLevelCheckFilter, id];
      setOnFilterLevelCheckFilter(fake);
    }
    //console.log("fake", fake);
    updaetLevelFunc(fake);
  };

  const onFilterChange1 = (id) => {
    const index = checkFilter1?.indexOf(id);
    //console.log("fire", index);
    let fake = [];
    if (index !== -1) {
      fake = checkFilter1.filter((item) => item !== id);
      setCheckFilter1(fake);
    } else {
      fake = [...checkFilter1, id];
      setCheckFilter1(fake);
    }
    //console.log("fake", fake);
    updaetLocationFunc(fake);
  };

  // useLayoutEffect(() => {}, [checkFilter, checkFilter1]);
  useLayoutEffect(() => {
    getAllRecordFunc(getAllCoursesRecordFilterState);
    getCourseTrainingMasterCategoryFunc();
    getCourseTrainingCategoryFunc();
    getLevelFunc();
    getLocationFunc();
  }, [
    getAllCoursesRecordFilterState,
    search,
    pageNo,
    pageSize,
    language,
    courseTrainingMasterCategoryIdState,
    courseTrainingCategoryId,
    levelId,
    priceState,
    dateFromState,
    dateToState,
    locationState,
    courseType,
    locationId,
  ]);

  const sliderChange = (e) => setPriceState(e);

  const onChangeLocation = (e) => {
    setLocationState(e.target.value);
  };

  const onCourseTypeChange = (e) => {
    setCourseType(e.target.value);
  };

  const [HeroLoading, setHeroLoading] = useState(true);
  const [GetStaticPagesState, setGetStaticPagesState] = useState();
  const GetStaticPages = async () => {
    setHeroLoading(true);
    try {
      const response = await endpoints.GetStaticPages("symposiums-landing-page");
      if (response?.data?.statusCode === "200") {
        setGetStaticPagesState(response?.data?.data);
        setHeroLoading(false)
      } else if (response?.data?.statusCode === "404") {
        router.push('/ar')
      }
    } catch (err) {
      console.log("err", err);
      setHeroLoading(false);
    }
  };

  useLayoutEffect(()=>{
    GetStaticPages()
  }, [])

  //filter drawer
  const [visibleFilterDrawer, setVisibleFilterDrawer] = useState(false);
  const DesktopView = (
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
        />
        
{!HeroLoading ? (
                <>
        {GetStaticPagesState?.contentValue &&
          Object.values(JSON.parse(GetStaticPagesState?.contentValue))?.map(
            (data,index) => (
              <div key={index}>
                {data["type"] === "top_banner" && (<>
                  <div>
                    <Hero
                      getAllCoursesRecordFilterState={getAllCoursesRecordFilterState}
                      search={search}
                      setSearch={setSearch}
                      getAllRecordFunc1={getAllRecordFunc}
                      name={"symposium-landing-page"}
                      title={data?.content?.title_ar}
                      image={data?.content?.image}
                      background_color={data?.content?.background_color}
                      type={symposiums}
                      typeSearch={"Symposiums"}  
                    />
                  </div>
                  {/* section after hero */}
                  <SectionAfterHero>
                    <Container>
                      <Row>
                        {(data?.content?.tabs.map((item, index)=>(
                          <SectionAfterHeroCol span={8} key={index}>
                            <Row dir="rtl" style={{flexWrap: "nowrap"}}>
                              <ImgDiv>
                              {(item?.image !== "" && item?.image !== null) && (
                                <img
                                  height={40}
                                  width={40}
                                  src={item?.image}
                                />
                              )}
                              </ImgDiv>
                              <AlignCenter dir="rtl">
                                <TitleDiv>{item?.title_ar}</TitleDiv>
                                <DescriptionDiv>
                                  {item?.description_ar}
                                </DescriptionDiv>
                              </AlignCenter>
                            </Row>
                          </SectionAfterHeroCol>
                        )))}
                      </Row>
                    </Container>
                  </SectionAfterHero>
                </>)}
              </div>
            )
          )
        }
  </>
              ) : (
                <SkeletonSliderDiv>
                  {/* <Hero name={"home-page"} /> */}
                </SkeletonSliderDiv>
              )}
        <div onClick={() => setDropdownCaretState(false)}>
          {/* Breadcrumb */}
          <MainBreadcrumbDiv>
            <Container>
              <BreadcrumbDiv>
                <Breadcrumb dir={"rtl"}>
                  <Breadcrumb.Item>
                    <Link href="/ar">{home}</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>{symposiums}</Breadcrumb.Item>
                </Breadcrumb>
              </BreadcrumbDiv>
            </Container>
          </MainBreadcrumbDiv>

          {/* Head1 Section */}
          <Container id="courses">
            <Head1Section>
              <Row dir="rtl">
                <h1>{symposiums}</h1>
                <Head1SectionDiv>
                  {totalRecord && (
                    <p>
                      {showing} 1–{totalRecord} {of} {totalRecord} {symposiums}
                    </p>
                  )}
                  {/* <Select
                  defaultValue="Sort by"
                  style={{
                    width: 120,
                  }}
                  onChange={handleChange}
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select> */}
                </Head1SectionDiv>
                <StyledDivider />
              </Row>
            </Head1Section>
          </Container>

          {/* Courses Section */}
          <Container>
            <CoursesSection>
              <CoursesRow dir="rtl" gutter={[6, 24]}>
                <Col span={6}>
                <FilterComp
                 setCheckFilter={setCheckFilter}
                 setCourseTrainingMasterCategoryIdState={setCourseTrainingMasterCategoryIdState}
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
                 dateFromState={dateFromState}
                 dateToState={dateToState}
                 filterArr={filterArr}
                 filterArr1={filterArr1}
                 filterArr2={filterArr2}
                 priceState={priceState}
                 sliderChange={sliderChange}
                 onChangeLocation={onChangeLocation}
                 locationState={locationState}
                 courseType={courseType}
                 onCourseTypeChange={onCourseTypeChange}
                 checkFilter={checkFilter}
                 onFilterCategoryCheckFilter={onFilterCategoryCheckFilter}
                 onFilterLevelCheckFilter={onFilterLevelCheckFilter}
                 onFilterChange={onFilterChange}
                 onFilterChange1={onFilterChange1}
                 onFilterCategoryChange={onFilterCategoryChange}
                 onFilterLevelChange={onFilterLevelChange}
                 filterArr3={filterArr3}
                 checkFilter1={checkFilter1}
                 />
                </Col>
                <Col span={18}>
                  <Row gutter={[12, 12]}>
                    {loadingDetailRecord ? (
                      <>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((item, index) => (
                          <Col span={8} key={index}>
                            <SkeletonComp
                              page={"courses-landing-page"}
                              Img={SymposiumsCardImg}
                            />
                          </Col>
                        ))}
                      </>
                    ) : (
                      <>
                        {statusCodeStatus === "200" ? (
                          <>
                            {getAllRecordsState?.map((items, index) => (
                              <Col span={8} key={index}>
                                <FeaturedCard
                                  id={items?.id}
                                  Img={SymposiumsCardImg}
                                  FeaturedType={items?.recordType_AR}
                                  EnrolledStudents={items?.enrolled}
                                  CourseName={items?.title_AR}
                                  Time={items?.duration_AR}
                                  Rating={items?.rating}
                                  TotalRatings={items?.reviewCount}
                                  MinPrice={items?.priceMin}
                                  MaxPrice={items?.priceMax}
                                  paidFree={items?.paidFree}
                                  SubCategory={items?.subCategory}
                                  cme={items?.creditHours}
                                  name={"symposiums"}
                                  page={"symposium-landing-page"}
                                />
                              </Col>
                            ))}
                          </>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              width: "100%",
                            }}
                          >
                            <Empty />
                          </div>
                        )}
                      </>
                    )}{" "}
                  </Row>
                  {totalRecord > 9 && (
                    <PaginationRow>
                      <div>
                        <Pagination
                          defaultCurrent={1}
                          onChange={(e) => setPageNo(e)}
                          total={totalRecord}
                          defaultPageSize={9}
                        />
                      </div>
                    </PaginationRow>
                  )}
                </Col>
              </CoursesRow>
            </CoursesSection>
          </Container>
          <Footer />
        </div>
      </body>
    </div>
  );
  const MobileView = (
    <div>
      <Head>
        <title>Riyadh Second Health Cluster</title>
        <link rel="icon" href={R2Favicon} />
      </Head>
      <body>
        <Header   setCheckFilter={setCheckFilter}
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
          setCourseType={setCourseType}/>

        <div>
        {!HeroLoading ? (
                <>
          {GetStaticPagesState?.contentValue &&
            Object.values(JSON.parse(GetStaticPagesState?.contentValue))?.map(
              (data,index) => (
                <div key={index}>
                  {data["type"] === "top_banner" && (<>
                    <Hero
                      getAllCoursesRecordFilterState={getAllCoursesRecordFilterState}
                      search={search}
                      setSearch={setSearch}
                      getAllRecordFunc1={getAllRecordFunc}
                      name={"conference-landing-page"}
                      title={data?.content?.title_ar}
                      image={data?.content?.image}
                      background_color={data?.content?.background_color}
                      type={symposiums}
                      typeSearch={"Symposiums"}  
                    />
                    <SectionAfterHero>
                      <Container style={{ position: "relative" }}>
                        <Row style={{ margin: "0px 15px" }}>
                          <Swiper
                            spaceBetween={0}
                            slidesPerView={1}
                            onSwiper={setSwiper}
                            loop={true}
                          >
                            {(data?.content?.tabs.map((item, index)=>(
                              <SwiperSlide key={index}>
                                <Col span={24}>
                                  <Row dir="rtl" style={{flexWrap: "nowrap"}}>
                                    <ImgDiv>
                                    {(item?.image !== "" && item?.image !== null) && (
                                      <img
                                        height={40}
                                        width={40}
                                        src={item?.image}
                                      />
                                    )}
                                    </ImgDiv>
                                    <AlignCenter>
                                      <TitleDiv>{item?.title_ar}</TitleDiv>
                                      <DescriptionDiv>
                                        {item?.description_ar}
                                      </DescriptionDiv>
                                    </AlignCenter>
                                  </Row>
                                </Col>
                              </SwiperSlide>
                            )))}
                          </Swiper>
                        </Row>
                        <button
                          className="swipper_slider_btns ssb-prev"
                          onClick={() => swiper.slidePrev()}
                        >
                          <LeftOutlined style={{ color: "#A5A4A4" }} />
                        </button>
                        <button
                          className="swipper_slider_btns ssb-next"
                          onClick={() => swiper.slideNext()}
                        >
                          <RightOutlined style={{ color: "#A5A4A4" }} />
                        </button>
                      </Container>
                    </SectionAfterHero>
                  </>)}
                </div>
              )
            )
          }
 </>
           ) : (
                <SkeletonSliderDiv>
                  {/* <Hero name={"home-page"} /> */}
                </SkeletonSliderDiv>
              )}
          {/* Breadcrumb */}
          <MainBreadcrumbDiv>
            <Container>
              <BreadcrumbDiv dir="rtl">
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <Link href="/ar">{home}</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>{symposiums}</Breadcrumb.Item>
                </Breadcrumb>
              </BreadcrumbDiv>
            </Container>
          </MainBreadcrumbDiv>
          {/* Head1 Section */}
          <Container id="courses">
            <Head1Section>
              <Row dir="rtl">
                {/* <h1>Courses</h1> */}
                <Head1SectionDiv>
                  {totalRecord && (
                    <p>
                      {showing} 1–{totalRecord} {of} {totalRecord} {symposiums}
                    </p>
                  )}
                </Head1SectionDiv>
                {/* <StyledDivider /> */}
              </Row>
            </Head1Section>

            <UtilityBtnsRow dir="rtl">
              <CustomButton
                customStyle={{
                  borderRadius: "2px",
                  color: "#636363",
                  width: "58%",
                }}
                onClick={() => {
                  setVisibleFilterDrawer(true);
                }}
              >
                {filter} <FilterOutlined />
              </CustomButton>
              {/* <CustomButton
                customStyle={{
                  borderRadius: "2px",
                  color: "#636363",
                  width: "39%",
                }}
                onClick={() => //console.log("")}
              >
                Sort by <UnorderedListOutlined />
              </CustomButton> */}
            </UtilityBtnsRow>
          </Container>
          <StyledMobFilter className={visibleFilterDrawer ? "show" : ""}>
            <StyledMobFilterHeader>
              <h3>
                {Refine} {Results}
              </h3>

              <span
                onClick={() => {
                  setVisibleFilterDrawer(false);
                }}
              >
                <svg
                  width="30"
                  height="29"
                  viewBox="0 0 30 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      d="M6.21992 1.28181C6.1502 1.21209 6.09489 1.12931 6.05716 1.03821C6.01942 0.947114 6 0.849474 6 0.750868C6 0.652263 6.01942 0.554623 6.05716 0.463524C6.09489 0.372424 6.1502 0.289649 6.21992 0.219924C6.28965 0.1502 6.37242 0.0948912 6.46352 0.0571565C6.55462 0.0194218 6.65226 -7.34668e-10 6.75087 0C6.84947 7.34667e-10 6.94711 0.0194218 7.03821 0.0571565C7.12931 0.0948912 7.21209 0.1502 7.28181 0.219924L15 7.93961L22.7182 0.219924C22.7879 0.1502 22.8707 0.0948912 22.9618 0.0571565C23.0529 0.0194218 23.1505 0 23.2491 0C23.3477 0 23.4454 0.0194218 23.5365 0.0571565C23.6276 0.0948912 23.7104 0.1502 23.7801 0.219924C23.8498 0.289649 23.9051 0.372424 23.9428 0.463524C23.9806 0.554623 24 0.652263 24 0.750868C24 0.849474 23.9806 0.947114 23.9428 1.03821C23.9051 1.12931 23.8498 1.21209 23.7801 1.28181L16.0604 9L23.7801 16.7182C23.8498 16.7879 23.9051 16.8707 23.9428 16.9618C23.9806 17.0529 24 17.1505 24 17.2491C24 17.3477 23.9806 17.4454 23.9428 17.5365C23.9051 17.6276 23.8498 17.7104 23.7801 17.7801C23.7104 17.8498 23.6276 17.9051 23.5365 17.9428C23.4454 17.9806 23.3477 18 23.2491 18C23.1505 18 23.0529 17.9806 22.9618 17.9428C22.8707 17.9051 22.7879 17.8498 22.7182 17.7801L15 10.0604L7.28181 17.7801C7.21209 17.8498 7.12931 17.9051 7.03821 17.9428C6.94711 17.9806 6.84947 18 6.75087 18C6.65226 18 6.55462 17.9806 6.46352 17.9428C6.37242 17.9051 6.28965 17.8498 6.21992 17.7801C6.1502 17.7104 6.09489 17.6276 6.05716 17.5365C6.01942 17.4454 6 17.3477 6 17.2491C6 17.1505 6.01942 17.0529 6.05716 16.9618C6.09489 16.8707 6.1502 16.7879 6.21992 16.7182L13.9396 9L6.21992 1.28181Z"
                      fill="#000"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_848_3950"
                      x="0.667228"
                      y="0"
                      width="28.6655"
                      height="28.6655"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="5.33277" />
                      <feGaussianBlur stdDeviation="2.66639" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_848_3950"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_848_3950"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </span>
            </StyledMobFilterHeader>
            <StyledMobFilterBody dir="rtl">
              <div className="filterTopLeftBg">
                <svg
                  width="111"
                  height="120"
                  viewBox="0 0 111 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M42.7457 77.6363C42.7457 87.8629 42.8945 98.2356 42.7457 108.462C42.5969 113.283 40.6623 117.52 35.7514 119.273C33.3704 120.15 30.2454 120.15 27.7156 119.711C19.9772 118.543 12.3877 116.936 4.64942 115.475C-3.38653 114.014 -11.4225 112.699 -19.4584 111.238C-24.2205 110.361 -26.3039 107.001 -24.6669 102.472C-16.631 79.6816 -1.15438 65.0722 23.1023 60.3971C27.2691 59.6667 31.4359 59.2284 35.6027 59.0823C39.4718 58.9362 42.0016 61.4198 42.0016 65.3643C42.0016 69.455 42.5969 71.7925 42.5969 75.8831C42.7458 76.7597 42.7457 77.198 42.7457 77.6363Z"
                    fill="#105F43"
                    fill-opacity="0.07"
                  />
                  <path
                    d="M86.4956 58.0598C89.4719 57.9137 93.0434 57.6215 96.615 57.3293C104.502 56.745 111.496 60.3973 110.603 70.3317C109.264 84.0646 108.222 97.6514 107.181 111.384C106.734 116.644 104.056 118.689 98.6983 117.958C87.8349 116.498 77.7156 112.845 68.7868 106.563C58.965 99.5506 52.1197 90.3467 48.5481 78.9513C47.3576 75.1528 46.4647 71.3544 45.5718 67.5559C44.5301 63.1731 46.6135 60.1051 51.2267 59.3746C51.5244 59.3746 51.9708 59.2286 52.2685 59.2286C63.4295 58.7903 74.5905 58.4981 86.4956 58.0598Z"
                    fill="#105F43"
                    fill-opacity="0.07"
                  />
                  <path
                    d="M31.7341 56.8921C16.7039 57.1843 1.67377 57.4765 -13.3564 57.7687C-14.6958 57.7687 -16.1839 57.7687 -17.5232 57.7687C-22.7317 57.4765 -24.3686 52.5093 -23.9222 49.1491C-22.5828 39.653 -21.3924 30.1569 -19.9042 20.6607C-19.309 16.1318 -18.7137 11.4568 -17.5232 7.07396C-16.3327 2.54504 -12.7612 0.645812 -8.14794 1.66847C6.73344 4.88255 19.6802 11.4568 29.5019 23.2904C35.9009 31.1795 39.026 40.3835 40.663 50.1718C41.407 54.2624 39.1748 56.6 35.0081 56.8921C33.9664 57.0382 32.9247 56.8921 31.883 56.8921C31.7342 56.8921 31.7341 56.8921 31.7341 56.8921Z"
                    fill="#105F43"
                    fill-opacity="0.07"
                  />
                  <path
                    d="M43.4894 28.1108C43.4894 21.6826 43.6382 15.2545 43.4894 8.82633C43.3405 1.9599 48.6978 -0.231519 53.6087 0.498953C68.7877 2.83646 84.1155 5.32007 99.2946 7.80367C105.694 8.82633 108.521 13.3553 106.289 19.199C101.973 30.3022 94.8302 39.3601 84.7108 46.0804C75.0379 52.6546 64.0256 55.2843 52.567 56.4531C46.7632 57.0375 43.787 54.5539 43.6381 48.7101C43.4893 41.9897 43.4894 35.1233 43.4894 28.1108Z"
                    fill="#105F43"
                    fill-opacity="0.07"
                  />
                </svg>
              </div>
              <FilterCompMobileView
        visibleFilterDrawer={visibleFilterDrawer}
        setCheckFilter={setCheckFilter}
        setCourseTrainingMasterCategoryIdState={setCourseTrainingMasterCategoryIdState}
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
        dateFromState={dateFromState}
        dateToState={dateToState}
        filterArr={filterArr}
        filterArr1={filterArr1}
        filterArr2={filterArr2}
        priceState={priceState}
        sliderChange={sliderChange}
        onChangeLocation={onChangeLocation}
        locationState={locationState}
        courseType={courseType}
        onCourseTypeChange={onCourseTypeChange}
        checkFilter={checkFilter}
        onFilterCategoryCheckFilter={onFilterCategoryCheckFilter}
        onFilterLevelCheckFilter={onFilterLevelCheckFilter}
        onFilterChange={onFilterChange}
        onFilterChange1={onFilterChange1}
        onFilterCategoryChange={onFilterCategoryChange}
        onFilterLevelChange={onFilterLevelChange}
        filterArr3={filterArr3}
        checkFilter1={checkFilter1}
        setVisibleFilterDrawer={setVisibleFilterDrawer}
        />
            </StyledMobFilterBody>
          </StyledMobFilter>

          <Container style={{ marginBottom: "30px" }}>
            <Col span={24}>
              <Row gutter={[8, 8]} style={{ justifyContent: "end" }}>
                {loadingDetailRecord ? (
                  <>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((item, index) => (
                      <Col md={12} sm={12} xs={12} key={index}>
                        <SkeletonComp
                          page={"courses-landing-page"}
                          Img={SymposiumsCardImg}
                        />
                      </Col>
                    ))}
                  </>
                ) : (
                  <>
                    {statusCodeStatus === "200" ? (
                      <>
                        {getAllRecordsState?.map((items,index) => (
                          <Col md={12} sm={12} xs={12} key={index}>
                            <FeaturedCard
                              id={items?.id}
                              Img={SymposiumsCardImg}
                              FeaturedType={items?.recordType_AR}
                              EnrolledStudents={items?.enrolled}
                              CourseName={items?.title_AR}
                              Time={items?.duration_AR}
                              Rating={items?.rating}
                              TotalRatings={items?.reviewCount}
                              MinPrice={items?.priceMin}
                              MaxPrice={items?.priceMax}
                              paidFree={items?.paidFree}
                              SubCategory={items?.subCategory}
                              cme={items?.creditHours}
                              name={"symposiums"}
                              page={"symposium-landing-page"}
                            />
                          </Col>
                        ))}
                      </>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          width: "100%",
                        }}
                      >
                        <Empty />
                      </div>
                    )}
                  </>
                )}
              </Row>
              {totalRecord > 9 && (
                <PaginationRow>
                  <div>
                    <Pagination
                      defaultCurrent={1}
                      onChange={(e) => setPageNo(e)}
                          total={totalRecord}
                          defaultPageSize={9}
                    />
                  </div>
                </PaginationRow>
              )}
            </Col>
          </Container>

          <Footer />
        </div>
      </body>
    </div>
  );

  // const filterArr3 = ["ABC Building 01", "ABC Building 02", "ABC Building 03"];

  //layout effect to check whether the screen is desktop or mobile
  useLayoutEffect(() => {
    if (window.innerWidth > 991) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth > 991) {
        setIsDesktop(true);
      } else {
        setIsDesktop(false);
      }
    };
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  return <>{isDesktop ? DesktopView : MobileView}</>;
};

export default CourseLandingPage;

const CoursesSection = styled.div`
  .ant-row {
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
`;

const SectionAfterHeroCol = styled(Col)`
  :not(:last-child) {
    border-right: 1px solid #ddd !important;
  }
`;

const StyledCollapse = styled(Collapse)`
  .ant-collapse-expand-icon {
    width: 100% !important;
  }
`;

const SectionAfterHero = styled.div`
  .ant-row {
    position: relative;
    padding: 10px 40px;
    @media (max-width: 992px) {
      padding: 10px 0px;
    }
  }
  background-color: rgba(16, 95, 67, 0.06);
  .ant-col:last-child {
    border-right: rgba(16, 95, 67, 0.06) important;
    @media (max-width: 992px) {
      border-right: none !important;
    }
  }
  .swipper_slider_btns {
    border: none;
    background-color: transparent;
    position: absolute;
  }
  .ssb-next,
  .ssb-prev {
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;
  }
  .ssb-next {
    right: 10px;
  }
  .ssb-prev {
    left: 10px;
  }
`;

const Head1Section = styled.div`
  .ant-row {
    padding: 10px 80px;
    @media (max-width: 992px) {
      margin-top: 20px;
      padding: 10px 0px;
    }
    justify-content: space-between;
    h1 {
      font-family: GESSTwoBold;
      margin-bottom: 0px;
      // font-weight: 700;
      font-size: 28px;
      line-height: 46px;
      color: #105f43;
    }
  }
`;

const Head1SectionDiv = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-bottom: 0px;
    // margin-right: 15px;
    font-weight: 500;
    font-family:"GESSTwoLight"
  }
`;

const ImgDiv = styled.div`
  margin-left: 8px;
  display: flex;
  align-items: center;
  img {
    object-fit: contain;
  }
`;

const TitleDiv = styled.p`
  margin-bottom: 0px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #000;
  font-family: 'GESSTwoLight' !important;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DescriptionDiv = styled.p`
  margin-bottom: 0px;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #717171;
  font-family: 'GESSTwoLight', sans-serif !important;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AlignCenter = styled.div`
  display: grid;
  align-items: center;
`;

const BreadcrumbDiv = styled.div`
  padding: 20px 80px;
  @media (max-width: 992px) {
    padding: 10px;
  }
  border-bottom: 1px solid #dddddd;
`;

const StyledDivider = styled(Divider)`
  margin: 14px 0 !important;
`;

const CoursesRow = styled(Row)`
  padding-inline: 66px;
  padding-bottom: 20px;
`;

const FilterDiv = styled.div`
  .ant-row {
    justify-content: space-between;
    h1 {
      margin-bottom: 0px;
      font-size: 20px;
      font-weight: 500;
    }
  }

  .ant-collapse-arrow {
    right: 6px !important;
  }

  .ant-collapse-header {
    padding: 12px 0px !important;
  }

  background: #fafafa;
  padding: 20px;
  border-radius: 15px;
  .ant-collapse-content > .ant-collapse-content-box {
    padding-bottom: 16px !important;
    padding-inline: 0px !important;
  }

  .ant-checkbox-wrapper {
    margin-left: 0px !important;
    margin-bottom: 6px !important;
  }

  .ant-collapse-content-box {
    display: grid !important;
  }
`;

const CloseDiv = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-bottom: 0px;
    margin-right: 5px;
  }
  &:hover {
    cursor: pointer;
  }
`;

const StyledSlider = styled(Slider)`
  .ant-slider-track {
    background-color: #424242 !important;
  }
  .ant-slider-handle {
    background-color: #424242 !important;
    border: solid 2px #424242 !important;
  }
`;

const PriceRangeDiv = styled.div`
  display: flex;
  p {
    margin-bottom: 0px;
  }
  .sar {
    font-size: 12px;
    display: display;
    // align-items: end;
    // font-weight: 900;
    margin-right: 5px;
    margin-top: 8px;
    color: #838383 !important;
  }
  .price {
    font-size: 19px;
    display: flex;
    align-items: end;
    color: #838383 !important;
  }
`;

const DateRangeDiv = styled.div`
  display: grid;
  width: 100% !important;

  p {
    margin-bottom: 0px;
    @media (min-width: 992px) {
      text-align: start;
    }
    @media (max-width: 991px) {
      text-align: start;
    }
  }
  .sar {
    font-size: 12px;
    display: display;
    // align-items: end;
    // font-weight: 900;
    margin-right: 5px;
    margin-top: 13px;
  }
  .price {
    font-size: 24px;
    display: flex;
    align-items: end;
  }
  .ant-picker {
    width: 100% !important;
    height: 42px !important;
    border: 1px solid #636363 !important;
    background-color: #fafafa !important;
    border-radius: 6px !important;
  }
  .ant-radio-checked .ant-radio-inner {
    border-color: #105f43 !important;
  }
`;

const DateRangeDiv1 = styled.div`
  display: grid;
  width: 100% !important;
  margin-top: 20px;

  p {
    margin-bottom: 0px;
    @media (min-width: 992px) {
      text-align: start;
    }
    @media (max-width: 991px) {
      text-align: start;
    }
  }
  .sar {
    font-size: 12px;
    display: display;
    // align-items: end;
    // font-weight: 900;
    margin-right: 5px;
    margin-top: 13px;
  }
  .price {
    font-size: 24px;
    display: flex;
    align-items: end;
  }
  .ant-picker {
    width: 100% !important;
    height: 42px !important;
    border: 1px solid #636363 !important;
    background-color: #fafafa !important;
    border-radius: 6px !important;
  }
  .ant-radio-checked .ant-radio-inner {
    border-color: #105f43 !important;
  }
`;

const PriceRangeRow = styled(Row)`
  justify-content: space-between;
`;

const DateRangeRow = styled(Row)`
  justify-content: space-between;
  width: 100% !important;
`;

const StyledGroup = styled(Radio.Group)`
  display: flex;
  justify-content: space-between;
`;

const OptionTopDiv = styled.div`
  margin-top: 6px;
  .ant-collapse-header {
    -moz-transform: scaleX(-1) !important;
    -webkit-transform: scaleX(-1) !important;
    -o-transform: scaleX(-1) !important;
    transform: scaleX(-1) !important;
    -ms-filter: fliph !important;
    filter: fliph !important;
  }
  .ant-collapse-header-text {
    -moz-transform: scaleX(-1) !important;
    -webkit-transform: scaleX(-1) !important;
    -o-transform: scaleX(-1) !important;
    transform: scaleX(-1) !important;
    -ms-filter: fliph !important;
    filter: fliph !important;
  }
`;

const PaginationRow = styled(Row)`
  justify-content: center;
  margin-top: 30px;
  .ant-pagination-prev {
    margin-right: 0px !important;
    margin-left: 8px !important;
    svg {
      -webkit-transform: scaleX(-1);
      transform: scaleX(-1);
    }
  }
  .ant-pagination-next {
    svg {
      -webkit-transform: scaleX(-1);
      transform: scaleX(-1);
    }
  }
  div {
    box-shadow: 6px 6px 25px rgba(0, 0, 0, 0.09) !important;
    padding: 7px !important;
    border-radius: 9px !important;
  }
  .ant-pagination-item {
    border-radius: 5px !important;
    border: none !important;
    background: #f8f8f8 !important;
    margin-left: 8px !important;
    margin-right: unset !important;
    a {
      color: #adadad !important;
      font-family: "GESSTwoLight" !important;
    }
    a:hover {
      color: #adadad !important;
    }
  }
  .ant-pagination-item-active {
    background: #105f43 !important;
    color: #fff !important;
    border-color: #105f43 !important;
  }
  .ant-pagination-item-active a {
    color: #fff !important;
  }
  .ant-pagination-item:focus-visible,
  .ant-pagination-item:hover {
    border-color: #105f43 !important;
    color: #105f43 !important;
  }
  .ant-pagination-item:hover a {
    color: none !important;
  }

  .ant-pagination-prev:focus-visible .ant-pagination-item-link,
  .ant-pagination-next:focus-visible .ant-pagination-item-link,
  .ant-pagination-prev:hover .ant-pagination-item-link,
  .ant-pagination-next:hover .ant-pagination-item-link {
    border-radius: 5px !important;
    border: none !important;
    background: #f8f8f8 !important;
  }

  .ant-pagination-next {
    border-radius: 5px !important;
    border: none !important;
    background: #f8f8f8 !important;
    a {
      color: #adadad !important;
    }
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
    min-width: 1160px;
  }

  @media only screen and (min-width: 1259px) and (max-width: 1359px) {
    min-width: 1260px;
  }

  @media (min-width: 1342px) {
    // min-width: 1340px;
    min-width: 1280px;
  }
`;

const MainBreadcrumbDiv = styled.div`
  border-bottom: 1px solid #dddddd;
`;

// Mobile View
const StyledMobFilter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #fff;
  transform: translate(-400px);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  z-index: 200;
  overflow: auto;
  z-index: 90001 !important;

  ::-webkit-scrollbar {
    width: 0;
  }

  &&.show {
    transform: translate(0);
    opacity: 1;
    visibility: visible;
  }
`;
const StyledMobFilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 20px 15px;
  background: #fff;

  h3 {
    margin: 0;
    font-size: 20px;
    color: #000;
    font-family: "TitilliumSemiBold";
  }
  > span {
    display: inline-block;
    height: 18px;
    cursor: pointer;
  }
`;
const StyledMobFilterBody = styled.div`
  position: relative;
  padding: 32px 20px;

  .filterTopLeftBg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
`;

//arsalan
const UtilityBtnsRow = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  .utilitybtns_for_filter_and_sort {
    border-radius: 2px;
    color: #636363;
  }
`;

const StykedCollapse = styled(Collapse)`
  .ant-collapse-header-text {
    text-align: start !important;
    -moz-transform: scaleX(-1) !important;
    -webkit-transform: scaleX(-1) !important;
    -o-transform: scaleX(-1) !important;
    transform: scaleX(-1) !important;
    -ms-filter: fliph !important;
    filter: fliph !important;
  }
  .ant-collapse-header {
    -moz-transform: scaleX(-1) !important;
    -webkit-transform: scaleX(-1) !important;
    -o-transform: scaleX(-1) !important;
    transform: scaleX(-1) !important;
    -ms-filter: fliph !important;
    filter: fliph !important;
  }
  .anticon {
    margin-inline: 0px !important;
  }
`;

const SkeletonSliderDiv = styled.div`
  background: #fff;
  position: relative;
  backdrop-filter: blur(20px);
  // top: 76px;
  @media (min-width: 991px) {
    height: 591px;
    margin-bottom: 80px;
  }
  @media (max-width: 992px) {
    height: 300px;
  }
`;
