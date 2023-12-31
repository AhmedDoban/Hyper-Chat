import React from "react";
import "./Home.css";
import { Player } from "@lottiefiles/react-lottie-player";

function Home() {
  return (
    <React.Fragment>
      <div className="Home">
        <div className="Home-container">
          <div className="conatiner">
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src={require(`../../../Image/NoChat.json`)}
              className="PlayerHome"
            />
            <h1>Welcome again ! Seclect an chat to start</h1>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Home;
