import React, { useLayoutEffect, useRef, useState, useMemo } from "react";
import Head from "next/head";
// import Link from "next/link";
// import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Links from "next/link";
import endpoints from "../src/api";

import styled from "styled-components";
import {
  Row,
  Col,
  Checkbox,
  Breadcrumb,
  Input,
  Alert,
} from "antd";
import CustomButton from "../src/components/Button";
import classes from "./courseDetail.module.css";
import { emailValidation } from "../src/helpers/EmailValidation";

import { Link } from "react-scroll";

//next.config
import { brand } from "../next.config";

// components
import {
  Geo,
  Mail,
  Phone,
  R2Favicon,
  SupportImage,
} from "../images";
import { AiOutlineLock } from "react-icons/ai";
import { useRouter } from "next/router";

import Hero from "../src/components/Hero";

import Header from "../src/components/header";
import Footer from "../src/components/footer";

const { TextArea } = Input;

const Contact = () => {
  const router = useRouter();
  const initialState = {
    your_name: "",
    your_email: "",
    subject: "",
    message: "",
  };
  const [supportState, setSupportState] = useState(initialState);

  const [scroll, setScroll] = useState(0);

  const [agreeState, setAgreeState] = useState(false);

  useLayoutEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  });

  const inputHandler = (e) =>
    setSupportState({
      ...supportState,
      [e.target.name]: e.target.value,
    });

  const [loading, setLoading] = useState(false);

  const [emailValidationState, setEmailValidationState] = useState("");
  const [emailState, setEmailState] = useState(false);

  //console.log("emailValidationState", emailValidationState);

  useLayoutEffect(() => {
    if (emailState) {
      setEmailValidationState(emailValidation(supportState?.your_email));
    }
  }, [emailValidationState, supportState]);

  const [successMessageState, setSuccessMessageState] = useState("");

  const contactUsFunc = async (data) => {
    try {
      setLoading(true);

      const obj = {
        name: data?.your_name,
        email: data?.your_email,
        subject: data?.subject,
        message: data?.message,
      };

      //console.log("dataPayload", obj);
      const response = await endpoints.ContactUs(obj);
      //console.log("responseContact", response?.data?.statusCode);
      if (response?.data?.statusCode) {
        setSuccessMessageState(
          "Thank you so much for taking your time to contact us. Our team will get back to you as soon as possible"
        );
      }
    } catch (error) {
      // setErrors(error.response.data.errors);
      // setErrorMessage(error.response.data.message);
      //console.log("asattar", error);
      setLoading(false);
    } finally {
      setTimeout(() => setLoading(false), 1200);
    }
  };

  const [dropdownCaretState, setDropdownCaretState] = useState(false);

  const [GetStaticPagesState, setGetStaticPagesState] = useState();
  const GetStaticPages = async () => {
    try {
      const response = await endpoints.GetStaticPages("contact-us");
      if (response?.data?.statusCode === "200") {
        setGetStaticPagesState(response?.data?.data);
      } else if (response?.data?.statusCode === "404") {
        router.push('/')
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const [GetWidgetsState, setGetWidgetsState] = useState();
  const GetWidgets = async () => {
    try {
      const response = await endpoints.GetWidgets("contact-us");
      setGetWidgetsState(JSON.parse(response?.data?.data?.value));
    } catch (err) {
      console.log("err", err);
    }
  };

  useLayoutEffect(() => {
    GetStaticPages();
    GetWidgets();
  }, []);

  const [validationState,setValidationState]=useState(false)
  const [validationState1,setValidationState1]=useState(false)
  const [validationState2,setValidationState2]=useState(false)
  const [validationState3,setValidationState3]=useState(false)

  const DesktopView = (
    <div>
      <Head>
        <title>Riyadh Second Health Cluster</title>
        <link rel="icon" href={R2Favicon} />
      </Head>
      <body>
        <Header
          dropdownCaretState={dropdownCaretState}
          setDropdownCaretState={setDropdownCaretState}
        />

        {GetStaticPagesState?.contentValue &&
          Object.values(JSON.parse(GetStaticPagesState?.contentValue))?.map(
            (data,index) => (
              <div key={index}>
                {data["type"] === "top_banner" && (<>
                  <div onClick={() => setDropdownCaretState(false)}>
                    <div>
                      <Hero
                        name={"contact"}
                        title={data?.content?.title_en}
                        background_color={data?.content?.background_color}
                      />
                    </div>

                    <MainBreadcrumbDiv>
                      <Container>
                        <BreadcrumbDiv>
                          <Breadcrumb>
                            <Breadcrumb.Item>
                              <Links href="/">Home</Links>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Contact Us</Breadcrumb.Item>
                          </Breadcrumb>
                        </BreadcrumbDiv>
                      </Container>
                    </MainBreadcrumbDiv>
                  </div>
                </>)}
                {data["type"] === "three_card" && (<>
                  <div onClick={() => setDropdownCaretState(false)}>
                    <Container>
                      <ContactRow>
                        {data?.content?.cards?.map((item, index) => (
                          <ContactCol xl={8} lg={8} md={8} sm={24} xs={24} key={index}>
                            <img loading="lazy"alt={""} height={50} width={55} src={item?.image} />
                            <h1>{item?.title_en}</h1>
                            <PhoneNumberDiv>
                              <p><pre style={{fontFamily: "'TitilliumBold', sans-serif"}}>{item?.description_en}</pre></p>
                            </PhoneNumberDiv>
                          </ContactCol>
                        ))}
                      </ContactRow>
                    </Container>
                    </div>
                </>)}
              </div>
            )
          )}

        {GetWidgetsState?.heading_en &&
        <div onClick={() => setDropdownCaretState(false)}>
          <div>
            <SupportSection>
              <Container>
                <StyledSupportImageRow gutter={[32, 16]}>
                  <StyledSupportImageCol1
                    xl={13}
                    lg={13}
                    md={13}
                    sm={24}
                    xs={24}
                  >
                    {successMessageState !== "" ? (
                      <Alert
                        message="Success"
                        description="Thank you so much for taking your time to contact us. Our
                      team will get back to you as soon as possible"
                        type="success"
                        showIcon
                      />
                    ) : (
                      <>
                        <h1 className="con-heading">{GetWidgetsState?.heading_en}</h1>
                        <p>{GetWidgetsState?.description_en}</p>

                        <Row gutter={[16, 16]}>
                          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                            <StyledInput
                              placeholder="Your Name"
                              name="your_name"
                              maxLength={300}
                              onChange={inputHandler}
                              onBlur={()=>setValidationState(true)}
                              value={supportState?.your_name}
                              />
                              {(validationState&&supportState?.your_name=="")&&
                                <StyledErrorP
                                style={{ color: "#fa4947" }}
                                >
                                  Name is mandatory
                                </StyledErrorP>
                              }
                          </Col>

                          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                            <StyledInput
                              placeholder="Your Email"
                              name="your_email"
                              onChange={inputHandler}
                              maxLength={500}
                              onClick={() => setEmailState(true)}
                              onKeyDown={() => setEmailState(true)}
                              value={supportState?.your_email}
                              onBlur={()=>setValidationState1(true)}
                              />
                            {emailValidationState === "Invalid Email" && (
                              <StyledErrorP>Invalid Email</StyledErrorP>
                              )}
                              {(validationState1&&supportState?.your_email=="")&&
                                <StyledErrorP
                                  style={{ color: "#fa4947" }}
                                >
                                  Email is mandatory
                                </StyledErrorP>
                              }
                          </Col>

                          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            <StyledInput
                              placeholder="Subject"
                              name="subject"
                              maxLength={200}
                              onChange={inputHandler}
                              value={supportState?.subject}
                              onBlur={()=>setValidationState2(true)}
                              />
                              {(validationState2&&supportState?.subject=="")&&
                                <StyledErrorP
                                  style={{ color: "#fa4947" }}
                                >
                                  Subject is mandatory
                                </StyledErrorP>
                              }
                          </Col>

                          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            <StyledTextarea
                              rows={6}
                              placeholder="Enter Your Message"
                              name="message"
                              onChange={inputHandler}
                              maxLength={1500}
                              value={supportState?.message}
                              onBlur={()=>setValidationState3(true)}
                              />
                              {(validationState3&&supportState?.message=="")&&
                                <StyledErrorP
                                  style={{ color: "#fa4947" }}
                                >
                                  Message is mandatory
                                </StyledErrorP>        
                              }                      
                          </Col>
                        </Row>

                        <AgrrementRow>
                          <Checkbox
                            defaultChecked={agreeState}
                            // value={agreeState}
                            onChange={(e) => {
                              setAgreeState(e.target.checked);
                            }}
                          >
                            I agree to the{" "}
                            <b  onClick={() => window.open("/terms")}>
                              Terms & Conditions
                            </b>
                          </Checkbox>
                        </AgrrementRow>

                        {emailValidationState !== "Invalid Email" &&
                        !loading &&
                        agreeState &&
                        supportState?.your_name !== "" &&
                        supportState?.your_email !== "" &&
                        supportState?.subject !== "" &&
                        supportState?.message !== "" ? (
                          <CustomButton
                            customStyle={{
                              background: "#105F43",
                              color: "#fff",
                            }}
                            onClick={() => contactUsFunc(supportState)}
                          >
                            Send Your Message
                          </CustomButton>
                        ) : (
                          <CustomButton
                            customStyle={{
                              background: "rgb(224, 224, 224)",
                              color: "#fff",
                            }}
                            // onClick={() => contactUsFunc(supportState)}
                          >
                            Send Your Message
                          </CustomButton>
                        )}
                      </>
                    )}
                  </StyledSupportImageCol1>
                  <StyledSupportImageCol2 xl={8} lg={8} md={8} sm={24} xs={24}>
                    {/* <img loading="lazy"src={SupportImage} /> */}
                    <img loading="lazy"alt={""} height={400} width={400} src={GetWidgetsState?.image} />
                  </StyledSupportImageCol2>
                </StyledSupportImageRow>
              </Container>
            </SupportSection>
          </div>
          <Footer setValidationState={setValidationState} setValidationState1={setValidationState1} setValidationState2={setValidationState2} setValidationState3={setValidationState3}  setEmailValidationState={setEmailValidationState} setSuccessMessageState={setSuccessMessageState} setSupportState={setSupportState} setAgreeState={setAgreeState} />
        </div>
        }
      </body>
    </div>
  );

  const [isDesktop, setIsDesktop] = useState(false);

  useLayoutEffect(() => {
    if (window.innerWidth > 991) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth > 991) {
        setIsDesktop(true);
      } else {
        setIsDesktop(false);
      }
    };
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  return <>{DesktopView}</>;
};

export default Contact;

const BreadcrumbDiv = styled.div`
  padding: 20px 0;

  @media (max-width: 992px) {
    padding: 20px 0;
  }
`;

const MainBreadcrumbDiv = styled.div`
  border-bottom: 1px solid #dddddd;
`;

const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 576px) {
    width: 576px;
  }

  @media (min-width: 768px) {
    width: 768px;
  }

  @media (min-width: 992px) {
    width: 992px;
  }

  @media only screen and (min-width: 1160px) and (max-width: 1258px) {
    width: 1160px;
  }

  @media only screen and (min-width: 1259px) and (max-width: 1359px) {
    width: 1120px;
  }

  @media (min-width: 1342px) {
    width: 1120px;
  }
`;

const ContactRow = styled(Row)`
  border-bottom: 1px solid #ddd;
  .ant-col:nth-child(3) {
    border-right: 1px solid transparent !important;
  }
  padding: 40px 0;
  margin: 0 0px 40px;

  @media (max-width: 992px) {
    margin: 40px 0 !important;
    padding: 0 !important;
  }
`;

const ContactCol = styled(Col)`
  border-right: 1px solid #ddd;

  h1 {
    margin-bottom: 0px;
    font-family: "TitilliumBold", sans-serif;
    // font-weight: 700;
    font-size: 24px;
    line-height: 22px;
    color: #105f43;
    margin: 15px 0 12px 0;
  }

  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    margin-block: 15px;
    object-fit: contain;
  }

  @media (max-width: 992px) {
    border: 0;
    padding-block: 30px;

    :not(:last-child) {
      border-bottom: 1px solid #ddd;
    }
  }
`;

const PhoneNumberDiv = styled.div`
  p {
    margin-bottom: 8px;
    text-align: center;
  }
`;

const StyledSupportImageRow = styled(Row)`
  justify-content: space-between;
`;

const StyledSupportImageCol1 = styled(Col)`
  h1.con-heading {
    color: #105f43;
    font-family: 'TitilliumBold';
  }
`;

const StyledSupportImageCol2 = styled(Col)`
  img {
    width: 100%;
  }
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 992px) {
    margin: 30px 0;
  }
`;

const StyledInput = styled(Input)`
  background: #f8f8f8;
  border: 1px solid rgba(245, 245, 245, 0.1);
  border-radius: 10px;
  padding: 15px;
`;

const StyledTextarea = styled(TextArea)`
  // margin-bottom: 20px;
  background: #f8f8f8;
  border: 1px solid rgba(245, 245, 245, 0.1);
  padding: 15px;
  border-radius: 10px;
`;

const AgrrementRow = styled(Row)`
margin-top: 20px;
  .ant-checkbox {
    margin-bottom: 20px;
  }
`;

const SupportSection = styled.div`
  margin-block: 70px;
`;

const StyledErrorP = styled.p`
  margin-bottom: 0px;
  color: #fa4947 !important;
  font-size: 13px !important;
`;
