import React from 'react';
import OnBoardingForm from './onBoardingForm';
// import emailImg from frontend/assets/images//mail.svg;
function WorkSpaceSetup() {
  return (
    <div className="onboarding-page-wrapper">
      {/* <img className="onboarding-page-email-img" src={'assets/images/onboarding/mail.svg'} alt="email image" />
      <h1 className="onboarding-page-header">Email onboarding successfull</h1>
      <p className="onboarding-page-subheading">
        Your email has been verified successfully. Continue to set up your workspace to start using ToolJet.
      </p>
      <button className="onboarding-page-button">
        <p>Continue to set up</p>
        <img></img>
      </button> */}
      <OnBoardingForm />
    </div>
  );
}

export default WorkSpaceSetup;
