import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import Header from "../src/components/adminLayoutHeader";
import styled from "styled-components";
import endpoints from "../src/api";
import { Col, DatePicker, Empty, Input, Row, Select, Tabs } from "antd";

import {
  R2Favicon,
} from "../images";
import Preloader from "../public/images/Preloader.gif";
import NextRelease from "../public/images/NextRelease.svg";
import { useSelector } from "react-redux";
import router from "next/router";
import { getCookies } from "../src/helpers/cookie";

const dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectItem, setSelectItem] = useState("");

  const authToken = getCookies("token");
  const userStatus = getCookies("userStatus");
  const [isAuthorized, setAuthorized] = useState(false);
  useLayoutEffect(() => {
    if (authToken === undefined) {
      router.push("/sign-in");
    } else if (userStatus === undefined || userStatus === "false") {
      router.push("/");
    } else if(authToken || userStatus === "true") {
      setAuthorized(true);
    }
  }, []);

  return (
    <>
      {isAuthorized ? (
        <div className="container">
          <Head>
            <title>Riyadh Second Health Cluster</title>
            <link rel="icon" href={R2Favicon} />
          </Head>
          <body>
            <Header
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              selectItem={selectItem}
              setSelectItem={setSelectItem}
              name={""}
            >
              <Row gutter={[15, 15]}>
                <Col span={24}>
                    <EmptyData>
                        <img loading="lazy"src={NextRelease?.src} />
                    </EmptyData>
                </Col>
              </Row>
            </Header>
          </body>
        </div>
      ) : (
        <>
          <img loading="lazy"className="pre-loader" src={Preloader.src} />
        </>
      )}
    </>
  );
};

export default dashboard;

const EmptyData = styled.div`
    width: 100%;
    min-height: 80vh;
    padding: 20px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;

    img {
        max-width: 50%;
    }
`;