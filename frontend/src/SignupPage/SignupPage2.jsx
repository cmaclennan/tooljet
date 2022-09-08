import React from 'react';
import { authenticationService } from '@/_services';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { validateEmail } from '../_helpers/utils';
import GoogleSSOLoginButton from '@ee/components/LoginPage/GoogleSSOLoginButton';
import GitSSOLoginButton from '@ee/components/LoginPage/GitSSOLoginButton';
import SuccessinfoScreen from '../../successinfoScreen/successinfoScreen';

class SignupPage2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };

    this.ssoConfigs = {
      enableSignUp:
        window.public_config?.DISABLE_MULTI_WORKSPACE !== 'true' &&
        window.public_config?.SSO_DISABLE_SIGNUPS !== 'true',
      configs: {
        google: {
          enabled: !!window.public_config?.SSO_GOOGLE_OAUTH2_CLIENT_ID,
          configs: {
            client_id: window.public_config?.SSO_GOOGLE_OAUTH2_CLIENT_ID,
          },
        },
        git: {
          enabled: !!window.public_config?.SSO_GIT_OAUTH2_CLIENT_ID,
          configs: {
            client_id: window.public_config?.SSO_GIT_OAUTH2_CLIENT_ID,
          },
        },
      },
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  signup = (e) => {
    e.preventDefault();

    this.setState({ isLoading: true });

    const { email } = this.state;

    if (!validateEmail(email)) {
      toast.error('Invalid email', {
        id: 'toast-login-auth-error',
        position: 'top-center',
      });
      this.setState({ isLoading: false });
      return;
    }

    authenticationService.signup(email).then(
      () => {
        // eslint-disable-next-line no-unused-vars
        const { from } = this.props.location.state || {
          from: { pathname: '/' },
        };
        this.setState({ isLoading: false, signupSuccess: true });
      },
      (e) => {
        toast.error(e?.error || 'Something went wrong!', {
          position: 'top-center',
        });
        this.setState({ isLoading: false });
      }
    );
  };
  render() {
    const { isLoading, signupSuccess } = this.state;

    return (
      <div className="page common-auth-section-whole-wrapper ">
        <div className="common-auth-section-left-wrapper">
          <form className="" action="." method="get" autoComplete="off">
            {!signupSuccess && (
              <div className="common-auth-container-wrapper ">
                <h2 className="common-auth-section-header ">Join ToolJet</h2>
                {!signupSuccess && (
                  <div className=" ">
                    Already have an account? &nbsp;
                    <Link to={'/login'} tabIndex="-1">
                      Sign in
                    </Link>
                  </div>
                )}
                {this.ssoConfigs.enableSignUp && (
                  <div className="">
                    {this.state.configs?.git?.enabled && (
                      <div className="login-sso-wrapper">
                        <GitSSOLoginButton configs={this.state.configs?.git?.configs} />
                      </div>
                    )}
                    {this.state.configs?.google?.enabled && (
                      <div className="login-sso-wrapper">
                        <GoogleSSOLoginButton
                          configs={this.state.configs?.google?.configs}
                          configId={this.state.configs?.google?.config_id}
                        />
                      </div>
                    )}
                    {(this.ssoConfigs.configs?.git?.enabled || this.ssoConfigs.configs?.google?.enabled) && (
                      <div className="mt-2 separator">
                        <h2>
                          <span>OR</span>
                        </h2>
                      </div>
                    )}
                  </div>
                )}
                <div className=" common-auth-inputs-wrapper">
                  <label className=" common-auth-sub-label">Name</label>
                  <input
                    onChange={this.handleChange}
                    name="name"
                    type="name"
                    className="common-input-auth-section "
                    placeholder="Enter your business name"
                  />
                  <label className=" common-auth-sub-label">Email address</label>
                  <input
                    onChange={this.handleChange}
                    name="email"
                    type="email"
                    className="common-input-auth-section"
                    placeholder="Enter your business email"
                  />
                  <label className=" common-auth-sub-label" data-cy="password-label">
                    Password
                  </label>

                  <input
                    onChange={this.handleChange}
                    name="password"
                    type="password"
                    className="common-input-auth-section"
                    placeholder="Enter new password"
                  />
                  <label className=" common-auth-sub-label" data-cy="password-label">
                    Confirm Password
                  </label>

                  <input
                    onChange={this.handleChange}
                    name="password"
                    type="password"
                    className="common-input-auth-section"
                    placeholder="Enter new password"
                  />
                </div>

                <div className=" ">
                  <button
                    className={`common-continue-btn-auth-section  ${isLoading ? 'btn-loading' : ''}`}
                    onClick={this.signup}
                  >
                    Sign up
                  </button>
                </div>
                <p className="singup-terms">
                  By Signing up you are agreeing to the <span>Terms of Service & Privacy Policy.</span>
                </p>
              </div>
            )}
            {signupSuccess && (
              <div className=" ">
                <SuccessinfoScreen />
              </div>
            )}
          </form>
        </div>
        <div className="common-auth-section-right-wrapper">
          <p className="login-testimonial">
            “We definitely wanted to invest in low-code technology to ensure our razor focus is on bringing feature
            richness, experience and proven scale -
          </p>
        </div>
      </div>
    );
  }
}

export { SignupPage2 };
