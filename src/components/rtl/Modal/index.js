import { Row } from "antd";
import React from "react";
import styled from "styled-components";
import { Envelope, MobileImg, RightClickCircle } from "../../../../images";
import { setCookies } from "../../../helpers/cookie";
import {
  continue_p,
  edit_p,
  otp_modal_confirmation_para,
  otp_modal_confirmation_para1,
} from "../../../helpers/LanguageConstant";
import CustomButton from "../../Button";

const Modal = ({
  openModal,
  setOpenModal,
  registerationStep,
  setRegisterationStep,
  signInState,
  createLMSUsersFunc,
  invalidNumberState,
}) => {
  //console.log("invalidNumberState", invalidNumberState, registerationStep);
  return (
    <>
      {openModal && (
        <StyledDiv dir="rtl">
          <ModalDiv>
            <Row>
              <img loading="lazy"src={RightClickCircle} />
            </Row>
            <h1>{otp_modal_confirmation_para}</h1>
            <p className="description">{otp_modal_confirmation_para1}</p>
            <StyledContactRow>
              <ImgDiv1>
                <img loading="lazy"src={MobileImg} />
              </ImgDiv1>
              <p>+966 {signInState?.phone_number}</p>
            </StyledContactRow>
            <StyledContactRow1>
              <ImgDiv2>
                <img loading="lazy"src={Envelope} />
              </ImgDiv2>
              <p>{signInState?.email}</p>
            </StyledContactRow1>
            <ButtonRow>
              <CustomButton
                customStyle={{
                  border: "1px solid #105F43",
                  color: "#105F43",
                  borderRadius: "8px",
                }}
                onClick={() => setOpenModal(false)}
              >
                {edit_p}
              </CustomButton>
              <CustomButton
                customStyle={{
                  border: "1px solid #105F43",
                  background: "#105F43",
                  color: "#fff",
                  borderRadius: "8px",
                }}
                onClick={() => {
                  setOpenModal(false);
                  createLMSUsersFunc(signInState);
                  setCookies("email", signInState?.email);
                }}
              >
                {continue_p}
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
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 740px;
  z-index: 9999 !important;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalDiv = styled.div`
  background: #fff;
  padding: 20px;
  @media (min-width: 992px) {
    width: 40%;
  }
  @media (max-width: 991px) {
    width: 90%;
  }

  border-radius: 15px;
  p {
    color: #8c8c8c;
    margin-bottom: 0px;
    font-family: "HacenSaudiArabiaRegular", sans-serif;
    font-weight: 400;
    color: #8c8c8c;
  }
  h1 {
    color: #181818;
    font-family: "GESSTwoBold", sans-serif;
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
