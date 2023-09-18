import React from "react";
import { Col, Row } from "antd";
// import Carousel from 'react-elastic-carousel';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import FeaturedCard from "../Cards/FeaturedCard";

import styled from "styled-components";
const StyledDiv = styled.div`
  .col-padding {
    padding: 0px 35%;
  }

  .react-multi-carousel-list {
    width: 1245px !important;
  }

  .react-multiple-carousel__arrow {
    background-color: #fff !important;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px !important;
  }

  .react-multiple-carousel__arrow::before {
    color: #000 !important;
  }

  .react-multiple-carousel__arrow {
    border-radius: 5px !important;
    box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.15) !important;
  }

  @media (max-width: 767px) {
    .react-multi-carousel-list {
      position: initial;
    }
  }

  @media (min-width: 992px) {
    .react-multi-carousel-item {
      width: 335px !important;
      // margin-left: 40px;
    }
  }
`;

const FeaturedCoursesCarousel = ({ FeaturedCoursesCarousalData }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 767 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 767, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <StyledDiv>
      <Carousel
        // style={{ width: "1000px" }}
        ssr={true}
        partialVisbile={true}
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={responsive}
        // ssr={true} // means to render carousel on server-side.
        infinite={true}
        // autoPlay={true}
        // autoPlaySpeed={4000}
        keyBoardControl={true}
        customTransition="all 1s"
        transitionDuration={500}
        slidesToSlide={true}
        itemClass="item-class"
      >
        {FeaturedCoursesCarousalData.map((items, index) => (
          <Col
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              //   height: "60vh",
              marginBottom: "10px",
              alignItems: "center",
            }}
          >
            <FeaturedCard
              Img={items?.image}
              FeaturedType={items?.featured_type}
              EnrolledStudents={items?.enrolled_students}
              CourseName={items?.course_name}
              Time={items?.time}
              Rating={items?.rating}
              TotalRatings={items?.total_ratings}
              Price={items?.price}
            />
          </Col>
        ))}
      </Carousel>
    </StyledDiv>
  );
};

export default FeaturedCoursesCarousel;
