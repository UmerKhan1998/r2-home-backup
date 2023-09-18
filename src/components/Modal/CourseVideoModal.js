import { Row } from "antd";
import React from "react";
import styled from "styled-components";
import { Envelope, MobileImg, RightClickCircle } from "../../../images";
import { setCookies } from "../../helpers/cookie";
import CustomButton from "../Button";
import VideoPlayer from "../../components/VideoPlayer";

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
              <video
                src={url}
                oncontextmenu="return false;"
                controlsList="nodownload"
                controls
              ></video>
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
