import React from 'react';

export default function OktaSSOLoginButton() {
  const redirect = (e) => {
    e.preventDefault();
    window.location.href = '/auth/okta';
  };
  return (
    <div>
      <button onClick={redirect} className="btn border-0 rounded-2">
        <img src="/assets/images/sso-buttons/okta.svg" className="h-4" />
        <span className="px-1">Sign in with okta</span>
      </button>
    </div>
  );
}
