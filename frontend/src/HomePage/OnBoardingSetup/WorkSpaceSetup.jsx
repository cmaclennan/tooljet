import React, { useState } from 'react';
import OnBoardingForm from './onBoardingForm';
function WorkSpaceSetup() {
  const [show, setShow] = useState(false);
  return (
    <div className="onboarding-page-wrapper">
      {!show ? (
        <>
          <img className="onboarding-page-email-img" src={'assets/images/onboarding/mail.svg'} alt="email image" />
          <h1 className="onboarding-page-verify-header">Successfully verified email.</h1>
          <p className="onboarding-page-verify--subheading">
            Your email has been verified successfully. Continue to set up your workspace to start using ToolJet.
          </p>
          <button
            className="onboarding-page-continue-button"
            style={{ marginTop: '32px' }}
            onClick={() => setShow(true)}
          >
            <p className="mb-0">Set up Tooljet</p>
          </button>
        </>
      ) : (
        <OnBoardingForm />
      )}
    </div>
  );
}

export default WorkSpaceSetup;
