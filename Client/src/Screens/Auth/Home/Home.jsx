import React from "react";
import "./Home.css";
import { Player } from "@lottiefiles/react-lottie-player";

function Home() {
  return (
    <React.Fragment>
      <div className="Home">
        <div className="conatiner">
          <Player
            autoplay={true}
            loop={true}
            controls={false}
            src={require(`../../../Image/Home/RandomChat-${+(
              Math.random() * 4 +
              1
            ).toFixed(0)}.json`)}
            className="PlayerHome"
          />
          <h1>Welcome again ! Seclect an chat to start</h1>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Home;
