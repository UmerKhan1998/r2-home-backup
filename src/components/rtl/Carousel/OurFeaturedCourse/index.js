import React from "react";
import Carousel from "react-elastic-carousel";
import styled from "styled-components";
import { CardImg1, CardImg2, CardImg3 } from "../../../../../images";

import FeaturedCard from "../../../rtl/Cards/FeaturedCard";
import SkeletonComp from "../../../rtl/Skeleton";
import { Empty } from "antd";
import { No_Data } from "../../../../helpers/LanguageConstant";

const OurFeaturedCourse = ({ featuredCourseRecord, name, page }) => {
  return (
    <>
      {name === "courses" && (
        <>
          {featuredCourseRecord?.length === 0 ? (
            // <div style={{width: "100%"}}>
            //   <Empty description={No_Data} />
            // </div>
            <SkeletonCompContainer>
              {[1, 2, 3, 4]?.map((item, index) => (
                <SkeletonComp key={index} page={"home-page"} Img={CardImg1} />
              ))}
            </SkeletonCompContainer>
          ) : (
            <StyledCarousel
              focusOnSelect={true}
              breakPoints={[
                { width: 1, itemsToShow: 1 },
                { width: 480, itemsToShow: 2 },
                { width: 750, itemsToShow: 3 },
                { width: 992, itemsToShow: 4 },
              ]}
            >
              {featuredCourseRecord?.map((items,index) => (
                <FeaturedCard
                  id={items?.id}
                  key={index}
                  Img={CardImg1}
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
                  name={name}
                  page={page}
                />
              ))}
            </StyledCarousel>
          )}
        </>
      )}
      {name === "academic-studies" && (
        <>
          {featuredCourseRecord?.length === 0 ? (
            <div style={{width: "100%"}}>
              <Empty description={No_Data} />
            </div>
            // <SkeletonCompContainer>
            //   {[1, 2, 3]?.map((item, index) => (
            //     <SkeletonComp key={index} page={"home-page"} Img={CardImg1} />
            //   ))}
            // </SkeletonCompContainer>
          ) : (
            <StyledCarousel
              focusOnSelect={true}
              breakPoints={[
                { width: 1, itemsToShow: 1 },
                { width: 480, itemsToShow: 2 },
                { width: 750, itemsToShow: 3 },
                { width: 992, itemsToShow: 4 },
              ]}
            >
              {featuredCourseRecord?.map((items,index) => (
                <FeaturedCard
                  id={items?.id}
                  key={index}
                  Img={CardImg1}
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
                  name={name}
                  page={page}
                />
              ))}
            </StyledCarousel>
          )}
        </>
      )}
      {name === "trainings" && (
        <>
          {featuredCourseRecord?.length === 0 ? (
            <SkeletonCompContainer>
              {[1, 2, 3, 4]?.map((item, index) => (
                <SkeletonComp key={index} page={"home-page"} Img={CardImg1} />
              ))}
            </SkeletonCompContainer>
          ) : (
            <StyledCarousel
              focusOnSelect={true}
              breakPoints={[
                { width: 1, itemsToShow: 1 },
                { width: 300, itemsToShow: 2 },
                { width: 750, itemsToShow: 3 },
                { width: 992, itemsToShow: 4 },
              ]}
            >
              {featuredCourseRecord?.map((items,index) => (
                <FeaturedCard
                  id={items?.id}
                  key={index}
                  Img={CardImg3}
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
                  name={name}
                  page={page}
                />
              ))}
            </StyledCarousel>
          )}
        </>
      )}
      {name === "programs" && (
        <>
          {featuredCourseRecord?.length === 0 ? (
            <SkeletonCompContainer>
              {[1, 2, 3, 4]?.map((item, index) => (
                <SkeletonComp key={index} page={"home-page"} Img={CardImg1} />
              ))}
            </SkeletonCompContainer>
          ) : (
            <StyledCarousel
              focusOnSelect={true}
              breakPoints={[
                { width: 1, itemsToShow: 1 },
                { width: 300, itemsToShow: 2 },
                { width: 750, itemsToShow: 3 },
                { width: 992, itemsToShow: 4 },
              ]}
            >
              {featuredCourseRecord?.map((items,index) => (
                <FeaturedCard
                  id={items?.id}
                  key={index}
                  Img={CardImg2}
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
                  name={name}
                  page={page}
                />
              ))}
            </StyledCarousel>
          )}
        </>
      )}
      {/* {name === "trainings" &&
        <StyledCarousel
          focusOnSelect={true}
          breakPoints={[
            { width: 1, itemsToShow: 1 },
            { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
            { width: 850, itemsToShow: 3 },
            { width: 1150, itemsToShow: 4, itemsToScroll: 2 },
            { width: 1450, itemsToShow: 5 },
            { width: 1750, itemsToShow: 6 },
          ]}
        >
          {featuredCourseRecord?.map((items) => (
            <FeaturedCard
              id={items?.id}
              Img={CardImg3}
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
              name={name}
              page={page}
            />
          ))}
        </StyledCarousel>
      }
      {name === "programs" &&
        <StyledCarousel
          focusOnSelect={true}
          breakPoints={[
            { width: 1, itemsToShow: 1 },
            { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
            { width: 850, itemsToShow: 3 },
            { width: 1150, itemsToShow: 4, itemsToScroll: 2 },
            { width: 1450, itemsToShow: 5 },
            { width: 1750, itemsToShow: 6 },
          ]}
        >
          {featuredCourseRecord?.map((items) => (
            <FeaturedCard
              id={items?.id}
              Img={CardImg2}
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
              name={name}
              page={page}
            />
          ))}
        </StyledCarousel>
      } */}
    </>
  );
};

export default OurFeaturedCourse;

const StyledCarousel = styled(Carousel)`
  .rec-dot {
    display: none !important;
  }
  .rec-slider-container {
    margin: 0px !important;
  }
  // @media (max-width: 384px) {
  //   .rec-item-wrapper {
  //     width: 100% !important;
  //   }
  // }
  .rec-arrow-left {
    background: #ffffff;
    box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    margin-left: 8px !important;
    &:hover {
      background: #ffffff !important;
      box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.15) !important;
      border-radius: 8px !important;
      color: #000 !important;
    }
    &:hover:enabled,
    &:focus:enabled {
      background: #ffffff !important;
      box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.15) !important;
      border-radius: 8px !important;
      color: #000 !important;
    }
  }
  .rec-arrow-right {
    background: #ffffff !important;
    box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.15) !important;
    border-radius: 8px !important;
    color: #000 !important;
    margin-right: 8px !important;
  }
`;

const SkeletonCompContainer = styled.div`
  display: flex;
  justify-content: center;
  @media screen and (max-width: 1100px) {
    > div:nth-child(1) {
      display: none;
    }
  }
  @media screen and (max-width: 800px) {
    > div:nth-child(1) {
      display: none;
    }
    > div:nth-child(2) {
      display: none;
    }
  }
  @media screen and (max-width: 500px) {
    > div:not(:last-child) {
      display: none;
    }
  }
`;
