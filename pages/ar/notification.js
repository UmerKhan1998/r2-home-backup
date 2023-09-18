import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Header from "../../src/components/rtl/adminLayoutHeader";
import SocketComponent from "../../src/components/rtl/SocketComponent";
import styled from "styled-components";
import {
  Badge,
  Button,
  Col,
  DatePicker,
  Empty,
  Input,
  Pagination,
  Row,
  Select,
  Table,
  Tabs,
  Tooltip,
} from "antd";

import { MyProfileIcon, R2Favicon, SearchIcon } from "../../images";
import Preloader from "../../public/images/Preloader.gif";
import {} from "@ant-design/icons";

import endpoints from "../../src/api";

import { useDispatch, useSelector } from "react-redux";
import { AiOutlineRight } from "react-icons/ai";
import { notificationCounts } from "../../src/redux/actions";

import router from "next/router";
import { getCookies, setCookies } from "../../src/helpers/cookie";
import CustomButton from "../../src/components/rtl/Button";
import moment from "moment";
import { Notifications, Search, conference, course, mark_all_as_read, new_badge, new_i, program, symposium, training, view, webinar, workshop } from "../../src/helpers/LanguageConstant";

const { Option } = Select;

const dashboard = () => {
  const dispatch=useDispatch()
  
  const countsNotification = useSelector(
    (state) => state?.notificationCountsReducer?.counts
  )

  const [collapsed, setCollapsed] = useState(false);
  const [selectItem, setSelectItem] = useState("");

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

  const certificatesArr = [
    {
      title: "Riyadh Second Health Cluster: English learning course",
      issue_date: "2022-10-08T16:12:05.516+00:00",
      department_name: "English Language",
      category_name: "English Language",
    },
    {
      title: "Riyadh Second Health Cluster: English learning course",
      issue_date: "2022-10-08T16:12:05.516+00:00",
      department_name: "English Language",
      category_name: "English Language",
    },
    {
      title: "Riyadh Second Health Cluster: English learning course",
      issue_date: "2022-10-08T16:12:05.516+00:00",
      department_name: "English Language",
      category_name: "English Language",
    },
  ];

  const notificationArr = [
    {
      day: "Today",
      para: "Mark all as read",
      data: [
        {
          img: "https://avatarfiles.alphacoders.com/224/thumb-224842.png",
          title: "Sehrish Hayat made an notification: Join me Live on Zoom",
          para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          status: "Webinar",
          date: "Today at 11:24 PM",
          read: false,
        },
        {
          img: "https://avatarfiles.alphacoders.com/224/thumb-224842.png",
          title: "Sehrish Hayat made an notification: Join me Live on Zoom",
          para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          status: "Course",
          date: "Today at 11:24 PM",
          read: true,
        },
      ],
    },
    {
      day: "Yesterday",
      data: [
        {
          img: "https://avatarfiles.alphacoders.com/224/thumb-224842.png",
          title: "Sehrish Hayat made an notification: Join me Live on Zoom",
          para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          status: "Webinar",
          date: "Today at 11:24 PM",
          read: false,
        },
        {
          img: "https://avatarfiles.alphacoders.com/224/thumb-224842.png",
          title: "Sehrish Hayat made an notification: Join me Live on Zoom",
          para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          status: "New Badge",
          date: "Today at 11:24 PM",
          read: true,
        },
        {
          img: "https://avatarfiles.alphacoders.com/224/thumb-224842.png",
          title: "Sehrish Hayat made an notification: Join me Live on Zoom",
          para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          status: "Course",
          date: "Today at 11:24 PM",
          read: false,
        },
        {
          img: "https://avatarfiles.alphacoders.com/224/thumb-224842.png",
          title: "Sehrish Hayat made an notification: Join me Live on Zoom",
          para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          status: "Webinar",
          date: "Today at 11:24 PM",
          read: false,
        },
        {
          img: "https://avatarfiles.alphacoders.com/224/thumb-224842.png",
          title: "Sehrish Hayat made an notification: Join me Live on Zoom",
          para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          status: "Course",
          date: "Today at 11:24 PM",
          read: false,
        },
      ],
    },
  ];

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [getUserNotificationData, setGetUserNotificationData] = useState([]);
  //console.log("getUserNotificationDataScreen", getUserNotificationData);

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
              router.pushar / `/track-your-application`;
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
    const authToken = getCookies("token");
    getUserNotificationFunc(authToken, pageSize, pageNo, "English", search);
  }, [search, pageNo, pageSize]);

  const [pageVar, setPageVar] = useState(false);

  const UserNotificationMarkAllReadFunc = async (token, read) => {
    try {
      setLoading(true);
      //console.log("data", data);
      //console.log("router.query", router?.query?.id);
      if (token || read) {
        const response = await endpoints.UserNotificationMarkAllRead(
          token,
          read
        );

        if (response) {
          //console.log("response", response?.data?.statusCode);
          // toast.success(`${response?.data?.message}`);
          // router.push("/sign-in");
          dispatch(notificationCounts(0));
          setPageVar(true);
        }
      }
    } catch (error) {
      //console.log("error", error);
      setLoading(false);
    }
    getUserNotificationFunc(token, 10, 1, "English", "");
  };

  const DesktopView = (
    <>
      <StyledNotificationMainDiv>
        <div>
          <div
            className="btn"
            onClick={() => UserNotificationMarkAllReadFunc(authToken, true)}
          >
            {mark_all_as_read}
          </div>
        </div>
        {/* {getUserNotificationData?.userNotificationListViewModel?.map(
                      (item) => ( */}
        <>
          {/* <Row className="main_row">
                            <h2 className="main">{item?.day}</h2>
                            <h2 className="all_read">{item?.para}</h2>
                          </Row> */}
          <StyledEmptyRow gutter={[24, 24]}>
            {getUserNotificationData?.userNotificationListViewModel ===
              undefined && (
              <Row>
                <Empty />
              </Row>
            )}
            {getUserNotificationData?.userNotificationListViewModel?.map(
              (item,index) => (
                <Col span={24} key={index}>
                  {!item?.read ? (
                    <StyledNotificationCardDiv>
                      <StyledTable>
                        <tr>
                          <td className="td_img">
                            <img loading="lazy"height={50} src={MyProfileIcon} />
                          </td>
                          <td style={{ width: 300 }}>
                            <StyledClickh1
                              onClick={() =>{
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
                              <h1>
                                <b>{item?.title_AR}</b>
                              </h1>
                            </StyledClickh1>
                          </td>

                          <td style={{ width: 300 }}>
                            <span className="ellips-3-line">{item?.message_AR}</span>
                          </td>

                          <td style={{ width: 235, textAlign: "center" }}>
                            {item?.recordType === "Webinar" && (
                              <StyledBadge
                                color={item?.colorName}
                                count={webinar}
                              />
                            )}
                            {item?.recordType === "Course" && (
                              <StyledBadge
                                color={item?.colorName}
                                count={course}
                              />
                            )}
                            {item?.recordType === "Program" && (
                              <StyledBadge
                                color={item?.colorName}
                                count={program}
                              />
                            )}
                            {item?.recordType === "Training" && (
                              <StyledBadge
                                color={item?.colorName}
                                count={training}
                              />
                            )}
                            {item?.recordType === "Workshop" && (
                              <StyledBadge
                                color={item?.colorName}
                                count={workshop}
                              />
                            )}
                            {item?.recordType === "Symposiums" && (
                              <StyledBadge
                                color={item?.colorName}
                                count={symposium}
                              />
                            )}
                            {item?.recordType === "Conference" && (
                              <StyledBadge
                                color={item?.colorName}
                                count={conference}
                              />
                            )}
                            {item?.recordType === "New Badge" && (
                              <StyledBadge
                                color={item?.colorName}
                                count={new_badge}
                              />
                            )}
                          </td>

                          <td style={{ width: 150 }}>
                            <Tooltip
                              placement="top"
                              title={moment
                                .utc(item?.insertDate)
                                .local()
                                .format("YYYY-M-DD h:mm:ss")}
                            >
                              <h1>
                                {/* {moment
                                            .utc(item?.insertDate)
                                            .local()
                                            .format("h:mm a")} */}
                                {moment
                                  .utc(item?.insertDate)
                                  .local()
                                  .fromNow("")}
                              </h1>
                            </Tooltip>
                          </td>

                          <td>
                            <CustomButton
                              className={"view_btn"}
                              onClick={() =>{
                                setCookies('screenFlag',true)
                                userNotificationMarkReadFunc(
                                  getCookies("token"),
                                  item?.id,
                                  item?.recordId,
                                  item?.recordType,
                                  item?.topic_AR,
                                  item?.code,
                                  item?.messageCategory
                                );
                                if(countsNotification>0){
                                  dispatch(notificationCounts(countsNotification-1));
                                }
                              }
                              }
                            >
                              {view}
                            </CustomButton>
                          </td>

                          <td>
                            <Badge color="#105f43" />
                          </td>
                        </tr>
                      </StyledTable>
                    </StyledNotificationCardDiv>
                  ) : (
                    <StyledNotificationCardDivUnread>
                      <StyledTable>
                        <tr>
                          <td className="td_img">
                            <img loading="lazy"height={50} src={MyProfileIcon} />
                          </td>
                          <td style={{ width: 300 }}>
                            <StyledClickh1
                              onClick={() =>
                                userNotificationMarkReadFunc(
                                  getCookies("token"),
                                  item?.id,
                                  item?.recordId,
                                  item?.recordType,
                                  item?.topic_EN,
                                  item?.code,
                                  item?.messageCategory
                                )
                              }
                            >
                              <h1>
                                <b>{item?.title_AR}</b>
                              </h1>
                            </StyledClickh1>
                          </td>

                          <td style={{ width: 300 }}>
                            <span className="ellips-3-line">{item?.message_AR}</span>
                          </td>

                          <td style={{ width: 235, textAlign: "center" }}>
                            {item?.recordType === "Webinar" && (
                              <StyledBadge
                                color={item?.colorName}
                                count={webinar}
                              />
                            )}
                            {item?.recordType === "Course" && (
                              <StyledBadge
                                color={item?.colorName}
                                count={course}
                              />
                            )}
                            {item?.recordType === "Program" && (
                              <StyledBadge
                                color={item?.colorName}
                                count={program}
                              />
                            )}
                            {item?.recordType === "Training" && (
                              <StyledBadge
                                color={item?.colorName}
                                count={training}
                              />
                            )}
                            {item?.recordType === "Workshop" && (
                              <StyledBadge
                                color={item?.colorName}
                                count={workshop}
                              />
                            )}
                            {item?.recordType === "Symposiums" && (
                              <StyledBadge
                                color={item?.colorName}
                                count={symposium}
                              />
                            )}
                            {item?.recordType === "Conference" && (
                              <StyledBadge
                                color={item?.colorName}
                                count={conference}
                              />
                            )}
                            {item?.recordType === "New Badge" && (
                              <StyledBadge
                                color={item?.colorName}
                                count={new_badge}
                              />
                            )}
                          </td>

                          <td style={{ width: 150 }}>
                            <Tooltip
                              placement="top"
                              title={moment
                                .utc(item?.insertDate)
                                .local()
                                .format("YYYY-M-DD h:mm:ss")}
                            >
                              <h1>
                                {/* {moment
                                            .utc(item?.insertDate)
                                            .local()
                                            .format("h:mm a")} */}
                                {moment
                                  .utc(item?.insertDate)
                                  .local()
                                  .fromNow("")}
                              </h1>
                            </Tooltip>
                          </td>

                          <td>
                            <CustomButton
                              className={"view_btn"}
                              onClick={() =>{
                                setCookies('screenFlag',true)
                                userNotificationMarkReadFunc(
                                  getCookies("token"),
                                  item?.id,
                                  item?.recordId,
                                  item?.recordType,
                                  item?.topic_AR,
                                  item?.code,
                                  item?.messageCategory
                                )
                              }
                            }
                            >
                              {view}
                            </CustomButton>
                          </td>

                          <td>{/* <Badge color="#105f43" /> */}</td>
                        </tr>
                      </StyledTable>
                    </StyledNotificationCardDivUnread>
                  )}
                </Col>
              )
            )}
          </StyledEmptyRow>
        </>
        {/* )
                    )} */}
      </StyledNotificationMainDiv>
    </>
  );

  const MobileView = (
    <>
      <StyledNotificationMainDiv>
        <div>
          <div
            className="btn"
            onClick={() => UserNotificationMarkAllReadFunc(authToken, true)}
          >
            {mark_all_as_read}
          </div>
        </div>
        {/* {getUserNotificationData?.userNotificationListViewModel?.map(
                      (item) => ( */}
        <>
          {/* <Row className="main_row">
                            <h2 className="main">{item?.day}</h2>
                            <h2 className="all_read">{item?.para}</h2>
                          </Row> */}
          <StyledEmptyRow gutter={[24, 24]}>
            {getUserNotificationData?.userNotificationListViewModel ===
              undefined && (
              <Row>
                <Empty />
              </Row>
            )}
            {getUserNotificationData?.userNotificationListViewModel?.map(
              (item,index) => (
                <Col span={24} key={index}>
                  {!item?.read ? (
                    <StyledNotificationCardDiv>
                      <Row>
                        <Col span={4}>
                          <img loading="lazy"height={30} src={MyProfileIcon} />
                        </Col>
                        <Col span={16}>
                          <StyledClickh1
                            onClick={() =>{
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
                            <h1>
                              <b>{item?.title_AR}</b>
                            </h1>
                          </StyledClickh1>
                        </Col>
                        <Col span={4} style={{ justifyContent: "end" }}>
                            {item?.recordType === "Webinar" && (
                              <StyledBadge
                                color={item?.colorName}
                                count={webinar}
                              />
                            )}
                            {item?.recordType === "Course" && (
                              <StyledBadge
                                color={item?.colorName}
                                count={course}
                              />
                            )}
                            {item?.recordType === "Program" && (
                              <StyledBadge
                                color={item?.colorName}
                                count={program}
                              />
                            )}
                            {item?.recordType === "Training" && (
                              <StyledBadge
                                color={item?.colorName}
                                count={training}
                              />
                            )}
                            {item?.recordType === "Workshop" && (
                              <StyledBadge
                                color={item?.colorName}
                                count={workshop}
                              />
                            )}
                            {item?.recordType === "Symposiums" && (
                              <StyledBadge
                                color={item?.colorName}
                                count={symposium}
                              />
                            )}
                            {item?.recordType === "Conference" && (
                              <StyledBadge
                                color={item?.colorName}
                                count={conference}
                              />
                            )}
                            {item?.recordType === "New Badge" && (
                              <StyledBadge
                                color={item?.colorName}
                                count={new_badge}
                              />
                            )}
                        </Col>
                      </Row>

                      <Row
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Col span={8}>
                          <Tooltip
                            placement="top"
                            title={moment
                              .utc(item?.insertDate)
                              .local()
                              .format("YYYY-M-DD h:mm:ss")}
                          >
                            <h1>
                              {/* {moment
                                            .utc(item?.insertDate)
                                            .local()
                                            .format("h:mm a")} */}
                              {moment.utc(item?.insertDate).local().fromNow("")}
                            </h1>
                          </Tooltip>
                        </Col>
                        <Col
                          span={9}
                          style={{ display: "flex", justifyContent: "end" }}
                        >
                          <CustomButton
                            className={"view_btn"}
                            onClick={() =>{
                              setCookies('screenFlag',true)
                              userNotificationMarkReadFunc(
                                getCookies("token"),
                                item?.id,
                                item?.recordId,
                                item?.recordType,
                                item?.topic_AR,
                                item?.code,
                                item?.messageCategory
                                )
                                if(countsNotification>0){
                                  dispatch(notificationCounts(countsNotification-1));
                                }
                              }
                              }
                          >
                            {view}
                          </CustomButton>

                          <Badge color="#105f43" style={{ marginRight: 10 }} />
                        </Col>
                      </Row>
                    </StyledNotificationCardDiv>
                  ) : (
                    <StyledNotificationCardDivUnread>
                      <Row>
                        <Col span={4}>
                          <img loading="lazy"height={30} src={MyProfileIcon} />
                        </Col>
                        <Col span={16}>
                          <StyledClickh1
                            onClick={() =>
                              userNotificationMarkReadFunc(
                                getCookies("token"),
                                item?.id,
                                item?.recordId,
                                item?.recordType,
                                item?.topic_EN,
                                item?.code,
                                item?.messageCategory
                              )
                            }
                          >
                            <h1>
                              <b>{item?.title_AR}</b>
                            </h1>
                          </StyledClickh1>
                        </Col>

                        <Col span={4} style={{ justifyContent: "end" }}>
                        {item?.recordType === "Webinar" && (
                              <StyledBadge
                                color={item?.colorName}
                                count={webinar}
                              />
                            )}
                            {item?.recordType === "Course" && (
                              <StyledBadge
                                color={item?.colorName}
                                count={course}
                              />
                            )}
                            {item?.recordType === "Program" && (
                              <StyledBadge
                                color={item?.colorName}
                                count={program}
                              />
                            )}
                            {item?.recordType === "Training" && (
                              <StyledBadge
                                color={item?.colorName}
                                count={training}
                              />
                            )}
                            {item?.recordType === "Workshop" && (
                              <StyledBadge
                                color={item?.colorName}
                                count={workshop}
                              />
                            )}
                            {item?.recordType === "Symposiums" && (
                              <StyledBadge
                                color={item?.colorName}
                                count={symposium}
                              />
                            )}
                            {item?.recordType === "Conference" && (
                              <StyledBadge
                                color={item?.colorName}
                                count={conference}
                              />
                            )}
                            {item?.recordType === "New Badge" && (
                              <StyledBadge
                                color={item?.colorName}
                                count={new_badge}
                              />
                            )}
                        </Col>
                      </Row>

                      <Row
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Col span={8}>
                          <Tooltip
                            placement="top"
                            title={moment
                              .utc(item?.insertDate)
                              .local()
                              .format("YYYY-M-DD h:mm:ss")}
                          >
                            <h1>
                              {/* {moment
                                            .utc(item?.insertDate)
                                            .local()
                                            .format("h:mm a")} */}
                              {moment.utc(item?.insertDate).local().fromNow("")}
                            </h1>
                          </Tooltip>
                        </Col>
                        <Col
                          span={8}
                          style={{ display: "flex", justifyContent: "end" }}
                        >
                          <CustomButton
                            className={"view_btn"}
                            onClick={() =>{
                              setCookies('screenFlag',true)
                              userNotificationMarkReadFunc(
                                getCookies("token"),
                                item?.id,
                                item?.recordId,
                                item?.recordType,
                                item?.topic_AR,
                                item?.code,
                                item?.messageCategory
                              )
                              }
                            }
                          >
                            {view}
                          </CustomButton>
                        </Col>
                      </Row>
                    </StyledNotificationCardDivUnread>
                  )}
                </Col>
              )
            )}
          </StyledEmptyRow>
        </>
        {/* )
                    )} */}
      </StyledNotificationMainDiv>
    </>
  );

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

  return (
    <StyledDiv>
      <SocketComponent userMatchId={"123456"} />

      {isAuthorized ? (
        <div className="container">
          <Head>
            <title>Riyadh Second Health Cluster</title>
            <link rel="icon" href={R2Favicon} />
          </Head>
          <body>
            <Header
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              selectItem={selectItem}
              setSelectItem={setSelectItem}
              pageVar={pageVar}
              name={""}
            >
              {/* <Container style={{ paddingInline: "0" }}> */}
              <Row gutter={[15, 15]}>
                <Col span={24}>
                  <MainHeading>{Notifications}</MainHeading>
                </Col>
                <Col span={24}>
                  <CourseFilterSearch>
                    <Row gutter={12}>
                      <Col xl={8} lg={8} md={24} sm={24} xs={24}>
                        <StyledInput
                          placeholder={Search}
                          suffix={
                            <img loading="lazy"alt={""} height={15} width={15} src={SearchIcon} />
                          }
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </Col>
                    </Row>
                  </CourseFilterSearch>
                </Col>
                <Col span={24}>
                  {isDesktop ? DesktopView : MobileView}
                  {getUserNotificationData?.totalRecord > 10 && (
                    <StyledPagination
                      defaultCurrent={1}
                      current={pageNo}
                      onChange={(e) => setPageNo(e)}
                      total={getUserNotificationData?.totalRecord}
                      // total={pageSize}
                    />
                  )}
                </Col>
              </Row>
              {/* </Container> */}
            </Header>
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

export default dashboard;

const StyledDiv = styled.div`
  .ant-pagination {
    display: flex !important;
    justify-content: center !important;
    padding: 20px 0 0 !important;
    // margin: 20px 0 !important;
    // background: #fff !important;
    border-radius: 15px !important;
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
    color: #105f43 !important;
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

const StyledNotificationMainDiv = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 5px 5px 31px 6px rgba(0, 0, 0, 0.05);
  .main_row {
    display: flex !important;
    justify-content: space-between !important;
    margin-top: 15px;
    margin-bottom: 15px;
    &:nth-child(1) {
      margin-top: 0px;
    }

    h2 {
      margin-bottom: 0px;
      font-family: "TitilliumNormal", sans-serif;
      font-weight: 600;
      font-size: 18px;
    }
    .main {
      color: #000000 !important;
    }
    .all_read {
      color: #105f43 !important;
    }
  }
  
  .btn {
    font-size: 14px !important;
    color: #0c5439 !important;
    font-weight: 700;
    cursor: pointer;
    margin-bottom:14px;
    text-align:end;
  }
`;

const MainHeading = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  font-family: "GESSTwoLight", sans-serif;
`;
const CourseFilterSearch = styled.div`
  margin-bottom: 8px;
  border-radius: 10px;
`;
const CertificatesCards = styled.div`
  padding: 15px 30px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 5px 5px 31px rgb(0 0 0 / 10%);

  .certificate-card {
    padding: 25px 0;
  }

  .certificate-card:not(:last-child) {
    border-bottom: 1px solid #e1e1e1;
  }

  .certificate-card .certificate-img img {
    width: 100px;
    margin-right: 20px;
  }

  .certificate-dec {
    padding-right: 20px;
  }
  .certificate-dec > span {
    font-size: 12px;
    font-weight: 600;
  }
  .certificate-dec h3 {
    font-size: 20px;
    color: #105f43;
    margin-bottom: 12px;
  }
  .certificate-card .certificate-dec .date-department {
    font-size: 12px;
    margin-bottom: 6px;
    font-weight: 600;
  }
  .certificate-card .certificate-dec .date-department span {
    color: #979797;
  }
  .certificate-dec a {
    color: #a87e33;
    margin-top: 25px;
    display: inline-block;
    text-decoration: underline;
    font-weight: 600;
  }

  .certificate-card .certificate-action {
    text-align: right;
  }
  .certificate-card .certificate-action a {
    display: inline-block;
    color: #fff;
    background: #105f43;
    padding: 5px 12px;
    border-radius: 4px;
    white-space: nowrap;
  }

  @media screen and (max-width: 768px) {
    .certificate-card {
      .ant-row {
        flex-direction: column;
        gap: 15px;

        .certificate-action {
          text-align: left;
        }
      }
    }
  }
`;

// const DashboardIconColumnCard = styled.div``

const StyledInput = styled(Input)`
  border-radius: 4px !important;

  @media screen and (max-width: 800px) {
    margin-bottom: 5px;
  }
`;

const StyledCoursesRow = styled(Row)`
  margin-top: 15px;
`;

const StyledCourseScheduledMainDiv = styled.div`
  padding: 0;
`;

const StyledCourseScheduledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between !important;
  width: 100%;
  padding: 6px 8px;
  background: #f9f9f9;
  margin-block: 10px;
  // margin: 20px 12px 10px;
  img {
    margin-right: 10px;
  }
`;

const StyledCourseScheduledInnerDiv = styled.div`
  h2 {
    margin-bottom: 0px;
    font-family: "TitilliumNormal", sans-serif;
    // font-weight: 700;
    font-size: 12px;
    line-height: 24px;
  }
  p {
    margin-bottom: 0px;
    font-size: 9px;
  }
`;

const StyledAiOutlineRight = styled(AiOutlineRight)``;

const StyledViewScheduledButton = styled(Button)`
  color: #105f43;
  background: #fff;
  border: 1px solid #105f43;
  background: #f9f9f9 !important;
  border-radius: 5px !important;
  padding-inline: 8px;
  height: 27px;
  display: flex;
  align-items: center;
  border-radius: 3px;

  &:hover {
    color: #105f43 !important;
  }
  &:focus {
    color: #105f43 !important;
  }
`;

const StyledSelect = styled(Select)`
  width: 100% !important;
  border-radius: 4px !important;
  // border: 1px solid #c1c1c1 !important;

  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border: 1px solid #c1c1c1 !important;
  }
  .ant-select-selection-item {
    font-family: "TitilliumNormal", sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #898989;
  }
  .ant-select-single.ant-select-open {
    color: #898989 !important;
  }

  @media screen and (max-width: 800px) {
    margin-bottom: 5px;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100% !important;
`;

const StyledViewAllDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledNotificationCardDiv = styled.div`
  background: #f5f5f5;
  border: 1px solid #dfdfdf;
  border-radius: 6px;
  padding: 15px;
  img {
    border-radius: 70px;
  }
  h1 {
    margin-bottom: 0px;
  }
  .ant-col {
    display: flex;
    align-items: center;
  }

  .title {
    width: 270px;
    display: flex;
    align-items: center;
    margin-inline: 10px;
  }
  .para {
    width: 270px;
    display: flex;
    align-items: center;
    margin-inline: 10px;
  }
  .status {
    width: 270px;
    display: flex;
    align-items: center;
    margin-inline: 10px;
  }
  .date {
    width: 270px;
    display: flex;
    align-items: center;
    margin-inline: 10px;
  }
  .title {
    width: 270px;
    display: flex;
    align-items: center;
    margin-inline: 10px;
  }
  .badge {
    width: 270px;
    display: flex;
    align-items: center;
    margin-inline: 10px;
  }

  .view_btn {
    background: transparent;
    border: 1px solid #064b33 !important;
    color: #064b33 !important;
    height: 35px;
  }

  td:nth-last-child(1) {
    width: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
  }
  td {
    h1 {
      padding-inline: 10px;
      font-size: 12px;
    }
  }

  .td_img {
    width: 0 !important;
  }

  .ellips-3-line {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StyledTable = styled.table`
  width: 100% !important;
`;

const StyledNotificationCardDivUnread = styled.div`
  background: transparent;
  border: 1px solid #dfdfdf;
  border-radius: 6px;
  padding: 15px;
  img {
    border-radius: 70px;
  }
  h1 {
    margin-bottom: 0px;
  }
  .ant-col {
    display: flex;
    align-items: center;
  }

  .title {
    width: 270px;
    display: flex;
    align-items: center;
    margin-inline: 10px;
  }
  .para {
    width: 270px;
    display: flex;
    align-items: center;
    margin-inline: 10px;
  }
  .status {
    width: 270px;
    display: flex;
    align-items: center;
    margin-inline: 10px;
  }
  .date {
    width: 270px;
    display: flex;
    align-items: center;
    margin-inline: 10px;
  }
  .title {
    width: 270px;
    display: flex;
    align-items: center;
    margin-inline: 10px;
  }
  .badge {
    width: 270px;
    display: flex;
    align-items: center;
    margin-inline: 10px;
  }

  .view_btn {
    background: transparent;
    border: 1px solid #064b33 !important;
    color: #064b33 !important;
    height: 35px;
  }

  td:nth-last-child(1) {
    width: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
  }
  .td_img {
    width: 0 !important;
  }
  td {
    h1 {
      padding-inline: 10px;
      font-size: 12px;
    }
  }

  .ellips-3-line {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StyledBadge = styled(Badge)`
  .ant-badge-count {
    border-radius: 5px !important;
    height: 28px !important;
    display: flex !important;
    align-items: center !important;
  }
  .ant-badge-count {
    color: #000 !important;
  }
  @media screen and (max-width: 991px) {
    .ant-badge-count {
      color: #000 !important;
      margin-bottom: 10px !important;
    }
  }
`;

const StyledPagination = styled(Pagination)`
  .ant-pagination-item-link {
    .anticon {
      -moz-transform: scaleX(-1) !important;
      -webkit-transform: scaleX(-1) !important;
      -o-transform: scaleX(-1) !important;
      transform: scaleX(-1) !important;
      -ms-filter: fliph !important;
      filter: fliph !important;
    }
  }
`;

const StyledClickh1 = styled.h1`
  cursor: pointer;
  @media screen and (max-width: 991px) {
    h1 {
      font-size: 16px !important;
      font-weight: 300 !important;
      line-height: 20px !important;
      margin-bottom: 10px !important;
      padding-left: 15px !important;
    }
  }
`;
const StyledEmptyRow = styled(Row)`
  justify-content: center;
`;
