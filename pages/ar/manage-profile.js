import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";

import Header from "../../src/components/rtl/adminLayoutHeader";

import styled from "styled-components";
import endpoints from "../../src/api";
import { useDispatch, useSelector } from "react-redux";
import UploadImageAvatar from "../../src/components/Avatar/UploadImageAvatar";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { message_ar, passwordValidation } from "../../src/helpers/passwordValidation";

import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Empty,
  Input,
  Menu,
  Row,
  Select,
  Tabs,
  Timeline,
  TimePicker,
  Upload,
} from "antd";
import {
  and,
  application,
  cancel,
  change,
  email,
  FirstName,
  info,
  LastName,
  manage_profile,
  new_i,
  password,
  profile,
  save,
  tracking,
  tracking_your_application,
  update,
  mobile_number,
  your_bio,
  add_short_introduction,
  add_short_bio,
  Please_enter_your_tracking_number,
  No_Data,
  course_information,
  TimelineText,
  Type,
  date_of_submission,
  course,
  Name,
  department,
  duration,
  total,
  lecturesText,
  Venue,
  create_services,
  submitted,
  under_review,
  rejected,
  Resubmit,
  upload,
  Submit,
  Information,
  Duration,
  Lectures,
  this_field_is_mandatory,
  you_have_to_enter_at_least_5_digit,
  Password_Changed_Successfully,
  The_Current_Password_didnt_match,
  is_mandatory,
  Current,
  invalid_password,
} from "../../src/helpers/LanguageConstant";

const { TextArea } = Input;

import { SearchIcon, R2Favicon, User } from "../../images";
import Preloader from "../../public/images/Preloader.gif";
import CustomButton from "../../src/components/Button";
import { AiOutlineCloudUpload, AiOutlineRight } from "react-icons/ai";
import { getCookies, setCookies } from "../../src/helpers/cookie";
import moment, { invalid } from "moment";
import { getBase64 } from "../../src/helpers/base64Func";
import { toast } from "react-toastify";
import { userData } from "../../src/redux/actions";
import router from "next/router";
import { ImAttachment } from "react-icons/im";

const EditTax = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [rmsFeedbackState, setRmsFeedbackState] = useState("");
  const trackingId = getCookies("trackingCode");

  const authToken = getCookies("token");
  const userStatus = getCookies("userStatus");
  const [isAuthorized, setAuthorized] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [paymentResubmitState, setPaymentResubmitState] = useState("");

  useLayoutEffect(() => {
    if (authToken === undefined) {
      router.push("/sign-in");
    } else if (userStatus === undefined || userStatus === "false") {
      router.push("/");
    } else if (authToken || userStatus === "true") {
      setAuthorized(true);
    }
  }, []);

  const [getUserProfileDashboardState, setGetUserProfileDashboardState] =
    useState();

  const [selectItem, setSelectItem] = useState("/ar/manage-profile");

  // //console.log("selectItem", selectItem);

  const handleChange = (value) => {
    //console.log(`selected ${value}`);
  };

  const initialState = {
    photoUrl: getUserProfileDashboardState
      ? getUserProfileDashboardState?.photoUrl
      : "",
    id: getUserProfileDashboardState ? getUserProfileDashboardState?.id : "",
    firstName_EN: getUserProfileDashboardState
      ? getUserProfileDashboardState?.firstName_EN
      : "",
    lastName_EN: getUserProfileDashboardState
      ? getUserProfileDashboardState?.lastName_EN
      : "",
    firstName_AR: getUserProfileDashboardState
      ? getUserProfileDashboardState?.firstName_AR
      : "",
    lastName_AR: getUserProfileDashboardState
      ? getUserProfileDashboardState?.lastName_AR
      : "",
    email: getUserProfileDashboardState
      ? getUserProfileDashboardState?.email
      : "",
    phone_number: getUserProfileDashboardState
      ? getUserProfileDashboardState?.phoneNumber
      : "",
    current_password: "",
    new_password: "",
    bio: getUserProfileDashboardState
      ? getUserProfileDashboardState?.bioData_AR
      : "",
      userId: getUserProfileDashboardState
      ? getUserProfileDashboardState?.id
      : "",
  };

  const [manageProfileState, setManageProfileState] = useState(initialState);

  const userDataReducer = useSelector((state) => state?.userDataReducer);

  useLayoutEffect(() => {
    setManageProfileState({
      ...manageProfileState,
      photoUrl: getUserProfileDashboardState
        ? getUserProfileDashboardState?.photoUrl
        : "",
      id: getUserProfileDashboardState ? getUserProfileDashboardState?.id : "",
      firstName_EN: getUserProfileDashboardState
        ? getUserProfileDashboardState?.firstName_EN
        : "",
      lastName_EN: getUserProfileDashboardState
        ? getUserProfileDashboardState?.lastName_EN
        : "",
      firstName_AR: getUserProfileDashboardState
        ? getUserProfileDashboardState?.firstName_AR
        : "",
      lastName_AR: getUserProfileDashboardState
        ? getUserProfileDashboardState?.lastName_AR
        : "",
      email: getUserProfileDashboardState
        ? getUserProfileDashboardState?.email
        : "",
      phone_number: getUserProfileDashboardState
        ? getUserProfileDashboardState?.phoneNumber
        : "",
      current_password: "",
      new_password: "",
      bio: getUserProfileDashboardState
        ? getUserProfileDashboardState?.bioData_AR
        : "",
        userId: getUserProfileDashboardState
      ? getUserProfileDashboardState?.id
      : "",
    });
    setImageUrl(getUserProfileDashboardState?.photoUrl);
  }, [getUserProfileDashboardState]);

  useLayoutEffect(() => {
    setGetUserProfileDashboardState(userDataReducer);
  }, [userDataReducer]);

  //console.log("userDataReducer", userDataReducer);

  // useLayoutEffect(() => {
  //   dispatch(
  //     userData({
  //       ...userDataReducer,
  //       photoUrl: `${getUserProfileDashboardState?.photoUrl}`,
  //     })
  //   );
  // }, []);

  const [pictureChangeToggleState, setPictureChangeToggleState] =
    useState(false);
  const [dropdownStatusState, setDropdownStatusState] = useState("Select");

  const [passwordValidationState,setPasswordValidationState]=useState('')
  
  const [passwordValidationToggleState,setPasswordValidationToggleState]=useState(false)

  const [newPasswordValidationState,setNewPasswordValidationState]=useState('')
  
  const [newPasswordValidationToggleState,setNewPasswordValidationToggleState]=useState(false)
  
  const [trackYourApplicationState, setTrackYourApplicationState] = useState();
  const [dashboardTrackAppState, setDashboardTrackAppState] = useState([]);
  const [submitState, setSubmitState] = useState("");
  const token = getCookies("token");
  const [loading, setLoading] = useState(false);

  const [trackNumberState, setTrackNumberState] = useState();

  //console.log("manageProfileState", manageProfileState);
  //console.log("pictureChangeToggleState", pictureChangeToggleState);
  //console.log("trackYourApplicationState", trackYourApplicationState);

  const manageProfileInputHandler = (e) =>
    setManageProfileState({
      ...manageProfileState,
      [e.target.name]: e.target.value,
    });

  const [imageUrl, setImageUrl] = useState(User);

  //console.log("imageUrl", imageUrl);

  const uploadImage = (e) => {
    getBase64(e?.target?.files[0], (url) => {
      // setLoading(false);
      // setImageUrl(url);
      //console.log("objectUrl", url);
      if (url) {
        setImageUrl(url);
        setPictureChangeToggleState(true);
      }
      // setImageUrl(url);
    });
    // getBase64(e.target.files[0], (url) => {
    //console.log("eFiles", e?.target?.files[0]);
    setManageProfileState({
      ...manageProfileState,
      photoUrl: e.target.files[0],
    });
    // });
  };

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

  const modifyProfileFunc = async (data) => {
    //console.log("manageProfileStateData", data);
    dispatch(
      userData({
        ...userDataReducer,
        photoUrl: imageUrl,
        firstName_AR: manageProfileState?.firstName_AR,
        lastName_AR: manageProfileState?.lastName_AR,
        bioData_AR: data?.bio,
        email: manageProfileState?.email,
      })
    );

    const obj = {
      id: data?.id,
      firstName_EN: data?.firstName_EN,
      lastName_EN: data?.lastName_EN,
      firstName_AR: data?.firstName_AR,
      lastName_AR: data?.lastName_AR,
      bioData_AR: data?.bio,
      bioData_EN: data?.bio,
      photoUrl: data?.photoUrl,
      email: data?.email,
      phoneNumber: data?.phone_number,
    };

    try {
      if (token || obj) {
        //console.log("obj", obj);
        const response = await endpoints.dashboardUpdateUserProfile(token, obj);
        if (response) {
          //console.log("response", response?.data?.statusCode);
          if (response?.data?.statusCode === "200") {
            toast.success(`${response?.data?.data}`);
          } else {
            toast.error(`${response?.data?.data}`);
          }
          // setCookies("trackingId", response?.data?.message);
          // setCookies("userData", JSON.stringify(obj));
        }
      }
      setLoading(true);
      setFileUploadState("");
    } catch (err) {
      setLoading(false);
    }
  };

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

  const courseInfoArr = [
    {
      title: `${application} #`,
      value: trackYourApplicationState?.registrationCode,
    },
    {
      title: `${application} ${Type}`,
      value: trackYourApplicationState?.courseTrainingRecordType,
    },
    {
      title: `${date_of_submission}`,
      value: moment(trackYourApplicationState?.insertDate).format(
        "YYYY ,DD MMM"
      ),
    },
    {
      title: `${trackYourApplicationState?.courseTrainingRecordType_AR} ${Name}`,
      value: trackYourApplicationState?.courseTrainingTitle_AR,
    },
    {
      title: `${trackYourApplicationState?.courseTrainingRecordType_AR} ${department}`,
      value: trackYourApplicationState?.departmentName_AR,
    },
    {
      title: `${trackYourApplicationState?.courseTrainingRecordType_AR} ${Duration}`,
      value: trackYourApplicationState?.duration_AR,
    },
    {
      title: `${total} ${Lectures}`,
      value: trackYourApplicationState?.totalLectures,
    },
    { title: `${Venue}`, value: trackYourApplicationState?.subCategory },
  ];

  const getCourseDetailRecordFunc = async (token, code) => {
    try {
      // if (token && menuId) {
      // //console.log('menuId', menuId, token)
      // if (code || token) {
      const response = await endpoints.getDashboardTrackApplicaton(token, code);
      if (response) {
        //console.log("responseTrack", response?.data?.data);
        setTrackYourApplicationState(response?.data?.data);
      }
      // }
      setLoading(true);
    } catch (err) {
      //console.log("err", err);
      setLoading(false);
    }
  };

  // const dashboardGetUserProfileFunc = async (token) => {
  //   try {
  //     // if (token && menuId) {
  //     // //console.log('menuId', menuId, token)
  //     if (token) {
  //       const response = await endpoints.DashboardGetUserProfile(token);
  //       if (response) {
  //         //console.log("response", response);
  //         setGetUserProfileDashboardState(response?.data.data);
  //       }
  //     }
  //     setLoading(true);
  //   } catch (err) {
  //     //console.log("err", err);
  //     setLoading(false);
  //   }
  // };

  useLayoutEffect(() => {
    getCourseDetailRecordFunc(token, trackNumberState);
    // dashboardGetUserProfileFunc(token);
  }, [trackNumberState]);

  const [ChangePassLoading, setChangePassLoading] = useState();
  const createLMSUsersFunc = async (token, data) => {
    try {
      setChangePassLoading(true);
      
      const obj = {
        oldPassword: data?.current_password,
        password: data?.new_password,
      };
      if(obj?.password.length >= 5 && obj?.oldPassword.length >= 5) {
        const response = await endpoints.ChangePassword(token, obj);
        if (response?.data?.statusCode === "200") {
          toast.success(Password_Changed_Successfully);
          setManageProfileState({...manageProfileState, 
            new_password: "", 
            current_password: ""
          })
          setChangePassLoading(false);
        } else if(response?.data?.statusCode === "404") {
          toast.error(The_Current_Password_didnt_match);
          setManageProfileState({...manageProfileState, 
            new_password: "", 
            current_password: ""
          })
          setChangePassLoading(false);
        }
      } else {
        toast.error(you_have_to_enter_at_least_5_digit);
        setManageProfileState({...manageProfileState, 
          new_password: "", 
          current_password: ""
        })
        setChangePassLoading(false);
      }
    } catch (error) {
      //console.log("error", error);
      setChangePassLoading(false);
    }
  };

  const AddPaymentFuncP = async (token, image, paymentMethod, amount, id) => {
    setLoadingState(true);

    try {
      const obj = {
        Id: id,
        ModeofPayment: paymentMethod,
        Amount: amount,
        DepositSlipImage: image,
        TransactionId: "",
      };
      //console.log("rmsObj", obj, token);

      const response = await endpoints.AddPaymentFunc(token, obj);
      if (response) {
        //console.log("response", response);
        setLoadingState(false);
        // setRmsFeedbackState({ ...rmsFeedbackState, image: "", feedback: "" });
        setPaymentResubmitState();
      }
      setLoadingState("");
    } catch (err) {
      setLoadingState(false);
    }

    getCourseDetailRecordFunc(token, trackNumberState);
  };

  const filterTrue =
    dashboardTrackAppState?.learnerDashboardApplicationTrackTimeLineViewModels?.some(
      (item) => item?.status === "Approved"
    );
  //console.log("filterTrue", filterTrue);

  // const getDashboardTrackApplicatonFunc = async (token, code) => {
  //   try {
  //     const response = await endpoints.getDashboardTrackApplicaton(token, code);
  //     if (response) {
  //       //console.log("setDashboardTrackAppState", response?.data?.data);
  //       setDashboardTrackAppState(response?.data?.data);
  //     }
  //   } catch (error) {
  //     //console.log("error", error);
  //   }
  // };

  const [TabsIndex, setTabsIndex] = useState(0);
  const TabsArrayKey = [
    `${profile} ${info}`,
    `${tracking} ${application}`,
    `${change} ${password}`,
  ];
  const TabsArray = [
    <StyledProfileCardDiv>
      <StyledSectionRow1>
        <h2>
          <b>{profile}</b>
        </h2>
      </StyledSectionRow1>
      <div
        style={{
          marginBottom: 40,
        }}
      >
        {pictureChangeToggleState ? (
          <UploadImageAvatar
            setPictureChangeToggleState={setPictureChangeToggleState}
            defaultImage={
              imageUrl ? imageUrl : getUserProfileDashboardState?.photoUrl
              // getUserProfileDashboardState?.photoUrl
              //   ? getUserProfileDashboardState?.photoUrl
              //   : imageUrl
            }
            uploadImage={uploadImage}
            avatarSize={90}
            offsetSize={80}
          />
        ) : (
          <UploadImageAvatar
            setPictureChangeToggleState={setPictureChangeToggleState}
            defaultImage={
              getUserProfileDashboardState?.photoUrl
                ? getUserProfileDashboardState?.photoUrl
                : imageUrl
              // getUserProfileDashboardState?.photoUrl
              //   ? getUserProfileDashboardState?.photoUrl
              //   : imageUrl
            }
            uploadImage={uploadImage}
            avatarSize={90}
            offsetSize={80}
          />
        )}
      </div>
      <StyledFormDiv>
        <Row gutter={[16, 16]}>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <StyledMainDiv>
              <StyledFormInputRow>
                <Col xl={5} lg={5} md={5} sm={24} xs={24}>
                  <p className="label">{FirstName}:</p>
                </Col>
                <Col xl={19} lg={19} md={19} sm={24} xs={24}>
                  <div style={{ width: "100%" }}>
                    <StyledInput
                      type="text"
                      name={"firstName_AR"}
                      maxLength={90}
                      value={manageProfileState?.firstName_AR}
                      onChange={manageProfileInputHandler}
                      placeholder={"First Name"}
                      // onClick={() => setFirstNameState(true)}
                    />
                    {manageProfileState?.firstName_AR === "" && (
                      <StyledErrorP style={{ color: "#fa4947" }}>
                        {this_field_is_mandatory}
                      </StyledErrorP>
                    )}
                  </div>
                </Col>
              </StyledFormInputRow>
            </StyledMainDiv>
          </Col>
          <Col span={24} lg={12}>
            <StyledMainDiv>
              <StyledFormInputRow>
                <Col xl={5} lg={5} md={5} sm={24} xs={24}>
                  <p className="label">{LastName}:</p>
                </Col>
                <Col xl={19} lg={19} md={19} sm={24} xs={24}>
                  <div style={{ width: "100%" }}>
                    <StyledInput
                      type="text"
                      name={"lastName_AR"}
                      maxLength={90}
                      value={manageProfileState?.lastName_AR}
                      onChange={manageProfileInputHandler}
                      placeholder={"Last Name"}
                      // onClick={() => setFirstNameState(true)}
                    />
                    {manageProfileState?.lastName_AR === "" && (
                      <StyledErrorP style={{ color: "#fa4947" }}>
                        {this_field_is_mandatory}
                      </StyledErrorP>
                    )}
                  </div>
                </Col>
              </StyledFormInputRow>
            </StyledMainDiv>
          </Col>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <StyledMainDiv>
              <StyledFormInputRow>
                <Col xl={5} lg={5} md={5} sm={24} xs={24}>
                  <p className="label">{email}:</p>
                </Col>
                <Col xl={19} lg={19} md={19} sm={24} xs={24}>
                  <StyledDisabledInput
                    type="text"
                    name={"email"}
                    value={manageProfileState?.email}
                    maxLength={500}
                    // onChange={manageProfileInputHandler}
                    placeholder={"Email"}
                    // onClick={() => setFirstNameState(true)}
                  />
                </Col>
              </StyledFormInputRow>
            </StyledMainDiv>
          </Col>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <StyledMainDiv>
              <StyledFormInputRow>
                <Col xl={5} lg={5} md={5} sm={24} xs={24}>
                  <p className="label">{mobile_number}:</p>
                </Col>
                <Col xl={19} lg={19} md={19} sm={24} xs={24}>
                  {/* <Dropdown overlay={menu1}>
                      <LanguageButton>
                        <Space>
                          <Avatar
                            size={24}
                            src={selectLanguage?.img}
                          />
                          <p>{selectLanguage?.name}</p>
                          <DownOutlined />
                        </Space>
                      </LanguageButton>
                    </Dropdown> */}
                  <StyledDisabledInput
                    type={"text"}
                    name={"phone_number"}
                    value={manageProfileState?.phone_number}
                    // onChange={manageProfileInputHandler}
                    placeholder={"Mobile Number"}
                    // onClick={() => setPhoneNumberState(true)}
                  />
                </Col>
              </StyledFormInputRow>
            </StyledMainDiv>
          </Col>

          <Col span={24}>
            <StyledMainDiv>
              <StyledFormInputRow>
                <StyledBioCol xl={2} lg={2} md={2} sm={24} xs={24}>
                  <div>
                    <p className="label">{your_bio}:</p>
                    <p className="label-sub">{add_short_introduction}</p>
                  </div>
                </StyledBioCol>
                <StyledMarginLeftPerCol xl={21} lg={21} md={21} sm={24} xs={24}>
                  <StyledTextArea
                    type="text"
                    name={"bio"}
                    showCount
                    maxLength={750}
                    value={manageProfileState?.bio}
                    onChange={manageProfileInputHandler}
                    placeholder={`${add_short_bio}....`}
                    rows={10}
                    // onClick={() => setFirstNameState(true)}
                  />
                </StyledMarginLeftPerCol>
              </StyledFormInputRow>
            </StyledMainDiv>
          </Col>
        </Row>
      </StyledFormDiv>
      <StyledUpdateBtnDiv>
        <CustomButton
          customStyle={{
            background: "#fff",
            color: "#105F43",
            border: "1px solid #105F43",
            borderRadius: "5px",
            marginLeft: 10,
          }}
          onClick={()=>router.push('/ar/dashboard')}
        >
          {cancel}
        </CustomButton>
        {manageProfileState?.firstName_AR === "" ||
        manageProfileState?.lastName_AR === "" ? (
          <CustomButton
            customStyle={{
              // paddingInline: 30,
              background: "rgb(224, 224, 224)",
              borderRadius: 8,
              color: "#fff",
            }}
          >
            {save} {and} {update}
          </CustomButton>
        ) : (
          <CustomButton
            customStyle={{
              background: "#105F43",
              color: "#fff",
              border: "1px solid #105F43",
              borderRadius: "5px",
            }}
            onClick={() => modifyProfileFunc(manageProfileState)}
          >
            {save} {and} {update}
          </CustomButton>
        )}
      </StyledUpdateBtnDiv>
    </StyledProfileCardDiv>,
    <StyledProfileCardDiv>
      <StyledSectionRow2>
        <h2>
          <b>{tracking_your_application}</b>
        </h2>
      </StyledSectionRow2>
      <Row>
        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <StyledInput
            type={"text"}
            placeholder={Please_enter_your_tracking_number}
            onChange={(e) => setTrackNumberState(e.target.value)}
            value={trackNumberState}
            suffix={<img loading="lazy"alt={""} height={15} width={15} src={SearchIcon} />}
          />
        </Col>
      </Row>
      {trackYourApplicationState === null ? (
        <StyledEmptyData>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={No_Data} />
        </StyledEmptyData>
      ) : (
        <>
          <StyledFormDiv>
            <Row gutter={[16, 16]}>
              <Col xl={10} lg={10} md={10} sm={24} xs={24}>
                <TrackApplicationCardDiv>
                  <ApplicationStatusRow>
                    <h1>
                      {trackYourApplicationState?.courseTrainingRecordType}{" "}
                      {Information}
                    </h1>
                  </ApplicationStatusRow>
                  {courseInfoArr?.map((item, index) => (
                    <StyledTagRow key={index}>
                      <p className="title">
                        <b>{item.title}</b>
                      </p>
                      <p>{item.value}</p>
                    </StyledTagRow>
                  ))}
                </TrackApplicationCardDiv>
              </Col>

              <Col xl={14} lg={14} md={14} sm={24} xs={24}>
                {pay_now ? (
                  <TrackApplicationCardDiv2ActiveBtn>
                    <AdditionalInformationRow>
                      <h1>
                        {tracking} {Information}
                      </h1>
                    </AdditionalInformationRow>

                    <>
                      {trackYourApplicationState?.learnerDashboardApplicationTrackTimeLineViewModels?.map(
                        (item, index) => (
                          <div key={index}>
                            {item?.status === "ForwardtoFinance" ? (
                              <StyledTimeline mode={"left"}>
                                <Timeline.Item
                                  key={index}
                                  color={item?.statusColorNameValue}
                                  label={
                                    <ApplicationStatusDateDiv>
                                      <p>
                                        {moment(item?.dt).format(
                                          "YYYY ,DD MMM"
                                        )}
                                      </p>
                                    </ApplicationStatusDateDiv>
                                  }
                                >
                                  <StyledTimeLineRow>
                                    <StyledcommentsDiv>
                                      <p className="Bold">
                                        {item?.statusValue_AR}
                                      </p>
                                      <p className="Light">
                                        تهانينا! لقد تمت الموافقة على طلبك
                                        وتحويله إلى قسم التمويل ، يرجى الانتظار
                                        للحصول على رابط الدفع
                                      </p>
                                    </StyledcommentsDiv>
                                  </StyledTimeLineRow>
                                </Timeline.Item>
                              </StyledTimeline>
                            ) : (
                              <>
                                {item?.status === "PaymentReceived" && (
                                  <StyledTimeline mode={"left"}>
                                    <Timeline.Item
                                      key={index}
                                      color={item?.statusColorNameValue}
                                      label={
                                        <ApplicationStatusDateDiv>
                                          <p>
                                            {moment(item?.dt).format(
                                              "YYYY ,DD MMM"
                                            )}
                                          </p>
                                        </ApplicationStatusDateDiv>
                                      }
                                    >
                                      <StyledTimeLineRow>
                                        <StyledcommentsDiv>
                                          <p className="Bold">
                                            {item?.statusValue_AR}
                                          </p>
                                          <p className="Light">
                                            {item?.comments}
                                          </p>
                                        </StyledcommentsDiv>
                                      </StyledTimeLineRow>
                                    </Timeline.Item>
                                  </StyledTimeline>
                                )}
                                {item?.status === "PaymentProceed" && (
                                  <StyledTimeline mode={"left"}>
                                    <Timeline.Item
                                      key={index}
                                      color={item?.statusColorNameValue}
                                      label={
                                        <ApplicationStatusDateDiv>
                                          <p>
                                            {moment(item?.dt).format(
                                              "YYYY ,DD MMM"
                                            )}
                                          </p>
                                        </ApplicationStatusDateDiv>
                                      }
                                    >
                                      <StyledTimeLineRow>
                                        <StyledcommentsDiv
                                          style={{
                                            display: "grid",
                                            width: "100%",
                                          }}
                                        >
                                          <Row>
                                            <Col span={10}>
                                              <p className="Bold">
                                                {item?.statusValue_AR}
                                              </p>
                                              <p className="Light">
                                                الرجاء تحديد خيار الدفع
                                              </p>
                                            </Col>

                                            <>
                                              {filterTrue ? (
                                                <Col
                                                  span={14}
                                                  style={{
                                                    display: "flex",
                                                    justifyContent: "end",
                                                    alignItems: "center",
                                                  }}
                                                >
                                                  <StyledSubmittedP>
                                                    {submitted}
                                                  </StyledSubmittedP>
                                                </Col>
                                              ) : (
                                                <>
                                                  <Col span={14}>
                                                    <StyledSelectDropDown
                                                      defaultValue="Select"
                                                      onChange={(value) => {
                                                        setDropdownStatusState(
                                                          value
                                                        );
                                                      }}
                                                      options={[
                                                        {
                                                          value:
                                                            "Upload Payment Proof",
                                                          label:
                                                            "Upload Payment Proof",
                                                        },
                                                        {
                                                          value:
                                                            "Online Payment",
                                                          label:
                                                            "Online Payment",
                                                        },
                                                      ]}
                                                    />
                                                    {dropdownStatusState ===
                                                    "Upload Payment Proof" ? (
                                                      <p
                                                        onClick={() => {
                                                          if (
                                                            paymentResubmitState
                                                          ) {
                                                            setPaymentResubmitState();
                                                          } else {
                                                            setPaymentResubmitState(
                                                              item?.id
                                                            );
                                                          }
                                                        }}
                                                        style={{
                                                          textAlign: "center",
                                                        }}
                                                        className="resubmit"
                                                      >
                                                        تحميل إثبات الدفع
                                                      </p>
                                                    ) : (
                                                      <p
                                                        style={{
                                                          textAlign: "center",
                                                        }}
                                                        className="resubmit"
                                                      >
                                                        الرجاء تحديد طريقة الدفع
                                                      </p>
                                                    )}
                                                  </Col>
                                                </>
                                              )}
                                            </>
                                          </Row>
                                        </StyledcommentsDiv>
                                      </StyledTimeLineRow>
                                    </Timeline.Item>
                                  </StyledTimeline>
                                )}
                                {paymentResubmitState === item?.id && (
                                  <>
                                    <StyledBoldP>
                                      * يرجى تحميل إيصال الدفع الخاص بك
                                    </StyledBoldP>
                                    <StyledUpload
                                      maxCount={1}
                                      {...{
                                        name: "file",
                                        action:
                                          "https://www.google.com/",
                                        headers: {
                                          authorization: "authorization-text",
                                        },
                                        async onChange(info) {
                                          if (
                                            info?.file?.status !== "uploading"
                                          ) {
                                            // //console.log(
                                            //   "dashboardTrackAppStateBefore",
                                            //   dashboardTrackAppState
                                            // );
                                            AddPaymentFuncP(
                                              getCookies("token"),
                                              info?.file?.originFileObj,
                                              "CashDeposit",
                                              item?.invoiceAmount,
                                              trackYourApplicationState?.registrationId
                                            );
                                            setPaymentResubmitState();
                                          }
                                          if (info?.file?.status === "done") {
                                            // setEditIndexState(121098021098);
                                          } else if (
                                            info?.file?.status === "error"
                                          ) {
                                            // setEditIndexState(121098021098);
                                          }
                                        },
                                      }}
                                    >
                                      <Button icon={<ImAttachment />}>
                                        انقر للتحميل
                                      </Button>
                                    </StyledUpload>
                                  </>
                                )}
                                {item?.status === "InitialApproval" && (
                                  <StyledTimeline mode={"left"}>
                                    <Timeline.Item
                                      key={index}
                                      color={item?.statusColorNameValue}
                                      label={
                                        <ApplicationStatusDateDiv>
                                          <p>
                                            {moment(item?.dt).format(
                                              "YYYY ,DD MMM"
                                            )}
                                          </p>
                                        </ApplicationStatusDateDiv>
                                      }
                                    >
                                      <StyledTimeLineRow>
                                        <StyledcommentsDiv>
                                          <p className="Bold">
                                            {item?.statusValue_AR}
                                          </p>
                                          <p className="Light">
                                            {item?.comments}
                                          </p>
                                        </StyledcommentsDiv>
                                      </StyledTimeLineRow>
                                    </Timeline.Item>
                                  </StyledTimeline>
                                )}
                                {item?.status === "AssignedToRMS" && (
                                  <StyledTimeline mode={"left"}>
                                    <Timeline.Item
                                      key={index}
                                      color={item?.statusColorNameValue}
                                      label={
                                        <ApplicationStatusDateDiv>
                                          <p>
                                            {moment(item?.dt).format(
                                              "YYYY ,DD MMM"
                                            )}
                                          </p>
                                        </ApplicationStatusDateDiv>
                                      }
                                    >
                                      <StyledTimeLineRow>
                                        <StyledcommentsDiv>
                                          <p className="Bold">
                                            {item?.statusValue_AR}
                                          </p>
                                          <p className="Light">
                                            {item?.comments ===
                                            "Application Assigned"
                                              ? "تم تعيين التطبيق"
                                              : item?.comments}
                                          </p>
                                        </StyledcommentsDiv>
                                      </StyledTimeLineRow>
                                    </Timeline.Item>
                                  </StyledTimeline>
                                )}
                                {item?.status === "AssignedToManager" && (
                                  <StyledTimeline mode={"left"}>
                                    <Timeline.Item
                                      key={index}
                                      color={item?.statusColorNameValue}
                                      label={
                                        <ApplicationStatusDateDiv>
                                          <p>
                                            {moment(item?.dt).format(
                                              "YYYY ,DD MMM"
                                            )}
                                          </p>
                                        </ApplicationStatusDateDiv>
                                      }
                                    >
                                      <StyledTimeLineRow>
                                        <StyledcommentsDiv>
                                          <p className="Bold">
                                            {item?.statusValue_AR}
                                          </p>
                                          <p className="Light">
                                            {item?.comments}
                                          </p>
                                        </StyledcommentsDiv>
                                      </StyledTimeLineRow>
                                    </Timeline.Item>
                                  </StyledTimeline>
                                )}
                                {item?.status === "Inprogress" && (
                                  <StyledTimeline mode={"left"}>
                                    <Timeline.Item
                                      key={index}
                                      color={item?.statusColorNameValue}
                                      label={
                                        <ApplicationStatusDateDiv>
                                          <p>
                                            {moment(item?.dt).format(
                                              "YYYY ,DD MMM"
                                            )}
                                          </p>
                                        </ApplicationStatusDateDiv>
                                      }
                                    >
                                      <StyledTimeLineRow>
                                        <StyledcommentsDiv>
                                          <p className="Bold">
                                            {item?.statusValue_AR}
                                          </p>
                                          <p className="Light">
                                            {item?.comments}
                                          </p>
                                        </StyledcommentsDiv>
                                      </StyledTimeLineRow>
                                    </Timeline.Item>
                                  </StyledTimeline>
                                )}
                                {item?.status === "RefusalbyRMS" && (
                                  <StyledTimeline mode={"left"}>
                                    <Timeline.Item
                                      key={index}
                                      color={item?.statusColorNameValue}
                                      label={
                                        <ApplicationStatusDateDiv>
                                          <p>
                                            {moment(item?.dt).format(
                                              "YYYY ,DD MMM"
                                            )}
                                          </p>
                                        </ApplicationStatusDateDiv>
                                      }
                                    >
                                      <StyledTimeLineRow>
                                        <StyledcommentsDiv>
                                          <p className="Bold">
                                            {item?.statusValue_AR}
                                          </p>
                                          <p className="Light">
                                            {item?.comments}
                                          </p>
                                        </StyledcommentsDiv>
                                      </StyledTimeLineRow>
                                    </Timeline.Item>
                                  </StyledTimeline>
                                )}
                                {item?.status === "RejectByManager" && (
                                  <StyledTimeline mode={"left"}>
                                    <Timeline.Item
                                      key={index}
                                      color={item?.statusColorNameValue}
                                      label={
                                        <ApplicationStatusDateDiv>
                                          <p>
                                            {moment(item?.dt).format(
                                              "YYYY ,DD MMM"
                                            )}
                                          </p>
                                        </ApplicationStatusDateDiv>
                                      }
                                    >
                                      <StyledTimeLineRow>
                                        <StyledcommentsDiv>
                                          <p className="Bold">
                                            {item?.statusValue_AR}
                                          </p>
                                          <p className="Light">
                                            {item?.comments}
                                          </p>
                                        </StyledcommentsDiv>
                                      </StyledTimeLineRow>
                                    </Timeline.Item>
                                  </StyledTimeline>
                                )}
                                {item?.status === "AdditionalRequirement" && (
                                  <>
                                    <StyledTimeline mode={"left"}>
                                      <Timeline.Item
                                        key={index}
                                        color={item?.statusColorNameValue}
                                        label={
                                          <ApplicationStatusDateDiv>
                                            <p>
                                              {moment(item?.dt).format(
                                                "YYYY ,DD MMM"
                                              )}
                                            </p>
                                          </ApplicationStatusDateDiv>
                                        }
                                      >
                                        <StyledTimeLineRow>
                                          <StyledcommentsDiv>
                                            <p className="Bold">
                                              {item?.statusValue_AR}
                                            </p>
                                            <p className="Light">
                                              {item?.comments}
                                            </p>
                                          </StyledcommentsDiv>
                                          <StyledTimeLineRowLastDiv>
                                            {item?.feedback ? (
                                              <p className="submit">
                                                {submitted}
                                              </p>
                                            ) : (
                                              <p
                                                onClick={() => {
                                                  if (submitState) {
                                                    setSubmitState();
                                                  } else {
                                                    setSubmitState(item?.id);
                                                  }
                                                }}
                                                className="resubmit"
                                              >
                                                {Resubmit}
                                              </p>
                                            )}
                                          </StyledTimeLineRowLastDiv>
                                        </StyledTimeLineRow>
                                      </Timeline.Item>
                                    </StyledTimeline>
                                    {submitState === item?.id}
                                    {submitState === item?.id && (
                                      <>
                                        {item?.allowFileUpload ? (
                                          <>
                                            <StyledBoldP>
                                              * {item?.subject}
                                            </StyledBoldP>
                                            <StyledUpload
                                              maxCount={1}
                                              {...{
                                                name: "file",
                                                action:
                                                  "https://www.google.com/",
                                                headers: {
                                                  authorization:
                                                    "authorization-text",
                                                },
                                                async onChange(info) {
                                                  if (
                                                    info?.file?.status !==
                                                    "uploading"
                                                  ) {
                                                    rmsCourseTrainingRegistrationFeedbackFunc(
                                                      getCookies("token"),
                                                      info?.file?.originFileObj,
                                                      "",
                                                      item?.id
                                                    );
                                                  }
                                                  if (
                                                    info?.file?.status ===
                                                    "done"
                                                  ) {
                                                    // setEditIndexState(121098021098);
                                                  } else if (
                                                    info?.file?.status ===
                                                    "error"
                                                  ) {
                                                    // setEditIndexState(121098021098);
                                                  }
                                                  // setSubmitState();
                                                },
                                              }}
                                            >
                                              <Button icon={<ImAttachment />}>
                                                انقر للتحميل
                                              </Button>
                                            </StyledUpload>
                                          </>
                                        ) : (
                                          <>
                                            <p>* {item?.subject}</p>
                                            <StyledSubmitDiv>
                                              <StyledInput
                                                type="text"
                                                name="feedback"
                                                onChange={(e) =>
                                                  setRmsFeedbackState(
                                                    e?.target?.value
                                                  )
                                                }
                                                placeholder={
                                                  item?.subject
                                                    ? item?.subject
                                                    : item?.comments
                                                }
                                              />
                                              {rmsFeedbackState === "" ? (
                                                <CustomButton
                                                  customStyle={{
                                                    height: "40px",
                                                    background: "#E0E0E0",
                                                    borderRadius: 8,
                                                    color: "#fff",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    cursor: "not-allowed",
                                                    marginRight: " 10px",
                                                  }}
                                                >
                                                  {Submit}
                                                </CustomButton>
                                              ) : (
                                                <CustomButton
                                                  customStyle={{
                                                    height: "40px",
                                                    background: "#064B33",
                                                    color: "#fff",
                                                    marginRight: " 10px",
                                                  }}
                                                  onClick={() =>
                                                    rmsCourseTrainingRegistrationFeedbackFunc(
                                                      getCookies("token"),
                                                      "",
                                                      rmsFeedbackState,
                                                      item?.id
                                                    )
                                                  }
                                                >
                                                  {Submit}
                                                </CustomButton>
                                              )}
                                            </StyledSubmitDiv>
                                          </>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}

                                {item?.modeOfPayment === "CashDeposit" &&
                                  item?.status === "Approved" && (
                                    <StyledTimeline mode={"left"}>
                                      <Timeline.Item
                                        key={index}
                                        color={item?.statusColorNameValue}
                                        label={
                                          <ApplicationStatusDateDiv>
                                            <p>
                                              {moment(item?.dt).format(
                                                "YYYY ,DD MMM"
                                              )}
                                            </p>
                                          </ApplicationStatusDateDiv>
                                        }
                                      >
                                        <StyledTimeLineRow>
                                          <StyledcommentsDiv>
                                            <p className="Bold">
                                              {item?.statusValue_AR}
                                            </p>
                                            <p className="Light">
                                              تهانينا! تمت الموافقة على دورتك.
                                              يرجى التحقق من بريدك الإلكتروني
                                              للحصول على بيانات اعتماد تسجيل
                                              الدخول
                                            </p>
                                          </StyledcommentsDiv>
                                        </StyledTimeLineRow>
                                      </Timeline.Item>
                                    </StyledTimeline>
                                  )}
                              </>
                            )}
                          </div>
                        )
                      )}
                    </>
                    {/* <StyledPayRow>
                    <CustomButton
                      customStyle={{
                        background: "#105F43",
                        color: "#fff",
                        paadingInline: 20,
                      }}
                    >
                      Pay Now
                    </CustomButton>
                  </StyledPayRow> */}
                  </TrackApplicationCardDiv2ActiveBtn>
                ) : (
                  <TrackApplicationCardDiv2>
                    <AdditionalInformationRow>
                      <h1>
                        {application} {tracking} {Timeline}
                      </h1>
                    </AdditionalInformationRow>

                    <StyledTimeline mode={"left"}>
                      <Timeline.Item
                        color="green"
                        label={
                          <ApplicationStatusDateDiv>
                            <p>10 Feb, 2022</p>
                          </ApplicationStatusDateDiv>
                        }
                      >
                        <StyledTimeLineRow>
                          <p>Create a services</p>
                          <p>10 Feb, 2022</p>
                        </StyledTimeLineRow>
                      </Timeline.Item>
                      <Timeline.Item
                        color="green"
                        label={
                          <ApplicationStatusDateDiv>
                            <p>10 Feb, 2022</p>
                          </ApplicationStatusDateDiv>
                        }
                      >
                        <StyledTimeLineRow>
                          <p>{submitted}</p>
                          <p>10 Feb, 2022</p>
                        </StyledTimeLineRow>
                      </Timeline.Item>
                      <Timeline.Item
                        color="yellow"
                        label={
                          <ApplicationStatusDateDiv>
                            <p>10 Feb, 2022</p>
                          </ApplicationStatusDateDiv>
                        }
                      >
                        <StyledTimeLineRow>
                          <p>Under Review</p>
                          <p>10 Feb, 2022</p>
                        </StyledTimeLineRow>
                      </Timeline.Item>
                      <Timeline.Item
                        color="red"
                        label={
                          <ApplicationStatusDateDiv>
                            <p>10 Feb, 2022</p>
                          </ApplicationStatusDateDiv>
                        }
                      >
                        <StyledTimeLineRowLast>
                          <p>Rejected</p>
                          <StyledTimeLineRowLastDiv>
                            <p className="resubmit">Resubmit</p>
                            <p>10 Feb, 2022</p>
                          </StyledTimeLineRowLastDiv>
                        </StyledTimeLineRowLast>
                      </Timeline.Item>
                    </StyledTimeline>
                  </TrackApplicationCardDiv2>
                )}
              </Col>
            </Row>
          </StyledFormDiv>
        </>
      )}
    </StyledProfileCardDiv>,
    <StyledProfileCardDiv>
      <StyledSectionRow1>
        <h2>
          {change} {password}
        </h2>
      </StyledSectionRow1>
      <StyledFormDiv>
        <Row gutter={[16, 16]}>
          <Col xl={15} lg={15} md={15} sm={24} xs={24}>
            <StyledMainDiv>
              <StyledFormInputRow>
              <Col md={5} sm={24} xs={24}>
                  <p className="label"> {Current} {password}: </p>
                </Col>
                <Col md={19} sm={24} xs={24}>
                  <StyledInputPassword
                    type="password"
                    name={"current_password"}
                    value={manageProfileState?.current_password}
                    onChange={(e)=>{
                      manageProfileInputHandler(e);
                      setPasswordValidationState(passwordValidation(e.target.value))
                    }}
                    onFocus={()=>setPasswordValidationToggleState(true)}
                    placeholder={`${change} ${password}`}
                  />

                  {passwordValidationToggleState&&manageProfileState?.current_password===""?(
                    <StyledErrorP>
                      {Current} {password} {is_mandatory}
                    </StyledErrorP>
                  ) : (
                    <>
                      {passwordValidationToggleState && (
                        <>
                          {manageProfileState?.current_password === undefined && (
                            <StyledErrorP>
                              {passwordValidationState}
                            </StyledErrorP>
                          )}
                          {passwordValidationState ===
                          "Invalid Password" ? (
                            <StyledErrorP>
                              {/* {passwordValidationState} */}
                               {message_ar}
                            </StyledErrorP>
                          ) : (
                            <>
                              {manageProfileState?.current_password === "" && (
                                <StyledErrorP>
                                  {passwordValidationState}
                                </StyledErrorP>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </Col>
              </StyledFormInputRow>
            </StyledMainDiv>
          </Col>
          <Col xl={15} lg={15} md={15} sm={24} xs={24}>
            <StyledMainDiv>
              <StyledFormInputRow>
                <Col md={5} sm={24} xs={24}>
                  <p className="label"> {new_i} {password}: </p>
                </Col>
                <Col md={19} sm={24} xs={24}>
                  <StyledInputPassword
                    type="password"
                    name={"new_password"}
                    value={manageProfileState?.new_password}
                    onChange={(e)=>{
                      manageProfileInputHandler(e);
                      setNewPasswordValidationState(passwordValidation(e.target.value))
                    }}
                    placeholder={`${change} ${new_i} ${password}`}
                    onFocus={()=>setNewPasswordValidationToggleState(true)}
                  />
              
                  {newPasswordValidationToggleState&&manageProfileState?.new_password===""?(
                    <StyledErrorP>
                      {new_i} {password} {is_mandatory}
                    </StyledErrorP>
                  ) : (
                    <>
                      {newPasswordValidationToggleState && (
                        <>
                          {manageProfileState?.new_password === undefined && (
                            <StyledErrorP>
                              {newPasswordValidationState}
                            </StyledErrorP>
                          )}
                          {newPasswordValidationState ===
                          "Invalid Password" ? (
                            <StyledErrorP>
                              {newPasswordValidationState==="Invalid Password"&&message_ar}
                            </StyledErrorP>
                          ) : (
                            <>
                              {manageProfileState?.new_password === "" && (
                                <StyledErrorP>
                                  {newPasswordValidationState}
                                </StyledErrorP>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </Col>
              </StyledFormInputRow>
            </StyledMainDiv>
          </Col>
        </Row>
      </StyledFormDiv>
      <StyledUpdateBtnDiv>
        {(manageProfileState?.current_password === "" || manageProfileState?.new_password === ""||(newPasswordValidationState==="Invalid Password"||passwordValidationState==="Invalid Password")) ? (
          <CustomButton
            customStyle={{
              background: "rgb(224, 224, 224)",
              color: "#fff",
              // border: "1px solid #105F43",
              borderRadius: "5px",
            }}
          >
            {save}
          </CustomButton>
        ) : (<>
          {(ChangePassLoading) ? (
            <CustomButton
              customStyle={{
                background: "rgb(224, 224, 224)",
                color: "#fff",
                // border: "1px solid #105F43",
                borderRadius: "5px",
              }}
            >
              {save}
            </CustomButton>
          ) : (
            <CustomButton
              customStyle={{
                background: "#105F43",
                color: "#fff",
                border: "1px solid #105F43",
                borderRadius: "5px",
              }}
              onClick={() => createLMSUsersFunc(token, manageProfileState)}
            >
              {save}
            </CustomButton>
          )}
        </>)}
      </StyledUpdateBtnDiv>
    </StyledProfileCardDiv>,
  ];

  // useLayoutEffect(() => {
  //   getDashboardTrackApplicatonFunc(token, trackNumberState);
  // }, []);

  const rmsCourseTrainingRegistrationFeedbackFunc = async (
    token,
    image,
    feedback,
    id
  ) => {
    try {
      const obj = {
        Image: image,
        RMSCourseTrainingRegistrationId: id,
        Feedback: feedback,
      };
      //console.log("rmsObj", obj);

      const response = await endpoints.rmsCourseTrainingRegistrationFeedback(
        token,
        obj
      );
      if (response) {
        //console.log("responseObj", response);
        setSubmitState();
      }
    } catch (err) {
      //console.log("err", err);
    }

    getCourseDetailRecordFunc(token, trackNumberState);
  };

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
                <StyledMainFilterRow gutter={[24, 24]}>
                  <StyledFilterRow gutter={[16, 16]}>
                    <Col span={24}>
                      <MainHeading>{manage_profile}</MainHeading>
                    </Col>
                    <Col span={24}>
                      <CoursesTabs>
                        <div className="tabs-head">
                          {TabsArrayKey?.map((item, index) => (
                            <a
                              className={index === TabsIndex && "active"}
                              onClick={() => {
                                setTabsIndex(index);
                              }}
                            >
                              {" "}
                              {item}{" "}
                            </a>
                          ))}
                        </div>
                        <div className="tabs-body">
                          {TabsArray?.map((item, index) => (
                            <>{index === TabsIndex && item}</>
                          ))}
                        </div>
                      </CoursesTabs>
                    </Col>
                  </StyledFilterRow>
                </StyledMainFilterRow>
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
  // font-weight: 600;
  margin-bottom: 10px;
  font-family: "GESSTwoBold";
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
    // font-family: "TitilliumNormal", sans-serif;
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
    // font-family: "TitilliumNormal", sans-serif;
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
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border: 1px solid #c1c1c1 !important;
  }
  .ant-select-selection-item {
    // font-family: "TitilliumNormal", sans-serif;
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
  height: 40px;
  // padding: 15px 20px;
`;

const StyledDisabledInput = styled(Input)`
  background: #f4f4f4;
  border: 1px solid #bcbcbc;
  border-radius: 4px;
  height: 44px;
  border-radius: 7px;
`;

const StyledInputPassword = styled(Input.Password)`
  // background: #f8f8f8;
  border: 1px solid #bcbcbc;
  border-radius: 7px;
  height: 40px;
  // padding: 15px 20px;
`;

const StyledTextAreaRow = styled(Row)`
  margin-top: 15px;
`;

const StyledLabelP = styled.p`
  color: #2e2e2e;
  // font-family: "TitilliumNormal", sans-serif;
  margin-top: 20px;
`;

const StyledLabelP1 = styled.p`
  color: #2e2e2e;
  // font-family: "TitilliumNormal", sans-serif;
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
  .ant-timeline-item-left {
    padding-bottom: 0 !important;
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
  border-radius: 4px !important;
  border: 1px solid #c1c1c1 !important;
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
    // font-family: "TitilliumNormal", sans-serif;
    font-size: 14px;
    margin-bottom: 0px;
  }
`;

const StyledSectionRow1 = styled(Row)`
  justify-content: space-between;
  align-items: center;
  width: 100%;
  h2 {
    // font-family: "TitilliumNormal", sans-serif;
    font-size: 14px;
    margin-bottom: 30px;
  }
`;

const StyledSectionRow2 = styled(Row)`
  justify-content: space-between;
  align-items: center;
  width: 100%;
  h2 {
    // font-family: "TitilliumNormal", sans-serif;
    font-size: 14px;
  }
`;

const StyledSearchDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 420px !important;
`;

const StyledSearchInput = styled(Input)`
  border-radius: 9px !important;
`;

const StyledMainFilterRow = styled(Row)`
  margin-inline: -4px !important;
`;

const CoursesTabs = styled.div`
  position: relative;

  .tabs-head {
    overflow-y: hidden;
    overflow-x: auto;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #a8a8a8;

    &::-webkit-scrollbar {
      height: 0;
    }

    a {
      display: inline-block;
      font-size: 14px;
      color: #a8a8a8;
      padding: 10px 0;
      margin-bottom: -1px;
      white-space: nowrap;
      user-select: none;
      border-bottom: 2px solid transparent;

      &.active {
        color: #105f43;
        font-weight: 500;
        text-shadow: 0 0 0.25px #105f43;
        border-bottom: 2px solid #105f43;
      }

      &:not(:last-child) {
        margin-left: 32px;
      }
    }
  }

  .tabs-body {
    padding: 16px 0;
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

    @media screen and (max-width: 800px) {
      margin-bottom: 6px;
    }
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
  height: 40px !important;
  top: -1px !important;
  width: 125px !important;
  // font-family: "TitilliumNormal", sans-serif !important;
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
    // font-family: "TitilliumNormal", sans-serif !important;
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
      margin-right: 10px;
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
    // font-family: "TitilliumNormal";
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
  // font-family: InterNormal, sans-serif;
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
  // font-family: InterNormal, sans-serif;
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
    // font-family: InterNormal, sans-serif;
  }
`;

const AdditionalInformationRow = styled(Row)`
  display: flex;
  justify-content: space-between;
  h1 {
    margin-bottom: 20px;
    // font-family: "TitilliumNormal";
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
    right: calc(50% - -16px) !important;
    text-align: right !important;
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
  @media (min-width: 992px) {
  }
  @media (max-width: 991px) {
    p {
      font-size: 12px !important;
    }
  }
  @media (min-width: 1509px) {
    width: 322px !important;
  }
  @media only screen and (min-width: 1342px) and (max-width: 1509px) {
    width: 260px !important;
  }

  @media only screen and (min-width: 1200px) and (max-width: 1342px) {
    width: 220px !important;
  }
  @media only screen and (min-width: 1160px) and (max-width: 1200px) {
    width: 220px !important;
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
  // font-family: InterNormal, sans-serif !important;
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
    width: 322px !important;
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
  .ant-col:first-child {
    display: flex;
    align-items: center;
  }
`;

const StyledMarginLeftPerCol = styled(Col)`
  @media (min-width: 992px) {
    margin-right: 2%;
  }
  @media (max-width: 991px) {
  }
`;

const StyledBioCol = styled(Col)`
  display: flex !important;
  align-items: start !important;
`;

const StyledInputNumber = styled(PhoneInput)`
  background: #f8f8f8;
  border: 1px solid #c1c1c1;
  border-radius: 5px;
  padding: 15px 20px;
  width: 100%;
  .flag-dropdown {
    position: absolute !important;
    top: 0 !important;
    bottom: 0 !important;
    background: transparent !important;
    padding: 0 !important;
    background-color: transparent !important;
    border: 1px solid transparent !important;
    border-radius: 3px 0 0 3px !important;
  }
  .react-tel-input .flag-dropdown.open .selected-flag {
    background: transparent !important;
    border-radius: 3px 0 0 0 !important;
  }
  .selected-flag:hover {
    background-color: transparent !important;
  }
  .react-tel-input {
    border: none !important;
  }
  .form-control {
    border: none !important;
    background: transparent !important;
    // padding-left: unset !important;
    font-family: 'GESSTwoLight';
    -moz-transform: scaleX(-1);
  }
`;

const StyledEmptyData = styled.div`
  padding-block: 20px;
`;

const StyledcommentsDiv = styled.div`
  display: grid;
  .Bold {
    font-weight: bold !important;
  }
  .Light {
  }
`;

const StyledUpload = styled(Upload)`
  width: 93% !important;
  .ant-btn {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    width: 100% !important;
    align-items: center;
    height: 35px !important;
    border-radius: 5px !important;
    margin-bottom: 20px;
  }
  .ant-input {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    width: 100% !important;
    align-items: center;
    height: 35px !important;
    border-radius: 5px !important;
    margin-bottom: 20px;
  }
  .ant-upload {
    width: 100% !important;
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
  .ant-btn:hover {
    color: #000 !important;
  }
  .ant-btn:focus {
    color: #000 !important;
  }
`;

const StyledSubmittedP = styled.p`
  cursor: pointer;
  color: #064b33;
  &:hover {
    text-decoration: underline;
  }
`;
const StyledSubmitDiv = styled.div`
  display: flex;
  width: 94%;
  margin-bottom: 30px;
`;

const StyledBoldP = styled.p`
  font-weight: bold;
  font-size: 12px;
`;

const StyledSelectDropDown = styled(Select)`
  .ant-select-selector {
    border-left: 1px solid #fff !important;
    border-right: 1px solid #fff !important;
    border-top: 1px solid #fff !important;
    border-bottom: 1px solid #d9d9d9 !important;
    width: 180px !important;
  }
`;

const StyledErrorP = styled.p`
  margin-bottom: 0px;
  color: #fa4947 !important;
  font-size: 13px !important;
`;
