import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

const Login = lazy(() => import("./Login/Login"));
const Register = lazy(() => import("./Register/Register"));

function Guest(props) {
  return (
    <React.Fragment>
      <div className="Guest">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="" element={<Login SetLogin={props.SetLogin} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Suspense>
      </div>
    </React.Fragment>
  );
}
export default Guest;
