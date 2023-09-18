import App from "next/app";
import "../styles/global.css";

import React, { useEffect, useLayoutEffect, useState } from "react";
import NextNProgress from "nextjs-progressbar";
import Preloader from "../public/images/Preloader.gif";

import Layout from "../src/components/layout/Layout";
import { Provider } from "react-redux";

import { store } from "../src/redux/ConfigureStore";

import ReduxComp from "../src/components/ReduxComp";
import endpoints from "../src/api";

import "antd/dist/antd.css";
import "react-calendar/dist/Calendar.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sliderData, sliderDataTotal } from "../src/redux/actions";

function MyApp({ Component, pageProps }) {
  const [screenLoading, setScreenLoading] = useState(true);
  //console.log("screenLoading", screenLoading);
  useLayoutEffect(() => {
    if (screenLoading) {
      setScreenLoading(false);
    } else {
      setScreenLoading(true);
    }
  }, []);

  const [timerCounter, setTimerCounter] = useState(3);

  // First Attempts
  useEffect(() => {
    const timer =
      timerCounter > 0 &&
      setInterval(() => setTimerCounter(timerCounter - 1), 1000);
    return () => clearInterval(timer);
  }, [timerCounter]);
  //console.log("timerCounter", timerCounter);

  return (
    <>
      {/* {timerCounter === 0 ? ( */}
      <>
        <Provider store={store}>
          <NextNProgress color="#105F43" />
          <ToastContainer />
          <Layout>
            <ReduxComp />
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </>
      {/* ) : (
        <>
          <img loading="lazy"className="pre-loader" src={Preloader.src} />
        </>
      )} */}
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default MyApp;
