import React, { useLayoutEffect, useRef, useState } from "react";
import Head from "next/head";
import Header from "../../src/components/adminLayoutHeader";
import styled from "styled-components";
import { Modal, Rate } from "antd";
import { Col, Row, Tabs, Collapse, Input } from "antd";

const { Panel } = Collapse;

import {
  SearchBgIcon,
  Rating1,
  Rating2,
  Rating3,
  Rating4,
  Rating5,
  LikeThumb,
  UserImg1,
  SaveImg,
  courseClock,
  UserBg,
  R2Favicon,
  User,
  LikeThumbFill,
} from "../../images";
import zoomLink from "../../public/images/zoomLink.svg";
import Rolling from "../../public/images/Rolling.gif";
import Preloader from "../../public/images/Preloader.gif";
import Onsite from "../../public/images/Onsite.svg";
import DiscussionInput from "../../public/images/DiscussionInput.svg";
import {
  DownloadOutlined,
  DownOutlined,
  FieldTimeOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import endpoints from "../../src/api";
import { useSelector } from "react-redux";
import TextArea from "antd/lib/input/TextArea";
import CustomButton from "../../src/components/Button";
import moment from "moment";
import { getCookies, setCookies } from "../../src/helpers/cookie";
import Image from "next/image";
import SkeletonTextPlaceholder from "../../src/components/SkeletonTextPlaceholder";
import Script from "next/script";
import { toast } from "react-toastify";

const dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectItem, setSelectItem] = useState("activities");

  const courseVideo = useRef();

  const [isZoomClassModalOpen, setIsZoomClassModalOpen] = useState();
  const [StartZoomTime, setStartZoomTime] = useState();
  const showAskToSubmitModal = () => {
    setIsZoomClassModalOpen(true);
  };
  const closeZoomClassModal = () => {
    setIsZoomClassModalOpen(false);
  };

  const router = useRouter();
  const courseId = router.query;

  const userDataState = useSelector((state) => state?.userDataReducer);
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

  const courseTrainingRegistrationId = courseId?.id;

  const [courseDiscussionComments, setCourseDiscussionComments] = useState();
  const [courseReviews, setCourseReviews] = useState();
  const [userReviews, setUserReviews] = useState({
    id: "",
    lmsUserId: "",
  });
  const [isRated, setIsRated] = useState(false);
  const [isRatingEmpty, setIsRatingEmpty] = useState(false);

  const [courseDetailState, setCourseDetailState] = useState();
  const [courseCurriculumState, setCourseCurriculumState] = useState();
  const [courseVideoState, setCourseVideoState] = useState("");
  const [courseFaqState, setCourseFaqState] = useState();
  const [DiscussionCommentCount, setDiscussionCommentCount] = useState(3);
  const [ReviewCommentCount, setReviewCommentCount] = useState(3);
  const [courseDiscussionCommentsParams, setcourseDiscussionCommentsParams] =
    useState({
      pageSize: 10000,
      pageNo: 1,
      language: "English",
      search: "",
    });

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isReviewEditModalOpen, setIsReviewEditModalOpen] = useState(false);
  const [isRatedReview, setIsRatedReview] = useState();
  const [reviewParams, setReviewParams] = useState({
    pageSize: 10000,
    pageNo: 1,
    language: "English",
    search: "",
    rating: 0,
  });
  const [addReviewParamsState, setAddReviewParamsState] = useState({
    review_EN: "",
    review_AR: "",
    rating: 0,
    courseTrainingId: courseDetailState?.courseTrainingId,
  });
  const [editReviewParamsState, setEditReviewParamsState] = useState({
    review_EN: "",
    review_AR: "",
    rating: 0,
    id: "",
    courseTrainingId: courseDetailState?.courseTrainingId,
  });
  const getDashboardInsideReview = async () => {
    try {
      const response = await endpoints.GetDashboardInsideReview(
        authToken,
        courseTrainingRegistrationId,
        reviewParams?.pageSize,
        reviewParams?.pageNo,
        reviewParams?.language,
        reviewParams?.search,
        reviewParams?.rating
      );
      if (response.data.statusCode === "200") {
        setCourseReviews(response?.data?.data);
        response?.data?.data?.dashboardInsideReviewViewModels.map(
          (item, index) => (
            <div key={index}>
              {item?.lmsUserId === userDataState?.id &&
                setUserReviews({
                  ...userReviews,
                  id: item?.id,
                  lmsUserId: item?.lmsUserId,
                })}
            </div>
          )
        );
        setAddReviewIndex();
      }
    } catch (error) {
      //console.log("error", error);
    }
  };
  const ReviewSeeMoreFunc = () => {
    setReviewCommentCount(ReviewCommentCount + 3);
    // setReviewParams({ ...reviewParams, pageSize: reviewParams?.pageSize + 2 });
  };
  const ReviewlessFunc = () => {
    // setReviewParams({ ...reviewParams, pageSize: 2 });
  };
  const AddCourseTrainingReviewFunc = async () => {
    try {
      if (addReviewParamsState?.review_EN === "") {
        setIsRatingEmpty(true);
      } else {
        const response = await endpoints.CourseTrainingReview(
          authToken,
          addReviewParamsState
        );
        if (response.data.statusCode === "200") {
          setIsRatedReview(false);
          getDashboardInsideReview();
          setIsReviewModalOpen(false);
          setAddReviewParamsState({
            ...addReviewParamsState,
            review_EN: "",
            review_AR: "",
            rating: 0,
            courseTrainingId: courseDetailState?.courseTrainingId,
          });
        }
      }
    } catch (error) {
      //console.log("error", error);
    }
  };
  const GetCourseTrainingReviewById = async () => {
    try {
      const response = await endpoints.GetCourseTrainingReviewById(
        authToken,
        userReviews?.id
      );
      if (response.data.statusCode === "200") {
        setEditReviewParamsState({
          ...editReviewParamsState,
          review_EN: response?.data?.data[0]?.review_EN,
          review_AR: response?.data?.data[0]?.review_AR,
          rating: response?.data?.data[0]?.rating,
          id: response?.data?.data[0]?.id,
        });
        setIsReviewEditModalOpen(true);
        setIsRated(true);
      }
    } catch (error) {
      //console.log("error", error);
    }
  };
  const EditCourseTrainingReviewFunc = async () => {
    try {
      const response = await endpoints.CourseTrainingReviewPut(
        authToken,
        editReviewParamsState
      );
      if (response.data.statusCode === "200") {
        getDashboardInsideReview();
        setIsReviewEditModalOpen(false);
        setEditReviewParamsState({
          ...editReviewParamsState,
          review_EN: "",
          review_AR: "",
          rating: 0,
          id: "",
          courseTrainingId: courseDetailState?.courseTrainingId,
        });
      }
    } catch (error) {
      //console.log("error", error);
    }
  };
  const DeleteCourseTrainingReviewFunc = async () => {
    try {
      const response = await endpoints.GetCourseTrainingReviewDelete(
        authToken,
        userReviews?.id
      );
      if (response.data.statusCode === "200") {
        getDashboardInsideReview();
        setIsRatedReview(false);
        setIsRated(false);
        setIsReviewEditModalOpen(false);
      }
    } catch (error) {
      //console.log("error", error);
    }
  };
  const CloseReviewModal = () => {
    setIsReviewModalOpen(false);
  };
  const CloseReviewEditModal = () => {
    setIsReviewEditModalOpen(false);
  };

  const [addDiscussionParamsState, setAddDiscussionParamsState] = useState({
    discussion_EN: "",
    discussion_AR: "",
    courseTrainingId: courseDetailState?.courseTrainingId,
  });

  const getDashboardInside = async (courseId) => {
    try {
      if (courseId) {
        const response = await endpoints.GetDashboardInside(
          authToken,
          courseId
        );
        if (response.data.statusCode === "200") {
          setCourseDetailState(response?.data?.data);
          setCourseCurriculumState(
            response?.data?.data?.dashboardInsideSectionViewModels
          );
          if (courseVideoState == "") {
            setCourseVideoState(response?.data?.data?.demoVideo_EN);
          }
        }
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  const getDashboardInsideFaq = async (courseTrainingRegistrationId) => {
    try {
      if (courseTrainingRegistrationId) {
        const response = await endpoints.GetDashboardInsideFaq(
          authToken,
          courseTrainingRegistrationId
        );
        if (response.data.statusCode === "404") {
          //console.log("GetDashboardInsideFaq", response);
        } else {
          setCourseFaqState(response?.data?.data);
        }
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  const GetDashboardInsideDiscussion = async () => {
    try {
      const response = await endpoints.GetDashboardInsideDiscussion(
        authToken,
        courseTrainingRegistrationId,
        courseDiscussionCommentsParams?.pageSize,
        courseDiscussionCommentsParams?.pageNo,
        courseDiscussionCommentsParams?.language,
        courseDiscussionCommentsParams?.search
      );
      if (response.data.statusCode === "404") {
        //console.log("GetDashboardInsideDiscussion", response);
      } else {
        setCourseDiscussionComments(response?.data?.data);
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  const [CertificateRequestLoading, setCertificateRequestLoading] =
    useState(false);
  const getCertificateRequestFunc = async () => {
    try {
      setCertificateRequestLoading(true);
      const response = await endpoints.GetCertificateRequest(
        authToken,
        courseTrainingRegistrationId
      );
      //console.log("kufygidofldgfuefhsakjfyd", response);
      if (response.data.statusCode === "200") {
        setCertificateRequestLoading(false);
        getDashboardInside(courseId.id);
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  const GetCertificateIssueByIdFunc = async () => {
    try {
      setCertificateRequestLoading(true);
      const response = await endpoints.GetCertificateCreate(
        authToken,
        courseTrainingRegistrationId
      );
      if (response?.data?.statusCode === "200") {
        let timestamp = new Date().getTime();

        const element = document.createElement("a");
        element.setAttribute("href", response?.data?.message);
        element.setAttribute("download", "");
        element.setAttribute("target", "_blank");

        element.style.display = "none";

        document.body.appendChild(element);

        element.click();
        document.body.removeChild(element);

        // window.open(response?.data?.message, "_blank")
        // setDownloadCertificateLink(response?.data?.message);
        // let timestamp = new Date().getTime();
        // const opt = {
        //   margin: [-1, 0, 0, 0],
        //   filename: `certificate-${timestamp}.pdf`,
        //   image: { type: 'jpeg', quality: 1 },
        //   html2canvas: { scale: 3, logging: true},
        //   jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        // };
        // html2pdf().set(opt).from(`<div style="height: 800px;">${response?.data?.data?.templateBody}</div>`).save();
        setCertificateRequestLoading(false);
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  const viewCourseFile = async (
    fileUrl,
    courseTrainingRegistrationId,
    courseTrainingFileId,
    fieldRecordType
  ) => {
    try {
      if (fileUrl != "") {
        setCourseVideoState(fileUrl);
      }
      const viewFileObj = {
        courseTrainingRegistrationId: courseTrainingRegistrationId,
        courseTrainingFileId: courseTrainingFileId,
        fieldRecordType: fieldRecordType,
      };
      const response = await endpoints.AddFileView(authToken, viewFileObj);
      if (response.data.statusCode === "200") {
        if (fileUrl != "") {
          playCourseVideo();
        }
        getDashboardInside(courseId.id);
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  const MarkAttendanceLMSUserFunc = async (courseTrainingLinkVenueId) => {
    try {
      const response = await endpoints.MarkAttendanceLMSUser(
        authToken,
        courseTrainingLinkVenueId,
        courseTrainingRegistrationId
      );
    } catch (error) {
      //console.log("error", error);
    }
  };

  const DiscussionSeeMoreFunc = () => {
    setDiscussionCommentCount(DiscussionCommentCount + 2);
    // setcourseDiscussionCommentsParams({
    //   ...courseDiscussionCommentsParams,
    //   pageSize: courseDiscussionCommentsParams?.pageSize + 3,
    // });
  };

  const DiscussionlessFunc = () => {
    setDiscussionCommentCount(2);
    // setcourseDiscussionCommentsParams({
    //   ...courseDiscussionCommentsParams,
    //   pageSize: 3,
    // });
  };

  const CourseTrainingDiscussionFunc = async () => {
    try {
      if (addDiscussionParamsState?.discussion_EN !== "") {
        const response = await endpoints.CourseTrainingDiscussion(
          authToken,
          addDiscussionParamsState
        );
        if (response.data.statusCode === "200") {
          GetDashboardInsideDiscussion();
        }
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  const playCourseVideo = () => {
    courseVideo.current.play();
  };

  const getMinute = (items) => {
    var totalMinutes = 0;
    items.map((item, index) => (totalMinutes += parseInt(item?.duration_EN)));

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours > 0 ? ` ${hours}h` : ""} ${
      minutes > 0 ? ` ${minutes}m` : ""
    }`;
  };

  const getLinkExt = (link) => {
    const arr = ["txt", "docx", "pdf", "png", "jpg", "jpeg"];
    const exten = link.split(".").pop().trim();
    return arr.includes(exten);
  };

  const [certificateRequest, setCertificateRequest] = useState();
  const getPercentageComplete = () => {
    let totalFiles = 0;
    let totalViewedFiles = 0;
    courseCurriculumState?.map((item, index) => {
      item?.dashboardInsideFileViewModels?.map((item, index) => {
        totalFiles++;
        if (item?.viewed === true) {
          totalViewedFiles++;
        }
      });
      item?.dashboardInsideFileZoomViewModels?.map((item, index) => {
        totalFiles++;
        if (item?.viewed === true) {
          totalViewedFiles++;
        }
      });
      // if(item?.dashboardInsideFileZoomViewModels[1]?.viewed != undefined) {
      //   totalFiles++
      //   if(item?.dashboardInsideFileZoomViewModels[1]?.viewed === true) {
      //     totalViewedFiles++
      //   }
      // }
    });
    if (totalFiles === totalViewedFiles) {
      setCertificateRequest(true);
    } else {
      setCertificateRequest(false);
    }
  };

  const ZoomActive = (time, duration) => {
    let Current_Utc_Date = moment.utc().local().format("DD-MM-YYYY");
    let Current_Utc_Time = moment.utc().local().format("HH:mm");
    let Given_Utc_Date = moment.utc(time).local().format("DD-MM-YYYY");
    let Given_Utc_Time = moment.utc(time).local().format("HH:mm");
    let Given_Utc_AddedTime = moment
      .utc(time)
      .local()
      .add(duration, "minutes")
      .format("HH:mm");
    if (Current_Utc_Date == Given_Utc_Date) {
      if (
        Current_Utc_Time >= Given_Utc_Time &&
        Current_Utc_Time <= Given_Utc_AddedTime
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  const chectZoomTimeOut = (dateTime, duration) => {
    let Current_Utc_Date = moment.utc().local().format("DD-MM-YYYY HH:mm");
    let Given_Utc_AddedTime = moment
      .utc(dateTime)
      .local()
      .add(duration, "minutes")
      .format("DD-MM-YYYY HH:mm");
    if (Current_Utc_Date > Given_Utc_AddedTime) {
      return true;
    } else {
      return false;
    }
  };

  const checkActivetab = () => {
    if (
      getCookies("activeQa") === "false" &&
      getCookies("activeReview") === "false" &&
      getCookies("activeDiscussionBoard") === "false" &&
      getCookies("activeCertificate") === "false"
    ) {
      return "1";
    } else {
      if (getCookies("activeQa") === "true") {
        return "2";
      } else if (getCookies("activeReview") === "true") {
        return "3";
      } else if (getCookies("activeDiscussionBoard") === "true") {
        return "4";
      } else if (getCookies("activeCertificate") === "true") {
        return "5";
      }
    }
  };

  const [AddReviewIndex, setAddReviewIndex] = useState();
  const AddReviewFavourite = async (reviewId) => {
    try {
      const ReviewObj = {
        reviewId: reviewId,
        favourite: true,
      };
      const response = await endpoints.AddReviewFavourite(authToken, ReviewObj);
      if (response.data.statusCode === "200") {
        getDashboardInsideReview();
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  const RemoveReviewFavourite = async (reviewId) => {
    try {
      const ReviewObj = {
        reviewId: reviewId,
        favourite: false,
      };
      const response = await endpoints.AddReviewFavourite(authToken, ReviewObj);
      if (response.data.statusCode === "200") {
        getDashboardInsideReview();
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  useLayoutEffect(() => {
    getDashboardInside(courseId?.id);
  }, []);

  useLayoutEffect(() => {
    getPercentageComplete();
  }, [courseCurriculumState]);

  useLayoutEffect(() => {
    getDashboardInsideFaq(courseDetailState?.courseTrainingRegistrationId);
    setAddReviewParamsState({
      ...addReviewParamsState,
      courseTrainingId: courseDetailState?.courseTrainingId,
    });
    setEditReviewParamsState({
      ...editReviewParamsState,
      courseTrainingId: courseDetailState?.courseTrainingId,
    });
    setAddDiscussionParamsState({
      ...addDiscussionParamsState,
      courseTrainingId: courseDetailState?.courseTrainingId,
    });
    setCookies("startAssessmentState", false);
    setCookies(
      "courseTrainingRegistrationId",
      courseDetailState?.courseTrainingRegistrationId
    );
  }, [
    courseDetailState?.courseTrainingRegistrationId,
    courseDetailState?.courseTrainingId,
  ]);

  useLayoutEffect(() => {
    userReviews?.lmsUserId === userDataState?.id
      ? setIsRatedReview(true)
      : setIsRatedReview(false);
  }, [userReviews?.lmsUserId, userDataState?.id]);

  useLayoutEffect(() => {
    if (userDataState?.id) {
      getDashboardInsideReview();
    }
  }, [reviewParams?.pageSize, reviewParams?.search, userDataState?.id]);

  useLayoutEffect(() => {
    GetDashboardInsideDiscussion();
  }, [courseDiscussionCommentsParams?.pageSize]);

  return (
    <>
      {isAuthorized ? (
        <>
          <Script type="text/javascript" src="../../html2pdf/htmlpdf.js" />
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
                name={""}
              >
                <Row gutter={[15, 15]}>
                  {/* <Col span={24}>
                  <MainHeading>
                    {courseDetailState?.title_EN === undefined ? (
                      <SkeletonTextPlaceholder width="50%" />
                    ) : (
                      courseDetailState?.title_EN
                    )}
                </MainHeading>
                </Col> */}

                  <Col span={24} lg={15}>
                    <CourseInsideDetail>
                      <div className="course-inside-video">
                        <CustomVideoPlayer>
                          <video
                            src={courseVideoState}
                            //   poster={DemoVideoThumb}
                            oncontextmenu="return false;"
                            controlsList="nodownload"
                            controls
                            ref={courseVideo}
                          ></video>
                        </CustomVideoPlayer>
                      </div>
                      <div className="course-inside-desc">
                        <h1>
                          {courseDetailState?.title_EN === undefined ? (
                            <SkeletonTextPlaceholder width="50%" />
                          ) : (
                            courseDetailState?.title_EN
                          )}
                        </h1>
                        <p>
                          Instructor:{" "}
                          {courseDetailState?.instructorName_EN ===
                          undefined ? (
                            <SkeletonTextPlaceholder width="50%" />
                          ) : (
                            courseDetailState?.instructorName_EN
                          )}
                        </p>
                      </div>
                      <CoursesTabs defaultActiveKey={checkActivetab()}>
                        <Tabs.TabPane tab="Overview" key="1">
                          <CourseOverview>
                            {courseDetailState?.overView_EN === undefined ? (
                              <>
                                <SkeletonTextPlaceholder width="70%" />
                                <SkeletonTextPlaceholder width="50%" />
                                <SkeletonTextPlaceholder width="60%" />
                              </>
                            ) : (
                              parse(`${courseDetailState?.overView_EN}`)
                            )}
                          </CourseOverview>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Q/A" key="2">
                          <CourseQa>
                            <StyledCollapse
                              expandIconPosition="right"
                              bordered={false}
                              defaultActiveKey={["0"]}
                              ghost
                              accordion
                            >
                              {courseFaqState?.map((item, index) => (
                                <Panel header={item?.question_EN} key={index}>
                                  <p>{item?.answer_EN}</p>
                                </Panel>
                              ))}
                            </StyledCollapse>
                          </CourseQa>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Reviews" key="3">
                          <CourseReview>
                            <h3>Student Feedback</h3>
                            <Row style={{ alignItems: "center" }}>
                              <Col span={5}>
                                <div className="course-rating">
                                  <div className="number">
                                    {courseReviews?.rating}
                                  </div>
                                  <div className="rating-img">
                                    <StyledRate
                                      disabled
                                      defaultValue={courseReviews?.rating}
                                    />
                                  </div>
                                  <div className="rating-txt">
                                    Webinar Rating
                                  </div>
                                </div>
                              </Col>
                              <Col span={19}>
                                <div className="rating-progress">
                                  <div className="rating-progress-bar">
                                    <div className="rating-seek">
                                      <span style={{ width: "100%" }}></span>
                                    </div>
                                    <div className="rating-star">
                                      <img loading="lazy"src={Rating5} width="100%" />
                                    </div>
                                  </div>
                                  <div className="rating-progress-bar">
                                    <div className="rating-seek">
                                      <span style={{ width: "80%" }}></span>
                                    </div>
                                    <div className="rating-star">
                                      <img loading="lazy"src={Rating4} width="100%" />
                                    </div>
                                  </div>
                                  <div className="rating-progress-bar">
                                    <div className="rating-seek">
                                      <span style={{ width: "60%" }}></span>
                                    </div>
                                    <div className="rating-star">
                                      <img loading="lazy"src={Rating3} width="100%" />
                                    </div>
                                  </div>
                                  <div className="rating-progress-bar">
                                    <div className="rating-seek">
                                      <span style={{ width: "40%" }}></span>
                                    </div>
                                    <div className="rating-star">
                                      <img loading="lazy"src={Rating2} width="100%" />
                                    </div>
                                  </div>
                                  <div className="rating-progress-bar">
                                    <div className="rating-seek">
                                      <span style={{ width: "20%" }}></span>
                                    </div>
                                    <div className="rating-star">
                                      <img loading="lazy"src={Rating1} width="100%" />
                                    </div>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                            <StyledInput
                              style={{ marginTop: "15px" }}
                              placeholder="Search reviews"
                              value={reviewParams?.search}
                              suffix={<img loading="lazy"width="25px" src={SearchBgIcon} />}
                              onChange={(e) => {
                                setReviewParams({
                                  ...reviewParams,
                                  pageSize: courseReviews?.totalRecord,
                                });
                                setReviewParams({
                                  ...reviewParams,
                                  search: e.target.value,
                                });
                              }}
                            />
                            <h3>
                              Reviews
                              {isRatedReview ? (
                                <span
                                  onClick={() => {
                                    GetCourseTrainingReviewById();
                                  }}
                                >
                                  Edit Your Review
                                </span>
                              ) : (
                                <span
                                  onClick={() => {
                                    setIsReviewModalOpen(true);
                                  }}
                                >
                                  Leave a Review
                                </span>
                              )}
                            </h3>
                            <ReviewComments>
                              {courseReviews?.dashboardInsideReviewViewModels
                                .slice(0, ReviewCommentCount)
                                .map((item, index) => (
                                  <>
                                    {/* {item?.lmsUserId != userDataState?.id && ( */}
                                    <div className="review-card" key={index}>
                                      <div className="review-card-img">
                                        {item?.photoUrl === "" ? (
                                          <img loading="lazy"src={UserBg} />
                                        ) : (
                                          <img loading="lazy"src={item?.photoUrl} />
                                        )}
                                      </div>
                                      <div className="review-card-text">
                                        <h4>
                                          {item?.userName_EN}
                                          <span>
                                            {moment(item?.insertDate)
                                              .add(10, "days")
                                              .calendar()}
                                          </span>
                                        </h4>
                                        <div className="review-date">
                                          <StyledRate
                                            disabled
                                            defaultValue={item?.rating}
                                          />
                                        </div>
                                        <p>{item?.review_EN}</p>
                                        <div className="review-helpful">
                                          {/* <div className="helpful-title">
                                            Was this review helpful?
                                          </div> */}
                                          <div>
                                            {index === AddReviewIndex ? (
                                              <>
                                                {(item?.favourite === "" ||
                                                  item?.favourite ===
                                                    "False") && (
                                                  <a
                                                    style={{
                                                      opacity: "0.5",
                                                      cursor: "not-allowed",
                                                    }}
                                                  >
                                                    <img loading="lazy"src={Rolling.src} />
                                                    <span>Helpful</span>
                                                  </a>
                                                )}
                                                {item?.favourite === "True" && (
                                                  <a
                                                    style={{
                                                      opacity: "0.5",
                                                      cursor: "not-allowed",
                                                    }}
                                                  >
                                                    <img loading="lazy"src={Rolling.src} />
                                                    <span>Helpful</span>
                                                  </a>
                                                )}
                                              </>
                                            ) : (
                                              <>
                                                {(item?.favourite === "" ||
                                                  item?.favourite ===
                                                    "False") && (
                                                  <a
                                                    onClick={(e) => {
                                                      e.preventDefault();
                                                      AddReviewFavourite(
                                                        item?.id
                                                      );
                                                      setAddReviewIndex(index);
                                                    }}
                                                  >
                                                    <img loading="lazy"src={LikeThumb} />
                                                    <span>Helpful</span>
                                                  </a>
                                                )}
                                                {item?.favourite === "True" && (
                                                  <a
                                                    onClick={(e) => {
                                                      e.preventDefault();
                                                      RemoveReviewFavourite(
                                                        item?.id
                                                      );
                                                      setAddReviewIndex(index);
                                                    }}
                                                  >
                                                    <img loading="lazy"src={LikeThumbFill} />
                                                    <span>Helpful</span>
                                                  </a>
                                                )}
                                              </>
                                            )}
                                            {/* {item?.favourite === "True" && (<>
                                              <a>
                                                <img loading="lazy"src={LikeThumbFill} width="27px" />
                                              </a>
                                              <a>
                                                <img
                                                  style={{
                                                    transform: "rotate(180deg)",
                                                  }}
                                                  src={LikeThumb}
                                                  width="27px"
                                                />
                                              </a>
                                            </>)}
                                            {item?.favourite === "False" && ( <>
                                              <a>
                                                <img loading="lazy"src={LikeThumb} width="27px" />
                                              </a>
                                              <a>
                                                <img
                                                  style={{
                                                    transform: "rotate(180deg)",
                                                  }}
                                                  src={LikeThumbFillRed}
                                                  width="27px"
                                                />
                                              </a>
                                            </>)}
                                            {item?.favourite === "" && (<>
                                              <a>
                                                <img loading="lazy"src={LikeThumb} width="27px" />
                                              </a>
                                              <a>
                                                <img
                                                  style={{
                                                    transform: "rotate(180deg)",
                                                  }}
                                                  src={LikeThumb}
                                                  width="27px"
                                                />
                                              </a>
                                            </>)} */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {/* )} */}
                                  </>
                                ))}

                              {courseReviews?.totalRecord === undefined && (
                                <div
                                  style={{
                                    textAlign: "center",
                                    paddingBlock: "10px",
                                  }}
                                >
                                  <img
                                    src={Rolling.src}
                                    width="40px"
                                    height="40px"
                                  />
                                </div>
                              )}

                              {courseReviews?.totalRecord === 0 ? (
                                <p> No Review Found </p>
                              ) : (
                                <>
                                  {ReviewCommentCount <=
                                    courseReviews?.totalRecord &&
                                    courseReviews?.totalRecord !== 3 && (
                                      <SeeMoreBtn onClick={ReviewSeeMoreFunc}>
                                        {" "}
                                        Show More{" "}
                                      </SeeMoreBtn>
                                    )}
                                  {/* {reviewParams?.pageSize >= courseReviews?.totalRecord ? (
                                  <SeeMoreBtn onClick={ReviewlessFunc}> Show Less </SeeMoreBtn>
                                ) : (
                                  <SeeMoreBtn onClick={ReviewSeeMoreFunc}> Show More </SeeMoreBtn>
                                )} */}
                                </>
                              )}
                            </ReviewComments>

                            {/* <WriteReview>
                            <h3>Write your Review</h3>
                              <Rate onChange={(val)=>{setAddReviewParamsState({...addReviewParamsState, rating: val})}} defaultValue={0} />
                              <StyledTextarea onChange={(e)=>{setAddReviewParamsState({...addReviewParamsState, review_EN: e.target.value})}} rows={5} placeholder="Write Here"></StyledTextarea>
                              <div style={{ textAlign: "right" }}>
                              <CustomButton
                                customStyle={{
                                  border: "1px solid #105F43",
                                  background: "#105F43",
                                  padding: "0 25px",
                                  height: 35,
                                  color: "#fff",
                                }}
                                onClick={AddCourseTrainingReviewFunc}
                              >
                                <span> Add Review </span>
                              </CustomButton>
                            </div>
                          </WriteReview>
                          <WriteReview>
                            <h3>Edit Review</h3>
                            <Rate onChange={(val)=>{setEditReviewParamsState({...editReviewParamsState, rating: val})}} defaultValue={0} />
                            <StyledTextarea onChange={(e)=>{setEditReviewParamsState({...editReviewParamsState, review_EN: e.target.value})}} rows={5} placeholder="Write Here"></StyledTextarea>
                            <div style={{ textAlign: "right" }}>
                              <CustomButton
                                customStyle={{
                                  border: "1px solid #105F43",
                                  background: "#105F43",
                                  padding: "0 25px",
                                  height: 35,
                                  color: "#fff",
                                }}
                                onClick={EditCourseTrainingReviewFunc}
                              >
                                <span> Save </span>
                              </CustomButton>
                            </div>
                          </WriteReview>
                          <YourReview>
                            <h3>Your Review</h3>
                            <Rate disabled defaultValue={4} />
                            <p>Nice !!!--3</p>
                          </YourReview> */}
                          </CourseReview>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Discussion Board" key="4">
                          <DiscussionBoard>
                            <>
                              {/* <StyledInput
                              placeholder="Search"
                              suffix={<img loading="lazy"width="25px" src={SearchBgIcon} />}
                            /> */}

                              {/* <div className="discussion-author">
                              <div className="author-img">
                                <img loading="lazy"src={Author1} width="45px" />
                              </div>
                              <div className="author-name">
                                <h4>Sehrish Hayat</h4>
                                <span>posted a notification . 1 year ago</span>
                              </div>
                            </div>
                            <div className="discussion-desc">
                              <h3>Course updated</h3>
                              <p>Hi. Friend,</p>
                              <p>
                                Lorem Ipsum is simply dummy text of the printing and
                                typesetting industry. Lorem Ipsum has been the
                                industry's standard dummy text ever since the 1500s,
                                when an unknown printer took a galley of type and
                                scrambled it to make a type specimen book. It has
                                survived not only five centuries, but also the leap
                                into electronic typesetting, remaining essentially
                                unchanged.
                              </p>
                              <p>
                                Lorem Ipsum is simply dummy text of the printing and
                                typesetting industry. Lorem Ipsum has been the
                                industry's standard dummy text ever since the 1500s,
                                when an unknown printer took a galley of type and
                                scrambled it to make a type specimen book. It has
                                survived not only five centuries, but also the leap
                                into electronic typesetting, remaining essentially
                                unchanged. Lorem Ipsum is simply dummy text of the
                                printing and typesetting industry. Lorem Ipsum has
                                been the industry's standard dummy text ever since the
                                1500s, when an unknown printer took a galley of type
                                and scrambled it to make a type specimen book. It has
                                survived not only five centuries, but also the leap
                                into electronic typesetting, remaining essentially
                                unchanged.
                              </p>
                              <p>Thanks</p>
                              <p>Sehrish Hayat</p>
                            </div> */}
                            </>
                            <div className="discussion-comment">
                              <div className="discussion-comment-input">
                                <div className="comment-input-img">
                                  {userDataState?.photoUrl == "" ? (
                                    <img loading="lazy"src={User} />
                                  ) : (
                                    <img
                                      src={userDataState?.photoUrl}
                                      width="40px"
                                    />
                                  )}
                                </div>
                                <div className="discussion-input">
                                  <input
                                    placeholder="Enter your comment"
                                    value={
                                      addDiscussionParamsState?.discussion_EN
                                    }
                                    onChange={(e) => {
                                      setAddDiscussionParamsState({
                                        ...addDiscussionParamsState,
                                        discussion_EN: e.target.value,
                                      });
                                      // if (e.key == "Enter") {
                                      //   CourseTrainingDiscussionFunc();
                                      // }
                                    }}
                                  />
                                  <span
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setAddDiscussionParamsState({
                                        ...addDiscussionParamsState,
                                        discussion_EN: "",
                                      });
                                      CourseTrainingDiscussionFunc();
                                    }}
                                  >
                                    <img loading="lazy"src={DiscussionInput.src} />
                                  </span>
                                </div>
                              </div>
                              {/* <a>Show comments</a> */}
                              <div className="discussion-comment-cards">
                                {courseDiscussionComments?.dashboardInsideDiscussionViewModels
                                  .slice(0, DiscussionCommentCount)
                                  .map((item, index) => (
                                    <div className="discussion-comment-card">
                                      <div className="discussion-card-img">
                                        {userDataState?.photoUrl == "" ? (
                                          <img loading="lazy"src={UserBg} />
                                        ) : (
                                          <img loading="lazy"src={item?.photoUrl} />
                                        )}
                                      </div>
                                      <div className="discussion-card-text">
                                        <h4>{item?.userName_EN}</h4>
                                        <p>{item?.discussion_EN}</p>
                                        <div className="discussion-date">
                                          {moment
                                            .utc(item?.insertDate)
                                            .local()
                                            .format("h:mm a")}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                {courseDiscussionComments?.totalRecord === 0 ||
                                courseDiscussionComments?.totalRecord ===
                                  undefined ? (
                                  <p> No Discussion Found </p>
                                ) : (
                                  <>
                                    {/* {(DiscussionCommentCount >= courseDiscussionComments?.totalRecord && DiscussionCommentCount >= courseDiscussionComments?.totalRecord && courseDiscussionComments?.totalRecord !== 3) && (
                                    <SeeMoreBtn onClick={DiscussionlessFunc}> Show Less </SeeMoreBtn>
                                  )} */}
                                    {DiscussionCommentCount <=
                                      courseDiscussionComments?.totalRecord &&
                                      courseDiscussionComments?.totalRecord !==
                                        3 && (
                                        <SeeMoreBtn
                                          onClick={DiscussionSeeMoreFunc}
                                        >
                                          {" "}
                                          Show More{" "}
                                        </SeeMoreBtn>
                                      )}
                                    {/* {courseDiscussionCommentsParams?.pageSize >=
                                  courseDiscussionComments?.totalRecord ? (
                                    <SeeMoreBtn onClick={DiscussionlessFunc}>
                                      Show Less
                                    </SeeMoreBtn>
                                  ) : (
                                    <SeeMoreBtn onClick={DiscussionSeeMoreFunc}>
                                      Show More
                                    </SeeMoreBtn>
                                  )} */}
                                  </>
                                )}
                              </div>
                            </div>
                          </DiscussionBoard>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Webinar Certificate" key="5">
                          <CertificateTab>
                            <p>
                              Get R2 Certificate by completing entire Webinar
                            </p>

                            {courseDetailState?.category === "Asynchronous" && (
                              <>
                                {courseDetailState?.certificateIssue &&
                                courseDetailState?.certificateRequest ? (
                                  <>
                                    {CertificateRequestLoading ? (
                                      <a disabled>
                                        Download Certificate{" "}
                                        <img loading="lazy"alt={""}
                                          src={Rolling}
                                          width="16px"
                                          height="16px"
                                        />
                                      </a>
                                    ) : (
                                      <a
                                        onClick={(e) => {
                                          e.preventDefault();
                                          GetCertificateIssueByIdFunc();
                                        }}
                                      >
                                        Download Certificate
                                      </a>
                                    )}
                                  </>
                                ) : (
                                  <button disabled>Download Certificate</button>
                                )}
                              </>
                            )}
                            {courseDetailState?.category === "Synchronous" && (
                              <>
                                {certificateRequest && (
                                  <>
                                    {courseDetailState?.certificateRequest &&
                                      courseDetailState?.certificateIssue ===
                                        false && (
                                        <>
                                          {courseDetailState?.certificateStatus ===
                                            "Refusal" && (
                                            <span>
                                              {
                                                courseDetailState?.certificateComments
                                              }
                                            </span>
                                          )}
                                          {(courseDetailState?.certificateStatus ===
                                            "" ||
                                            courseDetailState?.certificateStatus ===
                                              null) && (
                                            <span>
                                              You have already applied for the
                                              certificate
                                            </span>
                                          )}
                                        </>
                                      )}
                                    {courseDetailState?.certificateRequest &&
                                      courseDetailState?.certificateIssue && (
                                        <>
                                          {CertificateRequestLoading ? (
                                            <a disabled>
                                              Download Certificate{" "}
                                              <img loading="lazy"alt={""}
                                                src={Rolling}
                                                width="16px"
                                                height="16px"
                                              />
                                            </a>
                                          ) : (
                                            <a
                                              onClick={(e) => {
                                                e.preventDefault();
                                                GetCertificateIssueByIdFunc();
                                              }}
                                            >
                                              Download Certificate
                                            </a>
                                          )}
                                        </>
                                      )}
                                    {courseDetailState?.certificateRequest ===
                                      false && (
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          getCertificateRequestFunc();
                                        }}
                                        disabled={
                                          CertificateRequestLoading &&
                                          "disabled"
                                        }
                                      >
                                        Request for Certificate{" "}
                                        {CertificateRequestLoading && (
                                          <img loading="lazy"alt={""}
                                            src={Rolling}
                                            width="16px"
                                            height="16px"
                                          />
                                        )}
                                      </button>
                                    )}
                                  </>
                                )}
                                {!certificateRequest && (
                                  <button disabled>
                                    Request for Certificate
                                  </button>
                                )}
                              </>
                            )}
                          </CertificateTab>
                        </Tabs.TabPane>
                      </CoursesTabs>
                    </CourseInsideDetail>
                  </Col>
                  <Col span={24} lg={9}>
                    <CourseInsideCurriculum>
                      <h2 className="curriculum-title">Curriculum</h2>
                      <div className="lectures-duration">
                        {/* Lectures (150) | Duration (34h 40m) */}
                      </div>
                      {courseCurriculumState === undefined ? (
                        <>
                          <div className="dataLoader">
                            <img loading="lazy"alt={""} src={Rolling} width="40px" height="40px" />
                          </div>
                        </>
                      ) : (
                        <>
                          {courseCurriculumState?.map((item, index) => (
                            <div className="curriculum-modules" key={index}>
                              <div className="curriculum-module">
                                <div className="curriculum-module-head">
                                  <h4
                                    className="module-title"
                                    onClick={(e) => {
                                      e.target.parentElement.parentElement.classList.toggle(
                                        "active"
                                      );
                                    }}
                                  >
                                    {item?.title_EN}
                                  </h4>
                                  <a
                                    className="droparrow"
                                    onClick={(e) => {
                                      e.target.parentElement.parentElement.classList.toggle(
                                        "active"
                                      );
                                    }}
                                  >
                                    <DownOutlined />
                                  </a>
                                  <div className="module-total">
                                    {item?.dashboardInsideFileViewModels
                                      .length !== 0 && (
                                      <>
                                        <span>
                                          <img loading="lazy"src={SaveImg} width="14px" />
                                          {item
                                            ?.dashboardInsideFileZoomViewModels
                                            .length !== 0 ? (
                                            <>
                                              {item
                                                ?.dashboardInsideFileViewModels
                                                .length + 1}{" "}
                                              Files
                                            </>
                                          ) : (
                                            item?.dashboardInsideFileViewModels
                                              .length
                                          )}
                                        </span>
                                      </>
                                    )}
                                    {item?.dashboardInsideFileViewModels
                                      .length !== 0 && (
                                      <>
                                        <span>
                                          <img loading="lazy"src={courseClock} width="15px" />
                                          {getMinute(
                                            item?.dashboardInsideFileViewModels
                                          )}
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </div>
                                {/* <div className="curriculum-module-desc">{item?.description_EN}</div> */}
                                <div className="curriculum-module-dropdown">
                                  {item?.dashboardInsideFileZoomViewModels
                                    .length > 0 && (
                                    <>
                                      {item?.dashboardInsideFileZoomViewModels?.map(
                                        (item, index) => (
                                          <>
                                            {item?.venueType === "Online" && (
                                              <>
                                                {ZoomActive(
                                                  item?.zoomDate_EN,
                                                  item?.duration_EN
                                                ) ? (
                                                  <>
                                                    <div
                                                      className={`curriculum-module-lesson zoom-link ${
                                                        item?.viewed
                                                          ? "active"
                                                          : ""
                                                      }`}
                                                      key={index}
                                                      onClick={() => {
                                                        MarkAttendanceLMSUserFunc(
                                                          item?.courseTrainingLinkVenueId
                                                        );
                                                        window.open(
                                                          item?.zoomLink_EN,
                                                          "_blank"
                                                        );
                                                      }}
                                                    >
                                                      <div>
                                                        <h4>
                                                          {item?.title_EN}
                                                        </h4>
                                                        <span className="lesson-point"></span>{" "}
                                                        Join a Zoom Meeting
                                                      </div>
                                                      <ContentCenter>
                                                        <div class="pulse active">
                                                          <img
                                                            src={zoomLink?.src}
                                                            width="22px"
                                                          />
                                                        </div>
                                                      </ContentCenter>
                                                    </div>
                                                  </>
                                                ) : (
                                                  <>
                                                    {chectZoomTimeOut(
                                                      item?.zoomDate_EN,
                                                      item?.duration_EN
                                                    ) ? (
                                                      <div
                                                        className={`curriculum-module-lesson zoom-link disabled ${
                                                          item?.viewed
                                                            ? "active"
                                                            : ""
                                                        }`}
                                                        key={index}
                                                      >
                                                        <div>
                                                          <h4>
                                                            {item?.title_EN}
                                                          </h4>
                                                          <span className="lesson-point"></span>{" "}
                                                          <span
                                                            style={{
                                                              fontSize: "10px",
                                                              fontWeight: "700",
                                                              letterSpacing:
                                                                "0.1px",
                                                            }}
                                                          >
                                                            (
                                                            {moment
                                                              .utc(
                                                                item?.zoomDate_EN
                                                              )
                                                              .local()
                                                              .format(
                                                                "l, h:mm:ssa"
                                                              )}
                                                            )
                                                          </span>
                                                        </div>
                                                        <ContentCenter>
                                                          <div class="pulse">
                                                            <img
                                                              src={
                                                                zoomLink?.src
                                                              }
                                                              width="22px"
                                                            />
                                                          </div>
                                                        </ContentCenter>
                                                      </div>
                                                    ) : (
                                                      <div
                                                        className={`curriculum-module-lesson zoom-link ${
                                                          item?.viewed
                                                            ? "active"
                                                            : ""
                                                        }`}
                                                        key={index}
                                                        onClick={() => {
                                                          showAskToSubmitModal();
                                                          setStartZoomTime(
                                                            item?.zoomDate_EN
                                                          );
                                                          // window.open(item?.zoomLink_EN, "_blank");
                                                        }}
                                                      >
                                                        <div>
                                                          <h4>
                                                            {item?.title_EN}
                                                          </h4>
                                                          <span className="lesson-point"></span>{" "}
                                                          <span
                                                            style={{
                                                              fontSize: "10px",
                                                              fontWeight: "700",
                                                              letterSpacing:
                                                                "0.1px",
                                                            }}
                                                          >
                                                            (
                                                            {moment
                                                              .utc(
                                                                item?.zoomDate_EN
                                                              )
                                                              .local()
                                                              .format(
                                                                "l, h:mm:ssa"
                                                              )}
                                                            )
                                                          </span>
                                                        </div>
                                                        <ContentCenter>
                                                          <div class="pulse">
                                                            <img
                                                              src={
                                                                zoomLink?.src
                                                              }
                                                              width="22px"
                                                            />
                                                          </div>
                                                        </ContentCenter>
                                                      </div>
                                                    )}
                                                  </>
                                                )}
                                              </>
                                            )}
                                            {item?.venueType === "Onsite" && (
                                              <div
                                                className={`curriculum-module-lesson zoom-link ${
                                                  item?.viewed ? "active" : ""
                                                }`}
                                                key={index}
                                              >
                                                <div>
                                                  <h4>{item?.title_EN}</h4>
                                                  <span className="lesson-point"></span>{" "}
                                                  <span
                                                    style={{
                                                      fontSize: "10px",
                                                      fontWeight: "700",
                                                      letterSpacing: "0.1px",
                                                    }}
                                                  >
                                                    (
                                                    {moment
                                                      .utc(item?.zoomDate_EN)
                                                      .local()
                                                      .format("l, h:mm:ssa")}
                                                    )
                                                  </span>
                                                </div>
                                                <ContentCenter>
                                                  <div class="pulse">
                                                    <img
                                                      src={Onsite?.src}
                                                      width="22px"
                                                    />
                                                  </div>
                                                </ContentCenter>
                                              </div>
                                            )}
                                          </>
                                        )
                                      )}
                                    </>
                                  )}
                                  {item?.dashboardInsideFileViewModels.map(
                                    (item, index) => (
                                      <>
                                        {item?.fileTypeRecord === "File" && (
                                          <div
                                            className={`curriculum-module-lesson download ${
                                              item?.viewed ? "active" : ""
                                            }`}
                                            key={index}
                                          >
                                            <h4>
                                              <span
                                                onClick={() => {
                                                  viewCourseFile(
                                                    item?.url_EN,
                                                    courseDetailState?.courseTrainingRegistrationId,
                                                    item?.id,
                                                    "File"
                                                  );
                                                }}
                                              >
                                                {item?.title_EN}
                                              </span>
                                              {getLinkExt(item?.url_EN) && (
                                                <a
                                                  href={item?.url_EN}
                                                  target="_blank"
                                                >
                                                  Download
                                                </a>
                                              )}
                                            </h4>
                                            <span className="dropmenu-parent">
                                              <div>
                                                <span className="lesson-point"></span>{" "}
                                                {item?.duration_EN} min
                                              </div>
                                              {item
                                                ?.dashboardInsideResourceViewModels
                                                .length != 0 && (
                                                <div className="resourses-drop">
                                                  <span
                                                    onClick={(e) => {
                                                      e.target.parentElement.classList.toggle(
                                                        "active"
                                                      );
                                                    }}
                                                  >
                                                    Resources{" "}
                                                    <DownOutlined
                                                      style={{
                                                        fontSize: "10px",
                                                      }}
                                                    />
                                                  </span>
                                                  <div className="resourses-dropmenu">
                                                    {item?.dashboardInsideResourceViewModels?.map(
                                                      (item, index) => (
                                                        <>
                                                          {item?.resourceTypeRecord ===
                                                            "File" &&
                                                            getLinkExt(
                                                              item?.url_EN
                                                            ) && (
                                                              <a
                                                                href={
                                                                  item?.url_EN
                                                                }
                                                                target="_blank"
                                                              >
                                                                <DownloadOutlined />{" "}
                                                                {item?.title_EN}
                                                              </a>
                                                            )}
                                                          {item?.resourceTypeRecord ===
                                                            "ExternalLink" && (
                                                            <a
                                                              href={
                                                                item?.url_EN
                                                              }
                                                              target="_blank"
                                                            >
                                                              <LinkOutlined />{" "}
                                                              {item?.title_EN}
                                                            </a>
                                                          )}
                                                          {item?.resourceTypeRecord ===
                                                            "Scorm" && (
                                                            <a
                                                              href={
                                                                item?.url_EN
                                                              }
                                                              target="_blank"
                                                            >
                                                              <LinkOutlined />{" "}
                                                              {item?.title_EN}
                                                            </a>
                                                          )}
                                                        </>
                                                      )
                                                    )}
                                                  </div>
                                                </div>
                                              )}
                                            </span>
                                          </div>
                                        )}
                                        {item?.fileTypeRecord ===
                                          "Assessment" && (
                                          <div
                                            className={`curriculum-module-lesson download ${
                                              item?.viewed ? "active" : ""
                                            }`}
                                            key={index}
                                          >
                                            <h4>
                                              <span
                                                onClick={() => {
                                                  setCookies(
                                                    "courseTrainingFileId",
                                                    item?.id
                                                  );
                                                  router.push(
                                                    `/course-assessments/${item?.assessmentId_EN}`
                                                  );
                                                }}
                                              >
                                                {item?.title_EN}
                                              </span>
                                              {getLinkExt(item?.url_EN) && (
                                                <a
                                                  href={item?.url_EN}
                                                  target="_blank"
                                                >
                                                  Download
                                                </a>
                                              )}
                                            </h4>
                                            <span className="dropmenu-parent">
                                              <div>
                                                <span className="lesson-point"></span>{" "}
                                                {item?.duration_EN} min
                                              </div>
                                              {item
                                                ?.dashboardInsideResourceViewModels
                                                .length != 0 && (
                                                <div className="resourses-drop">
                                                  <span
                                                    onClick={(e) => {
                                                      e.target.parentElement.classList.toggle(
                                                        "active"
                                                      );
                                                    }}
                                                  >
                                                    Resources{" "}
                                                    <DownOutlined
                                                      style={{
                                                        fontSize: "10px",
                                                      }}
                                                    />
                                                  </span>
                                                  <div className="resourses-dropmenu">
                                                    {item?.dashboardInsideResourceViewModels?.map(
                                                      (item, index) => (
                                                        <>
                                                          {item?.resourceTypeRecord ===
                                                            "File" &&
                                                            getLinkExt(
                                                              item?.url_EN
                                                            ) && (
                                                              <a
                                                                href={
                                                                  item?.url_EN
                                                                }
                                                                target="_blank"
                                                              >
                                                                <DownloadOutlined />{" "}
                                                                {item?.title_EN}
                                                              </a>
                                                            )}
                                                          {item?.resourceTypeRecord ===
                                                            "ExternalLink" && (
                                                            <a
                                                              href={
                                                                item?.url_EN
                                                              }
                                                              target="_blank"
                                                            >
                                                              <LinkOutlined />{" "}
                                                              {item?.title_EN}
                                                            </a>
                                                          )}
                                                          {item?.resourceTypeRecord ===
                                                            "Scorm" && (
                                                            <a
                                                              href={
                                                                item?.url_EN
                                                              }
                                                              target="_blank"
                                                            >
                                                              <LinkOutlined />{" "}
                                                              {item?.title_EN}
                                                            </a>
                                                          )}
                                                        </>
                                                      )
                                                    )}
                                                  </div>
                                                </div>
                                              )}
                                            </span>
                                          </div>
                                        )}
                                        {item?.fileTypeRecord === "Survey" && (
                                          <div
                                            className={`curriculum-module-lesson download ${
                                              item?.viewed ? "active" : ""
                                            }`}
                                            key={index}
                                          >
                                            <h4>
                                              <span
                                                onClick={() => {
                                                  setCookies(
                                                    "courseTrainingFileId",
                                                    item?.id
                                                  );
                                                  router.push(
                                                    `/course-surveys/${item?.assessmentId_EN}`
                                                  );
                                                }}
                                              >
                                                {item?.title_EN}
                                              </span>
                                              {getLinkExt(item?.url_EN) && (
                                                <a
                                                  href={item?.url_EN}
                                                  target="_blank"
                                                >
                                                  Download
                                                </a>
                                              )}
                                            </h4>
                                            <span className="dropmenu-parent">
                                              <div>
                                                <span className="lesson-point"></span>{" "}
                                                {item?.duration_EN} min
                                              </div>
                                              {item
                                                ?.dashboardInsideResourceViewModels
                                                .length != 0 && (
                                                <div className="resourses-drop">
                                                  <span
                                                    onClick={(e) => {
                                                      e.target.parentElement.classList.toggle(
                                                        "active"
                                                      );
                                                    }}
                                                  >
                                                    Resources{" "}
                                                    <DownOutlined
                                                      style={{
                                                        fontSize: "10px",
                                                      }}
                                                    />
                                                  </span>
                                                  <div className="resourses-dropmenu">
                                                    {item?.dashboardInsideResourceViewModels?.map(
                                                      (item, index) => (
                                                        <>
                                                          {item?.resourceTypeRecord ===
                                                            "File" &&
                                                            getLinkExt(
                                                              item?.url_EN
                                                            ) && (
                                                              <a
                                                                href={
                                                                  item?.url_EN
                                                                }
                                                                target="_blank"
                                                              >
                                                                <DownloadOutlined />{" "}
                                                                {item?.title_EN}
                                                              </a>
                                                            )}
                                                          {item?.resourceTypeRecord ===
                                                            "ExternalLink" && (
                                                            <a
                                                              href={
                                                                item?.url_EN
                                                              }
                                                              target="_blank"
                                                            >
                                                              <LinkOutlined />{" "}
                                                              {item?.title_EN}
                                                            </a>
                                                          )}
                                                          {item?.resourceTypeRecord ===
                                                            "Scorm" && (
                                                            <a
                                                              href={
                                                                item?.url_EN
                                                              }
                                                              target="_blank"
                                                            >
                                                              <LinkOutlined />{" "}
                                                              {item?.title_EN}
                                                            </a>
                                                          )}
                                                        </>
                                                      )
                                                    )}
                                                  </div>
                                                </div>
                                              )}
                                            </span>
                                          </div>
                                        )}
                                        {item?.fileTypeRecord === "Scorm" && (
                                          <div
                                            className={`curriculum-module-lesson ${
                                              item?.viewed ? "active" : ""
                                            }`}
                                            key={index}
                                            onClick={(e) => {
                                              e.preventDefault();
                                              viewCourseFile(
                                                item?.url_EN,
                                                courseDetailState?.courseTrainingRegistrationId,
                                                item?.id,
                                                "File"
                                              );
                                              window.open(
                                                `${item?.url_EN}?userID=112127&HASH=JHGG`
                                              );
                                            }}
                                          >
                                            <h4>{item?.title_EN}</h4>
                                            <span>
                                              <span className="lesson-point"></span>{" "}
                                              {item?.duration_EN} min
                                            </span>
                                          </div>
                                        )}
                                      </>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </CourseInsideCurriculum>
                  </Col>
                </Row>

                <ReviewModal
                  onCancel={CloseReviewModal}
                  open={isReviewModalOpen}
                  width={480}
                >
                  <WriteReview>
                    <h3>Write your Review</h3>
                    <Rate
                      onChange={(val) => {
                        if (val > 0) {
                          setIsRated(true);
                        } else {
                          setIsRated(false);
                        }
                        setAddReviewParamsState({
                          ...addReviewParamsState,
                          rating: val,
                        });
                      }}
                      defaultValue={addReviewParamsState?.rating}
                      value={addReviewParamsState?.rating}
                    />
                    {isRated && (
                      <div className={isRatingEmpty && "rating-empty"}>
                        <StyledTextarea
                          value={addReviewParamsState?.review_EN}
                          onChange={(e) => {
                            setIsRatingEmpty(false);
                            setAddReviewParamsState({
                              ...addReviewParamsState,
                              review_EN: e.target.value,
                            });
                          }}
                          rows={5}
                          placeholder="Write your review here"
                        ></StyledTextarea>
                        <div style={{ textAlign: "right" }}>
                          <CustomButton
                            customStyle={{
                              border: "1px solid #105F43",
                              background: "#105F43",
                              padding: "0 25px",
                              height: 35,
                              color: "#fff",
                            }}
                            onClick={AddCourseTrainingReviewFunc}
                          >
                            <span> Add Review </span>
                          </CustomButton>
                        </div>
                      </div>
                    )}
                  </WriteReview>
                </ReviewModal>
                <ReviewModal
                  onCancel={CloseReviewEditModal}
                  open={isReviewEditModalOpen}
                  width={480}
                >
                  <WriteReview>
                    <h3>Edit your Review</h3>
                    <Rate
                      onChange={(val) => {
                        if (val > 0) {
                          setIsRated(true);
                        } else {
                          setIsRated(false);
                        }
                        setEditReviewParamsState({
                          ...editReviewParamsState,
                          rating: val,
                        });
                      }}
                      defaultValue={editReviewParamsState?.rating}
                    />
                    {isRated && (
                      <>
                        <StyledTextarea
                          value={editReviewParamsState?.review_EN}
                          onChange={(e) => {
                            setEditReviewParamsState({
                              ...editReviewParamsState,
                              review_EN: e.target.value,
                            });
                          }}
                          rows={5}
                          placeholder="Write Here"
                        ></StyledTextarea>
                        <div style={{ textAlign: "right" }}>
                          <CustomButton
                            customStyle={{
                              border: "1px solid #105F43",
                              padding: "0 25px",
                              height: 35,
                              color: "#000",
                              marginRight: "5px",
                            }}
                            onClick={DeleteCourseTrainingReviewFunc}
                          >
                            <span> Delete </span>
                          </CustomButton>
                          <CustomButton
                            customStyle={{
                              border: "1px solid #105F43",
                              background: "#105F43",
                              padding: "0 25px",
                              height: 35,
                              color: "#fff",
                            }}
                            onClick={EditCourseTrainingReviewFunc}
                          >
                            <span> Edit Review </span>
                          </CustomButton>
                        </div>
                      </>
                    )}
                  </WriteReview>
                </ReviewModal>
                <StyledModal
                  title={``}
                  open={isZoomClassModalOpen}
                  onOk={closeZoomClassModal}
                  onCancel={closeZoomClassModal}
                  width={480}
                >
                  <div className="time-out-modal">
                    <FieldTimeOutlined
                      style={{
                        fontSize: "55px",
                        color: "#a87e33",
                        marginBottom: "16px",
                      }}
                    />
                    <p>
                      Your zoom class will start at <br />{" "}
                      <span style={{ fontWeight: "700" }}>
                        {moment
                          .utc(StartZoomTime)
                          .local()
                          .format("l, h:mm:ssa")}
                      </span>
                    </p>
                    <CustomButton
                      onClick={() => {
                        closeZoomClassModal();
                      }}
                      customStyle={{
                        height: "35px",
                        backgroundColor: "#105f43",
                        color: "#fff",
                        borderColor: "#105f43",
                        paddingInline: "35px",
                        marginLeft: "10px",
                      }}
                    >
                      {" "}
                      OK{" "}
                    </CustomButton>
                  </div>
                </StyledModal>
              </Header>
            </body>
          </div>
        </>
      ) : (
        <>
          <img loading="lazy"className="pre-loader" src={Preloader.src} />
        </>
      )}
    </>
  );
};

export default dashboard;

const MainHeading = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  font-family: "TitilliumNormal", sans-serif;
`;
const CourseInsideDetail = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 15px 20px;
  .course-inside-video {
    height: 230px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px 8px 0 0;
    overflow: hidden;
  }
  .course-inside-desc {
    h1 {
      margin: 0;
      margin-top: 10px;
      font-size: 18px;
      // font-weight: 700;
      font-family: "TitilliumNormal", sans-serif;
    }
    p {
      font-size: 12px;
      color: #a3a3a3;
    }
  }
`;
const ContentCenter = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  .pulse.active {
    height: 22px;
    width: 22px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .pulse.active::before {
    content: "";
    position: absolute;
    border: 1px solid #4a8cffd6;
    width: calc(100% + 10px);
    height: calc(100% + 10px);
    border-radius: 50%;
    animation: pulse 1s linear infinite;
  }

  .pulse.active::after {
    content: "";
    position: absolute;
    border: 1px solid #4a8cffd6;
    width: calc(100% + 10px);
    height: calc(100% + 10px);
    border-radius: 50%;
    animation: pulse 1s linear infinite;
    animation-delay: 0.3s;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.5);
      opacity: 0;
    }
    50% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(1.3);
      opacity: 0;
    }
  }
`;
const CustomVideoPlayer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media screen and (max-width: 992px) {
    video {
      object-fit: contain;
    }
  }
`;
const CoursesTabs = styled(Tabs)`
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #105f43;
    font-weight: 500;
  }
  .ant-tabs-ink-bar {
    background: #105f43;
  }
  .ant-tabs {
    color: #a8a8a8 !important;
  }
  .ant-tabs-tab {
    color: #a8a8a8 !important;
  }
  .ant-tabs-nav::before {
    border-color: #a8a8a8 !important;
  }
`;
const CourseOverview = styled.div`
  padding: 5px 0;
  h3 {
    color: #000;
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 5px;
    font-family: "TitilliumNormal", sans-serif;
  }
  h3:not(:first-child) {
    margin-top: 22px;
  }
  p {
    color: #636363;
    font-size: 12px;
    padding-right: 20px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    padding-left: 27px;
    li {
      position: relative;
      width: 50%;
      color: #636363;
      font-size: 12px;
      list-style: none;
      padding-right: 30px;
      margin-bottom: 8px;
    }
    li::before {
      content: "";
      position: absolute;
      background-image: url(../../images/CheckSquare.png);
      top: 2px;
      left: -26px;
      width: 16px;
      height: 15px;
      background-size: cover;
    }
  }
`;
const CourseQa = styled.div`
  .ant-collapse-content-box p {
    font-size: 13px;
    line-height: 24px !important;
  }
  .ant-collapse-header {
    border-radius: 4px;
  }
`;
const StyledCollapse = styled(Collapse)`
  .ant-collapse-item {
    margin-bottom: 10px;
  }
  .ant-collapse-content-box {
    p {
      padding-left: 0px !important;
    }
    background-color: #fff !important;
    padding-inline: 16px;
    padding-bottom: 2px;
  }
  .ant-collapse-header {
    background-color: #f6f5f5 !important;
    font-family: "TitilliumSemiBold", sans-serif !important;
  }
`;
const CourseReview = styled.div`
  h3 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #000;
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 15px;
    font-family: "TitilliumNormal", sans-serif;
    span {
      font-size: 12px;
      cursor: pointer;
      user-select: none;
      color: #a87e33;
      text-decoration: underline;
      font-family: "TitilliumBold";
    }
  }
  h3:not(:first-child) {
    margin-top: 15px;
  }
  .course-rating {
    text-align: center;
    .number {
      font-size: 35px;
      font-weight: 800;
      line-height: 35px;
      font-family: "TitilliumBold", sans-serif;
    }
    .rating-img {
      //   width: 75px;
      margin: auto;
      text-align: center;
      img {
        width: 100%;
      }
    }
    .rating-txt {
      font-size: 12px;
      // font-weight: 700;
    }
  }
  .rating-progress {
    .rating-progress-bar {
      display: flex;
      gap: 20px;
      align-items: center;
      padding-block: 3px;
      .rating-seek {
        width: 80%;
        height: 4px;
        background: #e6e6e6;
        border-radius: 3px;
        overflow: hidden;
        span {
          display: block;
          background: #8e8e8e;
          height: 100%;
        }
      }
      .rating-star {
        width: 20%;
      }
    }
  }
`;
const ReviewComments = styled.div`
  .review-card {
    display: flex;
    padding: 15px 15px;
    background: #f5f5f5;
    border-radius: 5px;
    margin-bottom: 15px;

    .review-card-img {
      width: 60px;
      text-align: center;
      img {
        width: 40px;
        height: 40px;
        border-radius: 100%;
      }
    }
    .review-card-text {
      width: calc(100% - 60px);
      padding-left: 15px;
      h4 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        // font-weight: 700;
        margin-bottom: 0;
        font-family: "TitilliumNormal", sans-serif;
        span {
          font-size: 12px;
          color: #666;
          font-family: "TitilliumSemiBold";
        }
      }
      .review-date {
        font-size: 12px;
        color: #707070;
        margin-bottom: 8px;
        img {
          width: 100px;
          margin-right: 6px;
        }
      }
      p {
        font-size: 12px;
        font-weight: 500;
        color: #707070;
      }
      .review-helpful {
        margin-top: 20px;
        display: flex;
        gap: 10px;
        align-items: center;
        .helpful-title {
          font-size: 12px;
          font-weight: 600;
          color: #707070;
        }
        a {
          display: flex;
          gap: 5px;
          margin-right: 10px;
          font-size: 12px;
          align-items: center;
          color: #606060;
          font-family: "TitilliumSemiBold";
          border: 1px solid #afafaf;
          padding: 5px 11px;
          border-radius: 3px;
          line-height: 0;
          user-select: none;
          img {
            width: 14px;
          }
        }
      }
    }

    @media screen and (max-width: 800px) {
      .review-card-img {
        width: 40px;
      }
      .review-card-text {
        width: calc(100% - 40px);
      }
    }
  }
`;
const WriteReview = styled.div`
  margin-top: 20px;
  h3 {
    color: #000;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    margin-top: 15px;
    margin-bottom: 0;
    font-family: "TitilliumNormal", sans-serif;
  }
  .ant-rate {
    width: 100%;
    text-align: center;
    font-size: 30px;
    margin-bottom: 10px;
    color: #ffaa46;
  }

  textarea {
    box-shadow: none !important;
  }

  .rating-empty {
    textarea:hover,
    textarea {
      border-color: #ff0000 !important;
      animation: shake 150ms 2 linear;

      @keyframes shake {
        0% {
          transform: translate(3px, 0);
        }
        50% {
          transform: translate(-3px, 0);
        }
        100% {
          transform: translate(0, 0);
        }
      }
    }
  }
`;
const YourReview = styled.div`
  background: #f9f9f9;
  padding: 15px 18px;
  border-radius: 5px;
  margin-top: 20px;
  h3 {
    margin-bottom: 5px;
  }
  p {
    margin-bottom: 0;
  }
  .ant-rate {
    margin-bottom: 8px;
    font-size: 16px;
  }
`;
const ReviewModal = styled(Modal)`
  .ant-modal-footer {
    display: none;
  }
  .ant-modal-content {
    border-radius: 8px !important;
  }
`;
const StyledTextarea = styled(TextArea)`
  margin-bottom: 10px;
  padding: 10px 15px;
  background: #fdfdfd;
  border: 1px solid #bcbcbc;
  border-radius: 4px;
  box-shadow: none !imporant;
`;
const DiscussionBoard = styled.div`
  .discussion-author {
    margin-top: 25px;
    display: flex;
    gap: 15px;
    align-items: center;
    .author-img img {
      border-radius: 100%;
    }
    .author-name {
      h4 {
        margin: 0;
        font-size: 14px;
        // font-weight: 700;
        line-height: 18px;
        font-family: "TitilliumNormal", sans-serif;
      }
      span {
        display: block;
        font-size: 12px;
        color: #707070;
      }
    }
  }
  .discussion-desc {
    padding: 25px 0;
    h3 {
      // font-weight: 700;
      font-size: 16px;
      font-family: "TitilliumNormal", sans-serif;
    }
    p {
      font-size: 12px;
      color: #707070;
      margin-bottom: 22px;
    }
  }
  .discussion-comment {
    .discussion-comment-input {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 15px;
      .comment-input-img img {
        border-radius: 100%;
        width: 40px;
        height: 40px;
      }

      .discussion-input {
        position: relative;
        height: 35px;
        flex: 1;

        input {
          width: 100%;
          height: 100%;
          border-radius: 4px;
          border: 1px solid #b6b6b6;
          outline: 0;
          padding: 10px;
        }

        span {
          position: absolute;
          top: 50%;
          right: 6px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 25px;
          height: 25px;
          line-height: 0;
          border-radius: 100%;
          padding-left: 2px;
          background-color: #105f43;
          transform: translateY(-50%);
          cursor: pointer;
        }
      }
    }
    .discussion-comment-cards {
      .discussion-comment-card {
        display: flex;
        padding: 15px 10px;
        background: #f5f5f5;
        border-radius: 5px;
        margin-bottom: 15px;
        .discussion-card-img {
          width: 55px;
          text-align: center;
          img {
            width: 40px;
            height: 40px;
            border-radius: 100%;
          }
        }
        .discussion-card-text {
          width: calc(100% - 55px);
          padding-left: 10px;
          h4 {
            font-size: 14px;
            // font-weight: 700;
            margin-bottom: 3px;
            font-family: "TitilliumNormal", sans-serif;
          }
          p {
            font-size: 12px;
            font-weight: 500;
            color: #707070;
          }
        }
        .discussion-date {
          font-size: 12px;
          color: #707070;
          span {
            color: #a87e33;
            font-weight: 600;
          }
        }
      }
    }
  }
`;
const CertificateTab = styled.div`
  padding: 0 10px 10px 10px;

  p {
    font-size: 14px;
    font-family: "TitilliumSemiBold";
  }

  button:hover,
  button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    background: transparent;
    border-radius: 3px;
    border: 1px solid;
    border-color: #064b33;
    color: #064b33;
    padding: 4px 15px;
    font-family: "TitilliumSemiBold";
  }
  button[disabled]:hover,
  button[disabled] {
    border-color: #e0e0e0;
    color: #e0e0e0;
    cursor: not-allowed;
  }
  a:hover,
  a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    background: transparent;
    border-radius: 3px;
    border: 1px solid;
    border-color: #064b33;
    color: #064b33;
    padding: 4px 15px;
    font-family: "TitilliumSemiBold";
  }
  a[disabled]:hover,
  a[disabled] {
    border-color: #e0e0e0;
    color: #e0e0e0;
    cursor: not-allowed;
  }
`;
const CourseInsideCurriculum = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 15px 20px;
  .curriculum-title {
    color: #000;
    font-size: 18px;
    // font-weight: 700;
    margin-bottom: 2px;
    font-family: "TitilliumNormal", sans-serif;
  }
  .lectures-duration {
    font-size: 12px;
    color: #878686;
  }
  .curriculum-modules {
    .curriculum-module {
      padding: 20px 0 0 0;
      font-size: 12px;
      .curriculum-module-head {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: start;
        padding-bottom: 5px;
        .module-title {
          width: 90%;
          margin-bottom: 5px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          font-family: "TitilliumNormal", sans-serif;
          user-select: none;
        }
        .module-total {
          width: 100%;
          > span {
            display: inline-block;
            img {
              margin-right: 5px;
            }
          }
          > span:not(:first-child) {
            padding-left: 10px;
          }
        }
        a.droparrow {
          margin-top: 5px;
          background: #f0f0f0;
          display: inline-block;
          margin-left: 10px;
          padding: 1px 4px;
          font-size: 10px;
          color: #000000;
          * {
            pointer-events: none;
          }
        }
      }
      .curriculum-module-head.active .module-title {
        color: #105f43;
      }
      .curriculum-module-desc {
        color: #707070;
      }
      .curriculum-module-dropdown {
        padding: 12px 0;
        display: none;
        .curriculum-module-lesson {
          position: relative;
          margin-left: 22px;
          padding: 5px 10px;
          border-radius: 4px;
          margin-bottom: 5px;

          &.download {
            // display: flex;
            // justify-content: space-between;
            // align-items: center;

            h4 {
              display: flex;
              justify-content: space-between;
              align-items: center;

              span {
                width: 70%;
              }
            }

            a {
              color: #000;
            }

            .dropmenu-parent {
              display: flex;
              justify-content: space-between;

              .resourses-drop {
                position: relative;

                &.active {
                  .resourses-dropmenu {
                    display: block;
                  }
                }

                > span {
                  position: relative;
                  display: inline-block;
                  padding: 2px;
                  user-select: none;
                  cursor: pointer;

                  .anticon.anticon-down {
                    pointer-events: none;
                  }
                }
                .resourses-dropmenu {
                  position: absolute;
                  top: 100%;
                  right: 0;
                  min-width: 200px;
                  background: #fff;
                  border-radius: 2px;
                  display: none;
                  box-shadow: 1px 1px 4px #ccc;
                  z-index: 1;

                  a {
                    display: flex;
                    padding: 6px 10px;

                    span {
                      padding: 4px 5px 0 0;
                    }
                  }
                  a:not(:last-child) {
                    border-bottom: 1px solid #eee;
                  }
                }
              }
            }
          }

          &.zoom-link {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 10px;
            // background: #a87e331a;
            cursor: pointer;
            user-select: none;
            // background: rgb(45 140 255 / 20%);
            // outline: 1px solid rgb(45 140 255 / 30%);

            ::after {
              top: 50%;
              transform: translateY(-50%);
            }

            h4 {
              margin-bottom: 0;
            }

            &.disabled {
              opacity: 0.5;
              cursor: not-allowed;

              * {
                cursor: not-allowed;
              }
            }
          }

          h4 {
            font-size: 12px;
            // font-weight: 700;
            margin-bottom: 2px;
            cursor: pointer;
          }
          > span {
            font-size: 11px;
            color: #878686;
          }
          span.lesson-point {
            display: inline-block;
            width: 8px;
            height: 8px;
            background: #a87e33;
            border-radius: 100%;
            margin-right: 3px;
          }
        }
        .curriculum-module-lesson:not(:first-child)::before {
          top: -5px;
          height: calc(100% + 5px);
        }
        .curriculum-module-lesson::before {
          content: "";
          position: absolute;
          top: 0;
          left: -16px;
          width: 2px;
          height: 100%;
          background: #86868663;
        }
        .curriculum-module-lesson::after {
          content: "";
          position: absolute;
          top: 8px;
          left: -21px;
          width: 12px;
          height: 12px;
          border: 2px solid #fff;
          outline: 1px solid #868686ad;
          border-radius: 100%;
          background: #fff;
        }
      }
    }
  }
  .curriculum-module.active {
    .curriculum-module-dropdown {
      display: block;
      .curriculum-module-lesson.active {
        background: #a87e331a;
      }
      .curriculum-module-lesson.active::after {
        background: #105f43;
      }
    }
  }
`;
const StyledInput = styled(Input)`
  border-radius: 4px;
  border-color: #b6b6b6;
`;
const StyledRate = styled(Rate)`
  font-size: 13px;
  color: #ffaa46;
  .ant-rate-star:not(:last-child) {
    margin-right: 4px;
  }
  .ant-rate-star svg {
    stroke-width: 50;
    stroke: #ffaa46;
  }
  .ant-rate-star:not(.ant-rate-star-full) svg {
    stroke-width: 50;
    stroke: #ffaa46;
    fill: transparent;
  }
`;

const SeeMoreBtn = styled.a`
  font-size: 14px;
  font-weight: 600;
  color: #121212;
  display: inline-block;
  margin-bottom: 15px;
  display: block;
  padding: 4px 10px;
  border: 1px solid #b6b6b6;
  text-align: center;
  border-radius: 2px;
  font-family: "TitilliumSemiBold";
  &&:hover {
    color: #333;
  }
`;

const StyledModal = styled(Modal)`
  top: 100px !important;
  width: 100% !important;
  max-width: 400px !important;

  .time-out-modal {
    text-align: center;

    p {
      font-size: 17px;
    }
  }

  .ant-modal-header {
    // border-radius: 14px 14px 0 0 !important;
    // background: #0c5439 !important;
    display: none;
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
    border-radius: 4px !important;
  }

  @media screen and (max-width: 800px) {
    margin: auto;
    max-width: calc(100% - 20px) !important;
  }
`;
