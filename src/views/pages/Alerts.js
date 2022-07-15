import { connect } from "react-redux";
import Header from "../components/Header";

export const Alerts = (props) => {
  return (
    <div className="container--fluid">
      <Header />
      <div className="container">
        <div className="alerts">
          <p>Feature under development.</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
