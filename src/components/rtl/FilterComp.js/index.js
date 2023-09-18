import React from "react";
import moment from "moment";
import styled from "styled-components";
import { Collapse, Radio, Row, Divider, Checkbox,Slider } from "antd";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { removeCookies } from "../../../helpers/cookie";
import { Asynchronous, Category, clear, course, DATE, From, Level, filter, LOCATION, online, onsite, PRICE, sar, Synchronous, to, Type } from "../../../helpers/LanguageConstant";
import DatePicker from "react-datepicker";

const { Panel } = Collapse;

const FilterComp = ({
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
  filterArr,
  filterArr1,
  filterArr2,
  priceState,
  sliderChange,
  dateFromState,
  dateToState,
  onChangeLocation,
  locationState,
  courseType,
  onCourseTypeChange,
  checkFilter,
  onFilterLevelCheckFilter,
  onFilterCategoryCheckFilter,
  onFilterChange,
  onFilterChange1,
  onFilterCategoryChange,
  onFilterLevelChange,
  filterArr3,
  checkFilter1,
}) => {
  return (
    <>
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
                    <OptionTopDiv>
                      <StyledCollapse
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
                              value={item?.id}
                              key={index}
                              checked={checkFilter?.includes(item?.id)}
                              onChange={(e) => onFilterChange(e?.target?.value)}
                            >
                              {item?.name_AR}
                            </Checkbox>
                          ))}
                        </Panel>
                      </StyledCollapse>
                    </OptionTopDiv>

                    <OptionTopDiv>
                      <StyledCollapse
                        bordered={false}
                        defaultActiveKey={["1"]}
                        expandIconPosition={"right"}
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
                              value={item?.id}
                              key={index}
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
                      </StyledCollapse>
                    </OptionTopDiv>

                    <OptionTopDiv>
                      {/* {filterArr2?.map((item, index) => ( */}
                      <StyledCollapse
                        bordered={false}
                        defaultActiveKey={["1"]}
                        expandIconPosition={"right"}
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
                              checked={onFilterLevelCheckFilter?.includes(
                                item?.id
                              )}
                              onChange={(e) =>
                                onFilterLevelChange(e?.target?.value)
                              }
                            >
                              {item?.name_AR}
                            </Checkbox>
                          ))}
                        </Panel>
                      </StyledCollapse>
                      {/* ))} */}
                    </OptionTopDiv>

                    <OptionTopDiv>
                      <StyledCollapse
                        bordered={false}
                        defaultActiveKey={["1"]}
                        expandIconPosition={"right"}
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
                              <p className="price" style={{ marginRight: 5 }}>
                                {priceState[0]}
                              </p>
                            </PriceRangeDiv>
                            <PriceRangeDiv>
                              <p className="sar">{sar}</p>
                              <p className="price" style={{ marginRight: 5 }}>
                                {priceState[1]}
                              </p>
                            </PriceRangeDiv>
                          </PriceRangeRow>
                        </Panel>
                      </StyledCollapse>
                    </OptionTopDiv>

                    <OptionTopDiv>
                      <StyledCollapse
                        bordered={false}
                        defaultActiveKey={["1"]}
                        expandIconPosition={"right"}
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
                                  setDateFromState(dateString);
                                }}
                                value={
                                  dateFromState !== ""
                                    ? moment(dateFromState, "YYYY-MM-DD")
                                    : ""
                                }
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
                              {/* <DatePicker
                                placeholder="dd/mm/yyyy"
                                onChange={(date, dateString) => {
                                  setDateToState(dateString);
                                }}
                                value={
                                  dateToState !== "" ? moment(dateToState, "YYYY-MM-DD") : ""
                                }
                              /> */}
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
                            </DateRangeDiv1>
                          </DateRangeRow>
                        </Panel>
                      </StyledCollapse>
                    </OptionTopDiv>
                    <OptionTopDiv>
                      <StyledCollapse
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
                                  onChange={(e) =>
                                    onFilterChange1(e?.target?.value)
                                  }
                                >
                                  {item?.name_AR}
                                </Checkbox>
                              ))}
                            </>
                          )}
                        </Panel>
                      </StyledCollapse>
                    </OptionTopDiv>
                    <OptionTopDiv>
                    <Collapse
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
                    </Collapse>
                    </OptionTopDiv>
                  </FilterDiv>
    </>
  );
};

export default FilterComp;

const StyledCollapse = styled(Collapse)`
  .ant-collapse-expand-icon {
    width: 100% !important;
  }
`;

const StyledDivider = styled(Divider)`
  margin: 14px 0 !important;
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
    margin-right: 5px;
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
    @media (min-width: 992px) {
      text-align: start;
    }
    @media (max-width: 991px) {
      text-align: start;
    }
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
  .ant-radio-checked .ant-radio-inner {
    border-color: #105f43 !important;
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
    @media (min-width: 992px) {
      text-align: start;
    }
    @media (max-width: 991px) {
      text-align: start;
    }
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
  .ant-radio-checked .ant-radio-inner {
    border-color: #105f43 !important;
  }
  .react-datepicker__close-icon{
    left: 8px !important;
    right: unset !important;
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
  .ant-collapse-header {
    -moz-transform: scaleX(-1) !important;
    -webkit-transform: scaleX(-1) !important;
    -o-transform: scaleX(-1) !important;
    transform: scaleX(-1) !important;
    -ms-filter: fliph !important;
    filter: fliph !important;
  }
  .ant-collapse-header-text {
    -moz-transform: scaleX(-1) !important;
    -webkit-transform: scaleX(-1) !important;
    -o-transform: scaleX(-1) !important;
    transform: scaleX(-1) !important;
    -ms-filter: fliph !important;
    filter: fliph !important;
  }
`;
