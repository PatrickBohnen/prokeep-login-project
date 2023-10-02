import { useState } from "react";

const useLoginForm = () => {
  const [loginValues, setLoginValues] = useState<{email: string, password: string, isValidEmail: boolean, showEmailErrorMsg: boolean}>({email: '', password: '', isValidEmail: false, showEmailErrorMsg: false});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccessful, setIsSuccessful] = useState<undefined | boolean>()
  const checkEmailValiditityRegex = (email: string):boolean => new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/).test(email);


  const handleSubmit = (e: React.FormEvent): void => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    fetch("https://reqres.in/api/login", {
        method: 'POST',
        headers : {"Content-Type": "application/json"} ,
        body: JSON.stringify({
            "email":loginValues.email,
            "password":loginValues.password
        })
    })
    .then(res => res.json())
    .then(data => setIsSuccessful(data.hasOwnProperty('token') ? true : false))
    setIsSubmitting(false)
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginValues(values => ({
      ...values,
      [e.target.name]: e.target.value
    }));
    if (e.target.name === 'email') {
      setLoginValues(loginValues => (
        loginValues.showEmailErrorMsg ? {
        ...loginValues,
        isValidEmail: checkEmailValiditityRegex(e.target.value),
        showEmailErrorMsg: !checkEmailValiditityRegex(e.target.value)
      } : {
        ...loginValues,
        isValidEmail: checkEmailValiditityRegex(e.target.value)
      }));
    }
  };

  const handleEmailFieldChange = (e: React.FocusEvent<HTMLInputElement>): void => {
    const isEmailValid = checkEmailValiditityRegex(loginValues.email)
    if (!isEmailValid)
      setLoginValues(loginValues => ({
        ...loginValues,
      showEmailErrorMsg: !isEmailValid
    }));
  };

  const dismissDinos = (): void => {
    setIsSuccessful(undefined)
  }

  return {
    handleChange,
    handleSubmit,
    handleEmailFieldChange,
    dismissDinos,
    loginValues,
    isSubmitting,
    isSuccessful
  };
};

export default useLoginForm;