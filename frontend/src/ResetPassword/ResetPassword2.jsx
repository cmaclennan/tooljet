import React from 'react';
import { toast } from 'react-hot-toast';
import { authenticationService } from '@/_services';

class ResetPassword2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      token: '',
      email: '',
      password: '',
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value?.trim() });
  };

  handleClick = (event) => {
    event.preventDefault();
    const { token } = this.props.location.state;
    const { password, password_confirmation } = this.state;
    if (password !== password_confirmation) {
      toast.error("Password don't match");
      this.setState({
        password: '',
        password_confirmation: '',
      });
    } else {
      this.setState({
        isLoading: true,
      });
      authenticationService
        .resetPassword({ ...this.state, token })
        .then(() => {
          toast.success('Password reset successfully');
          this.props.history.push('/login');
        })
        .catch((res) => {
          this.setState({
            isLoading: false,
          });
          toast.error(res.error || 'Something went wrong, please try again');
        });
    }
  };
  render() {
    const { isLoading } = this.state;

    return (
      <div className="page">
        <div className="common-auth-container-wrapper">
          <form action="." method="get" autoComplete="off">
            <div>
              <h2 className="common-auth-section-header">Reset Password</h2>
              <div className="reset-password-input-container">
                <label className="common-auth-sub-label">New Password</label>
                <div>
                  <input
                    onChange={this.handleChange}
                    name="password"
                    type="password"
                    placeholder="Password"
                    autoComplete="off"
                    className="common-input-auth-section reset-password-input"
                  />
                  <span className="common-input-warning-text">Password must be atleast 8 charectors</span>

                  <span></span>
                </div>
              </div>
              <div className="reset-password-input-container">
                <label className="common-auth-sub-label">Re-enter the password</label>
                <div>
                  <input
                    onChange={this.handleChange}
                    name="password_confirmation"
                    type="password"
                    placeholder="Re-enter the password"
                    autoComplete="off"
                    className="common-input-auth-section reset-password-input"
                  />
                  <span className="common-input-warning-text">Password must be atleast 8 charectors</span>

                  <span></span>
                </div>
              </div>
              <div>
                <button
                  className={`common-continue-btn-auth-section ${isLoading ? 'btn-loading' : ''}`}
                  onClick={this.handleClick}
                >
                  Reset password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export { ResetPassword2 };
