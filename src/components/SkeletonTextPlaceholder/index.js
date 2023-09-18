import React from "react";
import styled from "styled-components";

const SkeletonTextPlaceholder = ({ width, height, borderRadius }) => {
  return (
    <>
      <SkeletonTextPlaceholderdiv
        style={{
          width: `${width}`,
          height: `${height}`,
          borderRadius: `${borderRadius}`,
        }}
      ></SkeletonTextPlaceholderdiv>
    </>
  );
};

export default SkeletonTextPlaceholder;

const SkeletonTextPlaceholderdiv = styled.span`
  position: relative;
  display: inline-block;
  height: 10px;
  background-color: rgba(0, 0, 0, 0.03);
  border-radius: 2px;
  overflow: hidden;

  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: -300px;
    width: 300px;
    height: 100%;
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.2) 20%,
      rgb(216 216 216 / 50%) 60%,
      rgba(255, 255, 255, 0)
    );
    -webkit-animation: shimmer 3s infinite;
    animation: shimmer 3s infinite;
  }

  @keyframes shimmer {
    100% {
      left: 100%;
    }
  }
`;
