import { Row } from "antd";
import React from "react";
import styled from "styled-components";
import {
  alert_icon,
  Envelope,
  MobileImg,
  RightClickCircle,
} from "../../../images";
import { setCookies } from "../../helpers/cookie";
import CustomButton from "../Button";

const Modal = ({
  openModal,
  setOpenModal,
  registerationStep,
  setRegisterationStep,
  signInState,
  createLMSUsersFunc,
  invalidNumberState,
  emailOrPhoneErrorState,
  emailOrPhoneErrorStatusState,
}) => {
  //console.log("invalidNumberState", invalidNumberState, registerationStep);
  return (
    <>
      {openModal && (
        <StyledDiv>
          <ModalDiv>
            <Row>
              <img loading="lazy"src={alert_icon} />
            </Row>
            <h1>Alert</h1>
            {emailOrPhoneErrorStatusState==="409.1" ? (
              <p className="description">
              Course has been inactive. Kindly Contact to our support team        
             </p>
            ) : (emailOrPhoneErrorStatusState==="409.2") ? (
              <p className="description">
               Instructor cannot be register as a Learner.
              </p>
            ) : (
              <p className="description">
              {emailOrPhoneErrorState === "Email Already Exist"
                ? "It looks like the email you have entered has been associated with another mobile number. Please use correct number"
                : "It looks like the mobile number you have entered has been associated with another email address. Please use correct number"}
               </p>
            )}
             

            <ButtonRow>
              <CustomButton
                customStyle={{
                  border: "1px solid #105F43",
                  background: "#105F43",
                  color: "#fff",
                  borderRadius: "8px",
                  width: "100%",
                }}
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                OK
              </CustomButton>
            </ButtonRow>
          </ModalDiv>
        </StyledDiv>
      )}
    </>
  );
};

export default Modal;

const StyledDiv = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 170vh;
  z-index: 9999 !important;
  display: flex;
  align-items: start;
  justify-content: center;
  padding-top: 24vh;
`;

const ModalDiv = styled.div`
  background: #fff;
  padding: 20px;
  @media (min-width: 992px) {
    width: 30%;
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
