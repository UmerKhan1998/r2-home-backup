import React, { useLayoutEffect, useState } from "react";
import Head from "next/head";
import Header from "../src/components/adminLayoutHeader";
import styled from "styled-components";
import { Col, DatePicker, Input, Row, Select, Tabs } from "antd";

import { R2Favicon } from "../images";
import Preloader from "../public/images/Preloader.gif";
import { DownloadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import router from "next/router";
import { getCookies } from "../src/helpers/cookie";

const { Option } = Select;

const dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectItem, setSelectItem] = useState("receipts-detail");

  const authToken = getCookies("token");
  const userStatus = getCookies("userStatus");
  const [isAuthorized, setAuthorized] = useState(false);
  useLayoutEffect(() => {
    if (authToken === undefined) {
      router.push("/sign-in");
    } else if (userStatus === undefined || userStatus === "false") {
      router.push("/");
    } else if(authToken || userStatus === "true") {
      setAuthorized(true);
    }
  }, []);

  return (
    <>
      {isAuthorized ? (
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
              {/* <Container style={{ paddingInline: "0" }}> */}
              <Row gutter={[15, 15]}>
                <Col span={24}>
                  <MainHeading>Payment Receipts</MainHeading>
                </Col>
                <Col span={24}>
                  <PaymentReceipts>
                    <div className="receipts-detail-date">
                      <h4>Receipt - May 05, 2022</h4>
                      <a>
                        <DownloadOutlined style={{ fontSize: "16px" }} /> Download
                      </a>
                    </div>
                    <div className="receipts-detail-header">
                      <div>
                        <div className="course-name">
                          Riyadh Second Health Cluster
                        </div>
                        <div className="course-desc">
                          Prince Abdulaziz Ibn Musaid Ibn Jalawi St, St، Riyadh
                          12231, Saudi Arabia
                        </div>
                      </div>
                      <div className="order-transection">
                        <div>
                          <span>Date:</span> May 05, 2022
                        </div>
                        <div>
                          <span>Order#:</span> EC-673210A58654F6B258654F6B2
                        </div>
                        <div>
                          <span>Transaction ID:</span> F6B258654F6B2
                        </div>
                        <div>
                          <span>Payment Method:</span> Myfatoorah
                        </div>
                      </div>
                    </div>
                    <div className="receipts-detail-sendto">
                      <span>Sold to:</span> Abdul Manaf
                    </div>
                    <div className="receipts-detail-table">
                      <ReceiptTable>
                        <table>
                          <thead>
                            <tr>
                              <th style={{ width: "50%" }}>Item:</th>
                              <th>Ordered</th>
                              <th>Coupon Codes</th>
                              <th>Quantity</th>
                              <th>Price</th>
                              <th>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Course of Anesthesiology (Dental Esthetics)</td>
                              <td>May 05, 2022</td>
                              <td></td>
                              <td>01</td>
                              <td>SAR 35.00</td>
                              <td>SAR 35.00</td>
                            </tr>
                            <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td>Total Paid</td>
                              <td>SAR 35.00</td>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
                      </ReceiptTable>
                    </div>
                    <div className="receipts-detail-footer">
                      <p>
                        If you have any questions about this receipt please contact
                        our <a>support team</a>
                      </p>
                    </div>
                  </PaymentReceipts>
                </Col>
              </Row>
              {/* </Container> */}
            </Header>
          </body>
        </div>
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
  padding: 20px;

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
