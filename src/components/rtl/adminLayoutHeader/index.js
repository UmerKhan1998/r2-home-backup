import React, { useLayoutEffect, useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Col, Dropdown, Layout, Modal, Row, Tooltip } from "antd";
const { Content, Sider } = Layout;
import styled from "styled-components";
import {
  Logo,
  BellIcon,
  BlackDashboardIcon,
  GamificationIcon,
  MyAccountSettingsIcon,
  MyLearningIcon,
  MyLearningPathIcon,
  MyProfileIcon,
  RegisterInstructorIcon,
  SignOutIcon,
  User,
  SaudiaArabFlag,
} from "../../../../images";
import ToggleHamburgerImg from "../../../../public/images/ToggleHamburgerImg.svg";
import moment from "moment";
import CustomButton from "../../Button";
import { Link } from "react-scroll";
import  NextLink  from "next/link";
import router, { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import endpoints from "../../../../src/api";
import { getCookies, removeCookies, setCookies } from "../../../helpers/cookie";
import SocketComponent from "../../SocketComponent";
import {
  My_Dashboard,
  My_Learning,
  courses,
  programs,
  training,
  Attendance,
  Assessments,
  Certificates,
  Surveys,
  Receipt,
  Other_Requests_Activities,
  My_Learning_Paths,
  My_Profile,
  Learning_Transcript,
  Reminders_Settings,
  Notification_Setting,
  Wishlist,
  My_Gamification,
  My_Account_Setting,
  Register_as_an_Instructor,
  Sign_Out,
  arabic,
  English,
  Select_Language,
  view_all,
  Notifications,
  mark_all_as_read,
  Register_for_Scholarship,
  switch_to_instructor,
  manage_profile,
  language,
  notification,
  webinar,
  course,
  program,
  workshop,
  symposium,
  conference,
  new_badge,
} from "../../../helpers/LanguageConstant";
import { notificationCounts, userData } from "../../../redux/actions";

const App = ({
  collapsed,
  setCollapsed,
  children,
  selectItem,
  setSelectItem,
  pageVar,
  name,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const authToken = getCookies("token");

  const userDataState = useSelector((state) => state?.userDataReducer);
  const [isAuthorized, setAuthorized] = useState(false);
  useLayoutEffect(() => {
    if (userDataState?.authToken === undefined) {
      setAuthorized(false);
    } else {
      setAuthorized(true);
    }
  }, []);

  const siderBarMenuArr = [
    {
      icon: BlackDashboardIcon,
      link: "/ar/dashboard",
      label: My_Dashboard,
    },
    {
      icon: MyLearningIcon,
      label: My_Learning,
      sub_menu_objs: [
        [
          { title: courses, link: "/ar/courses" },
          { title: Attendance, link: "/ar/course-attendance" },
          { title: Assessments, link: "/ar/course-assessments" },
          { title: Certificates, link: "/ar/course-certificates" },
          { title: Surveys, link: "/ar/course-surveys" },
          { title: Receipt, link: "/ar/course-payment-receipts" },
        ],
        [
          { title: programs, link: "/ar/programs" },
          { title: Attendance, link: "/ar/program-attendance" },
          { title: Assessments, link: "/ar/program-assessments" },
          { title: Certificates, link: "/ar/program-certificates" },
          { title: Surveys, link: "/ar/program-surveys" },
          { title: Receipt, link: "/ar/program-payment-receipts" },
        ],
        [
          { title: training, link: "/ar/training" },
          { title: Attendance, link: "/ar/training-attendance" },
          { title: Assessments, link: "/ar/training-assessments" },
          { title: Certificates, link: "/ar/training-certificates" },
          { title: Surveys, link: "/ar/training-surveys" },
          { title: Receipt, link: "/ar/training-payment-receipts" },
        ],
        [
          { title: Other_Requests_Activities, link: "/ar/activities" },
          { title: Attendance, link: "/ar/activities-attendance" },
          { title: Certificates, link: "/ar/activities-certificates" },
          { title: Receipt, link: "/ar/activities-payment-receipts" },
        ],
      ],
    },
    {
      icon: MyLearningPathIcon,
      label: My_Learning_Paths,
      link: "/ar/my-learning-path",
    },
    {
      icon: MyProfileIcon,
      label: My_Profile,
      sub_menu_arr: [
        { title: Learning_Transcript, link: "/ar/learning-transcript" },
        { title: Reminders_Settings, link: "/ar/reminders-settings" },
        { title: Notification_Setting, link: "/ar/notification-setting" },
        { title: Wishlist, link: "/ar/wishlist" },
      ],
    },
    {
      icon: GamificationIcon,
      label: My_Gamification,
      link: "/ar/gamification",
    },
    {
      icon: MyAccountSettingsIcon,
      label: My_Account_Setting,
      link: "/ar/manage-profile",
    },
    {
      icon: RegisterInstructorIcon,
      label: `${(userDataState?.instructorApproved) ? (switch_to_instructor) : (Register_as_an_Instructor)}`,
      link: `${(userDataState?.instructorApproved) ? (`${process.env.NEXT_PUBLIC_API_KEY1}/Dashboard/Setup/InstructorDashboard?TK=${authToken}`) : ('/ar/instructor')}`,
      slug: "instructorApproved"
    },
    {
      icon: SignOutIcon,
      link: "signout",
      label: Sign_Out,
    },
  ];

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

  const Signout = async () => {
    try {
      const response = await endpoints.LogoutUser(userDataState?.authToken);
      if (response?.data?.statusCode === "200") {
        deleteAllCookies();
        router.push("/ar");
        dispatch(userData({}));
      }
    } catch (error) {
      //console.log(error);
    }
  };

  const today = moment();

  const [collapseIndex, setCollapseIndex] = useState(false);

  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [languageState, setLanguageState] = useState("English");
  const languageArr = [
    {
      name: "English",
      link: "/dashboard",
      class: "language-btn-english",
    },
    {
      name: arabic,
      link: "/ar/dashboard",
      class: "active-language-btn-english",
    },
  ];

  const showLanguageModal = () => {
    setIsLanguageModalOpen(true);
  };
  const closeLanguageModal = () => {
    setIsLanguageModalOpen(false);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState("");

  const activeSidebarLink = () => {
    const sidebarMenu = document.querySelector(".sidebar-menu");
    const sidebarDropmenu = sidebarMenu.querySelectorAll(".has-drop");
    const sidebarMenuIcon = sidebarMenu.querySelectorAll(
      "li.has-drop .sidebar-menu-icon"
    );
    const sidebarMenuText = sidebarMenu.querySelectorAll(
      "li.has-drop .sidebar-menu-text"
    );
    sidebarDropmenu.forEach((element) => {
      element.querySelectorAll(".sidebar-dropmenu > a").forEach((element) => {
        if (element.classList.contains("active")) {
          element.parentElement.parentElement.classList.add("active");
          element.parentElement.parentElement
            .querySelector(".sidebar-menu-icon")
            .classList.add("active");
        }
      });
    });
    sidebarDropmenu.forEach((element) => {
      element.querySelectorAll(".sub-dropmenu > a").forEach((element) => {
        if (element.classList.contains("active")) {
          element.parentElement.classList.add("active");
          element.parentElement.parentElement.parentElement.classList.add(
            "active"
          );
          element.parentElement.parentElement.parentElement
            .querySelector(".sidebar-menu-icon")
            .classList.add("active");
        }
      });
    });
    sidebarMenuText.forEach((element) => {
      element.addEventListener("click", function (e) {
        e.preventDefault();
        element.parentElement.parentElement.classList.toggle("active");
      });
    });
    sidebarMenuIcon.forEach((element) => {
      element.addEventListener("click", function (e) {
        e.preventDefault();
        element.parentElement.parentElement.classList.toggle("active");
      });
    });
  };

  const [isDesktop, setIsDesktop] = useState(false);
  const [visibleLearnerMobSidebarDrawer, setVisibleLearnerMobSidebarDrawer] =
    useState(false);

  useLayoutEffect(() => {
    activeSidebarLink();

    if (window.innerWidth > 800) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth > 800) {
        setIsDesktop(true);
      } else {
        setIsDesktop(false);
      }
    };
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, [isDesktop]);

  const [loading, setLoading] = useState(false);
  const [getUserNotificationData, setGetUserNotificationData] = useState([]);
  const [notificationCountState, setNotificationCountState] = useState(0);
  //console.log("getUserNotificationData", getUserNotificationData);

  const getUserNotificationFunc = async (
    token,
    PageSize,
    PageNo,
    Language,
    Search
  ) => {
    try {
      const response = await endpoints.getUserNotification(
        token,
        PageSize,
        PageNo,
        Language,
        Search
      );
      if (response) {
        //console.log("responseHeader", response);
        setGetUserNotificationData(response?.data?.data);
        setNotificationCountState(response?.data?.data?.totalUnRead);
      }
      setLoading(true);
    } catch (err) {
      setLoading(false);
    }
  };

  const userNotificationMarkReadFunc = async (
    token,
    id,
    recordId,
    recordType,
    topic_EN,
    code,
    messageCategory
  ) => {
    try {
      setLoading(true);
      //console.log("dataChangePassword", topic_EN, code);
      setCookies("trackingId", code);

      if (token) {
        const response = await endpoints.userNotificationMarkRead(token, id);

        if (response) {
          if (messageCategory === "LMSUserApplicationStatus") {
            if (topic_EN === "Approved") {
              if (recordType === "Course") {
                router.push(`/ar/course-inside/${recordId}`);
              }
              if (recordType === "Training") {
                router.push(`/ar/training-inside/${recordId}`);
              }
              if (recordType === "Program") {
                router.push(`/ar/program-inside/${recordId}`);
              }
              if (recordType === "Webinar") {
                router.push(`/ar/webinar-inside/${recordId}`);
              }
              if (recordType === "Symposiums") {
                router.push(`/ar/symposium-inside/${recordId}`);
              }
              if (recordType === "Workshop") {
                router.push(`/ar/workshop-inside/${recordId}`);
              }
              if (recordType === "Conference") {
                router.push(`/ar/conference-inside/${recordId}`);
              }
            } else {
              router.push(`/ar/track-your-application`);
            }
          } else if (messageCategory === "CertificateStatus") {
            if (recordType === "Course") {
              router.push(`/ar/course-inside/${recordId}`);
            }
            if (recordType === "Training") {
              router.push(`/ar/training-inside/${recordId}`);
            }
            if (recordType === "Program") {
              router.push(`/ar/program-inside/${recordId}`);
            }
            if (recordType === "Webinar") {
              router.push(`/ar/webinar-inside/${recordId}`);
            }
            if (recordType === "Symposiums") {
              router.push(`/ar/symposium-inside/${recordId}`);
            }
            if (recordType === "Workshop") {
              router.push(`/ar/workshop-inside/${recordId}`);
            }
            if (recordType === "Conference") {
              router.push(`/ar/conference-inside/${recordId}`);
            }
          } else if (messageCategory === "CertificateIssue") {
            if (recordType === "Course") {
              router.push(`/ar/course-inside/${recordId}`);
            }
            if (recordType === "Training") {
              router.push(`/ar/training-inside/${recordId}`);
            }
            if (recordType === "Program") {
              router.push(`/ar/program-inside/${recordId}`);
            }
            if (recordType === "Webinar") {
              router.push(`/ar/webinar-inside/${recordId}`);
            }
            if (recordType === "Symposiums") {
              router.push(`/ar/symposium-inside/${recordId}`);
            }
            if (recordType === "Workshop") {
              router.push(`/ar/workshop-inside/${recordId}`);
            }
            if (recordType === "Conference") {
              router.push(`/ar/conference-inside/${recordId}`);
            }
          } else if (messageCategory === "LMSUserApplicationApproved") {
            if (recordType === "Course") {
              router.push(`/ar/course-inside/${recordId}`);
            }
            if (recordType === "Training") {
              router.push(`/ar/training-inside/${recordId}`);
            }
            if (recordType === "Program") {
              router.push(`/ar/program-inside/${recordId}`);
            }
            if (recordType === "Webinar") {
              router.push(`/ar/webinar-inside/${recordId}`);
            }
            if (recordType === "Symposiums") {
              router.push(`/ar/symposium-inside/${recordId}`);
            }
            if (recordType === "Workshop") {
              router.push(`/ar/workshop-inside/${recordId}`);
            }
            if (recordType === "Conference") {
              router.push(`/ar/conference-inside/${recordId}`);
            }
          } else if (messageCategory === "LMSUserApplicationAdditionalInformation") {
            router.push(`/ar/track-your-application`);
          } else if (messageCategory === "InstructorTrackYourApplication") {
            router.push(`/ar/instructor-track-your-application`);
          } else if (messageCategory === "LMSUserApplicationInvoice") {
            router.push(`/ar/track-your-application`);
          } else if (messageCategory === "Reminder") {
            router.push(`/ar/reminders-settings`);
          }
        }
      }
    } catch (error) {
      //console.log("error", error);
      setLoading(false);
    }
    getUserNotificationFunc(token, 10, 1, "English", "");
  };

  useLayoutEffect(() => {
    getUserNotificationFunc(authToken, 10, 1, "English", "");
    document.body.classList.add("ar_pages");
  }, []);

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

  const countsNotification = useSelector(
    (state) => state?.notificationCountsReducer?.counts
  );

  const [countStateFlag,setCountStateFlag]=useState(false)

  const UserNotificationMarkAllReadFunc = async (token, read) => {
    dispatch(notificationCounts(0))
    try {
      setLoading(true);
      //console.log("data", data);
      //console.log("router.query", router?.query?.id);
if(token||read){

      const response = await endpoints.UserNotificationMarkAllRead(token, read);

      if (response) {
        //console.log("response", response?.data?.statusCode);
        setCountStateFlag(true);
      }
    }
  } catch (error) {
    //console.log("error", error);
    setLoading(false);
  }
  getUserNotificationFunc(token, 10, 1, "English", "");
  };

  const NotificationDropdown = (
    <NotityDropDown dir="rtl" title={notification}>
      <SocketComponent userMatchId={"123456778"} />
      <div class={`notification-dropdown`}>
        <div class="notification-dropdown-header">
          <h3>{Notifications}</h3>
          <div className="btn" onClick={()=>UserNotificationMarkAllReadFunc(authToken, true)}>{mark_all_as_read}</div>
        </div>
        <div class="notification-dropdown-body">
          <div class="notification-list">
            {getUserNotificationData?.userNotificationListViewModel?.map(
              (item, index) => (
                <div key={index}>
                  {item?.read ? (
                    <div
                      class="notification-list-item"
                      onClick={() =>{
                        setCookies('screenFlag',true);
                        userNotificationMarkReadFunc(
                          getCookies("token"),
                          item?.id,
                          item?.recordId,
                          item?.recordType,
                          item?.topic_EN,
                          item?.code,
                          item?.messageCategory
                        )
                      }}
                    >
                      <div>
                        <div class="img">
                          <img loading="lazy"src={MyProfileIcon} width="30px" alt="" />
                        </div>
                        <div class="text" className="content">
                          <h4>{item?.message_AR}</h4>
                          <Tooltip
                            placement="top"
                            title={moment
                              .utc(item?.insertDate)
                              .local()
                              .format("YYYY-M-DD h:mm:ss")}
                          >
                            <span>
                              {moment.utc(item?.insertDate).local().fromNow("")}
                            </span>
                          </Tooltip>
                        </div>
                      </div>
                      <div class="status">
                        {item?.recordType === "Webinar" && (
                          <span
                            class="status-badge"
                            style={{ background: item?.colorName }}
                          >
                            {webinar}
                          </span>
                        )}
                        {item?.recordType === "Course" && (
                          <span
                            class="status-badge"
                            style={{ background: item?.colorName }}
                          >
                            {course}
                          </span>
                        )}
                        {item?.recordType === "Program" && (
                          <span
                            class="status-badge"
                            style={{ background: item?.colorName }}
                          >
                            {program}
                          </span>
                        )}
                        {item?.recordType === "Training" && (
                          <span
                            class="status-badge"
                            style={{ background: item?.colorName }}
                          >
                            {training}
                          </span>
                        )}
                        {item?.recordType === "Workshop" && (
                          <span
                            class="status-badge"
                            style={{ background: item?.colorName }}
                          >
                            {workshop}
                          </span>
                        )}
                        {item?.recordType === "Symposiums" && (
                          <span
                            class="status-badge"
                            style={{ background: item?.colorName }}
                          >
                            {symposium}
                          </span>
                        )}
                        {item?.recordType === "Conference" && (
                          <span
                            class="status-badge"
                            style={{ background: item?.colorName }}
                          >
                            {conference}
                          </span>
                        )}
                        {item?.recordType === "New Badge" && (
                          <span
                            class="status-badge"
                            style={{ background: item?.colorName }}
                          >
                            {new_badge}
                          </span>
                        )}
                        {item?.recordType === null && (
                          <>
                            {/* <span
                              class="status-badge"
                              style={{ background: "#AEE8B4" }}
                            >
                              {item?.recordType}
                            </span> */}
                            {/* <span class="status-point"></span> */}
                          </>
                        )}
                        {item?.recordType === "Reminder" && (
                          <>
                            {/* <span
                              class="status-badge"
                              style={{ background: "#AEE8B4" }}
                            >
                              {item?.recordType}
                            </span> */}
                            {/* <span class="status-point"></span> */}
                          </>
                        )}
                      </div>{" "}
                    </div>
                  ) : (
                    <div
                      class="notification-list-item"
                      style={{ background: "#F5F5F5" }}
                      onClick={() =>{
                        setCookies('screenFlag',true);
                        userNotificationMarkReadFunc(
                          getCookies("token"),
                          item?.id,
                          item?.recordId,
                          item?.recordType,
                          item?.topic_EN,
                          item?.code,
                          item?.messageCategory
                        )
                        if(countsNotification>0){
                          dispatch(notificationCounts(countsNotification-1));
                        }
                      }
                    }
                    >
                      <div>
                        <div class="img">
                          <img loading="lazy"src={MyProfileIcon} width="30px" alt="" />
                        </div>
                        <div class="text" className="content">
                          <h4>{item?.message_AR}</h4>
                          <Tooltip
                            placement="top"
                            title={moment
                              .utc(item?.insertDate)
                              .local()
                              .format("YYYY-M-DD h:mm:ss")}
                          >
                            <span>
                              {moment.utc(item?.insertDate).local().fromNow("")}
                            </span>
                          </Tooltip>
                        </div>
                      </div>
                      <div class="status">
                        {item?.recordType === "Webinar" && (
                          <>
                            <span
                              class="status-badge"
                              style={{ background: item?.colorName }}
                            >
                              {webinar}
                            </span>
                            <span class="status-point"></span>
                          </>
                        )}
                        {item?.recordType === "Course" && (
                          <>
                            <span
                              class="status-badge"
                              style={{ background: item?.colorName }}
                            >
                              {course}
                            </span>
                            <span class="status-point"></span>
                          </>
                        )}
                        {item?.recordType === "Program" && (
                          <>
                            <span
                              class="status-badge"
                              style={{ background: item?.colorName }}
                            >
                              {program}
                            </span>
                            <span class="status-point"></span>
                          </>
                        )}
                        {item?.recordType === "Training" && (
                          <>
                            <span
                              class="status-badge"
                              style={{ background: item?.colorName }}
                            >
                              {training}
                            </span>
                            <span class="status-point"></span>
                          </>
                        )}
                        {item?.recordType === "Workshop" && (
                          <>
                            <span
                              class="status-badge"
                              style={{ background: item?.colorName }}
                            >
                              {workshop}
                            </span>
                            <span class="status-point"></span>
                          </>
                        )}
                        {item?.recordType === "Symposiums" && (
                          <>
                            <span
                              class="status-badge"
                              style={{ background: item?.colorName }}
                            >
                              {symposium}
                            </span>
                            <span class="status-point"></span>
                          </>
                        )}
                        {item?.recordType === "Conference" && (
                          <>
                            <span
                              class="status-badge"
                              style={{ background: item?.colorName }}
                            >
                              {conference}
                            </span>
                            <span class="status-point"></span>
                          </>
                        )}
                        {item?.recordType === "New Badge" && (
                          <>
                            <span
                              class="status-badge"
                              style={{ background: item?.colorName }}
                            >
                              {new_badge}
                            </span>
                            <span class="status-point"></span>
                          </>
                        )}
                        {item?.recordType === null && (
                          <>
                            {/* <span
                              class="status-badge"
                              style={{ background: "#AEE8B4" }}
                            >
                              {item?.recordType}
                            </span> */}
                            <span class="status-point"></span>
                          </>
                        )}
                        {item?.recordType === "Reminder" && (
                          <>
                            {/* <span
                              class="status-badge"
                              style={{ background: "#AEE8B4" }}
                            >
                              {item?.recordType}
                            </span> */}
                            <span class="status-point"></span>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
          <a
            class="all-notification-btn"
            onClick={() => router.push("/ar/notification")}
          >
            {view_all}{" "}
            <span>
              <svg
                width="8"
                height="12"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 5L5.35355 4.64645L5.70711 5L5.35355 5.35355L5 5ZM1.35355 0.646447L5.35355 4.64645L4.64645 5.35355L0.646447 1.35355L1.35355 0.646447ZM5.35355 5.35355L1.35355 9.35355L0.646447 8.64645L4.64645 4.64645L5.35355 5.35355Z"
                  fill="#105F43"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </NotityDropDown>
  );

  return (
    <>
      <SocketComponent userMatchId={"123456"} />
      {isDesktop ? (
        <>
          <StyledMainHeaderDiv dir="rtl">
            <Row>
              <MainMenuCol span={24}>
                <AdminLogoDiv>
                  <div>
                    <StyledSiderMenuUpDiv>
                      <LearnerDashboardLogo>
                        <NextLink href="/ar"><a><StyledAdminLogoImg src={(GetWidgetsState?.logo) ? (GetWidgetsState?.logo) : (Logo)} /></a></NextLink>
                      </LearnerDashboardLogo>
                      <PageDiv>
                        <ToggleHamburger
                          className="trigger"
                          onClick={() => {
                            setCollapsed(!collapsed);
                            setIsSidebarOpen(!collapsed);
                          }}
                        >
                          <img loading="lazy"className="rtl" src={ToggleHamburgerImg.src} />
                        </ToggleHamburger>

                        <PageTitleP>
                          <b>{name}</b>
                        </PageTitleP>
                      </PageDiv>
                    </StyledSiderMenuUpDiv>
                  </div>

                  <StyledSideMenuDiv>
                    <StyledUserImgDiv
                      title={manage_profile}
                      onClick={() => {
                        router.push("/ar/manage-profile");
                      }}
                    >
                      <div className="profile-img">
                        {userDataState?.photoUrl == "" ? (
                          <img loading="lazy"src={User} />
                        ) : (
                          <img loading="lazy"src={userDataState?.photoUrl} />
                        )}
                      </div>
                    </StyledUserImgDiv>
                    <StyledLanguageMenuDiv title={language} onClick={showLanguageModal}>
                      <div>
                        <img loading="lazy"src={SaudiaArabFlag} />
                      </div>
                      <p>{arabic}</p>
                    </StyledLanguageMenuDiv>

                    <Dropdown
                      overlay={NotificationDropdown}
                      trigger={["click"]}
                    >
                      <NotityDropDown
                        title={notification}
                        onClick={() =>
                          getUserNotificationFunc(
                            authToken,
                            10,
                            1,
                            "English",
                            ""
                          )
                        }
                      >
                        <StyledBellDiv>
                          <img loading="lazy"src={BellIcon} />
                          <StyledCountDiv>
                          {
                            pageVar?
                            <p>{countsNotification}</p>
                            :
                            <>
                            {countStateFlag ? (
                              <p>{countsNotification}</p>
                            ) : (
                              <p>
                                {countsNotification === 0
                                  ? notificationCountState + countsNotification
                                  : countsNotification}
                              </p>
                            )}
                            </>
                          }
                          </StyledCountDiv>
                        </StyledBellDiv>
                      </NotityDropDown>
                    </Dropdown>
                  </StyledSideMenuDiv>
                </AdminLogoDiv>
              </MainMenuCol>
            </Row>
            <StyledHeaderDiv>
              <StyledDiv>
                <Layout>
                  <StyledSider
                    breakpoint="xl"
                    collapsedWidth="60px"
                    onBreakpoint={(broken) => {
                      setCollapsed(broken);
                      setIsSidebarOpen(broken);
                    }}
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    width={"275px"}
                  >
                    <LearnerSidebar>
                      <div
                        class={`sidebar-menu ${
                          isSidebarOpen == true ? "hide-links" : ""
                        }`}
                      >
                        <ul>
                          {siderBarMenuArr.map((item, index) => (
                            <div key={index}>
                              {item?.sub_menu_arr || item?.sub_menu_objs ? (
                                <>
                                  <li className={`has-drop`}>
                                    <div>
                                      <div className="sidebar-menu-icon">
                                        <span>
                                          <img loading="lazy"src={item?.icon} />
                                        </span>
                                      </div>
                                      <div className="sidebar-menu-text">
                                        {item?.label}
                                      </div>
                                    </div>
                                    <div className="sidebar-dropmenu">
                                      {item?.sub_menu_arr?.map(
                                        (item, index) => (
                                          <Link
                                          key={index}
                                            href={`${item?.link}`}
                                            onClick={() => {
                                              router.push(`${item?.link}`);
                                            }}
                                            className={`${
                                              item?.link == selectItem
                                                ? "active"
                                                : ""
                                            }`}
                                          >
                                            {item?.title}
                                          </Link>
                                        )
                                      )}
                                      {item?.sub_menu_objs?.map(
                                        (item, index) => (
                                          <div className="sub-dropmenu">
                                            {item?.map((item, index) => (
                                              <Link
                                              key={index}
                                                href={`${item?.link}`}
                                                onClick={() => {
                                                  router.push(`${item?.link}`);
                                                }}
                                                className={`${
                                                  item?.link == selectItem
                                                    ? "active"
                                                    : ""
                                                }`}
                                              >
                                                {item?.title}
                                              </Link>
                                            ))}
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </li>
                                </>
                              ) : (
                                <>
                                  {item?.link === "signout" ? (
                                    <>
                                      <li>
                                        <div>
                                          <div
                                            className="sidebar-menu-icon"
                                            onClick={() => {
                                              router.push(`${item?.link}`);
                                            }}
                                          >
                                            <span
                                              style={{ background: "#105F43" }}
                                            >
                                              <img loading="lazy"src={item?.icon} />
                                            </span>
                                          </div>
                                          <div
                                            className="sidebar-menu-text"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              Signout();
                                            }}
                                          >
                                            {item?.label}
                                          </div>
                                        </div>
                                      </li>
                                    </>
                                  ) : (
                                    <>
                                      {(item?.slug === "instructorApproved") ? (<>
                                        {(item?.link === "/ar/instructor") ? (
                                          <li
                                            className={
                                              item?.link == selectItem
                                                ? "active"
                                                : ""
                                            }
                                          >
                                            <div>
                                              <div
                                                className="sidebar-menu-icon"
                                                onClick={() => {
                                                  router.push(`/${item?.link}`);
                                                }}
                                              >
                                                <span>
                                                  <img loading="lazy"src={item?.icon} />
                                                </span>
                                              </div>
                                              <div
                                                className="sidebar-menu-text"
                                                onClick={() => {
                                                  router.push(`/${item?.link}`);
                                                }}
                                              >
                                                <a href={item?.link} onClick={(e)=>{e.preventDefault()}}>{item?.label}</a>
                                              </div>
                                            </div>
                                          </li>
                                        ) : (
                                          <li
                                            className={
                                              item?.link == selectItem
                                                ? "active"
                                                : ""
                                            }
                                          >
                                            <div>
                                              <div
                                                className="sidebar-menu-icon"
                                                onClick={() => {
                                                  window.open(item?.link, "_blank")
                                                }}
                                              >
                                                <span>
                                                  <img loading="lazy"src={item?.icon} />
                                                </span>
                                              </div>
                                              <div
                                                className="sidebar-menu-text"
                                                onClick={() => {
                                                  window.open(item?.link, "_blank")
                                                }}
                                              >
                                                <a href={item?.link} onClick={(e)=>{e.preventDefault()}}>{item?.label}</a>
                                              </div>
                                            </div>
                                          </li>
                                        )}
                                      </>) : (
                                        <li
                                          className={
                                            item?.link == selectItem
                                              ? "active"
                                              : ""
                                          }
                                        >
                                          <div>
                                            <div
                                              className="sidebar-menu-icon"
                                              onClick={() => {
                                                router.push(`${item?.link}`);
                                              }}
                                            >
                                              <span
                                                style={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                  justifyContent: "center",
                                                }}
                                              >
                                                <img loading="lazy"src={item?.icon} />
                                              </span>
                                            </div>
                                            <div
                                              className="sidebar-menu-text"
                                              onClick={() => {
                                                router.push(`/${item?.link}`);
                                              }}
                                            >
                                              <a href={item?.link} onClick={(e)=>{e.preventDefault()}}>{item?.label}</a>
                                            </div>
                                          </div>
                                        </li>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </div>
                          ))}
                        </ul>
                      </div>
                    </LearnerSidebar>
                  </StyledSider>
                  <StyledLayout>
                    {!collapsed ? (
                      <Container>
                        <Content
                          className="site-layout-background"
                          style={{
                            padding: "40px 30px",
                            minHeight: 280,
                            marginTop: 45,
                          }}
                        >
                          {children}
                        </Content>
                      </Container>
                    ) : (
                      <Content
                        className="site-layout-background"
                        style={{
                          padding: "40px 30px",
                          minHeight: 280,
                          marginTop: 45,
                        }}
                      >
                        {children}
                      </Content>
                    )}
                  </StyledLayout>
                </Layout>
              </StyledDiv>
            </StyledHeaderDiv>
          </StyledMainHeaderDiv>

          <StyledModal
            title={Select_Language}
            open={isLanguageModalOpen}
            onOk={closeLanguageModal}
            onCancel={closeLanguageModal}
            width={480}
          >
            <StyledLanguageDiv>
              {languageArr?.map((item, index) => (
                <>
                  <CustomButton
                    key={index}
                    onClick={() => {
                      setIsLanguageModalOpen(false);
                      setLanguageState(item?.name);
                      router.push(
                        `/${location.href
                          .substr(
                            location.href.indexOf(location.host) +
                              location.host.length
                          )
                          .replace("/ar", "")}`
                      );
                    }}
                    className={item?.class}
                  >
                    {item?.name}
                  </CustomButton>
                </>
              ))}
            </StyledLanguageDiv>
          </StyledModal>
        </>
      ) : (
        <>
          <StyledMainHeaderDiv dir="rtl">
            <Row>
              <MainMenuCol span={24}>
                <AdminLogoDiv>
                  <div>
                    <StyledSiderMenuUpDiv>
                      <PageDiv>
                        <ToggleHamburger
                          onClick={() => {
                            setVisibleLearnerMobSidebarDrawer(true);
                          }}
                        >
                          <img loading="lazy"className="rtl" src={ToggleHamburgerImg.src} />
                        </ToggleHamburger>
                        <LearnerDashboardLogo>
                          <NextLink href="/ar"><a><StyledAdminLogoImg src={(GetWidgetsState?.logo) ? (GetWidgetsState?.logo) : (Logo)} /></a></NextLink>
                        </LearnerDashboardLogo>
                      </PageDiv>
                    </StyledSiderMenuUpDiv>
                  </div>

                  <StyledSideMenuDiv>
                    <StyledUserImgDiv
                      title={manage_profile}
                      onClick={() => {
                        router.push("/ar/manage-profile");
                      }}
                    >
                      <div className="profile-img">
                        {userDataState?.photoUrl == "" ? (
                          <img loading="lazy"src={User} />
                        ) : (
                          <img loading="lazy"src={userDataState?.photoUrl} />
                        )}
                      </div>
                    </StyledUserImgDiv>
                    <StyledLanguageMenuDiv title={language} onClick={showLanguageModal}>
                      <p>{arabic}</p>
                    </StyledLanguageMenuDiv>

                    <Dropdown
                      overlay={NotificationDropdown}
                      trigger={["click"]}
                    >
                      <NotityDropDown
                      title={notification}
                      onClick={() =>
                          getUserNotificationFunc(
                            authToken,
                            10,
                            1,
                            "English",
                            ""
                          )
                        }
                      >
                        <StyledBellDiv>
                          <img loading="lazy"src={BellIcon} />
                          <StyledCountDiv>
                          {
                            pageVar?
                            <p>{countsNotification}</p>
                            :
                            <>
                            {countStateFlag ? (
                              <p>{countsNotification}</p>
                            ) : (
                              <p>
                                {countsNotification === 0
                                  ? notificationCountState + countsNotification
                                  : countsNotification}
                              </p>
                            )}
                            </>
                          }
                          </StyledCountDiv>
                        </StyledBellDiv>
                      </NotityDropDown>
                    </Dropdown>
                  </StyledSideMenuDiv>
                </AdminLogoDiv>
              </MainMenuCol>
            </Row>
            <StyledHeaderDiv>
              <StyledDiv>
                <Layout>
                  <LearnerMobSidebar
                    className={visibleLearnerMobSidebarDrawer ? "show" : ""}
                  >
                    <LearnerSidebar>
                      <SidebarHeader
                      onClick={() => router.push("/ar")}
                      >
                        <StyledAdminLogoImg
                          src={(GetWidgetsState?.logo) ? (GetWidgetsState?.logo) : (Logo)}
                        />
                        <MobileRightNavToggle
                          onClick={() => {
                            setVisibleLearnerMobSidebarDrawer(false);
                          }}
                        >
                          <svg
                            width="30"
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
                                <feFlood
                                  flood-opacity="0"
                                  result="BackgroundImageFix"
                                />
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
                      <div className="sidebar-menu">
                      <ul>
                          {siderBarMenuArr.map((item, index) => (
                            <div key={index}>
                              {item?.sub_menu_arr || item?.sub_menu_objs ? (
                                <>
                                  <li className={`has-drop`}>
                                    <div>
                                      <div className="sidebar-menu-icon">
                                        <span>
                                          <img loading="lazy"src={item?.icon} />
                                        </span>
                                      </div>
                                      <div className="sidebar-menu-text">
                                        {item?.label}
                                      </div>
                                    </div>
                                    <div className="sidebar-dropmenu">
                                      {item?.sub_menu_arr?.map(
                                        (item, index) => (
                                          <Link
                                          key={index}
                                            href={`${item?.link}`}
                                            onClick={() => {
                                              router.push(`${item?.link}`);
                                            }}
                                            className={`${
                                              item?.link == selectItem
                                                ? "active"
                                                : ""
                                            }`}
                                          >
                                            {item?.title}
                                          </Link>
                                        )
                                      )}
                                      {item?.sub_menu_objs?.map(
                                        (item, index) => (
                                          <div className="sub-dropmenu">
                                            {item?.map((item, index) => (
                                              <Link
                                              key={index}
                                                href={`${item?.link}`}
                                                onClick={() => {
                                                  router.push(`${item?.link}`);
                                                }}
                                                className={`${
                                                  item?.link == selectItem
                                                    ? "active"
                                                    : ""
                                                }`}
                                              >
                                                {item?.title}
                                              </Link>
                                            ))}
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </li>
                                </>
                              ) : (
                                <>
                                  {item?.link === "signout" ? (
                                    <>
                                      <li>
                                        <div>
                                          <div
                                            className="sidebar-menu-icon"
                                            onClick={() => {
                                              router.push(`${item?.link}`);
                                            }}
                                          >
                                            <span
                                              style={{ background: "#105F43" }}
                                            >
                                              <img loading="lazy"src={item?.icon} />
                                            </span>
                                          </div>
                                          <div
                                            className="sidebar-menu-text"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              Signout();
                                            }}
                                          >
                                            {item?.label}
                                          </div>
                                        </div>
                                      </li>
                                    </>
                                  ) : (
                                    <>
                                      {(item?.slug === "instructorApproved") ? (<>
                                        {(item?.link === "/ar/instructor") ? (
                                          <li
                                            className={
                                              item?.link == selectItem
                                                ? "active"
                                                : ""
                                            }
                                          >
                                            <div>
                                              <div
                                                className="sidebar-menu-icon"
                                                onClick={() => {
                                                  router.push(`/${item?.link}`);
                                                }}
                                              >
                                                <span>
                                                  <img loading="lazy"src={item?.icon} />
                                                </span>
                                              </div>
                                              <div
                                                className="sidebar-menu-text"
                                                onClick={() => {
                                                  router.push(`/${item?.link}`);
                                                }}
                                              >
                                                <a href={item?.link} onClick={(e)=>{e.preventDefault()}}>{item?.label}</a>
                                              </div>
                                            </div>
                                          </li>
                                        ) : (
                                          <li
                                            className={
                                              item?.link == selectItem
                                                ? "active"
                                                : ""
                                            }
                                          >
                                            <div>
                                              <div
                                                className="sidebar-menu-icon"
                                                onClick={() => {
                                                  window.open(item?.link, "_blank")
                                                }}
                                              >
                                                <span>
                                                  <img loading="lazy"src={item?.icon} />
                                                </span>
                                              </div>
                                              <div
                                                className="sidebar-menu-text"
                                                onClick={() => {
                                                  window.open(item?.link, "_blank")
                                                }}
                                              >
                                                <a href={item?.link} onClick={(e)=>{e.preventDefault()}}>{item?.label}</a>
                                              </div>
                                            </div>
                                          </li>
                                        )}
                                      </>) : (
                                        <li
                                          className={
                                            item?.link == selectItem
                                              ? "active"
                                              : ""
                                          }
                                        >
                                          <div>
                                            <div
                                              className="sidebar-menu-icon"
                                              onClick={() => {
                                                router.push(`${item?.link}`);
                                              }}
                                            >
                                              <span
                                                style={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                  justifyContent: "center",
                                                }}
                                              >
                                                <img loading="lazy"src={item?.icon} />
                                              </span>
                                            </div>
                                            <div
                                              className="sidebar-menu-text"
                                              onClick={() => {
                                                router.push(`/${item?.link}`);
                                              }}
                                            >
                                              <a href={item?.link} onClick={(e)=>{e.preventDefault()}}>{item?.label}</a>
                                            </div>
                                          </div>
                                        </li>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </div>
                          ))}
                        </ul>
                      </div>
                    </LearnerSidebar>
                  </LearnerMobSidebar>
                  <StyledLayout>
                    <Content
                      className="site-layout-background"
                      style={{
                        padding: "35px 15px",
                        minHeight: 280,
                        marginTop: 45,
                      }}
                    >
                      {children}
                    </Content>
                  </StyledLayout>
                </Layout>
              </StyledDiv>
            </StyledHeaderDiv>
          </StyledMainHeaderDiv>
          <LearnerMobSidebarBg
            onClick={() => {
              setVisibleLearnerMobSidebarDrawer(false);
            }}
            className={visibleLearnerMobSidebarDrawer ? "show" : ""}
          ></LearnerMobSidebarBg>

          <StyledModal
            title={Select_Language}
            open={isLanguageModalOpen}
            onOk={closeLanguageModal}
            onCancel={closeLanguageModal}
            width={480}
          >
            <StyledLanguageDiv>
              {languageArr?.map((item, index) => (
                <>
                  <CustomButton
                    key={index}
                    onClick={() => {
                      setIsLanguageModalOpen(false);
                      setLanguageState(item);
                      router.push(
                        `/${location.href
                          .substr(
                            location.href.indexOf(location.host) +
                              location.host.length
                          )
                          .replace("/ar", "")}`
                      );
                    }}
                    className={item?.class}
                  >
                    {item?.name}
                  </CustomButton>
                </>
              ))}
            </StyledLanguageDiv>
          </StyledModal>
        </>
      )}
    </>
  );
};

export default App;

const StyledLanguageDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  .active-language-btn-english {
    margin-bottom: 20px;
    width: 100%;
    border: 1px solid #064b33 !important;
    background: #064b33 !important;
    color: #fff !important;
    border-radius: 7px !important;
  }
  .language-btn-english {
    margin-bottom: 20px;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.7);
    border-radius: 7px !important;
  }
  .language-btn {
    margin-bottom: 20px;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.7);
    border-radius: 7px !important;
  }
`;
const StyledLayout = styled(Layout)`
  //   background: #fff !important;
`;
const StyledDiv = styled.div`
  width: 100% !important;
  .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.2);
  }
  .site-layout-sub-header-background {
    background: #fff;
  }
  .site-layout-background {
    // background: #fff;
  }
  .ant-layout {
    min-height: 100vh;
    // height: 690px !important;
    // background: #fff !important;
  }
  .ant-layout-sider {
    // background: #fff !important;
    background: transparent !important;
    height: auto !important;
  }
  .ant-menu-title-content {
    color: #000 !important;
  }
  .ant-menu.ant-menu-dark {
    background: #f8fffc !important;
  }
  .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal)
    .ant-menu-item-selected {
    background: #ffffff !important;
    width: 220px !important;
    margin-left: 10px !important;
    height: 50px !important;
    box-shadow: 8px 8px 35px rgba(0, 0, 0, 0.08) !important;
    border-radius: 8px !important;
    .ant-menu-title-content {
      margin-left: -10px !important;
    }
  }
  .ant-menu-item {
    padding-left: 34px !important;
    margin-block: 10px !important;
  }
`;
const StyledSider = styled(Sider)`
  position: relative;
  padding-top: 61px;
`;
const LearnerSidebar = styled.div`
  position: relative;
  height: 100%;
  background: #fff0d4 !important;
  &&::before {
    content: "";
    position: absolute;
    width: 60px;
    height: 100%;
    background: #fff6e7;
    border-right: 1px solid #9b9b9b;
    z-index: 0;
  }
  .sidebar-menu.hide-links {
    .sidebar-menu-text {
      display: none !important;
    }
    .sidebar-dropmenu {
      position: absolute;
      top: 0;
      right: 65px;
      width: 200px;
      border-radius: 5px;
      padding: 8px 0px;
      padding-right: 10px;
      overflow: hidden;
      background: #fff;
      box-shadow: 1px 1px 20px -12px rgb(0 0 0 / 15%);
    }
  }
  .sidebar-menu {
    position: relative;
    padding-top: 20px;
    z-index: 2;
    ul {
      padding: 0;
      margin: 0;
      li {
        position: relative;
        list-style: none;
        margin-bottom: 5px;
        > div:not(.sidebar-dropmenu) {
          display: flex;
          .sidebar-menu-icon {
            width: 60px;
            span {
              position: relative;
              display: block;
              width: 45px;
              margin: auto;
              height: 100%;
              border-radius: 4px;
              padding: 10px 5px;
              text-align: center;
              line-height: 0;
              cursor:pointer;
              img {
                width: 22px;
              }
            }
            span::before {
              content: "";
              position: absolute;
              top: 50%;
              right: 4px;
              transform: translateY(-50%);
              width: 1px;
              height: 80%;
            }
          }
          .sidebar-menu-icon.active {
            span {
              background: #fff;
            }
            span::before {
              background: #105f43b5;
            }
          }
          .sidebar-menu-text {
            position: relative;
            display: flex;
            align-items: center;
            width: calc(100% - 60px);
            padding: 8px 18px;
            cursor: pointer;
            font-size: 14px;
            font-family: "GESSTwoLight";

            a {
              color: inherit;
              width: 100%;
            }
          }
        }
        .sidebar-dropmenu {
          width: calc(100% - 60px);
          margin-right: auto;
          padding-right: 25px;
          display: none;
          > a {
            position: relative;
            display: block;
            color: inherit;
            font-size: 12px;
            font-family: "GESSTwoLight";
            padding: 2px 0px;
            padding-right: 15px;
          }
          a.active {
            color: #105f43;
            font-family: "GESSTwoLight" !important;
          }
          a.active::before {
            content: "";
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            width: 8px;
            height: 1px;
            background: #105f43;
          }
          > .sub-dropmenu {
            margin-left: 20px;
            a:nth-child(1) {
              padding: 8px 0;
              padding-right: 15px;
              font-family: "GESSTwoLight";
            }
            a:nth-child(1)::before {
              content: "";
              position: absolute;
              top: 50%;
              right: 0;
              transform: translateY(-50%);
              width: 8px;
              height: 1px;
              background: #000;
            }
            a {
              position: relative;
              display: block;
              color: inherit;
              font-size: 12px;
              font-family: "GESSTwoLight";
              padding-left: 15px;
            }
            a:not(:first-child) {
              display: none;
            }
          }
          > .sub-dropmenu:not(:first-child) {
            border-top: 1px solid #e1ab46;
          }
          > .sub-dropmenu.active {
            padding: 8px 0px;
            a:nth-child(1) {
              padding: 2px 15px 2px 0;
              font-family: "GESSTwoLight";
            }
            > a:nth-child(1)::before {
              background: transparent;
            }
            > a {
              display: block;
              padding: 2px 15px 2px 0;
            }
            > a.active {
              color: #105f43;
            }
            > a.active::before {
              background: #105f43;
            }
          }
          > .sub-dropmenu.active:first-child {
            padding-top: 0;
          }
        }
      }
      li.has-drop {
        > div:not(.sidebar-dropmenu) {
          .sidebar-menu-text::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 20px;
            width: 5px;
            transform: translateY(-50%) rotate(180deg);
            background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='8' height='16' viewBox='0 0 8 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M1 15L7 7.56763L0.999999 1' stroke='black' stroke-width='1.2' stroke-linejoin='round'/%3e%3c/svg%3e");
            height: 12px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
          }
        }
      }
      li.active {
        .sidebar-dropmenu {
          display: block;
        }
        > div:not(.sidebar-dropmenu) {
          .sidebar-menu-icon {
            span {
              background: #fff;
            }
            span::before {
              background: #105f43b5;
            }
          }
          .sidebar-menu-text {
            color: #105f43;

            a {
              color: #105f43;
              width: 100%;
            }
          }
          .sidebar-menu-text::after {
            transform: translateY(-50%) rotate(90deg);
          }
        }
      }
    }
  }
  @media screen and (max-width: 800px) {
    &&::-webkit-scrollbar {
      width: 0;
    }
    overflow: auto;
  }
`;
const LearnerMobSidebar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 350px;
  height: 100vh;
  background: #fff;
  transform: translate(400px);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  z-index: 200;
  &&.show {
    transform: translate(0);
    opacity: 1;
    visibility: visible;
  }
`;
const LearnerMobSidebarBg = styled.div`
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
const SidebarHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 20px 15px;
  border-bottom: 1px solid #9b9b9b;
  z-index: 201;
  img {
    height: 32px !important;
  }
  @media screen and (max-width: 800px) {
    position: sticky;
    top: 0;
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
const StyledMainHeaderDiv = styled.div`
  font-family: "GESSTwoLight";
  .react-calendar__navigation {
    margin-bottom: 15px !important;
  }
  .react-calendar__navigation__label__labelText
    .react-calendar__navigation__label__labelText--from {
    font-family: "GESSTwoLight", sans-serif;
    font-weight: 600;
    font-size: 25px;
    color: #2e2e2e;
  }
  .react-calendar__navigation__prev2-button {
    display: none !important;
  }
  .react-calendar__navigation__next2-button {
    display: none !important;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #fff;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #a87e33 !important;
  }
  .react-calendar__viewContainer {
    padding-inline: 10px !important;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #105f43 !important;
  }
  .react-calendar__tile--active {
    background: #105f43 !important;
    border-radius: 20px !important;
    color: #fff !important;
    height: 30px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    margin-top: 3px !important;
  }
  .react-calendar__tile--active:enabled:focus {
    border-radius: 20px !important;
    color: #fff !important;
  }
  .react-calendar__tile--active:enabled:hover {
    border-radius: 20px !important;
    color: #fff !important;
  }
  .react-calendar__tile:enabled:hover {
    border-radius: 20px !important;
    height: 30px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    margin-top: 3px !important;
    color: #000 !important;
  }
  .react-calendar__tile:enabled:focus {
    border-radius: 20px !important;
    height: 30px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    margin-top: 3px !important;
    color: #fff !important;
  }
  .react-calendar__tile--now {
    // background: #a87e33 !important;
    border-radius: 20px !important;
    height: 30px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    margin-top: 3px !important;
    color: #fff !important;
  }
  .react-calendar__tile--now:focus {
    // background: #a87e33 !important;
    border-radius: 20px !important;
    height: 30px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    margin-top: 3px !important;
    color: #fff !important;
  }
`;
const MainMenuCol = styled(Col)`
  // box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
  position: fixed;
  z-index: 100;
  width: 100%;
  background-color: #fff;
`;
const AdminLogoDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 61px;
  width: 100%;
  border-bottom: 1px solid #9b9b9b;
  // box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
  p {
    margin-bottom: 0px;
  }
  @media screen and (max-width: 800px) {
    padding-inline: 13px;
  }
`;
const LearnerDashboardLogo = styled.div`
  height: 61px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 275px;
  border-left: 1px solid #9b9b9b;
  cursor: pointer;
  @media screen and (max-width: 800px) {
    border-left: none;
    width: unset;
  }
`;
const StyledAdminLogoImg = styled.img`
  margin-inline: 12px;
  height: 30px;
  @media screen and (max-width: 800px) {
    margin-inline: 0;
    height: 24px;
  }
`;
const PageDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;
  p {
    margin-bottom: 0px;
    margin-left: 10px;
  }
  @media screen and (max-width: 800px) {
    margin-left: 0;
  }
`;
const PageTitleP = styled.p`
  font-family: "GESSTwoLight";
  font-size: 14px;
`;
const StyledHeaderDiv = styled.div`
  display: flex !important;
  .ant-menu-item {
    // margin-block: 10px !important;
  }
`;
const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
`;
const StyledSiderMenuUpDiv = styled.div`
  display: flex;
  align-items: center;
`;
const StyledModal = styled(Modal)`
  top: 40px !important;
  .ant-modal-header {
    border-radius: 14px 14px 0 0 !important;
    background: #0c5439 !important;
  }
  .ant-modal-footer {
    display: none !important;
  }
  .ant-modal-title {
    color: #fff !important;
  }
  .anticon-close {
    color: #fff !important;
  }
  .ant-modal-content {
    border-radius: 14px !important;
  }
`;
const StyledSideMenuDiv = styled.div`
  display: flex;
  align-items: center;
  width: 220px;
  justify-content: space-around;
  @media screen and (max-width: 800px) {
    width: unset;
    justify-content: unset;
    gap: 5px;
  }
`;
const StyledBellDiv = styled.div`
  height: 45px;
  width: 45px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #105f43;
  cursor: pointer;
  img {
    height: 24px;
    z-index: 1;
    position: absolute;
  }
  @media screen and (max-width: 800px) {
    height: 35px;
    width: 35px;
    img {
      height: 20px;
    }
  }
`;
const StyledCountDiv = styled.div`
  z-index: 1;
  background-color: #fff;
  border-radius: 50px;
  margin-left: 20px;
  margin-top: -12px;
  width: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 10px;
  }
`;
const StyledLanguageMenuDiv = styled.div`
  display: flex;
  align-items: center;
  border-inline: 1px solid rgba(0, 0, 0, 0.1);
  padding-inline: 15px;
  cursor: pointer;
  div {
    width: 25px;
  }
  p {
    margin-right: 6px;
    font-family: "GESSTwoLight";
  }
  img {
    width: 100%;
    height: 25px;
    border-radius: 50px;
  }
  @media screen and (max-width: 800px) {
    padding-inline: 6px;
    p {
      margin-right: 0;
      font-size: 12px;
    }
  }
`;
const StyledUserImgDiv = styled.div`
  cursor: pointer;
  .profile-img {
    width: 35px;
    height: 35px;
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
`;
const NotityDropDown = styled.div`
  position: relative;
  .notification-dropdown {
    width: 380px;
    max-width: 90vw;
    background-color: #fff;
    border: 1px solid #105f439e;
    border-radius: 8px;
    box-shadow: 10px 10px 35px rgba(0, 0, 0, 0.15);
  }
  .notification-dropdown .notification-dropdown-header {
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .notification-dropdown .notification-dropdown-header h3 {
    font-size: 18px;
    color: #000;
    margin: 0;
  }
  .notification-dropdown .notification-dropdown-header .btn {
    font-size: 12px !important;
    color: #0c5439 !important;
    font-weight: 500;
    cursor:pointer;
  }
  .notification-dropdown .notification-dropdown-body .notification-list {
    overflow: auto;
    padding-bottom: 10px;
    max-height: 350px;
  }
  .notification-dropdown-body .notification-list::-webkit-scrollbar {
    width: 2px;
  }
  .notification-dropdown-body .notification-list::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #b0b0b0;
  }
  .notification-dropdown-body .notification-list-item {
    display: flex;
    padding: 10px 20px;
    justify-content: space-between;
    div {
      display: flex;
    }
    .content {
      display: grid;
    }
    cursor: pointer !important;
  }
  .notification-dropdown-body .notification-list-item .img {
    margin-left: 15px;
  }
  .notification-dropdown-body .notification-list-item .text {
    color: #121212;
  }
  .notification-dropdown-body .notification-list-item .text h4 {
    margin: 0;
    font-size: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .notification-dropdown-body .notification-list-item .text span {
    margin: 0;
    font-size: 12px;
  }
  .notification-dropdown-body .notification-list-item .status {
    text-align: right;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    width: 100px;
  }
  .notification-dropdown-body .notification-list-item .status .status-point {
    display: inline-block;
    width: 9px;
    height: 9px;
    background-color: #105f43;
    border-radius: 100%;
    margin-right: 5px;
  }
  .notification-dropdown-body .notification-list-item .status .status-badge {
    display: inline-block;
    color: #000;
    padding: 0 3px;
    border-radius: 3px;
    font-size: 10px;
  }
  .notification-dropdown .all-notification-btn {
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
    display: flex !important;
    flex-direction: row !important;
    gap: 5px;
    align-items: center;
    justify-content: center;
    font-size: 14px !important;
    background-color: #eef6f4;
    color: #105f43;
    border-radius: 4px;
    padding: 4px !important;
    font-weight: 500;
  }
  .notification-dropdown .all-notification-btn span {
    line-height: 0;
  }
  @media screen and (max-width: 800px) {
  }
`;
const ToggleHamburger = styled.div`
  cursor: pointer;
  margin-right: 12px;
  img {
    width: 20px;
  }
  @media screen and (max-width: 800px) {
    margin-left: 12px;
    margin-right: 0;
  }
`;
