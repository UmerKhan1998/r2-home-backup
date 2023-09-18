import React, { useState, useLayoutEffect } from "react";
import styled from "styled-components";
import { Alert, Button, Checkbox, Col, Input, Row, Select, Upload } from "antd";
import {
  alert_icon,
  CloseButton,
  Envelope,
  GreenLoader,
  MobileImg,
  RightClickCircle,
} from "../../../images";
import { setCookies } from "../../helpers/cookie";
import CustomButton from "../Button";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { emailValidation } from "../../helpers/EmailValidation";
import { ImAttachment, ImCross } from "react-icons/im";
import Image from "next/image";
import { CloseOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { AiFillEye } from "react-icons/ai";
import { menuService } from "../../redux/actions";
import { useDispatch } from "react-redux";
const { TextArea } = Input;

const Modal = ({
  openModal,
  setOpenModal,
  inputHandler,
  successMessageState,
  supportState,
  setSupportState,
  selectService,
  contactUsFunc,
  loadingState,
  setEmailState,
          emailState,
          setNameState,
          nameState,
          setPhoneState,
          setSelectServiceState,
          phoneState,selectServiceState,
          setQueryDetailState,
          queryDetailState,
          setUrlState,
          urlState,
          setDocumentState,
          documentState,
}) => {
  const [emailValidationState, setEmailValidationState] = useState("");
  // const [emailState, setEmailState] = useState(false);
  // const [nameState, setNameState] = useState(false);
  // const [phoneState, setPhoneState] = useState(false);
  // const [queryDetailState, setQueryDetailState] = useState(false);
  // const [urlState, setUrlState] = useState();
  const dispatch=useDispatch()

  useLayoutEffect(() => {
    if (emailState) {
      setEmailValidationState(emailValidation(supportState?.your_email));
    }
    if(openModal){
      document.body.style.overflow = "hidden";
    }else{
      document.body.style.overflow = "visible";
    }
  }, [emailValidationState, supportState,openModal]);


  return (
    <>
      {openModal && (
        <StyledDiv>
          <div
            className="modalBg"
            onClick={() => {
              setOpenModal(false);
              setEmailState(false);
              setNameState(false);
              setPhoneState(false);
              setSelectServiceState(false);
              setQueryDetailState(false);
              setDocumentState(false);
              // dispatch(menuService({serviceId:"", serviceName:""}))
              dispatch(menuService({departmentId:"", departmentName:"", serviceId:"", serviceName:""}))
              setSupportState({
                ...supportState,
                your_name: "",
                your_email: "",
                select_service: "",
                service_id: "",
                number: "",
                query_detail: "",
                supporting_doc: "",
              });
            }}
          ></div>
          <ModalDiv>
            {/* {successMessageState !== "" ? (
              <Alert
                message="Success"
                description="Thank you so much for taking your time to contact us. Our
                      team will get back to you as soon as possible"
                type="success"
                showIcon
              />
            ) : ( */}
            <ConstenDiv>
              <>
                <StyledRequestServiceRow>
                  <h1>Request a Service</h1>
                  <StyledCloseOutlined             onClick={() => {
              setOpenModal(false);
              setEmailState(false);
              setNameState(false);
              setPhoneState(false);
              setDocumentState(false);
              setSelectServiceState(false);
              setQueryDetailState(false);
              // dispatch(menuService({serviceId:"", serviceName:""}))
              dispatch(menuService({departmentId:"", departmentName:"", serviceId:"", serviceName:""}))
              setSupportState({
                ...supportState,
                your_name: "",
                your_email: "",
                select_service: "",
                service_id: "",
                number: "",
                query_detail: "",
                supporting_doc: "",
              });
            }} />
                </StyledRequestServiceRow>
                <p>
                  Please fill in the form below, and our team will respond
                  accordingly for your selected service
                </p>

                <Row gutter={[16, 8]}>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <StyledFlexLabelDiv>
                      <RequiredP>*</RequiredP>
                      <StyledLabelP>Name</StyledLabelP>
                    </StyledFlexLabelDiv>
                    <StyledInput
                      placeholder="Your Name"
                      name="your_name"
                      onChange={inputHandler}
                      value={supportState?.your_name}
                      onBlur={() => setNameState(true)}
                    />
                    {nameState && (
                      <>
                        {supportState?.your_name?.trim() === "" && (
                          <StyledErrorP>Name is Mandatory</StyledErrorP>
                        )}
                      </>
                    )}
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <StyledFlexLabelDiv>
                      <RequiredP>*</RequiredP>
                      <StyledLabelP>Email</StyledLabelP>
                    </StyledFlexLabelDiv>
                    <StyledInput
                      placeholder="Your Email"
                      name="your_email"
                      onChange={inputHandler}
                      onBlur={() => setEmailState(true)}
                      value={supportState?.your_email}
                    />

                    {emailState && (
                      <>
                        {emailValidationState === "Invalid Email" ? (
                          <StyledErrorP>Invalid Email</StyledErrorP>
                        ) : (
                          <>
                            {supportState?.your_email?.trim() === ""||supportState?.your_email?.trim() === undefined && (
                              <StyledErrorP>Email is Mandatory</StyledErrorP>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </Col>

                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <StyledFlexLabelDiv>
                      <RequiredP>*</RequiredP>
                      <StyledLabelP>Selected Service</StyledLabelP>
                    </StyledFlexLabelDiv>
                    <StyledSelect
                      value={supportState?.select_service}
                      disabled
                      style={{
                        width: 120,
                      }}
                      onBlur={() => setSelectServiceState(true)}

                      onChange={(value) =>
                        setSupportState({
                          ...supportState,
                          number: selectService,
                        })
                      }
                      options={[
                        {
                          value: "jack",
                          label: "Jack",
                        },
                      ]}
                    />
                    {selectServiceState&&
                     <>
                     {supportState?.select_service?.trim() === "" && (
                       <StyledErrorP>Service is Mandatory</StyledErrorP>
                     )}
                   </>
                    }
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <StyledFlexLabelDiv>
                      <RequiredP>*</RequiredP>
                      <StyledLabelP>Contact Number</StyledLabelP>
                    </StyledFlexLabelDiv>
                    <StyledInputNumber
                      country={"sa"}
                      value={""}
                      onBlur={() => setPhoneState(true)}
                      onChange={(phone) =>
                        setSupportState({ ...supportState, number: phone })
                      }
                    />
                    {phoneState && (
                      <>
                        {supportState?.number?.trim() === "" ? (
                          <StyledErrorP>Phone number is Mandatory</StyledErrorP>
                        ):(
                          <>
                            {supportState?.number?.slice(0, 1) === "0" && (
                              <StyledErrorP>Enter valid number</StyledErrorP>
                            )}
                          </>
                        )} 
                      </>
                    )}
                  </Col>

                  <Col xl={24} lg={12} md={12} sm={24} xs={24}>
                    <StyledFlexLabelDiv>
                      <RequiredP>*</RequiredP>
                      <StyledLabelP>Add Supporting Document</StyledLabelP>
                    </StyledFlexLabelDiv>
                    {supportState?.supporting_doc === "" ? (
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
                            //console.log("info", info?.file?.type);
                            setDocumentState(true);
                            if (info.file.status !== "uploading") {
                              if (info?.file?.size < 5000000) {
                                if (
                                  info?.file?.type === "image/jpeg" ||
                                  info?.file?.type === "image/png" ||
                                  info?.file?.type === "application/pdf" ||
                                  info?.file?.type === "image/svg+xml"
                                ) {
                                  const getBase64 = (file) =>
                                    new Promise((resolve, reject) => {
                                      const reader = new FileReader();
                                      reader.readAsDataURL(file);
                                      reader.onload = () =>
                                        resolve(reader.result);
                                      reader.onerror = (error) => reject(error);
                                    });

                                  const blob = await getBase64(
                                    info.file.originFileObj
                                  );
                                  setUrlState(blob);
                                  setSupportState({
                                    ...supportState,
                                    supporting_doc: info.file.originFileObj,
                                  });
                                  // inputHandler(blob, innerIndex, "image");
                                } else {
                                  toast.error(
                                    "File type should be in JPG, PNG, PDF type"
                                  );
                                }
                              } else {
                                toast.error("File size must be less than 5MB");
                              }
                            }
                            if (info.file.status === "done") {
                              // setEditIndexState(121098021098);
                            } else if (info.file.status === "error") {
                              // setEditIndexState(121098021098);
                            }
                          },
                        }}
                      >
                        <Button icon={<ImAttachment />}>Click to Upload</Button>
                      </StyledUpload>
                    ) : (
                      <StyledImgDiv>
                        {urlState?.slice(17, 20) ===
                        "pdf" ? (
                          <StyledImgDivPdf>
                            <img
                              src={
                                "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
                              }
                              height={50}
                              width={50}
                            />
                            <CrossDiv1>
                              {/* <StyledAiFillEye
                                onClick={() =>
                                  window.open(
                                    supportState?.supporting_doc,
                                    "blank"
                                  )
                                }
                              /> */}
                              <StyledImCross
                                onClick={() =>
                                  setSupportState({
                                    ...supportState,
                                    supporting_doc: "",
                                  })
                                }
                              />
                            </CrossDiv1>
                          </StyledImgDivPdf>
                        ) : (
                          <>
                            <img
                              src={urlState}
                              height={50}
                              width={50}
                            />
                            <CrossDiv1>
                              {/* <StyledAiFillEye
                                onClick={() =>
                                  window.open(
                                    supportState?.supporting_doc,
                                    "blank"
                                  )
                                }
                              /> */}
                              <StyledImCross
                                onClick={() =>
                                  setSupportState({
                                    ...supportState,
                                    supporting_doc: "",
                                  })
                                }
                              />
                            </CrossDiv1>
                          </>
                        )}
                      </StyledImgDiv>
                    )}
                     {documentState&& (
                      <>
                        {supportState?.supporting_doc === "" && (
                          <StyledErrorP>Supporting Document is Mandatory</StyledErrorP>
                        )}
                      </>
                    )}
                  </Col>
                  <Col xl={24} lg={12} md={12} sm={24} xs={24}>
                    <StyledFlexLabelDiv>
                      <RequiredP>*</RequiredP>
                      <StyledLabelP>Query Detail</StyledLabelP>
                    </StyledFlexLabelDiv>
                    <StyledTextarea
                      rows={3}
                      placeholder="Enter your query detail"
                      name="query_detail"
                      onChange={inputHandler}
                      value={supportState?.query_detail}
                      onBlur={() => setQueryDetailState(true)}
                    />
                                        {queryDetailState && (
                      <>
                        {supportState?.query_detail?.trim() === "" && (
                          <StyledErrorP>Query detail is Mandatory</StyledErrorP>
                        )}
                      </>
                    )}
                  </Col>
                </Row>

                {emailValidationState !== "Invalid Email" &&
                // !loading &&
                supportState?.your_name !== "" &&
                supportState?.your_email !== "" &&
                // supportState?.select_service !== "" &&
                supportState?.number !== "" &&
                supportState?.number?.length>9 &&
                supportState?.number?.slice(0, 1) !== "0"&&
                supportState?.query_detail !== "" &&
                supportState?.supporting_doc !== "" ? (
                  <>
                  {loadingState?
                  <>
                  <CustomButton
                            customStyle={{
                              paddingInline: 30,
                              background: "#E0E0E0",
                              borderRadius: 8,
                              color: "#fff",
                              display: "flex",
                              alignItems: "center",
                              cursor: "not-allowed",
                      marginTop: 20,
                    }}
                          >
                            Submit &nbsp;
                            <img loading="lazy"alt={""} src={GreenLoader} height={20} width={20} />
                          </CustomButton></>
                :  
                  <CustomButton
                    customStyle={{
                      background: "#105F43",
                      color: "#fff",
                      width: 170,
                      marginTop: 20,
                    }}
                    onClick={() => contactUsFunc(supportState)}
                  >
                    Submit
                  </CustomButton>
                }

                  </>
                ) : (
                  <CustomButton
                    customStyle={{
                      background: "rgb(224, 224, 224)",
                      color: "#fff",
                      width: 170,
                      marginTop: 20,
                    }}
                    // onClick={() => contactUsFunc(supportState)}
                  >
                    Submit
                  </CustomButton>
                )}
              </>
            </ConstenDiv>
            {/* )} */}
          </ModalDiv>
        </StyledDiv>
      )}
    </>
  );
};

export default Modal;

const StyledDiv = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 10000002 !important;
  justify-content: center;

  @media (min-width: 992px) {
    align-items: center;
  }

  @media (max-width: 991px) {
    align-items: start;
  }

  .modalBg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 9999 !important;
  }
`;

const ModalDiv = styled.div`
  background: #fff;
  padding: 20px;
  width: 100%;
  max-width: 700px;
  // display: flex;
  // justify-content: center;

  z-index: 9999 !important;
  @media (min-width: 992px) {
    width: 100%;
    max-height: 620px;
    overflow: auto;
    &::-webkit-scrollbar {
      scrollbar-width: 0.5rem !important;
      width: 0.5rem !important;
    }

    &::-webkit-scrollbar-track {
      background-color: rgba(0, 0, 0, 0.1) !important;
      backdrop-filter: blur(20px) !important;
    }

    &::-webkit-scrollbar-thumb {
      background: #105f43;
      border-radius: 0.5em;
      box-shadow: inset 0.15em 0.1em 0.1em rgba(255, 255, 255, 0.5),
        inset -0.15em -0.15em 0.1em rgba(0, 0, 0, 0.3);
    }
  }
  @media (max-width: 991px) {
    width: 90%;
    margin-top: 30px;
    max-height: 520px;
    overflow-y: scroll;
  }

  border-radius: 15px;
  p {
    color: #8c8c8c;
    margin-bottom: 0px;
    font-family: "InterNormal", sans-serif;
    font-weight: 400;
    margin-bottom: 10px;
    color: #8c8c8c;
  }
  h1 {
    color: #181818;
    font-family: "TitilliumBold", sans-serif;
    // font-weight: 700;
    font-size: 22px;
  }
  .description {
    margin-block: 15px;
  }
`;

const StyledContactRow = styled(Row)`
  img {
    // margin-right: 10px;
  }
  p {
    color: #000000 !important;
  }
`;

const StyledContactRow1 = styled(Row)`
  margin-top: 10px;
  p {
    color: #000000 !important;
  }
`;

const ImgDiv1 = styled.div`
  display: flex;
  justify-content: center;
  width: 30px;
  margin-right: 5px;
`;

const ImgDiv2 = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 11px;
  margin-left: 2px;
  align-items: center;
  img {
    height: 17px;
    width: 25px;
  }
`;

const ButtonRow = styled(Row)`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .ant-btn {
    width: 49%;
  }
`;

const StyledInput = styled(Input)`
  background: #f8f8f8;
  border: 1px solid rgba(245, 245, 245, 0.1);
  border-radius: 5px;
  padding: 11px 10px;
`;

const StyledTextarea = styled(TextArea)`
  background: #f8f8f8;
  border: 1px solid rgba(245, 245, 245, 0.1);
  padding: 15px;
  border-radius: 10px;
`;

const AgrrementRow = styled(Row)`
  .ant-checkbox {
    margin-bottom: 20px;
  }
`;

const StyledErrorP = styled.p`
  margin-bottom: 0px;
  color: #fa4947 !important;
  font-size: 13px !important;
`;

const StyledSelect = styled(Select)`
  width: 100% !important;
  .ant-select-selector {
    height: 45px !important;
    align-items: center !important;
    background: #f8f8f8 !important;
    border: 1px solid #c1c1c1 !important;
    border-radius: 5px !important;
  }
`;

const StyledFlexLabelDiv = styled.div`
  display: flex;
`;

const RequiredP = styled.p`
  margin-bottom: 0px;
  color: red !important;
  margin-right: 5px;
`;
const StyledLabelP = styled.p`
  font-size: 14px !important;
  margin-bottom: 5px !important;
  font-family: "TitilliumNormal", sans-serif;
  color: #000 !important;
`;
const StyledInputNumber = styled(PhoneInput)`
  background: #f8f8f8;
  border: 1px solid #c1c1c1;
  border-radius: 5px;
  padding: 5px 7px;
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
  }
`;
const StyledUpload = styled(Upload)`
  .ant-btn {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    width: 100% !important;
    align-items: center;
    height: 45px !important;
    border-radius: 5px !important;
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
`;

const StyledRequestServiceRow = styled(Row)`
  width: 100% !important;
  display: flex !important;
  justify-content: space-between !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3) !important;
  margin-bottom: 10px !important;
  h1 {
    // border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    margin-bottom: 10px;
  }
`;

const StyledCloseOutlined = styled(CloseOutlined)`
  font-size: 24px;
  cursor: pointer;
`;

const ConstenDiv = styled.div``;
const StyledImgDiv = styled.div`
  img {
    width: 100px;
    height: 60px;
    object-fit: cover;
    border-radius: 10px;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CrossDiv1 = styled.div`
  .file-img {
    height: 14px;
    width: 14px;
    cursor: pointer;
  }
  display: flex;
  align-items: center;
`;

const StyledAiFillEye = styled(AiFillEye)`
  font-size: 20px;
  margin-right: 10px;
  cursor: pointer;
`;

const StyledImCross = styled(ImCross)`
  font-size: 14px;
  cursor: pointer;
`;

const StyledImgDivPdf = styled.div`
  width: 100%;
  img {
    width: 49px;
    height: 62px;
    object-fit: contain;
    border-radius: 10px;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
