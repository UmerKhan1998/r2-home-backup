import React,{ useState } from 'react'
import moment from "moment";
import styled from "styled-components";
import { Collapse, Radio, Row, Divider, Checkbox,Slider } from "antd";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { removeCookies } from "../../../helpers/cookie";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import {
  Asynchronous,
  Category,
  clear,
  course,
  courses,
  DATE,
  develop_your_skills_in_a_huge_range_of,
  expert_instruction,
  filter,
  find_the_right_instructor_for_you,
  From,
  home,
  in2,
  Level,
  LOCATION,
  of,
  online,
  onsite,
  PRICE,
  Refine,
  Results,
  sar,
  showing,
  subjects,
  Synchronous,
  thousands_of_satisfied_students,
  to,
  Type,
} from "../../../helpers/LanguageConstant";

const { Panel } = Collapse;

const MobileView = ({visibleFilterDrawer, 
    setCheckFilter,
    setCourseTrainingMasterCategoryIdState,
    setOnFilterCategoryCheckFilter,
    setCourseTrainingCategoryId,
    setOnFilterLevelCheckFilter,
    setLevelId,
    setPriceState,
    setDateFromState,
    setDateToState,
    setLocationState,
    setLocationId,
    setCourseType,
    dateFromState,
    dateToState,
    filterArr,
    filterArr1,
    filterArr2,
    priceState,
    sliderChange,
    onChangeLocation,
    locationState,
    courseType,
    onCourseTypeChange,
    checkFilter,
    onFilterCategoryCheckFilter,
    onFilterLevelCheckFilter,
    onFilterChange,
    onFilterChange1,
    onFilterCategoryChange,
    onFilterLevelChange,
    filterArr3,
    checkFilter1,
    setVisibleFilterDrawer,
}) => {
  return (
    <>
                 <StyledMobFilter className={visibleFilterDrawer ? "show" : ""}>
            <StyledMobFilterHeader>
              <h3>
                {Refine} {Results}
              </h3>
              <span
                onClick={() => {
                  setVisibleFilterDrawer(false);
                }}
              >
                <svg
                  width="30"
                  height="29"
                  viewBox="0 0 30 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      d="M6.21992 1.28181C6.1502 1.21209 6.09489 1.12931 6.05716 1.03821C6.01942 0.947114 6 0.849474 6 0.750868C6 0.652263 6.01942 0.554623 6.05716 0.463524C6.09489 0.372424 6.1502 0.289649 6.21992 0.219924C6.28965 0.1502 6.37242 0.0948912 6.46352 0.0571565C6.55462 0.0194218 6.65226 -7.34668e-10 6.75087 0C6.84947 7.34667e-10 6.94711 0.0194218 7.03821 0.0571565C7.12931 0.0948912 7.21209 0.1502 7.28181 0.219924L15 7.93961L22.7182 0.219924C22.7879 0.1502 22.8707 0.0948912 22.9618 0.0571565C23.0529 0.0194218 23.1505 0 23.2491 0C23.3477 0 23.4454 0.0194218 23.5365 0.0571565C23.6276 0.0948912 23.7104 0.1502 23.7801 0.219924C23.8498 0.289649 23.9051 0.372424 23.9428 0.463524C23.9806 0.554623 24 0.652263 24 0.750868C24 0.849474 23.9806 0.947114 23.9428 1.03821C23.9051 1.12931 23.8498 1.21209 23.7801 1.28181L16.0604 9L23.7801 16.7182C23.8498 16.7879 23.9051 16.8707 23.9428 16.9618C23.9806 17.0529 24 17.1505 24 17.2491C24 17.3477 23.9806 17.4454 23.9428 17.5365C23.9051 17.6276 23.8498 17.7104 23.7801 17.7801C23.7104 17.8498 23.6276 17.9051 23.5365 17.9428C23.4454 17.9806 23.3477 18 23.2491 18C23.1505 18 23.0529 17.9806 22.9618 17.9428C22.8707 17.9051 22.7879 17.8498 22.7182 17.7801L15 10.0604L7.28181 17.7801C7.21209 17.8498 7.12931 17.9051 7.03821 17.9428C6.94711 17.9806 6.84947 18 6.75087 18C6.65226 18 6.55462 17.9806 6.46352 17.9428C6.37242 17.9051 6.28965 17.8498 6.21992 17.7801C6.1502 17.7104 6.09489 17.6276 6.05716 17.5365C6.01942 17.4454 6 17.3477 6 17.2491C6 17.1505 6.01942 17.0529 6.05716 16.9618C6.09489 16.8707 6.1502 16.7879 6.21992 16.7182L13.9396 9L6.21992 1.28181Z"
                      fill="#000"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_848_3950"
                      x="0.667228"
                      y="0"
                      width="28.6655"
                      height="28.6655"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="5.33277" />
                      <feGaussianBlur stdDeviation="2.66639" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_848_3950"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_848_3950"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </span>
            </StyledMobFilterHeader>
            <StyledMobFilterBody dir="rtl">
              <div className="filterTopLeftBg">
                <svg
                  width="111"
                  height="120"
                  viewBox="0 0 111 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M42.7457 77.6363C42.7457 87.8629 42.8945 98.2356 42.7457 108.462C42.5969 113.283 40.6623 117.52 35.7514 119.273C33.3704 120.15 30.2454 120.15 27.7156 119.711C19.9772 118.543 12.3877 116.936 4.64942 115.475C-3.38653 114.014 -11.4225 112.699 -19.4584 111.238C-24.2205 110.361 -26.3039 107.001 -24.6669 102.472C-16.631 79.6816 -1.15438 65.0722 23.1023 60.3971C27.2691 59.6667 31.4359 59.2284 35.6027 59.0823C39.4718 58.9362 42.0016 61.4198 42.0016 65.3643C42.0016 69.455 42.5969 71.7925 42.5969 75.8831C42.7458 76.7597 42.7457 77.198 42.7457 77.6363Z"
                    fill="#105F43"
                    fill-opacity="0.07"
                  />
                  <path
                    d="M86.4956 58.0598C89.4719 57.9137 93.0434 57.6215 96.615 57.3293C104.502 56.745 111.496 60.3973 110.603 70.3317C109.264 84.0646 108.222 97.6514 107.181 111.384C106.734 116.644 104.056 118.689 98.6983 117.958C87.8349 116.498 77.7156 112.845 68.7868 106.563C58.965 99.5506 52.1197 90.3467 48.5481 78.9513C47.3576 75.1528 46.4647 71.3544 45.5718 67.5559C44.5301 63.1731 46.6135 60.1051 51.2267 59.3746C51.5244 59.3746 51.9708 59.2286 52.2685 59.2286C63.4295 58.7903 74.5905 58.4981 86.4956 58.0598Z"
                    fill="#105F43"
                    fill-opacity="0.07"
                  />
                  <path
                    d="M31.7341 56.8921C16.7039 57.1843 1.67377 57.4765 -13.3564 57.7687C-14.6958 57.7687 -16.1839 57.7687 -17.5232 57.7687C-22.7317 57.4765 -24.3686 52.5093 -23.9222 49.1491C-22.5828 39.653 -21.3924 30.1569 -19.9042 20.6607C-19.309 16.1318 -18.7137 11.4568 -17.5232 7.07396C-16.3327 2.54504 -12.7612 0.645812 -8.14794 1.66847C6.73344 4.88255 19.6802 11.4568 29.5019 23.2904C35.9009 31.1795 39.026 40.3835 40.663 50.1718C41.407 54.2624 39.1748 56.6 35.0081 56.8921C33.9664 57.0382 32.9247 56.8921 31.883 56.8921C31.7342 56.8921 31.7341 56.8921 31.7341 56.8921Z"
                    fill="#105F43"
                    fill-opacity="0.07"
                  />
                  <path
                    d="M43.4894 28.1108C43.4894 21.6826 43.6382 15.2545 43.4894 8.82633C43.3405 1.9599 48.6978 -0.231519 53.6087 0.498953C68.7877 2.83646 84.1155 5.32007 99.2946 7.80367C105.694 8.82633 108.521 13.3553 106.289 19.199C101.973 30.3022 94.8302 39.3601 84.7108 46.0804C75.0379 52.6546 64.0256 55.2843 52.567 56.4531C46.7632 57.0375 43.787 54.5539 43.6381 48.7101C43.4893 41.9897 43.4894 35.1233 43.4894 28.1108Z"
                    fill="#105F43"
                    fill-opacity="0.07"
                  />
                </svg>
              </div>
              <FilterDiv>
                <Row>
                  <h1>{filter}</h1>
                  <CloseDiv
                    onClick={() => {
                      setCheckFilter([]);
                      setCourseTrainingMasterCategoryIdState([]);
                      setOnFilterCategoryCheckFilter([]);
                      setCourseTrainingCategoryId([]);
                      setOnFilterLevelCheckFilter([]);
                      setLevelId([]);
                      setPriceState([0, 0]);
                      setDateFromState("");
                      setDateToState("");
                      setLocationState("");
                      setLocationId([]);
                      setCourseType("");
                      removeCookies("coursesFilterCategory")
                    }}
                  >
                    <AiOutlineCloseCircle />
                    <p>{clear}</p>
                  </CloseDiv>
                </Row>
                <StyledDivider />
                <StykedCollapse
                  bordered={false}
                  defaultActiveKey={["1"]}
                  expandIconPosition={"right"}
                  prefix={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  className="site-collapse-custom-collapse"
                >
                  <Panel
                    header={Type}
                    key="1"
                    className="site-collapse-custom-panel"
                  >
                    {filterArr?.map((item, index) => (
                      <Checkbox
                      key={index}
                        value={item?.id}
                        checked={checkFilter?.includes(item?.id)}
                        onChange={(e) => onFilterChange(e?.target?.value)}
                      >
                        {item?.name_AR}
                      </Checkbox>
                    ))}
                  </Panel>
                </StykedCollapse>

                <OptionTopDivMobile>
                  <StykedCollapse
                    bordered={false}
                    defaultActiveKey={["1"]}
                    expandIconPosition={"left"}
                    prefix={({ isActive }) => (
                      <CaretRightOutlined rotate={isActive ? 90 : 0} />
                    )}
                    className="site-collapse-custom-collapse"
                  >
                    <Panel
                      header={Category}
                      key="1"
                      className="site-collapse-custom-panel"
                    >
                      {filterArr1?.map((item, index) => (
                        <Checkbox
                        key={index}
                          value={item?.id}
                          checked={onFilterCategoryCheckFilter?.includes(
                            item?.id
                          )}
                          onChange={(e) =>
                            onFilterCategoryChange(e?.target?.value)
                          }
                        >
                          {item?.name_AR}
                        </Checkbox>
                      ))}
                    </Panel>
                  </StykedCollapse>
                </OptionTopDivMobile>

                <OptionTopDivMobile>
                  {/* {/ {filterArr2?.map((item, index) => ( /} */}
                  <StykedCollapse
                    bordered={false}
                    defaultActiveKey={["1"]}
                    expandIconPosition={"left"}
                    prefix={({ isActive }) => (
                      <CaretRightOutlined rotate={isActive ? 90 : 0} />
                    )}
                    className="site-collapse-custom-collapse"
                  >
                    <Panel
                      header={Level}
                      key="1"
                      className="site-collapse-custom-panel"
                    >
                      {filterArr2?.map((item, index) => (
                        <Checkbox
                        key={index}
                          value={item?.id}
                          checked={onFilterLevelCheckFilter?.includes(item?.id)}
                          onChange={(e) =>
                            onFilterLevelChange(e?.target?.value)
                          }
                        >
                          {item?.name_AR}
                        </Checkbox>
                      ))}
                    </Panel>
                  </StykedCollapse>
                  {/* {/ ))} /} */}
                </OptionTopDivMobile>

                <OptionTopDivMobile>
                  <StykedCollapse
                    bordered={false}
                    defaultActiveKey={["1"]}
                    expandIconPosition={"left"}
                    prefix={({ isActive }) => (
                      <CaretRightOutlined rotate={isActive ? 90 : 0} />
                    )}
                    className="site-collapse-custom-collapse"
                  >
                    <Panel
                      header={PRICE}
                      key="1"
                      className="site-collapse-custom-panel"
                    >
                      <StyledSlider
                        tooltipVisible={false}
                        defaultValue={[20, 50]}
                        value={priceState}
                        onChange={sliderChange}
                        range
                        max={5000}
                      />
                      <PriceRangeRow>
                        <PriceRangeDiv>
                          <p className="sar">{sar}</p>
                          <p className="price">{priceState[0]}</p>
                        </PriceRangeDiv>
                        <PriceRangeDiv>
                          <p className="sar">{sar}</p>
                          <p className="price">{priceState[1]}</p>
                        </PriceRangeDiv>
                      </PriceRangeRow>
                    </Panel>
                  </StykedCollapse>
                </OptionTopDivMobile>

                <StykedCollapse
                  bordered={false}
                  defaultActiveKey={["1"]}
                  expandIconPosition={"left"}
                  prefix={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  className="site-collapse-custom-collapse"
                >
                  <Panel
                    header={DATE}
                    key="1"
                    className="site-collapse-custom-panel"
                  >
                    <DateRangeRow>
                      <DateRangeDiv>
                        <p>{From}</p>
                        {/* <DatePicker
                          placeholder="dd/mm/yyyy"
                          onChange={(date, dateString) => {
                            setDateFromState(date?._d);
                          }}
                        /> */}
                                                <DatePicker 
                        // dateFormat={"dd/mm/yyyy"}
                        placeholder="dd/mm/yyyy"
                        defaultValue={"dd/mm/yyyy"}
                        // selected={startDate}
                        // showIcon
                        isClearable
                        selected={dateFromState?dateFromState:null}
                        onChange={(date) => setDateFromState(date)}
                        />
                      </DateRangeDiv>
                      <DateRangeDiv1>
                        <p>{to}</p>
                        <DatePicker 
                        // dateFormat={"dd/mm/yyyy"}
                        placeholder="dd/mm/yyyy"
                        defaultValue={"dd/mm/yyyy"}
                        // selected={startDate}
                        // showIcon
                        isClearable
                        selected={dateToState?dateToState:null}
                        onChange={(date) => setDateToState(date)}
                        />
                        {/* <DatePicker
                          placeholder="dd/mm/yyyy"
                          onChange={(date, dateString) => {
                            setDateToState(date?._d);
                          }}
                        /> */}
                      </DateRangeDiv1>
                    </DateRangeRow>
                  </Panel>
                </StykedCollapse>
                <StykedCollapse
                  ghost
                  bordered={false}
                  defaultActiveKey={["1"]}
                  expandIconPosition={"left"}
                  prefix={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  className="site-collapse-custom-collapse"
                >
                  <Panel
                    header={LOCATION}
                    key="1"
                    className="site-collapse-custom-panel"
                  >
                    <StyledGroup
                      onChange={onChangeLocation}
                      value={locationState}
                    >
                      <Radio value={"Onsite"}>{onsite}</Radio>
                      <Radio value={"Online"}>{online}</Radio>
                    </StyledGroup>
                    {locationState === "Onsite" && (
                      <>
                        <StyledDivider />
                        {filterArr3?.map((item, index) => (
                          <Checkbox
                            key={index}
                            value={item?.id}
                            checked={checkFilter1?.includes(item?.id)}
                            onChange={(e) => onFilterChange1(e?.target?.value)}
                          >
                            {item?.name_AR}
                          </Checkbox>
                        ))}
                      </>
                    )}
                  </Panel>
                </StykedCollapse>
                <StykedCollapse
                  ghost
                  bordered={false}
                  defaultActiveKey={["1"]}
                  expandIconPosition={"right"}
                  prefix={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  className="site-collapse-custom-collapse"
                >
                  <Panel
                    header={`${course} ${Type}`}
                    key="1"
                    className="site-collapse-custom-panel"
                  >
                    <StyledGroup
                      onChange={onCourseTypeChange}
                      value={courseType}
                    >
                      <Radio value={"Asynchronous"}>{Asynchronous}</Radio>
                      <Radio value={"Synchronous"}>{Synchronous}</Radio>
                    </StyledGroup>
                  </Panel>
                </StykedCollapse>
              </FilterDiv>
            </StyledMobFilterBody>
          </StyledMobFilter>
    </>
  )
}

export default MobileView

// Mobile View
const StyledMobFilter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #fff;
  transform: translate(-400px);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  z-index: 200;
  overflow: auto;
  z-index: 90001 !important;

  ::-webkit-scrollbar {
    width: 0;
  }

  &&.show {
    transform: translate(0);
    opacity: 1;
    visibility: visible;
  }
`;
const StyledMobFilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 20px 15px;
  background: #fff;

  h3 {
    margin: 0;
    font-size: 20px;
    color: #000;
    font-family: "TitilliumSemiBold";
  }
  > span {
    display: inline-block;
    height: 18px;
    cursor: pointer;
  }
`;
const StyledMobFilterBody = styled.div`
  position: relative;
  padding: 32px 20px;

  .filterTopLeftBg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
`;

const FilterDiv = styled.div`
  .ant-row {
    justify-content: space-between;
    h1 {
      margin-bottom: 0px;
      font-size: 20px;
      font-weight: 500;
    }
  }

  .ant-collapse-arrow {
    right: 6px !important;
  }

  .ant-collapse-header {
    padding: 12px 0px !important;
  }

  background: #fafafa;
  padding: 20px;
  border-radius: 15px;
  .ant-collapse-content > .ant-collapse-content-box {
    padding-bottom: 16px !important;
    padding-inline: 0px !important;
  }

  .ant-checkbox-wrapper {
    margin-left: 0px !important;
    margin-bottom: 6px !important;
  }

  .ant-collapse-content-box {
    display: grid !important;
  }
`;

const CloseDiv = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-bottom: 0px;
    margin-left: 5px;
  }
  &:hover {
    cursor: pointer;
  }
`;

const StyledSlider = styled(Slider)`
  .ant-slider-track {
    background-color: #424242 !important;
  }
  .ant-slider-handle {
    background-color: #424242 !important;
    border: solid 2px #424242 !important;
  }
`;

const StyledDivider = styled(Divider)`
  margin: 14px 0 !important;
`;

const PriceRangeDiv = styled.div`
  display: flex;
  p {
    margin-bottom: 0px;
  }
  .sar {
    font-size: 12px;
    display: display;
    // align-items: end;
    // font-weight: 900;
    margin-right: 5px;
    margin-top: 8px;
    color: #838383 !important;
  }
  .price {
    font-size: 19px;
    display: flex;
    align-items: end;
    color: #838383 !important;
  }
`;

const DateRangeDiv = styled.div`
  display: grid;
  width: 100% !important;

  p {
    margin-bottom: 0px;
  }
  .sar {
    font-size: 12px;
    display: display;
    // align-items: end;
    // font-weight: 900;
    margin-right: 5px;
    margin-top: 13px;
  }
  .price {
    font-size: 24px;
    display: flex;
    align-items: end;
  }
  .ant-picker {
    width: 100% !important;
    height: 42px !important;
    border: 1px solid #636363 !important;
    background-color: #fafafa !important;
    border-radius: 6px !important;
  }
  .ant-radio-checked .ant-radio-inner {
    border-color: #105f43 !important;
  }
  .react-datepicker__day--keyboard-selected{
    background-color: #105f43 !important;
    color: #fff !important;
  }
  .react-datepicker__header{
    background-color: #fff !important;
  }
  .react-datepicker__current-month{
    font-weight: 100 !important;
  }
  .react-datepicker{
    font-family: arial, sans-serif !important;
  }
  .react-datepicker__input-container>input:focus {
    border:1px solid #000 !important;
  }
  .react-datepicker__input-container>input {
    width: 100% !important;
    height: 42px !important;
    border: 1px solid #636363 !important;
    background-color: #fafafa !important;
    border-radius: 6px !important;
    padding-inline: 10px !important;
  }
  .react-datepicker__close-icon{
    right: 4px !important;
  }
  .react-datepicker__day--selected{
    background-color: #105f43 !important;
  }
  .react-datepicker__close-icon::after{
    background-color: rgba(0,0,0,0.4) !important;
  }
  .react-datepicker__close-icon{
    left: 8px !important;
    right: unset !important;
  }
`;

const DateRangeDiv1 = styled.div`
  display: grid;
  width: 100% !important;
  margin-top: 20px;

  p {
    margin-bottom: 0px;
  }
  .sar {
    font-size: 12px;
    display: display;
    // align-items: end;
    // font-weight: 900;
    margin-right: 5px;
    margin-top: 13px;
  }
  .price {
    font-size: 24px;
    display: flex;
    align-items: end;
  }
  .ant-picker {
    width: 100% !important;
    height: 42px !important;
    border: 1px solid #636363 !important;
    background-color: #fafafa !important;
    border-radius: 6px !important;
  }
  .react-datepicker__day--keyboard-selected{
    background-color: #105f43 !important;
    color: #fff !important;
  }
  .react-datepicker__header{
    background-color: #fff !important;
  }
  .react-datepicker__current-month{
    font-weight: 100 !important;
  }
  .react-datepicker{
    font-family: arial, sans-serif !important;
  }
  .react-datepicker__input-container>input {
    width: 100% !important;
    height: 42px !important;
    border: 1px solid #636363 !important;
    background-color: #fafafa !important;
    border-radius: 6px !important;
    padding-inline: 10px !important;
  }
  .react-datepicker__close-icon{
    right: 4px !important;
  }
  .react-datepicker__day--selected{
    background-color: #105f43 !important;
  }
  .react-datepicker__close-icon::after{
    background-color: rgba(0,0,0,0.4) !important;
  }
  .react-datepicker__close-icon{
    left: 8px !important;
    right: unset !important;
  }
  .ant-radio-checked .ant-radio-inner {
    border-color: #105f43 !important;
  }
`;

const PriceRangeRow = styled(Row)`
  justify-content: space-between;
`;

const DateRangeRow = styled(Row)`
  justify-content: space-between;
  width: 100% !important;
`;

const StyledGroup = styled(Radio.Group)`
  display: flex;
  justify-content: space-between;
`;

const OptionTopDiv = styled.div`
  margin-top: 6px;
`;
const StyledCollapse = styled(Collapse)`
  .ant-collapse-expand-icon {
    width: 100% !important;
  }
`;

const StykedCollapse = styled(Collapse)`
  .ant-collapse-header-text {
    text-align: start !important;
    -moz-transform: scaleX(-1) !important;
    -webkit-transform: scaleX(-1) !important;
    -o-transform: scaleX(-1) !important;
    transform: scaleX(-1) !important;
    -ms-filter: fliph !important;
    filter: fliph !important;
  }
  .ant-collapse-header {
    -moz-transform: scaleX(-1) !important;
    -webkit-transform: scaleX(-1) !important;
    -o-transform: scaleX(-1) !important;
    transform: scaleX(-1) !important;
    -ms-filter: fliph !important;
    filter: fliph !important;
  }
  .anticon {
    margin-inline: 0px !important;
  }
`;
const OptionTopDivMobile = styled.div`
  margin-top: 6px;
  // .ant-collapse-header {
  //   -moz-transform: scaleX(-1) !important;
  //   -webkit-transform: scaleX(-1) !important;
  //   -o-transform: scaleX(-1) !important;
  //   transform: scaleX(-1) !important;
  //   -ms-filter: fliph !important;
  //   filter: fliph !important;
  // }
  // .ant-collapse-header-text {
  //   -moz-transform: scaleX(-1) !important;
  //   -webkit-transform: scaleX(-1) !important;
  //   -o-transform: scaleX(-1) !important;
  //   transform: scaleX(-1) !important;
  //   -ms-filter: fliph !important;
  //   filter: fliph !important;
  // }
`;