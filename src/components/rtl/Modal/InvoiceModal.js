import React from "react";
import styled from "styled-components";
import { Button, Col, Input, Row } from "antd";
import { Envelope, MobileImg, RightClickCircle } from "../../../../images";
import { setCookies } from "../../../helpers/cookie";
import CustomButton from "../../Button";
import VideoPlayer from "../../VideoPlayer";
import router from "next/router";
import { BsFacebook } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { CopyToClipboard } from "react-copy-to-clipboard";
import moment from "moment";
import { Amount, DATE, Invoice, Name, Status, course, sar } from "../../../helpers/LanguageConstant";

const ShareModal = ({ openModal, setOpenModal, content,data,title,recordType }) => {
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
              <h1>{Invoice} - {content?content:""}</h1>
              <AiOutlineClose
                size={20}
                style={{ marginTop: 10, cursor: "pointer" }}
                onClick={() => setOpenModal(false)}
              />
            </Row>
            <StyledRow>
              <div>
              <h1 className="head">{recordType} {Name}:</h1>
              <p className="para">{title&&title}</p>
              </div>
            </StyledRow>
            <StyledRow>
              <div>
              <h1 className="head">{Amount}:</h1>
              <p className="para">{sar}{data?.invoiceAmount}</p>
              </div>
            </StyledRow>
            <StyledRow>
              <div>
              <h1 className="head">{Status}:</h1>
              <p className="para">{data?.invoiceStatus}</p>
              </div>
              </StyledRow>
            <StyledRow>
              {/* <div>
              <h1 className="head">{DATE}:</h1>
              <p className="para">{moment(data?.receiptDate)?.format("MMM DD, YYYY")}</p>
              </div> */}
              </StyledRow>
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
    font-family: "GESSTwoBold", sans-serif;
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
&:nth-child(2){
  border-bottom: 1px solid #e7e7e7;
}
&:nth-child(3){
  border-bottom: 1px solid #e7e7e7;
}
div{
  display:flex;
  align-items:center;
  // justify-content:space-between;
  .head{
    font-size: 15px !important;
  }
  .para{
    font-size: 15px !important;
    margin-right: 10px;
    }
}
`;

const StyledIconsRow = styled(Row)`
  div {
    // border-radius: 55px !important;
    margin-right: 10px;
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
