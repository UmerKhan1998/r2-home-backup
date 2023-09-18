import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";

import Header from "../../src/components/rtl/adminLayoutHeader";

import styled from "styled-components";
import endpoints from "../../src/api";
import { useDispatch, useSelector } from "react-redux";
import { tokenAuth } from "../../src/redux/actions";
import TimeLineComp from "../../src/components/rtl/Timeline";

import {
  Avatar,
  Badge,
  Button,
  Col,
  DatePicker,
  Dropdown,
  Input,
  Menu,
  message,
  Row,
  Select,
  Space,
  Switch,
  Table,
  Tabs,
  Timeline,
  TimePicker,
  Upload,
} from "antd";

const { TextArea } = Input;

import {
  ActivitiesIcon,
  AdminLogo,
  AmericanFlag,
  ApplicantsIcon,
  BookmarkImg,
  BookmarkImg1,
  CertificatesIcon,
  CourseIconGreen,
  CoursesIcon,
  DashboardBlackIcon,
  DashboardHomeIcon,
  DashboardIcon,
  EditPortfolioImg,
  GamificationIcon,
  GrayGradientBackground,
  InstructorIcon,
  LearnersIcon,
  LogoutImg,
  NotificationIcon,
  NotificationImg,
  PaymentIcon,
  PointCircleImg,
  PrgoramIconGreen,
  ProgramsIcon,
  ReportsIcon,
  RequestManagementIcon,
  SaudiArabiaFlag,
  ScholarshipIconGreen,
  SearchIcon,
  SurveysIcon,
  SystemSetupIcon,
  TimerIcon,
  TrainingIconGreen,
  TrainingsIcon,
  WebinerNursingImg,
  WebinerNursingImg1,
  Cross,
  course1,
  disussionBoard,
  Reviews,
  qa,
  courseClock,
  courseOnline,
  badge1Img,
  badge3Img,
  badge2Img,
  CourseDetailCards2,
  FeaturedCourse2,
  FeaturedCourse1,
  CourseDetailCards3,
  CertificateIcon,
  R2Favicon,
} from "../../images";
import {
  DownloadOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import CustomButton from "../../src/components/Button";
import {
  AiOutlineCloudUpload,
  AiOutlineDownload,
  AiOutlineRight,
} from "react-icons/ai";
import moment from "moment";
import CertificatesCardsComp from "../../src/components/Cards/CertificatesCards";
import MyCalendarComp from "../../src/components/rtl/Calendar/attendance";
import { Attendance } from "../../src/helpers/LanguageConstant";

const { Option } = Select;

const EditTax = () => {
  const [collapsed, setCollapsed] = useState(false);

  const [selectItem, setSelectItem] = useState("My Learning");

  // //console.log("selectItem", selectItem);

  const handleChange = (value) => {
    //console.log(`selected ${value}`);
  };

  const CourseInstructorArr = ["Instructor 1", "Instructor 2", "Instructor 3"];
  const departmentArr = ["Department 1", "Department 2", "Department 3"];
  const statusArr = ["Status 1", "Status 2", "Status 3"];
  const exportArr = ["Export", "Import"];

  const initialState = {
    firstName_EN: "Abdul",
    lastName_EN: "Manaf",
    email: "abdulmanaf@gmail.com",
    phone_number: "1235686970",
    change_password: "abc123",
    bio: "",
  };

  const [manageProfileState, setManageProfileState] = useState(initialState);
  //console.log("manageProfileState", manageProfileState);

  const manageProfileInputHandler = (e) =>
    setManageProfileState({
      ...manageProfileState,
      [e.target.name]: e.target.value,
    });

  const countryArr = [
    {
      img: "data:image/png;base64,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",
      name: "+966",
    },
    {
      img: "data:image/png;base64,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",
      name: "+92",
    },
  ];

  const [selectLanguage, setSelectLanguage] = useState({
    img: "data:image/png;base64,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",
    name: "+966",
  });

  const menu1 = (
    <StyledNotificationMenu>
      {countryArr?.map((item, index) => (
        <div
          key={index}
          onClick={() =>
            setSelectLanguage({ img: item?.img, name: item?.name })
          }
          className={"select-country"}
        >
          <Avatar size={24} src={item?.img} />
          <p className="language-title">{item?.name}</p>
        </div>
      ))}
    </StyledNotificationMenu>
  );

  const ApplicationStatusTagsArr = [
    { name: "Nationality Info", status: "submitted" },
    { name: "Speciality Info", status: "rejected" },
    { name: "CC2 Employee Info", status: "submitted" },
    { name: "Organizational Information", status: "submitted" },
    { name: "Organizational Address", status: "submitted" },
    { name: "ID Attachments", status: "submitted" },
    { name: "CV Attachment", status: "submitted" },
    { name: "Training Attachments", status: "submitted" },
    { name: "Academic Attachments", status: "submitted" },
    { name: "Academic Attachments", status: "rejected" },
  ];

  const pay_now = true;

  const gamificationArr = [
    {
      img: badge1Img,
      badgeColor: "#A87E33",
      title: "Course of Anesthesiology",
      completed_date: "2022-10-08T16:12:05.516+00:00",
    },
    {
      img: badge2Img,
      badgeColor: "#A87E33",
      title: "Course of Obstetrics & Gynecology",
      completed_date: "2022-10-08T16:12:05.516+00:00",
    },
    {
      img: badge3Img,
      badgeColor: "#A87E33",
      title: "Course of Cardiology",
      completed_date: "2022-10-08T16:12:05.516+00:00",
    },
  ];

  const timeLineArr = [
    {
      completed_date: "2022-10-08T16:12:05.516+00:00",
      innerArr: [
        {
          img: FeaturedCourse1,
          course_name: "Course of Anesthesiology",
          course_cat: "Dental Esthetics",
          status: "Completed",
          level: "Level 1",
          points: 100,
          badge: "Bronze",
          badge_icon: badge2Img,
        },
        {
          img: FeaturedCourse1,
          course_name: "Course of Dermatology",
          course_cat: "Oral Surgery",
          status: "Completed",
          level: "Level 2",
          points: 200,
          badge: "Bronze",
          badge_icon: badge2Img,
        },
      ],
    },
    {
      completed_date: "2022-10-08T16:12:05.516+00:00",
      innerArr: [
        {
          img: CourseDetailCards3,
          course_name: "Course of Obstetrics & Gynecology",
          course_cat: "General Dentistry",
          status: "Completed",
          level: "Level 3",
          points: 300,
          badge: "Silver",
          badge_icon: badge3Img,
        },
        {
          img: CourseDetailCards3,
          course_name: "Course of Cardiology",
          course_cat: "Oral Surgery",
          status: "Completed",
          level: "Level 4",
          points: 400,
          badge: "Silver",
          badge_icon: badge3Img,
        },
      ],
    },
    {
      completed_date: "2022-10-08T16:12:05.516+00:00",
      innerArr: [
        {
          img: CourseDetailCards3,
          course_name: "Course of Anesthesiology",
          course_cat: "General Dentistry",
          status: "Completed",
          level: "Level 5",
          points: 500,
          badge: "Gold",
          badge_icon: badge1Img,
        },
      ],
    },
  ];

  const certificatesArr = [
    {
      title: "Riyadh Second Health Cluster: English learning course",
      issue_date: "2022-10-08T16:12:05.516+00:00",
      department_name: "English Language",
      category_name: "English Language",
    },
    {
      title: "Riyadh Second Health Cluster: English learning course",
      issue_date: "2022-10-08T16:12:05.516+00:00",
      department_name: "English Language",
      category_name: "English Language",
    },
    {
      title: "Riyadh Second Health Cluster: English learning course",
      issue_date: "2022-10-08T16:12:05.516+00:00",
      department_name: "English Language",
      category_name: "English Language",
    },
  ];

  const scheduledArr = [
    {
      title: "Obstetrics & Gynecology Assessement-01 Submission",
      category: "Program",
      time: "01:00pm",
    },
    {
      title: "Obstetrics & Gynecology Assessement-01 Submission",
      category: "Course",
      time: "01:00pm",
    },
    {
      title: "Obstetrics & Gynecology Assessement-01 Submission",
      category: "Conference",
      time: "01:00pm",
    },
    {
      title: "Obstetrics & Gynecology Assessement-01 Submission",
      category: "Webinar",
      time: "01:00pm",
    },
  ];

  return (
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
            name={"Attendance"}
          >
            <StyledMainFilterRow gutter={[24, 24]}>
              <StyledFilterRow gutter={[16, 16]}>
                <Col span={24}>
                  <MainHeading>{Attendance}</MainHeading>
                </Col>
              </StyledFilterRow>
            </StyledMainFilterRow>
            {/* callendar */}

            <AttendanceCalander>
              <MyCalendarComp scheduledArr={scheduledArr} />
            </AttendanceCalander>
          </Header>
        </StyledDiv>
      </body>
    </div>
  );
};

export default EditTax;

const MainHeading = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  font-family: "GESSTwoLight", sans-serif;
`;

const AttendanceCalander = styled.div`
  position: relative;
  padding: 10px;
  background: #fff;
  border-radius: 10px;
  margin-top: 20px;
`;

const ContentCol = styled(Col)`
  background-color: #fff !important;
`;

const ContentCol1 = styled(Col)`
  background-color: #fff !important;
  box-shadow: 18px 40px 78px -28px rgb(0 0 0 / 4%);
  border-radius: 10px;
`;

const StyledDashboardRow = styled(Row)`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ababab;
  padding-bottom: 15px;
`;

const StyledDashboardRow1 = styled(Row)`
  display: flex;
  align-items: center;
  padding-top: 15px;
  width: 100%;
  h2 {
    margin-bottom: 0px !important;
    font-family: "GESSTwoLight", sans-serif;
    font-weight: 600;
    font-size: 22px;
    color: #2e2e2e;
  }
`;

const StyledDashboardRow2 = styled(Row)`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ababab;
  padding-block: 15px;
  width: 100%;
  h2 {
    margin-bottom: 0px !important;
    font-family: "GESSTwoLight", sans-serif;
    font-weight: 600;
    font-size: 22px;
    color: #2e2e2e;
  }
  .ant-col {
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }
  .ant-col:nth-child(4) {
    border-right: 1px solid rgba(0, 0, 0, 0) !important;
  }
  .ant-col:last-child {
    border-right: 1px solid rgba(0, 0, 0, 0) !important;
  }
  margin-left: 0px !important;
  margin-right: 0px !important;
`;

const StyledDashboardCol1 = styled(Col)`
  margin-right: 20px;
`;

const DashboardTaskCol = styled(Col)`
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledFilterRow = styled(Row)`
  width: 100% !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
  // margin-bottom: 20px !important;
  // .ant-col{
  //   padding-left: 0px !important;
  //   padding-right: 0px !important;
  // }
`;

const StyledSelect = styled(Select)`
  width: 100% !important;
  // border: 1px solid #c1c1c1 !important;
  .ant-select-selection-item {
    font-family: "GESSTwoLight", sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #898989;
  }
  .ant-select-single.ant-select-open {
    color: #898989 !important;
  }
`;

const StyledTabs = styled(Tabs)`
  width: 100%;
  .ant-tabs-nav-wrap {
    display: flex !important;
    justify-content: start !important;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #0c5439 !important;
  }
  .ant-tabs-tab-btn:focus,
  .ant-tabs-tab-remove:focus,
  .ant-tabs-tab-btn:active,
  .ant-tabs-tab-remove:active {
    color: #0c5439 !important;
  }
  .ant-tabs-tab:hover {
    color: #0c5439 !important;
  }
`;

const StyledLanguageDiv = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-bottom: 0;
    margin-left: 7px;
  }
`;

const StyledInput = styled(Input)`
  // background: #f8f8f8;
  border: 1px solid #bcbcbc;
  border-radius: 7px;

  // padding: 15px 20px;
`;

const StyledDisabledInput = styled(Input)`
  background: #f4f4f4;
  border: 1px solid #bcbcbc;
  border-radius: 4px;

  border-radius: 7px;
`;

const StyledInputPassword = styled(Input.Password)`
  // background: #f8f8f8;
  border: 1px solid #bcbcbc;
  border-radius: 7px;

  // padding: 15px 20px;
`;

const StyledTextAreaRow = styled(Row)`
  margin-top: 15px;
`;

const StyledLabelP = styled.p`
  color: #2e2e2e;
  font-family: "GESSTwoLight", sans-serif;
  margin-top: 20px;
`;

const StyledLabelP1 = styled.p`
  color: #2e2e2e;
  font-family: "GESSTwoLight", sans-serif;
`;

// const StyledNexRequestRow = styled(Row)`
//   width: 100% !important;
// `;

const StyledCourseDetailsRow = styled.div`
  width: 100% !important;
`;

const StyledTimePicker = styled(TimePicker)`
  width: 100% !important;
`;

const StyledUpload = styled(Upload)`
  width: 100% !important;
  .ant-btn {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    width: 100% !important;
    align-items: center;
    // height: 60px !important;
  }
  .ant-upload-list-item-card-actions-btn {
    display: none !important;
  }
  .ant-upload-span {
    display: none !important;
  }
  .ant-upload-list-item-error {
    display: none !important;
  }
  .ant-upload-list-item-done {
    display: none !important;
  }
`;

const AttachmentDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-inline: 15px;
  margin-block: 10px;
  margin-block: 15px .file-name {
    margin-right: 10px;
  }
  .file-size {
    margin-left: 10px;
  }
  .file-img {
    height: 14px;
  }
  p {
    margin-bottom: 0px;
  }
`;

const CrossDiv = styled.div`
  cursor: pointer;
`;

const StyledDiv = styled.div`
  .ant-upload {
    width: 100% !important;
  }
  .ant-picker {
    width: 100% !important;
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border: 1px solid #bcbcbc !important;
  }
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    display: flex !important;
    align-items: center !important;
    border-radius: 7px !important;
  }
`;
const FlexDiv1 = styled.div`
  display: flex;
`;

const StyledRowButton = styled(Row)`
  display: flex;
  justify-content: end;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100% !important;
  border-radius: 7px !important;
  border: 1px solid #bcbcbc !important;
`;

const StyledFilterRowFixed = styled(Row)`
  width: 100% !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
  visibility: hidden !important;
  // margin-bottom: 20px !important;
  // .ant-col{
  //   padding-left: 0px !important;
  //   padding-right: 0px !important;
  // }
`;

const StyledPdLeftOCol = styled(Col)`
  padding-left: 0px !important;
`;

const StyledPdRightOCol = styled(Col)`
  padding-right: 0px !important;
`;

const StyledSectionRow = styled(Row)`
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 10px 0 0;
  h2 {
    font-family: "GESSTwoLight", sans-serif;
    font-size: 14px;
    margin-bottom: 20px;
  }
`;

const StyledSectionRow1 = styled(Row)`
  justify-content: space-between;
  align-items: center;
  width: 100%;
  h2 {
    font-family: "GESSTwoLight", sans-serif;
    font-size: 14px;
    margin-bottom: 30px;
  }
`;

const StyledSectionRow2 = styled(Row)`
  justify-content: space-between;
  align-items: center;
  width: 100%;
  h2 {
    font-family: "GESSTwoLight", sans-serif;
    font-size: 14px;
  }
`;

const StyledSearchDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 420px !important;
  .ant-input {
    width: 248px !important;
  }
`;

const StyledSearchInput = styled(Input)`
  width: 248px !important;
  border-radius: 9px !important;
`;

const StyledMainFilterRow = styled(Row)`
  margin-inline: -4px !important;
`;

const CoursesTabs = styled(Tabs)`
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #105f43;
  }
  .ant-tabs-ink-bar {
    background: #105f43;
  }
  .ant-tabs {
    color: #a8a8a8 !important;
  }
  .ant-tabs-tab:hover {
    color: #a8a8a8 !important;
  }
  .ant-tabs-nav::before {
    border-color: #a8a8a8 !important;
  }
`;

const CourseFilterSearch = styled.div`
  margin-bottom: 20px;
  border-radius: 10px;
`;

const CourseCards = styled.div``;

const CourseCard = styled.div`
  padding: 15px;
  background: #fff;
  border-radius: 10px;
  display: flex;

  .course-img {
    position: relative;
  }
  .course-img img {
  }
  .course-desc {
    padding-left: 15px;
  }
  .course-desc .course-title {
    display: flex;
    justify-content: space-between;
  }
  .course-desc .course-title h4 {
    font-size: 18px;
    // font-weight: 700;
  }
  .course-desc .course-description {
  }
  .course-desc .course-description .department {
    display: inline-block;
    padding: 3px 10px;
    font-size: 12px;
    border-radius: 4px;
    color: #a87e33;
    background: #fee4b7;
    margin-bottom: 5px;
  }
  .course-desc .course-description p {
    font-size: 12px;
    color: #9e9e9e;
    padding-right: 10px;
    margin-bottom: 5px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .course-desc .course-progress {
    margin-bottom: 10px;
  }
  .course-desc .course-progress > span {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 2px;
    display: inline-block;
  }
  .course-desc .course-progress .progress-seek {
    height: 2px;
    background: #e6e6e6;
  }
  .course-desc .course-progress .progress-seek span {
    display: block;
    height: 2px;
    background: #a87e33;
  }
  .course-desc .course-duration {
    font-size: 12px;
    display: flex;
    gap: 10px;
  }
  .course-desc .course-duration > div {
    display: flex;
    align-items: center;
    font-weight: 600;
  }
  .course-desc .course-duration span {
    color: #a87e33;
    margin-right: 8px;
    font-weight: 600;
  }
`;

const StyledProfileCardDiv = styled.div`
  background: #fff;
  padding: 20px;
  // padding: 20px 20px 40px;
  border-radius: 5px;
`;

const StyledFormDiv = styled.div`
  margin-top: 20px;
`;

const StyledUpdateBtnDiv = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 30px;
`;

const StyledMainDiv = styled.div`
  display: Flex;
  // align-items: center;
  p {
    margin-bottom: 0px;
    display: Flex;
    align-items: center;
  }
  .label {
    font-weight: bold;
  }
  .label-sub {
    font-size: 10px;
  }
`;

const StyledTextArea = styled(TextArea)`
  width: 100% !important;
  .ant-input {
    border-radius: 7px !important;
  }
`;

const LanguageButton = styled(Button)`
  height: 45px !important;
  top: -1px !important;
  width: 125px !important;
  font-family: "GESSTwoLight", sans-serif !important;
  font-weight: 500;
  padding: 0 16px 0 20px;
  margin: 0 10px 0px 4px;
  border-radius: 7px;
  border: 1px solid #c1c1c1;
  @media (min-width: 1200px) {
    p {
      margin-bottom: 0px;
      font-size: 15px;
    }
  }

  @media (max-width: 1200px) {
    p {
      margin-bottom: 0px;
      font-size: 14px;
    }
  }

  svg {
    font-size: 13px;
    margin-top: 5px;
  }

  .ant-space-item {
    font-family: "GESSTwoLight", sans-serif !important;
    font-weight: 500;
  }
`;

const StyledNotificationMenu = styled(Menu)`
  width: 180px !important;
  padding: 20px 10px;
  left: 12px;
  border-radius: 5px 0 0 5px;
  line-height: 28px;

  h1 {
    margin-bottom: 0px !important;
    margin-inline: 10px !important;
    color: #fff;
  }
  p {
    margin-bottom: 0px !important;
    &:hover {
      // text-decoration: underline;
      cursor: pointer;
    }
  }
  .ant-dropdown-menu-item {
    margin-block: 5px;
    padding: 10px;
    border-radius: 6px;
  }
  backdrop-filter: blur(20px) !important;
  .ant-dropdown-placement-bottomRight {
    left: 690px !important;
  }

  .select-country {
    display: flex;
    margin-bottom: 10px;
    padding-block: 3px;
    background: #f6f6f6;
    padding-inline: 6px;
    &:hover {
      cursor: pointer;
    }
    &:nth-last-child(1) {
      margin-bottom: 0px;
    }
    p {
      margin-left: 10px;
    }
  }

  @media (min-width: 1200px) {
    .language-title {
      font-size: 15px;
    }
  }

  @media (max-width: 1199px) {
    .language-title {
      font-size: 14px;
    }
  }
`;

const TrackApplicationCardDiv = styled.div`
  background: #ffffff;
  box-shadow: 5px 5px 31px 6px rgba(0, 0, 0, 0.05);
  border-radius: 14px;
  padding: 20px 20px 10px;
  border: 1px solid #bcbcbc;
`;

const TrackApplicationCardDiv1 = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
  background: #ffffff;
  box-shadow: 5px 5px 31px 6px rgba(0, 0, 0, 0.05);
  border-radius: 14px;
  padding: 20px;
  border: 1px solid #bcbcbc;
`;

const TrackApplicationCardDiv2ActiveBtn = styled.div`
  background: #ffffff;
  box-shadow: 5px 5px 31px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #bcbcbc;
  border-radius: 14px;
  padding: 20px 20px 20px;
  // height: 290px !important;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: start;
  h1 {
    text-align: center !important;
  }
`;

const TrackApplicationCardDiv2 = styled.div`
  background: #ffffff;
  box-shadow: 5px 5px 31px 6px rgba(0, 0, 0, 0.05);
  border-radius: 14px;
  padding: 20px 20px 0px;
  height: 290px !important;
`;

const ApplicationStatusRow = styled(Row)`
  display: flex;
  justify-content: space-between;
  h1 {
    margin-bottom: 0px;
    font-family: "GESSTwoLight";
    font-weight: 600;
    color: #181818;
    font-size: 16px;
    display: flex;
    align-items: center;
  }
`;

const StyledApplicationStatusCustomButton = styled(Button)`
  border-radius: 19px !important;
  background: #f8f8f8 !important;
  border: 1px solid #c1c1c1 !important;
  borderradius: 19px !important;
  color: #105f43 !important;
  display: flex !important;
  align-items: center !important;
  width: 155px !important;
  justify-content: space-between !important;
  p {
    margin-bottom: 0px;
  }
  svg {
    margin-top: 2px !important;
  }
`;

const StyledAiOutlineRight = styled(AiOutlineRight)`
  color: #105f43 !important;
`;

const StyledTagRow = styled(Row)`
  margin-top: 15px;
  display: grid;
  p {
    margin-bottom: 0px;
  }
  .title {
    color: #8c8c8c;
  }
`;

const ApplicationStatusTagsDiv = styled.div`
  background: #effaeb;
  border: 1px solid #effaeb;
  color: #105f43;
  font-family: HacenSaudiArabiaRegular, sans-serif;
  font-weight: 400;
  font-size: 14px;
  border-radius: 7px;
  padding: 3px 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  p {
    margin-bottom: 0px;
    cursor: pointer;
  }
`;

const ApplicationRejectedStatusTagsDiv = styled.div`
  background: #ffa4a3;
  border: 1px solid #effaeb;
  color: #fff;
  font-family: HacenSaudiArabiaRegular, sans-serif;
  font-weight: 400;
  font-size: 14px;
  border-radius: 7px;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 3px 10px;
  p {
    margin-bottom: 0px;
    cursor: pointer;
  }
`;

const CourseRow = styled(Row)`
  display: block !important;
  text-align: start;
  border-bottom: 1px solid #eaeaea;

  p {
    margin-bottom: 0px;
  }

  .label {
    color: #8c8c8c !important;
    margin-top: 10px;
    margin-bottom: 5px;
  }

  .course_name {
    color: #000000;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 10px;
    font-family: HacenSaudiArabiaRegular, sans-serif;
  }
`;

const AdditionalInformationRow = styled(Row)`
  display: flex;
  justify-content: space-between;
  h1 {
    margin-bottom: 20px;
    font-family: "GESSTwoLight";
    font-weight: 600;
    color: #181818;
    font-size: 28px;
    display: flex;
    align-items: center;
    font-size: 16px;
  }
`;

const StyledTimeline = styled(Timeline)`
  display: grid !important;
  justify-content: start !important;
  .ant-timeline-item-content {
    width: 100% !important;
  }
  .ant-timeline-item-last {
    margin-bottom: 0px !important;
  }
  .ant-timeline-item:nth-last-child {
    margin-bottom: 0px !important;
  }

  .ant-timeline-item-head-green {
    color: #105f43 !important;
    border-color: #105f43 !important;
    background: #4c8772 !important;
  }
  .ant-timeline-item-head-yellow {
    color: #105f43 !important;
    border-color: #ffda94 !important;
    background: #ffe3af;
  }
  .ant-timeline-item-head-red {
    color: #105f43 !important;
    border-color: #ffa4a3 !important;
    background: #ffbbba;
  }
`;

const StyledTimeLineRow = styled(Row)`
  display: flex;
  justify-content: space-between !important;
  border-bottom: 1px solid #c1c1c1;
  @media (min-width: 1342px) {
    width: 248px !important;
  }
  @media only screen and (min-width: 1260px) and (max-width: 1341px) {
    width: 290px !important;
  }
  @media only screen and (min-width: 1160px) and (max-width: 1259px) {
    width: 260px !important;
  }
  @media only screen and (min-width: 992px) and (max-width: 1161px) {
    width: 180px !important;
  }
`;

const ApplicationStatusDateDiv = styled.div`
  background: #f0f0f0 !important;
  border-radius: 7px !important;
  color: #000000 !important;
  font-size: 14px !important;
  font-family: HacenSaudiArabiaRegular, sans-serif !important;
  font-weight: 400 !important;
  // width: 100px;
  @media only screen and (min-width: 1161px) {
    padding: 4px 7px !important;
  }
  @media only screen and (min-width: 992px) and (max-width: 1160px) {
    padding: 4px 4px !important;
  }

  p {
    margin-bottom: 0px;
    text-align: center;
  }
`;

const StyledTimeLineRowLastDiv = styled.div`
  display: flex;
  .resubmit {
    margin-bottom: 0px !important;
    margin-right: 5px !important;
    cursor: pointer;
    color: #a87e33;
    display: flex;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const StyledPayRow = styled(Row)`
  display: flex;
  justify-content: center;
  width: 100%;
  .ant-btn {
    padding-inline: 40px !important;
  }
`;

const StyledTimeLineRowLast = styled(Row)`
  display: flex;
  justify-content: space-between !important;
  @media (min-width: 1342px) {
    width: 248px !important;
  }
  @media only screen and (min-width: 1260px) and (max-width: 1341px) {
    width: 290px !important;
  }
  @media only screen and (min-width: 1160px) and (max-width: 1259px) {
    width: 260px !important;
  }
  @media only screen and (min-width: 992px) and (max-width: 1161px) {
    width: 180px !important;
  }
`;

const StyledAiOutlineCloudUpload = styled(AiOutlineCloudUpload)`
  font-size: 20px;
  margin-right: 5px;
`;

const StyledFormInputRow = styled(Row)`
  width: 100% !important;
  .ant-col {
    display: flex;
    align-items: center;
  }
`;

const StyledMarginLeftPerCol = styled(Col)`
  margin-left: 2%;
`;

const StyledBioCol = styled(Col)`
  display: flex !important;
  align-items: start !important;
`;

const StyledBadgeCardDiv = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 15px;
  .complete_date {
    color: #aeaeae;
    margin-bottom: 0px;
  }
  .title {
    margin-block: 5px;
    font-family: "GESSTwoLight", sans-serif;
  }
`;

const StyledBadgeRow = styled(Row)`
  margin-top: 20px;
`;

const StyledBadgesLevelRow = styled(Row)`
  margin-top: 20px;
  h2 {
    font-size: 14px;
  }
`;

const StyledBadgesHistoryDiv = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  .certificate {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const StyledAiOutlineDownload = styled(AiOutlineDownload)`
  font-size: 20px;
  margin-right: 5px;
`;

const StyledDurationDiv = styled.div`
  display: flex;
  p {
    margin-bottom: 0px;
  }
  .date {
    margin-right: 5px;
    color: #979797;
  }
`;

const StyledBadgeUserDiv = styled.div`
  display: flex;
  align-items: center;
  .user-info {
    margin-left: 5px;
  }
  h1 {
    font-family: "GESSTwoLight", sans-serif;
    font-weight: 800;
    margin-bottom: 0px;
  }
  p {
    font-family: "GESSTwoLight", sans-serif;
    margin-bottom: 0px;
  }
`;

const StyledCertificationDiv = styled.div`
  display: flex;
  .div {
    margin-left: 15px;
  }
  p {
    margin-bottom: 0px;
  }
  h2 {
    margin-bottom: 0px;
  }
`;

const CertificatesCards = styled.div`
  padding: 15px 30px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 5px 5px 31px rgb(0 0 0 / 10%);

  .certificate-card {
    padding: 25px 0;
  }

  .certificate-card:not(:last-child) {
    border-bottom: 1px solid #e1e1e1;
  }

  .certificate-card .certificate-img img {
    width: 100px;
    margin-right: 20px;
  }

  .certificate-dec {
    padding-right: 20px;
  }
  .certificate-dec > span {
    font-size: 12px;
    font-weight: 600;
  }
  .certificate-dec h3 {
    font-size: 20px;
    color: #105f43;
    margin-bottom: 12px;
  }
  .certificate-card .certificate-dec .date-department {
    font-size: 12px;
    margin-bottom: 6px;
    font-weight: 600;
  }
  .certificate-card .certificate-dec .date-department span {
    color: #979797;
  }
  .certificate-dec a {
    color: #a87e33;
    margin-top: 25px;
    display: inline-block;
    text-decoration: underline;
    font-weight: 600;
  }

  .certificate-card .certificate-action {
    text-align: right;
  }
  .certificate-card .certificate-action a {
    display: inline-block;
    color: #fff;
    background: #105f43;
    padding: 3px 12px;
    border-radius: 4px;
  }
`;
