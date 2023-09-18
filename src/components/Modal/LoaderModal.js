import { Row } from "antd";
import Image from "next/dist/client/image";
import React from "react";
import styled from "styled-components";
import { Envelope, MobileImg, RightClickCircle } from "../../../images";
import { setCookies } from "../../helpers/cookie";
import CustomButton from "../Button";
import Preloader from "../../../public/images/Preloader.gif";

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
        <StyledDiv>
          <Image alt={""} height={70} width={70} src={Preloader} />
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
  padding-top: 40vh;
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
