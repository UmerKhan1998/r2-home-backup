const passwordValidation = (val) => {
  // let regEmail =
  //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,10})+$/;
  // let regEmail = /^\S+@\S+\.\S{2,}$/;
  // let regEmail = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/;
  let regEmail = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,16}$/;

  // Password does not meet the requirements. It must have at least one uppercase letter, one lowercase letter, one special character, and a length of 8 or more.
  // Password should have greater than equal to 8 and should have at least 1 uppercase, 1 lowercase and one special character
  if (val) {
    if (!regEmail.test(val)) {
      return "Invalid Password";
    }
  }
  else {
    return "Password is mandatory";
  }
};

const message_en="Password length should be mimimum 8 and maximum 16 and should have at least 1 uppercase, 1 lowercase and one special character.";
const message_ar="يجب أن يكون طول كلمة المرور 8 كحد أدنى و 16 كحد أقصى ويجب أن تحتوي على الأقل على حرف كبير واحد وحرف صغير وحرف خاص واحد.";

export { passwordValidation, message_en, message_ar };
