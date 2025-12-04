import React from "react";
import phoneFrame from "../assets/phone.png";
import backdrop from "../assets/back1.jpg";
import FloatingScratchButton from "./ScratchButton";
import ScratchCardOverlay from "./CardOverlay";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const PhoneFrame: React.FC = () => {
  const isOpen = useSelector((state: RootState) => state.scratch.isOpen);

  return (
    <div className="phone-wrapper">
      <div className="phone-frame">
        <img src={phoneFrame} alt="Phone frame" className="phone-frame-img" />

        <div className="phone-screen">
          <div className="phone-ui">

            <div
              className={`background-image ${isOpen ? "blur-bg" : ""}`}
              style={{
                backgroundImage: `url(${backdrop})`,
              }}
            ></div>

            {!isOpen && (
              <>

                <FloatingScratchButton />
              </>
            )}

            <ScratchCardOverlay />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneFrame;
