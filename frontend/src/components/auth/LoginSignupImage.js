import React from "react";
import authImage from "../../assets/login.webp";
import Lottie from "react-lottie";
import animationData from "./Lottiefiles/89968-house.json";

const LoginSignupImage = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className='hero-img'>
      <Lottie options={defaultOptions} height={600} width={600} />
    </div>
  );
};

export default LoginSignupImage;
