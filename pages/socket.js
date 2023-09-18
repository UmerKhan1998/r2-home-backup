import React,{ useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import SocketComponent from "../src/components/SocketComponent";

import {
  CardImg,
  R2Favicon,
  Service,
} from "../images";

const ServiceRequest = () => {
return (
    <div className="container">
      <Head>
        <title>Riyadh Second Health Cluster</title>
        <link rel="icon" href={R2Favicon} />
      </Head>
      <body>
        <SocketComponent userMatchId={"123456"}/>
      </body>
    </div>
  );
};

export default ServiceRequest;
