import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { validateEmail } from '../_helpers/utils';
import { authenticationService } from '@/_services';

class ForgotPassword2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: '',
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClick = (event) => {
    event.preventDefault();

    if (!validateEmail(this.state.email)) {
      toast.error('Invalid email', {
        id: 'toast-forgot-password-email-error',
      });
      return;
    }

    this.setState({ isLoading: true });

    authenticationService
      .forgotPassword(this.state.email)
      .then(() => {
        toast.success('Password reset link sent to the email id, please check your mail', {
          id: 'toast-forgot-password-confirmation-code',
        });
        this.props.history.push('/login');
      })
      .catch((res) => {
        toast.error(res.error || 'Something went wrong, please try again', {
          id: 'toast-forgot-password-email-error',
        });
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { isLoading } = this.state;

    return (
      <div className="forgot-password-wrapper">
        <div className="common-auth-container-wrapper">
          <form>
            <div>
              <h2 className="forgot-password-header">Forgot password</h2>
              New to toolJet? &nbsp;
              <Link to={'/signup'} tabIndex="-1">
                Sign up
              </Link>
              <div>
                <p className="common-auth-sub-label">Email address</p>
                <input
                  onChange={this.handleChange}
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  data-testid="emailField"
                  className="common-input-auth-section "
                />
              </div>
              <div>
                <button
                  className="common-continue-btn-auth-section "
                  data-testid="submitButton"
                  onClick={this.handleClick}
                  disabled={isLoading || !this.state.email}
                >
                  Send a reset links
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="forgot-passsword-testimonial">
          <p>
            “We definitely wanted to invest in low-code technology to ensure our razor focus is on bringing feature
            richness, experience and proven scale -
          </p>
        </div>
      </div>
    );
  }
}

export { ForgotPassword2 };
