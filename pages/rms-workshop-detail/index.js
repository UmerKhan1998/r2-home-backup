import React from "react";
import Head from "next/head";
import { R2Favicon, NotFoundPage, NotFoundPageArabic } from "../../images";
import Header from "../../src/components/header";
import RtlHeader from "../../src/components/rtl/header";
import Footer from "../../src/components/footer";
import RtlFooter from "../../src/components/rtl/footer";
import styled from "styled-components";
import Image from "next/image";
import { getCookies } from "../../src/helpers/cookie";

const PageNotFound = () => {
  const notFound = getCookies("notFoundArabic");
  //console.log("notFound--->", typeof notFound);

  return (
    <div>
      <Head>
        <title>Riyadh Second Health Cluster</title>
        <link rel="icon" href={R2Favicon} />
      </Head>
      <body>
        {notFound === "false" ? (
          <>
            <Header />
            <StyledDiv>
              <img loading="lazy"alt={""} src={NotFoundPage} height={370} width={500} />
            </StyledDiv>
            <Footer />
          </>
        ) : (
          <>
            <RtlHeader />
            <StyledDiv>
              <img loading="lazy"alt={""} src={NotFoundPageArabic} height={1000} width={500} />
            </StyledDiv>
            <RtlFooter />
          </>
        )}
      </body>
    </div>
  );
};

export default PageNotFound;

const StyledDiv = styled.div`
  padding-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 700px;
`;
