import router from "next/router";
import React, { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { removeCookies } from "../src/helpers/cookie";
import { userData } from "../src/redux/actions";
import { useSelector } from "react-redux";
import endpoints from "../src/api";
import Preloader from "../public/images/Preloader.gif";

const Signout = () => {
  const userDataState = useSelector((state) => state?.userDataReducer);
  const dispatch = useDispatch();

  const Signout = async () => {
    try {
      const response = await endpoints.LogoutUser(userDataState?.authToken);
      if (response.data.statusCode === "200") {
        //console.log("logout51872", response);
        removeCookies("userData");
        removeCookies("token");
        removeCookies("courseTrainingRegistrationId");
        dispatch(userData({}));
        router.push("/");
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        removeCookies("userData");
        removeCookies("token");
        removeCookies("courseTrainingRegistrationId");
        dispatch(userData({}));
        router.push("/");
      }
      //console.log("error", error);
    } finally {
      // setTimeout(() => setLoading(false), 1200);
    }
  };

  useLayoutEffect(() => {
    Signout();
  });

  return (
    <>
      <img loading="lazy"className="pre-loader" src={Preloader.src} />
    </>
  );
};

export default Signout;
