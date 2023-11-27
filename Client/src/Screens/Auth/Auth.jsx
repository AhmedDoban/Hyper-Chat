import React from "react";

function Auth(props) {
  const Handle_Logout = () => {
    localStorage.clear();
    props.SetLogin((prv) => !prv);
  };
  return (
    <React.Fragment>
      <div className="Auth">
        Auth
        <button onClick={() => Handle_Logout()}>Logout</button>
      </div>
    </React.Fragment>
  );
}
export default Auth;
