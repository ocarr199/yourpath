// ⬇ What dependencies we need to import
import React from 'react';
import { useHistory } from 'react-router-dom';
// ⬇ What custom components we need to import
import './LandingPage.css';
import LoginForm from "../LoginForm/LoginForm";
import image from "../Images/YourPath_Logo_Text.png"

function LandingPage() {

  return (
    <div className="container center">
          <img src={image} alt="Your Path Logo" className=" landing-page center"/>
          <LoginForm /> 
    </div>
  );
}

export default LandingPage;
