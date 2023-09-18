import React from "react";
import styled from "styled-components";
import { Col, Row } from "antd";
import Logo from "../../rtl/logoFooter";
import Link from "next/link";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import { AiFillPhone, AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";
import { FaFacebookSquare, FaLinkedinIn } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { ImFacebook } from "react-icons/im";
import moment from "moment";
import endpoints from "../../../../src/api";
import { CellPhone, Email, FooterSideDesign, Phone } from "../../../../images";
import {
  Academic_integrity_policy,
  apply,
  apply_for_scholarship,
  Attendance_policy,
  Complaint_and_suggestions,
  contact_us,
  Contact_us_technical_support,
  Copyright,
  Copyrights_policies,
  course,
  courses,
  Evaluate_our_services,
  follow_us_on,
  footer_para,
  for_text,
  free,
  goals,
  Instructor_satisfaction_survey,
  Introduction_to_platform,
  more_from_r2,
  online,
  onsite,
  our_courses,
  our_programs,
  our_trainings,
  paid,
  Policies,
  privacy_policy,
  programs,
  request,
  request_service,
  riyadh_second_health_cluster,
  Rules_and_conditions,
  scholarship,
  send_request,
  support,
  Technical_support_policy,
  terms_and_conditions,
  track_your_scholarship,
  Trainee_Manual,
  Trainee_satisfaction_survey,
  Trainer_Instructor_Manual,
  trainings,
  Training_Management,
  view_all,
  vision,
  who_we_are,
} from "../../../helpers/LanguageConstant";
import CustomButton from "../../Button";
import { useRouter } from "next/router";
import { setCookies } from "../../../helpers/cookie";
import { useState } from "react";
import { useLayoutEffect } from "react";

const Footer = ({setSuccessMessageState,setSupportState,setAgreeState,setValidationState,setValidationState1,setValidationState2,setValidationState3,setEmailValidationState}) => {
  const router = useRouter();

  const linksArr1 = [
    { name: `${view_all} ${courses}`, link: "/ar/courses-landing-page" },
    { name: `${onsite} ${courses}`, link: "/ar/courses-landing-page", filterCategory: "Onsite" },
    { name: `${online} ${courses}`, link: "/ar/courses-landing-page", filterCategory: "Online" },
    { name: `${request} ${courses}`, link: "/ar" },
    { name: `${send_request}`, link: "/ar" },
  ];

  const linksArr2 = [
    { name: `${view_all} ${programs}`, link: "/ar/programs-landing-page" },
    { name: `${onsite} ${programs}`, link: "/ar/programs-landing-page", filterCategory: "Onsite" },
    { name: `${online} ${programs}`, link: "/ar/programs-landing-page", filterCategory: "Online" },
    { name: `${request} ${programs}`, link: "/ar" },
  ];

  const linksArr3 = [
    { name: `${view_all} ${trainings}`, link: "/ar/trainings-landing-page" },
    { name: `${onsite} ${trainings}`, link: "/ar/trainings-landing-page", filterCategory: "Onsite" },
    { name: `${online} ${trainings}`, link: "/ar/trainings-landing-page", filterCategory: "Online" },
    { name: `${request} ${trainings}`, link: "/ar" },
  ];

  const linksArr4 = [
    { name: Introduction_to_platform, link: "https://rise.articulate.com/share/6IX-8cv3BeBnq_AVmSZZpPjOQK5MDS5y#/", ExternalLink: true },
    { name: Trainee_Manual, link: "https://rise.articulate.com/share/6IX-8cv3BeBnq_AVmSZZpPjOQK5MDS5y#/", ExternalLink: true },
    { name: Trainer_Instructor_Manual, link: "https://rise.articulate.com/share/6IX-8cv3BeBnq_AVmSZZpPjOQK5MDS5y#/", ExternalLink: true },
    { name: Training_Management, link: "https://rise.articulate.com/share/6IX-8cv3BeBnq_AVmSZZpPjOQK5MDS5y#/", ExternalLink: true },
    { name: contact_us, link: "/ar/contact" },
    { name: Contact_us_technical_support, link: "https://survey.alchemer.com/s3/7262214/", ExternalLink: true },
    { name: Instructor_satisfaction_survey, link: "https://survey.alchemer.com/s3/7262131/New-Survey", ExternalLink: true },
    { name: Trainee_satisfaction_survey, link: "https://survey.alchemer.com/s3/7262211/", ExternalLink: true },
    { name: Evaluate_our_services, link: "#" },
  ];

  const linksArr5 = [
    { name: `${request_service}`, link: "/ar/service-request" },
    {
      name: apply_for_scholarship,
      link: "/ar/scholarship-personal-information",
    },
    {
      name: track_your_scholarship,
      link: "/ar/scholarship-track-application",
    },
  ];

  const linksArr6 = [
    { name: Rules_and_conditions, link: "/ar/rules-and-conditons" },
    { name: privacy_policy, link: "/ar/privacy-policy" },
    { name: Academic_integrity_policy, link: "/ar/acedemic-integrity-policy" },
    { name: Copyrights_policies, link: "/ar/copyrights-policy" },
    { name: Technical_support_policy, link: "/ar/technical-support-policy" },
    { name: Complaint_and_suggestions, link: "/ar/complaint-and-suggestions-policy" },
    { name: Attendance_policy, link: "/ar/attendance-policy" },
  ];

  const year = moment().format("YYYY");

  const [GetWidgetsState, setGetWidgetsState] = useState();
  const GetWidgets = async () => {
    try {
      const response = await endpoints.GetWidgets("footer");
      setGetWidgetsState(JSON.parse(response?.data?.data?.value));
    } catch (err) {
      console.log("err", err);
    }
  };

  useLayoutEffect(() => {
    GetWidgets();
  }, []);

  return (
    <>
      <SideDesignDiv>
        {/* <img loading="lazy"src={FooterSideDesign} /> */}
        <img loading="lazy"alt={""} height={500} width={500} src={FooterSideDesign} />
      </SideDesignDiv>
      <StyledDiv dir="rtl">
        <Container>
          <Row gutter={[12, 12]}>
            <Col
              className="to_centralized_text_on_sm"
              xl={5}
              lg={24}
              md={24}
              sm={24}
              xs={24}
            >
              <Link href="/ar">
                <a>
                  {/* <img loading="lazy"alt={""} src={Logo} alt="logo" width={50} height={10} /> */}
                  <Logo logo={GetWidgetsState?.logo} />
                </a>
              </Link>
              <p className="footer-p">{GetWidgetsState?.about_ar}</p>
              <ContactUsDiv>
                <h3>{GetWidgetsState?.contact_heading_ar}</h3>
 
                {GetWidgetsState?.contact_info?.map((item, index)=>(
                  <EmailDiv key={index}>
                    <img loading="lazy"alt={""} src={item?.icon} height={10} width={10} />
                    <p>{item?.text_ar}</p>
                  </EmailDiv>
                ))}
              </ContactUsDiv>
              <FollowUsOn>
                <h1>{GetWidgetsState?.social_heading_ar}</h1>
                <Row gutter={[36, 36]}>
                  {GetWidgetsState?.social_links?.map((item, index)=>(
                    <Col span={2} key={index}>
                      <SocialDiv
                        onClick={() =>
                          window.open(item?.link, "_blank")
                        }
                      >
                        <img loading="lazy"src={item?.icon} height={15} width={15} />
                      </SocialDiv>
                    </Col>
                  ))}
                </Row>
              </FollowUsOn>
            </Col>
            <StyledCol xl={3} lg={6} md={12} sm={12} xs={12}>
              <h2>
                <b>{our_courses}</b>
              </h2>
              {linksArr1?.map((item, index) => (<div key={index}>
                {(item?.filterCategory) && (
                  <Link href={`${item?.link}`}>
                    <p key={index} className="links-p" onClick={()=>{setCookies("coursesFilterCategory", item?.filterCategory)}}>
                      {item?.name}
                    </p>
                  </Link>
                )}
                {(item?.filterCategory === undefined) && (
                  <Link href={`${item?.link}`}>
                    <p key={index} className="links-p">
                      {item?.name}
                    </p>
                  </Link>
                )}
              </div>))}
            </StyledCol>
            <StyledCol xl={4} lg={6} md={12} sm={12} xs={12}>
              <h2>
                <b>{our_programs}</b>
              </h2>
              {linksArr2?.map((item, index) => (<div key={index}>
                {(item?.filterCategory) && (
                  <Link href={`${item?.link}`}>
                    <p key={index} className="links-p" onClick={()=>{setCookies("programFilterCategory", item?.filterCategory)}}>
                      {item?.name}
                    </p>
                  </Link>
                )}
                {(item?.filterCategory === undefined) && (
                  <Link href={`${item?.link}`}>
                    <p key={index} className="links-p">
                      {item?.name}
                    </p>
                  </Link>
                )}
              </div>))}
            </StyledCol>
            <StyledCol xl={4} lg={6} md={12} sm={12} xs={12}>
              <h2>
                <b>{our_trainings}</b>
              </h2>

              {linksArr3?.map((item, index) => (<div key={index}>
                {(item?.filterCategory) && (
                  <Link href={`${item?.link}`}>
                    <p key={index} className="links-p" onClick={()=>{setCookies("trainingFilterCategory", item?.filterCategory)}}>
                      {item?.name}
                    </p>
                  </Link>
                )}
                {(item?.filterCategory === undefined) && (
                  <Link href={`${item?.link}`}>
                    <p key={index} className="links-p">
                      {item?.name}
                    </p>
                  </Link>
                )}
              </div>))}
            </StyledCol>
            <StyledCol xl={4} lg={6} md={12} sm={12} xs={12}>
              <h2>
                <b className="R2">R2</b>
                <b>{more_from_r2}</b>
              </h2>

              {linksArr4?.map((item, index) => (<div key={index}>
                {(item?.ExternalLink) ? (
                  <a onClick={(e)=>{e.preventDefault(); window.open(item?.link, "_blank")}}>
                    <p
                      key={index}
                      className="links-p"
                      onClick={()=>{setSuccessMessageState&&setSuccessMessageState("");
                      setAgreeState&&setAgreeState(false);
                      setValidationState&&setValidationState(false);
                      setValidationState1&&setValidationState1(false);
                      setValidationState2&&setValidationState2(false);
                      setValidationState3&&setValidationState3(false);
                      setEmailValidationState&&setEmailValidationState("");
                      setSupportState&&setSupportState({
                        your_name: "",
                        your_email: "",
                        subject: "",
                        message: "",
                      })}}
                    >
                      {item?.name}
                    </p>
                  </a>
                ) : (
                  <Link href={`${item?.link}`}>
                    <p
                      key={index}
                      className="links-p"
                      onClick={()=>{setSuccessMessageState&&setSuccessMessageState("");
                      setAgreeState&&setAgreeState(false);
                      setValidationState&&setValidationState(false);
                      setValidationState1&&setValidationState1(false);
                      setValidationState2&&setValidationState2(false);
                      setValidationState3&&setValidationState3(false);
                      setEmailValidationState&&setEmailValidationState("");
                      setSupportState&&setSupportState({
                        your_name: "",
                        your_email: "",
                        subject: "",
                        message: "",
                      })}}
                    >
                      {item?.name}
                    </p>
                  </Link>
                )}
              </div>))}
            </StyledCol>
            <StyledCol xl={4} lg={8} md={24} sm={24} xs={24}>
              <h2>
                <b>{support}</b>
              </h2>
              {linksArr5?.map((item, index) => (
                <Link href={`${item?.link}`}>
                  <p key={index} className="links-p">
                    {item?.name}
                  </p>
                </Link>
              ))}
              <ContactUsDiv>
                <h3>{Policies}</h3>
 
                {linksArr6?.map((item, index) => (
                  <Link href={`${item?.link}`}>
                    <p key={index} className="links-p">
                      {item?.name}
                    </p>
                  </Link>
                ))}

              </ContactUsDiv>
            </StyledCol>
          </Row>
        </Container>
      </StyledDiv>
      <StyledRow2 dir={"rtl"}>
        <p className="footer2-p">
          {GetWidgetsState?.bottom_text_ar}
        </p>
      </StyledRow2>
    </>
  );
};

export default Footer;

const StyledDiv = styled.div`
  padding-block: 55px;

  background: #fbfbfb;

  .footer-p {
    font-size: 14px;
    margin-top: 20px;
    width: 90%;
    color: #636363;
  }

  .links-p {
    cursor: pointer;
    margin-bottom: 12px;
    color: #000000d9;
  }

  h2 {
    font-size: 18px;
  }
  .footer2-p {
    text-align: center;
    width: 100%;
  }
  img {
    height: 30px !important;
  }

  @media (max-width: 991px) {
    padding-inline: 15px;
    .to_centralized_text_on_sm {
      text-align: center;
    }
    .to_centralized_text_on_sm a {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .footer-p {
      width: 100%;
    }
  }
`;

const ContactUsDiv = styled.div`
  h3 {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #101010;
  }
`;

const EmailDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  svg {
    color: #105f43;
    font-size: 16px;
  }
  img {
    height: 14px !important;
  }
  p {
    margin-bottom: 0px;
    margin-right: 6px;
    font-size: 13px;
  }
`;

const FollowUsOn = styled.div`
  h1 {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #101010;
    margin-block: 1em;
  }
  @media only screen and (min-width: 1200px) and (max-width: 1260px) {
    .ant-row {
      flex-wrap: wrap !important;
      // margin-right: 0px !important;
    }
  }
`;

const SocialDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 28px;
  background: #105f43;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
  svg {
    color: #fff;
    font-size: 16px;
  }
`;

const StyledCol = styled(Col)`
  h2 {
    margin-bottom: 20px !important;
    font-family: "GESSTwoBold", sans-serif;
  }
  .R2{
    font-family: "TitilliumBold", sans-serif;
    margin-left: 5px !important;
  }
  @media (min-width: 1200px) {
    border-right: 1px solid #d9d9d9;
    padding-right: 15px !important;
  }
`;

const StyledRow2 = styled(Row)`
  display: flex;
  justify-content: center;
  p {
    margin-top: 1rem !important;
    font-family: "GESSTwoLight", sans-serif;
  }
`;

const SideDesignDiv = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
  width: 100%;
  img {
    height: 390px;
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
    max-width: 992px;
  }

  @media (min-width: 1200px) {
    // min-width: 1200px;
    min-width: 1120px;
  }
`;