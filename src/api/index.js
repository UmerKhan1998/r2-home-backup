import apiClient from "./apiClient";
import apiClientCron from "./apiClientCron";
import apiClientMediaServer from "./apiClientMediaServer";

const getTax = (token, menuId, PageSize, PageNo, Language, Search) =>
  apiClient.get("/Tax", {
    //   PageSize: 10,
    //   PageNo: 1,
    //   Language: "English",
    // }
    // , {
    headers: {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      MenuId: menuId,
      PageSize: PageSize,
      PageNo: PageNo,
      Language: Language,
      Search: Search,
    },
  });

const DashboardTrackApplicatonInstructor = (token, code) =>
  apiClient.get(
    "/LearnerDashboardServices/DashboardTrackApplicatonInstructor",
    {
      //   PageSize: 10,
      //   PageNo: 1,
      //   Language: "English",
      // }
      // , {
      headers: {
        Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
        code,
      },
    }
  );

const DashboardTrackApplicatonScholarship = (token, code) =>
  apiClient.get(
    "/LearnerDashboardServices/DashboardTrackApplicatonScholarship",
    {
      //   PageSize: 10,
      //   PageNo: 1,
      //   Language: "English",
      // }
      // , {
      headers: {
        Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
        code,
      },
    }
  );

const GetSliders = () =>
  apiClient.get("/CMSLOVServices/GetSliders", {
    //   PageSize: 10,
    //   PageNo: 1,
    //   Language: "English",
    // }
    // , {
    headers: {
      // Authorization: `Bearer ${token}`,
      // "Content-Type": "application/json",
      // code,
      'Cache-Control': 'max-age=31536000, immutable',
    },
  });

  const GetAllRequestaServiceLov = (DepartmentId) =>
  apiClient.get("/ClientDashboardServices/GetAllRequestaServiceLov", {
    //   PageSize: 10,
    //   PageNo: 1,
    //   Language: "English",
    // }
    // , {
    headers: {
      // Authorization: `Bearer ${token}`,
      // "Content-Type": "application/json",
      'Cache-Control': 'no-cache',
      DepartmentId:DepartmentId,
    },
  });

const GetValidateApplication = (code) =>
  apiClient.get("/TrackApplicationServices/GetValidateApplication", {
    //   PageSize: 10,
    //   PageNo: 1,
    //   Language: "English",
    // }
    // , {
    headers: {
      // Authorization: `Bearer ${token}`,
      // "Content-Type": "application/json",
      'Cache-Control': 'no-cache',
      code,
    },
  });

const GetValidateApplicationInstructor = (code) =>
  apiClient.get("/TrackApplicationServices/GetValidateApplicationInstructor", {
    //   PageSize: 10,
    //   PageNo: 1,
    //   Language: "English",
    // }
    // , {
    headers: {
      // Authorization: `Bearer ${token}`,
      // "Content-Type": "application/json",
      'Cache-Control': 'no-cache',
      code,
    },
  });

const GetValidateApplicationScholarship = (code) =>
  apiClient.get("/TrackApplicationServices/GetValidateApplicationScholarship", {
    //   PageSize: 10,
    //   PageNo: 1,
    //   Language: "English",
    // }
    // , {
    headers: {
      // Authorization: `Bearer ${token}`,
      // "Content-Type": "application/json",
      'Cache-Control': 'no-cache',
      code,
    },
  });

const MarkAttendanceLMSUser = (
  token,
  courseTrainingLinkVenueId,
  courseTrainingRegistrationId
) =>
  apiClient.post(
    "/LearnerDashboardServices/MarkAttendanceLMSUser",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        courseTrainingLinkVenueId: courseTrainingLinkVenueId,
        courseTrainingRegistrationId: courseTrainingRegistrationId,
      },
    }
  );
const SetStreamTime = (token, Id, TimeSecond) =>
  apiClientMediaServer.post(
    "/MediaStreamServices/SetStreamTime",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Id: Id,
        TimeSecond: TimeSecond,
      },
    }
  );

const AddReviewFavourite = (token, params) =>
  apiClient.post(
    "/LearnerDashboardServices/AddReviewFavourite",
    {
      ...params,
    },

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

const LearnerDashboardFavouriteList = (token, params) =>
  apiClient.post(
    "/LearnerDashboardServices/LearnerDashboardFavouriteList",
    {
      ...params,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

const GetCertificateCreate = (token, courseTrainingRegistrationId) =>
  apiClient.get("/LearnerDashboardServices/GetCertificateCreate", {
    headers: {
      "Content-Type": "application/json",
      'Cache-Control': 'no-cache',
      Authorization: `Bearer ${token}`,
      CourseTrainingRegistrationId: courseTrainingRegistrationId,
    },
  });

const GetDetailRecordByKey = (courseId, expId) =>
  apiClient.get("/ClientDashboardServices/GetDetailRecordByKey", {
    headers: {
      // Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      // MenuId: menuId,
      // PageSize: PageSize,
      // PageNo: PageNo,
      'Cache-Control': 'no-cache',
      Id: courseId,
      Key: expId,
    },
  });

const GetCertificateRequest = (token, courseTrainingRegistrationId) =>
  apiClient.get("/LearnerDashboardServices/GetCertificateRequest", {
    headers: {
      "Content-Type": "application/json",
      'Cache-Control': 'no-cache',
      Authorization: `Bearer ${token}`,
      CourseTrainingRegistrationId: courseTrainingRegistrationId,
    },
  });

const GetCertificateIssueById = (token, courseTrainingRegistrationId) =>
  apiClient.get("/LearnerDashboardServices/GetCertificateIssueById", {
    headers: {
      "Content-Type": "application/json",
      'Cache-Control': 'no-cache',
      Authorization: `Bearer ${token}`,
      CourseTrainingRegistrationId: courseTrainingRegistrationId,
    },
  });

const getCourseTrainingSearchLov = (Language, Search) =>
  apiClient.get("/ClientDashboardServices/GetCourseTrainingSearchLov", {
    headers: {
      // Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      // MenuId: menuId,
      // PageSize: PageSize,
      // PageNo: PageNo,
      Language: Language,
      Search: Search,
    },
  });

const getApplicationOTP = (code) =>
  apiClient.get("/TrackApplicationServices/GetApplicationOTP", {
    headers: {
      // Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      // MenuId: menuId,
      // PageSize: PageSize,
      // PageNo: PageNo,
      code,
    },
  });

const GetCountryLov = (token, search) =>
  apiClient.get(`/LMSLOVServices/GetCountryLov?_srch=${search}`, {
    headers: {
      'Cache-Control': 'no-cache',
      Authorization: `Bearer ${token}`,
      // "Content-Type": "application/json",
      // MenuId: menuId,
      // PageSize: PageSize,
      // PageNo: PageNo,
      // code,
    },
  });

  const GetDepartmentLov = (search) =>
  apiClient.get(`/ClientDashboardServices/GetDepartment?_srch=${search}`, {
    headers: {
      'Cache-Control': 'no-cache',
      // Authorization: `Bearer ${token}`,
      // "Content-Type": "application/json",
      // MenuId: menuId,
      // PageSize: PageSize,
      // PageNo: PageNo,
      // code,
    },
  });
  
const GetSpecialityLov = (token, search) =>
apiClient.get(`/LMSLOVServices/GetSpecialityLov?_srch=${search}`, {
  headers: {
    Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      // "Content-Type": "application/json",
    // MenuId: menuId,
    // PageSize: PageSize,
    // PageNo: PageNo,
    // code,
  },
});

const GetSubSpecialityLov = (token, search) =>
apiClient.get(`/LMSLOVServices/GetSubSpecialityLov?_srch=${search}`, {
  headers: {
    Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      // "Content-Type": "application/json",
    // MenuId: menuId,
    // PageSize: PageSize,
    // PageNo: PageNo,
    // code,
  },
});

const GetSubSpecialityByIdLov = (token, id) =>
apiClient.get(`/LMSLOVServices/GetSubSpecialityByIdLov`, {
  headers: {
    Authorization: `Bearer ${token}`,
    _SpecialityId: id,
      'Cache-Control': 'no-cache',
      // "Content-Type": "application/json",
    // PageSize: PageSize,
    // PageNo: PageNo,
    // code,
  },
});

const getApplicationInstructorOTP = (code) =>
  apiClient.get("/TrackApplicationServices/GetApplicationInstructorOTP", {
    headers: {
      // Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      // MenuId: menuId,
      // PageSize: PageSize,
      // PageNo: PageNo,
      code,
    },
  });

const getApplicationScholarshipOTP = (code) =>
  apiClient.get("/TrackApplicationServices/getApplicationScholarshipOTP", {
    headers: {
      // Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      // MenuId: menuId,
      // PageSize: PageSize,
      // PageNo: PageNo,
      code,
    },
  });

const getTrackApplication = (code, otp) =>
  apiClient.get("/TrackApplicationServices/GetTrackApplication", {
    headers: {
      // Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      // MenuId: menuId,
      // PageSize: PageSize,
      // PageNo: PageNo,
      code,
      otp,
    },
  });

const getTrackApplicationInstructor = (code, otp) =>
  apiClient.get("/TrackApplicationServices/GetTrackApplicationInstructor", {
    headers: {
      // Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      // MenuId: menuId,
      // PageSize: PageSize,
      // PageNo: PageNo,
      code,
      otp,
    },
  });

const GetTrackApplicationScholarship = (code, otp) =>
  apiClient.get("/TrackApplicationServices/GetTrackApplicationScholarship", {
    headers: {
      // Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      // MenuId: menuId,
      // PageSize: PageSize,
      // PageNo: PageNo,
      code,
      otp,
    },
  });

const getActiveDirectoryEmployeeID = (token, empId) =>
  apiClient.get("/LMSADServices/GetActiveDirectoryEmployeeID", {
    //   PageSize: 10,
    //   PageNo: 1,
    //   Language: "English",
    // }
    // , {
    headers: {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      EmployeeId: empId,
    },
  });

const GetDashboardLearningPath = (token, courseTrainingId, currentPastAll) =>
  apiClient.get("/LearnerDashboardServices/GetDashboardLearningPath", {
    headers: {
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      courseTrainingId: courseTrainingId,
      currentPastAll: currentPastAll,
    },
  });

const GetCouseTrainingLMSUserLov = (token, searchStr) =>
  apiClient.get("/LearnerDashboardServices/GetCouseTrainingLMSUserLov", {
    headers: {
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      _Search: searchStr,
    },
  });

const GetDashboardGamification = (token, searchStr) =>
  apiClient.get("/LearnerDashboardServices/GetDashboardGamification", {
    headers: {
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      _Search: searchStr,
    },
  });

const getDashboardTrackApplicaton = (token, code) =>
  apiClient.get("/LearnerDashboardServices/DashboardTrackApplicaton", {
    headers: {
      'Cache-Control': 'no-cache',
      Authorization: `Bearer ${token}`,
      Code: code,
    },
  });

const ediTax = (token, params, menuId) =>
  apiClient.put(
    "/Tax",
    {
      ...params,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        MenuId: menuId,
      },
    }
  );

// const userNotificationMarkRead = (token, UserNotificationId) =>
//   apiClient.put(
//     "/LMSLOVServices/UserNotificationMarkRead",
//     // {
//     //   ...params,
//     // },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         UserNotificationId,
//       },
//     }
//   );

const forgetPasswordRequest = (params) =>
  apiClient.put(
    "/LMSAuth/ForgetPasswordRequest",
    {
      ...params,
    }
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );

const ForgetPassword = (params) =>
  apiClient.put(
    "/LMSAuth/ForgetPassword",
    {
      ...params,
    }
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );

  const UserNotificationMarkAllRead = (token, read) =>
  apiClient.put(
    "/LMSLOVServices/UserNotificationMarkAllRead",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        read
      },
    }
  );


const deleteTax = (token, id, menuId) =>
  apiClient.delete(`/Tax?id=` + id, {
    headers: {
      Authorization: `Bearer ${token}`,
      MenuId: menuId,
    },
  });

const getTaxById = (token, id, menuId) =>
  apiClient.get(`/Tax/GetTaxById`, {
    headers: {
      'Cache-Control': 'no-cache',
      Authorization: `Bearer ${token}`,
      id: id,
      MenuId: menuId,
    },
  });

const getCourseDetailRecord = (id, userId) =>
  apiClient.get(`/ClientDashboardServices/GetDetailRecord`, {
    headers: {
      // Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      Id: id,
      UserId: userId,
    },
  });

  const GetWidgets = (_Key) =>
  apiClient.get(`CMSLOVServices/GetWidgets`, {
    headers: {
      'Cache-Control': 'no-cache',
      _Key: _Key
    },
  });

// GetCourseTrainingRegistrationLov
const getCourseTrainingRegistrationLov = (id) =>
  apiClient.get(`/ClientDashboardServices/GetCourseTrainingRegistrationLov`, {
    headers: {
      // Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      id: id,
      // 'MenuId': menuId,
    },
  });

// GetCourseTrainingRegistrationLov
const getCourseTrainingRegistrationLov1 = (id, token) =>
  apiClient.get(`/ClientDashboardServices/GetCourseTrainingRegistrationLov`, {
    headers: {
      'Cache-Control': 'no-cache',
      Authorization: `Bearer ${token}`,
      id: id,
      // 'MenuId': menuId,
    },
  });

// GetScholarshipRegistrationLov
const GetScholarshipRegistrationLov = (id, token,language) =>
  apiClient.get(`/ClientDashboardServices/GetScholarshipRegistrationLov`, {
    headers: {
      'Cache-Control': 'no-cache',
      Authorization: `Bearer ${token}`,
      id: id,
      Language:language
      // 'MenuId': menuId,
    },
  });

// GetInstructorTrainingRegistrationLov
const getInstructorTrainingRegistrationLov1 = (token, language) =>
  apiClient.get(`/LearnerDashboardServices/DashboardRequestForInstructor`, {
    headers: {
      'Cache-Control': 'no-cache',
      Authorization: `Bearer ${token}`,
      Language: language,
      // 'MenuId': menuId,
    },
  });

// GetInstructorTrainingRegistrationLov
const DashboardRequestForScholarship = (token) =>
  apiClient.get(`/LearnerDashboardServices/DashboardScholarshipChecklistName`, {
    headers: {
      'Cache-Control': 'no-cache',
      Authorization: `Bearer ${token}`,
      // id: id,
      // 'MenuId': menuId,
    },
  });

// GetInstructorTrainingRegistrationLov
const GetAllCourseTrainingRegistrationByLMSUserId = (token) =>
  apiClient.get(`/LearnerDashboardServices/GetAllCourseTrainingRegistrationByLMSUserId`, {
    headers: {
      'Cache-Control': 'no-cache',
      Authorization: `Bearer ${token}`,
    },
  });

/* MEDIA SERVER */
const GetStream = (token, courseTrainingRegistrationId, courseTrainingFileId) =>
  apiClientMediaServer.get(`/MediaStreamServices/GetStream`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      courseTrainingRegistrationId: courseTrainingRegistrationId,
      fileId: courseTrainingFileId,
    },
  });

const GetStreamCourseTrainingDemoVideo = (token, courseTrainingId, Language) =>
  apiClientMediaServer.get(
    `/MediaStreamServices/GetStreamCourseTrainingDemoVideo`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
        courseTrainingId: courseTrainingId,
        Language: Language,
      },
    }
  );

const addTax = (token, params, menuId) =>
  apiClient.post(
    `/Tax`,
    { ...params },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        MenuId: menuId,
      },
    }
  );

const getFeaturedRecord = () =>
  apiClient.get("/ClientDashboardServices/GetFeaturedRecord", {
    //   PageSize: 10,
    //   PageNo: 1,
    //   Language: "English",
    // }
    // , {
    headers: {
        // Authorization: `Bearer ${token}`,
        // 'Content-Type': 'application/json',
        // "MenuId": menuId,
        // "PageSize":PageSize,
        // "PageNo":PageNo,
        // "Language":Language,
        // "Search":Search,
      'Cache-Control': 'max-age=31536000, immutable',
    },
  });

const getUserNotification = (token, PageSize, PageNo, Language, Search) =>
  apiClient.get("/LMSLOVServices/GetUserNotification", {
    //   PageSize: 10,
    //   PageNo: 1,
    //   Language: "English",
    // }
    // , {
    headers: {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      //     'Content-Type': 'application/json',
      //     "MenuId": menuId,
      PageSize: PageSize,
      PageNo: PageNo,
      Language: Language,
      Search: Search,
    },
  });

const getNotificationSetting = (token) =>
  apiClient.get("/LearnerDashboardServices/GetNotificationSetting", {
    //   PageSize: 10,
    //   PageNo: 1,
    //   Language: "English",
    // }
    // , {
    headers: {
      'Cache-Control': 'no-cache',
      Authorization: `Bearer ${token}`,
    },
  });

  const CourseTrainingVenueLMSUserWise = (token, RecordType, Language, _srch) =>
  apiClient.get(
    `/LearnerDashboardServices/CourseTrainingVenueLMSUserWise?_srch=${_srch}`,
    {
      headers: {
        "Content-Type": "application/json",
      'Cache-Control': 'no-cache',
      Authorization: `Bearer ${token}`,
        RecordType: RecordType,
        Language: Language
      },
    }
  );

const DashboardGetAttendanceFunc = (params, token) =>
  apiClient.post(
    "/LearnerDashboardServices/DashboardGetAttendance",
    { ...params },
    {
      //   PageSize: 10,
      //   PageNo: 1,
      //   Language: "English",
      // }
      // , {
      headers: {
        Authorization: `Bearer ${token}`,
        // 'MenuId': menuId,
      },
    }
  );

const getCourseTrainingMasterCategory = () =>
  apiClient.get(
    "/LMSClientDasboardLOVServices/GetCourseTrainingMasterCategory",
    {
      //   PageSize: 10,
      //   PageNo: 1,
      //   Language: "English",
      // }
      // , {
      headers: {
          // Authorization: `Bearer ${token}`,
          // 'Content-Type': 'application/json',
          // "MenuId": menuId,
          // "PageSize":PageSize,
          // "PageNo":PageNo,
          // "Language":Language,
          // "Search":Search,
      'Cache-Control': 'no-cache',
      },
    }
  );

const GetRequestaServiceLov = () =>
  apiClient.get("/ClientDashboardServices/GetRequestaServiceLov", {
    //   PageSize: 10,
    //   PageNo: 1,
    //   Language: "English",
    // }
    // , {
    headers: {
      // Authorization: `Bearer ${token}`,
      // 'Content-Type': 'application/json',
      // "MenuId": menuId,
      // "PageSize":PageSize,
      // "PageNo":PageNo,
      // "Language":Language,
      // "Search":Search,
      'Cache-Control': 'no-cache',
    },
  });

const getCourseTrainingCategory = () =>
  apiClient.get("/LMSClientDasboardLOVServices/GetCourseTrainingCategory", {
    //   PageSize: 10,
    //   PageNo: 1,
    //   Language: "English",
    // }
    // , {
    headers: {
      // Authorization: `Bearer ${token}`,
      // 'Content-Type': 'application/json',
      // "MenuId": menuId,
      // "PageSize":PageSize,
      // "PageNo":PageNo,
      // "Language":Language,
      // "Search":Search,
      'Cache-Control': 'no-cache',
    },
  });

const getLevel = () =>
  apiClient.get("/LMSClientDasboardLOVServices/GetLevel", {
    //   PageSize: 10,
    //   PageNo: 1,
    //   Language: "English",
    // }
    // , {
    headers: {
      // Authorization: `Bearer ${token}`,
      // 'Content-Type': 'application/json',
      // "MenuId": menuId,
      // "PageSize":PageSize,
      // "PageNo":PageNo,
      // "Language":Language,
      // "Search":Search,
      'Cache-Control': 'no-cache',
    },
  });

const getLocation = () =>
  apiClient.get("/LMSClientDasboardLOVServices/GetLocation", {
    //   PageSize: 10,
    //   PageNo: 1,
    //   Language: "English",
    // }
    // , {
    headers: {
      // Authorization: `Bearer ${token}`,
      // 'Content-Type': 'application/json',
      // "MenuId": menuId,
      // "PageSize":PageSize,
      // "PageNo":PageNo,
      // "Language":Language,
      // "Search":Search,
      'Cache-Control': 'no-cache',
    },
  });

const getAllRecord = (RecordType, pageSize, pageNo, language, search, params) =>
  apiClient.post(
    "/ClientDashboardServices/GetAllRecord",
    {
      ...params,
    },

    {
      //   PageSize: 10,
      //   PageNo: 1,
      //   Language: "English",
      // }
      // , {
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        RecordType: RecordType,
        PageSize: pageSize,
        PageNo: pageNo,
        Language: language,
        Search: search,
      },
    }
  );

const ContactUs = (params) =>
  apiClient.post(
    "/ClientDashboardServices/ContactUs",
    {
      ...params,
    },

    {
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

const AddNotificationSetting = (params, token) =>
  apiClient.post(
    "/LearnerDashboardServices/AddNotificationSetting",
    {
      ...params,
    },

    {
      headers: {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "application/json",
      },
    }
  );

const createLMSAuthorization = (params) =>
  apiClient.post(
    "/LMSAuth/LoginOTP",
    {
      ...params,
    },

    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

const AddAssessmentAnswer = (token, params) =>
  apiClient.post(
    "/LearnerDashboardServices/AddAssessmentAnswer",
    {
      ...params,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

const CourseTrainingDiscussion = (token, params) =>
  apiClient.post(
    "/CourseTrainingDiscussion",
    {
      ...params,
    },

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

const CourseTrainingReview = (token, params) =>
  apiClient.post(
    "/CourseTrainingReview",
    {
      ...params,
    },

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

const LMSAuth = (params) =>
  apiClient.post(
    "/LMSAuth/Login",
    {
      ...params,
    },

    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

const LogoutUser = (token) =>
  apiClient.get("/LMSAuth/LogoutUser", {
    headers: {
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const OTPGenerate = (params) =>
  apiClient.get("/LMSAuth/OTPGenerate", {
    headers: {
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      phoneNumber: params,
    },
  });

const GetStatus = (token) =>
  apiClient.get("/LearnerDashboardServices/GetStatus", {
    headers: {
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const GetCourseTrainingReviewById = (token, id) =>
  apiClient.get("/CourseTrainingReview/GetCourseTrainingReviewById", {
    headers: {
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Id: id,
    },
  });

const GetCourseTrainingReviewDelete = (token, id) =>
  apiClient.delete(`/CourseTrainingReview?Id=${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const CourseTrainingReviewPut = (token, params) =>
  apiClient.put(
    "/CourseTrainingReview",
    {
      ...params,
    },

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

const DashboardRequestForInstructor = (token) =>
  apiClient.post("/LearnerDashboardServices/DashboardRequestForInstructor", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

const GetDashboardMaster = (token) =>
  apiClient.get("/LearnerDashboardServices/GetDashboardMaster", {
    headers: {
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const GetDashboardMasterSchedule = (token, DayMonth, DT, Language) =>
  apiClient.get("/LearnerDashboardServices/GetDashboardMasterSchedule", {
    headers: {
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      DayMonth: DayMonth,
      DT: DT,
      Language: Language,
    },
  });

const GetDashboardMasterNoticeBoard = (
  token,
  pageSize,
  pageNo,
  language,
  search,
  sortBy
) =>
  apiClient.get("/LearnerDashboardServices/GetDashboardMasterNoticeBoard", {
    headers: {
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      PageSize: pageSize,
      PageNo: pageNo,
      Language: language,
      Search: search,
      SortBy: sortBy,
    },
  });

const AddNoticeBoardView = (token, params) =>
  apiClient.get("/LearnerDashboardServices/AddNoticeBoardView", {
    headers: {
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      CourseTrainingNoticeBoardId: params,
    },
  });

const GetSort = (token) =>
  apiClient.get("/LearnerDashboardServices/GetSort", {
    headers: {
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const GetCourseTrainingSubCategory = (token) =>
  apiClient.get("/LearnerDashboardServices/GetCourseTrainingSubCategory", {
    headers: {
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const GetInstructor = (token, RecordType) =>
  apiClient.get("/LMSClientDasboardLOVServices/GetInstructor", {
    headers: {
      RecordType: RecordType,
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const AddFavourite = (token, params) =>
  apiClient.get("/LearnerDashboardServices/AddFavourite", {
    headers: {
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      courseTrainingId: params,
    },
  });

const AddReminderSetting = (token, params) =>
  apiClientCron.post(
    `/Reminder`,
    {
      ...params,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

const GetReminderSetting = (token, GetReminderSettingState) =>
  apiClientCron.get(`/Reminder`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      PageSize: GetReminderSettingState?.PageSize,
      PageNo: GetReminderSettingState?.PageNo,
      Language: GetReminderSettingState?.Language,
      Search: GetReminderSettingState?.Search,
    },
  });

const GetDashboardInside = (token, params) =>
  apiClient.get("/LearnerDashboardServices/GetDashboardInside", {
    headers: {
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      CourseTrainingRegistrationId: params,
    },
  });

const GetDashboardInsideFaq = (token, params) =>
  apiClient.get("/LearnerDashboardServices/GetDashboardInsideFaq", {
    headers: {
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      CourseTrainingRegistrationId: params,
    },
  });

const GetDashboardInsideReview = (
  token,
  courseTrainingRegistrationId,
  pageSize,
  pageNo,
  language,
  search,
  rating
) =>
  apiClient.get("/LearnerDashboardServices/GetDashboardInsideReview", {
    headers: {
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      CourseTrainingRegistrationId: courseTrainingRegistrationId,
      PageSize: pageSize,
      PageNo: pageNo,
      Language: language,
      Search: search,
      Rating: rating,
    },
  });

const GetDashboardInsideSurvey = (
  token,
  courseTrainingRegistrationId,
  FileId
) =>
  apiClient.get("/LearnerDashboardServices/GetDashboardInsideSurvey", {
    headers: {
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      CourseTrainingRegistrationId: courseTrainingRegistrationId,
      FileId: FileId,
    },
  });

const AddSurveyAnswer = (token, params) =>
  apiClient.post(
    "/LearnerDashboardServices/AddSurveyAnswer",
    {
      ...params,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const GetDashboardInsideAssessment = (
    token,
    courseTrainingRegistrationId,
    FileId
  ) =>
    apiClient.get("/LearnerDashboardServices/GetDashboardInsideAssessment", {
      headers: {
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        CourseTrainingRegistrationId: courseTrainingRegistrationId,
        FileId: FileId,
      },
    });

const GetDashboardInsideDiscussion = (
  token,
  courseTrainingRegistrationId,
  pageSize,
  pageNo,
  language,
  search
) =>
  apiClient.get("/LearnerDashboardServices/GetDashboardInsideDiscussion", {
    headers: {
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      CourseTrainingRegistrationId: courseTrainingRegistrationId,
      PageSize: pageSize,
      PageNo: pageNo,
      Language: language,
      Search: search,
    },
  });

const LMSAuthOTP = (params) =>
  apiClient.post(
    "/LMSAuth/LoginOTP",
    {
      ...params,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

const AddFileView = (token, params) =>
  apiClient.post(
    "/LearnerDashboardServices/AddFileView",
    {
      ...params,
    },

    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

const GetDashboardMain = (token, params) =>
  apiClient.post(
    "/LearnerDashboardServices/GetDashboardMain",
    {
      ...params,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
// const AddFavourite = (params) =>
// apiClient.post(
//   "/LearnerDashboardServices/AddFavourite",
//   {
//     ...params,
//   },
//   {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   }
// );

const GetCertificateLMSUser = (token, params) =>
  apiClient.post(
    "/LearnerDashboardServices/GetCertificateLMSUser",
    {
      ...params,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  const createCourseTrainingRegistration = (token, params, language) =>

  apiClient.post(
    "/CourseTrainingRegistration",

    {
      ...params,
      Language: language,
    },
    
    {
      //   PageSize: 10,
      //   PageNo: 1,
      //   Language: "English",
      // }
      // , {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        // RecordType: RecordType,
        // PageSize: pageSize,
        // PageNo: pageNo,
        // Language: language,
        // Search: search,
      },
    }
  );

const AddPaymentFunc = (token, params) =>
  apiClient.post(
    "/LearnerDashboardServices/AddPayment",
    {
      ...params,
    },

    {
      //   PageSize: 10,
      //   PageNo: 1,
      //   Language: "English",
      // }
      // , {
      headers: {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
        // RecordType: RecordType,
        // PageSize: pageSize,
        // PageNo: pageNo,
        // Language: language,
        // Search: search,
      },
    }
  );

  const RequestAsAService = (params) =>
  apiClient.post(
    "/ClientDashboardServices/RequestAsAService",
    {
      ...params,
    },

    {
      //   PageSize: 10,
      //   PageNo: 1,
      //   Language: "English",
      // }
      // , {
      headers: {
        // Authorization: `Bearer ${token}`,
        // "Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
        // RecordType: RecordType,
        // PageSize: pageSize,
        // PageNo: pageNo,
        // Language: language,
        // Search: search,
      },
    }
  );

const createInstructorTrainingRegistration = (token, params) =>
  apiClient.post(
    "/InstructorRegistration",
    {
      ...params,
    },

    {
      //   PageSize: 10,
      //   PageNo: 1,
      //   Language: "English",
      // }
      // , {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        // RecordType: RecordType,
        // PageSize: pageSize,
        // PageNo: pageNo,
        // Language: language,
        // Search: search,
      },
    }
  );

  const createScholarshipRegistration = (token, params, language) =>
  apiClient.post(
    "/ScholarshipRegistration",
    {
      ...params,
      Language: language,
    },

    {
      //   PageSize: 10,
      //   PageNo: 1,
      //   Language: "English",
      // }
      // , {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        // RecordType: RecordType,
        // PageSize: pageSize,
        // PageNo: pageNo,
        // Language: language,
        // Search: search,
      },
    }
  );

const createScholarRegistration = (token, params) =>
  apiClient.post(
    "/ScholarshipRegistration",
    {
      ...params,
    },

    {
      //   PageSize: 10,
      //   PageNo: 1,
      //   Language: "English",
      // }
      // , {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        // RecordType: RecordType,
        // PageSize: pageSize,
        // PageNo: pageNo,
        // Language: language,
        // Search: search,
      },
    }
  );

const rmsCourseTrainingRegistrationFeedback = (token, params) =>
  apiClient.post(
    "/RMSCourseTrainingRegistrationFeedback",
    {
      ...params,
    },

    {
      //   PageSize: 10,
      //   PageNo: 1,
      //   Language: "English",
      // }
      // , {
      headers: {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
        // RecordType: RecordType,
        // PageSize: pageSize,
        // PageNo: pageNo,
        // Language: language,
        // Search: search,
      },
    }
  );

const RMSScholarshipRegistrationFeedback = (token, params) =>
  apiClient.post(
    "/RMSScholarshipRegistrationFeedback",
    {
      ...params,
    },

    {
      //   PageSize: 10,
      //   PageNo: 1,
      //   Language: "English",
      // }
      // , {
      headers: {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
        // RecordType: RecordType,
        // PageSize: pageSize,
        // PageNo: pageNo,
        // Language: language,
        // Search: search,
      },
    }
  );

const rmsInstructorRegistrationFeedback = (token, params) =>
  apiClient.post(
    "/RMSInstructorRegistrationFeedback",
    {
      ...params,
    },

    {
      //   PageSize: 10,
      //   PageNo: 1,
      //   Language: "English",
      // }
      // , {
      headers: {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
        // RecordType: RecordType,
        // PageSize: pageSize,
        // PageNo: pageNo,
        // Language: language,
        // Search: search,
      },
    }
  );

const dashboardGetAssessment = (token, params) =>
  apiClient.post(
    "/LearnerDashboardServices/DashboardGetAssessment",
    {
      ...params,
    },

    {
      //   PageSize: 10,
      //   PageNo: 1,
      //   Language: "English",
      // }
      // , {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        // RecordType: RecordType,
        // PageSize: pageSize,
        // PageNo: pageNo,
        // Language: language,
        // Search: search,
      },
    }
  );

const dashboardGetSurvey = (token, params) =>
  apiClient.post(
    "/LearnerDashboardServices/DashboardGetSurvey",
    {
      ...params,
    },

    {
      //   PageSize: 10,
      //   PageNo: 1,
      //   Language: "English",
      // }
      // , {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        // RecordType: RecordType,
        // PageSize: pageSize,
        // PageNo: pageNo,
        // Language: language,
        // Search: search,
      },
    }
  );

const dashboardGetSort = (token, params) =>
  apiClient.post(
    "/LearnerDashboardServices/GetSort",
    {
      ...params,
    },

    {
      //   PageSize: 10,
      //   PageNo: 1,
      //   Language: "English",
      // }
      // , {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        // RecordType: RecordType,
        // PageSize: pageSize,
        // PageNo: pageNo,
        // Language: language,
        // Search: search,
      },
    }
  );

const GetDashboardReceipt = (token, LMSUserId, params) =>
  apiClient.post(
    "/LearnerDashboardServices/GetDashboardReceipt",
    {
      ...params,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        LMSUserId: LMSUserId,
      },
    }
  );

const GetDepartment = (token) =>
  apiClient.get("/LMSLOVServices/GetDepartment", {
    headers: {
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const GetNewsAndResources = (token) =>
  apiClient.get("/ClientDashboardServices/GetNewsAndResources", {
    headers: {
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const GetNewsAndResourcesFeature = (token) =>
  apiClient.get("/ClientDashboardServices/GetNewsAndResourcesFeature", {
    headers: {
      'Cache-Control': 'max-age=31536000, immutable',
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const GetNewsAndResourcesGetById = (token, Id, DepartmentId) =>
  apiClient.get("/ClientDashboardServices/GetNewsAndResourcesGetById", {
    headers: {
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      _Id: Id,
      _DepartmentId: DepartmentId,
    },
  });

const GetNewsAndResourcesTake = (token) =>
  apiClient.get("/ClientDashboardServices/GetNewsAndResourcesTake", {
    headers: {
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const GetCourseTrainingByLMSUserIdLov = (token, LMSUserId) =>
  apiClient.get("/LMSLOVServices/GetCourseTrainingByLMSUserIdLov", {
    headers: {
      'Cache-Control': 'no-cache',
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      LMSUserId: LMSUserId,
    },
  });

const GetDashboardReceiptDetail = (token, receiptId) =>
  apiClient.get("/LearnerDashboardServices/GetDashboardReceiptDetail", {
    headers: {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      // 'Content-Type': 'application/json',
      receiptId: receiptId,
    },
  });

const dashboardUpdateUserProfile = (token, params) =>
  apiClient.put(
    "/LearnerDashboardServices/DashboardUpdateUserProfile",
    {
      ...params,
    },

    {
      //   PageSize: 10,
      //   PageNo: 1,
      //   Language: "English",
      // }
      // , {
      headers: {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
        // RecordType: RecordType,
        // PageSize: pageSize,
        // PageNo: pageNo,
        // Language: language,
        // Search: search,
      },
    }
  );

const userNotificationMarkRead = (token, UserNotificationId) =>
  apiClient.put(
    "/LMSLOVServices/UserNotificationMarkRead",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        UserNotificationId: UserNotificationId,
      },
    }
  );

const GetStaticPages = (pageName) =>
  apiClient.get(`CMSLOVServices/GetStaticPages?_srch=${pageName}`, {
    headers: {
      // Authorization: `Bearer ${token}`,
      'Cache-Control': 'max-age=31536000, immutable',
    },
  });

const DashboardGetUserProfile = (token) =>
  apiClient.get("/LearnerDashboardServices/DashboardGetUserProfile", {
    //   PageSize: 10,
    //   PageNo: 1,
    //   Language: "English",
    // }
    // , {
    headers: {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      //     'Content-Type': 'application/json',
      //     "MenuId": menuId,
      //     "PageSize":PageSize,
      //     "PageNo":PageNo,
      //     "Language":Language,
      //     "Search":Search,
    },
  });

const resetPassword = (token, params) =>
  apiClient.put(
    "/LMSAuth/ResetPassword",
    {
      ...params,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        // MenuId: menuId,
      },
    }
  );
const ChangePassword = (token, params) =>
  apiClient.put(
    "/LMSAuth/ChangePassword",
    {
      ...params,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        // MenuId: menuId,
      },
    }
  );

const createLMSUsers = (params) =>
  apiClient.post(
    "/LMSUser",
    {
      ...params,
    },

    {
      //   PageSize: 10,
      //   PageNo: 1,
      //   Language: "English",
      // }
      // , {
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        // RecordType: RecordType,
        // PageSize: pageSize,
        // PageNo: pageNo,
        // Language: language,
        // Search: search,
      },
    }
  );

const ScholarShipUserRegistration = (params) =>
  apiClient.post(
    "/LMSAuth/ScholarShipUserRegistration",
    {
      ...params,
    },

    {
      //   PageSize: 10,
      //   PageNo: 1,
      //   Language: "English",
      // }
      // , {
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        // RecordType: RecordType,
        // PageSize: pageSize,
        // PageNo: pageNo,
        // Language: language,
        // Search: search,
      },
    }
  );

// const get_order_reports = (
//     token,
//     page,
//     order_no,
//     tracking_no,
//     warehouseStatus,
//     threePlStatus,
//     receiverName,
//     date_range,
//     client_id
// ) =>
//     apiClient.get(
//         "/reports/completed/orders?page=" +
//         page +
//         "&order_no=" +
//         order_no +
//         "&tracking_no=" +
//         tracking_no +
//         "&warehouseStatus=" +
//         warehouseStatus +
//         "&threePlStatus=" +
//         threePlStatus +
//         "&receiverName=" +
//         receiverName +
//         "&date_range=" +
//         date_range +
//         "&client_id=" +
//         client_id,
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         }
//     );

// const export_order_report = (
//     token,
//     page,
//     order_no,
//     tracking_no,
//     warehouseStatus,
//     threePlStatus,
//     receiverName,
//     date_range,
//     client_id
// ) =>
//     apiClient.get(
//         "export/shipping/orders?page=" +
//         page +
//         "&order_no=" +
//         order_no +
//         "&tracking_no=" +
//         tracking_no +
//         "&warehouseStatus=" +
//         warehouseStatus +
//         "&threePlStatus=" +
//         threePlStatus +
//         "&receiverName=" +
//         receiverName +
//         "&date_range=" +
//         date_range +
//         "&client_id=" +
//         client_id,

//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//             responseType: "blob",
//         }
//     );

export default {
  getTax,
  addTax,
  ediTax,
  deleteTax,
  getTaxById,
  getFeaturedRecord,
  getAllRecord,
  getCourseTrainingMasterCategory,
  getCourseTrainingCategory,
  getLevel,
  getLocation,
  getCourseDetailRecord,
  getCourseTrainingRegistrationLov,
  getCourseTrainingRegistrationLov1,
  getActiveDirectoryEmployeeID,
  OTPGenerate,
  GetDashboardInside,
  GetDashboardInsideFaq,
  GetDashboardInsideReview,
  GetStatus,
  GetSort,
  GetInstructor,
  GetCourseTrainingSubCategory,
  DashboardGetAttendanceFunc,
  GetDashboardInsideDiscussion,
  GetDashboardMasterNoticeBoard,
  GetDashboardInsideSurvey,
  GetDashboardMain,
  GetDashboardMaster,
  GetDashboardMasterSchedule,
  DashboardGetUserProfile,
  LogoutUser,
  getCourseTrainingSearchLov,
  getApplicationOTP,
  getTrackApplication,
  GetCourseTrainingReviewById,
  LogoutUser,
  DashboardGetUserProfile,
  GetDashboardInsideAssessment,
  GetRequestaServiceLov,
  GetDetailRecordByKey,
  GetDashboardLearningPath,
  GetCouseTrainingLMSUserLov,
  GetDashboardGamification,
  getInstructorTrainingRegistrationLov1,
  getApplicationInstructorOTP,
  getNotificationSetting,
  GetReminderSetting,
  GetCountryLov,
  GetSpecialityLov,
  GetSubSpecialityLov,
  getDashboardTrackApplicaton,
  GetDashboardReceipt,
  GetDashboardReceiptDetail,
  dashboardGetSort,
  GetDepartment,
  GetCourseTrainingByLMSUserIdLov,
  DashboardTrackApplicatonInstructor,
  GetNewsAndResources,
  GetNewsAndResourcesFeature,
  GetNewsAndResourcesGetById,
  GetNewsAndResourcesTake,
  GetCertificateLMSUser,
  GetCertificateCreate,
  getUserNotification,
  GetValidateApplication,
  GetValidateApplicationInstructor,
  DashboardRequestForScholarship,
  GetScholarshipRegistrationLov,
  GetValidateApplicationScholarship,
  GetTrackApplicationScholarship,
  getApplicationScholarshipOTP,
  DashboardTrackApplicatonScholarship,
  GetSliders,
  GetStaticPages,
  CourseTrainingVenueLMSUserWise,
  GetWidgets,
  GetAllRequestaServiceLov,
  GetAllCourseTrainingRegistrationByLMSUserId,
  GetSubSpecialityByIdLov,
  GetDepartmentLov,

  // Media Server Export
  GetStream,
  GetStreamCourseTrainingDemoVideo,
  SetStreamTime,
  GetCertificateRequest,
  GetCertificateIssueById,
  MarkAttendanceLMSUser,
  LearnerDashboardFavouriteList,

  // post
  AddReminderSetting,
  createLMSUsers,
  createLMSAuthorization,
  createCourseTrainingRegistration,
  LMSAuth,
  LMSAuthOTP,
  AddFavourite,
  AddFileView,
  AddNoticeBoardView,
  CourseTrainingReview,
  CourseTrainingDiscussion,
  dashboardUpdateUserProfile,
  rmsCourseTrainingRegistrationFeedback,
  DashboardRequestForInstructor,
  ContactUs,
  createInstructorTrainingRegistration,
  getTrackApplicationInstructor,
  AddAssessmentAnswer,
  AddNotificationSetting,
  AddPaymentFunc,
  dashboardGetAssessment,
  dashboardGetSurvey,
  rmsInstructorRegistrationFeedback,
  createScholarRegistration,
  RMSScholarshipRegistrationFeedback,
  createScholarshipRegistration,
  ScholarShipUserRegistration,
  AddReviewFavourite,
  RequestAsAService,
  UserNotificationMarkAllRead,

  // put
  forgetPasswordRequest,
  ForgetPassword,
  AddSurveyAnswer,
  CourseTrainingReviewPut,
  dashboardUpdateUserProfile,
  resetPassword,
  userNotificationMarkRead,
  ChangePassword,

  // Delete
  GetCourseTrainingReviewDelete,
};