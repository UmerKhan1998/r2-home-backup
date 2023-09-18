import React, { useLayoutEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";

import courseOnline from "../../../public/images/courseOnline.png";
import courseOnsite from "../../../public/images/courseOnsite.png";
import courseClock from "../../../public/images/courseClock.png";
import DisussionBoard from "../../../public/images/DisussionBoard.svg";
import CourseReviews from "../../../public/images/CourseReviews.svg";
import CourseQa from "../../../public/images/CourseQa.svg";
import WhishlistHeartBordered from "../../../public/images/WhishlistHeartBordered.svg";
import WhishlistHeartFill from "../../../public/images/WhishlistHeartFill.svg";

import CourseThumbMob from "../../../public/images/CardImg1.svg";
import ProgramThumbMob from "../../../public/images/CardImg2.svg";
import TranningThumbMob from "../../../public/images/CardImg3.png";
import WebinarThumbMob from "../../../public/images/CardImg4.svg";
import ConferenceThumbMob from "../../../public/images/CardImg5.svg";
import SymposiumThumbMob from "../../../public/images/CardImg6.svg";
import WorkshopsThumbMob from "../../../public/images/CardImg7.svg";
import CourseThumb from "../../../public/images/CourseThumb.png";
import TranningThumb from "../../../public/images/TranningThumb.png";
import ProgramThumb from "../../../public/images/ProgramThumb.png";
import WebinarThumb from "../../../public/images/WebinarThumb.png";
import ConferenceThumb from "../../../public/images/ConferenceThumb.png";
import SymposiumThumb from "../../../public/images/SymposiumThumb.png";
import WorkshopsThumb from "../../../public/images/WorkshopsThumb.png";

import CustomButton from "../Button";
import { CompleteCheck } from "../../../images";
import router from "next/router";
import { setCookies } from "../../helpers/cookie";
import SkeletonTextPlaceholder from "../../components/SkeletonTextPlaceholder";

const CoursesCard = ({
  index,
  courseTrainingRegistrationId,
  courseTrainingId,
  title,
  creditHours,
  categoryName,
  description,
  percent,
  instructor,
  duration,
  site,
  subCategory,
  inFavourite,
  AddCourseWhishlist,
  RemoveCourseWhishlist,
  AddWishlistDisabled,
  setAddWishlistDisabled,
  type,
  DetailPageSlug,
  courseAlreadyRegistered
}) => {
  
  const [isDesktop, setIsDesktop] = useState(false);
  useLayoutEffect(() => {
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

  const checkType = (type) => {
    if(type === "Course") {
      return 'course'
    } else if (type === "Conference") {
      return 'conference'
    }
    else if (type === "Workshop") {
      return 'workshop'
    }
    else if (type === "Webinar") {
      return 'webinar'
    }
    else if (type === "Symposiums") {
      return 'symposium'
    }
    else if (type === "Training") {
      return 'training'
    } else if (type === "Program") {
      return 'program'
    }
  }

  return (
    <>
      {isDesktop ? (<>
        {(type === "loading") ? (<>
          <CourseCard>
            <div className="course-img">
              <SkeletonTextPlaceholder width="150px" height="160px" />
            </div>
            <div className="course-desc">
              <div className="course-title">
                <a href="">{<SkeletonTextPlaceholder width="130px" height="28px" />}</a>
                <div className="course-action">
                  <span>{<SkeletonTextPlaceholder width="30px" height="28px" />}</span>
                  <span>{<SkeletonTextPlaceholder width="30px" height="28px" />}</span>
                  <span>{<SkeletonTextPlaceholder width="30px" height="28px" />}</span>
                </div>
              </div>
              <div className={`course-description ${!courseAlreadyRegistered && 'unregister'}`}>
                {<SkeletonTextPlaceholder width="100px" height="20px" />}
              </div>
              <div className={`course-progress ${!courseAlreadyRegistered && 'unregister'}`}>
                <div className="percentage">
                  <span>{<SkeletonTextPlaceholder width="35px" height="22px" />}</span>
                </div>
                <div className="progress-seek skeleton">
                  <SkeletonTextPlaceholder width="100%" height="2px" />
                </div>
              </div>
              <div className="course-duration">
                <div>
                  <span>{<SkeletonTextPlaceholder width="120px" height="20px" />}</span>
                </div>
                <div>
                  <span>{<SkeletonTextPlaceholder width="120px" height="20px" />}</span>
                </div>
                <StyledContinueLearningDiv className={`${!courseAlreadyRegistered && 'unregister'}`}>
                  <div>
                    <span>{<SkeletonTextPlaceholder width="120px" height="20px" />}</span>
                  </div>
                  <a href="">{<SkeletonTextPlaceholder width="130px" height="28px" />}</a>
                </StyledContinueLearningDiv>
              </div>
            </div>
          </CourseCard>
        </>) : (
          <CourseCard>
            <div className="course-img">
              {(type == "Course") && (<>
                <span className="credit-hours" style={{backgroundColor: "#C2F2E1"}}>({creditHours} CME)</span>
                <StyledImg src={CourseThumb?.src} width="150px" />
              </>)}
              {(type == "Training") && (<>
                <span className="credit-hours" style={{backgroundColor: "#E8FFF7"}}>({creditHours} CME)</span>
                <StyledImg src={TranningThumb?.src} width="150px" />
              </>)}
              {(type == "Program") && (<>
                <span className="credit-hours" style={{backgroundColor: "#FFF3DF"}}>({creditHours} CME)</span>
                <StyledImg src={ProgramThumb?.src} width="150px" />
              </>)}
              {(type == "Workshop") && (<>
                <span className="credit-hours" style={{backgroundColor: "#FFF3DF"}}>({creditHours} CME)</span>
                <StyledImg src={WorkshopsThumb?.src} width="150px" />
              </>)}
              {(type == "Symposiums") && (<>
                <span className="credit-hours" style={{backgroundColor: "#FFF3DF"}}>({creditHours} CME)</span>
                <StyledImg src={SymposiumThumb?.src} width="150px" />
              </>)}
              {(type == "Conference") && (<>
                <span className="credit-hours" style={{backgroundColor: "#E8FFF7"}}>({creditHours} CME)</span>
                <StyledImg src={ConferenceThumb?.src} width="150px" />
              </>)}
              {(type == "Webinar") && (<>
                <span className="credit-hours" style={{backgroundColor: "#E8FFF7"}}>({creditHours} CME)</span>
                <StyledImg src={WebinarThumb?.src} width="150px" />
              </>)}
              {(index === AddWishlistDisabled) ? (<>
                {inFavourite ? (<>
                  <span data-courseId="1" className="course-whishlist-icon disabled">
                    <img loading="lazy"src={WhishlistHeartFill?.src} width="100%" />
                  </span>
                </>) : (
                  <span data-courseId="1" className="course-whishlist-icon disabled">
                    <img loading="lazy"src={WhishlistHeartBordered?.src} width="100%" />
                  </span>
                )}
              </>) : (<>
                {inFavourite ? (<>
                  <span data-courseId="1" className="course-whishlist-icon" onClick={() => {setAddWishlistDisabled(index); RemoveCourseWhishlist(courseTrainingId)}}>
                    <img loading="lazy"src={WhishlistHeartFill?.src} width="100%" />
                  </span>
                </>) : (
                  <span data-courseId="1" className="course-whishlist-icon" onClick={() => {setAddWishlistDisabled(index); AddCourseWhishlist(courseTrainingId)}}>
                    <img loading="lazy"src={WhishlistHeartBordered?.src} width="100%" />
                  </span>
                )}
              </>)}
            </div>
            <div className="course-desc">
              <div className="course-title">
                {(type == "Course") && (
                  <Link href={`course-${DetailPageSlug}`}><a><h4>{title}</h4></a></Link>
                )}
                {(type == "Conference") && (
                  <Link href={`conference-${DetailPageSlug}`}><a><h4>{title}</h4></a></Link>
                )}
                {(type == "Workshop") && (
                  <Link href={`workshop-${DetailPageSlug}`}><a><h4>{title}</h4></a></Link>
                )}
                {(type == "Webinar") && (
                  <Link href={`webinar-${DetailPageSlug}`}><a><h4>{title}</h4></a></Link>
                )}
                {(type == "Symposiums") && (
                  <Link href={`symposium-${DetailPageSlug}`}><a><h4>{title}</h4></a></Link>
                )}
                {(type == "Training") && (
                  <Link href={`training-${DetailPageSlug}`}><a><h4>{title}</h4></a></Link>
                )}
                {(type == "Program") && (
                  <Link href={`program-${DetailPageSlug}`}><a><h4>{title}</h4></a></Link>
                )}
                {(courseAlreadyRegistered) && (
                  <div className="course-action">
                    <span
                      onClick={(e)=>{
                        e.preventDefault();
                        setCookies("activeDiscussionBoard", true)
                        router.push(`${
                          checkType(type)
                        }-${DetailPageSlug}`)
                      }}
                      title={"Discussion Board"}
                    >
                      <img loading="lazy"src={DisussionBoard?.src} width="20px" />
                    </span>
                    <span
                      onClick={(e)=>{
                        e.preventDefault();
                        setCookies("activeReview", true)
                        router.push(`${
                          checkType(type)
                        }-${DetailPageSlug}`)
                      }}
                      title={"Reviews"}
                    >
                      <img loading="lazy"src={CourseReviews?.src} width="20px" />
                    </span>
                    <span
                      onClick={(e)=>{
                        e.preventDefault();
                        setCookies("activeQa", true)
                        router.push(`${
                          checkType(type)
                        }-${DetailPageSlug}`)
                      }}
                      title={"Q/A"}
                    >
                      <img loading="lazy"src={CourseQa?.src} width="20px" />
                    </span>
                  </div>
                )}
              </div>
              <div className={`course-description ${!courseAlreadyRegistered && 'unregister'}`}>
                <span class="department">{categoryName}</span>
                {/* <p>{description}</p> */}
              </div>
              <div className={`course-progress ${!courseAlreadyRegistered && 'unregister'}`}>
                <div className="percentage">
                  <span>{Math.floor(percent)}%</span>
                  {(percent >= 100) && (
                    <span className="percentage-status">
                      <img loading="lazy"src={CompleteCheck} width="13px" />
                      Completed
                    </span>
                  )}
                </div>
                <div className="progress-seek">
                  <span style={{ width: `${percent}%` }}></span>
                </div>
              </div>
              <div className="course-duration">
                <div>
                  <span>Instructor:</span>
                  {instructor}
                </div>
                <div>
                  <span>
                    <img loading="lazy"src={courseClock?.src} width="16px" />
                    {duration}
                  </span>
                </div>
                <StyledContinueLearningDiv className={`${!courseAlreadyRegistered && 'unregister'}`}>
                  <div>
                    <span>
                      {(site === "Onsite") && (
                        <img loading="lazy"src={courseOnsite?.src} width="16px" />
                      )}
                      {(site === "Online") && (
                        <img loading="lazy"src={courseOnline?.src} width="16px" />
                      )}
                      {subCategory}
                    </span>
                  </div>
                  {(courseAlreadyRegistered) ? (<>
                    {(percent === 0) && (
                      <Link href={`${checkType(type)}-${DetailPageSlug}`}>
                        <a>
                          <CustomButton
                            customStyle={{
                              border: "1px solid #105F43",
                              color: "#105F43",
                              paddingInline: 10,
                              height: 28,
                              fontSize: "12px"
                            }}
                          >
                            <span className="continue_learning"> Start Learning </span>
                          </CustomButton>
                        </a>
                      </Link>
                    )}
                    {(percent < 100 && percent > 0) && (
                      <Link href={`${checkType(type)}-${DetailPageSlug}`}>
                        <a>
                          <CustomButton
                            customStyle={{
                              border: "1px solid #105F43",
                              color: "#105F43",
                              paddingInline: 10,
                              height: 28,
                              fontSize: "12px"
                            }}
                          >
                            <span className="continue_learning"> Continue Learning </span>
                          </CustomButton>
                        </a>
                      </Link>
                    )}
                    {(percent === 100) && (
                      <Link href={`${checkType(type)}-${DetailPageSlug}`}>
                        <a>
                          <CustomButton
                            customStyle={{
                              border: "1px solid #105F43",
                              color: "#105F43",
                              paddingInline: 10,
                              height: 28,
                              fontSize: "12px"
                            }}
                            onClick={()=>{ setCookies("activeCertificate", true) }}
                          >
                            <span className="continue_learning"> Generate Certificate </span>
                          </CustomButton>
                        </a>
                      </Link>
                    )}
                  </>) : (
                    <Link href={`${checkType(type)}-${DetailPageSlug}`}>
                      <a>
                        <CustomButton
                          customStyle={{
                            border: "1px solid #105F43",
                            color: "#105F43",
                            paddingInline: 10,
                            height: 28,
                            fontSize: "12px"
                          }}
                        >
                          <span className="continue_learning"> Enroll Now </span>
                        </CustomButton>
                      </a>
                    </Link>
                  )}
                </StyledContinueLearningDiv>
              </div>
            </div>
          </CourseCard>
        )}
      </>) : (<>
        {(type === "loading") ? (<>
          <CourseCard>
            <div className="course-img">
              <SkeletonTextPlaceholder width="100%" height="110px" />
            </div>
            <div className="course-desc">
              <div className="course-description">
                {<SkeletonTextPlaceholder width="100px" height="20px" />}
              </div>
              <div className="course-title">
                <h4>{<SkeletonTextPlaceholder width="100px" height="16px" />}</h4>
              </div>
              <div className={`course-progress ${!courseAlreadyRegistered && 'unregister'}`}>
                <div className="percentage">
                  <span>{<SkeletonTextPlaceholder width="28px" height="17px" />}</span>
                </div>
                <div className="progress-seek skeleton">
                  <SkeletonTextPlaceholder width="100%" height="2px" />
                </div>
              </div>
              <div className={`course-duration ${!courseAlreadyRegistered && 'unregister'}`}>
                <div>
                  <span><SkeletonTextPlaceholder width="90px" height="15px" /></span>
                </div>
                <div>
                  <span><SkeletonTextPlaceholder width="60px" height="16px" /></span>
                </div>
              </div>
            </div>
          </CourseCard>
        </>) : (
          <CourseCard>
            <div className="course-img">
              <span className="credit-hours">({creditHours} CME)</span>
              {(type == "Course") && (<>
                <span className="credit-hours" style={{backgroundColor: "#C2F2E1"}}>({creditHours} CME)</span>
                <StyledImg src={CourseThumbMob?.src} width="150px" />
              </>)}
              {(type == "Training") && (<>
                <span className="credit-hours" style={{backgroundColor: "#E8FFF7"}}>({creditHours} CME)</span>
                <StyledImg src={TranningThumbMob?.src} width="150px" />
              </>)}
              {(type == "Program") && (<>
                <span className="credit-hours" style={{backgroundColor: "#FFF3DF"}}>({creditHours} CME)</span>
                <StyledImg src={ProgramThumbMob?.src} width="150px" />
              </>)}
              {(type == "Workshop") && (<>
                <span className="credit-hours" style={{backgroundColor: "#FFF3DF"}}>({creditHours} CME)</span>
                <StyledImg src={WorkshopsThumbMob?.src} width="150px" />
              </>)}
              {(type == "Symposiums") && (<>
                <span className="credit-hours" style={{backgroundColor: "#FFF3DF"}}>({creditHours} CME)</span>
                <StyledImg src={SymposiumThumbMob?.src} width="150px" />
              </>)}
              {(type == "Conference") && (<>
                <span className="credit-hours" style={{backgroundColor: "#E8FFF7"}}>({creditHours} CME)</span>
                <StyledImg src={ConferenceThumbMob?.src} width="150px" />
              </>)}
              {(type == "Webinar") && (<>
                <span className="credit-hours" style={{backgroundColor: "#E8FFF7"}}>({creditHours} CME)</span>
                <StyledImg src={WebinarThumbMob?.src} width="150px" />
              </>)}
              {(index === AddWishlistDisabled) ? (<>
                {inFavourite ? (<>
                  <span data-courseId="1" className="course-whishlist-icon disabled">
                    <img loading="lazy"src={WhishlistHeartFill?.src} width="100%" />
                  </span>
                </>) : (
                  <span data-courseId="1" className="course-whishlist-icon disabled">
                    <img loading="lazy"src={WhishlistHeartBordered?.src} width="100%" />
                  </span>
                )}
              </>) : (<>
                {inFavourite ? (<>
                  <span data-courseId="1" className="course-whishlist-icon" onClick={() => {setAddWishlistDisabled(index); RemoveCourseWhishlist(courseTrainingId)}}>
                    <img loading="lazy"src={WhishlistHeartFill?.src} width="100%" />
                  </span>
                </>) : (
                  <span data-courseId="1" className="course-whishlist-icon" onClick={() => {setAddWishlistDisabled(index); AddCourseWhishlist(courseTrainingId)}}>
                    <img loading="lazy"src={WhishlistHeartBordered?.src} width="100%" />
                  </span>
                )}
              </>)}
            </div>
            <div className="course-desc" onClick={()=>{
              {router.push(`${checkType(type)}-${DetailPageSlug}`)}
            }}>
              <div className="course-description">
                <span class="department">{categoryName}</span>
              </div>
              <div className="course-title">
                <h4>{title}</h4>
              </div>
              <div className={`course-progress ${!courseAlreadyRegistered && 'unregister'}`}>
                <div className="percentage">
                  <span>{Math.floor(percent)}%</span>

                  {(percent >= 100) && (
                    <span className="percentage-status">
                      <img loading="lazy"src={CompleteCheck} width="13px" />
                      Completed
                    </span>
                  )}
                </div>
                <div className="progress-seek">
                  <span style={{ width: `${percent}%` }}></span>
                </div>
              </div>
              <div className={`course-duration ${!courseAlreadyRegistered && 'unregister'}`}>
                <div>
                  <span>
                    <img loading="lazy"src={courseClock?.src} width="16px" />
                    {duration}
                  </span>
                </div>
                <div>
                  <span>
                    {(site === "Onsite") && (
                      <img loading="lazy"src={courseOnsite?.src} width="16px" />
                    )}
                    {(site === "Online") && (
                      <img loading="lazy"src={courseOnline?.src} width="16px" />
                    )}
                    {subCategory}
                  </span>
                </div>
              </div>
            </div>
          </CourseCard>
        )}
      </>)}
    </>
  );
};

export default CoursesCard;

const CourseCard = styled.div`
  padding: 15px;
  background: #fff;
  border-radius: 8px;
  display: flex;
  margin-bottom: 12px;

  .course-img {
    position: relative;
  }
  .course-img .course-whishlist-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 22px;
    height: 22px;
    background: #fff;
    border-radius: 4px;
    padding: 4px 3px;
    line-height: 0;
    cursor: pointer;

    &.disabled {
      opacity: 0.3;
      cursor: normal;
    }
  }
  .course-img .course-whishlist-icon img {
    pointer-events: none;
  }

  .course-img .credit-hours {
    position: absolute;
    top: 10px;
    left: 10px;
    background: #fff;
    border-radius: 4px;
    padding: 1px 5px;
    font-size: 10px;
    font-family: 'TitilliumSemiBold';
  }

  .course-desc {
    width: 100%;
    padding-left: 15px;
  }
  .course-desc .course-title {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }
  .course-desc .course-title .course-action {
    display: flex;
    align-items: center;
  }
  .course-desc .course-title .course-action span {
    display: inline-block;
    padding: 0 5px;
    cursor: pointer;
  }
  .course-desc .course-title .course-action span:not(:last-child) {
    border-right: 1px solid #e8e8e8;
  }
  .course-desc .course-title h4 {
    font-size: 18px;
    // font-weight: 700;
    margin-bottom: 4px;
    font-family: 'TitilliumBold';
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .course-desc .course-description {

    &.unregister {
      margin-bottom: 5px;
    }
  }
  .course-desc .course-description .department {
    display: inline-block;
    padding: 2px 8px;
    font-size: 11px;
    border-radius: 4px;
    color: #a87e33;
    background: #fee4b7;
    margin-bottom: 8px;
  }
  .course-desc .course-description p {
    font-size: 12px;
    color: #9e9e9e;
    padding-right: 10px;
    margin-bottom: 5px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .course-desc .course-progress {
    margin-bottom: 10px;

    &.unregister {
      display: none;
    }

    > span {
      font-family: 'TitilliumSemiBold';
      font-size: 12px;
    }
  }
  .course-desc .course-progress .percentage {
    display: flex;
    justify-content: space-between;
  }
  .course-desc .course-progress .percentage > span {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 2px;
    display: inline-block;
  }
  .course-desc .course-progress .percentage .percentage-status {
    font-size: 10px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .course-desc .course-progress .progress-seek {
    height: 2px;
    background: #e6e6e6;

    &.skeleton > span {
      background-color: transparent !important;
    }
  }
  .course-desc .course-progress .progress-seek span {
    display: block;
    height: 2px;
    background: #a87e33;
  }
  .course-desc .course-duration {
    font-size: 12px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;

    &.unregister {
      margin-top: 32px;
    }
  }
  .course-desc .course-duration > div {
    display: flex;
    align-items: center;
    font-weight: 600;
    gap: 3px;
  }
  .course-desc .course-duration span {
    font-weight: 600;
    line-height: 1px;
    display: inline-flex;
    align-items: center;
    
    img {
      margin-right: 8px;
    }
  }

  @media screen and (max-width: 800px) {
    padding: 10px;
    flex-direction: column;
    height: calc(100% - 12px);

    .course-img img {
      width: 100%;
      height: unset;
    }

    .course-desc {
      padding-left: 0;
    }

    .course-desc .course-title {
      margin-top: 6px;
      cursor: pointer;
    }

    .course-desc .course-title h4 {
      -webkit-line-clamp: 1;
      font-size: 14px;
      margin-bottom: 6px;
      line-height: 16px;
    }

    .course-desc .course-description .department {
      margin-top: 8px;
      margin-bottom: 2px;
    }

    .course-desc .course-progress .percentage > span {
      font-size: 11px;
    }

    .course-desc .course-duration {
      font-size: 11px;
      padding-top: 5px;
      margin-bottom: 5px;
      justify-content: space-between;
    }
    // .course-desc .course-duration span {
    //   margin-right: 5px;
    // }
  }
`;

const StyledContinueLearningDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  &.unregister {
    margin-top: 30px;
  }

  .continue_learning {
    color: #105f43 !important;
    display: flex !important;
    justify-content: center !important;
    margin: 0px !important;

    a {
      color: inherit;
    }
  }
`;

const StyledImg = styled.img`
  // height: 220px !important;
  height: 100% !important;
  object-fit: cover !important;
  border-radius: 10px !important;
`;
