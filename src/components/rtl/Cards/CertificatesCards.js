import React, { useState } from "react";
import { Col, Row } from "antd";
import { CertificateIcon } from "../../../../images";
import moment from "moment";
import endpoints from "../../../api";
import { DownloadOutlined } from "@ant-design/icons";
import { getCookies } from "../../../helpers/cookie";
import {
  department,
  Download,
  Issue_Date,
} from "../../../helpers/LanguageConstant";
import Image from "next/image";
import Rolling from "../../../../public/images/Rolling.gif";

const CertificatesCardsComp = ({
  title,
  issueDate,
  departmentName,
  categoryName,
  courseTrainingRegistrationId,
}) => {
  const authToken = getCookies("token");

  const [CertificateRequestLoading, setCertificateRequestLoading] =
    useState(false);
  const GetCertificateIssueByIdFunc = async () => {
    try {
      setCertificateRequestLoading(true);
      const response = await endpoints.GetCertificateCreate(
        authToken,
        courseTrainingRegistrationId
      );
      if (response?.data?.statusCode === "200") {
        let timestamp = new Date().getTime();

        const element = document.createElement("a");
        element.setAttribute("href", response?.data?.message);
        element.setAttribute("download", "");
        element.setAttribute("target", "_blank");

        element.style.display = "none";

        document.body.appendChild(element);

        element.click();
        document.body.removeChild(element);

        // window.open(response?.data?.message, "_blank")
        // setDownloadCertificateLink(response?.data?.message);
        // let timestamp = new Date().getTime();
        // const opt = {
        //   margin: [-1, 0, 0, 0],
        //   filename: `certificate-${timestamp}.pdf`,
        //   image: { type: 'jpeg', quality: 1 },
        //   html2canvas: { scale: 3, logging: true},
        //   jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        // };
        // html2pdf().set(opt).from(`<div style="height: 800px;">${response?.data?.data?.templateBody}</div>`).save();
        setCertificateRequestLoading(false);
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  return (
    <div className="certificate-card">
      <Row>
        <Col span={24} md={5} lg={3}>
          <div className="certificate-img">
            <img loading="lazy"src={CertificateIcon} />
          </div>
        </Col>
        <Col span={24} md={15} lg={17}>
          <div className="certificate-dec">
            <span>{categoryName}</span>
            <h3>{title}</h3>
            <div className="date-department">
              <span>{Issue_Date}:</span>{" "}
              {moment({ issueDate }).format("MMMM DD, YYYY")}
            </div>
            <div className="date-department">
              <span>{department}:</span> {departmentName}
            </div>
            {/* <a>View Certificate</a> */}
          </div>
        </Col>
        <Col span={12} md={4}>
          <div className="certificate-action">
            {CertificateRequestLoading ? (
              <a disabled>
                {" "}
                <img loading="lazy"src={Rolling.src} width="16px" height="16px" /> {Download}{" "}
              </a>
            ) : (
              <a
                onClick={(e) => {
                  e.preventDefault();
                  GetCertificateIssueByIdFunc(courseTrainingRegistrationId);
                }}
              >
                <DownloadOutlined style={{ fontSize: "16px" }} /> {Download}
              </a>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CertificatesCardsComp;
