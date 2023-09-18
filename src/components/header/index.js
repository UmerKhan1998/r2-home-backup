import React, { useState, useLayoutEffect } from "react";
import {
  Menu,
  Drawer,
  Switch,
  Collapse,
  Dropdown,
  Badge,
  Row,
  Col,
  Space,
  Divider,
  Button,
  Avatar,
  Affix,
} from "antd";
import styled from "styled-components";
// import Image from "next/image";
import Link from "next/link";
import Image from "next/image";
import { getCookies, removeCookies, setCookies } from "../../helpers/cookie";

// import { Logo } from "../../../images/index";
import Logo from "../logo";
// import facebookBg from "../../../public/images/facebook.svg";

//icons
import {
  DownOutlined,
  MenuOutlined,
  BellFilled,
  PlusOutlined,
  CaretDownOutlined,
  DoubleRightOutlined,
  DownloadOutlined,
  AppstoreOutlined,
  SettingOutlined,
  MailOutlined,
  RightOutlined,
  UserOutlined,
  UpOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import {
  AiFillBoxPlot,
  AiFillShop,
  AiFillSetting,
  AiFillStar,
  AiFillCloseCircle,
} from "react-icons/ai";
import {
  FaMotorcycle,
  FaUserPlus,
  FaWallet,
  FaHome,
  FaUserAlt,
  FaShoppingCart,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";
import { BsFilePost, BsFillChatFill } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { FiMapPin } from "react-icons/fi";
import CustomButton from "../Button";
import {
  AmericanFlag,
  MapIcon,
  SaudiaArabFlag,
  SearchIcon,
  User,
  WishListIcon,
} from "../../../images";
import ProfileImg from "../../../public/images/ProfileImg.png";
import Router, { useRouter } from "next/router";
import {
  about_us,
  AdvancedGeneralDentistry,
  Anesthesiology,
  arabic,
  Cardiology,
  conferences,
  ConservativeDentistry,
  courses,
  dashboard,
  DentalAnaesthesiology,
  Dermatology,
  FamilyDentistry,
  home,
  LearningInstituteText,
  more_categories,
  My_Account_Setting,
  my_profile,
  ObstetricsGynecology,
  OralMedicine,
  OrofacialPain,
  other,
  OtherServices,
  our_courses,
  our_programs,
  our_services,
  our_trainings,
  PediatricDentistry,
  programs,
  register,
  RestoratriveDentistry,
  services,
  sign_in,
  sign_out,
  simulationText,
  switch_to_instructor,
  symposiums,
  trainings,
  webinars,
  workshops,
} from "../../../src/helpers/LanguageConstant";
import { useDispatch, useSelector } from "react-redux";
import { menuService, userData } from "../../redux/actions";
import SearchHeader from "../Search/SearchHeader";
import endpoints from "../../api";

const { SubMenu, Item } = Menu;

const Header = ({
  dropdownCaretState,
  setDropdownCaretState,
  setCheckFilter,
  setCourseTrainingMasterCategoryIdState,
  setOnFilterCategoryCheckFilter,
  setCourseTrainingCategoryId,
  setOnFilterLevelCheckFilter,
  setLevelId,
  setPriceState,
  setDateFromState,
  setDateToState,
  setLocationState,
  setLocationId,
  setCourseType,
  setModalState,
}) => {
  //=================================================Desktop View==========================================================
  const [theme, setTheme] = useState("light");
  const [scroll, setScroll] = useState(0); // To change background-color of header

  const [serviceItemSelect, setServiceItemSelect] = useState("Courses");
  const [serviceItemSelectLink, setServiceItemSelectLink] = useState("");
  // const [dropdownCaretState, setDropdownCaretState] = useState(false);

  //console.log("serviceItemSelectLink", serviceItemSelectLink);

  const [selectItemState, setSelectItemState] = useState();

  const router = useRouter();

  const userDataState = useSelector((state) => state?.userDataReducer);
  const authToken = getCookies("token");
  const userStatus = getCookies("userStatus");
  const [isAuthorized, setAuthorized] = useState(false);
  useLayoutEffect(() => {
    if (authToken === undefined) {
      setAuthorized(false);
    } else if (userStatus === undefined || userStatus === "false") {
      setAuthorized(false);
    } else if (authToken || userStatus === "true") {
      setAuthorized(true);
    }
  }, [userDataState]);

  const dispatch = useDispatch();

  const Signout = async () => {
    try {
      const response = await endpoints.LogoutUser(userDataState?.authToken);
      if (response?.data?.statusCode === "200") {
        deleteAllCookies();
        router.push("/");
        dispatch(userData({}));
      }
    } catch (error) {
      //console.log(error);
    }
  };

  const deleteAllCookies = () => {
    const cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      if (cookies[i] != "") {
        var cookie = cookies[i];
        var eqPos = cookie.split("=");
        var name = eqPos[0].trim();
        removeCookies(name);
      }
    }
  };

  const [selectLanguage, setSelectLanguage] = useState({
    img: AmericanFlag,
    name: "English",
  });

  const changeTheme = (e) => {
    if (e === true || scroll > 1) {
      setTheme("light");
    } else {
      setTheme("light");
    }
  };

  /**
   * This useLayoutEffect function is used to change header background-color
   */
  useLayoutEffect(() => {
    changeTheme();

    const handleScroll = () => {
      setScroll(window.scrollY);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  });

  const selectItemFunc = (id) => setSelectItemState(id);

  const [getFeaturedRecordLoading,setGetFeaturedRecordLoading]=useState(false)

  const [getFeaturedRecordState,setGetFeaturedRecordState]=useState([])

  const getFeaturedRecordFunc = async () => {
    setGetFeaturedRecordLoading(true);
      try {
      // if (token && menuId) {
      const response = await endpoints
        .getFeaturedRecord
        // token,
        // menuId,
        // PageSize,
        // PageNo,
        // Language,
        // Search,
        ();
      if (response) {
        setGetFeaturedRecordState(response?.data?.data)
        setGetFeaturedRecordLoading(false);
    }
      // setTotalPaginationRecord(response?.data?.data?.totalRecord)
      // setDataState(response?.data?.data?.taxListViewModels)
      // setGetTaxState(response?.data?.data)
    } catch (err) {
      setGetFeaturedRecordLoading(false);
    }
  };

  useLayoutEffect(()=>{
    getFeaturedRecordFunc()
  },[])


    const [dataState, setDataState] = useState([]);
    const [dataState1, setDataState1] = useState([]);
    const [dataState2, setDataState2] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCourseTrainingCategoryFunc = async (id) => {
    try {
      setLoading(true);
      // if (token && menuId) {
      // //console.log('menuId', menuId, token)
      const response = await endpoints.GetAllRequestaServiceLov(id);
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

  const getCourseTrainingCategoryFunc1 = async (id) => {
    try {
      setLoading(true);
      // if (token && menuId) {
      // //console.log('menuId', menuId, token)
      const response = await endpoints.GetAllRequestaServiceLov(id);
      if (response) {
        //console.log("response", response);
        setDataState1(response?.data?.data);
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

  const getCourseTrainingCategoryFunc2 = async (id) => {
    try {
      setLoading(true);
      // if (token && menuId) {
      // //console.log('menuId', menuId, token)
      const response = await endpoints.GetAllRequestaServiceLov(id);
      if (response) {
        //console.log("response", response);
        setDataState2(response?.data?.data);
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

  const [getDepartmentLovState,setGetDepartmentLovState]=useState()

  const [getDepartmentLovLoadingState,setGetDepartmentLovLoadingState]=useState(false)

    const GetDepartmentLovFunc = async () => {
    setGetDepartmentLovLoadingState(true);
    try {
        const response = await endpoints.GetDepartmentLov(getDepartmentLovState);
        if (response) {
          setGetDepartmentLovState(response?.data?.data);
          setGetDepartmentLovLoadingState(false);
        }
    } catch (err) {
      setGetDepartmentLovLoadingState(false);
    }
  };


  const menu = (OurServicesArr) => (
    <StyledFlexMenuDiv>
      <StyledNotificationMenu>
        {OurServicesArr?.map((item, index) => (
          <>
            {selectItemState === index ? (
              <OurServicesDesignDiv
                key={index}
                onMouseOver={() => {
                  setServiceItemSelect(item?.name);
                  setServiceItemSelectLink(item?.link);
                  selectItemFunc(index);
                  // if(item?.name==="Other Services"){
                  //   getCourseTrainingCategoryFunc()
                  // }
                  if(item?.name==="Learning Institute"){
                    getCourseTrainingCategoryFunc(process.env.NEXT_PUBLIC_LEARNING_INSTITUTE_DEPARTMENT_ID)
                  }
                  if(item?.name==="Simulation"){
                    getCourseTrainingCategoryFunc(process.env.NEXT_PUBLIC_SIMULATION_DEPARTMENT_ID)
                  }
                }}
                onClick={() => {
                  router.push(`/${item?.link}`);
                  setCheckFilter&&setCheckFilter([]);
                  setCourseTrainingMasterCategoryIdState&&setCourseTrainingMasterCategoryIdState([]);
                  setOnFilterCategoryCheckFilter&&setOnFilterCategoryCheckFilter([]);
                  setCourseTrainingCategoryId&&setCourseTrainingCategoryId([]);
                  setOnFilterLevelCheckFilter&&setOnFilterLevelCheckFilter([]);
                  setLevelId&&setLevelId([]);
                  setPriceState&&setPriceState([0, 0]);
                  setDateFromState&&setDateFromState("");
                  setDateToState&&setDateToState("");
                  setLocationState&&setLocationState("");
                  setLocationId&&setLocationId([]);
                  setCourseType&&setCourseType("");
                }}
              >
                <p>{item?.name}</p>
                {OurServicesArr?.find(
                  (item) => item?.name === serviceItemSelect
                )?.sub_list?.length > 0 && <RightOutlined />}
              </OurServicesDesignDiv>
            ) : (
              <>
                <OurServicesDesignDiv
                  key={index}
                  onMouseOver={() => {
                    setServiceItemSelect(item?.name);
                    setServiceItemSelectLink(item?.link);
                    selectItemFunc(index);
                    // if(item?.name==="Other Services"){
                    //   getCourseTrainingCategoryFunc()
                    // }
                    if(item?.name==="Learning Institute"){
                    getCourseTrainingCategoryFunc(process.env.NEXT_PUBLIC_LEARNING_INSTITUTE_DEPARTMENT_ID)
                  }
                  if(item?.name==="Simulation"){
                    getCourseTrainingCategoryFunc(process.env.NEXT_PUBLIC_SIMULATION_DEPARTMENT_ID)
                  }
                  }}
                  onClick={() => router.push(`/${item?.link}`)}
                >
                  <p>{item?.name}</p>
                </OurServicesDesignDiv>
              </>
            )}
          </>
        ))}
      </StyledNotificationMenu>
      <ContentMenuListChildrenDiv>
        {OurServicesArr?.find((item) => item?.name === serviceItemSelect)
          ?.sub_list?.length > 0 && (
            <MenuTitleDiv>
            {/* {console.log('OurServicesArr',item)} */}
            {
              OurServicesArr?.find((item) => item?.name === serviceItemSelect)
                ?.name
            }
          </MenuTitleDiv>
        )}
        <StyledItemRow gutter={[12, 8]}>
          {OurServicesArr?.find((item) => item?.name === serviceItemSelect)
            ?.sub_list?.slice(0, 2)
            ?.map((item, index) => (
              <Col span={12} key={index}>
                <ItemDiv
                  onClick={() => {
                    if(item?.recordType==="Course"){
                      router.push(`/course-detail/${item?.id}`)
                    }
                    if(item?.recordType==="Training"){
                      router.push(`/training-detail/${item?.id}`)
                    }
                    if(item?.recordType==="Program"){
                      router.push(`/program-detail/${item?.id}`)
                    }
                    if(item?.recordType==="Webinar"){
                      router.push(`/webinar-detail/${item?.id}`)
                    }
                    if(item?.recordType==="Workshop"){
                      router.push(`/workshop-detail/${item?.id}`)
                    }
                    if(item?.recordType==="Conference"){
                      router.push(`/conference-detail/${item?.id}`)
                    }
                    if(item?.recordType==="Symposiums"){
                      router.push(`/symposium-detail/${item?.id}`)
                    }
                    if(item?.recordType==="scholarship"){
                      router.push(`/scholarship-personal-information`)
                    }
                    if(item?.recordType==="scholarshipId"){
                      router.push(`/scholarship-track-application`)
                    }
                    if(serviceItemSelect==="Other Services"){
                      router.push(`/service-request`);
                      setCookies('other_services_item_id',item?.id?.trim());
                      setCookies('other_services_item_title', item?.title_EN?.trim());
                      dispatch(menuService({serviceId:item?.id?.trim(), serviceName:item?.title_EN?.trim()}))
                      setModalState&&setModalState(true);
                    }
                    if(serviceItemSelect==="Learning Institute"){
                      router.push(`/service-request`);
                      setCookies('other_services_item_id',item?.id?.trim());
                      setCookies('other_services_item_title', item?.title_EN?.trim());
                      dispatch(menuService({departmentId:process.env.NEXT_PUBLIC_LEARNING_INSTITUTE_DEPARTMENT_ID, departmentName:process.env.NEXT_PUBLIC_LEARNING_INSTITUTE_DEPARTMENT_NAME, serviceId:item?.id?.trim(), serviceName:item?.title_EN?.trim()}))
                      setModalState&&setModalState(true);
                    }
                    if(serviceItemSelect==="Simulation"){
                      router.push(`/service-request`);
                      setCookies('other_services_item_id',item?.id?.trim());
                      setCookies('other_services_item_title', item?.title_EN?.trim());
                      dispatch(menuService({departmentId:process.env.NEXT_PUBLIC_SIMULATION_DEPARTMENT_ID, departmentName:process.env.NEXT_PUBLIC_SIMULATION_DEPARTMENT_NAME, serviceId:item?.id?.trim(), serviceName:item?.title_EN?.trim()}))
                      setModalState&&setModalState(true);
                    }
                  }}
                  >
                  <Badge status="success" color="#4C8772" />
                  <p>{item?.title_EN}</p>
                </ItemDiv>
              </Col>
            ))}
          {OurServicesArr?.find((item) => item?.name === serviceItemSelect)
            ?.sub_list?.length > 2 && <Divider />}
        </StyledItemRow>
        <StyledItemRow gutter={[12, 8]}>
          {OurServicesArr?.find((item) => item?.name === serviceItemSelect)
            ?.sub_list?.slice(2, 4)
            ?.map((item, index) => (
              <Col span={12} key={index}>
                 <ItemDiv
                  onClick={() => {
                    if(item?.recordType==="Course"){
                      router.push(`/course-detail/${item?.id}`)
                    }
                    if(item?.recordType==="Training"){
                      router.push(`/training-detail/${item?.id}`)
                    }
                    if(item?.recordType==="Program"){
                      router.push(`/program-detail/${item?.id}`)
                    }
                    if(item?.recordType==="Webinar"){
                      router.push(`/webinar-detail/${item?.id}`)
                    }
                    if(item?.recordType==="Workshop"){
                      router.push(`/workshop-detail/${item?.id}`)
                    }
                    if(item?.recordType==="Conference"){
                      router.push(`/conference-detail/${item?.id}`)
                    }
                    if(item?.recordType==="Symposiums"){
                      router.push(`/symposium-detail/${item?.id}`)
                    }
                    if(item?.recordType==="scholarship"){
                      router.push(`/scholarship-personal-information`)
                    }
                    if(item?.recordType==="scholarshipId"){
                      router.push(`/scholarship-track-application`)
                    }
                    if(serviceItemSelect==="Other Services"){
                      router.push(`/service-request`);
                      setCookies('other_services_item_id',item?.id?.trim());
                      setCookies('other_services_item_title', item?.title_EN?.trim());
                      dispatch(menuService({serviceId:item?.id?.trim(), serviceName:item?.title_EN?.trim()}))
                      setModalState&&setModalState(true);
                    }
                    if(serviceItemSelect==="Learning Institute"){
                      router.push(`/service-request`);
                      setCookies('other_services_item_id',item?.id?.trim());
                      setCookies('other_services_item_title', item?.title_EN?.trim());
                      dispatch(menuService({departmentId:process.env.NEXT_PUBLIC_LEARNING_INSTITUTE_DEPARTMENT_ID, departmentName:process.env.NEXT_PUBLIC_LEARNING_INSTITUTE_DEPARTMENT_NAME, serviceId:item?.id?.trim(), serviceName:item?.title_EN?.trim()}))
                      setModalState&&setModalState(true);
                    }
                    if(serviceItemSelect==="Simulation"){
                      router.push(`/service-request`);
                      setCookies('other_services_item_id',item?.id?.trim());
                      setCookies('other_services_item_title', item?.title_EN?.trim());
                      dispatch(menuService({departmentId:process.env.NEXT_PUBLIC_SIMULATION_DEPARTMENT_ID, departmentName:process.env.NEXT_PUBLIC_SIMULATION_DEPARTMENT_NAME, serviceId:item?.id?.trim(), serviceName:item?.title_EN?.trim()}))
                      setModalState&&setModalState(true);
                    }
                  }}
                  >
                  <Badge status="success" color="#4C8772" />
                  <p>{item?.title_EN}</p>
                </ItemDiv>
              </Col>
            ))}
          {OurServicesArr?.find((item) => item?.name === serviceItemSelect)
            ?.sub_list?.length > 4 && <Divider />}
        </StyledItemRow>
        <StyledItemRow gutter={[12, 8]}>
          {OurServicesArr?.find((item) => item?.name === serviceItemSelect)
            ?.sub_list?.slice(4, 6)
            ?.map((item, index) => (
              <Col span={12} key={index}>
                 <ItemDiv
                  onClick={() => {
                    if(item?.recordType==="Course"){
                      router.push(`/course-detail/${item?.id}`)
                    }
                    if(item?.recordType==="Training"){
                      router.push(`/training-detail/${item?.id}`)
                    }
                    if(item?.recordType==="Program"){
                      router.push(`/program-detail/${item?.id}`)
                    }
                    if(item?.recordType==="Webinar"){
                      router.push(`/webinar-detail/${item?.id}`)
                    }
                    if(item?.recordType==="Workshop"){
                      router.push(`/workshop-detail/${item?.id}`)
                    }
                    if(item?.recordType==="Conference"){
                      router.push(`/conference-detail/${item?.id}`)
                    }
                    if(item?.recordType==="Symposiums"){
                      router.push(`/symposium-detail/${item?.id}`)
                    }
                    if(item?.recordType==="scholarship"){
                      router.push(`/scholarship-personal-information`)
                    }
                    if(item?.recordType==="scholarshipId"){
                      router.push(`/scholarship-track-application`)
                    }
                    if(serviceItemSelect==="Other Services"){
                      router.push(`/service-request`);
                      setCookies('other_services_item_id',item?.id?.trim())
                      setCookies('other_services_item_title', item?.title_EN?.trim())
                      dispatch(menuService({serviceId:item?.id?.trim(), serviceName:item?.title_EN?.trim()}))
                      setModalState&&setModalState(true);
                    }
                    if(serviceItemSelect==="Learning Institute"){
                      router.push(`/service-request`);
                      setCookies('other_services_item_id',item?.id?.trim());
                      setCookies('other_services_item_title', item?.title_EN?.trim());
                      dispatch(menuService({departmentId:process.env.NEXT_PUBLIC_LEARNING_INSTITUTE_DEPARTMENT_ID, departmentName:process.env.NEXT_PUBLIC_LEARNING_INSTITUTE_DEPARTMENT_NAME, serviceId:item?.id?.trim(), serviceName:item?.title_EN?.trim()}))
                      setModalState&&setModalState(true);
                    }
                    if(serviceItemSelect==="Simulation"){
                      router.push(`/service-request`);
                      setCookies('other_services_item_id',item?.id?.trim());
                      setCookies('other_services_item_title', item?.title_EN?.trim());
                      dispatch(menuService({departmentId:process.env.NEXT_PUBLIC_SIMULATION_DEPARTMENT_ID, departmentName:process.env.NEXT_PUBLIC_SIMULATION_DEPARTMENT_NAME, serviceId:item?.id?.trim(), serviceName:item?.title_EN?.trim()}))
                      setModalState&&setModalState(true);
                    }
                  }}
                  >
                  <Badge status="success" color="#4C8772" />
                  <p>{item?.title_EN}</p>
                </ItemDiv>
              </Col>
            ))}
        </StyledItemRow>
        {OurServicesArr?.find((item) => item?.name === serviceItemSelect)
          ?.sub_list?.length > 0 && (
            <>
            {/* {console.log('serviceItemSelectLink',serviceItemSelectLink)} */}
            {serviceItemSelectLink!=="service-request"&&
          <CustomButton
          customStyle={{
              height: 30,
              marginTop: 15,
              marginLeft: 6,
              backgroundColor: "#105F43",
              color: "#fff",
              border: "1px solid #064B33",
            }}
            onClick={() => router.push(`/${serviceItemSelectLink}`)}
          >
            View More
          </CustomButton>
            }
              </>
        )}
      </ContentMenuListChildrenDiv>
    </StyledFlexMenuDiv>
  );

  const countryArr = [
    // {
    //   img: "https://img.freepik.com/free-vector/illustration-usa-flag_53876-18165.jpg",
    //   name: "English",
    //   link: "/",
    // },
    {
      img: SaudiaArabFlag,
      name: arabic,
      link: "/ar",
    },
  ];

  const menu1 = (
    <StyledNotificationMenu1>
      {countryArr?.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            setSelectLanguage({ img: item?.img, name: item?.name });
            router.push(
              `/ar${location.href
                .substr(
                  location.href.indexOf(location.host) + location.host.length
                )
                .replace("/ar", "")}`
            );
          }}
          className={"select-country"}
        >
          <Avatar size={20} src={item?.img} />
          <p className="language-title">{item?.name}</p>
        </div>
      ))}
    </StyledNotificationMenu1>
  );

  const menu3 = (
    <StyledNotificationMenu>
      <p>B3DXB 2022</p>
      <p>Your Home Your Choice</p>
    </StyledNotificationMenu>
  );

  const UserDropdown = (
    <ProfileDropdown>
      <div className="profile-dropdown">
        <div className="profile-dropdown-sub">
          <div className="profile-dropdown-name">
            <div className="profile-img">
              {userDataState?.photoUrl == "" ? (
                <img loading="lazy"src={User} />
              ) : (
                <img loading="lazy"src={userDataState?.photoUrl} />
              )}
            </div>
            <div>
              <h2>
                {userDataState?.firstName_EN} {userDataState?.lastName_EN}
              </h2>
              {userDataState?.email?.split("@")[0]?.length > 10 ? (
                <p>
                  {userDataState?.email?.split("@")[0]?.slice(0, 10)}***@
                  {userDataState?.email?.split("@")[1]}
                </p>
              ) : (
                <p>{userDataState?.email}</p>
              )}
            </div>
          </div>
          {userDataState?.instructorApproved === true && (
            <div className="btn-div">
              <CustomButton
                customStyle={{
                  border: "1px solid #cbcbcb",
                  width: "84%",
                }}
                onClick={() =>
                  window.open(
                    `${process.env.NEXT_PUBLIC_API_KEY1}/Dashboard/Setup/InstructorDashboard?TK=${authToken}`,
                    "_blank"
                  )
                }
              >
                Switch to Instructor
              </CustomButton>
            </div>
          )}
        </div>
        <div className="profile-dropdown-links">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/manage-profile">My Profile</Link>
          <Link href="/manage-profile">Account Setting</Link>
          <a
            onClick={() => {
              Signout();
            }}
          >
            Sign out
          </a>
        </div>
      </div>
    </ProfileDropdown>
  );

  const menuArr = [
    {
      name: "Home",
      name_AR: home,
      link: "/",
      link_AR: "/ar",
    },
    {
      name: "About Us",
      name_AR: about_us,
      link: "/about-us",
      link_AR: "/ar/about-us",
    },
    {
      name: "Our Services",
      name_AR: our_services,
      our_services: [
        {
          name: "Courses",
          name_AR: courses,
          link: "courses-landing-page",
          link_AR: "/ar/courses-landing-page",
          sub_list: getFeaturedRecordState?.filter(item=>item?.recordType==="Course")
        },
        {
          name: "Trainings",
          name_AR: trainings,
          link: "trainings-landing-page",
          link_AR: "/ar/trainings-landing-page",
          sub_list: getFeaturedRecordState?.filter(item=>item?.recordType==="Training")
        },
        {
          name: "Programs",
          name_AR: programs,
          link: "programs-landing-page",
          link_AR: "/ar/programs-landing-page",
          sub_list: getFeaturedRecordState?.filter(item=>item?.recordType==="Program")
        },
        {
          name: "Webinars",
          name_AR: webinars,
          link: "webinars-landing-page",
          link_AR: "/ar/webinars-landing-page",
          sub_list: getFeaturedRecordState?.filter(item=>item?.recordType==="Webinar")
        },
        {
          name: "Workshops",
          name_AR: workshops,
          link: "workshops-landing-page",
          link_AR: "/ar/workshops-landing-page",
          sub_list: getFeaturedRecordState?.filter(item=>item?.recordType==="Workshop")
        },

        {
          name: "Conferences",
          name_AR: conferences,
          link: "conferences-landing-page",
          link_AR: "/ar/conferences-landing-page",
          sub_list: getFeaturedRecordState?.filter(item=>item?.recordType==="Conference")
        },

        {
          name: "Symposiums",
          name_AR: symposiums,
          link: "symposiums-landing-page",
          link_AR: "/ar/symposiums-landing-page",
          sub_list: getFeaturedRecordState?.filter(item=>item?.recordType==="Symposiums")
        },
        {
          name: "Scholarship",
          name_AR: OtherServices,
          link: "scholarship-personal-information",
          link_AR: "/ar/scholarship-personal-information",
          sub_list: [
            {
            recordType:"scholarship",
            title_EN:"Apply for Scholarship"
          },
            {
            recordType:"scholarshipId",
            title_EN:"Track your Application"
          },
        ],
        },
        // {
        //   name: "Other Services",
        //   name_AR: OtherServices,
        //   link: "service-request",
        //   link_AR: "/ar/service-request",
        //   sub_list: dataState,
        // },
        {
          name: "Simulation",
          name_AR: simulationText,
          link: "service-request",
          link_AR: "/ar/service-request",
          sub_list: dataState,
        },
        {
          name: "Learning Institute",
          name_AR: LearningInstituteText,
          link: "service-request",
          link_AR: "/ar/service-request",
          sub_list: dataState,
        },
      ],
    },
  ];

  const mobileMenuArr = [
    {
      name: "Home",
      name_AR: home,
      link: "/",
      link_AR: "/ar",
    },
    {
      name: "About Us",
      name_AR: about_us,
      link: "/about-us",
      link_AR: "/ar/about-us",
    },
    {
      name: "Our Services",
      name_AR: our_services,
      our_services: [
        {
          name: "Courses",
          name_AR: courses,
          link: "courses-landing-page",
          link_AR: "/ar/courses-landing-page",
          sub_list: getFeaturedRecordState?.filter(item=>item?.recordType==="Course")
        },
        {
          name: "Trainings",
          name_AR: trainings,
          link: "trainings-landing-page",
          link_AR: "/ar/trainings-landing-page",
          sub_list: getFeaturedRecordState?.filter(item=>item?.recordType==="Training")
        },
        {
          name: "Programs",
          name_AR: programs,
          link: "programs-landing-page",
          link_AR: "/ar/programs-landing-page",
          sub_list: getFeaturedRecordState?.filter(item=>item?.recordType==="Program")
        },
        {
          name: "Webinars",
          name_AR: webinars,
          link: "webinars-landing-page",
          link_AR: "/ar/webinars-landing-page",
          sub_list: getFeaturedRecordState?.filter(item=>item?.recordType==="Webinar")
        },
        {
          name: "Workshops",
          name_AR: workshops,
          link: "workshops-landing-page",
          link_AR: "/ar/workshops-landing-page",
          sub_list: getFeaturedRecordState?.filter(item=>item?.recordType==="Workshop")
        },

        {
          name: "Conferences",
          name_AR: conferences,
          link: "conferences-landing-page",
          link_AR: "/ar/conferences-landing-page",
          sub_list: getFeaturedRecordState?.filter(item=>item?.recordType==="Conference")
        },

        {
          name: "Symposiums",
          name_AR: symposiums,
          link: "symposiums-landing-page",
          link_AR: "/ar/symposiums-landing-page",
          sub_list: getFeaturedRecordState?.filter(item=>item?.recordType==="Symposiums")
        },
        {
          name: "Scholarship",
          name_AR: OtherServices,
          link: "scholarship-personal-information",
          link_AR: "/ar/scholarship-personal-information",
          sub_list: [
            {
            recordType:"scholarship",
            title_EN:"Apply for Scholarship"
          },
            {
            recordType:"scholarshipId",
            title_EN:"Track your Application"
          },
        ],
        },
        // {
        //   name: "Other Services",
        //   name_AR: OtherServices,
        //   link: "service-request",
        //   link_AR: "/ar/service-request",
        //   sub_list: dataState,
        // },
        {
          name: "Simulation",
          name_AR: simulationText,
          link: "service-request",
          link_AR: "/ar/service-request",
          sub_list: dataState2,
        },
        {
          name: "Learning Institute",
          name_AR: LearningInstituteText,
          link: "service-request",
          link_AR: "/ar/service-request",
          sub_list: dataState1,
        },
      ],
    },
  ];

  const [GetWidgetsState, setGetWidgetsState] = useState();
  const GetWidgets = async () => {
    try {
      const response = await endpoints.GetWidgets("header");
      setGetWidgetsState(JSON.parse(response?.data?.data?.value));
    } catch (err) {
      console.log("err", err);
    }
  };

  useLayoutEffect(() => {
    GetWidgets();
  }, []);

  const DesktopView = (
    // <StyledMenu mode="horizontal">
    <StyledMenu
      // onClick={() => setDropdownCaretState(false)}
      mode="horizontal"
      theme={theme}
    >
      <NavDiv>
        {/* <Item icon={<AppstoreOutlined />}>Home</Item> */}
        <Container>
          <Link href="/">
            <a>
              {/* <img loading="lazy"alt={""} src={Logo} alt="logo" width={50} height={10} /> */}
              <Logo logo={GetWidgetsState?.logo} />
            </a>
          </Link>

          <RightNav>
            {menuArr?.map((item, index) => (
              <div key={index}>
                {item?.our_services !== undefined ? (
                  <StyledItemOurServices>
                    <Dropdown
                      // trigger={"click"}
                      overlay={() => menu(item?.our_services)}
                      // onMouseOver={()=>getFeaturedRecordFunc()}
                    >
                      <LanguageButton1>
                        <Space>
                          <p style={{ color: "#000" }}>Our Services</p>
                          {!dropdownCaretState ? (
                            <StyledDownOutlined />
                          ) : (
                            <StyledUpOutlined />
                          )}
                        </Space>
                      </LanguageButton1>
                    </Dropdown>
                  </StyledItemOurServices>
                ) : (
                  <>
                    {router?.asPath === item?.link ? (
                      <>
                        <StyledItem1>
                          <ActiveAlignDiv>
                            <Link href={`${item?.link}`}>{item?.name}</Link>
                          </ActiveAlignDiv>
                        </StyledItem1>
                      </>
                    ) : (
                      <StyledItem1>
                        <AlignDiv>
                          <Link href={`${item?.link}`}>{item?.name}</Link>
                        </AlignDiv>
                      </StyledItem1>
                    )}
                  </>
                )}
              </div>
            ))}

            <StyledItemDropDown>
              <Dropdown
                className="antd-dropdown-language"
                trigger={"click"}
                overlay={menu1}
              >
                <LanguageButton>
                  <Space>
                    <Avatar size={20} src={selectLanguage?.img} />
                    <p>{selectLanguage?.name}</p>
                    <DownOutlined />
                  </Space>
                </LanguageButton>
              </Dropdown>
            </StyledItemDropDown>

            <StyledItemSearch>
              <AlignDiv>
                {/* <img loading="lazy"alt={""} width={20} height={20} src={SearchIcon} /> */}
                <SearchHeader />
              </AlignDiv>
            </StyledItemSearch>
            {isAuthorized && (
              <StyledItemWishList title={"Wishlist"}>
                <AlignDiv onClick={() => router.push("/wishlist")}>
                  <img loading="lazy"alt={""} width={22} height={22} src={WishListIcon} />
                </AlignDiv>
              </StyledItemWishList>
            )}
            <StyledItemMap title={"Tracking application"}>
              <AlignDiv onClick={() => router.push("/track-application")}>
                <img loading="lazy"alt={""} width={24} height={24} src={MapIcon} />
              </AlignDiv>
            </StyledItemMap>

            {isAuthorized ? (
              <>
                <Dropdown overlay={UserDropdown} trigger={["click"]}>
                  <ProfileDropdown>
                    <div className="profile-link">
                      <div className="profile-img">
                        {userDataState?.photoUrl == "" ? (
                          <img loading="lazy"src={User} />
                        ) : (
                          <img loading="lazy"src={userDataState?.photoUrl} />
                        )}
                      </div>
                      <div className="profile-arrow">
                        <svg
                          width="12"
                          height="7"
                          viewBox="0 0 12 7"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 6L6 1L11 6"
                            stroke="#22252C"
                            stroke-width="0.8"
                          />
                        </svg>
                      </div>
                    </div>
                  </ProfileDropdown>
                </Dropdown>
              </>
            ) : (
              <>
                <CustomButton
                  customStyle={{
                    backgroundColor: "#FFF5E4",
                    color: "#A87E33",
                    marginRight: 15,
                    paddingInline: 20,
                    height: 36,
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                  onClick={() => Router.push("/sign-in")}
                >
                  Sign In
                </CustomButton>
                <CustomButton
                  customStyle={{
                    backgroundColor: "#105F43",
                    color: "#fff",
                    paddingInline: 28,
                    height: 36,
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                  onClick={() => Router.push("/register")}
                >
                  Register
                </CustomButton>
              </>
            )}
          </RightNav>
        </Container>
      </NavDiv>
    </StyledMenu>
  );
  //=================================================Desktop View==========================================================

  //=================================================Mobile View==========================================================
  const [visibleSidebarDrawer, setVisibleSidebarDrawer] = useState(false);

  const [theme1, setTheme1] = useState("dark");
  const [scroll1, setScroll1] = useState(0); // To change background-color of header

  const changeTheme1 = (e) => {
    if (e === true || scroll > 1) {
      setTheme1("dark");
    } else {
      setTheme1("light");
    }
  };

  /**
   * This useLayoutEffect function is used to change header background-color
   */
  useLayoutEffect(() => {
    changeTheme1();

    const handleScroll = () => {
      setScroll1(window.scrollY);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  });

  const showSidebarDrawer = () => {
    setVisibleSidebarDrawer(true);
  };

  const closeSidebarDrawer = () => {
    setVisibleSidebarDrawer(false);
  };

  const { Panel } = Collapse;

  const MobileView = (
    <StyledAffix offsetTop={0}>
      <MobileStyledMenu mode="horizontal" theme={theme1}>
        <NavDiv1>
          <MobileLogo>
            <MobileRightNavToggle onClick={()=>{showSidebarDrawer();
            getFeaturedRecordFunc();
            getCourseTrainingCategoryFunc();
            getCourseTrainingCategoryFunc1(process.env.NEXT_PUBLIC_LEARNING_INSTITUTE_DEPARTMENT_ID);
            getCourseTrainingCategoryFunc2(process.env.NEXT_PUBLIC_SIMULATION_DEPARTMENT_ID);
            setModalState&&setModalState(false);
          }}>
              <MenuButton>
                <svg
                  width="24"
                  height="15"
                  viewBox="0 0 24 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.688787 1.27889C0.688787 1.15552 0.739775 1.03153 0.839834 0.935824C0.940797 0.83925 1.08318 0.780584 1.23692 0.780584H21.8668C22.0205 0.780584 22.1629 0.83925 22.2639 0.935824C22.3639 1.03153 22.4149 1.15552 22.4149 1.27889C22.4149 1.40225 22.3639 1.52625 22.2639 1.62195C22.1629 1.71853 22.0205 1.77719 21.8668 1.77719H1.23692C1.08318 1.77719 0.940797 1.71853 0.839834 1.62195C0.739775 1.52625 0.688787 1.40225 0.688787 1.27889ZM0.688787 7.8916C0.688787 7.76824 0.739775 7.64425 0.839834 7.54854C0.940797 7.45196 1.08318 7.3933 1.23692 7.3933H21.8668C22.0205 7.3933 22.1629 7.45196 22.2639 7.54854C22.3639 7.64425 22.4149 7.76824 22.4149 7.8916C22.4149 8.01497 22.3639 8.13896 22.2639 8.23467C22.1629 8.33124 22.0205 8.38991 21.8668 8.38991H1.23692C1.08318 8.38991 0.940797 8.33124 0.839834 8.23467C0.739775 8.13896 0.688787 8.01497 0.688787 7.8916ZM0.839834 14.1612C0.940798 14.0647 1.08318 14.006 1.23692 14.006H21.8668C22.0205 14.006 22.1629 14.0647 22.2639 14.1612C22.3639 14.257 22.4149 14.3809 22.4149 14.5043C22.4149 14.6277 22.3639 14.7517 22.2639 14.8474C22.1629 14.944 22.0205 15.0026 21.8668 15.0026H1.23692C1.08318 15.0026 0.940796 14.944 0.839834 14.8474C0.739775 14.7517 0.688787 14.6277 0.688787 14.5043C0.688787 14.3809 0.739775 14.257 0.839834 14.1612Z"
                    fill="#105F43"
                    stroke="#105F43"
                    stroke-width="1.19593"
                  />
                </svg>
              </MenuButton>
            </MobileRightNavToggle>
            <Link href="/">
              <StyledAnchor>
                <Logo logo={GetWidgetsState?.logo} />
              </StyledAnchor>
            </Link>
          </MobileLogo>
          <MobileHeaderIcons>
            <StyledItemDropDown>
              <Dropdown trigger={"click"} overlay={menu1}>
                <span style={{ fontSize: "12px", color: "#000" }}>
                  EN <DownOutlined style={{ color: "#000" }} />
                </span>
              </Dropdown>
            </StyledItemDropDown>
            <StyledItemMap>
              <AlignDiv onClick={() => router.push("/track-application")}>
                <img loading="lazy"alt={""} width={21} height={21} src={MapIcon} />
              </AlignDiv>
            </StyledItemMap>
            <StyledItemSearch>
              <AlignDiv>
                <SearchHeader />
              </AlignDiv>
            </StyledItemSearch>
          </MobileHeaderIcons>
        </NavDiv1>

        <StyledMobSidebar className={visibleSidebarDrawer ? "show" : ""}>
          <SidebarHeader>
            <Link href="/">
              <StyledAnchor>
                <Logo logo={GetWidgetsState?.logo} />
              </StyledAnchor>
            </Link>
            <MobileRightNavToggle onClick={()=>{
              // getFeaturedRecordFunc();
              closeSidebarDrawer();
              }
              }>
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
            </MobileRightNavToggle>
          </SidebarHeader>
          <SidebarBody>
            <ul>
              {mobileMenuArr?.map((item, index) => (
                <>
                  {item?.our_services !== undefined ? (
                    <>
{/* COURSES */}
{
  item?.our_services[0]?.sub_list?.length === 0 ? (
    <StyledLinkDiv onClick={()=>setVisibleSidebarDrawer(false)}>
      <Link key={index} href={`/${item?.our_services[0]?.link}`}>
        {item?.our_services[0]?.name}
      </Link>
    </StyledLinkDiv>
  ) : (
    <Collapse
      ghost
      accordion
      onChange={() => {
        setServiceItemSelectLink(item?.our_services[0]?.name);
      }}
    >
      <Panel
        showArrow={false}
        header={`${item?.our_services[0]?.name}`}
        key={`${index}`}
      >
        {/* <p>UK</p>  */}
        {item?.our_services[0]?.sub_list?.length > 0 ? (
          <>
            {item?.our_services[0]?.sub_list?.map((item) => (
              <div
                className="a"
                onClick={() => {
                  setVisibleSidebarDrawer(false);
                  if (item?.recordType === "Course") {
                    router.push(`/course-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Training") {
                    router.push(`/training-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Program") {
                    router.push(`/program-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Webinar") {
                    router.push(`/webinar-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Workshop") {
                    router.push(`/workshop-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Conference") {
                    router.push(`/conference-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Symposiums") {
                    router.push(`/symposium-detail/${item?.id}`);
                  }
                  if (item?.recordType === "scholarship") {
                    router.push(`/scholarship-personal-information`);
                  }
                  if (item?.recordType === "scholarshipId") {
                    router.push(`/scholarship-track-application`);
                  }
                  if (serviceItemSelectLink === "Other Services") {
                    router.push(`/service-request`);
                    setCookies("other_services_item_id", item?.id?.trim());
                    setCookies(
                      "other_services_item_title",
                      item?.title_EN?.trim()
                    );
                    dispatch(
                      menuService({
                        serviceId: item?.id?.trim(),
                        serviceName: item?.title_EN?.trim(),
                      })
                    );
                    setModalState && setModalState(true);
                  }
                  if (serviceItemSelectLink === "Learning Institute") {
                    router.push(`/service-request`);
                    setCookies("other_services_item_id", item?.id?.trim());
                    setCookies(
                      "other_services_item_title",
                      item?.title_EN?.trim()
                    );
                    dispatch(
                      menuService({
                        departmentId:
                          process.env
                            .NEXT_PUBLIC_LEARNING_INSTITUTE_DEPARTMENT_ID,
                        departmentName:
                          process.env
                            .NEXT_PUBLIC_LEARNING_INSTITUTE_DEPARTMENT_NAME,
                        serviceId: item?.id?.trim(),
                        serviceName: item?.title_EN?.trim(),
                      })
                    );
                    setModalState && setModalState(true);
                  }
                  if (serviceItemSelectLink === "Simulation") {
                    router.push(`/service-request`);
                    setCookies("other_services_item_id", item?.id?.trim());
                    setCookies(
                      "other_services_item_title",
                      item?.title_EN?.trim()
                    );
                    dispatch(
                      menuService({
                        departmentId:
                          process.env.NEXT_PUBLIC_SIMULATION_DEPARTMENT_ID,
                        departmentName:
                          process.env.NEXT_PUBLIC_SIMULATION_DEPARTMENT_NAME,
                        serviceId: item?.id?.trim(),
                        serviceName: item?.title_EN?.trim(),
                      })
                    );
                    setModalState && setModalState(true);
                  }
                }}
              >
                {item?.title_EN}
              </div>
            ))}
          </>
        ) : (
          <>
            <div
              key={index}
              className="a"
              onClick={() => {
                router.push(`/service-request`);
              }}
            >
              {item?.name}
            </div>
          </>
        )}
      </Panel>
    </Collapse>
  )
}

{/* COURSES */}

{/* TRAININGS */}
{
  item?.our_services[1]?.sub_list?.length === 0 ? (
    <StyledLinkDiv onClick={()=>setVisibleSidebarDrawer(false)}>
      <Link key={index} href={`/${item?.our_services[1]?.link}`}>
        {item?.our_services[1]?.name}
      </Link>
    </StyledLinkDiv>
  ) : (
    <Collapse
      ghost
      accordion
      onChange={() => {
        setServiceItemSelectLink(item?.our_services[1]?.name);
      }}
    >
      <Panel
        showArrow={false}
        header={`${item?.our_services[1]?.name}`}
        key={`${index}`}
      >
        {/* <p>UK</p>  */}
        {item?.our_services[1]?.sub_list?.length > 0 ? (
          <>
            {item?.our_services[1]?.sub_list?.map((item) => (
              <div
                className="a"
                onClick={() => {
                  setVisibleSidebarDrawer(false);
                  if (item?.recordType === "Course") {
                    router.push(`/course-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Training") {
                    router.push(`/training-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Program") {
                    router.push(`/program-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Webinar") {
                    router.push(`/webinar-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Workshop") {
                    router.push(`/workshop-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Conference") {
                    router.push(`/conference-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Symposiums") {
                    router.push(`/symposium-detail/${item?.id}`);
                  }
                  if (item?.recordType === "scholarship") {
                    router.push(`/scholarship-personal-information`);
                  }
                  if (item?.recordType === "scholarshipId") {
                    router.push(`/scholarship-track-application`);
                  }
                  if (serviceItemSelectLink === "Other Services") {
                    router.push(`/service-request`);
                    setCookies("other_services_item_id", item?.id?.trim());
                    setCookies(
                      "other_services_item_title",
                      item?.title_EN?.trim()
                    );
                    dispatch(
                      menuService({
                        serviceId: item?.id?.trim(),
                        serviceName: item?.title_EN?.trim(),
                      })
                    );
                    setModalState && setModalState(true);
                  }
                  if (serviceItemSelectLink === "Learning Institute") {
                    router.push(`/service-request`);
                    setCookies("other_services_item_id", item?.id?.trim());
                    setCookies(
                      "other_services_item_title",
                      item?.title_EN?.trim()
                    );
                    dispatch(
                      menuService({
                        departmentId:
                          process.env
                            .NEXT_PUBLIC_LEARNING_INSTITUTE_DEPARTMENT_ID,
                        departmentName:
                          process.env
                            .NEXT_PUBLIC_LEARNING_INSTITUTE_DEPARTMENT_NAME,
                        serviceId: item?.id?.trim(),
                        serviceName: item?.title_EN?.trim(),
                      })
                    );
                    setModalState && setModalState(true);
                  }
                  if (serviceItemSelectLink === "Simulation") {
                    router.push(`/service-request`);
                    setCookies("other_services_item_id", item?.id?.trim());
                    setCookies(
                      "other_services_item_title",
                      item?.title_EN?.trim()
                    );
                    dispatch(
                      menuService({
                        departmentId:
                          process.env.NEXT_PUBLIC_SIMULATION_DEPARTMENT_ID,
                        departmentName:
                          process.env.NEXT_PUBLIC_SIMULATION_DEPARTMENT_NAME,
                        serviceId: item?.id?.trim(),
                        serviceName: item?.title_EN?.trim(),
                      })
                    );
                    setModalState && setModalState(true);
                  }
                }}
              >
                {item?.title_EN}
              </div>
            ))}
          </>
        ) : (
          <>
            <div
              key={index}
              className="a"
              onClick={() => {
                router.push(`/service-request`);
              }}
            >
              {item?.name}
            </div>
          </>
        )}
      </Panel>
    </Collapse>
  )
}
{/* TRAININGS */}

{/* PROGRAMS */}
{
  item?.our_services[2]?.sub_list?.length === 0 ? (
    <StyledLinkDiv onClick={()=>setVisibleSidebarDrawer(false)}>
      <Link key={index} href={`/${item?.our_services[2]?.link}`}>
        {item?.our_services[2]?.name}
      </Link>
    </StyledLinkDiv>
  ) : (
    <Collapse
      ghost
      accordion
      onChange={() => {
        setServiceItemSelectLink(item?.our_services[2]?.name);
      }}
    >
      <Panel
        showArrow={false}
        header={`${item?.our_services[2]?.name}`}
        key={`${index}`}
      >
        {/* <p>UK</p>  */}
        {item?.our_services[2]?.sub_list?.length > 0 ? (
          <>
            {item?.our_services[2]?.sub_list?.map((item) => (
              <div
                className="a"
                onClick={() => {
                  setVisibleSidebarDrawer(false);
                  if (item?.recordType === "Course") {
                    router.push(`/course-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Training") {
                    router.push(`/training-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Program") {
                    router.push(`/program-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Webinar") {
                    router.push(`/webinar-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Workshop") {
                    router.push(`/workshop-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Conference") {
                    router.push(`/conference-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Symposiums") {
                    router.push(`/symposium-detail/${item?.id}`);
                  }
                  if (item?.recordType === "scholarship") {
                    router.push(`/scholarship-personal-information`);
                  }
                  if (item?.recordType === "scholarshipId") {
                    router.push(`/scholarship-track-application`);
                  }
                  if (serviceItemSelectLink === "Other Services") {
                    router.push(`/service-request`);
                    setCookies("other_services_item_id", item?.id?.trim());
                    setCookies(
                      "other_services_item_title",
                      item?.title_EN?.trim()
                    );
                    dispatch(
                      menuService({
                        serviceId: item?.id?.trim(),
                        serviceName: item?.title_EN?.trim(),
                      })
                    );
                    setModalState && setModalState(true);
                  }
                  if (serviceItemSelectLink === "Learning Institute") {
                    router.push(`/service-request`);
                    setCookies("other_services_item_id", item?.id?.trim());
                    setCookies(
                      "other_services_item_title",
                      item?.title_EN?.trim()
                    );
                    dispatch(
                      menuService({
                        departmentId:
                          process.env
                            .NEXT_PUBLIC_LEARNING_INSTITUTE_DEPARTMENT_ID,
                        departmentName:
                          process.env
                            .NEXT_PUBLIC_LEARNING_INSTITUTE_DEPARTMENT_NAME,
                        serviceId: item?.id?.trim(),
                        serviceName: item?.title_EN?.trim(),
                      })
                    );
                    setModalState && setModalState(true);
                  }
                  if (serviceItemSelectLink === "Simulation") {
                    router.push(`/service-request`);
                    setCookies("other_services_item_id", item?.id?.trim());
                    setCookies(
                      "other_services_item_title",
                      item?.title_EN?.trim()
                    );
                    dispatch(
                      menuService({
                        departmentId:
                          process.env.NEXT_PUBLIC_SIMULATION_DEPARTMENT_ID,
                        departmentName:
                          process.env.NEXT_PUBLIC_SIMULATION_DEPARTMENT_NAME,
                        serviceId: item?.id?.trim(),
                        serviceName: item?.title_EN?.trim(),
                      })
                    );
                    setModalState && setModalState(true);
                  }
                }}
              >
                {item?.title_EN}
              </div>
            ))}
          </>
        ) : (
          <>
            <div
              key={index}
              className="a"
              onClick={() => {
                router.push(`/service-request`);
              }}
            >
              {item?.name}
            </div>
          </>
        )}
      </Panel>
    </Collapse>
  )
}
{/* PROGRAMS */}

{/* WEBINARS */}
{
  item?.our_services[3]?.sub_list?.length === 0 ? (
    <StyledLinkDiv onClick={()=>setVisibleSidebarDrawer(false)}>
      <Link key={index} href={`/${item?.our_services[3]?.link}`}>
        {item?.our_services[3]?.name}
      </Link>
    </StyledLinkDiv>
  ) : (
    <Collapse
      ghost
      accordion
      onChange={() => {
        setServiceItemSelectLink(item?.our_services[3]?.name);
      }}
    >
      <Panel
        showArrow={false}
        header={`${item?.our_services[3]?.name}`}
        key={`${index}`}
      >
        {/* <p>UK</p>  */}
        {item?.our_services[3]?.sub_list?.length > 0 ? (
          <>
            {item?.our_services[3]?.sub_list?.map((item) => (
              <div
                className="a"
                onClick={() => {
                  setVisibleSidebarDrawer(false);
                  if (item?.recordType === "Course") {
                    router.push(`/course-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Training") {
                    router.push(`/training-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Program") {
                    router.push(`/program-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Webinar") {
                    router.push(`/webinar-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Workshop") {
                    router.push(`/workshop-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Conference") {
                    router.push(`/conference-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Symposiums") {
                    router.push(`/symposium-detail/${item?.id}`);
                  }
                  if (item?.recordType === "scholarship") {
                    router.push(`/scholarship-personal-information`);
                  }
                  if (item?.recordType === "scholarshipId") {
                    router.push(`/scholarship-track-application`);
                  }
                  if (serviceItemSelectLink === "Other Services") {
                    router.push(`/service-request`);
                    setCookies("other_services_item_id", item?.id?.trim());
                    setCookies(
                      "other_services_item_title",
                      item?.title_EN?.trim()
                    );
                    dispatch(
                      menuService({
                        serviceId: item?.id?.trim(),
                        serviceName: item?.title_EN?.trim(),
                      })
                    );
                    setModalState && setModalState(true);
                  }
                  if (serviceItemSelectLink === "Learning Institute") {
                    router.push(`/service-request`);
                    setCookies("other_services_item_id", item?.id?.trim());
                    setCookies(
                      "other_services_item_title",
                      item?.title_EN?.trim()
                    );
                    dispatch(
                      menuService({
                        departmentId:
                          process.env
                            .NEXT_PUBLIC_LEARNING_INSTITUTE_DEPARTMENT_ID,
                        departmentName:
                          process.env
                            .NEXT_PUBLIC_LEARNING_INSTITUTE_DEPARTMENT_NAME,
                        serviceId: item?.id?.trim(),
                        serviceName: item?.title_EN?.trim(),
                      })
                    );
                    setModalState && setModalState(true);
                  }
                  if (serviceItemSelectLink === "Simulation") {
                    router.push(`/service-request`);
                    setCookies("other_services_item_id", item?.id?.trim());
                    setCookies(
                      "other_services_item_title",
                      item?.title_EN?.trim()
                    );
                    dispatch(
                      menuService({
                        departmentId:
                          process.env.NEXT_PUBLIC_SIMULATION_DEPARTMENT_ID,
                        departmentName:
                          process.env.NEXT_PUBLIC_SIMULATION_DEPARTMENT_NAME,
                        serviceId: item?.id?.trim(),
                        serviceName: item?.title_EN?.trim(),
                      })
                    );
                    setModalState && setModalState(true);
                  }
                }}
              >
                {item?.title_EN}
              </div>
            ))}
          </>
        ) : (
          <>
            <div
              key={index}
              className="a"
              onClick={() => {
                router.push(`/service-request`);
              }}
            >
              {item?.name}
            </div>
          </>
        )}
      </Panel>
    </Collapse>
  )
}
{/* WEBINARS */}

{/* WORKSHOPS */}
{
  item?.our_services[4]?.sub_list?.length === 0 ? (
    <StyledLinkDiv onClick={()=>setVisibleSidebarDrawer(false)}>
      <Link key={index} href={`/${item?.our_services[4]?.link}`}>
        {item?.our_services[4]?.name}
      </Link>
    </StyledLinkDiv>
  ) : (
    <Collapse
      ghost
      accordion
      onChange={() => {
        setServiceItemSelectLink(item?.our_services[4]?.name);
      }}
    >
      <Panel
        showArrow={false}
        header={`${item?.our_services[4]?.name}`}
        key={`${index}`}
      >
        {/* <p>UK</p>  */}
        {item?.our_services[4]?.sub_list?.length > 0 ? (
          <>
            {item?.our_services[4]?.sub_list?.map((item) => (
              <div
                className="a"
                onClick={() => {
                  setVisibleSidebarDrawer(false);
                  if (item?.recordType === "Course") {
                    router.push(`/course-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Training") {
                    router.push(`/training-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Program") {
                    router.push(`/program-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Webinar") {
                    router.push(`/webinar-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Workshop") {
                    router.push(`/workshop-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Conference") {
                    router.push(`/conference-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Symposiums") {
                    router.push(`/symposium-detail/${item?.id}`);
                  }
                  if (item?.recordType === "scholarship") {
                    router.push(`/scholarship-personal-information`);
                  }
                  if (item?.recordType === "scholarshipId") {
                    router.push(`/scholarship-track-application`);
                  }
                  if (serviceItemSelectLink === "Other Services") {
                    router.push(`/service-request`);
                    setCookies("other_services_item_id", item?.id?.trim());
                    setCookies(
                      "other_services_item_title",
                      item?.title_EN?.trim()
                    );
                    dispatch(
                      menuService({
                        serviceId: item?.id?.trim(),
                        serviceName: item?.title_EN?.trim(),
                      })
                    );
                    setModalState && setModalState(true);
                  }
                  if (serviceItemSelectLink === "Learning Institute") {
                    router.push(`/service-request`);
                    setCookies("other_services_item_id", item?.id?.trim());
                    setCookies(
                      "other_services_item_title",
                      item?.title_EN?.trim()
                    );
                    dispatch(
                      menuService({
                        departmentId:
                          process.env
                            .NEXT_PUBLIC_LEARNING_INSTITUTE_DEPARTMENT_ID,
                        departmentName:
                          process.env
                            .NEXT_PUBLIC_LEARNING_INSTITUTE_DEPARTMENT_NAME,
                        serviceId: item?.id?.trim(),
                        serviceName: item?.title_EN?.trim(),
                      })
                    );
                    setModalState && setModalState(true);
                  }
                  if (serviceItemSelectLink === "Simulation") {
                    router.push(`/service-request`);
                    setCookies("other_services_item_id", item?.id?.trim());
                    setCookies(
                      "other_services_item_title",
                      item?.title_EN?.trim()
                    );
                    dispatch(
                      menuService({
                        departmentId:
                          process.env.NEXT_PUBLIC_SIMULATION_DEPARTMENT_ID,
                        departmentName:
                          process.env.NEXT_PUBLIC_SIMULATION_DEPARTMENT_NAME,
                        serviceId: item?.id?.trim(),
                        serviceName: item?.title_EN?.trim(),
                      })
                    );
                    setModalState && setModalState(true);
                  }
                }}
              >
                {item?.title_EN}
              </div>
            ))}
          </>
        ) : (
          <>
            <div
              key={index}
              className="a"
              onClick={() => {
                router.push(`/service-request`);
              }}
            >
              {item?.name}
            </div>
          </>
        )}
      </Panel>
    </Collapse>
  )
}
{/* WORKSHOPS */}

{/* CONFERENCES */}
{
  item?.our_services[5]?.sub_list?.length === 0 ? (
    <StyledLinkDiv onClick={()=>setVisibleSidebarDrawer(false)}>
      <Link key={index} href={`/${item?.our_services[5]?.link}`}>
        {item?.our_services[5]?.name}
      </Link>
    </StyledLinkDiv>
  ) : (
    <Collapse
      ghost
      accordion
      onChange={() => {
        setServiceItemSelectLink(item?.our_services[5]?.name);
      }}
    >
      <Panel
        showArrow={false}
        header={`${item?.our_services[5]?.name}`}
        key={`${index}`}
      >
        {/* <p>UK</p>  */}
        {item?.our_services[5]?.sub_list?.length > 0 ? (
          <>
            {item?.our_services[5]?.sub_list?.map((item) => (
              <div
                className="a"
                onClick={() => {
                  setVisibleSidebarDrawer(false);
                  if (item?.recordType === "Course") {
                    router.push(`/course-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Training") {
                    router.push(`/training-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Program") {
                    router.push(`/program-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Webinar") {
                    router.push(`/webinar-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Workshop") {
                    router.push(`/workshop-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Conference") {
                    router.push(`/conference-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Symposiums") {
                    router.push(`/symposium-detail/${item?.id}`);
                  }
                  if (item?.recordType === "scholarship") {
                    router.push(`/scholarship-personal-information`);
                  }
                  if (item?.recordType === "scholarshipId") {
                    router.push(`/scholarship-track-application`);
                  }
                  if (serviceItemSelectLink === "Other Services") {
                    router.push(`/service-request`);
                    setCookies("other_services_item_id", item?.id?.trim());
                    setCookies(
                      "other_services_item_title",
                      item?.title_EN?.trim()
                    );
                    dispatch(
                      menuService({
                        serviceId: item?.id?.trim(),
                        serviceName: item?.title_EN?.trim(),
                      })
                    );
                    setModalState && setModalState(true);
                  }
                  if (serviceItemSelectLink === "Learning Institute") {
                    router.push(`/service-request`);
                    setCookies("other_services_item_id", item?.id?.trim());
                    setCookies(
                      "other_services_item_title",
                      item?.title_EN?.trim()
                    );
                    dispatch(
                      menuService({
                        departmentId:
                          process.env
                            .NEXT_PUBLIC_LEARNING_INSTITUTE_DEPARTMENT_ID,
                        departmentName:
                          process.env
                            .NEXT_PUBLIC_LEARNING_INSTITUTE_DEPARTMENT_NAME,
                        serviceId: item?.id?.trim(),
                        serviceName: item?.title_EN?.trim(),
                      })
                    );
                    setModalState && setModalState(true);
                  }
                  if (serviceItemSelectLink === "Simulation") {
                    router.push(`/service-request`);
                    setCookies("other_services_item_id", item?.id?.trim());
                    setCookies(
                      "other_services_item_title",
                      item?.title_EN?.trim()
                    );
                    dispatch(
                      menuService({
                        departmentId:
                          process.env.NEXT_PUBLIC_SIMULATION_DEPARTMENT_ID,
                        departmentName:
                          process.env.NEXT_PUBLIC_SIMULATION_DEPARTMENT_NAME,
                        serviceId: item?.id?.trim(),
                        serviceName: item?.title_EN?.trim(),
                      })
                    );
                    setModalState && setModalState(true);
                  }
                }}
              >
                {item?.title_EN}
              </div>
            ))}
          </>
        ) : (
          <>
            <div
              key={index}
              className="a"
              onClick={() => {
                router.push(`/service-request`);
              }}
            >
              {item?.name}
            </div>
          </>
        )}
      </Panel>
    </Collapse>
  )
}
{/* CONFERENCES */}

{/* SYMPOSIUMS */}
{
  item?.our_services[6]?.sub_list?.length === 0 ? (
    <StyledLinkDiv onClick={()=>setVisibleSidebarDrawer(false)}>
      <Link key={index} href={`/${item?.our_services[6]?.link}`}>
        {item?.our_services[6]?.name}
      </Link>
    </StyledLinkDiv>
  ) : (
    <Collapse
      ghost
      accordion
      onChange={() => {
        setServiceItemSelectLink(item?.our_services[6]?.name);
      }}
    >
      <Panel
        showArrow={false}
        header={`${item?.our_services[6]?.name}`}
        key={`${index}`}
      >
        {/* <p>UK</p>  */}
        {item?.our_services[6]?.sub_list?.length > 0 ? (
          <>
            {item?.our_services[6]?.sub_list?.map((item) => (
              <div
                className="a"
                onClick={() => {
                  setVisibleSidebarDrawer(false);
                  if (item?.recordType === "Course") {
                    router.push(`/course-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Training") {
                    router.push(`/training-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Program") {
                    router.push(`/program-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Webinar") {
                    router.push(`/webinar-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Workshop") {
                    router.push(`/workshop-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Conference") {
                    router.push(`/conference-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Symposiums") {
                    router.push(`/symposium-detail/${item?.id}`);
                  }
                  if (item?.recordType === "scholarship") {
                    router.push(`/scholarship-personal-information`);
                  }
                  if (item?.recordType === "scholarshipId") {
                    router.push(`/scholarship-track-application`);
                  }
                  if (serviceItemSelectLink === "Other Services") {
                    router.push(`/service-request`);
                    setCookies("other_services_item_id", item?.id?.trim());
                    setCookies(
                      "other_services_item_title",
                      item?.title_EN?.trim()
                    );
                    dispatch(
                      menuService({
                        serviceId: item?.id?.trim(),
                        serviceName: item?.title_EN?.trim(),
                      })
                    );
                    setModalState && setModalState(true);
                  }
                  if (serviceItemSelectLink === "Learning Institute") {
                    router.push(`/service-request`);
                    setCookies("other_services_item_id", item?.id?.trim());
                    setCookies(
                      "other_services_item_title",
                      item?.title_EN?.trim()
                    );
                    dispatch(
                      menuService({
                        departmentId:
                          process.env
                            .NEXT_PUBLIC_LEARNING_INSTITUTE_DEPARTMENT_ID,
                        departmentName:
                          process.env
                            .NEXT_PUBLIC_LEARNING_INSTITUTE_DEPARTMENT_NAME,
                        serviceId: item?.id?.trim(),
                        serviceName: item?.title_EN?.trim(),
                      })
                    );
                    setModalState && setModalState(true);
                  }
                  if (serviceItemSelectLink === "Simulation") {
                    router.push(`/service-request`);
                    setCookies("other_services_item_id", item?.id?.trim());
                    setCookies(
                      "other_services_item_title",
                      item?.title_EN?.trim()
                    );
                    dispatch(
                      menuService({
                        departmentId:
                          process.env.NEXT_PUBLIC_SIMULATION_DEPARTMENT_ID,
                        departmentName:
                          process.env.NEXT_PUBLIC_SIMULATION_DEPARTMENT_NAME,
                        serviceId: item?.id?.trim(),
                        serviceName: item?.title_EN?.trim(),
                      })
                    );
                    setModalState && setModalState(true);
                  }
                }}
              >
                {item?.title_EN}
              </div>
            ))}
          </>
        ) : (
          <>
            <div
              key={index}
              className="a"
              onClick={() => {
                router.push(`/service-request`);
              }}
            >
              {item?.name}
            </div>
          </>
        )}
      </Panel>
    </Collapse>
  )
}
{/* SYMPOSIUMS */}

{/* SCHOLARSHIP */}
{
  item?.our_services[7]?.sub_list?.length === 0 ? (
    <StyledLinkDiv onClick={()=>setVisibleSidebarDrawer(false)}>
      <Link key={index} href={`/${item?.our_services[7]?.link}`}>
        {item?.our_services[7]?.name}
      </Link>
    </StyledLinkDiv>
  ) : (
    <Collapse
      ghost
      accordion
      onChange={() => {
        setServiceItemSelectLink(item?.our_services[7]?.name);
      }}
    >
      <Panel
        showArrow={false}
        header={`${item?.our_services[7]?.name}`}
        key={`${index}`}
      >
        {/* <p>UK</p>  */}
        {item?.our_services[7]?.sub_list?.length > 0 ? (
          <>
            {item?.our_services[7]?.sub_list?.map((item) => (
              <div
                className="a"
                onClick={() => {
                  setVisibleSidebarDrawer(false);
                  if (item?.recordType === "Course") {
                    router.push(`/course-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Training") {
                    router.push(`/training-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Program") {
                    router.push(`/program-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Webinar") {
                    router.push(`/webinar-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Workshop") {
                    router.push(`/workshop-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Conference") {
                    router.push(`/conference-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Symposiums") {
                    router.push(`/symposium-detail/${item?.id}`);
                  }
                  if (item?.recordType === "scholarship") {
                    router.push(`/scholarship-personal-information`);
                  }
                  if (item?.recordType === "scholarshipId") {
                    router.push(`/scholarship-track-application`);
                  }
                  if (serviceItemSelectLink === "Other Services") {
                    router.push(`/service-request`);
                    setCookies("other_services_item_id", item?.id?.trim());
                    setCookies(
                      "other_services_item_title",
                      item?.title_EN?.trim()
                    );
                    dispatch(
                      menuService({
                        serviceId: item?.id?.trim(),
                        serviceName: item?.title_EN?.trim(),
                      })
                    );
                    setModalState && setModalState(true);
                  }
                  if (serviceItemSelectLink === "Learning Institute") {
                    router.push(`/service-request`);
                    setCookies("other_services_item_id", item?.id?.trim());
                    setCookies(
                      "other_services_item_title",
                      item?.title_EN?.trim()
                    );
                    dispatch(
                      menuService({
                        departmentId:
                          process.env
                            .NEXT_PUBLIC_LEARNING_INSTITUTE_DEPARTMENT_ID,
                        departmentName:
                          process.env
                            .NEXT_PUBLIC_LEARNING_INSTITUTE_DEPARTMENT_NAME,
                        serviceId: item?.id?.trim(),
                        serviceName: item?.title_EN?.trim(),
                      })
                    );
                    setModalState && setModalState(true);
                  }
                  if (serviceItemSelectLink === "Simulation") {
                    router.push(`/service-request`);
                    setCookies("other_services_item_id", item?.id?.trim());
                    setCookies(
                      "other_services_item_title",
                      item?.title_EN?.trim()
                    );
                    dispatch(
                      menuService({
                        departmentId:
                          process.env.NEXT_PUBLIC_SIMULATION_DEPARTMENT_ID,
                        departmentName:
                          process.env.NEXT_PUBLIC_SIMULATION_DEPARTMENT_NAME,
                        serviceId: item?.id?.trim(),
                        serviceName: item?.title_EN?.trim(),
                      })
                    );
                    setModalState && setModalState(true);
                  }
                }}
              >
                {item?.title_EN}
              </div>
            ))}
          </>
        ) : (
          <>
            <div
              key={index}
              className="a"
              onClick={() => {
                router.push(`/service-request`);
              }}
            >
              {item?.name}
            </div>
          </>
        )}
      </Panel>
    </Collapse>
  )
}
{/* SCHOLARSHIP */}

{/* SIMULATION */}
{
  item?.our_services[8]?.sub_list?.length === 0 ? (
    <StyledLinkDiv onClick={()=>setVisibleSidebarDrawer(false)}>
      <Link key={index} href={`/${item?.our_services[8]?.link}`}>
        {item?.our_services[8]?.name}
      </Link>
    </StyledLinkDiv>
  ) : (
    <Collapse
      ghost
      accordion
      onChange={() => {
        setServiceItemSelectLink(item?.our_services[8]?.name);
      }}
    >
      <Panel
        showArrow={false}
        header={`${item?.our_services[8]?.name}`}
        key={`${index}`}
      >
        {/* <p>UK</p>  */}
        {item?.our_services[8]?.sub_list?.length > 0 ? (
          <>
            {item?.our_services[8]?.sub_list?.map((item) => (
              <div
                className="a"
                onClick={() => {
                  setVisibleSidebarDrawer(false);
                  if (item?.recordType === "Course") {
                    router.push(`/course-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Training") {
                    router.push(`/training-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Program") {
                    router.push(`/program-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Webinar") {
                    router.push(`/webinar-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Workshop") {
                    router.push(`/workshop-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Conference") {
                    router.push(`/conference-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Symposiums") {
                    router.push(`/symposium-detail/${item?.id}`);
                  }
                  if (item?.recordType === "scholarship") {
                    router.push(`/scholarship-personal-information`);
                  }
                  if (item?.recordType === "scholarshipId") {
                    router.push(`/scholarship-track-application`);
                  }
                  if (serviceItemSelectLink === "Other Services") {
                    router.push(`/service-request`);
                    setCookies("other_services_item_id", item?.id?.trim());
                    setCookies(
                      "other_services_item_title",
                      item?.title_EN?.trim()
                    );
                    dispatch(
                      menuService({
                        serviceId: item?.id?.trim(),
                        serviceName: item?.title_EN?.trim(),
                      })
                    );
                    setModalState && setModalState(true);
                  }
                  if (serviceItemSelectLink === "Learning Institute") {
                    router.push(`/service-request`);
                    setCookies("other_services_item_id", item?.id?.trim());
                    setCookies(
                      "other_services_item_title",
                      item?.title_EN?.trim()
                    );
                    dispatch(
                      menuService({
                        departmentId:
                          process.env
                            .NEXT_PUBLIC_LEARNING_INSTITUTE_DEPARTMENT_ID,
                        departmentName:
                          process.env
                            .NEXT_PUBLIC_LEARNING_INSTITUTE_DEPARTMENT_NAME,
                        serviceId: item?.id?.trim(),
                        serviceName: item?.title_EN?.trim(),
                      })
                    );
                    setModalState && setModalState(true);
                  }
                  if (serviceItemSelectLink === "Simulation") {
                    router.push(`/service-request`);
                    setCookies("other_services_item_id", item?.id?.trim());
                    setCookies(
                      "other_services_item_title",
                      item?.title_EN?.trim()
                    );
                    dispatch(
                      menuService({
                        departmentId:
                          process.env.NEXT_PUBLIC_SIMULATION_DEPARTMENT_ID,
                        departmentName:
                          process.env.NEXT_PUBLIC_SIMULATION_DEPARTMENT_NAME,
                        serviceId: item?.id?.trim(),
                        serviceName: item?.title_EN?.trim(),
                      })
                    );
                    setModalState && setModalState(true);
                  }
                }}
              >
                {item?.title_EN}
              </div>
            ))}
          </>
        ) : (
          <>
            <div
              key={index}
              className="a"
              onClick={() => {
                router.push(`/service-request`);
              }}
            >
              {item?.name}
            </div>
          </>
        )}
      </Panel>
    </Collapse>
  )
}
{/* SIMULATION */}

{/* LEARNING_INSTITUTE */}

{
  item?.our_services[9]?.sub_list?.length === 0 ? (
    <StyledLinkDiv onClick={()=>setVisibleSidebarDrawer(false)}>
      <Link key={index} href={`/${item?.our_services[9]?.link}`}>
        {item?.our_services[9]?.name}
      </Link>
    </StyledLinkDiv>
  ) : (
    <Collapse
      ghost
      accordion
      onChange={() => {
        setServiceItemSelectLink(item?.our_services[9]?.name);
      }}
    >
      <Panel
        showArrow={false}
        header={`${item?.our_services[9]?.name}`}
        key={`${index}`}
      >
        {/* <p>UK</p>  */}
        {item?.our_services[9]?.sub_list?.length > 0 ? (
          <>
            {item?.our_services[9]?.sub_list?.map((item) => (
              <div
                className="a"
                onClick={() => {
                  setVisibleSidebarDrawer(false);
                  if (item?.recordType === "Course") {
                    router.push(`/course-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Training") {
                    router.push(`/training-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Program") {
                    router.push(`/program-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Webinar") {
                    router.push(`/webinar-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Workshop") {
                    router.push(`/workshop-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Conference") {
                    router.push(`/conference-detail/${item?.id}`);
                  }
                  if (item?.recordType === "Symposiums") {
                    router.push(`/symposium-detail/${item?.id}`);
                  }
                  if (item?.recordType === "scholarship") {
                    router.push(`/scholarship-personal-information`);
                  }
                  if (item?.recordType === "scholarshipId") {
                    router.push(`/scholarship-track-application`);
                  }
                  if (serviceItemSelectLink === "Other Services") {
                    router.push(`/service-request`);
                    setCookies("other_services_item_id", item?.id?.trim());
                    setCookies(
                      "other_services_item_title",
                      item?.title_EN?.trim()
                    );
                    dispatch(
                      menuService({
                        serviceId: item?.id?.trim(),
                        serviceName: item?.title_EN?.trim(),
                      })
                    );
                    setModalState && setModalState(true);
                  }
                  if (serviceItemSelectLink === "Learning Institute") {
                    router.push(`/service-request`);
                    setCookies("other_services_item_id", item?.id?.trim());
                    setCookies(
                      "other_services_item_title",
                      item?.title_EN?.trim()
                    );
                    dispatch(
                      menuService({
                        departmentId:
                          process.env
                            .NEXT_PUBLIC_LEARNING_INSTITUTE_DEPARTMENT_ID,
                        departmentName:
                          process.env
                            .NEXT_PUBLIC_LEARNING_INSTITUTE_DEPARTMENT_NAME,
                        serviceId: item?.id?.trim(),
                        serviceName: item?.title_EN?.trim(),
                      })
                    );
                    setModalState && setModalState(true);
                  }
                  if (serviceItemSelectLink === "Simulation") {
                    router.push(`/service-request`);
                    setCookies("other_services_item_id", item?.id?.trim());
                    setCookies(
                      "other_services_item_title",
                      item?.title_EN?.trim()
                    );
                    dispatch(
                      menuService({
                        departmentId:
                          process.env.NEXT_PUBLIC_SIMULATION_DEPARTMENT_ID,
                        departmentName:
                          process.env.NEXT_PUBLIC_SIMULATION_DEPARTMENT_NAME,
                        serviceId: item?.id?.trim(),
                        serviceName: item?.title_EN?.trim(),
                      })
                    );
                    setModalState && setModalState(true);
                  }
                }}
              >
                {item?.title_EN}
              </div>
            ))}
          </>
        ) : (
          <>
            <div
              key={index}
              className="a"
              onClick={() => {
                router.push(`/service-request`);
              }}
            >
              {item?.name}
            </div>
          </>
        )}
      </Panel>
    </Collapse>
  )
}
{/* LEARNING_INSTITUTE */}

                    </>
                  ) : (
                    <Link key={index} href={`${item?.link}`}
                    onClick={()=>setVisibleSidebarDrawer(false)}>
                      {item?.name}
                    </Link>
                  )}
                </>
              ))}

              {isAuthorized && <Link href="/wishlist">Wishlist</Link>}
              <Link href="/contact">Support</Link>
              <hr />

              {isAuthorized ? (
                <>
                  <Link href="/dashboard">Dashboard</Link>
                  <a
                    onClick={() => {
                      Signout();
                    }}
                  >
                    Sign Out
                  </a>
                </>
              ) : (
                <>
                  <Link href="/sign-in">Sign in</Link>
                  <Link href="/register">Register</Link>
                </>
              )}
            </ul>

            <div className="sidebarLeftBottomBg">
              <svg
                width="202"
                height="237"
                viewBox="0 0 202 237"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.6059 43.3042L1.60213 43.3039C-2.87899 42.9227 -8.10338 44.591 -12.0852 46.7899L-12.0852 46.7899L-12.0928 46.7939C-21.0982 51.4843 -29.8243 56.5753 -38.6152 61.7041C-41.9119 63.6274 -45.2177 65.5561 -48.5507 67.4709L-48.553 67.4722C-54.9124 71.0617 -61.294 74.5809 -67.6739 78.0991L-67.6742 78.0993C-74.0543 81.6177 -80.4327 85.1351 -86.7883 88.7224C-90.4815 90.8192 -92.649 93.7049 -93.2367 96.9897C-93.8255 100.28 -92.841 104.035 -90.0958 107.887L-90.0944 107.889C-62.4813 147.223 -27.3626 166.79 16.4673 162.595C23.9589 161.735 31.2704 160.314 38.4017 158.334L38.4027 158.334C41.6348 157.447 43.896 155.519 45.0646 152.911C46.2364 150.297 46.3275 146.958 45.1307 143.229C43.8651 139.286 43.1237 136.106 42.3851 132.939L42.3843 132.936C41.6456 129.768 40.9096 126.612 39.6532 122.697L39.6452 122.673L39.641 122.647C39.3569 120.908 39.0923 120.084 38.8256 119.253L38.8242 119.248C36.7245 112.707 34.6433 106.127 32.559 99.5369C28.3819 86.3302 24.1926 73.0851 19.8182 60.0344C16.614 50.9141 10.8058 43.9864 1.6059 43.3042Z"
                  stroke="white"
                  stroke-opacity="0.23"
                  stroke-width="0.7"
                />
                <path
                  d="M125.265 132.621L125.265 132.621L125.269 132.619C130.409 131.28 136.645 129.898 142.873 128.517L142.876 128.517C142.876 128.517 142.877 128.517 142.877 128.517C149.677 126.947 155.408 123.493 158.505 118.176C161.596 112.868 162.105 105.633 158.315 96.4042C147.576 70.7476 137.433 45.2104 127.2 19.3957C125.214 14.4988 122.812 11.518 119.908 10.2607C117.014 9.0078 113.523 9.42513 109.255 11.5609L109.254 11.5612C91.7994 20.2506 76.9541 32.7308 65.7353 49.6001C53.4592 68.3506 47.5547 89.6829 48.5269 113.446C48.8515 121.378 49.6795 129.149 50.509 136.934L50.5091 136.935C50.9716 141.368 52.5349 144.712 54.9551 146.812C57.3646 148.904 60.6698 149.804 64.712 149.27C64.9963 149.185 65.3508 149.152 65.658 149.124L65.6831 149.122C66.0342 149.089 66.3282 149.061 66.5357 148.994L66.5431 148.992L66.5506 148.99C76.9975 146.142 87.4123 143.213 98.0344 140.226C106.919 137.727 115.949 135.187 125.265 132.621Z"
                  stroke="white"
                  stroke-opacity="0.23"
                  stroke-width="0.7"
                />
                <path
                  d="M33.3988 165.319L33.3914 165.321L-5.07943 176.74L-43.5429 188.157L-43.5466 188.158L-43.5562 188.161L-43.5695 188.166L-43.5828 188.17L-43.5962 188.174L-43.6095 188.179L-43.6228 188.183L-43.6361 188.187L-43.6495 188.191L-43.6628 188.196L-43.6762 188.2L-43.6895 188.204L-43.7029 188.209L-43.7163 188.213L-43.7296 188.217L-43.743 188.221L-43.7564 188.226L-43.7698 188.23L-43.7832 188.234L-43.7966 188.239L-43.81 188.243L-43.8234 188.247L-43.8368 188.252L-43.8502 188.256L-43.8637 188.26L-43.8771 188.264L-43.8905 188.269L-43.904 188.273L-43.9174 188.277L-43.9309 188.282L-43.9443 188.286L-43.9578 188.29L-43.9713 188.295L-43.9847 188.299L-43.9982 188.303L-44.0117 188.308L-44.0252 188.312L-44.0387 188.316L-44.0522 188.321L-44.0657 188.325L-44.0792 188.329L-44.0927 188.334L-44.1062 188.338L-44.1197 188.342L-44.1333 188.347L-44.1468 188.351L-44.1603 188.355L-44.1739 188.36L-44.1874 188.364L-44.201 188.368L-44.2145 188.373L-44.2281 188.377L-44.2416 188.381L-44.2552 188.386L-44.2688 188.39L-44.2824 188.395L-44.2959 188.399L-44.3095 188.403L-44.3231 188.408L-44.3367 188.412L-44.3503 188.416L-44.3639 188.421L-44.3775 188.425L-44.3911 188.429L-44.4048 188.434L-44.4184 188.438L-44.432 188.443L-44.4456 188.447L-44.4593 188.451L-44.4729 188.456L-44.4866 188.46L-44.5002 188.464L-44.5139 188.469L-44.5275 188.473L-44.5412 188.478L-44.5548 188.482L-44.5685 188.486L-44.5822 188.491L-44.5959 188.495L-44.6095 188.5L-44.6232 188.504L-44.6369 188.508L-44.6506 188.513L-44.6643 188.517L-44.678 188.522L-44.6917 188.526L-44.7054 188.53L-44.7191 188.535L-44.7328 188.539L-44.7466 188.544L-44.7603 188.548L-44.774 188.552L-44.7877 188.557L-44.8015 188.561L-44.8152 188.566L-44.829 188.57L-44.8427 188.574L-44.8564 188.579L-44.8702 188.583L-44.884 188.588L-44.8977 188.592L-44.9115 188.596L-44.9252 188.601L-44.939 188.605L-44.9528 188.61L-44.9666 188.614L-44.9803 188.619L-44.9941 188.623L-45.0079 188.627L-45.0217 188.632L-45.0355 188.636L-45.0493 188.641L-45.0631 188.645L-45.0769 188.65L-45.0907 188.654L-45.1045 188.658L-45.1183 188.663L-45.1321 188.667L-45.146 188.672L-45.1598 188.676L-45.1736 188.681L-45.1874 188.685L-45.2013 188.689L-45.2151 188.694L-45.2289 188.698L-45.2428 188.703L-45.2566 188.707L-45.2705 188.712L-45.2843 188.716L-45.2982 188.721L-45.312 188.725L-45.3259 188.729L-45.3398 188.734L-45.3536 188.738L-45.3675 188.743L-45.3814 188.747L-45.3952 188.752L-45.4091 188.756L-45.423 188.761L-45.4369 188.765L-45.4507 188.77L-45.4646 188.774L-45.4785 188.778L-45.4924 188.783L-45.5063 188.787L-45.5202 188.792L-45.5341 188.796L-45.548 188.801L-45.5619 188.805L-45.5758 188.81L-45.5897 188.814L-45.6036 188.819L-45.6175 188.823L-45.6314 188.828L-45.6454 188.832L-45.6593 188.836L-45.6732 188.841L-45.6871 188.845L-45.7011 188.85L-45.715 188.854L-45.7289 188.859L-45.7428 188.863L-45.7568 188.868L-45.7707 188.872L-45.7847 188.877L-45.7986 188.881L-45.8125 188.886L-45.8265 188.89L-45.8404 188.895L-45.8544 188.899L-45.8683 188.904L-45.8823 188.908L-45.8962 188.913L-45.9102 188.917L-45.9242 188.921L-45.9381 188.926L-45.9521 188.93L-45.966 188.935L-45.98 188.939L-45.994 188.944L-46.0079 188.948L-46.0219 188.953L-46.0359 188.957L-46.0499 188.962L-46.0638 188.966L-46.0778 188.971L-46.0918 188.975L-46.1058 188.98L-46.1198 188.984L-46.1338 188.989L-46.1477 188.993L-46.1617 188.998L-46.1757 189.002L-46.1897 189.007L-46.2037 189.011L-46.2177 189.016L-46.2317 189.02L-46.2457 189.025L-46.2597 189.029L-46.2737 189.034L-46.2877 189.038L-46.3017 189.043L-46.3157 189.047L-46.3297 189.052L-46.3437 189.056L-46.3577 189.061L-46.3717 189.065L-46.3857 189.07L-46.3997 189.074L-46.4137 189.079L-46.4277 189.083L-46.4417 189.088L-46.4558 189.092L-46.4698 189.097L-46.4838 189.101L-46.4978 189.106L-46.5118 189.11L-46.5258 189.115L-46.5399 189.119L-46.5539 189.124L-46.5679 189.128L-46.5819 189.133L-46.5959 189.137L-46.61 189.142L-46.624 189.146L-46.638 189.151L-46.652 189.155L-46.6661 189.16L-46.6801 189.164L-46.6941 189.169L-46.7081 189.173L-46.7222 189.178L-46.7362 189.182L-46.7502 189.187L-46.7643 189.191L-46.7783 189.196L-46.7923 189.2L-46.8064 189.205L-46.8204 189.209L-46.8344 189.214L-46.8484 189.218L-46.8625 189.223L-46.8765 189.227L-46.8905 189.232L-46.9046 189.236L-46.9186 189.241L-46.9327 189.245L-46.9467 189.25L-46.9607 189.254L-46.9748 189.259L-46.9888 189.263L-47.0028 189.268L-47.0169 189.272L-47.0309 189.277L-47.0449 189.281L-47.059 189.286L-47.073 189.29L-47.087 189.295L-47.1011 189.299L-47.1151 189.304L-47.1291 189.308L-47.1432 189.313L-47.1572 189.317L-47.1713 189.322L-47.1853 189.326L-47.1993 189.331L-47.2134 189.335L-47.2274 189.34L-47.2414 189.344L-47.2555 189.349L-47.2695 189.353L-47.2835 189.358L-47.2976 189.362L-47.3116 189.367L-47.3256 189.371L-47.3397 189.376L-47.3537 189.38L-47.3677 189.385L-47.3817 189.389L-47.3958 189.394L-47.4098 189.398L-47.4238 189.403L-47.4379 189.407L-47.4519 189.412L-47.4659 189.416L-47.4799 189.421L-47.494 189.425L-47.508 189.43L-47.522 189.434L-47.536 189.439L-47.5501 189.443L-47.5641 189.448L-47.5781 189.452L-47.5921 189.457L-47.6061 189.461L-47.6202 189.466L-47.6342 189.47L-47.6482 189.475L-47.6622 189.479L-47.6762 189.484L-47.6902 189.488L-47.7043 189.493L-47.7183 189.497L-47.7323 189.502L-47.7463 189.506L-47.7603 189.511L-47.7743 189.515L-47.7883 189.52L-47.8023 189.524L-47.8163 189.529L-47.8303 189.533L-47.8443 189.538L-47.8583 189.542L-47.8723 189.547L-47.8863 189.551L-47.9003 189.556L-47.9143 189.56L-47.9283 189.565L-47.9423 189.569L-47.9563 189.574L-47.9703 189.578L-47.9843 189.583L-47.9983 189.587L-48.0123 189.592L-48.0262 189.596L-48.0402 189.601L-48.0542 189.605L-48.0682 189.61L-48.0822 189.614L-48.0961 189.619L-48.1101 189.623L-48.1241 189.628L-48.1381 189.632L-48.152 189.637L-48.166 189.641L-48.18 189.646L-48.1939 189.65L-48.2079 189.654L-48.2218 189.659L-48.2358 189.663L-48.2498 189.668L-48.2637 189.672L-48.2777 189.677L-48.2916 189.681L-48.3056 189.686L-48.3195 189.69L-48.3335 189.695L-48.3474 189.699L-48.3613 189.704L-48.3753 189.708L-48.3892 189.713L-48.4032 189.717L-48.4171 189.722L-48.431 189.726L-48.445 189.731L-48.4589 189.735L-48.4728 189.74L-48.4867 189.744L-48.5006 189.748L-48.5146 189.753L-48.5285 189.757L-48.5424 189.762L-48.5563 189.766L-48.5702 189.771L-48.5841 189.775L-48.598 189.78L-48.6119 189.784L-48.6258 189.789L-48.6397 189.793L-48.6536 189.798L-48.6675 189.802L-48.6814 189.806L-48.6953 189.811L-48.7091 189.815L-48.723 189.82L-48.7369 189.824L-48.7508 189.829L-48.7647 189.833L-48.7785 189.838L-48.7924 189.842L-48.8063 189.847L-48.8201 189.851L-48.834 189.855L-48.8478 189.86L-48.8617 189.864L-48.8755 189.869L-48.8894 189.873L-48.9032 189.878L-48.9171 189.882L-48.9309 189.887L-48.9447 189.891L-48.9586 189.895L-48.9724 189.9L-48.9862 189.904L-49 189.909L-49.0139 189.913L-49.0277 189.918L-49.0415 189.922L-49.0553 189.926L-49.0691 189.931L-49.0829 189.935L-49.0967 189.94L-49.1105 189.944L-49.1243 189.949L-49.1381 189.953L-49.1519 189.957L-49.1657 189.962L-49.1794 189.966L-49.1932 189.971L-49.207 189.975L-49.2208 189.98L-49.2345 189.984L-49.2483 189.988L-49.262 189.993L-49.2758 189.997L-49.2896 190.002L-49.3033 190.006L-49.3171 190.011L-49.3308 190.015L-49.3445 190.019L-49.3583 190.024L-49.372 190.028L-49.3857 190.033L-49.3994 190.037L-49.4132 190.041L-49.4269 190.046L-49.4406 190.05L-49.4543 190.055L-49.468 190.059L-49.4817 190.063L-49.4954 190.068L-49.5091 190.072L-49.5228 190.077L-49.5365 190.081L-49.5501 190.085L-49.5638 190.09L-49.5775 190.094L-49.5912 190.098L-49.6048 190.103L-49.6185 190.107L-49.6321 190.112L-49.6458 190.116L-49.6594 190.12L-49.6731 190.125L-49.6867 190.129L-49.7004 190.134L-49.714 190.138L-49.7276 190.142L-49.7412 190.147L-49.7549 190.151L-49.7685 190.155L-49.7821 190.16L-49.7957 190.164L-49.8093 190.168L-49.8229 190.173L-49.8365 190.177L-49.8501 190.182L-49.8636 190.186L-49.8772 190.19L-49.8908 190.195L-49.9044 190.199L-49.9179 190.203L-49.9315 190.208L-49.945 190.212L-49.9586 190.216L-49.9721 190.221L-49.9857 190.225L-49.9992 190.229L-50.0127 190.234L-50.0263 190.238L-50.0398 190.242L-50.0533 190.247L-50.0668 190.251L-50.0803 190.255L-50.0938 190.26L-50.1073 190.264L-50.1208 190.268L-50.1343 190.273L-50.1478 190.277L-50.1613 190.281L-50.1747 190.286L-50.1882 190.29L-50.2017 190.294L-50.2151 190.299L-50.2286 190.303L-50.242 190.307L-50.2555 190.312L-50.2689 190.316L-50.2823 190.32L-50.2958 190.325L-50.3092 190.329L-50.3226 190.333L-50.336 190.338L-50.3494 190.342L-50.3628 190.346L-50.3762 190.35L-50.3896 190.355L-50.403 190.359L-50.4164 190.363L-50.4297 190.368L-50.4431 190.372L-50.4565 190.376L-50.4698 190.381L-50.4832 190.385L-50.4965 190.389L-50.5099 190.393L-50.5232 190.398L-50.5365 190.402L-50.5498 190.406L-50.5632 190.41L-50.5765 190.415L-50.5898 190.419L-50.5924 190.42C-54.771 192.064 -56.7933 195.4 -57.4313 199.112C-58.0723 202.841 -57.3088 206.931 -55.9193 209.983C-53.2096 215.825 -50.5286 221.674 -47.848 227.522C-42.4884 239.214 -37.1303 250.903 -31.547 262.523L-31.547 262.523L-31.5438 262.53C-31.4333 262.773 -31.3227 263.017 -31.212 263.261C-27.514 271.413 -23.7209 279.774 -19.1509 287.3L-19.1496 287.302C-16.7779 291.273 -13.8364 293.639 -10.6423 294.484C-7.45061 295.328 -3.94714 294.668 -0.416462 292.47L-0.414646 292.469C22.7592 278.238 40.5819 258.629 49.8969 230.644C55.8506 212.081 55.4765 192.761 52.2195 173.097L52.2188 173.093C51.5973 169.023 50.01 166.24 47.7448 164.672C45.4808 163.106 42.4744 162.708 38.9194 163.545L38.906 163.549L38.8925 163.551C37.9992 163.688 37.1423 163.962 36.278 164.278C35.9969 164.381 35.7125 164.489 35.4256 164.598C34.8419 164.82 34.2479 165.046 33.651 165.238L33.6496 165.238L33.6481 165.239L33.6466 165.239L33.6452 165.239L33.6437 165.24L33.6423 165.24L33.6408 165.241L33.6394 165.241L33.638 165.242L33.6366 165.242L33.6351 165.243L33.6337 165.243L33.6323 165.244L33.6309 165.244L33.6295 165.244L33.6281 165.245L33.6268 165.245L33.6254 165.246L33.624 165.246L33.6226 165.247L33.6213 165.247L33.6199 165.248L33.6186 165.248L33.6172 165.248L33.6159 165.249L33.6146 165.249L33.6132 165.25L33.6119 165.25L33.6106 165.251L33.6093 165.251L33.608 165.251L33.6067 165.252L33.6054 165.252L33.6041 165.253L33.6028 165.253L33.6015 165.253L33.6002 165.254L33.599 165.254L33.5977 165.255L33.5964 165.255L33.5952 165.255L33.5939 165.256L33.5927 165.256L33.5915 165.257L33.5902 165.257L33.589 165.257L33.5878 165.258L33.5866 165.258L33.5854 165.259L33.5842 165.259L33.583 165.259L33.5818 165.26L33.5806 165.26L33.5794 165.261L33.5782 165.261L33.577 165.261L33.5759 165.262L33.5747 165.262L33.5735 165.262L33.5724 165.263L33.5712 165.263L33.5701 165.264L33.569 165.264L33.5678 165.264L33.5667 165.265L33.5656 165.265L33.5644 165.265L33.5633 165.266L33.5622 165.266L33.5611 165.266L33.56 165.267L33.5589 165.267L33.5578 165.267L33.5568 165.268L33.5557 165.268L33.5546 165.269L33.5535 165.269L33.5525 165.269L33.5514 165.27L33.5504 165.27L33.5493 165.27L33.5483 165.271L33.5472 165.271L33.5462 165.271L33.5452 165.272L33.5441 165.272L33.5431 165.272L33.5421 165.273L33.5411 165.273L33.5401 165.273L33.5391 165.274L33.5381 165.274L33.5371 165.274L33.5361 165.274L33.5351 165.275L33.5341 165.275L33.5332 165.275L33.5322 165.276L33.5312 165.276L33.5303 165.276L33.5293 165.277L33.5284 165.277L33.5274 165.277L33.5265 165.278L33.5255 165.278L33.5246 165.278L33.5237 165.278L33.5228 165.279L33.5219 165.279L33.5209 165.279L33.52 165.28L33.5191 165.28L33.5182 165.28L33.5173 165.28L33.5164 165.281L33.5156 165.281L33.5147 165.281L33.5138 165.282L33.5129 165.282L33.5121 165.282L33.5112 165.282L33.5103 165.283L33.5095 165.283L33.5086 165.283L33.5078 165.284L33.5069 165.284L33.5061 165.284L33.5053 165.284L33.5044 165.285L33.5036 165.285L33.5028 165.285L33.502 165.285L33.5012 165.286L33.5003 165.286L33.4996 165.286L33.4988 165.286L33.498 165.287L33.4972 165.287L33.4964 165.287L33.4956 165.287L33.4948 165.288L33.494 165.288L33.4933 165.288L33.4925 165.288L33.4917 165.289L33.491 165.289L33.4902 165.289L33.4895 165.289L33.4887 165.29L33.488 165.29L33.4873 165.29L33.4865 165.29L33.4858 165.291L33.4851 165.291L33.4844 165.291L33.4836 165.291L33.4829 165.292L33.4822 165.292L33.4815 165.292L33.4808 165.292L33.4801 165.292L33.4794 165.293L33.4787 165.293L33.4781 165.293L33.4774 165.293L33.4767 165.294L33.476 165.294L33.4754 165.294L33.4747 165.294L33.474 165.294L33.4734 165.295L33.4727 165.295L33.4721 165.295L33.4714 165.295L33.4708 165.295L33.4701 165.296L33.4695 165.296L33.4689 165.296L33.4682 165.296L33.4676 165.296L33.467 165.297L33.4664 165.297L33.4658 165.297L33.4652 165.297L33.4646 165.297L33.464 165.298L33.4634 165.298L33.4628 165.298L33.4622 165.298L33.4616 165.298L33.461 165.299L33.4604 165.299L33.4599 165.299L33.4593 165.299L33.4587 165.299L33.4582 165.299L33.4576 165.3L33.457 165.3L33.4565 165.3L33.4559 165.3L33.4554 165.3L33.4548 165.301L33.4543 165.301L33.4538 165.301L33.4532 165.301L33.4527 165.301L33.4522 165.301L33.4516 165.302L33.4511 165.302L33.4506 165.302L33.4501 165.302L33.4496 165.302L33.4491 165.302L33.4486 165.303L33.4481 165.303L33.4476 165.303L33.4471 165.303L33.4466 165.303L33.4461 165.303L33.4456 165.304L33.4452 165.304L33.4447 165.304L33.4442 165.304L33.4437 165.304L33.4433 165.304L33.4428 165.304L33.4424 165.305L33.4419 165.305L33.4414 165.305L33.441 165.305L33.4405 165.305L33.4401 165.305L33.4397 165.305L33.4392 165.306L33.4388 165.306L33.4384 165.306L33.4379 165.306L33.4375 165.306L33.4371 165.306L33.4367 165.306L33.4362 165.307L33.4358 165.307L33.4354 165.307L33.435 165.307L33.4346 165.307L33.4342 165.307L33.4338 165.307L33.4334 165.307L33.433 165.308L33.4326 165.308L33.4323 165.308L33.4319 165.308L33.4315 165.308L33.4311 165.308L33.4307 165.308L33.4304 165.308L33.43 165.309L33.4296 165.309L33.4293 165.309L33.4289 165.309L33.4286 165.309L33.4282 165.309L33.4279 165.309L33.4275 165.309L33.4272 165.309L33.4268 165.31L33.4265 165.31L33.4261 165.31L33.4258 165.31L33.4255 165.31L33.4251 165.31L33.4248 165.31L33.4245 165.31L33.4242 165.31L33.4239 165.31L33.4235 165.311L33.4232 165.311L33.4229 165.311L33.4226 165.311L33.4223 165.311L33.422 165.311L33.4217 165.311L33.4214 165.311L33.4211 165.311L33.4208 165.311L33.4205 165.312L33.4202 165.312L33.42 165.312L33.4197 165.312L33.4194 165.312L33.4191 165.312L33.4189 165.312L33.4186 165.312L33.4183 165.312L33.418 165.312L33.4178 165.312L33.4175 165.313L33.4173 165.313L33.417 165.313L33.4167 165.313L33.4165 165.313L33.4162 165.313L33.416 165.313L33.4157 165.313L33.4155 165.313L33.4153 165.313L33.415 165.313L33.4148 165.313L33.4146 165.313L33.4143 165.314L33.4141 165.314L33.4139 165.314L33.4136 165.314L33.4134 165.314L33.4132 165.314L33.413 165.314L33.4128 165.314L33.4126 165.314L33.4123 165.314L33.4121 165.314L33.4119 165.314L33.4117 165.314L33.4115 165.314L33.4113 165.315L33.4111 165.315L33.4109 165.315L33.4107 165.315L33.4105 165.315L33.4104 165.315L33.4102 165.315L33.41 165.315L33.4098 165.315L33.4096 165.315L33.4094 165.315L33.4093 165.315L33.4091 165.315L33.4089 165.315L33.4087 165.315L33.4086 165.315L33.4084 165.315L33.4082 165.316L33.4081 165.316L33.4079 165.316L33.4077 165.316L33.4076 165.316L33.4074 165.316L33.4073 165.316L33.4071 165.316L33.407 165.316L33.4068 165.316L33.4067 165.316L33.4065 165.316L33.4064 165.316L33.4062 165.316L33.4061 165.316L33.406 165.316L33.4058 165.316L33.4057 165.316L33.4056 165.316L33.4054 165.316L33.4053 165.316L33.4052 165.316L33.405 165.317L33.4049 165.317L33.4048 165.317L33.4047 165.317L33.4046 165.317L33.4044 165.317L33.4043 165.317L33.4042 165.317L33.4041 165.317L33.404 165.317L33.4039 165.317L33.4038 165.317L33.4037 165.317L33.4036 165.317L33.4034 165.317L33.4033 165.317L33.4032 165.317L33.4031 165.317L33.403 165.317L33.4029 165.317L33.4029 165.317L33.4028 165.317L33.4027 165.317L33.4026 165.317L33.4025 165.317L33.4024 165.317L33.4023 165.317L33.4022 165.317L33.4021 165.317L33.4021 165.317L33.402 165.318L33.4019 165.318L33.4018 165.318L33.4018 165.318L33.4017 165.318L33.4016 165.318L33.4015 165.318L33.4015 165.318L33.4014 165.318L33.4013 165.318L33.4012 165.318L33.4012 165.318L33.4011 165.318L33.4011 165.318L33.401 165.318L33.4009 165.318L33.4009 165.318L33.4008 165.318L33.4008 165.318L33.4007 165.318L33.4006 165.318L33.4005 165.318L33.4004 165.318L33.4003 165.318L33.4002 165.318L33.4001 165.318L33.4001 165.318L33.4 165.318L33.3999 165.318L33.3998 165.318L33.3997 165.318L33.3997 165.318L33.3996 165.318L33.3995 165.318L33.3995 165.318L33.3994 165.318L33.3993 165.318L33.3993 165.318L33.3992 165.318L33.3991 165.318L33.3991 165.318L33.399 165.318L33.399 165.318L33.3989 165.319L33.3988 165.319L33.2918 164.985L33.3988 165.319Z"
                  stroke="white"
                  stroke-opacity="0.23"
                  stroke-width="0.7"
                />
                <path
                  d="M177.87 222.238L177.871 222.237C182.903 219.554 185.874 215.713 186.703 211.345C187.534 206.973 186.23 202.008 182.579 197.058C168.458 178.125 150.825 164.655 129.608 157.273L129.604 157.272C109.244 149.932 89.0342 150.86 68.9309 154.84C63.8904 155.845 60.5802 157.911 58.9148 161.048C57.2439 164.196 57.1793 168.513 58.8435 174.128C62.7333 187.113 66.9654 200.298 71.2888 213.768L71.2914 213.776C72.6111 217.887 73.9595 221.992 75.3084 226.099C78.0079 234.316 80.7091 242.539 83.1848 250.831C85.1512 257.384 88.6878 260.925 92.6505 262.354C96.6258 263.787 101.098 263.119 104.969 261.115C129.245 248.37 153.683 235.264 177.87 222.238Z"
                  stroke="white"
                  stroke-opacity="0.23"
                  stroke-width="0.7"
                />
              </svg>
            </div>

            <SidebarSocialLinks>
              <Link href="index">
                <span>
                  <svg
                    stroke="currentColor"
                    fill="#fff"
                    stroke-width="0"
                    version="1.1"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.5 3h2.5v-3h-2.5c-1.93 0-3.5 1.57-3.5 3.5v1.5h-2v3h2v8h3v-8h2.5l0.5-3h-3v-1.5c0-0.271 0.229-0.5 0.5-0.5z"></path>
                  </svg>
                </span>
              </Link>
              <Link href="index">
                <span>
                  <svg
                    stroke="currentColor"
                    fill="#fff"
                    stroke-width="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path
                        fill-rule="nonzero"
                        d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"
                      ></path>
                    </g>
                  </svg>
                </span>
              </Link>
              <Link href="index">
                <span>
                  <svg
                    stroke="currentColor"
                    fill="#fff"
                    stroke-width="0"
                    viewBox="0 0 1024 1024"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M928 254.3c-30.6 13.2-63.9 22.7-98.2 26.4a170.1 170.1 0 0 0 75-94 336.64 336.64 0 0 1-108.2 41.2A170.1 170.1 0 0 0 672 174c-94.5 0-170.5 76.6-170.5 170.6 0 13.2 1.6 26.4 4.2 39.1-141.5-7.4-267.7-75-351.6-178.5a169.32 169.32 0 0 0-23.2 86.1c0 59.2 30.1 111.4 76 142.1a172 172 0 0 1-77.1-21.7v2.1c0 82.9 58.6 151.6 136.7 167.4a180.6 180.6 0 0 1-44.9 5.8c-11.1 0-21.6-1.1-32.2-2.6C211 652 273.9 701.1 348.8 702.7c-58.6 45.9-132 72.9-211.7 72.9-14.3 0-27.5-.5-41.2-2.1C171.5 822 261.2 850 357.8 850 671.4 850 843 590.2 843 364.7c0-7.4 0-14.8-.5-22.2 33.2-24.3 62.3-54.4 85.5-88.2z"></path>
                  </svg>
                </span>
              </Link>
              <Link href="index">
                <span>
                  <svg
                    stroke="currentColor"
                    fill="#fff"
                    stroke-width="0"
                    viewBox="0 0 1024 1024"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M941.3 296.1a112.3 112.3 0 0 0-79.2-79.3C792.2 198 512 198 512 198s-280.2 0-350.1 18.7A112.12 112.12 0 0 0 82.7 296C64 366 64 512 64 512s0 146 18.7 215.9c10.3 38.6 40.7 69 79.2 79.3C231.8 826 512 826 512 826s280.2 0 350.1-18.8c38.6-10.3 68.9-40.7 79.2-79.3C960 658 960 512 960 512s0-146-18.7-215.9zM423 646V378l232 133-232 135z"></path>
                  </svg>
                </span>
              </Link>
              <Link href="index">
                <span>
                  <svg
                    stroke="currentColor"
                    fill="#fff"
                    stroke-width="0"
                    viewBox="0 0 448 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                  </svg>
                </span>
              </Link>
            </SidebarSocialLinks>
          </SidebarBody>
        </StyledMobSidebar>
        <StyledMobSidebarBg
          onClick={closeSidebarDrawer}
          className={visibleSidebarDrawer ? "show" : ""}
        ></StyledMobSidebarBg>
      </MobileStyledMenu>
    </StyledAffix>
  );
  //=================================================Mobile View==========================================================

  const [isDesktop, setIsDesktop] = useState(false);

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

export default Header;

const ProfileDropdown = styled.div`
  position: relative;

  &&.ant-dropdown-open {
    .profile-arrow {
      svg {
        transform: rotate(0);
      }
    }
  }

  .profile-link {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;

    .profile-arrow {
      svg {
        transform: rotate(180deg);
      }
    }
  }

  .profile-img {
    width: 40px;
    height: 40px;
    border: 1px solid #e3e3e3;
    border-radius: 100%;
    padding: 2px;
    line-height: 0;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
      object-fit: cover;
    }
  }

  .profile-dropdown {
    position: absolute;
    top: calc(100% + 12px);
    right: -25px;
    width: 230px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 6px 5px 20px rgb(0 0 0 / 15%);
    // display: none;
    line-height: normal;
    z-index: 1;

    ::before {
      content: "";
      position: absolute;
      top: -7px;
      right: 22px;
      transform: rotate(45deg);
      width: 15px;
      height: 15px;
      border-radius: 3px;
      background: #fff;
      z-index: -7;
    }

    .profile-dropdown-sub {
      border-bottom: 1px solid #cbcbcb;
    }

    .btn-div {
      display: flex;
      justify-content: center;
      margin-bottom: 15px;
      .ant-btn:hover,
      .ant-btn:focus {
        color: #000 !important;
      }
    }

    .profile-dropdown-name {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 15px;

      h2 {
        font-size: 16px;
        color: #000;
        margin: 0;
        line-height: 16px;
        font-family: "TitilliumSemiBold";
      }
      p {
        font-size: 12px;
        color: #7a7a7a;
        margin: 0;
        font-family: "TitilliumNormal";
      }
    }
    .profile-dropdown-links {
      padding: 10px 18px;

      a {
        color: #000;
        padding: 8px 0;
        display: block;
      }
      a:not(:last-child) {
        border-bottom: 1px solid #e9e9e9;
      }
    }
  }
`;

//Desktop
const StyledMenu = styled(Menu)`
  border-bottom: 1px solid #a9a9a9 !important;
  padding-block: 15px !important;
  .ant-menu.ant-menu-dark .ant-menu-item-selected,
  .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
    background-color: none !important;
  }
  position: fixed !important;
  width: 100% !important;
  z-index: 100 !important;
  // z-index: 10000 !important;
  // background-color: transparent !important;
  .ant-menu-item a:hover {
    color: #000 !important;
    background-color: #fff !important;
  }

  .ant-menu-item:active {
    background: #fff !important;
  }

  .active-item {
    border-bottom: 1px solid !important;
  }
  .non-active-item {
    border-bottom: 1px solid !important;
  }

  .ant-btn {
    span {
      font-family: "TitilliumNormal", sans-serif !important;
      font-weight: 500;
    }
  }
`;

const NavDiv = styled.div`
  display: flex !important;
  width: 100% !important;
  justify-content: space-between !important;
  a {
    display: flex !important;
  }
`;

const RightNav = styled.div`
  display: flex !important;
  align-items: center !important;
  .ant-btn-group {
    display: flex !important;
  }
`;

const MenuButton = styled.span`
  font-size: 30px !important;
  margin-top: 10px !important;
`;
const MenuCloseButton = styled.span`
  font-size: 30px !important;
  margin-top: 10px !important;
`;

const ThemeSwitch = styled(Switch)`
  margin-top: 10px !important;
`;

const SubMenuItem = styled(Item)`
  .ant-menu-title-content {
    display: flex !important;
    align-items: center !important;
  }
  color: black !important;
  &: hover {
    color: black !important;
    margin-left: 5px !important;
    transition: all 0.2s ease-in !important;
    transform: scale(1) !important;
  }
  .ant-menu-light .ant-menu-item:hover,
  .ant-menu-light .ant-menu-item-active,
  .ant-menu-light .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open,
  .ant-menu-light .ant-menu-submenu-active,
  .ant-menu-light .ant-menu-submenu-name:hover {
    background: none !important;
    background-color: #fff !important;
  }
  .ant-menu-light .ant-menu-item:hover,
  .ant-menu-light .ant-menu-item-active,
  .ant-menu-light .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open,
  .ant-menu-light .ant-menu-submenu-active,
  .ant-menu-light .ant-menu-submenu-name:hover {
    background-color: #fff !important;
  }
`;

const StyledItem = styled(Item)`
  color: #fff !important;
  display: flex !important;
  align-items: center !important;
  .ant-menu-item-selected {
    background-color: transparent !important;
  }
  svg {
    color: #000 !important;
    font-size: 20px !important;
  }
`;

const StyledItem1 = styled(Item)`
  color: #fff !important;
  display: flex !important;
  align-items: center !important;
  .ant-menu-item-selected {
    background-color: transparent !important;
  }
  // .ant-menu-item {
  padding-left: 0px !important;
  padding-right: 20px !important;
  // }
  svg {
    color: #000 !important;
    font-size: 20px !important;
  }
`;

const StyledItemMap = styled(Item)`
  color: #fff !important;
  display: flex !important;
  align-items: center !important;
  padding-right: 20px !important;
  .ant-menu-item-selected {
    background-color: transparent !important;
  }
  svg {
    color: #000 !important;
    font-size: 20px !important;
  }
`;

const StyledItemWishList = styled(Item)`
  color: #fff !important;
  display: flex !important;
  align-items: center !important;
  padding: 0 0px 0px 20px !important;
  .ant-menu-item-selected {
    background-color: transparent !important;
  }
  svg {
    color: #000 !important;
    font-size: 20px !important;
  }
`;

const StyledItemSearch = styled(Item)`
  color: #fff !important;
  display: flex !important;
  align-items: center !important;
  padding: 0px !important;

  .ant-menu-item-selected {
    background-color: transparent !important;
  }
  svg {
    color: #000 !important;
    font-size: 20px !important;
  }
`;

const StyledItemAboutUs = styled(Item)`
  color: #fff !important;
  display: flex !important;
  align-items: center !important;
  padding: 0 0px 0 0 !important;
  margin-top: 1px;
  .ant-menu-item-selected {
    background-color: transparent !important;
  }
  svg {
    color: #000 !important;
    font-size: 20px !important;
  }
`;

const StyledSubMenu = styled(SubMenu)`
  color: #fff !important;
  min-width: 176px !important;
`;

const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;

  display: flex;

  justify-content: space-between;

  @media (min-width: 576px) {
    max-width: 576px;
  }

  @media (min-width: 768px) {
    max-width: 768px;
  }

  @media (min-width: 992px) {
    max-width: 992px;
  }

  @media (min-width: 1200px) {
    // min-width: 1200px;
    min-width: 1125px;
  }
`;

//Mobile
const MobileStyledMenu = styled(Menu)`
  padding: 20px !important;
  .ant-menu.ant-menu-dark .ant-menu-item-selected,
  .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
    background-color: none !important;
  }
  // position: fixed !important;
  width: 100% !important;
  z-index: 83721398732321 !important;
  background-color: #fff !important;
  .ant-menu-item-active {
    color: #fff !important;
  }
  .anticon-menu {
    svg {
      color: #000 !important;
    }
  }
  .ant-menu-submenu {
    display: none !important;
  }

  @media (max-width: 992px) {
    padding-left: 10px !important;
    padding-right: 10px !important;
  }
`;

const MobileLogo = styled.div`
  display: flex;
  gap: 8px;

  img {
    height: 30px !important;
  }
`;

const MobileHeaderIcons = styled.div`
  display: flex;
  margin-left: 10px;
  .ant-menu-item-active {
    color: #000 !important;
    padding: 0 3px !important;
    background: transparent !important;
  }

  .ant-menu-item-active:active {
    background: transparent !important;
  }
`;

const MobileRightNavToggle = styled.div`
  padding: 5px;
  cursor: pointer;
  line-height: 0;
  height: 28px;

  > span {
    color: #000;
    font-size: 22px !important;
    margin-top: 0 !important;
  }
`;

const NavDiv1 = styled.div`
  display: flex !important;
  align-items: center !important;
  width: 100% !important;
  justify-content: space-between !important;
`;

const StyledMobSidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 350px;
  height: 100vh;
  background: #105f43;
  transform: translate(-400px);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  z-index: 200;

  &&.show {
    transform: translate(0);
    opacity: 1;
    visibility: visible;
  }

  .sidebarLeftBottomBg {
    position: absolute;
    left: 0;
    bottom: 0;
    line-height: 0;
    z-index: 0;
    pointer-events: none;

    svg {
      height: 170px;
    }
  }
`;
const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 20px 15px;

  img {
    height: 32px !important;
  }
`;
const SidebarBody = styled.div`
  padding: 25px 20px;
  height: calc(100% - 73px);
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 0;
  }

  ul {
    margin: 0;
    padding: 0;

    > a {
      display:block;
      color:#fff;
    }

    .ant-collapse-item-active {
      .ant-collapse-header-text::before {
        transform: translateY(-50%) rotate(-45deg) !important;
      }
    }

    .ant-collapse-header {
      position: relative;
      padding: 12px 0px !important;
      transition: all 0.3s;

      .ant-collapse-header-text {
        display: block;
        color: #fff;
        font-size: 16px;
        line-height: 20px;
        font-weight: 400;
        font-family: "TitilliumNormal";
      }
      .ant-collapse-header-text::before {
        content: "";
        position: absolute;
        top: 50%;
        transform: translateY(-50%) rotate(135deg);
        right: 8px;
        width: 8px;
        height: 8px;
        border: 1px solid transparent;
        border-right-color: #fff;
        border-top-color: #fff;
      }
    }
    .ant-collapse-content-box {
      padding: 0 !important;
      padding-left: 15px !important;

      .a {
        position: relative;
        font-size: 14px;
        padding: 8px 12px !important;
      }
      .a::before {
        content: "";
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: -5px;
        width: 8px;
        height: 2px;
        background: #fff6;
      }
    }

    .a {
      display: block;
      padding: 12px 8px !important;
      color: #fff !important;
      line-height: 20px;
      font-size: 16px;
      font-weight: 400;
      font-family: "TitilliumNormal";
    }

    hr {
      border: 1px solid transparent;
      border-top-color: #d2d2d24d;
    }
  }
`;
const SidebarSocialLinks = styled.div`
  margin-bottom: 20px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  z-index: 1;

  span {
    display: inline-block;
    padding: 5px;
    font-size: 16px;
    background: #105f43;
    border-radius: 4px;
    line-height: 0;
    cursor: pointer;
  }
`;
const StyledMobSidebarBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #000000b2;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  z-index: 190;

  &&.show {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }
`;

const StyledSidebarDrawer = styled(Drawer)`
  backgroung-color: rgba(0, 0, 0, 0.5);

  .ant-drawer-content {
    opacity: 0.5 !important;
    background-color: #28b16d;
  }
  .ant-drawer-content-wrapper {
    backdrop-filter: blur(5px) !important;
    height: 650px !important;
  }
  .ant-drawer-close {
    font-size: 40px !important;
    font-weight: bold !important;
    color: #000 !important;
  }
`;

const DrawerContent = styled.div`
  margin-top: 90px;
  @media (max-height: 300px) {
    margin-top: 40px;
  }
`;

const StyledPara = styled.p`
  text-align: center !important;
  font-size: 14px !important;
  font-weight: bolder;
  margin: 20px 0 10px 0;
`;

const AlignDiv = styled.div`
  display: flex !important;
  align-items: center !important;
  margin-top: 1px !important;
  .anticon-caret-down {
    color: #000;
  }

  a {
    font-weight: 500 !important;
    font-size: 14px !important;
    font-family: "TitilliumNormal", sans-serif;
    font-weight: 500;
  }

  @media (max-width: 1199px) {
    a {
      font-size: 14px !important;
    }
  }

  @media (max-width: 1089px) {
    a {
      font-weight: 500 !important;
      // font-size: 12px !important;
      line-height: 18px !important;
    }
  }
`;

const ActiveAlignDiv = styled.div`
  display: flex !important;
  align-items: center !important;
  border-bottom: 1px solid #105f43 !important;
  margin-top: -6.7px;
  a {
    border-bottom: 0.1p solid #105f43 !important;
    height: 38px;
    color: #105f43 !important;
    font-weight: 500 !important;
    font-family: "TitilliumNormal", sans-serif;
    font-weight: 500;
    font-size: 14px !important;
  }

  @media (max-width: 1199px) {
    font-size: 14px !important;
  }

  a:hover {
    color: #105f43 !important;
  }

  .ant-menu-item a:hover {
    color: #105f43 !important;
  }

  .anticon-caret-down {
    color: #000;
  }
  @media (max-width: 1089px) {
    a {
      font-weight: 500 !important;
      font-size: 12px !important;
    }
  }
`;

const ActiveAlignAboutUsDiv = styled.div`
  display: flex !important;
  align-items: center !important;
  border-bottom: 1px solid !important;
  margin-top: -6px;
  a {
    border-bottom: 1px solid #105f43 !important;
    height: 38px;
    color: #105f43 !important;
    font-weight: 500 !important;
    font-size: 14px !important;
    font-family: "TitilliumNormal", sans-serif;
    font-weight: 500;
  }
  @media (max-width: 1199px) {
    font-size: 14px !important;
  }
  a:hover {
    color: #105f43 !important;
  }

  .ant-menu-item a:hover {
    color: #105f43 !important;
  }

  .anticon-caret-down {
    color: #000;
  }
  @media (max-width: 1089px) {
    a {
      font-weight: 500 !important;
      font-size: 12px !important;
    }
  }
`;

const StyledCollapse = styled(Collapse)`
  .ant-collapse-borderless {
    background-color: #181a1b !important;
    color: #fff !important;
  }
  .ant-collapse-header {
    background-color: #181a1b !important;
    color: #fff !important;
    font-size: 14px !important;
    // border-radius: 10px 10px 0 0 !important;
  }
  .ant-collapse {
    background-color: transparent !important;
    border-radius: 10px !important;
  }
  .ant-collapse-content {
    background-color: #181a1b !important;
    color: #fff !important;
  }
  a {
    color: #fff !important;
  }
  .ant-collapse-content {
    // border-radius: 0 0 10px 10px !important;
  }
`;

const StyledPlusOutlined = styled(PlusOutlined)`
  font-size: 14px !important;
`;

const StyledBr = styled.div`
  margin-block: 20px !important;
`;

const ProductCath1 = styled.h1`
  font-size: 20px;
  font-weight: 800;
`;

const StyledNotificationMenu = styled(Menu)`
  width: 180px !important;
  padding: 20px 10px;
  left: 12px;
  border-radius: 5px 0 0 5px;
  line-height: 28px;

  .select-country {
    display: flex;
    align-items: center;
  }

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
    z-index: 1000000 !important;
    top: 69px !important;
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
      font-size: 14px;
    }
  }

  @media (max-width: 1199px) {
    .language-title {
      font-size: 14px;
    }
  }
`;

const StyledNotificationMenu1 = styled(Menu)`
  width: 180px !important;
  padding: 20px 10px;
  // left: 12px;
  border-radius: 5px 0 0 5px;
  line-height: 28px;

  .select-country {
    display: flex;
    align-items: center;
  }

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
      font-size: 14px;
    }
  }

  @media (max-width: 1199px) {
    .language-title {
      font-size: 14px;
    }
  }
`;

const StyledNotificationItem = styled(Item)`
  &:hover {
    border-radius: 6px;
    padding: 10px;
    // background-color: #3a3b3c !important;
    margin-block: 5px;
  }
`;

const StyledBadge = styled(Badge)`
  display: flex !important;
  .ant-badge-count {
    top: 12px;
    right: 12px;
    box-shadow: none !important;
  }
`;

const StyledBadge1 = styled(Badge)`
  .ant-badge-count {
    top: 7px;
    right: -20px;
    box-shadow: none !important;
  }
`;

const BadgeCol = styled(Col)`
  display: flex;
  justify-content: end;
  align-items: center;
`;

const StyledMenuBadge = styled(Badge)`
  .ant-badge-count {
    transform: translate(100%, -70%);
    background-color: #ffeaea;
    color: #ff4d4f;
    &:hover {
      // text-decoration: underline;
    }
  }
`;

const StyledAnchor = styled.a`
  display: flex;
`;

const StyledItemDropDown = styled(Item)`
  display: flex !important;
  align-items: center !important;

  padding-right: 20px !important;
  padding-left: 0 !important;

  .ant-btn {
    border-radius: 5px !important;
  }
  .ant-btn:hover,
  .ant-btn:focus {
    color: #000 !important;
    border-color: #d9d9d9 !important;
  }
`;

const StyledItemOurServices = styled(Item)`
  display: flex !important;
  align-items: center !important;
  padding-inline: 0px !important;
  .ant-btn {
    border-radius: 5px !important;
    border-color: transparent !important;
  }
  .ant-space {
    margin-top: 9px !important;
  }
  .ant-btn:hover,
  .ant-btn:focus {
    color: #000 !important;
    border-color: transparent !important;
  }
`;

const StyledDownOutlined = styled(DownOutlined)`
  color: #000 !important;
`;

const StyledUpOutlined = styled(UpOutlined)`
  color: #000 !important;
`;

const StyledDropdown = styled(Dropdown)`
  margin-right: 10px;
  .ant-space-item {
    color: #000 !important;
  }
  @media (max-width: 1199px) {
    line-height: 22px;
    font-size: 14px;
  }
  @media (min-width: 1200px) {
    .dropdownBtnA {
      font-weight: 500 !important;
      // margin-top: -2px !important;
      font-size: 14px !important;
    }
  }
  @media (max-width: 1199px) {
    .dropdownBtnA {
      font-weight: 500 !important;
      // margin-top: -2px !important;
      font-size: 14px !important;
    }
  }

  .ant-space {
    font-family: "TitilliumNormal", sans-serif !important;
    font-weight: 500;
    svg {
      margin-top: 16px !important;
      font-size: 12px !important;
    }
  }

  @media (max-width: 1089px) {
    font-size: 12px !important;
    line-height: 18px !important;
  }
`;

const StyledFlexMenuDiv = styled.div`
  display: flex;
  margin-top: 15px;
  p {
    word-break: inherit;
  }
`;

const ContentMenuListChildrenDiv = styled.div`
  background-color: #105f43;
  width: 390px;
  border-radius: 0 5px 5px 0;
  padding: 20px;
`;

const MenuTitleDiv = styled.div`
  background: #064b33;
  color: #fff;
  padding: 4px 10px;
  border-radius: 5px;
  margin-bottom: 24px;
`;

const ItemDiv = styled.div`
  display: flex;
  align-items: start;
  p {
    margin-bottom: 0;
    color: #fff;
    font-weight: 100;
    padding-left: 10px;
    word-break: unset !important;
    cursor: pointer;
  }
`;

const StyledItemRow = styled(Row)`
  .ant-divider-horizontal {
    margin: 7px 0 !important;
    background: #034d33 !important;
  }
  margin-top: 10px;
  margin-left: 0px !important;
`;

const OurServicesDesignDiv = styled.div`
  padding-inline: 10px;
  background: #f7f7f7;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    cursor: pointer;
  }

  &:nth-last-child(1) {
    margin-bottom: 0px;
  }

  p {
  }
`;

const LanguageButton = styled(Button)`
  height: 36px !important;
  top: -1px !important;
  width: 136px !important;
  font-family: "TitilliumNormal", sans-serif !important;
  font-weight: 500;
  padding: 0px -12px 0px 20px;
  box-shadow: none !important;

  ::after {
    display: none !important;
  }

  @media (min-width: 1200px) {
    p {
      margin-bottom: 0px;
      font-size: 14px;
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

const LanguageButton1 = styled(Button)`
  height: 36px !important;
  top: -1px !important;
  // width: 136px !important;
  font-family: "TitilliumNormal", sans-serif !important;
  font-weight: 500;
  padding: 0px -12px 0px 20px;
  box-shadow: none !important;
  padding-right: 18px !important;
  padding-left: 0px !important;

  ::after {
    display: none !important;
  }

  .ant-btn {
    padding: 4px 0px !important;
  }

  @media (min-width: 1200px) {
    p {
      margin-bottom: 0px;
      font-size: 14px;
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

const StyledAffix = styled(Affix)`
  z-index: 99999 !important;
  .ant-dropdown {
    top: 70px !important;
  }
`;

const StyledLinkDiv=styled.div`
  a{
    color: #fff !important;
  }
  a:hover {
    color: #fff !important;
  }
`