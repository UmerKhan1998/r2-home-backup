import React from "react";
import { Col, Row } from "antd";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import styled from "styled-components";

const MobileTopRealEstateCarousel = ({ FeaturedCoursesCarousalData }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 767 },
      items: 1,
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
        autoPlay={false}
        autoPlaySpeed={4000}
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
          ></Col>
        ))}
      </Carousel>
    </StyledDiv>
  );
};

export default MobileTopRealEstateCarousel;

const StyledDiv = styled.div`
  display: flex !important;
  justify-content: center !important;
  .col-padding {
    padding: 0px 15%;
  }

  .react-multi-carousel-list {
    width: 250px !important;
  }

  @media (max-width: 991px) {
    .react-multi-carousel-list {
      position: initial;
    }
  }
`;

const ContentBg = styled.div`
  font-size: 24px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  backdrop-filter: blur(20px);
  padding: 5px 20px;
  margin-top: -46px;
`;
