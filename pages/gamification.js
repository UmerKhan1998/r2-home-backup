import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import Header from "../src/components/adminLayoutHeader";
import styled from "styled-components";
import TimeLineComp from "../src/components/Timeline";
import endpoints from "../src/api";
import SkeletonTextPlaceholder from "../src/components/SkeletonTextPlaceholder";

import { Col, Empty, Row } from "antd";
import Preloader from "../public/images/Preloader.gif";
import Rolling from "../public/images/Rolling.gif";

import moment from "moment";
import { R2Favicon, User } from "../images";
import { getCookies } from "../src/helpers/cookie";
import router from "next/router";
import { useSelector } from "react-redux";

const EditTax = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectItem, setSelectItem] = useState("gamification");
  const userDataState = useSelector((state) => state?.userDataReducer);

  const authToken = getCookies("token");
  const userStatus = getCookies("userStatus");
  const [isAuthorized, setAuthorized] = useState(false);
  useLayoutEffect(() => {
    if (authToken === undefined) {
      router.push("/sign-in");
    } else if (userStatus === undefined || userStatus === "false") {
      router.push("/");
    } else if (authToken || userStatus === "true") {
      setAuthorized(true);
    }
  }, []);

  const [getDashboardGamificationLoading, setGetDashboardGamificationLoading] = useState();
  const [getDashboardGamification, setGetDashboardGamification] = useState();

  const GetDashboardGamificationFunc = async () => {
    setGetDashboardGamificationLoading(true)
    try {
      const response = await endpoints.GetDashboardGamification(authToken);
      if (response?.data?.statusCode === "200") {
        setGetDashboardGamification(response?.data?.data);
        setGetDashboardGamificationLoading(false)
      } else {
        setGetDashboardGamification(response?.data);
        setGetDashboardGamificationLoading(false)
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  useLayoutEffect(() => {
    GetDashboardGamificationFunc();
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
            <StyledDiv>
              <Header
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                selectItem={selectItem}
                setSelectItem={setSelectItem}
                name={""}
              >
                <Row gutter={[24, 24]}>
                  <Col span={24}>
                    <MainHeading>My Gamification</MainHeading>
                  </Col>
                </Row>
                {getDashboardGamificationLoading ? (
                  <Col span={24}>
                    <EmptyData>
                      <div style={{ textAlign: "center", paddingBlock: "40px" }}>
                        <img loading="lazy"src={Rolling.src} width="40px" height="40px" />
                      </div>
                    </EmptyData>
                  </Col>
                ) : (
                  <>
                    {(getDashboardGamification?.statusCode === "404") ? (<>
                      <Col span={24}>
                        <EmptyData>
                          <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={"No Record Found!"}
                          />
                        </EmptyData>
                      </Col>
                    </>) : (<>
                      <Row gutter={[12, 12]}>
                        <Col span={24}>
                          <StyledBadgesLevelRow>
                            <h2>
                              {" "}
                              <b>Recent Badges</b>{" "}
                            </h2>
                          </StyledBadgesLevelRow>
                        </Col>
                        {getDashboardGamification?.map((item, index) => (
                          <>
                            {index < 3 && (
                              <Col span={24} sm={12} md={8}>
                                <StyledBadgeCardDiv>
                                  <img loading="lazy"height="50" src={item?.imageUrl} />
                                  <p
                                    style={{
                                      color: "#a87e33",
                                      marginBottom: 0,
                                      marginTop: 10,
                                      fontSize: "12px",
                                    }}
                                  >
                                    {" "}
                                    Badge{" "}
                                  </p>
                                  <p className="title">
                                    <b>{item?.gamificationTitle_EN}</b>
                                  </p>
                                  <p className="complete_date">
                                    Completed on{" "}
                                    {moment(item?.insertDate).format(
                                      "MMMM DD, YYYY"
                                    )}
                                  </p>
                                </StyledBadgeCardDiv>
                              </Col>
                            )}
                          </>
                        ))}
                      </Row>
                      <Row gutter={[12, 12]}>
                        <Col span={24}>
                          <StyledBadgesLevelRow>
                            <h2>
                              {" "}
                              <b>Badges & Levels Statistics</b>{" "}
                            </h2>
                          </StyledBadgesLevelRow>
                        </Col>
                        <Col span={24}>
                          <StyledBadgesHistoryDiv>
                            <StyledBadgeUserDiv>
                              {userDataState?.photoUrl === undefined ? (
                                <img loading="lazy"src={User} width="70px" height="70px" />
                              ) : (
                                <>
                                  {userDataState?.photoUrl === "" ? (
                                    <img loading="lazy"src={User} width="70px" height="70px" />
                                  ) : (
                                    <img
                                      src={userDataState?.photoUrl}
                                      width="70px"
                                      height="70px"
                                    />
                                  )}
                                </>
                              )}
                              <div className="user-info">
                                <h1>
                                  {userDataState?.firstName_EN === undefined ? (
                                    <SkeletonTextPlaceholder
                                      width="150px"
                                      height="18px"
                                    />
                                  ) : (
                                    <>
                                      {userDataState?.firstName_EN}{" "}
                                      {userDataState?.lastName_EN}
                                    </>
                                  )}
                                </h1>
                                <p>Student</p>
                              </div>
                            </StyledBadgeUserDiv>
                            <BadgesTimeline>
                              <TimeLineComp data={getDashboardGamification} />
                            </BadgesTimeline>
                          </StyledBadgesHistoryDiv>
                        </Col>
                      </Row>
                    </>)}
                  </>
                )}
              </Header>
            </StyledDiv>
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

export default EditTax;

const MainHeading = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  font-family: "TitilliumNormal", sans-serif;
`;

const StyledDiv = styled.div`
  .ant-upload {
    width: 100% !important;
  }
  .ant-picker {
    width: 100% !important;
  }
`;

const BadgesTimeline = styled.div`
  overflow: auto;

  ::-webkit-scrollbar {
    height: 2px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(16, 95, 67, 0.6);
  }
`;

const StyledBadgeCardDiv = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  height: 100%;

  .complete_date {
    color: #aeaeae;
    margin-bottom: 0px;
    font-size: 12px;
  }
  .title {
    margin-block: 5px;
    font-size: 16px;
    font-family: "TitilliumNormal", sans-serif;
  }
`;

const StyledBadgesLevelRow = styled(Row)`
  margin-top: 20px;
  h2 {
    font-size: 16px;
    font-family: "TitilliumSemiBold";
  }
`;

const StyledBadgesHistoryDiv = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
`;

const StyledBadgeUserDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;

  .ant-badge {
    margin-right: 15px;
  }

  .ant-avatar.ant-avatar-circle {
    width: 70px !important;
    height: 70px !important;
    line-height: 60px !important;
    position: relative;
    box-shadow: 5px 4px 4px 0 rgba(0, 0, 0, 0.06);
    padding: 6px;

    img {
      border-radius: 100%;
    }
  }

  .user-info {
    margin-left: 10px;
  }
  h1 {
    font-family: "TitilliumNormal", sans-serif;
    font-weight: 800;
    margin-bottom: 0px;
  }
  p {
    font-family: "TitilliumNormal", sans-serif;
    margin-bottom: 0px;
  }
`;
const EmptyData = styled.div`
  width: 100%;
  height: auto;
  border-radius: 8px;
  background: #fff;
  padding: 10px;
`;
