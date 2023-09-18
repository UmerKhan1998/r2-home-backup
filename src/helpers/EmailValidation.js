const emailValidation = (val) => {
  // let regEmail =
  //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,10})+$/;
  // let regEmail = /^\S+@\S+\.\S{2,}$/;
  let regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (val) {
    if (!regEmail.test(val)) {
      return "Invalid Email";
    }
  } else {
    return "Email Mandatory";
  }
};

export { emailValidation };
