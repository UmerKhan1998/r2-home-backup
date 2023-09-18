import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import Header from "../../../src/components/rtl/adminLayoutHeader";

import { R2Favicon } from "../../../images";
import Preloader from "../../../public/images/Preloader.gif";
import { useRouter } from "next/router";
import { getCookies } from "../../../src/helpers/cookie";
import Script from "next/script";
import endpoints from "../../../src/api";

import Inside from "../../../src/components/CourseInsideComp/Inside_ar";
import { useSelector } from "react-redux";

const dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectItem, setSelectItem] = useState("/ar/activities");

  const router = useRouter();
  const courseId = router.query;
  const courseTrainingRegistrationId = courseId?.id;

  const userDataState = useSelector((state) => state?.userDataReducer);

  const authToken = getCookies("token");
  const userStatus = getCookies("userStatus");
  const [isAuthorized, setAuthorized] = useState(false);
  useLayoutEffect(() => {
    if (authToken === undefined) {
      router.push("/ar/sign-in");
    } else if (userStatus === undefined || userStatus === "false") {
      router.push("/");
    } else if (authToken || userStatus === "true") {
      setAuthorized(true);
    }
  }, []);

  const [courseDetailState, setCourseDetailState] = useState();
  const [courseCurriculumState, setCourseCurriculumState] = useState();
  const [courseVideoState, setCourseVideoState] = useState("");
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

  const [courseDiscussionCommentsParams, setcourseDiscussionCommentsParams] =
    useState({
      pageSize: 10000,
      pageNo: 1,
      language: "Arabic",
      search: "",
    });
  const [courseDiscussionComments, setCourseDiscussionComments] = useState();
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

  const [courseReviews, setCourseReviews] = useState();
  const [userReviews, setUserReviews] = useState({
    id: "",
    lmsUserId: "",
  });
  const [reviewParams, setReviewParams] = useState({
    pageSize: 10000,
    pageNo: 1,
    language: "Arabic",
    search: "",
    rating: 0,
  });
  const [AddReviewIndex, setAddReviewIndex] = useState();
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

  useLayoutEffect(() => {
    getDashboardInside(courseId?.id);
  }, [courseId?.id]);
  useLayoutEffect(() => {
    GetDashboardInsideDiscussion();
  }, [courseDiscussionCommentsParams?.pageSize, courseId?.id]);
  useLayoutEffect(() => {
    if (userDataState?.id) {
      getDashboardInsideReview();
    }
  }, [reviewParams?.pageSize, reviewParams?.search, userDataState?.id, courseId?.id]);

  return (
    <>
      {isAuthorized ? (
        <>
          <Script type="text/javascript" src="../../../html2pdf/htmlpdf.js" />
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
                <Inside
                  Category={"Conference"}
                  courseId={courseId}
                  getDashboardInside={getDashboardInside}
                  courseDetailState={courseDetailState}
                  courseCurriculumState={courseCurriculumState}
                  courseVideoState={courseVideoState}
                  setCourseVideoState={setCourseVideoState}
                  courseDiscussionComments={courseDiscussionComments}
                  GetDashboardInsideDiscussion={GetDashboardInsideDiscussion}
                  setcourseDiscussionCommentsParams={
                    setcourseDiscussionCommentsParams
                  }
                  courseReviews={courseReviews}
                  userReviews={userReviews}
                  reviewParams={reviewParams}
                  setReviewParams={setReviewParams}
                  getDashboardInsideReview={getDashboardInsideReview}
                  AddReviewIndex={AddReviewIndex}
                  setAddReviewIndex={setAddReviewIndex}
                />
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
