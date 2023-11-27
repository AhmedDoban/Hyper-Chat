import React from "react";
import "./Loading.css";

function Loading() {
  return (
    <React.Fragment>
      <div className="loading">
        <div className="container">
          <div className="bullets">
            <img src={require("../../Image/icon.png")} alt="logo" />
            <div className="bullet"></div>
            <div className="bullet"></div>
            <div className="bullet"></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Loading;
