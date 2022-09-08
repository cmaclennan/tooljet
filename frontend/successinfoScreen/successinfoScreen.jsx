import React from 'react';

function SuccessinfoScreen() {
  return (
    <div>
      {' '}
      <div className="email-verification-wrapper">
        <div className="email-verification-card">
          <img className="onboarding-page-email-img" src={'assets/images/onboarding/mail.svg'} alt="email image" />
          <h1 className="common-auth-section-header">Check your mail.</h1>
          <p className="onboarding-page-verify--subheading">
            We’ve sent an email to John@rapstul.com with a verification link. Please use that to verify your email
            address{' '}
          </p>
          <p className="common-sub-header">Did not receive an email? Check your spam folder</p>
          <p>OR</p>
          <button
            className="common-continue-btn-auth-section "
            style={{ marginTop: '32px' }}
            // onClick={() => setShow(true)}
          >
            <p className="mb-0">Resend verification mail in 30s</p>
          </button>
          <button
            className="common-continue-btn-auth-section "
            style={{ marginTop: '32px' }}
            // onClick={() => setShow(true)}
          >
            <p className="mb-0">Edit email address</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessinfoScreen;
