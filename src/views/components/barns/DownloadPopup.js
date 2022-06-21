import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  hideDwnloadPopup,
  triggerDownload,
} from "../../../app/actions/BarnDetailActions";
import Alert from "../partials/Alert";

export const DownloadPopup = ({
  barn_id = null,
  cycle_id = null,
  show = false,
  cycles = [],
  user,
}) => {
  const dispatch = useDispatch();
  const [download, setDownload] = useState({
    barnId: barn_id,
    cycleId: cycle_id,
    fileType: "CSV",
    downloadType: "barn",
    userId: user?.id,
  });

  const handleCancel = () => {
    dispatch(hideDwnloadPopup());
  };

  const handleChange = (e) => {
    let updateValue = {};
    updateValue[e.target.name] = e.target.value;
    setDownload((download) => ({
      ...download,
      ...updateValue,
    }));
  };

  const handleDownload = () => {
    if (Object.keys(cycles).length !== 0) dispatch(triggerDownload(download));
  };

  let popup = show ? "download_popup--show" : "";

  return (
    <div className={"download_popup " + popup}>
      <div className="download_popup__overlay">
        <div className="download_popup__box">
          <header className="download_popup__heading">
            <h2>
              Download <span>barn data</span>
            </h2>
            <p>
              Please select a file format and cycle to download the barn data.
            </p>
          </header>
          <div className="download_popup__body">
            {Object.keys(cycles).length !== 0 ? (
              <select
                name="cycleId"
                value={download.cycleId}
                onChange={handleChange}
              >
                {Object.keys(cycles).map((key) => (
                  <option
                    value={cycles[key].cycleId ?? cycles[key].cycle_id}
                    key={key}
                  >
                    {cycles[key].label ??
                      cycles[key].starting_date + `, Cycle ${++key}`}
                  </option>
                ))}
              </select>
            ) : (
              <Alert
                action="error"
                message="The selected barn does't have cycles"
              />
            )}

            <div className="form-group">
              <label>Statistics Type</label>
              <div className="check_input_wrapper">
                <div className="check_input">
                  <input
                    type="radio"
                    name="downloadType"
                    value="barn"
                    id="Barn"
                    onChange={handleChange}
                    defaultChecked
                  />
                  <label htmlFor="Barn">Barn</label>
                </div>
                <div className="check_input">
                  <input
                    type="radio"
                    name="downloadType"
                    value="section"
                    onChange={handleChange}
                    id="SECTION"
                  />
                  <label htmlFor="SECTION">All Sections</label>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Format</label>
              <div className="check_input_wrapper">
                <div className="check_input">
                  <input
                    type="radio"
                    name="fileType"
                    value="CSV"
                    id="CSV"
                    onChange={handleChange}
                    defaultChecked
                  />
                  <label htmlFor="CSV">CSV</label>
                </div>
                <div className="check_input">
                  <input
                    type="radio"
                    name="fileType"
                    value="PDF"
                    id="PDF"
                    onChange={handleChange}
                  />
                  <label htmlFor="PDF">PDF</label>
                </div>
              </div>
            </div>
          </div>
          <footer className="download_popup__footer">
            <div className="download_popup__action">
              <button
                className={
                  "btn btn--green " +
                  (Object.keys(cycles).length === 0 ? "btn--disabled" : "")
                }
                onClick={handleDownload}
              >
                Download
              </button>
              <button className="btn btn--light-orange" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
