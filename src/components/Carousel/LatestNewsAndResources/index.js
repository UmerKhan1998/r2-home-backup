import React from "react";
import Carousel from "react-elastic-carousel";
import styled from "styled-components";
import {
  CmeHours,
  Interns,
  OnlineCoursesCompleted,
  StudentsTrained,
} from "../../../../images";
import LatestNewsCard from "../../Cards/LatestNewsCard";

const LatestNewsAndResources = ({ FeaturedLatestNewsCarousalData, name }) => {
  return (
    <StyledCarousel
      focusOnSelect={true}
      breakPoints={[
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 3, itemsToScroll: 3, pagination: false },
        { width: 850, itemsToShow: 3 },
        { width: 1150, itemsToShow: 3, itemsToScroll: 3 },
        { width: 1450, itemsToShow: 3 },
        { width: 1750, itemsToShow: 3 },
      ]}
    >
      {FeaturedLatestNewsCarousalData?.map((items, index) => (
        <LatestNewsCard
          id={items?.id}
          ThumbnailImage={items?.thumbnailImage_EN}
          FeaturedType={items?.departmentName}
          CourseName={items?.title_EN}
          Description={items?.body_EN}
          name={name}
          key={index}
        />
      ))}
    </StyledCarousel>
  );
};

export default LatestNewsAndResources;

const StyledCarousel = styled(Carousel)`
  .rec-dot {
    display: none !important;
  }

  .rec-arrow-left {
    background: #ffffff;
    box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    &:hover {
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
