import { connect } from "react-redux";
import { ChangePasswordForm } from "../components/settings/ChangePasswordForm";
import { submitUpdatePassword } from "../../app/actions/AuthActions";
import { FeedbackForm } from "../components/settings/FeedbackForm";
import { submitFeedbackRequest } from "../../app/actions/SettingActions";
import Header from "../components/Header";

const Settings = (props) => {
  const { user, submitFeedback } = props;

  return (
    <div className="container--fluid">
      <Header />
      <div className="container">
        <div className="dashboard__welcome">
          <h3 className="dashboard__welcome_title">
            Hello, <strong>{user?.name ?? "User"}</strong>
          </h3>
          <div className="dashboard__welcome_block">
            <p className="dashboard__welcome_text">
              <span className="muted_text">
                Here you can view all of your settings
              </span>
            </p>
          </div>
        </div>
        <div className="settings">
          <div className="settings__change-password">
            <h3 className="settings__change-password__title">
              Change Password
            </h3>
            <ChangePasswordForm {...props} />
          </div>
          <div className="settings__share-feedback">
            <FeedbackForm submitFeedback={submitFeedback} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    loading: state.auth.loading,
    success: state.auth.success,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePassword: (user_data) => dispatch(submitUpdatePassword(user_data)),
    submitFeedback: (obj) => dispatch(submitFeedbackRequest(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
