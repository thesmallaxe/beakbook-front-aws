import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { showDownloadPopup } from "../../../app/actions/BarnDetailActions";
import { checkPermission } from "../../../app/hooks/with-permission";
import { DownloadPopup } from "./popups/DownloadPopup";

export const CycleSelection = (props) => {
  const barnDownloadPermission = checkPermission("download-barn");
  const sectionDownloadPermission = checkPermission("download-sectionwise");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { barn_id, cycle_id } = useParams();
  const [cycle, setCycle] = useState({ cycle_id: cycle_id, show_popup: false });
  const cycles = props.cycle.barn_single.cycleSelection ?? {};
  const show_popup = props.cycle.download.show;
  const user = props.user;

  const HandleChange = (event) => {
    let cycle_id = event.target.value;
    let updateValue = { cycle_id: cycle_id };
    setCycle((cycle) => ({
      ...cycle,
      ...updateValue,
    }));
    navigate("/barns/" + barn_id + "/cycle/" + cycle_id, {
      replace: true,
    });
  };

  const showDownload = () => {
    dispatch(showDownloadPopup(cycles));
  };

  return (
    <div className="cycle_selection">
      <select onChange={HandleChange} value={cycle.cycle_id}>
        {cycles &&
          Object.keys(cycles).map((key) => (
            <option value={cycles[key].cycleId} key={key}>
              {cycles[key].label}
            </option>
          ))}
      </select>

      {(barnDownloadPermission || sectionDownloadPermission) && (
        <>
          <button className="cycle_selection__download" onClick={showDownload}>
            <i className="icon icon-download"></i> Download
          </button>
          <DownloadPopup
            user={user}
            state={props.cycle}
            show={show_popup}
            barn_id={barn_id}
            cycle_id={cycle_id}
            cycles={cycles}
          />
        </>
      )}
    </div>
  );
};
