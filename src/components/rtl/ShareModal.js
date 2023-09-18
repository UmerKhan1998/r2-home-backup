import React from "react";
import styled from "styled-components";
import { Button, Col, Input, Row } from "antd";
import { Envelope, MobileImg, RightClickCircle } from "../../../images";
import { setCookies } from "../../helpers/cookie";
import CustomButton from "../Button";
import VideoPlayer from "../../components/VideoPlayer";
import router from "next/router";
import { BsFacebook } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { copy, share_this } from "../../helpers/LanguageConstant";

const ShareModal = ({ openModal, setOpenModal, content, data }) => {
  //   //console.log("url", url);
  //console.log("openModal", openModal);
  // //console.log("router", window.location.href);

  return (
    <>
      {openModal && (
        <StyledDiv dir="rtl">
          <div className="modalBg" onClick={() => setOpenModal(false)}></div>
          <ModalDiv>
            <Row
              style={{
                display: "flex",
                // alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h1>
                {share_this} {content}
              </h1>
              <AiOutlineClose
                size={20}
                style={{ marginTop: 10, cursor: "pointer" }}
                onClick={() => setOpenModal(false)}
              />
            </Row>
            <StyledRow>
              <Col xl={21} lg={21} md={21} sm={22} xs={19}>
                <Input placeholder="abc" value={window.location.href} />
              </Col>
              <Col xl={2} lg={2} md={2} sm={2} xs={2}>
                <StyledCopyToClipboard text={window.location.href}>
                  <Button
                    style={{
                      color: "#fff",
                      backgroundColor: "#000",
                      height: 50,
                      borderRadius: 0,
                    }}
                  >
                    {copy}
                  </Button>
                </StyledCopyToClipboard>
              </Col>
            </StyledRow>
            <StyledIconsRow
              style={{
                justifyContent: "center",
                margin: "30px 0 20px",
              }}
            >
              <div style={{ borderRadius: 55, padding: 10 }} onClick={()=>window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`)}>
                <BsFacebook />
              </div>
              <div style={{ borderRadius: 55, padding: 10 }} onClick={()=>window.open(`https://twitter.com/intent/tweet?text=${window.location.href}`)}>
                <FaTwitter />
              </div>

              <div style={{ borderRadius: 55, padding: 10 }} onClick={()=>window.open(`mailto:?subject=Share: ${data?.title_AR}&body=Share: ${data?.title_AR} ${window.location.href}`)}>
                <MdEmail />
              </div>
            </StyledIconsRow>
          </ModalDiv>
        </StyledDiv>
      )}
    </>
  );
};

export default ShareModal;

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
  flex-direction: column;

  z-index: 9999 !important;
  @media (min-width: 992px) {
    width: 100%;
  }
  @media (max-width: 991px) {
    width: 90%;
  }

  border-radius: 5px;
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
    margin-block: 10px;
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

const StyledRow = styled(Row)`
  @media (min-width: 992px) {
    .ant-input {
      // width: 90% !important;
      height: 50px !important;
    }
  }
  @media (max-width: 991px) {
    .ant-input {
      // width: 85% !important;
      height: 50px !important;
    }
  }
`;

const StyledIconsRow = styled(Row)`
  div {
    // border-radius: 55px !important;
    margin-left: 10px;
    border: 1px solid;
    display: flex;
    align-items: center;
    // padding: 15px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }

    svg {
      font-size: 24px;
    }
  }
  div:last-child {
    margin-right: 0px !important;
  }
`;

const StyledCopyToClipboard = styled(CopyToClipboard)`
  .ant-btn {
    border-radius: 0px !important;
  }
`;
