import { Col, Row } from "antd";
import React from "react";
import styled from "styled-components";
import {
  courseClock,
  Envelope,
  MobileImg,
  RightClickCircle,
} from "../../../images";
import { setCookies } from "../../helpers/cookie";
import CustomButton from "../Button";
import VideoPlayer from "../VideoPlayer";

const Modal = ({ openModal, setOpenModal, url }) => {
  //console.log("url", url);
  //console.log("openModal", openModal);
  return (
    <>
      {openModal && (
        <StyledDiv>
          <div className="modalBg" onClick={() => setOpenModal(false)}></div>
          <ModalDiv>
            <CustomVideoPlayer>
              <SurveysSection>
                <h2 className="survey-title">Assessment Name</h2>
                <p className="survey-desc">
                  {" "}
                  Please take this survey about your experience in this course{" "}
                </p>

                <SurveysQuastions>
                  {url &&
                    url?.detailRecordKeyAssessmentViewModels?.detailRecordKeyAssessmentQuestionViewModels?.map(
                      (item, index) => (
                        <div className="surveys-quastion" key={index}>
                          <div className="quastion-head">
                            <h4>*1. Q1?</h4>
                          </div>
                          <div className="quastion-body">
                            <label className="quastion-option radio">
                              <input type="radio" name={`opt`} value="" />{" "}
                              <span className="quastion-border"></span>{" "}
                              <span>Ans1</span>
                            </label>
                          </div>
                        </div>
                      )
                    )}

                  <div className="surveys-quastion">
                    <div className="quastion-head">
                      <h4>*1. Q2?</h4>
                    </div>
                    <div className="quastion-body">
                      <label className="quastion-option checkbox">
                        <input type="checkbox" name={`opt`} value="" />{" "}
                        <span className="quastion-border"></span>{" "}
                        <span>Ans2</span>
                      </label>
                    </div>
                  </div>
                </SurveysQuastions>
              </SurveysSection>
              <Col
                span={24}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 20,
                }}
              >
                <CustomButton
                  customStyle={{
                    borderColor: "#105F43",
                    color: "#105F43",
                    height: "35px",
                    paddingInline: "30px",
                  }}
                  onClick={() => setOpenModal(false)}
                >
                  Close
                </CustomButton>
                {/* <CustomButton
                    customStyle={{
                      backgroundColor: "#105F43",
                      color: "#fff",
                      height: "35px",
                      paddingInline: "30px",
                      marginLeft: "10px",
                    }}
                  >
                    Submit
                  </CustomButton> */}
              </Col>
            </CustomVideoPlayer>
          </ModalDiv>
        </StyledDiv>
      )}
    </>
  );
};

export default Modal;

const CustomVideoPlayer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media screen and (max-width: 992px) {
    video {
      object-fit: contain;
    }
  }
`;

const StyledDiv = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 9998 !important;
  align-items: center;
  justify-content: center;

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
  display: flex;
  justify-content: center;
  height: 680px;

  /* scrollbar */
  &:-webkit-scrollbar {
    scrollbar-width: 0.5rem !important;
    width: 0.5rem !important;
  }

  &:-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1) !important;
    backdrop-filter: blur(20px) !important;
  }

  &:-webkit-scrollbar-thumb {
    background: #105f43;
    border-radius: 0.5em;
    box-shadow: inset 0.15em 0.1em 0.1em rgba(255, 255, 255, 0.5),
      inset -0.15em -0.15em 0.1em rgba(0, 0, 0, 0.3);
  }

  z-index: 9999 !important;
  @media (min-width: 992px) {
    width: 100%;
  }
  @media (max-width: 991px) {
    width: 90%;
  }

  border-radius: 15px;
  p {
    color: #8c8c8c;
    margin-bottom: 0px;
    font-family: "InterNormal", sans-serif;
    font-weight: 400;
    color: #8c8c8c;
  }
  h1 {
    color: #181818;
    font-family: "TitilliumBold", sans-serif;
    margin-bottom: 0px;
    margin-top: 10px;
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

const SurveysSection = styled.div`
  padding: 20px 25px;
  background: #fff;
  border-radius: 4px;
  height: 580px;
  overflow-y: scroll;

  .survey-title {
    font-size: 20px;
    font-family: "TitilliumBold";
    margin-bottom: 2px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .times {
      display: inline-block;
      font-size: 12px;
      font-family: "TitilliumSemiBold";

      .left {
        border: 1px solid #c7c7c7;
        padding: 3px 6px;
        border-radius: 3px;
        display: inline-block;

        b {
          font-family: "TitilliumBold";
        }
      }
      .total {
        margin-left: 8px;
      }
    }
  }
  .survey-desc {
    font-size: 14px;
    font-family: "TitilliumNormal";
    margin-bottom: 10px;
  }
`;
const SurveysQuastions = styled.div`
  padding: 20px 0;

  .surveys-quastion {
    border: 1px solid #c7c7c7;
    border-radius: 3px;
    margin-bottom: 20px;

    .quastion-head {
      padding: 8px 12px;
      background: #f2f2f2;
      border-top-right-radius: 3px;
      border-top-left-radius: 3px;
      border-bottom: 1px solid #c7c7c7;

      h4 {
        margin: 0;
        display: flex;
        justify-content: space-between;

        .points {
          display: inline-block;
          color: #000;
          background: #fff;
          font-size: 12px;
          padding: 2px 10px;
          border-radius: 3px;
        }
      }
    }
    .quastion-body {
      padding: 15px;

      .quastion-option {
        position: relative;
        display: block;
        border: 1px dashed transparent;
        padding: 7px 5px;
        font-size: 12px;
        font-family: "TitilliumSemiBold";
        padding-left: 30px;
        cursor: pointer;
        margin-bottom: 8px;
        transition: 0.3s;

        .quastion-border {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 3px;
          border: 1px dashed transparent;
          transition: 0.3s;
        }
        .quastion-border::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 8px;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          border-radius: 100%;
          border: 1px solid #c7c7c7;
          transition: all .1s;
        }
        .quastion-border::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 11px;
          transform: translateY(-50%);
          width: 10px;
          height: 10px;
          border-radius: 100%;
          transition: all .1s;
        }

        :hover .quastion-border {
          border-color: #c1c1c1;
        }

        &.checkbox {
          .quastion-border::after,
          .quastion-border::before {
            border-radius: 3px;
          }
        }

        input {
          width: 0;
          height: 0;
          opacity: 0;

          :checked {
            + .quastion-border {
              border: 1px solid #105f43ad;

              ::after {
                background: #105f43;
              }
            }
          }
        }

        &.checkbox input {
          + .quastion-border {
            ::after {
              left: 10px;
              width: 12px;
              height: 12px;
            }
          }
          :checked {
            + .quastion-border {
            ::before {
              background: #105f43;
            }
            ::after {
              content: '✓';
              color: #fff;
              text-align: center;
              line-height: 12px;
              font-size: 9px;
              font-family: "TitilliumBold";
            }
          }
        }
      }
    }
  }
`;
