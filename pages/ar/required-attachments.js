import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import {
  Avatar,
  Breadcrumb,
  Button,
  Checkbox,
  Col,
  Dropdown,
  Input,
  Menu,
  message,
  Modal,
  Row,
  Select,
  Space,
  Upload,
} from "antd";
import {
  AttachmentIcon,
  CloseButton,
  CompleteInformation,
  Cross,
  MobileVerification,
  R2Favicon,
  RegisterationImg,
  RightClickCircle,
  SideDesign,
} from "../../images";
import CustomButton from "../../src/components/rtl/Button";
import { DownOutlined, UploadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import ReactCodeInput from "react-code-input";
import router from "next/router";

import { ImAttachment } from "react-icons/im";
import Header from "../../src/components/rtl/header";
import Footer from "../../src/components/rtl/footer";

const { Option } = Select;

const DocumentsAttachment = () => {
  const initialState = {
    iqamaId: "",
    cv: "",
    scfhs_doc: "",
    training_letter: "",
    letter_from_scfhs: "",
    academic_record: "",
    recommendation_letter1: "",
    recommendation_letter2: "",
    recommendation_letter3: "",
  };

  const [documentsAttachmentState, setDocumentsAttachmentState] =
    useState(initialState);

  //console.log("documentsAttachmentState", documentsAttachmentState);

  const inputHandler = (e) =>
    setDocumentsAttachmentState({
      ...documentsAttachmentState,
      [e.target.name]: e.target.value,
    });

  const [organizationDetail, setOrganizationDetail] = useState(false);
  const [cgpa, setCgpa] = useState(false);

  const [specialityState, setSpecialityState] = useState(false);
  const [address, setAaddress] = useState(false);

  const [step, setStep] = useState(0);

  const [onClickState, setOnClickState] = useState();

  const props = {
    name: "file",
    action: "https://www.google.com/",
    headers: {
      authorization: "authorization-text",
    },

    onChange(info) {
      if (info.file.status !== "uploading") {
        //console.log(info.file, info.fileList);
        setDocumentsAttachmentState({
          ...documentsAttachmentState,
          iqamaId: info.file,
        });
      }

      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const props1 = {
    name: "file",
    action: "https://www.google.com/",
    headers: {
      authorization: "authorization-text",
    },

    onChange(info) {
      if (info.file.status !== "uploading") {
        //console.log(info.file, info.fileList);
        setDocumentsAttachmentState({
          ...documentsAttachmentState,
          cv: info.file,
        });
      }

      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const props2 = {
    name: "file",
    action: "https://www.google.com/",
    headers: {
      authorization: "authorization-text",
    },

    onChange(info) {
      if (info.file.status !== "uploading") {
        //console.log(info.file, info.fileList);
        setDocumentsAttachmentState({
          ...documentsAttachmentState,
          scfhs_doc: info.file,
        });
      }

      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const props3 = {
    name: "file",
    action: "https://www.google.com/",
    headers: {
      authorization: "authorization-text",
    },

    onChange(info) {
      if (info.file.status !== "uploading") {
        //console.log(info.file, info.fileList);
        setDocumentsAttachmentState({
          ...documentsAttachmentState,
          training_letter: info.file,
        });
      }

      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const props4 = {
    name: "file",
    action: "https://www.google.com/",
    headers: {
      authorization: "authorization-text",
    },

    onChange(info) {
      if (info.file.status !== "uploading") {
        //console.log(info.file, info.fileList);
        setDocumentsAttachmentState({
          ...documentsAttachmentState,
          letter_from_scfhs: info.file,
        });
      }

      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const props5 = {
    name: "file",
    action: "https://www.google.com/",
    headers: {
      authorization: "authorization-text",
    },

    onChange(info) {
      if (info.file.status !== "uploading") {
        //console.log(info.file, info.fileList);
        setDocumentsAttachmentState({
          ...documentsAttachmentState,
          academic_record: info.file,
        });
      }

      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const props6 = {
    name: "file",
    action: "https://www.google.com/",
    headers: {
      authorization: "authorization-text",
    },

    onChange(info) {
      if (info.file.status !== "uploading") {
        //console.log(info.file, info.fileList);
        setDocumentsAttachmentState({
          ...documentsAttachmentState,
          recommendation_letter1: info.file,
        });
      }

      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const props7 = {
    name: "file",
    action: "https://www.google.com/",
    headers: {
      authorization: "authorization-text",
    },

    onChange(info) {
      if (info.file.status !== "uploading") {
        //console.log(info.file, info.fileList);
        setDocumentsAttachmentState({
          ...documentsAttachmentState,
          recommendation_letter2: info.file,
        });
      }

      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const props8 = {
    name: "file",
    action: "https://www.google.com/",
    headers: {
      authorization: "authorization-text",
    },

    onChange(info) {
      if (info.file.status !== "uploading") {
        //console.log(info.file, info.fileList);
        setDocumentsAttachmentState({
          ...documentsAttachmentState,
          recommendation_letter3: info.file,
        });
      }

      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="container">
      <Head>
        <title>Riyadh Second Health Cluster</title>
        <link rel="icon" href={R2Favicon} />
      </Head>
      <body>
        {/* content */}
        <Header />

        <SideDesignDiv>
          {/* <img loading="lazy"src={SideDesign} /> */}
          <img loading="lazy"alt={""} height={500} width={500} src={SideDesign} />
        </SideDesignDiv>

        {step === 0 && (
          <MainStyledSigninDiv>
            <StyledSigninDiv>
              <StyledRegisterationRow>
                <Col span={6}>
                  <StyledSidebarDiv>
                    <TimelineDiv>
                      <TimelineContentDiv>
                        <p
                          style={{
                            borderLeft: "3px solid #A87E33",
                            paddingBottom: 10,
                            paddingLeft: 30,
                            marginBottom: 0,
                          }}
                        >
                          ID Attachments
                        </p>
                        <p
                          style={{
                            borderLeft: "3px solid #E7E7E7",
                            marginBottom: 0,
                            paddingBottom: 10,
                            paddingLeft: 30,
                          }}
                        >
                          CV Attachment
                        </p>
                        <p
                          style={{
                            borderLeft: "3px solid #E7E7E7",
                            marginBottom: 0,
                            paddingBottom: 10,
                            paddingLeft: 30,
                          }}
                        >
                          Training Attachments
                        </p>
                        <p
                          style={{
                            borderLeft: "3px solid #E7E7E7",
                            marginBottom: 0,
                            paddingBottom: 10,
                            paddingLeft: 30,
                          }}
                        >
                          Academic Attachments
                        </p>
                        <p
                          style={{
                            borderLeft: "3px solid #E7E7E7",
                            marginBottom: 0,
                            paddingLeft: 30,
                          }}
                        >
                          Recommendation Letter
                        </p>
                      </TimelineContentDiv>
                    </TimelineDiv>
                  </StyledSidebarDiv>
                </Col>
                <StyledSignInImgCol1 span={16}>
                  <FlexDiv>
                    {/* <img loading="lazy"src={CompleteInformation} /> */}
                    <img loading="lazy"alt={""} height={30} width={30} src={SideDesign} />

                    <p>Required Attachment</p>
                  </FlexDiv>
                  <InformationDiv>
                    <h1>Attach Documents To Support Application</h1>
                    <p>
                      You need to attach some documents so we can crosscheck
                      your application{" "}
                    </p>
                  </InformationDiv>

                  <InformationDetailP>Attach ID / Iqama</InformationDetailP>
                  <Row>
                    <Col span={24}>
                      <StyledUpload maxCount={1} {...props}>
                        <Button icon={<ImAttachment />}>Choose File</Button>
                      </StyledUpload>
                      {documentsAttachmentState?.iqamaId?.name && (
                        <AttachmentDiv>
                          <FlexDiv1>
                            <p className="file-name">
                              {documentsAttachmentState?.iqamaId?.name}
                            </p>
                            <p className="file-size">
                              ({documentsAttachmentState?.iqamaId?.size / 1024}{" "}
                              Kb)
                            </p>
                          </FlexDiv1>
                          <CrossDiv
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              setDocumentsAttachmentState({
                                ...documentsAttachmentState,
                                iqamaId: "",
                              })
                            }
                          >
                            <img loading="lazy"className="file-img" src={Cross} />
                          </CrossDiv>
                        </AttachmentDiv>
                      )}
                    </Col>
                  </Row>
                </StyledSignInImgCol1>
              </StyledRegisterationRow>
            </StyledSigninDiv>
          </MainStyledSigninDiv>
        )}

        {step === 1 && (
          <MainStyledSigninDiv>
            <StyledSigninDiv>
              <StyledRegisterationRow>
                <Col span={6}>
                  <StyledSidebarDiv>
                    <TimelineDiv>
                      <TimelineContentDiv>
                        <p
                          style={{
                            borderLeft: "3px solid #A87E33",
                            paddingBottom: 10,
                            paddingLeft: 30,
                            marginBottom: 0,
                          }}
                        >
                          ID Attachments
                        </p>
                        <p
                          style={{
                            borderLeft: "3px solid #A87E33",
                            marginBottom: 0,
                            paddingBottom: 10,
                            paddingLeft: 30,
                          }}
                        >
                          CV Attachment
                        </p>
                        <p
                          style={{
                            borderLeft: "3px solid #E7E7E7",
                            marginBottom: 0,
                            paddingBottom: 10,
                            paddingLeft: 30,
                          }}
                        >
                          Training Attachments
                        </p>
                        <p
                          style={{
                            borderLeft: "3px solid #E7E7E7",
                            marginBottom: 0,
                            paddingBottom: 10,
                            paddingLeft: 30,
                          }}
                        >
                          Academic Attachments
                        </p>
                        <p
                          style={{
                            borderLeft: "3px solid #E7E7E7",
                            marginBottom: 0,
                            paddingLeft: 30,
                          }}
                        >
                          Recommendation Letter
                        </p>
                      </TimelineContentDiv>
                    </TimelineDiv>
                  </StyledSidebarDiv>
                </Col>
                <StyledSignInImgCol span={16}>
                  <FlexDiv>
                    {/* <img loading="lazy"src={CompleteInformation} /> */}
                    <img loading="lazy"alt={""} height={30} width={30} src={CompleteInformation} />
                    <p>Required Attachment</p>
                  </FlexDiv>

                  <InformationDiv>
                    <h1>Attach Documents To Support Application</h1>
                    <p>
                      You need to attach some documents so we can crosscheck
                      your application{" "}
                    </p>
                  </InformationDiv>

                  <InformationDetailP>Attach CV</InformationDetailP>
                  <Row>
                    <Col span={18}>
                      <StyledUpload maxCount={1} {...props1}>
                        <Button icon={<ImAttachment />}>Choose File</Button>
                      </StyledUpload>

                      {documentsAttachmentState?.cv?.name && (
                        <AttachmentDiv1>
                          <FlexDiv1>
                            <p className="file-name">
                              {documentsAttachmentState?.cv?.name}
                            </p>
                            <p className="file-size">
                              ({documentsAttachmentState?.cv?.size / 1024} Kb)
                            </p>
                          </FlexDiv1>
                          <CrossDiv
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              setDocumentsAttachmentState({
                                ...documentsAttachmentState,
                                cv: "",
                              })
                            }
                          >
                            <img loading="lazy"className="file-img" src={Cross} />
                          </CrossDiv>
                        </AttachmentDiv1>
                      )}
                    </Col>
                  </Row>
                </StyledSignInImgCol>
              </StyledRegisterationRow>
            </StyledSigninDiv>
          </MainStyledSigninDiv>
        )}

        {step === 2 && (
          <MainStyledSigninDiv>
            <StyledSigninDiv>
              <StyledRegisterationRow>
                <Col span={6}>
                  <StyledSidebarDiv>
                    <TimelineDiv>
                      <TimelineContentDiv>
                        <p
                          style={{
                            borderLeft: "3px solid #A87E33",
                            paddingBottom: 10,
                            paddingLeft: 30,
                            marginBottom: 0,
                          }}
                        >
                          ID Attachments
                        </p>
                        <p
                          style={{
                            borderLeft: "3px solid #A87E33",
                            marginBottom: 0,
                            paddingBottom: 10,
                            paddingLeft: 30,
                          }}
                        >
                          CV Attachment
                        </p>
                        <p
                          style={{
                            borderLeft: "3px solid #A87E33",
                            marginBottom: 0,
                            paddingBottom: 10,
                            paddingLeft: 30,
                          }}
                        >
                          Training Attachments
                        </p>
                        <p
                          style={{
                            borderLeft: "3px solid #E7E7E7",
                            marginBottom: 0,
                            paddingBottom: 10,
                            paddingLeft: 30,
                          }}
                        >
                          Academic Attachments
                        </p>
                        <p
                          style={{
                            borderLeft: "3px solid #E7E7E7",
                            marginBottom: 0,
                            paddingLeft: 30,
                          }}
                        >
                          Recommendation Letter
                        </p>
                      </TimelineContentDiv>
                    </TimelineDiv>
                  </StyledSidebarDiv>
                </Col>
                <StyledSignInImgCol span={18}>
                  <FlexDiv>
                    <img loading="lazy"alt={""} height={30} width={30} src={CompleteInformation} />

                    <p>Required Attachment</p>
                  </FlexDiv>

                  <InformationDiv>
                    <h1>Attach Documents To Support Application</h1>
                    <p>
                      You need to attach some documents so we can crosscheck
                      your application{" "}
                    </p>
                  </InformationDiv>

                  <InformationDetailP>Attach CV</InformationDetailP>
                  <Row>
                    <Col span={16}>
                      <StyledUpload maxCount={1} {...props2}>
                        <Button icon={<ImAttachment />}>Choose File</Button>
                      </StyledUpload>
                      {documentsAttachmentState?.scfhs_doc?.name && (
                        <AttachmentDiv1>
                          <FlexDiv1>
                            <p className="file-name">
                              {documentsAttachmentState?.scfhs_doc?.name}
                            </p>
                            <p className="file-size">
                              (
                              {documentsAttachmentState?.scfhs_doc?.size / 1024}{" "}
                              Kb)
                            </p>
                          </FlexDiv1>
                          <CrossDiv
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              setDocumentsAttachmentState({
                                ...documentsAttachmentState,
                                scfhs_doc: "",
                              })
                            }
                          >
                            <img loading="lazy"className="file-img" src={Cross} />
                          </CrossDiv>
                        </AttachmentDiv1>
                      )}
                    </Col>
                  </Row>
                  <BmDiv />
                  <InformationDetailP>
                    Attach training letter
                  </InformationDetailP>
                  <Row>
                    <Col span={16}>
                      <StyledUpload maxCount={1} {...props3}>
                        <Button icon={<ImAttachment />}>Choose File</Button>
                      </StyledUpload>
                      {documentsAttachmentState?.training_letter?.name && (
                        <AttachmentDiv1>
                          <FlexDiv1>
                            <p className="file-name">
                              {documentsAttachmentState?.training_letter?.name}
                            </p>
                            <p className="file-size">
                              (
                              {documentsAttachmentState?.training_letter?.size /
                                1024}{" "}
                              Kb)
                            </p>
                          </FlexDiv1>
                          <CrossDiv
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              setDocumentsAttachmentState({
                                ...documentsAttachmentState,
                                training_letter: "",
                              })
                            }
                          >
                            <img loading="lazy"className="file-img" src={Cross} />
                          </CrossDiv>
                        </AttachmentDiv1>
                      )}
                      <BmDiv />
                    </Col>
                  </Row>
                  <BmDiv />
                  <InformationDetailP>
                    Attach training letter from the SCFHS
                  </InformationDetailP>
                  <Row>
                    <Col span={16}>
                      <StyledUpload maxCount={1} {...props4}>
                        <Button icon={<ImAttachment />}>Choose File</Button>
                      </StyledUpload>
                      {documentsAttachmentState?.letter_from_scfhs?.name && (
                        <AttachmentDiv1>
                          <FlexDiv1>
                            <p className="file-name">
                              {
                                documentsAttachmentState?.letter_from_scfhs
                                  ?.name
                              }
                            </p>
                            <p className="file-size">
                              (
                              {documentsAttachmentState?.letter_from_scfhs
                                ?.size / 1024}{" "}
                              Kb )
                            </p>
                          </FlexDiv1>
                          <CrossDiv
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              setDocumentsAttachmentState({
                                ...documentsAttachmentState,
                                letter_from_scfhs: "",
                              })
                            }
                          >
                            <img loading="lazy"className="file-img" src={Cross} />
                          </CrossDiv>
                        </AttachmentDiv1>
                      )}
                      <BmDiv />
                    </Col>
                  </Row>
                </StyledSignInImgCol>
              </StyledRegisterationRow>
            </StyledSigninDiv>
          </MainStyledSigninDiv>
        )}

        {step === 3 && (
          <MainStyledSigninDiv>
            <StyledSigninDiv>
              <StyledRegisterationRow>
                <Col span={6}>
                  <StyledSidebarDiv>
                    <TimelineDiv>
                      <TimelineContentDiv>
                        <p
                          style={{
                            borderLeft: "3px solid #A87E33",
                            paddingBottom: 10,
                            paddingLeft: 30,
                            marginBottom: 0,
                          }}
                        >
                          ID Attachments
                        </p>
                        <p
                          style={{
                            borderLeft: "3px solid #A87E33",
                            marginBottom: 0,
                            paddingBottom: 10,
                            paddingLeft: 30,
                          }}
                        >
                          CV Attachment
                        </p>
                        <p
                          style={{
                            borderLeft: "3px solid #A87E33",
                            marginBottom: 0,
                            paddingBottom: 10,
                            paddingLeft: 30,
                          }}
                        >
                          Training Attachments
                        </p>
                        <p
                          style={{
                            borderLeft: "3px solid #A87E33",
                            marginBottom: 0,
                            paddingBottom: 10,
                            paddingLeft: 30,
                          }}
                        >
                          Academic Attachments
                        </p>
                        <p
                          style={{
                            borderLeft: "3px solid #E7E7E7",
                            marginBottom: 0,
                            paddingLeft: 30,
                          }}
                        >
                          Recommendation Letter
                        </p>
                      </TimelineContentDiv>
                    </TimelineDiv>
                  </StyledSidebarDiv>
                </Col>
                <StyledSignInImgCol span={18}>
                  <FlexDiv>
                    <img loading="lazy"alt={""} height={30} width={30} src={CompleteInformation} />

                    <p>Required Attachment</p>
                  </FlexDiv>

                  <InformationDiv>
                    <h1>Attach Documents To Support Application</h1>
                    <p>
                      You need to attach some documents so we can crosscheck
                      your application{" "}
                    </p>
                  </InformationDiv>

                  <InformationDetailP>
                    Attach academic record
                  </InformationDetailP>
                  <Row>
                    <Col span={16}>
                      <StyledUpload maxCount={1} {...props5}>
                        <Button icon={<ImAttachment />}>Choose File</Button>
                      </StyledUpload>
                      {documentsAttachmentState?.academic_record?.name && (
                        <AttachmentDiv1>
                          <FlexDiv1>
                            <p className="file-name">
                              {documentsAttachmentState?.academic_record?.name}
                            </p>
                            <p className="file-size">
                              (
                              {documentsAttachmentState?.academic_record?.size /
                                1024}{" "}
                              Kb)
                            </p>
                          </FlexDiv1>
                          <CrossDiv
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              setDocumentsAttachmentState({
                                ...documentsAttachmentState,
                                academic_record: "",
                              })
                            }
                          >
                            <img loading="lazy"className="file-img" src={Cross} />
                          </CrossDiv>
                        </AttachmentDiv1>
                      )}
                    </Col>
                  </Row>
                </StyledSignInImgCol>
              </StyledRegisterationRow>
            </StyledSigninDiv>
          </MainStyledSigninDiv>
        )}

        {step === 4 && (
          <MainStyledSigninDiv>
            <StyledSigninDiv>
              <StyledRegisterationRow>
                <Col span={6}>
                  <StyledSidebarDiv>
                    <TimelineDiv>
                      <TimelineContentDiv>
                        <p
                          style={{
                            borderLeft: "3px solid #A87E33",
                            paddingBottom: 10,
                            paddingLeft: 30,
                            marginBottom: 0,
                          }}
                        >
                          ID Attachments
                        </p>
                        <p
                          style={{
                            borderLeft: "3px solid #A87E33",
                            marginBottom: 0,
                            paddingBottom: 10,
                            paddingLeft: 30,
                          }}
                        >
                          CV Attachment
                        </p>
                        <p
                          style={{
                            borderLeft: "3px solid #A87E33",
                            marginBottom: 0,
                            paddingBottom: 10,
                            paddingLeft: 30,
                          }}
                        >
                          Training Attachments
                        </p>
                        <p
                          style={{
                            borderLeft: "3px solid #A87E33",
                            marginBottom: 0,
                            paddingBottom: 10,
                            paddingLeft: 30,
                          }}
                        >
                          Academic Attachments
                        </p>
                        <p
                          style={{
                            borderLeft: "3px solid #A87E33",
                            marginBottom: 0,
                            paddingLeft: 30,
                          }}
                        >
                          Recommendation Letter
                        </p>
                      </TimelineContentDiv>
                    </TimelineDiv>
                  </StyledSidebarDiv>
                </Col>
                <StyledSignInImgCol span={16}>
                  <FlexDiv>
                    <img loading="lazy"alt={""} height={30} width={30} src={CompleteInformation} />

                    <p>Required Attachment</p>
                  </FlexDiv>

                  <InformationDiv>
                    <h1>Attach Documents To Support Application</h1>
                    <p>
                      You need to attach some documents so we can crosscheck
                      your application{" "}
                    </p>
                  </InformationDiv>

                  <InformationDetailP>
                    Attach recommendation letter (1)
                  </InformationDetailP>
                  <Row>
                    <Col span={18}>
                      <StyledUpload maxCount={1} {...props6}>
                        <Button icon={<ImAttachment />}>Choose File</Button>
                      </StyledUpload>
                      {documentsAttachmentState?.recommendation_letter1
                        ?.name && (
                        <AttachmentDiv1>
                          <FlexDiv1>
                            <p className="file-name">
                              {
                                documentsAttachmentState?.recommendation_letter1
                                  ?.name
                              }
                            </p>
                            <p className="file-size">
                              (
                              {documentsAttachmentState?.recommendation_letter1
                                ?.size / 1024}{" "}
                              Kb)
                            </p>
                          </FlexDiv1>
                          <CrossDiv
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              setDocumentsAttachmentState({
                                ...documentsAttachmentState,
                                recommendation_letter1: "",
                              })
                            }
                          >
                            <img loading="lazy"className="file-img" src={Cross} />
                          </CrossDiv>
                        </AttachmentDiv1>
                      )}
                    </Col>
                  </Row>

                  <InformationDetailP>
                    Attach recommendation letter (2)
                  </InformationDetailP>
                  <Row>
                    <Col span={18}>
                      <StyledUpload maxCount={1} {...props7}>
                        <Button icon={<ImAttachment />}>Choose File</Button>
                      </StyledUpload>
                      {documentsAttachmentState?.recommendation_letter2
                        ?.name && (
                        <AttachmentDiv1>
                          <FlexDiv1>
                            <p className="file-name">
                              {
                                documentsAttachmentState?.recommendation_letter2
                                  ?.name
                              }
                            </p>
                            <p className="file-size">
                              (
                              {documentsAttachmentState?.recommendation_letter2
                                ?.size / 1024}{" "}
                              Kb)
                            </p>
                          </FlexDiv1>
                          <CrossDiv
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              setDocumentsAttachmentState({
                                ...documentsAttachmentState,
                                recommendation_letter2: "",
                              })
                            }
                          >
                            <img loading="lazy"className="file-img" src={Cross} />
                          </CrossDiv>
                        </AttachmentDiv1>
                      )}
                    </Col>
                  </Row>

                  <InformationDetailP>
                    Attach recommendation letter (3)
                  </InformationDetailP>
                  <Row>
                    <Col span={18}>
                      <StyledUpload maxCount={1} {...props8}>
                        <Button icon={<ImAttachment />}>Choose File</Button>
                      </StyledUpload>
                      {documentsAttachmentState?.recommendation_letter3
                        ?.name && (
                        <AttachmentDiv1>
                          <FlexDiv1>
                            <p className="file-name">
                              {
                                documentsAttachmentState?.recommendation_letter3
                                  ?.name
                              }
                            </p>
                            <p className="file-size">
                              (
                              {documentsAttachmentState?.recommendation_letter3
                                ?.size / 1024}{" "}
                              Kb)
                            </p>
                          </FlexDiv1>
                          <CrossDiv
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              setDocumentsAttachmentState({
                                ...documentsAttachmentState,
                                recommendation_letter3: "",
                              })
                            }
                          >
                            <img loading="lazy"className="file-img" src={Cross} />
                          </CrossDiv>
                        </AttachmentDiv1>
                      )}
                    </Col>
                  </Row>
                </StyledSignInImgCol>
              </StyledRegisterationRow>
            </StyledSigninDiv>
          </MainStyledSigninDiv>
        )}

        {step === 0 && (
          <SignInRow>
            <Container>
              <SpaceBetweenDiv>
                <CustomButton
                  customStyle={{
                    paddingInline: 30,
                    borderColor: "#105F43",
                    color: "#105F43",
                    borderRadius: 8,
                  }}
                  onClick={() => router.push("/institution-information")}
                >
                  Back
                </CustomButton>
                {documentsAttachmentState?.iqamaId === "" ? (
                  <CustomButton
                    customStyle={{
                      paddingInline: 30,
                      background: "#E0E0E0",
                      borderRadius: 8,
                      color: "#fff",
                    }}
                    // onClick={() => setStep(1)}
                  >
                    Next
                  </CustomButton>
                ) : (
                  <CustomButton
                    customStyle={{
                      paddingInline: 30,
                      background: "#105F43",
                      borderRadius: 8,
                      color: "#fff",
                    }}
                    onClick={() => setStep(1)}
                  >
                    Next
                  </CustomButton>
                )}
              </SpaceBetweenDiv>
            </Container>
          </SignInRow>
        )}
        {step === 1 && (
          <SignInRow>
            <Container>
              <SpaceBetweenDiv>
                <CustomButton
                  customStyle={{
                    paddingInline: 30,
                    borderColor: "#105F43",
                    color: "#105F43",
                    borderRadius: 8,
                  }}
                  onClick={() => setStep(0)}
                >
                  Back
                </CustomButton>
                {documentsAttachmentState?.cv === "" ? (
                  <CustomButton
                    customStyle={{
                      paddingInline: 30,
                      background: "#E0E0E0",
                      borderRadius: 8,
                      color: "#fff",
                    }}
                    // onClick={() => setStep(2)}
                  >
                    Next
                  </CustomButton>
                ) : (
                  <CustomButton
                    customStyle={{
                      paddingInline: 30,
                      background: "#105F43",
                      borderRadius: 8,
                      color: "#fff",
                    }}
                    onClick={() => setStep(2)}
                  >
                    Next
                  </CustomButton>
                )}
              </SpaceBetweenDiv>
            </Container>
          </SignInRow>
        )}

        {step === 2 && (
          <SignInRow>
            <Container>
              <SpaceBetweenDiv>
                <CustomButton
                  customStyle={{
                    paddingInline: 30,
                    borderColor: "#105F43",
                    color: "#105F43",
                    borderRadius: 8,
                  }}
                  onClick={() => setStep(1)}
                >
                  Back
                </CustomButton>
                {documentsAttachmentState?.scfhs_doc === "" ||
                documentsAttachmentState?.training_letter === "" ||
                documentsAttachmentState?.letter_from_scfhs === "" ? (
                  <CustomButton
                    customStyle={{
                      paddingInline: 30,
                      background: "#E0E0E0",
                      borderRadius: 8,
                      color: "#fff",
                    }}
                    // onClick={() => setStep(2)}
                  >
                    Next
                  </CustomButton>
                ) : (
                  <CustomButton
                    customStyle={{
                      paddingInline: 30,
                      background: "#105F43",
                      borderRadius: 8,
                      color: "#fff",
                    }}
                    onClick={() => setStep(3)}
                  >
                    Next
                  </CustomButton>
                )}
              </SpaceBetweenDiv>
            </Container>
          </SignInRow>
        )}
        {step === 3 && (
          <SignInRow>
            <Container>
              <SpaceBetweenDiv>
                <CustomButton
                  customStyle={{
                    paddingInline: 30,
                    borderColor: "#105F43",
                    color: "#105F43",
                    borderRadius: 8,
                  }}
                  onClick={() => setStep(2)}
                >
                  Back
                </CustomButton>
                {documentsAttachmentState?.academic_record === "" ? (
                  <CustomButton
                    customStyle={{
                      paddingInline: 30,
                      background: "#E0E0E0",
                      borderRadius: 8,
                      color: "#fff",
                    }}
                    // onClick={() => setStep(2)}
                  >
                    Next
                  </CustomButton>
                ) : (
                  <CustomButton
                    customStyle={{
                      paddingInline: 30,
                      background: "#105F43",
                      borderRadius: 8,
                      color: "#fff",
                    }}
                    onClick={() => setStep(4)}
                  >
                    Next
                  </CustomButton>
                )}
              </SpaceBetweenDiv>
            </Container>
          </SignInRow>
        )}
        {step === 4 && (
          <SignInRow>
            <Container>
              <SpaceBetweenDiv>
                <CustomButton
                  customStyle={{
                    paddingInline: 30,
                    borderColor: "#105F43",
                    color: "#105F43",
                    borderRadius: 8,
                  }}
                  onClick={() => setStep(3)}
                >
                  Back
                </CustomButton>
                {documentsAttachmentState?.recommendation_letter1 === "" ||
                documentsAttachmentState?.recommendation_letter2 === "" ||
                documentsAttachmentState?.recommendation_letter3 === "" ? (
                  <CustomButton
                    customStyle={{
                      paddingInline: 30,
                      background: "#E0E0E0",
                      borderRadius: 8,
                      color: "#fff",
                    }}
                    // onClick={() => setStep(2)}
                  >
                    Next
                  </CustomButton>
                ) : (
                  <CustomButton
                    customStyle={{
                      paddingInline: 30,
                      background: "#105F43",
                      borderRadius: 8,
                      color: "#fff",
                    }}
                    onClick={() => router.push("/request-finish")}
                  >
                    Next
                  </CustomButton>
                )}
              </SpaceBetweenDiv>
            </Container>
          </SignInRow>
        )}
        <Footer />
      </body>
    </div>
  );
};

export default DocumentsAttachment;

const MainStyledSigninDiv = styled.div`
  border-bottom: 1px solid #a9a9a9;
  .ant-btn:hover,
  .ant-btn:focus {
    color: #000 !important;
  }
`;

const StyledSignInImgCol = styled(Col)`
  padding: 30px 80px;
  //   display: flex;
  //   justify-content: start;
`;

const InformationDiv = styled.div`
  margin-top: 20px;
`;

const FlexDiv = styled.div`
  display: flex;
  img {
    height: 30px;
  }
  p {
    margin-bottom: 0px;
    margin-top: 2px;
    margin-left: 10px;
  }
`;

const StyledSigninDiv = styled.div`
  padding: 78px 0px 0px;

  h1 {
    font-family: "GESSTwoBold", sans-serif;
    // font-weight: 700;
    line-height: 51px;
    color: #181818;
    margin-bottom: 10px;
  }

  p {
    color: #8c8c8c;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }
`;

const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 576px) {
    max-width: 576px;
  }

  @media (min-width: 768px) {
    max-width: 768px;
  }

  @media (min-width: 992px) {
    min-width: 992px;
  }

  @media only screen and (min-width: 1160px) and (max-width: 1258px) {
    min-width: 1200px;
  }

  @media only screen and (min-width: 1259px) and (max-width: 1359px) {
    min-width: 1200px;
  }

  @media (min-width: 1342px) {
    min-width: 1200px;
  }
`;

const StyledInput = styled(Input)`
  background: #f8f8f8;
  border: 1px solid #c1c1c1;
  border-radius: 5px;
  padding: 15px 20px;
`;

const SignInRow = styled(Row)`
  margin-block: 20px;
`;

const AfterFormP = styled.p`
  color: #105f43 !important;
  font-size: 14px !important;
  line-height: 24px !important;
  font-weight: 400 !important;
  font-family: "HacenSaudiArabiaRegular", sans-serif !important;
  margin-block: 15px !important;
`;

const NoteP = styled.p`
  color: #181818 !important;
  font-size: 14px !important;
  line-height: 24px !important;
  font-weight: 400 !important;
  font-family: "HacenSaudiArabiaRegular", sans-serif !important;
  margin-block: 15px !important;
  text-decoration: underline !important;
`;

const BeforeFormP = styled.p`
  color: #8c8c8c !important;
  font-size: 14px !important;
  line-height: 24px !important;
  font-weight: 400 !important;
  font-family: "HacenSaudiArabiaRegular", sans-serif !important;
`;

const StyledEmailBySmsRow = styled(Row)`
  display: flex !important;

  margin-top: 20px;

  .ant-col {
    margin-bottom: 20px !important;
  }

  .ant-input:nth-child(1) {
    margin-block: 0 !important;
  }

  p {
    color: #4a4a4a !important;
    font-weight: 400 !important;
    font-size: 14px !important;
    font-family: "HacenSaudiArabiaRegular" !important;
    line-height: 19px !important;
  }
`;

const LanguageButton = styled(Button)`
  height: 54px !important;
  top: -1px !important;
  width: 125px !important;
  font-family: "GESSTwoLight", sans-serif !important;
  font-weight: 500;
  padding: 0 16px 0 20px;

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

const StyledColoredP = styled.b`
  color: #8d6520 !important;
  font-weight: 400 !important;
  margin-left: 5px !important;
`;

const StyledResendOTPColoredP = styled.b`
  color: #8d6520 !important;
  font-weight: 400 !important;
  margin-left: 5px !important;
  cursor: pointer;
  &:hover {
    text-decoration: underline !important;
  }
`;

const StyledColoredPFlex = styled.p`
  display: flex;
  font-weight: 400 !important;
`;

const StyledColoredPFlex1 = styled.p`
  display: flex;
  font-weight: 400 !important;
  margin-top: 15px;
`;

const FlexEndDiv = styled.div`
  display: flex;
  justify-content: end;
`;

const SpaceBetweenDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FlexStartDiv = styled.div`
  display: flex;
  justify-content: start;
`;

const StyledRegisterationRow = styled(Row)``;

const StyledErrorP = styled.p`
  margin-bottom: 0px;
  color: #fa4947 !important;
`;

const StyledErrorP1 = styled.b`
  margin-bottom: 0px;
  color: #fa4947 !important;
  font-weight: 600;
  font-size: 14px;
`;

const StyledIncorrectPasswordModal = styled.div`
  h1 {
    margin-block: 15px !important;
    font-family: "GESSTwoBold", sans-serif !important;
    font-size: 22px;
  }
  p {
    margin-bottom: 0px !important;
    font-family: "HacenSaudiArabiaRegular", sans-serif !important;
    color: #8c8c8c !important;
  }
`;

const StyledBackCustomButton = styled(CustomButton)`
  &:hover {
    border-color: #105f43 !important;
  }
`;

const StyledContactRow = styled(Row)`
  p {
    margin-bottom: 0px;
    display: flex;
    align-items: center;
    margin-left: 6px;
  }
`;

const SecurityNoteP = styled.p`
  color: #181818;
  font-weight: 400;
  font-family: "HacenSaudiArabiaRegular", sans-serif;
  margin-block: 20px !important;
`;

const StyledSidebarDiv = styled.div`
  padding: 30px 40px;
  background: #f8f8f8;
  height: 100%;
`;

const SideDesignDiv = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
  align-items: end;
  width: 100%;
  //   z-index: 99;
  height: 544px;
  img {
    height: 420px;
  }
`;

const StyledSelect = styled(Select)`
  width: 100% !important;
  .ant-select-selector {
    height: 53px !important;
    align-items: center !important;
    background: #f8f8f8 !important;
    border: 1px solid #c1c1c1 !important;
    border-radius: 5px !important;
  }
`;

const TimelineDiv = styled.div`
  display: flex;
`;

const TimelineDotDiv = styled.div`
  border: 1px solid;
  margin-right: 15px;
  width: 5px;
  border-radius: 80px;
`;

const TimelineContentDiv = styled.div`
  p {
    margin-bottom: 10px;
    font-family: "HacenSaudiArabiaRegular", sans-serif;
  }
`;

const BreadcrumbDiv = styled.div`
  margin-bottom: 15px;
`;

const InformationDetailP = styled.p`
  margin-block: 15px;
  color: #181818 !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  font-family: "HacenSaudiArabiaRegular", sans-serif;
`;

const StyledSignInImgCol1 = styled.div`
  height: 500px;
  padding: 30px 80px;
`;

const StyledUpload = styled(Upload)`
  .ant-btn {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    width: 530px !important;
    align-items: center;
    height: 60px !important;
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

const BmDiv = styled.div`
  margin-top: 15px;
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

const AttachmentDiv1 = styled.div`
  width: 500px;
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

const FlexDiv1 = styled.div`
  display: flex;
`;

const CrossDiv = styled.div`
  cursor: pointer;
`;
