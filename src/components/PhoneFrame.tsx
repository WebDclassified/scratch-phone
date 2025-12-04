import React from "react";
import phoneFrame from "../assets/phone.png";
import ScratchButton from "./ScratchButton";
import CardOverlay from "./CardOverlay";

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
            {!isOpen && (
              <>

                <ScratchButton />
              </>
            )}

            <CardOverlay />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneFrame;