import React from "react";
import styled from "styled-components";

//next.config
import MobileTopRealEstateCarousel from "./MobileTopRealEstateCarousel";
import TopRealEstateCarousel from "./TopRealEstateCarousel";

const RealEstateMarketCarousal = ({ RealEstateMarketCarousalData }) => {
  return (
    <HeroContainer>
      <HeroContent>
        <HeroH1>Discover more about the UAE real estate market</HeroH1>
        <StyledDiv>
          <DesktopDiv>
            <TopRealEstateCarousel
              RealEstateMarketCarousalData={RealEstateMarketCarousalData}
            />
          </DesktopDiv>
          <MobileDiv>
            <MobileTopRealEstateCarousel
              RealEstateMarketCarousalData={RealEstateMarketCarousalData}
            />
          </MobileDiv>
        </StyledDiv>
      </HeroContent>
    </HeroContainer>
  );
};

export default RealEstateMarketCarousal;

const DesktopDiv = styled.div`
  @media (max-width: 991px) {
    display: none;
  }
`;

const MobileDiv = styled.div`
  @media (min-width: 992px) {
    display: none;
  }
`;

const HeroContainer = styled.div`
  background: #fff;
  display: flex;
  justify-content: center;
  padding: 0 30px;
  // height: 103vh;
  height: 500px;
  position: relative;
  z-index: 1;
  align-items: center;
  width: 100%;
`;

const HeroContent = styled.div`
  z-index: 3;
  min-width: 80%;
  position: absolute;
  display: flex;
  flex-direction: column;
  @media (min-width: 992px) {
    padding: 8px 24px;
  }
`;

const HeroH1 = styled.h1`
  color: #333333;
  font-size: 42px;
  text-align: center;
  margin-bottom: 0px !important;
  // @media screen and (max-height: 650px) {
  //   display: none;
  // }
`;

const HeroP = styled.p`
  color: #333333;
  font-size: 14px;
  text-align: center;
  // @media screen and (max-height: 650px) {
  //   display: none;
  // }
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
`;
