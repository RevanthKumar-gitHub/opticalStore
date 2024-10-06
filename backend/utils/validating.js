const emailValidate = (email) => {
  return new Promise((resolve, reject) => {
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegEx.test(email)) {
      resolve({ message: "Valid Email" });
    } else {
      reject({ message: "Invalid email format" });
    }
  });
};

const phoneNumberValidate = (phone) => {
  return new Promise((resolve, reject) => {
    const phoneRegEx = /^[6-9]\d{9}$/;
    if (phoneRegEx.test(phone)) {
      resolve({ message: "Valid Phone number" });
    } else {
      reject({ message: "Invalid Phone number" });
    }
  });
};
module.exports = { emailValidate ,phoneNumberValidate};
