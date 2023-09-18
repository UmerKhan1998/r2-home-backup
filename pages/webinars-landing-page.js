import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import OurFeaturedCourseCarousel from "../src/components/Carousel/OurFeaturedCourse";
import endpoints from "../src/api";
import SkeletonComp from "../src/components/Skeleton";
import Hero from "../src/components/Hero";
import Link from "next/link";
import router from "next/router";
//swiper imports
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
//next.config
import { brand } from "../next.config";
import {
  Breadcrumb,
  Checkbox,
  Col,
  Collapse,
  DatePicker,
  Divider,
  Pagination,
  Empty,
  Radio,
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
  WebinarsCardImg,
  FeaturedCourse1,
  FeaturedCourse2,
  FeaturedCourse3,
  FeaturedCourse4,
  Interns,
  R2Favicon,
  SectionAfterHeroImg1,
  SectionAfterHeroImg2,
  SectionAfterHeroImg3,
} from "../images";
import FeaturedCard from "../src/components/Cards/FeaturedCard";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Header from "../src/components/header";
import Footer from "../src/components/footer";
import CustomButton from "../src/components/Button";
import FilterComp from "../src/components/FilterComp.js";
import FilterCompMobileView from "../src/components/FilterComp.js/MobileView";

const { Option } = Select;

const { Panel } = Collapse;
const CourseLandingPage = () => {
  const [checkFilter, setCheckFilter] = useState([]);
  const [checkFilter1, setCheckFilter1] = useState([]);
  const [pageSize, setPageSize] = useState(9);
  const [pageNo, setPageNo] = useState(1);
  const [language, setLanguage] = useState("English");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState("");
  const [loadingDetailRecord, setLoadingDetailRecord] = useState(true);
  const [swiper, setSwiper] = useState(null);

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

  const [statusCodeStatus, setStatusCodeStatus] = useState();

  const [isDesktop, setIsDesktop] = useState(false);

  const getAllRecordFunc = async (data, sea) => {
    setLoadingDetailRecord(true);
    try {
      // if (token && menuId) {
      // //console.log('menuId', menuId, token)
      const response = await endpoints.getAllRecord(
        "Webinar",
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
      setLoadingDetailRecord(false);
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
      const response = await endpoints.GetStaticPages("webinars-landing-page");
      if (response?.data?.statusCode === "200") {
        setGetStaticPagesState(response?.data?.data);
        setHeroLoading(false);
      } else if (response?.data?.statusCode === "404") {
        router.push('/')
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

  const [dropdownCaretState, setDropdownCaretState] = useState(false);

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
                      name={"webinar-landing-page"}
                      title={data?.content?.title_en}
                      image={data?.content?.image}
                      background_color={data?.content?.background_color}
                    />
                  </div>
                  <SectionAfterHero>
                    <Container>
                      <Row>
                        {(data?.content?.tabs.map((item, index)=>(
                          <SectionAfterHeroCol span={8} key={index}>
                            <Row style={{flexWrap: "nowrap"}}>
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
                                <TitleDiv>{item?.title_en}</TitleDiv>
                                <DescriptionDiv>
                                  {item?.description_en}
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
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <Link href="/">Home</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>Webinars</Breadcrumb.Item>
                </Breadcrumb>
              </BreadcrumbDiv>
            </Container>
          </MainBreadcrumbDiv>

          {/* Head1 Section */}
          <Container id="courses">
            <Head1Section>
              <Row>
                <h1>Webinars</h1>
                <Head1SectionDiv>
                  {totalRecord && (
                    <p>
                      Showing 1–{totalRecord} of {totalRecord} webinars
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
              <CoursesRow gutter={[6, 24]}>
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
                              Img={WebinarsCardImg}
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
                                  Img={WebinarsCardImg}
                                  FeaturedType={items?.recordType}
                                  EnrolledStudents={items?.enrolled}
                                  CourseName={items?.title_EN}
                                  Time={items?.duration_EN}
                                  Rating={items?.rating}
                                  TotalRatings={items?.reviewCount}
                                  MinPrice={items?.priceMin}
                                  MaxPrice={items?.priceMax}
                                  paidFree={items?.paidFree}
                                  SubCategory={items?.subCategory}
                                  cme={items?.creditHours}
                                  name={"webinars"}
                                  page={"webinar-page"}
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
        <Header 
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
         setCourseType={setCourseType}/>

        <div>
        {!HeroLoading ? (
                <>
          {GetStaticPagesState?.contentValue &&
            Object.values(JSON.parse(GetStaticPagesState?.contentValue))?.map(
              (data, index) => (
                <div key={index}>
                  {data["type"] === "top_banner" && (<>
                    <Hero
                      getAllCoursesRecordFilterState={getAllCoursesRecordFilterState}
                      search={search}
                      setSearch={setSearch}
                      getAllRecordFunc1={getAllRecordFunc}
                      name={"webinar-landing-page"}
                      title={data?.content?.title_en}
                      image={data?.content?.image}
                      background_color={data?.content?.background_color}
                      type={"Webinars"}
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
                                <SectionAfterHeroCol span={24}>
                                  <Row style={{flexWrap: "nowrap"}}>
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
                                      <TitleDiv>{item?.title_en}</TitleDiv>
                                      <DescriptionDiv>
                                        {item?.description_en}
                                      </DescriptionDiv>
                                    </AlignCenter>
                                  </Row>
                                </SectionAfterHeroCol>
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
          }   </>
          ) : (
               <SkeletonSliderDiv>
                 {/* <Hero name={"home-page"} /> */}
               </SkeletonSliderDiv>
             )}
          {/* Breadcrumb */}
          <MainBreadcrumbDiv>
            <Container>
              <BreadcrumbDiv>
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <Link href="/">Home</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>Webinars</Breadcrumb.Item>
                </Breadcrumb>
              </BreadcrumbDiv>
            </Container>
          </MainBreadcrumbDiv>
          {/* Head1 Section */}
          <Container id="courses">
            <Head1Section>
              <Row>
                {/* <h1>Courses</h1> */}
                <Head1SectionDiv>
                  {totalRecord && (
                    <p>
                      Showing 1–{totalRecord} of {totalRecord} webinars
                    </p>
                  )}
                </Head1SectionDiv>
                {/* <StyledDivider /> */}
              </Row>
            </Head1Section>

            <UtilityBtnsRow>
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
                Filter <FilterOutlined />
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
          <Container style={{ marginBottom: "30px" }}>
            <Col span={24}>
              <Row gutter={[8, 8]} style={{ justifyContent: "start" }}>
                {loadingDetailRecord ? (
                  <>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((item, index) => (
                      <Col md={12} sm={12} xs={12} key={index}>
                        <SkeletonComp
                          page={"courses-landing-page"}
                          Img={WebinarsCardImg}
                        />
                      </Col>
                    ))}
                  </>
                ) : (
                  <>
                    {statusCodeStatus === "200" ? (
                      <>
                        {getAllRecordsState?.map((items, index) => (
                          <Col md={12} sm={12} xs={12} key={index}>
                            <FeaturedCard
                              id={items?.id}
                              Img={WebinarsCardImg}
                              FeaturedType={items?.recordType}
                              EnrolledStudents={items?.enrolled}
                              CourseName={items?.title_EN}
                              Time={items?.duration_EN}
                              Rating={items?.rating}
                              TotalRatings={items?.reviewCount}
                              MinPrice={items?.priceMin}
                              MaxPrice={items?.priceMax}
                              paidFree={items?.paidFree}
                              SubCategory={items?.subCategory}
                              cme={items?.creditHours}
                              name={"webinars"}
                              page={"webinar-page"}
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
  border-right: 1px solid #ddd !important;
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
      margin-bottom: 0px;
      font-family: 'TitilliumBold', sans-serif;
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
    margin-right: 15px;
    font-weight: 500;
  }
`;

const ImgDiv = styled.div`
  margin-right: 8px;
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
  // border-bottom: 1px solid #dddddd;
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
    margin-left: 5px;
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
`;

const PaginationRow = styled(Row)`
  justify-content: center;
  margin-top: 30px;
  .ant-pagination-prev {
    // display: none !important;
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
    a {
      color: #adadad !important;
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
