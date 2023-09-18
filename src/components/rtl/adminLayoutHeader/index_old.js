import React, { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Col, Layout, Modal, Row, Tooltip } from "antd";
const { Header, Content, Sider } = Layout;
import styled from "styled-components";
import { AiOutlineRight } from "react-icons/ai";
import { BsDash } from "react-icons/bs";
import router from "next/router";
import {
  Logo,
  BellIcon,
  BlackDashboardIcon,
  GamificationIcon,
  MyAccountSettingsIcon,
  MyLearningIcon,
  MyLearningPathIcon,
  MyProfileIcon,
  RegisterInstructorIcon,
  SignOutIcon,
} from "../../../images";
import moment from "moment";
import CustomButton from "../Button";

const App = ({
  collapsed,
  setCollapsed,
  selectItem,
  setSelectItem,
  children,
  name,
}) => {
  const siderBarMenuArr = [
    {
      icon: BlackDashboardIcon,
      link: "dashboard",
      label: "My Dashboard",
    },
    {
      icon: MyLearningIcon,
      label: "My Learning",
      sub_menu_arr: [
        { title: "Courses", link: "courses" },
        { title: "Attendance", link: "attendance" },
        { title: "Assessments", link: "course-assessments" },
        { title: "Certificate", link: "course-certificates" },
        { title: "Surveys", link: "surveys" },
        { title: "Receipt", link: "course-payment-receipts" },
      ],
    },
    {
      icon: MyLearningPathIcon,
      label: "My Learning Paths",
      sub_menu_arr: [
        { title: "Current", link: "current-learning-path" },
        { title: "Past", link: "" },
        { title: "App", link: "" },
      ],
    },
    {
      icon: MyProfileIcon,
      label: "My Profile",
      sub_menu_arr: [
        { title: "Learning Transcript", link: "learning-transcript" },
        { title: "Reminders Settings", link: "" },
        { title: "Notification  Setting", link: "notification-setting" },
        { title: "Wishlist", link: "wishlist" },
      ],
    },
    {
      icon: GamificationIcon,
      label: "My Gamification",
      link: "gamification",
    },
    {
      icon: MyAccountSettingsIcon,
      label: "My Account Setting",
      link: "manage-profile",
    },
    {
      icon: RegisterInstructorIcon,
      label: "Register as an Instructor",
      link: "",
    },
    {
      icon: SignOutIcon,
      link: "dashboard",
      label: "Sign Out",
    },
  ];

  const today = moment();

  const [collapseIndex, setCollapseIndex] = useState(false);

  //console.log("collapseIndex", collapseIndex);

  //console.log("today", moment(today?._d).format("hh:m a"));

  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [languageState, setLanguageState] = useState("English");
  const languageArr = ["English", "Arabic"];

  const showLanguageModal = () => {
    setIsLanguageModalOpen(true);
  };
  const closeLanguageModal = () => {
    setIsLanguageModalOpen(false);
  };

  const [notificationDropdown, setNotificationDropdown] = useState("");

  return (
    <>
      <StyledMainHeaderDiv>
        <Row>
          <MainMenuCol span={24}>
            <AdminLogoDiv>
              <div>
                <StyledSiderMenuUpDiv>
                  <LearnerDashboardLogo>
                    <StyledAdminLogoImg src={Logo} />
                  </LearnerDashboardLogo>
                  <PageDiv>
                    {React.createElement(
                      collapsed ? MenuOutlined : MenuOutlined,
                      {
                        className: "trigger",
                        onClick: () => setCollapsed(!collapsed),
                      }
                    )}

                    <PageTitleP>
                      <b>{name}</b>
                    </PageTitleP>
                  </PageDiv>
                </StyledSiderMenuUpDiv>
              </div>

              <StyledSideMenuDiv>
                <StyledUserImgDiv>
                  <img
                    src={
                      "https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2019/12/9-Best-Online-Avatars-and-How-to-Make-Your-Own-for-Free-image1-5.png"
                    }
                  />
                </StyledUserImgDiv>
                <StyledLanguageMenuDiv onClick={showLanguageModal}>
                  <div>
                    <img
                      src={
                        "https://img.freepik.com/free-vector/illustration-usa-flag_53876-18165.jpg"
                      }
                    />
                  </div>
                  <p>English</p>
                </StyledLanguageMenuDiv>

                <NotityDropDown>
                  <StyledBellDiv
                    onClick={() => {
                      notificationDropdown === ""
                        ? setNotificationDropdown("show")
                        : setNotificationDropdown("");
                    }}
                  >
                    <img loading="lazy"src={BellIcon} />
                    <StyledCountDiv>
                      <p>14</p>
                    </StyledCountDiv>
                  </StyledBellDiv>
                  <div class={`notification-dropdown ${notificationDropdown}`}>
                    <div class="notification-dropdown-header">
                      <h3>Notifications</h3>
                      <a href="">Mark all as read</a>
                    </div>
                    <div class="notification-dropdown-body">
                      <div class="notification-list">
                        <div
                          class="notification-list-item"
                          style={{ background: "#F5F5F5" }}
                        >
                          <div class="img">
                            <img loading="lazy"src={MyProfileIcon} width="30px" alt="" />
                          </div>
                          <div class="text">
                            <h4>
                              Sehrish Hayat made an notification: Join me Live
                              on Zoom
                            </h4>
                            <span>Yesterday at 11:24 PM</span>
                          </div>
                          <div class="status">
                            <span
                              class="status-badge"
                              style={{ background: "#FFCFCF" }}
                            >
                              Webinar
                            </span>
                            <span class="status-point"></span>
                          </div>
                        </div>
                        <div class="notification-list-item">
                          <div class="img">
                            <img loading="lazy"src={MyProfileIcon} width="30px" alt="" />
                          </div>
                          <div class="text">
                            <h4>Recent Achievement</h4>
                            <span>Yesterday at 11:24 PM</span>
                          </div>
                          <div class="status"></div>
                        </div>
                        <div
                          class="notification-list-item"
                          style={{ background: "#F5F5F5" }}
                        >
                          <div class="img">
                            <img loading="lazy"src={MyProfileIcon} width="30px" alt="" />
                          </div>
                          <div class="text">
                            <h4>
                              Imran Akbar made an notification: Course updated!
                            </h4>
                            <span>Yesterday at 11:24 PM</span>
                          </div>
                          <div class="status">
                            <span
                              class="status-badge"
                              style={{ background: "#E1CFFF" }}
                            >
                              Course
                            </span>
                            <span class="status-point"></span>
                          </div>
                        </div>
                        <div class="notification-list-item">
                          <div class="img">
                            <img loading="lazy"src={MyProfileIcon} width="30px" alt="" />
                          </div>
                          <div class="text">
                            <h4>New comment for your class</h4>
                            <span>Yesterday at 11:24 PM</span>
                          </div>
                          <div class="status"></div>
                        </div>
                        <div
                          class="notification-list-item"
                          style={{ background: "#F5F5F5" }}
                        >
                          <div class="img">
                            <img loading="lazy"src={MyProfileIcon} width="30px" alt="" />
                          </div>
                          <div class="text">
                            <h4>New comment for your class</h4>
                            <span>Yesterday at 11:24 PM</span>
                          </div>
                          <div class="status">
                            <span class="status-point"></span>
                          </div>
                        </div>
                        <div
                          class="notification-list-item"
                          style={{ background: "#F5F5F5" }}
                        >
                          <div class="img">
                            <img loading="lazy"src={MyProfileIcon} width="30px" alt="" />
                          </div>
                          <div class="text">
                            <h4>New comment for your class</h4>
                            <span>Yesterday at 11:24 PM</span>
                          </div>
                          <div class="status">
                            <span class="status-point"></span>
                          </div>
                        </div>
                      </div>
                      <a href="" class="all-notification-btn">
                        View All{" "}
                        <span>
                          <svg
                            width="8"
                            height="12"
                            viewBox="0 0 6 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 5L5.35355 4.64645L5.70711 5L5.35355 5.35355L5 5ZM1.35355 0.646447L5.35355 4.64645L4.64645 5.35355L0.646447 1.35355L1.35355 0.646447ZM5.35355 5.35355L1.35355 9.35355L0.646447 8.64645L4.64645 4.64645L5.35355 5.35355Z"
                              fill="#105F43"
                            />
                          </svg>
                        </span>
                      </a>
                    </div>
                  </div>
                </NotityDropDown>
              </StyledSideMenuDiv>
            </AdminLogoDiv>
          </MainMenuCol>
        </Row>
        <StyledHeaderDiv>
          <MenuDiv>
            {siderBarMenuArr?.map((item, index) => (
              <>
                {selectItem === item?.label ? (
                  <StyledDropDownCollapseDiv
                    onClick={() => {
                      if (collapseIndex === false) {
                        setCollapseIndex(true);
                      } else {
                        setCollapseIndex(false);
                      }
                    }}
                  >
                    <>
                      {item?.sub_menu_arr?.length > 0 ? (
                        <Tooltip title={item?.label}>
                          <StyledCollapseProminentMenudiv>
                            <img loading="lazy"src={item?.icon} />
                          </StyledCollapseProminentMenudiv>
                        </Tooltip>
                      ) : (
                        <Tooltip title={item?.label}>
                          {item?.sub_menu_arr?.length > 0 ? (
                            <StyledCollapseProminentMenudiv>
                              <img loading="lazy"src={item?.icon} />
                            </StyledCollapseProminentMenudiv>
                          ) : (
                            <>
                              {item?.label === "Sign Out" ? (
                                <StyledCollapseProminentMenuSignOutDiv>
                                  <img loading="lazy"src={item?.icon} />
                                </StyledCollapseProminentMenuSignOutDiv>
                              ) : (
                                <StyledCollapseProminentMenudiv>
                                  <img loading="lazy"src={item?.icon} />
                                </StyledCollapseProminentMenudiv>
                              )}
                            </>
                          )}
                        </Tooltip>
                      )}
                    </>
                    {collapseIndex ||
                      collapsed === false ||
                      (item?.sub_menu_arr?.length > 0 && (
                        <StyledDropdownMenuCollapseContent>
                          {item?.sub_menu_arr?.map((item, index) => (
                            <StyledSubLinkDiv
                              onClick={() => router.push(`/${item?.link}`)}
                            >
                              <BsDash />
                              <p key={index}>{item?.title}</p>
                            </StyledSubLinkDiv>
                          ))}
                        </StyledDropdownMenuCollapseContent>
                      ))}
                  </StyledDropDownCollapseDiv>
                ) : (
                  <>
                    <Tooltip title={item?.label}>
                      {item?.sub_menu_arr?.length > 0 ? (
                        <NonProminentMenudiv
                          onClick={() => {
                            setSelectItem(item?.label);
                          }}
                        >
                          <img loading="lazy"src={item?.icon} />
                        </NonProminentMenudiv>
                      ) : (
                        <>
                          {item?.label === "Sign Out" ? (
                            <NonProminentMenuSignOutdiv
                              onClick={() => {
                                setSelectItem(item?.label);
                                router.push(`/${item?.link}`);
                              }}
                            >
                              <img loading="lazy"src={item?.icon} />
                            </NonProminentMenuSignOutdiv>
                          ) : (
                            <NonProminentMenudiv
                              onClick={() => {
                                setSelectItem(item?.label);
                                router.push(`/${item?.link}`);
                              }}
                            >
                              <img loading="lazy"src={item?.icon} />
                            </NonProminentMenudiv>
                          )}
                        </>
                      )}
                    </Tooltip>
                  </>
                )}
              </>
            ))}
          </MenuDiv>
          <StyledDiv>
            <Layout>
              <StyledSider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                  //console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                  //console.log(collapsed, type);
                }}
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={"216px"}
              >
                <MainMenuItemDiv>
                  {siderBarMenuArr?.map((item, index) => (
                    <>
                      {selectItem === item?.label ? (
                        <>
                          {item?.sub_menu_arr?.length > 0 ? (
                            <>
                              {!collapsed ? (
                                <MenuDropDownDiv>
                                  <ActiveMenuItemDiv
                                    onClick={() => {
                                      if (collapseIndex === false) {
                                        setCollapseIndex(true);
                                      } else {
                                        setCollapseIndex(false);
                                      }
                                    }}
                                  >
                                    <p>{item?.label}</p>
                                    <AiOutlineRight />
                                  </ActiveMenuItemDiv>
                                  {collapseIndex ? (
                                    <></>
                                  ) : (
                                    <StyledDropdownDiv>
                                      <StyledDropdownInnerDiv>
                                        {item?.sub_menu_arr?.map(
                                          (item, index) => (
                                            <StyledSubLinkDiv
                                              onClick={() =>
                                                router.push(`/${item?.link}`)
                                              }
                                            >
                                              <BsDash />
                                              <p key={index}>{item?.title}</p>
                                            </StyledSubLinkDiv>
                                          )
                                        )}
                                      </StyledDropdownInnerDiv>
                                    </StyledDropdownDiv>
                                  )}
                                </MenuDropDownDiv>
                              ) : (
                                <CollapseMenuDropDownDiv>
                                  <ActiveMenuItemDiv>
                                    <p>{item?.label}</p>
                                    <AiOutlineRight />
                                  </ActiveMenuItemDiv>
                                  <StyledDropdownDiv>
                                    <StyledDropdownInnerDiv>
                                      {item?.sub_menu_arr?.map(
                                        (item, index) => (
                                          <StyledSubLinkDiv
                                            onClick={() =>
                                              router.push(`/${item?.link}`)
                                            }
                                          >
                                            <BsDash />
                                            <p key={index}>{item?.link}</p>
                                          </StyledSubLinkDiv>
                                        )
                                      )}
                                    </StyledDropdownInnerDiv>
                                  </StyledDropdownDiv>
                                </CollapseMenuDropDownDiv>
                              )}
                            </>
                          ) : (
                            <>
                              {!collapsed ? (
                                <>
                                  {item?.label === "Sign Out" ? (
                                    <ActiveMenuItemSignOutDiv>
                                      <p>{item?.label}</p>
                                    </ActiveMenuItemSignOutDiv>
                                  ) : (
                                    <ActiveMenuItemDiv>
                                      <p>{item?.label}</p>
                                    </ActiveMenuItemDiv>
                                  )}
                                </>
                              ) : (
                                <>
                                  {/* <ActiveMenuItemDiv>
                                    <p>{item?.label}</p>
                                  </ActiveMenuItemDiv> */}
                                </>
                              )}
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          {item?.sub_menu_arr?.length > 0 ? (
                            <>
                              {!collapsed ? (
                                <>
                                  {item?.label === "Sign Out" ? (
                                    <MenuItemSignOutDiv
                                      onClick={() => setSelectItem(item?.label)}
                                    >
                                      <p>{item?.label}</p>
                                      <AiOutlineRight />
                                    </MenuItemSignOutDiv>
                                  ) : (
                                    <MenuItemDiv
                                      onClick={() => setSelectItem(item?.label)}
                                    >
                                      <p>{item?.label}</p>
                                      <AiOutlineRight />
                                    </MenuItemDiv>
                                  )}
                                </>
                              ) : (
                                <CollapsedMenuItemDiv
                                  onClick={() => setSelectItem(item?.label)}
                                >
                                  <p>{item?.label}</p>
                                  <AiOutlineRight />
                                </CollapsedMenuItemDiv>
                              )}
                            </>
                          ) : (
                            <>
                              {!collapsed ? (
                                <>
                                  <MenuItemDiv
                                    onClick={() => {
                                      setSelectItem(item?.label);
                                      router.push(`/${item?.link}`);
                                      //console.log("item?.link", item?.link);
                                    }}
                                  >
                                    <p>{item?.label}</p>
                                  </MenuItemDiv>
                                </>
                              ) : (
                                <>
                                  <CollapsedMenuItemDiv
                                    onClick={() => setSelectItem(item?.label)}
                                  >
                                    <p>{item?.label}</p>
                                  </CollapsedMenuItemDiv>
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  ))}
                </MainMenuItemDiv>
              </StyledSider>
              <StyledLayout>
                {!collapsed ? (
                  <Container>
                    <Content
                      className="site-layout-background"
                      style={{
                        padding: "40px 30px",
                        minHeight: 280,
                        marginTop: 45,
                      }}
                    >
                      {children}
                    </Content>
                  </Container>
                ) : (
                  <Content
                    className="site-layout-background"
                    style={{
                      padding: "40px 30px",
                      minHeight: 280,
                      marginTop: 45,
                    }}
                  >
                    {children}
                  </Content>
                )}
              </StyledLayout>
            </Layout>
          </StyledDiv>
        </StyledHeaderDiv>
      </StyledMainHeaderDiv>
      <StyledModal
        title={`Select Language`}
        open={isLanguageModalOpen}
        onOk={closeLanguageModal}
        onCancel={closeLanguageModal}
        width={480}
      >
        <StyledLanguageDiv>
          {languageArr?.map((item, index) => (
            <>
              {languageState === item ? (
                <CustomButton
                  key={index}
                  onClick={() => {
                    setIsLanguageModalOpen(false);
                    setLanguageState(item);
                  }}
                  className={"active-language-btn-english"}
                >
                  {item}
                </CustomButton>
              ) : (
                <CustomButton
                  key={index}
                  onClick={() => {
                    setIsLanguageModalOpen(false);
                    setLanguageState(item);
                  }}
                  className={"language-btn-english"}
                >
                  {item}
                </CustomButton>
              )}
            </>
          ))}
        </StyledLanguageDiv>
      </StyledModal>
    </>
  );
};

export default App;

const StyledLanguageDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  .active-language-btn-english {
    margin-bottom: 20px;
    width: 100%;
    border: 1px solid #064b33 !important;
    background: #064b33 !important;
    color: #fff !important;
    border-radius: 7px !important;
  }
  .language-btn-english {
    margin-bottom: 20px;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.7);
    border-radius: 7px !important;
  }
  .language-btn {
    margin-bottom: 20px;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.7);
    border-radius: 7px !important;
  }
`;
const StyledLayout = styled(Layout)`
  //   background: #fff !important;
`;
const StyledDiv = styled.div`
  width: 100% !important;
  .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.2);
  }

  .site-layout-sub-header-background {
    background: #fff;
  }

  .site-layout-background {
    // background: #fff;
  }

  .ant-layout {
    min-height: 100vh;
    // height: 690px !important;
    // background: #fff !important;
  }

  .ant-layout-sider {
    // background: #fff !important;
    background: transparent !important;
    height: auto !important;
  }

  .ant-menu-title-content {
    color: #000 !important;
  }

  .ant-menu.ant-menu-dark {
    background: #f8fffc !important;
  }
  .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal)
    .ant-menu-item-selected {
    background: #ffffff !important;
    width: 220px !important;
    margin-left: 10px !important;
    height: 50px !important;
    box-shadow: 8px 8px 35px rgba(0, 0, 0, 0.08) !important;
    border-radius: 8px !important;
    .ant-menu-title-content {
      margin-left: -10px !important;
    }
  }
  .ant-menu-item {
    padding-left: 34px !important;
    margin-block: 10px !important;
  }
  .ant-layout-sider-children {
    padding-top: 20px;
    background: #fff0d4 !important;
  }
`;
const StyledSider = styled(Sider)`
  padding-bottom: 35px;
`;
const MainMenuItemDiv = styled.div`
  margin-top: 65px;
`;
const MenuItemDiv = styled.div`
  padding-inline: 15px;
  margin-inline: 15px;
  padding-block: 15px;
  display: flex;
  align-items: center;
  font-weight: 600;
  justify-content: space-between;
  cursor: pointer;
  font-family: "GESSTwoLight", sans-serif;
  p {
    margin-bottom: 0px;
  }
`;
const MenuItemSignOutDiv = styled.div`
  padding-inline: 15px;
  margin-inline: 15px;
  background-color: #0c5439;
  padding-block: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  p {
    margin-bottom: 0px;
  }
`;
const CollapsedMenuItemDiv = styled.div`
  display: none !important;
  padding-inline: 15px;
  margin-inline: 15px;
  padding-block: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  p {
    margin-bottom: 0px;
  }
`;
const ActiveMenuItemDiv = styled.div`
  padding-inline: 15px;
  width: 205px;
  cursor: pointer;
  margin-inline: 15px;
  padding-block: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #0e6946;
  font-weight: 600;
  border-radius: 8px;
  font-family: "GESSTwoLight", sans-serif;
  p {
    margin-bottom: 0px;
  }
`;
const ActiveMenuItemSignOutDiv = styled.div`
  padding-inline: 15px;
  width: 205px;
  cursor: pointer;
  margin-inline: 15px;
  padding-block: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // background-color: #fff;
  color: #0e6946;
  // box-shadow: 8px 8px 35px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  p {
    margin-bottom: 0px;
  }
`;
const MenuDropDownDiv = styled.div`
  display: flex;
  position: relative;
`;
const CollapseMenuDropDownDiv = styled.div`
  display: flex;
  position: relative;
  display: none !important;
`;
const StyledDropdownDiv = styled.div`
  z-index: 5 !important;

  // border: 1px solid;
  box-shadow: 8px 8px 35px rgba(0, 0, 0, 0.08);
  padding: 11px 20px;
  position: absolute;
  margin-left: 245px;
  background: #fff;
  border-radius: 10px;
  width: 230px;
`;
const StyledDropdownInnerDiv = styled.div`
  p {
    margin-bottom: 0px;
    line-height: 30px;
  }
`;
const StyledSubLinkDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  p {
    margin-left: 5px;
  }
`;
const MenuDiv = styled.div`
  display: flex;
  background: #fff6e7;
  width: 61px;
  padding: 85px 0px;
  flex-direction: column;
  border-right: 1px solid #9b9b9b;
  img {
    // margin-bottom: 20px;
    height: 22px;
    object-fit: contain;
    cursor: pointer;
  }
`;
const StyledDropDownCollapseDiv = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
`;
const StyledCollapseProminentMenudiv = styled.div`
  width: 50px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #fff;
  padding-block: 15px;
  img {
    margin-bottom: 0px;
    border-left: 1px solid;
    padding-inline: 4px;
  }

  &:hover {
    cursor: pointer;
  }
`;
const StyledCollapseProminentMenuSignOutDiv = styled.div`
  width: 50px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #105f43;
  padding-block: 15px;
  img {
    margin-bottom: 0px;
  }

  &:hover {
    cursor: pointer;
  }
`;
const StyledDropdownMenuCollapseContent = styled.div`
  position: absolute;
  left: 65px;
  z-index: 1;
  padding: 11px 20px;
  background: #fff;
  width: 230px;
  border-radius: 10px;
  box-shadow: 8px 8px 35px rgb(0 0 0 / 8%);
  p {
    margin-bottom: 0px;
    line-height: 30px;
  }
`;
const NonProminentMenudiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  // background: #0c5439;
  padding-block: 15px;
  cursor: pointer;
  img {
    margin-bottom: 0px !important;
  }
`;
const NonProminentMenuSignOutdiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #105f43;
  padding-block: 15px;
  cursor: pointer;
  width: 50px;
  margin-inline: 4px;
  border-radius: 6px;
  img {
    margin-bottom: 0px !important;
  }
`;
const StyledMainHeaderDiv = styled.div`
  .react-calendar__navigation {
    margin-bottom: 15px !important;
  }

  .react-calendar__navigation__label__labelText
    .react-calendar__navigation__label__labelText--from {
    font-family: "GESSTwoLight", sans-serif;
    font-weight: 600;
    font-size: 25px;
    color: #2e2e2e;
  }

  .react-calendar__navigation__prev2-button {
    display: none !important;
  }

  .react-calendar__navigation__next2-button {
    display: none !important;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #fff;
  }

  .react-calendar__month-view__days__day--weekend {
    color: #a87e33 !important;
  }
  .react-calendar__viewContainer {
    padding-inline: 10px !important;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #105f43 !important;
  }
  .react-calendar__tile--active {
    background: #105f43 !important;
    border-radius: 20px !important;
    color: #fff !important;
    height: 30px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    margin-top: 3px !important;
  }
  .react-calendar__tile--active:enabled:focus {
    border-radius: 20px !important;
    color: #fff !important;
  }
  .react-calendar__tile--active:enabled:hover {
    border-radius: 20px !important;
    color: #fff !important;
  }
  .react-calendar__tile:enabled:hover {
    border-radius: 20px !important;
    height: 30px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    margin-top: 3px !important;
    color: #000 !important;
  }
  .react-calendar__tile:enabled:focus {
    border-radius: 20px !important;
    height: 30px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    margin-top: 3px !important;
    color: #fff !important;
  }
  .react-calendar__tile--now {
    // background: #a87e33 !important;
    border-radius: 20px !important;
    height: 30px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    margin-top: 3px !important;
    color: #fff !important;
  }
  .react-calendar__tile--now:focus {
    // background: #a87e33 !important;
    border-radius: 20px !important;
    height: 30px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    margin-top: 3px !important;
    color: #fff !important;
  }
`;
const MainMenuCol = styled(Col)`
  // box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
  position: fixed;
  z-index: 100;
  width: 100%;
  background-color: #fff;
`;
const AdminLogoDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 61px;
  width: 100%;
  border-bottom: 1px solid #9b9b9b;
  // box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
  p {
    margin-bottom: 0px;
  }
`;
const LearnerDashboardLogo = styled.div`
  height: 61px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 275px;
  border-right: 1px solid #9b9b9b;
`;
const StyledAdminLogoImg = styled.img`
  margin-inline: 12px;
  height: 30px;
`;
const PageDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;
  p {
    margin-bottom: 0px;
    margin-left: 10px;
  }
`;
const PageTitleP = styled.p`
  font-family: "GESSTwoLight", sans-serif;
  font-size: 14px;
`;
const StyledHeaderDiv = styled.div`
  display: flex !important;
  .ant-menu-item {
    // margin-block: 10px !important;
  }
`;
const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
`;
const StyledSiderMenuUpDiv = styled.div`
  display: flex;
  align-items: center;
`;
const StyledModal = styled(Modal)`
  top: 40px !important;
  .ant-modal-header {
    border-radius: 14px 14px 0 0 !important;
    background: #0c5439 !important;
  }
  .ant-modal-footer {
    display: none !important;
  }
  .ant-modal-title {
    color: #fff !important;
  }
  .anticon-close {
    color: #fff !important;
  }
  .ant-modal-content {
    border-radius: 14px !important;
  }
`;
const StyledSideMenuDiv = styled.div`
  display: flex;
  align-items: center;
  width: 220px;
  justify-content: space-around;
`;
const StyledBellDiv = styled.div`
  height: 45px;
  width: 45px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #105f43;
  cursor: pointer;
  img {
    height: 24px;
    z-index: 1;
    position: absolute;
  }
`;
const StyledCountDiv = styled.div`
  z-index: 1;
  background-color: #fff;
  border-radius: 50px;
  margin-left: 20px;
  margin-top: -12px;
  width: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 10px;
  }
`;
const StyledLanguageMenuDiv = styled.div`
  display: flex;
  align-items: center;
  border-inline: 1px solid rgba(0, 0, 0, 0.1);
  padding-inline: 15px;
  div {
    width: 25px;
  }
  p {
    margin-left: 7px;
  }
  img {
    width: 100%;
    height: 25px;
    border-radius: 50px;
  }
`;
const StyledUserImgDiv = styled.div`
  img {
    border-radius: 50px;
    height: 30px;
  }
`;
const NotityDropDown = styled.div`
  position: relative;

  .notification-dropdown {
    position: absolute;
    top: 60px;
    right: 0;
    width: 380px;
    background-color: #fff;
    border: 1px solid #105f439e;
    display: none;
    border-radius: 8px;
    box-shadow: 10px 10px 35px rgba(0, 0, 0, 0.15);
  }
  .notification-dropdown.show {
    display: block;
  }
  .notification-dropdown .notification-dropdown-header {
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .notification-dropdown .notification-dropdown-header h3 {
    font-size: 18px;
    color: #000;
    margin: 0;
  }
  .notification-dropdown .notification-dropdown-header a {
    font-size: 12px !important;
    color: #0c5439 !important;
    font-weight: 500;
  }
  .notification-dropdown .notification-dropdown-body .notification-list {
    overflow: auto;
    padding-bottom: 10px;
    max-height: 350px;
  }
  .notification-dropdown-body .notification-list::-webkit-scrollbar {
    width: 2px;
  }
  .notification-dropdown-body .notification-list::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #b0b0b0;
  }

  .notification-dropdown-body .notification-list-item {
    display: flex;
    padding: 10px 20px;
  }
  .notification-dropdown-body .notification-list-item .img {
    margin-right: 15px;
  }
  .notification-dropdown-body .notification-list-item .text {
    color: #121212;
  }
  .notification-dropdown-body .notification-list-item .text h4 {
    margin: 0;
    font-size: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .notification-dropdown-body .notification-list-item .text span {
    margin: 0;
    font-size: 12px;
  }
  .notification-dropdown-body .notification-list-item .status {
    text-align: right;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    width: 100px;
  }
  .notification-dropdown-body .notification-list-item .status .status-point {
    display: inline-block;
    width: 9px;
    height: 9px;
    background-color: #105f43;
    border-radius: 100%;
    margin-left: 5px;
  }
  .notification-dropdown-body .notification-list-item .status .status-badge {
    display: inline-block;
    color: #000;
    padding: 0 3px;
    border-radius: 3px;
    font-size: 10px;
  }
  .notification-dropdown .all-notification-btn {
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
    display: flex !important;
    flex-direction: row !important;
    gap: 5px;
    align-items: center;
    justify-content: center;
    font-size: 14px !important;
    background-color: #eef6f4;
    color: #105f43;
    border-radius: 4px;
    padding: 4px !important;
    font-weight: 500;
  }
  .notification-dropdown .all-notification-btn span {
    line-height: 0;
  }
`;
