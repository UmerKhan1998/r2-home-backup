import React, { useLayoutEffect, useRef, useState } from "react";
import Head from "next/head";
import endpoints from "../../src/api";
import Header from "../../src/components/adminLayoutHeader";
import styled from "styled-components";
import { Col, Row, Select } from "antd";

import { R2Favicon } from "../../images";
import Preloader from "../../public/images/Preloader.gif";
import Rolling from "../../public/images/Rolling.gif";
import { DownloadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import router, { useRouter } from "next/router";
import { getCookies } from "../../src/helpers/cookie";
import moment from "moment";
import CustomButton from "../../src/components/Button";
import Script from "next/script";
import Image from "next/image";

const { Option } = Select;

const dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectItem, setSelectItem] = useState("receipts-detail");

  const PaymentReceiptsHTML = useRef();

  const router = useRouter();
  const receiptId = router.query;

  const authToken = getCookies("token");
  const userStatus = getCookies("userStatus");
  const [isAuthorized, setAuthorized] = useState(false);
  useLayoutEffect(() => {
    if (authToken === undefined) {
      router.push("/sign-in");
    } else if (userStatus === undefined || userStatus === "false") {
      router.push("/");
    } else if (authToken || userStatus === "true") {
      setAuthorized(true);
    }
  }, []);

  const [dashboardReceiptDetail, setDashboardReceiptDetail] = useState();
  const [CertificateRequestLoading, setCertificateRequestLoading] =
    useState(false);
  const GetDashboardReceiptDetailFunc = async () => {
    try {
      const response = await endpoints.GetDashboardReceiptDetail(
        authToken,
        receiptId?.id
      );
      if (response.data.statusCode === "200") {
        setDashboardReceiptDetail(response?.data?.data);
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  function Convert_HTML_To_PDF() {
    const template = PaymentReceiptsHTML?.current;
    let timestamp = new Date().getTime();
    const opt = {
      margin: [0, 0, 0, 0],
      filename: `receipt-${timestamp}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2, logging: true },
      jsPDF: { unit: "in", format: "a4", orientation: "l" },
    };
    html2pdf().set(opt).from(template).save();
    setTimeout(() => {
      setCertificateRequestLoading(false);
    }, 1000);
  }

  useLayoutEffect(() => {
    GetDashboardReceiptDetailFunc();
  }, []);

  return (
    <>
      {isAuthorized ? (
        <>
          <Script type="text/javascript" src="../../html2pdf/htmlpdf.js" />
          <div className="container">
            <Head>
              <title>Riyadh Second Health Cluster</title>
              <link rel="icon" href={R2Favicon} />
            </Head>
            <body>
              <Header
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                selectItem={selectItem}
                setSelectItem={setSelectItem}
                name={""}
              >
                <Row gutter={[15, 15]}>
                  <Col span={24}>
                    <MainHeading>
                      <span>Payment Receipts</span>
                      {CertificateRequestLoading ? (
                        <CustomButton
                          customStyle={{
                            paddingInline: 30,
                            background: "#d1d1d1",
                            color: "#fff",
                            border: 0,
                            height: "unset",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          Download{" "}
                          <img loading="lazy"alt={""} src={Rolling} width="15px" height="15px" />
                        </CustomButton>
                      ) : (
                        <CustomButton
                          customStyle={{
                            paddingInline: 30,
                            background: "#105F43",
                            color: "#fff",
                            border: 0,
                            height: "unset",
                          }}
                          onClick={() => {
                            setCertificateRequestLoading(true);
                            Convert_HTML_To_PDF();
                          }}
                        >
                          Download{" "}
                          <DownloadOutlined
                            style={{ fontSize: "16px", marginRight: "5px" }}
                          />
                        </CustomButton>
                      )}
                    </MainHeading>
                  </Col>
                  <Col span={24}>
                    <PaymentReceipts ref={PaymentReceiptsHTML}>
                      <div className="receipts-detail-date">
                        <h4>
                          Receipt -{" "}
                          {moment(dashboardReceiptDetail?.invoiceDate).format(
                            "MMMM DD, YYYY"
                          )}
                        </h4>
                      </div>
                      <div className="receipts-detail-header">
                        <div>
                          <div className="course-name">
                            {dashboardReceiptDetail?.companyName_EN}
                          </div>
                          <div className="course-desc">
                            {dashboardReceiptDetail?.companyAddress_EN}
                          </div>
                        </div>
                        <div className="order-transection">
                          <div>
                            <span>Date:</span>{" "}
                            {moment(dashboardReceiptDetail?.invoiceDate).format(
                              "MMMM DD, YYYY"
                            )}
                          </div>
                          <div>
                            <span>Order#:</span>{" "}
                            {dashboardReceiptDetail?.invoiceNumber}
                          </div>
                          {dashboardReceiptDetail?.transactionIdOnline !==
                            "" && (
                            <div>
                              <span>Transaction ID:</span>
                              {dashboardReceiptDetail?.transactionIdOnline}
                            </div>
                          )}
                          <div>
                            <span>Payment Method:</span>{" "}
                            {dashboardReceiptDetail?.modeOfPayment !=
                              "CashDeposit" ||
                            dashboardReceiptDetail?.modeOfPayment !=
                              "BankDeposit" ? (
                              <>
                                {dashboardReceiptDetail?.modeOfPayment ===
                                  "CashDeposit" && "Cash Deposit"}
                                {dashboardReceiptDetail?.modeOfPayment ===
                                  "BankDeposit" && "Bank Deposit"}
                              </>
                            ) : (
                              dashboardReceiptDetail?.modeOfPayment
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="receipts-detail-sendto">
                        <span>Sold to:</span>{" "}
                        {dashboardReceiptDetail?.lmsUserName_EN}
                      </div>
                      <div className="receipts-detail-table">
                        <ReceiptTable>
                          <table>
                            <thead>
                              <tr>
                                <th style={{ width: "50%" }}>Item:</th>
                                <th>Ordered</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Discount</th>
                                <th>Tax</th>
                                <th>Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  {
                                    dashboardReceiptDetail?.courseTrainingTitle_EN
                                  }{" "}
                                  ({dashboardReceiptDetail?.departmentName_EN})
                                </td>
                                <td>
                                  {moment(
                                    dashboardReceiptDetail?.invoiceDate
                                  ).format("MMMM DD, YYYY")}
                                </td>
                                <td>01</td>
                                <td>SAR {dashboardReceiptDetail?.price}</td>
                                <td>
                                  SAR {dashboardReceiptDetail?.discountValue}
                                </td>
                                <td>SAR {dashboardReceiptDetail?.vatValue}</td>
                                <td>SAR {dashboardReceiptDetail?.netPrice}</td>
                              </tr>
                              <tr>
                                <td></td>
                                <td></td>
                                <td>Total Paid</td>
                                <td>
                                  SAR {dashboardReceiptDetail?.receiptAmount}
                                </td>
                                <td></td>
                                <td></td>
                              </tr>
                            </tbody>
                          </table>
                        </ReceiptTable>
                      </div>
                      <div className="receipts-detail-footer">
                        <p>
                          If you have any questions about this receipt please
                          contact our <a href="/contact" target="_blank">support team</a>
                        </p>
                      </div>
                    </PaymentReceipts>
                  </Col>
                </Row>
              </Header>
            </body>
          </div>
        </>
      ) : (
        <>
          <img loading="lazy"className="pre-loader" src={Preloader.src} />
        </>
      )}
    </>
  );
};

export default dashboard;

const MainHeading = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "TitilliumNormal", sans-serif;
`;
const PaymentReceipts = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 5px 5px 31px rgb(0 0 0 / 10%);

  .receipts-detail-date {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px 25px 20px;
    border-bottom: 1px solid #e1e1e1;

    @media screen and (max-width: 800px) {
      padding: 0 10px 20px 10px;
    }
  }
  .receipts-detail-date h4 {
    font-size: 16px;
    margin: 0;
  }
  .receipts-detail-date a {
    display: inline-block;
    color: #fff;
    background: #105f43;
    padding: 3px 12px;
    border-radius: 4px;
  }

  .receipts-detail-header {
    display: flex;
    justify-content: space-between;
    padding: 30px 20px;
    border-bottom: 1px solid #e1e1e1;

    @media screen and (max-width: 800px) {
      padding: 30px 10px;
    }
  }
  .receipts-detail-header .course-name {
    color: #105f43;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 5px;
  }
  .receipts-detail-header .course-desc {
    color: #707070;
    font-size: 12px;
    width: 250px;
  }

  .order-transection {
    font-size: 12px;
    font-weight: 600;
  }
  .order-transection > div {
    display: flex;
  }
  .order-transection span {
    // font-weight: 700;
    display: inline-block;
    width: 110px;
    margin-bottom: 6px;
  }

  .receipts-detail-sendto {
    font-size: 12px;
    font-weight: 600;
    padding: 10px 20px;
    border-bottom: 1px solid #e1e1e1;

    @media screen and (max-width: 800px) {
      padding: 10px;
    }
  }
  .receipts-detail-sendto span {
    // font-weight: 700;
    display: inline-block;
    margin-right: 8px;
    margin-bottom: 6px;
  }

  .receipts-detail-footer {
    padding: 15px 20px;
    border-top: 1px solid #e1e1e1;
  }
  .receipts-detail-footer p {
    font-size: 12px;
    font-weight: 600;
  }
  .receipts-detail-footer p a {
    color: #a87e33;
  }

  @media screen and (max-width: 800px) {
    .receipts-detail-header {
      flex-direction: column;
      gap: 25px;
    }
  }
`;

// Receipt Table
const ReceiptTable = styled.div`
  padding: 20px 5px;

  table {
    width: 100%;
    text-align: left;
    font-size: 12px;
  }
  table thead th {
    // font-weight: 700;
  }
  table tbody td {
    font-weight: 600;
  }
  table th,
  table td {
    padding: 10px;
  }
  table thead {
    border-bottom: 1px solid #909090;
  }
  table tbody tr:not(:last-child) {
    border-bottom: 1px solid #909090;
  }

  @media screen and (max-width: 800px) {
    overflow: auto;
    padding: 20px 0;

    ::-webkit-scrollbar {
      height: 2px;
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(16, 95, 67, 0.6);
    }

    > table {
      min-width: 900px;
    }
  }
`;
// Receipt Table End
