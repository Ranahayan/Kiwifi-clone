import React from "react";
import '../styles/loginPage.css';
import logoImg from '../assets/kiwify-logo.png';



export default function Login() {
  return <div className="loginPage">
    <div className="contentArea d-flex flex-column align-items-center">
      <img src={logoImg} alt="" />
      <span className="heading-1">Create new account</span>
      <p>Or <a>log in to your existing account</a></p>
    </div>
  </div>;
}
