import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { MoreOutlined } from "@ant-design/icons";
import router from "next/router";
import { Empty, Switch } from "antd";
import moment from "moment";

import CourseThumb from "../../../public/images/CourseThumb.png";
import TranningThumb from "../../../public/images/TranningThumb.png";
import ProgramThumb from "../../../public/images/ProgramThumb.png";
import WebinarThumb from "../../../public/images/WebinarThumb.png";
import ConferenceThumb from "../../../public/images/ConferenceThumb.png";
import SymposiumThumb from "../../../public/images/SymposiumThumb.png";
import WorkshopsThumb from "../../../public/images/WorkshopsThumb.png";
import { getCookies, setCookies } from "../../helpers/cookie";

const CustomTable = ({
  tableHead,
  tableBody,
  tableName,
  getNotificationSettingState,
  setGetNotificationSettingState,
  AssessmentRecordType,
}) => {
  //console.log("tableBody", tableBody);
  return (
    <>
      {tableName === "assessments" && (
        <>
          {tableBody?.length > 0 ? (
            <StyledTable style={{minWidth:"950px"}}>
              <StyledTableHead>
                <tr>
                  {tableHead?.map((item, index) => (
                    <th key={index}>{item}</th>
                  ))}
                </tr>
              </StyledTableHead>

              <>
                <StyledTableBody>
                  {tableBody?.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <div className="instructor-info">
                          {/* <img loading="lazy"src={item?.instructor?.img} width="30px" /> */}
                          <div>
                            <span className="name">
                              {item?.instructorName_EN}
                            </span>
                            {/* <span className="email">{item?.instructor?.email}</span> */}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div
                          className="assessement-info"
                          style={{ textAlign: "center" }}
                        >
                          <div>{item?.title_EN}</div>
                          {/* <div>{item?.assessement?.assessement_section}</div> */}
                        </div>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {" "}
                        {item?.courseTrainingTitle_EN}{" "}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {" "}
                        {item?.passingScore}{" "}
                      </td>
                      <td style={{ textAlign: "center" }}> {item?.score} </td>
                      <td style={{ textAlign: "center" }}> 
                        {(item?.assessmentCategory === "Asynchronous") ? ('-') : (moment.utc(item?.dueDate).local().format("MMMM DD, YYYY"))}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {" "}
                        {item?.passingStatus}{" "}
                      </td>

                      <td>
                        <div className="action">
                          {item?.passingStatus === "Pass" && (
                            <a
                              onClick={(e) => {
                                e.preventDefault();
                                setCookies(
                                  "courseTrainingRegistrationId",
                                  item?.registrationId
                                );
                                router.push(
                                  `/${AssessmentRecordType}-assessments/${item?.fileId}`
                                );
                              }}
                            >
                              Submitted
                            </a>
                          )}
                          {item?.passingStatus === "Fail" && (
                            <a
                              onClick={(e) => {
                                e.preventDefault();
                                setCookies(
                                  "courseTrainingRegistrationId",
                                  item?.registrationId
                                );
                                router.push(
                                  `/${AssessmentRecordType}-assessments/${item?.fileId}`
                                );
                              }}
                            >
                              Resubmit
                            </a>
                          )}
                          {item?.passingStatus === "Inprogress" && (
                            <a
                              onClick={(e) => {
                                e.preventDefault();
                                setCookies(
                                  "courseTrainingRegistrationId",
                                  item?.registrationId
                                );
                                router.push(
                                  `/${AssessmentRecordType}-assessments/${item?.fileId}`
                                );
                              }}
                            >
                              View Result
                            </a>
                          )}
                          {item?.passingStatus === "Pending" && (
                            <span> - </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </StyledTableBody>
              </>
            </StyledTable>
          ) : (
            <div>
              <EmptyData>
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={"No Record Found!"}
                />
              </EmptyData>
            </div>
          )}
        </>
      )}
      {tableName === "surveys" && (
        <>
          {tableBody?.length > 0 ? (
            <StyledTable>
              <StyledTableHead>
                <tr>
                  {tableHead?.map((item, index) => (
                    <th key={index}>{item}</th>
                  ))}
                </tr>
              </StyledTableHead>
              <StyledTableBody>
                {tableBody?.map((item, index) => (
                  <tr key={index}>
                    <td> {item?.title_EN} </td>
                    <td style={{ textAlign: "center" }}>
                      {" "}
                      {item?.instructorName_EN}{" "}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {" "}
                      {item?.courseTrainingTitle_EN}{" "}
                    </td>
                    {/* <td style={{ textAlign: "center" }}>
                      {" "}
                      {moment(item?.date)?.format("DD MMM, YYYY hh:mm")}{" "}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {" "}
                      {moment(item?.dueDate)?.format("DD MMM, YYYY hh:mm")}{" "}
                    </td> */}
                    <td style={{ textAlign: "center" }}>
                      {item?.passingStatus}
                    </td>
                    {/* <td style={{ textAlign: "center" }}>
                  {item?.status === "Pending" && (
                    <span style={{ color: "#FFB113" }}>Pending</span>
                  )}
                  {item?.status === "Submitted" && (
                    <span style={{ color: "#51D781" }}>Submitted</span>
                  )}
                </td>
                <td>
                  <div className="action">
                    {item?.status === "Pending" && (
                      <Link href="">Submit Survey</Link>
                    )}
                    {item?.status === "Submitted" && <></>}
                  </div>
                </td> */}
                  </tr>
                ))}
              </StyledTableBody>
            </StyledTable>
          ) : (
            <div>
              <EmptyData>
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={"No Record Found!"}
                />
              </EmptyData>
            </div>
          )}
        </>
      )}
      {tableName === "payment_receipts" && (
        <>
          {tableBody?.length > 0 ? (
            <StyledTable>
              <StyledTableHead>
                <tr>
                  {tableHead?.map((item, index) => (
                    <th key={index}>{item}</th>
                  ))}
                </tr>
              </StyledTableHead>
              <StyledTableBody>
                {tableBody?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="instructor-info receipt">
                        {item?.recordType == "Course" && (
                          <img loading="lazy"src={CourseThumb?.src} />
                        )}
                        {item?.recordType == "Training" && (
                          <img loading="lazy"src={TranningThumb?.src} />
                        )}
                        {item?.recordType == "Program" && (
                          <img loading="lazy"src={ProgramThumb?.src} />
                        )}
                        {item?.recordType == "Webinar" && (
                          <img loading="lazy"src={ConferenceThumb?.src} />
                        )}
                        {item?.recordType == "Conference" && (
                          <img loading="lazy"src={WebinarThumb?.src} />
                        )}
                        {item?.recordType == "Symposiums" && (
                          <img loading="lazy"src={SymposiumThumb?.src} />
                        )}
                        {item?.recordType == "Workshop" && (
                          <img loading="lazy"src={WorkshopsThumb?.src} />
                        )}
                        <div>
                          <span className="name">
                            {item?.courseTrainingTitle_EN}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {item?.departmentName_EN}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {moment(item?.receiptDate).format("MMMM DD, YYYY")}
                    </td>
                    <td style={{ textAlign: "center" }}> {item?.netPrice} </td>
                    <td style={{ textAlign: "center" }}>
                      {item?.modeOfPayment != "CashDeposit" ||
                      item?.modeOfPayment != "BankDeposit" ? (
                        <>
                          {item?.modeOfPayment === "CashDeposit" &&
                            "Cash Deposit"}
                          {item?.modeOfPayment === "BankDeposit" &&
                            "Bank Deposit"}
                        </>
                      ) : (
                        item?.modeOfPayment
                      )}
                    </td>
                    <td>
                      <div className="action receipt">
                        <Link
                          href={`/receipts-detail/${item?.courseTrainingRegistrationId}`}
                        >
                          Receipt
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </StyledTableBody>
            </StyledTable>
          ) : (
            <div>
              <EmptyData>
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={"No Record Found!"}
                />
              </EmptyData>
            </div>
          )}
        </>
      )}
      {tableName === "notification_setting" && (
        <StyledTable>
          <StyledTableHead>
            <tr>
              {tableHead?.map((item, index) => (
                <th key={index}>{item}</th>
              ))}
            </tr>
          </StyledTableHead>
          <StyledTableBody>
            <tr>
              <td>1</td>
              <td>Email Status</td>
              <td>
                <StyledSwitch
                  uncheckedIcon={false}
                  checkedIcon={false}
                  onColor={"#105f43"}
                  checked={getNotificationSettingState?.emailStatus}
                  onChange={(checked) =>
                    setGetNotificationSettingState({
                      ...getNotificationSettingState,
                      emailStatus: checked,
                    })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Notification</td>
              <td>
                <StyledSwitch
                  uncheckedIcon={false}
                  checkedIcon={false}
                  onColor={"#105f43"}
                  checked={getNotificationSettingState?.notification}
                  onChange={(checked) =>
                    setGetNotificationSettingState({
                      ...getNotificationSettingState,
                      notification: checked,
                    })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>SMS Status</td>
              <td>
                <StyledSwitch
                  uncheckedIcon={false}
                  checkedIcon={false}
                  onColor={"#105f43"}
                  checked={getNotificationSettingState?.smsStatus}
                  onChange={(checked) =>
                    setGetNotificationSettingState({
                      ...getNotificationSettingState,
                      smsStatus: checked,
                    })
                  }
                />
              </td>
            </tr>
          </StyledTableBody>
        </StyledTable>
      )}
      {tableName === "reminders_settings" && (
        <StyledTable>
          <StyledTableHead>
            <tr>
              {tableHead?.map((item, index) => (
                <th key={index}>{item}</th>
              ))}
            </tr>
          </StyledTableHead>
          <StyledTableBody>
            {tableBody?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item?.subject}</td>
                <td style={{maxWidth: "200px"}}>{item?.message}</td>
                <td>{moment.utc(item?.dateTime).local().format("MMMM DD, YYYY h:mm:ss a")}</td>
              </tr>
            ))}
          </StyledTableBody>
        </StyledTable>
      )}
    </>
  );
};

export default CustomTable;

// Table Style
const StyledTable = styled.table`
  width: 100%;
  min-width: 850px;
`;
const StyledTableHead = styled.thead`
  tr {
    border-bottom: 1px solid #e1e1e1;
  }
  th {
    padding: 15px 10px;
    font-size: 14px;
    // font-weight: 700;
    text-align: left;
    font-family: "TitilliumNormal", sans-serif;
    white-space: nowrap;
    :not(:first-child) {
      text-align: center;
    }
  }
`;
const StyledTableBody = styled.tbody`
  tr:not(:last-child) {
    border-bottom: 1px solid #e1e1e1;
  }
  td {
    position: relative;
    padding: 20px 10px;
    font-size: 12px;
    color: #121212;
    font-weight: 600;
  }
  td:not(:last-child)::before {
    position: absolute;
    content: "";
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    width: 1px;
    height: 50%;
    background: #e1e1e1;
  }
  td .instructor-info {
    display: flex;
    align-items: center;
  }
  td .instructor-info img {
    width: 30px;
    margin-right: 12px;
    border-radius: 100%;
  }
  td .instructor-info.receipt img {
    width: 35px;
    margin-right: 12px;
    border-radius: 10%;
  }
  td .instructor-info .name {
    font-size: 12px;
    display: block;
    // font-weight: 700;
  }
  td .instructor-info.receipt .name {
    font-size: 12px;
    display: block;
    font-weight: 600;
  }
  td .instructor-info .email {
    font-size: 11px;
    display: block;
    color: #707070;
    line-height: 8px;
  }
  td .assessement-info {
    font-size: 11px;
    line-height: 15px;
    color: #707070;
  }
  td .assessement-info div:nth-child(1) {
    font-size: 12px;
    font-weight: 600;
    color: #000;
  }
  td .action {
    display: flex;
    justify-content: center;
  }
  td .action a {
    color: #105f43;
    text-decoration: underline;
    white-space: nowrap;
  }
  td .action.receipt a {
    color: #000;
    display: inline-block;
    text-decoration: none;
    padding: 2px 15px;
    font-weight: 600;
    border: 1px solid #00000085;
    border-radius: 4px;
  }
  td .table-dropdown {
    position: relative;
    margin-left: 5px;
  }
  td .table-dropdown .table-dropdown-link:hover .table-dropmenu {
    display: block;
  }
  td .table-dropdown .table-dropmenu {
    position: absolute;
    top: calc(100% - 2px);
    right: 0;
    padding: 5px 10px;
    width: 100px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 5px 5px 31px rgb(0 0 0 / 10%);
    display: none;
    border-top-right-radius: 0;
    z-index: 1;
  }
  tr:last-child td .table-dropmenu {
    top: unset;
    bottom: calc(100% - 2px);
  }
  td .table-dropdown .table-dropmenu a {
    display: block;
    padding: 4px 0;
    font-size: 11px;
    text-decoration: none;
    color: #121212;
  }
  td .table-dropdown .table-dropmenu a:not(:last-child) {
    border-bottom: 1px solid #e1e1e1;
  }
`;
// Table Style End
const StyledSwitch = styled(Switch)`
  &.ant-switch-checked {
    background: #a87e33;
  }
`;
const EmptyData = styled.div`
  width: 100%;
  height: auto;
  border-radius: 8px;
  background: #fff;
`;
