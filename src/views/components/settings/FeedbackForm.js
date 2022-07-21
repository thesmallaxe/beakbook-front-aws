import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { withPermission } from "../../../app/hooks/with-permission";

const FeedbackForm = (props) => {
  const { submitFeedback } = props;
  const { loading, success } = useSelector((state) => ({
    loading: state.setting.loading,
    success: state.setting.success,
  }));
  const [feedback, setFeedback] = useState({
    feedback: "",
  });

  const handleChange = (event) => {
    setFeedback({
      ...feedback,
      feedback: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!loading && feedback.feedback !== "") {
      submitFeedback(feedback);
    }
  };

  useEffect(() => {
    setFeedback((feedback) => ({
      ...feedback,
      feedback: "",
    }));
  }, [success]);

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="outlined-multiline-static"
        label="Feedback"
        multiline
        rows={8}
        value={feedback.feedback}
        onChange={handleChange}
      />
      <div className="settings__share-feedback__button-wrapper">
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default withPermission(FeedbackForm, "send-feedback", true);
