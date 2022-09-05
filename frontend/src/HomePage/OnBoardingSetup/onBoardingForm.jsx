import React, { useState } from 'react';
function OnBoardingForm() {
  const [buttonState, setButtonState] = useState(false);

  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    companyName: '',
    role: '',
    companySize: '',
    employeeNo: '',
  });

  const FORM_TITLES = [
    'Where do you work John?',
    'What best describes your role',
    'What is the size of your company',
    'Where do you work John?',
  ];
  const FormSubTitles = ['ToolJet will not share your information with anyone'];

  const PageShift = () => {
    if (page === 0) {
      return <Page0 />;
    } else if (page === 1) {
      return <Page1 />;
    } else if (page === 2) {
      return <Page2 />;
    } else {
      return <Page3 />;
    }
  };

  return (
    <div className="form">
      <div className="onboarding-progress">
        {page !== 0 && (
          <div
            className="onboarding-back-button"
            disabled={page == 0}
            onClick={() => {
              setPage((currPage) => currPage - 1);
              // setButtonState(true);
            }}
            style={{ cursor: 'pointer' }}
          >
            <img src="/assets/images/onboarding/back.svg" />
            <p>Back</p>
          </div>
        )}
        <div className="onboarding-bubbles-container">{onBoardingBubbles()}</div>
      </div>
      <div className="form-container">
        <div className="onboarding-header-wrapper">
          <h1 className="onboarding-page-header">{FORM_TITLES[page]}</h1>
          <p className="onboarding-page-sub-header">{FormSubTitles[0]}</p>
        </div>
        {PageShift()}
        <div className="">
          <div
            onClick={() => {
              if (page === FORM_TITLES.length - 1) {
                console.log(formData);
              } else {
                setPage((currPage) => currPage + 1);
                // setButtonState(true);
              }
            }}
          >
            {onBoardingButton({ buttonState })}{' '}
          </div>
        </div>
      </div>
    </div>
  );
}

// components
export function onBoardingButton(props) {
  console.log('PROSP', props);
  return (
    <button className="onboarding-page-button" disabled={props.buttonState}>
      <p className="mb-0">Continue</p>
      <img src="/assets/images/onboarding/tick.svg" />
    </button>
  );
}

export function onBoardingInput() {
  return <input placeholder="Enter your company name" className="onboarding-input" />;
}

export function onBoardingRadioInput(props) {
  return (
    <div className="onboarding-input">
      <input type="radio" />
      <p>{props.field}</p>
    </div>
  );
}

export function onBoardingBubbles(props) {
  return (
    <div className="onboarding-bubbles-wrapper">
      <div className={`onboarding-bubbles`}></div>
      <div className={`onboarding-bubbles`}></div>
      <div className={`onboarding-bubbles-active`}></div>
      <div className={`onboarding-bubbles`}></div>
      <div className="onboarding-bubbles"></div>
    </div>
  );
}

// pages

export function Page0() {
  return <div className="onboarding-pages-wrapper">{onBoardingInput()}</div>;
}
export function Page1() {
  const ON_BOARDING_ROLES = [
    'Engineering manager',
    'Developer ',
    'Product manager',
    'Designer',
    'Mobile Developer',
    'Other',
  ];

  return (
    <div className="onboarding-pages-wrapper">
      {ON_BOARDING_ROLES.map((item) => (
        <div key={item}> {onBoardingRadioInput({ field: item })}</div>
      ))}
    </div>
  );
}
export function Page2() {
  const ON_BOARDING_SIZE = ['1-5', '5-20', '20-50', '50-100', '100-200', '200+'];

  return (
    <div className="onboarding-pages-wrapper">
      {ON_BOARDING_SIZE.map((item) => (
        <div key={item}> {onBoardingRadioInput({ field: item })}</div>
      ))}
    </div>
  );
}
export function Page3() {
  const ON_BOARDING_SIZE = ['1-5', '5-20', '20-50', '50-100', '100-200', '200+'];

  return (
    <div className="onboarding-pages-wrapper">
      {ON_BOARDING_SIZE.map((item) => (
        <div key={item}> {onBoardingRadioInput({ field: item })}</div>
      ))}
    </div>
  );
}

export default OnBoardingForm;
