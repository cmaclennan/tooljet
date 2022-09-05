import React, { useState, useEffect } from 'react';
import config from 'config';
import { Link } from 'react-router-dom';
import { authenticationService, userService } from '@/_services';
import { history } from '@/_helpers';
import { DarkModeToggle } from './DarkModeToggle';
import LogoIcon from '../Editor/Icons/logo.svg';
import { Organization } from './Organization';
import { NotificationCenter } from './NotificationCenter';

export const VerificationHeader = function VerificationHeader({ switchDarkMode, darkMode }) {
  // eslint-disable-next-line no-unused-vars
  const [pathName, setPathName] = useState(document.location.pathname);
  const [avatar, setAvatar] = useState();
  const { first_name, last_name, avatar_id, admin } = authenticationService.currentUserValue;
  const currentVersion = localStorage.getItem('currentVersion');

  useEffect(() => {
    setPathName(document.location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document.location.pathname]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    async function fetchAvatar() {
      const blob = await userService.getAvatar(avatar_id);
      setAvatar(URL.createObjectURL(blob));
    }
    if (avatar_id) fetchAvatar();

    () => avatar && URL.revokeObjectURL(avatar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar_id]);

  function logout() {
    authenticationService.logout();
    history.push('/login');
  }

  return (
    <header className="navbar tabbed-navbar navbar-expand-md navbar-light d-print-none">
      <div className="">
        {/* <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-menu"
        ></button>
        <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0" data-cy="home-page-logo">
          <Link to={'/'} data-cy="home-page-logo">
            <LogoIcon />
          </Link>
        </h1> */}

        <div className="navbar-nav ">
          <div className="onboarding-flow-header">
            <div className="onboarding-steps onboarding-step-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.41421 5L6 6.41421L11.6569 12.0711L6 17.7279L7.41421 19.1421L14.4853 12.0711L7.41421 5Z"
                  fill="currentColor"
                />
                <path d="M16.3432 19V5H18.3432V19H16.3432Z" fill="currentColor" />
              </svg>
              <p className="onboarding-steps ">Create account</p>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.41421 5L6 6.41421L11.6569 12.0711L6 17.7279L7.41421 19.1421L14.4853 12.0711L7.41421 5Z"
                  fill="currentColor"
                />
                <path d="M16.3432 19V5H18.3432V19H16.3432Z" fill="currentColor" />
              </svg>
            </div>
            <div className="onboarding-steps onboarding-step-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.41421 5L6 6.41421L11.6569 12.0711L6 17.7279L7.41421 19.1421L14.4853 12.0711L7.41421 5Z"
                  fill="currentColor"
                />
                <path d="M16.3432 19V5H18.3432V19H16.3432Z" fill="currentColor" />
              </svg>
              <p className="onboarding-steps">Create account</p>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.41421 5L6 6.41421L11.6569 12.0711L6 17.7279L7.41421 19.1421L14.4853 12.0711L7.41421 5Z"
                  fill="currentColor"
                />
                <path d="M16.3432 19V5H18.3432V19H16.3432Z" fill="currentColor" />
              </svg>
            </div>
            <div className="onboarding-steps onboarding-step-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.41421 5L6 6.41421L11.6569 12.0711L6 17.7279L7.41421 19.1421L14.4853 12.0711L7.41421 5Z"
                  fill="currentColor"
                />
                <path d="M16.3432 19V5H18.3432V19H16.3432Z" fill="currentColor" />
              </svg>
              <p className="onboarding-steps">Create account</p>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.41421 5L6 6.41421L11.6569 12.0711L6 17.7279L7.41421 19.1421L14.4853 12.0711L7.41421 5Z"
                  fill="currentColor"
                />
                <path d="M16.3432 19V5H18.3432V19H16.3432Z" fill="currentColor" />
              </svg>
            </div>
          </div>
          <div className="nav-item dropdown ms-2 user-avatar-nav-item">
            <a
              href="#"
              className="nav-link d-flex lh-1 text-reset p-0"
              data-bs-toggle="dropdown"
              aria-label="Open user menu"
              data-testid="userAvatarHeader"
            >
              <div className="d-xl-block" data-cy="user-menu">
                {avatar_id ? (
                  <span
                    className="avatar avatar-sm"
                    style={{
                      backgroundImage: `url(${avatar})`,
                    }}
                  />
                ) : (
                  <span className="avatar bg-secondary-lt">
                    {first_name ? first_name[0] : ''}
                    {last_name ? last_name[0] : ''}
                  </span>
                )}
              </div>
            </a>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow end-0" data-cy="dropdown-menu">
              <Link data-testid="settingsBtn" to="/settings" className="dropdown-item" data-cy="profile-link">
                Profile
              </Link>
              <Link data-testid="logoutBtn" to="#" onClick={logout} className="dropdown-item" data-cy="logout-link">
                Logout
              </Link>
              {currentVersion && (
                <Link to="#" className={`dropdown-item pe-none ${darkMode ? 'color-muted-darkmode' : 'color-muted'}`}>
                  v{currentVersion}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
