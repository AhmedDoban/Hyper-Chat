import React, { useEffect, useState } from "react";
import "./Css/root.css";
import "./Css/style.css";

import Auth from "./Screens/Auth/Auth";
import Guest from "./Screens/Guest/Guest";

function App() {
  const [Login, SetLogin] = useState(
    localStorage.getItem("Hyper_Chat_Login") || false
  );

  useEffect(() => {
    const Login = localStorage.getItem("Hyper_Chat_Login");
    if (Login !== null) {
      SetLogin(true);
    }
  }, []);

  return Login ? <Auth SetLogin={SetLogin} /> : <Guest SetLogin={SetLogin} />;
}

export default App;
