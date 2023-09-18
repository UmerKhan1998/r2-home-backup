import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCookies, removeCookies, setCookies } from "../../helpers/cookie";
import { userData } from "../../redux/actions";
import endpoints from "../../api";
import { useRouter } from "next/router";

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const authToken = getCookies("token");
  // const userDataState = useSelector(
  //   (state) => state?.userDataReducer
  // );

  const deleteAllCookies = () => {
    const cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      if (cookies[i] != "") {
        var cookie = cookies[i];
        var eqPos = cookie.split("=");
        var name = eqPos[0].trim();
        removeCookies(name);
      }
    }
    router.push("/");
  };

  const dashboardGetUserProfileFunc = async () => {
    try {
      if (authToken) {
        const response = await endpoints.DashboardGetUserProfile(authToken);
        if (response) {
          let userResponseData = response?.data?.data;
          userResponseData = {
            ...userResponseData,
            authToken: authToken,
          };
          dispatch(userData(userResponseData));
          //console.log("responseRedux", response?.statusCode);
          setCookies("email", response?.data?.data?.email);
          setCookies("firstName_EN", response?.data?.data?.firstName_EN);
          setCookies("lastName_EN", response?.data?.data?.lastName_EN);
          setCookies("phone_number", response?.data?.data?.phoneNumber);
        }
      } else {
        dispatch(userData({}));
      }
    } catch (err) {
      if (err?.response?.status === 401) {
        deleteAllCookies();
      } else {
        //console.log("userErr", err?.response);
      }
    }
  };
  useLayoutEffect(() => {
    dashboardGetUserProfileFunc();
  }, []);

  return <></>;
};

export default index;
