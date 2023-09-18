import React, { useState, useLayoutEffect } from "react";
import { Card, Col, Row, Rate, Badge, Divider } from "antd";
import styled from "styled-components";
import { GiAlarmClock } from "react-icons/gi";
import { FiMonitor } from "react-icons/fi";
import {
  Clock,
  filledStar,
  OnSite,
  partialStar,
  TV,
  unfilledStar,
} from "../../../../images";
import Image from "next/image";
import router from "next/router";
import NextLink from "next/link";
import {
  cme_text,
  conference,
  course,
  enrolled,
  free,
  online,
  onsite,
  program,
  read_more,
  sar,
  symposium,
  training,
  webinar,
} from "../../../helpers/LanguageConstant";

const FeaturedCard = ({
  id,
  Img,
  FeaturedType,
  EnrolledStudents,
  CourseName,
  Time,
  Rating,
  TotalRatings,
  MinPrice,
  MaxPrice,
  onSite,
  onLine,
  SubCategory,
  paidFree,
  cme,
  name,
  page,
}) => {
  const [isDesktop, setIsDesktop] = useState(false);

  const DesktopView = (
    <StyledDiv>
      {page === "home" && (
        <NextLink href={`/ar/course-detail/${id}`}>
          <a>
            <StyledCardsDiv>
              <>
                <Card
                  hoverable
                  cover={
                    <StyledImageTitleDiv>
                      {(name === "courses" || name === "trainings") && (
                        <StyledCmeDiv>
                          <p>
                            ({cme} {cme_text})
                          </p>
                        </StyledCmeDiv>
                      )}
                      {name === "programs" && (
                        <StyledCmeDiv1>
                          <p>
                            ({cme} {cme_text})
                          </p>
                        </StyledCmeDiv1>
                      )}
                      <StyledImageWidthFullDiv>
                        <img loading="lazy"alt={""}
                          src={Img}
                          height={500}
                          width={1500}
                          alt="example"
                        />
                      </StyledImageWidthFullDiv>
                    </StyledImageTitleDiv>
                  }
                >
                  <FeaturedTypeRow dir="rtl">
                    <FeaturedTypeDiv>
                      <p>{FeaturedType}</p>
                    </FeaturedTypeDiv>
                    <StyledEnrolledDiv>
                      {name === "courses" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "trainings" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "programs" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                    </StyledEnrolledDiv>
                  </FeaturedTypeRow>
                  <DisplayNameRow dir="rtl">
                    <h1>{CourseName}</h1>
                  </DisplayNameRow>
                  {name === "courses" && <NameP dir="rtl">({course})</NameP>}
                  {name === "trainings" && (
                    <NameP dir="rtl">({training})</NameP>
                  )}
                  {name === "programs" && <NameP dir="rtl">({program})</NameP>}
                  <StarRatingDiv dir="rtl">
                    {Rating === 5 && (
                      <>
                        {[1, 2, 3, 4, 5]?.map((item, index) => (
                          <img loading="lazy"alt={""}
                            key={index}
                            width={10}
                            height={12}
                            src={filledStar}
                          />
                        ))}
                      </>
                    )}
                    {Rating >= 4 && Rating < 4.5 ? (
                      <>
                        {[1, 2, 3, 4]?.map((item, index) => (
                          <img loading="lazy"alt={""}
                            key={index}
                            width={10}
                            height={12}
                            src={filledStar}
                            style={{ marginLeft: 2 }}
                          />
                        ))}
                        {[1]?.map((item, index) => (
                          <img loading="lazy"alt={""}
                            key={index}
                            width={10}
                            height={12}
                            src={unfilledStar}
                          />
                        ))}
                      </>
                    ) : (
                      Rating > 4.5 &&
                      Rating < 5 && (
                        <>
                          {[1, 2, 3, 4]?.map((item, index) => (
                            <img loading="lazy"alt={""}
                              key={index}
                              width={10}
                              height={12}
                              src={filledStar}
                              style={{ marginLeft: 2 }}
                            />
                          ))}
                          {[1]?.map((item, index) => (
                            <img loading="lazy"alt={""}
                              key={index}
                              width={10}
                              height={12}
                              src={partialStar}
                              style={{ marginLeft: 2 }}
                            />
                          ))}
                        </>
                      )
                    )}
                    {Rating >= 3 && Rating < 3.5 ? (
                      <>
                        {[1, 2, 3]?.map((item, index) => (
                          <img loading="lazy"alt={""}
                            key={index}
                            width={10}
                            height={12}
                            src={filledStar}
                            style={{ marginLeft: 2 }}
                          />
                        ))}
                        {[1, 2]?.map((item, index) => (
                          <img loading="lazy"alt={""}
                            key={index}
                            width={10}
                            height={12}
                            src={unfilledStar}
                          />
                        ))}
                      </>
                    ) : (
                      Rating > 3.5 &&
                      Rating < 4 && (
                        <>
                          {[1, 2, 3]?.map((item, index) => (
                            <img loading="lazy"alt={""}
                              key={index}
                              width={10}
                              height={12}
                              src={filledStar}
                              style={{ marginLeft: 2 }}
                            />
                          ))}
                          {[1]?.map((item, index) => (
                            <img loading="lazy"alt={""}
                              key={index}
                              width={10}
                              height={12}
                              src={partialStar}
                              style={{ marginLeft: 2 }}
                            />
                          ))}
                          {[1]?.map((item, index) => (
                            <img loading="lazy"alt={""}
                              key={index}
                              width={10}
                              height={12}
                              src={unfilledStar}
                            />
                          ))}
                        </>
                      )
                    )}
                    {Rating >= 2 && Rating < 2.5 ? (
                      <>
                        {[1, 2]?.map((item, index) => (
                          <img loading="lazy"alt={""}
                            key={index}
                            width={10}
                            height={12}
                            src={filledStar}
                            style={{ marginLeft: 2 }}
                          />
                        ))}
                        {[1, 2, 3]?.map((item, index) => (
                          <img loading="lazy"alt={""}
                            key={index}
                            width={10}
                            height={12}
                            src={unfilledStar}
                          />
                        ))}
                      </>
                    ) : (
                      Rating > 2.5 &&
                      Rating < 3 && (
                        <>
                          {[1, 2]?.map((item, index) => (
                            <img loading="lazy"alt={""}
                              key={index}
                              width={10}
                              height={12}
                              src={filledStar}
                              style={{ marginLeft: 2 }}
                            />
                          ))}
                          {[1]?.map((item, index) => (
                            <img loading="lazy"alt={""}
                              key={index}
                              width={10}
                              height={12}
                              src={partialStar}
                              style={{ marginLeft: 2 }}
                            />
                          ))}
                          {[1, 2]?.map((item, index) => (
                            <img loading="lazy"alt={""}
                              key={index}
                              width={10}
                              height={12}
                              src={unfilledStar}
                            />
                          ))}
                        </>
                      )
                    )}
                    {Rating >= 1 && Rating < 1.5 ? (
                      <>
                        {[1]?.map((item, index) => (
                          <img loading="lazy"alt={""}
                            key={index}
                            width={10}
                            height={12}
                            src={filledStar}
                            style={{ marginLeft: 2 }}
                          />
                        ))}
                        {[1, 2, 3, 4]?.map((item, index) => (
                          <img loading="lazy"alt={""}
                            key={index}
                            width={10}
                            height={12}
                            src={unfilledStar}
                          />
                        ))}
                      </>
                    ) : (
                      Rating > 1.5 &&
                      Rating < 2 && (
                        <>
                          {[1, 2, 3]?.map((item, index) => (
                            <img loading="lazy"alt={""}
                              key={index}
                              width={10}
                              height={12}
                              src={filledStar}
                              style={{ marginLeft: 2 }}
                            />
                          ))}
                          {[1]?.map((item, index) => (
                            <img loading="lazy"alt={""}
                              key={index}
                              width={10}
                              height={12}
                              src={partialStar}
                              style={{ marginLeft: 2 }}
                            />
                          ))}
                          {[1]?.map((item, index) => (
                            <img loading="lazy"alt={""}
                              key={index}
                              width={10}
                              height={12}
                              src={unfilledStar}
                            />
                          ))}
                        </>
                      )
                    )}
                    {Rating >= 0 && Rating < 0.5 ? (
                      <>
                        {[1, 2, 3, 4, 5]?.map((item, index) => (
                          <img loading="lazy"alt={""}
                            key={index}
                            width={10}
                            height={12}
                            src={unfilledStar}
                          />
                        ))}
                      </>
                    ) : (
                      Rating > 0.5 &&
                      Rating < 1 && (
                        <>
                          {[1]?.map((item, index) => (
                            <img loading="lazy"alt={""}
                              key={index}
                              width={10}
                              height={12}
                              src={filledStar}
                              style={{ marginLeft: 2 }}
                            />
                          ))}

                          {[1, 2, 3, 4]?.map((item, index) => (
                            <img loading="lazy"alt={""}
                              key={index}
                              width={10}
                              height={12}
                              src={unfilledStar}
                            />
                          ))}
                        </>
                      )
                    )}
                    {/* <Rate value={Rating} allowHalf disabled /> */}
                    <p className="total">{Rating}</p>
                    <p>({TotalRatings})</p>
                  </StarRatingDiv>

                  <CourseDurationRow>
                    <TimerDiv>
                      <img loading="lazy"alt={""} src={Clock} height={24} width={24} alt="example" />
                      {/* <img loading="lazy"src={Clock} /> */}
                      <p>{Time}</p>
                    </TimerDiv>

                    {SubCategory === "Online" && (
                      <TimerDivSite>
                        <img loading="lazy"alt={""}
                          src={OnSite}
                          height={28}
                          width={28}
                          alt="example"
                        />
                        <p>{online}</p>
                      </TimerDivSite>
                    )}
                    {SubCategory === "Onsite" && (
                      <TimerDiv>
                        <img loading="lazy"alt={""} src={TV} height={28} width={28} alt="example" />
                        <p>{onsite}</p>
                      </TimerDiv>
                    )}
                  </CourseDurationRow>
                  <Divider />
                  <PriceRow>
                    <PriceDiv>
                      {paidFree === "Paid" ? (
                        <>
                          <p className="sar">{sar}</p>&nbsp;
                          {name === "courses" ? (
                            <p>
                              {MinPrice === 0 ? (
                                <>
                                  {MaxPrice} - {MaxPrice}
                                </>
                              ) : (
                                <>
                                  {MinPrice} - {MaxPrice}
                                </>
                              )}
                            </p>
                          ) : (
                            <p>
                              {MinPrice === 0 ? (
                                <>
                                  {MaxPrice} - {MaxPrice}
                                </>
                              ) : (
                                <>
                                  {MinPrice} - {MaxPrice}
                                </>
                              )}
                            </p>
                          )}
                        </>
                      ) : (
                        <p>
                          <b>{free}</b>
                        </p>
                      )}
                    </PriceDiv>
                    <StyledEndDiv>
                      {name === "courses" && (
                        <p
                          onClick={() => router.push(`/ar/course-detail/${id}`)}
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "trainings" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/training-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "programs" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/program-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                    </StyledEndDiv>
                  </PriceRow>
                </Card>
              </>
            </StyledCardsDiv>
          </a>
        </NextLink>
      )}
      {page === "learning-page" && (
        <NextLink href={`/ar/course-detail/${id}`}>
          <a>
            <StyledCardsDiv>
              <>
                <Card
                  hoverable
                  cover={
                    <StyledImageTitleDiv>
                      {(name === "courses" || name === "trainings") && (
                        <StyledCmeDiv>
                          <p>
                            ({cme} {cme_text})
                          </p>
                        </StyledCmeDiv>
                      )}
                      {name === "programs" && (
                        <StyledCmeDivLearning>
                          <p>
                            ({cme} {cme_text})
                          </p>
                        </StyledCmeDivLearning>
                      )}
                      <StyledImageWidthFullDiv>
                        <img loading="lazy"alt={""}
                          src={Img}
                          height={500}
                          width={1500}
                          alt="example"
                        />
                      </StyledImageWidthFullDiv>
                    </StyledImageTitleDiv>
                  }
                >
                  <FeaturedTypeRow dir="rtl">
                    <FeaturedTypeDiv>
                      <p>{FeaturedType}</p>
                    </FeaturedTypeDiv>
                    <StyledEnrolledDiv>
                      {name === "courses" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "trainings" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "programs" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                    </StyledEnrolledDiv>
                  </FeaturedTypeRow>
                  <DisplayNameRow dir="rtl">
                    <h1>{CourseName}</h1>
                  </DisplayNameRow>
                  {name === "courses" && <NameP dir="rtl">({course})</NameP>}
                  {name === "trainings" && (
                    <NameP dir="rtl">({training})</NameP>
                  )}
                  {name === "programs" && <NameP dir="rtl">({program})</NameP>}
                  <StarRatingDiv dir="rtl">
                    <Rate value={Rating} allowHalf disabled />
                    <p className="total">{Rating}</p>
                    <p>({TotalRatings})</p>
                  </StarRatingDiv>
                  <CourseDurationRow>
                    <TimerDiv>
                      <img loading="lazy"alt={""} src={Clock} height={24} width={24} alt="example" />
                      {/* <img loading="lazy"src={Clock} /> */}
                      <p>{Time}</p>
                    </TimerDiv>

                    {SubCategory === "Online" && (
                      <TimerDivSite>
                        <img loading="lazy"alt={""}
                          src={OnSite}
                          height={28}
                          width={28}
                          alt="example"
                        />
                        <p>{online}</p>
                      </TimerDivSite>
                    )}
                    {SubCategory === "Onsite" && (
                      <TimerDiv>
                        <img loading="lazy"alt={""} src={TV} height={28} width={28} alt="example" />
                        <p>{onsite}</p>
                      </TimerDiv>
                    )}
                  </CourseDurationRow>
                  <Divider />
                  <PriceRow>
                    <PriceDiv>
                      {paidFree === "Paid" ? (
                        <>
                          <p className="sar">{sar}</p>&nbsp;
                          {name === "courses" ? (
                            <p>
                              {MinPrice === 0 ? (
                                <>
                                  {MaxPrice} - {MaxPrice}
                                </>
                              ) : (
                                <>
                                  {MinPrice} - {MaxPrice}
                                </>
                              )}
                            </p>
                          ) : (
                            <p>
                              {MinPrice === 0 ? (
                                <>
                                  {MaxPrice} - {MaxPrice}
                                </>
                              ) : (
                                <>
                                  {MinPrice} - {MaxPrice}
                                </>
                              )}
                            </p>
                          )}
                        </>
                      ) : (
                        <p>
                          <b>{free}</b>
                        </p>
                      )}
                    </PriceDiv>
                    <StyledEndDiv>
                      {name === "courses" && (
                        <p
                          onClick={() => router.push(`/ar/course-detail/${id}`)}
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "trainings" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/training-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "programs" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/program-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                    </StyledEndDiv>
                  </PriceRow>
                </Card>
              </>
            </StyledCardsDiv>
          </a>
        </NextLink>
      )}
      {page === "program" && (
        <NextLink href={`/ar/program-detail/${id}`}>
          <a>
            <StyledCardsDiv>
              <>
                <Card
                  hoverable
                  cover={
                    <StyledImageTitleDiv>
                      {(name === "courses" || name === "trainings") && (
                        <StyledCmeDiv>
                          <p>
                            ({cme} {cme_text})
                          </p>
                        </StyledCmeDiv>
                      )}
                      {name === "programs" && (
                        <StyledCmeDiv1>
                          <p>
                            ({cme} {cme_text})
                          </p>
                        </StyledCmeDiv1>
                      )}
                      <StyledImageWidthFullDiv>
                        <img loading="lazy"alt={""}
                          src={Img}
                          height={500}
                          width={1500}
                          alt="example"
                        />
                      </StyledImageWidthFullDiv>
                    </StyledImageTitleDiv>
                  }
                >
                  <FeaturedTypeRow dir="rtl">
                    <FeaturedTypeDiv>
                      <p>{FeaturedType}</p>
                    </FeaturedTypeDiv>
                    <StyledEnrolledDiv>
                      {name === "courses" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "trainings" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "programs" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                    </StyledEnrolledDiv>
                  </FeaturedTypeRow>
                  <DisplayNameRow dir="rtl">
                    <h1>{CourseName}</h1>
                  </DisplayNameRow>
                  {name === "courses" && <NameP dir="rtl">({course})</NameP>}
                  {name === "trainings" && (
                    <NameP dir="rtl">({training})</NameP>
                  )}
                  {name === "programs" && <NameP dir="rtl">({program})</NameP>}
                  <StarRatingDiv dir="rtl">
                    <Rate value={Rating} allowHalf disabled />
                    <p className="total">{Rating}</p>
                    <p>({TotalRatings})</p>
                  </StarRatingDiv>
                  <CourseDurationRow>
                    <TimerDiv>
                      <img loading="lazy"alt={""} src={Clock} height={24} width={24} alt="example" />
                      {/* <img loading="lazy"src={Clock} /> */}
                      <p>{Time}</p>
                    </TimerDiv>

                    {SubCategory === "Online" && (
                      <TimerDivSite>
                        <img loading="lazy"alt={""}
                          src={OnSite}
                          height={28}
                          width={28}
                          alt="example"
                        />
                        <p>{online}</p>
                      </TimerDivSite>
                    )}
                    {SubCategory === "Onsite" && (
                      <TimerDiv>
                        <img loading="lazy"alt={""} src={TV} height={28} width={28} alt="example" />
                        <p>{onsite}</p>
                      </TimerDiv>
                    )}
                  </CourseDurationRow>
                  <Divider />
                  <PriceRow>
                    <PriceDiv>
                      {paidFree === "Paid" ? (
                        <>
                          <p className="sar">{sar}</p>&nbsp;
                          {name === "courses" ? (
                            <p>
                              {MinPrice === 0 ? (
                                <>
                                  {MaxPrice} - {MaxPrice}
                                </>
                              ) : (
                                <>
                                  {MinPrice} - {MaxPrice}
                                </>
                              )}
                            </p>
                          ) : (
                            <p>
                              {MinPrice === 0 ? (
                                <>
                                  {MaxPrice} - {MaxPrice}
                                </>
                              ) : (
                                <>
                                  {MinPrice} - {MaxPrice}
                                </>
                              )}
                            </p>
                          )}
                        </>
                      ) : (
                        <p>
                          <b>{free}</b>
                        </p>
                      )}
                    </PriceDiv>
                    <StyledEndDiv>
                      {name === "courses" && (
                        <p
                          onClick={() => router.push(`/ar/course-detail/${id}`)}
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "trainings" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/training-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "programs" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/program-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                    </StyledEndDiv>
                  </PriceRow>
                </Card>
              </>
            </StyledCardsDiv>
          </a>
        </NextLink>
      )}
      {page === "training" && (
        <NextLink href={`/ar/training-detail/${id}`}>
          <a>
            <StyledCardsDiv
            // onClick={() => router.push(`/ar/training-detail/${id}`)}
            >
              <>
                <Card
                  hoverable
                  cover={
                    <StyledImageTitleDiv>
                      {(name === "courses" || name === "trainings") && (
                        <StyledCmeDiv>
                          <p>
                            ({cme} {cme_text})
                          </p>
                        </StyledCmeDiv>
                      )}
                      {name === "programs" && (
                        <StyledCmeDiv1>
                          <p>
                            ({cme} {cme_text})
                          </p>
                        </StyledCmeDiv1>
                      )}
                      <StyledImageWidthFullDiv>
                        <img loading="lazy"alt={""}
                          src={Img}
                          height={500}
                          width={1500}
                          alt="example"
                        />
                      </StyledImageWidthFullDiv>
                    </StyledImageTitleDiv>
                  }
                >
                  <FeaturedTypeRow dir="rtl">
                    <FeaturedTypeDiv>
                      <p>{FeaturedType}</p>
                    </FeaturedTypeDiv>
                    <StyledEnrolledDiv>
                      {name === "courses" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "trainings" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "programs" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                    </StyledEnrolledDiv>
                  </FeaturedTypeRow>
                  <DisplayNameRow dir="rtl">
                    <h1>{CourseName}</h1>
                  </DisplayNameRow>
                  {name === "courses" && <NameP dir="rtl">({course})</NameP>}
                  {name === "trainings" && (
                    <NameP dir="rtl">({training})</NameP>
                  )}
                  {name === "programs" && <NameP dir="rtl">({program})</NameP>}
                  <StarRatingDiv dir="rtl">
                    <Rate value={Rating} allowHalf disabled />
                    <p className="total">{Rating}</p>
                    <p>({TotalRatings})</p>
                  </StarRatingDiv>
                  <CourseDurationRow>
                    <TimerDiv>
                      <img loading="lazy"alt={""} src={Clock} height={24} width={24} alt="example" />
                      {/* <img loading="lazy"src={Clock} /> */}
                      <p>{Time}</p>
                    </TimerDiv>

                    {SubCategory === "Online" && (
                      <TimerDivSite>
                        <img loading="lazy"alt={""}
                          src={OnSite}
                          height={28}
                          width={28}
                          alt="example"
                        />
                        <p>{online}</p>
                      </TimerDivSite>
                    )}
                    {SubCategory === "Onsite" && (
                      <TimerDiv>
                        <img loading="lazy"alt={""} src={TV} height={28} width={28} alt="example" />
                        <p>{onsite}</p>
                      </TimerDiv>
                    )}
                  </CourseDurationRow>
                  <Divider />
                  <PriceRow>
                    <PriceDiv>
                      {paidFree === "Paid" ? (
                        <>
                          <p className="sar">{sar}</p>&nbsp;
                          {name === "courses" ? (
                            <p>
                              {MinPrice === 0 ? (
                                <>
                                  {MaxPrice} - {MaxPrice}
                                </>
                              ) : (
                                <>
                                  {MinPrice} - {MaxPrice}
                                </>
                              )}
                            </p>
                          ) : (
                            <p>
                              {MinPrice === 0 ? (
                                <>
                                  {MaxPrice} - {MaxPrice}
                                </>
                              ) : (
                                <>
                                  {MinPrice} - {MaxPrice}
                                </>
                              )}
                            </p>
                          )}
                        </>
                      ) : (
                        <p>
                          <b>{free}</b>
                        </p>
                      )}
                    </PriceDiv>
                    <StyledEndDiv>
                      {name === "courses" && (
                        <p
                          onClick={() => router.push(`/ar/course-detail/${id}`)}
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "trainings" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/training-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "programs" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/program-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                    </StyledEndDiv>
                  </PriceRow>
                </Card>
              </>
            </StyledCardsDiv>
          </a>
        </NextLink>
      )}
      {page === "course-page" && (
        <NextLink href={`/ar/course-detail/${id}`}>
          <a>
            <StyledCardsDiv1>
              <>
                <Card
                  // onClick={() => router.push(`/ar/course-detail/${id}`)}
                  hoverable
                  cover={
                    <StyledImageTitleDiv>
                      {(name === "courses" || name === "trainings") && (
                        <StyledCmeDiv>
                          <p>
                            ({cme} {cme_text})
                          </p>
                        </StyledCmeDiv>
                      )}
                      {name === "programs" && (
                        <StyledCmeDiv1>
                          <p>
                            ({cme} {cme_text})
                          </p>
                        </StyledCmeDiv1>
                      )}
                      <StyledImageWidthFullDiv>
                        <img loading="lazy"alt={""}
                          src={Img}
                          height={500}
                          width={1500}
                          alt="example"
                        />
                      </StyledImageWidthFullDiv>
                    </StyledImageTitleDiv>
                  }
                >
                  <FeaturedTypeRow>
                    <FeaturedTypeDiv>
                      <p>{FeaturedType}</p>
                    </FeaturedTypeDiv>
                    <StyledEnrolledDiv>
                      {name === "courses" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "trainings" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "programs" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                    </StyledEnrolledDiv>
                  </FeaturedTypeRow>
                  <DisplayNameRow dir="rtl">
                    <h1>{CourseName}</h1>
                  </DisplayNameRow>
                  {name === "courses" && <NameP dir="rtl">({course})</NameP>}
                  {name === "trainings" && (
                    <NameP dir="rtl">({training})</NameP>
                  )}
                  {name === "programs" && <NameP dir="rtl">({program})</NameP>}
                  <StarRatingDiv dir="rtl">
                    <Rate value={Rating} allowHalf disabled />
                    <p className="total">{Rating}</p>
                    <p>({TotalRatings})</p>
                  </StarRatingDiv>
                  <CourseDurationRow>
                    <TimerDiv>
                      <img loading="lazy"src={Clock} />
                      <p>{Time}</p>
                    </TimerDiv>

                    {SubCategory === "Online" && (
                      <TimerDivSite>
                        <img loading="lazy"alt={""} src={TV} height={28} width={28} alt="example" />
                        <p>{online}</p>
                      </TimerDivSite>
                    )}
                    {SubCategory === "Onsite" && (
                      <TimerDiv>
                        <img loading="lazy"alt={""}
                          src={OnSite}
                          height={28}
                          width={28}
                          alt="example"
                        />
                        <p>{onsite}</p>
                      </TimerDiv>
                    )}
                  </CourseDurationRow>
                  <Divider />
                  <PriceRow>
                    <PriceDiv>
                      {paidFree === "Paid" ? (
                        <>
                          <p className="sar">{sar}</p>&nbsp;
                          {name === "courses" ? (
                            <p>
                              {MinPrice === 0 ? (
                                <>
                                  {MaxPrice} - {MaxPrice}
                                </>
                              ) : (
                                <>
                                  {MinPrice} - {MaxPrice}
                                </>
                              )}
                            </p>
                          ) : (
                            <p>
                              {MinPrice === 0 ? (
                                <>
                                  {MaxPrice} - {MaxPrice}
                                </>
                              ) : (
                                <>
                                  {MinPrice} - {MaxPrice}
                                </>
                              )}
                            </p>
                          )}
                        </>
                      ) : (
                        <p>
                          <b>{free}</b>
                        </p>
                      )}
                    </PriceDiv>
                    <StyledEndDiv>
                      {name === "courses" && (
                        <p
                          onClick={() => router.push(`/ar/course-detail/${id}`)}
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "trainings" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/training-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "programs" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/program-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                    </StyledEndDiv>
                  </PriceRow>
                </Card>
              </>
            </StyledCardsDiv1>
          </a>
        </NextLink>
      )}
      {page === "course-landing-page" && (
        <NextLink href={`/ar/course-detail/${id}`}>
          <a>
            <StyledCardsDiv1>
              <>
                <Card
                  onClick={() => router.push(`/ar/course-detail/${id}`)}
                  hoverable
                  cover={
                    <StyledImageTitleDiv>
                      {(name === "courses" || name === "trainings") && (
                        <StyledCmeDivLanding>
                          <p>
                            ({cme} {cme_text})
                          </p>
                        </StyledCmeDivLanding>
                      )}
                      {name === "programs" && (
                        <StyledCmeDiv1>
                          <p>
                            ({cme} {cme_text})
                          </p>
                        </StyledCmeDiv1>
                      )}
                      <StyledImageWidthFullDiv>
                        <img loading="lazy"alt={""}
                          src={Img}
                          height={500}
                          width={1500}
                          alt="example"
                        />
                      </StyledImageWidthFullDiv>
                    </StyledImageTitleDiv>
                  }
                >
                  <FeaturedTypeRow>
                    <FeaturedTypeDiv>
                      <p>{FeaturedType}</p>
                    </FeaturedTypeDiv>
                    <StyledEnrolledDiv>
                      {name === "courses" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "trainings" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "programs" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                    </StyledEnrolledDiv>
                  </FeaturedTypeRow>
                  <DisplayNameRow dir="rtl">
                    <h1>{CourseName}</h1>
                  </DisplayNameRow>
                  {name === "courses" && <NameP dir="rtl">({course})</NameP>}
                  {name === "trainings" && (
                    <NameP dir="rtl">({training})</NameP>
                  )}
                  {name === "programs" && <NameP dir="rtl">({program})</NameP>}
                  <StarRatingDiv dir="rtl">
                    <Rate value={Rating} allowHalf disabled />
                    <p className="total">{Rating}</p>
                    <p>({TotalRatings})</p>
                  </StarRatingDiv>
                  <CourseDurationRow>
                    <TimerDiv>
                      <img loading="lazy"src={Clock} />
                      <p>{Time}</p>
                    </TimerDiv>
                    {SubCategory === "Online" && (
                      <TimerDivSite>
                        <img loading="lazy"alt={""} src={TV} height={28} width={28} alt="example" />
                        <p>{online}</p>
                      </TimerDivSite>
                    )}
                    {SubCategory === "Onsite" && (
                      <TimerDiv>
                        <img loading="lazy"alt={""}
                          src={OnSite}
                          height={28}
                          width={28}
                          alt="example"
                        />
                        <p>{onsite}</p>
                      </TimerDiv>
                    )}
                  </CourseDurationRow>
                  <Divider />
                  <PriceRow>
                    <PriceDiv>
                      {paidFree === "Paid" ? (
                        <>
                          <p className="sar">{sar}</p>&nbsp;
                          {name === "courses" ? (
                            <p>
                              {MinPrice === 0 ? (
                                <>
                                  {MaxPrice} - {MaxPrice}
                                </>
                              ) : (
                                <>
                                  {MinPrice} - {MaxPrice}
                                </>
                              )}
                            </p>
                          ) : (
                            <p>
                              {MinPrice === 0 ? (
                                <>
                                  {MaxPrice} - {MaxPrice}
                                </>
                              ) : (
                                <>
                                  {MinPrice} - {MaxPrice}
                                </>
                              )}
                            </p>
                          )}
                        </>
                      ) : (
                        <p>
                          <b>{free}</b>
                        </p>
                      )}
                    </PriceDiv>
                    <StyledEndDiv>
                      {name === "courses" && (
                        <p
                          onClick={() => router.push(`/ar/course-detail/${id}`)}
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "trainings" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/training-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "programs" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/program-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                    </StyledEndDiv>
                  </PriceRow>
                </Card>
              </>
            </StyledCardsDiv1>
          </a>
        </NextLink>
      )}
      {page === "webinar-landing-page" && (
        <NextLink href={`/ar/webinar-detail/${id}`}>
          <a>
            <StyledCardsDiv1>
              <>
                <Card
                  // onClick={() => router.push(`/ar/webinar-detail/${id}`)}
                  hoverable
                  cover={
                    <StyledImageTitleDiv>
                      {(name === "courses" ||
                        name === "trainings" ||
                        name === "webinars") && (
                        <StyledCmeDivLanding>
                          <p>
                            ({cme} {cme_text})
                          </p>
                        </StyledCmeDivLanding>
                      )}
                      {name === "programs" && (
                        <StyledCmeDiv1>
                          <p>
                            ({cme} {cme_text})
                          </p>
                        </StyledCmeDiv1>
                      )}
                      <StyledImageWidthFullDiv>
                        <img loading="lazy"alt={""}
                          src={Img}
                          height={500}
                          width={1500}
                          alt="example"
                        />
                      </StyledImageWidthFullDiv>
                    </StyledImageTitleDiv>
                  }
                >
                  <FeaturedTypeRow>
                    <FeaturedTypeDiv>
                      <p>{FeaturedType}</p>
                    </FeaturedTypeDiv>
                    <StyledEnrolledDiv>
                      {name === "courses" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "trainings" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "programs" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "webinars" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                    </StyledEnrolledDiv>
                  </FeaturedTypeRow>
                  <DisplayNameRow dir="rtl">
                    <h1>{CourseName}</h1>
                  </DisplayNameRow>
                  {name === "courses" && <NameP dir="rtl">({course})</NameP>}
                  {name === "trainings" && (
                    <NameP dir="rtl">({training})</NameP>
                  )}
                  {name === "programs" && <NameP dir="rtl">({program})</NameP>}
                  {name === "webinars" && <NameP dir="rtl">({webinar})</NameP>}
                  <StarRatingDiv dir="rtl">
                    <Rate value={Rating} allowHalf disabled />
                    <p className="total">{Rating}</p>
                    <p>({TotalRatings})</p>
                  </StarRatingDiv>
                  <CourseDurationRow>
                    <TimerDiv>
                      <img loading="lazy"src={Clock} />
                      <p>{Time}</p>
                    </TimerDiv>

                    {SubCategory === "Online" && (
                      <TimerDivSite>
                        <img loading="lazy"alt={""} src={TV} height={28} width={28} alt="example" />
                        <p>{online}</p>
                      </TimerDivSite>
                    )}
                    {SubCategory === "Onsite" && (
                      <TimerDiv>
                        <img loading="lazy"alt={""}
                          src={OnSite}
                          height={28}
                          width={28}
                          alt="example"
                        />
                        <p>{onsite}</p>
                      </TimerDiv>
                    )}
                  </CourseDurationRow>
                  <Divider />
                  <PriceRow>
                    <PriceDiv>
                      {paidFree === "Paid" ? (
                        <>
                          <p className="sar">{sar}</p>&nbsp;
                          {name === "courses" ? (
                            <p>
                              {MinPrice === 0 ? (
                                <>
                                  {MaxPrice} - {MaxPrice}
                                </>
                              ) : (
                                <>
                                  {MinPrice} - {MaxPrice}
                                </>
                              )}
                            </p>
                          ) : (
                            <p>
                              {MinPrice === 0 ? (
                                <>
                                  {MaxPrice} - {MaxPrice}
                                </>
                              ) : (
                                <>
                                  {MinPrice} - {MaxPrice}
                                </>
                              )}
                            </p>
                          )}
                        </>
                      ) : (
                        <p>
                          <b>{free}</b>
                        </p>
                      )}
                    </PriceDiv>
                    <StyledEndDiv>
                      {name === "courses" && (
                        <p
                          onClick={() => router.push(`/ar/course-detail/${id}`)}
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "trainings" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/training-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "programs" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/program-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "webinars" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/webinar-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                    </StyledEndDiv>
                  </PriceRow>
                </Card>
              </>
            </StyledCardsDiv1>
          </a>
        </NextLink>
      )}
      {page === "symposium-landing-page" && (
        <NextLink href={`/ar/symposium-detail/${id}`}>
          <a>
            <StyledCardsDiv1>
              <>
                <Card
                  // onClick={() => router.push(`/ar/symposium-detail/${id}`)}
                  hoverable
                  cover={
                    <StyledImageTitleDiv>
                      {(name === "courses" ||
                        name === "trainings" ||
                        name === "webinars") && (
                        <StyledCmeDivLanding>
                          <p>
                            ({cme} {cme_text})
                          </p>
                        </StyledCmeDivLanding>
                      )}
                      {(name === "programs" || name === "symposiums") && (
                        <StyledCmeDiv1>
                          <p>
                            ({cme} {cme_text})
                          </p>
                        </StyledCmeDiv1>
                      )}
                      <StyledImageWidthFullDiv>
                        <img loading="lazy"alt={""}
                          src={Img}
                          height={500}
                          width={1500}
                          alt="example"
                        />
                      </StyledImageWidthFullDiv>
                    </StyledImageTitleDiv>
                  }
                >
                  <FeaturedTypeRow>
                    <FeaturedTypeDiv>
                      <p>{FeaturedType}</p>
                    </FeaturedTypeDiv>
                    <StyledEnrolledDiv>
                      {name === "courses" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "trainings" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "programs" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "webinars" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "symposiums" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                    </StyledEnrolledDiv>
                  </FeaturedTypeRow>
                  <DisplayNameRow dir="rtl">
                    <h1>{CourseName}</h1>
                  </DisplayNameRow>
                  {name === "courses" && <NameP dir="rtl">({course})</NameP>}
                  {name === "trainings" && (
                    <NameP dir="rtl">({training})</NameP>
                  )}
                  {name === "programs" && <NameP dir="rtl">({program})</NameP>}
                  {name === "webinars" && <NameP dir="rtl">({webinar})</NameP>}
                  {name === "symposiums" && (
                    <NameP dir="rtl">({symposium})</NameP>
                  )}
                  <StarRatingDiv dir="rtl">
                    <Rate value={Rating} allowHalf disabled />
                    <p className="total">{Rating}</p>
                    <p>({TotalRatings})</p>
                  </StarRatingDiv>
                  <CourseDurationRow>
                    <TimerDiv>
                      <img loading="lazy"src={Clock} />
                      <p>{Time}</p>
                    </TimerDiv>

                    {SubCategory === "Online" && (
                      <TimerDivSite>
                        <img loading="lazy"alt={""} src={TV} height={28} width={28} alt="example" />
                        <p>{online}</p>
                      </TimerDivSite>
                    )}
                    {SubCategory === "Onsite" && (
                      <TimerDiv>
                        <img loading="lazy"alt={""}
                          src={OnSite}
                          height={28}
                          width={28}
                          alt="example"
                        />
                        <p>{onsite}</p>
                      </TimerDiv>
                    )}
                  </CourseDurationRow>
                  <Divider />
                  <PriceRow>
                    <PriceDiv>
                      {paidFree === "Paid" ? (
                        <>
                          <p className="sar">{sar}</p>&nbsp;
                          {name === "courses" ? (
                            <p>
                              {MinPrice === 0 ? (
                                <>
                                  {MaxPrice} - {MaxPrice}
                                </>
                              ) : (
                                <>
                                  {MinPrice} - {MaxPrice}
                                </>
                              )}
                            </p>
                          ) : (
                            <p>
                              {MinPrice === 0 ? (
                                <>
                                  {MaxPrice} - {MaxPrice}
                                </>
                              ) : (
                                <>
                                  {MinPrice} - {MaxPrice}
                                </>
                              )}
                            </p>
                          )}
                        </>
                      ) : (
                        <p>
                          <b>{free}</b>
                        </p>
                      )}
                    </PriceDiv>
                    <StyledEndDiv>
                      {name === "courses" && (
                        <p
                          onClick={() => router.push(`/ar/course-detail/${id}`)}
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "trainings" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/training-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "programs" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/program-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "webinars" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/webinar-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "symposiums" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/symposium-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                    </StyledEndDiv>
                  </PriceRow>
                </Card>
              </>
            </StyledCardsDiv1>
          </a>
        </NextLink>
      )}
      {page === "conference-landing-page" && (
        <NextLink href={`/ar/conference-detail/${id}`}>
          <a>
            <StyledCardsDiv1>
              <>
                <Card
                  // onClick={() => router.push(`/ar/conference-detail/${id}`)}
                  hoverable
                  cover={
                    <StyledImageTitleDiv>
                      {(name === "courses" ||
                        name === "trainings" ||
                        name === "conferences" ||
                        name === "webinars") && (
                        <StyledCmeDivLanding>
                          <p>
                            ({cme} {cme_text})
                          </p>
                        </StyledCmeDivLanding>
                      )}
                      {name === "programs" && (
                        <StyledCmeDiv1>
                          <p>
                            ({cme} {cme_text})
                          </p>
                        </StyledCmeDiv1>
                      )}
                      <StyledImageWidthFullDiv>
                        <img loading="lazy"alt={""}
                          src={Img}
                          height={500}
                          width={1500}
                          alt="example"
                        />
                      </StyledImageWidthFullDiv>
                    </StyledImageTitleDiv>
                  }
                >
                  <FeaturedTypeRow>
                    <FeaturedTypeDiv>
                      <p>{FeaturedType}</p>
                    </FeaturedTypeDiv>
                    <StyledEnrolledDiv>
                      {name === "courses" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "trainings" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "programs" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "webinars" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "conferences" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                    </StyledEnrolledDiv>
                  </FeaturedTypeRow>
                  <DisplayNameRow dir="rtl">
                    <h1>{CourseName}</h1>
                  </DisplayNameRow>
                  {name === "courses" && <NameP dir="rtl">({course})</NameP>}
                  {name === "trainings" && (
                    <NameP dir="rtl">({training})</NameP>
                  )}
                  {name === "programs" && <NameP dir="rtl">({program})</NameP>}
                  {name === "webinars" && <NameP dir="rtl">({webinar})</NameP>}
                  {name === "conferences" && (
                    <NameP dir="rtl">({conference})</NameP>
                  )}
                  <StarRatingDiv dir="rtl">
                    <Rate value={Rating} allowHalf disabled />
                    <p className="total">{Rating}</p>
                    <p>({TotalRatings})</p>
                  </StarRatingDiv>
                  <CourseDurationRow>
                    <TimerDiv>
                      <img loading="lazy"src={Clock} />
                      <p>{Time}</p>
                    </TimerDiv>

                    {SubCategory === "Online" && (
                      <TimerDivSite>
                        <img loading="lazy"alt={""} src={TV} height={28} width={28} alt="example" />
                        <p>{online}</p>
                      </TimerDivSite>
                    )}
                    {SubCategory === "Onsite" && (
                      <TimerDiv>
                        <img loading="lazy"alt={""}
                          src={OnSite}
                          height={28}
                          width={28}
                          alt="example"
                        />
                        <p>{onsite}</p>
                      </TimerDiv>
                    )}
                  </CourseDurationRow>
                  <Divider />
                  <PriceRow>
                    <PriceDiv>
                      {paidFree === "Paid" ? (
                        <>
                          <p className="sar">{sar}</p>&nbsp;
                          {name === "courses" ? (
                            <p>
                              {MinPrice === 0 ? (
                                <>
                                  {MaxPrice} - {MaxPrice}
                                </>
                              ) : (
                                <>
                                  {MinPrice} - {MaxPrice}
                                </>
                              )}
                            </p>
                          ) : (
                            <p>
                              {MinPrice === 0 ? (
                                <>
                                  {MaxPrice} - {MaxPrice}
                                </>
                              ) : (
                                <>
                                  {MinPrice} - {MaxPrice}
                                </>
                              )}
                            </p>
                          )}
                        </>
                      ) : (
                        <p>
                          <b>{free}</b>
                        </p>
                      )}
                    </PriceDiv>
                    <StyledEndDiv>
                      {name === "courses" && (
                        <p
                          onClick={() => router.push(`/ar/course-detail/${id}`)}
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "trainings" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/training-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "programs" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/program-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "webinars" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/webinar-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "conferences" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/conference-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                    </StyledEndDiv>
                  </PriceRow>
                </Card>
              </>
            </StyledCardsDiv1>
          </a>
        </NextLink>
      )}
      {page === "workshop-landing-page" && (
        <NextLink href={`/ar/workshop-detail/${id}`}>
          <a>
            <StyledCardsDiv1>
              <>
                <Card
                  // onClick={() => router.push(`/ar/workshop-detail/${id}`)}
                  hoverable
                  cover={
                    <StyledImageTitleDiv>
                      {(name === "courses" ||
                        name === "trainings" ||
                        name === "webinars") && (
                        <StyledCmeDivLanding>
                          <p>
                            ({cme} {cme_text})
                          </p>
                        </StyledCmeDivLanding>
                      )}
                      {name === "programs" ||
                        (name === "workshops" && (
                          <StyledCmeDiv1>
                            <p>
                              ({cme} {cme_text})
                            </p>
                          </StyledCmeDiv1>
                        ))}
                      <StyledImageWidthFullDiv>
                        <img loading="lazy"alt={""}
                          src={Img}
                          height={500}
                          width={1500}
                          alt="example"
                        />
                      </StyledImageWidthFullDiv>
                    </StyledImageTitleDiv>
                  }
                >
                  <FeaturedTypeRow>
                    <FeaturedTypeDiv>
                      <p>{FeaturedType}</p>
                    </FeaturedTypeDiv>
                    <StyledEnrolledDiv>
                      {name === "courses" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "trainings" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "programs" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "webinars" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                    </StyledEnrolledDiv>
                  </FeaturedTypeRow>
                  <DisplayNameRow dir="rtl">
                    <h1>{CourseName}</h1>
                  </DisplayNameRow>
                  {name === "courses" && <NameP dir="rtl">({course})</NameP>}
                  {name === "trainings" && (
                    <NameP dir="rtl">({training})</NameP>
                  )}
                  {name === "programs" && <NameP dir="rtl">({program})</NameP>}
                  {name === "webinars" && <NameP dir="rtl">({webinar})</NameP>}
                  {name === "workshops" && <NameP dir="rtl">({webinar})</NameP>}
                  <StarRatingDiv dir="rtl">
                    <Rate value={Rating} allowHalf disabled />
                    <p className="total">{Rating}</p>
                    <p>({TotalRatings})</p>
                  </StarRatingDiv>
                  <CourseDurationRow>
                    <TimerDiv>
                      <img loading="lazy"src={Clock} />
                      <p>{Time}</p>
                    </TimerDiv>

                    {SubCategory === "Online" && (
                      <TimerDivSite>
                        <img loading="lazy"alt={""} src={TV} height={28} width={28} alt="example" />
                        <p>{online}</p>
                      </TimerDivSite>
                    )}
                    {SubCategory === "Onsite" && (
                      <TimerDiv>
                        <img loading="lazy"alt={""}
                          src={OnSite}
                          height={28}
                          width={28}
                          alt="example"
                        />
                        <p>{onsite}</p>
                      </TimerDiv>
                    )}
                  </CourseDurationRow>
                  <Divider />
                  <PriceRow>
                    <PriceDiv>
                      {paidFree === "Paid" ? (
                        <>
                          <p className="sar">{sar}</p>&nbsp;
                          {name === "courses" ? (
                            <p>
                              {MinPrice === 0 ? (
                                <>
                                  {MaxPrice} - {MaxPrice}
                                </>
                              ) : (
                                <>
                                  {MinPrice} - {MaxPrice}
                                </>
                              )}
                            </p>
                          ) : (
                            <p>
                              {MinPrice === 0 ? (
                                <>
                                  {MaxPrice} - {MaxPrice}
                                </>
                              ) : (
                                <>
                                  {MinPrice} - {MaxPrice}
                                </>
                              )}
                            </p>
                          )}
                        </>
                      ) : (
                        <p>
                          <b>{free}</b>
                        </p>
                      )}
                    </PriceDiv>
                    <StyledEndDiv>
                      {name === "courses" && (
                        <p
                          onClick={() => router.push(`/ar/course-detail/${id}`)}
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "trainings" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/training-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "programs" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/program-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "webinars" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/webinar-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "workshops" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/workshop-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                    </StyledEndDiv>
                  </PriceRow>
                </Card>
              </>
            </StyledCardsDiv1>
          </a>
        </NextLink>
      )}
      {page === "program-page" && (
        <NextLink href={`/ar/program-detail/${id}`}>
          <a>
            <StyledCardsDiv1>
              <>
                <Card
                  // onClick={() => router.push(`/ar/program-detail/${id}`)}
                  hoverable
                  cover={
                    <StyledImageTitleDiv>
                      {(name === "courses" || name === "trainings") && (
                        <StyledCmeDiv>
                          <p>
                            ({cme} {cme_text})
                          </p>
                        </StyledCmeDiv>
                      )}
                      {name === "programs" && (
                        <StyledCmeDiv1>
                          <p>
                            ({cme} {cme_text})
                          </p>
                        </StyledCmeDiv1>
                      )}
                      <StyledImageWidthFullDiv>
                        <img loading="lazy"alt={""}
                          src={Img}
                          height={500}
                          width={1500}
                          alt="example"
                        />
                      </StyledImageWidthFullDiv>
                    </StyledImageTitleDiv>
                  }
                >
                  <FeaturedTypeRow>
                    <FeaturedTypeDiv>
                      <p>{FeaturedType}</p>
                    </FeaturedTypeDiv>
                    <StyledEnrolledDiv>
                      {name === "courses" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "trainings" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "programs" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                    </StyledEnrolledDiv>
                  </FeaturedTypeRow>
                  <DisplayNameRow dir="rtl">
                    <h1>{CourseName}</h1>
                  </DisplayNameRow>
                  {name === "courses" && <NameP dir="rtl">({course})</NameP>}
                  {name === "trainings" && (
                    <NameP dir="rtl">({training})</NameP>
                  )}
                  {name === "programs" && <NameP dir="rtl">({program})</NameP>}
                  <StarRatingDiv dir="rtl">
                    <Rate value={Rating} allowHalf disabled />
                    <p className="total">{Rating}</p>
                    <p>({TotalRatings})</p>
                  </StarRatingDiv>
                  <CourseDurationRow>
                    <TimerDiv>
                      <img loading="lazy"src={Clock} />
                      <p>{Time}</p>
                    </TimerDiv>

                    {SubCategory === "Online" && (
                      <TimerDivSite>
                        <img loading="lazy"alt={""} src={TV} height={28} width={28} alt="example" />
                        <p>{online}</p>
                      </TimerDivSite>
                    )}
                    {SubCategory === "Onsite" && (
                      <TimerDiv>
                        <img loading="lazy"alt={""}
                          src={OnSite}
                          height={28}
                          width={28}
                          alt="example"
                        />
                        <p>{onsite}</p>
                      </TimerDiv>
                    )}
                  </CourseDurationRow>
                  <Divider />
                  <PriceRow>
                    <StyledEndDiv>
                      {name === "courses" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/program-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "trainings" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/training-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "programs" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/program-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                    </StyledEndDiv>
                    <PriceDiv>
                      {paidFree === "Paid" ? (
                        <>
                          {name === "courses" ? (
                            <p>
                              {MinPrice === 0 ? (
                                <>
                                  {MaxPrice} - {MaxPrice}
                                </>
                              ) : (
                                <>
                                  {MinPrice} - {MaxPrice}
                                </>
                              )}
                            </p>
                          ) : (
                            <p>
                              {MinPrice === 0 ? (
                                <>
                                  {MaxPrice} - {MaxPrice}
                                </>
                              ) : (
                                <>
                                  {MinPrice} - {MaxPrice}
                                </>
                              )}
                            </p>
                          )}
                          <p style={{ marginLeft: 5 }} className="sar">
                            {sar}
                          </p>
                          &nbsp;
                        </>
                      ) : (
                        <p>
                          <b>{free}</b>
                        </p>
                      )}
                    </PriceDiv>
                  </PriceRow>
                </Card>
              </>
            </StyledCardsDiv1>
          </a>
        </NextLink>
      )}
      {page === "program-landing-page" && (
        <NextLink href={`/ar/program-detail/${id}`}>
          <a>
            <StyledCardsDiv1>
              <>
                <Card
                  // onClick={() => router.push(`/ar/program-detail/${id}`)}
                  hoverable
                  cover={
                    <StyledImageTitleDiv>
                      {(name === "courses" || name === "trainings") && (
                        <StyledCmeDiv>
                          <p>
                            ({cme} {cme_text})
                          </p>
                        </StyledCmeDiv>
                      )}
                      {name === "programs" && (
                        <StyledCmeDivLandingProgram>
                          <p>
                            ({cme} {cme_text})
                          </p>
                        </StyledCmeDivLandingProgram>
                      )}
                      <StyledImageWidthFullDiv>
                        <img loading="lazy"alt={""}
                          src={Img}
                          height={500}
                          width={1500}
                          alt="example"
                        />
                      </StyledImageWidthFullDiv>
                    </StyledImageTitleDiv>
                  }
                >
                  <FeaturedTypeRow>
                    <FeaturedTypeDiv>
                      <p>{FeaturedType}</p>
                    </FeaturedTypeDiv>
                    <StyledEnrolledDiv>
                      {name === "courses" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "trainings" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "programs" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                    </StyledEnrolledDiv>
                  </FeaturedTypeRow>
                  <DisplayNameRow dir="rtl">
                    <h1>{CourseName}</h1>
                  </DisplayNameRow>
                  {name === "courses" && <NameP dir="rtl">({course})</NameP>}
                  {name === "trainings" && (
                    <NameP dir="rtl">({training})</NameP>
                  )}
                  {name === "programs" && <NameP dir="rtl">({program})</NameP>}
                  <StarRatingDiv dir="rtl">
                    <Rate value={Rating} allowHalf disabled />
                    <p className="total">{Rating}</p>
                    <p>({TotalRatings})</p>
                  </StarRatingDiv>
                  <CourseDurationRow>
                    <TimerDiv>
                      <img loading="lazy"src={Clock} />
                      <p>{Time}</p>
                    </TimerDiv>

                    {SubCategory === "Online" && (
                      <TimerDivSite>
                        <img loading="lazy"alt={""} src={TV} height={28} width={28} alt="example" />
                        <p>{online}</p>
                      </TimerDivSite>
                    )}
                    {SubCategory === "Onsite" && (
                      <TimerDiv>
                        <img loading="lazy"alt={""}
                          src={OnSite}
                          height={28}
                          width={28}
                          alt="example"
                        />
                        <p>{onsite}</p>
                      </TimerDiv>
                    )}
                  </CourseDurationRow>
                  <Divider />
                  <PriceRow>
                    <StyledEndDiv>
                      {name === "courses" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/program-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "trainings" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/training-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "programs" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/program-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                    </StyledEndDiv>
                    <PriceDiv>
                      {paidFree === "Paid" ? (
                        <>
                          {name === "courses" ? (
                            <p>
                              {MinPrice === 0 ? (
                                <>
                                  {MaxPrice} - {MaxPrice}
                                </>
                              ) : (
                                <>
                                  {MinPrice} - {MaxPrice}
                                </>
                              )}
                            </p>
                          ) : (
                            <p>
                              {MinPrice === 0 ? (
                                <>
                                  {MaxPrice} - {MaxPrice}
                                </>
                              ) : (
                                <>
                                  {MinPrice} - {MaxPrice}
                                </>
                              )}
                            </p>
                          )}
                          <p style={{ marginLeft: 5 }} className="sar">
                            {sar}
                          </p>
                          &nbsp;
                        </>
                      ) : (
                        <p>
                          <b>{free}</b>
                        </p>
                      )}
                    </PriceDiv>
                  </PriceRow>
                </Card>
              </>
            </StyledCardsDiv1>
          </a>
        </NextLink>
      )}

      {page === "training-page" && (
        <NextLink href={`/ar/training-detail/${id}`}>
          <a>
            <StyledCardsDiv1>
              <>
                <Card
                  // onClick={() => router.push(`/ar/training-detail/${id}`)}
                  hoverable
                  cover={
                    <StyledImageTitleDiv>
                      {(name === "courses" || name === "trainings") && (
                        <StyledCmeDiv>
                          <p>
                            ({cme} {cme_text})
                          </p>
                        </StyledCmeDiv>
                      )}
                      {name === "programs" && (
                        <StyledCmeDiv1>
                          <p>
                            ({cme} {cme_text})
                          </p>
                        </StyledCmeDiv1>
                      )}
                      <StyledImageWidthFullDiv>
                        <img loading="lazy"alt={""}
                          src={Img}
                          height={500}
                          width={1500}
                          alt="example"
                        />
                      </StyledImageWidthFullDiv>
                    </StyledImageTitleDiv>
                  }
                >
                  <FeaturedTypeRow>
                    <FeaturedTypeDiv>
                      <p>{FeaturedType}</p>
                    </FeaturedTypeDiv>
                    <StyledEnrolledDiv>
                      {name === "courses" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "trainings" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "programs" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                    </StyledEnrolledDiv>
                  </FeaturedTypeRow>
                  <DisplayNameRow dir="rtl">
                    <h1>{CourseName}</h1>
                  </DisplayNameRow>
                  {name === "courses" && <NameP dir="rtl">({course})</NameP>}
                  {name === "trainings" && (
                    <NameP dir="rtl">({training})</NameP>
                  )}
                  {name === "programs" && <NameP dir="rtl">({program})</NameP>}
                  <StarRatingDiv dir="rtl">
                    <Rate value={Rating} allowHalf disabled />
                    <p className="total">{Rating}</p>
                    <p>({TotalRatings})</p>
                  </StarRatingDiv>
                  <CourseDurationRow>
                    <TimerDiv>
                      <img loading="lazy"src={Clock} />
                      <p>{Time}</p>
                    </TimerDiv>

                    {SubCategory === "Online" && (
                      <TimerDivSite>
                        <img loading="lazy"alt={""} src={TV} height={28} width={28} alt="example" />
                        <p>{online}</p>
                      </TimerDivSite>
                    )}
                    {SubCategory === "Onsite" && (
                      <TimerDiv>
                        <img loading="lazy"alt={""}
                          src={OnSite}
                          height={28}
                          width={28}
                          alt="example"
                        />
                        <p>{onsite}</p>
                      </TimerDiv>
                    )}
                  </CourseDurationRow>
                  <Divider />
                  <PriceRow>
                    <StyledEndDiv>
                      {name === "courses" && (
                        <p
                          onClick={() => router.push(`/ar/course-detail/${id}`)}
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "trainings" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/training-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "programs" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/program-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                    </StyledEndDiv>
                    <PriceDiv>
                      {paidFree === "Paid" ? (
                        <>
                          {name === "courses" ? (
                            <p>
                              {MinPrice === 0 ? (
                                <>
                                  {MaxPrice} - {MaxPrice}
                                </>
                              ) : (
                                <>
                                  {MinPrice} - {MaxPrice}
                                </>
                              )}
                            </p>
                          ) : (
                            <p>
                              {MinPrice === 0 ? (
                                <>
                                  {MaxPrice} - {MaxPrice}
                                </>
                              ) : (
                                <>
                                  {MinPrice} - {MaxPrice}
                                </>
                              )}
                            </p>
                          )}
                          <p style={{ marginLeft: 5 }} className="sar">
                            {sar}
                          </p>
                          &nbsp;
                        </>
                      ) : (
                        <p>
                          <b>{free}</b>
                        </p>
                      )}
                    </PriceDiv>
                  </PriceRow>
                </Card>
              </>
            </StyledCardsDiv1>
          </a>
        </NextLink>
      )}
      {page === "training-landing-page" && (
        <NextLink href={`/ar/training-detail/${id}`}>
          <a>
            <StyledCardsDiv1>
              <>
                <Card
                  // onClick={() => router.push(`/ar/training-detail/${id}`)}
                  hoverable
                  cover={
                    <StyledImageTitleDiv>
                      {(name === "courses" || name === "trainings") && (
                        <StyledCmeDivLanding>
                          <p>
                            ({cme} {cme_text})
                          </p>
                        </StyledCmeDivLanding>
                      )}
                      {name === "programs" && (
                        <StyledCmeDivLanding>
                          <p>
                            ({cme} {cme_text})
                          </p>
                        </StyledCmeDivLanding>
                      )}
                      <StyledImageWidthFullDiv>
                        <img loading="lazy"alt={""}
                          src={Img}
                          height={500}
                          width={1500}
                          alt="example"
                        />
                      </StyledImageWidthFullDiv>
                    </StyledImageTitleDiv>
                  }
                >
                  <FeaturedTypeRow>
                    <FeaturedTypeDiv>
                      <p>{FeaturedType}</p>
                    </FeaturedTypeDiv>
                    <StyledEnrolledDiv>
                      {name === "courses" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "trainings" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                      {name === "programs" && (
                        <p>
                          {EnrolledStudents} {enrolled}
                        </p>
                      )}
                    </StyledEnrolledDiv>
                  </FeaturedTypeRow>
                  <DisplayNameRow dir="rtl">
                    <h1>{CourseName}</h1>
                  </DisplayNameRow>
                  {name === "courses" && <NameP dir="rtl">({course})</NameP>}
                  {name === "trainings" && (
                    <NameP dir="rtl">({training})</NameP>
                  )}
                  {name === "programs" && <NameP dir="rtl">({program})</NameP>}
                  <StarRatingDiv dir="rtl">
                    <Rate value={Rating} allowHalf disabled />
                    <p className="total">{Rating}</p>
                    <p>({TotalRatings})</p>
                  </StarRatingDiv>
                  <CourseDurationRow>
                    <TimerDiv>
                      <img loading="lazy"src={Clock} />
                      <p>{Time}</p>
                    </TimerDiv>

                    {SubCategory === "Online" && (
                      <TimerDivSite>
                        <img loading="lazy"alt={""} src={TV} height={28} width={28} alt="example" />
                        <p>{online}</p>
                      </TimerDivSite>
                    )}
                    {SubCategory === "Onsite" && (
                      <TimerDiv>
                        <img loading="lazy"alt={""}
                          src={OnSite}
                          height={28}
                          width={28}
                          alt="example"
                        />
                        <p>{onsite}</p>
                      </TimerDiv>
                    )}
                  </CourseDurationRow>
                  <Divider />
                  <PriceRow>
                    <StyledEndDiv>
                      {name === "courses" && (
                        <p
                          onClick={() => router.push(`/ar/course-detail/${id}`)}
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "trainings" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/training-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                      {name === "programs" && (
                        <p
                          onClick={() =>
                            router.push(`/ar/program-detail/${id}`)
                          }
                          className="read-more"
                        >
                          {read_more}
                        </p>
                      )}
                    </StyledEndDiv>
                    <PriceDiv>
                      {paidFree === "Paid" ? (
                        <>
                          {name === "courses" ? (
                            <p>
                              {MinPrice === 0 ? (
                                <>
                                  {MaxPrice} - {MaxPrice}
                                </>
                              ) : (
                                <>
                                  {MinPrice} - {MaxPrice}
                                </>
                              )}
                            </p>
                          ) : (
                            <p>
                              {MinPrice === 0 ? (
                                <>
                                  {MaxPrice} - {MaxPrice}
                                </>
                              ) : (
                                <>
                                  {MinPrice} - {MaxPrice}
                                </>
                              )}
                            </p>
                          )}
                          <p style={{ marginLeft: 5 }} className="sar">
                            {sar}
                          </p>
                          &nbsp;
                        </>
                      ) : (
                        <p>
                          <b>{free}</b>
                        </p>
                      )}
                    </PriceDiv>
                  </PriceRow>
                </Card>
              </>
            </StyledCardsDiv1>
          </a>
        </NextLink>
      )}
    </StyledDiv>
  );

  const MobileView = (
    <StyledDiv>
      {page === "home" && (
        <StyledCardsDiv onClick={() => router.push(`/ar/course-detail/${id}`)}>
          <>
            <Card
              hoverable
              cover={
                <StyledImageTitleDiv>
                  {(name === "courses" || name === "trainings") && (
                    <StyledCmeDiv>
                      <p>
                        ({cme} {cme_text})
                      </p>
                    </StyledCmeDiv>
                  )}
                  {name === "programs" && (
                    <StyledCmeDiv1>
                      <p>
                        ({cme} {cme_text})
                      </p>
                    </StyledCmeDiv1>
                  )}
                  <StyledImageWidthFullDiv>
                    <img loading="lazy"alt={""}
                      className="rtl"
                      src={Img}
                      height={500}
                      width={1500}
                      alt="example"
                    />
                  </StyledImageWidthFullDiv>
                </StyledImageTitleDiv>
              }
            >
              <FeaturedTypeRow dir="rtl">
                <FeaturedTypeDiv>
                  <p>{FeaturedType}</p>
                </FeaturedTypeDiv>
                <StyledEnrolledDiv>
                  {name === "courses" && (
                    <p>
                      {EnrolledStudents} {enrolled}
                    </p>
                  )}
                  {name === "trainings" && (
                    <p>
                      {EnrolledStudents} {enrolled}
                    </p>
                  )}
                  {name === "programs" && (
                    <p>
                      {EnrolledStudents} {enrolled}
                    </p>
                  )}
                </StyledEnrolledDiv>
              </FeaturedTypeRow>
              <DisplayNameRow dir="rtl">
                <h1>{CourseName}</h1>
              </DisplayNameRow>
              {name === "courses" && <NameP dir="rtl">({course})</NameP>}
              {name === "trainings" && <NameP dir="rtl">({training})</NameP>}
              {name === "programs" && <NameP dir="rtl">({program})</NameP>}
              <StarRatingDiv dir="rtl">
                <Rate value={Rating} allowHalf disabled />
                <p className="total">{Rating}</p>
                <p>({TotalRatings})</p>
              </StarRatingDiv>
              <CourseDurationRow>
                <TimerDiv>
                  <img loading="lazy"alt={""} src={Clock} height={24} width={24} alt="example" />
                  <p>{Time}</p>
                </TimerDiv>

                {SubCategory === "Online" && (
                  <TimerDivSite>
                    <img loading="lazy"alt={""} src={OnSite} height={28} width={28} alt="example" />
                    <p>{online}</p>
                  </TimerDivSite>
                )}
                {SubCategory === "Onsite" && (
                  <TimerDiv>
                    <img loading="lazy"alt={""} src={TV} height={28} width={28} alt="example" />
                    <p>{onsite}</p>
                  </TimerDiv>
                )}
              </CourseDurationRow>
              <Divider />
              <PriceRow>
                <PriceDiv>
                  {paidFree === "Paid" ? (
                    <>
                      <p className="sar">{sar}</p>&nbsp;
                      {name === "courses" ? (
                        <p>
                          {MinPrice === 0 ? (
                            <>
                              {MaxPrice} - {MaxPrice}
                            </>
                          ) : (
                            <>
                              {MinPrice} - {MaxPrice}
                            </>
                          )}
                        </p>
                      ) : (
                        <p>
                          {MinPrice === 0 ? (
                            <>
                              {MaxPrice} - {MaxPrice}
                            </>
                          ) : (
                            <>
                              {MinPrice} - {MaxPrice}
                            </>
                          )}
                        </p>
                      )}
                    </>
                  ) : (
                    <p>
                      <b>Free</b>
                    </p>
                  )}
                </PriceDiv>
                <StyledEndDiv>
                  {name === "courses" && (
                    <p
                      onClick={() => router.push(`/ar/course-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                  {name === "trainings" && (
                    <p
                      onClick={() => router.push(`/ar/training-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                  {name === "programs" && (
                    <p
                      onClick={() => router.push(`/ar/program-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                </StyledEndDiv>
              </PriceRow>
            </Card>
          </>
        </StyledCardsDiv>
      )}
      {page === "program" && (
        <StyledCardsDiv onClick={() => router.push(`/ar/program-detail/${id}`)}>
          <>
            <Card
              hoverable
              cover={
                <StyledImageTitleDiv>
                  {(name === "courses" || name === "trainings") && (
                    <StyledCmeDiv>
                      <p>
                        ({cme} {cme_text})
                      </p>
                    </StyledCmeDiv>
                  )}
                  {name === "programs" && (
                    <StyledCmeDiv1>
                      <p>
                        ({cme} {cme_text})
                      </p>
                    </StyledCmeDiv1>
                  )}
                  <StyledImageWidthFullDiv>
                    <img loading="lazy"alt={""} src={Img} height={500} width={1500} alt="example" />
                  </StyledImageWidthFullDiv>
                </StyledImageTitleDiv>
              }
            >
              <FeaturedTypeRow dir="rtl">
                <FeaturedTypeDiv>
                  <p>{FeaturedType}</p>
                </FeaturedTypeDiv>
                <StyledEnrolledDiv>
                  {name === "courses" && (
                    <p>
                      {EnrolledStudents} {enrolled}
                    </p>
                  )}
                  {name === "trainings" && (
                    <p>
                      {EnrolledStudents} {enrolled}
                    </p>
                  )}
                  {name === "programs" && (
                    <p>
                      {EnrolledStudents} {enrolled}
                    </p>
                  )}
                </StyledEnrolledDiv>
              </FeaturedTypeRow>
              <DisplayNameRow dir="rtl">
                <h1>{CourseName}</h1>
              </DisplayNameRow>
              {name === "courses" && <NameP dir="rtl">({course})</NameP>}
              {name === "trainings" && <NameP dir="rtl">({training})</NameP>}
              {name === "programs" && <NameP dir="rtl">({program})</NameP>}
              <StarRatingDiv dir="rtl">
                <Rate value={Rating} allowHalf disabled />
                <p className="total">{Rating}</p>
                <p>({TotalRatings})</p>
              </StarRatingDiv>
              <CourseDurationRow>
                <TimerDiv>
                  <img loading="lazy"alt={""} src={Clock} height={24} width={24} alt="example" />
                  {/* <img loading="lazy"src={Clock} /> */}
                  <p>{Time}</p>
                </TimerDiv>

                {SubCategory === "Online" && (
                  <TimerDivSite>
                    <img loading="lazy"alt={""} src={OnSite} height={28} width={28} alt="example" />
                    <p>{online}</p>
                  </TimerDivSite>
                )}
                {SubCategory === "Onsite" && (
                  <TimerDiv>
                    <img loading="lazy"alt={""} src={TV} height={28} width={28} alt="example" />
                    <p>{onsite}</p>
                  </TimerDiv>
                )}
              </CourseDurationRow>
              <Divider />
              <PriceRow>
                <PriceDiv>
                  {paidFree === "Paid" ? (
                    <>
                      <p className="sar">{sar}</p>&nbsp;
                      {name === "courses" ? (
                        <p>
                          {MinPrice === 0 ? (
                            <>
                              {MaxPrice} - {MaxPrice}
                            </>
                          ) : (
                            <>
                              {MinPrice} - {MaxPrice}
                            </>
                          )}
                        </p>
                      ) : (
                        <p>
                          {MinPrice === 0 ? (
                            <>
                              {MaxPrice} - {MaxPrice}
                            </>
                          ) : (
                            <>
                              {MinPrice} - {MaxPrice}
                            </>
                          )}
                        </p>
                      )}
                    </>
                  ) : (
                    <p>
                      <b>{free}</b>
                    </p>
                  )}
                </PriceDiv>
                <StyledEndDiv>
                  {name === "courses" && (
                    <p
                      onClick={() => router.push(`/ar/course-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                  {name === "trainings" && (
                    <p
                      onClick={() => router.push(`/ar/training-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                  {name === "programs" && (
                    <p
                      onClick={() => router.push(`/ar/program-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                </StyledEndDiv>
              </PriceRow>
            </Card>
          </>
        </StyledCardsDiv>
      )}
      {page === "training" && (
        <StyledCardsDiv
          onClick={() => router.push(`/ar/training-detail/${id}`)}
        >
          <>
            <Card
              hoverable
              cover={
                <StyledImageTitleDiv>
                  {(name === "courses" || name === "trainings") && (
                    <StyledCmeDiv>
                      <p>
                        ({cme} {cme_text})
                      </p>
                    </StyledCmeDiv>
                  )}
                  {name === "programs" && (
                    <StyledCmeDiv1>
                      <p>
                        ({cme} {cme_text})
                      </p>
                    </StyledCmeDiv1>
                  )}
                  <StyledImageWidthFullDiv>
                    <img loading="lazy"alt={""} src={Img} height={500} width={1500} alt="example" />
                  </StyledImageWidthFullDiv>
                </StyledImageTitleDiv>
              }
            >
              <FeaturedTypeRow dir="rtl">
                <FeaturedTypeDiv>
                  <p>{FeaturedType}</p>
                </FeaturedTypeDiv>
                <StyledEnrolledDiv>
                  {name === "courses" && (
                    <p>
                      {EnrolledStudents} {enrolled}
                    </p>
                  )}
                  {name === "trainings" && (
                    <p>
                      {EnrolledStudents} {enrolled}
                    </p>
                  )}
                  {name === "programs" && (
                    <p>
                      {EnrolledStudents} {enrolled}
                    </p>
                  )}{" "}
                </StyledEnrolledDiv>
              </FeaturedTypeRow>
              <DisplayNameRow dir="rtl">
                <h1>{CourseName}</h1>
              </DisplayNameRow>
              {name === "courses" && <NameP dir="rtl">({course})</NameP>}
              {name === "trainings" && <NameP dir="rtl">({training})</NameP>}
              {name === "programs" && <NameP dir="rtl">({program})</NameP>}
              <StarRatingDiv dir="rtl">
                <Rate value={Rating} allowHalf disabled />
                <p className="total">{Rating}</p>
                <p>({TotalRatings})</p>
              </StarRatingDiv>
              <CourseDurationRow>
                <TimerDiv>
                  <img loading="lazy"alt={""} src={Clock} height={24} width={24} alt="example" />
                  {/* <img loading="lazy"src={Clock} /> */}
                  <p>{Time}</p>
                </TimerDiv>

                {SubCategory === "Online" && (
                  <TimerDivSite>
                    <img loading="lazy"alt={""} src={OnSite} height={28} width={28} alt="example" />
                    <p>{online}</p>
                  </TimerDivSite>
                )}
                {SubCategory === "Onsite" && (
                  <TimerDiv>
                    <img loading="lazy"alt={""} src={TV} height={28} width={28} alt="example" />
                    <p>{onsite}</p>
                  </TimerDiv>
                )}
              </CourseDurationRow>
              <Divider />
              <PriceRow>
                <PriceDiv>
                  {paidFree === "Paid" ? (
                    <>
                      <p className="sar">{sar}</p>&nbsp;
                      {name === "courses" ? (
                        <p>
                          {MinPrice === 0 ? (
                            <>
                              {MaxPrice} - {MaxPrice}
                            </>
                          ) : (
                            <>
                              {MinPrice} - {MaxPrice}
                            </>
                          )}
                        </p>
                      ) : (
                        <p>
                          {MinPrice === 0 ? (
                            <>
                              {MaxPrice} - {MaxPrice}
                            </>
                          ) : (
                            <>
                              {MinPrice} - {MaxPrice}
                            </>
                          )}
                        </p>
                      )}
                    </>
                  ) : (
                    <p>
                      <b>{free}</b>
                    </p>
                  )}
                </PriceDiv>
                <StyledEndDiv>
                  {name === "courses" && (
                    <p
                      onClick={() => router.push(`/ar/course-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                  {name === "trainings" && (
                    <p
                      onClick={() => router.push(`/ar/training-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                  {name === "programs" && (
                    <p
                      onClick={() => router.push(`/ar/program-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                </StyledEndDiv>
              </PriceRow>
            </Card>
          </>
        </StyledCardsDiv>
      )}
      {page === "course-page" && (
        <StyledCardsDiv1>
          <>
            <Card
              onClick={() => router.push(`/ar/course-detail/${id}`)}
              hoverable
              cover={
                <StyledImageTitleDiv>
                  {(name === "courses" || name === "trainings") && (
                    <StyledCmeDiv>
                      <p>
                        ({cme} {cme_text})
                      </p>
                    </StyledCmeDiv>
                  )}
                  {name === "programs" && (
                    <StyledCmeDiv1>
                      <p>
                        ({cme} {cme_text})
                      </p>
                    </StyledCmeDiv1>
                  )}
                  <StyledImageWidthFullDiv>
                    <img loading="lazy"alt={""} src={Img} height={500} width={1500} alt="example" />
                  </StyledImageWidthFullDiv>
                </StyledImageTitleDiv>
              }
            >
              <FeaturedTypeRow dir="rtl">
                <FeaturedTypeDiv>
                  <p>{FeaturedType}</p>
                </FeaturedTypeDiv>
                <StyledEnrolledDiv>
                  {name === "courses" && (
                    <p>
                      {EnrolledStudents} {enrolled}
                    </p>
                  )}
                  {name === "trainings" && (
                    <p>
                      {EnrolledStudents} {enrolled}
                    </p>
                  )}
                  {name === "programs" && (
                    <p>
                      {EnrolledStudents} {enrolled}
                    </p>
                  )}
                </StyledEnrolledDiv>
              </FeaturedTypeRow>
              <DisplayNameRow dir="rtl">
                <h1>{CourseName}</h1>
              </DisplayNameRow>
              {name === "courses" && <NameP dir="rtl">({course})</NameP>}
              {name === "trainings" && <NameP dir="rtl">({training})</NameP>}
              {name === "programs" && <NameP dir="rtl">({program})</NameP>}
              <StarRatingDiv dir="rtl">
                <Rate value={Rating} allowHalf disabled />
                <p className="total">{Rating}</p>
                <p>({TotalRatings})</p>
              </StarRatingDiv>
              {/* <CourseDurationRow>
              <TimerDiv>
                <img loading="lazy"src={Clock} />
                <p>{Time}</p>
              </TimerDiv>

              {onSite === true && (
                <TimerDiv>
                  <img loading="lazy"src={OnSite} />
                  <p>{online}</p>
                </TimerDiv>
              )}
              {onLine === true && (
                <TimerDiv>
                  <img loading="lazy"src={TV} />
                  <p>{online}</p>
                </TimerDiv>
              )}
            </CourseDurationRow> */}
              <Divider />
              <PriceRow>
                <PriceDiv>
                  {paidFree === "Paid" ? (
                    <>
                      <p className="sar">{sar}</p>&nbsp;
                      {name === "courses" ? (
                        <p>
                          {MinPrice === 0 ? (
                            <>
                              {MaxPrice} - {MaxPrice}
                            </>
                          ) : (
                            <>
                              {MinPrice} - {MaxPrice}
                            </>
                          )}
                        </p>
                      ) : (
                        <p>
                          {MinPrice === 0 ? (
                            <>
                              {MaxPrice} - {MaxPrice}
                            </>
                          ) : (
                            <>
                              {MinPrice} - {MaxPrice}
                            </>
                          )}
                        </p>
                      )}
                    </>
                  ) : (
                    <p>
                      <b>{free}</b>
                    </p>
                  )}
                </PriceDiv>
                <StyledEndDiv>
                  {name === "courses" && (
                    <p
                      onClick={() => router.push(`/ar/course-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                  {name === "trainings" && (
                    <p
                      onClick={() => router.push(`/ar/training-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                  {name === "programs" && (
                    <p
                      onClick={() => router.push(`/ar/program-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                </StyledEndDiv>
              </PriceRow>
            </Card>
          </>
        </StyledCardsDiv1>
      )}
      {page === "course-landing-page" && (
        <StyledCardsDiv1>
          <>
            <Card
              onClick={() => router.push(`/ar/course-detail/${id}`)}
              hoverable
              cover={
                <StyledImageTitleDiv>
                  {(name === "courses" || name === "trainings") && (
                    <StyledCmeDiv>
                      <p>
                        ({cme} {cme_text})
                      </p>
                    </StyledCmeDiv>
                  )}
                  {name === "programs" && (
                    <StyledCmeDiv1>
                      <p>
                        ({cme} {cme_text})
                      </p>
                    </StyledCmeDiv1>
                  )}
                  <StyledImageWidthFullDiv>
                    <img loading="lazy"alt={""} src={Img} height={500} width={1500} alt="example" />
                  </StyledImageWidthFullDiv>
                </StyledImageTitleDiv>
              }
            >
              <FeaturedTypeRow dir="rtl">
                <FeaturedTypeDiv>
                  <p>{FeaturedType}</p>
                </FeaturedTypeDiv>
                <StyledEnrolledDiv>
                  {name === "courses" && (
                    <p>
                      {EnrolledStudents} {enrolled}
                    </p>
                  )}
                  {name === "trainings" && (
                    <p>
                      {EnrolledStudents} {enrolled}
                    </p>
                  )}
                  {name === "programs" && (
                    <p>
                      {EnrolledStudents} {enrolled}
                    </p>
                  )}
                </StyledEnrolledDiv>
              </FeaturedTypeRow>
              <DisplayNameRow dir="rtl">
                <h1>{CourseName}</h1>
              </DisplayNameRow>
              {name === "courses" && <NameP dir="rtl">({course})</NameP>}
              {name === "trainings" && <NameP dir="rtl">({training})</NameP>}
              {name === "programs" && <NameP dir="rtl">({program})</NameP>}
              <StarRatingDiv dir="rtl">
                <Rate value={Rating} allowHalf disabled />
                <p className="total">{Rating}</p>
                <p>({TotalRatings})</p>
              </StarRatingDiv>
              <CourseDurationRow dir="rtl">
                <TimerDiv>
                  <img loading="lazy"src={Clock} />
                  <p>{Time}</p>
                </TimerDiv>
                {SubCategory === "Online" && (
                  <TimerDivSite>
                    <img loading="lazy"alt={""} src={TV} height={28} width={28} alt="example" />
                    <p>{online}</p>
                  </TimerDivSite>
                )}
                {SubCategory === "Onsite" && (
                  <TimerDiv>
                    <img loading="lazy"alt={""}
                      src={OnSite}
                      height={28}
                      width={28}
                      alt="example"
                    />
                    <p>{onsite}</p>
                  </TimerDiv>
                )}
              </CourseDurationRow>
              <Divider />
              <PriceRow>
                <PriceDiv>
                  {paidFree === "Paid" ? (
                    <>
                      <p className="sar">{sar}</p>&nbsp;
                      {name === "courses" ? (
                        <p>
                          {MinPrice === 0 ? (
                            <>
                              {MaxPrice} - {MaxPrice}
                            </>
                          ) : (
                            <>
                              {MinPrice} - {MaxPrice}
                            </>
                          )}
                        </p>
                      ) : (
                        <p>
                          {MinPrice === 0 ? (
                            <>
                              {MaxPrice} - {MaxPrice}
                            </>
                          ) : (
                            <>
                              {MinPrice} - {MaxPrice}
                            </>
                          )}
                        </p>
                      )}
                    </>
                  ) : (
                    <p>
                      <b>{free}</b>
                    </p>
                  )}
                </PriceDiv>
                <StyledEndDiv>
                  {name === "courses" && (
                    <p
                      onClick={() => router.push(`/ar/course-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                  {name === "trainings" && (
                    <p
                      onClick={() => router.push(`/ar/training-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                  {name === "programs" && (
                    <p
                      onClick={() => router.push(`/ar/program-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                </StyledEndDiv>
              </PriceRow>
            </Card>
          </>
        </StyledCardsDiv1>
      )}
      {page === "webinar-landing-page" && (
        <StyledCardsDiv1>
          <>
            <Card
              onClick={() => {
                if(name==="webinars"){
                  router.push(`/ar/webinar-detail/${id}`)                  
                }
                if(name==="conferences"){
                  router.push(`/ar/conference-detail/${id}`)                  
                }
            }}
              hoverable
              cover={
                <StyledImageTitleDiv>
                  {(name === "courses" ||
                    name === "trainings" ||
                    name === "webinars") && (
                    <StyledCmeDiv>
                      <p>
                        ({cme} {cme_text})
                      </p>
                    </StyledCmeDiv>
                  )}
                  {name === "programs" && (
                    <StyledCmeDiv1>
                      <p>
                        ({cme} {cme_text})
                      </p>
                    </StyledCmeDiv1>
                  )}
                  <StyledImageWidthFullDiv>
                    <img loading="lazy"alt={""} src={Img} height={500} width={1500} alt="example" />
                  </StyledImageWidthFullDiv>
                </StyledImageTitleDiv>
              }
            >
              <FeaturedTypeRow dir="rtl">
                <FeaturedTypeDiv>
                  <p>{FeaturedType}</p>
                </FeaturedTypeDiv>
                <StyledEnrolledDiv>
                  {name === "courses" && (
                    <p>
                      {EnrolledStudents} {enrolled}
                    </p>
                  )}
                  {name === "trainings" && (
                    <p>
                      {EnrolledStudents} {enrolled}
                    </p>
                  )}
                  {name === "webinars" && (
                    <p>
                      {EnrolledStudents} {enrolled}
                    </p>
                  )}
                  {name === "conferences" && (
                    <p>
                      {EnrolledStudents} {enrolled}
                    </p>
                  )}
                  {name === "programs" && (
                    <p>
                      {EnrolledStudents} {enrolled}
                    </p>
                  )}
                </StyledEnrolledDiv>
              </FeaturedTypeRow>
              <DisplayNameRow dir="rtl">
                <h1>{CourseName}</h1>
              </DisplayNameRow>
              {name === "courses" && <NameP dir="rtl">({course})</NameP>}
              {name === "trainings" && <NameP dir="rtl">({training})</NameP>}
              {name === "programs" && <NameP dir="rtl">({program})</NameP>}
              {name === "webinars" && <NameP dir="rtl">({webinar})</NameP>}
              {name === "conferences" && <NameP dir="rtl">({conference})</NameP>}
              <StarRatingDiv dir="rtl">
                <Rate value={Rating} allowHalf disabled />
                <p className="total">{Rating}</p>
                <p>({TotalRatings})</p>
              </StarRatingDiv>
              {/* <CourseDurationRow>
              <TimerDiv>
                <img loading="lazy"src={Clock} />
                <p>{Time}</p>
              </TimerDiv>

              {onSite === true && (
                <TimerDiv>
                  <img loading="lazy"src={OnSite} />
                  <p>{online}</p>
                </TimerDiv>
              )}
              {onLine === true && (
                <TimerDiv>
                  <img loading="lazy"src={TV} />
                  <p>{online}</p>
                </TimerDiv>
              )}
            </CourseDurationRow> */}
              <Divider />
              <PriceRow>
                <PriceDiv>
                  {paidFree === "Paid" ? (
                    <>
                      <p className="sar">{sar}</p>&nbsp;
                      {name === "courses" ? (
                        <p>
                          {MinPrice === 0 ? (
                            <>
                              {MaxPrice} - {MaxPrice}
                            </>
                          ) : (
                            <>
                              {MinPrice} - {MaxPrice}
                            </>
                          )}
                        </p>
                      ) : (
                        <p>
                          {MinPrice === 0 ? (
                            <>
                              {MaxPrice} - {MaxPrice}
                            </>
                          ) : (
                            <>
                              {MinPrice} - {MaxPrice}
                            </>
                          )}
                        </p>
                      )}
                    </>
                  ) : (
                    <p>
                      <b>{free}</b>
                    </p>
                  )}
                </PriceDiv>
                <StyledEndDiv>
                  {name === "courses" && (
                    <p
                      onClick={() => router.push(`/ar/course-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                  {name === "trainings" && (
                    <p
                      onClick={() => router.push(`/ar/training-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                  {name === "programs" && (
                    <p
                      onClick={() => router.push(`/ar/program-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                  {name === "webinar" && (
                    <p
                      onClick={() => router.push(`/ar/webinar-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                  {name === "conferences" && (
                    <p
                      onClick={() => router.push(`/ar/conference-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                </StyledEndDiv>
              </PriceRow>
            </Card>
          </>
        </StyledCardsDiv1>
      )}
      {page === "symposium-landing-page" && (
        <StyledCardsDiv1>
          <>
            <Card
              onClick={() => router.push(`/ar/symposium-detail/${id}`)}
              hoverable
              cover={
                <StyledImageTitleDiv>
                  {(name === "courses" ||
                    name === "trainings" ||
                    name === "webinars") && (
                    <StyledCmeDivLanding>
                      <p>
                        ({cme} {cme_text})
                      </p>
                    </StyledCmeDivLanding>
                  )}
                  {(name === "programs" || name === "symposiums") && (
                    <StyledCmeDiv1>
                      <p>
                        ({cme} {cme_text})
                      </p>
                    </StyledCmeDiv1>
                  )}
                  <StyledImageWidthFullDiv>
                    <img loading="lazy"alt={""} src={Img} height={500} width={1500} alt="example" />
                  </StyledImageWidthFullDiv>
                </StyledImageTitleDiv>
              }
            >
              <FeaturedTypeRow>
                <FeaturedTypeDiv>
                  <p>{FeaturedType}</p>
                </FeaturedTypeDiv>
                <StyledEnrolledDiv>
                  {name === "courses" && (
                    <p>
                      {EnrolledStudents} {enrolled}
                    </p>
                  )}
                  {name === "trainings" && (
                    <p>
                      {EnrolledStudents} {enrolled}
                    </p>
                  )}
                  {name === "programs" && (
                    <p>
                      {EnrolledStudents} {enrolled}
                    </p>
                  )}
                  {name === "webinars" && (
                    <p>
                      {EnrolledStudents} {enrolled}
                    </p>
                  )}
                  {name === "symposiums" && (
                    <p>
                      {EnrolledStudents} {enrolled}
                    </p>
                  )}
                </StyledEnrolledDiv>
              </FeaturedTypeRow>
              <DisplayNameRow dir="rtl">
                <h1>{CourseName}</h1>
              </DisplayNameRow>
              {name === "courses" && <NameP dir="rtl">({course})</NameP>}
              {name === "trainings" && <NameP dir="rtl">({training})</NameP>}
              {name === "programs" && <NameP dir="rtl">({program})</NameP>}
              {name === "webinars" && <NameP dir="rtl">({webinar})</NameP>}
              {name === "symposiums" && <NameP dir="rtl">({symposium})</NameP>}
              <StarRatingDiv dir="rtl">
                <Rate value={Rating} allowHalf disabled />
                <p className="total">{Rating}</p>
                <p>({TotalRatings})</p>
              </StarRatingDiv>
              <CourseDurationRow>
                <TimerDiv>
                  <img loading="lazy"src={Clock} />
                  <p>{Time}</p>
                </TimerDiv>

                {SubCategory === "Online" && (
                  <TimerDivSite>
                    <img loading="lazy"alt={""} src={TV} height={28} width={28} alt="example" />
                    <p>{online}</p>
                  </TimerDivSite>
                )}
                {SubCategory === "Onsite" && (
                  <TimerDiv>
                    <img loading="lazy"alt={""} src={OnSite} height={28} width={28} alt="example" />
                    <p>{onsite}</p>
                  </TimerDiv>
                )}
              </CourseDurationRow>
              <Divider />
              <PriceRow>
                <PriceDiv>
                  {paidFree === "Paid" ? (
                    <>
                      <p className="sar">{sar}</p>&nbsp;
                      {name === "courses" ? (
                        <p>
                          {MinPrice === 0 ? (
                            <>
                              {MaxPrice} - {MaxPrice}
                            </>
                          ) : (
                            <>
                              {MinPrice} - {MaxPrice}
                            </>
                          )}
                        </p>
                      ) : (
                        <p>
                          {MinPrice === 0 ? (
                            <>
                              {MaxPrice} - {MaxPrice}
                            </>
                          ) : (
                            <>
                              {MinPrice} - {MaxPrice}
                            </>
                          )}
                        </p>
                      )}
                    </>
                  ) : (
                    <p>
                      <b>{free}</b>
                    </p>
                  )}
                </PriceDiv>
                <StyledEndDiv>
                  {name === "courses" && (
                    <p
                      onClick={() => router.push(`/ar/course-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                  {name === "trainings" && (
                    <p
                      onClick={() => router.push(`/ar/training-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                  {name === "programs" && (
                    <p
                      onClick={() => router.push(`/ar/program-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                  {name === "webinars" && (
                    <p
                      onClick={() => router.push(`/ar/webinar-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                  {name === "symposiums" && (
                    <p
                      onClick={() => router.push(`/ar/symposium-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                </StyledEndDiv>
              </PriceRow>
            </Card>
          </>
        </StyledCardsDiv1>
      )}

      {page === "workshop-landing-page" && (
        <StyledCardsDiv1>
          <>
            <Card
              onClick={() => router.push(`/ar/workshop-detail/${id}`)}
              hoverable
              cover={
                <StyledImageTitleDiv>
                  {(name === "courses" ||
                    name === "trainings" ||
                    name === "webinars") && (
                    <StyledCmeDiv>
                      <p>
                        ({cme} {cme_text})
                      </p>
                    </StyledCmeDiv>
                  )}
                  {name === "programs" ||
                    (name === "workshops" && (
                      <StyledCmeDiv1>
                        <p>
                          ({cme} {cme_text})
                        </p>
                      </StyledCmeDiv1>
                    ))}
                  <StyledImageWidthFullDiv>
                    <img loading="lazy"alt={""} src={Img} height={500} width={1500} alt="example" />
                  </StyledImageWidthFullDiv>
                </StyledImageTitleDiv>
              }
            >
              <FeaturedTypeRow dir="rtl">
                <FeaturedTypeDiv>
                  <p>{FeaturedType}</p>
                </FeaturedTypeDiv>
                <StyledEnrolledDiv>
                  {name === "courses" && (
                    <p>
                      {EnrolledStudents} {enrolled}
                    </p>
                  )}
                  {name === "trainings" && (
                    <p>
                      {EnrolledStudents} {enrolled}
                    </p>
                  )}
                  {name === "webinars" && (
                    <p>
                      {EnrolledStudents} {enrolled}
                    </p>
                  )}
                  {name === "programs" && (
                    <p>
                      {EnrolledStudents} {enrolled}
                    </p>
                  )}
                  {name === "workshops" && (
                    <p>
                      {EnrolledStudents} {enrolled}
                    </p>
                  )}
                </StyledEnrolledDiv>
              </FeaturedTypeRow>
              <DisplayNameRow dir="rtl">
                <h1>{CourseName}</h1>
              </DisplayNameRow>
              {name === "courses" && <NameP dir="rtl">({course})</NameP>}
              {name === "trainings" && <NameP dir="rtl">({training})</NameP>}
              {name === "programs" && <NameP dir="rtl">({program})</NameP>}
              {name === "webinars" && <NameP dir="rtl">({webinar})</NameP>}
              {name === "workshops" && <NameP dir="rtl">({webinar})</NameP>}
              <StarRatingDiv dir="rtl">
                <Rate value={Rating} allowHalf disabled />
                <p className="total">{Rating}</p>
                <p>({TotalRatings})</p>
              </StarRatingDiv>
              {/* <CourseDurationRow>
              <TimerDiv>
                <img loading="lazy"src={Clock} />
                <p>{Time}</p>
              </TimerDiv>

              {onSite === true && (
                <TimerDiv>
                  <img loading="lazy"src={OnSite} />
                  <p>{online}</p>
                </TimerDiv>
              )}
              {onLine === true && (
                <TimerDiv>
                  <img loading="lazy"src={TV} />
                  <p>{online}</p>
                </TimerDiv>
              )}
            </CourseDurationRow> */}
              <Divider />
              <PriceRow>
                <PriceDiv>
                  {paidFree === "Paid" ? (
                    <>
                      <p className="sar">{sar}</p>&nbsp;
                      {name === "courses" ? (
                        <p>
                          {MinPrice === 0 ? (
                            <>
                              {MaxPrice} - {MaxPrice}
                            </>
                          ) : (
                            <>
                              {MinPrice} - {MaxPrice}
                            </>
                          )}
                        </p>
                      ) : (
                        <p>
                          {MinPrice === 0 ? (
                            <>
                              {MaxPrice} - {MaxPrice}
                            </>
                          ) : (
                            <>
                              {MinPrice} - {MaxPrice}
                            </>
                          )}
                        </p>
                      )}
                    </>
                  ) : (
                    <p>
                      <b>{free}</b>
                    </p>
                  )}
                </PriceDiv>
                <StyledEndDiv>
                  {name === "courses" && (
                    <p
                      onClick={() => router.push(`/ar/course-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                  {name === "trainings" && (
                    <p
                      onClick={() => router.push(`/ar/training-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                  {name === "programs" && (
                    <p
                      onClick={() => router.push(`/ar/program-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                  {name === "webinars" && (
                    <p
                      onClick={() => router.push(`/ar/webinar-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                  {name === "workshops" && (
                    <p
                      onClick={() => router.push(`/ar/workshop-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                </StyledEndDiv>
              </PriceRow>
            </Card>
          </>
        </StyledCardsDiv1>
      )}
      {page === "program-page" && (
        <StyledCardsDiv1>
          <>
            <Card
              onClick={() => router.push(`/ar/program-detail/${id}`)}
              hoverable
              cover={
                <StyledImageTitleDiv>
                  {(name === "courses" || name === "trainings") && (
                    <StyledCmeDiv>
                      <p>
                        ({cme} {cme_text})
                      </p>
                    </StyledCmeDiv>
                  )}
                  {name === "programs" && (
                    <StyledCmeDiv1>
                      <p>
                        ({cme} {cme_text})
                      </p>
                    </StyledCmeDiv1>
                  )}
                  <StyledImageWidthFullDiv>
                    <img loading="lazy"alt={""} src={Img} height={500} width={1500} alt="example" />
                  </StyledImageWidthFullDiv>
                </StyledImageTitleDiv>
              }
            >
              <FeaturedTypeRow dir="rtl">
                <FeaturedTypeDiv>
                  <p>{FeaturedType}</p>
                </FeaturedTypeDiv>
                <StyledEnrolledDiv>
                  {name === "courses" && (
                    <p>
                      {EnrolledStudents} {enrolled}
                    </p>
                  )}
                  {name === "trainings" && (
                    <p>
                      {EnrolledStudents}+ {enrolled}
                    </p>
                  )}
                  {name === "programs" && (
                    <p>
                      {EnrolledStudents}+ {enrolled}
                    </p>
                  )}
                </StyledEnrolledDiv>
              </FeaturedTypeRow>
              <DisplayNameRow dir="rtl">
                <h1>{CourseName}</h1>
              </DisplayNameRow>
              {/* {name === "course" && <NameP>(Course)</NameP>}
              {name === "trainings" && <NameP>(Training)</NameP>}
              {name === "programs" && <NameP>(Program)</NameP>} */}
              {/* <StarRatingDiv>
                <Rate value={Rating} allowHalf disabled />
                <p className="total">{Rating}</p>
                <p>({TotalRatings})</p>
              </StarRatingDiv>
              <CourseDurationRow>
                <TimerDiv>
                  <img loading="lazy"src={Clock} />
                  <p>{Time}</p>
                </TimerDiv>

                {onSite === true && (
                  <TimerDiv>
                    <img loading="lazy"src={OnSite} />
                    <p>{online}</p>
                  </TimerDiv>
                )}
                {onLine === true && (
                  <TimerDiv>
                    <img loading="lazy"src={TV} />
                    <p>{online}</p>
                  </TimerDiv>
                )}
              </CourseDurationRow> */}
              <Divider />
              <PriceRow>
                <PriceDiv>
                  {paidFree === "Paid" ? (
                    <>
                      <p className="sar">{sar}</p>&nbsp;
                      {name === "courses" ? (
                        <p>
                          {MinPrice === 0 ? (
                            <>
                              {MaxPrice} - {MaxPrice}
                            </>
                          ) : (
                            <>
                              {MinPrice} - {MaxPrice}
                            </>
                          )}
                        </p>
                      ) : (
                        <p>
                          {MinPrice === 0 ? (
                            <>
                              {MaxPrice} - {MaxPrice}
                            </>
                          ) : (
                            <>
                              {MinPrice} - {MaxPrice}
                            </>
                          )}
                        </p>
                      )}
                    </>
                  ) : (
                    <p>
                      <b>{free}</b>
                    </p>
                  )}
                </PriceDiv>
                <StyledEndDiv>
                  {name === "courses" && (
                    <p
                      onClick={() => router.push(`/ar/course-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                  {name === "trainings" && (
                    <p
                      onClick={() => router.push(`/ar/training-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                  {name === "programs" && (
                    <p
                      onClick={() => router.push(`/ar/program-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                </StyledEndDiv>
              </PriceRow>
            </Card>
          </>
        </StyledCardsDiv1>
      )}

      {page === "training-page" && (
        <StyledCardsDiv1>
          <>
            <Card
              onClick={() => router.push(`/training-detail/${id}`)}
              hoverable
              cover={
                <StyledImageTitleDiv>
                  {(name === "courses" || name === "trainings") && (
                    <StyledCmeDiv>
                      <p>
                        ({cme} {cme_text})
                      </p>
                    </StyledCmeDiv>
                  )}
                  {name === "programs" && (
                    <StyledCmeDiv1>
                      <p>
                        ({cme} {cme_text})
                      </p>
                    </StyledCmeDiv1>
                  )}
                  <StyledImageWidthFullDiv>
                    <img loading="lazy"alt={""} src={Img} height={500} width={1500} alt="example" />
                  </StyledImageWidthFullDiv>
                </StyledImageTitleDiv>
              }
            >
              <FeaturedTypeRow dir="rtl">
                <FeaturedTypeDiv>
                  <p>{FeaturedType}</p>
                </FeaturedTypeDiv>
                <StyledEnrolledDiv>
                  {name === "courses" && (
                    <p>
                      {EnrolledStudents} {enrolled}
                    </p>
                  )}
                  {name === "trainings" && (
                    <p>
                      {EnrolledStudents}+ {enrolled}
                    </p>
                  )}
                  {name === "programs" && (
                    <p>
                      {EnrolledStudents}+ {enrolled}
                    </p>
                  )}
                </StyledEnrolledDiv>
              </FeaturedTypeRow>
              <DisplayNameRow dir="rtl">
                <h1>{CourseName}</h1>
              </DisplayNameRow>
              {/* {name === "course" && <NameP>(Course)</NameP>}
              {name === "trainings" && <NameP>(Training)</NameP>}
              {name === "programs" && <NameP>(Program)</NameP>} */}
              {/* <StarRatingDiv>
                <Rate value={Rating} allowHalf disabled />
                <p className="total">{Rating}</p>
                <p>({TotalRatings})</p>
              </StarRatingDiv> */}
              {/* <CourseDurationRow>
                <TimerDiv>
                  <img loading="lazy"src={Clock} />
                  <p>{Time}</p>
                </TimerDiv>

                {onSite === true && (
                  <TimerDiv>
                    <img loading="lazy"src={OnSite} />
                    <p>{online}</p>
                  </TimerDiv>
                )}
                {onLine === true && (
                  <TimerDiv>
                    <img loading="lazy"src={TV} />
                    <p>{online}</p>
                  </TimerDiv>
                )}
              </CourseDurationRow> */}
              <Divider />
              <PriceRow>
                <PriceDiv>
                  {paidFree === "Paid" ? (
                    <>
                      <p className="sar">{sar}</p>&nbsp;
                      {name === "courses" ? (
                        <p>
                          {MinPrice === 0 ? (
                            <>
                              {MaxPrice} - {MaxPrice}
                            </>
                          ) : (
                            <>
                              {MinPrice} - {MaxPrice}
                            </>
                          )}
                        </p>
                      ) : (
                        <p>
                          {MinPrice === 0 ? (
                            <>
                              {MaxPrice} - {MaxPrice}
                            </>
                          ) : (
                            <>
                              {MinPrice} - {MaxPrice}
                            </>
                          )}
                        </p>
                      )}
                    </>
                  ) : (
                    <p>
                      <b>{free}</b>
                    </p>
                  )}
                </PriceDiv>
                <StyledEndDiv>
                  {name === "courses" && (
                    <p
                      onClick={() => router.push(`/course-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                  {name === "trainings" && (
                    <p
                      onClick={() => router.push(`/training-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                  {name === "programs" && (
                    <p
                      onClick={() => router.push(`/program-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                </StyledEndDiv>
              </PriceRow>
            </Card>
          </>
        </StyledCardsDiv1>
      )}
      {page === "training-landing-page" && (
        <StyledCardsDiv1>
          <>
            <Card
              onClick={() => router.push(`/ar/training-detail/${id}`)}
              hoverable
              cover={
                <StyledImageTitleDiv>
                  {(name === "courses" || name === "trainings") && (
                    <StyledCmeDiv>
                      <p>
                        ({cme} {cme_text})
                      </p>
                    </StyledCmeDiv>
                  )}
                  {name === "programs" && (
                    <StyledCmeDiv1>
                      <p>
                        ({cme} {cme_text})
                      </p>
                    </StyledCmeDiv1>
                  )}
                  <StyledImageWidthFullDiv>
                    <img loading="lazy"alt={""} src={Img} height={500} width={1500} alt="example" />
                  </StyledImageWidthFullDiv>
                </StyledImageTitleDiv>
              }
            >
              <FeaturedTypeRow dir="rtl">
                <FeaturedTypeDiv>
                  <p>{FeaturedType}</p>
                </FeaturedTypeDiv>
                <StyledEnrolledDiv>
                  {name === "courses" && (
                    <p>
                      {EnrolledStudents} {enrolled}
                    </p>
                  )}
                  {name === "trainings" && (
                    <p>
                      {EnrolledStudents}+ {enrolled}
                    </p>
                  )}
                  {name === "programs" && (
                    <p>
                      {EnrolledStudents}+ {enrolled}
                    </p>
                  )}
                </StyledEnrolledDiv>
              </FeaturedTypeRow>
              <DisplayNameRow dir="rtl">
                <h1>{CourseName}</h1>
              </DisplayNameRow>
              {name === "course" && (
                <NameP style={{ textAlign: "end" }}>({course})</NameP>
              )}
              {name === "trainings" && (
                <NameP style={{ textAlign: "end" }}>({training})</NameP>
              )}
              {name === "programs" && (
                <NameP style={{ textAlign: "end" }}>({program})</NameP>
              )}
              <StarRatingDiv dir="rtl">
                <Rate value={Rating} allowHalf disabled />
                <p className="total">{Rating}</p>
                <p>({TotalRatings})</p>
              </StarRatingDiv>
              <CourseDurationRow dir="rtl">
                <TimerDiv>
                  <img loading="lazy"src={Clock} />
                  <p>{Time}</p>
                </TimerDiv>
                {SubCategory === "Online" && (
                  <TimerDivSite>
                    <img loading="lazy"alt={""} src={TV} height={28} width={28} alt="example" />
                    <p>{online}</p>
                  </TimerDivSite>
                )}
                {SubCategory === "Onsite" && (
                  <TimerDiv>
                    <img loading="lazy"alt={""}
                      src={OnSite}
                      height={28}
                      width={28}
                      alt="example"
                    />
                    <p>{onsite}</p>
                  </TimerDiv>
                )}
              </CourseDurationRow>
              <Divider />
              <PriceRow>
                <PriceDiv>
                  {paidFree === "Paid" ? (
                    <>
                      <p className="sar">{sar}</p>&nbsp;
                      {name === "courses" ? (
                        <p>
                          {MinPrice === 0 ? (
                            <>
                              {MaxPrice} - {MaxPrice}
                            </>
                          ) : (
                            <>
                              {MinPrice} - {MaxPrice}
                            </>
                          )}
                        </p>
                      ) : (
                        <p>
                          {MinPrice === 0 ? (
                            <>
                              {MaxPrice} - {MaxPrice}
                            </>
                          ) : (
                            <>
                              {MinPrice} - {MaxPrice}
                            </>
                          )}
                        </p>
                      )}
                    </>
                  ) : (
                    <p>
                      <b>{free}</b>
                    </p>
                  )}
                </PriceDiv>
                <StyledEndDiv>
                  {name === "courses" && (
                    <p
                      onClick={() => router.push(`/ar/course-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                  {name === "trainings" && (
                    <p
                      onClick={() => router.push(`/ar/training-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                  {name === "programs" && (
                    <p
                      onClick={() => router.push(`/ar/program-detail/${id}`)}
                      className="read-more"
                    >
                      {read_more}
                    </p>
                  )}
                </StyledEndDiv>
              </PriceRow>
            </Card>
          </>
        </StyledCardsDiv1>
      )}
    </StyledDiv>
  );
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

export default FeaturedCard;


const StyledDiv=styled.div`
.ant-rate-star-first{
  left: 7px !important;
}
`

const StyledCardsDiv = styled.div`
  padding: 35px 12px;
  @media (min-width: 1259px) {
    .ant-card {
      width: 250px;
      // height: 376px;
    }
  }
  @media (max-width: 1258px) {
    .ant-card {
      width: 235px;
      // height: 376px;
    }
  }
  .ant-card-cover img {
    border-radius: 23px !important;
    height: 180px !important;
    width: 100% !important;
    padding: 17px !important;
    object-fit: cover !important;
  }
  .ant-card-bordered {
    border-radius: 15px !important;
  }
  .ant-card-body {
    padding: 0px 14px 14px !important;
  }
  .ant-rate {
    color: #f8d727 !important;
    font-size: 15px !important;
  }
  .ant-btn: hover;
  .ant-divider-horizontal {
    margin-block: 5px;
  }
  .ant-divider {
    border-top: 2px solid rgba(0, 0, 0, 0.06) !important;
  }
  .ant-rate-star {
    margin-right: 4px !important;
  }
  @media (max-width: 500px) {
    .ant-card {
      width: 236px !important;
      // border: 1px solid red;
    }
    .ant-card-bordered {
      border-radius: 5px !important;
    }
    .ant-card-cover img {
      border-radius: 23px !important;
      height: 170px !important;
      width: 100% !important;
      padding: 17px !important;
    }
  }

  @media (max-width: 992px) {
    padding: 15px 12px;

    .ant-card-bordered {
      margin: auto;
    }
  }
`;

const StyledCardsDiv1 = styled.div`
  // padding: 0px 12px;
  .ant-card-cover img {
    border-radius: 23px !important;
    height: 210px !important;
    width: 100% !important;
    padding: 17px !important;
    object-fit: contain !important;
  }
  .ant-card-bordered {
    border-radius: 15px !important;
  }
  .ant-card-body {
    padding: 0px 14px 14px !important;
  }
  .ant-rate {
    color: #f8d727 !important;
    font-size: 15px !important;
  }
  .ant-btn: hover;
  .ant-divider-horizontal {
    margin-block: 5px;
  }
  .ant-divider {
    border-top: 2px solid rgba(0, 0, 0, 0.06) !important;
  }
  .ant-rate-star {
    margin-right: 4px !important;
  }
  @media (max-width: 500px) {
    width: 100%;
    .ant-card {
      width: 100% !important;
      box-shadow: 6px 6px 25px rgba(0, 0, 0, 0.09) !important;
    }
    .ant-card-bordered {
      border-radius: 5px !important;
    }

    .ant-card-cover img {
      border-radius: 0px !important;
      height: 120px !important;
      width: 100% !important;
      padding: 5px !important;
      object-position: center !important;
    }
    .ant-card-body {
      padding: 5px !important;
      padding-top: 0 !important;
    }
  }
`;

const StyledCardsP = styled.p`
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (min-width: 992px) {
    width: 300px;
  }
  @media (max-width: 991px) {
    width: 200px;
  }
`;

const FeaturedTypeDiv = styled.div`
  padding: 4px 14px;
  background-color: #fee4b7;
  color: #a87e33;
  display: flex;
  align-items: center;
  // height: 28px;
  // width: 130px;
  display: flex;
  justify-content: center;
  border-radius: 3px;
  p {
    font-size: 12px;
  }
  p {
    margin-bottom: 0px;
    text-align: center;
  }
  @media (max-width: 500px) {
    font-size: 10px;
    padding: 3px 10px;
  }
`;

const StyledEndDiv = styled.div`
  display: flex;
  justify-content: end;
  p {
    color: #a5a4a4;
  }
  &:hover {
    .read-more {
      text-decoration: underline;
      font-size: 14px;
    }
  }
  @media (max-width: 500px) {
    .read-more {
      font-size: 10px;
    }
  }
`;
const StyledEnrolledDiv = styled.div`
  display: flex;
  justify-content: end;
  align-items: center !important;
  p {
    color: #a5a4a4;
    font-size: 14px;
    margin-bottom: 0px;
    font-family: GESSTwoLight;
  }
  @media (max-width: 500px) {
    p {
      color: #a5a4a4;
      font-size: 10px;
    }
  }
`;

const FeaturedTypeRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const DisplayNameRow = styled.div`
  h1 {
    font-size: 18px;
    margin-bottom: 0px;
    font-weight: bold;
    width: 220px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: "GESSTwoBold", sans-serif;
    text-align: start;
  }
  @media (max-width: 500px) {
    h1 {
      min-height: 33px;
      font-size: 14px;
      margin-bottom: 3px;
      font-weight: bold;
      width: 100%;
      overflow: hidden;
      display: -webkit-box !important;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      white-space: normal;
      line-height: 16px;
      text-align: start;
    }
  }
`;

const StarRatingDiv = styled.div`
  display: flex;
  align-items: center;
  .total {
    color: #ffaa46;
    margin-inline: 7px;
  }
  span {
    margin-left: 3px !important;
  }
  .ant-rate {
    color: #ffaa46 !important;
  }
  svg {
    font-size: 12px;
  }
  p {
    margin-bottom: 0px;
    font-size: 12px;
    font-family: GESSTwoLight;
  }
`;

const CourseDurationRow = styled(Row)`
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  margin-block: 5px;
  p {
    margin-bottom: 0px;
    margin-left: 5px;
  }
`;

const TimerDiv = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-bottom: 0px;
    margin-left: 5px;
    font-size: 12px;
    color: #000;
    width: 43px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: GESSTwoLight;
  }
`;

const TimerDivSite = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-bottom: 0px;
    margin-left: 5px;
    font-size: 12px;
    color: #000;
    width: 40px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    justify-content: end;
  }
`;

const PriceRow = styled(Row)`
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
  .read-more {
    color: #a87e33;
  }
  p {
    margin-bottom: 0px;
  }
`;

const PriceDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;

  .sar {
    font-size: 10px;
    display: flex;
    align-items: end;
    margin-bottom: 3px;
    // font-weight: 700;
  }
  p {
    font-size: 15px;
    font-weight: 400;
    font-family: "GESSTwoBold", sans-serif;
  }
`;

const NameP = styled.p`
  margin-bottom: 0px;
  color: #a87e33;
  text-align: start;
`;

const StyledImageTitleDiv = styled.div``;

const StyledImageWidthFullDiv = styled.div`
  div {
    width: 100% !important;
  }
`;

const StyledCmeDiv = styled.div`
  background: #e8fff7 !important;
  border-radius: 4px !important;
  position: absolute;
  z-index: 99 !important;
  top: 30px;
  right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 5px;
  p {
    margin-bottom: 0px;
    font-family: "GESSTwoLight", sans-serif;
  }
  @media (max-width: 500px) {
    // top: 15px;
    // left: 10px;
    font-size: 10px;
    top: 6%;
    right: 9%;
  }
`;

const StyledCmeDivLearning = styled.div`
  background: #c2f2e1 !important;
  border-radius: 4px !important;
  position: absolute;
  z-index: 99 !important;
  top: 30px;
  right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 5px;
  p {
    margin-bottom: 0px;
  }
  @media (max-width: 500px) {
    top: 15px;
    left: 10px;
    font-size: 10px;
    top: 6%;
    left: 9%;
  }
`;

const StyledCmeDivLandingProgram = styled.div`
  background: #fff3df !important;
  border-radius: 4px !important;
  position: absolute;
  z-index: 99 !important;
  top: 30px;
  right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 5px;
  p {
    margin-bottom: 0px;
    font-family: GESSTwoLight;
  }
  @media (max-width: 500px) {
    top: 15px;
    left: 10px;
    font-size: 10px;
    top: 6%;
    left: 9%;
  }
`;

const StyledCmeDivLanding = styled.div`
  background: #e8fff7 !important;
  border-radius: 4px !important;
  position: absolute;
  z-index: 99 !important;
  top: 30px;
  right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 5px;
  p {
    margin-bottom: 0px;
    font-family: GESSTwoLight;
  }
  @media (max-width: 500px) {
    top: 15px;
    left: 10px;
    font-size: 10px;
    top: 6%;
    left: 9%;
  }
`;

const StyledCmeDiv1 = styled.div`
  background: #fff3df !important;
  color: #a87e33;
  border-radius: 4px !important;
  position: absolute;
  z-index: 99 !important;
  top: 30px;
  right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 5px;
  p {
    margin-bottom: 0px;
    font-family: GESSTwoLight;
  }
  @media (max-width: 500px) {
    // top: 25px !important;
    // left: 25px !important;
    font-size: 10px;
    top: 6%;
    right: 9%;
  }
`;
